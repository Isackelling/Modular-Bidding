/**
 * Validation utilities for form inputs and data integrity
 * Centralized validation patterns with consistent error messages
 */

/**
 * Form validation utilities
 * @namespace Validators
 */
export const Validators = {
  /**
   * Validate that a value is not empty
   * @param {*} value - Value to validate
   * @param {string} fieldName - Name of field for error message
   * @throws {Error} If value is empty or whitespace
   */
  required: (value, fieldName) => {
    if (!value || value.toString().trim() === '') {
      throw new Error(`${fieldName} is required`);
    }
  },

  /**
   * Validate email and check for duplicates
   * @param {string} email - Email address to validate
   * @param {Array} existingItems - Array of existing items to check against
   * @param {string} [excludeId=null] - ID to exclude from duplicate check (for edits)
   * @param {string} [fieldName='email'] - Field name in items to check
   * @throws {Error} If duplicate email found
   */
  email: (email, existingItems, excludeId = null, fieldName = 'email') => {
    const duplicate = existingItems.find(item =>
      item[fieldName] === email && item.id !== excludeId
    );
    if (duplicate) {
      throw new Error(
        `Duplicate ${fieldName}: ${duplicate.firstName} ${duplicate.lastName} (${email})`
      );
    }
  },

  /**
   * Validate phone and check for duplicates
   * @param {string} phone - Phone number to validate
   * @param {Array} existingItems - Array of existing items to check against
   * @param {string} [excludeId=null] - ID to exclude from duplicate check (for edits)
   * @param {string} [fieldName='phone'] - Field name in items to check
   * @throws {Error} If duplicate phone found
   */
  phone: (phone, existingItems, excludeId = null, fieldName = 'phone') => {
    const duplicate = existingItems.find(item =>
      item[fieldName] === phone && item.id !== excludeId
    );
    if (duplicate) {
      throw new Error(
        `Duplicate ${fieldName}: ${duplicate.firstName} ${duplicate.lastName} (${phone})`
      );
    }
  },

  /**
   * Validate file size
   * @param {File} file - File object to validate
   * @param {number} [maxMB=50] - Maximum file size in megabytes
   * @throws {Error} If file exceeds size limit
   */
  fileSize: (file, maxMB = 50) => {
    const maxBytes = maxMB * 1024 * 1024;
    if (file.size > maxBytes) {
      throw new Error(`File "${file.name}" exceeds ${maxMB}MB limit`);
    }
  }
};
