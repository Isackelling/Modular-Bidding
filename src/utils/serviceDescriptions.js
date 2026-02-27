/**
 * Returns a description string for a given service key and quote.
 * Used by both the quote form UI and document generators.
 */
export const getServiceDescription = (key, quote) => {
  const w = parseFloat(quote.houseWidth) || 0;
  const l = parseFloat(quote.houseLength) || 0;

  switch (key) {
    case 'siding_install': {
      const base = 'Gable 1 and Gable 2, soffits, fascial';
      const hasPatio = quote.patioSize && quote.patioSize !== 'none';
      return hasPatio ? `${base}, ceiling soffit and trims` : base;
    }
    case 'interior_trim_out':
      return 'Includes doors, jams, stops, base, casements, etc.';

    case 'gravel_driveway': {
      const dims = quote.serviceDimensions?.gravel_driveway || {};
      if (dims.length && dims.width) return `${dims.length}' x ${dims.width}'`;
      return '';
    }
    case 'sand_pad': {
      if (w > 0 && l > 0) return `${w + 10}' x ${l + 10}'`;
      return '';
    }
    case 'surfaced_driveway': {
      const dims = quote.serviceDimensions?.surfaced_driveway || {};
      const depth = dims.depth || '4';
      if (dims.length && dims.width) return `${dims.length}' x ${dims.width}' x ${depth}"`;
      return '';
    }
    case 'surfaced_sidewalks': {
      const dims = quote.serviceDimensions?.surfaced_sidewalks || {};
      const depth = dims.depth || '4';
      if (dims.length && dims.width) return `${dims.length}' x ${dims.width}' x ${depth}"`;
      return '';
    }
    case 'culvert': {
      const dims = quote.serviceDimensions?.culvert || {};
      if (dims.length) return `${dims.length} ft`;
      return '';
    }
    case 'landscaping':
      return quote.serviceDescriptions?.landscaping || '';
    case 'deck':
      return quote.serviceDescriptions?.deck || '';

    default:
      return '';
  }
};

/** Price-per-sqft rates for surfaced driveway by depth (inches) */
export const SURFACED_DRIVEWAY_RATES = { '4': 9.25, '5': 10.00, '6': 10.50 };

/** Calculate surfaced price from dimensions for a given service key */
export const calcSurfacedPrice = (quote, key) => {
  const dims = quote.serviceDimensions?.[key] || {};
  const len = parseFloat(dims.length) || 0;
  const wid = parseFloat(dims.width) || 0;
  const depth = dims.depth || '4';
  const rate = SURFACED_DRIVEWAY_RATES[depth] || 9.25;
  if (len > 0 && wid > 0) return len * wid * rate;
  return 0;
};

/** Calculate surfaced driveway price from dimensions */
export const calcSurfacedDrivewayPrice = (quote) => calcSurfacedPrice(quote, 'surfaced_driveway');
