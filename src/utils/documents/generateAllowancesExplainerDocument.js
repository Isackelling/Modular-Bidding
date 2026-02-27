import { ALLOWANCE_ITEMS, fmt, DocumentUtils, COMPANY, collectOtherServices } from './shared.js';

export const generateAllowancesExplainerDocument = (quote, customer, totals, services) => {
  const today = DocumentUtils.formatDate();
  const quoteNum = DocumentUtils.getQuoteNum(quote);

  // Get allowance items from selectedServices
  const allowanceItems = [];

  Object.entries(quote.selectedServices || {}).forEach(([key, selected]) => {
    if (selected && ALLOWANCE_ITEMS.includes(key)) {
      const service = services[key];
      const cost = totals.svc.find(s => s.key === key)?.cost || 0;
      allowanceItems.push({
        name: service?.name || key,
        estimatedCost: cost,
        description: service?.allowanceDescription || 'Cost may vary based on site conditions and actual work required.'
      });
    }
  });

  // Add sewer/well from collectOtherServices
  const sewerWellDescriptions = {
    sewer: 'Final cost depends on distance to connection point, soil conditions, and inspection requirements.',
    well: 'Actual depth and cost will be determined by driller based on water table and geological conditions.',
  };
  collectOtherServices(quote, totals)
    .filter(o => o.key === 'sewer' || o.key === 'well')
    .forEach(o => {
      allowanceItems.push({
        name: o.key === 'well' ? `Well Drilling (${quote.wellDepth} ft estimated)` : o.nameWithDetail,
        estimatedCost: o.cost,
        description: sewerWellDescriptions[o.key],
      });
    });

  const totalAllowances = allowanceItems.reduce((sum, item) => sum + item.estimatedCost, 0);
  const contingency = totals.contingency || 0;

  return `<!DOCTYPE html><html><head><title>Allowances & Contingency Explained - ${customer.firstName} ${customer.lastName}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:40px;max-width:900px;margin:0 auto;color:#333;line-height:1.7}
.header{background:linear-gradient(135deg,#f8f9fa 0%,#e9ecef 100%);padding:30px;border-radius:8px;margin-bottom:40px;border-bottom:5px solid #ffc107}
.title{font-size:36px;font-weight:900;color:#2c5530;margin:0}
.subtitle{font-size:18px;color:#666;margin-top:8px}
.section{margin-bottom:40px}
.section-title{font-size:24px;font-weight:700;color:#2c5530;margin-bottom:16px;border-bottom:3px solid #2c5530;padding-bottom:10px}
.info-box{background:#fff3cd;border:3px solid #ffc107;padding:24px;border-radius:10px;margin:20px 0}
.success-box{background:#d4edda;border:3px solid #28a745;padding:24px;border-radius:10px;margin:20px 0}
.highlight-box{background:#e7f5ff;border:3px solid #1565c0;padding:24px;border-radius:10px;margin:20px 0}
.allowance-card{background:#fff;border:2px solid #dee2e6;border-radius:8px;padding:20px;margin-bottom:16px;box-shadow:0 2px 4px rgba(0,0,0,0.05)}
.allowance-name{font-size:18px;font-weight:700;color:#2c5530;margin-bottom:8px}
.allowance-cost{font-size:20px;font-weight:800;color:#ffc107;margin-bottom:12px}
.allowance-desc{font-size:14px;color:#666;line-height:1.6}
.total-box{background:#2c5530;color:#fff;padding:24px;border-radius:8px;text-align:center;margin:30px 0}
.total-label{font-size:16px;opacity:0.9;margin-bottom:8px}
.total-amount{font-size:32px;font-weight:900}
ul{line-height:1.9}
.contact-box{background:#f8f9fa;padding:20px;border-radius:8px;margin-top:40px;text-align:center}
</style></head><body>

<div class="header">
  <div class="title">Understanding Your Quote</div>
  <div class="subtitle">Allowances & Contingency Fund Explained</div>
  <div style="margin-top:16px;font-size:14px;color:#666;display:flex;justify-content:space-between">
    <span><strong>Quote #:</strong> ${quoteNum}</span>
    <span><strong>Date:</strong> ${today}</span>
  </div>
</div>

<div class="section">
  <div class="section-title">What Are Allowances?</div>
  <p style="font-size:16px;margin-bottom:16px">
    <strong>Allowances are estimated costs</strong> for services where the final price cannot be determined until the work is actually performed.
    These items depend on site-specific conditions that we can only know once we begin work on your property.
  </p>

  <div class="info-box">
    <div style="font-weight:700;font-size:18px;margin-bottom:12px;color:#856404">📋 Important to Know:</div>
    <ul style="margin:0;padding-left:24px">
      <li><strong>Estimates Based on Experience:</strong> Our allowance amounts are based on typical costs for similar projects in your area</li>
      <li><strong>Could Be Higher or Lower:</strong> The actual cost may be more or less than estimated, depending on what we find</li>
      <li><strong>You'll Know Before We Proceed:</strong> We'll provide actual quotes from subcontractors before starting any allowance work</li>
      <li><strong>Transparency Throughout:</strong> You'll receive updates and documentation as these costs are finalized</li>
    </ul>
  </div>
</div>

${allowanceItems.length > 0 ? `
<div class="section">
  <div class="section-title">Allowance Items in Your Quote</div>
  <p style="margin-bottom:24px;font-size:15px;color:#666">
    The following items in your quote are allowances. Estimated costs are shown below:
  </p>

  ${allowanceItems.map(item => `
    <div class="allowance-card">
      <div class="allowance-name">${item.name}</div>
      <div class="allowance-cost">Estimated: ${fmt(item.estimatedCost)}</div>
      <div class="allowance-desc">💡 ${item.description}</div>
    </div>
  `).join('')}

  <div class="total-box">
    <div class="total-label">Total Estimated Allowances</div>
    <div class="total-amount">${fmt(totalAllowances)}</div>
  </div>
</div>
` : ''}

${contingency > 0 ? `
<div class="section">
  <div class="section-title">Your Contingency Fund</div>

  <div class="success-box">
    <div style="font-weight:700;font-size:22px;margin-bottom:16px;color:#28a745">🛡️ Built-In Protection: ${fmt(contingency)}</div>
    <p style="margin:0;font-size:16px">
      Your quote includes a contingency fund to protect you from unexpected cost increases. This fund acts as a financial buffer
      for your project and provides peace of mind.
    </p>
  </div>

  <div style="background:#fff;border:2px solid #dee2e6;border-radius:8px;padding:24px;margin-top:24px">
    <div style="font-weight:700;font-size:18px;margin-bottom:16px;color:#2c5530">How the Contingency Fund Works:</div>
    <ul style="margin:0;padding-left:24px">
      <li><strong>Covers Overruns:</strong> If an allowance item costs more than estimated, we use contingency funds first</li>
      <li><strong>Captures Savings:</strong> If an allowance item costs less than estimated, the savings increase your contingency</li>
      <li><strong>Your Safety Net:</strong> Protects you from having to pay extra if we encounter unexpected site conditions</li>
      <li><strong>Returned to You:</strong> At project completion, any unused contingency funds are credited back to you</li>
    </ul>
  </div>
</div>
` : ''}

<div class="section">
  <div class="section-title">Real-World Examples</div>

  <div class="highlight-box">
    <div style="font-weight:700;font-size:18px;margin-bottom:16px;color:#1565c0">📖 Example Scenario:</div>
    <div style="background:#fff;padding:16px;border-radius:6px;margin:12px 0">
      <div style="font-weight:600;margin-bottom:8px">Well Drilling (Estimated: $12,000)</div>
      <p style="margin:0 0 12px;color:#666">
        We estimate 200 feet based on neighboring wells. The driller finds good water at 180 feet.
      </p>
      <div style="padding:12px;background:#d4edda;border-radius:4px;border-left:4px solid #28a745">
        <strong style="color:#28a745">✓ Result:</strong> Final cost is $10,800. You save $1,200 which goes into your contingency fund!
      </div>
    </div>

    <div style="background:#fff;padding:16px;border-radius:6px;margin:12px 0">
      <div style="font-weight:600;margin-bottom:8px">Sewer Connection (Estimated: $8,500)</div>
      <p style="margin:0 0 12px;color:#666">
        We estimated 150 feet of line. Connection point is actually 180 feet, requiring more pipe and labor.
      </p>
      <div style="padding:12px;background:#fff3cd;border-radius:4px;border-left:4px solid #ffc107">
        <strong style="color:#856404">⚠ Result:</strong> Final cost is $9,800. The $1,300 increase is covered by your contingency fund - you don't pay extra.
      </div>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">What Happens During Your Project</div>

  <div style="background:#fff;border:2px solid #dee2e6;border-radius:8px;padding:24px">
    <ol style="margin:0;padding-left:24px;font-size:16px;line-height:2">
      <li><strong>Before Work Begins:</strong> We'll get actual quotes from subcontractors for allowance items</li>
      <li><strong>We Review Together:</strong> You'll see the actual costs before we authorize any work</li>
      <li><strong>Work is Completed:</strong> Subcontractors perform the work to code and specification</li>
      <li><strong>Documentation:</strong> You receive receipts, invoices, and lien waivers for all completed work</li>
      <li><strong>Final Reconciliation:</strong> At project end, we review all allowances and contingency usage</li>
      <li><strong>Refund Issued:</strong> Any unused contingency funds are returned to you</li>
    </ol>
  </div>
</div>

<div class="section">
  <div class="section-title">Your Rights & Protections</div>

  <div class="success-box">
    <ul style="margin:0;padding-left:24px;font-size:15px">
      <li><strong>No Surprises:</strong> You approve actual costs before work begins on any allowance item</li>
      <li><strong>Full Documentation:</strong> You receive all receipts, contracts, and proof of payment</li>
      <li><strong>Contingency Transparency:</strong> You can track how contingency funds are used throughout the project</li>
      <li><strong>Right to Choose:</strong> If an allowance quote exceeds budget, we discuss alternatives together</li>
      <li><strong>Final Accounting:</strong> Complete reconciliation of all allowances and contingency at project completion</li>
    </ul>
  </div>
</div>

<div class="contact-box">
  <div style="font-weight:700;font-size:20px;margin-bottom:12px;color:#2c5530">Questions? We're Here to Help</div>
  <p style="margin:0 0 16px;font-size:15px;color:#666">
    We understand that allowances and contingencies can seem complex. We're happy to discuss any questions or concerns you have about your quote.
  </p>
  <div style="font-size:18px;font-weight:700;color:#2c5530;margin-bottom:8px">${COMPANY.name}</div>
  <div style="font-size:16px">📞 ${COMPANY.phone}</div>
  <div style="font-size:14px;color:#666;margin-top:4px">${COMPANY.address}</div>
</div>

</body></html>`;
};

