/**
 * Opens an HTML string in a new browser tab.
 * If popup is blocked and downloadFilename is provided, falls back to file download.
 */
export const openDocumentWindow = (html, downloadFilename) => {
  const w = window.open('', '_blank');
  if (w) {
    w.document.write(html);
    w.document.close();
  } else if (downloadFilename) {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    alert('Document downloaded as HTML file. Open it in your browser to view and print.');
  }
  return w;
};
