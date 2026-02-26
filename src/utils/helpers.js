/**
 * General helper utilities used throughout the application
 */

/**
 * Generate unique ID using timestamp and random string
 * @returns {string} Unique ID
 */
export const genId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

/**
 * Get Google Maps URL from Sherman office to site address
 * @param {string} addr - Street address
 * @param {string} city - City name
 * @param {string} state - State abbreviation
 * @param {string} zip - ZIP code
 * @returns {string|null} Google Maps directions URL or null if address incomplete
 */
export const getGoogleMapsUrl = (addr, city, state, zip) => {
  // SHERMAN constant will need to be imported where this is used
  const SHERMAN_ADDRESS = '28933 County 4, Mora, MN 55051';
  const dest = [addr, city, state, zip].filter(Boolean).join(', ');
  return dest.length > 3
    ? `https://www.google.com/maps/dir/${encodeURIComponent(SHERMAN_ADDRESS)}/${encodeURIComponent(dest)}`
    : null;
};

/**
 * Calculate I-beam height based on house length
 * @param {number} len - House length in feet
 * @returns {number} I-beam height in inches (10" or 12")
 */
export const calcIBeam = len => len < 56 ? 10 : 12;

/**
 * Calculate perimeter from width and length
 * @param {number} w - Width in feet
 * @param {number} l - Length in feet
 * @returns {number} Perimeter in feet
 */
export const calcPerim = (w, l) => (parseFloat(w) + parseFloat(l)) * 2;

/**
 * Calculate floor quantity needed
 * @param {number} w - Width in feet
 * @param {number} l - Length in feet
 * @returns {number} Floor quantity (rounded up)
 */
export const calcFloorQty = (w, l) => Math.ceil((((w * 12) / 39) * l) / 100);

/**
 * Format number as currency (e.g., "$12,345")
 * @param {number} num - Number to format
 * @returns {string} Formatted currency string
 */
export const fmt = (num) => {
  const n = parseFloat(num) || 0;
  return '$' + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/** Alias for fmt — currency with no decimal places */
export const fmtCurrency = fmt;

/** Currency with two decimal places (e.g., "$12,345.67") */
export const fmtDec = (num) => {
  const n = parseFloat(num) || 0;
  return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/** Format date as "Jan 1, 2025" */
export const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

/** Format date + time as "Jan 1, 2025, 02:30 PM" */
export const fmtDateTime = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

/** Strip all non-digit characters from a phone string */
export const normalizePhone = (phone) => phone ? phone.replace(/\D/g, '') : '';

/** Lowercase + trim an email string */
export const normalizeEmail = (email) => email ? email.toLowerCase().trim() : '';
