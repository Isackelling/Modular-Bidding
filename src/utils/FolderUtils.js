/**
 * Folder and file management utilities
 * Standardized file object creation and folder structure initialization
 */

import { genId } from './helpers.js';

/**
 * Folder and file management utilities
 * @namespace FolderUtils
 */
export const FolderUtils = {
  /**
   * Default folder structure for quotes/contracts
   * @type {Object}
   */
  DEFAULT_FOLDERS: {
    clayton_docs: [],
    crew_files: [],
    estimates: [],
    permits: [],
    change_orders: [],
    contracts: []
  },

  /**
   * Get folders from quote with defaults for missing folders
   * @param {Object} quote - Quote or contract object
   * @returns {Object} Folder structure with all default folders
   */
  getFolders: (quote) => ({
    ...FolderUtils.DEFAULT_FOLDERS,
    ...(quote?.folders || {})
  }),

  /**
   * Create standardized file object
   * @param {string} name - File name
   * @param {string} type - File type (pdf, image, link, etc.)
   * @param {string} url - File URL or data URL
   * @param {string} [notes=''] - Optional notes about the file
   * @param {string} [userName=''] - User who added the file
   * @returns {Object} File object with id, timestamps, and metadata
   */
  createFileObject: (name, type, url, notes = '', userName = '') => ({
    id: genId(),
    name,
    type,
    url,
    notes,
    addedBy: userName,
    addedAt: new Date().toISOString()
  })
};
