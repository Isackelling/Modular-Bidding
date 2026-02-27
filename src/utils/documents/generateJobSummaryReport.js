import { HOME_OPTIONS, LICENSED_SERVICES, DEFAULT_SERVICES, DEFAULT_MATERIALS, DEFAULT_SEWER, DEFAULT_PATIO, DEFAULT_FOUNDATION, DRIVE_RATE_INSTALL, DRIVE_RATE_SERVICE, DRIVE_RATE_PC, DRIVE_RATE_INSPECTION, fmtCurrency, formatPhone, calcTotals, DocumentUtils } from './shared.js';

export const generateJobSummaryReport = (quote, customer, servicesParam, crewChecklistData, crewCommentsData) => {
  const services = servicesParam || DEFAULT_SERVICES;
  const today = DocumentUtils.formatDate();
  const quoteNum = DocumentUtils.getQuoteNum(quote);
  const checklist = crewChecklistData || {};
  const comments = crewCommentsData || {};
  const hasAnyCrewData = Object.keys(checklist).length > 0 || Object.keys(comments).length > 0;

  const totals = calcTotals(
    quote,
    DEFAULT_MATERIALS,
    services,
    DEFAULT_SEWER,
    DEFAULT_PATIO,
    { install: DRIVE_RATE_INSTALL, service: DRIVE_RATE_SERVICE, projectCommand: DRIVE_RATE_PC, inspection: DRIVE_RATE_INSPECTION },
    DEFAULT_FOUNDATION
  );

  const formatNoteDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  const buildServiceData = (key) => {
    const service = services[key];
    const svcCost = totals.svc.find(s => s.key === key);
    return {
      key,
      name: service?.name || key,
      description: service?.description || '',
      publishedCrewNotes: quote.publishedServiceCrewNotes?.[key] || [],
      publishedCustomerNotes: quote.publishedServiceNotes?.[key] || [],
      cost: svcCost?.cost || 0,
      quantity: quote.serviceQuantities?.[key] || '',
      days: quote.serviceDays?.[key] || ''
    };
  };

  // Service categorization (same as crew work order)
  const installServices = Object.entries(quote.selectedServices || {})
    .filter(([key, selected]) => selected && LICENSED_SERVICES.includes(key))
    .map(([key]) => buildServiceData(key));

  const professionalServices = Object.entries(quote.selectedServices || {})
    .filter(([key, selected]) => selected && !LICENSED_SERVICES.includes(key) && !HOME_OPTIONS.includes(key))
    .map(([key]) => buildServiceData(key));

  const homeSpecAdditions = Object.entries(quote.selectedServices || {})
    .filter(([key, selected]) => selected && HOME_OPTIONS.includes(key))
    .map(([key]) => buildServiceData(key));

  const otherServices = [];
  if (quote.sewerType && quote.sewerType !== 'none') {
    otherServices.push({ key: 'sewer', name: 'Sewer System', description: quote.sewerType, publishedCrewNotes: quote.publishedServiceCrewNotes?.sewer || [], publishedCustomerNotes: quote.publishedServiceNotes?.sewer || [], cost: totals.svc.find(s => s.key === 'sewer')?.cost || 0 });
  }
  if (quote.wellDepth && quote.wellDepth !== '0') {
    otherServices.push({ key: 'well', name: 'Well System', description: `${quote.wellDepth} ft deep`, publishedCrewNotes: quote.publishedServiceCrewNotes?.well || [], publishedCustomerNotes: quote.publishedServiceNotes?.well || [], cost: totals.svc.find(s => s.key === 'well')?.cost || 0 });
  }
  if (quote.patioSize && quote.patioSize !== 'none') {
    otherServices.push({ key: 'patio', name: 'Patio', description: `${quote.patioSize} wide`, publishedCrewNotes: quote.publishedServiceCrewNotes?.patio || [], publishedCustomerNotes: quote.publishedServiceNotes?.patio || [], cost: totals.svc.find(s => s.key === 'patio')?.cost || 0 });
  }
  if (quote.hasLandscaping) {
    otherServices.push({ key: 'landscaping', name: 'Landscaping', description: 'Landscaping services', publishedCrewNotes: quote.publishedServiceCrewNotes?.landscaping || [], publishedCustomerNotes: quote.publishedServiceNotes?.landscaping || [], cost: totals.svc.find(s => s.key === 'landscaping')?.cost || 0 });
  }
  if (quote.hasDeck) {
    otherServices.push({ key: 'deck', name: 'Deck Project', description: 'Deck construction services', publishedCrewNotes: quote.publishedServiceCrewNotes?.deck || [], publishedCustomerNotes: quote.publishedServiceNotes?.deck || [], cost: totals.svc.find(s => s.key === 'deck')?.cost || 0 });
  }

  const foundationTypes = { slab: 'Concrete Slab Foundation', crawlspace: 'Crawl Space Foundation', basement: 'Full Basement Foundation' };
  const foundationName = foundationTypes[quote.foundationType] || 'None';

  // Checklist status helpers
  const checkIcon = (taskId) => checklist[taskId] ? '<span style="color:#2e7d32;font-weight:700">&#10004;</span>' : '<span style="color:#c62828;font-weight:700">&#10008;</span>';
  const feedbackHtml = (taskId) => {
    const c = comments[taskId];
    return c ? `<div style="background:#f3e5f5;border-left:4px solid #6a1b9a;padding:10px 12px;border-radius:4px;margin-top:6px;font-size:13px;white-space:pre-wrap">${c}</div>` : '';
  };

  // Service section renderer
  const renderServiceSection = (title, svcList, prefix) => {
    if (svcList.length === 0) return '';
    return `
    <div style="margin-bottom:30px">
      <div style="font-size:18px;font-weight:800;color:#283593;margin-bottom:12px;border-bottom:2px solid #c5cae9;padding-bottom:6px">${title}</div>
      ${svcList.map(svc => `
      <div style="background:#fff;border:2px solid #dee2e6;border-radius:8px;padding:16px;margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div style="font-size:16px;font-weight:700;color:#2c5530">${checkIcon(prefix + '_' + svc.key)} ${svc.name}</div>
          <div style="font-size:15px;font-weight:700;color:#283593">${fmtCurrency(svc.cost)}</div>
        </div>
        ${svc.description ? `<div style="font-size:13px;color:#666;font-style:italic;margin-bottom:8px">${svc.description}</div>` : ''}
        ${svc.quantity || svc.days ? `<div style="display:flex;gap:15px;font-size:13px;margin-bottom:8px">${svc.quantity ? `<span style="background:#e8eaf6;padding:4px 10px;border-radius:4px">Qty: ${svc.quantity}</span>` : ''}${svc.days ? `<span style="background:#e8eaf6;padding:4px 10px;border-radius:4px">Days: ${svc.days}</span>` : ''}</div>` : ''}
        ${svc.publishedCrewNotes.length > 0 ? svc.publishedCrewNotes.map(note => `
        <div style="background:#fff3e0;border-left:4px solid #ff6b35;padding:10px 12px;border-radius:4px;margin-top:6px">
          <div style="font-size:12px;font-weight:700;color:#e65100;margin-bottom:4px">Crew Instructions</div>
          <div style="font-size:13px;white-space:pre-wrap">${note.text}</div>
          <div style="font-size:11px;color:#999;margin-top:4px;font-style:italic">— ${note.publishedBy}, ${formatNoteDateTime(note.publishedAt)}</div>
        </div>`).join('') : ''}
        ${svc.publishedCustomerNotes && svc.publishedCustomerNotes.length > 0 ? svc.publishedCustomerNotes.map(note => `
        <div style="background:#e3f2fd;border-left:4px solid #1565c0;padding:10px 12px;border-radius:4px;margin-top:6px">
          <div style="font-size:12px;font-weight:700;color:#1565c0;margin-bottom:4px">Customer Note</div>
          <div style="font-size:13px;white-space:pre-wrap">${note.text}</div>
          <div style="font-size:11px;color:#999;margin-top:4px;font-style:italic">— ${note.publishedBy}, ${formatNoteDateTime(note.publishedAt)}</div>
        </div>`).join('') : ''}
        ${feedbackHtml(prefix + '_' + svc.key)}
        ${!comments[prefix + '_' + svc.key] ? '<div style="color:#999;font-style:italic;font-size:12px;margin-top:6px">No crew feedback submitted</div>' : ''}
      </div>
      `).join('')}
    </div>`;
  };

  // Delivery/inspection items
  const deliveryGroups = [
    { title: 'Documentation and Compliance', items: [
      { id: 'delivery_hud_data_plate', label: 'Verify the HUD data plate is present' },
      { id: 'delivery_hud_cert', label: 'Confirm the HUD certification label' },
      { id: 'delivery_manufacturer_install', label: "Check for manufacturer's installation instructions" },
      { id: 'delivery_warranties', label: 'Review warranties, manuals for appliances' },
      { id: 'delivery_rivet_badge', label: 'Rivet Install Badge and White # on home' }
    ]},
    { title: 'Exterior Inspection', items: [
      { id: 'delivery_siding', label: 'Examine siding for breaks, dents, damage' },
      { id: 'delivery_roof', label: 'Inspect the roof for leaks, missing shingles, damage' },
      { id: 'delivery_windows', label: 'Check windows for breaks, proper operation' },
      { id: 'delivery_trim', label: 'Inspect trim, porches, decks, and exterior fixtures' },
      { id: 'delivery_transit_damage', label: 'Check for transit damage' },
      { id: 'delivery_gas_line', label: 'Gas Line Location' },
      { id: 'delivery_electric_stub', label: 'Electric stub - How many Ft.' },
      { id: 'delivery_water_line', label: 'Water Line - How many ft for hookup' },
      { id: 'delivery_sewer_line', label: 'Sewer line location - How many Ft.' }
    ]},
    { title: 'Interior Inspection', items: [
      { id: 'delivery_drywall', label: 'Check drywall/walls for excessive damage' },
      { id: 'delivery_ceilings', label: 'Inspect ceilings for sags, stains, or damage' },
      { id: 'delivery_floors', label: 'Examine floors for levelness, soft spots' },
      { id: 'delivery_cabinets', label: 'Verify cabinets, countertops, and fixtures' },
      { id: 'delivery_insulation', label: 'Check insulation in walls, floors, ceilings' }
    ]},
    { title: 'Appliances and Equipment', items: [
      { id: 'delivery_appliances', label: 'Check appliances (fridge, stove, dishwasher)' },
      { id: 'delivery_equipment', label: 'Ensure all installed equipment (HVAC) is functional' }
    ]},
    { title: 'Material List Verification', items: [
      { id: 'delivery_door_jam', label: 'Door Jam Board' },
      { id: 'delivery_door_casement', label: 'Door Casement' },
      { id: 'delivery_door_stops', label: 'Door Stops' },
      { id: 'delivery_screen_door', label: 'Screen Door' },
      { id: 'delivery_vinyl_floor', label: 'Vinyl Floor Coverings' },
      { id: 'delivery_sewer_pipe', label: 'Sewer Pipe (ft)' },
      { id: 'delivery_beam_trim', label: 'Beam Trim' },
      { id: 'delivery_siding_material', label: 'Siding' },
      { id: 'delivery_siding_starter', label: 'Siding Starter' },
      { id: 'delivery_facia', label: 'Facia' },
      { id: 'delivery_roof_facia', label: 'Roof Facia' },
      { id: 'delivery_soffits', label: 'Soffits' },
      { id: 'delivery_j_channel', label: 'J-channel' },
      { id: 'delivery_paint', label: 'Paint' }
    ]},
    { title: 'Final Steps', items: [
      { id: 'delivery_pictures', label: 'Take many pictures and attach to document' },
      { id: 'delivery_clean_floors', label: 'Clean all floors and lay floor coverings to protect' }
    ]}
  ];

  const completionItems = [
    { id: 'checklist_services_complete', label: 'All services completed per specifications' },
    { id: 'checklist_site_cleaned', label: 'Site cleaned and debris removed' },
    { id: 'checklist_walkthrough', label: 'Customer walkthrough completed' },
    { id: 'checklist_issues_documented', label: 'Any issues or concerns documented' },
    { id: 'checklist_photos', label: 'Photos taken of completed work' },
    { id: 'checklist_signature', label: 'Customer signature obtained (if required)' },
    { id: 'checklist_materials', label: 'Materials inventory updated' },
    { id: 'checklist_timesheets', label: 'Time sheets submitted' }
  ];

  const completionCount = completionItems.filter(item => checklist[item.id]).length;
  const allDeliveryIds = deliveryGroups.flatMap(g => g.items.map(i => i.id));
  const deliveryCount = allDeliveryIds.filter(id => checklist[id]).length;

  // Change orders
  const changeOrders = quote.changeOrderHistory || [];
  const nonReversalCOs = changeOrders.filter(co => !co.isReversal);

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Job Summary - ${customer?.firstName || 'Customer'} ${customer?.lastName || ''} - #${quoteNum}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;max-width:1000px;margin:0 auto;color:#222;line-height:1.6;background:#fafafa}
.header{background:linear-gradient(135deg,#283593 0%,#3949ab 100%);color:#fff;padding:30px;border-radius:10px;margin-bottom:30px;box-shadow:0 4px 12px rgba(0,0,0,0.15);display:flex;justify-content:space-between;align-items:center}
.header-left{display:flex;align-items:center;gap:20px}
.title{font-size:32px;font-weight:900;letter-spacing:-0.5px}
.subtitle{font-size:14px;margin-top:4px;opacity:0.9}
.header-right{text-align:right;font-size:14px;opacity:0.9}
.section{background:#fff;border-radius:8px;padding:24px;margin-bottom:20px;box-shadow:0 2px 6px rgba(0,0,0,0.06)}
.section-title{font-size:20px;font-weight:800;color:#283593;margin:0 0 16px;border-bottom:3px solid #c5cae9;padding-bottom:8px}
.info-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.info-box{background:#e8eaf6;padding:14px;border-radius:6px;border-left:4px solid #283593}
.info-label{font-weight:700;color:#283593;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px}
.info-value{font-size:14px;color:#333}
.cost-table{width:100%;border-collapse:collapse}
.cost-table td{padding:10px 14px;font-size:14px}
.cost-table tr{border-bottom:1px solid #eee}
.cost-table .label{font-weight:600;color:#333}
.cost-table .amount{text-align:right;font-weight:600}
.cost-table .total-row{border-top:3px solid #283593}
.cost-table .total-row td{font-size:18px;font-weight:800;color:#283593;padding-top:14px}
.checklist-row{display:flex;align-items:flex-start;gap:10px;padding:8px 12px;border-radius:4px;margin-bottom:4px}
.checklist-row:nth-child(odd){background:#f5f5f5}
.no-data-notice{background:#fff3cd;border:2px solid #ffc107;border-radius:8px;padding:20px;text-align:center;margin-bottom:20px}
.co-card{background:#fff;border:2px solid #ff6b35;border-radius:8px;padding:16px;margin-bottom:12px}
@media print{body{padding:15px;background:#fff}.section{box-shadow:none;border:1px solid #ddd;page-break-inside:avoid}.header{box-shadow:none}}
</style></head><body>

<div class="header">
  <div class="header-left">
    <img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" style="height:45px" alt="Sherman Logo">
    <div>
      <div class="title">JOB SUMMARY REPORT</div>
      <div class="subtitle">Complete Project Overview — Internal Document</div>
    </div>
  </div>
  <div class="header-right">
    <div><strong>Quote #:</strong> ${quoteNum}</div>
    <div><strong>Status:</strong> ${quote.status || 'N/A'}</div>
    <div><strong>Generated:</strong> ${today}</div>
  </div>
</div>

${!hasAnyCrewData ? `
<div class="no-data-notice">
  <div style="font-weight:700;color:#856404;font-size:16px;margin-bottom:8px">No Crew Feedback Data Available</div>
  <div style="color:#856404;font-size:14px">Crew checklist and feedback data is stored locally on the device where the Crew Work Order was completed. If the crew used a different device, their feedback will not appear here.</div>
</div>
` : ''}

<!-- CUSTOMER INFO -->
<div class="section">
  <div class="section-title">Customer Information</div>
  <div class="info-grid">
    <div class="info-box">
      <div class="info-label">Customer</div>
      <div class="info-value">${customer?.firstName || ''} ${customer?.lastName || ''}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Phone</div>
      <div class="info-value">${formatPhone(customer?.phone) || 'N/A'}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Email</div>
      <div class="info-value">${customer?.email || 'N/A'}</div>
    </div>
    <div class="info-box" style="grid-column:span 2">
      <div class="info-label">Site Address</div>
      <div class="info-value">${customer?.siteAddress || ''} ${customer?.siteCity || ''} ${customer?.siteState || ''} ${customer?.siteZip || ''}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Contact Person</div>
      <div class="info-value">${customer?.contactPerson || customer?.firstName || 'N/A'}</div>
    </div>
    ${customer?.person2FirstName ? `
    <div class="info-box">
      <div class="info-label">Second Contact</div>
      <div class="info-value">${customer.person2FirstName} ${customer.person2LastName || ''}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Second Phone</div>
      <div class="info-value">${formatPhone(customer.phone2) || 'N/A'}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Second Email</div>
      <div class="info-value">${customer.email2 || 'N/A'}</div>
    </div>` : ''}
  </div>
</div>

<!-- PROJECT SPECS -->
<div class="section">
  <div class="section-title">Project Specifications</div>
  <div class="info-grid">
    <div class="info-box">
      <div class="info-label">Home Type</div>
      <div class="info-value">${quote.singleDouble === 'double' ? 'Double-Wide' : 'Single-Wide'}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Model</div>
      <div class="info-value">${quote.homeModel !== 'NONE' ? quote.homeModel : 'Custom'}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Dimensions</div>
      <div class="info-value">${quote.houseWidth || ''}&apos; x ${quote.houseLength || ''}&apos;</div>
    </div>
    <div class="info-box">
      <div class="info-label">Foundation</div>
      <div class="info-value">${foundationName}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Drive Time</div>
      <div class="info-value">${quote.driveTime || 0} miles</div>
    </div>
    <div class="info-box">
      <div class="info-label">Walk Doors</div>
      <div class="info-value">${quote.walkDoors || 'N/A'}</div>
    </div>
  </div>
</div>

<!-- SERVICES PERFORMED -->
<div class="section">
  <div class="section-title">Services Performed</div>
  ${renderServiceSection('Licensed Required Services', installServices, 'install')}
  ${renderServiceSection('Professional Services', professionalServices, 'professional')}
  ${renderServiceSection('Home Spec Additions', homeSpecAdditions, 'homespec')}
  ${renderServiceSection('Other Services', otherServices, 'other')}
  ${installServices.length === 0 && professionalServices.length === 0 && homeSpecAdditions.length === 0 && otherServices.length === 0 ? '<div style="text-align:center;color:#999;font-style:italic;padding:20px">No services selected for this project</div>' : ''}
</div>

<!-- DELIVERY & INSPECTION RESULTS -->
<div class="section">
  <div class="section-title">Delivery & Inspection Results <span style="font-size:14px;font-weight:400;color:#666">(${deliveryCount}/${allDeliveryIds.length} checked)</span></div>
  ${deliveryGroups.map(group => `
  <div style="margin-bottom:20px">
    <div style="font-size:15px;font-weight:700;color:#1565c0;margin-bottom:8px;border-bottom:1px solid #e3f2fd;padding-bottom:4px">${group.title}</div>
    ${group.items.map(item => `
    <div class="checklist-row">
      <div style="flex-shrink:0;width:22px;text-align:center">${checkIcon(item.id)}</div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600">${item.label}</div>
        ${comments[item.id] ? `<div style="font-size:12px;color:#555;margin-top:4px;background:#f3e5f5;padding:6px 10px;border-radius:4px;border-left:3px solid #6a1b9a">${comments[item.id]}</div>` : ''}
      </div>
    </div>`).join('')}
  </div>`).join('')}
</div>

<!-- COMPLETION CHECKLIST -->
<div class="section">
  <div class="section-title">Completion Checklist <span style="font-size:14px;font-weight:400;color:${completionCount === completionItems.length ? '#2e7d32' : '#c62828'}">(${completionCount}/${completionItems.length} complete)</span></div>
  ${completionItems.map(item => `
  <div class="checklist-row">
    <div style="flex-shrink:0;width:22px;text-align:center">${checkIcon(item.id)}</div>
    <div style="flex:1">
      <div style="font-size:14px;font-weight:600">${item.label}</div>
      ${comments[item.id] ? `<div style="font-size:12px;color:#555;margin-top:4px;background:#f3e5f5;padding:6px 10px;border-radius:4px;border-left:3px solid #6a1b9a">${comments[item.id]}</div>` : ''}
    </div>
  </div>`).join('')}
</div>

<!-- COST SUMMARY -->
<div class="section">
  <div class="section-title">Financial Summary</div>
  <table class="cost-table">
    <tbody>
      ${totals.homePrice > 0 ? `<tr><td class="label">Home</td><td class="amount">${fmtCurrency(totals.homePrice)}</td></tr>` : ''}
      <tr><td class="label">Materials</td><td class="amount">${fmtCurrency(totals.matT)}</td></tr>
      <tr><td class="label">Services</td><td class="amount">${fmtCurrency(totals.svcT)}</td></tr>
      <tr><td class="label">Project Command</td><td class="amount">${fmtCurrency(totals.projCmd?.total || 0)}</td></tr>
      <tr style="border-top:2px solid #ddd"><td class="label">Subtotal</td><td class="amount">${fmtCurrency(totals.sub)}</td></tr>
      <tr><td class="label">Overhead (5%)</td><td class="amount">${fmtCurrency(totals.oh)}</td></tr>
      <tr><td class="label">Markup (10%)</td><td class="amount">${fmtCurrency(totals.mu)}</td></tr>
      <tr style="border-top:2px solid #ddd"><td class="label">Total</td><td class="amount" style="font-weight:700">${fmtCurrency(totals.total)}</td></tr>
      <tr><td class="label">Contingency Fund</td><td class="amount">${fmtCurrency(totals.contingency)}</td></tr>
      <tr class="total-row"><td class="label">Total Investment</td><td class="amount">${fmtCurrency(totals.totalWithContingency)}</td></tr>
    </tbody>
  </table>
</div>

${nonReversalCOs.length > 0 ? `
<!-- CHANGE ORDERS -->
<div class="section">
  <div class="section-title">Change Orders (${nonReversalCOs.length})</div>
  ${nonReversalCOs.map(co => `
  <div class="co-card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <div style="font-size:16px;font-weight:700;color:#e65100">CO #${co.changeOrderNum || '?'}</div>
      <div style="font-size:13px;color:#666">${co.createdAt ? formatNoteDateTime(co.createdAt) : 'N/A'} ${co.createdBy ? 'by ' + co.createdBy : ''}</div>
    </div>
    ${co.contingencyUsed ? '<div style="font-size:13px;margin-bottom:4px"><strong>Contingency Used:</strong> ' + fmtCurrency(co.contingencyUsed) + '</div>' : ''}
    ${co.contingencyBalance !== undefined ? '<div style="font-size:13px;margin-bottom:4px"><strong>Contingency Balance After:</strong> ' + fmtCurrency(co.contingencyBalance) + '</div>' : ''}
    ${co.customerCost ? '<div style="font-size:13px;margin-bottom:4px"><strong>Customer Cost:</strong> ' + fmtCurrency(co.customerCost) + '</div>' : ''}
    ${co.deletions && co.deletions.length > 0 ? '<div style="margin-top:8px"><strong style="color:#c62828">Deletions:</strong> ' + co.deletions.map(d => d.name || d).join(', ') + '</div>' : ''}
    ${co.additions && co.additions.length > 0 ? '<div style="margin-top:4px"><strong style="color:#2e7d32">Additions:</strong> ' + co.additions.map(a => a.name || a).join(', ') + '</div>' : ''}
  </div>
  `).join('')}
</div>
` : ''}

<!-- TIMELINE -->
<div class="section">
  <div class="section-title">Timeline</div>
  <div class="info-grid" style="grid-template-columns:1fr 1fr">
    <div class="info-box">
      <div class="info-label">Quote Created</div>
      <div class="info-value">${quote.createdAt ? DocumentUtils.formatDate(new Date(quote.createdAt)) : 'N/A'}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Last Updated</div>
      <div class="info-value">${quote.updatedAt ? DocumentUtils.formatDate(new Date(quote.updatedAt)) : 'N/A'}</div>
    </div>
  </div>
</div>

<div style="margin-top:40px;padding-top:30px;border-top:3px solid #dee2e6;text-align:center;color:#666">
  <div style="font-size:18px;font-weight:700;margin-bottom:8px">Sherman Pole Buildings</div>
  <div style="font-size:14px">2244 Hwy 65, Mora, MN 55051</div>
  <div style="font-size:14px">Phone: (320) 679-3438</div>
  <div style="font-size:12px;margin-top:15px;font-style:italic">CONFIDENTIAL — Internal Job Summary Report</div>
</div>

</body></html>`;
};
