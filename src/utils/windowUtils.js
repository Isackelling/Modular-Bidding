/**
 * Opens an HTML string in a new browser tab.
 * Centralizes the repeated window.open / document.write pattern.
 */
export const openDocumentWindow = (html) => {
  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); }
  return w;
};
