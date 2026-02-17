import React from 'react';
import { fmt, DocumentUtils } from '../../utils/index.js';
import { ALLOWANCE_ITEMS, HOME_OPTIONS, DEFAULT_SERVICES } from '../../constants/index.js';

/**
 * CustomerQuoteTab - The "Customer Quote" / "Customer Contract" tab.
 * Shows a printable quote document with services, pricing, terms.
 */
const CustomerQuoteTab = ({
  S, currentItem, custForQuote, totals,
  homeModels,
}) => {
  const servicesList = [];
  const homeSpecAdditions = [];
  const allowances = [];

  // Get floor plan URL
  const selectedHome = homeModels?.find(m => m.name === currentItem.homeModel);
  const floorPlanUrl = selectedHome?.floorPlanUrl || '';

  // Collect services
  Object.entries(currentItem.selectedServices || {}).forEach(([k, sel]) => {
    if (sel && DEFAULT_SERVICES[k]) {
      const name = DEFAULT_SERVICES[k].name;
      if (ALLOWANCE_ITEMS.includes(k)) {
        allowances.push({ name, key: k });
      } else if (HOME_OPTIONS.includes(k)) {
        homeSpecAdditions.push(name);
      } else {
        servicesList.push(name);
      }
    }
  });

  // Add allowances
  if (currentItem.sewerType && currentItem.sewerType !== 'none') {
    allowances.push({ name: `Sewer System (${currentItem.sewerType.replace('_', ' ')})`, key: 'sewer' });
  }
  if (parseFloat(currentItem.wellDepth) > 0) {
    allowances.push({ name: `Well Drilling (${currentItem.wellDepth} ft)`, key: 'well' });
  }

  // Add other services
  if (currentItem.patioSize && currentItem.patioSize !== 'none') servicesList.push(`Patio (${currentItem.patioSize} ft)`);
  (currentItem.customServices || []).forEach(cs => { if (cs.name) servicesList.push(cs.name); });

  const today = DocumentUtils.formatDate();
  const validUntil = DocumentUtils.formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const quoteNum = DocumentUtils.getQuoteNum(currentItem);

  return (
    <div style={{ maxWidth: 850, margin: '0 auto', background: '#fff', padding: 40, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #2c5530', paddingBottom: 20, marginBottom: 30 }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 'bold', color: '#2c5530' }}>Sherman Pole Buildings</div>
          <div style={{ fontSize: 14, color: '#666' }}>Quality Erections Since 1976</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 13, color: '#666' }}>
          <div>2244 Hwy 65</div>
          <div>Mora, MN 55051</div>
          <div>(320) 679-3438</div>
        </div>
      </div>

      {/* Quote Title */}
      <div style={{ background: '#2c5530', color: 'white', padding: '15px 25px', fontSize: 24, fontWeight: 'bold', marginBottom: 25 }}>
        Project Quote
      </div>

      {/* Quote Meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30, gap: 20 }}>
        <div style={{ background: '#f8f9fa', padding: '15px 20px', borderRadius: 8, flex: 1 }}>
          <div style={{ fontSize: 12, color: '#666', textTransform: 'uppercase', marginBottom: 5 }}>Quote #</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{quoteNum}</div>
        </div>
        <div style={{ background: '#f8f9fa', padding: '15px 20px', borderRadius: 8, flex: 1 }}>
          <div style={{ fontSize: 12, color: '#666', textTransform: 'uppercase', marginBottom: 5 }}>Date</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{today}</div>
        </div>
        <div style={{ background: '#f8f9fa', padding: '15px 20px', borderRadius: 8, flex: 1 }}>
          <div style={{ fontSize: 12, color: '#666', textTransform: 'uppercase', marginBottom: 5 }}>Valid Until</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{validUntil}</div>
        </div>
      </div>

      {/* Customer Info */}
      <div style={{ marginBottom: 30 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#2c5530', borderBottom: '2px solid #e0e0e0', paddingBottom: 8, marginBottom: 15 }}>Customer Information</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
          <div>
            <div style={{ fontSize: 12, color: '#666' }}>Customer</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{custForQuote.firstName} {custForQuote.lastName}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#666' }}>Phone</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{custForQuote.phone}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#666' }}>Email</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{custForQuote.email}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#666' }}>Site Address</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{custForQuote.siteAddress}, {custForQuote.siteCity}, {custForQuote.siteState} {custForQuote.siteZip}</div>
          </div>
        </div>
      </div>

      {/* Home Specs */}
      {currentItem.homeModel && currentItem.homeModel !== 'NONE' && (
        <div style={{ background: 'linear-gradient(135deg, #2c5530, #1a3a1f)', color: 'white', padding: 20, borderRadius: 8, marginBottom: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{currentItem.homeModel}</div>
          <div style={{ opacity: 0.9, marginTop: 5 }}>{currentItem.houseWidth}' {'\u00D7'} {currentItem.houseLength}' {currentItem.singleDouble} Wide</div>
        </div>
      )}

      {/* Floor Plan Link */}
      {floorPlanUrl && (
        <div style={{ marginBottom: 30 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#2c5530', borderBottom: '2px solid #e0e0e0', paddingBottom: 8, marginBottom: 15 }}>Floor Plan</div>
          <a href={floorPlanUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1565c0', textDecoration: 'none' }}>View Floor Plan on Clayton Homes Website {'\u2192'}</a>
        </div>
      )}

      {/* Services */}
      {servicesList.length > 0 && (
        <div style={{ marginBottom: 30 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#2c5530', borderBottom: '2px solid #e0e0e0', paddingBottom: 8, marginBottom: 15 }}>Professional Services</div>
          <ul style={{ listStyle: 'none' }}>
            {servicesList.map((s, i) => (
              <li key={i} style={{ padding: '10px 15px', background: '#f8f9fa', marginBottom: 8, borderRadius: 6, borderLeft: '4px solid #2c5530' }}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Home Spec Additions */}
      {homeSpecAdditions.length > 0 && (
        <div style={{ marginBottom: 30 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#2c5530', borderBottom: '2px solid #e0e0e0', paddingBottom: 8, marginBottom: 15 }}>Home Spec Additions</div>
          <ul style={{ listStyle: 'none' }}>
            {homeSpecAdditions.map((s, i) => (
              <li key={i} style={{ padding: '10px 15px', background: '#f8f9fa', marginBottom: 8, borderRadius: 6, borderLeft: '4px solid #2c5530' }}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Total */}
      <div style={{ background: '#f8f9fa', border: '2px solid #2c5530', borderRadius: 8, padding: 25, marginTop: 30 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#2c5530', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Total Project Price:</span>
          <span>{fmt(totals.total)}</span>
        </div>
      </div>

      {/* Allowances Note */}
      {allowances.length > 0 && (
        <div style={{ marginTop: 30, padding: 20, background: '#fff3cd', borderRadius: 8, fontSize: 14 }}>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>{'\u{1F4CB}'} Allowances Included:</div>
          <ul style={{ marginLeft: 20 }}>
            {allowances.map((a, i) => (
              <li key={i}>{a.name} - Final cost may vary based on actual requirements</li>
            ))}
          </ul>
        </div>
      )}

      {/* Terms */}
      <div style={{ marginTop: 40, padding: 20, background: '#fff9e6', borderRadius: 8, fontSize: 13 }}>
        <div style={{ fontWeight: 600, marginBottom: 10 }}>Payment Terms & Conditions:</div>
        <ul style={{ marginLeft: 20 }}>
          <li>50% deposit required to schedule installation</li>
          <li>Final payment due upon completion</li>
          <li>Quote valid for 30 days from issue date</li>
          <li>Installation timeline subject to weather and site conditions</li>
        </ul>
      </div>

      {/* Signature Section */}
      <div style={{ marginTop: 50, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 50 }}>
        <div style={{ borderTop: '2px solid #333', paddingTop: 10 }}>
          <div style={{ fontSize: 12, color: '#666' }}>Customer Signature</div>
        </div>
        <div style={{ borderTop: '2px solid #333', paddingTop: 10 }}>
          <div style={{ fontSize: 12, color: '#666' }}>Date</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 50, textAlign: 'center', fontSize: 12, color: '#666', borderTop: '1px solid #e0e0e0', paddingTop: 20 }}>
        Sherman Pole Buildings {'\u2022'} 2244 Hwy 65, Mora, MN 55051 {'\u2022'} (320) 679-3438
        <div style={{ marginTop: 5 }}>Quality Erections Since 1976</div>
      </div>
    </div>
  );
};

export default CustomerQuoteTab;
