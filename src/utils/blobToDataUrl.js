/**
 * Convert blob to data URL with proper error handling
 * Eliminates duplicate FileReader patterns throughout the codebase
 */

/**
 * Convert a Blob to a data URL
 * @param {Blob} blob - Blob object to convert
 * @param {string|null} [fileName=null] - Optional filename for error messages
 * @returns {Promise<string>} Data URL string
 * @throws {Error} If file read fails or is aborted
 */
export const blobToDataUrl = (blob, fileName = null) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Failed to read file${fileName ? ': ' + fileName : ''}`));
    reader.onabort = () => reject(new Error(`File read was aborted${fileName ? ': ' + fileName : ''}`));
    reader.readAsDataURL(blob);
  });
};
