import { ALLOWANCE_ITEMS, SUMMARY_SERVICES, HOME_OPTIONS, LICENSED_SERVICES, DEFAULT_SERVICES, fmt, formatPhone, DocumentUtils } from './shared.js';

export const generateQuoteHtml = (quote, totals, homeModels) => {
  const services = [];
  const homeSpecAdditions = [];
  const selectedHome = homeModels?.find(m => m.name === quote.homeModel);
  const floorPlanUrl = selectedHome?.floorPlanUrl || '';

  // Get allowance costs from totals
  const allowancesWithCosts = [];

  // Badge HTML helpers
  const licenseBadge = '<span style="display:inline-block;font-size:9px;background:#e3f2fd;color:#1565c0;padding:1px 5px;border-radius:3px;margin-left:6px;font-weight:600">MN LICENSE REQ.</span>';
  const allowanceBadge = '<span style="display:inline-block;font-size:9px;background:#fff3cd;color:#856404;padding:1px 5px;border-radius:3px;margin-left:6px;font-weight:600">ALLOWANCE</span>';

  Object.entries(quote.selectedServices || {}).forEach(([k, sel]) => {
    if (sel && DEFAULT_SERVICES[k]) {
      const name = DEFAULT_SERVICES[k].name;
      if (ALLOWANCE_ITEMS.includes(k)) {
        const cost = totals.svc.find(s => s.key === k)?.cost || 0;
        allowancesWithCosts.push({ name, key: k, cost });
      } else if (HOME_OPTIONS.includes(k)) {
        homeSpecAdditions.push(name);
      } else {
        services.push({ name, key: k });
      }
    }
  });

  if (quote.sewerType && quote.sewerType !== 'none') {
    const cost = totals.svc.find(s => s.key === 'sewer')?.cost || 0;
    allowancesWithCosts.push({ name: `Sewer System (${quote.sewerType.replace('_', ' ')})`, key: 'sewer', cost });
  }
  if (parseFloat(quote.wellDepth) > 0) {
    const cost = totals.svc.find(s => s.key === 'well')?.cost || 0;
    allowancesWithCosts.push({ name: `Well Drilling (${quote.wellDepth} ft)`, key: 'well', cost });
  }
  if (quote.patioSize && quote.patioSize !== 'none') services.push({ name: `Patio (${quote.patioSize} ft)`, key: 'patio' });
  (quote.customServices || []).forEach(cs => { if (cs.name) services.push({ name: cs.name, key: 'custom' }); });
  (quote.customOptions || []).forEach((co, i) => { if (co.name && co.price) { const qty = parseFloat(co.quantity) || 1; services.push({ name: qty > 1 ? `${co.name} (×${qty})` : co.name, key: `customopt_${i}` }); } });

  // Group services like the quote summary: Install Services vs Professional Services
  const sortByLicense = (a, b) => {
    const aLic = LICENSED_SERVICES.includes(a.key) ? 0 : 1;
    const bLic = LICENSED_SERVICES.includes(b.key) ? 0 : 1;
    return aLic - bLic;
  };
  const installServices = services.filter(s => SUMMARY_SERVICES.includes(s.key)).sort(sortByLicense);
  const professionalServices = services.filter(s => !SUMMARY_SERVICES.includes(s.key)).sort(sortByLicense);
  allowancesWithCosts.sort(sortByLicense);

  const renderServiceItem = (s) => {
    let badges = '';
    if (LICENSED_SERVICES.includes(s.key)) badges += licenseBadge;
    if (ALLOWANCE_ITEMS.includes(s.key)) badges += allowanceBadge;
    return `<li>${s.name}${badges}</li>`;
  };

  const totalAllowances = allowancesWithCosts.reduce((sum, a) => sum + a.cost, 0);

  const today = DocumentUtils.formatDate();
  
  return `<!DOCTYPE html><html><head><title>Quote - ${quote.customerFirstName} ${quote.customerLastName}</title>
<style>
${DocumentUtils.getBaseStyles('850px')}
.total{font-size:24px;font-weight:700;color:#2c5530;text-align:center;padding:18px;background:#e8f5e9;border-radius:8px;border:2px solid #2c5530}
.allowance-box{background:#fff9e6;padding:15px;border-radius:8px;border:2px solid #ffc107;margin-bottom:20px}
.allowance-table{width:100%;border-collapse:collapse;margin-top:10px}
.allowance-table td{padding:8px;border-bottom:1px solid #ddd}
.allowance-table td:first-child{font-weight:600}
.allowance-table td:last-child{text-align:right;font-weight:700;color:#856404}
.contingency-box{background:#e3f2fd;padding:18px;border-radius:8px;border:2px solid #1565c0;margin:20px 0}
.contingency-title{font-size:20px;font-weight:700;color:#1565c0;margin-bottom:10px;display:flex;justify-content:space-between}
.investment-total{font-size:32px;font-weight:800;color:#2c5530;text-align:center;padding:24px;background:#e8f5e9;border-radius:8px;border:3px solid #2c5530;margin-top:20px}
</style></head><body>
<div class="header"><img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" style="height:50px"><div style="float:right;text-align:right;font-size:13px;color:#666">Quote #${DocumentUtils.getQuoteNum(quote)}<br>${today}</div></div>
<div class="section"><div class="section-title">Customer</div><strong>${quote.customerFirstName} ${quote.customerLastName}</strong><br>${formatPhone(quote.phone)} | ${quote.email}<br>${quote.siteAddress}, ${quote.siteCity}, ${quote.siteState} ${quote.siteZip}</div>
${quote.homeModel && quote.homeModel !== 'NONE' ? `<div class="section"><div class="section-title">Home</div><strong>${quote.homeModel}</strong><br>${quote.houseWidth}' × ${quote.houseLength}' ${quote.singleDouble} Wide</div>` : ''}
${floorPlanUrl ? `<div class="section"><div class="section-title">Floor Plan</div><p><a href="${floorPlanUrl}" target="_blank" style="color:#1565c0">View Floor Plan on Clayton Homes Website</a></p></div>` : ''}
${installServices.length > 0 ? `<div class="section"><div class="section-title">Home Installation Services</div><ul>${installServices.map(renderServiceItem).join('')}</ul></div>` : ''}
${professionalServices.length > 0 ? `<div class="section"><div class="section-title">Professional Services</div><ul>${professionalServices.map(renderServiceItem).join('')}</ul></div>` : ''}
${homeSpecAdditions.length > 0 ? `<div class="section"><div class="section-title">Home Spec Additions</div><ul>${homeSpecAdditions.map(s => `<li>${s}</li>`).join('')}</ul></div>` : ''}
<div class="total">Total Project Price: ${fmt(totals.total)}</div>
${allowancesWithCosts.length > 0 ? `
<div class="allowance-box">
  <div style="font-size:20px;font-weight:700;color:#856404;margin-bottom:12px;border-bottom:2px solid #ffc107;padding-bottom:10px">Allowances & Contingency Fund</div>
  <p style="font-size:13px;color:#856404;margin:0 0 12px 0;line-height:1.5"><strong>What are allowances?</strong> These are estimated costs based on 49 years of experience. Actual costs may vary depending on site conditions. Any savings or overages are tracked in your Running Balance below.</p>

  <div style="font-size:15px;font-weight:600;color:#856404;margin:12px 0 8px 0">Allowance Items:</div>
  <table class="allowance-table">
    ${allowancesWithCosts.map(a => `<tr><td>${a.name}${LICENSED_SERVICES.includes(a.key) ? licenseBadge : ''}${allowanceBadge}</td><td>${fmt(a.cost)}</td></tr>`).join('')}
    <tr style="border-top:2px solid #ffc107"><td style="font-weight:700">Total Allowances</td><td style="font-weight:700">${fmt(totalAllowances)}</td></tr>
  </table>

  <div style="margin-top:16px;padding:12px;background:#e3f2fd;border-radius:6px;border-left:4px solid #1565c0">
    <div style="display:flex;justify-content:space-between;margin-bottom:8px">
      <span style="font-weight:600;color:#1565c0">Contingency Fund</span>
      <span style="font-weight:700;color:#1565c0">${fmt(totals.contingency)}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding-top:8px;border-top:2px solid #1565c0">
      <span style="font-size:16px;font-weight:700;color:#1565c0">Running Balance (Allowances + Contingency)</span>
      <span style="font-size:16px;font-weight:700;color:#1565c0">${fmt(totalAllowances + totals.contingency)}</span>
    </div>
  </div>

  <p style="font-size:12px;color:#666;margin:12px 0 0 0;line-height:1.5">This running balance is your project protection fund. If allowances come in under budget, savings are added here. If they exceed estimates or you make change orders, funds are drawn from here first. At project completion, any remaining balance is returned to you.</p>
</div>
` : `
<div class="contingency-box">
  <div style="display:flex;justify-content:space-between;margin-bottom:8px">
    <span style="font-weight:600;color:#1565c0">Contingency Fund</span>
    <span style="font-weight:700;color:#1565c0">${fmt(totals.contingency)}</span>
  </div>
  <p style="font-size:13px;color:#666;line-height:1.6;margin:0">A dedicated fund for change orders and project adjustments. At project completion, any unused contingency is returned to you.</p>
</div>
`}
<div class="investment-total">Total Investment: ${fmt(totals.totalWithContingency)}</div>
<div style="margin-top:30px;padding:15px;background:#fff9e6;border-radius:8px;font-size:13px"><strong>Terms:</strong> Quote valid 30 days. 50% deposit required. Balance due upon completion.</div>
</body></html>`;
};
