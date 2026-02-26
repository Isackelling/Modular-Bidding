/**
 * test-mocks.js
 * Mock data generators for the Sherman Bidding System.
 *
 * Used by:
 *   - playwright-starter.js (automated browser tests)
 *   - Manual testing reference (copy values from here)
 *   - Claude Code when constructing test scenarios during audits
 *
 * IMPORTANT: Keep this file in sync with emptyQuote() in src/App.jsx.
 * If a field is added to emptyQuote(), add it here too.
 */

// ─────────────────────────────────────────────────────────────────────────────
// APP CREDENTIALS (for test login)
// ─────────────────────────────────────────────────────────────────────────────

export const CREDENTIALS = {
  admin: {
    username: 'SHERMAN',
    password: 'BIDDING'
  },
  customer: {
    // Customer portal password is always 'mybid'
    // Combined with customer firstName+lastName (no spaces, case-insensitive)
    // e.g., password field = 'mybid', name field = 'testcustomer'
    portalPassword: 'mybid'
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// MOCK CUSTOMER
// ─────────────────────────────────────────────────────────────────────────────

export function createMockCustomer(overrides = {}) {
  return {
    firstName: 'Test',
    lastName: 'Customer',
    phone: '507-555-0100',
    email: 'test.customer@example.com',
    siteAddress: '123 Oak Street',
    siteCity: 'Rochester',
    siteState: 'MN',
    siteZip: '55901',
    siteCounty: 'Olmsted',
    // Optional secondary contact
    person2FirstName: '',
    person2LastName: '',
    phone2: '',
    email2: '',
    // Optional mailing address
    mailingAddress: '',
    mailingCity: '',
    mailingState: '',
    mailingZip: '',
    ...overrides
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK QUOTE — Standard modular home with common options
// ─────────────────────────────────────────────────────────────────────────────

export function createMockQuote(overrides = {}) {
  return {
    // House
    homeModel: 'LEGEND 43 MOD',
    homeBasePrice: '89900',
    houseWidth: '27',
    houseLength: '43',
    singleDouble: 'Single',
    walkDoors: '2',
    iBeamHeight: '10',
    foundationType: 'none',

    // Site
    sewerType: '2_bed',          // NOT sewerSystem
    wellDepth: '150',             // NOT wellSystem
    patioSize: '8ft',             // NOT patio / patioWidth / patioLength
    driveTime: '45',

    // Services (standard set)
    selectedServices: {
      installation_of_home: true,
      drywall: true,
      painting: true,
      carpet: true,
      dumpster: true,
      siding_install: true,
      interior_trim_out: true,
      permits: true,
      electric_connection: true,
      concrete_skirting: true,
      plumbing: true,
      gas_propane: true,
    },

    // Price overrides (simulating a permit override)
    servicePriceOverrides: {
      permits: '6000'
    },
    serviceQuantities: {},
    serviceDays: {},

    // Notes (draft only — not published)
    serviceNotes: {
      permits: 'Test permit note'
    },
    serviceCrewNotes: {},
    publishedServiceNotes: {},
    publishedServiceCrewNotes: {},
    publishedGeneralCrewNotes: [],
    publishedGeneralCustomerNotes: [],
    generalCrewNote: '',
    generalCustomerNote: '',

    // Special features
    hasLandscaping: false,        // NOT landscaping
    landscapingMaterialCost: '',
    landscapingDays: '',
    hasDeck: false,               // NOT deckProject / hasDeck
    deckMaterialCost: '',
    deckDays: '',

    // Custom items
    customServices: [{ name: 'Solar Panel Prep', price: '5000' }],
    customOptions: [],
    customMaterials: [],

    // Removed items
    removedMaterials: {},
    removedServices: {},

    // Pricing rates (defaults — can be overridden per quote)
    markupRate: 10,
    contingencyRate: 2,

    // Tracking (empty for new quote)
    scrubbCosts: {},
    scrubbDocs: {},
    scrubbHistory: [],
    scrubbPayments: [],
    permitEntries: [],
    addlMaterialEntries: [],
    changeOrderHistory: [],

    // Scope of work (empty = uses auto-generated)
    customScopeContent: {},

    // Folders
    folders: {
      clayton_docs: [],
      crew_files: [],
      estimates: [],
      permits: [],
      change_orders: []
    },

    status: 'Draft',

    ...overrides
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK QUOTE — Basement foundation variant
// ─────────────────────────────────────────────────────────────────────────────

export function createMockQuoteBasement(overrides = {}) {
  return createMockQuote({
    foundationType: 'basement',
    selectedServices: {
      installation_of_home: true,
      drywall: true,
      painting: true,
      carpet: true,
      dumpster: true,
      siding_install: true,
      interior_trim_out: true,
      permits: true,
      electric_connection: true,
      concrete_skirting: true,
      plumbing: true,
      gas_propane: true,
      // Auto-added by basement selection:
      basement_stairs: true,
      water_heater: true,
      furnace: true,
    },
    ...overrides
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK SCRUBB DATA — Simulates mid-project actuals
// ─────────────────────────────────────────────────────────────────────────────

export function createMockScrubbData() {
  return {
    // Actual costs entered (positive variance = under budget = SAVINGS)
    scrubbCosts: {
      permits: 4200,    // Under budget (savings) — variance will be positive
      sewer: 19000,     // Over budget — variance will be negative
      well: 18500,      // Roughly on budget
      gravel_driveway: 3800,
      sand_pad: 2100,
    },

    // Permit entries (tracked separately from scrubbCosts)
    permitEntries: [
      { id: 'pe_001', name: 'Building Permit', cost: 2000 },
      { id: 'pe_002', name: 'Electrical Permit', cost: 500 }
    ],

    // Payments (mix of regular and contingency)
    scrubbPayments: [
      {
        id: 'pmt_001',
        amount: 1500,
        date: '2026-01-15',
        notes: 'Draw for change order',
        isContingencyPayment: true,
        createdAt: '2026-01-15T10:00:00Z',
        createdBy: 'Admin'
      },
      {
        id: 'pmt_002',
        amount: 5000,
        date: '2026-01-20',
        notes: 'Progress payment',
        isContingencyPayment: false,
        createdAt: '2026-01-20T14:00:00Z',
        createdBy: 'Admin'
      }
    ]
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK CHANGE ORDER
// ─────────────────────────────────────────────────────────────────────────────

export function createMockChangeOrder() {
  return {
    changeOrderNum: 1,
    changeOrderVersion: 'a',
    status: 'Draft',
    additions: ['concrete_steps'],
    deletions: ['dumpster'],
    adjustments: { permits: { from: 6000, to: 7000, delta: 1000 } },
    totalChange: 2800,
    contingencyUsed: 2800,
    customerCost: 0,
    createdAt: new Date().toISOString(),
    createdBy: 'Admin'
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMULA VERIFICATION HELPERS
// Used by Claude Code to verify formula consistency across locations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The contingency formula — must be identical in 3 places:
 *   1. ScrubbTab.jsx
 *   2. generateAllowanceProgressDocument()
 *   3. CustomerPortal.jsx renderBudgetTracker()
 *
 * @param {number} startingContingency - total × contingencyRate (e.g., 2%)
 * @param {Array}  allowanceItems       - [{variance: number}] where variance = contractPrice - actualCost
 * @param {Array}  scrubbPayments       - [{amount, isContingencyPayment}]
 * @returns {number} current contingency balance
 */
export function contingencyFormula(startingContingency, allowanceItems, scrubbPayments) {
  const allowanceSavings = allowanceItems
    .filter(item => item.variance > 0)
    .reduce((sum, item) => sum + item.variance, 0);

  const allowanceOverages = allowanceItems
    .filter(item => item.variance < 0)
    .reduce((sum, item) => sum + Math.abs(item.variance), 0);

  const contingencyPaymentsApplied = (scrubbPayments || [])
    .filter(p => p.isContingencyPayment)
    .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  return startingContingency + allowanceSavings - allowanceOverages - contingencyPaymentsApplied;
}

/**
 * Variance sign convention (must be consistent everywhere):
 *   variance = contractPrice - actualCost
 *   Positive = under budget = SAVINGS = adds to contingency
 *   Negative = over budget = OVERAGE = subtracts from contingency
 */
export function calculateVariance(contractPrice, actualCost) {
  return actualCost > 0 ? contractPrice - actualCost : 0;
}
