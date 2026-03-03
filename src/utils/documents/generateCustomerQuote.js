import { ALLOWANCE_ITEMS, HOME_OPTIONS, DEFAULT_SERVICES, fmt, formatPhone, DocumentUtils, getServiceDescription, COMPANY, collectOtherServices, PRINT_STYLES } from './shared.js';
import { openDocumentWindow } from '../windowUtils.js';

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

  // Sewer/Well → allowances; Patio/Landscaping/Deck → services
  const others = collectOtherServices(quote, totals);
  others.forEach(o => {
    if (o.key === 'sewer' || o.key === 'well') {
      allowances.push({ name: o.nameWithDetail, key: o.key });
    } else if (o.key === 'landscaping' || o.key === 'deck') {
      services.push({ name: o.nameWithDetail, description: getServiceDescription(o.key, quote) });
    } else {
      services.push({ name: o.nameWithDetail, description: o.description || '' });
    }
  });
  (quote.customServices || []).forEach(cs => { if (cs.name) services.push({ name: cs.name, description: '' }); });

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
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #2c5530; padding-bottom: 14px; margin-bottom: 18px; }
    .logo { font-size: 24px; font-weight: bold; color: #2c5530; }
    .logo-sub { font-size: 13px; color: #666; }
    .company-info { text-align: right; font-size: 12px; color: #666; }
    .quote-title { background: #2c5530; color: white; padding: 11px 20px; font-size: 21px; font-weight: bold; margin-bottom: 18px; }
    .quote-meta { display: flex; justify-content: space-between; margin-bottom: 20px; }
    .meta-box { background: #f8f9fa; padding: 10px 14px; border-radius: 8px; flex: 1; margin: 0 8px; }
    .meta-box:first-child { margin-left: 0; }
    .meta-box:last-child { margin-right: 0; }
    .meta-label { font-size: 11px; color: #666; text-transform: uppercase; margin-bottom: 3px; }
    .meta-value { font-size: 15px; font-weight: 600; }
    .section { margin-bottom: 22px; }
    .section-title { font-size: 17px; font-weight: 600; color: #2c5530; border-bottom: 2px solid #e0e0e0; padding-bottom: 6px; margin-bottom: 12px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .info-item { }
    .info-label { font-size: 11px; color: #666; }
    .info-value { font-size: 14px; font-weight: 500; }
    .scope-section { margin-bottom: 12px; }
    .scope-heading { font-size: 12px; color: #2c5530; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; padding-bottom: 5px; margin-bottom: 6px; border-bottom: 2px solid #e0e0e0; }
    .scope-heading.allowance { color: #856404; }
    .scope-items { columns: 2; column-gap: 20px; }
    .scope-item { padding: 3px 0; font-size: 12px; border-bottom: 1px solid #e9ecef; break-inside: avoid; }
    .scope-item::before { content: "✓ "; color: #2c5530; font-weight: 700; }
    .scope-item.allowance::before { color: #ffc107; }
    .scope-item .svc-desc { display: block; font-size: 11px; color: #555; font-style: italic; margin: 1px 0 2px 16px; }
    .home-box { background: linear-gradient(135deg, #2c5530, #1a3a1f); color: white; padding: 14px 18px; border-radius: 8px; margin-bottom: 14px; }
    .home-model { font-size: 18px; font-weight: 600; }
    .home-specs { opacity: 0.9; margin-top: 4px; font-size: 14px; }
    .total-section { background: #f8f9fa; border: 2px solid #2c5530; border-radius: 8px; padding: 20px; margin-top: 0; }
    .total-row { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #e0e0e0; }
    .total-row:last-child { border-bottom: none; }
    .total-row.grand { font-size: 22px; font-weight: 700; color: #2c5530; border-top: 2px solid #2c5530; margin-top: 8px; padding-top: 12px; }
    .terms { margin-top: 24px; padding: 16px; background: #fff9e6; border-radius: 8px; font-size: 12px; }
    .terms-title { font-weight: 600; margin-bottom: 8px; }
    .terms ul { margin-left: 18px; }
    .signature-section { margin-top: 28px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
    .signature-box { border-top: 2px solid #333; padding-top: 8px; }
    .signature-label { font-size: 12px; color: #666; }
    .footer { margin-top: 24px; text-align: center; font-size: 11px; color: #666; border-top: 1px solid #e0e0e0; padding-top: 14px; }
    .contingency-box { background: #e3f2fd; padding: 12px 14px; border-radius: 8px; margin-top: 12px; }
    .contingency-header { display: flex; justify-content: space-between; font-weight: 700; font-size: 17px; color: #1565c0; margin-bottom: 6px; }
    .contingency-desc { font-size: 12px; color: #666; line-height: 1.5; }
    .total-investment { display: flex; justify-content: space-between; font-weight: 700; font-size: 24px; color: #2c5530; border-top: 3px solid #2c5530; padding-top: 12px; margin-top: 12px; }
    .pay-heading { font-weight: 700; margin: 10px 0 8px; font-size: 14px; }
    .pay-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
    .pay-pct { padding: 6px 10px; border-bottom: 1px solid #ddd; font-weight: 600; width: 60px; }
    .pay-desc { padding: 6px 10px; border-bottom: 1px solid #ddd; }
    .pay-amt { padding: 6px 10px; border-bottom: 1px solid #ddd; text-align: right; font-weight: 600; white-space: nowrap; }
    .pay-note { background: #e8f5e9; border-left: 4px solid #2c5530; padding: 10px 14px; border-radius: 4px; margin-bottom: 14px; font-size: 13px; color: #333; }
    @media print {
      @page { size: letter; margin: 0.35in 0.4in; }
      body { padding: 0; max-width: 100%; font-size: 11px; line-height: 1.35; }
      .no-print { display: none !important; }
      .header { padding-bottom: 8px; margin-bottom: 10px; }
      .logo { font-size: 18px; }
      .logo-sub { font-size: 11px; }
      .company-info { font-size: 10px; }
      .quote-title { font-size: 16px; padding: 7px 14px; margin-bottom: 10px; }
      .quote-meta { margin-bottom: 10px; }
      .meta-box { padding: 5px 8px; }
      .meta-label { font-size: 9px; margin-bottom: 1px; }
      .meta-value { font-size: 12px; }
      .section { margin-bottom: 10px; }
      .section-title { font-size: 13px; padding-bottom: 3px; margin-bottom: 6px; }
      .info-grid { gap: 4px; }
      .info-label { font-size: 9px; }
      .info-value { font-size: 11px; }
      .home-box { padding: 8px 12px; margin-bottom: 8px; }
      .home-model { font-size: 14px; }
      .home-specs { font-size: 11px; margin-top: 2px; }
      .scope-section { margin-bottom: 6px; }
      .scope-heading { font-size: 10px; padding-bottom: 2px; margin-bottom: 3px; }
      .scope-items { column-gap: 12px; }
      .scope-item { padding: 1px 0; font-size: 10px; }
      .scope-item .svc-desc { font-size: 9px; margin: 0 0 1px 14px; }
      .section.page-break-before { break-before: auto; page-break-before: auto; }
      .total-section { padding: 10px 14px; break-before: page; page-break-before: always; }
      .total-section .section-title { font-size: 13px; margin-bottom: 8px; }
      .total-row.grand { font-size: 16px; margin-top: 4px; padding-top: 6px; }
      .terms { margin-top: 10px; padding: 8px 10px; font-size: 10px; }
      .terms-title { margin-bottom: 4px; }
      .terms ul { margin-left: 14px; }
      .signature-section { margin-top: 14px; gap: 24px; }
      .signature-label { font-size: 10px; }
      .contingency-box { padding: 6px 10px; margin-top: 6px; }
      .contingency-header { font-size: 13px; margin-bottom: 3px; }
      .contingency-desc { font-size: 10px; line-height: 1.35; }
      .total-investment { font-size: 17px; padding-top: 6px; margin-top: 6px; border-top-width: 2px; }
      .pay-heading { font-size: 11px; margin: 6px 0 4px; }
      .pay-table td { padding: 3px 6px; font-size: 10px; }
      .pay-note { padding: 5px 8px; margin-bottom: 8px; font-size: 10px; }
      .scope-intro { margin-bottom: 6px !important; font-size: 10px; }
      .allowance-note { padding: 5px 8px !important; margin-top: 6px !important; }
      .allowance-note p { font-size: 10px !important; }
      .notes-section { padding: 10px !important; margin: 10px 0 !important; }
      .notes-section h3 { font-size: 13px; margin-bottom: 8px; }
      .notes-section .note-card { padding: 6px; margin-bottom: 6px; }
      .footer { margin-top: 10px; font-size: 9px; padding-top: 6px; }
      .avoid-break { break-inside: avoid; page-break-inside: avoid; }
    }
    .btn-group { position: fixed; top: 20px; right: 20px; display: flex; gap: 10px; }
    .close-btn { background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; }
    .close-btn:hover { background: #5a6268; }
    .print-btn-cq { background: #2c5530; color: #fff; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 600; }
    .print-btn-cq:hover { background: #1b3a20; }
    ${PRINT_STYLES}
  </style>
</head>
<body>
  <div class="btn-group no-print">
    <button class="print-btn-cq" onclick="window.print()">🖨 Print / Save PDF</button>
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

      const subject = encodeURIComponent('${COMPANY.name} - Your Project Quote #' + quoteNum);
      const body = encodeURIComponent(
        'Dear ' + customerName + ',\\n\\n' +
        'Thank you for your interest in ${COMPANY.name}! Please find your project quote details below:\\n\\n' +
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
        '📞 ${COMPANY.phone}\\n' +
        '📍 ${COMPANY.address}\\n\\n' +
        'We look forward to working with you!\\n\\n' +
        'Best regards,\\n' +
        '${COMPANY.name}\\n' +
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
      <div class="logo">${COMPANY.name}</div>
      <div class="logo-sub">Modular Home Installation</div>
    </div>
    <div class="company-info">
      <strong>${COMPANY.name}</strong><br>
      ${COMPANY.address}<br>
      ${COMPANY.phone}
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
    <div class="floor-plan-link" style="margin-top: 10px;">
      <p style="margin: 0;"><a href="${floorPlanUrl}" target="_blank" style="color: #1565c0; text-decoration: none; font-size: 12px;">View Floor Plan, Photos & 3D Tour on Clayton Homes</a></p>
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
  
  <div class="section page-break-before">
    <div class="section-title">Scope of Work</div>
    <p class="scope-intro" style="margin-bottom: 15px; color: #666;">This quote includes complete professional installation services:</p>

    ${homeSpecAdditions.length > 0 ? `
    <div class="scope-section">
      <div class="scope-heading">Home Spec Additions</div>
      <div class="scope-items">
        ${homeSpecAdditions.map(s => `<div class="scope-item">${s}</div>`).join('')}
      </div>
    </div>
    ` : ''}

    <div class="scope-section">
      <div class="scope-heading">Standard Installation</div>
      <div class="scope-items">
        <div class="scope-item">Site prep and foundation review</div>
        <div class="scope-item">Home delivery coordination and inspection</div>
        <div class="scope-item">Professional home installation and leveling</div>
        <div class="scope-item">Pier and anchor system installation</div>
        <div class="scope-item">Marriage line connection</div>
        <div class="scope-item">Final inspection and walkthrough</div>
      </div>
    </div>

    ${services.length > 0 ? `
    <div class="scope-section">
      <div class="scope-heading">Professional Services</div>
      <div class="scope-items">
        ${services.map(s => `<div class="scope-item">${s.name}${s.description ? `<span class="svc-desc">${s.description}</span>` : ''}</div>`).join('')}
      </div>
    </div>
    ` : ''}

    ${allowances.length > 0 ? `
    <div class="scope-section">
      <div class="scope-heading allowance">Allowances*</div>
      <div class="scope-items">
        ${allowances.map(a => `<div class="scope-item allowance">${a.name}${a.description ? `<span class="svc-desc">${a.description}</span>` : ''}</div>`).join('')}
      </div>
    </div>
    ` : ''}

    ${allowances.length > 0 ? `
    <div class="allowance-note" style="background: #fff9e6; padding: 10px 14px; border-radius: 6px; margin-top: 12px; border-left: 4px solid #ffc107;">
      <p style="margin: 0; font-size: 12px; color: #856404;">
        <strong>*Allowances:</strong> Estimated costs based on 49 years of experience. Actual costs may vary depending on site conditions and location factors. Final costs confirmed upon site evaluation.
      </p>
    </div>
    ` : ''}
  </div>
  
  <div class="total-section avoid-break page-break-before">
    <div class="section-title" style="border: none; margin-bottom: 16px;">Investment Summary</div>
    <div class="total-row grand"><span>Total</span><span>${fmt(totals.total)}</span></div>

    <div class="contingency-box">
      <div class="contingency-header">
        <span>Contingency Allowance</span>
        <span>${fmt(totals.contingency)}</span>
      </div>
      <div class="contingency-desc">
        <strong>Purpose:</strong> A dedicated fund for change orders and allowance adjustments. If allowances (permits, well, sand pad, sewer, etc.) come in under budget, savings are added to this fund. If they exceed estimates or you make change orders, funds are drawn from here first. At project completion, if there are no overages or change orders, you receive back the full contingency amount plus any allowance savings.
      </div>
    </div>

    <div class="total-investment">
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

    // Add general customer notes (not tied to a specific service)
    (quote.publishedGeneralCustomerNotes || []).forEach(note => {
      allNotes.push({
        serviceName: 'General Project Note',
        text: note.text,
        publishedAt: note.publishedAt,
        publishedBy: note.publishedBy
      });
    });

    if (allNotes.length === 0) return '';

    return `
    <div class="notes-section" style="background: #f0f7ff; border: 2px solid #1565c0; border-radius: 8px; padding: 20px; margin: 30px 0;">
      <h3 style="margin: 0 0 16px; color: #1565c0; font-size: 18px;">Important Project Information</h3>
      ${allNotes.map(note => `
        <div class="note-card" style="background: #fff; padding: 12px; border-radius: 6px; margin-bottom: 12px; border-left: 4px solid #1565c0;">
          <div style="font-weight: 600; color: #2c5530; margin-bottom: 4px; font-size: 13px;">${note.serviceName}</div>
          <div style="color: #333; margin-bottom: 4px; line-height: 1.4; font-size: 12px;">${note.text}</div>
          <div style="font-size: 10px; color: #999;">
            ${new Date(note.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} by ${note.publishedBy}
          </div>
        </div>
      `).join('')}
    </div>
    `;
  })()}

  <div class="terms avoid-break">
    <div class="terms-title">Terms & Conditions</div>
    <div class="pay-heading">Payment Schedule:</div>
    <table class="pay-table">
      <tr><td class="pay-pct">50%</td><td class="pay-desc">Down payment — due at signing to schedule project</td><td class="pay-amt">${fmt(totals.totalWithContingency * 0.5)}</td></tr>
      <tr><td class="pay-pct">30%</td><td class="pay-desc">Due at delivery — home is modular complete and requires payment before delivery</td><td class="pay-amt">${fmt(totals.totalWithContingency * 0.3)}</td></tr>
      <tr><td class="pay-pct">10%</td><td class="pay-desc">Due after installation — licensed requirements completed</td><td class="pay-amt">${fmt(totals.totalWithContingency * 0.1)}</td></tr>
      <tr><td class="pay-pct">10%</td><td class="pay-desc">Due upon project completion</td><td class="pay-amt">${fmt(totals.totalWithContingency * 0.1)}</td></tr>
    </table>
    <div class="pay-note">
      <strong>Note:</strong> Any remaining contingency allowance balance will be subtracted from your final payment. If allowances come in under budget and no change orders are made, your final amount owed may be significantly less than the scheduled payment above.
    </div>
    <ul>
      <li>Quote valid for 30 days from date issued</li>
      <li>Price subject to change if site conditions differ from initial assessment</li>
      <li>Allowance items are estimates and may be adjusted based on actual site conditions</li>
      <li>All work performed in accordance with both Federal and State regulations</li>
    </ul>
  </div>
  
  <div class="signature-section avoid-break">
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
    <strong>${COMPANY.name}</strong> | ${COMPANY.address} | ${COMPANY.phone}<br>
    Thank you for choosing ${COMPANY.name} for your modular home installation!
  </div>
</body>
</html>
  `;
  
  openDocumentWindow(html, `Sherman-Quote-${quote.customerLastName}-${quote.id?.slice(-8) || 'draft'}.html`);
};
