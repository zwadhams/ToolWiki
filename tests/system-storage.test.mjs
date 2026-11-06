import assert from 'node:assert/strict';
import test from 'node:test';
import {
  MAX_IMPORT_BYTES, STORAGE_KEY, newComponent, newConnection, newProfile, parseProfile,
  prepareProfileImport, removalSnapshot, removeComponent, replaceSavedProfile,
  restoreProfile, retryProfileRead, saveProfile, serializeProfile, undoRemoval,
} from '../src/lib/system-builder.mjs';
import { profileSchema } from '../src/lib/system-schema.mjs';

function memoryStorage(initial = null) {
  let raw = initial;
  const calls = { reads: 0, writes: 0 };
  return {
    calls,
    get raw() { return raw; },
    getItem(key) { assert.equal(key, STORAGE_KEY); calls.reads++; return raw; },
    setItem(key, value) { assert.equal(key, STORAGE_KEY); calls.writes++; raw = value; },
  };
}

function largeProfile(notesLength = 0) {
  const profile = newProfile();
  profile.components = Array.from({ length: 50 }, (_, i) => ({
    ...newComponent(`c${i}`),
    languages: Array.from({ length: 80 }, (_, j) => `L${String(j).padStart(2, '0')}${'x'.repeat(197)}`),
    notes: 'n'.repeat(notesLength),
  }));
  profile.connections = Array.from({ length: 100 }, (_, i) => ({ ...newConnection(`e${i}`, 'c0', 'c1'), notes: 'n'.repeat(notesLength) }));
  return profile;
}

function profileAtBytes(bytes) {
  const profile = largeProfile();
  let remaining = bytes - Buffer.byteLength(JSON.stringify(profile, null, 2));
  for (const part of [...profile.components, ...profile.connections]) {
    const count = Math.min(2000, remaining);
    part.notes = 'n'.repeat(count); remaining -= count;
  }
  assert.equal(remaining, 0, 'Fixture must fit the existing field bounds');
  assert.equal(Buffer.byteLength(JSON.stringify(profile, null, 2)), bytes);
  assert.ok(profileSchema.safeParse(profile).success);
  return profile;
}

test('normal and legacy v1 descriptions keep the storage key and round-trip', () => {
  assert.equal(STORAGE_KEY, 'toolwiki.analysis-suite.v1');
  const profile = newProfile(); profile.name = 'Ordinary system';
  delete profile.components[0].goals;
  const prepared = prepareProfileImport(JSON.stringify(profile));
  assert.deepEqual(prepared.components[0].goals, []);
  const raw = serializeProfile(prepared);
  assert.equal(raw, JSON.stringify(prepared, null, 2));
  assert.deepEqual(parseProfile(raw), prepared);
  const storage = memoryStorage();
  assert.equal(saveProfile(storage, prepared), '');
  const restored = restoreProfile(storage);
  assert.deepEqual(restored.profile, prepared);
  assert.equal(restored.recovery, null);
  assert.equal(restored.error, '');
});

test('exact serialized UTF-8 limit is accepted and one byte over is rejected', () => {
  const exact = profileAtBytes(MAX_IMPORT_BYTES);
  const raw = serializeProfile(exact);
  assert.equal(Buffer.byteLength(raw), 1048576);
  assert.deepEqual(prepareProfileImport(raw), exact);
  const storage = memoryStorage();
  assert.equal(saveProfile(storage, exact), '');
  assert.deepEqual(restoreProfile(storage).profile, exact);

  const over = profileAtBytes(MAX_IMPORT_BYTES + 1);
  assert.throws(() => serializeProfile(over), error => error.code === 'size' && error.message.includes('1 MiB'));
  assert.throws(() => parseProfile(JSON.stringify(over, null, 2)), error => error.code === 'size');
  const writes = storage.calls.writes;
  assert.match(saveProfile(storage, over), /exceeds 1 MiB/);
  assert.equal(storage.raw, raw);
  assert.equal(storage.calls.writes, writes);
});

test('size enforcement counts UTF-8 bytes rather than characters', () => {
  const exact = profileAtBytes(MAX_IMPORT_BYTES);
  exact.components[0].notes = `${exact.components[0].notes.slice(0, -1)}\u00e9`;
  const raw = JSON.stringify(exact, null, 2);
  assert.equal(raw.length, MAX_IMPORT_BYTES);
  assert.equal(Buffer.byteLength(raw), MAX_IMPORT_BYTES + 1);
  assert.ok(profileSchema.safeParse(exact).success);
  assert.throws(() => serializeProfile(exact), error => error.code === 'size');
  assert.throws(() => parseProfile(raw), error => error.code === 'size');
});

test('growing the audited import keeps the last restorable save and can recover by reduction', () => {
  const original = largeProfile();
  const before = serializeProfile(original);
  assert.equal(Buffer.byteLength(before), 903365);
  const current = prepareProfileImport(before);
  const storage = memoryStorage(before);
  for (const part of [...current.components, ...current.connections]) part.notes = 'n'.repeat(2000);
  assert.equal(Buffer.byteLength(JSON.stringify(current, null, 2)), 1203365);
  const error = saveProfile(storage, current);
  assert.match(error, /Current edits have not been saved/);
  assert.doesNotMatch(error, /export your system before leaving/);
  assert.equal(storage.calls.writes, 0);
  assert.equal(storage.raw, before);
  assert.equal(current.components[0].notes.length, 2000);
  assert.deepEqual(restoreProfile(storage).profile, original);
  assert.throws(() => serializeProfile(current), error => error.code === 'size');
  for (const part of [...current.components, ...current.connections]) part.notes = '';
  assert.equal(saveProfile(storage, current), '');
  assert.deepEqual(parseProfile(serializeProfile(current)), current);
});

test('imports preflight compact-to-formatted growth before they can be committed', () => {
  const profile = largeProfile(1000);
  const compact = JSON.stringify(profile);
  assert.equal(Buffer.byteLength(compact), 996723);
  assert.equal(Buffer.byteLength(JSON.stringify(profile, null, 2)), 1053365);
  assert.deepEqual(parseProfile(compact), profile, 'Existing compact saved data remains readable');
  assert.throws(() => prepareProfileImport(compact), error => error.code === 'normalized-size' && error.message.includes('current system has been kept'));
  const storage = memoryStorage(compact);
  const restored = restoreProfile(storage);
  assert.equal(restored.recovery, null);
  assert.deepEqual(restored.profile, profile);
  assert.match(saveProfile(storage, restored.profile), /exceeds 1 MiB/);
  assert.equal(storage.raw, compact);
  assert.equal(storage.calls.writes, 0);
});

test('imports include schema defaults in the normalized size preflight', () => {
  const profile = profileAtBytes(MAX_IMPORT_BYTES + 20);
  for (const part of [...profile.components, ...profile.connections]) delete part.goals;
  const raw = JSON.stringify(profile, null, 2);
  assert.ok(Buffer.byteLength(raw) < MAX_IMPORT_BYTES);
  const parsed = parseProfile(raw);
  assert.equal(Buffer.byteLength(JSON.stringify(parsed, null, 2)), MAX_IMPORT_BYTES + 20);
  assert.throws(() => prepareProfileImport(raw), error => error.code === 'normalized-size');
});

test('schema rejection and browser-write failures have distinct errors without replacing prior data', () => {
  const previous = serializeProfile(newProfile());
  const storage = memoryStorage(previous);
  const invalid = { ...newProfile(), version: 2 };
  assert.match(saveProfile(storage, invalid), /invalid fields/);
  assert.equal(storage.calls.writes, 0);
  assert.equal(storage.raw, previous);
  const unavailable = { getItem: storage.getItem.bind(storage), setItem() { throw new Error('quota'); } };
  assert.match(saveProfile(unavailable, newProfile()), /Browser saving is unavailable/);
  assert.equal(storage.raw, previous);
});

test('unreadable raw data stays protected through edits, removal, undo and valid imports', () => {
  const oversized = JSON.stringify(largeProfile(2000), null, 2);
  const invalidShape = JSON.stringify({ ...newProfile(), unrelated: true });
  const unsupported = JSON.stringify({ ...newProfile(), version: 2 });
  for (const raw of ['', '{broken', unsupported, invalidShape, oversized]) {
    const storage = memoryStorage(raw);
    const restored = restoreProfile(storage);
    assert.equal(restored.recovery.kind, 'unreadable');
    assert.equal(restored.recovery.raw, raw);
    assert.equal(storage.calls.writes, 0, 'Restore never writes');
    const edited = restored.profile;
    edited.name = 'First edit after failed restore';
    const snapshot = removalSnapshot(edited, edited.components[0].id, 'component');
    const removed = removeComponent(edited, edited.components[0].id);
    const undone = undoRemoval(removed, snapshot);
    const imported = prepareProfileImport(serializeProfile(newProfile()));
    for (const current of [edited, removed, undone, imported]) {
      assert.match(saveProfile(storage, current, restored.recovery), /Automatic saving is paused/);
      assert.equal(storage.raw, raw);
      assert.equal(storage.calls.writes, 0);
    }
    assert.equal(restored.recovery.raw, raw, 'Recovery download content remains available unchanged');
    assert.equal(storage.calls.writes, 0, 'Preparing or reading recovery data does not authorize replacement');
  }
});

test('explicit replacement rejects invalid data and failed writes while retaining recovery', () => {
  const storage = memoryStorage('{broken');
  const recovery = restoreProfile(storage).recovery;
  assert.match(replaceSavedProfile(storage, largeProfile(2000), recovery), /exceeds 1 MiB/);
  assert.match(replaceSavedProfile(storage, { ...newProfile(), version: 2 }, recovery), /invalid fields/);
  assert.equal(storage.calls.writes, 0);
  const unavailable = { getItem: storage.getItem.bind(storage), setItem() { throw new Error('write failed'); } };
  assert.match(replaceSavedProfile(unavailable, newProfile(), recovery), /Browser saving is unavailable/);
  assert.equal(storage.raw, '{broken');
  assert.equal(recovery.raw, '{broken');
  assert.match(saveProfile(storage, newProfile(), recovery), /Automatic saving is paused/);
  const replacement = newProfile(); replacement.name = 'Explicit replacement';
  assert.equal(replaceSavedProfile(storage, replacement, recovery), '');
  assert.deepEqual(restoreProfile(storage).profile, replacement);
  assert.equal(storage.calls.writes, 1);
});

test('read failures prohibit writes and replacement until storage can be read', () => {
  let writes = 0;
  const failedRead = { getItem() { throw new Error('read failed'); }, setItem() { writes++; } };
  const restored = restoreProfile(failedRead);
  assert.equal(restored.recovery.kind, 'read-error');
  assert.equal(restored.recovery.raw, null);
  const edited = restored.profile; edited.name = 'Unsaved work';
  assert.match(saveProfile(failedRead, edited, restored.recovery), /Retry reading/);
  assert.match(replaceSavedProfile(failedRead, edited, restored.recovery), /Read the saved data successfully/);
  assert.equal(writes, 0);
  assert.equal(retryProfileRead(failedRead).recovery.kind, 'read-error');
  assert.equal(writes, 0);
});

test('a successful read retry protects an existing valid copy without replacing in-memory edits', () => {
  const saved = newProfile(); saved.name = 'Stored work';
  const raw = serializeProfile(saved);
  const storage = memoryStorage(raw);
  const current = newProfile(); current.name = 'Unsaved work';
  const retried = retryProfileRead(storage);
  assert.equal(retried.recovery.kind, 'saved-copy');
  assert.equal(retried.recovery.raw, raw);
  assert.equal(current.name, 'Unsaved work');
  assert.match(saveProfile(storage, current, retried.recovery), /Automatic saving is paused/);
  assert.equal(storage.raw, raw);
  assert.equal(storage.calls.writes, 0);
  assert.equal(replaceSavedProfile(storage, current, retried.recovery), '');
  assert.deepEqual(restoreProfile(storage).profile, current);
});

test('read retry distinguishes an absent key from an unreadable saved value', () => {
  const empty = memoryStorage();
  const checked = retryProfileRead(empty);
  assert.equal(checked.recovery, null);
  assert.equal(checked.raw, null);
  assert.equal(empty.calls.writes, 0);
  assert.equal(saveProfile(empty, newProfile(), checked.recovery), '');
  const broken = memoryStorage('');
  assert.equal(retryProfileRead(broken).recovery.kind, 'unreadable');
  assert.equal(broken.calls.writes, 0);
});
