import { ALLOWANCE_ITEMS, PIER_SPECS, HOME_OPTIONS, DEFAULT_SERVICES, DEFAULT_MATERIALS, DEFAULT_SEWER, DEFAULT_PATIO, DEFAULT_FOUNDATION, DRIVE_RATE_INSTALL, DRIVE_RATE_SERVICE, DRIVE_RATE_PC, DRIVE_RATE_INSPECTION, MIN_MILES } from '../constants/index.js';
import { calcIBeam, fmt } from './helpers.js';
import { calcTotals } from './calculations.js';
import { DocumentUtils } from './DocumentUtils.js';

const fmtCurrency = fmt;


// ============================================================================
// generateQuoteHtml
// ============================================================================
export const generateQuoteHtml = (quote, totals, homeModels) => {
  const services = [];
  const homeSpecAdditions = [];
  const allowances = [];
  const selectedHome = homeModels?.find(m => m.name === quote.homeModel);
  const floorPlanUrl = selectedHome?.floorPlanUrl || '';

  // Get allowance costs from totals
  const allowancesWithCosts = [];

  Object.entries(quote.selectedServices || {}).forEach(([k, sel]) => {
    if (sel && DEFAULT_SERVICES[k]) {
      const name = DEFAULT_SERVICES[k].name;
      if (ALLOWANCE_ITEMS.includes(k)) {
        const cost = totals.svc.find(s => s.key === k)?.cost || 0;
        allowancesWithCosts.push({ name, key: k, cost });
      } else if (HOME_OPTIONS.includes(k)) {
        homeSpecAdditions.push(name);
      } else {
        services.push(name);
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
  if (quote.patioSize && quote.patioSize !== 'none') services.push(`Patio (${quote.patioSize} ft)`);
  (quote.customServices || []).forEach(cs => { if (cs.name) services.push(cs.name); });

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
<div class="section"><div class="section-title">Customer</div><strong>${quote.customerFirstName} ${quote.customerLastName}</strong><br>${quote.phone} | ${quote.email}<br>${quote.siteAddress}, ${quote.siteCity}, ${quote.siteState} ${quote.siteZip}</div>
${quote.homeModel && quote.homeModel !== 'NONE' ? `<div class="section"><div class="section-title">Home</div><strong>${quote.homeModel}</strong><br>${quote.houseWidth}' × ${quote.houseLength}' ${quote.singleDouble} Wide</div>` : ''}
${floorPlanUrl ? `<div class="section"><div class="section-title">Floor Plan</div><p><a href="${floorPlanUrl}" target="_blank" style="color:#1565c0">View Floor Plan on Clayton Homes Website</a></p></div>` : ''}
${services.length > 0 ? `<div class="section"><div class="section-title">Professional Services</div><ul>${services.map(s => `<li>${s}</li>`).join('')}</ul></div>` : ''}
${homeSpecAdditions.length > 0 ? `<div class="section"><div class="section-title">Home Spec Additions</div><ul>${homeSpecAdditions.map(s => `<li>${s}</li>`).join('')}</ul></div>` : ''}
<div class="total">Total Project Price: ${fmt(totals.total)}</div>
${allowancesWithCosts.length > 0 ? `
<div class="allowance-box">
  <div style="font-size:20px;font-weight:700;color:#856404;margin-bottom:12px;border-bottom:2px solid #ffc107;padding-bottom:10px">Allowances & Contingency Fund</div>
  <p style="font-size:13px;color:#856404;margin:0 0 12px 0;line-height:1.5"><strong>What are allowances?</strong> These are estimated costs based on 49 years of experience. Actual costs may vary depending on site conditions. Any savings or overages are tracked in your Running Balance below.</p>

  <div style="font-size:15px;font-weight:600;color:#856404;margin:12px 0 8px 0">Allowance Items:</div>
  <table class="allowance-table">
    ${allowancesWithCosts.map(a => `<tr><td>${a.name}</td><td>${fmt(a.cost)}</td></tr>`).join('')}
    <tr style="border-top:2px solid #ffc107"><td style="font-weight:700">Total Allowances</td><td style="font-weight:700">${fmt(totalAllowances)}</td></tr>
  </table>

  <div style="margin-top:16px;padding:12px;background:#e3f2fd;border-radius:6px;border-left:4px solid #1565c0">
    <div style="display:flex;justify-content:space-between;margin-bottom:8px">
      <span style="font-weight:600;color:#1565c0">2% Contingency Fund</span>
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
    <span style="font-weight:600;color:#1565c0">2% Contingency Fund</span>
    <span style="font-weight:700;color:#1565c0">${fmt(totals.contingency)}</span>
  </div>
  <p style="font-size:13px;color:#666;line-height:1.6;margin:0">A dedicated fund for change orders and project adjustments. At project completion, any unused contingency is returned to you.</p>
</div>
`}
<div class="investment-total">Total Investment: ${fmt(totals.totalWithContingency)}</div>
<div style="margin-top:30px;padding:15px;background:#fff9e6;border-radius:8px;font-size:13px"><strong>Terms:</strong> Quote valid 30 days. 50% deposit required. Balance due upon completion.</div>
</body></html>`;
};

// ============================================================================
// generatePierDiagramHtml
// ============================================================================
export const generatePierDiagramHtml = (quote, customer) => {
  const w = parseFloat(quote.houseWidth) || 28;
  const l = parseFloat(quote.houseLength) || 56;
  const isSingle = quote.singleDouble === 'Single' || w <= 16;
  const iBeam = quote.iBeamHeight || calcIBeam(l);
  const pierSize = iBeam >= 11 ? 20 : 22;
  const boltHeight = 1;
  const totalHeight = pierSize + iBeam + boltHeight;

  const cantilever = PIER_SPECS.CANTILEVER;
  const frameLength = l - (cantilever * 2);

  // Pier spacing: use constants for consistency
  const outerSpacing = PIER_SPECS.SPACING.OUTER_BEAMS;
  const marriageSpacing = PIER_SPECS.SPACING.MARRIAGE_LINE;
  
  const numOuterPiers = Math.ceil(frameLength / outerSpacing) + 1;
  const actualOuterSpacing = frameLength / (numOuterPiers - 1);
  const numMarriagePiers = !isSingle ? Math.ceil(frameLength / marriageSpacing) + 1 : 0;
  const actualMarriageSpacing = !isSingle ? frameLength / (numMarriagePiers - 1) : 0;
  
  const scale = 7;
  const marginL = 80, marginT = 90;
  const svgW = l * scale + marginL + 60;
  const svgH = w * scale + marginT + 100;
  
  const houseX = marginL;
  const houseY = marginT;
  const frameX = marginL + cantilever * scale;
  
  // Generate pier positions
  const outerTopPiers = [];
  const outerBotPiers = [];
  const marriagePiers = [];
  
  for (let i = 0; i < numOuterPiers; i++) {
    const dist = i * actualOuterSpacing;
    const x = frameX + dist * scale;
    outerTopPiers.push({ x, dist: cantilever + dist });
    outerBotPiers.push({ x, dist: cantilever + dist });
  }
  
  if (!isSingle) {
    for (let i = 0; i < numMarriagePiers; i++) {
      const dist = i * actualMarriageSpacing;
      marriagePiers.push({ x: frameX + dist * scale, dist: cantilever + dist });
    }
  }
  
  const totalPiers = outerTopPiers.length * 2 + marriagePiers.length;
  
  const fmtDist = (ft) => {
    const feet = Math.floor(ft);
    const inches = Math.round((ft - feet) * 12);
    return `${feet}'-${inches}"`;
  };
  
  // Generate pier squares HTML
  const topPiersHtml = outerTopPiers.map(p => `<rect x="${p.x - 8}" y="${houseY - 8}" width="16" height="16" fill="none" stroke="#333" stroke-width="1.5"/>`).join('');
  const botPiersHtml = outerBotPiers.map(p => `<rect x="${p.x - 8}" y="${houseY + w * scale - 8}" width="16" height="16" fill="none" stroke="#333" stroke-width="1.5"/>`).join('');
  const marriagePiersHtml = marriagePiers.map(p => `<rect x="${p.x - 8}" y="${houseY + (w/2) * scale - 8}" width="16" height="16" fill="none" stroke="#333" stroke-width="1.5"/>`).join('');
  
  // Top dimension ticks
  const topDimTicks = outerTopPiers.map(p => `<line x1="${p.x}" y1="${houseY - 45}" x2="${p.x}" y2="${houseY - 35}" stroke="#333" stroke-width="1"/>`).join('');
  const topDimLabels = outerTopPiers.slice(0, -1).map((p, i) => `<text x="${(p.x + outerTopPiers[i+1].x) / 2}" y="${houseY - 50}" text-anchor="middle" font-size="10">${fmtDist(actualOuterSpacing)}</text>`).join('');
  
  // Cross-section positions
  const csBase = 220;
  const csPierTop = csBase - pierSize * 2.5;
  const csBoltTop = csPierTop - 8;
  const csIBeamBot = csBoltTop - 7;
  const csIBeamTop = csIBeamBot - iBeam * 2.5;
  const csFloorTop = csIBeamTop - 18;
  
  return `<!DOCTYPE html><html><head><title>Pier Layout - ${customer.firstName} ${customer.lastName}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;max-width:1100px;margin:0 auto}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;border-bottom:2px solid #333;padding-bottom:10px}
.info-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:20px}
.info-box{background:#f8f9fa;padding:10px;border-radius:4px;text-align:center;border:1px solid #ddd}
.info-label{font-size:10px;color:#666;text-transform:uppercase}
.info-value{font-size:18px;font-weight:700}
.diagrams{display:grid;grid-template-columns:350px 1fr;gap:20px}
.section-title{font-size:12px;font-weight:600;color:#333;margin:0 0 10px;padding-bottom:5px;border-bottom:1px solid #ddd}
@media print{body{padding:20px}.diagrams{grid-template-columns:1fr}}
</style></head><body>
<div class="header">
  <div><img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" style="height:35px"></div>
  <div style="text-align:right">
    <div style="font-size:18px;font-weight:700">PIER SET</div>
    <div style="font-size:12px;color:#666">${customer.firstName} ${customer.lastName}</div>
  </div>
</div>
<p style="color:#666;margin:0 0 15px;font-size:12px">📍 ${customer.siteAddress}, ${customer.siteCity}, ${customer.siteState} ${customer.siteZip || ''}</p>
<div class="info-grid">
  <div class="info-box"><div class="info-label">Width</div><div class="info-value">${w}'</div></div>
  <div class="info-box"><div class="info-label">Length</div><div class="info-value">${l}'</div></div>
  <div class="info-box"><div class="info-label">I-Beam</div><div class="info-value">${iBeam}"</div></div>
  <div class="info-box"><div class="info-label">Pier Size</div><div class="info-value">${pierSize}"</div></div>
  <div class="info-box"><div class="info-label">Total Height</div><div class="info-value">${totalHeight}"</div></div>
  <div class="info-box"><div class="info-label">Total Piers</div><div class="info-value">${totalPiers}</div></div>
</div>
<div class="diagrams">
  <div>
    <div class="section-title">CROSS-SECTION</div>
    <svg width="100%" viewBox="0 0 350 280" style="background:#fff;border:1px solid #ddd;border-radius:4px">
      <rect x="30" y="235" width="290" height="25" fill="#8B4513"/>
      <text x="175" y="252" text-anchor="middle" font-size="10" fill="#fff">GROUND</text>
      <rect x="100" y="${csBase}" width="150" height="15" fill="#999" stroke="#666" stroke-width="1"/>
      <text x="55" y="${csBase + 10}" text-anchor="end" font-size="9" fill="#666">Pad</text>
      <polygon points="175,${csPierTop} 125,${csBase} 225,${csBase}" fill="#2c5530" stroke="#1a3a1f" stroke-width="2"/>
      <text x="175" y="${csBase - pierSize * 1.1}" text-anchor="middle" font-size="13" fill="#fff" font-weight="bold">${pierSize}"</text>
      <text x="55" y="${csBase - pierSize * 1.1}" text-anchor="end" font-size="9" fill="#2c5530">Pier</text>
      <rect x="167" y="${csBoltTop}" width="16" height="8" fill="#555" stroke="#333" stroke-width="1"/>
      <text x="55" y="${csBoltTop + 6}" text-anchor="end" font-size="8" fill="#666">Bolt (1")</text>
      <rect x="110" y="${csIBeamTop}" width="130" height="8" fill="#8B4513" stroke="#5D3A1A" stroke-width="1"/>
      <rect x="167" y="${csIBeamTop + 8}" width="16" height="${iBeam * 2.5 - 16}" fill="#8B4513" stroke="#5D3A1A" stroke-width="1"/>
      <rect x="110" y="${csIBeamBot - 8}" width="130" height="8" fill="#8B4513" stroke="#5D3A1A" stroke-width="1"/>
      <text x="175" y="${(csIBeamTop + csIBeamBot) / 2}" text-anchor="middle" font-size="11" fill="#fff" font-weight="bold">${iBeam}"</text>
      <text x="55" y="${(csIBeamTop + csIBeamBot) / 2}" text-anchor="end" font-size="9" fill="#8B4513">I-Beam</text>
      <rect x="90" y="${csFloorTop}" width="170" height="16" fill="#DEB887" stroke="#8B4513" stroke-width="1"/>
      <text x="175" y="${csFloorTop + 12}" text-anchor="middle" font-size="9" fill="#333">House Floor</text>
      <line x1="295" y1="${csBase}" x2="295" y2="${csIBeamTop}" stroke="#333" stroke-width="1"/>
      <line x1="290" y1="${csBase}" x2="300" y2="${csBase}" stroke="#333" stroke-width="1"/>
      <line x1="290" y1="${csIBeamTop}" x2="300" y2="${csIBeamTop}" stroke="#333" stroke-width="1"/>
      <text x="310" y="${(csBase + csIBeamTop) / 2 + 4}" text-anchor="start" font-size="14" font-weight="bold">${totalHeight}"</text>
    </svg>
  </div>
  <div>
    <div class="section-title">PLAN VIEW - ${actualOuterSpacing.toFixed(1)}' BEAM SPACING${!isSingle ? `, ${actualMarriageSpacing.toFixed(1)}' MARRIAGE` : ''}</div>
    <svg width="100%" viewBox="0 0 ${svgW} ${svgH}" style="background:#fff;border:1px solid #ddd;border-radius:4px">
      <rect x="${houseX}" y="${houseY}" width="${l * scale}" height="${w * scale}" fill="none" stroke="#333" stroke-width="2"/>
      <line x1="${frameX}" y1="${houseY}" x2="${frameX + frameLength * scale}" y2="${houseY}" stroke="#333" stroke-width="1"/>
      <line x1="${frameX}" y1="${houseY + w * scale}" x2="${frameX + frameLength * scale}" y2="${houseY + w * scale}" stroke="#333" stroke-width="1"/>
      ${!isSingle ? `<line x1="${frameX}" y1="${houseY + (w/2) * scale}" x2="${frameX + frameLength * scale}" y2="${houseY + (w/2) * scale}" stroke="#333" stroke-width="1" stroke-dasharray="5,3"/>` : ''}
      ${topPiersHtml}
      ${botPiersHtml}
      ${marriagePiersHtml}
      <line x1="${houseX}" y1="${houseY - 40}" x2="${houseX + l * scale}" y2="${houseY - 40}" stroke="#333" stroke-width="1"/>
      <line x1="${houseX}" y1="${houseY - 45}" x2="${houseX}" y2="${houseY - 35}" stroke="#333" stroke-width="1"/>
      <line x1="${houseX + l * scale}" y1="${houseY - 45}" x2="${houseX + l * scale}" y2="${houseY - 35}" stroke="#333" stroke-width="1"/>
      ${topDimTicks}
      ${topDimLabels}
      <text x="${houseX + (cantilever * scale) / 2}" y="${houseY - 52}" text-anchor="middle" font-size="9" fill="#666">${cantilever}'-0"</text>
      <text x="${houseX + l * scale - (cantilever * scale) / 2}" y="${houseY - 52}" text-anchor="middle" font-size="9" fill="#666">${cantilever}'-0"</text>
      <text x="${houseX + (l * scale) / 2}" y="${houseY - 65}" text-anchor="middle" font-size="14" font-weight="bold">${l}'-0"</text>
      <line x1="${houseX + l * scale + 20}" y1="${houseY}" x2="${houseX + l * scale + 20}" y2="${houseY + w * scale}" stroke="#333" stroke-width="1"/>
      <line x1="${houseX + l * scale + 15}" y1="${houseY}" x2="${houseX + l * scale + 25}" y2="${houseY}" stroke="#333" stroke-width="1"/>
      <line x1="${houseX + l * scale + 15}" y1="${houseY + w * scale}" x2="${houseX + l * scale + 25}" y2="${houseY + w * scale}" stroke="#333" stroke-width="1"/>
      ${!isSingle ? `<line x1="${houseX + l * scale + 15}" y1="${houseY + (w/2) * scale}" x2="${houseX + l * scale + 25}" y2="${houseY + (w/2) * scale}" stroke="#333" stroke-width="1"/>
      <text x="${houseX + l * scale + 30}" y="${houseY + (w/4) * scale + 4}" text-anchor="start" font-size="10">${w/2}'-0"</text>
      <text x="${houseX + l * scale + 30}" y="${houseY + (3*w/4) * scale + 4}" text-anchor="start" font-size="10">${w/2}'-0"</text>` : `<text x="${houseX + l * scale + 30}" y="${houseY + (w/2) * scale + 4}" text-anchor="start" font-size="12" font-weight="bold">${w}'-0"</text>`}
      <text x="${houseX - 5}" y="${houseY + 4}" text-anchor="end" font-size="9" fill="#666">Top Beam</text>
      ${!isSingle ? `<text x="${houseX - 5}" y="${houseY + (w/2) * scale + 4}" text-anchor="end" font-size="9" fill="#666">Marriage</text>` : ''}
      <text x="${houseX - 5}" y="${houseY + w * scale + 4}" text-anchor="end" font-size="9" fill="#666">Bot Beam</text>
      <text x="${houseX + (l * scale) / 2}" y="${houseY + w * scale + 30}" text-anchor="middle" font-size="11">Outer: ${actualOuterSpacing.toFixed(1)}' o/c (${outerTopPiers.length * 2} piers)${!isSingle ? ` | Marriage: ${actualMarriageSpacing.toFixed(1)}' o/c (${marriagePiers.length} piers)` : ''}</text>
    </svg>
  </div>
</div>
<div style="margin-top:15px;display:flex;gap:20px;font-size:11px;color:#666">
  <div style="display:flex;align-items:center;gap:6px"><div style="width:14px;height:14px;border:1.5px solid #333"></div>Pier Location</div>
  <div style="display:flex;align-items:center;gap:6px"><div style="width:20px;height:2px;background:#333"></div>I-Beam</div>
  <div style="display:flex;align-items:center;gap:6px"><div style="width:20px;border-top:2px dashed #333"></div>Marriage Line</div>
</div>
<p style="text-align:center;margin-top:20px;color:#999;font-size:10px">Generated by Sherman Pole Buildings Bidding System</p>
</body></html>`;
};

// ============================================================================
// generateCustomerQuote
// ============================================================================
export const generateCustomerQuote = (quote, totals, homeModels) => {
  const services = [];
  const homeSpecAdditions = [];
  const allowances = [];

  // Get floor plan URL for this home model
  const selectedHome = homeModels?.find(m => m.name === quote.homeModel);
  const floorPlanUrl = selectedHome?.floorPlanUrl || '';

  // Collect all selected services - separate allowances and home options from fixed services
  Object.entries(quote.selectedServices || {}).forEach(([k, sel]) => {
    if (sel && DEFAULT_SERVICES[k]) {
      const name = DEFAULT_SERVICES[k].name;
      if (ALLOWANCE_ITEMS.includes(k)) {
        allowances.push({ name, key: k });
      } else if (HOME_OPTIONS.includes(k)) {
        homeSpecAdditions.push(name);
      } else {
        services.push(name);
      }
    }
  });
  
  // Sewer, Well are allowances
  if (quote.sewerType && quote.sewerType !== 'none') {
    allowances.push({ name: `Sewer System (${quote.sewerType.replace('_', ' ')})`, key: 'sewer' });
  }
  if (parseFloat(quote.wellDepth) > 0) {
    allowances.push({ name: `Well Drilling (${quote.wellDepth} ft)`, key: 'well' });
  }

  // Patio and custom services are not allowances
  if (quote.patioSize && quote.patioSize !== 'none') services.push(`Patio (${quote.patioSize} ft)`);
  (quote.customServices || []).forEach(cs => { if (cs.name) services.push(cs.name); });

  const today = DocumentUtils.formatDate();
  const validUntil = DocumentUtils.formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Sherman Quote - ${quote.customerFirstName} ${quote.customerLastName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; line-height: 1.6; padding: 40px; max-width: 850px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #2c5530; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 28px; font-weight: bold; color: #2c5530; }
    .logo-sub { font-size: 14px; color: #666; }
    .company-info { text-align: right; font-size: 13px; color: #666; }
    .quote-title { background: #2c5530; color: white; padding: 15px 25px; font-size: 24px; font-weight: bold; margin-bottom: 25px; }
    .quote-meta { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .meta-box { background: #f8f9fa; padding: 15px 20px; border-radius: 8px; flex: 1; margin: 0 10px; }
    .meta-box:first-child { margin-left: 0; }
    .meta-box:last-child { margin-right: 0; }
    .meta-label { font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 5px; }
    .meta-value { font-size: 16px; font-weight: 600; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 18px; font-weight: 600; color: #2c5530; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px; margin-bottom: 15px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .info-item { }
    .info-label { font-size: 12px; color: #666; }
    .info-value { font-size: 15px; font-weight: 500; }
    .services-list { list-style: none; }
    .services-list li { padding: 10px 15px; background: #f8f9fa; margin-bottom: 8px; border-radius: 6px; border-left: 4px solid #2c5530; }
    .home-box { background: linear-gradient(135deg, #2c5530, #1a3a1f); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .home-model { font-size: 20px; font-weight: 600; }
    .home-specs { opacity: 0.9; margin-top: 5px; }
    .total-section { background: #f8f9fa; border: 2px solid #2c5530; border-radius: 8px; padding: 25px; margin-top: 30px; }
    .total-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0; }
    .total-row:last-child { border-bottom: none; }
    .total-row.grand { font-size: 24px; font-weight: 700; color: #2c5530; border-top: 2px solid #2c5530; margin-top: 10px; padding-top: 15px; }
    .terms { margin-top: 40px; padding: 20px; background: #fff9e6; border-radius: 8px; font-size: 13px; }
    .terms-title { font-weight: 600; margin-bottom: 10px; }
    .terms ul { margin-left: 20px; }
    .signature-section { margin-top: 50px; display: grid; grid-template-columns: 1fr 1fr; gap: 50px; }
    .signature-box { border-top: 2px solid #333; padding-top: 10px; }
    .signature-label { font-size: 12px; color: #666; }
    .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e0e0e0; padding-top: 20px; }
    @media print { 
      body { padding: 20px; } 
      .no-print { display: none; }
    }
    .btn-group { position: fixed; top: 20px; right: 20px; display: flex; gap: 10px; }
    .close-btn { background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; }
    .close-btn:hover { background: #5a6268; }
  </style>
</head>
<body>
  <div class="btn-group no-print">
    <button class="close-btn" onclick="window.close()">Close</button>
  </div>

  <script>
    // Functions kept for backward compatibility but not used in UI
    function emailQuote() {
      const customerEmail = '${(quote.email || '').replace(/'/g, "\\'")}';
      const customerName = '${(quote.customerFirstName + ' ' + quote.customerLastName).replace(/'/g, "\\'")}';
      const customerLogin = '${(quote.customerFirstName + quote.customerLastName).toLowerCase().replace(/\\s+/g, '').replace(/'/g, "\\'")}';
      const quoteNum = '${DocumentUtils.getQuoteNum(quote)}';
      const total = '${fmt(totals.total)}';
      const homeModel = '${DocumentUtils.getHomeDesc(quote).replace(/'/g, "\\'")}';

      const subject = encodeURIComponent('Sherman Buildings - Your Project Quote #' + quoteNum);
      const body = encodeURIComponent(
        'Dear ' + customerName + ',\\n\\n' +
        'Thank you for your interest in Sherman Buildings! Please find your project quote details below:\\n\\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n' +
        'QUOTE SUMMARY\\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n' +
        'Quote #: ' + quoteNum + '\\n' +
        'Home: ' + homeModel + '\\n' +
        'Total Contract Price: ' + total + '\\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n' +
        '🔗 VIEW YOUR QUOTE ONLINE\\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n' +
        'Visit our Customer Portal to view your complete quote:\\n' +
        'https://claude.site/artifacts/YOUR_ARTIFACT_ID\\n\\n' +
        'Login with:\\n' +
        '  Username: ' + customerLogin + '\\n' +
        '  Password: mybid\\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n' +
        'This quote is valid for 30 days. A 50% deposit is required to schedule installation.\\n\\n' +
        'If you have any questions, please don\\'t hesitate to reach out:\\n' +
        '📞 (320) 679-3438\\n' +
        '📍 2244 Hwy 65, Mora, MN 55051\\n\\n' +
        'We look forward to working with you!\\n\\n' +
        'Best regards,\\n' +
        'Sherman Pole Buildings\\n' +
        'Quality Erections Since 1976'
      );

      const mailtoLink = 'mailto:' + customerEmail + '?subject=' + subject + '&body=' + body;
      window.location.href = mailtoLink;
    }

    function editQuote() {
      alert('To edit this quote, please use the main application.');
      window.close();
    }
  </script>
  
  <div class="header">
    <div>
      <img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" alt="Sherman Buildings" style="height: 50px; margin-bottom: 8px;" />
      <div class="logo-sub">Manufactured Home Installation</div>
    </div>
    <div class="company-info">
      <strong>Sherman Pole Buildings</strong><br>
      2244 Hwy 65<br>
      Mora, MN 55051<br>
      (320) 679-3438
    </div>
  </div>
  
  <div class="quote-title">PROJECT QUOTE</div>
  
  <div class="quote-meta">
    <div class="meta-box">
      <div class="meta-label">Quote Date</div>
      <div class="meta-value">${today}</div>
    </div>
    <div class="meta-box">
      <div class="meta-label">Valid Until</div>
      <div class="meta-value">${validUntil}</div>
    </div>
    <div class="meta-box">
      <div class="meta-label">Quote #</div>
      <div class="meta-value">${DocumentUtils.getQuoteNum(quote)}</div>
    </div>
  </div>
  
  <div class="section">
    <div class="section-title">Customer Information</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Name</div>
        <div class="info-value">${quote.customerFirstName} ${quote.customerLastName}${quote.person2FirstName ? ` & ${quote.person2FirstName} ${quote.person2LastName || ''}` : ''}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Phone</div>
        <div class="info-value">${quote.phone || 'N/A'}${quote.phone2 ? ` / ${quote.phone2}` : ''}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Email</div>
        <div class="info-value">${quote.email || 'N/A'}${quote.email2 ? `<br/>${quote.email2}` : ''}</div>
      </div>
      ${quote.mailingAddress ? `<div class="info-item">
        <div class="info-label">Mailing Address</div>
        <div class="info-value">${quote.mailingAddress}, ${quote.mailingCity}, ${quote.mailingState} ${quote.mailingZip}</div>
      </div>` : ''}
    </div>
  </div>
  
  <div class="section">
    <div class="section-title">Installation Site</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Address</div>
        <div class="info-value">${quote.siteAddress || 'TBD'}</div>
      </div>
      <div class="info-item">
        <div class="info-label">City, State, ZIP</div>
        <div class="info-value">${quote.siteCity || 'TBD'}, ${quote.siteState} ${quote.siteZip || ''}</div>
      </div>
      <div class="info-item">
        <div class="info-label">County</div>
        <div class="info-value">${quote.siteCounty || 'N/A'}</div>
      </div>
    </div>
  </div>
  
  ${quote.homeModel && quote.homeModel !== 'NONE' ? `
  <div class="section">
    <div class="section-title">Home</div>
    <div class="home-box">
      <div class="home-model">${quote.homeModel}</div>
      <div class="home-specs">${quote.houseWidth}' × ${quote.houseLength}' ${quote.singleDouble} Wide</div>
    </div>
    ${floorPlanUrl ? `
    <div style="margin-top: 20px;">
      <div style="font-weight: 600; margin-bottom: 10px; color: #2c5530;">Floor Plan</div>
      <p style="margin: 0;"><a href="${floorPlanUrl}" target="_blank" style="color: #1565c0; text-decoration: none; font-size: 14px;">View Full Floor Plan, Photos & 3D Tour on Clayton Homes</a></p>
    </div>
    ` : ''}
  </div>
  ` : `
  <div class="section">
    <div class="section-title">Decor Checklist</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Dimensions</div>
        <div class="info-value">${quote.houseWidth}' × ${quote.houseLength}'</div>
      </div>
      <div class="info-item">
        <div class="info-label">Type</div>
        <div class="info-value">${quote.singleDouble} Wide</div>
      </div>
    </div>
  </div>
  `}
  
  <div class="section">
    <div class="section-title">Scope of Work</div>
    <p style="margin-bottom: 15px; color: #666;">This quote includes complete professional installation services:</p>
    
    <h4 style="margin: 15px 0 10px; color: #2c5530;">Standard Installation Package:</h4>
    <ul class="services-list">
      <li>Site preparation and foundation setup</li>
      <li>Home delivery coordination and inspection</li>
      <li>Professional home installation and leveling</li>
      <li>Pier and anchor system installation</li>
      <li>Marriage line sealing (if applicable)</li>
      <li>Final inspection and walkthrough</li>
    </ul>
    
    ${services.length > 0 ? `
    <h4 style="margin: 20px 0 10px; color: #2c5530;">Professional Services:</h4>
    <ul class="services-list">
      ${services.map(s => `<li>${s}</li>`).join('')}
    </ul>
    ` : ''}

    ${homeSpecAdditions.length > 0 ? `
    <h4 style="margin: 20px 0 10px; color: #2c5530;">Home Spec Additions:</h4>
    <ul class="services-list">
      ${homeSpecAdditions.map(s => `<li>${s}</li>`).join('')}
    </ul>
    ` : ''}

    ${allowances.length > 0 ? `
    <h4 style="margin: 20px 0 10px; color: #2c5530;">Services Included as Allowances*:</h4>
    <ul class="services-list" style="border-left-color: #ffc107;">
      ${allowances.map(a => `<li>${a.name}</li>`).join('')}
    </ul>
    <div style="background: #fff9e6; padding: 12px 16px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #ffc107;">
      <p style="margin: 0; font-size: 13px; color: #856404;">
        <strong>*Allowances Explained:</strong> Allowance items are estimated costs based on 49 years of experience with custom home construction and development. These figures represent our best professional estimate; however, actual costs may vary up or down depending on specific site conditions, location factors, and unforeseen circumstances unique to each project. Final costs will be confirmed upon site evaluation.
      </p>
    </div>
    ` : ''}
  </div>
  
  <div class="total-section">
    <div class="section-title" style="border: none; margin-bottom: 20px;">Investment Summary</div>
    <div class="total-row grand"><span>Total</span><span>${fmt(totals.total)}</span></div>

    <div style="background: #e3f2fd; padding: 16px; border-radius: 8px; margin-top: 16px;">
      <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 18px; color: #1565c0; margin-bottom: 8px;">
        <span>2% Contingency Allowance</span>
        <span>${fmt(totals.contingency)}</span>
      </div>
      <div style="font-size: 13px; color: #666; line-height: 1.6;">
        <strong>Purpose:</strong> A dedicated fund for change orders and allowance adjustments. If allowances (permits, well, sand pad, sewer, etc.) come in under budget, savings are added to this fund. If they exceed estimates or you make change orders, funds are drawn from here first, minimizing out-of-pocket costs. At project completion, if there are no overages or change orders, you receive back the full 2% contingency amount plus any allowance savings.
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 28px; color: #2c5530; border-top: 3px solid #2c5530; padding-top: 16px; margin-top: 16px;">
      <span>Total Investment</span>
      <span>${fmt(totals.totalWithContingency)}</span>
    </div>
  </div>

  ${(() => {
    // Collect all published customer notes for all services
    const allNotes = [];
    Object.keys(quote.selectedServices || {}).forEach(serviceKey => {
      if (quote.selectedServices[serviceKey] && quote.publishedServiceNotes?.[serviceKey]?.length > 0) {
        const serviceName = DEFAULT_SERVICES[serviceKey]?.name || serviceKey;
        quote.publishedServiceNotes[serviceKey].forEach(note => {
          allNotes.push({
            serviceName,
            text: note.text,
            publishedAt: note.publishedAt,
            publishedBy: note.publishedBy
          });
        });
      }
    });

    // Add notes for sewer and well if they exist
    if (quote.sewerType && quote.sewerType !== 'none' && quote.publishedServiceNotes?.sewer?.length > 0) {
      quote.publishedServiceNotes.sewer.forEach(note => {
        allNotes.push({
          serviceName: 'Sewer System',
          text: note.text,
          publishedAt: note.publishedAt,
          publishedBy: note.publishedBy
        });
      });
    }

    if (parseFloat(quote.wellDepth) > 0 && quote.publishedServiceNotes?.well?.length > 0) {
      quote.publishedServiceNotes.well.forEach(note => {
        allNotes.push({
          serviceName: 'Well Drilling',
          text: note.text,
          publishedAt: note.publishedAt,
          publishedBy: note.publishedBy
        });
      });
    }

    if (allNotes.length === 0) return '';

    return `
    <div style="background: #f0f7ff; border: 2px solid #1565c0; border-radius: 8px; padding: 20px; margin: 30px 0;">
      <h3 style="margin: 0 0 16px; color: #1565c0; font-size: 18px;">📋 Important Project Information</h3>
      ${allNotes.map(note => `
        <div style="background: #fff; padding: 12px; border-radius: 6px; margin-bottom: 12px; border-left: 4px solid #1565c0;">
          <div style="font-weight: 600; color: #2c5530; margin-bottom: 6px; font-size: 14px;">${note.serviceName}</div>
          <div style="color: #333; margin-bottom: 6px; line-height: 1.5;">${note.text}</div>
          <div style="font-size: 11px; color: #999;">
            ${new Date(note.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} by ${note.publishedBy}
          </div>
        </div>
      `).join('')}
    </div>
    `;
  })()}

  <div class="terms">
    <div class="terms-title">Terms & Conditions</div>
    <ul>
      <li>Quote valid for 30 days from date issued</li>
      <li>50% deposit required to schedule installation</li>
      <li>Balance due upon completion of installation</li>
      <li>Price subject to change if site conditions differ from initial assessment</li>
      <li>Allowance items are estimates and may be adjusted based on actual site conditions</li>
      <li>All work performed in accordance with Minnesota state regulations</li>
      <li>Sherman structural warranty: 30 years | Workmanship warranty: 10 years</li>
    </ul>
  </div>
  
  <div class="signature-section">
    <div>
      <div class="signature-box">
        <div class="signature-label">Customer Signature / Date</div>
      </div>
    </div>
    <div>
      <div class="signature-box">
        <div class="signature-label">Sherman Representative / Date</div>
      </div>
    </div>
  </div>
  
  <div class="footer">
    <strong>Sherman Pole Buildings</strong> | 2244 Hwy 65, Mora, MN 55051 | (320) 679-3438<br>
    Thank you for choosing Sherman for your manufactured home installation!
  </div>
</body>
</html>
  `;
  
  // Open quote in new window using document.write for better reliability
  const newWindow = window.open('', '_blank');

  if (newWindow) {
    newWindow.document.write(html);
    newWindow.document.close();
  } else {
    // If popup blocked, create a download link
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sherman-Quote-${quote.customerLastName}-${quote.id?.slice(-8) || 'draft'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    alert('Quote downloaded as HTML file. Open it in your browser to view and print.');
  }
};

// ============================================================================
// generateChangeOrderDocument
// ============================================================================
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
    <div style="font-size:13px;color:#666">${customer.phone}</div>
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

// ============================================================================
// generateScopeOfWorkDocument
// ============================================================================
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

  const foundationType = quote.foundationType || 'slab';
  const foundation = foundationTypes[foundationType] || foundationTypes.slab;

  return `<!DOCTYPE html><html><head><title>Scope of Work - ${customer.firstName || 'Customer'} ${customer.lastName || ''}</title>
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
.included-list li:before{content:'✓';position:absolute;left:0;color:#28a745;font-weight:900;font-size:20px}
.excluded-list{list-style:none;padding:0;margin:16px 0}
.excluded-list li{padding:10px 0 10px 32px;position:relative;font-size:15px;line-height:1.6;color:#666}
.excluded-list li:before{content:'✗';position:absolute;left:0;color:#dc3545;font-weight:900;font-size:20px}
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
    <div style="font-size:14px;color:#555;margin-bottom:4px">📞 ${customer.phone}</div>
    <div style="font-size:14px;color:#555">✉️ ${customer.email}</div>
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
      <td style="font-weight:700;color:#2c5530">Sherman Pole Buildings</td>
      <td>
        • Provide all labor, materials, and equipment for contracted work<br>
        • Coordinate with home manufacturer for delivery schedule<br>
        • Ensure all work meets local building codes and manufacturer specs<br>
        • Manage subcontractors and ensure quality workmanship<br>
        • Coordinate inspections with local authorities<br>
        • Communicate progress and any issues to customer promptly<br>
        • Clean work site upon completion
      </td>
    </tr>
    <tr>
      <td style="font-weight:700;color:#2c5530">Customer</td>
      <td>
        • Provide clear, legal access to work site for all vehicles and equipment<br>
        • Obtain necessary permits (unless included in contract)<br>
        • Ensure utilities are available at property line prior to installation<br>
        • Remove any obstacles that would interfere with construction<br>
        • Make timely payments per contract terms<br>
        • Communicate any concerns or questions promptly<br>
        • Be available for walkthroughs and sign-offs<br>
        • Provide adequate space for material storage during construction
      </td>
    </tr>
    <tr>
      <td style="font-weight:700;color:#2c5530">Home Manufacturer</td>
      <td>
        • Manufacture home to specifications and quality standards<br>
        • Deliver home sections to site on agreed schedule<br>
        • Provide installation instructions and specifications<br>
        • Honor manufacturer's warranty on home components<br>
        • Provide technical support during installation if needed
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
    <li>Signatures from both Sherman Pole Buildings and Customer</li>
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
    <div style="font-weight:700;margin-bottom:12px;font-size:16px">Sherman Pole Buildings Representative:</div>
    <div class="sig-line"></div>
    <div style="display:flex;justify-content:space-between;font-size:14px;color:#666">
      <span><strong>Print Name:</strong> _______________</span>
      <span><strong>Date:</strong> _______________</span>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div style="margin-top:80px;padding:28px;background:linear-gradient(135deg,#2c5530 0%,#1a3320 100%);color:#fff;border-radius:10px;text-align:center">
  <div style="font-size:22px;font-weight:800;margin-bottom:8px">SHERMAN POLE BUILDINGS</div>
  <div style="font-size:15px;margin-bottom:12px">Professional Modular Home Installation & Foundation Services</div>
  <div style="font-size:14px;margin-bottom:4px">2244 Highway 65, Mora, MN 55051</div>
  <div style="font-size:14px;margin-bottom:4px">Phone: (320) 679-3438</div>
  <div style="font-size:12px;margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.3);font-style:italic">
    This Scope of Work document is valid for 30 days from ${today}
  </div>
</div>

</body></html>`;
};

// ============================================================================
// generateCrewWorkOrderDocument
// ============================================================================
export const generateCrewWorkOrderDocument = (quote, customer, servicesParam) => {
  // Use provided services or fallback to DEFAULT_SERVICES
  const services = servicesParam || DEFAULT_SERVICES;

  const today = DocumentUtils.formatDate();
  const quoteNum = DocumentUtils.getQuoteNum(quote);

  // Calculate totals with all required parameters
  const totals = calcTotals(
    quote,
    DEFAULT_MATERIALS,
    services,
    DEFAULT_SEWER,
    DEFAULT_PATIO,
    { install: DRIVE_RATE_INSTALL, service: DRIVE_RATE_SERVICE, projectCommand: DRIVE_RATE_PC, inspection: DRIVE_RATE_INSPECTION },
    DEFAULT_FOUNDATION
  );

  // Helper function to format published note dates
  const formatNoteDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  // Get all install services (from the Install Services section)
  const installServiceKeys = ['installation_of_home', 'axles', 'delivery_inspection', 'wrap_up'];
  const installServices = Object.entries(quote.selectedServices || {})
    .filter(([key, selected]) => selected && installServiceKeys.includes(key))
    .map(([key]) => {
      const service = services[key];
      const svcCost = totals.svc.find(s => s.key === key);
      return {
        key,
        name: service?.name || key,
        description: service?.description || '',
        customerNote: quote.serviceNotes?.[key] || '',
        publishedCrewNotes: quote.publishedServiceCrewNotes?.[key] || [],
        cost: svcCost?.cost || 0,
        quantity: quote.serviceQuantities?.[key] || '',
        days: quote.serviceDays?.[key] || ''
      };
    });

  // Get all professional services (excluding HOME_OPTIONS)
  const professionalServiceKeys = ['drywall', 'painting', 'carpet', 'siding_install', 'interior_trim_out',
    'gutter_installation', 'septic_to_house', 'water_line_to_house', 'electric_connection', 'sand_pad',
    'dumpster', 'plumbing', 'skirting', 'deck_install', 'gravel_driveway'];
  const professionalServices = Object.entries(quote.selectedServices || {})
    .filter(([key, selected]) => selected && professionalServiceKeys.includes(key))
    .map(([key]) => {
      const service = services[key];
      const svcCost = totals.svc.find(s => s.key === key);
      return {
        key,
        name: service?.name || key,
        description: service?.description || '',
        customerNote: quote.serviceNotes?.[key] || '',
        publishedCrewNotes: quote.publishedServiceCrewNotes?.[key] || [],
        cost: svcCost?.cost || 0,
        quantity: quote.serviceQuantities?.[key] || '',
        days: quote.serviceDays?.[key] || ''
      };
    });

  // Get home spec additions (HOME_OPTIONS)
  const homeSpecAdditions = Object.entries(quote.selectedServices || {})
    .filter(([key, selected]) => selected && HOME_OPTIONS.includes(key))
    .map(([key]) => {
      const service = services[key];
      const svcCost = totals.svc.find(s => s.key === key);
      return {
        key,
        name: service?.name || key,
        description: service?.description || '',
        customerNote: quote.serviceNotes?.[key] || '',
        publishedCrewNotes: quote.publishedServiceCrewNotes?.[key] || [],
        cost: svcCost?.cost || 0,
        quantity: quote.serviceQuantities?.[key] || '',
        days: quote.serviceDays?.[key] || ''
      };
    });

  // Get other services (sewer, well, patio, landscaping, deck project)
  const otherServices = [];

  if (quote.sewerSystem && quote.sewerSystem !== 'none') {
    otherServices.push({
      key: 'sewer',
      name: 'Sewer System',
      description: quote.sewerSystem,
      customerNote: quote.serviceNotes?.sewer || '',
      publishedCrewNotes: quote.publishedServiceCrewNotes?.sewer || [],
      cost: totals.svc.find(s => s.key === 'sewer')?.cost || 0
    });
  }

  if (quote.wellSystem && quote.wellSystem !== 'none') {
    otherServices.push({
      key: 'well',
      name: 'Well System',
      description: quote.wellSystem,
      customerNote: quote.serviceNotes?.well || '',
      publishedCrewNotes: quote.publishedServiceCrewNotes?.well || [],
      cost: totals.svc.find(s => s.key === 'well')?.cost || 0
    });
  }

  if (quote.patio) {
    otherServices.push({
      key: 'patio',
      name: 'Patio',
      description: `${quote.patioWidth} x ${quote.patioLength}`,
      customerNote: quote.serviceNotes?.patio || '',
      publishedCrewNotes: quote.publishedServiceCrewNotes?.patio || [],
      cost: totals.svc.find(s => s.key === 'patio')?.cost || 0
    });
  }

  if (quote.landscaping) {
    otherServices.push({
      key: 'landscaping',
      name: 'Landscaping',
      description: `Landscaping services`,
      customerNote: quote.serviceNotes?.landscaping || '',
      publishedCrewNotes: quote.publishedServiceCrewNotes?.landscaping || [],
      cost: totals.svc.find(s => s.key === 'landscaping')?.cost || 0
    });
  }

  if (quote.deckProject) {
    otherServices.push({
      key: 'deck',
      name: 'Deck Project',
      description: `Deck construction services`,
      customerNote: quote.serviceNotes?.deck || '',
      publishedCrewNotes: quote.publishedServiceCrewNotes?.deck || [],
      cost: totals.svc.find(s => s.key === 'deck')?.cost || 0
    });
  }

  // Foundation info
  const foundationTypes = {
    slab: 'Concrete Slab Foundation',
    crawlspace: 'Crawl Space Foundation',
    basement: 'Full Basement Foundation'
  };
  const foundationType = quote.foundationType || 'slab';
  const foundationName = foundationTypes[foundationType] || 'Slab';

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
    <div class="info-value" style="font-size:13px">📞 ${customer.phone}</div>
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
    <div class="info-value" style="font-size:13px">${quote.contactPhone || customer.phone}</div>
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

${(quote.publishedServiceCrewNotes?.home_selection || []).length > 0 || quote.serviceNotes?.home_selection ? `
<!-- HOME SELECTION NOTES -->
<div class="service-card" style="border-left:5px solid #2c5530">
  <div class="service-header" style="border-bottom:2px solid #e9ecef">
    <div class="service-name">🏠 Home Selection Notes</div>
  </div>
  ${(quote.publishedServiceCrewNotes?.home_selection || []).length > 0 ? (quote.publishedServiceCrewNotes.home_selection.map(note => `
  <div class="crew-note" style="margin-bottom:12px">
    <div class="crew-note-title">🔧 CREW INSTRUCTIONS</div>
    <div class="crew-note-content">${note.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
    </div>
  </div>
  `).join('')) : ''}
  ${quote.serviceNotes?.home_selection ? `
  <div class="customer-note">
    <div class="customer-note-title">💬 Customer Note (Reference Only)</div>
    <div class="customer-note-content">${quote.serviceNotes.home_selection}</div>
  </div>
  ` : ''}
</div>
` : ''}

${(quote.publishedServiceCrewNotes?.foundation || []).length > 0 || quote.serviceNotes?.foundation ? `
<!-- FOUNDATION TYPE NOTES -->
<div class="service-card" style="border-left:5px solid #dc3545">
  <div class="service-header" style="border-bottom:2px solid #e9ecef">
    <div class="service-name">🏗️ Foundation Type Notes</div>
  </div>
  ${(quote.publishedServiceCrewNotes?.foundation || []).length > 0 ? (quote.publishedServiceCrewNotes.foundation.map(note => `
  <div class="crew-note" style="margin-bottom:12px">
    <div class="crew-note-title">🔧 CREW INSTRUCTIONS</div>
    <div class="crew-note-content">${note.text}</div>
    <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
      Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
    </div>
  </div>
  `).join('')) : ''}
  ${quote.serviceNotes?.foundation ? `
  <div class="customer-note">
    <div class="customer-note-title">💬 Customer Note (Reference Only)</div>
    <div class="customer-note-content">${quote.serviceNotes.foundation}</div>
  </div>
  ` : ''}
</div>
` : ''}

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
    const svcCustNotes = quote.publishedServiceNotes?.[svc.key] || [];
    if (svcCustNotes.length > 0) {
      custNotes.push({ name: svc.name, notes: svcCustNotes });
    }
  });

  const custTotal = custNotes.reduce((c, s) => c + s.notes.length, 0);

  let html = '';

  // Render Crew Note Summary
  if (crewTotal > 0) {
    html += `
<!-- CREW NOTE SUMMARY -->
<div class="collapsible-section">
  <div class="section-header" onclick="toggleSection('crew-note-summary')" style="background:linear-gradient(135deg,#e65100 0%,#ff6b35 100%)">
    <div class="section-header-title">
      🔧 CREW NOTE SUMMARY (${crewTotal} Notes)
    </div>
    <div class="section-toggle-btn" id="toggle-crew-note-summary">−</div>
  </div>
  <div class="section-content expanded" id="content-crew-note-summary">
${crewNotes.map(svc => `
    <div style="margin-bottom:20px;padding:15px;background:#fafafa;border-radius:8px;border-left:5px solid #ff6b35">
      <div style="font-size:18px;font-weight:800;color:#2c5530;margin-bottom:12px">${svc.name}</div>
      ${svc.notes.map(note => `
      <div class="crew-note" style="margin-bottom:10px">
        <div class="crew-note-title">🔧 CREW INSTRUCTIONS</div>
        <div class="crew-note-content">${note.text}</div>
        <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
          Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
        </div>
      </div>
      `).join('')}
    </div>
`).join('')}
  </div>
</div>
`;
  }

  // Render Customer Note Summary
  if (custTotal > 0) {
    html += `
<!-- CUSTOMER NOTE SUMMARY -->
<div class="collapsible-section">
  <div class="section-header" onclick="toggleSection('customer-note-summary')" style="background:linear-gradient(135deg,#1565c0 0%,#42a5f5 100%)">
    <div class="section-header-title">
      💬 CUSTOMER NOTE SUMMARY (${custTotal} Notes)
    </div>
    <div class="section-toggle-btn" id="toggle-customer-note-summary">−</div>
  </div>
  <div class="section-content expanded" id="content-customer-note-summary">
    <div style="background:#e3f2fd;border:2px solid #1565c0;border-radius:8px;padding:15px;margin-bottom:15px">
      <div style="font-size:14px;color:#1565c0;font-weight:700">ℹ️ These are the notes that were shared with the customer. Review so you know exactly what was communicated.</div>
    </div>
${custNotes.map(svc => `
    <div style="margin-bottom:20px;padding:15px;background:#fafafa;border-radius:8px;border-left:5px solid #1565c0">
      <div style="font-size:18px;font-weight:800;color:#1565c0;margin-bottom:12px">${svc.name}</div>
      ${svc.notes.map(note => `
      <div class="customer-note" style="margin-bottom:10px">
        <div class="customer-note-title">💬 Told to Customer</div>
        <div class="customer-note-content">${note.text}</div>
        <div style="font-size:11px;color:#999;margin-top:8px;font-style:italic">
          Published: ${formatNoteDateTime(note.publishedAt)} by ${note.publishedBy}
        </div>
      </div>
      `).join('')}
    </div>
`).join('')}
  </div>
</div>
`;
  }

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
      🏗️ Installation Services
    </div>
    <div class="section-toggle-btn" id="toggle-install-services">+</div>
  </div>
  <div class="section-content" id="content-install-services">
${installServices.map(svc => `
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
  ${svc.customerNote ? `
  <div class="customer-note">
    <div class="customer-note-title">💬 Customer Note (Reference Only)</div>
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
  ${svc.customerNote ? `
  <div class="customer-note">
    <div class="customer-note-title">💬 Customer Note (Reference Only)</div>
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
  ${svc.customerNote ? `
  <div class="customer-note">
    <div class="customer-note-title">💬 Customer Note (Reference Only)</div>
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
  ${svc.customerNote ? `
  <div class="customer-note">
    <div class="customer-note-title">💬 Customer Note (Reference Only)</div>
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
  <div style="font-size:18px;font-weight:700;margin-bottom:8px">Sherman Pole Buildings</div>
  <div style="font-size:14px">2244 Hwy 65, Mora, MN 55051</div>
  <div style="font-size:14px">Phone: (320) 679-3438</div>
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

// ============================================================================
// generateAllowanceProgressDocument
// ============================================================================
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

  // Contingency fund calculations
  const startingContingency = totals.contingency;
  const allowanceSavings = allowanceItems.filter(item => item.variance > 0).reduce((sum, item) => sum + item.variance, 0);
  const allowanceOverages = allowanceItems.filter(item => item.variance < 0).reduce((sum, item) => sum + Math.abs(item.variance), 0);

  // Calculate payments to subtract from balance
  const allPayments = quote.scrubbPayments || [];
  const contingencyPaymentsTotal = allPayments.filter(p => p.isContingencyPayment).reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  const currentBalance = startingContingency + allowanceSavings - allowanceOverages - contingencyPaymentsTotal;

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
    <div style="font-size:18px;font-weight:700;color:#2c5530">Sherman Pole Buildings</div>
    <div style="font-size:13px;color:#666">${today}</div>
  </div>
</div>

<div class="info-grid">
  <div class="info-box">
    <div style="font-weight:700;margin-bottom:8px">Customer</div>
    <div>${customer.firstName} ${customer.lastName}</div>
    <div style="font-size:13px;color:#666">${customer.phone}</div>
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
    <span>Starting Contingency Fund (2% of project):</span>
    <span style="font-weight:700">${fmt(startingContingency)}</span>
  </div>
  <div class="fund-row">
    <span>Allowance Savings (added to fund):</span>
    <span style="font-weight:700;color:#28a745">+${fmt(allowanceSavings)}</span>
  </div>
  <div class="fund-row">
    <span>Allowance Overages (drawn from fund):</span>
    <span style="font-weight:700;color:#dc3545">-${fmt(allowanceOverages)}</span>
  </div>
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
  <p style="margin:0">Please contact Sherman Pole Buildings at (320) 679-3438 if you have any questions about this update or your project's progress.</p>
</div>

</body></html>`;
};

// ============================================================================
// generateAllowancesExplainerDocument
// ============================================================================
export const generateAllowancesExplainerDocument = (quote, customer, totals, services) => {
  const today = DocumentUtils.formatDate();
  const quoteNum = DocumentUtils.getQuoteNum(quote);

  // Get all allowance items from the quote
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

  // Add sewer if selected
  if (quote.sewerType && quote.sewerType !== 'none') {
    const cost = totals.svc.find(s => s.key === 'sewer')?.cost || 0;
    allowanceItems.push({
      name: `Sewer System (${quote.sewerType.replace('_', ' ')})`,
      estimatedCost: cost,
      description: 'Final cost depends on distance to connection point, soil conditions, and inspection requirements.'
    });
  }

  // Add well if selected
  if (parseFloat(quote.wellDepth) > 0) {
    const cost = totals.svc.find(s => s.key === 'well')?.cost || 0;
    allowanceItems.push({
      name: `Well Drilling (${quote.wellDepth} ft estimated)`,
      estimatedCost: cost,
      description: 'Actual depth and cost will be determined by driller based on water table and geological conditions.'
    });
  }

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
  <div style="font-size:18px;font-weight:700;color:#2c5530;margin-bottom:8px">Sherman Pole Buildings</div>
  <div style="font-size:16px">📞 (320) 679-3438</div>
  <div style="font-size:14px;color:#666;margin-top:4px">2244 Hwy 65, Mora, MN 55051</div>
</div>

</body></html>`;
};
