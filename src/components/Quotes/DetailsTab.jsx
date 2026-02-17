import React from 'react';
import { fmt, genId, DocumentUtils } from '../../utils/index.js';

const CUSTOMER_FOLDERS = [
  { id: 'clayton_docs', name: 'Clayton Docs', icon: '\u{1F4CB}', description: 'Factory documents, specs, order confirmations' },
  { id: 'crew_files', name: 'Crew Files', icon: '\u{1F527}', description: 'Installation docs, checklists, photos' },
  { id: 'estimates', name: 'Estimates', icon: '\u{1F4B0}', description: 'Quotes, pricing, allowances' },
  { id: 'permits', name: 'Permits', icon: '\u{1F4DC}', description: 'Building permits, inspections, approvals' },
  { id: 'change_orders', name: 'Customer Docs', icon: '\u{1F4C4}', description: 'Change orders, contingency updates, customer communications' },
];

const fmtDate = d => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

/**
 * DetailsTab - The "Quote Details" tab content.
 * Contains: Change Order History, Customer/Site/Home info, Project Command,
 * Quote Folders, File management, and Home & Foundation Notes.
 */
const DetailsTab = ({
  S, currentItem, custForQuote, totals,
  selQuote, setSelQuote,
  selContract, setSelContract,
  contracts, quotes,
  saveContracts, saveQuotes,
  isAdmin, userName, homeModels,
  isChangeOrderHistoryExpanded, setIsChangeOrderHistoryExpanded,
  expandedCO, setExpandedCO,
  activeFolder, setActiveFolder,
  dragOverFolder, setDragOverFolder,
  showAddFileModal, setShowAddFileModal,
  newFile, setNewFile,
  handleFileDrop,
  addFileToFolder,
  deleteFileFromFolder,
  saveAllDocsToFolders,
  saveQuoteToFolder,
  savePierLayoutToFolder,
  saveFloorPlanToFolders,
  saveMaterialListToFolder,
  saveCustomerInfoToFolder,
  saveDecorChecklistToFolder,
  saveLatestChangeOrderToFolders,
  saveCrewWorkOrderToFolders,
}) => {
  return (<>
    {/* Change Order History Section - Only show for contracts with COs */}
    {currentItem.changeOrderHistory && currentItem.changeOrderHistory.length > 0 && (() => {
      const activeCount = currentItem.changeOrderHistory.filter(co => {
        const hasReversal = currentItem.changeOrderHistory.some(
          item => item.isReversal && item.changeOrderNum === co.changeOrderNum
        );
        return !co.isReversal && !hasReversal;
      }).length;

      return (
      <div style={{ ...S.box, marginBottom: 24, background: '#f8f9fa', border: '2px solid #1565c0' }}>
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: 16 }}
          onClick={() => setIsChangeOrderHistoryExpanded(!isChangeOrderHistoryExpanded)}
        >
          <h3 style={{ margin: 0, color: '#1565c0' }}>
            {isChangeOrderHistoryExpanded ? '\u25BC' : '\u25B6'} \u{1F4CB} Change Order History ({activeCount})
          </h3>
          <button
            type="button"
            style={{ background: 'transparent', border: 'none', color: '#1565c0', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
            onClick={(e) => { e.stopPropagation(); setIsChangeOrderHistoryExpanded(!isChangeOrderHistoryExpanded); }}
          >
            {isChangeOrderHistoryExpanded ? 'Minimize' : 'Maximize'}
          </button>
        </div>

        {isChangeOrderHistoryExpanded && (
          <div>
            {/* Original Quote Total */}
            <div style={{ padding: 12, background: '#e8f5e9', borderRadius: 6, marginBottom: 12, border: '1px solid #2e7d32' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#2e7d32' }}>Original Quote</span>
                <span style={{ fontWeight: 700, fontSize: 18, color: '#2e7d32' }}>{fmt(totals.totalWithContingency)}</span>
              </div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                Created {fmtDate(currentItem.createdAt)} by {currentItem.createdBy}
              </div>
            </div>

            {/* Change Order Timeline */}
            {currentItem.changeOrderHistory.map((co, idx) => {
              if (co.isReversal) return null;

              const reversalEntry = currentItem.changeOrderHistory.find(
                item => item.isReversal && item.changeOrderNum === co.changeOrderNum
              );

              const isPositive = co.totalChange >= 0;
              const hasDetails = co.adjustments || co.deletions || co.additions;

              return (
                <div
                  key={idx}
                  style={{
                    padding: 12,
                    background: reversalEntry ? '#f5f5f5' : '#fff',
                    borderRadius: 6,
                    marginBottom: 12,
                    border: reversalEntry ? '2px solid #999' : `2px solid ${isPositive ? '#ff9800' : '#f44336'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>
                        Change Order #{co.changeOrderNum}
                        {reversalEntry && <span style={{ marginLeft: 8, fontSize: 12, background: '#999', color: '#fff', padding: '2px 8px', borderRadius: 4 }}>VOIDED</span>}
                        {!reversalEntry && co.status === 'Signed' && <span style={{ marginLeft: 8, fontSize: 12, background: '#2e7d32', color: '#fff', padding: '2px 8px', borderRadius: 4 }}>{'\u2713'} Signed</span>}
                        {!reversalEntry && co.status === 'Draft' && <span style={{ marginLeft: 8, fontSize: 12, background: '#ff9800', color: '#fff', padding: '2px 8px', borderRadius: 4 }}>Draft</span>}
                        {!reversalEntry && co.status === 'Sent' && <span style={{ marginLeft: 8, fontSize: 12, background: '#1565c0', color: '#fff', padding: '2px 8px', borderRadius: 4 }}>Sent</span>}
                      </div>
                      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                        Created {new Date(co.createdAt).toLocaleDateString()} by {co.createdBy}
                        {reversalEntry && (
                          <span style={{ display: 'block', marginTop: 2, fontStyle: 'italic' }}>
                            Voided {new Date(reversalEntry.createdAt).toLocaleDateString()} by {reversalEntry.createdBy}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: reversalEntry ? '#999' : (isPositive ? '#ff9800' : '#f44336') }}>
                        {isPositive ? '+' : ''}{fmt(co.totalChange)}
                        {reversalEntry && <span style={{ textDecoration: 'line-through' }}></span>}
                      </div>
                      <div style={{ fontSize: 12, color: '#666' }}>New Total: {fmt(co.newTotal)}</div>
                      {reversalEntry && (
                        <div style={{ fontSize: 11, color: '#999', marginTop: 4, fontStyle: 'italic' }}>
                          (Net effect: $0.00)
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 8, marginBottom: 8 }}>
                    <button
                      onClick={() => {
                        const coDoc = currentItem.folders?.change_orders?.find(f =>
                          f.name.includes(`Change_Order_#${co.changeOrderNum}`)
                        );
                        if (coDoc) {
                          const newWindow = window.open();
                          newWindow.document.write(atob(coDoc.url.split(',')[1]));
                          newWindow.document.close();
                        } else {
                          alert('Change order document not found');
                        }
                      }}
                      style={{
                        ...S.btn,
                        background: '#1565c0',
                        padding: '6px 24px',
                        fontSize: 13,
                        flex: 1
                      }}
                    >
                      {'\u{1F4E7}'} Send to Customer
                    </button>
                    <button
                      onClick={() => {
                        try {
                          let tempBalance = totals.contingency || 0;
                          for (let i = 0; i <= idx; i++) {
                            const tempCo = currentItem.changeOrderHistory[i];
                            tempBalance -= (tempCo.totalChange || 0);
                          }

                          const hasNegativeBalance = tempBalance < 0;

                          if (co.status !== 'Signed' && hasNegativeBalance) {
                            const paymentConfirmed = window.confirm(
                              `\u26A0\uFE0F This change order has an overdraw of ${fmt(Math.abs(tempBalance))}.\n\n` +
                              `Has the customer paid this amount?\n\n` +
                              `Click OK if payment was received, or Cancel to mark as signed without payment confirmation.`
                            );

                            if (paymentConfirmed) {
                              alert(`\u2713 Payment of ${fmt(Math.abs(tempBalance))} recorded for Change Order #${co.changeOrderNum}`);
                            }
                          }

                          const updatedHistory = currentItem.changeOrderHistory.map((item, i) =>
                            i === idx ? { ...item, status: item.status === 'Signed' ? 'Draft' : 'Signed' } : item
                          );
                          const updatedItem = { ...currentItem, changeOrderHistory: updatedHistory };

                          const isInContracts = contracts.find(c => c.id === currentItem.id);
                          if (isInContracts) {
                            const updatedContracts = contracts.map(c => c.id === currentItem.id ? updatedItem : c);
                            saveContracts(updatedContracts);
                            setSelContract(updatedItem);
                          } else {
                            const updatedQuotes = quotes.map(q => q.id === currentItem.id ? updatedItem : q);
                            saveQuotes(updatedQuotes);
                            setSelQuote(updatedItem);
                          }
                        } catch (error) {
                          console.error('Error in Mark as Signed button:', error);
                          alert('Error: ' + error.message);
                        }
                      }}
                      style={{
                        ...S.btn,
                        background: co.status === 'Signed' ? '#28a745' : '#6c757d',
                        padding: '6px 24px',
                        fontSize: 13,
                        flex: 1
                      }}
                    >
                      {co.status === 'Signed' ? '\u2713 Signed' : '\u2610 Mark as Signed'}
                    </button>
                    {!reversalEntry && <button
                      onClick={() => {
                        if (window.confirm(`\u26A0\uFE0F Are you sure you want to void Change Order #${co.changeOrderNum}?\n\nThis will add a reversal entry to maintain audit trail.`)) {
                          const reversalEntryNew = {
                            changeOrderNum: co.changeOrderNum,
                            status: 'Voided',
                            totalChange: -co.totalChange,
                            isReversal: true,
                            originalChangeOrderIndex: idx,
                            createdAt: new Date().toISOString(),
                            createdBy: userName,
                            voidReason: 'Change order voided by user'
                          };

                          const updatedHistory = [...currentItem.changeOrderHistory, reversalEntryNew];
                          const updatedItem = { ...currentItem, changeOrderHistory: updatedHistory };

                          const isInContracts = contracts.find(c => c.id === currentItem.id);
                          if (isInContracts) {
                            const updatedContracts = contracts.map(c => c.id === currentItem.id ? updatedItem : c);
                            saveContracts(updatedContracts);
                            setSelContract(updatedItem);
                          } else {
                            const updatedQuotes = quotes.map(q => q.id === currentItem.id ? updatedItem : q);
                            saveQuotes(updatedQuotes);
                            setSelQuote(updatedItem);
                          }
                        }
                      }}
                      style={S.btnDanger}
                    >
                      {'\u{1F5D1}\uFE0F'}
                    </button>}
                  </div>

                  {/* Details Toggle */}
                  {hasDetails && (
                    <div style={{ marginTop: 8 }}>
                      <button
                        onClick={() => setExpandedCO(prev => ({ ...prev, [idx]: !prev[idx] }))}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#1565c0',
                          cursor: 'pointer',
                          fontSize: 13,
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >
                        {expandedCO[idx] ? '\u25BC Hide Details' : '\u25B6 Show Details'}
                      </button>

                      {expandedCO[idx] && (
                        <div style={{ marginTop: 8, fontSize: 13 }}>
                          {/* Adjustments */}
                          {co.adjustments && Object.keys(co.adjustments).length > 0 ? (
                            <div style={{ marginBottom: 8 }}>
                              <div style={{ fontWeight: 600, marginBottom: 4 }}>{'\u{1F4DD}'} Price Adjustments:</div>
                              {(() => {
                                const adjustmentEntries = Object.entries(co.adjustments).filter(([key, adj]) => {
                                  if (!adj) return false;
                                  const amount = typeof adj.amount === 'number' ? adj.amount : parseFloat(adj.amount) || 0;
                                  return amount !== 0;
                                });

                                if (adjustmentEntries.length === 0) {
                                  return <div style={{ paddingLeft: 8, color: '#666', fontSize: 12 }}>No price adjustments</div>;
                                }

                                return adjustmentEntries.map(([key, adj]) => {
                                  const isLocked = adj.locked;
                                  const amount = typeof adj.amount === 'number' ? adj.amount : parseFloat(adj.amount) || 0;

                                  return (
                                    <div key={key} style={{ paddingLeft: 8, marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
                                      <span>{'\u2022'} {key.replace(/_/g, ' ')}</span>
                                      <span style={{ fontWeight: 600 }}>
                                        {amount > 0 ? '+' : ''}{fmt(amount)}
                                        {isLocked && ' \u{1F512}'}
                                      </span>
                                    </div>
                                  );
                                });
                              })()}
                            </div>
                          ) : (
                            <div style={{ marginBottom: 8, paddingLeft: 8, color: '#666', fontSize: 12 }}>
                              <em>No adjustments recorded</em>
                            </div>
                          )}

                          {/* Deletions */}
                          {co.deletions && co.deletions.length > 0 && (
                            <div style={{ marginBottom: 8 }}>
                              <div style={{ fontWeight: 600, marginBottom: 4, color: '#f44336' }}>{'\u274C'} Removed Items:</div>
                              {co.deletions.map((item, i) => (
                                <div key={i} style={{ paddingLeft: 8, marginBottom: 2 }}>
                                  {'\u2022'} {item.name || item}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Additions */}
                          {co.additions && co.additions.length > 0 && (
                            <div style={{ marginBottom: 8 }}>
                              <div style={{ fontWeight: 600, marginBottom: 4, color: '#2e7d32' }}>{'\u2795'} Added Items:</div>
                              {co.additions.map((item, i) => (
                                <div key={i} style={{ paddingLeft: 8, marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{'\u2022'} {item.name}</span>
                                  <span style={{ fontWeight: 600 }}>{fmt(item.price)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Customer Payment Summary with Running Contingency Balance */}
            {(() => {
              const originalTotal = totals.totalWithContingency || 0;
              const originalContingency = totals.contingency || 0;
              let runningContingency = originalContingency;

              return (
                <div style={{ padding: 16, background: '#f1f8e9', borderRadius: 8, border: '2px solid #2e7d32', marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, color: '#2e7d32', marginBottom: 12, fontSize: 16 }}>{'\u{1F4B5}'} Customer Payment Breakdown</div>

                  <div style={{ fontSize: 14 }}>
                    {/* Original */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, paddingBottom: 8, borderBottom: '1px solid #c5e1a5' }}>
                      <span style={{ fontWeight: 600 }}>Original Quote:</span>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{fmt(originalTotal)}</span>
                    </div>

                    {/* Starting Contingency */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, padding: 8, background: '#fff3cd', borderRadius: 4 }}>
                      <span style={{ fontWeight: 600, color: '#856404' }}>Starting Contingency:</span>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#856404' }}>{fmt(originalContingency)}</span>
                    </div>

                    {/* Change Orders with Running Balance */}
                    {currentItem.changeOrderHistory.length > 0 && (
                      <div style={{ marginBottom: 8 }}>
                        {currentItem.changeOrderHistory.map((co, idx) => {
                          if (co.isReversal) {
                            const fromContingency = co.totalChange || 0;
                            runningContingency = runningContingency - fromContingency;
                            return null;
                          }

                          const reversalEntry2 = currentItem.changeOrderHistory.find(
                            item => item.isReversal && item.changeOrderNum === co.changeOrderNum
                          );

                          const fromContingency = co.totalChange || 0;
                          const newBalance = runningContingency - fromContingency;

                          let finalBalance = newBalance;
                          if (reversalEntry2) {
                            const reversalFromContingency = reversalEntry2.totalChange || 0;
                            finalBalance = newBalance - reversalFromContingency;
                          }

                          const balanceColor = finalBalance > 0 ? '#2e7d32' : (finalBalance === 0 ? '#ff9800' : '#dc3545');
                          const isOverdrawn = finalBalance < 0;

                          const result = (
                            <div key={idx} style={{ marginBottom: 12, paddingLeft: 12, paddingTop: 10, paddingBottom: 10, paddingRight: 10, borderLeft: reversalEntry2 ? '3px solid #999' : (isOverdrawn ? '3px solid #dc3545' : '3px solid #c5e1a5'), background: reversalEntry2 ? '#f5f5f5' : (isOverdrawn ? '#ffe5e5' : '#f9f9f9'), borderRadius: 4 }}>
                              <div style={{ marginBottom: 8 }}>
                                <span style={{ fontWeight: 700, fontSize: 15 }}>
                                  Change Order #{co.changeOrderNum}
                                  {reversalEntry2 && <span style={{ color: '#999', marginLeft: 8 }}>(VOIDED)</span>}
                                </span>
                              </div>

                              <div style={{ fontSize: 13, paddingLeft: 8, paddingTop: 6 }}>
                                {(() => {
                                  let description = 'Change order';

                                  if (co.additions && co.additions.length > 0) {
                                    description = co.additions[0].name || co.additions[0];
                                  } else if (co.adjustments && Object.keys(co.adjustments).length > 0) {
                                    const firstKey = Object.keys(co.adjustments)[0];
                                    description = firstKey.replace(/_/g, ' ');
                                  } else if (co.deletions && co.deletions.length > 0) {
                                    description = 'Removed: ' + (co.deletions[0].name || co.deletions[0]);
                                  }

                                  return reversalEntry2 ? (
                                    <>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ fontWeight: 600, color: '#999' }}>{description}:</span>
                                        <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 15, color: '#999' }}>$0.00</span>
                                      </div>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ color: '#999' }}>Contingency impact:</span>
                                        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#999' }}>$0.00</span>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ fontWeight: 600, color: fromContingency >= 0 ? '#f44336' : '#2e7d32' }}>
                                          {description}:
                                        </span>
                                        <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 15, color: fromContingency >= 0 ? '#f44336' : '#2e7d32' }}>
                                          {fromContingency > 0 ? '+' : ''}{fmt(fromContingency)}
                                        </span>
                                      </div>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ color: '#666' }}>
                                          {fromContingency > 0 ? 'Use contingency fund:' : fromContingency < 0 ? 'Add to contingency fund:' : 'Contingency:'}
                                        </span>
                                        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#ff9800' }}>
                                          {fromContingency > 0 ? '-' : fromContingency < 0 ? '+' : ''}{fmt(Math.abs(fromContingency))}
                                        </span>
                                      </div>
                                    </>
                                  );
                                })()}

                                {/* Final balance */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 6, marginTop: 6, borderTop: '1px solid #e0e0e0' }}>
                                  <span style={{ fontWeight: 700, fontSize: 13 }}>Contingency balance:</span>
                                  <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 14, color: balanceColor }}>
                                    {fmt(finalBalance)}
                                    {finalBalance < 0 && ' (overdraw)'}
                                  </span>
                                </div>

                                {/* Overdraw Warning */}
                                {isOverdrawn && !reversalEntry2 && (
                                  <div style={{ marginTop: 8, padding: 8, background: '#dc3545', color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 600, textAlign: 'center' }}>
                                    {'\u26A0\uFE0F'} Customer needs to pay {fmt(Math.abs(finalBalance))} upon signing
                                  </div>
                                )}
                              </div>
                            </div>
                          );

                          runningContingency = finalBalance;
                          return result;
                        })}
                      </div>
                    )}

                    {/* Total */}
                    {(() => {
                      const customerPaymentTotal = originalTotal + Math.max(0, -runningContingency);

                      return (
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, marginTop: 12, borderTop: '2px solid #2e7d32' }}>
                          <span style={{ fontWeight: 700, fontSize: 16, color: '#2e7d32' }}>Total Customer Payment:</span>
                          <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 18, color: '#2e7d32' }}>
                            {fmt(customerPaymentTotal)}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              );
            })()}

            {/* Status Summary */}
            <div style={{ padding: 8, background: '#f5f5f5', borderRadius: 6, fontSize: 12, color: '#666', textAlign: 'center' }}>
              {currentItem.changeOrderHistory.filter(co => co.status === 'Signed').length} of {currentItem.changeOrderHistory.length} change orders signed
            </div>
          </div>
        )}
      </div>
      );
    })()}

    <div style={S.grid}>
      <div style={S.box}>
        <h3>Customer</h3>
        <p><strong>{custForQuote.firstName} {custForQuote.lastName}</strong></p>
        {custForQuote.person2FirstName && <p style={{ color: '#666' }}>& {custForQuote.person2FirstName} {custForQuote.person2LastName}</p>}
        <p>{'\u{1F4DE}'} {custForQuote.phone}{custForQuote.phone2 && ` / ${custForQuote.phone2}`}</p>
        {custForQuote.email && <p style={{ fontSize: 12, color: '#666' }}>{'\u2709\uFE0F'} {custForQuote.email}</p>}
        {custForQuote.email2 && <p style={{ fontSize: 12, color: '#666' }}>{'\u2709\uFE0F'} {custForQuote.email2}</p>}
      </div>
      <div style={S.box}><h3>Site</h3><p>{custForQuote.siteAddress}</p><p>{custForQuote.siteCity}, {custForQuote.siteState}</p><p>{'\u{1F697}'} {currentItem.driveTime} mi</p></div>
      <div style={S.box}><h3>Home</h3><p>{currentItem.houseWidth}' {'\u00D7'} {currentItem.houseLength}' {currentItem.singleDouble}</p></div>
    </div>

    {isAdmin && <div style={{ ...S.box, ...S.projCmd }}>
      <h4 style={{ color: '#1565c0' }}>{'\u{1F4CB}'} Project Command: {fmt(totals.projCmd.total)}</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}><div><strong>PS:</strong> {fmt(totals.projCmd.ps)}</div><div><strong>PM:</strong> {fmt(totals.projCmd.pm)}</div><div><strong>PC:</strong> {fmt(totals.projCmd.pc)}</div></div>
      <p style={{ color: '#666', fontSize: 12 }}>{totals.projCmd.numSvc} services {'\u2022'} {totals.projCmd.miles} miles</p>
    </div>}

    {/* Quote Folders Section */}
    <div style={{ ...S.box, marginTop: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0, borderBottom: '2px solid #2c5530', paddingBottom: 8 }}>{'\u{1F4C1}'} Quote Files</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            style={{ ...S.btnSm, background: '#ff6f00' }}
            onClick={() => saveAllDocsToFolders(currentItem, custForQuote)}
            title="Save all documents at once"
          >{'\u26A1'} Save All</button>
          <button
            style={{ ...S.btnSm, background: '#1565c0' }}
            onClick={() => saveQuoteToFolder(currentItem, custForQuote)}
            title="Save quote PDF to Customer Docs"
          >{'\u{1F4C4}'} Save Quote</button>
          <button
            style={{ ...S.btnSm, background: '#7b1fa2' }}
            onClick={() => savePierLayoutToFolder(currentItem, custForQuote)}
            title="Save pier layout to Crew Files"
          >{'\u{1F4D0}'} Save Piers</button>
          <button
            style={{ ...S.btnSm, background: homeModels.find(m => m.name === currentItem.homeModel)?.floorPlanUrl ? '#2e7d32' : '#9e9e9e' }}
            onClick={() => {
              const hasFloor = homeModels.find(m => m.name === currentItem.homeModel)?.floorPlanUrl;
              if (hasFloor) saveFloorPlanToFolders(currentItem, custForQuote);
              else alert('No floor plan URL. Add one in Pricing > Homes.');
            }}
            title="Save floor plan to Clayton Docs & Crew Files"
          >{'\u{1F3E0}'} Save Floor</button>
          <button
            style={{ ...S.btnSm, background: '#ef6c00' }}
            onClick={() => saveMaterialListToFolder(currentItem, custForQuote)}
            title="Save material list (name & qty only) to Crew Files"
          >{'\u{1F4CB}'} Save Materials</button>
          <button
            style={{ ...S.btnSm, background: '#00838f' }}
            onClick={() => saveCustomerInfoToFolder(currentItem, custForQuote)}
            title="Save customer info + map to Crew Files"
          >{'\u{1F464}'} Save Customer</button>
          <button
            style={{ ...S.btnSm, background: '#c62828' }}
            onClick={() => saveDecorChecklistToFolder(currentItem, custForQuote)}
            title="Save home specifications to Clayton Docs"
          >{'\u{1F4CB}'} Decor Checklist</button>
          {(() => {
            const hasChangeOrders = quotes.some(q => q.changeOrderOf === currentItem.id);
            return hasChangeOrders ? (
              <button
                style={{ ...S.btnSm, background: '#ffc107', color: '#000' }}
                onClick={() => saveLatestChangeOrderToFolders(currentItem, custForQuote)}
                title="Save latest change order to Crew Files & Change Orders"
              >{'\u{1F4DD}'} Latest CO</button>
            ) : null;
          })()}
          {['Accepted', 'Under Contract', 'Completed'].includes(currentItem.status) && (
            <button
              style={{ ...S.btnSm, background: '#ff6b35' }}
              onClick={async () => {
                try {
                  await saveCrewWorkOrderToFolders(currentItem, custForQuote);
                  alert('\u2705 Crew Work Order saved to Crew Files folder!');
                } catch (error) {
                  console.error('Error saving crew work order:', error);
                  alert('\u274C Error saving crew work order: ' + error.message);
                }
              }}
              title="Generate crew work order with install/professional services and crew notes"
            >{'\u{1F527}'} Crew Work Order</button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {CUSTOMER_FOLDERS.map(folder => {
          const files = currentItem.folders?.[folder.id] || [];
          const isActive = activeFolder === folder.id;
          const isDragOver = dragOverFolder === folder.id;
          return (
            <div
              key={folder.id}
              onClick={() => setActiveFolder(isActive ? null : folder.id)}
              onDragEnter={(e) => { e.preventDefault(); setDragOverFolder(folder.id); }}
              onDragOver={(e) => { e.preventDefault(); setDragOverFolder(folder.id); }}
              onDragLeave={() => setDragOverFolder(null)}
              onDrop={(e) => handleFileDrop(e, folder.id, currentItem)}
              style={{
                padding: 16,
                background: isDragOver ? '#bbdefb' : isActive ? '#e8f5e9' : '#f8f9fa',
                borderRadius: 8,
                cursor: 'pointer',
                border: isDragOver ? '2px dashed #1565c0' : isActive ? '2px solid #2c5530' : '2px solid transparent',
                transition: 'all 0.2s',
                transform: isDragOver ? 'scale(1.02)' : 'scale(1)'
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{isDragOver ? '\u{1F4E5}' : folder.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{isDragOver ? 'Drop here!' : folder.name}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{files.length} file{files.length !== 1 ? 's' : ''}</div>
            </div>
          );
        })}
      </div>

      {/* Active Folder Contents */}
      {activeFolder && (() => {
        const folder = CUSTOMER_FOLDERS.find(f => f.id === activeFolder);
        const files = currentItem.folders?.[activeFolder] || [];
        return (
          <div style={{ marginTop: 20, padding: 16, background: '#f8f9fa', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0 }}>{folder.icon} {folder.name}</h3>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#666' }}>{folder.description}</p>
              </div>
              <button
                style={{ ...S.btn, width: 'auto', padding: '8px 16px' }}
                onClick={() => { setNewFile({ name: '', type: 'link', url: '', notes: '' }); setShowAddFileModal(true); }}
              >
                + Add File
              </button>
            </div>

            {files.length === 0 ? (
              <div
                onDragEnter={(e) => { e.preventDefault(); setDragOverFolder(activeFolder); }}
                onDragOver={(e) => { e.preventDefault(); setDragOverFolder(activeFolder); }}
                onDragLeave={() => setDragOverFolder(null)}
                onDrop={(e) => handleFileDrop(e, activeFolder, currentItem)}
                style={{
                  textAlign: 'center',
                  color: dragOverFolder === activeFolder ? '#1565c0' : '#999',
                  padding: 40,
                  border: dragOverFolder === activeFolder ? '2px dashed #1565c0' : '2px dashed #ddd',
                  borderRadius: 8,
                  background: dragOverFolder === activeFolder ? '#e3f2fd' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>{dragOverFolder === activeFolder ? '\u{1F4E5}' : '\u{1F4C2}'}</div>
                <p style={{ margin: 0 }}>{dragOverFolder === activeFolder ? 'Drop files here!' : 'No files in this folder yet.'}</p>
                <p style={{ margin: '8px 0 0', fontSize: 12 }}>Drag & drop files here or click "+ Add File"</p>
              </div>
            ) : (
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Name</th>
                    <th style={S.th}>Type</th>
                    <th style={S.th}>Added</th>
                    <th style={S.th}>Notes</th>
                    <th style={S.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {files.map(file => (
                    <tr key={file.id}>
                      <td style={S.td}>
                        {file.url ? (
                          <button
                            onClick={() => {
                              if (file.url.startsWith('data:')) {
                                const newWindow = window.open();
                                if (newWindow) {
                                  const doc = newWindow.document;
                                  doc.open();
                                  doc.write('<!DOCTYPE html><html><head><title>' + file.name + '</title><style>body{margin:0;padding:0;overflow:hidden;}</style></head><body></body></html>');
                                  doc.close();
                                  const elem = file.type === 'image' ? doc.createElement('img') : doc.createElement('iframe');
                                  elem.style.cssText = file.type === 'image' ? 'max-width:100%;display:block;' : 'width:100%;height:100vh;border:none;';
                                  elem.src = file.url;
                                  doc.body.appendChild(elem);
                                }
                              } else {
                                window.open(file.url, '_blank');
                              }
                            }}
                            style={{ background: 'none', border: 'none', color: '#1565c0', cursor: 'pointer', textAlign: 'left', padding: 0, font: 'inherit' }}
                          >
                            {file.type === 'link' ? '\u{1F517}' : file.type === 'pdf' ? '\u{1F4C4}' : file.type === 'image' ? '\u{1F5BC}\uFE0F' : '\u{1F4CE}'} {file.name}
                          </button>
                        ) : (
                          <span>{file.name}</span>
                        )}
                      </td>
                      <td style={{ ...S.td, fontSize: 12, color: '#666' }}>{file.type}</td>
                      <td style={{ ...S.td, fontSize: 12, color: '#666' }}>{fmtDate(file.addedAt)}<br/>by {file.addedBy}</td>
                      <td style={{ ...S.td, fontSize: 12, color: '#666', maxWidth: 200 }}>{file.notes || '-'}</td>
                      <td style={S.td}>
                        <button
                          style={{ background: 'transparent', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: 14 }}
                          onClick={() => deleteFileFromFolder(activeFolder, file.id, currentItem)}
                          title="Delete file"
                        >{'\u{1F5D1}\uFE0F'}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      })()}
    </div>

    {/* Add File Modal for Quote */}
    {showAddFileModal && activeFolder && (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 32, maxWidth: 500, width: '90%', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
          <h2 style={{ margin: '0 0 20px' }}>Add File to {CUSTOMER_FOLDERS.find(f => f.id === activeFolder)?.name}</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>File Name *</label>
            <input
              style={S.input}
              placeholder="e.g., Permit Application, Site Photo, Inspection Report"
              value={newFile.name}
              onChange={e => setNewFile(p => ({ ...p, name: e.target.value }))}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Type</label>
            <select
              style={S.select}
              value={newFile.type}
              onChange={e => setNewFile(p => ({ ...p, type: e.target.value }))}
            >
              <option value="link">{'\u{1F517}'} Link / URL</option>
              <option value="pdf">{'\u{1F4C4}'} PDF Document</option>
              <option value="image">{'\u{1F5BC}\uFE0F'} Image</option>
              <option value="note">{'\u{1F4DD}'} Note Only</option>
            </select>
          </div>

          {newFile.type !== 'note' && (
            <div style={{ marginBottom: 16 }}>
              <label style={S.label}>URL *</label>
              <input
                style={S.input}
                placeholder="https://..."
                value={newFile.url}
                onChange={e => setNewFile(p => ({ ...p, url: e.target.value }))}
              />
              <p style={{ fontSize: 11, color: '#666', margin: '4px 0 0' }}>
                Paste a link to the file (Google Drive, Dropbox, website, etc.)
              </p>
            </div>
          )}

          <div style={{ marginBottom: 24 }}>
            <label style={S.label}>Notes (optional)</label>
            <textarea
              style={{ ...S.input, height: 80, resize: 'vertical' }}
              placeholder="Any additional notes..."
              value={newFile.notes}
              onChange={e => setNewFile(p => ({ ...p, notes: e.target.value }))}
            />
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button style={S.btn2} onClick={() => setShowAddFileModal(false)}>Cancel</button>
            <button style={{ ...S.btn, width: 'auto' }} onClick={() => addFileToFolder(activeFolder, currentItem)}>Add File</button>
          </div>
        </div>
      </div>
    )}

    {/* Home & Foundation Notes Section */}
    {(currentItem.serviceNotes?.home_selection || currentItem.serviceCrewNotes?.home_selection ||
      currentItem.serviceNotes?.foundation || currentItem.serviceCrewNotes?.foundation) && (
      <div style={S.box}>
        <h2 style={{ marginTop: 0, borderBottom: '2px solid #2c5530', paddingBottom: 8 }}>{'\u{1F3E0}'} Home & Foundation Notes</h2>
        <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>Special instructions for home selection and foundation</p>

        {(currentItem.serviceNotes?.home_selection || currentItem.serviceCrewNotes?.home_selection) && (
          <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8, marginBottom: 12, borderLeft: '4px solid #2c5530' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#2c5530', marginBottom: 8 }}>{'\u{1F3E0}'} Home Selection</div>

            {currentItem.serviceNotes?.home_selection && (
              <div style={{ background: '#e3f2fd', padding: 10, borderRadius: 4, marginTop: 8, borderLeft: '3px solid #1565c0' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#1565c0', marginBottom: 4 }}>{'\u{1F4CB}'} Customer Note:</div>
                <div style={{ fontSize: 13, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{currentItem.serviceNotes.home_selection}</div>
              </div>
            )}

            {isAdmin && currentItem.serviceCrewNotes?.home_selection && (
              <div style={{ background: '#fff3e0', padding: 10, borderRadius: 4, marginTop: 8, borderLeft: '3px solid #e65100' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#e65100', marginBottom: 4 }}>{'\u{1F527}'} Crew Note (Internal Only):</div>
                <div style={{ fontSize: 13, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{currentItem.serviceCrewNotes.home_selection}</div>
              </div>
            )}
          </div>
        )}

        {(currentItem.serviceNotes?.foundation || currentItem.serviceCrewNotes?.foundation) && (
          <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8, marginBottom: 12, borderLeft: '4px solid #dc3545' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#2c5530', marginBottom: 8 }}>{'\u{1F3D7}\uFE0F'} Foundation Type</div>

            {currentItem.serviceNotes?.foundation && (
              <div style={{ background: '#e3f2fd', padding: 10, borderRadius: 4, marginTop: 8, borderLeft: '3px solid #1565c0' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#1565c0', marginBottom: 4 }}>{'\u{1F4CB}'} Customer Note:</div>
                <div style={{ fontSize: 13, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{currentItem.serviceNotes.foundation}</div>
              </div>
            )}

            {isAdmin && currentItem.serviceCrewNotes?.foundation && (
              <div style={{ background: '#fff3e0', padding: 10, borderRadius: 4, marginTop: 8, borderLeft: '3px solid #e65100' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#e65100', marginBottom: 4 }}>{'\u{1F527}'} Crew Note (Internal Only):</div>
                <div style={{ fontSize: 13, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{currentItem.serviceCrewNotes.foundation}</div>
              </div>
            )}
          </div>
        )}
      </div>
    )}
  </>);
};

export default DetailsTab;
