/**
 * Factory function to create state saver with error handling
 * Unified state persistence pattern for quotes, contracts, customers, users
 */

/**
 * Create a state saver function that persists to storage and updates React state
 * @param {string} storageKey - Key for localStorage/storage
 * @param {Function} setState - React setState function
 * @returns {Function} Async function that saves data to storage and state
 */
export const createStateSaver = (storageKey, setState) => {
  return async (data) => {
    try {
      await window.storage.set(storageKey, JSON.stringify(data));
      setState(data);
    } catch (error) {
      console.error(`Failed to save ${storageKey}:`, error);
      throw error;
    }
  };
};
