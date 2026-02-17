/**
 * Testing and debugging helper utilities
 * Mock data generators, performance profiling, and validation helpers
 */

import { genId } from './helpers.js';

/**
 * Testing and debugging utilities
 * @namespace TestHelpers
 */
export const TestHelpers = {
  /**
   * Create mock quote object for testing
   * @param {Object} overrides - Properties to override in mock quote
   * @returns {Object} Mock quote object with realistic data
   */
  createMockQuote: (overrides = {}) => ({
    id: genId(),
    customerId: 'customer_' + genId(),
    houseWidth: 28,
    houseLength: 56,
    homeModel: 'Aiden 56x28',
    singleDouble: 'Double',
    foundationType: 'slab',
    selectedServices: {
      site_prep: true,
      excavation: true,
      installation_of_home: true
    },
    status: 'Draft',
    createdAt: new Date().toISOString(),
    createdBy: 'TEST_USER',
    ...overrides
  }),

  /**
   * Create mock customer object for testing
   * @param {Object} overrides - Properties to override in mock customer
   * @returns {Object} Mock customer object with realistic data
   */
  createMockCustomer: (overrides = {}) => ({
    id: genId(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '320-555-1234',
    siteAddress: '123 Main St',
    siteCity: 'Mora',
    siteState: 'MN',
    siteZip: '55051',
    siteCounty: 'Kanabec',
    createdAt: new Date().toISOString(),
    createdBy: 'TEST_USER',
    ...overrides
  }),

  /**
   * Log component state for debugging
   * @param {string} componentName - Name of component for log prefix
   * @param {Object} state - State object to log
   */
  logState: (componentName, state) => {
    console.group(`[${componentName}] State`);
    console.table(state);
    console.groupEnd();
  },

  /**
   * Measure function execution time
   * @param {Function} fn - Function to measure
   * @param {string} [label='Function'] - Label for timing log
   * @returns {*} Result of function execution
   */
  measureTime: (fn, label = 'Function') => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`⏱️ ${label} took ${(end - start).toFixed(2)}ms`);
    return result;
  },

  /**
   * Validate quote data structure
   * @param {Object} quote - Quote object to validate
   * @returns {Object} Validation result with isValid boolean and errors array
   */
  validateQuote: (quote) => {
    const errors = [];
    if (!quote.id) errors.push('Missing id');
    if (!quote.customerId) errors.push('Missing customerId');
    if (!quote.houseWidth || !quote.houseLength) errors.push('Missing dimensions');
    if (!quote.foundationType) errors.push('Missing foundation type');

    return {
      isValid: errors.length === 0,
      errors
    };
  }
};
