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
    items.push({
      key: 'patio', name: 'Patio',
      nameWithDetail: `Patio (${quote.patioSize} ft)`,
      description: `${quote.patioSize} wide`,
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
      cost: totals?.svc?.find(s => s.key === 'deck')?.cost || 0,
      customerNote: quote.serviceNotes?.deck || '',
      publishedCustomerNotes: quote.publishedServiceNotes?.deck || [],
      publishedCrewNotes: quote.publishedServiceCrewNotes?.deck || [],
    });
  }
  return items;
};
