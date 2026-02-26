/**
 * Customer Portal View
 * Displays customer profile, active jobs with live budget tracker, quotes, and notes
 */

import React from 'react';
import { CalcHelpers } from '../../utils/CalcHelpers.js';
import { fmt } from '../../utils/helpers.js';
import { ALLOWANCE_ITEMS, QUOTE_TYPES } from '../../constants/index.js';

const CustomerPortal = ({
  customerData,
  quotes,
  services,
  materials,
  sewerPricing,
  patioPricing,
  driveRates,
  foundationPricing,
  homeModels,
  onLogout,
  onGenerateQuote,
  fmtDate,
  styles: S
}) => {
  const allCustomerQuotes = quotes.filter(q => q.customerId === customerData.id);
  const activeStatuses = ['Accepted', 'Under Contract', 'Completed'];
  const activeJobs = allCustomerQuotes.filter(q => activeStatuses.includes(q.status));
  const sentQuotes = allCustomerQuotes.filter(q => q.status === 'Sent');
  const hasActiveJobs = activeJobs.length > 0;

  // Collect all published customer notes from ALL customer quotes
  const allNotes = [];
  allCustomerQuotes.forEach(q => {
    Object.keys(q.selectedServices || {}).forEach(serviceKey => {
      if (q.selectedServices[serviceKey] && q.publishedServiceNotes?.[serviceKey]?.length > 0) {
        const serviceName = services[serviceKey]?.name || serviceKey;
        q.publishedServiceNotes[serviceKey].forEach(note => {
          allNotes.push({
            quoteId: q.id,
            homeModel: q.homeModel !== 'NONE' ? q.homeModel : `${q.houseWidth}' × ${q.houseLength}'`,
            serviceName,
            text: note.text,
            publishedAt: note.publishedAt,
            publishedBy: note.publishedBy
          });
        });
      }
    });

    // Notes for sewer
    if (q.sewerType && q.sewerType !== 'none' && q.publishedServiceNotes?.sewer?.length > 0) {
      q.publishedServiceNotes.sewer.forEach(note => {
        allNotes.push({
          quoteId: q.id,
          homeModel: q.homeModel !== 'NONE' ? q.homeModel : `${q.houseWidth}' × ${q.houseLength}'`,
          serviceName: 'Sewer System',
          text: note.text,
          publishedAt: note.publishedAt,
          publishedBy: note.publishedBy
        });
      });
    }

    // Notes for well
    if (parseFloat(q.wellDepth) > 0 && q.publishedServiceNotes?.well?.length > 0) {
      q.publishedServiceNotes.well.forEach(note => {
        allNotes.push({
          quoteId: q.id,
          homeModel: q.homeModel !== 'NONE' ? q.homeModel : `${q.houseWidth}' × ${q.houseLength}'`,
          serviceName: 'Well Drilling',
          text: note.text,
          publishedAt: note.publishedAt,
          publishedBy: note.publishedBy
        });
      });
    }
  });

  const mergeQuoteWithCustomer = (q) => ({
    ...q,
    customerFirstName: customerData.firstName,
    customerLastName: customerData.lastName,
    phone: customerData.phone,
    email: customerData.email,
    siteAddress: customerData.siteAddress,
    siteCity: customerData.siteCity,
    siteState: customerData.siteState,
    siteZip: customerData.siteZip,
    person2FirstName: customerData.person2FirstName,
    person2LastName: customerData.person2LastName,
    phone2: customerData.phone2,
    email2: customerData.email2,
    mailingAddress: customerData.mailingAddress,
    mailingCity: customerData.mailingCity,
    mailingState: customerData.mailingState,
    mailingZip: customerData.mailingZip
  });

  const renderBudgetTracker = (q, t) => {
    const allowanceItems = [];

    Object.entries(q.selectedServices || {}).forEach(([key, selected]) => {
      if (selected && ALLOWANCE_ITEMS.includes(key)) {
        const svc = t.svc.find(s => s.key === key);
        const contractPrice = svc?.cost || 0;
        const actualCost = q.scrubbCosts?.[key] || 0;
        const variance = actualCost > 0 ? contractPrice - actualCost : 0;
        allowanceItems.push({ key, name: services[key]?.name || key, contractPrice, actualCost, variance });
      }
    });

    if (q.sewerType && q.sewerType !== 'none') {
      const sewerSvc = t.svc.find(s => s.key === 'sewer');
      const contractPrice = sewerSvc?.cost || 0;
      const actualCost = q.scrubbCosts?.sewer || 0;
      const variance = actualCost > 0 ? contractPrice - actualCost : 0;
      allowanceItems.push({ key: 'sewer', name: 'Sewer System', contractPrice, actualCost, variance });
    }

    if (parseFloat(q.wellDepth) > 0) {
      const wellSvc = t.svc.find(s => s.key === 'well');
      const contractPrice = wellSvc?.cost || 0;
      const actualCost = q.scrubbCosts?.well || 0;
      const variance = actualCost > 0 ? contractPrice - actualCost : 0;
      allowanceItems.push({ key: 'well', name: 'Well Drilling', contractPrice, actualCost, variance });
    }

    if (allowanceItems.length === 0) return null;

    const totalAllowances = allowanceItems.reduce((sum, item) => sum + item.contractPrice, 0);
    const contingency = t.contingency || 0;
    const startingBalance = totalAllowances + contingency;
    const allowanceSavings = allowanceItems.filter(item => item.variance > 0).reduce((sum, item) => sum + item.variance, 0);
    const allowanceOverages = allowanceItems.filter(item => item.variance < 0).reduce((sum, item) => sum + Math.abs(item.variance), 0);
    const netVariance = allowanceSavings - allowanceOverages;
    const contingencyPaymentsTotal = (q.scrubbPayments || []).filter(p => p.isContingencyPayment).reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
    const runningBalance = startingBalance + netVariance - contingencyPaymentsTotal;

    return (
      <div style={{ background: 'linear-gradient(135deg, #fff9e6, #fff3e0)', border: '2px solid #ffc107', borderRadius: 8, padding: 16, marginTop: 16, marginBottom: 16 }}>
        <h4 style={{ margin: '0 0 12px', color: '#856404', fontSize: 15 }}>💰 Live Budget Tracker</h4>

        {/* Starting Balance */}
        <div style={{ background: '#fff', padding: 12, borderRadius: 6, marginBottom: 12, fontSize: 13 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontWeight: 600, color: '#856404' }}>Starting Allowances</span>
            <span style={{ fontWeight: 700, color: '#856404' }}>{fmt(totalAllowances)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 6, borderTop: '1px solid #ffe0b2' }}>
            <span style={{ fontWeight: 600, color: '#1565c0' }}>Contingency</span>
            <span style={{ fontWeight: 700, color: '#1565c0' }}>+ {fmt(contingency)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTop: '2px solid #ffc107' }}>
            <span style={{ fontWeight: 700, color: '#2c5530' }}>Starting Balance</span>
            <span style={{ fontWeight: 700, color: '#2c5530' }}>{fmt(startingBalance)}</span>
          </div>
        </div>

        {/* Allowance Items */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#856404', marginBottom: 8 }}>Allowance Items:</div>
          {allowanceItems.map(item => {
            const publishedNotes = q.publishedServiceNotes?.[item.key] || [];
            return (
              <div key={item.key} style={{ background: '#fff', padding: 8, borderRadius: 4, marginBottom: 6, fontSize: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600 }}>{item.name}</span>
                  {item.variance !== 0 && (
                    <span style={{ fontWeight: 700, color: item.variance > 0 ? '#2e7d32' : '#d32f2f' }}>
                      {item.variance > 0 ? '+' : ''}{fmt(item.variance)}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#666', marginBottom: publishedNotes.length > 0 ? 8 : 0 }}>
                  <span>Budget: {fmt(item.contractPrice)}</span>
                  <span>Actual: {item.actualCost > 0 ? fmt(item.actualCost) : 'Pending'}</span>
                </div>
                {publishedNotes.length > 0 && (
                  <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: 8 }}>
                    {publishedNotes.map((note, idx) => (
                      <div key={idx} style={{ background: '#f8f9fa', padding: 6, borderRadius: 4, marginBottom: idx < publishedNotes.length - 1 ? 4 : 0, borderLeft: '3px solid #1565c0' }}>
                        <div style={{ fontSize: 11, color: '#333', marginBottom: 2 }}>{note.text}</div>
                        <div style={{ fontSize: 9, color: '#999' }}>
                          {new Date(note.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} by {note.publishedBy}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final Running Balance */}
        <div style={{ background: runningBalance >= startingBalance ? '#e8f5e9' : '#ffebee', padding: 14, borderRadius: 6, border: `2px solid ${runningBalance >= startingBalance ? '#2e7d32' : '#d32f2f'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>Final Balance</div>
              <div data-testid="portal-contingency-balance" style={{ fontSize: 20, fontWeight: 700, color: runningBalance >= startingBalance ? '#2e7d32' : '#d32f2f' }}>
                {fmt(runningBalance)}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>Net Change</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: netVariance >= 0 ? '#2e7d32' : '#d32f2f' }}>
                {netVariance > 0 ? '+' : ''}{fmt(netVariance)}
              </div>
            </div>
          </div>
          {contingencyPaymentsTotal > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 12, color: '#e65100' }}>
              <span>Contingency Draws Applied</span>
              <span style={{ fontWeight: 600 }}>- {fmt(contingencyPaymentsTotal)}</span>
            </div>
          )}
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${runningBalance >= startingBalance ? '#a5d6a7' : '#ef9a9a'}`, fontSize: 11, color: '#666' }}>
            {netVariance > 0 && contingencyPaymentsTotal === 0 && `✓ Under budget - You'll receive back ${fmt(runningBalance)} at completion`}
            {netVariance > 0 && contingencyPaymentsTotal > 0 && `✓ Under budget - Estimated return at completion: ${fmt(runningBalance)}`}
            {netVariance < 0 && `⚠ Over budget - Drawing ${fmt(Math.abs(netVariance))} from contingency`}
            {netVariance === 0 && contingencyPaymentsTotal === 0 && '• Tracking in progress'}
            {netVariance === 0 && contingencyPaymentsTotal > 0 && `• ${fmt(contingencyPaymentsTotal)} drawn from contingency fund`}
          </div>
        </div>
      </div>
    );
  };

  const renderProjectNotes = (q) => {
    const notes = [];
    Object.keys(q.selectedServices || {}).forEach(serviceKey => {
      if (q.selectedServices[serviceKey] && q.publishedServiceNotes?.[serviceKey]?.length > 0) {
        const serviceName = services[serviceKey]?.name || serviceKey;
        q.publishedServiceNotes[serviceKey].forEach(note => {
          notes.push({ serviceName, text: note.text, publishedAt: note.publishedAt, publishedBy: note.publishedBy });
        });
      }
    });

    if (q.sewerType && q.sewerType !== 'none' && q.publishedServiceNotes?.sewer?.length > 0) {
      q.publishedServiceNotes.sewer.forEach(note => {
        notes.push({ serviceName: 'Sewer System', text: note.text, publishedAt: note.publishedAt, publishedBy: note.publishedBy });
      });
    }

    if (parseFloat(q.wellDepth) > 0 && q.publishedServiceNotes?.well?.length > 0) {
      q.publishedServiceNotes.well.forEach(note => {
        notes.push({ serviceName: 'Well Drilling', text: note.text, publishedAt: note.publishedAt, publishedBy: note.publishedBy });
      });
    }

    if (notes.length === 0) return null;

    return (
      <div data-testid="portal-project-notes" style={{ background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', border: '2px solid #1565c0', borderRadius: 8, padding: 16, marginTop: 16 }}>
        <h4 style={{ margin: '0 0 12px', color: '#1565c0', fontSize: 15 }}>📋 Important Project Information</h4>
        {notes.map((note, idx) => (
          <div key={idx} style={{ background: '#fff', padding: 10, borderRadius: 6, marginBottom: 8, borderLeft: '4px solid #1565c0' }}>
            <div style={{ fontWeight: 600, color: '#2c5530', marginBottom: 4, fontSize: 13 }}>{note.serviceName}</div>
            <div style={{ color: '#333', marginBottom: 4, fontSize: 12, lineHeight: 1.5 }}>{note.text}</div>
            <div style={{ fontSize: 10, color: '#999' }}>
              {new Date(note.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} by {note.publishedBy}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderQuoteCard = (q, isActive = false) => {
    const t = CalcHelpers.calculateQuoteTotals(q, customerData, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing);
    const qType = QUOTE_TYPES.find(qt => qt.id === q.quoteType) || QUOTE_TYPES[0];
    const selectedHome = homeModels.find(m => m.name === q.homeModel);
    const floorPlanUrl = selectedHome?.floorPlanUrl;

    if (isActive) {
      const statusColors = {
        'Accepted': { bg: '#d1e7dd', text: '#0f5132', label: '✅ Accepted' },
        'Under Contract': { bg: '#cfe2ff', text: '#084298', label: '📝 Under Contract' },
        'Completed': { bg: '#d3d3d3', text: '#333', label: '🎉 Completed' },
      };
      const statusStyle = statusColors[q.status] || { bg: '#e9ecef', text: '#333', label: q.status };

      return (
        <div key={q.id} style={{ ...S.box, background: '#f0f7f1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: '#666' }}>{qType.icon} {qType.name}</div>
            <span style={{ ...S.badge, background: statusStyle.bg, color: statusStyle.text }}>{statusStyle.label}</span>
          </div>
          <h3 style={{ margin: '0 0 8px' }}>{q.homeModel !== 'NONE' ? q.homeModel : `${q.houseWidth}' × ${q.houseLength}'`}</h3>
          <p style={{ fontSize: 14, color: '#666', margin: '0 0 8px' }}>{q.houseWidth}' × {q.houseLength}' {q.singleDouble} Wide</p>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#2c5530', margin: '16px 0' }}>{t ? fmt(t.total) : '-'}</div>

          {renderBudgetTracker(q, t)}
          {renderProjectNotes(q)}

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              style={{ ...S.btn, background: '#2c5530', flex: 1 }}
              onClick={() => onGenerateQuote(mergeQuoteWithCustomer(q), t, homeModels)}
            >
              📄 View Quote
            </button>
            {floorPlanUrl && (
              <a
                href={floorPlanUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...S.btn, background: '#1565c0', flex: 1, textAlign: 'center', textDecoration: 'none' }}
              >
                🏠 Floor Plan & Photos
              </a>
            )}
          </div>
        </div>
      );
    }

    // Sent quote card
    return (
      <div key={q.id} style={{ ...S.box, background: '#f8f9fa' }}>
        <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>{qType.icon} {qType.name}</div>
        <h3 style={{ margin: '0 0 8px' }}>{q.homeModel !== 'NONE' ? q.homeModel : `${q.houseWidth}' × ${q.houseLength}'`}</h3>
        <p style={{ fontSize: 14, color: '#666', margin: '0 0 8px' }}>{q.houseWidth}' × {q.houseLength}' {q.singleDouble} Wide</p>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#1565c0', margin: '16px 0' }}>{t ? fmt(t.total) : '-'}</div>
        <p style={{ fontSize: 12, color: '#666', margin: '0 0 16px' }}>Quote Date: {fmtDate(q.createdAt)}</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            style={{ ...S.btn, background: '#1565c0', flex: 1 }}
            onClick={() => onGenerateQuote(mergeQuoteWithCustomer(q), t, homeModels)}
          >
            📄 View Full Quote
          </button>
          {floorPlanUrl && (
            <a
              href={floorPlanUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...S.btn, background: '#2c5530', flex: 1, textAlign: 'center', textDecoration: 'none' }}
            >
              🏠 Floor Plan & Photos
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={S.app}>
      <header style={{ ...S.header, background: '#1565c0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" alt="" style={{ height: 32 }} />
          <span style={{ fontWeight: 600 }}>Customer Portal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>Welcome, {customerData.firstName}!</span>
          <button style={S.nav} onClick={onLogout}>Sign Out</button>
        </div>
      </header>

      <div style={S.main}>
        <h1 style={{ margin: '0 0 24px' }}>👋 Hello, {customerData.firstName} {customerData.lastName}</h1>

        {/* Profile */}
        <div style={S.grid}>
          <div style={{ ...S.box, gridColumn: 'span 2' }}>
            <h2 style={{ marginTop: 0, borderBottom: '2px solid #1565c0', paddingBottom: 8, color: '#1565c0' }}>📋 Your Profile</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <h4 style={{ margin: '0 0 12px', color: '#666' }}>Contact Information</h4>
                <p><strong>{customerData.firstName} {customerData.lastName}</strong></p>
                {customerData.person2FirstName && <p style={{ color: '#666' }}>& {customerData.person2FirstName} {customerData.person2LastName}</p>}
                <p>📞 {customerData.phone}{customerData.phone2 && ` / ${customerData.phone2}`}</p>
                <p>✉️ {customerData.email}</p>
                {customerData.email2 && <p>✉️ {customerData.email2}</p>}
              </div>
              <div>
                <h4 style={{ margin: '0 0 12px', color: '#666' }}>Site Address</h4>
                <p>{customerData.siteAddress}</p>
                <p>{customerData.siteCity}, {customerData.siteState} {customerData.siteZip}</p>
                {customerData.siteCounty && <p style={{ color: '#666' }}>County: {customerData.siteCounty}</p>}
                {customerData.mailingAddress && (
                  <>
                    <h4 style={{ margin: '16px 0 12px', color: '#666' }}>Mailing Address</h4>
                    <p>{customerData.mailingAddress}</p>
                    <p>{customerData.mailingCity}, {customerData.mailingState} {customerData.mailingZip}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Special Notes */}
        {allNotes.length > 0 && (
          <div style={{ ...S.box, marginTop: 24, background: 'linear-gradient(135deg, #fff9e6, #fff3e0)', border: '3px solid #ffc107' }}>
            <h2 style={{ marginTop: 0, borderBottom: '2px solid #ffc107', paddingBottom: 8, color: '#856404' }}>📌 Special Notes</h2>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>Important information about your project from our team:</p>
            {allNotes.map((note, idx) => (
              <div key={idx} style={{ background: '#fff', padding: 12, borderRadius: 6, marginBottom: 12, borderLeft: '4px solid #ffc107' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#2c5530', fontSize: 14 }}>{note.serviceName}</div>
                    <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{note.homeModel}</div>
                  </div>
                  <div style={{ fontSize: 10, color: '#999', textAlign: 'right' }}>
                    {new Date(note.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}<br/>
                    by {note.publishedBy}
                  </div>
                </div>
                <div style={{ color: '#333', fontSize: 13, lineHeight: 1.5 }}>{note.text}</div>
              </div>
            ))}
          </div>
        )}

        {/* Active Jobs */}
        {hasActiveJobs && (
          <div style={{ ...S.box, marginTop: 24, borderLeft: '4px solid #2c5530' }}>
            <h2 style={{ marginTop: 0, borderBottom: '2px solid #2c5530', paddingBottom: 8, color: '#2c5530' }}>
              🏗️ Your Active Project{activeJobs.length > 1 ? 's' : ''}
            </h2>
            <div style={S.grid}>
              {activeJobs.map(q => renderQuoteCard(q, true))}
            </div>
          </div>
        )}

        {/* Sent Quotes (only when no active jobs) */}
        {!hasActiveJobs && (
          <div style={{ ...S.box, marginTop: 24 }}>
            <h2 style={{ marginTop: 0, borderBottom: '2px solid #1565c0', paddingBottom: 8, color: '#1565c0' }}>📄 Your Quotes</h2>
            {sentQuotes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#666' }}>
                <p style={{ fontSize: 18 }}>No published quotes yet</p>
                <p style={{ fontSize: 14 }}>When your sales representative sends you a quote, it will appear here.</p>
              </div>
            ) : (
              <div style={S.grid}>
                {sentQuotes.map(q => renderQuoteCard(q, false))}
              </div>
            )}
          </div>
        )}

        {/* Building Humor */}
        <div style={{ ...S.box, marginTop: 24, background: '#fff9e6', textAlign: 'center', borderLeft: '4px solid #ffc107' }}>
          <h3 style={{ margin: '0 0 8px', color: '#f57c00' }}>😄 Building Humor</h3>
          <p style={{ margin: 0, color: '#555', fontStyle: 'italic' }}>
            Why did the modular home break up with the stick-built house?<br/>
            Because it was tired of all the <strong>framing</strong> and wanted a relationship that could move faster! 🏠
          </p>
        </div>

        {/* Contact Info */}
        <div style={{ ...S.box, marginTop: 24, background: '#f0f7f1', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 8px', color: '#2c5530' }}>Questions about your {hasActiveJobs ? 'project' : 'quote'}?</h3>
          <p style={{ margin: 0, color: '#666' }}>
            Contact Sherman Pole Buildings at <strong>(320) 679-3438</strong> or visit us at <strong>2244 Hwy 65, Mora, MN 55051</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;
