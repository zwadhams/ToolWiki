/** Build copyable text from one fetched record, retaining its own citation. */
export function documentCopy(record, expectedId, expectedRevision) {
  if (record.id !== expectedId || record.revision !== expectedRevision) {
    throw new Error('This page changed since it was loaded. Reload the page and try again.');
  }
  if (typeof record.markdown !== 'string' || !/^[a-f0-9]{64}$/.test(record.revision)) {
    throw new Error('The document record could not be read. Open the Markdown link instead.');
  }
  return `${record.markdown}\nContent revision: ${record.revision}\n`;
}
