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
body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;max-width:1400px;margin:0 auto;color:#222;line-height:1.6}
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
.crew-comment-section{margin-top:8px;padding:8px 12px;background:#f8f9fa;border-radius:6px;border-left:3px solid #2e7d32}
.crew-comment-label{font-size:11px;font-weight:700;color:#2e7d32;margin-bottom:4px;display:flex;align-items:center;gap:6px}
.crew-comment-input{width:100%;padding:4px 8px;border:1px solid #ccc;border-radius:4px;font-size:13px;font-family:inherit;resize:none;height:28px;overflow:hidden;transition:all 0.25s ease;box-sizing:border-box;background:#fafafa}
.crew-comment-input:focus{outline:none;border-color:#2e7d32;border-width:2px;height:70px;padding:8px;background:#fff;box-shadow:0 2px 8px rgba(46,125,50,0.15)}
.crew-comment-input.has-content{height:44px;padding:6px 8px;background:#fff;border-color:#66bb6a}
.crew-comment-input::placeholder{color:#bbb;font-style:italic;font-size:12px}
.comment-row{display:flex;gap:6px;align-items:flex-start}
.comment-row .crew-comment-input{flex:1}
.publish-btn{background:#2e7d32;color:#fff;border:none;border-radius:4px;padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;height:28px;transition:all 0.2s ease;letter-spacing:0.3px}
.publish-btn:hover{background:#1b5e20;transform:scale(1.05)}
.publish-btn:active{transform:scale(0.97)}
.published-notes-list{margin-top:6px}
.published-note-item{background:#e8f5e9;border-left:3px solid #2e7d32;padding:6px 10px;border-radius:4px;margin-top:4px;font-size:12px;line-height:1.5;position:relative}
.published-note-item .note-text{color:#333;white-space:pre-wrap}
.published-note-item .note-timestamp{font-size:10px;color:#666;margin-top:3px;font-style:italic}
.published-note-item .delete-note-btn{position:absolute;top:4px;right:6px;background:none;border:none;color:#c62828;cursor:pointer;font-size:14px;line-height:1;padding:2px 4px;opacity:0.5;transition:opacity 0.2s}
.published-note-item .delete-note-btn:hover{opacity:1}
.camera-btn{background:#1565c0;color:#fff;border:none;border-radius:4px;padding:4px 8px;font-size:15px;cursor:pointer;height:28px;width:32px;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease;flex-shrink:0}
.camera-btn:hover{background:#0d47a1;transform:scale(1.05)}
.camera-btn:active{transform:scale(0.97)}
.image-staging{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
.image-staging:empty{display:none}
.staged-thumb{position:relative;width:60px;height:60px;border-radius:4px;overflow:hidden;border:2px solid #1565c0;cursor:pointer}
.staged-thumb img{width:100%;height:100%;object-fit:cover}
.staged-thumb .remove-staged{position:absolute;top:-2px;right:-2px;background:#c62828;color:#fff;border:none;border-radius:50%;width:18px;height:18px;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1}
.published-note-images{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
.published-note-images img{width:56px;height:56px;object-fit:cover;border-radius:3px;border:1px solid #ccc;cursor:pointer;transition:transform 0.2s}
.published-note-images img:hover{transform:scale(1.1);border-color:#2e7d32}
.crew-comment-input.dragover{border-color:#1565c0!important;border-width:2px!important;background:#e3f2fd!important;box-shadow:0 0 8px rgba(21,101,192,0.3)!important}
.lightbox-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:9999;cursor:pointer}
.lightbox-overlay img{max-width:90%;max-height:90%;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.5)}
.checklist-item-wrapper{display:flex;flex-direction:column;width:100%;break-inside:avoid}
.checklist-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 20px}
.service-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.service-grid .service-card{margin-bottom:0}
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
@media(max-width:1024px){body{padding:20px;max-width:100%}.info-grid{grid-template-columns:1fr 1fr}.service-grid{grid-template-columns:1fr}.title{font-size:28px}.section-header-title{font-size:18px}}
@media(max-width:768px){body{padding:12px}.info-grid{grid-template-columns:1fr}.checklist-grid{grid-template-columns:1fr}.service-grid{grid-template-columns:1fr}.summary-grid{grid-template-columns:1fr}.title{font-size:24px}.section-header-title{font-size:16px}.section-header{padding:12px 16px}.service-name{font-size:16px}.info-box{padding:12px}.header{padding:20px}.crew-comment-input:focus{height:60px}.publish-btn{padding:4px 8px;font-size:10px}.staged-thumb{width:50px;height:50px}.published-note-images img{width:48px;height:48px}}
@media print{body{padding:15px;font-size:12px;max-width:100%}.service-card{page-break-inside:avoid}.progress-bar-container{display:none}.crew-comment-input{border:1px solid #999;height:36px!important}.section-content{max-height:none!important;padding:20px 0!important}.section-toggle-btn{display:none}.checklist-grid{grid-template-columns:1fr 1fr}.service-grid{grid-template-columns:1fr 1fr}.publish-btn{display:none}.delete-note-btn{display:none}.camera-btn{display:none}.image-staging{display:none}.remove-staged{display:none}.published-note-item{border-left:2px solid #2e7d32}.published-note-images img{width:80px;height:80px}}
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
  <div style="font-size:18px;font-weight:800;color:#1565c0;margin-bottom:10px;border-bottom:2px solid #1565c0;padding-bottom:6px">📄 Documentation and Compliance</div>
  <div class="checklist-grid">
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_hud_data_plate">
      <label class="checklist-label">Verify the HUD data plate is present</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_hud_data_plate" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_hud_cert">
      <label class="checklist-label">Confirm the HUD certification label</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_hud_cert" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_manufacturer_install">
      <label class="checklist-label">Manufacturer's install instructions</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_manufacturer_install" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_warranties">
      <label class="checklist-label">Review warranties, manuals for appliances</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_warranties" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_rivet_badge">
      <label class="checklist-label">Rivet Install Badge and White # on home</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_rivet_badge" placeholder="Comments..."></textarea>
    </div>
  </div>
  </div>

  <!-- Exterior Inspection -->
  <div style="font-size:18px;font-weight:800;color:#1565c0;margin:20px 0 10px;border-bottom:2px solid #1565c0;padding-bottom:6px">🏠 Exterior Inspection</div>
  <div class="checklist-grid">
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_siding">
      <label class="checklist-label">Siding — breaks, dents, damage</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_siding" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_roof">
      <label class="checklist-label">Roof — leaks, missing shingles, damage</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_roof" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_windows">
      <label class="checklist-label">Windows — breaks, proper operation</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_windows" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_trim">
      <label class="checklist-label">Trim, porches, decks, exterior fixtures</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_trim" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_transit_damage">
      <label class="checklist-label">Transit damage (scratches, dents)</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_transit_damage" placeholder="Comments..."></textarea>
    </div>
  </div>
  ${quote.selectedServices?.gas_propane ? `<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_gas_line">
      <label class="checklist-label">Gas Line Location</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_gas_line" placeholder="Location details..."></textarea>
    </div>
  </div>` : ''}
  ${quote.selectedServices?.electric_connection ? `<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_electric_stub">
      <label class="checklist-label">Electric stub — How many Ft.</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_electric_stub" placeholder="Feet..."></textarea>
    </div>
  </div>` : ''}
  ${quote.selectedServices?.plumbing ? `<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_water_line">
      <label class="checklist-label">Water Line — How many ft for hookup</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_water_line" placeholder="Feet..."></textarea>
    </div>
  </div>` : ''}
  ${quote.sewerType && quote.sewerType !== 'none' ? `<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_sewer_line">
      <label class="checklist-label">Sewer line — How many Ft.</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_sewer_line" placeholder="Feet..."></textarea>
    </div>
  </div>` : ''}
  </div>

  <!-- Interior Inspection -->
  <div style="font-size:18px;font-weight:800;color:#1565c0;margin:20px 0 10px;border-bottom:2px solid #1565c0;padding-bottom:6px">🔍 Interior Inspection</div>
  <div class="checklist-grid">
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_drywall">
      <label class="checklist-label">Drywall/walls — excessive damage</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_drywall" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_ceilings">
      <label class="checklist-label">Ceilings — sags, stains, damage</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_ceilings" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_floors">
      <label class="checklist-label">Floors — levelness, soft spots</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_floors" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_cabinets">
      <label class="checklist-label">Cabinets, countertops, fixtures</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_cabinets" placeholder="Comments..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_insulation">
      <label class="checklist-label">Insulation — walls, floors, ceilings</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_insulation" placeholder="Comments..."></textarea>
    </div>
  </div>
  </div>

  <!-- Appliances and Equipment -->
  <div style="font-size:18px;font-weight:800;color:#1565c0;margin:20px 0 10px;border-bottom:2px solid #1565c0;padding-bottom:6px">🔌 Appliances and Equipment</div>
  <div class="checklist-grid">
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_appliances">
      <label class="checklist-label">Appliances (fridge, stove, dishwasher)</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_appliances" placeholder="List and condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_equipment">
      <label class="checklist-label">Installed equipment (HVAC) functional</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_equipment" placeholder="Comments..."></textarea>
    </div>
  </div>
  </div>

  <!-- Verify Material List -->
  <div style="font-size:18px;font-weight:800;color:#1565c0;margin:20px 0 10px;border-bottom:2px solid #1565c0;padding-bottom:6px">📋 Verify Material List</div>
  <div class="checklist-grid">
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_door_jam">
      <label class="checklist-label">Door Jam Board</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_door_jam" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_door_casement">
      <label class="checklist-label">Door Casement</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_door_casement" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_door_stops">
      <label class="checklist-label">Door Stops</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_door_stops" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_screen_door">
      <label class="checklist-label">Screen Door</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_screen_door" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_vinyl_floor">
      <label class="checklist-label">Vinyl Floor Coverings</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_vinyl_floor" placeholder="Enough? Sq ft..."></textarea>
    </div>
  </div>
  ${quote.sewerType && quote.sewerType !== 'none' ? `<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_sewer_pipe">
      <label class="checklist-label">Sewer Pipe — ft</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_sewer_pipe" placeholder="Feet..."></textarea>
    </div>
  </div>` : ''}
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_beam_trim">
      <label class="checklist-label">Beam Trim</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_beam_trim" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  ${quote.selectedServices?.siding_install ? `<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_siding_material">
      <label class="checklist-label">Siding</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_siding_material" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_siding_starter">
      <label class="checklist-label">Siding Starter</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_siding_starter" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_facia">
      <label class="checklist-label">Facia</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_facia" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_roof_facia">
      <label class="checklist-label">Roof Facia</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_roof_facia" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_soffits">
      <label class="checklist-label">Soffits</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_soffits" placeholder="Qty/condition..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_j_channel">
      <label class="checklist-label">J-channel</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_j_channel" placeholder="Qty/condition..."></textarea>
    </div>
  </div>` : ''}
  ${quote.selectedServices?.painting ? `<div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_paint">
      <label class="checklist-label">Paint</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_paint" placeholder="Qty/condition..."></textarea>
    </div>
  </div>` : ''}
  </div>

  <!-- Final Steps -->
  <div style="font-size:18px;font-weight:800;color:#1565c0;margin:20px 0 10px;border-bottom:2px solid #1565c0;padding-bottom:6px">📸 Final Steps</div>
  <div class="checklist-grid">
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_pictures">
      <label class="checklist-label">Take photos and attach to document</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_pictures" placeholder="# of photos, what was documented..."></textarea>
    </div>
  </div>
  <div class="checklist-item-wrapper">
    <div class="checklist-item">
      <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="delivery_clean_floors">
      <label class="checklist-label">Clean floors, lay floor coverings</label>
    </div>
    <div style="margin-left:30px;margin-top:4px">
      <textarea class="crew-comment-input task-comment" data-task-id="delivery_clean_floors" placeholder="Comments..."></textarea>
    </div>
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
<div class="service-grid">
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
<div class="service-grid">
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
<div class="service-grid">
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
<div class="service-grid">
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
  <div class="checklist-grid" style="margin:10px 0">
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_services_complete">
        <label class="checklist-label">All services completed per specs</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_services_complete" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_site_cleaned">
        <label class="checklist-label">Site cleaned, debris removed</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_site_cleaned" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_walkthrough">
        <label class="checklist-label">Customer walkthrough completed</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_walkthrough" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_issues_documented">
        <label class="checklist-label">Issues or concerns documented</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_issues_documented" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_photos">
        <label class="checklist-label">Photos taken of completed work</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_photos" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_signature">
        <label class="checklist-label">Customer signature obtained</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_signature" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_materials">
        <label class="checklist-label">Materials inventory updated</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_materials" placeholder="Notes..."></textarea>
      </div>
    </div>
    <div class="checklist-item-wrapper">
      <div class="checklist-item">
        <input type="checkbox" class="checklist-checkbox task-checkbox" data-task-id="checklist_timesheets">
        <label class="checklist-label">Time sheets submitted</label>
      </div>
      <div style="margin-left:30px;margin-top:4px">
        <textarea class="crew-comment-input task-comment" data-task-id="checklist_timesheets" placeholder="Notes..."></textarea>
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
  const publishedKey = 'crew_published_' + quoteId;

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

  // Load published notes from localStorage
  function loadPublishedNotes() {
    const saved = localStorage.getItem(publishedKey);
    return saved ? JSON.parse(saved) : {};
  }

  // Save published notes to localStorage
  function savePublishedNotes(publishedNotes) {
    localStorage.setItem(publishedKey, JSON.stringify(publishedNotes));
  }

  // Format a timestamp for display
  function formatTimestamp(isoString) {
    const d = new Date(isoString);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    var minStr = minutes < 10 ? '0' + minutes : '' + minutes;
    return month + '/' + day + '/' + year + ' at ' + hours + ':' + minStr + ' ' + ampm;
  }

  // Render published notes for a task into its container
  function renderPublishedNotes(taskId, publishedNotes) {
    var container = document.querySelector('.published-notes-list[data-task-id="' + taskId + '"]');
    if (!container) return;
    var notes = publishedNotes[taskId] || [];
    if (notes.length === 0) { container.innerHTML = ''; return; }
    container.innerHTML = notes.map(function(note, idx) {
      var imagesHtml = '';
      if (note.images && note.images.length > 0) {
        imagesHtml = '<div class="published-note-images">' +
          note.images.map(function(src) {
            return '<img src="' + src + '" onclick="showLightbox(this.src)" title="Click to enlarge">';
          }).join('') + '</div>';
      }
      var textHtml = note.text ? '<div class="note-text">' + note.text.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</div>' : '';
      return '<div class="published-note-item">' +
        textHtml + imagesHtml +
        '<div class="note-timestamp">Published: ' + formatTimestamp(note.publishedAt) + '</div>' +
        '<button class="delete-note-btn" data-task-id="' + taskId + '" data-note-idx="' + idx + '" title="Delete note">&times;</button>' +
      '</div>';
    }).join('');
  }

  // Compress and resize an image file, returns a promise with base64 data URL
  function compressImage(file, maxDim, quality) {
    maxDim = maxDim || 800;
    quality = quality || 0.6;
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
          var w = img.width, h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) { h = Math.round(h * maxDim / w); w = maxDim; }
            else { w = Math.round(w * maxDim / h); h = maxDim; }
          }
          var canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Lightbox for full-size image viewing
  window.showLightbox = function(src) {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<img src="' + src + '">';
    overlay.addEventListener('click', function() { overlay.remove(); });
    document.body.appendChild(overlay);
  };

  // Staged images per task (not yet published)
  var stagedImages = {};

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
    const publishedNotes = loadPublishedNotes();
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

    // Wrap each textarea with publish button and published notes container
    allComments.forEach(commentField => {
      const taskId = commentField.dataset.taskId;
      const parent = commentField.parentNode;

      // Create comment-row wrapper
      var row = document.createElement('div');
      row.className = 'comment-row';
      parent.insertBefore(row, commentField);
      row.appendChild(commentField);

      // Add camera button (opens camera on mobile, file picker on desktop)
      var cameraBtn = document.createElement('button');
      cameraBtn.className = 'camera-btn';
      cameraBtn.setAttribute('title', 'Take photo or upload image');
      cameraBtn.innerHTML = '&#128247;';
      row.appendChild(cameraBtn);

      // Hidden file input - accepts images, capture opens camera on mobile
      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.setAttribute('capture', 'environment');
      fileInput.multiple = true;
      fileInput.style.display = 'none';
      row.appendChild(fileInput);

      // Add publish button
      var publishBtn = document.createElement('button');
      publishBtn.className = 'publish-btn';
      publishBtn.setAttribute('data-task-id', taskId);
      publishBtn.textContent = 'Publish';
      row.appendChild(publishBtn);

      // Image staging area (thumbnails before publishing)
      var stagingArea = document.createElement('div');
      stagingArea.className = 'image-staging';
      stagingArea.setAttribute('data-task-id', taskId);

      // Add published notes container after the row
      var notesContainer = document.createElement('div');
      notesContainer.className = 'published-notes-list';
      notesContainer.setAttribute('data-task-id', taskId);
      // Insert staging then notes after the row
      row.parentNode.insertBefore(stagingArea, row.nextSibling);
      row.parentNode.insertBefore(notesContainer, stagingArea.nextSibling);

      // Initialize staged images array for this task
      if (!stagedImages[taskId]) stagedImages[taskId] = [];

      // Helper: render staged thumbnails
      function renderStaged() {
        stagingArea.innerHTML = stagedImages[taskId].map(function(src, i) {
          return '<div class="staged-thumb">' +
            '<img src="' + src + '" onclick="showLightbox(this.src)">' +
            '<button class="remove-staged" data-task-id="' + taskId + '" data-idx="' + i + '">&times;</button>' +
          '</div>';
        }).join('');
      }

      // Helper: process files (compress and stage)
      function processFiles(files) {
        Array.from(files).forEach(function(file) {
          if (!file.type.startsWith('image/')) return;
          compressImage(file, 800, 0.6).then(function(dataUrl) {
            stagedImages[taskId].push(dataUrl);
            renderStaged();
          });
        });
      }

      // Camera button click → trigger file input
      cameraBtn.addEventListener('click', function() { fileInput.click(); });

      // File input change
      fileInput.addEventListener('change', function() {
        if (this.files.length > 0) processFiles(this.files);
        this.value = '';
      });

      // Drag and drop on textarea
      commentField.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
      });
      commentField.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
      });
      commentField.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) processFiles(e.dataTransfer.files);
      });

      // Remove staged image (delegated from staging area)
      stagingArea.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-staged')) {
          var idx = parseInt(e.target.getAttribute('data-idx'), 10);
          stagedImages[taskId].splice(idx, 1);
          renderStaged();
        }
      });

      // Render existing published notes
      renderPublishedNotes(taskId, publishedNotes);

      // Restore saved draft comment
      if (commentsState[taskId]) {
        commentField.value = commentsState[taskId];
        commentField.classList.add('has-content');
      }

      // Expand on focus
      commentField.addEventListener('focus', function() {
        this.style.height = '70px';
        this.style.resize = 'vertical';
      });

      // Collapse on blur if empty
      commentField.addEventListener('blur', function() {
        commentsState[this.dataset.taskId] = this.value;
        saveCommentsState(commentsState);
        this.style.resize = 'none';
        if (this.value.trim()) {
          this.classList.add('has-content');
          this.style.height = '44px';
        } else {
          this.classList.remove('has-content');
          this.style.height = '28px';
        }
      });

      // Save as they type
      commentField.addEventListener('input', function() {
        commentsState[this.dataset.taskId] = this.value;
        saveCommentsState(commentsState);
      });

      // Publish button click
      publishBtn.addEventListener('click', function() {
        var textarea = row.querySelector('.task-comment');
        var text = textarea.value.trim();
        var images = stagedImages[taskId] || [];
        if (!text && images.length === 0) return;
        if (!publishedNotes[taskId]) publishedNotes[taskId] = [];
        publishedNotes[taskId].push({
          text: text,
          images: images.length > 0 ? images.slice() : [],
          publishedAt: new Date().toISOString()
        });
        savePublishedNotes(publishedNotes);
        renderPublishedNotes(taskId, publishedNotes);
        // Clear the textarea and staged images after publishing
        textarea.value = '';
        textarea.classList.remove('has-content');
        textarea.style.height = '28px';
        commentsState[taskId] = '';
        saveCommentsState(commentsState);
        stagedImages[taskId] = [];
        renderStaged();
      });
    });

    // Delete published note handler (delegated)
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete-note-btn')) {
        var taskId = e.target.getAttribute('data-task-id');
        var idx = parseInt(e.target.getAttribute('data-note-idx'), 10);
        if (publishedNotes[taskId] && publishedNotes[taskId][idx] !== undefined) {
          publishedNotes[taskId].splice(idx, 1);
          savePublishedNotes(publishedNotes);
          renderPublishedNotes(taskId, publishedNotes);
        }
      }
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
