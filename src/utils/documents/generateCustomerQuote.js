import { ALLOWANCE_ITEMS, HOME_OPTIONS, DEFAULT_SERVICES, fmt, formatPhone, DocumentUtils, getServiceDescription } from './shared.js';

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
      const description = getServiceDescription(k, quote);
      if (ALLOWANCE_ITEMS.includes(k)) {
        allowances.push({ name, key: k, description });
      } else if (HOME_OPTIONS.includes(k)) {
        homeSpecAdditions.push(name);
      } else {
        services.push({ name, description });
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
  if (quote.patioSize && quote.patioSize !== 'none') services.push({ name: `Patio (${quote.patioSize} ft)`, description: '' });
  (quote.customServices || []).forEach(cs => { if (cs.name) services.push({ name: cs.name, description: '' }); });

  // Landscaping and deck
  if (quote.hasLandscaping) services.push({ name: 'Landscaping', description: getServiceDescription('landscaping', quote) });
  if (quote.hasDeck) services.push({ name: 'Deck', description: getServiceDescription('deck', quote) });

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
    .services-list li .svc-desc { display: block; font-size: 12px; color: #555; font-style: italic; margin-top: 2px; }
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

      const subject = encodeURIComponent('SHERMAN - Your Project Quote #' + quoteNum);
      const body = encodeURIComponent(
        'Dear ' + customerName + ',\\n\\n' +
        'Thank you for your interest in SHERMAN! Please find your project quote details below:\\n\\n' +
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
        'SHERMAN\\n' +
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
      <img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" alt="SHERMAN" style="height: 50px; margin-bottom: 8px;" />
      <div class="logo-sub">Manufactured Home Installation</div>
    </div>
    <div class="company-info">
      <strong>SHERMAN</strong><br>
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
        <div class="info-value">${formatPhone(quote.phone) || 'N/A'}${quote.phone2 ? ` / ${formatPhone(quote.phone2)}` : ''}</div>
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
      <li>Site prep and foundation review</li>
      <li>Home delivery coordination and inspection</li>
      <li>Professional home installation and leveling</li>
      <li>Pier and anchor system installation</li>
      <li>Marriage line connection</li>
      <li>Final inspection and walkthrough</li>
    </ul>
    
    ${services.length > 0 ? `
    <h4 style="margin: 20px 0 10px; color: #2c5530;">Professional Services:</h4>
    <ul class="services-list">
      ${services.map(s => `<li>${s.name}${s.description ? `<span class="svc-desc">${s.description}</span>` : ''}</li>`).join('')}
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
      ${allowances.map(a => `<li>${a.name}${a.description ? `<span class="svc-desc">${a.description}</span>` : ''}</li>`).join('')}
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
        <span>Contingency Allowance</span>
        <span>${fmt(totals.contingency)}</span>
      </div>
      <div style="font-size: 13px; color: #666; line-height: 1.6;">
        <strong>Purpose:</strong> A dedicated fund for change orders and allowance adjustments. If allowances (permits, well, sand pad, sewer, etc.) come in under budget, savings are added to this fund. If they exceed estimates or you make change orders, funds are drawn from here first, minimizing out-of-pocket costs. At project completion, if there are no overages or change orders, you receive back the full contingency amount plus any allowance savings.
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
    <div style="font-weight:700;margin:10px 0 8px;font-size:14px">Payment Schedule:</div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:14px">
      <tr><td style="padding:6px 10px;border-bottom:1px solid #ddd;font-weight:600;width:60px">50%</td><td style="padding:6px 10px;border-bottom:1px solid #ddd">Down payment — due at signing to schedule project</td></tr>
      <tr><td style="padding:6px 10px;border-bottom:1px solid #ddd;font-weight:600">30%</td><td style="padding:6px 10px;border-bottom:1px solid #ddd">Due at delivery — home is manufactured complete and requires payment before delivery</td></tr>
      <tr><td style="padding:6px 10px;border-bottom:1px solid #ddd;font-weight:600">10%</td><td style="padding:6px 10px;border-bottom:1px solid #ddd">Due after installation — licensed requirements completed</td></tr>
      <tr><td style="padding:6px 10px;border-bottom:1px solid #ddd;font-weight:600">10%</td><td style="padding:6px 10px;border-bottom:1px solid #ddd">Due upon project completion</td></tr>
    </table>
    <div style="background:#e8f5e9;border-left:4px solid #2c5530;padding:10px 14px;border-radius:4px;margin-bottom:14px;font-size:13px;color:#333">
      <strong>Note:</strong> Any remaining contingency allowance balance will be subtracted from your final payment. If allowances come in under budget and no change orders are made, your final amount owed may be significantly less than the scheduled payment above.
    </div>
    <ul>
      <li>Quote valid for 30 days from date issued</li>
      <li>Price subject to change if site conditions differ from initial assessment</li>
      <li>Allowance items are estimates and may be adjusted based on actual site conditions</li>
      <li>All work performed in accordance with both Federal and State regulations</li>
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
    <strong>SHERMAN</strong> | 2244 Hwy 65, Mora, MN 55051 | (320) 679-3438<br>
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
