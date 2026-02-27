/**
 * Lookup maps for label/color conversions.
 * Replace nested ternary chains with getLabel(MAP, key).
 */

export const FOUNDATION_LABELS = {
  slab: 'Engineered Slab',
  basement: 'Basement',
  crawlspace: 'Crawl Space',
};

/** Status badge background colors */
export const STATUS_BG = {
  Completed: '#198754',
  'Under Contract': '#0d6efd',
  Accepted: '#d1e7dd',
  Draft: '#fff3cd',
  Declined: '#f8d7da',
};

/** Status badge text colors */
export const STATUS_TEXT = {
  Completed: '#fff',
  'Under Contract': '#fff',
  Accepted: '#0f5132',
  Draft: '#664d03',
  Declined: '#842029',
};

/** Change order status badge backgrounds */
export const CO_STATUS_BG = {
  Signed: '#d1e7dd',
  Draft: '#fff3cd',
  Sent: '#cfe2ff',
};

/** Change order status badge text colors */
export const CO_STATUS_TEXT = {
  Signed: '#0f5132',
  Draft: '#664d03',
  Sent: '#084298',
};

/**
 * Safely looks up a value in a map, returning a fallback if the key isn't found.
 * @param {Object} map - Lookup object
 * @param {string} key - Key to look up
 * @param {*} fallback - Default value (default: 'None')
 */
export const getLabel = (map, key, fallback = 'None') => map[key] ?? fallback;
