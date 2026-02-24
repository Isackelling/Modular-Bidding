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
  onUpdateQuoteNotes,
  userName,
  emptyQuote,
  styles: S
}) => {
  const [noteMode, setNoteMode] = React.useState(null); // 'crew' | 'customer' | null
  const [noteQuoteId, setNoteQuoteId] = React.useState('');
  const [noteDraft, setNoteDraft] = React.useState('');

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

      {/* General Project Notes */}
      {(() => {
        const allItems = [...custQuotes, ...allCustContracts];
        if (allItems.length === 0) return null;
        const formatNoteDate = (iso) => new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
        const getQuoteLabel = (item) => {
          const num = item.id?.slice(-8).toUpperCase() || 'N/A';
          const model = item.homeModel && item.homeModel !== 'NONE' ? item.homeModel : '';
          const isContract = allCustContracts.some(c => c.id === item.id);
          return `${isContract ? 'Contract' : 'Quote'} #${num}${model ? ` - ${model}` : ''} (${item.status})`;
        };
        const selectedItem = allItems.find(i => i.id === noteQuoteId);

        const handlePublish = () => {
          if (!noteDraft.trim() || !selectedItem) return;
          const note = { text: noteDraft, publishedAt: new Date().toISOString(), publishedBy: userName || 'User' };
          const field = noteMode === 'crew' ? 'publishedGeneralCrewNotes' : 'publishedGeneralCustomerNotes';
          const existing = selectedItem[field] || [];
          onUpdateQuoteNotes(noteQuoteId, { [field]: [...existing, note] });
          setNoteDraft('');
          setNoteMode(null);
          setNoteQuoteId('');
        };

        const handleDelete = (item, field, noteIndex) => {
          if (!window.confirm('Delete this note?')) return;
          const existing = item[field] || [];
          onUpdateQuoteNotes(item.id, { [field]: existing.filter((_, idx) => idx !== noteIndex) });
        };

        // Collect all published general notes across all quotes/contracts
        const allCrewNotes = allItems.flatMap(item =>
          (item.publishedGeneralCrewNotes || []).map(n => ({ ...n, quoteLabel: getQuoteLabel(item), quoteId: item.id, field: 'publishedGeneralCrewNotes', item }))
        );
        const allCustNotes = allItems.flatMap(item =>
          (item.publishedGeneralCustomerNotes || []).map(n => ({ ...n, quoteLabel: getQuoteLabel(item), quoteId: item.id, field: 'publishedGeneralCustomerNotes', item }))
        );

        return (
          <div style={{ ...S.box, marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ margin: 0, color: '#2c5530' }}>General Project Notes</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => { setNoteMode(noteMode === 'crew' ? null : 'crew'); setNoteDraft(''); setNoteQuoteId(''); }}
                  style={{ padding: '6px 14px', background: noteMode === 'crew' ? '#e65100' : '#fff3e0', color: noteMode === 'crew' ? '#fff' : '#e65100', border: '2px solid #e65100', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                >
                  {noteMode === 'crew' ? '✕ Cancel' : '+ Crew Note'}
                </button>
                <button
                  onClick={() => { setNoteMode(noteMode === 'customer' ? null : 'customer'); setNoteDraft(''); setNoteQuoteId(''); }}
                  style={{ padding: '6px 14px', background: noteMode === 'customer' ? '#1565c0' : '#e3f2fd', color: noteMode === 'customer' ? '#fff' : '#1565c0', border: '2px solid #1565c0', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                >
                  {noteMode === 'customer' ? '✕ Cancel' : '+ Customer Note'}
                </button>
              </div>
            </div>

            {/* Inline note form */}
            {noteMode && (
              <div style={{ padding: 16, background: noteMode === 'crew' ? '#fff3e0' : '#e3f2fd', borderRadius: 8, marginBottom: 16, border: `2px solid ${noteMode === 'crew' ? '#ffb74d' : '#90caf9'}` }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: noteMode === 'crew' ? '#e65100' : '#1565c0', marginBottom: 10 }}>
                  {noteMode === 'crew' ? '🔧 New Crew Note (staff only)' : '💬 New Customer Note (visible to customer)'}
                </div>

                {!noteQuoteId ? (
                  <>
                    <div style={{ fontSize: 13, color: '#666', marginBottom: 10 }}>Choose a quote or contract to add this note to:</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                      {allItems.map(item => {
                        const num = item.id?.slice(-8).toUpperCase() || '';
                        const isContract = allCustContracts.some(c => c.id === item.id);
                        const model = item.homeModel && item.homeModel !== 'NONE' ? item.homeModel : 'Custom';
                        const statusColors = { Draft: '#6c757d', Sent: '#0d6efd', Accepted: '#198754', 'Under Contract': '#2c5530', Completed: '#198754', Declined: '#dc3545', Cancelled: '#dc3545' };
                        const accentColor = noteMode === 'crew' ? '#e65100' : '#1565c0';
                        return (
                          <div
                            key={item.id}
                            onClick={() => setNoteQuoteId(item.id)}
                            style={{ padding: 14, background: '#fff', borderRadius: 8, border: '2px solid #dee2e6', cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#dee2e6'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                          >
                            <div style={{ fontSize: 11, fontWeight: 700, color: isContract ? '#2c5530' : '#0d6efd', marginBottom: 4 }}>
                              {isContract ? '📜 CONTRACT' : '📋 QUOTE'}
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 4 }}>{model}</div>
                            <div style={{ fontSize: 12, color: '#666', marginBottom: 6 }}>#{num}</div>
                            <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: statusColors[item.status] || '#6c757d', color: '#fff' }}>{item.status}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <button onClick={() => setNoteQuoteId('')} style={{ padding: '4px 10px', background: 'transparent', border: '1px solid #999', borderRadius: 4, fontSize: 12, cursor: 'pointer', color: '#666' }}>← Back</button>
                      <span style={{ fontSize: 13, color: '#666' }}>Adding note to: <strong>{getQuoteLabel(selectedItem)}</strong></span>
                    </div>
                    <textarea
                      style={{ width: '100%', minHeight: 80, padding: 12, fontSize: 14, fontFamily: 'inherit', border: `1px solid ${noteMode === 'crew' ? '#ffb74d' : '#90caf9'}`, borderRadius: 4, resize: 'vertical' }}
                      placeholder={noteMode === 'crew' ? 'Type crew instructions...' : 'Type customer note...'}
                      value={noteDraft}
                      onChange={e => setNoteDraft(e.target.value)}
                      autoFocus
                    />
                    {noteDraft.trim() && (
                      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={handlePublish} style={{ padding: '8px 20px', background: noteMode === 'crew' ? '#e65100' : '#1565c0', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                          📤 Publish Note
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Display existing notes */}
            {allCrewNotes.length === 0 && allCustNotes.length === 0 && !noteMode && (
              <p style={{ color: '#999', fontSize: 13, fontStyle: 'italic', margin: 0 }}>No general notes yet. Use the buttons above to add crew or customer notes.</p>
            )}

            {allCrewNotes.length > 0 && (
              <div style={{ marginBottom: allCustNotes.length > 0 ? 16 : 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#e65100', marginBottom: 8 }}>🔧 Crew Notes ({allCrewNotes.length})</div>
                {allCrewNotes.map((note, idx) => {
                  const noteIndex = (note.item.publishedGeneralCrewNotes || []).findIndex(n => n.publishedAt === note.publishedAt && n.text === note.text);
                  return (
                    <div key={idx} style={{ padding: 10, background: '#fff', borderRadius: 4, marginBottom: 6, border: '1px solid #fff3e0', borderLeft: '4px solid #ff6b35' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, lineHeight: 1.5 }}>{note.text}</div>
                          <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>{note.quoteLabel} — {formatNoteDate(note.publishedAt)} by {note.publishedBy}</div>
                        </div>
                        <button onClick={() => handleDelete(note.item, 'publishedGeneralCrewNotes', noteIndex)} style={{ padding: '3px 10px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 3, fontSize: 11, fontWeight: 600, cursor: 'pointer', marginLeft: 8 }}>🗑️</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {allCustNotes.length > 0 && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1565c0', marginBottom: 8 }}>💬 Customer Notes ({allCustNotes.length})</div>
                {allCustNotes.map((note, idx) => {
                  const noteIndex = (note.item.publishedGeneralCustomerNotes || []).findIndex(n => n.publishedAt === note.publishedAt && n.text === note.text);
                  return (
                    <div key={idx} style={{ padding: 10, background: '#fff', borderRadius: 4, marginBottom: 6, border: '1px solid #e3f2fd', borderLeft: '4px solid #1565c0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, lineHeight: 1.5 }}>{note.text}</div>
                          <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>{note.quoteLabel} — {formatNoteDate(note.publishedAt)} by {note.publishedBy}</div>
                        </div>
                        <button onClick={() => handleDelete(note.item, 'publishedGeneralCustomerNotes', noteIndex)} style={{ padding: '3px 10px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 3, fontSize: 11, fontWeight: 600, cursor: 'pointer', marginLeft: 8 }}>🗑️</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

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
