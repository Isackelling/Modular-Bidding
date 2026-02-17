/**
 * Comprehensive calculation functions for the Sherman Bidding System
 * Handles materials, services, project command, and totals calculations
 */

import {
  MIN_MILES,
  DRIVE_RATE_SERVICE,
  DRIVE_RATE_PC,
  HOME_MARKUP,
  INSTALLATION_COSTS,
  PRICING,
  DEFAULT_FOUNDATION
} from '../constants/index.js';
import { calcIBeam, calcPerim, fmt } from './helpers.js';

/**
 * Calculate floor coverings quantity needed
 * @param {number} w - Width in feet
 * @param {number} l - Length in feet
 * @returns {number} Floor quantity (rounded up)
 */
export const calcFloorQty = (w, l) => Math.ceil((((w * 12) / 39) * l) / 100);

/**
 * Calculate number of piers needed
 * @param {number} len - House length in feet
 * @param {string} type - Single or Double wide
 * @param {number} wd - Number of walk doors
 * @param {number} sd - Number of storm doors
 * @returns {number} Total pier count
 */
export const calcPierCount = (len, type, wd, sd) => {
  const dbl = type?.toLowerCase() === 'double';
  const base = 2 * Math.ceil(len / 6 + 1) * (dbl ? 2.5 : 1);
  return Math.ceil(base + (dbl ? 0 : 2 * ((parseInt(wd) || 0) + (parseInt(sd) || 0))));
};

/**
 * Enforce minimum miles for drive time calculations
 * @param {number} m - Miles from office
 * @returns {number} Miles (minimum 15)
 */
export const enforceMiles = m => Math.max(MIN_MILES, parseFloat(m) || MIN_MILES);

/**
 * Get foundation-based price adjustments for services
 * @param {string} serviceKey - Service key
 * @param {string} foundationType - Foundation type (basement, crawlspace, slab)
 * @returns {number} Adjustment amount
 */
export const getFoundationAdjustment = (serviceKey, foundationType) => {
  if (foundationType === 'basement') {
    if (serviceKey === 'sand_pad') return 5000;
    if (serviceKey === 'plumbing') return 2000;
    if (serviceKey === 'electric_connection') return 3000;
  }
  if (foundationType === 'crawlspace') {
    if (serviceKey === 'sand_pad') return 5000;
  }
  return 0;
};

/**
 * Calculate installation cost breakdown
 * @param {number} miles - Distance from office
 * @param {string} singleDouble - 'Single' or 'Double'
 * @param {string} foundationType - Foundation type
 * @returns {Object} Installation cost breakdown with total
 */
export const calculateInstallationCost = (miles, singleDouble, foundationType) => {
  const isDouble = singleDouble === 'Double';
  const installation = ((miles * INSTALLATION_COSTS.DRIVE_RATE_PER_MILE) * 2) +
                       (isDouble ? INSTALLATION_COSTS.DOUBLE_WIDE_BASE : INSTALLATION_COSTS.SINGLE_WIDE_BASE);
  const axles = isDouble ? INSTALLATION_COSTS.DOUBLE_WIDE_AXLES : INSTALLATION_COSTS.SINGLE_WIDE_AXLES;
  const deliveryInspection = (miles * INSTALLATION_COSTS.DRIVE_RATE_PER_MILE) + INSTALLATION_COSTS.DELIVERY_INSPECTION;
  const wrapUp = (miles * INSTALLATION_COSTS.DRIVE_RATE_PER_MILE) + INSTALLATION_COSTS.WRAP_UP;
  const foundationAdj = (foundationType === 'basement' || foundationType === 'crawlspace')
    ? INSTALLATION_COSTS.FOUNDATION_ADJUSTMENT
    : 0;

  return {
    installation,
    axles,
    deliveryInspection,
    wrapUp,
    foundationAdj,
    total: installation + axles + deliveryInspection + wrapUp + foundationAdj,
    breakdown: [
      { name: 'Installation', cost: installation },
      { name: 'Axles', cost: axles },
      { name: 'Delivery & Inspection', cost: deliveryInspection },
      { name: 'Wrap-Up', cost: wrapUp },
      ...(foundationAdj > 0 ? [{ name: 'Foundation Adjustment', cost: foundationAdj }] : [])
    ]
  };
};

/**
 * Calculate default service price based on service configuration
 */
export const calcDefaultServicePrice = (key, svc, miles, w, l, driveRateService = DRIVE_RATE_SERVICE, days = 1, singleDouble = 'Single', foundationType = 'slab') => {
  const driveCost = miles * driveRateService;
  if (svc.calc === 'pad') return (w * l * PRICING.SLAB_COST_PER_SQ_FT) + driveCost;
  if (svc.calc === 'skirt') return ((24 * calcPerim(w, l)) + ((miles + 200) * 3)) * 1.1;
  if (svc.calc === 'lp_siding') {
    let basePrice = 0;
    if (l <= 52) basePrice = 6550;
    else if (l >= 53 && l <= 64) basePrice = 6950;
    else if (l >= 65) basePrice = 7850;
    return basePrice * 1.05;
  }
  if (svc.calc === 'install_home') {
    return calculateInstallationCost(miles, singleDouble, foundationType).total;
  }
  if (svc.calc === 'landscaping') {
    // $1,000 materials + $1,200 labor (2-man crew @ $600/person)
    // Drive cost multiplied by number of days
    return 2200 + (driveCost * days);
  }
  if (svc.calc === 'deck') {
    // $2,500 materials + $1,200 labor (2-man crew @ $600/person)
    // Drive cost multiplied by number of days
    return 3700 + (driveCost * days);
  }
  if (svc.calc === 'closing') return 0; // Calculated separately in calcTotals
  return svc.addDrive ? svc.base + driveCost : svc.base;
};

/**
 * Count number of services in quote
 */
export const countServices = q => {
  let count = Object.values(q.selectedServices || {}).filter(Boolean).length;
  if (q.sewerType && q.sewerType !== 'none') count++;
  if (parseFloat(q.wellDepth) > 0) count++;
  if (q.patioSize && q.patioSize !== 'none') count++;
  (q.customServices || []).forEach(cs => { if (cs.name && cs.price) count++; });
  return count;
};

/**
 * Calculate project command costs (Project Supervisor, Project Manager, Project Coordinator)
 * @param {Object} q - Quote object
 * @param {number} driveRatePC - Drive rate per mile for project command
 * @param {Object} pcRates - Configurable rates { psPerService, pmBase }
 */
export const calcProjectCommand = (q, driveRatePC = DRIVE_RATE_PC, pcRates = {}) => {
  const psPerService = pcRates.psPerService || 150;
  const pmBase = pcRates.pmBase || 4000;
  const miles = enforceMiles(q.driveTime);
  const numSvc = countServices(q);
  const ps = (numSvc * psPerService) + ((miles * driveRatePC) * numSvc);
  const pm = (miles * driveRatePC) + pmBase;
  const pc = (pm / 2) + (miles * driveRatePC);
  return { ps, pm, pc, total: ps + pm + pc, numSvc, miles, psPerService, pmBase };
};

/**
 * Calculate materials costs
 */
export const calcMaterials = (q, M) => {
  const costs = [];
  const w = parseFloat(q.houseWidth) || 0, l = parseFloat(q.houseLength) || 0;
  const wd = parseInt(q.walkDoors) || 2;
  const iBeam = q.iBeamHeight || calcIBeam(l);
  const pc = calcPierCount(l, q.singleDouble, wd, 0);
  const removed = q.removedMaterials || {};

  const addItem = (key, item, qty, price) => {
    if (!removed[key]) {
      costs.push({ key, item, qty, price, total: qty * price });
    }
  };

  addItem('great_stuff', M.great_stuff.name, 2, M.great_stuff.price);
  const floorQty = calcFloorQty(w, l);
  addItem('floor_coverings', M.floor_coverings.name, floorQty, M.floor_coverings.price);
  if (wd > 0) addItem('cookies_16x4', M.cookies_16x4.name, wd * 6, M.cookies_16x4.price);
  addItem('tyvek', M.tyvek.name, 1, M.tyvek.price);
  addItem('anchor_system', M.anchor_system.name, 2, M.anchor_system.price);
  const pierQty = pc + (wd * 2);
  const pier = iBeam >= 11 ? M.steel_pier_20 : M.steel_pier_22;
  const pierKey = iBeam >= 11 ? 'steel_pier_20' : 'steel_pier_22';
  addItem(pierKey, pier.name, pierQty, pier.price);
  addItem('steel_pier_32', M.steel_pier_32.name, Math.ceil(l / 12), M.steel_pier_32.price);
  if (q.singleDouble?.toLowerCase() === 'single') addItem('tie_down_straps', M.tie_down_straps.name, 4, M.tie_down_straps.price);
  addItem('coil_nails', M.coil_nails.name, 1, M.coil_nails.price);
  addItem('asphalt_silicon', M.asphalt_silicon.name, 2, M.asphalt_silicon.price);
  if (wd > 0) addItem('stairs_4step', M.stairs_4step.name, wd, M.stairs_4step.price);
  addItem('heat_tape', M.heat_tape.name, 1, M.heat_tape.price);
  addItem('fiberglass_wrap', M.fiberglass_wrap.name, 1, M.fiberglass_wrap.price);
  addItem('aluminum_foil_tape', M.aluminum_foil_tape.name, 1, M.aluminum_foil_tape.price);

  // Add custom materials
  (q.customMaterials || []).forEach((cm, idx) => {
    if (cm.name && cm.price && !removed[`custmat_${idx}`]) {
      const qty = parseFloat(cm.quantity) || 1;
      const price = parseFloat(cm.price) || 0;
      costs.push({ key: `custmat_${idx}`, item: cm.name, qty, price, total: qty * price });
    }
  });

  return costs;
};

// ============================================================================
// SERVICE CALCULATION HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate costs for user-selected services
 */
export const calcSelectedServicesCost = (q, services, miles, driveCost, w, l, driveRateService, foundationType, removed) => {
  const costs = [];

  Object.entries(q.selectedServices || {}).forEach(([k, sel]) => {
    if (!sel || !services[k] || removed[k]) return;
    const svc = services[k];
    const override = q.servicePriceOverrides?.[k];
    const qty = svc.hasQuantity ? (q.serviceQuantities?.[k] || 1) : 1;
    const days = (q.serviceDays && q.serviceDays[k]) || 1;
    let cost = override !== undefined && override !== '' ? parseFloat(override) : calcDefaultServicePrice(k, svc, miles, w, l, driveRateService, days, q.singleDouble, foundationType);

    // Special calculation for installation_of_home based on single/double wide
    if (k === 'installation_of_home' && (override === undefined || override === '')) {
      cost = calculateInstallationCost(miles, q.singleDouble, foundationType).total;
    }

    // Add foundation-based adjustment if not overridden
    if (override === undefined || override === '') {
      cost += getFoundationAdjustment(k, foundationType);
    }

    // Apply quantity multiplier
    cost = cost * qty;

    // Show item name without breakdown for installation_of_home
    let itemName = svc.hasQuantity && qty > 1 ? `${svc.name} (×${qty})` : svc.name;
    costs.push({ item: itemName, key: k, cost, isOverride: override !== undefined && override !== '' });
  });

  return costs;
};

/**
 * Calculate foundation cost based on type
 */
export const calcFoundationCost = (q, w, l, driveCost, foundationType, foundationPrices, removed) => {
  if (removed['foundation']) return null;

  const override = q.servicePriceOverrides?.foundation;
  let foundationCost = 0;
  let foundationLabel = '';

  if (foundationType === 'slab') {
    foundationLabel = 'Foundation - Engineered Slab';
    foundationCost = (w * l * PRICING.SLAB_COST_PER_SQ_FT) + driveCost;
  } else if (foundationType === 'basement') {
    foundationLabel = 'Foundation - Basement (includes waterproofing & insulation)';
    foundationCost = (foundationPrices?.basement || 30000) + driveCost;
  } else if (foundationType === 'crawlspace') {
    foundationLabel = 'Foundation - Crawl Space';
    foundationCost = (foundationPrices?.crawlspace || 22000) + driveCost;
  }

  if (override !== undefined && override !== '') {
    foundationCost = parseFloat(override);
  }

  return { item: foundationLabel, key: 'foundation', cost: foundationCost, isOverride: override !== undefined && override !== '' };
};

/**
 * Auto-add basement-specific services when basement foundation is selected
 */
export const calcAutoBasementServices = (q, services, driveCost, foundationType, removed) => {
  const costs = [];

  if (foundationType === 'basement') {
    const basementServices = ['basement_stairs', 'water_heater', 'updraft_furnace'];
    basementServices.forEach(k => {
      if (!removed[k] && !q.selectedServices?.[k] && services[k]) {
        const svc = services[k];
        const override = q.servicePriceOverrides?.[k];
        const cost = override !== undefined && override !== '' ? parseFloat(override) : svc.base + driveCost;
        costs.push({ item: svc.name, key: k, cost, isOverride: override !== undefined && override !== '', autoAdded: true });
      }
    });
  }

  return costs;
};

/**
 * Calculate utility service costs (sewer, well, patio)
 */
export const calcUtilityServices = (q, sewer, patio, driveCost, removed) => {
  const costs = [];

  // Sewer
  if (q.sewerType && q.sewerType !== 'none' && !removed['sewer']) {
    const override = q.servicePriceOverrides?.sewer;
    costs.push({
      item: `Sewer (${q.sewerType.replace('_', ' ')})`,
      key: 'sewer',
      cost: override ? parseFloat(override) : sewer[q.sewerType] + (driveCost * 2),
      isOverride: !!override
    });
  }

  // Well
  if (parseFloat(q.wellDepth) > 0 && !removed['well']) {
    const override = q.servicePriceOverrides?.well;
    costs.push({
      item: `Well (${q.wellDepth} ft)`,
      key: 'well',
      cost: override ? parseFloat(override) : (120 * parseFloat(q.wellDepth)) + driveCost,
      isOverride: !!override
    });
  }

  // Patio
  if (q.patioSize && q.patioSize !== 'none' && !removed['patio']) {
    const override = q.servicePriceOverrides?.patio;
    costs.push({
      item: `Patio (${q.patioSize} ft)`,
      key: 'patio',
      cost: override ? parseFloat(override) : patio[q.patioSize],
      isOverride: !!override
    });
  }

  return costs;
};

/**
 * Calculate project-based services (landscaping, deck)
 */
export const calcProjectServices = (q, driveCost, removed) => {
  const costs = [];

  // Landscaping
  if (q.hasLandscaping && !removed['landscaping']) {
    const days = q.landscapingDays || 1;
    const materialCost = parseFloat(q.landscapingMaterialCost) || 0;
    const laborCost = 1200;
    const driveCostTotal = driveCost * days;
    const totalCost = materialCost + laborCost + driveCostTotal;
    costs.push({
      item: `Landscaping (${days} day${days > 1 ? 's' : ''}) - Materials: ${fmt(materialCost)} + Labor: ${fmt(laborCost)} + Drive: ${fmt(driveCostTotal)}`,
      key: 'landscaping',
      cost: totalCost
    });
  }

  // Deck
  if (q.hasDeck && !removed['deck']) {
    const days = q.deckDays || 1;
    const materialCost = parseFloat(q.deckMaterialCost) || 0;
    const laborCost = 1200;
    const driveCostTotal = driveCost * days;
    const totalCost = materialCost + laborCost + driveCostTotal;
    costs.push({
      item: `Deck (${days} day${days > 1 ? 's' : ''}) - Materials: ${fmt(materialCost)} + Labor: ${fmt(laborCost)} + Drive: ${fmt(driveCostTotal)}`,
      key: 'deck',
      cost: totalCost
    });
  }

  return costs;
};

/**
 * Calculate custom services and options
 */
export const calcCustomServices = (q, removed) => {
  const costs = [];

  // Custom services
  (q.customServices || []).forEach((cs, idx) => {
    if (cs.name && cs.price && !removed[`custom_${idx}`]) {
      costs.push({
        item: cs.name,
        key: `custom_${idx}`,
        cost: parseFloat(cs.price) || 0,
        isCustom: true
      });
    }
  });

  // Custom options
  (q.customOptions || []).forEach((co, idx) => {
    if (co.name && co.price && !removed[`customopt_${idx}`]) {
      const qty = parseFloat(co.quantity) || 1;
      const totalCost = (parseFloat(co.price) || 0) * qty;
      const itemName = qty > 1 ? `${co.name} (×${qty})` : co.name;
      costs.push({
        item: itemName,
        key: `customopt_${idx}`,
        cost: totalCost,
        isCustom: true
      });
    }
  });

  return costs;
};

/**
 * Main service calculation function (orchestrates all helper functions)
 */
export const calcServices = (q, services, sewer, patio, driveRateService = DRIVE_RATE_SERVICE, foundationPrices = DEFAULT_FOUNDATION) => {
  const miles = enforceMiles(q.driveTime);
  const driveCost = miles * driveRateService;
  const w = parseFloat(q.houseWidth) || 0, l = parseFloat(q.houseLength) || 0;
  const removed = q.removedServices || {};
  const foundationType = q.foundationType || 'slab';

  // Collect all costs from helper functions
  const costs = [
    ...calcSelectedServicesCost(q, services, miles, driveCost, w, l, driveRateService, foundationType, removed),
    calcFoundationCost(q, w, l, driveCost, foundationType, foundationPrices, removed),
    ...calcAutoBasementServices(q, services, driveCost, foundationType, removed),
    ...calcUtilityServices(q, sewer, patio, driveCost, removed),
    ...calcProjectServices(q, driveCost, removed),
    ...calcCustomServices(q, removed)
  ].filter(Boolean); // Remove null/undefined entries

  return costs;
};

/**
 * Calculate quote totals with all materials, services, overhead, markup, and contingency
 */
export const calcTotals = (q, materials, services, sewer, patio, driveRates = { install: 22, service: 20, projectCommand: 15, inspection: 15 }, foundationPrices = DEFAULT_FOUNDATION, pcRates = {}) => {
  const mat = calcMaterials(q, materials);
  // Labor is now calculated as part of services (installation_of_home)
  const lab = []; // Labor costs now part of services - keeping empty array for backward compatibility
  let svc = calcServices(q, services, sewer, patio, driveRates.service, foundationPrices);
  const matT = mat.reduce((s, c) => s + c.total, 0);
  const labT = 0; // Labor costs now included in services
  const projCmd = calcProjectCommand(q, driveRates.projectCommand, pcRates);
  let svcT = svc.reduce((s, c) => s + c.cost, 0);
  const homeBasePrice = parseFloat(q.homeBasePrice) || 0;
  const homePrice = homeBasePrice * HOME_MARKUP;
  let sub = matT + labT + svcT + homePrice + projCmd.total;
  let oh = sub * 0.05;
  let mu = (sub + oh) * 0.10;
  let total = sub + oh + mu;

  // Handle closing costs (7% of total including closing costs itself)
  if (q.selectedServices?.closing_costs && !q.removedServices?.closing_costs) {
    const override = q.servicePriceOverrides?.closing_costs;
    // Calculate 7% of total including itself: closingCost = total * (0.07 / 0.93)
    const closingCost = override !== undefined && override !== '' ? parseFloat(override) : Math.round(total * (0.07 / 0.93));
    svc.push({ item: 'Closing Costs (7% of Total)', key: 'closing_costs', cost: closingCost, isOverride: override !== undefined && override !== '' });
    svcT += closingCost;
    sub = matT + labT + svcT + homePrice + projCmd.total;
    oh = sub * 0.05;
    mu = (sub + oh) * 0.10;
    total = sub + oh + mu;
  }

  // Calculate 2% Contingency Allowance for change orders and allowances
  const contingency = Math.round(total * 0.02);
  const totalWithContingency = total + contingency;

  return { mat, lab, svc, projCmd, matT, labT, svcT, homeBasePrice, homePrice, sub, oh, mu, total, contingency, totalWithContingency };
};
