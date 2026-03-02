import { formatPhone, DocumentUtils, COMPANY, PRINT_STYLES, PRINT_BAR_EDITABLE, eb } from './shared.js';

export const generateScopeOfWorkDocument = (quote, customer, services) => {
  const today = DocumentUtils.formatDate();
  const quoteNum = DocumentUtils.getQuoteNum(quote);

  // Get all selected services with details
  const selectedServices = Object.entries(quote.selectedServices || {})
    .filter(([, selected]) => selected)
    .map(([key]) => {
      const service = services[key];
      return {
        key,
        name: service?.name || key,
        description: service?.description || ''
      };
    });

  // Additional services from quote-level fields (sewer, well, patio, landscaping, deck, custom)
  const extraServices = [];
  if (quote.sewerType && quote.sewerType !== 'none') {
    const sewerLabels = { '1_bed': '1 Bedroom System', '2_bed': '2 Bedroom System', '3_bed': '3 Bedroom System' };
    extraServices.push({ key: 'sewer', name: `Sewer System — ${sewerLabels[quote.sewerType] || quote.sewerType}` });
  }
  if (parseFloat(quote.wellDepth) > 0) {
    extraServices.push({ key: 'well', name: `Well Drilling — ${quote.wellDepth} ft` });
  }
  if (quote.patioSize && quote.patioSize !== 'none') {
    extraServices.push({ key: 'patio', name: `Concrete Patio — ${quote.patioSize} ft` });
  }
  if (quote.hasLandscaping) {
    extraServices.push({ key: 'landscaping', name: 'Landscaping' });
  }
  if (quote.hasDeck) {
    extraServices.push({ key: 'deck', name: 'Deck Construction' });
  }
  (quote.customServices || []).forEach(cs => {
    if (cs.name) extraServices.push({ key: `custom_${cs.name}`, name: cs.name });
  });

  // Foundation type descriptions with detailed specs
  const foundationTypes = {
    slab: {
      name: 'Concrete Slab Foundation',
      description: 'Monolithic concrete slab on grade with integrated footings',
      specifications: [
        'Minimum 4" thick concrete slab (3000 PSI)',
        '6" compacted gravel base',
        '6-mil polyethylene vapor barrier',
        'Wire mesh reinforcement (WWF 6x6 W1.4xW1.4)',
        'Perimeter frost footings per local code',
        'Anchor bolts for home attachment'
      ],
      workIncluded: [
        'Site excavation and rough grading (up to 6" cut/fill)',
        'Removal of topsoil and organic material in foundation area',
        'Installation of compacted gravel base',
        'Installation of vapor barrier',
        'Setting grade stakes and forming',
        'Pouring and finishing concrete slab',
        'Installation of anchor bolts per manufacturer specs',
        'Minimum 7-day cure time before home installation',
        'Final grade and slope for drainage away from foundation'
      ],
      excluded: [
        'Excavation exceeding 6" depth (rock, excessive soil removal)',
        'Removal of trees, stumps, or large obstacles',
        'Utility trenching and connections',
        'Site access road or driveway construction',
        'Permits (unless separately contracted)',
        'Dewatering or soil stabilization for poor soil conditions'
      ]
    },
    crawlspace: {
      name: 'Crawl Space Foundation',
      description: 'Elevated foundation with perimeter walls and ventilated crawl space',
      specifications: [
        'Concrete block or poured concrete perimeter walls',
        'Concrete footings per local frost depth requirements',
        'Minimum 18" crawl space height',
        'Pressure-treated sill plates',
        'Foundation vents (1 sq ft per 150 sq ft of crawl space)',
        'Access door (minimum 18" x 24")'
      ],
      workIncluded: [
        'Site excavation and rough grading',
        'Excavation for footings per local frost depth',
        'Pouring concrete footings',
        'Construction of perimeter foundation walls',
        'Installation of sill plates with anchor bolts',
        'Installation of foundation vents',
        'Installation of crawl space access door',
        '6-mil vapor barrier over crawl space floor',
        'Backfilling and compaction around foundation',
        'Final grade sloped away from foundation'
      ],
      excluded: [
        'Interior crawl space insulation',
        'Crawl space encapsulation or conditioning',
        'Pest control treatments or barriers',
        'Plumbing or electrical rough-ins',
        'Excessive excavation for rock or poor soil',
        'Drainage systems beyond perimeter grading'
      ]
    },
    basement: {
      name: 'Full Basement Foundation',
      description: 'Full-depth excavated basement with concrete walls and floor',
      specifications: [
        'Poured concrete or concrete block walls (8" minimum)',
        'Concrete footings sized per load requirements',
        'Minimum 7\'6" clear height inside basement',
        '4" concrete floor slab with gravel base',
        'Exterior waterproofing and drainage board',
        'Perimeter drain tile system',
        'At least one egress window per building code',
        'Sump pump pit (if required by site conditions)'
      ],
      workIncluded: [
        'Full-depth basement excavation',
        'Excavation for footings',
        'Installation of perimeter drain tile and gravel',
        'Pouring concrete footings',
        'Construction of basement walls',
        'Exterior waterproofing application',
        'Installation of drainage board',
        'Backfilling and compaction',
        'Installation of egress window wells and windows',
        'Pouring basement floor slab',
        'Installation of sump pump pit (if needed)',
        'Final grading around foundation'
      ],
      excluded: [
        'Interior basement finishing (framing, drywall, flooring)',
        'Additional windows beyond minimum egress requirements',
        'Plumbing fixtures and final connections',
        'Electrical fixtures and final connections',
        'HVAC installation',
        'Basement stairs (unless specifically quoted)',
        'Interior drainage systems',
        'Radon mitigation systems'
      ]
    }
  };

  const foundationType = quote.foundationType || 'none';
  const foundation = foundationTypes[foundationType] || {
    name: 'Pier Foundation (Standard)',
    description: 'Standard pier and beam foundation system per manufacturer specifications',
    specifications: [
      'Steel piers sized per I-beam height (20" or 22")',
      'Piers spaced per manufacturer installation instructions',
      'Anchor system with tie-down straps (single-wide)',
      'Marriage line piers for double-wide homes'
    ],
    workIncluded: [
      'Layout and placement of piers per manufacturer specs',
      'Leveling and shimming to manufacturer tolerances',
      'Installation of anchor systems',
      'Final leveling check after home is set'
    ],
    excluded: [
      'Excavation for basement or crawlspace',
      'Concrete work beyond pier pads',
      'Grading or site preparation beyond pier locations'
    ]
  };

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Scope of Work - ${customer.firstName || 'Customer'} ${customer.lastName || ''}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:28px;max-width:1000px;margin:0 auto;color:#222;line-height:1.45;font-size:13px}
.header{background:linear-gradient(135deg,#f8f9fa 0%,#e9ecef 100%);padding:16px 20px;border-radius:6px;margin-bottom:18px}
.title{font-size:26px;font-weight:900;color:#2c5530;margin:0;letter-spacing:-0.5px}
.subtitle{font-size:13px;color:#555;margin-top:4px;font-weight:500}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
.info-box{background:#f8f9fa;padding:10px 14px;border-radius:6px;border-left:4px solid #2c5530}
.info-label{font-weight:700;margin-bottom:5px;color:#2c5530;font-size:12px;text-transform:uppercase;letter-spacing:0.5px}
.section-title{font-size:15px;font-weight:800;color:#2c5530;margin:18px 0 8px;border-bottom:3px solid #2c5530;padding-bottom:5px;text-transform:uppercase;letter-spacing:0.5px}
.subsection-title{font-size:13px;font-weight:700;color:#1565c0;margin:10px 0 5px;border-left:3px solid #1565c0;padding-left:8px}
.service-box{background:#fff;border:1px solid #dee2e6;border-radius:6px;padding:12px 14px;margin-bottom:10px}
.service-name{font-size:14px;font-weight:700;color:#2c5530;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid #e9ecef}
.specs-box{background:#f1f3f5;padding:8px 12px;border-radius:4px;margin:8px 0;border-left:3px solid #495057}
.specs-title{font-weight:700;color:#495057;margin-bottom:6px;font-size:12px}
.included-list{list-style:none;padding:0;margin:6px 0}
.included-list li{padding:3px 0 3px 20px;position:relative;font-size:12px;line-height:1.45}
.included-list li:before{content:'✓';position:absolute;left:0;color:#28a745;font-weight:900;font-size:13px}
.excluded-list{list-style:none;padding:0;margin:6px 0}
.excluded-list li{padding:3px 0 3px 20px;position:relative;font-size:12px;line-height:1.45;color:#555}
.excluded-list li:before{content:'✗';position:absolute;left:0;color:#dc3545;font-weight:900;font-size:13px}
.highlight-box{background:#e7f5ff;border:2px solid #1565c0;padding:12px 14px;border-radius:6px;margin:10px 0}
.warning-box{background:#fff3cd;border:2px solid #ffc107;padding:12px 14px;border-radius:6px;margin:10px 0}
.success-box{background:#d4edda;border:2px solid #28a745;padding:12px 14px;border-radius:6px;margin:10px 0}
.sig-section{margin-top:24px;padding-top:16px;border-top:3px solid #2c5530}
.sig-line{border-bottom:2px solid #333;margin:28px 0 6px;min-height:32px}
.phase-box{background:#f0f4ff;border-left:4px solid #1565c0;padding:8px 12px;margin:10px 0 6px;border-radius:4px}
.phase-title{font-weight:700;color:#1565c0;font-size:13px;margin-bottom:2px}
.service-list{list-style:none;padding:0;margin:0;columns:2;column-gap:16px}
.service-list li{padding:3px 0 3px 18px;position:relative;font-size:12px;line-height:1.45;break-inside:avoid}
.service-list li:before{content:'✓';position:absolute;left:0;color:#2c5530;font-weight:700}
table{width:100%;border-collapse:collapse;margin:8px 0;background:#fff;border-radius:6px;overflow:hidden}
th{background:#2c5530;color:#fff;padding:7px 10px;text-align:left;font-weight:700;font-size:12px}
td{padding:6px 10px;border-bottom:1px solid #dee2e6;font-size:12px}
tr:last-child td{border-bottom:none}
.page-break{page-break-after:always}
@media print{body{padding:12px;font-size:11px}.page-break{page-break-after:always}.print-bar{display:none!important}}
${PRINT_STYLES}
</style></head><body>
${PRINT_BAR_EDITABLE}

<div class="header">
  <div class="title">SCOPE OF WORK</div>
  <div class="subtitle">Comprehensive Project Specifications & Deliverables</div>
  <div style="margin-top:16px;font-size:15px;color:#666;display:flex;justify-content:space-between">
    <span><strong>Quote #:</strong> ${quoteNum}</span>
    <span><strong>Date:</strong> ${today}</span>
  </div>
</div>

<!-- SECTION 1: PROJECT OVERVIEW -->
<div class="section-title">1. Project Overview & Objectives</div>

<div class="info-grid">
  <div class="info-box">
    <div class="info-label">Customer Information</div>
    <div style="font-size:14px;font-weight:700;margin-bottom:4px">${customer.firstName} ${customer.lastName}</div>
    <div style="color:#555;margin-bottom:2px">Phone: ${formatPhone(customer.phone)}</div>
    <div style="color:#555">Email: ${customer.email}</div>
  </div>
  <div class="info-box">
    <div class="info-label">Project Location</div>
    <div style="margin-bottom:2px">${customer.siteAddress}</div>
    <div>${customer.siteCity}, ${customer.siteState} ${customer.siteZip}</div>
  </div>
</div>

<div class="highlight-box">
  <div style="font-weight:800;font-size:14px;color:#1565c0;margin-bottom:6px">Project Description</div>
  <div style="font-weight:600;margin-bottom:4px">
    Installation of ${quote.singleDouble === 'Double' ? 'Double-Wide' : 'Single-Wide'} Modular Home
    ${quote.homeModel !== 'NONE' ? ` — Model: <strong>${quote.homeModel}</strong>` : ''}
  </div>
  <div style="color:#555">
    <strong>Dimensions:</strong> ${quote.houseWidth}' × ${quote.houseLength}' &nbsp;&nbsp;
    <strong>Foundation:</strong> ${foundation.name}
  </div>
</div>

<div class="success-box">
  <div style="font-weight:700;font-size:13px;margin-bottom:6px;color:#28a745">Project Objectives</div>
  <ul style="margin:0;padding-left:18px;line-height:1.5">
    <li>Deliver and install a turn-key modular home at the specified location</li>
    <li>Construct a code-compliant foundation to manufacturer specifications</li>
    <li>Complete all selected services to meet or exceed industry standards</li>
    <li>Coordinate all inspections, obtain required approvals, and deliver a move-in ready home</li>
  </ul>
</div>

<!-- SECTION 2: ROLES & RESPONSIBILITIES -->
<div class="section-title">2. Roles & Responsibilities</div>

<table>
  <thead><tr><th style="width:22%">Party</th><th>Responsibilities</th></tr></thead>
  <tbody>
    <tr>
      <td style="font-weight:700;color:#2c5530">${COMPANY.name}</td>
      <td>Provide all labor, materials, and equipment &bull; Coordinate delivery schedule &bull; Ensure code compliance &bull; Manage subcontractors &bull; Coordinate inspections &bull; Keep customer informed &bull; Clean site upon completion</td>
    </tr>
    <tr>
      <td style="font-weight:700;color:#2c5530">Customer</td>
      <td>Provide site access for all vehicles &bull; Obtain permits (unless contracted) &bull; Ensure utilities at property line &bull; Clear obstacles &bull; Make timely payments &bull; Be available for walkthroughs</td>
    </tr>
    <tr>
      <td style="font-weight:700;color:#2c5530">Manufacturer</td>
      <td>Manufacture home to spec &bull; Deliver on agreed schedule &bull; Provide installation instructions &bull; Honor manufacturer warranty &bull; Provide technical support as needed</td>
    </tr>
  </tbody>
</table>

<!-- SECTION 3: DETAILED WORK BREAKDOWN -->
<div class="section-title page-break">3. Work Breakdown & Specifications</div>

<div class="phase-box">
  <div class="phase-title">Phase 1: Site Preparation & Foundation</div>
  <div style="color:#666;font-size:11px">Duration: 3–7 days depending on weather and site conditions</div>
</div>

<div class="service-box">
  <div class="service-name">${foundation.name}</div>
  <div style="color:#666;margin-bottom:8px;font-size:12px">${foundation.description}</div>

  <div class="specs-box">
    <div class="specs-title">Technical Specifications:</div>
    <ul style="margin:4px 0;padding-left:18px;line-height:1.45">
      ${foundation.specifications.map(spec => `<li>${spec}</li>`).join('')}
    </ul>
  </div>

  <div class="subsection-title">Work Included</div>
  <ul class="included-list">
    ${foundation.workIncluded.map(item => `<li>${item}</li>`).join('')}
  </ul>

  <div class="subsection-title">Not Included (Additional Cost if Needed)</div>
  <ul class="excluded-list">
    ${foundation.excluded.map(item => `<li>${item}</li>`).join('')}
  </ul>
</div>

<div class="phase-box">
  <div class="phase-title">Phase 2: Home Delivery & Set</div>
  <div style="color:#666;font-size:11px">Duration: 1–2 days for delivery and crane set</div>
</div>

<div class="service-box">
  <div class="service-name">Modular Home Delivery</div>
  <div class="subsection-title">Included</div>
  <ul class="included-list">
    <li>Factory construction per manufacturer specs; all factory-installed features, finishes, and appliances</li>
    <li>Transport of home sections to site; delivery on agreed date (weather permitting)</li>
    <li>Delivery route coordination and manufacturer's structural warranty documentation</li>
  </ul>
  <div class="subsection-title">Not Included</div>
  <ul class="excluded-list">
    <li>Site prep / foundation (Phase 1) &bull; Utility connections beyond factory-installed &bull; Custom modifications not in factory order</li>
  </ul>
</div>

${selectedServices.filter(s => s.key === 'installation_of_home').length > 0 ? `
<div class="phase-box">
  <div class="phase-title">Phase 3: Home Installation & Finishing</div>
  <div style="color:#666;font-size:11px">Duration: 3–7 days depending on home size and weather</div>
</div>

<div class="service-box">
  <div class="service-name">Professional Home Installation</div>
  <div class="subsection-title">Work Included</div>
  <ul class="included-list">
    <li><strong>Crane Service:</strong> Lift and set home sections on foundation</li>
    <li><strong>Alignment & Leveling:</strong> Precise positioning to manufacturer tolerances</li>
    <li><strong>Marriage Wall:</strong> Complete framing, insulation, and sealing</li>
    <li><strong>Roof Connection:</strong> Sections joined, shingled over seam, fully weatherproofed</li>
    <li><strong>Exterior Completion:</strong> All trim, siding seams, and weatherproofing</li>
    <li><strong>Utility Connections:</strong> Plumbing, electrical, and HVAC connected at marriage wall</li>
    <li><strong>Final Walkthrough & Inspection Coordination</strong></li>
  </ul>
  <div class="subsection-title">Not Included</div>
  <ul class="excluded-list">
    <li>Foundation repairs after set &bull; Structural changes &bull; Custom modifications not in factory order &bull; Interior finishing beyond factory-installed</li>
  </ul>
</div>
` : ''}

${(() => {
  const additionalServices = [...selectedServices.filter(s => !['installation_of_home'].includes(s.key)), ...extraServices];
  if (additionalServices.length === 0) return '';
  const phaseNum = selectedServices.some(s => s.key === 'installation_of_home') ? '4' : '3';
  return `
<div class="phase-box">
  <div class="phase-title">Phase ${phaseNum}: Additional Services & Site Completion</div>
  <div style="color:#666;font-size:11px">Services performed as needed throughout or after main installation, per industry standards and local code</div>
</div>
<div class="service-box">
  <ul class="service-list">
    ${additionalServices.map(s => `<li>${s.name}</li>`).join('')}
  </ul>
</div>`;
})()}

<!-- SECTION 4: SITE REQUIREMENTS & CONDITIONS -->
<div class="section-title page-break">4. Site Requirements & Customer Obligations</div>

<div class="warning-box">
  <div style="font-weight:700;font-size:13px;margin-bottom:6px;color:#856404">Site Access & Preparation Requirements</div>
  <ul style="margin:0;padding-left:18px;line-height:1.5">
    <li><strong>Access Road:</strong> Semi-truck with 65'+ trailer and 85-ton crane &bull; 45-ft min turning radius &bull; 16-ft overhead clearance</li>
    <li><strong>Foundation:</strong> Complete, cured, and inspected before delivery date</li>
    <li><strong>Utilities:</strong> Electric, water, and sewer/septic available at property line</li>
    <li><strong>Staging Area:</strong> 50' × 100' clear area for crane setup &bull; Site clear of debris and obstacles</li>
    <li><strong>Weather:</strong> Installation cannot proceed in high winds, rain, or icy conditions</li>
  </ul>
</div>

<!-- SECTION 5: PROJECT EXCLUSIONS -->
<div class="section-title">5. General Exclusions</div>

<div class="service-box">
  <div style="margin-bottom:8px;font-weight:600;color:#495057">Unless specifically listed as included, the following are <strong>NOT</strong> part of this contract:</div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
    <div>
      <div style="font-weight:700;color:#2c5530;margin-bottom:5px">Site & Exterior</div>
      <ul class="excluded-list">
        <li>Landscaping / seeding / sod</li>
        <li>Driveway paving beyond gravel</li>
        <li>Fencing or property line work</li>
        <li>Tree removal (unless obstructing)</li>
        <li>Retaining walls or major grading</li>
        <li>Sheds, garages, or outbuildings</li>
      </ul>
    </div>
    <div>
      <div style="font-weight:700;color:#2c5530;margin-bottom:5px">Interior & Finish</div>
      <ul class="excluded-list">
        <li>Interior painting or wall finishes</li>
        <li>Flooring beyond factory-installed</li>
        <li>Cabinet or countertop upgrades</li>
        <li>Window treatments or blinds</li>
        <li>Light fixture upgrades</li>
        <li>Custom carpentry or built-ins</li>
      </ul>
    </div>
    <div>
      <div style="font-weight:700;color:#2c5530;margin-bottom:5px">Utilities & Systems</div>
      <ul class="excluded-list">
        <li>Well / septic (unless contracted)</li>
        <li>Utility connection fees / meter</li>
        <li>Electrical service upgrade at pole</li>
        <li>HVAC (unless contracted)</li>
        <li>Water softener / filtration</li>
        <li>Security or smart home systems</li>
      </ul>
    </div>
  </div>
</div>

<!-- SECTION 6: CHANGE ORDERS & MODIFICATIONS -->
<div class="section-title">6. Change Orders & Project Modifications</div>

<div class="highlight-box">
  <div style="font-weight:700;font-size:13px;margin-bottom:6px;color:#1565c0">Change Order Process</div>
  <p style="margin:0 0 6px">All modifications must be documented in writing — no verbal agreements honored. Each Change Order must include: description of work, cost impact, schedule impact, signatures from both parties, and CO number/date.</p>
  <p style="margin:0;font-weight:600">Work will not proceed on changes until a signed Change Order is received.</p>
</div>

<!-- SECTION 7: ASSUMPTIONS & CONDITIONS -->
<div class="section-title">7. Project Assumptions & Conditions</div>

<div class="service-box">
  <table style="margin:0 0 8px">
    <thead><tr><th style="width:22%">Category</th><th>Assumption</th></tr></thead>
    <tbody>
      <tr><td style="font-weight:700">Site</td><td>Normal soil, adequate drainage, no rock, water table below foundation depth</td></tr>
      <tr><td style="font-weight:700">Access</td><td>Unrestricted access for all vehicles during normal business hours</td></tr>
      <tr><td style="font-weight:700">Utilities</td><td>Electric, water, sewer/septic at property line; connections within 100 ft of home</td></tr>
      <tr><td style="font-weight:700">Permits</td><td>All permits obtainable; no unknown zoning restrictions or variances required</td></tr>
      <tr><td style="font-weight:700">Schedule</td><td>Manufacturer delivers on agreed date; materials and subcontractors available as scheduled</td></tr>
      <tr><td style="font-weight:700">Structures</td><td>No demolition of existing buildings required (unless specifically quoted)</td></tr>
    </tbody>
  </table>
  <div class="warning-box" style="margin:0">
    <strong>Unforeseen Conditions:</strong> If rock, poor soil, high water table, or underground utilities are discovered, work will be paused and a Change Order issued before proceeding.
  </div>
</div>

<!-- SECTION 8: ACKNOWLEDGMENT -->
<div class="sig-section">
  <div style="font-size:16px;font-weight:800;color:#2c5530;margin-bottom:10px">Acknowledgment & Agreement</div>

  <p style="margin-bottom:8px">
    By signing below, both parties confirm they have read and agree to this Scope of Work, which is part of <strong>Quote #${quoteNum}</strong> and should be reviewed alongside all contract documents (pricing, payment schedule, warranty, manufacturer specs, and any Change Orders).
    Work not included here requires a separate agreement or Change Order.
  </p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:20px">
    <div>
      <div style="font-weight:700;margin-bottom:6px">Customer Signature:</div>
      <div class="sig-line"></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#666">
        <span><strong>Print Name:</strong> ${customer.firstName} ${customer.lastName}</span>
        <span><strong>Date:</strong> ${eb(100)}</span>
      </div>
    </div>
    <div>
      <div style="font-weight:700;margin-bottom:6px">${COMPANY.name} Representative:</div>
      <div class="sig-line"></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#666">
        <span><strong>Print Name:</strong> ${eb(160)}</span>
        <span><strong>Date:</strong> ${eb(100)}</span>
      </div>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div style="margin-top:20px;padding:14px 20px;background:linear-gradient(135deg,#2c5530 0%,#1a3320 100%);color:#fff;border-radius:6px;text-align:center">
  <div style="font-size:16px;font-weight:800;margin-bottom:4px">${COMPANY.name}</div>
  <div style="font-size:12px;margin-bottom:4px">${COMPANY.tagline} &nbsp;|&nbsp; ${COMPANY.addressFull} &nbsp;|&nbsp; ${COMPANY.phone}</div>
  <div style="font-size:11px;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);font-style:italic">
    This Scope of Work is valid for 30 days from ${today}
  </div>
</div>

</body></html>`;
};
