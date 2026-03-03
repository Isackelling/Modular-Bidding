// ─── Shared print bar + editable field utilities ─────────────────────────────
// Inject PRINT_STYLES into each document's <style> block.
// Use PRINT_BAR (read-only docs) or PRINT_BAR_EDITABLE (docs with blank fields).
export const PRINT_STYLES = `
  .print-bar{position:fixed;top:14px;right:18px;z-index:999;display:flex;align-items:center;gap:10px}
  .print-bar button{background:#2c5530;color:#fff;border:none;padding:9px 20px;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.25)}
  .print-bar button:hover{background:#1b3a20}
  .print-hint{font-size:12px;color:#444;background:#fff;padding:5px 10px;border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,.15)}
  .editable{cursor:text;background:transparent;transition:background .15s;min-height:1.1em;display:inline-block;border-bottom:1px solid #aaa}
  .editable:hover{background:#fffde7;border-radius:3px}
  .editable:focus{outline:2px solid #2c5530;background:#f0fff0;border-radius:3px}
  @media print{.print-bar{display:none!important}}
`;
export const PRINT_BAR = `<div class="print-bar"><button onclick="window.print()">🖨 Print / Save PDF</button></div>`;
export const PRINT_BAR_EDITABLE = `<div class="print-bar"><button onclick="window.print()">🖨 Print / Save PDF</button><span class="print-hint">Click any underlined field to edit</span></div>`;
// Inline editable blank — use inside template literals where ___ would appear
export const eb = (width = 120) => `<span class="editable" contenteditable="true" spellcheck="false" style="min-width:${width}px">&nbsp;</span>`;

// ─── Re-export everything document generators commonly need ───────────────────
// Re-export everything document generators commonly need
export { ALLOWANCE_ITEMS, SUMMARY_SERVICES, PIER_SPECS, HOME_OPTIONS, LICENSED_SERVICES, DEFAULT_SERVICES, DEFAULT_MATERIALS, DEFAULT_SEWER, DEFAULT_PATIO, DEFAULT_FOUNDATION, DRIVE_RATE_INSTALL, DRIVE_RATE_SERVICE, DRIVE_RATE_PC, DRIVE_RATE_INSPECTION, MIN_MILES, COMPANY } from '../../constants/index.js';
export { calcIBeam, fmt, fmtCurrency, formatPhone } from '../helpers.js';
export { calcTotals } from '../calculations.js';
export { DocumentUtils } from '../DocumentUtils.js';
export { getServiceDescription } from '../serviceDescriptions.js';

// --- Shared document helpers ---

import { calcTotals } from '../calculations.js';
import { DEFAULT_MATERIALS, DEFAULT_SERVICES, DEFAULT_SEWER, DEFAULT_PATIO, DEFAULT_FOUNDATION,
  DRIVE_RATE_INSTALL, DRIVE_RATE_SERVICE, DRIVE_RATE_PC, DRIVE_RATE_INSPECTION } from '../../constants/index.js';

/** calcTotals with all default pricing args pre-filled */
export const calcTotalsWithDefaults = (quote, services) =>
  calcTotals(
    quote, DEFAULT_MATERIALS, services || DEFAULT_SERVICES, DEFAULT_SEWER, DEFAULT_PATIO,
    { install: DRIVE_RATE_INSTALL, service: DRIVE_RATE_SERVICE, projectCommand: DRIVE_RATE_PC, inspection: DRIVE_RATE_INSPECTION },
    DEFAULT_FOUNDATION
  );

/** Format an ISO date string to "Feb 9, 2026, 2:30 PM" style */
export const formatNoteDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
};

/** Foundation labels for documents (longer than UI labels in labelMaps.js) */
export const FOUNDATION_LABELS_FULL = {
  slab: 'Concrete Slab Foundation',
  crawlspace: 'Crawl Space Foundation',
  basement: 'Full Basement Foundation',
};
export const getFoundationName = (type) => FOUNDATION_LABELS_FULL[type] || 'None';

/** Build service data superset from a service key */
export const buildServiceData = (key, quote, services, totals) => {
  const service = services[key];
  const svcCost = totals?.svc?.find(s => s.key === key);
  return {
    key,
    name: service?.name || key,
    description: service?.description || '',
    customerNote: quote.serviceNotes?.[key] || '',
    publishedCustomerNotes: quote.publishedServiceNotes?.[key] || [],
    publishedCrewNotes: quote.publishedServiceCrewNotes?.[key] || [],
    cost: svcCost?.cost || 0,
    quantity: quote.serviceQuantities?.[key] || '',
    days: quote.serviceDays?.[key] || '',
  };
};

/** Collect "other services" (sewer/well/patio/landscaping/deck) from quote-level fields */
export const collectOtherServices = (quote, totals) => {
  const items = [];
  if (quote.sewerType && quote.sewerType !== 'none') {
    items.push({
      key: 'sewer', name: 'Sewer System',
      nameWithDetail: `Sewer System (${quote.sewerType.replace('_', ' ')})`,
      description: quote.sewerType,
      cost: totals?.svc?.find(s => s.key === 'sewer')?.cost || 0,
      customerNote: quote.serviceNotes?.sewer || '',
      publishedCustomerNotes: quote.publishedServiceNotes?.sewer || [],
      publishedCrewNotes: quote.publishedServiceCrewNotes?.sewer || [],
    });
  }
  if (quote.wellDepth && parseFloat(quote.wellDepth) > 0) {
    items.push({
      key: 'well', name: 'Well System',
      nameWithDetail: `Well Drilling (${quote.wellDepth} ft)`,
      description: `${quote.wellDepth} ft deep`,
      cost: totals?.svc?.find(s => s.key === 'well')?.cost || 0,
      customerNote: quote.serviceNotes?.well || '',
      publishedCustomerNotes: quote.publishedServiceNotes?.well || [],
      publishedCrewNotes: quote.publishedServiceCrewNotes?.well || [],
    });
  }
  if (quote.patioSize && quote.patioSize !== 'none') {
    const homeWidth = quote.houseWidth ? `${quote.houseWidth}'` : null;
    items.push({
      key: 'patio', name: 'Gable Roof Extension Patio',
      nameWithDetail: `Gable Roof Extension Patio (6-10' deep${homeWidth ? ` x ${homeWidth} wide` : ''})`,
      description: homeWidth
        ? `6-10' deep gable roof extension patio spanning the full ${homeWidth} width of your home — exact depth reflects the home selected`
        : `6-10' deep gable roof extension patio spanning the full width of your home — exact depth reflects the home selected`,
      cost: totals?.svc?.find(s => s.key === 'patio')?.cost || 0,
      customerNote: quote.serviceNotes?.patio || '',
      publishedCustomerNotes: quote.publishedServiceNotes?.patio || [],
      publishedCrewNotes: quote.publishedServiceCrewNotes?.patio || [],
    });
  }
  if (quote.hasLandscaping) {
    items.push({
      key: 'landscaping', name: 'Landscaping', nameWithDetail: 'Landscaping',
      description: 'Landscaping services',
      days: quote.landscapingDays || null,
      cost: totals?.svc?.find(s => s.key === 'landscaping')?.cost || 0,
      customerNote: quote.serviceNotes?.landscaping || '',
      publishedCustomerNotes: quote.publishedServiceNotes?.landscaping || [],
      publishedCrewNotes: quote.publishedServiceCrewNotes?.landscaping || [],
    });
  }
  if (quote.hasDeck) {
    items.push({
      key: 'deck', name: 'Deck Project', nameWithDetail: 'Deck',
      description: 'Deck construction services',
      days: quote.deckDays || null,
      cost: totals?.svc?.find(s => s.key === 'deck')?.cost || 0,
      customerNote: quote.serviceNotes?.deck || '',
      publishedCustomerNotes: quote.publishedServiceNotes?.deck || [],
      publishedCrewNotes: quote.publishedServiceCrewNotes?.deck || [],
    });
  }
  return items;
};
