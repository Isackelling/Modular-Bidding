import { HOME_OPTIONS, LICENSED_SERVICES, DEFAULT_SERVICES, formatPhone, DocumentUtils, COMPANY, calcTotalsWithDefaults, formatNoteDateTime, buildServiceData as _buildSvcData, collectOtherServices, getFoundationName } from './shared.js';

export const generateCrewWorkOrderDocument = (quote, customer, servicesParam) => {
  const services = servicesParam || DEFAULT_SERVICES;
  const today = DocumentUtils.formatDate();
  const quoteNum = DocumentUtils.getQuoteNum(quote);
  const totals = calcTotalsWithDefaults(quote, services);

  const bsd = (key) => _buildSvcData(key, quote, services, totals);

  const installServices = Object.entries(quote.selectedServices || {})
    .filter(([key, selected]) => selected && LICENSED_SERVICES.includes(key))
    .map(([key]) => bsd(key));

  const professionalServices = Object.entries(quote.selectedServices || {})
    .filter(([key, selected]) => selected && !LICENSED_SERVICES.includes(key) && !HOME_OPTIONS.includes(key))
    .map(([key]) => bsd(key));

  const homeSpecAdditions = Object.entries(quote.selectedServices || {})
    .filter(([key, selected]) => selected && HOME_OPTIONS.includes(key))
    .map(([key]) => bsd(key));

  const otherServices = collectOtherServices(quote, totals);
  const foundationName = getFoundationName(quote.foundationType);

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Crew Work Order - ${customer.firstName || 'Customer'} ${customer.lastName || ''}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;max-width:1100px;margin:0 auto;color:#222;line-height:1.6}
.header{background:linear-gradient(135deg,#ff6b35 0%,#f7931e 100%);color:#fff;padding:30px;border-radius:10px;margin-bottom:30px;box-shadow:0 4px 12px rgba(0,0,0,0.15)}
.title{font-size:38px;font-weight:900;margin:0;letter-spacing:-0.5px}
.subtitle{font-size:16px;margin-top:8px;opacity:0.95;font-weight:500}
.info-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-bottom:30px}
.info-box{background:#f8f9fa;padding:18px;border-radius:8px;border-left:4px solid #ff6b35}
.info-label{font-weight:700;margin-bottom:8px;color:#ff6b35;font-size:13px;text-transform:uppercase;letter-spacing:0.5px}
.info-value{font-size:15px;color:#333}
.section-title{font-size:24px;font-weight:800;color:#ff6b35;margin:40px 0 20px;border-bottom:3px solid #ff6b35;padding-bottom:8px;text-transform:uppercase;letter-spacing:0.5px}
.service-card{background:#fff;border:2px solid #dee2e6;border-radius:8px;padding:20px;margin-bottom:20px;box-shadow:0 2px 6px rgba(0,0,0,0.08);transition:all 0.3s ease}
.service-card.completed{background:#f1f8f4;border-color:#2e7d32;opacity:0.7}
.service-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;padding-bottom:12px;border-bottom:2px solid #e9ecef}
.service-name{font-size:20px;font-weight:800;color:#2c5530;display:flex;align-items:center;gap:12px}
.service-checkbox{width:24px;height:24px;cursor:pointer;accent-color:#2e7d32}
.service-cost{font-size:18px;font-weight:700;color:#ff6b35}
.service-description{font-size:14px;color:#666;margin-bottom:12px;font-style:italic}
.service-details{display:flex;gap:20px;margin-bottom:15px;font-size:14px}
.service-detail-item{background:#f1f3f5;padding:8px 12px;border-radius:4px;font-weight:600}
.crew-note{background:#fff3e0;border-left:4px solid #ff6b35;padding:15px;border-radius:4px;margin-top:12px}
.crew-note-title{font-weight:700;color:#e65100;margin-bottom:8px;font-size:14px;display:flex;align-items:center;gap:8px}
.crew-note-content{font-size:14px;line-height:1.6;white-space:pre-wrap;color:#333}
.customer-note{background:#e3f2fd;border-left:4px solid #1565c0;padding:15px;border-radius:4px;margin-top:12px}
.customer-note-title{font-weight:700;color:#1565c0;margin-bottom:8px;font-size:14px;display:flex;align-items:center;gap:8px}
.customer-note-content{font-size:14px;line-height:1.6;white-space:pre-wrap;color:#333}
.important-box{background:#ffebee;border:3px solid #c62828;padding:20px;border-radius:8px;margin:25px 0}
.important-title{font-weight:800;color:#c62828;font-size:18px;margin-bottom:12px;display:flex;align-items:center;gap:8px}
.project-summary{background:#e8f5e9;border:2px solid #2e7d32;padding:20px;border-radius:8px;margin-bottom:30px}
.summary-title{font-weight:800;color:#2e7d32;font-size:18px;margin-bottom:15px}
.summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px}
.summary-item{font-size:15px;padding:8px 0}
.summary-label{font-weight:700;color:#2e7d32}
.no-services{background:#f8f9fa;padding:30px;text-align:center;color:#666;border-radius:8px;font-style:italic}
.progress-bar-container{background:#e0e0e0;border-radius:10px;height:30px;margin:20px 0;overflow:hidden;position:relative}
.progress-bar{background:linear-gradient(90deg,#2e7d32 0%,#66bb6a 100%);height:100%;transition:width 0.5s ease;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px}
.checklist-item{display:flex;align-items:flex-start;gap:10px;margin:8px 0;padding:8px;border-radius:4px;transition:background 0.2s}
.checklist-item:hover{background:#f5f5f5}
.checklist-checkbox{width:20px;height:20px;cursor:pointer;margin-top:2px;accent-color:#2e7d32;flex-shrink:0}
.checklist-label{flex-grow:1;cursor:pointer;user-select:none}
.checklist-item.checked .checklist-label{text-decoration:line-through;opacity:0.6}
.crew-comment-section{margin-top:12px;padding:12px;background:#f8f9fa;border-radius:6px;border-left:3px solid #2e7d32}
.crew-comment-label{font-size:12px;font-weight:700;color:#2e7d32;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.crew-comment-input{width:100%;padding:8px;border:2px solid #dee2e6;border-radius:4px;font-size:13px;font-family:inherit;resize:vertical;min-height:60px;transition:border-color 0.2s}
.crew-comment-input:focus{outline:none;border-color:#2e7d32}
.crew-comment-input::placeholder{color:#999;font-style:italic}
.checklist-item-wrapper{display:flex;flex-direction:column;width:100%}
.collapsible-section{margin-bottom:30px}
.section-header{display:flex;justify-content:space-between;align-items:center;cursor:pointer;padding:15px 20px;background:linear-gradient(135deg,#ff6b35 0%,#f7931e 100%);border-radius:8px;margin-bottom:0;transition:all 0.3s ease}
.section-header:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(255,107,53,0.3)}
.section-header-title{font-size:24px;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:0.5px;display:flex;align-items:center;gap:10px}
.section-toggle-btn{background:rgba(255,255,255,0.2);border:2px solid #fff;color:#fff;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;transition:all 0.3s ease;cursor:pointer}
.section-toggle-btn:hover{background:rgba(255,255,255,0.4);transform:scale(1.1)}
.section-content{max-height:0;overflow:hidden;transition:max-height 0.5s ease;padding:0}
.section-content.expanded{max-height:50000px;padding:20px 0}
.delivery-section .section-header{background:linear-gradient(135deg,#1565c0 0%,#42a5f5 100%)}
.delivery-section .section-header:hover{box-shadow:0 4px 12px rgba(21,101,192,0.3)}
.completion-section .section-header{background:linear-gradient(135deg,#2e7d32 0%,#66bb6a 100%)}
.completion-section .section-header:hover{box-shadow:0 4px 12px rgba(46,125,50,0.3)}
@media print{body{padding:15px;font-size:12px}.service-card{page-break-inside:avoid}.progress-bar-container{display:none}.crew-comment-input{border:1px solid #999;min-height:40px}.section-content{max-height:none!important;padding:20px 0!important}.section-toggle-btn{display:none}}
</style></head><body>

<div class="header">
  <div class="title">🔧 CREW WORK ORDER</div>
  <div class="subtitle">Internal Installation & Service Instructions - Check off tasks as you complete them</div>
  <div style="margin-top:15px;font-size:14px;display:flex;justify-content:space-between;opacity:0.95">
    <span><strong>Quote #:</strong> ${quoteNum}</span>
    <span><strong>Generated:</strong> ${today}</span>
  </div>
  <div class="progress-bar-container" style="margin-top:20px">
    <div class="progress-bar" id="progressBar" style="width:0%">
      <span id="progressText">0% Complete</span>
    </div>
  </div>
</div>

<!-- CUSTOMER & PROJECT INFO -->
<div class="info-grid">
  <div class="info-box">
    <div class="info-label">Customer</div>
    <div class="info-value" style="font-size:17px;font-weight:700;margin-bottom:6px">${customer.firstName} ${customer.lastName}</div>
    <div class="info-value" style="font-size:13px">📞 ${formatPhone(customer.phone)}</div>
    <div class="info-value" style="font-size:13px">✉️ ${customer.email}</div>
  </div>
  <div class="info-box">
    <div class="info-label">Site Address</div>
    <div class="info-value">${customer.siteAddress}</div>
    <div class="info-value">${customer.siteCity}, ${customer.siteState} ${customer.siteZip}</div>
  </div>
  <div class="info-box">
    <div class="info-label">Contact Person</div>
    <div class="info-value">${quote.contactPerson || 'Primary Contact'}</div>
    <div class="info-value" style="font-size:13px">${formatPhone(quote.contactPhone || customer.phone)}</div>
  </div>
</div>

<!-- PROJECT SUMMARY -->
<div class="project-summary">
  <div class="summary-title">📋 Project Overview</div>
  <div class="summary-grid">
    <div class="summary-item"><span class="summary-label">Home Type:</span> ${quote.singleDouble === 'double' ? 'Double-Wide' : 'Single-Wide'}</div>
    <div class="summary-item"><span class="summary-label">Model:</span> ${quote.homeModel !== 'NONE' ? quote.homeModel : 'Custom'}</div>
    <div class="summary-item"><span class="summary-label">Dimensions:</span> ${quote.houseWidth}' × ${quote.houseLength}'</div>
    <div class="summary-item"><span class="summary-label">Foundation:</span> ${foundationName}</div>
    <div class="summary-item"><span class="summary-label">Drive Time:</span> ${quote.driveTime} miles (${(parseFloat(quote.driveTime) * 2).toFixed(0)} miles round trip)</div>
    <div class="summary-item"><span class="summary-label">Total Services:</span> ${installServices.length + professionalServices.length + homeSpecAdditions.length + otherServices.length}</div>
  </div>
</div>

<!-- IMPORTANT NOTES -->
<div class="important-box">
  <div class="important-title">⚠️ BEFORE STARTING WORK</div>
  <ul style="margin:10px 0;padding-left:25px;line-height:1.8">
    <li><strong>Review ALL crew notes</strong> below for special instructions from sales rep</li>
    <li><strong>Verify site access</strong> - Check for overhead clearance, turning radius, and staging area</li>
    <li><strong>Confirm utilities</strong> - Electric, water, sewer/septic ready at property line</li>
    <li><strong>Weather check</strong> - Do not proceed in high winds, rain, or icy conditions</li>
    <li><strong>Contact customer</strong> 24 hours before arrival to confirm schedule</li>
    <li><strong>Document everything</strong> - Take photos before, during, and after work</li>
  </ul>
</div>

${(() => {
  // --- CREW NOTE SUMMARY ---
  const crewNotes = [];

  // General project crew notes
  const generalCrewNotes = quote.publishedGeneralCrewNotes || [];
  if (generalCrewNotes.length > 0) crewNotes.push({ name: 'General Project Notes', notes: generalCrewNotes });

  // Home selection crew notes
  const homeCrewNotes = quote.publishedServiceCrewNotes?.home_selection || [];
  if (homeCrewNotes.length > 0) crewNotes.push({ name: 'Home Selection', notes: homeCrewNotes });

  // Foundation crew notes
  const foundCrewNotes = quote.publishedServiceCrewNotes?.foundation || [];
  if (foundCrewNotes.length > 0) crewNotes.push({ name: 'Foundation', notes: foundCrewNotes });

  // All service arrays - crew notes
  [installServices, professionalServices, homeSpecAdditions, otherServices].flat().forEach(svc => {
    if (svc.publishedCrewNotes.length > 0) {
      crewNotes.push({ name: svc.name, notes: svc.publishedCrewNotes });
    }
  });

  const crewTotal = crewNotes.reduce((c, s) => c + s.notes.length, 0);

  // --- CUSTOMER NOTE SUMMARY ---
  const custNotes = [];

  // General project customer notes
  const generalCustNotes = quote.publishedGeneralCustomerNotes || [];
  if (generalCustNotes.length > 0) custNotes.push({ name: 'General Project Notes', notes: generalCustNotes });

  // Home selection customer notes
  const homeCustNotes = quote.publishedServiceNotes?.home_selection || [];
  if (homeCustNotes.length > 0) custNotes.push({ name: 'Home Selection', notes: homeCustNotes });

  // Foundation customer notes
  const foundCustNotes = quote.publishedServiceNotes?.foundation || [];
  if (foundCustNotes.length > 0) custNotes.push({ name: 'Foundation', notes: foundCustNotes });

  // All service arrays - customer notes
  [installServices, professionalServices, homeSpecAdditions, otherServices].flat().forEach(svc => {
    if (svc.publishedCustomerNotes && svc.publishedCustomerNotes.length > 0) {
      custNotes.push({ name: svc.name, notes: svc.publishedCustomerNotes });
    }
  });

  const custTotal = custNotes.reduce((c, s) => c + s.notes.length, 0);

  const totalNotes = crewTotal + custTotal;

  let html = `
<!-- NOTE SUMMARY -->
<div class="collapsible-section">
  <div class="section-header" onclick="toggleSection('note-summary')" style="background:linear-gradient(135deg,#2c5530 0%,#4a7c59 100%)">
    <div class="section-header-title">
      📋 NOTE SUMMARY (${totalNotes} Notes)
    </div>
    <div class="section-toggle-btn" id="toggle-note-summary">+</div>
  </div>
  <div class="section-content" id="content-note-summary">
${crewTotal > 0 ? `
  <div style="margin-bottom:${custTotal > 0 ? '20px' : '0'}">
    <div style="font-size:15px;font-weight:800;color:#e65100;margin-bottom:10px">🔧 Crew Notes (${crewTotal})</div>
    ${crewNotes.map(svc => `
    <div style="margin-bottom:12px;padding:12px;background:#fff3e0;border-left:4px solid #e65100;border-radius:4px">
      <div style="font-size:14px;font-weight:800;color:#e65100;margin-bottom:6px">${svc.name}</div>
      <ul style="margin:0;padding-left:20px;line-height:1.8">
        ${svc.notes.map(note => `
        <li><strong>${note.text}</strong>
          <span style="font-size:11px;color:#999;font-style:italic;margin-left:8px">— ${note.publishedBy}</span>
        </li>
        `).join('')}
      </ul>
    </div>
    `).join('')}
  </div>
` : ''}
${custTotal > 0 ? `
  <div>
    <div style="font-size:15px;font-weight:800;color:#1565c0;margin-bottom:4px">💬 Customer Notes (${custTotal})</div>
    <div style="font-size:12px;color:#1565c0;font-weight:600;margin-bottom:10px;font-style:italic">Notes shared with the customer — review so you know what was communicated.</div>
    ${custNotes.map(svc => `
    <div style="margin-bottom:12px;padding:12px;background:#e3f2fd;border-left:4px solid #1565c0;border-radius:4px">
      <div style="font-size:14px;font-weight:800;color:#1565c0;margin-bottom:6px">${svc.name}</div>
      <ul style="margin:0;padding-left:20px;line-height:1.8">
        ${svc.notes.map(note => `
        <li><strong>${note.text}</strong>
          <span style="font-size:11px;color:#999;font-style:italic;margin-left:8px">— ${note.publishedBy}</span>
        </li>
        `).join('')}
      </ul>
    </div>
    `).join('')}
  </div>
` : ''}
${totalNotes === 0 ? '<div style="padding:10px;text-align:center;color:#999;font-style:italic">No notes for this project</div>' : ''}
  </div>
</div>
`;

  return html;
})()}

<!-- DELIVERY & INSPECTION CHECKLIST -->
<div class="collapsible-section delivery-section">
  <div class="section-header" onclick="toggleSection('delivery-checklist')">
    <div class="section-header-title">
      📦 DELIVERY & INSPECTION CHECKLIST
    </div>
    <div class="section-toggle-btn" id="toggle-delivery-checklist">+</div>
  </div>
  <div class="section-content" id="content-delivery-checklist">

<div style="background:#e3f2fd;border:2px solid #1565c0;border-radius:8px;padding:20px;margin-bottom:30px">

  <!-- Documentation and Compliance -->
  <div style="font-size:20px;font-weight:800;color:#1565c0;margin-bottom:15px;border-bottom:2px solid #1565c0;padding-bottom:8px">📄 Documentation and Compliance</div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_hud_data_plate">
      <label class="checklist-label">Verify the HUD data plate is present</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_hud_data_plate" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_hud_cert">
      <label class="checklist-label">Confirm the HUD certification label</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_hud_cert" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_manufacturer_install">
      <label class="checklist-label">Check for manufacturer's installation instructions</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_manufacturer_install" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_warranties">
      <label class="checklist-label">Review warranties, manuals for appliances</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_warranties" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_rivet_badge">
      <label class="checklist-label">Rivet Install Badge and White # on home</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_rivet_badge" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>

  <!-- Exterior Inspection -->
  <div style="font-size:20px;font-weight:800;color:#1565c0;margin:25px 0 15px;border-bottom:2px solid #1565c0;padding-bottom:8px">🏠 Exterior Inspection</div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_siding">
      <label class="checklist-label">Examine siding for breaks, dents, damage</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_siding" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_roof">
      <label class="checklist-label">Inspect the roof for leaks, missing shingles, damage</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_roof" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_windows">
      <label class="checklist-label">Check windows for breaks, proper operation</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_windows" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_trim">
      <label class="checklist-label">Inspect trim, porches, decks, and exterior fixtures</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_trim" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_transit_damage">
      <label class="checklist-label">Check for transit damage (e.g., scratches, dents)</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_transit_damage" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_gas_line">
      <label class="checklist-label">Gas Line Location</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_gas_line" placeholder="Location details..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_electric_stub">
      <label class="checklist-label">Electric stub - How many Ft.</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_electric_stub" placeholder="Measurement in feet..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_water_line">
      <label class="checklist-label">Water Line - How many ft for hookup</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_water_line" placeholder="Measurement in feet..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_sewer_line">
      <label class="checklist-label">Sewer line location - How many Ft.</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_sewer_line" placeholder="Measurement in feet..." style="min-height:50px"></textarea>
    </div>
  </div>

  <!-- Interior Inspection -->
  <div style="font-size:20px;font-weight:800;color:#1565c0;margin:25px 0 15px;border-bottom:2px solid #1565c0;padding-bottom:8px">🔍 Interior Inspection</div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_drywall">
      <label class="checklist-label">Check drywall/walls for excessive damage</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_drywall" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_ceilings">
      <label class="checklist-label">Inspect ceilings for sags, stains, or damage</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_ceilings" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_floors">
      <label class="checklist-label">Examine floors for levelness, soft spots</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_floors" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_cabinets">
      <label class="checklist-label">Verify cabinets, countertops, and fixtures</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_cabinets" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_insulation">
      <label class="checklist-label">Check insulation in walls, floors, ceilings</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_insulation" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>

  <!-- Appliances and Equipment -->
  <div style="font-size:20px;font-weight:800;color:#1565c0;margin:25px 0 15px;border-bottom:2px solid #1565c0;padding-bottom:8px">🔌 Appliances and Equipment</div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_appliances">
      <label class="checklist-label">Check appliances (e.g., fridge, stove, dishwasher)</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_appliances" placeholder="List appliances and condition..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_equipment">
      <label class="checklist-label">Ensure all installed equipment (e.g., HVAC) is functional</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_equipment" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>

  <!-- Verify Material List -->
  <div style="font-size:20px;font-weight:800;color:#1565c0;margin:25px 0 15px;border-bottom:2px solid #1565c0;padding-bottom:8px">📋 Verify Material List</div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_door_jam">
      <label class="checklist-label">Door Jam Board</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_door_jam" placeholder="Quantity/condition..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_door_casement">
      <label class="checklist-label">Door Casement</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_door_casement" placeholder="Quantity/condition..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_door_stops">
      <label class="checklist-label">Door Stops</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_door_stops" placeholder="Quantity/condition..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_screen_door">
      <label class="checklist-label">Screen Door</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_screen_door" placeholder="Quantity/condition..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_vinyl_floor">
      <label class="checklist-label">Vinyl Floor Coverings - Enough for project?</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_vinyl_floor" placeholder="Quantity/sq ft..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_sewer_pipe">
      <label class="checklist-label">How many ft of Sewer Pipe</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_sewer_pipe" placeholder="Measurement in feet..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_beam_trim">
      <label class="checklist-label">Beam Trim</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_beam_trim" placeholder="Quantity/condition..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_siding_material">
      <label class="checklist-label">Siding</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_siding_material" placeholder="Quantity/condition..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_siding_starter">
      <label class="checklist-label">Siding Starter</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_siding_starter" placeholder="Quantity/condition..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_facia">
      <label class="checklist-label">Facia</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_facia" placeholder="Quantity/condition..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_roof_facia">
      <label class="checklist-label">Roof Facia</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_roof_facia" placeholder="Quantity/condition..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_soffits">
      <label class="checklist-label">Soffits</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_soffits" placeholder="Quantity/condition..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_j_channel">
      <label class="checklist-label">J-channel</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_j_channel" placeholder="Quantity/condition..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_paint">
      <label class="checklist-label">Paint</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_paint" placeholder="Quantity/condition..." style="min-height:50px"></textarea>
    </div>
  </div>

  <!-- Final Steps -->
  <div style="font-size:20px;font-weight:800;color:#1565c0;margin:25px 0 15px;border-bottom:2px solid #1565c0;padding-bottom:8px">📸 Final Steps</div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_pictures">
      <label class="checklist-label">Take many Pictures and attach to this Document</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_pictures" placeholder="Number of photos taken, what was documented..." style="min-height:50px"></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_clean_floors">
      <label class="checklist-label">Clean all floors and lay floor coverings to protect</label>
    </div>
    <div style="margin-left:30px;margin-top:8px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_clean_floors" placeholder="Comments..." style="min-height:50px"></textarea>
    </div>
  </div>

</div>

  </div>
</div>

${installServices.length > 0 ? `
<!-- INSTALL SERVICES SECTION -->
<div class="collapsible-section">
  <div class="section-header" onclick="toggleSection('install-services')">
    <div class="section-header-title">
      🏗️ Licensed Required Services
    </div>
    <div class="section-toggle-btn" id="toggle-install-services">+</div>
  </div>
  <div class="section-content" id="content-install-services">
${installServices.map(svc => svc.key === 'plumbing' ? `
<div class="service-card" data-task-id="install_plumbing">
  <div class="service-header">
    <div class="service-name">
      <span>${svc.name}</span>
    </div>
  </div>
  ${svc.description ? `<div class="service-description">${svc.description}</div>` : ''}
  <div style="padding:10px 15px;display:flex;flex-direction:column;gap:10px">
    <div style="display:flex;align-items:center;gap:10px">
      <input type="checkbox" class="service-checkbox task-checkbox" data-task-id="install_plumbing_water" style="width:18px;height:18px">
      <label style="font-size:14px;font-weight:600">🚰 Water Connection</label>
    </div>
    <div style="display:flex;align-items:center;gap:10px">
      <input type="checkbox" class="service-checkbox task-checkbox" data-task-id="install_plumbing_sewer" style="width:18px;height:18px">
      <label style="font-size:14px;font-weight:600">🚿 Sewer Connection</label>
    </div>
  </div>
  ${svc.publishedCrewNotes.length > 0 ? svc.publishedCrewNotes.map(note => `
  <div class="crew-note" style="margin-bottom:12px">
    <div class="crew-note-title">🔧 CREW INSTRUCTIONS</div>
    <div class="crew-note-content">${note.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
    </div>
  </div>
  `).join('') : ''}
  ${svc.publishedCustomerNotes && svc.publishedCustomerNotes.length > 0 ? svc.publishedCustomerNotes.map(note => `
  <div class="customer-note" style="margin-bottom:10px">
    <div class="customer-note-title">💬 Customer Note</div>
    <div class="customer-note-content">${note.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
    </div>
  </div>
  `).join('') : ''}
  ${svc.customerNote ? `
  <div class="customer-note" style="opacity:0.7">
    <div class="customer-note-title">📝 Draft Customer Note (unpublished)</div>
    <div class="customer-note-content">${svc.customerNote}</div>
  </div>
  ` : ''}
  <div class="crew-comment-section">
    <div class="crew-comment-label">💭 Crew Feedback / Survey Comments:</div>
    <textarea class="crew-comment-input task-comment" data-task-id="install_plumbing" placeholder="Add your comments, observations, issues, or suggestions about this task..."></textarea>
  </div>
</div>
` : `
<div class="service-card" data-task-id="install_${svc.key}">
  <div class="service-header">
    <div class="service-name">
      <input type="checkbox" class="service-checkbox task-checkbox" data-task-id="install_${svc.key}">
      <span>${svc.name}</span>
    </div>
  </div>
  ${svc.description ? `<div class="service-description">${svc.description}</div>` : ''}
  ${svc.quantity || svc.days ? `
  <div class="service-details">
    ${svc.quantity ? `<div class="service-detail-item">📦 Quantity: ${svc.quantity}</div>` : ''}
    ${svc.days ? `<div class="service-detail-item">📅 Days: ${svc.days}</div>` : ''}
  </div>
  ` : ''}
  ${svc.publishedCrewNotes.length > 0 ? svc.publishedCrewNotes.map(note => `
  <div class="crew-note" style="margin-bottom:12px">
    <div class="crew-note-title">🔧 CREW INSTRUCTIONS</div>
    <div class="crew-note-content">${note.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
    </div>
  </div>
  `).join('') : ''}
  ${svc.publishedCustomerNotes && svc.publishedCustomerNotes.length > 0 ? svc.publishedCustomerNotes.map(note => `
  <div class="customer-note" style="margin-bottom:10px">
    <div class="customer-note-title">💬 Customer Note</div>
    <div class="customer-note-content">${note.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
    </div>
  </div>
  `).join('') : ''}
  ${svc.customerNote ? `
  <div class="customer-note" style="opacity:0.7">
    <div class="customer-note-title">📝 Draft Customer Note (unpublished)</div>
    <div class="customer-note-content">${svc.customerNote}</div>
  </div>
  ` : ''}
  <div class="crew-comment-section">
    <div class="crew-comment-label">💭 Crew Feedback / Survey Comments:</div>
    <textarea class="crew-comment-input task-comment" data-task-id="install_${svc.key}" placeholder="Add your comments, observations, issues, or suggestions about this task..."></textarea>
  </div>
</div>
`).join('')}
  </div>
</div>
` : ''}

${professionalServices.length > 0 ? `
<!-- PROFESSIONAL SERVICES SECTION -->
<div class="collapsible-section">
  <div class="section-header" onclick="toggleSection('professional-services')">
    <div class="section-header-title">
      ⚡ Professional Services
    </div>
    <div class="section-toggle-btn" id="toggle-professional-services">+</div>
  </div>
  <div class="section-content" id="content-professional-services">
${professionalServices.map(svc => `
<div class="service-card" data-task-id="professional_${svc.key}">
  <div class="service-header">
    <div class="service-name">
      <input type="checkbox" class="service-checkbox task-checkbox" data-task-id="professional_${svc.key}">
      <span>${svc.name}</span>
    </div>
  </div>
  ${svc.description ? `<div class="service-description">${svc.description}</div>` : ''}
  ${svc.quantity || svc.days ? `
  <div class="service-details">
    ${svc.quantity ? `<div class="service-detail-item">📦 Quantity: ${svc.quantity}</div>` : ''}
    ${svc.days ? `<div class="service-detail-item">📅 Days: ${svc.days}</div>` : ''}
  </div>
  ` : ''}
  ${svc.publishedCrewNotes.length > 0 ? svc.publishedCrewNotes.map(note => `
  <div class="crew-note" style="margin-bottom:12px">
    <div class="crew-note-title">🔧 CREW INSTRUCTIONS</div>
    <div class="crew-note-content">${note.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
    </div>
  </div>
  `).join('') : ''}
  ${svc.publishedCustomerNotes && svc.publishedCustomerNotes.length > 0 ? svc.publishedCustomerNotes.map(note => `
  <div class="customer-note" style="margin-bottom:10px">
    <div class="customer-note-title">💬 Customer Note</div>
    <div class="customer-note-content">${note.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
    </div>
  </div>
  `).join('') : ''}
  ${svc.customerNote ? `
  <div class="customer-note" style="opacity:0.7">
    <div class="customer-note-title">📝 Draft Customer Note (unpublished)</div>
    <div class="customer-note-content">${svc.customerNote}</div>
  </div>
  ` : ''}
  <div class="crew-comment-section">
    <div class="crew-comment-label">💭 Crew Feedback / Survey Comments:</div>
    <textarea class="crew-comment-input task-comment" data-task-id="professional_${svc.key}" placeholder="Add your comments, observations, issues, or suggestions about this task..."></textarea>
  </div>
</div>
`).join('')}
  </div>
</div>
` : ''}

${homeSpecAdditions.length > 0 ? `
<!-- HOME SPEC ADDITIONS SECTION -->
<div class="collapsible-section">
  <div class="section-header" onclick="toggleSection('homespec-services')">
    <div class="section-header-title">
      🏠 Home Spec Additions
    </div>
    <div class="section-toggle-btn" id="toggle-homespec-services">+</div>
  </div>
  <div class="section-content" id="content-homespec-services">
${homeSpecAdditions.map(svc => `
<div class="service-card" data-task-id="homespec_${svc.key}">
  <div class="service-header">
    <div class="service-name">
      <input type="checkbox" class="service-checkbox task-checkbox" data-task-id="homespec_${svc.key}">
      <span>${svc.name}</span>
    </div>
  </div>
  ${svc.description ? `<div class="service-description">${svc.description}</div>` : ''}
  ${svc.quantity || svc.days ? `
  <div class="service-details">
    ${svc.quantity ? `<div class="service-detail-item">📦 Quantity: ${svc.quantity}</div>` : ''}
    ${svc.days ? `<div class="service-detail-item">📅 Days: ${svc.days}</div>` : ''}
  </div>
  ` : ''}
  ${svc.publishedCrewNotes.length > 0 ? svc.publishedCrewNotes.map(note => `
  <div class="crew-note" style="margin-bottom:12px">
    <div class="crew-note-title">🔧 CREW INSTRUCTIONS</div>
    <div class="crew-note-content">${note.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
    </div>
  </div>
  `).join('') : ''}
  ${svc.publishedCustomerNotes && svc.publishedCustomerNotes.length > 0 ? svc.publishedCustomerNotes.map(note => `
  <div class="customer-note" style="margin-bottom:10px">
    <div class="customer-note-title">💬 Customer Note</div>
    <div class="customer-note-content">${note.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
    </div>
  </div>
  `).join('') : ''}
  ${svc.customerNote ? `
  <div class="customer-note" style="opacity:0.7">
    <div class="customer-note-title">📝 Draft Customer Note (unpublished)</div>
    <div class="customer-note-content">${svc.customerNote}</div>
  </div>
  ` : ''}
  <div class="crew-comment-section">
    <div class="crew-comment-label">💭 Crew Feedback / Survey Comments:</div>
    <textarea class="crew-comment-input task-comment" data-task-id="homespec_${svc.key}" placeholder="Add your comments, observations, issues, or suggestions about this task..."></textarea>
  </div>
</div>
`).join('')}
  </div>
</div>
` : ''}

${otherServices.length > 0 ? `
<!-- OTHER SERVICES SECTION -->
<div class="collapsible-section">
  <div class="section-header" onclick="toggleSection('other-services')">
    <div class="section-header-title">
      🔨 Additional Services
    </div>
    <div class="section-toggle-btn" id="toggle-other-services">+</div>
  </div>
  <div class="section-content" id="content-other-services">
${otherServices.map(svc => `
<div class="service-card" data-task-id="other_${svc.key}">
  <div class="service-header">
    <div class="service-name">
      <input type="checkbox" class="service-checkbox task-checkbox" data-task-id="other_${svc.key}">
      <span>${svc.name}</span>
    </div>
  </div>
  ${svc.description ? `<div class="service-description">${svc.description}</div>` : ''}
  ${svc.publishedCrewNotes.length > 0 ? svc.publishedCrewNotes.map(note => `
  <div class="crew-note" style="margin-bottom:12px">
    <div class="crew-note-title">🔧 CREW INSTRUCTIONS</div>
    <div class="crew-note-content">${note.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
    </div>
  </div>
  `).join('') : ''}
  ${svc.publishedCustomerNotes && svc.publishedCustomerNotes.length > 0 ? svc.publishedCustomerNotes.map(note => `
  <div class="customer-note" style="margin-bottom:10px">
    <div class="customer-note-title">💬 Customer Note</div>
    <div class="customer-note-content">${note.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
    </div>
  </div>
  `).join('') : ''}
  ${svc.customerNote ? `
  <div class="customer-note" style="opacity:0.7">
    <div class="customer-note-title">📝 Draft Customer Note (unpublished)</div>
    <div class="customer-note-content">${svc.customerNote}</div>
  </div>
  ` : ''}
  <div class="crew-comment-section">
    <div class="crew-comment-label">💭 Crew Feedback / Survey Comments:</div>
    <textarea class="crew-comment-input task-comment" data-task-id="other_${svc.key}" placeholder="Add your comments, observations, issues, or suggestions about this task..."></textarea>
  </div>
</div>
`).join('')}
  </div>
</div>
` : ''}

${installServices.length === 0 && professionalServices.length === 0 && homeSpecAdditions.length === 0 && otherServices.length === 0 ? `
<div class="no-services">
  <div style="font-size:24px;margin-bottom:10px">📋</div>
  <div>No services selected for this quote</div>
</div>
` : ''}

<!-- COMPLETION CHECKLIST -->
<div class="collapsible-section completion-section">
  <div class="section-header" onclick="toggleSection('completion-checklist')">
    <div class="section-header-title">
      ✅ COMPLETION CHECKLIST
    </div>
    <div class="section-toggle-btn" id="toggle-completion-checklist">+</div>
  </div>
  <div class="section-content" id="content-completion-checklist">

<div class="important-box" style="background:#e8f5e9;border-color:#2e7d32">
  <div style="margin:10px 0">
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_services_complete">
        <label class="checklist-label">All services listed above completed per specifications</label>
      </div>
      <div style="margin-left:30px;margin-top:8px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_services_complete" placeholder="Comments or notes..." style="min-height:50px"></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_site_cleaned">
        <label class="checklist-label">Site cleaned and debris removed</label>
      </div>
      <div style="margin-left:30px;margin-top:8px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_site_cleaned" placeholder="Comments or notes..." style="min-height:50px"></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_walkthrough">
        <label class="checklist-label">Customer walkthrough completed</label>
      </div>
      <div style="margin-left:30px;margin-top:8px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_walkthrough" placeholder="Comments or notes..." style="min-height:50px"></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_issues_documented">
        <label class="checklist-label">Any issues or concerns documented</label>
      </div>
      <div style="margin-left:30px;margin-top:8px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_issues_documented" placeholder="Comments or notes..." style="min-height:50px"></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_photos">
        <label class="checklist-label">Photos taken of completed work</label>
      </div>
      <div style="margin-left:30px;margin-top:8px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_photos" placeholder="Comments or notes..." style="min-height:50px"></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_signature">
        <label class="checklist-label">Customer signature obtained (if required)</label>
      </div>
      <div style="margin-left:30px;margin-top:8px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_signature" placeholder="Comments or notes..." style="min-height:50px"></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_materials">
        <label class="checklist-label">Materials inventory updated</label>
      </div>
      <div style="margin-left:30px;margin-top:8px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_materials" placeholder="Comments or notes..." style="min-height:50px"></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_timesheets">
        <label class="checklist-label">Time sheets submitted</label>
      </div>
      <div style="margin-left:30px;margin-top:8px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_timesheets" placeholder="Comments or notes..." style="min-height:50px"></textarea>
      </div>
    </div>
  </div>
</div>

  </div>
</div>

<div style="margin-top:40px;padding-top:30px;border-top:3px solid #dee2e6;text-align:center;color:#666">
  <div style="font-size:18px;font-weight:700;margin-bottom:8px">${COMPANY.name}</div>
  <div style="font-size:14px">${COMPANY.address}</div>
  <div style="font-size:14px">Phone: ${COMPANY.phone}</div>
  <div style="font-size:12px;margin-top:15px;font-style:italic">This is an internal crew document - Not for customer distribution</div>
</div>

<script>
// Crew Work Order Checklist Manager with Comments
(function() {
  const quoteId = '${quoteNum}';
  const storageKey = 'crew_checklist_' + quoteId;
  const commentsKey = 'crew_comments_' + quoteId;

  // Toggle section expand/collapse
  window.toggleSection = function(sectionId) {
    const content = document.getElementById('content-' + sectionId);
    const toggle = document.getElementById('toggle-' + sectionId);

    if (content.classList.contains('expanded')) {
      content.classList.remove('expanded');
      toggle.textContent = '+';
    } else {
      content.classList.add('expanded');
      toggle.textContent = '−';
    }
  };

  // Load saved checkbox states from localStorage
  function loadChecklistState() {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {};
  }

  // Save checkbox state to localStorage
  function saveChecklistState(checklistState) {
    localStorage.setItem(storageKey, JSON.stringify(checklistState));
  }

  // Load saved comments from localStorage
  function loadCommentsState() {
    const saved = localStorage.getItem(commentsKey);
    return saved ? JSON.parse(saved) : {};
  }

  // Save comments state to localStorage
  function saveCommentsState(commentsState) {
    localStorage.setItem(commentsKey, JSON.stringify(commentsState));
  }

  // Update progress bar based on completion percentage
  function updateProgressBar() {
    const allCheckboxes = document.querySelectorAll('.task-checkbox');
    const checkedCheckboxes = document.querySelectorAll('.task-checkbox:checked');
    const total = allCheckboxes.length;
    const completed = checkedCheckboxes.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    if (progressBar && progressText) {
      progressBar.style.width = percentage + '%';
      progressText.textContent = percentage + '% Complete (' + completed + '/' + total + ' tasks)';
    }
  }

  // Toggle service card completed styling
  function updateServiceCardStyle(checkbox) {
    const serviceCard = checkbox.closest('.service-card');
    if (serviceCard) {
      if (checkbox.checked) {
        serviceCard.classList.add('completed');
      } else {
        serviceCard.classList.remove('completed');
      }
    }
  }

  // Toggle checklist item styling
  function updateChecklistItemStyle(checkbox) {
    const checklistItem = checkbox.closest('.checklist-item');
    if (checklistItem) {
      if (checkbox.checked) {
        checklistItem.classList.add('checked');
      } else {
        checklistItem.classList.remove('checked');
      }
    }
  }

  // Initialize the checklist on page load
  function init() {
    const checklistState = loadChecklistState();
    const commentsState = loadCommentsState();
    const allCheckboxes = document.querySelectorAll('.task-checkbox');
    const allComments = document.querySelectorAll('.task-comment');

    // Restore saved checkbox states
    allCheckboxes.forEach(checkbox => {
      const taskId = checkbox.dataset.taskId;
      if (checklistState[taskId]) {
        checkbox.checked = true;
        updateServiceCardStyle(checkbox);
        updateChecklistItemStyle(checkbox);
      }

      // Add change event listener
      checkbox.addEventListener('change', function() {
        checklistState[this.dataset.taskId] = this.checked;
        saveChecklistState(checklistState);
        updateProgressBar();
        updateServiceCardStyle(this);
        updateChecklistItemStyle(this);
      });
    });

    // Restore saved comments
    allComments.forEach(commentField => {
      const taskId = commentField.dataset.taskId;
      if (commentsState[taskId]) {
        commentField.value = commentsState[taskId];
      }

      // Add input event listener to save comments as they type
      commentField.addEventListener('input', function() {
        commentsState[this.dataset.taskId] = this.value;
        saveCommentsState(commentsState);
      });

      // Also save on blur (when they click away)
      commentField.addEventListener('blur', function() {
        commentsState[this.dataset.taskId] = this.value;
        saveCommentsState(commentsState);
      });
    });

    // Make checklist labels clickable
    document.querySelectorAll('.checklist-label').forEach(label => {
      label.addEventListener('click', function() {
        const checkbox = this.parentElement.querySelector('.checklist-checkbox');
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
        }
      });
    });

    // Initial progress bar update
    updateProgressBar();
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>

</body></html>`;
};
