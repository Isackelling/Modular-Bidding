/**
 * Document generation utilities for consistent formatting across all generated documents
 * Centralizes date formatting, quote numbers, home descriptions, and base styles
 */

/**
 * Document generation utilities
 * @namespace DocumentUtils
 */
export const DocumentUtils = {
  /**
   * Format date consistently across all documents
   * @param {Date} [date=new Date()] - Date to format
   * @returns {string} Formatted date string (e.g., "February 9, 2026")
   */
  formatDate: (date = new Date()) =>
    date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),

  /**
   * Extract quote number from quote ID
   * @param {Object} quote - Quote object with id property
   * @returns {string} Last 8 characters of ID in uppercase, or 'DRAFT' if no ID
   */
  getQuoteNum: (quote) => quote?.id?.slice(-8).toUpperCase() || 'DRAFT',

  /**
   * Get home description from quote (model name or dimensions)
   * @param {Object} quote - Quote object
   * @returns {string} Home model name or dimensions (e.g., "Aiden 56x28" or "56' × 28'")
   */
  getHomeDesc: (quote) =>
    quote?.homeModel && quote.homeModel !== 'NONE'
      ? quote.homeModel
      : `${quote?.houseWidth || ''}' × ${quote?.houseLength || ''}'`,

  /**
   * Get base CSS styles for generated documents
   * @param {string} [maxWidth='850px'] - Maximum width for document body
   * @returns {string} CSS string with base document styles
   */
  getBaseStyles: (maxWidth = '850px') => `
    body{font-family:'Segoe UI',Arial,sans-serif;padding:40px;max-width:${maxWidth};margin:0 auto;color:#333;line-height:1.6}
    .header{border-bottom:3px solid #2c5530;padding-bottom:20px;margin-bottom:30px;display:flex;justify-content:space-between;align-items:flex-start}
    .section{margin-bottom:25px;padding:15px;background:#f8f9fa;border-radius:8px}
    .section-title{font-size:18px;font-weight:600;color:#2c5530;margin-bottom:10px;border-bottom:2px solid #2c5530;padding-bottom:5px}
    table{width:100%;border-collapse:collapse;margin:10px 0}
    th,td{padding:10px;text-align:left;border-bottom:1px solid #ddd}
    th{background:#2c5530;color:white;font-weight:600}
    tr:hover{background:#f5f5f5}
  `,
};
