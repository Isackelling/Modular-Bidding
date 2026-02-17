/**
 * Folder saver functions extracted from the monolithic AppInner component.
 * These functions generate documents and save them to the appropriate folders
 * on quotes and contracts.
 *
 * Since the original functions relied on component state and closures,
 * this module exports a factory function (createFolderSavers) that accepts
 * all required dependencies and returns the saver functions.
 */

import { blobToDataUrl } from './blobToDataUrl.js';
import { CalcHelpers } from './CalcHelpers.js';
import { DocumentUtils } from './DocumentUtils.js';
import { FolderUtils } from './FolderUtils.js';
import { NotificationSystem } from './NotificationSystem.js';
import { genId, fmt } from './helpers.js';
import { calcMaterials } from './calculations.js';

/**
 * Create all folder saver functions with the given dependencies.
 *
 * @param {Object} deps - All dependencies needed by the saver functions
 * @param {Object} deps.materials - Materials pricing data
 * @param {Object} deps.services - Services catalog
 * @param {Object} deps.sewerPricing - Sewer type pricing
 * @param {Object} deps.patioPricing - Patio size pricing
 * @param {Object} deps.driveRates - Drive time rates
 * @param {Object} deps.foundationPricing - Foundation type pricing
 * @param {Array}  deps.homeModels - Array of home model objects
 * @param {string} deps.userName - Current logged-in user's display name
 * @param {Array}  deps.quotes - Current quotes array from state
 * @param {Array}  deps.contracts - Current contracts array from state
 * @param {Object|null} deps.selQuote - Currently selected quote (or null)
 * @param {Object|null} deps.selContract - Currently selected contract (or null)
 * @param {Object|null} deps.selCustomer - Currently selected customer (or null)
 * @param {Function} deps.setSelQuote - State setter for selected quote
 * @param {Function} deps.setSelContract - State setter for selected contract
 * @param {Function} deps.saveQuotes - Async function to persist quotes array
 * @param {Function} deps.saveContracts - Async function to persist contracts array
 * @param {Function} deps.generateQuoteHtml - Generate quote HTML document
 * @param {Function} deps.generatePierDiagramHtml - Generate pier diagram HTML
 * @param {Function} deps.generateScopeOfWorkDocument - Generate scope of work HTML
 * @param {Function} deps.generateCrewWorkOrderDocument - Generate crew work order HTML
 * @param {Function} deps.generateAllowanceProgressDocument - Generate allowance progress HTML
 * @param {Function} deps.generateChangeOrderDocument - Generate change order HTML
 * @returns {Object} Object containing all folder saver functions
 */
export const createFolderSavers = ({
  materials,
  services,
  sewerPricing,
  patioPricing,
  driveRates,
  foundationPricing,
  homeModels,
  userName,
  quotes,
  contracts,
  selQuote,
  selContract,
  selCustomer,
  setSelQuote,
  setSelContract,
  saveQuotes,
  saveContracts,
  generateQuoteHtml,
  generatePierDiagramHtml,
  generateScopeOfWorkDocument,
  generateCrewWorkOrderDocument,
  generateAllowanceProgressDocument,
  generateChangeOrderDocument,
}) => {

  // ─── Internal helper: save a file to one or more folders on a quote/contract ───
  const autoSaveFileToFolders = async (file, folderIds, quote, customer) => {
    let updatedFolders = FolderUtils.getFolders(quote);

    for (const folderId of folderIds) {
      const existingFiles = updatedFolders[folderId] || [];
      // Check if file with same name already exists in folder
      const existingIndex = existingFiles.findIndex(f => f.name === file.name);
      if (existingIndex >= 0) {
        // Update existing file
        existingFiles[existingIndex] = { ...file, id: existingFiles[existingIndex].id };
        updatedFolders[folderId] = existingFiles;
      } else {
        // Add new file
        updatedFolders[folderId] = [...existingFiles, { ...file, id: genId() }];
      }
    }

    const updatedItem = { ...quote, folders: updatedFolders };

    // Check if this is a quote or contract
    const isInQuotes = quotes.find(q => q.id === quote.id);
    const isInContracts = contracts.find(c => c.id === quote.id);

    if (isInQuotes) {
      const updatedQuotes = quotes.map(q => q.id === quote.id ? updatedItem : q);
      await saveQuotes(updatedQuotes);
      if (selQuote?.id === quote.id) setSelQuote(updatedItem);
    } else if (isInContracts) {
      const updatedContracts = contracts.map(c => c.id === quote.id ? updatedItem : c);
      await saveContracts(updatedContracts);
      if (selContract?.id === quote.id) setSelContract(updatedItem);
    }

    return updatedItem;
  };

  // ─── 1. Save Quote PDF to Customer Docs folder ───
  const saveQuoteToFolder = async (quote, customer) => {
    const cust = customer || selCustomer;
    const totals = CalcHelpers.calculateQuoteTotals(quote, cust, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing);
    const quoteNum = DocumentUtils.getQuoteNum(quote);
    const homeDesc = DocumentUtils.getHomeDesc(quote);

    // Generate quote HTML and create a data URL
    const quoteHtml = generateQuoteHtml({ ...quote, customerFirstName: cust.firstName, customerLastName: cust.lastName, phone: cust.phone, email: cust.email, siteAddress: cust.siteAddress, siteCity: cust.siteCity, siteState: cust.siteState, siteZip: cust.siteZip }, totals, homeModels);
    const blob = new Blob([quoteHtml], { type: 'text/html' });
    const quoteDataUrl = await blobToDataUrl(blob, 'Quote');

    const file = {
      name: `Quote #${quoteNum} - ${homeDesc}`,
      type: 'pdf',
      url: quoteDataUrl,
      notes: `Total: ${fmt(totals.total)} | Status: ${quote.status} | Version: ${quote.editVersion || 0}`,
      addedBy: userName,
      addedAt: new Date().toISOString(),
    };

    await autoSaveFileToFolders(file, ['change_orders'], quote, cust);
    alert('\u2705 Quote saved to Customer Docs folder!');
  };

  // ─── 2. Save Pier Layout to Crew Files folder ───
  const savePierLayoutToFolder = async (quote, customer) => {
    const cust = customer || selCustomer;
    const quoteNum = DocumentUtils.getQuoteNum(quote);
    const homeDesc = DocumentUtils.getHomeDesc(quote);

    // Generate pier diagram HTML
    const pierHtml = generatePierDiagramHtml(quote, cust);
    const blob = new Blob([pierHtml], { type: 'text/html' });

    // Create data URL for persistence
    const dataUrl = await blobToDataUrl(blob, 'Pier Layout');

    const file = {
      name: `Pier Layout - ${homeDesc}`,
      type: 'pdf',
      url: dataUrl,
      notes: `${quote.houseWidth}'W \u00d7 ${quote.houseLength}'L | I-Beam: ${CalcHelpers.getBeamHeight(quote)}" | Quote #${quoteNum}`,
      addedBy: userName,
      addedAt: new Date().toISOString(),
    };

    await autoSaveFileToFolders(file, ['crew_files'], quote, cust);
    alert('\u2705 Pier Layout saved to Crew Files folder!');
  };

  // ─── 3. Save Material List (name + qty only, no prices) to Crew Files folder ───
  const saveMaterialListToFolder = async (quote, customer) => {
    const cust = customer || selCustomer;
    const matList = calcMaterials({ ...quote, ...cust }, materials);
    const quoteNum = DocumentUtils.getQuoteNum(quote);
    const homeDesc = DocumentUtils.getHomeDesc(quote);

    const rows = matList.map(m => `<tr><td style="padding:6px 12px;border-bottom:1px solid #ddd">${m.item}</td><td style="padding:6px 12px;border-bottom:1px solid #ddd;text-align:right">${m.qty}</td></tr>`).join('');
    const html = `<!DOCTYPE html><html><head><title>Material List - ${homeDesc}</title></head><body style="font-family:Arial,sans-serif;max-width:700px;margin:40px auto;padding:20px">` +
      `<h1 style="color:#2c5530;border-bottom:2px solid #2c5530;padding-bottom:8px">Material List</h1>` +
      `<p><strong>Home:</strong> ${homeDesc} &nbsp;|&nbsp; <strong>Quote:</strong> #${quoteNum}</p>` +
      `<p><strong>${cust.firstName} ${cust.lastName}</strong></p>` +
      `<table style="width:100%;border-collapse:collapse;margin-top:16px">` +
      `<thead><tr style="background:#2c5530;color:#fff"><th style="padding:8px 12px;text-align:left">Material</th><th style="padding:8px 12px;text-align:right">Qty</th></tr></thead>` +
      `<tbody>${rows}</tbody></table>` +
      `<p style="margin-top:24px;color:#666;font-size:12px">Generated ${new Date().toLocaleDateString()}</p></body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const matDataUrl = await blobToDataUrl(blob, 'Material List');

    const file = {
      name: `Material List - ${homeDesc}`,
      type: 'pdf',
      url: matDataUrl,
      notes: `${matList.length} items | Quote #${quoteNum}`,
      addedBy: userName,
      addedAt: new Date().toISOString(),
    };

    await autoSaveFileToFolders(file, ['crew_files'], quote, cust);
    alert('\u2705 Material List saved to Crew Files folder!');
  };

  // ─── 4. Save Decor Checklist to Clayton Docs folder ───
  const saveDecorChecklistToFolder = async (quote, customer) => {
    const cust = customer || selCustomer;
    const quoteNum = DocumentUtils.getQuoteNum(quote);
    const homeDesc = DocumentUtils.getHomeDesc(quote);
    const matList = calcMaterials({ ...quote, ...cust }, materials);
    const totals = CalcHelpers.calculateQuoteTotals(quote, cust, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing);

    // Get Additional Options services (from House Specs > Additional Options section)
    const additionalOptionsServices = ['lp_siding', 'tray_ceiling', 'full_backsplash', 'sets_of_drawers', 'meter_loop', 'drop_down_beam', 'lp_trim', 'amp_service_200'];
    const selectedAdditionalOptions = Object.entries(quote.selectedServices || {})
      .filter(([key, selected]) => selected && additionalOptionsServices.includes(key))
      .map(([key, _]) => {
        const svc = services[key];
        const qty = quote.serviceQuantities?.[key];
        const qtyText = qty && qty > 1 ? ` (\u00d7${qty})` : '';
        return svc ? `${svc.name}${qtyText}` : key;
      });

    // Add custom options
    if (quote.customOptions && quote.customOptions.length > 0) {
      quote.customOptions.forEach(co => {
        if (co.name) {
          selectedAdditionalOptions.push(`${co.name}${co.price ? ` ($${co.price})` : ''}`);
        }
      });
    }

    // Get foundation info
    const foundationType = quote.foundationType || 'slab';
    const foundationNames = {
      none: 'Not selected',
      deck: 'Deck Piers',
      crawl: 'Crawl Space',
      crawlspace: 'Crawl Space',
      basement: 'Basement',
      slab: 'Engineered Slab'
    };
    const iBeamHeight = CalcHelpers.getBeamHeight(quote);

    const html = `<!DOCTYPE html><html><head><title>Decor Checklist - ${homeDesc}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:40px 30px;max-width:900px;margin:0 auto;color:#333;background:#fff}
.header{text-align:center;border-bottom:3px solid #2c5530;padding-bottom:20px;margin-bottom:30px}
.logo{margin-bottom:15px}
.title{font-size:32px;font-weight:700;color:#2c5530;margin:10px 0}
.subtitle{font-size:14px;color:#666;margin:5px 0}
.section{margin-bottom:30px;page-break-inside:avoid}
.section h2{font-size:18px;color:#2c5530;border-bottom:2px solid #2c5530;padding-bottom:8px;margin:0 0 15px;text-transform:uppercase}
.form-row{margin-bottom:12px;display:flex;align-items:center;gap:10px}
.form-label{font-size:13px;font-weight:600;color:#333;min-width:180px}
input[type="text"]{border:none;border-bottom:2px solid #ccc;padding:6px 0;font-size:14px;flex:1;outline:none}
input[type="text"]:focus{border-bottom-color:#2c5530}
.radio-group{display:flex;gap:20px;align-items:center}
.radio-group label{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer}
.checkbox-group{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin:10px 0}
.checkbox-group label{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer}
.standards{background:#f8f9fa;padding:15px;border-left:4px solid #2c5530;margin:20px 0;font-size:12px}
.standards ul{margin:8px 0;padding-left:20px}
.standards li{padding:3px 0}
.signature-section{margin-top:40px;display:grid;grid-template-columns:1fr 1fr;gap:30px}
.signature-box{border-bottom:2px solid #333;padding-top:40px;position:relative}
.signature-box label{position:absolute;top:0;font-size:12px;color:#666;font-weight:600}
.footer{margin-top:40px;padding-top:20px;border-top:2px solid #ddd;text-align:center;color:#999;font-size:12px}
@media print{body{padding:20px}.section{page-break-inside:avoid}}
</style></head><body>

<div class="header">
  <div class="logo">
    <img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" style="height:50px">
  </div>
  <div class="title">Modular/Manufactured Home Decor Checklist</div>
  <div class="subtitle">Quote #${quoteNum}</div>
  <div class="subtitle">Customer: ${cust.firstName} ${cust.lastName}</div>
  <div class="subtitle">Address: ${cust.siteAddress}, ${cust.siteCity}, ${cust.siteState}</div>
</div>

<div style="margin-bottom:30px">
  <div class="form-row">
    <span class="form-label">Home Model:</span>
    <input type="text" value="${quote.homeModel !== 'NONE' ? quote.homeModel : ''}" style="font-weight:700;font-size:16px">
  </div>
  <div class="form-row">
    <span class="form-label">House Size:</span>
    <input type="text" value="${quote.houseWidth}' \u00d7 ${quote.houseLength}' ${quote.singleDouble}" style="font-size:14px">
  </div>
  <div class="form-row">
    <span class="form-label">I-Beam:</span>
    <input type="text" value="${iBeamHeight}&quot;" style="font-size:14px">
  </div>
  <div class="form-row">
    <span class="form-label">Foundation:</span>
    <input type="text" value="${foundationNames[foundationType]}" style="font-size:14px">
  </div>
  <div class="form-row">
    <span class="form-label">Drive Time:</span>
    <input type="text" value="${quote.driveTime} mi" style="font-size:14px">
  </div>
</div>

<div class="section">
  <h2>Exterior</h2>
  <div class="form-row">
    <span class="form-label">Siding Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Trim Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Shingles Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Accent Siding? (Circle One)</span>
    <div class="radio-group">
      <label><input type="radio" name="accent"> Shakes</label>
      <label><input type="radio" name="accent"> Board Batten</label>
      <label style="flex:1">Color: <input type="text" value="" style="margin-left:10px"></label>
    </div>
  </div>
  <div class="form-row">
    <span class="form-label">Add 20' Dormer</span>
    <div class="radio-group">
      <label><input type="radio" name="dormer"> Yes</label>
      <label><input type="radio" name="dormer"> No</label>
    </div>
  </div>
  <div class="form-row">
    <span class="form-label">Add Siding Accent? (Circle One)</span>
    <div class="radio-group">
      <label><input type="radio" name="sidingAccent"> No</label>
      <label><input type="radio" name="sidingAccent"> Shakes</label>
      <label><input type="radio" name="sidingAccent"> Board Batten</label>
      <label><input type="radio" name="sidingAccent"> Siding</label>
    </div>
  </div>
  <div class="form-row">
    <span class="form-label" style="visibility:hidden">_</span>
    <span style="flex:1">Color: <input type="text" value="" style="margin-left:10px"></span>
  </div>
  <div class="form-row">
    <span class="form-label">Porch:</span>
    <div class="radio-group">
      <label><input type="radio" name="porch"> 6'</label>
      <label><input type="radio" name="porch"> 8'</label>
      <label><input type="radio" name="porch"> 10'</label>
      <label><input type="radio" name="porch"> No</label>
      <span style="margin-left:20px">Railing Color:</span>
      <label><input type="radio" name="railing"> Black</label>
      <label><input type="radio" name="railing"> White</label>
    </div>
  </div>
</div>

<div class="section">
  <h2>Kitchen (Samsung)</h2>
  <div class="form-row">
    <span class="form-label">Floor Type (Circle One):</span>
    <div class="radio-group">
      <label><input type="radio" name="kitchen_floor"> Vinyl</label>
      <label><input type="radio" name="kitchen_floor"> Hardwood</label>
    </div>
  </div>
  <div class="form-row">
    <span class="form-label">Cabinets Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Countertop Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Backsplash Color:</span>
    <input type="text" value="">
  </div>
</div>

<div class="section">
  <h2>Flooring</h2>
  <div class="form-row">
    <span class="form-label">Carpet Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Lino Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Whole Home Lino?</span>
    <div class="radio-group">
      <label><input type="radio" name="wholeHomeLino"> Yes</label>
      <label><input type="radio" name="wholeHomeLino"> No</label>
    </div>
  </div>
</div>

<div class="section">
  <h2>Bathrooms</h2>
  <div class="form-row">
    <span class="form-label">Shower Type:</span>
    <div class="radio-group">
      <label><input type="radio" name="shower"> Inert</label>
      <label><input type="radio" name="shower"> Walk In</label>
    </div>
  </div>
  <div class="form-row">
    <span class="form-label">Shower Tile:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Vanity Cabinet Color:</span>
    <input type="text" value="">
  </div>
  <div class="form-row">
    <span class="form-label">Vanity Countertop Color:</span>
    <input type="text" value="">
  </div>
</div>

<div class="section">
  <h2>Notes / Upgrades</h2>
  <p style="font-size:12px;color:#666;margin:0 0 10px">Include locations: <strong>Faucets, Outlets</strong> in or out, <strong>Additional Can Lights</strong> on layout.</p>
  <textarea style="width:100%;min-height:100px;border:2px solid #ccc;padding:10px;font-family:inherit;font-size:13px;border-radius:4px;outline:none" placeholder="Enter notes here..."></textarea>
</div>

${selectedAdditionalOptions.length > 0 ? `<div class="standards"><h3 style="margin:0 0 10px;font-size:14px;color:#2c5530">Additional Options</h3><ul>${selectedAdditionalOptions.map(opt => `<li>${opt}</li>`).join('')}</ul></div>` : ''}

<div class="signature-section">
  <div class="signature-box">
    <label>Customer Signature:</label>
  </div>
  <div class="signature-box">
    <label>Rep:</label>
  </div>
</div>

<div class="footer">
  <p><strong>Sherman Pole Buildings</strong></p>
  <p>2244 Hwy 65, Mora, MN 55051 | (320) 679-3438</p>
  <p>Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
</div>

</body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const decorDataUrl = await blobToDataUrl(blob, 'Decor Checklist');

    const file = {
      name: `Decor Checklist - ${homeDesc}`,
      type: 'pdf',
      url: decorDataUrl,
      notes: `Quote #${quoteNum} | ${quote.houseWidth}' \u00d7 ${quote.houseLength}' | ${foundationNames[foundationType]}`,
      addedBy: userName,
      addedAt: new Date().toISOString(),
    };

    await autoSaveFileToFolders(file, ['clayton_docs'], quote, cust);
    alert('\u2705 Decor Checklist saved to Clayton Docs folder!');
  };

  // ─── 5. Save Customer Info + Map to Crew Files ───
  const saveCustomerInfoToFolder = async (quote, customer) => {
    const cust = customer || selCustomer;
    const quoteNum = DocumentUtils.getQuoteNum(quote);
    const homeDesc = DocumentUtils.getHomeDesc(quote);
    const fullAddress = `${cust.siteAddress}, ${cust.siteCity}, ${cust.siteState} ${cust.siteZip || ''}`.trim();
    const mapQuery = encodeURIComponent(fullAddress);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
    const mapEmbed = `https://maps.google.com/maps?q=${mapQuery}&t=k&z=17&output=embed`;

    const html = `<!DOCTYPE html><html><head><title>Customer Info - ${cust.firstName} ${cust.lastName}</title>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;max-width:900px;margin:0 auto;color:#333}
.header{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #2c5530;padding-bottom:15px;margin-bottom:25px}
.title{font-size:22px;font-weight:700;color:#2c5530}
.subtitle{font-size:13px;color:#666}
.cards{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:25px}
.card{background:#f8f9fa;border:1px solid #ddd;border-radius:8px;padding:20px}
.card h3{margin:0 0 12px;font-size:15px;color:#2c5530;border-bottom:1px solid #ddd;padding-bottom:8px}
.row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee}
.row:last-child{border-bottom:none}
.label{font-size:12px;color:#888;text-transform:uppercase}
.value{font-weight:600;font-size:14px}
.map-section{margin-top:10px}
.map-section h3{font-size:15px;color:#2c5530;margin:0 0 10px;border-bottom:1px solid #ddd;padding-bottom:8px}
.map-link{display:inline-block;background:#2c5530;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;margin-bottom:15px}
.map-link:hover{background:#1a3a1f}
iframe{width:100%;height:400px;border:2px solid #ddd;border-radius:8px}
.footer{margin-top:20px;text-align:center;color:#999;font-size:11px}
@media print{body{padding:15px}iframe{height:300px}}
</style></head><body>
<div class="header">
  <div>
    <div class="title">${cust.firstName} ${cust.lastName}</div>
    <div class="subtitle">Customer Info Sheet | Quote #${quoteNum} - ${homeDesc}</div>
  </div>
  <div style="text-align:right">
    <img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" style="height:35px">
  </div>
</div>
<div class="cards">
  <div class="card">
    <h3>Primary Contact</h3>
    <div class="row"><span class="label">Name</span><span class="value">${cust.firstName} ${cust.lastName}</span></div>
    <div class="row"><span class="label">Phone</span><span class="value"><a href="tel:${cust.phone}">${cust.phone || 'N/A'}</a></span></div>
    ${cust.phone2 ? `<div class="row"><span class="label">Phone 2</span><span class="value"><a href="tel:${cust.phone2}">${cust.phone2}</a></span></div>` : ''}
    <div class="row"><span class="label">Email</span><span class="value"><a href="mailto:${cust.email}">${cust.email || 'N/A'}</a></span></div>
    ${cust.email2 ? `<div class="row"><span class="label">Email 2</span><span class="value"><a href="mailto:${cust.email2}">${cust.email2}</a></span></div>` : ''}
  </div>
  ${cust.person2FirstName ? `<div class="card">
    <h3>Secondary Contact</h3>
    <div class="row"><span class="label">Name</span><span class="value">${cust.person2FirstName} ${cust.person2LastName || ''}</span></div>
    ${cust.phone2 ? `<div class="row"><span class="label">Phone</span><span class="value"><a href="tel:${cust.phone2}">${cust.phone2}</a></span></div>` : ''}
    ${cust.email2 ? `<div class="row"><span class="label">Email</span><span class="value"><a href="mailto:${cust.email2}">${cust.email2}</a></span></div>` : ''}
  </div>` : `<div class="card">
    <h3>Mailing Address</h3>
    <div class="row"><span class="label">Address</span><span class="value">${cust.mailingAddress || 'Same as site'}</span></div>
    ${cust.mailingCity ? `<div class="row"><span class="label">City</span><span class="value">${cust.mailingCity}, ${cust.mailingState} ${cust.mailingZip || ''}</span></div>` : ''}
  </div>`}
</div>
<div class="card" style="margin-bottom:25px">
  <h3>Job Site</h3>
  <div class="row"><span class="label">Address</span><span class="value">${cust.siteAddress || 'N/A'}</span></div>
  <div class="row"><span class="label">City / State</span><span class="value">${cust.siteCity || ''}, ${cust.siteState || ''} ${cust.siteZip || ''}</span></div>
  ${cust.siteCounty ? `<div class="row"><span class="label">County</span><span class="value">${cust.siteCounty}</span></div>` : ''}
</div>
<div class="map-section">
  <h3>Directions to Job Site</h3>
  <a class="map-link" href="${mapUrl}" target="_blank">Open in Google Maps</a>
  <br>
  <iframe src="${mapEmbed}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>
<div class="footer">Generated by Sherman Pole Buildings Bidding System - ${new Date().toLocaleDateString()}</div>
</body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const custDataUrl = await blobToDataUrl(blob, 'Customer Info');
    const file = {
      name: `Customer Info - ${cust.firstName} ${cust.lastName}`,
      type: 'pdf',
      url: custDataUrl,
      notes: `${fullAddress} | Quote #${quoteNum}`,
      addedBy: userName,
      addedAt: new Date().toISOString(),
    };
    await autoSaveFileToFolders(file, ['crew_files'], quote, cust);
    alert('\u2705 Customer Info + Map saved to Crew Files!');
  };

  // ─── 6. Save Floor Plan to Clayton Docs and Crew Files ───
  const saveFloorPlanToFolders = async (quote, customer) => {
    const cust = customer || selCustomer;
    const selectedHome = homeModels.find(m => m.name === quote.homeModel);
    const floorPlanUrl = selectedHome?.floorPlanUrl;

    if (!floorPlanUrl) {
      NotificationSystem.warning('No floor plan URL set for this home model. Add one in Pricing > Homes.');
      return;
    }

    const file = {
      name: `Floor Plan - ${quote.homeModel} (Clayton Website)`,
      type: 'link',
      url: floorPlanUrl,
      notes: `${quote.houseWidth}'W \u00d7 ${quote.houseLength}'L ${quote.singleDouble} Wide | Drag actual PDF here for direct access`,
      addedBy: userName,
      addedAt: new Date().toISOString(),
    };

    await autoSaveFileToFolders(file, ['clayton_docs', 'crew_files'], quote, cust);
    alert('\u2705 Floor Plan link saved!\n\n\ud83d\udca1 Tip: For direct access, download the floor plan PDF from Clayton and drag it into this folder.');
  };

  // ─── 7. Save Scope of Work to folders ───
  const saveScopeOfWorkToFolders = async (quote, customer) => {
    const cust = customer || selCustomer;

    // Generate the scope of work document
    const scopeDoc = generateScopeOfWorkDocument(quote, cust, services);

    // Create file object
    const docFileName = `Scope_of_Work_${new Date().toLocaleDateString('en-US').replace(/\//g, '-')}.html`;
    const blob = new Blob([scopeDoc], { type: 'text/html' });
    const scopeDataUrl = await blobToDataUrl(blob, 'Scope of Work');

    const file = {
      name: docFileName,
      type: 'scope_of_work',
      url: scopeDataUrl,
      notes: `Scope of Work for Quote #${DocumentUtils.getQuoteNum(quote)}`,
      addedBy: userName,
      addedAt: new Date().toISOString(),
    };

    // Save to customer docs folder only
    await autoSaveFileToFolders(file, ['change_orders'], quote, cust);
    return file;
  };

  // ─── 8. Save Crew Work Order to folders ───
  const saveCrewWorkOrderToFolders = async (quote, customer) => {
    const cust = customer || selCustomer;

    // Generate the crew work order document
    const crewDoc = generateCrewWorkOrderDocument(quote, cust, services);

    // Create file object with data URL for persistence
    const docFileName = `Crew_Work_Order_${new Date().toLocaleDateString('en-US').replace(/\//g, '-')}.html`;
    const blob = new Blob([crewDoc], { type: 'text/html' });

    // Create data URL for storage
    const dataUrl = await blobToDataUrl(blob, 'Change Order');

    const file = {
      name: docFileName,
      type: 'crew_work_order',
      url: dataUrl, // Use data URL for persistent storage
      notes: `Crew Work Order for Quote #${DocumentUtils.getQuoteNum(quote)} - Internal use only`,
      addedBy: userName,
      addedAt: new Date().toISOString(),
    };

    // Save to crew files folder only
    await autoSaveFileToFolders(file, ['crew_files'], quote, cust);

    return file;
  };

  // ─── 9. Save Allowance Progress Update to folders ───
  const saveAllowanceProgressToFolders = async (quote, customer) => {
    const cust = customer || selCustomer;
    const totals = CalcHelpers.calculateQuoteTotals(quote, cust, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing);

    // Generate the allowance progress document
    const allowanceDoc = generateAllowanceProgressDocument(quote, cust, totals, services);

    // Create file object
    const docFileName = `Allowance_Progress_${new Date().toLocaleDateString('en-US').replace(/\//g, '-')}.html`;
    const blob = new Blob([allowanceDoc], { type: 'text/html' });
    const allowanceDataUrl = await blobToDataUrl(blob, 'Allowance Progress');

    const file = {
      name: docFileName,
      type: 'allowance_update',
      url: allowanceDataUrl,
      notes: `Allowance progress update | Current balance: ${fmt(totals.contingency)}`,
      addedBy: userName,
      addedAt: new Date().toISOString(),
    };

    // Save to customer docs folder only
    await autoSaveFileToFolders(file, ['change_orders'], quote, cust);
    alert('\u2705 Allowance Progress Update saved!\n\nDocument saved to Customer Docs folder.\n\nYou can now share this with the customer.');
  };

  // ─── 10. Save Latest Change Order to folders ───
  const saveLatestChangeOrderToFolders = async (quote, customer) => {
    const cust = customer || selCustomer;

    // Find all change orders for this quote
    const changeOrders = quotes.filter(q => q.changeOrderOf === quote.id);

    if (changeOrders.length === 0) {
      alert('No change orders found for this quote.');
      return;
    }

    // Sort to find the latest change order (by changeOrderNum desc, then changeOrderVersion desc)
    const latestChangeOrder = changeOrders.sort((a, b) => {
      if (a.changeOrderNum !== b.changeOrderNum) {
        return (b.changeOrderNum || 0) - (a.changeOrderNum || 0);
      }
      const aVer = a.changeOrderVersion || '';
      const bVer = b.changeOrderVersion || '';
      return bVer.localeCompare(aVer);
    })[0];

    // Calculate totals for both quotes
    const originalTotals = CalcHelpers.calculateQuoteTotals(quote, cust, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing);
    const changeOrderTotals = CalcHelpers.calculateQuoteTotals(latestChangeOrder, cust, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing);

    // Extract change tracking data from the change order
    const deletions = latestChangeOrder.changeOrderDeletions || [];
    const adjustments = latestChangeOrder.changeOrderAdjustments || {};
    const additions = latestChangeOrder.changeOrderAdditions || [];

    // Generate the change order document
    const changeOrderDoc = generateChangeOrderDocument(
      latestChangeOrder,
      quote,
      { ...cust, customerId: cust.id },
      changeOrderTotals,
      originalTotals,
      materials,
      services,
      sewerPricing,
      patioPricing,
      driveRates,
      foundationPricing,
      deletions,
      adjustments,
      additions
    );

    // Create file object
    const docFileName = `Change_Order_#${latestChangeOrder.changeOrderNum}${latestChangeOrder.changeOrderVersion}_${new Date().toLocaleDateString('en-US').replace(/\//g, '-')}.html`;
    const blob = new Blob([changeOrderDoc], { type: 'text/html' });
    const changeOrderDataUrl = await blobToDataUrl(blob, 'Change Order Document');

    const file = {
      name: docFileName,
      type: 'change_order',
      url: changeOrderDataUrl,
      notes: `Change Order #${latestChangeOrder.changeOrderNum}${latestChangeOrder.changeOrderVersion} | New Total: ${fmt(changeOrderTotals.totalWithContingency)}`,
      addedBy: userName,
      addedAt: new Date().toISOString(),
    };

    // Save to both crew_files and customer docs folders
    await autoSaveFileToFolders(file, ['crew_files', 'change_orders'], quote, cust);
    NotificationSystem.success(`Change Order #${latestChangeOrder.changeOrderNum}${latestChangeOrder.changeOrderVersion} saved!\n\nDocument saved to:\n\u2022 Crew Files\n\u2022 Customer Docs`);
  };

  // ─── 11. Save all documents at once ───
  const saveAllDocsToFolders = async (quote, customer) => {
    try {
    const cust = customer || selCustomer;
    const totals = CalcHelpers.calculateQuoteTotals(quote, cust, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing);
    const quoteNum = DocumentUtils.getQuoteNum(quote);
    const homeDesc = DocumentUtils.getHomeDesc(quote);
    const selectedHome = homeModels.find(m => m.name === quote.homeModel);
    const floorPlanUrl = selectedHome?.floorPlanUrl;

    let savedCount = 0;
    let updatedFolders = FolderUtils.getFolders(quote);

    // 1. Quote to Customer Docs
    const quoteHtml = generateQuoteHtml({ ...quote, customerFirstName: cust.firstName, customerLastName: cust.lastName, phone: cust.phone, email: cust.email, siteAddress: cust.siteAddress, siteCity: cust.siteCity, siteState: cust.siteState, siteZip: cust.siteZip }, totals, homeModels);
    const quoteBlob = new Blob([quoteHtml], { type: 'text/html' });
    const quoteDataUrl = await blobToDataUrl(quoteBlob, 'Quote Document');

    const quoteFile = FolderUtils.createFileObject(
      `Quote #${quoteNum} - ${homeDesc}`,
      'pdf',
      quoteDataUrl,
      `Total: ${fmt(totals.total)} | Status: ${quote.status}`,
      userName
    );
    updatedFolders.change_orders = [...(updatedFolders.change_orders || []).filter(f => !f.name.startsWith(`Quote #${quoteNum}`)), quoteFile];
    savedCount++;

    // 2. Pier Layout to Crew Files
    const pierHtml = generatePierDiagramHtml(quote, cust);
    const pierBlob = new Blob([pierHtml], { type: 'text/html' });
    const pierDataUrl = await blobToDataUrl(pierBlob, 'Pier Layout Document');

    const pierFile = FolderUtils.createFileObject(
      `Pier Layout - ${homeDesc}`,
      'pdf',
      pierDataUrl,
      `${quote.houseWidth}'W \u00d7 ${quote.houseLength}'L | I-Beam: ${CalcHelpers.getBeamHeight(quote)}"`,
      userName
    );
    updatedFolders.crew_files = [...(updatedFolders.crew_files || []).filter(f => !f.name.startsWith('Pier Layout')), pierFile];
    savedCount++;

    // 3. Material List to Crew Files
    const matList = calcMaterials({ ...quote, ...cust }, materials);
    const matRows = matList.map(m => `<tr><td style="padding:6px 12px;border-bottom:1px solid #ddd">${m.item}</td><td style="padding:6px 12px;border-bottom:1px solid #ddd;text-align:right">${m.qty}</td></tr>`).join('');
    const matHtml = `<!DOCTYPE html><html><head><title>Material List - ${homeDesc}</title></head><body style="font-family:Arial,sans-serif;max-width:700px;margin:40px auto;padding:20px">` +
      `<h1 style="color:#2c5530;border-bottom:2px solid #2c5530;padding-bottom:8px">Material List</h1>` +
      `<p><strong>Home:</strong> ${homeDesc} &nbsp;|&nbsp; <strong>Quote:</strong> #${quoteNum}</p>` +
      `<p><strong>${cust.firstName} ${cust.lastName}</strong></p>` +
      `<table style="width:100%;border-collapse:collapse;margin-top:16px">` +
      `<thead><tr style="background:#2c5530;color:#fff"><th style="padding:8px 12px;text-align:left">Material</th><th style="padding:8px 12px;text-align:right">Qty</th></tr></thead>` +
      `<tbody>${matRows}</tbody></table>` +
      `<p style="margin-top:24px;color:#666;font-size:12px">Generated ${new Date().toLocaleDateString()}</p></body></html>`;
    const matBlob = new Blob([matHtml], { type: 'text/html' });
    const matDataUrl = await blobToDataUrl(matBlob, 'Material List Document');
    const matFile = FolderUtils.createFileObject(
      `Material List - ${homeDesc}`,
      'pdf',
      matDataUrl,
      `${matList.length} items | Quote #${quoteNum}`,
      userName
    );
    updatedFolders.crew_files = [...(updatedFolders.crew_files || []).filter(f => !f.name.startsWith('Material List')), matFile];
    savedCount++;

    // 4. Customer Info + Map to Crew Files
    const fullAddress = `${cust.siteAddress}, ${cust.siteCity}, ${cust.siteState} ${cust.siteZip || ''}`.trim();
    const custMapQuery = encodeURIComponent(fullAddress);
    const custMapUrl = `https://www.google.com/maps/search/?api=1&query=${custMapQuery}`;
    const custMapEmbed = `https://maps.google.com/maps?q=${custMapQuery}&t=k&z=17&output=embed`;
    const custInfoHtml = `<!DOCTYPE html><html><head><title>Customer Info - ${cust.firstName} ${cust.lastName}</title>
<style>body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;max-width:900px;margin:0 auto;color:#333}.header{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #2c5530;padding-bottom:15px;margin-bottom:25px}.title{font-size:22px;font-weight:700;color:#2c5530}.subtitle{font-size:13px;color:#666}.cards{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:25px}.card{background:#f8f9fa;border:1px solid #ddd;border-radius:8px;padding:20px}.card h3{margin:0 0 12px;font-size:15px;color:#2c5530;border-bottom:1px solid #ddd;padding-bottom:8px}.row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee}.row:last-child{border-bottom:none}.label{font-size:12px;color:#888;text-transform:uppercase}.value{font-weight:600;font-size:14px}.map-link{display:inline-block;background:#2c5530;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;margin-bottom:15px}iframe{width:100%;height:400px;border:2px solid #ddd;border-radius:8px}@media print{body{padding:15px}iframe{height:300px}}</style></head><body>
<div class="header"><div><div class="title">${cust.firstName} ${cust.lastName}</div><div class="subtitle">Customer Info | Quote #${quoteNum} - ${homeDesc}</div></div><div style="text-align:right"><img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" style="height:35px"></div></div>
<div class="cards"><div class="card"><h3>Primary Contact</h3><div class="row"><span class="label">Name</span><span class="value">${cust.firstName} ${cust.lastName}</span></div><div class="row"><span class="label">Phone</span><span class="value"><a href="tel:${cust.phone}">${cust.phone || 'N/A'}</a></span></div>${cust.phone2 ? `<div class="row"><span class="label">Phone 2</span><span class="value"><a href="tel:${cust.phone2}">${cust.phone2}</a></span></div>` : ''}<div class="row"><span class="label">Email</span><span class="value"><a href="mailto:${cust.email}">${cust.email || 'N/A'}</a></span></div>${cust.email2 ? `<div class="row"><span class="label">Email 2</span><span class="value"><a href="mailto:${cust.email2}">${cust.email2}</a></span></div>` : ''}</div>
<div class="card"><h3>Job Site</h3><div class="row"><span class="label">Address</span><span class="value">${cust.siteAddress || 'N/A'}</span></div><div class="row"><span class="label">City / State</span><span class="value">${cust.siteCity || ''}, ${cust.siteState || ''} ${cust.siteZip || ''}</span></div>${cust.siteCounty ? `<div class="row"><span class="label">County</span><span class="value">${cust.siteCounty}</span></div>` : ''}</div></div>
<div style="margin-bottom:25px"><h3 style="font-size:15px;color:#2c5530;margin:0 0 10px;border-bottom:1px solid #ddd;padding-bottom:8px">Directions to Job Site</h3><a class="map-link" href="${custMapUrl}" target="_blank">Open in Google Maps</a><br><iframe src="${custMapEmbed}" allowfullscreen loading="lazy"></iframe></div>
<div style="text-align:center;color:#999;font-size:11px">Generated ${new Date().toLocaleDateString()}</div></body></html>`;
    const custInfoBlob = new Blob([custInfoHtml], { type: 'text/html' });
    const custInfoDataUrl = await blobToDataUrl(custInfoBlob, 'Customer Info Document');
    const custInfoFile = FolderUtils.createFileObject(
      `Customer Info - ${cust.firstName} ${cust.lastName}`,
      'pdf',
      custInfoDataUrl,
      `${fullAddress} | Quote #${quoteNum}`,
      userName
    );
    updatedFolders.crew_files = [...(updatedFolders.crew_files || []).filter(f => !f.name.startsWith('Customer Info')), custInfoFile];
    savedCount++;

    // 5. Floor Plan to Clayton Docs and Crew Files (if URL exists)
    if (floorPlanUrl) {
      const floorFile = FolderUtils.createFileObject(
        `Floor Plan - ${quote.homeModel} (Clayton Website)`,
        'link',
        floorPlanUrl,
        `${quote.houseWidth}'W \u00d7 ${quote.houseLength}'L ${quote.singleDouble} Wide`,
        userName
      );
      updatedFolders.clayton_docs = [...(updatedFolders.clayton_docs || []).filter(f => !f.name.startsWith('Floor Plan')), { ...floorFile, id: genId() }];
      updatedFolders.crew_files = [...(updatedFolders.crew_files || []).filter(f => !f.name.startsWith('Floor Plan')), { ...floorFile, id: genId() }];
      savedCount++;
    }

    // 6. Decor Checklist to Clayton Docs
    const additionalOptionsServices = ['lp_siding', 'tray_ceiling', 'full_backsplash', 'sets_of_drawers', 'meter_loop', 'drop_down_beam', 'lp_trim', 'amp_service_200'];
    const selectedAdditionalOptions = Object.entries(quote.selectedServices || {})
      .filter(([key, selected]) => selected && additionalOptionsServices.includes(key))
      .map(([key, _]) => {
        const svc = services[key];
        const qty = quote.serviceQuantities?.[key];
        const qtyText = qty && qty > 1 ? ` (\u00d7${qty})` : '';
        return svc ? `${svc.name}${qtyText}` : key;
      });
    if (quote.customOptions && quote.customOptions.length > 0) {
      quote.customOptions.forEach(co => {
        if (co.name) {
          selectedAdditionalOptions.push(`${co.name}${co.price ? ` ($${co.price})` : ''}`);
        }
      });
    }
    const foundationType = quote.foundationType || 'slab';
    const foundationNames = { none: 'Not selected', deck: 'Deck Piers', crawl: 'Crawl Space', crawlspace: 'Crawl Space', basement: 'Basement', slab: 'Engineered Slab' };
    const iBeamHeight = CalcHelpers.getBeamHeight(quote);

    const decorChecklistHtml = `<!DOCTYPE html><html><head><title>Decor Checklist - ${homeDesc}</title><style>body{font-family:'Segoe UI',Arial,sans-serif;padding:40px 30px;max-width:900px;margin:0 auto;color:#333;background:#fff}.header{text-align:center;border-bottom:3px solid #2c5530;padding-bottom:20px;margin-bottom:30px}.logo{margin-bottom:15px}.title{font-size:32px;font-weight:700;color:#2c5530;margin:10px 0}.subtitle{font-size:14px;color:#666;margin:5px 0}.section{margin-bottom:30px;page-break-inside:avoid}.section h2{font-size:18px;color:#2c5530;border-bottom:2px solid #2c5530;padding-bottom:8px;margin:0 0 15px;text-transform:uppercase}.form-row{margin-bottom:12px;display:flex;align-items:center;gap:10px}.form-label{font-size:13px;font-weight:600;color:#333;min-width:180px}input[type="text"]{border:none;border-bottom:2px solid #ccc;padding:6px 0;font-size:14px;flex:1;outline:none}input[type="text"]:focus{border-bottom-color:#2c5530}.radio-group{display:flex;gap:20px;align-items:center}.radio-group label{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer}.checkbox-group{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin:10px 0}.checkbox-group label{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer}.standards{background:#f8f9fa;padding:15px;border-left:4px solid #2c5530;margin:20px 0;font-size:12px}.standards ul{margin:8px 0;padding-left:20px}.standards li{padding:3px 0}.signature-section{margin-top:40px;display:grid;grid-template-columns:1fr 1fr;gap:30px}.signature-box{border-bottom:2px solid #333;padding-top:40px;position:relative}.signature-box label{position:absolute;top:0;font-size:12px;color:#666;font-weight:600}.footer{margin-top:40px;padding-top:20px;border-top:2px solid #ddd;text-align:center;color:#999;font-size:12px}@media print{body{padding:20px}.section{page-break-inside:avoid}}</style></head><body><div class="header"><div class="logo"><img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" style="height:50px"></div><div class="title">Modular/Manufactured Home Decor Checklist</div><div class="subtitle">Quote #${quoteNum}</div><div class="subtitle">Customer: ${cust.firstName} ${cust.lastName}</div><div class="subtitle">Address: ${cust.siteAddress}, ${cust.siteCity}, ${cust.siteState}</div></div><div style="margin-bottom:30px"><div class="form-row"><span class="form-label">Home Model:</span><input type="text" value="${quote.homeModel !== 'NONE' ? quote.homeModel : ''}" style="font-weight:700;font-size:16px"></div><div class="form-row"><span class="form-label">House Size:</span><input type="text" value="${quote.houseWidth}' \u00d7 ${quote.houseLength}' ${quote.singleDouble}" style="font-size:14px"></div><div class="form-row"><span class="form-label">I-Beam:</span><input type="text" value="${iBeamHeight}&quot;" style="font-size:14px"></div><div class="form-row"><span class="form-label">Foundation:</span><input type="text" value="${foundationNames[foundationType]}" style="font-size:14px"></div><div class="form-row"><span class="form-label">Drive Time:</span><input type="text" value="${quote.driveTime} mi" style="font-size:14px"></div></div><div class="section"><h2>Exterior</h2><div class="form-row"><span class="form-label">Siding Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Trim Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Shingles Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Accent Siding? (Circle One)</span><div class="radio-group"><label><input type="radio" name="accent"> Shakes</label><label><input type="radio" name="accent"> Board Batten</label><label style="flex:1">Color: <input type="text" value="" style="margin-left:10px"></label></div></div><div class="form-row"><span class="form-label">Add 20' Dormer</span><div class="radio-group"><label><input type="radio" name="dormer"> Yes</label><label><input type="radio" name="dormer"> No</label></div></div><div class="form-row"><span class="form-label">Add Siding Accent? (Circle One)</span><div class="radio-group"><label><input type="radio" name="sidingAccent"> No</label><label><input type="radio" name="sidingAccent"> Shakes</label><label><input type="radio" name="sidingAccent"> Board Batten</label><label><input type="radio" name="sidingAccent"> Siding</label></div></div><div class="form-row"><span class="form-label" style="visibility:hidden">_</span><span style="flex:1">Color: <input type="text" value="" style="margin-left:10px"></span></div><div class="form-row"><span class="form-label">Porch:</span><div class="radio-group"><label><input type="radio" name="porch"> 6'</label><label><input type="radio" name="porch"> 8'</label><label><input type="radio" name="porch"> 10'</label><label><input type="radio" name="porch"> No</label><span style="margin-left:20px">Railing Color:</span><label><input type="radio" name="railing"> Black</label><label><input type="radio" name="railing"> White</label></div></div></div><div class="section"><h2>Kitchen (Samsung)</h2><div class="form-row"><span class="form-label">Floor Type (Circle One):</span><div class="radio-group"><label><input type="radio" name="kitchen_floor"> Vinyl</label><label><input type="radio" name="kitchen_floor"> Hardwood</label></div></div><div class="form-row"><span class="form-label">Cabinets Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Countertop Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Backsplash Color:</span><input type="text" value=""></div></div><div class="section"><h2>Flooring</h2><div class="form-row"><span class="form-label">Carpet Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Lino Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Whole Home Lino?</span><div class="radio-group"><label><input type="radio" name="wholeHomeLino"> Yes</label><label><input type="radio" name="wholeHomeLino"> No</label></div></div></div><div class="section"><h2>Bathrooms</h2><div class="form-row"><span class="form-label">Shower Type:</span><div class="radio-group"><label><input type="radio" name="shower"> Inert</label><label><input type="radio" name="shower"> Walk In</label></div></div><div class="form-row"><span class="form-label">Shower Tile:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Vanity Cabinet Color:</span><input type="text" value=""></div><div class="form-row"><span class="form-label">Vanity Countertop Color:</span><input type="text" value=""></div></div><div class="section"><h2>Notes / Upgrades</h2><p style="font-size:12px;color:#666;margin:0 0 10px">Include locations: <strong>Faucets, Outlets</strong> in or out, <strong>Additional Can Lights</strong> on layout.</p><textarea style="width:100%;min-height:100px;border:2px solid #ccc;padding:10px;font-family:inherit;font-size:13px;border-radius:4px;outline:none" placeholder="Enter notes here..."></textarea></div>${selectedAdditionalOptions.length > 0 ? `<div class="standards"><h3 style="margin:0 0 10px;font-size:14px;color:#2c5530">Additional Options</h3><ul>${selectedAdditionalOptions.map(opt => `<li>${opt}</li>`).join('')}</ul></div>` : ''}<div class="signature-section"><div class="signature-box"><label>Customer Signature:</label></div><div class="signature-box"><label>Rep:</label></div></div><div class="footer"><p><strong>Sherman Pole Buildings</strong></p><p>2244 Hwy 65, Mora, MN 55051 | (320) 679-3438</p><p>Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p></div></body></html>`;

    const decorChecklistBlob = new Blob([decorChecklistHtml], { type: 'text/html' });
    const decorChecklistDataUrl = await blobToDataUrl(decorChecklistBlob, 'Decor Checklist Document');
    const decorChecklistFile = FolderUtils.createFileObject(
      `Decor Checklist - ${homeDesc}`,
      'pdf',
      decorChecklistDataUrl,
      `Quote #${quoteNum} | ${quote.houseWidth}' \u00d7 ${quote.houseLength}' | ${foundationNames[foundationType]}`,
      userName
    );
    updatedFolders.clayton_docs = [...(updatedFolders.clayton_docs || []).filter(f => !f.name.startsWith('Decor Checklist')), decorChecklistFile];
    savedCount++;

    // 7. Crew Work Order to Crew Files
    const crewDoc = generateCrewWorkOrderDocument(quote, cust, services);
    const crewBlob = new Blob([crewDoc], { type: 'text/html' });
    const crewDataUrl = await blobToDataUrl(crewBlob, 'Crew Work Order');
    const crewFile = FolderUtils.createFileObject(
      `Crew Work Order - ${homeDesc}`,
      'crew_work_order',
      crewDataUrl,
      `Quote #${quoteNum} - Internal use only`,
      userName
    );
    updatedFolders.crew_files = [...(updatedFolders.crew_files || []).filter(f => !f.name.startsWith('Crew Work Order')), crewFile];
    savedCount++;

    // 8. Scope of Work to Customer Docs
    const scopeDoc = generateScopeOfWorkDocument(quote, cust, services);
    const scopeBlob = new Blob([scopeDoc], { type: 'text/html' });
    const scopeDataUrl = await blobToDataUrl(scopeBlob, 'Scope of Work');
    const scopeFile = FolderUtils.createFileObject(
      `Scope of Work - ${homeDesc}`,
      'scope_of_work',
      scopeDataUrl,
      `Quote #${quoteNum} | ${cust.firstName} ${cust.lastName}`,
      userName
    );
    updatedFolders.change_orders = [...(updatedFolders.change_orders || []).filter(f => !f.name.startsWith('Scope of Work') && !f.name.startsWith('Scope_of_Work')), scopeFile];
    savedCount++;

    // Deduplicate all folders - keep only the latest version of each file by name
    const dedup = (files) => {
      const seen = new Map();
      // Iterate in reverse so earlier (older) entries get overwritten by later (newer) ones
      for (const file of files) {
        seen.set(file.name, file);
      }
      return Array.from(seen.values());
    };
    Object.keys(updatedFolders).forEach(folderId => {
      updatedFolders[folderId] = dedup(updatedFolders[folderId] || []);
    });

    // Save using autoSaveFileToFolders helper (handles both quotes and contracts)
    const updatedItem = { ...quote, folders: updatedFolders };
    const isInQuotes = quotes.find(q => q.id === quote.id);
    const isInContracts = contracts.find(c => c.id === quote.id);

    if (isInQuotes) {
      const updatedQuotes = quotes.map(q => q.id === quote.id ? updatedItem : q);
      await saveQuotes(updatedQuotes);
      if (selQuote?.id === quote.id) setSelQuote(updatedItem);
    } else if (isInContracts) {
      const updatedContracts = contracts.map(c => c.id === quote.id ? updatedItem : c);
      await saveContracts(updatedContracts);
      if (selContract?.id === quote.id) setSelContract(updatedItem);
    }

    NotificationSystem.success(`Saved ${savedCount} documents to folders!${!floorPlanUrl ? '\n\u26a0\ufe0f No floor plan URL - add one in Pricing > Homes.' : ''}`);
    } catch (error) {
      console.error('Save All Docs Error:', error);
      alert('Error updating files: ' + error.message);
    }
  };

  // Return all saver functions
  return {
    autoSaveFileToFolders,
    saveQuoteToFolder,
    savePierLayoutToFolder,
    saveMaterialListToFolder,
    saveDecorChecklistToFolder,
    saveCustomerInfoToFolder,
    saveFloorPlanToFolders,
    saveScopeOfWorkToFolders,
    saveCrewWorkOrderToFolders,
    saveAllowanceProgressToFolders,
    saveLatestChangeOrderToFolders,
    saveAllDocsToFolders,
  };
};
