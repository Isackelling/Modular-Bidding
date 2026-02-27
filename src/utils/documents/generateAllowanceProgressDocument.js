import { ALLOWANCE_ITEMS, fmt, formatPhone, DocumentUtils } from './shared.js';

export const generateAllowanceProgressDocument = (quote, customer, totals, services) => {
  const today = DocumentUtils.formatDate();
  const quoteNum = DocumentUtils.getQuoteNum(quote);

  // Get all allowance items from the quote
  const allowanceItems = Object.entries(quote.selectedServices || {})
    .filter(([key, selected]) => selected && ALLOWANCE_ITEMS.includes(key))
    .map(([key]) => {
      const service = services[key];
      const contractPrice = totals.svc.find(s => s.key === key)?.cost || 0;
      const actualCost = quote.scrubbCosts?.[key] || 0;
      const variance = actualCost > 0 ? contractPrice - actualCost : 0;
      const status = actualCost === 0 ? 'Pending' : variance > 0 ? 'Under Budget' : variance < 0 ? 'Over Budget' : 'On Budget';

      return {
        key,
        name: service?.name || key,
        contractPrice,
        actualCost,
        variance,
        status,
        hasActual: actualCost > 0
      };
    });

  // Calculate totals
  const totalEstimated = allowanceItems.reduce((sum, item) => sum + item.contractPrice, 0);
  const totalActual = allowanceItems.reduce((sum, item) => sum + item.actualCost, 0);
  const completedItems = allowanceItems.filter(item => item.hasActual).length;
  const totalItems = allowanceItems.length;

  // Contingency fund calculations — must match Scrubb tab (App.jsx) and CustomerPortal.jsx
  // Use CO history to reconstruct original starting contingency (before COs inflated the total)
  const coHistory = quote.changeOrderHistory || [];
  const startingContingency = coHistory.length > 0
    ? (coHistory[0].contingencyUsed || 0) + (coHistory[0].contingencyBalance || 0)
    : totals.contingency;

  // CO draws: total amount drawn from contingency for change orders
  const totalCODraws = coHistory.reduce((sum, co) => sum + (co.contingencyUsed || 0), 0);

  const allowanceSavings = allowanceItems.filter(item => item.variance > 0).reduce((sum, item) => sum + item.variance, 0);
  const allowanceOverages = allowanceItems.filter(item => item.variance < 0).reduce((sum, item) => sum + Math.abs(item.variance), 0);

  // Customer contingency payments REFILL the fund (add back)
  const allPayments = quote.scrubbPayments || [];
  const contingencyPaymentsTotal = allPayments.filter(p => p.isContingencyPayment).reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  const currentBalance = startingContingency - totalCODraws + allowanceSavings - allowanceOverages + contingencyPaymentsTotal;

  return `<!DOCTYPE html><html><head><title>Allowance Progress Update - ${customer.firstName} ${customer.lastName}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:40px;max-width:900px;margin:0 auto;color:#333;line-height:1.6}
.header{border-bottom:4px solid #1565c0;padding-bottom:20px;margin-bottom:30px;display:flex;justify-content:space-between;align-items:flex-start}
.title{font-size:32px;font-weight:800;color:#1565c0;margin:0}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px}
.info-box{background:#f8f9fa;padding:15px;border-radius:8px}
.progress-bar{background:#e0e0e0;height:30px;border-radius:15px;overflow:hidden;margin:20px 0}
.progress-fill{background:linear-gradient(90deg,#1565c0,#42a5f5);height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px}
.section-title{font-size:20px;font-weight:700;color:#2c5530;margin:30px 0 15px;border-bottom:2px solid#2c5530;padding-bottom:8px}
.allowance-table{width:100%;border-collapse:collapse;margin:20px 0}
.allowance-table th{background:#2c5530;color:#fff;padding:12px;text-align:left;font-size:13px}
.allowance-table td{padding:12px;border-bottom:1px solid #e0e0e0;font-size:14px}
.status-badge{padding:4px 12px;border-radius:12px;font-size:11px;font-weight:700;text-transform:uppercase}
.status-pending{background:#e0e0e0;color:#666}
.status-under{background:#d1e7dd;color:#0a5a2a}
.status-over{background:#f8d7da;color:#721c24}
.status-on{background:#cfe2ff;color:#084298}
.fund-box{background:#e3f2fd;padding:20px;border-radius:8px;border:2px solid #1565c0;margin:20px 0}
.fund-row{display:flex;justify-content:space-between;padding:8px 0;font-size:16px}
.fund-total{font-size:24px;font-weight:800;border-top:3px solid #1565c0;margin-top:12px;padding-top:12px}
</style></head><body>

<div class="header">
  <div>
    <div class="title">Allowance Progress Update</div>
    <div style="font-size:16px;color:#666;margin-top:8px">Quote #${quoteNum}</div>
  </div>
  <div style="text-align:right">
    <div style="font-size:18px;font-weight:700;color:#2c5530">SHERMAN</div>
    <div style="font-size:13px;color:#666">${today}</div>
  </div>
</div>

<div class="info-grid">
  <div class="info-box">
    <div style="font-weight:700;margin-bottom:8px">Customer</div>
    <div>${customer.firstName} ${customer.lastName}</div>
    <div style="font-size:13px;color:#666">${formatPhone(customer.phone)}</div>
  </div>
  <div class="info-box">
    <div style="font-weight:700;margin-bottom:8px">Project Address</div>
    <div>${customer.siteAddress}</div>
    <div>${customer.siteCity}, ${customer.siteState} ${customer.siteZip}</div>
  </div>
</div>

<div class="section-title">Project Progress</div>
<div style="background:#fff;padding:20px;border-radius:8px;border:1px solid #e0e0e0">
  <div style="display:flex;justify-content:space-between;margin-bottom:12px">
    <span style="font-size:14px;color:#666">Allowance Items Completed</span>
    <span style="font-size:18px;font-weight:700;color:#1565c0">${completedItems} of ${totalItems}</span>
  </div>
  <div class="progress-bar">
    <div class="progress-fill" style="width:${totalItems > 0 ? (completedItems / totalItems * 100).toFixed(0) : 0}%">
      ${totalItems > 0 ? (completedItems / totalItems * 100).toFixed(0) : 0}%
    </div>
  </div>
</div>

<div class="section-title">Allowance Items Detail</div>
<table class="allowance-table">
  <thead>
    <tr>
      <th>Item</th>
      <th style="text-align:right">Estimated</th>
      <th style="text-align:right">Actual</th>
      <th style="text-align:right">Difference</th>
      <th style="text-align:center">Status</th>
    </tr>
  </thead>
  <tbody>
    ${allowanceItems.map(item => `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td style="text-align:right">${fmt(item.contractPrice)}</td>
        <td style="text-align:right">${item.hasActual ? fmt(item.actualCost) : '<em style="color:#999">Pending</em>'}</td>
        <td style="text-align:right;font-weight:700;color:${item.variance > 0 ? '#28a745' : item.variance < 0 ? '#dc3545' : '#666'}">
          ${item.hasActual ? (item.variance >= 0 ? '+' : '') + fmt(item.variance) : '--'}
        </td>
        <td style="text-align:center">
          <span class="status-badge ${item.status === 'Pending' ? 'status-pending' : item.status === 'Under Budget' ? 'status-under' : item.status === 'Over Budget' ? 'status-over' : 'status-on'}">
            ${item.status}
          </span>
        </td>
      </tr>
    `).join('')}
    <tr style="background:#f8f9fa">
      <td><strong>TOTAL</strong></td>
      <td style="text-align:right;font-weight:700">${fmt(totalEstimated)}</td>
      <td style="text-align:right;font-weight:700">${fmt(totalActual)}</td>
      <td style="text-align:right;font-weight:800;font-size:16px;color:${allowanceSavings - allowanceOverages >= 0 ? '#28a745' : '#dc3545'}">
        ${allowanceSavings - allowanceOverages >= 0 ? '+' : ''}${fmt(allowanceSavings - allowanceOverages)}
      </td>
      <td></td>
    </tr>
  </tbody>
</table>

<div class="section-title">Contingency Fund Status</div>
<div class="fund-box">
  <div class="fund-row">
    <span>Starting Contingency Fund:</span>
    <span style="font-weight:700">${fmt(startingContingency)}</span>
  </div>
  ${totalCODraws > 0 ? `<div class="fund-row">
    <span>Change Order Draws:</span>
    <span style="font-weight:700;color:#dc3545">-${fmt(totalCODraws)}</span>
  </div>` : ''}
  <div class="fund-row">
    <span>Allowance Savings (added to fund):</span>
    <span style="font-weight:700;color:#28a745">+${fmt(allowanceSavings)}</span>
  </div>
  <div class="fund-row">
    <span>Allowance Overages (drawn from fund):</span>
    <span style="font-weight:700;color:#dc3545">-${fmt(allowanceOverages)}</span>
  </div>
  ${contingencyPaymentsTotal > 0 ? `<div class="fund-row">
    <span>Customer Payments (refunding fund):</span>
    <span style="font-weight:700;color:#28a745">+${fmt(contingencyPaymentsTotal)}</span>
  </div>` : ''}
  <div class="fund-row fund-total">
    <span>Current Contingency Balance:</span>
    <span style="color:${currentBalance > 0 ? '#28a745' : '#dc3545'}">${fmt(currentBalance)}</span>
  </div>
</div>

${(() => {
  const payments = quote.scrubbPayments || [];
  if (payments.length === 0) return '';

  const contingencyPayments = payments.filter(p => p.isContingencyPayment);
  const regularPayments = payments.filter(p => !p.isContingencyPayment);
  const totalContingency = contingencyPayments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
  const totalRegular = regularPayments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
  const totalAll = totalContingency + totalRegular;

  return `
<div class="section-title">Payment Breakdown</div>
<div style="background:#fff;padding:20px;border-radius:8px;border:1px solid #e0e0e0;margin:20px 0">
  <table style="width:100%;border-collapse:collapse">
    <thead>
      <tr style="background:#f8f9fa">
        <th style="padding:12px;text-align:left;border-bottom:2px solid #e0e0e0">Date</th>
        <th style="padding:12px;text-align:left;border-bottom:2px solid #e0e0e0">Type</th>
        <th style="padding:12px;text-align:right;border-bottom:2px solid #e0e0e0">Amount</th>
        <th style="padding:12px;text-align:left;border-bottom:2px solid #e0e0e0">Notes</th>
      </tr>
    </thead>
    <tbody>
      ${payments.sort((a, b) => new Date(a.date) - new Date(b.date)).map(payment => {
        const paymentDate = payment.date ? new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';
        const isContingency = payment.isContingencyPayment;
        const typeLabel = isContingency ? 'Contingency Fund' : 'Regular Payment';
        const typeColor = isContingency ? '#ff9800' : '#1565c0';

        return `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #e0e0e0">${paymentDate}</td>
          <td style="padding:12px;border-bottom:1px solid #e0e0e0">
            <span style="background:${isContingency ? '#fff3e0' : '#e3f2fd'};color:${typeColor};padding:4px 8px;border-radius:4px;font-size:11px;font-weight:700">
              ${typeLabel}
            </span>
          </td>
          <td style="padding:12px;border-bottom:1px solid #e0e0e0;text-align:right;font-weight:700">${fmt(payment.amount)}</td>
          <td style="padding:12px;border-bottom:1px solid #e0e0e0;font-size:13px;color:#666">${payment.notes || '--'}</td>
        </tr>
        `;
      }).join('')}
    </tbody>
    <tfoot>
      <tr style="background:#f8f9fa;font-weight:700">
        <td colspan="2" style="padding:12px;border-top:2px solid #e0e0e0">TOTAL PAYMENTS</td>
        <td style="padding:12px;border-top:2px solid #e0e0e0;text-align:right;font-size:18px;color:#1565c0">${fmt(totalAll)}</td>
        <td style="padding:12px;border-top:2px solid #e0e0e0"></td>
      </tr>
    </tfoot>
  </table>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:20px">
    <div style="background:#e3f2fd;padding:15px;border-radius:6px">
      <div style="font-size:12px;color:#666;margin-bottom:4px">Regular Payments</div>
      <div style="font-size:20px;font-weight:700;color:#1565c0">${fmt(totalRegular)}</div>
      <div style="font-size:11px;color:#666;margin-top:4px">${regularPayments.length} payment${regularPayments.length !== 1 ? 's' : ''}</div>
    </div>
    <div style="background:#fff3e0;padding:15px;border-radius:6px">
      <div style="font-size:12px;color:#666;margin-bottom:4px">Contingency Fund Payments</div>
      <div style="font-size:20px;font-weight:700;color:#ff9800">${fmt(totalContingency)}</div>
      <div style="font-size:11px;color:#666;margin-top:4px">${contingencyPayments.length} payment${contingencyPayments.length !== 1 ? 's' : ''}</div>
    </div>
  </div>

  ${currentBalance < 0 ? `
  <div style="background:#fff3cd;border:1px solid #ffc107;padding:12px;border-radius:6px;margin-top:15px">
    <div style="font-size:13px;font-weight:700;color:#856404;margin-bottom:8px">💰 Contingency Fund Balance After Payments</div>
    <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:4px">
      <span>Amount Exceeded:</span>
      <span style="font-weight:700;color:#dc3545">${fmt(Math.max(0, allowanceOverages - (startingContingency + allowanceSavings)))}</span>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:4px">
      <span>Contingency Payments Applied:</span>
      <span style="font-weight:700;color:#28a745">-${fmt(totalContingency)}</span>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;padding-top:8px;border-top:2px solid #ffc107;margin-top:8px">
      <span>Remaining Balance Owed:</span>
      <span style="color:${(Math.max(0, allowanceOverages - (startingContingency + allowanceSavings)) - totalContingency) > 0 ? '#dc3545' : '#28a745'}">
        ${fmt(Math.max(0, Math.max(0, allowanceOverages - (startingContingency + allowanceSavings)) - totalContingency))}
      </span>
    </div>
  </div>
  ` : ''}
</div>
`;
})()}

<div style="background:#fff3cd;border:2px solid #ffc107;padding:15px;border-radius:8px;margin:20px 0">
  <strong>What This Means:</strong>
  <ul style="margin:8px 0 0 20px;line-height:1.8">
    <li>Items marked "Under Budget" save money that goes into your contingency fund</li>
    <li>Items marked "Over Budget" draw from your contingency fund first</li>
    <li>The contingency fund protects you from unexpected costs</li>
    <li>At project completion, any remaining contingency balance is returned to you</li>
  </ul>
</div>

<div style="margin-top:40px;padding:20px;background:#f8f9fa;border-radius:8px;font-size:12px;color:#666">
  <p style="margin-bottom:8px"><strong>Questions or Concerns?</strong></p>
  <p style="margin:0">Please contact SHERMAN at (320) 679-3438 if you have any questions about this update or your project's progress.</p>
</div>

</body></html>`;
};
