/**
 * Calculation helper utilities to simplify repeated calculation patterns
 * Provides convenient wrappers around the core calculation functions
 */

import { calcTotals } from './calculations.js';
import { calcIBeam } from './helpers.js';

/**
 * Calculation helper utilities
 * @namespace CalcHelpers
 */
export const CalcHelpers = {
  /**
   * Calculate quote totals with all required parameters
   * Eliminates the need to spread quote and customer objects
   * @param {Object} quote - Quote object with dimensions, services, etc.
   * @param {Object} customer - Customer object with site address, contact info
   * @param {Object} materials - Materials pricing data
   * @param {Object} services - Services catalog
   * @param {Object} sewerPricing - Sewer type pricing
   * @param {Object} patioPricing - Patio size pricing
   * @param {Object} driveRates - Drive time rates
   * @param {Object} foundationPricing - Foundation type pricing
   * @returns {Object} Calculated totals including materials, services, taxes, contingency
   */
  calculateQuoteTotals: (quote, customer, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, pcRates) => {
    // Merge quote and customer for calculation (original pattern from monolithic file)
    const mergedData = { ...quote, ...customer };
    return calcTotals(
      mergedData,
      materials,
      services,
      sewerPricing,
      patioPricing,
      driveRates,
      foundationPricing,
      pcRates
    );
  },

  /**
   * Get I-beam height for a quote, with fallback calculation based on house length
   * @param {Object} quote - Quote object
   * @returns {number} I-beam height in inches (10" or 12")
   */
  getBeamHeight: (quote) =>
    quote?.iBeamHeight || calcIBeam(parseFloat(quote?.houseLength) || 56)
};
