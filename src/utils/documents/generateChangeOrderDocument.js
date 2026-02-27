import { fmt, formatPhone, DocumentUtils } from './shared.js';

export const generateChangeOrderDocument = (changeOrder, originalQuote, customer, changeOrderTotals, originalTotals, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, deletions = [], adjustments = {}, additions = []) => {
  const today = DocumentUtils.formatDate();

  // Build changes from tracked data
  const changes = {
    modified: [],
    added: [],
    removed: []
  };

  // Process deleted services - use actual costs from original quote totals
  deletions.forEach(serviceKey => {
    const service = services[serviceKey];
    if (!service) return;

    // Get the actual cost from the original quote's calculated totals
    const serviceInTotals = originalTotals.svc.find(s => s.key === serviceKey);
    const cost = serviceInTotals?.cost || 0;

    changes.removed.push({ name: service.name, cost, key: serviceKey });
  });

  // Process adjustments (modifications)
  Object.keys(adjustments).forEach(key => {
    const adjustment = adjustments[key];
    if (!adjustment || adjustment.amount === 0) return;

    if (key === 'home_base_price') {
      const originalCost = (parseFloat(originalQuote.homeBasePrice) || 0) * 1.2;
      const newCost = originalCost + adjustment.amount;
      changes.modified.push({
        name: 'Home Base Price',
        oldCost: originalCost,
        newCost: newCost,
        diff: adjustment.amount,
        key: key
      });
    } else {
      const service = services[key];
      if (!service) return;

      // Get the actual cost from the original quote's calculated totals
      const serviceInTotals = originalTotals.svc.find(s => s.key === key);
      const originalCost = serviceInTotals?.cost || 0;

      const newCost = originalCost + adjustment.amount;
      changes.modified.push({
        name: service.name,
        oldCost: originalCost,
        newCost: newCost,
        diff: adjustment.amount,
        key: key
      });
    }
  });

  // Process added services - use costs from change order totals (these are new services)
  additions.forEach(serviceKey => {
    const service = services[serviceKey];
    if (!service) return;

    // Get the cost from the change order totals (since this is a new service)
    const serviceInTotals = changeOrderTotals.svc.find(s => s.key === serviceKey);
    const cost = serviceInTotals?.cost || 0;

    changes.added.push({ name: service.name, cost, key: serviceKey });
  });

  // Calculate total change
  const deletedTotal = changes.removed.reduce((sum, item) => sum + item.cost, 0);
  const adjustmentTotal = changes.modified.reduce((sum, item) => sum + item.diff, 0);
  const addedTotal = changes.added.reduce((sum, item) => sum + item.cost, 0);
  const totalChange = addedTotal + adjustmentTotal - deletedTotal;
  const contingencyAvailable = originalTotals.contingency;
  const contingencyApplied = Math.min(Math.abs(totalChange), contingencyAvailable);
  const customerCost = totalChange > 0 ? Math.max(0, totalChange - contingencyApplied) : 0;

  return `<!DOCTYPE html><html><head><title>Change Order #${changeOrder.changeOrderNum}${changeOrder.changeOrderVersion || ''} - ${customer.firstName} ${customer.lastName}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:40px;max-width:900px;margin:0 auto;color:#333;line-height:1.6}
.header{border-bottom:4px solid #ffc107;padding-bottom:20px;margin-bottom:30px;display:flex;justify-content:space-between;align-items:flex-start}
.co-title{font-size:32px;font-weight:800;color:#ffc107;margin:0}
.co-number{font-size:48px;font-weight:900;color:#ffc107}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px}
.info-box{background:#f8f9fa;padding:15px;border-radius:8px}
.section-title{font-size:20px;font-weight:700;color:#2c5530;margin:30px 0 15px;border-bottom:2px solid #2c5530;padding-bottom:8px}
.change-item{display:flex;justify-content:space-between;padding:12px;margin:8px 0;border-radius:6px}
.change-added{background:#d1e7dd;border-left:4px solid #28a745}
.change-modified{background:#cfe2ff;border-left:4px solid #0d6efd}
.change-removed{background:#f8d7da;border-left:4px solid #dc3545}
.financial{background:#e3f2fd;padding:20px;border-radius:8px;border:2px solid #1565c0;margin:30px 0}
.financial-row{display:flex;justify-content:space-between;padding:8px 0;font-size:16px}
.financial-total{font-size:24px;font-weight:800;border-top:3px solid #1565c0;margin-top:12px;padding-top:12px}
.signature-box{margin-top:40px;border:2px solid #333;padding:20px;border-radius:8px}
.sig-line{border-bottom:2px solid #333;margin:30px 0 10px;min-height:40px}
.warning{background:#fff3cd;border:2px solid #ffc107;padding:15px;border-radius:8px;margin:20px 0}
</style></head><body>

<div class="header">
  <div>
    <div class="co-title">CHANGE ORDER</div>
    <div class="co-number">#${changeOrder.changeOrderNum}${changeOrder.changeOrderVersion || ''}</div>
  </div>
  <div style="text-align:right">
    <div style="font-size:18px;font-weight:700;color:#2c5530">Sherman Pole Buildings</div>
    <div style="font-size:13px;color:#666">${today}</div>
    <div style="font-size:13px;color:#666">Quote #${DocumentUtils.getQuoteNum(originalQuote)}</div>
  </div>
</div>

<div class="info-grid">
  <div class="info-box">
    <div style="font-weight:700;margin-bottom:8px">Customer</div>
    <div>${customer.firstName} ${customer.lastName}</div>
    <div style="font-size:13px;color:#666">${formatPhone(customer.phone)}</div>
    <div style="font-size:13px;color:#666">${customer.email}</div>
  </div>
  <div class="info-box">
    <div style="font-weight:700;margin-bottom:8px">Project Address</div>
    <div>${customer.siteAddress}</div>
    <div>${customer.siteCity}, ${customer.siteState} ${customer.siteZip}</div>
  </div>
</div>

<div class="warning">
  <strong>IMPORTANT:</strong> This change order modifies the original accepted quote. All changes must be approved and signed by the customer before work proceeds.
</div>

<div class="section-title">ORIGINAL QUOTE TOTAL</div>
<div style="font-size:24px;font-weight:700;color:#2c5530;padding:15px;background:#e8f5e9;border-radius:8px">
  ${fmt(originalTotals.totalWithContingency)}
  <div style="font-size:13px;font-weight:400;color:#666;margin-top:4px">Contingency Fund Available: ${fmt(contingencyAvailable)}</div>
</div>

<div class="section-title">CHANGES MADE</div>

${changes.added.length > 0 ? `
<div style="margin-bottom:20px">
  <div style="font-weight:700;color:#28a745;margin-bottom:8px">ADDED SERVICES</div>
  ${changes.added.map(item => `
    <div class="change-item change-added">
      <span><strong>${item.name}</strong></span>
      <span style="font-weight:700;color:#28a745">+${fmt(item.cost)}</span>
    </div>
  `).join('')}
</div>
` : ''}

${changes.modified.length > 0 ? `
<div style="margin-bottom:20px">
  <div style="font-weight:700;color:#0d6efd;margin-bottom:8px">MODIFIED SERVICES</div>
  ${changes.modified.map(item => `
    <div class="change-item change-modified">
      <div>
        <strong>${item.name}</strong>
        <div style="font-size:13px;color:#666">Original: ${fmt(item.oldCost)} → New: ${fmt(item.newCost)}</div>
      </div>
      <span style="font-weight:700;color:${item.diff > 0 ? '#0d6efd' : '#28a745'}">${item.diff > 0 ? '+' : ''}${fmt(item.diff)}</span>
    </div>
  `).join('')}
</div>
` : ''}

${changes.removed.length > 0 ? `
<div style="margin-bottom:20px">
  <div style="font-weight:700;color:#dc3545;margin-bottom:8px">REMOVED SERVICES</div>
  ${changes.removed.map(item => `
    <div class="change-item change-removed">
      <span><strong>${item.name}</strong></span>
      <span style="font-weight:700;color:#dc3545">-${fmt(item.cost)}</span>
    </div>
  `).join('')}
</div>
` : ''}

${changes.added.length === 0 && changes.modified.length === 0 && changes.removed.length === 0 ? '<p style="color:#666;font-style:italic">No service changes detected.</p>' : ''}

<div class="section-title">FINANCIAL SUMMARY</div>
<div class="financial">
  <div class="financial-row">
    <span>Original Total:</span>
    <span style="font-weight:700">${fmt(originalTotals.totalWithContingency)}</span>
  </div>
  <div class="financial-row">
    <span>Change Order Adjustments:</span>
    <span style="font-weight:700;color:${totalChange >= 0 ? '#dc3545' : '#28a745'}">${totalChange >= 0 ? '+' : ''}${fmt(totalChange)}</span>
  </div>
  <div class="financial-row">
    <span>Contingency Fund Applied:</span>
    <span style="font-weight:700;color:#1565c0">-${fmt(contingencyApplied)}</span>
  </div>
  <div class="financial-row financial-total">
    <span>New Total:</span>
    <span style="color:#2c5530">${fmt(changeOrderTotals.totalWithContingency)}</span>
  </div>
  <div class="financial-row" style="border-top:2px solid #1565c0;margin-top:12px;padding-top:12px">
    <span style="font-size:20px;font-weight:800">Customer Additional Cost:</span>
    <span style="font-size:20px;font-weight:800;color:${customerCost > 0 ? '#dc3545' : '#28a745'}">${fmt(customerCost)}</span>
  </div>
  <div style="font-size:13px;color:#666;margin-top:12px;font-style:italic">
    ${contingencyApplied > 0 ? `${fmt(contingencyApplied)} paid from contingency fund` : ''}
    ${contingencyApplied < contingencyAvailable ? ` | Remaining contingency: ${fmt(contingencyAvailable - contingencyApplied)}` : ''}
    ${contingencyApplied >= contingencyAvailable ? ' | Contingency fund fully utilized' : ''}
  </div>
</div>

<div class="section-title">APPROVAL & SIGNATURES</div>
<div class="signature-box">
  <p style="margin-bottom:20px"><strong>By signing below, all parties agree to the changes outlined in this Change Order.</strong></p>

  <div style="margin-bottom:40px">
    <div style="font-weight:700;margin-bottom:8px">Customer Signature:</div>
    <div class="sig-line"></div>
    <div style="display:flex;justify-content:space-between;font-size:13px;color:#666">
      <span>Print Name: ${customer.firstName} ${customer.lastName}</span>
      <span>Date: _______________</span>
    </div>
  </div>

  <div>
    <div style="font-weight:700;margin-bottom:8px">Sherman Pole Buildings Representative:</div>
    <div class="sig-line"></div>
    <div style="display:flex;justify-content:space-between;font-size:13px;color:#666">
      <span>Print Name: _______________</span>
      <span>Date: _______________</span>
    </div>
  </div>
</div>

<div style="margin-top:40px;padding:20px;background:#f8f9fa;border-radius:8px;font-size:12px;color:#666">
  <p style="margin-bottom:8px"><strong>Terms & Conditions:</strong></p>
  <ul style="margin-left:20px">
    <li>This change order is valid for 30 days from the date above</li>
    <li>Work will not proceed until this change order is signed by the customer</li>
    <li>Payment for additional costs is due before work begins on the changes</li>
    <li>All other terms of the original contract remain in effect</li>
  </ul>
</div>

</body></html>`;
};
