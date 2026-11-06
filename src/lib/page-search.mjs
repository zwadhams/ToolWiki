/** Hand a catalog query to Starlight's existing Pagefind dialog. */
export async function openPageSearch(query, trigger) {
  const search = document.querySelector('site-search');
  const opener = search?.querySelector('button[data-open-modal]');
  const dialog = search?.querySelector('dialog');
  const unavailable = 'Full-page search is unavailable. Your catalog search and filters are unchanged.';
  if (!opener || opener.disabled || !dialog) return unavailable;

  const restoreFocus = () => { if (trigger.isConnected) trigger.focus(); };
  dialog.addEventListener('close', restoreFocus, { once: true });
  opener.click();
  if (!dialog.open) return unavailable;
  if (!search.querySelector('#starlight__search')) {
    // Starlight displays its development-index explanation in this dialog.
    return 'Full-page search requires a production build. Your catalog search and filters are unchanged.';
  }

  const input = await new Promise(resolve => {
    const existing = search.querySelector('input');
    if (existing) { resolve(existing); return; }
    const finish = value => {
      observer.disconnect(); clearTimeout(timeout); dialog.removeEventListener('close', cancelled); resolve(value);
    };
    const observer = new MutationObserver(() => {
      const input = search.querySelector('input');
      if (input) finish(input);
    });
    const cancelled = () => finish(null);
    const timeout = setTimeout(() => finish(null), 4000);
    dialog.addEventListener('close', cancelled, { once: true });
    observer.observe(search, { childList: true, subtree: true });
  });
  if (!dialog.open) return 'Your catalog search and filters are unchanged.';
  if (!input) {
    let message = dialog.querySelector('[data-catalog-search-error]');
    if (!message) {
      message = document.createElement('p'); message.dataset.catalogSearchError = '';
      message.setAttribute('role', 'status'); dialog.querySelector('.dialog-frame')?.append(message);
    }
    message.textContent = `${unavailable} Close this dialog and try again.`;
    return unavailable;
  }
  dialog.querySelector('[data-catalog-search-error]')?.remove();
  input.value = query;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.focus();
  return 'Full-page search includes the tool notes and guides. Your catalog filters are unchanged.';
}
