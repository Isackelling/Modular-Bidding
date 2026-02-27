import { formatPhone, DocumentUtils } from './shared.js';

export const generateScopeOfWorkDocument = (quote, customer, services) => {
  const today = DocumentUtils.formatDate();
  const quoteNum = DocumentUtils.getQuoteNum(quote);

  // Get all selected services with details
  const selectedServices = Object.entries(quote.selectedServices || {})
    .filter(([key, selected]) => selected)
    .map(([key]) => {
      const service = services[key];
      return {
        key,
        name: service?.name || key,
        description: service?.description || ''
      };
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
body{font-family:'Segoe UI',Arial,sans-serif;padding:40px;max-width:1000px;margin:0 auto;color:#222;line-height:1.7}
.header{border-bottom:5px solid #2c5530;padding-bottom:24px;margin-bottom:40px;background:linear-gradient(135deg,#f8f9fa 0%,#e9ecef 100%);padding:30px;border-radius:8px}
.title{font-size:42px;font-weight:900;color:#2c5530;margin:0;letter-spacing:-1px}
.subtitle{font-size:18px;color:#555;margin-top:12px;font-weight:500}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px}
.info-box{background:#f8f9fa;padding:20px;border-radius:8px;border-left:4px solid #2c5530}
.info-label{font-weight:700;margin-bottom:10px;color:#2c5530;font-size:15px;text-transform:uppercase;letter-spacing:0.5px}
.section-title{font-size:26px;font-weight:800;color:#2c5530;margin:50px 0 24px;border-bottom:4px solid #2c5530;padding-bottom:10px;text-transform:uppercase;letter-spacing:0.5px}
.subsection-title{font-size:19px;font-weight:700;color:#1565c0;margin:28px 0 14px;border-left:4px solid #1565c0;padding-left:12px}
.service-box{background:#fff;border:2px solid #dee2e6;border-radius:10px;padding:24px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06)}
.service-name{font-size:22px;font-weight:800;color:#2c5530;margin-bottom:16px;padding-bottom:8px;border-bottom:2px solid #e9ecef}
.specs-box{background:#f1f3f5;padding:16px;border-radius:6px;margin:16px 0;border-left:4px solid #495057}
.specs-title{font-weight:700;color:#495057;margin-bottom:10px;font-size:16px}
.included-list{list-style:none;padding:0;margin:16px 0}
.included-list li{padding:10px 0 10px 32px;position:relative;font-size:15px;line-height:1.6}
.included-list li:before{content:'\\2713';position:absolute;left:0;color:#28a745;font-weight:900;font-size:20px}
.excluded-list{list-style:none;padding:0;margin:16px 0}
.excluded-list li{padding:10px 0 10px 32px;position:relative;font-size:15px;line-height:1.6;color:#666}
.excluded-list li:before{content:'\\2717';position:absolute;left:0;color:#dc3545;font-weight:900;font-size:20px}
.highlight-box{background:#e7f5ff;border:3px solid #1565c0;padding:24px;border-radius:10px;margin:32px 0}
.warning-box{background:#fff3cd;border:3px solid #ffc107;padding:24px;border-radius:10px;margin:32px 0}
.success-box{background:#d4edda;border:3px solid #28a745;padding:24px;border-radius:10px;margin:32px 0}
.sig-section{margin-top:70px;padding-top:40px;border-top:4px solid #2c5530}
.sig-line{border-bottom:2px solid #333;margin:50px 0 12px;min-height:60px}
.phase-box{background:#fff;border-left:6px solid #1565c0;padding:20px;margin:20px 0;border-radius:6px;box-shadow:0 2px 4px rgba(0,0,0,0.08)}
.phase-title{font-weight:700;color:#1565c0;font-size:18px;margin-bottom:12px}
table{width:100%;border-collapse:collapse;margin:20px 0;background:#fff;border-radius:8px;overflow:hidden}
th{background:#2c5530;color:#fff;padding:14px;text-align:left;font-weight:700;font-size:15px}
td{padding:12px 14px;border-bottom:1px solid #dee2e6;font-size:14px}
tr:last-child td{border-bottom:none}
.page-break{page-break-after:always}
@media print{body{padding:20px;font-size:12px}.page-break{page-break-after:always}}
</style></head><body>

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
    <div style="font-size:18px;font-weight:700;margin-bottom:8px">${customer.firstName} ${customer.lastName}</div>
    <div style="font-size:14px;color:#555;margin-bottom:4px">Phone: ${formatPhone(customer.phone)}</div>
    <div style="font-size:14px;color:#555">Email: ${customer.email}</div>
  </div>
  <div class="info-box">
    <div class="info-label">Project Location</div>
    <div style="font-size:15px;margin-bottom:4px">${customer.siteAddress}</div>
    <div style="font-size:15px">${customer.siteCity}, ${customer.siteState} ${customer.siteZip}</div>
  </div>
</div>

<div class="highlight-box">
  <div style="font-weight:800;font-size:20px;color:#1565c0;margin-bottom:12px">Project Description</div>
  <div style="font-size:17px;margin-bottom:8px">
    <strong>Installation of ${quote.singleDouble === 'double' ? 'Double-Wide' : 'Single-Wide'} Modular Home</strong>
    ${quote.homeModel !== 'NONE' ? ` - Model: <strong>${quote.homeModel}</strong>` : ''}
  </div>
  <div style="font-size:15px;color:#555;margin-top:12px">
    <strong>Home Dimensions:</strong> ${quote.houseWidth} feet wide × ${quote.houseLength} feet long<br>
    <strong>Foundation Type:</strong> ${foundation.name}
  </div>
</div>

<div class="success-box">
  <div style="font-weight:700;font-size:18px;margin-bottom:12px;color:#28a745">Project Objectives</div>
  <ul style="margin:0;padding-left:20px;line-height:1.8">
    <li>Deliver and install a turn-key modular home at the specified location</li>
    <li>Construct a code-compliant foundation to manufacturer specifications</li>
    <li>Complete all selected services to meet or exceed industry standards</li>
    <li>Ensure site safety and minimize disruption during construction</li>
    <li>Coordinate all inspections and obtain required approvals</li>
    <li>Provide customer with a completed, move-in ready home</li>
  </ul>
</div>

<!-- SECTION 2: ROLES & RESPONSIBILITIES -->
<div class="section-title">2. Roles & Responsibilities</div>

<table>
  <thead>
    <tr>
      <th style="width:30%">Party</th>
      <th>Responsibilities</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="font-weight:700;color:#2c5530">SHERMAN</td>
      <td>
        &bull;Provide all labor, materials, and equipment for contracted work<br>
        &bull;Coordinate with home manufacturer for delivery schedule<br>
        &bull;Ensure all work meets local building codes and manufacturer specs<br>
        &bull;Manage subcontractors and ensure quality workmanship<br>
        &bull;Coordinate inspections with local authorities<br>
        &bull;Communicate progress and any issues to customer promptly<br>
        &bull;Clean work site upon completion
      </td>
    </tr>
    <tr>
      <td style="font-weight:700;color:#2c5530">Customer</td>
      <td>
        &bull;Provide clear, legal access to work site for all vehicles and equipment<br>
        &bull;Obtain necessary permits (unless included in contract)<br>
        &bull;Ensure utilities are available at property line prior to installation<br>
        &bull;Remove any obstacles that would interfere with construction<br>
        &bull;Make timely payments per contract terms<br>
        &bull;Communicate any concerns or questions promptly<br>
        &bull;Be available for walkthroughs and sign-offs<br>
        &bull;Provide adequate space for material storage during construction
      </td>
    </tr>
    <tr>
      <td style="font-weight:700;color:#2c5530">Home Manufacturer</td>
      <td>
        &bull;Manufacture home to specifications and quality standards<br>
        &bull;Deliver home sections to site on agreed schedule<br>
        &bull;Provide installation instructions and specifications<br>
        &bull;Honor manufacturer's warranty on home components<br>
        &bull;Provide technical support during installation if needed
      </td>
    </tr>
  </tbody>
</table>

<!-- SECTION 3: DETAILED WORK BREAKDOWN -->
<div class="section-title page-break">3. Work Breakdown & Specifications</div>

<div class="phase-box">
  <div class="phase-title">Phase 1: Site Preparation & Foundation</div>
  <div style="font-size:14px;color:#666;margin-top:4px">Duration: 3-7 days depending on weather and site conditions</div>
</div>

<div class="service-box">
  <div class="service-name">${foundation.name}</div>
  <div style="font-size:14px;color:#666;margin-bottom:20px">${foundation.description}</div>

  <div class="specs-box">
    <div class="specs-title">Technical Specifications:</div>
    <ul style="margin:8px 0;padding-left:20px;font-size:14px;line-height:1.7">
      ${foundation.specifications.map(spec => `<li>${spec}</li>`).join('')}
    </ul>
  </div>

  <div class="subsection-title">Work Included in This Phase</div>
  <ul class="included-list">
    ${foundation.workIncluded.map(item => `<li>${item}</li>`).join('')}
  </ul>

  <div class="subsection-title">Work NOT Included (Additional Cost if Needed)</div>
  <ul class="excluded-list">
    ${foundation.excluded.map(item => `<li>${item}</li>`).join('')}
  </ul>
</div>

<div class="phase-box">
  <div class="phase-title">Phase 2: Home Delivery & Set</div>
  <div style="font-size:14px;color:#666;margin-top:4px">Duration: 1-2 days for delivery and crane set</div>
</div>

<div class="service-box">
  <div class="service-name">Modular Home Delivery</div>
  <div style="font-size:14px;color:#666;margin-bottom:20px">Factory-built home sections transported to site and prepared for installation</div>

  <div class="subsection-title">What's Included</div>
  <ul class="included-list">
    <li>Factory construction of home per manufacturer specifications</li>
    <li>All factory-installed features, finishes, and appliances</li>
    <li>Transport of home sections from factory to site</li>
    <li>Delivery on agreed date (weather permitting)</li>
    <li>Basic delivery route preparation coordination</li>
    <li>Manufacturer's structural warranty documentation</li>
  </ul>

  <div class="subsection-title">What's NOT Included</div>
  <ul class="excluded-list">
    <li>Site preparation (covered in Phase 1)</li>
    <li>Foundation construction (covered in Phase 1)</li>
    <li>Utility connections beyond what's factory-installed</li>
    <li>Permit fees (unless specifically contracted)</li>
    <li>Oversize load permits (included in delivery cost)</li>
    <li>Custom modifications not in original factory order</li>
  </ul>
</div>

${selectedServices.filter(s => s.key === 'installation_of_home').length > 0 ? `
<div class="phase-box">
  <div class="phase-title">Phase 3: Home Installation & Finishing</div>
  <div style="font-size:14px;color:#666;margin-top:4px">Duration: 3-7 days depending on home size and weather</div>
</div>

<div class="service-box">
  <div class="service-name">Professional Home Installation</div>
  <div style="font-size:14px;color:#666;margin-bottom:20px">Complete installation of home sections including marriage wall, roof connection, and weatherproofing</div>

  <div class="subsection-title">Installation Work Included</div>
  <ul class="included-list">
    <li><strong>Crane Service:</strong> Professional crane operation to lift and set home sections on foundation</li>
    <li><strong>Alignment & Leveling:</strong> Precise positioning and leveling of all home sections</li>
    <li><strong>Marriage Wall Construction:</strong> Complete marriage wall framing, insulation, and sealing</li>
    <li><strong>Roof Connection:</strong> Roof sections joined, shingled over seam, and fully weatherproofed</li>
    <li><strong>Exterior Completion:</strong> All exterior trim, siding seams, and weatherproofing completed</li>
    <li><strong>Door & Window Check:</strong> Verify all doors and windows operate properly after set</li>
    <li><strong>Utility Connections:</strong> Connect plumbing, electrical, and HVAC systems at marriage wall</li>
    <li><strong>Final Walkthrough:</strong> Complete inspection with customer, address any concerns</li>
    <li><strong>Inspection Coordination:</strong> Schedule and coordinate final building inspections</li>
  </ul>

  <div class="subsection-title">Installation Limitations & Exclusions</div>
  <ul class="excluded-list">
    <li>Foundation repairs or modifications after home is set</li>
    <li>Structural changes to home layout or design</li>
    <li>Custom modifications not part of original factory order</li>
    <li>Repairs to any pre-existing damage from transport</li>
    <li>Interior finishing beyond what's factory-installed</li>
    <li>Additional windows, doors, or openings</li>
  </ul>
</div>
` : ''}

${selectedServices.filter(s => !['installation_of_home'].includes(s.key)).length > 0 ? `
<div class="phase-box">
  <div class="phase-title">Phase ${selectedServices.filter(s => s.key === 'installation_of_home').length > 0 ? '4' : '3'}: Additional Services & Site Completion</div>
  <div style="font-size:14px;color:#666;margin-top:4px">Services performed as needed throughout or after main installation</div>
</div>

${selectedServices.filter(s => !['installation_of_home'].includes(s.key)).map(service => `
<div class="service-box">
  <div class="service-name">${service.name}</div>
  <div style="font-size:14px;color:#666;margin-top:8px">Service will be completed per industry standards and local code requirements</div>
</div>
`).join('')}
` : ''}

<!-- SECTION 4: SITE REQUIREMENTS & CONDITIONS -->
<div class="section-title page-break">4. Site Requirements & Customer Obligations</div>

<div class="warning-box">
  <div style="font-weight:700;font-size:18px;margin-bottom:12px;color:#856404">Site Access & Preparation Requirements</div>
  <ul style="margin:0;padding-left:20px;line-height:1.9;font-size:15px">
    <li><strong>Access Road:</strong> Must accommodate semi-truck with 65'+ trailer and 85-ton crane</li>
    <li><strong>Turning Radius:</strong> Minimum 45-foot turning radius for delivery vehicles</li>
    <li><strong>Overhead Clearance:</strong> Minimum 16 feet clearance (power lines, tree branches, etc.)</li>
    <li><strong>Foundation Ready:</strong> Foundation must be complete, cured, and inspected before delivery date</li>
    <li><strong>Utilities:</strong> Electric, water, and sewer/septic available at property line</li>
    <li><strong>Site Clearing:</strong> Work area clear of vehicles, equipment, debris, and obstacles</li>
    <li><strong>Staging Area:</strong> Minimum 50' x 100' clear area near home site for crane setup</li>
    <li><strong>Weather Dependent:</strong> Installation cannot proceed in high winds, rain, or icy conditions</li>
  </ul>
</div>

<!-- SECTION 5: PROJECT EXCLUSIONS -->
<div class="section-title">5. General Exclusions</div>

<div class="service-box">
  <div style="font-size:16px;margin-bottom:20px;font-weight:600;color:#495057">
    Unless specifically listed in this scope of work as included, the following items are <strong>NOT</strong> part of this contract:
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
    <div>
      <div style="font-weight:700;color:#2c5530;margin-bottom:12px;font-size:16px">Site & Exterior</div>
      <ul class="excluded-list">
        <li>Landscaping, seeding, or sod installation</li>
        <li>Decorative grading or site beautification</li>
        <li>Driveway paving or surfacing beyond gravel (if selected)</li>
        <li>Fencing or property line work</li>
        <li>Tree removal (unless obstructing work)</li>
        <li>Retaining walls or extensive grading</li>
        <li>Outdoor structures (sheds, garages, decks)</li>
        <li>Mailbox installation</li>
      </ul>
    </div>
    <div>
      <div style="font-weight:700;color:#2c5530;margin-bottom:12px;font-size:16px">Interior & Finish Work</div>
      <ul class="excluded-list">
        <li>Interior painting or wall finishes</li>
        <li>Flooring beyond factory-installed</li>
        <li>Cabinet or countertop upgrades</li>
        <li>Appliance installation beyond factory</li>
        <li>Window treatments (blinds, curtains)</li>
        <li>Light fixture upgrades</li>
        <li>Furniture or decorations</li>
        <li>Custom carpentry or built-ins</li>
      </ul>
    </div>
  </div>

  <div style="margin-top:24px">
    <div style="font-weight:700;color:#2c5530;margin-bottom:12px;font-size:16px">Utilities & Systems</div>
    <ul class="excluded-list">
      <li>Well drilling or septic system installation (unless contracted separately)</li>
      <li>Utility company connection fees and meter installation</li>
      <li>Electrical service upgrade at pole or transformer</li>
      <li>HVAC system installation (unless contracted separately)</li>
      <li>Interior plumbing beyond factory-installed fixtures</li>
      <li>Water softener or filtration systems</li>
      <li>Security or camera systems</li>
      <li>Smart home technology installation</li>
    </ul>
  </div>
</div>

<!-- SECTION 6: CHANGE ORDERS & MODIFICATIONS -->
<div class="section-title">6. Change Orders & Project Modifications</div>

<div class="highlight-box">
  <div style="font-weight:700;font-size:18px;margin-bottom:12px;color:#1565c0">Change Order Process</div>
  <p style="margin:12px 0;line-height:1.8;font-size:15px">
    Any modifications, additions, or deletions to this Scope of Work must be documented in writing through a formal Change Order.
    No verbal agreements will be honored. All Change Orders must include:
  </p>
  <ul style="margin:12px 0;padding-left:20px;line-height:1.8;font-size:15px">
    <li>Detailed description of the work to be added, removed, or modified</li>
    <li>Cost impact (additional charges or credits)</li>
    <li>Schedule impact (if any)</li>
    <li>Signatures from both SHERMAN and Customer</li>
    <li>Change Order number and date</li>
  </ul>
  <p style="margin:16px 0 0;line-height:1.8;font-size:15px;font-weight:600">
    Change Orders may result in adjustments to project timeline and cost. Work will not proceed on changes until signed Change Order is received.
  </p>
</div>

<!-- SECTION 7: ASSUMPTIONS & CONDITIONS -->
<div class="section-title">7. Project Assumptions & Conditions</div>

<div class="service-box">
  <div style="font-weight:700;font-size:17px;margin-bottom:16px;color:#2c5530">This Scope of Work is Based on the Following Assumptions:</div>

  <table>
    <thead>
      <tr>
        <th>Assumption Category</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-weight:700">Site Conditions</td>
        <td>Normal soil conditions, adequate drainage, no rock or unsuitable soil, water table below foundation depth</td>
      </tr>
      <tr>
        <td style="font-weight:700">Access</td>
        <td>Clear, unrestricted access for all delivery and construction vehicles during normal business hours</td>
      </tr>
      <tr>
        <td style="font-weight:700">Utilities</td>
        <td>Electric, water, and sewer/septic available at property line; utility connections within 100 feet of home</td>
      </tr>
      <tr>
        <td style="font-weight:700">Permits</td>
        <td>All necessary permits can be obtained; no zoning restrictions or variance requirements unknown at time of quote</td>
      </tr>
      <tr>
        <td style="font-weight:700">Weather</td>
        <td>Typical weather conditions for the season; work may be delayed by extreme weather</td>
      </tr>
      <tr>
        <td style="font-weight:700">Schedule</td>
        <td>Home manufacturer delivers on agreed date; materials and subcontractors available as scheduled</td>
      </tr>
      <tr>
        <td style="font-weight:700">Existing Structures</td>
        <td>No demolition or removal of existing buildings required (unless specifically quoted)</td>
      </tr>
    </tbody>
  </table>

  <div class="warning-box" style="margin-top:24px">
    <div style="font-weight:700;font-size:16px;margin-bottom:8px">Important Note About Unforeseen Conditions:</div>
    <p style="margin:0;font-size:14px;line-height:1.7">
      If unforeseen site conditions are discovered (rock, poor soil, high water table, underground utilities, etc.), work may need to be stopped
      until the condition is addressed. Additional costs for dealing with unforeseen conditions will be documented in a Change Order and approved
      by the customer before work proceeds.
    </p>
  </div>
</div>

<!-- SECTION 8: ACKNOWLEDGMENT -->
<div class="sig-section">
  <div style="font-size:24px;font-weight:800;color:#2c5530;margin-bottom:24px">Acknowledgment & Agreement</div>

  <p style="margin-bottom:20px;font-size:15px;line-height:1.8">
    By signing below, both parties acknowledge that they have read, understood, and agree to the scope of work as outlined in this document.
    This Scope of Work is an integral part of <strong>Quote #${quoteNum}</strong> and should be reviewed in conjunction with all contract documents including:
  </p>

  <ul style="margin:20px 0;padding-left:24px;line-height:1.9;font-size:15px">
    <li>Full itemized quote with pricing</li>
    <li>Payment schedule and terms</li>
    <li>Warranty information</li>
    <li>Home manufacturer specifications</li>
    <li>Any addendums or Change Orders</li>
  </ul>

  <p style="margin:24px 0;font-size:15px;line-height:1.8;font-weight:600">
    Both parties understand that work not specifically included in this Scope of Work is not part of the contracted services and will require
    a separate agreement or Change Order if requested.
  </p>

  <div style="margin-top:50px">
    <div style="font-weight:700;margin-bottom:12px;font-size:16px">Customer Signature:</div>
    <div class="sig-line"></div>
    <div style="display:flex;justify-content:space-between;font-size:14px;color:#666">
      <span><strong>Print Name:</strong> ${customer.firstName} ${customer.lastName}</span>
      <span><strong>Date:</strong> _______________</span>
    </div>
  </div>

  <div style="margin-top:60px">
    <div style="font-weight:700;margin-bottom:12px;font-size:16px">SHERMAN Representative:</div>
    <div class="sig-line"></div>
    <div style="display:flex;justify-content:space-between;font-size:14px;color:#666">
      <span><strong>Print Name:</strong> _______________</span>
      <span><strong>Date:</strong> _______________</span>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div style="margin-top:80px;padding:28px;background:linear-gradient(135deg,#2c5530 0%,#1a3320 100%);color:#fff;border-radius:10px;text-align:center">
  <div style="font-size:22px;font-weight:800;margin-bottom:8px">SHERMAN</div>
  <div style="font-size:15px;margin-bottom:12px">Professional Modular Home Installation & Foundation Services</div>
  <div style="font-size:14px;margin-bottom:4px">2244 Highway 65, Mora, MN 55051</div>
  <div style="font-size:14px;margin-bottom:4px">Phone: (320) 679-3438</div>
  <div style="font-size:12px;margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.3);font-style:italic">
    This Scope of Work document is valid for 30 days from ${today}
  </div>
</div>

</body></html>`;
};
