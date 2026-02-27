import { PIER_SPECS, calcIBeam } from './shared.js';

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
