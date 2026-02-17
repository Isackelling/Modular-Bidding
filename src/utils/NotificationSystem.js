/**
 * Consistent notification system to replace scattered alert patterns
 * Provides uniform UI feedback with emoji indicators
 */

export const NotificationSystem = {
  /**
   * Show success notification
   * @param {string} message - Success message to display
   */
  success: (message) => alert(`✅ ${message}`),

  /**
   * Show error notification
   * @param {string} message - Error message to display
   */
  error: (message) => alert(`❌ ${message}`),

  /**
   * Show warning notification
   * @param {string} message - Warning message to display
   */
  warning: (message) => alert(`⚠️ ${message}`),

  /**
   * Show info notification
   * @param {string} message - Info message to display
   */
  info: (message) => alert(`ℹ️ ${message}`),

  // Specific notifications for common scenarios

  /**
   * Notify that a file was saved successfully
   * @param {string} fileName - Name of the file saved
   * @param {string} location - Where the file was saved
   */
  fileSaved: (fileName, location) =>
    NotificationSystem.success(`${fileName} saved to ${location}!`),

  /**
   * Show duplicate error with details
   * @param {string} type - Type of duplicate (email, phone, etc.)
   * @param {string} name - Name of the duplicate item
   * @param {string} value - Duplicate value
   */
  duplicateError: (type, name, value) =>
    NotificationSystem.error(
      `DUPLICATE ${type.toUpperCase()}\n\n👤 ${name}\n${value}\n\nCannot save this duplicate. Please use a different ${type}.`
    )
};
