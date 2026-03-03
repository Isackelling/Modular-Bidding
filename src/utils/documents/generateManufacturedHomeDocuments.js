/**
 * Manufactured Home document generators.
 * All blank fields (___, [Name], etc.) are filled from system data when available.
 * Fields that are NOT in the original document layout are never added.
 */
import { COMPANY, DocumentUtils, fmt } from './shared.js';

const STYLES = `
  body { font-family: Arial, sans-serif; max-width: 850px; margin: 20px auto; padding: 16px 24px; color: #222; line-height: 1.5; font-size: 13px; }
  h1 { color: #2c5530; border-bottom: 3px solid #2c5530; padding-bottom: 6px; margin-bottom: 4px; }
  h2 { color: #2c5530; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-top: 18px; margin-bottom: 4px; }
  h3 { color: #2c5530; margin-top: 12px; margin-bottom: 4px; }
  .blank { border-bottom: 1px solid #aaa; display: inline-block; min-width: 180px; color: #999; font-style: italic; font-size: 12px; }
  .filled { font-weight: 700; }
  table { width: 100%; border-collapse: collapse; margin: 8px 0; }
  th { background: #2c5530; color: #fff; padding: 6px 10px; text-align: left; font-size: 12px; }
  td { padding: 5px 10px; border-bottom: 1px solid #ddd; font-size: 12px; }
  blockquote { background: #fff8e1; border-left: 4px solid #f57f17; padding: 8px 12px; margin: 10px 0; font-size: 13px; }
  ul, ol { margin: 6px 0 6px 20px; padding: 0; }
  li { margin-bottom: 3px; }
  .sig-section { margin-top: 22px; border-top: 2px solid #2c5530; padding-top: 14px; }
  .sig-block { margin-bottom: 12px; }
  .sig-line { display: inline-block; border-bottom: 1px solid #333; min-width: 280px; margin-bottom: 2px; }
  .sig-prefilled { font-weight: 600; font-size: 13px; }
  .sig-label { font-size: 12px; color: #555; }
  .initial-row { margin: 8px 0; }
  .initial-box { display: inline-block; border-bottom: 1px solid #333; width: 60px; margin-right: 8px; }
  .header-bar { background: #2c5530; color: #fff; padding: 10px 16px; margin: -16px -24px 18px; }
  .header-bar h1 { color: #fff; border: none; margin: 0; padding: 0; font-size: 18px; }
  .header-bar .sub { color: #c8e6c9; font-size: 12px; margin: 2px 0 0; }
  .notice-box { background: #fff3e0; border: 1px solid #ff9800; border-radius: 4px; padding: 10px 12px; margin: 10px 0; font-size: 13px; }
  /* LEGAL REQUIREMENT — Minnesota Stat. 325F.182 / HUD 24 CFR 3280.309: formaldehyde notice must be ALL CAPS, bold, minimum 10pt (≈13px). DO NOT reduce font-size below 13px. */
  .important-notice { background: #ffebee; border: 2px solid #c62828; padding: 14px 16px; margin: 16px 0; font-weight: bold; font-size: 13px; line-height: 1.6; }
  .checklist-table td:first-child { width: 85%; }
  .checklist-table td:last-child { width: 15%; text-align: center; font-size: 16px; }
  .generated-note { margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 11px; color: #999; }
  .editable { cursor: text; background: transparent; transition: background 0.15s; min-height: 1.1em; }
  .editable:hover { background: #fffde7; border-radius: 3px; }
  .editable:focus { outline: 2px solid #2c5530; background: #f0fff0; border-radius: 3px; }
  .print-bar { position: fixed; top: 14px; right: 18px; z-index: 999; display: flex; align-items: center; gap: 10px; }
  .print-bar button { background: #2c5530; color: #fff; border: none; padding: 9px 20px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.25); }
  .print-bar button:hover { background: #1b3a20; }
  .print-bar .hint { font-size: 12px; color: #444; background: #fff; padding: 5px 10px; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
  @media print { body { margin: 16px; } .header-bar { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .print-bar { display: none !important; } }
`;

// If a value is present → show it bold; otherwise show a blank underline with dim placeholder text
const field = (val, placeholder = '') =>
  (val && val !== 'none' && val !== '0' && String(val).trim())
    ? `<span class="filled">${val}</span>`
    : `<span class="blank">${placeholder || '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}</span>`;

// Always-blank underline — editable in the browser before printing
const blank = (width = 220) => `<span class="blank editable" contenteditable="true" spellcheck="false" style="min-width:${width}px">&nbsp;</span>`;

// Fixed print button + edit hint shown at top-right of every document (hidden when printing)
const printBar = `<div class="print-bar"><button onclick="window.print()">🖨 Print / Save PDF</button><span class="hint">Click any underlined field to edit</span></div>`;

// Derive common values from quote + customer + totals
const prep = (quote, customer, totals) => {
  const q = quote || {};
  const c = customer || {};
  const t = totals || {};
  return {
    today:         DocumentUtils.formatDate(),
    quoteNum:      DocumentUtils.getQuoteNum(q),
    ownerName:     [c.firstName, c.lastName].filter(Boolean).join(' '),
    owner2Name:    [c.person2FirstName, c.person2LastName].filter(Boolean).join(' '),
    address:       c.siteAddress || '',
    cityStateZip:  [c.siteCity, c.siteState, c.siteZip].filter(Boolean).join(', '),
    phoneEmail:    [c.phone ? `📞 ${c.phone}` : '', c.email ? `✉ ${c.email}` : ''].filter(Boolean).join('  '),
    homeModel:     (q.homeModel && q.homeModel !== 'NONE') ? q.homeModel : '',
    contractPrice: t.totalWithContingency
      ? `$${Number(t.totalWithContingency).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : '',
    contractFmt:   t.totalWithContingency ? fmt(t.totalWithContingency) : '',
    downPaymentFmt: t.totalWithContingency ? fmt(t.totalWithContingency * 0.5) : '',
  };
};

// ─── 1. Purchase & Installation Contract ────────────────────────────────────
// Fills: Agreement Date, Owner info, Home Model, Project Address, Contract Price, Signature print names
export const generateManufacturedHomeContract = (quote, customer, totals) => {
  const d = prep(quote, customer, totals);

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>Purchase &amp; Installation Agreement — ${d.ownerName || 'Sherman Homes'}</title>
<style>${STYLES}</style></head><body>
${printBar}
<div class="header-bar">
  <h1>Fixed Contract Amount</h1>
  <p class="sub">Modular / Manufactured Home Purchase &amp; Installation Agreement &mdash; ${COMPANY.name} &mdash; Lic. # BC532878${d.quoteNum ? ` &mdash; #${d.quoteNum}` : ''}</p>
</div>

<p><strong>Agreement Date:</strong> ${field(d.today)}</p>

<hr>

<p><strong>Between The Owner:</strong></p>
<p>Name: ${field(d.ownerName)}</p>
<p>Address: ${field(d.address)}</p>
<p>City, State, Zip: ${field(d.cityStateZip)}</p>
<p>Phone &amp; Email: ${field(d.phoneEmail)}</p>

<p><strong>And The Contractor:</strong><br>
Sherman Homes<br>
2244 Hwy 65<br>
Mora, MN 55051<br>
Lic. # BC532878</p>

<p><strong>And The Manufacturer:</strong><br>
<em>(The third-party manufacturer that constructs the home unit off-site in a factory)</em><br>
Name: <strong>Schult Homes by Clayton</strong><br>
Address: <strong>201 Industrial Dr, Redwood Falls, MN 56283</strong><br>
HUD Certification / License No.: ${blank(200)} &nbsp; Sales Contact: <strong>Sherman</strong></p>

<p><strong>For The Project:</strong><br>
Home Model: ${field(d.homeModel)}<br>
Project Address: ${field(d.address)}<br>
City, State, Zip: ${field(d.cityStateZip)}</p>

<hr>

<h2>1. Contract Documents</h2>
<p>The Contract Documents consist of this Agreement, the Plans, the Specification Booklet, the Allowance Budget, the Owner Responsibilities Acknowledgement, the Payment Schedule, and the Manufacturer's Quote, Floor Plan, and Specifications (attached as <strong>Exhibit A</strong>); as well as any Addendums, Change Orders, and Allowance Reallocations executed after the date of this Agreement. These Contract Documents represent the entire agreement between the parties and supersede any prior oral or written agreement(s). Physical and/or electronic copies of all Contract Documents will be provided to the Owner by the Contractor.</p>
<blockquote><strong>Note:</strong> The Homeowner Guide is incorporated into this Contract by reference. Owner must read, initial, and sign the Homeowner Guide as part of executing this Agreement.</blockquote>

<h2>2. Scope of Work — Division of Responsibility</h2>
<p>Because this project involves a factory-built home, construction responsibilities are divided between the Manufacturer and Sherman Homes as follows.</p>

<h3>2.1 Manufacturer Responsibilities (Off-Site Factory Work)</h3>
<ul>
  <li>Fabrication of the structural home unit per the agreed floor plan and specifications</li>
  <li>Factory installation of interior finishes, cabinetry, flooring, plumbing rough-in, and electrical rough-in as specified in Exhibit A</li>
  <li>Compliance with all applicable HUD or state modular construction standards</li>
  <li>Provision of the HUD Data Plate and certification label(s) on the completed unit (for HUD-code homes)</li>
  <li>Providing manufacturer warranties covering factory-built components and workmanship</li>
</ul>
<p><strong>Sherman Homes is not liable for defects, omissions, or non-conforming work originating in the manufacturing facility.</strong> Defects in manufacturer-supplied components or factory workmanship are the responsibility of the Manufacturer, not Sherman Homes.</p>

<h3>2.2 Sherman Homes Responsibilities (Site Work &amp; Installation)</h3>
<ul>
  <li>Site preparation and grading</li>
  <li>Foundation design coordination, permitting, and construction</li>
  <li>Coordination of home delivery from the Manufacturer to the project site</li>
  <li>Transportation and oversize-load permit acquisition (see Section 3)</li>
  <li>Crane and set operations — placing the home unit on the foundation</li>
  <li>Marriage wall assembly and sealing for multi-section homes</li>
  <li>Utility stub-outs and final connections (electric, plumbing, HVAC, fuel)</li>
  <li>All finish work not completed at the factory as specified in Exhibit A</li>
  <li>Obtaining all required local permits for site and installation work</li>
  <li>Ensuring the installed home meets all applicable MN State Building Code requirements for site work</li>
  <li>Final site cleanup and broom-clean condition at project completion</li>
</ul>

<h2>3. Time of Completion</h2>
<p>The approximate commencement of site work shall be contingent upon the Manufacturer's confirmed production and delivery schedule. Owner will be notified of confirmed production start, delivery, and estimated completion dates in writing.</p>
<p>The approximate completion date of the project shall be on or about <strong>90–120 working days from site readiness</strong>, subject to the Manufacturer's production schedule. "Site readiness" means the foundation is complete, site access is clear, and all utility stub-outs are in place for delivery. Change Orders, unusual weather, and Manufacturer production delays may affect the completion date.</p>

<h2>4. Factory Order Lock-In</h2>
<h3>4.1 Selection Deadline</h3>
<p>Owner must finalize all selections that affect the factory order (including home model, floor plan, interior finishes, fixtures, and options) by the <strong>Factory Order Lock-In Date</strong>, which shall be agreed upon in writing by both parties prior to order placement.</p>
<h3>4.2 Changes After Factory Order</h3>
<p>Once the factory order has been placed with the Manufacturer, changes to factory-built components may not be possible. If the Manufacturer permits post-order changes, all associated factory change fees, restocking fees, and production delay costs shall be the Owner's sole financial responsibility and treated as a Change Order under Section 8.</p>
<h3>4.3 Factory-Locked vs. Site Allowances</h3>
<p>The Allowance Budget (Section 9) distinguishes between <strong>factory-locked items</strong> (selections finalized at order — cannot be modified after the Factory Order Lock-In Date without Manufacturer approval and potential fees) and <strong>site allowance items</strong> (work completed on-site by Sherman Homes, subject to standard Change Order and Allowance processes).</p>

<h2>5. The Contract Price</h2>
<p>The Contract Price shall be ${d.contractFmt ? field(d.contractFmt) : blank(180)} (${d.contractPrice ? field(d.contractPrice) : `$${blank(140)}`}), subject to the Allowance Budget, Change Orders, and short-notice price increases from suppliers or the Manufacturer beyond our control.</p>
<p>The Owner and the Contractor acknowledge that the Owner will pay a Down Payment of ${d.downPaymentFmt ? `<strong>${d.downPaymentFmt} (50% of Contract Price)</strong>` : '<strong>50% of the Contract Price</strong>'} upon signing of this Agreement. Additional funds will be required before construction begins, according to the Payment Schedule. This Contract Price is contingent on the agreed Payment Schedule between the Contractor, Owner, and Loan Agency, if applicable.</p>

<h2>6. Progress Payments</h2>
<p>Payment delays will result in construction delays. Rescheduling service and material providers due to Payment Schedule delays may result in penalties for financial loss. High-demand service and material providers may be unable to reschedule quickly, causing significant disruptions to the construction schedule.</p>
<p>The Owner will make payments to the Contractor pursuant to the Payment Schedule as work required by the Payment Schedule is substantially completed. Owner shall respond to payment requests within 3 business days. If the Owner fails to respond, Contractor may charge a penalty and interest on the unpaid amount until payment is received.</p>
<p>If payment is not received by the Contractor within 7 business days of a payment request for work substantially completed, the Contractor shall have the right to stop work and/or terminate the Contract at the Contractor's option.</p>

<h2>7. Duties of the Contractor</h2>
<p>All site work and installation shall be in accordance with the Plans and the Specification Booklet, subject to Plan and Specification approval by all authorities with jurisdiction over the project. All site work and installation shall be completed in a workmanlike manner and shall comply with all applicable MN State Building Code and local codes. Factory-built portions of the home shall comply with federal HUD Manufactured Home Construction and Safety Standards (24 CFR Part 3280) or applicable modular home standards, as the Manufacturer's responsibility.</p>
<p>Contractor shall obtain all permits necessary for site work and installation, at the Owner's expense. Contractor will remove all construction debris and leave the project in a broom-clean condition.</p>

<h2>8. Duties of the Owner</h2>
<p>Except as specifically noted in the Owner's Responsibility Acknowledgement, the Owner shall communicate with subcontractors and the Manufacturer only through the Contractor. Owner is responsible for all utility account setups, fees, permits, installations, connections, and for all utility usage expenses.</p>
<p><strong>Owner is responsible for ensuring the project site is ready for delivery on or before the confirmed delivery date.</strong> This includes: foundation complete and inspected, driveway and site access clear and adequate for transport trucks and crane equipment, and any required site grading complete. Delays caused by site unreadiness are the Owner's financial responsibility and shall be treated as a Change Order.</p>
<p><strong>No third-party contractor or homeowner-hired work shall be performed during the delivery and installation phase without prior written approval from Sherman Homes.</strong></p>

<h2>9. Change Orders</h2>
<p>A Change Order is any change to the original Contract Documents, including changes to factory-ordered items (subject to Manufacturer approval per Section 4). All Change Orders must be agreed upon in writing, including all costs and additional time considerations. <strong>100% of each Change Order cost must be paid prior to the change being made.</strong></p>
<p>A <strong>$300 Change Order administrative fee</strong> shall be added to the cost of each Change Order. An Allowance Overage Change Order shall not be subject to an administrative fee but is subject to additional costs (material, tax, labor, overhead, and profit at the rate of 15%).</p>

<h2>10. Allowances</h2>
<p>The Allowance Budget includes an Allowance Contingency line item. The Allowance Contingency is a reserve fund designed to cover cost overruns in any allowance category without requiring a Change Order. When any allowance line item exceeds its allocated amount, the overage shall be automatically deducted from the Allowance Contingency. Only after the Allowance Contingency has been completely depleted will an Allowance Overage Change Order be required.</p>
<p><strong>Unused funds in the Allowance Budget, including any unused Allowance Contingency, will be credited back to the Owner.</strong></p>

<h2>11. Delivery, Transportation &amp; Installation</h2>
<h3>11.1 Transportation &amp; Permits</h3>
<p>Sherman Homes shall coordinate transportation of the home unit from the Manufacturer's facility to the project site. Unless otherwise specified in writing, the following are <strong>included in the Contract Price</strong>: transportation costs, oversize-load road permits, and crane and set fees. Any costs arising from Owner-caused delays, inaccessible site conditions, or additional permits required due to site location are the Owner's financial responsibility and shall be treated as a Change Order.</p>
<h3>11.2 Pre-Delivery Inspection</h3>
<p>Prior to placement on the foundation, Sherman Homes shall conduct a joint inspection of the home unit with the Owner (or Owner's representative). Both parties shall document the condition of the unit at delivery, including any visible damage, incomplete work, or items not conforming to Exhibit A specifications.</p>
<h3>11.3 Reporting Factory Defects</h3>
<p>Any visible damage or defects discovered at delivery must be documented in writing and reported to the Manufacturer within <strong>5 business days</strong> of delivery. Sherman Homes will assist the Owner in filing claims with the Manufacturer but is not liable for factory defects.</p>
<h3>11.4 Formal Acceptance</h3>
<p>The Owner shall not formally accept the home unit until the joint pre-delivery inspection is complete and documented. Formal acceptance occurs at final payment per Section 19.</p>

<h2>12. Insurance</h2>
<p>The Owner shall maintain liability insurance on the property. The Contractor shall maintain Workers Compensation, Liability, and Builder's Risk insurance coverage as required by law. <strong>Property shall not be occupied until the Owner acquires a homeowners insurance policy.</strong> Owner shall acquire a homeowners insurance policy immediately after drywall is hung.</p>

<h2>13. General Provisions</h2>
<p>If conditions are encountered at the construction site which are subsurface or otherwise concealed or unknown (including but not limited to rocks, old foundations, sinkholes, buried debris, etc.) which differ from those ordinarily expected, the Owner and the Contractor shall promptly investigate such conditions. If they differ materially and cause an increase in the Contractor's cost or time, the condition and related cost shall be treated as a Change Order.</p>

<h2>14. Force Majeure and Delays Beyond Contractor's Control</h2>
<p>If the Contractor is delayed at any time by causes beyond the Contractor's reasonable control — including but not limited to acts of God, fire, flood, epidemic, war, strikes, unavailability of materials, <strong>Manufacturer production delays</strong>, or any other Force Majeure Events — then the Contract completion date shall be extended by the amount of time lost. Contractor shall notify Owner in writing within <strong>7 business days</strong> of any Force Majeure Event.</p>

<h2>15. Hazardous Materials, Waste, and Formaldehyde</h2>
<p>Unless the scope of this Agreement specifically includes handling of hazardous materials, upon discovery of such materials the Contractor shall notify the Owner immediately and allow engagement of a properly licensed hazardous material contractor. Any such work shall be treated as a Change Order. The Manufacturer bears primary responsibility for hazardous materials (including formaldehyde-emitting materials) introduced during factory construction.</p>
<blockquote><strong>Note:</strong> Read and sign the Formaldehyde Disclosure before executing this Agreement.</blockquote>

<h2>16. Arbitration of Disputes</h2>
<p>Any controversy or claim arising out of or relating to this Contract, or the breach thereof, shall be settled by arbitration administered by the American Arbitration Association under its Construction Industry Arbitration Rules.</p>

<h2>17. Warranty</h2>
<h3>17.1 Sherman Homes Warranty (Site Work &amp; Installation)</h3>
<p>At the completion of this project, Contractor shall execute a warranty instrument to the Owner covering <strong>Sherman Homes' site work and installation</strong> for: <strong>1 year</strong> on workmanship and material defects; <strong>2 years</strong> on plumbing, heating, and electrical system defects; <strong>10 years</strong> on structural defects related to the foundation and site installation. This warranty covers only work performed by Sherman Homes.</p>
<h3>17.2 Manufacturer Warranty (Pass-Through)</h3>
<p>Sherman Homes shall pass through to the Owner all warranties provided by the Manufacturer. The Manufacturer's warranty covers factory-built components and factory workmanship, and is attached as <strong>Exhibit B</strong>.</p>
<h3>17.3 Warranty Date</h3>
<p>The Warranty Date for Sherman Homes' warranty is the earlier of: (1) the date the first purchaser occupies the completed home, or (2) the date the first purchaser receives the Certificate of Occupancy — but not earlier than the date the home unit is set on the foundation and site work commences.</p>
<h3>17.4 Warranty Claim Deadline</h3>
<p>As required by MN Stat. § 327A, Owner must provide written notice of any warranty claim to Sherman Homes within <strong>6 months</strong> of discovering the defect.</p>
<blockquote><strong>Note:</strong> Read and sign the Warranty Statement.</blockquote>

<h2>18. Termination of the Contract</h2>
<p>Should the Owner or Contractor fail to carry out this Contract, the non-defaulting party may declare the Contract in default and proceed against the defaulting party for recovery of all damages, including reasonable attorney fees. In the case of a defaulting Owner, the Down Payment shall be applied to legally ascertained damages.</p>
<h3>18.1 Manufacturer Default</h3>
<p>In the event the Manufacturer fails to deliver the home unit, delivers a non-conforming unit, or becomes insolvent prior to delivery, Sherman Homes shall notify the Owner in writing within 5 business days. Costs already incurred by Sherman Homes for site work, permits, and preparation prior to Manufacturer default shall remain the Owner's financial responsibility per the Payment Schedule. <strong>Sherman Homes shall not be held liable for damages arising solely from Manufacturer default.</strong></p>

<h2>19. Attorney Fees</h2>
<p>In the event of any arbitration or litigation relating to the project, project performance, or this Contract, the prevailing party shall be entitled to reasonable attorney fees, costs, and expenses.</p>

<h2>20. Acceptance and Occupancy</h2>
<p>Upon Contract completion, the project shall be inspected jointly by the Owner and the Contractor. Upon final payment, Contractor will provide Owner and Loan Agency with Lien Waivers for all materials and labor for this project. The Owner shall not occupy the property until final payment has been received and a signed Right to Occupy Certificate has been issued by the Contractor.</p>

<div class="notice-box">
  <strong>PLEASE TAKE NOTICE:</strong><br>
  <strong>(a)</strong> Any person or company supplying labor or materials for this improvement to your property may file a lien against your property if that person or company is not paid for their contributions.<br>
  <strong>(b)</strong> Under Minnesota law, you have the right to pay persons who supplied labor or materials for this improvement directly and deduct this amount from the contract price, or withhold the amounts due them from us until 120 days after completion of the improvement, unless we give you a lien waiver signed by persons who supplied any labor or material for the improvement and who gave you timely notice.
</div>

<h2>Exhibits</h2>
<ul>
  <li><strong>Exhibit A:</strong> Manufacturer's Quote, Floor Plan, and Specifications</li>
  <li><strong>Exhibit B:</strong> Manufacturer's Warranty Documentation</li>
</ul>

<div class="sig-section">
  <h2 style="border:none;margin-top:0">Acknowledgment and Signature</h2>
  <p>By signing below, all parties agree they have read, understand, and accept all terms of this Contract and its exhibits.</p>

  <p><strong>Owner:</strong></p>
  <div class="sig-block"><div class="sig-line">&nbsp;</div><div class="sig-label">Signature</div></div>
  <div class="sig-block"><div class="sig-line"><span class="sig-prefilled">${d.ownerName || '&nbsp;'}</span></div><div class="sig-label">Print Name</div></div>
  <p>Date: ${blank(120)}</p>

  ${d.owner2Name ? `<p><strong>Owner (2nd):</strong></p>
  <div class="sig-block"><div class="sig-line">&nbsp;</div><div class="sig-label">Signature</div></div>
  <div class="sig-block"><div class="sig-line"><span class="sig-prefilled">${d.owner2Name}</span></div><div class="sig-label">Print Name</div></div>
  <p>Date: ${blank(120)}</p>` : `<p><strong>Owner (if applicable):</strong></p>
  <div class="sig-block"><div class="sig-line">&nbsp;</div><div class="sig-label">Signature</div></div>
  <div class="sig-block"><div class="sig-line">&nbsp;</div><div class="sig-label">Print Name</div></div>
  <p>Date: ${blank(120)}</p>`}

  <p><strong>Sherman Homes (Contractor):</strong></p>
  <div class="sig-block"><div class="sig-line">&nbsp;</div><div class="sig-label">Signature</div></div>
  <div class="sig-block"><div class="sig-line">&nbsp;</div><div class="sig-label">Print Name</div></div>
  <div class="sig-block"><div class="sig-line">&nbsp;</div><div class="sig-label">Title</div></div>
  <p>Date: ${blank(120)}</p>
</div>

<p style="font-size:12px;color:#555;font-style:italic;margin-top:16px">This Contract is for site work and installation services only. The purchase of the manufactured/modular home unit itself is governed by a separate Purchase Agreement between the Owner and the Manufacturer. This Contract does not constitute legal advice. Consult a licensed Minnesota construction attorney before executing.</p>

<div class="generated-note">Generated by Sherman Bidding System &mdash; ${d.today}${d.quoteNum ? ` &mdash; Project #${d.quoteNum}` : ''} &mdash; ${COMPANY.name}, ${COMPANY.address}</div>
</body></html>`;
};

// ─── 2. Formaldehyde Disclosure ─────────────────────────────────────────────
// Fills: Signature print names only (document body has no other blank fields)
export const generateFormaldehydeDisclosure = (quote, customer, totals) => {
  const d = prep(quote, customer, totals);

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>Formaldehyde Disclosure — ${d.ownerName || 'Sherman Homes'}</title>
<style>${STYLES}</style></head><body>
${printBar}
<div class="header-bar">
  <h1>Formaldehyde Disclosure</h1>
  <p class="sub">Modular / Manufactured Home &mdash; ${COMPANY.name} &mdash; Lic. # BC532878${d.quoteNum ? ` &mdash; Project #${d.quoteNum}` : ''}</p>
</div>

<p><strong>Sherman Homes</strong><br>License # BC532878</p>

<h2>Why You're Receiving This Disclosure</h2>
<p>Minnesota law requires us to inform you that some building materials used in construction may contain formaldehyde. Please carefully read the following important health information.</p>
<p><strong>This disclosure is especially important for modular and manufactured homes.</strong> Because the majority of construction occurs in a factory setting, your home contains significant quantities of engineered wood products — including particleboard, oriented strand board (OSB), plywood, factory-installed cabinetry, and flooring — which may emit higher concentrations of formaldehyde than materials used in traditional site-built construction. These materials are selected and installed by the Manufacturer, not by Sherman Homes.</p>

<div class="important-notice">
  SOME OF THE BUILDING MATERIALS USED IN THIS HOME EMIT FORMALDEHYDE. EYE, NOSE, AND THROAT IRRITATION, HEADACHE, NAUSEA AND A VARIETY OF ASTHMA-LIKE SYMPTOMS, INCLUDING SHORTNESS OF BREATH, HAVE BEEN REPORTED AS A RESULT OF FORMALDEHYDE EXPOSURE. ELDERLY PERSONS AND YOUNG CHILDREN, AS WELL AS ANYONE WITH A HISTORY OF ASTHMA, ALLERGIES, OR LUNG PROBLEMS, MAY BE AT GREATER RISK. RESEARCH IS CONTINUING ON THE POSSIBLE LONG-TERM EFFECTS OF EXPOSURE TO FORMALDEHYDE.
  <br><br>
  REDUCED VENTILATION MAY ALLOW FORMALDEHYDE AND OTHER CONTAMINANTS TO ACCUMULATE IN THE INDOOR AIR. HIGH INDOOR TEMPERATURES AND HUMIDITY RAISE FORMALDEHYDE LEVELS. WHEN A HOME IS TO BE LOCATED IN AREAS SUBJECT TO EXTREME SUMMER TEMPERATURES, AN AIR-CONDITIONING SYSTEM CAN BE USED TO CONTROL INDOOR TEMPERATURE LEVELS. OTHER MEANS OF CONTROLLED MECHANICAL VENTILATION CAN BE USED TO REDUCE LEVELS OF FORMALDEHYDE AND OTHER INDOOR AIR CONTAMINANTS.
  <br><br>
  IF YOU HAVE ANY QUESTIONS REGARDING THE HEALTH EFFECTS OF FORMALDEHYDE, CONSULT YOUR DOCTOR OR LOCAL HEALTH DEPARTMENT.
</div>

<h2>Modular &amp; Manufactured Home — Additional Information</h2>
<h3>Sources of Formaldehyde in Factory-Built Homes</h3>
<p>In modular and manufactured homes, formaldehyde-emitting materials are commonly introduced during factory construction and may include:</p>
<ul>
  <li>Particleboard and MDF used in cabinetry, shelving, and subflooring</li>
  <li>Oriented strand board (OSB) used in walls, floors, and roof decking</li>
  <li>Plywood used in structural panels</li>
  <li>Factory-installed flooring with adhesives or composite cores</li>
  <li>Furniture and built-in components assembled at the factory</li>
</ul>
<p>Because the factory environment involves enclosed assembly of many of these materials simultaneously, formaldehyde concentrations in newly delivered manufactured homes may be higher than in site-built homes during the initial period after delivery and installation.</p>

<h3>Manufacturer Responsibility</h3>
<p>The Manufacturer — not Sherman Homes — is primarily responsible for the selection and installation of factory-built materials, including those that may emit formaldehyde. Sherman Homes' role is limited to site work, installation, and finish work performed on-site.</p>
<p>If you have questions about the specific materials used in your home, you have the right to request material specifications directly from the Manufacturer prior to the Factory Order Lock-In Date. The Manufacturer can provide information on formaldehyde emission levels and, in many cases, offer lower-formaldehyde or no-added-formaldehyde (NAF) material options.</p>

<h3>Steps You Can Take</h3>
<ul>
  <li><strong>Before ordering:</strong> Ask the Manufacturer about low-formaldehyde or NAF (no-added-formaldehyde) options for cabinetry, flooring, and engineered wood panels.</li>
  <li><strong>After delivery:</strong> Ventilate the home thoroughly before and after move-in by opening windows and running ventilation systems.</li>
  <li><strong>Ongoing:</strong> Maintain moderate indoor temperatures and humidity levels. Formaldehyde emissions typically decrease significantly within the first 1–2 years after manufacture.</li>
</ul>

<h2>Governing Law</h2>
<p>This disclosure is provided as required by <strong>Minnesota Statutes Section 325F.182</strong>. This disclosure does not limit or waive any rights the Owner may have under Minnesota or federal law regarding indoor air quality, manufacturer liability, or warranty claims.</p>

<div class="sig-section">
  <h2 style="border:none;margin-top:0">Acknowledgment and Signature</h2>
  <p>By signing below, I/we acknowledge that I/we have received and read this Formaldehyde Disclosure as required by Minnesota Statutes Section 325F.182, and that I/we understand the particular relevance of formaldehyde emissions in modular and manufactured homes built with factory-installed engineered wood products.</p>

  <p>Owner Signature: ${blank(280)} &nbsp; Date: ${blank(110)}</p>
  <p>Print Name: <span class="sig-prefilled">${d.ownerName || blank(200)}</span></p>

  <br>
  <p>Owner Signature: ${blank(280)} &nbsp; Date: ${blank(110)}</p>
  <p>Print Name: <span class="sig-prefilled">${d.owner2Name || blank(200)}</span></p>
</div>

<div class="generated-note">Generated by Sherman Bidding System &mdash; ${d.today}${d.quoteNum ? ` &mdash; Project #${d.quoteNum}` : ''} &mdash; ${COMPANY.name}, ${COMPANY.address}</div>
</body></html>`;
};

// ─── 3. Homeowner's Guide ───────────────────────────────────────────────────
// Fills: Owner name in initials labels and signature print names; team contacts left blank (not in system)
export const generateHomeownerGuide = (quote, customer, totals, user) => {
  const d = prep(quote, customer, totals);
  const u = user || {};

  const ack = (num, title, text) => `
<div style="margin:14px 0;padding:12px;border:1px solid #ddd;border-radius:4px">
  <p style="margin:0 0 8px"><strong>${num}. ${title}</strong></p>
  <p style="margin:0 0 10px;font-size:13px">${text}</p>
  <div class="initial-row">
    <span class="initial-box">&nbsp;</span><span style="font-size:12px;color:#555">Initial${d.ownerName ? ` — ${d.ownerName}` : ''}</span>
    &nbsp;&nbsp;&nbsp;
    <span class="initial-box">&nbsp;</span><span style="font-size:12px;color:#555">Initial${d.owner2Name ? ` — ${d.owner2Name}` : ''}</span>
  </div>
</div>`;

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>Homeowner's Guide — ${d.ownerName || 'Sherman Homes'}</title>
<style>${STYLES}</style></head><body>
${printBar}
<div class="header-bar">
  <h1>Homeowner's Guide to Selections, Purchases &amp; Key Milestones</h1>
  <p class="sub">Modular / Manufactured Home &mdash; ${COMPANY.name} &mdash; Lic. # BC532878${d.quoteNum ? ` &mdash; Project #${d.quoteNum}` : ''}</p>
</div>

<h2>Your Sherman Team</h2>
<p><strong>Project Design Representative:</strong><br>
${u.fullName || blank(200)}<br>
${u.officePhone ? `Office: ${u.officePhone} | ` : ''}Cell: ${u.cellPhone || u.phone || blank(140)}<br>
Email: ${u.email || blank(200)}</p>

<p><strong>Project Specification Coordinator:</strong><br>
Katie Ryan<br>
Office: 763-465-1016 | Cell: 763-464-8390<br>
Email: Katie@shermanbuildings.com</p>

<p><strong>Project Construction Manager:</strong><br>
Ryan Gunderson<br>
Cell: 763-237-4252<br>
Email: ryan@shermanbuildings.com</p>

<p><strong>Manufacturer Sales Contact via Sherman:</strong><br>
Isac Kelling<br>
Cell: 320-515-1815<br>
Email: isac@shermanbuildings.com</p>

<h2>How This Process Works</h2>
<p>The Agreement, Plans, Specification Booklet, Allowance Budget, and Manufacturer's Quote and Floor Plan are all important documents that must be reviewed carefully to avoid discrepancies in expectations for both the final product and the process required to get there.</p>
<p>Because your home is built in a manufacturing facility — not entirely on-site — this process works differently than a traditional custom home build. <strong>Two separate workflows run in parallel:</strong> the Manufacturer builds your home unit in the factory while Sherman Homes prepares your site, foundation, and utilities. Understanding how these two tracks connect is essential to a smooth experience.</p>
<p>Changes are almost always part of the process, but in a modular or manufactured home, <strong>many selections are locked the moment the factory order is placed.</strong> Changes that are easy and inexpensive before the order can become impossible — or very costly — after it. Please do not assume any specific materials or services are included. It's always better to ask for clarification early.</p>
<p>We're excited to partner with you on this journey and bring your new home to life.</p>

<h2>Understanding Your Build: Factory vs. Site</h2>
<p>This is the most important concept in your project. Your home is built in <strong>two places</strong> by <strong>two separate teams.</strong></p>

<h3>What the Manufacturer Builds (Factory)</h3>
<p>The Manufacturer constructs your home unit in a controlled factory environment. This includes the structural frame, walls, roof, factory-installed insulation, interior finishes, cabinetry, flooring, plumbing rough-in, electrical rough-in, and any other factory-installed options you select. Once the factory order is placed, <strong>these items are locked.</strong></p>

<h3>What Sherman Homes Builds (On-Site)</h3>
<p>Sherman Homes handles everything at your property: site preparation, grading, foundation construction, utility stub-outs, home delivery coordination, crane and set operations, marriage wall assembly (for multi-section homes), final utility connections, site finish work, and any on-site upgrades specified in your Allowance Budget.</p>

<h3>Factory vs. Site Selections at a Glance</h3>
<table>
  <tr><th>Selection Type</th><th>Examples</th><th>Deadline</th></tr>
  <tr><td><strong>Factory-locked</strong></td><td>Home model, floor plan, structural options, factory cabinetry, factory flooring, factory-installed fixtures</td><td>Before Factory Order Lock-In Date</td></tr>
  <tr><td><strong>Site allowance</strong></td><td>Foundation type, utility connections, on-site finish upgrades, landscaping, exterior grading</td><td>Per Sherman timeline</td></tr>
</table>
<blockquote><strong>Rule of thumb:</strong> If it's built or installed inside the factory, it must be decided before the Factory Order Lock-In Date. If it happens at your property after delivery, it follows Sherman's standard timeline.</blockquote>

<h2>Your Project Timeline</h2>
<p><strong>Phase 1 — Pre-Order (Selections &amp; Site Planning)</strong><br>All factory selections must be finalized. Foundation design and permits are initiated. Factory Order Lock-In Date is confirmed in writing by Sherman Homes.</p>
<p><strong>Phase 2 — Factory Production</strong><br>The Manufacturer builds your home unit in the factory (typically 4–8 weeks). During this time, Sherman Homes completes site preparation, foundation, and utility stub-outs so the site is ready when the home arrives.</p>
<p><strong>Phase 3 — Delivery &amp; Set</strong><br>The completed home unit is transported from the factory to your site. Sherman Homes coordinates the crane and set operations, placing the home on the foundation. <strong>A joint pre-delivery inspection is conducted by the Owner and Sherman Homes before the home is placed on the foundation.</strong></p>
<p><strong>Phase 4 — Installation &amp; Site Finish</strong><br>Sherman Homes connects utilities, completes marriage wall assembly (if applicable), completes on-site finish work, and coordinates final inspections.</p>
<p><strong>Phase 5 — Final Walkthrough &amp; Occupancy</strong><br>Final inspection, punch list completion, final payment, and issuance of the Right to Occupy Certificate.</p>

<h2>Key Acknowledgements</h2>
<p>Please read each statement carefully and initial to confirm your understanding.</p>
${ack(1, 'Document Review', 'I/We have received and reviewed the Agreement, Plans, Specification Booklet, Allowance Budget, and Manufacturer\'s Quote and Floor Plan. I/We understand these documents define the scope, specifications, and pricing for this project across both factory-built and site-built components.')}
${ack(2, 'Factory Order Lock-In', 'I/We understand that once the factory order is placed with the Manufacturer, changes to factory-built components (including floor plan, structural options, factory-installed cabinetry, flooring, and fixtures) may not be possible. Any changes the Manufacturer permits after the order is placed will be treated as a Change Order and are my/our sole financial responsibility, including any restocking fees, factory change fees, or production delay costs.')}
${ack(3, 'Change Authorization', 'I/We understand that only changes discussed directly with our Sherman Team project contacts (listed above) will be authorized. This policy helps avoid misunderstandings and ensures all modifications are properly documented and priced.')}
${ack(4, 'Cost Responsibility', 'I/We understand that the final price of this project is subject to unknown conditions and enhancements made as construction progresses. I/We accept responsibility for costs associated with changes or additions we request, including factory change fees.')}
${ack(5, 'Site Readiness for Delivery', 'I/We understand that the project site must be fully ready on or before the confirmed delivery date. This includes the foundation being complete and inspected, the driveway and site access being clear and adequate for transport trucks and crane equipment, and all required site grading being complete. Delays caused by site unreadiness are my/our financial responsibility and will be treated as a Change Order.')}
${ack(6, 'Pre-Delivery Inspection', 'I/We understand that a joint inspection of the home unit will be conducted at delivery, before placement on the foundation. I/We agree to participate in (or designate a representative for) this inspection, and that any visible defects or damage must be documented at that time. I/We will not formally accept the home unit until this inspection is complete.')}
${ack(7, 'Floor Plan & Framing Tolerances', 'I/We understand that floor plan and framing layouts are subject to reasonable field tolerances. Factory-built dimensions may vary slightly from plan drawings. Any dimensions that must be precise will be explicitly noted in the contract documents.')}
${ack(8, 'Homeowner-Hired Contractors', 'I/We understand that if we wish to hire any additional contractors to work on our project, we must inform Sherman Homes in advance. No third-party contractor work is permitted during the delivery and installation phase without prior written approval from Sherman Homes.')}
${ack(9, 'Homeowner-Selected Subcontractors', 'I/We understand that if we choose to use subcontractors different from Sherman Homes\' standard team, Sherman Homes does not accept responsibility for the work quality, warranty, or performance of homeowner-selected subcontractors. We understand we should obtain written contracts and warranties directly from any subcontractors we select.')}
${ack(10, 'Seasonal Construction & Weather Delays', 'I/We understand that construction in Minnesota and Wisconsin is very seasonal. Portions of the work can only be performed in warm weather conditions, and delivery/set operations may be delayed by weather. I/We understand that weather-related delays are not the responsibility of Sherman Homes.')}
${ack(11, 'Utility Costs During Construction', 'I/We understand that all utility bills accrued during construction (including but not limited to electric, gas, water, and sewer) are our responsibility and will be billed directly to us.')}
${ack(12, 'Insurance Requirements', 'I/We have reviewed and understand the insurance requirements detailed in Section 12 of our contract. Sherman Homes carries Workers Compensation, Liability, and Builder\'s Risk insurance covering the Contractor and its direct subcontractors during construction. I/We are required to maintain liability insurance on the property during construction and will acquire homeowners insurance immediately after drywall is hung.')}

<h2>Your Manufactured Home Selections</h2>
<blockquote><strong>IMPORTANT:</strong> Selections fall into two categories: <strong>Factory-Locked</strong> (must be finalized before the Factory Order Lock-In Date — cannot be changed once the order is placed) and <strong>Site Allowance</strong> (follows Sherman's standard timeline). Confirm which category each item falls into with your Sherman Team. Monitor your spending against the Allowance Budget throughout the process.</blockquote>
<p>For all factory-locked items, refer to your <strong>Manufacturer's Quote and Specification Booklet</strong> for base-package inclusions and available upgrades. Work with your Manufacturer Sales Contact to confirm selections and with your Sherman Team for any on-site upgrades.</p>

<h3>Factory-Locked Selections <em style="font-weight:400">(Finalize before Factory Order Lock-In Date)</em></h3>
<table>
  <tr><th style="width:35%">Item</th><th>Notes</th></tr>
  <tr><td><strong>Home Model &amp; Floor Plan</strong></td><td>Floor plan, room dimensions, exterior style, roofline, and structural upgrades. <strong>Cannot be changed once ordered.</strong></td></tr>
  <tr><td><strong>Cabinetry &amp; Finishes</strong></td><td>Factory-installed cabinetry and interior finishes. Inform your Sherman Team before the order if selecting on-site cabinetry upgrades instead.</td></tr>
  <tr><td><strong>Plumbing Fixtures</strong></td><td>Factory-plumbed fixtures must be selected before order. Site-connected items can be selected before site work begins.</td></tr>
  <tr><td><strong>Fireplace</strong></td><td>Confirm with your Sherman Team whether the fireplace is a factory option or site-installed.</td></tr>
</table>

<h3>Site Selections <em style="font-weight:400">(Select before site finish work begins)</em></h3>
<p>The items below are typically included in the manufacturer's base package. If on-site upgrades are part of your project, your Sherman Team will coordinate selections.</p>
<table>
  <tr><th style="width:35%">Item</th><th>Notes</th></tr>
  <tr><td><strong>Cabinetry, Countertops, Flooring, Tile</strong></td><td>On-site upgrades or additions beyond what the factory provides.</td></tr>
  <tr><td><strong>Paint Colors</strong></td><td>Our painter uses Sherwin Williams but can color-match to other brands.</td></tr>
</table>

<h3>After Home is Set on Foundation</h3>
<p><strong>Cabinet &amp; Electrical Walkthrough:</strong> We'll schedule this once site framing/connections are underway. Before the walkthrough, start thinking about outlet placement, switch locations, charging stations, security systems, and TV locations.</p>

<h3>Homeowner Purchases <em style="font-weight:400">(After painting is complete)</em></h3>
<table>
  <tr><th style="width:35%">Item</th><th>Notes</th></tr>
  <tr><td><strong>Electrical Fixtures</strong></td><td>Purchase after the walkthrough. Label each fixture with its intended location and orientation.</td></tr>
  <tr><td><strong>Appliances</strong></td><td>Confirm your retailer handles installation (Sherman does not install appliances). Your PM will coordinate delivery timing. <em>Exceptions: range hoods and dishwashers (plumber will install if on-site).</em></td></tr>
  <tr><td><strong>Hardware &amp; Accessories</strong></td><td>Mirrors, towel bars, toilet paper holders, interior &amp; exterior door hardware. Sherman installs these; fees may apply.</td></tr>
</table>

<h3>Utilities</h3>
<p>You are responsible for setting up utility accounts and all utility costs during construction. <strong>Open accounts early — utility delays can hold up foundation work and affect the delivery schedule.</strong></p>

<h2>Factory Delivery &amp; Set — What to Expect</h2>
<p><strong>Before Delivery:</strong> Sherman Homes will confirm the delivery date and time in writing. The foundation must be complete, inspected, and approved before delivery. Driveway and site access must be clear for transport trucks and crane equipment.</p>
<p><strong>Day of Delivery — Pre-Delivery Inspection:</strong> Before the home is placed on the foundation, you (or your designated representative) and a Sherman Homes representative will conduct a joint inspection. Document any visible damage, incomplete work, or items not matching your Manufacturer's specifications in writing. Do not formally accept the unit until this inspection is complete and documented. Any factory defects or transit damage must be reported to the Manufacturer in writing within <strong>5 business days</strong> of delivery.</p>
<p><strong>Set Operations:</strong> A crane will be used to lift and place the home unit(s) on the foundation. <strong>No guests, family members, or third-party contractors are permitted on site during set operations</strong> for safety reasons.</p>
<p><strong>After Set:</strong> Sherman Homes will connect utilities, complete installation, and begin site finish work. HUD inspection (if applicable) will be scheduled and coordinated by Sherman Homes.</p>

<h2>Quick Reference Checklist</h2>
<h3>Factory-Locked Selections <em style="font-weight:400;font-size:13px">(Must be completed before the Factory Order Lock-In Date)</em></h3>
<table class="checklist-table">
  <tr><td>Home model &amp; floor plan confirmed</td><td>☐</td></tr>
  <tr><td>Structural options &amp; upgrades selected</td><td>☐</td></tr>
  <tr><td>Factory cabinetry &amp; finish selections made</td><td>☐</td></tr>
  <tr><td>Factory-plumbed fixtures selected</td><td>☐</td></tr>
  <tr><td>Factory flooring selections made</td><td>☐</td></tr>
  <tr><td>Fireplace (if factory option) confirmed</td><td>☐</td></tr>
  <tr><td>Factory Order Lock-In Date confirmed in writing</td><td>☐</td></tr>
</table>

<h3>Project Milestones</h3>
<table>
  <tr><th>Milestone</th><th>Who is Responsible</th></tr>
  <tr><td>Factory Order Lock-In Date</td><td>Owner + Sherman Homes</td></tr>
  <tr><td>Factory production complete</td><td>Manufacturer</td></tr>
  <tr><td>Site ready for delivery (foundation, access)</td><td>Owner + Sherman Homes</td></tr>
  <tr><td>Pre-delivery inspection</td><td>Owner + Sherman Homes</td></tr>
  <tr><td>Delivery &amp; set</td><td>Sherman Homes</td></tr>
  <tr><td>HUD/modular inspection</td><td>Sherman Homes</td></tr>
  <tr><td>Utility connections complete</td><td>Sherman Homes</td></tr>
  <tr><td>Final walkthrough</td><td>Owner + Sherman Homes</td></tr>
  <tr><td>Right to Occupy Certificate issued</td><td>Sherman Homes</td></tr>
</table>

<div class="sig-section">
  <h2 style="border:none;margin-top:0">Signatures</h2>
  <p>By signing below, we acknowledge that we have read and understand this guide in its entirety, that we understand the key differences between a modular/manufactured home build and a traditional site-built home, and that we have initialed each Key Acknowledgement above. We understand this guide is incorporated by reference into the Main Contract as a Contract Document.</p>

  <p><strong>Homeowner 1:</strong></p>
  <p>Signature: ${blank(300)} &nbsp; Date: ${blank(110)}</p>
  <p>Printed Name: <span class="sig-prefilled">${d.ownerName || blank(200)}</span></p>

  <p><strong>Homeowner 2:</strong></p>
  <p>Signature: ${blank(300)} &nbsp; Date: ${blank(110)}</p>
  <p>Printed Name: <span class="sig-prefilled">${d.owner2Name || blank(200)}</span></p>

  <p><strong>Sherman Homes Representative:</strong></p>
  <p>Signature: ${blank(300)} &nbsp; Date: ${blank(110)}</p>
  <p>Printed Name: <span class="sig-prefilled">${u.fullName || blank(200)}</span></p>

  <p style="font-size:14px;margin-top:20px;color:#2c5530;font-weight:600">Thank you for choosing Sherman Homes. Let's build something amazing together.</p>
  <p style="font-size:12px;color:#555;font-style:italic">This guide is for informational purposes and project coordination. It is incorporated by reference into the Main Contract. It does not constitute legal advice. Consult a licensed Minnesota construction attorney with any legal questions regarding your purchase.</p>
</div>

<div class="generated-note">Generated by Sherman Bidding System &mdash; ${d.today}${d.quoteNum ? ` &mdash; Project #${d.quoteNum}` : ''} &mdash; ${COMPANY.name}, ${COMPANY.address}</div>
</body></html>`;
};

// ─── 4. Warranty Statement ───────────────────────────────────────────────────
// Fills: Manufacturer info blanks (not in system — left blank); signature print names
export const generateWarrantyStatement = (quote, customer, totals) => {
  const d = prep(quote, customer, totals);

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>Warranty Statement — ${d.ownerName || 'Sherman Homes'}</title>
<style>${STYLES}</style></head><body>
${printBar}
<div class="header-bar">
  <h1>Warranty Statement</h1>
  <p class="sub">Sherman Homes | License # BC532878 | Modular / Manufactured Home${d.quoteNum ? ` &mdash; Project #${d.quoteNum}` : ''}</p>
</div>

<blockquote><strong>Important Notice:</strong> This warranty statement covers a factory-built home. Construction responsibilities — and therefore warranty responsibilities — are divided between <strong>the Manufacturer</strong> (who builds the home unit in a factory) and <strong>Sherman Homes</strong> (who performs site work and installation). Read all sections carefully. This document does not constitute legal advice; consult a licensed Minnesota attorney with questions about your rights.</blockquote>

<h2>A. Sherman Homes Statutory Warranties — Site Work &amp; Installation</h2>
<p>Sherman Homes warrants the <strong>site work and installation</strong> portions of your home under Minnesota Statutes Chapter 327A, as follows:</p>
<table>
  <tr><th>Warranty Period</th><th>Coverage</th></tr>
  <tr><td><strong>1-Year</strong></td><td>Site work and installation shall be free from defects caused by faulty workmanship and defective materials due to non-compliance with building standards.</td></tr>
  <tr><td><strong>2-Year</strong></td><td>Site-installed plumbing, electrical, heating, and cooling systems shall be free from defects caused by faulty installation due to non-compliance with building standards.</td></tr>
  <tr><td><strong>10-Year</strong></td><td>Site work and installation shall be free from major construction defects due to non-compliance with building standards.</td></tr>
</table>
<p><strong>Sherman Homes' warranties apply to site work and installation only.</strong> They do not cover defects originating in the manufacturing facility. See Section C for manufacturer warranty coverage.</p>
<p><strong>Warranty Date:</strong> The Warranty Date for Sherman Homes' statutory warranties is the earlier of: (1) the date the Owner first occupies the home, or (2) the date the Owner takes legal title to the home — but not earlier than the date the home unit is set on the foundation and site work commences.</p>
<p><strong>Claims Requirement:</strong> Written warranty claims against Sherman Homes must be reported within <strong>six months</strong> after the Owner discovers or should have discovered the defect.</p>

<h2>B. Scope of Responsibility — Why This Warranty Is Divided</h2>
<p><strong>The Manufacturer</strong> constructed the home unit in a factory, including: structural framing, roof, and exterior shell; factory-installed interior finishes, cabinetry, flooring; plumbing rough-in and electrical rough-in completed at the factory; factory-installed appliances and mechanical systems.</p>
<p><strong>Sherman Homes</strong> is responsible for: foundation design coordination and construction; delivery coordination and transportation permitting; crane and set operations (placing the home on the foundation); marriage wall assembly (multi-section homes); final utility connections (electric, plumbing, HVAC, fuel); all finish work completed on-site; site cleanup and final inspection coordination.</p>
<p><strong>Defects in manufacturer-supplied components or factory workmanship are the responsibility of the Manufacturer</strong>, not Sherman Homes. Sherman Homes will assist the Owner in pursuing manufacturer warranty claims but does not assume liability for factory defects.</p>

<h2>C. Manufacturer Warranty</h2>
<p>Sherman Homes will pass through to the Owner all warranties provided by the Manufacturer with respect to the factory-built home unit. The Manufacturer's warranty is separate from and in addition to Sherman Homes' statutory warranties.</p>
<p><strong>Manufacturer Information:</strong></p>
<table>
  <tr><td>Manufacturer Name</td><td>${blank(240)}</td></tr>
  <tr><td>Address</td><td>${blank(240)}</td></tr>
  <tr><td>HUD Certification / License No.</td><td>${blank(240)}</td></tr>
  <tr><td>Warranty Contact Name</td><td>${blank(240)}</td></tr>
  <tr><td>Warranty Phone</td><td>${blank(240)}</td></tr>
  <tr><td>Warranty Email / Portal</td><td>${blank(240)}</td></tr>
</table>

<p><strong>Manufacturer Warranty Summary:</strong></p>
<table>
  <tr><th>Coverage</th><th>Term</th><th>Notes</th></tr>
  <tr><td>Structural / Home Unit</td><td>${blank(60)} Year(s)</td><td>Per manufacturer warranty document</td></tr>
  <tr><td>Plumbing (factory-installed)</td><td>${blank(60)} Year(s)</td><td>Per manufacturer warranty document</td></tr>
  <tr><td>Electrical (factory-installed)</td><td>${blank(60)} Year(s)</td><td>Per manufacturer warranty document</td></tr>
  <tr><td>Roofing</td><td>${blank(60)} Year(s)</td><td>Per manufacturer warranty document</td></tr>
  <tr><td>Appliances</td><td>Per appliance mfr.</td><td>Individual appliance warranties passed through</td></tr>
  <tr><td>Windows &amp; Doors</td><td>${blank(60)} Year(s)</td><td>Per manufacturer warranty document</td></tr>
</table>
<p><strong>The full manufacturer warranty document is attached to this Warranty Statement as Exhibit W-1.</strong> The Owner should review Exhibit W-1 carefully for complete coverage terms, exclusions, and claims procedures.</p>

<p><strong>How to File a Manufacturer Warranty Claim:</strong></p>
<ol>
  <li>Document the defect in writing with photographs.</li>
  <li>Contact the Manufacturer directly using the contact information above.</li>
  <li>Notify Sherman Homes in writing at the same time.</li>
  <li>Sherman Homes will cooperate with and assist in the claims process.</li>
</ol>
<p>Sherman Homes does not assume any warranty obligation for items covered by the Manufacturer's warranty. However, if a defect is disputed between manufacturer and site-work origin, Sherman Homes and the Manufacturer will cooperate to determine responsibility.</p>

<h2>D. Applicable Building Standards — HUD Code vs. MN State Building Code</h2>
<p><strong>HUD-Code Manufactured Home:</strong> Factory-built portions of a HUD-code manufactured home are constructed under <strong>federal HUD Manufactured Home Construction and Safety Standards (24 CFR Part 3280)</strong>. Federal HUD standards may govern warranty rights for factory-built components in ways that differ from or supersede Minnesota Chapter 327A.</p>
<p><strong>Modular Home:</strong> A modular home is factory-built to <strong>Minnesota State Building Code</strong> standards. Minnesota Chapter 327A applies in full to both site work and factory-built portions.</p>
<p><strong>Site Work (both home types):</strong> All site work performed by Sherman Homes complies with the <strong>Minnesota State Building Code</strong> and applicable local codes, regardless of home type.</p>
<p>The HUD Data Plate and/or certification label(s) must be present on the completed unit at delivery. If any label is missing, notify Sherman Homes immediately.</p>

<h2>E. Warranty Date — Factory-Built Home Clarification</h2>
<p><strong>For Sherman Homes' site work warranties</strong>, the Warranty Date shall not begin earlier than the <strong>date the home unit is set on the foundation and site work commences.</strong> <strong>For the Manufacturer's warranty</strong>, the warranty date and trigger are governed by the Manufacturer's warranty document (Exhibit W-1).</p>

<h2>F. Claims Procedures</h2>
<h3>F.1 — Claims Against Sherman Homes (Site Work &amp; Installation)</h3>
<ol>
  <li><strong>Report in writing</strong> within six months of discovering the defect — Sherman Homes | 2244 Hwy 65, Mora, MN 55051</li>
  <li>Sherman Homes will <strong>inspect within 30 days</strong> of receiving written notice.</li>
  <li>Sherman Homes will provide a <strong>written offer to repair within 15 days</strong> of completing the inspection.</li>
  <li>If the parties agree on scope of repair, Sherman Homes will perform repairs per the written agreement.</li>
  <li>If the parties do not agree, the matter proceeds to the <strong>MN Home Warranty Dispute Resolution Process</strong> under MN Stat. § 327A.051 before any court action may be filed.</li>
</ol>
<h3>F.2 — Claims Against the Manufacturer (Factory-Built Components)</h3>
<ol>
  <li>Contact the Manufacturer directly using the contact information in Section C.</li>
  <li>Notify Sherman Homes in writing at the same time.</li>
  <li>Follow the Manufacturer's claims procedure as set forth in Exhibit W-1.</li>
  <li>Sherman Homes will assist in coordinating access, documentation, and follow-up.</li>
</ol>
<h3>F.3 — Disputed Claims (Origin Unclear)</h3>
<p>If it is not clear whether a defect originated in factory construction or site installation, notify <strong>both</strong> Sherman Homes and the Manufacturer in writing. Both parties will cooperate to inspect and determine the responsible party. The Owner's claim rights are preserved against both parties during this process.</p>

<h2>G. Warranty Exclusions</h2>
<p>The liability of Sherman Homes under this warranty is limited to site work and installation defects and does not extend to the following:</p>
<ul>
  <li>Loss or damage <strong>not reported in writing within six months</strong> after discovery</li>
  <li>Loss or damage caused by <strong>defects in design, materials, or installation supplied or directed by the Owner</strong></li>
  <li>Secondary loss or damage such as personal injury or property damage</li>
  <li>Loss or damage from <strong>normal wear and tear</strong> or normal shrinkage within building standard tolerances</li>
  <li>Loss or damage from dampness or condensation due to insufficient ventilation after occupancy</li>
  <li>Loss or damage from <strong>negligence, improper maintenance, or alteration</strong> by parties other than Sherman Homes</li>
  <li>Loss or damage from <strong>Acts of God</strong>, including fire, explosion, smoke, water escape, windstorm, hail, lightning, flood, and earthquake — except where caused by failure to comply with building standards</li>
  <li>Loss or damage due to <strong>soil conditions on Owner-supplied land</strong> obtained independently of Sherman Homes</li>
  <li><strong>Defects in manufacturer-supplied components, factory workmanship, or materials originating in the manufacturing facility</strong> — these are the responsibility of the Manufacturer and are governed by the Manufacturer's warranty (Exhibit W-1)</li>
</ul>

<h2>H. Waiver and Modification</h2>
<p>The warranties provided under Minnesota Statutes Chapter 327A cannot be waived or modified except as provided by § 327A.04. Any modification must be made by a written instrument, printed in boldface type of minimum 10-point size, signed by the Owner, describing the warranty involved, the Owner's consent, and the terms of the modified agreement.</p>

<h2>I. Minnesota Statutes Chapter 327A — Reference</h2>
<p>The complete text of Minnesota Statutes Chapter 327A (New Home Warranties) is available at: <strong>https://www.revisor.mn.gov/statutes/cite/327A</strong></p>
<p>A printed copy of Chapter 327A will be provided to the Owner upon request. The Owner's rights under Chapter 327A are fully preserved and are not limited by any provision of this document.</p>
<p>Key provisions: § 327A.01 (Definitions) | § 327A.02 (Statutory Warranties) | § 327A.03 (Exclusions) | § 327A.04 (Waiver) | § 327A.05 (Remedies) | § 327A.051 (Dispute Resolution) | § 327A.08 (Limitations)</p>

<div class="sig-section">
  <h2 style="border:none;margin-top:0">Acknowledgment and Signature</h2>
  <p>By signing below, I/we acknowledge that I/we have received and reviewed this Warranty Statement, understand the division of warranty responsibility between Sherman Homes and the Manufacturer, and understand the warranty coverage, exclusions, claims procedures, and dispute resolution process.</p>
  <p>I/we understand that: Sherman Homes warrants <strong>site work and installation</strong> under MN Chapter 327A. The <strong>Manufacturer</strong> warrants factory-built components per Exhibit W-1. Written warranty claims must be reported within <strong>six months</strong> of discovery. The <strong>Manufacturer Warranty document (Exhibit W-1)</strong> is attached and has been provided to me/us.</p>

  <p><strong>Owner Signature:</strong> ${blank(280)} &nbsp; <strong>Date:</strong> ${blank(110)}</p>
  <p><strong>Print Name:</strong> <span class="sig-prefilled">${d.ownerName || blank(200)}</span></p>

  <br>
  <p><strong>Owner Signature:</strong> ${blank(280)} &nbsp; <strong>Date:</strong> ${blank(110)}</p>
  <p><strong>Print Name:</strong> <span class="sig-prefilled">${d.owner2Name || blank(200)}</span></p>

  <br>
  <p><strong>Sherman Homes Representative:</strong> ${blank(280)} &nbsp; <strong>Date:</strong> ${blank(110)}</p>
  <p><strong>Print Name / Title:</strong> ${blank(200)}</p>

  <p style="margin-top:20px;font-size:12px;color:#555;font-style:italic">This Warranty Statement is a required contract document under MN Stat. § 327A.08. Failure to provide this warranty in writing is a violation of MN Stat. § 326B.84. This document does not constitute legal advice. Consult a licensed Minnesota construction attorney with questions about your rights under this warranty or under applicable HUD regulations.</p>
</div>

<div class="generated-note">Generated by Sherman Bidding System &mdash; ${d.today}${d.quoteNum ? ` &mdash; Project #${d.quoteNum}` : ''} &mdash; ${COMPANY.name}, ${COMPANY.address}</div>
</body></html>`;
};
