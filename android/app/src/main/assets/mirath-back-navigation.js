(() => {
  if (window !== window.top || window.__mirathAndroidBack) return;
  const key = '__mirathAndroidBackIndex';
  const h = window.history;
  const index = () => Number.isSafeInteger(h.state?.[key]) && h.state[key] >= 0 ? h.state[key] : 0;
  const tagged = (state, value) => ({ ...(state && typeof state === 'object' ? state : {}), [key]: value });
  const push = h.pushState;
  const replace = h.replaceState;
  // Keep Next's state fields intact. The counter belongs to a history entry,
  // so browser pop/forward and native Back share the same cursor.
  replace.call(h, tagged(h.state, index()), '', location.href);
  h.pushState = function (state, ...args) {
    return push.call(this, tagged(state, index() + 1), ...args);
  };
  h.replaceState = function (state, ...args) {
    return replace.call(this, tagged(state, index()), ...args);
  };
  window.__mirathAndroidBack = {
    handle() {
      const layer = Array.from(document.querySelectorAll('[role=dialog][data-state=open],[role=alertdialog][data-state=open],[role=menu][data-state=open],[role=listbox][data-state=open]'))
        .some(el => el.getClientRects().length > 0);
      if (layer) {
        (document.activeElement || document).dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Escape', code: 'Escape', bubbles: true, cancelable: true,
        }));
        return 'dismissed';
      }
      if (index() > 0) { h.back(); return 'navigated'; }
      return location.pathname === '/' && !location.search && !location.hash ? 'root' : 'page';
    },
  };
})();
