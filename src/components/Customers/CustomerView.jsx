/**
 * Customer View Component
 * Displays customer profile, contact info, and their quotes/contracts list
 */

import React from 'react';
import { CalcHelpers } from '../../utils/CalcHelpers.js';
import { fmt } from '../../utils/helpers.js';
import { QUOTE_TYPES, MIN_MILES } from '../../constants/index.js';

const CustomerView = ({
  selCustomer,
  quotes,
  contracts,
  customers,
  services,
  materials,
  sewerPricing,
  patioPricing,
  driveRates,
  foundationPricing,
  isAdmin,
  showNewQuoteMenu,
  setShowNewQuoteMenu,
  fmtDate,
  fmtDateTime,
  onBack,
  onEditCustomer,
  onDeleteCustomer,
  onNewQuote,
  onViewQuote,
  onEditQuote,
  onStartChangeOrder,
  onDeleteQuote,
  onUpdateStatus,
  emptyQuote,
  styles: S
}) => {
  const custQuotes = quotes.filter(q => q.customerId === selCustomer.id);
  const allCustContracts = contracts.filter(c => c.customerId === selCustomer.id);
  const custContracts = allCustContracts.filter(c => c.status !== 'Cancelled');
  const cancelledContracts = allCustContracts.filter(c => c.status === 'Cancelled');

  // Sort within sections: status priority, then newest first
  const CONTRACT_PRIORITY = { 'Completed': 0, 'Under Contract': 1, 'Accepted': 2 };
  const QUOTE_PRIORITY = { 'Sent': 0, 'Draft': 1, 'Declined': 2 };
  const sortedContracts = custContracts.slice().sort((a, b) => {
    const pa = CONTRACT_PRIORITY[a.status] ?? 3;
    const pb = CONTRACT_PRIORITY[b.status] ?? 3;
    if (pa !== pb) return pa - pb;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const sortedQuotes = custQuotes.slice().sort((a, b) => {
    const pa = QUOTE_PRIORITY[a.status] ?? 3;
    const pb = QUOTE_PRIORITY[b.status] ?? 3;
    if (pa !== pb) return pa - pb;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const renderProjectCard = (item, isContract) => {
    const t = CalcHelpers.calculateQuoteTotals(item, selCustomer, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing);
    const qType = QUOTE_TYPES.find(qt => qt.id === item.quoteType) || QUOTE_TYPES[0];
    const totalFiles = (item.folders?.clayton_docs?.length || 0) + (item.folders?.crew_files?.length || 0) + (item.folders?.estimates?.length || 0) + (item.folders?.permits?.length || 0) + (item.folders?.change_orders?.length || 0);

    let displayTotal = t?.totalWithContingency || 0;
    if (item.changeOrderHistory && item.changeOrderHistory.length > 0) {
      displayTotal = item.changeOrderHistory[item.changeOrderHistory.length - 1].newTotal;
    }

    return (
      <div
        key={item.id}
        style={{
          ...S.box,
          padding: 32,
          position: 'relative',
          background: item.status === 'Cancelled' ? '#f8d7da' : isContract ? '#e8f5e9' : '#f8f9fa',
          borderLeft: item.status === 'Cancelled' ? '6px solid #dc3545' : isContract ? '6px solid #2c5530' : 'none',
          opacity: item.status === 'Cancelled' ? 0.75 : 1
        }}
      >
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
          {isContract && item.status !== 'Cancelled' ? (
            <button
              style={{ ...S.btnSm, background: '#0d6efd', color: '#fff', padding: '8px 16px', fontSize: 14, fontWeight: 600 }}
              onClick={() => onStartChangeOrder(item)}
              title="Create change order"
            >📝 Change Order</button>
          ) : !isContract ? (
            <button
              style={{ ...S.btnSm, background: '#ffc107', color: '#000', padding: '8px 16px', fontSize: 14, fontWeight: 600 }}
              onClick={() => onEditQuote(item)}
              title="Edit quote"
            >✏️ Edit</button>
          ) : null}
          <button
            style={{ ...S.btnSm, background: '#2c5530', padding: '8px 16px', fontSize: 14, fontWeight: 600 }}
            onClick={() => onViewQuote(item, isContract)}
            title={isContract ? "View contract and folders" : "View quote and folders"}
          >👁️ View</button>
          <button
            style={{ background: '#dc3545', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18, padding: '6px 10px', borderRadius: 6 }}
            onClick={() => onDeleteQuote(item)}
            title="Delete"
          >🗑️</button>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 14, color: '#666', fontWeight: 500, marginBottom: 8, paddingRight: 200 }}>
            {qType.icon} {qType.name}
            {isContract && (
              item.status === 'Cancelled'
                ? <span style={{ marginLeft: 8, color: '#dc3545', fontWeight: 700 }}>• CANCELLED CONTRACT</span>
                : <span style={{ marginLeft: 8, color: '#2c5530', fontWeight: 700 }}>• CONTRACT</span>
            )}
          </div>
          <h4 style={{ margin: 0, fontSize: 24, fontWeight: 700, paddingRight: 40 }}>
            {item.homeModel !== 'NONE' ? item.homeModel : `${item.houseWidth}' × ${item.houseLength}'`}
          </h4>
        </div>

        <div style={{ fontSize: 28, fontWeight: 800, color: '#2c5530', marginTop: 12, marginBottom: 16 }}>{fmt(displayTotal)}</div>

        {item.changeOrderHistory && item.changeOrderHistory.length > 0 && (
          <div style={{ fontSize: 12, color: '#666', marginBottom: 8, fontStyle: 'italic' }}>
            Includes {item.changeOrderHistory.length} change order(s) • {item.changeOrderHistory.filter(co => co.status === 'Signed').length} signed
          </div>
        )}

        <div style={{ marginTop: 16, padding: '16px', background: '#fff3cd', borderRadius: 8, border: '3px solid #ffc107' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#856404', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Last Saved
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#000', marginBottom: 6, lineHeight: 1.2 }}>
            🕐 {fmtDateTime(item.updatedAt || item.createdAt)}
          </div>
          <div style={{ fontSize: 14, color: '#666', fontWeight: 600 }}>
            by {item.updatedBy || item.createdBy || 'System'}{item.editVersion > 0 && ` • Version ${item.editVersion}`}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, gap: 12 }}>
          <span style={{ fontSize: 13, color: '#999', fontWeight: 500 }}>Created: {fmtDate(item.createdAt)}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <select
              style={{
                fontSize: 13,
                padding: '6px 12px',
                fontWeight: 700,
                borderRadius: 6,
                border: '2px solid',
                cursor: 'pointer',
                background: item.status === 'Completed' ? '#198754' : item.status === 'Under Contract' ? '#0d6efd' : item.status === 'Cancelled' ? '#dc3545' : item.status === 'Accepted' ? '#d1e7dd' : item.status === 'Draft' ? '#fff3cd' : item.status === 'Declined' ? '#f8d7da' : '#e9ecef',
                color: ['Completed', 'Under Contract', 'Cancelled'].includes(item.status) ? '#fff' : '#000',
                borderColor: item.status === 'Completed' ? '#146c43' : item.status === 'Under Contract' ? '#0a58ca' : item.status === 'Cancelled' ? '#b02a37' : item.status === 'Accepted' ? '#a3cfbb' : item.status === 'Draft' ? '#ffca2c' : item.status === 'Declined' ? '#f1aeb5' : '#dee2e6'
              }}
              value={item.status}
              onChange={(e) => {
                e.stopPropagation();
                onUpdateStatus(item, e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {isContract ? (
                ['Accepted', 'Under Contract', 'Completed', 'Cancelled'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))
              ) : (
                ['Draft', 'Sent', 'Accepted', 'Declined'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))
              )}
            </select>
            {totalFiles > 0 && <span style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>📁 {totalFiles} file{totalFiles !== 1 ? 's' : ''}</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <button style={{ ...S.btn2, marginBottom: 16 }} onClick={onBack}>← Back to Customers</button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0 }}>{selCustomer.firstName} {selCustomer.lastName}</h1>
          {selCustomer.person2FirstName && <p style={{ color: '#666' }}>& {selCustomer.person2FirstName} {selCustomer.person2LastName}</p>}
          <p style={{ color: '#999', fontSize: 12 }}>Created by {selCustomer.createdBy} on {fmtDate(selCustomer.createdAt)}</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button style={{ ...S.btn, width: 'auto', background: '#ffc107', color: '#000' }} onClick={() => onEditCustomer(selCustomer)}>✏️ Edit</button>

          {/* New Quote Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              style={{ ...S.btn, width: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}
              onClick={() => setShowNewQuoteMenu(!showNewQuoteMenu)}
            >
              + New Quote <span style={{ fontSize: 10 }}>▼</span>
            </button>
            {showNewQuoteMenu && (
              <>
                <div
                  style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 }}
                  onClick={() => setShowNewQuoteMenu(false)}
                />
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 4,
                  background: '#fff',
                  borderRadius: 8,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  border: '1px solid #e0e0e0',
                  minWidth: 220,
                  zIndex: 100,
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '8px 12px', background: '#f8f9fa', borderBottom: '1px solid #e0e0e0', fontSize: 12, color: '#666', fontWeight: 600 }}>
                    Select Quote Type
                  </div>
                  {QUOTE_TYPES.map(qt => (
                    <div
                      key={qt.id}
                      onClick={() => {
                        if (qt.enabled) {
                          onNewQuote(qt.id);
                          setShowNewQuoteMenu(false);
                        }
                      }}
                      style={{
                        padding: '12px 16px',
                        cursor: qt.enabled ? 'pointer' : 'default',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        borderBottom: '1px solid #f0f0f0',
                        background: qt.enabled ? '#fff' : '#f8f9fa',
                        opacity: qt.enabled ? 1 : 0.6,
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={e => qt.enabled && (e.currentTarget.style.background = '#f0f7f1')}
                      onMouseLeave={e => qt.enabled && (e.currentTarget.style.background = '#fff')}
                    >
                      <span style={{ fontSize: 20 }}>{qt.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500 }}>{qt.name}</div>
                        {!qt.enabled && (
                          <a
                            href="https://claude.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Add subscription to access"
                            style={{ fontSize: 11, color: '#1565c0', textDecoration: 'none' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            🔒 Add subscription to access
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <button style={S.btnDanger} onClick={() => onDeleteCustomer(selCustomer)}>🗑️</button>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div style={S.grid}>
        <div style={S.box}>
          <h3>Contact</h3>
          <p>📞 {selCustomer.phone}{selCustomer.phone2 && ` / ${selCustomer.phone2}`}</p>
          <p style={{ fontSize: 13 }}>✉️ {selCustomer.email}</p>
          {selCustomer.email2 && <p style={{ fontSize: 13 }}>✉️ {selCustomer.email2}</p>}
        </div>
        <div style={S.box}>
          <h3>Site Address</h3>
          <p>{selCustomer.siteAddress}</p>
          <p>{selCustomer.siteCity}, {selCustomer.siteState} {selCustomer.siteZip}</p>
          {selCustomer.siteCounty && <p style={{ fontSize: 13, color: '#666' }}>County: {selCustomer.siteCounty}</p>}
        </div>
        {selCustomer.mailingAddress && (
          <div style={S.box}>
            <h3>Mailing Address</h3>
            <p>{selCustomer.mailingAddress}</p>
            <p>{selCustomer.mailingCity}, {selCustomer.mailingState} {selCustomer.mailingZip}</p>
          </div>
        )}
      </div>

      {/* Quotes & Contracts */}
      <div style={{ ...S.box, marginTop: 24 }}>
        {sortedQuotes.length === 0 && sortedContracts.length === 0 && cancelledContracts.length === 0 ? (
          <div>
            <h2 style={{ margin: '0 0 16px' }}>Quotes & Contracts</h2>
            <p style={{ color: '#666', textAlign: 'center', padding: 20 }}>No quotes yet. Click "+ New Quote" to create one.</p>
          </div>
        ) : (
          <div>
            {sortedContracts.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ margin: '0 0 16px', color: '#2c5530' }}>📜 Contracts ({sortedContracts.length})</h2>
                <div style={S.grid}>
                  {sortedContracts.map(c => renderProjectCard(c, true))}
                </div>
              </div>
            )}

            <div>
              <h2 style={{ margin: '0 0 16px' }}>📋 Quotes ({sortedQuotes.length})</h2>
              {sortedQuotes.length === 0 ? (
                <p style={{ color: '#666', textAlign: 'center', padding: 20 }}>No pending quotes.</p>
              ) : (
                <div style={S.grid}>
                  {sortedQuotes.map(q => renderProjectCard(q, false))}
                </div>
              )}
            </div>

            {cancelledContracts.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h2 style={{ margin: '0 0 16px', color: '#dc3545' }}>🚫 Cancelled Contracts ({cancelledContracts.length})</h2>
                <div style={S.grid}>
                  {cancelledContracts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(c => renderProjectCard(c, true))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerView;
