import React from 'react';
import { fmt, genId, NotificationSystem } from '../../utils/index.js';
import { ALLOWANCE_ITEMS, SUMMARY_SERVICES, DEFAULT_SERVICES } from '../../constants/index.js';

const fmtDate = d => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

/**
 * ScrubbTab - The "Scrubb" cost-tracking tab for accepted/contracted quotes.
 * Tracks actual costs vs contract prices, allowance variances,
 * contingency fund, permits, and payments.
 */
const ScrubbTab = ({
  S, currentItem, custForQuote, totals,
  selQuote, setSelQuote,
  selContract, setSelContract,
  quotes, setQuotes,
  contracts, setContracts,
  saveQuotes, saveContracts,
  userName,
  scrubbEditingService, setScrubbEditingService,
  scrubbNewCost, setScrubbNewCost,
  showPermitModal, setShowPermitModal,
  editingPermitEntry, setEditingPermitEntry,
  permitEntryName, setPermitEntryName,
  permitEntryCost, setPermitEntryCost,
  showPaymentForm, setShowPaymentForm,
  newPayment, setNewPayment,
  saveAllowanceProgressToFolders,
}) => {
  return (
    <div style={S.box}>
      <h2 style={{ marginTop: 0, borderBottom: '2px solid #2c5530', paddingBottom: 8 }}>{'\u{1F4B0}'} Project Cost Tracking (Scrubb)</h2>
      <p style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>
        Track actual costs for professional services as the project progresses. Upload documents like lien waivers, receipts, and contracts for each service.
      </p>

      {(() => {
        if (!totals) {
          return (
            <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>
              <p>Unable to load cost tracking data.</p>
              <p style={{ fontSize: 12 }}>Totals not calculated. Please refresh the page.</p>
            </div>
          );
        }

        const services = DEFAULT_SERVICES;
        const trackingItems = [];

        // Determine which services were added via change orders
        const changeOrderAdditions = new Set();
        (currentItem.changeOrderHistory || []).forEach(co => {
          if (!co.isReversal) {
            (co.additions || []).forEach(key => changeOrderAdditions.add(key));
          }
        });

        // 1. Home from Dealership
        if (totals?.homePrice > 0) {
          trackingItems.push({
            key: 'home_dealership',
            name: 'Home from Dealership',
            contractPrice: totals.homePrice,
            actualCost: currentItem.scrubbCosts?.home_dealership || 0,
            variance: (currentItem.scrubbCosts?.home_dealership || 0) > 0 ? totals.homePrice - (currentItem.scrubbCosts?.home_dealership || 0) : 0,
            variancePct: totals.homePrice > 0 && (currentItem.scrubbCosts?.home_dealership || 0) > 0 ? (((totals.homePrice - (currentItem.scrubbCosts?.home_dealership || 0)) / totals.homePrice) * 100).toFixed(1) : '0.0',
            docs: currentItem.scrubbDocs?.home_dealership || []
          });
        }

        // 2. Installation of Home
        const installService = totals?.svc?.find(s => s.key === 'installation_of_home');
        if (installService) {
          trackingItems.push({
            key: 'installation_of_home',
            name: 'Installation of Home',
            contractPrice: installService.cost,
            actualCost: currentItem.scrubbCosts?.installation_of_home || 0,
            variance: (currentItem.scrubbCosts?.installation_of_home || 0) > 0 ? installService.cost - (currentItem.scrubbCosts?.installation_of_home || 0) : 0,
            variancePct: installService.cost > 0 && (currentItem.scrubbCosts?.installation_of_home || 0) > 0 ? (((installService.cost - (currentItem.scrubbCosts?.installation_of_home || 0)) / installService.cost) * 100).toFixed(1) : '0.0',
            docs: currentItem.scrubbDocs?.installation_of_home || []
          });
        }

        // 3. Professional services
        const contractedServices = Object.entries(currentItem.selectedServices || {})
          .filter(([key, selected]) => selected && !SUMMARY_SERVICES.includes(key) && services[key])
          .map(([key]) => {
            const svc = services[key];
            const contractPrice = totals?.svc?.find(s => s.key === key)?.cost || 0;
            const actualCost = currentItem.scrubbCosts?.[key] || 0;
            const variance = actualCost > 0 ? contractPrice - actualCost : 0;
            const variancePct = contractPrice > 0 && actualCost > 0 ? ((variance / contractPrice) * 100).toFixed(1) : '0.0';
            const isAllowance = ALLOWANCE_ITEMS.includes(key);

            return {
              key,
              name: svc?.name || key,
              contractPrice,
              actualCost,
              variance,
              variancePct,
              docs: currentItem.scrubbDocs?.[key] || [],
              isAllowance,
              isChangeOrderAddition: changeOrderAdditions.has(key)
            };
          });

        trackingItems.push(...contractedServices);

        if (trackingItems.length === 0) {
          return (
            <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>
              <p>No items to track for this quote.</p>
              <p style={{ fontSize: 12 }}>Items appear here when services are selected or home is included in the quote.</p>
            </div>
          );
        }

        return (
          <div>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Service</th>
                  <th style={S.th}>Contract Price</th>
                  <th style={S.th}>Actual Cost</th>
                  <th style={S.th}>Variance</th>
                  <th style={S.th}>Documents</th>
                  <th style={S.th}></th>
                </tr>
              </thead>
              <tbody>
                {trackingItems.map(svc => {
                  // Special handling for permits
                  if (svc.key === 'permits') {
                    return <PermitRow
                      key={svc.key}
                      svc={svc} S={S} currentItem={currentItem}
                      setQuotes={setQuotes} setSelQuote={setSelQuote}
                      userName={userName}
                      setEditingPermitEntry={setEditingPermitEntry}
                      setPermitEntryName={setPermitEntryName}
                      setPermitEntryCost={setPermitEntryCost}
                      setShowPermitModal={setShowPermitModal}
                    />;
                  }

                  // Regular service row
                  return <ServiceRow
                    key={svc.key}
                    svc={svc} S={S} currentItem={currentItem}
                    selQuote={selQuote} setSelQuote={setSelQuote}
                    selContract={selContract} setSelContract={setSelContract}
                    quotes={quotes} contracts={contracts}
                    saveQuotes={saveQuotes} saveContracts={saveContracts}
                    userName={userName}
                    scrubbEditingService={scrubbEditingService}
                    setScrubbEditingService={setScrubbEditingService}
                    scrubbNewCost={scrubbNewCost}
                    setScrubbNewCost={setScrubbNewCost}
                    setQuotes={setQuotes}
                  />;
                })}
              </tbody>
            </table>

            {/* Summary Section */}
            <div style={{ marginTop: 32, padding: 20, background: '#f8f9fa', borderRadius: 8 }}>
              <h3 style={{ marginTop: 0 }}>Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#666' }}>Total Contract Price</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#2c5530' }}>
                    {fmt(contractedServices.reduce((sum, s) => sum + s.contractPrice, 0))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#666' }}>Total Actual Cost</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#1565c0' }}>
                    {fmt(contractedServices.reduce((sum, s) => sum + s.actualCost, 0))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#666' }}>Total Variance</div>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: (() => {
                      const totalVariance = contractedServices.reduce((sum, s) => sum + s.variance, 0);
                      return totalVariance > 0 ? '#28a745' : totalVariance < 0 ? '#dc3545' : '#666';
                    })()
                  }}>
                    {(() => {
                      const totalVariance = contractedServices.reduce((sum, s) => sum + s.variance, 0);
                      return (totalVariance >= 0 ? '+' : '') + fmt(totalVariance);
                    })()}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 11, color: '#666', marginTop: 12, marginBottom: 0 }}>
                * Variance = Contract Price - Actual Cost (positive = under budget, negative = over budget)
              </p>
            </div>

            {/* Contingency Fund Tracker */}
            <ContingencyTracker
              S={S} currentItem={currentItem} totals={totals}
              trackingItems={trackingItems}
              selQuote={selQuote} setSelQuote={setSelQuote}
              selContract={selContract} setSelContract={setSelContract}
              quotes={quotes} contracts={contracts}
              saveQuotes={saveQuotes} saveContracts={saveContracts}
              userName={userName}
              showPaymentForm={showPaymentForm} setShowPaymentForm={setShowPaymentForm}
              newPayment={newPayment} setNewPayment={setNewPayment}
              saveAllowanceProgressToFolders={saveAllowanceProgressToFolders}
              custForQuote={custForQuote}
            />
          </div>
        );
      })()}

      {/* Permit Entry Modal */}
      {showPermitModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#fff', padding: 32, borderRadius: 8,
            maxWidth: 500, width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ marginTop: 0 }}>
              {editingPermitEntry ? 'Edit Permit' : 'Add Permit'}
            </h3>

            <div style={{ marginBottom: 16 }}>
              <label style={{ ...S.label, color: '#333' }}>Permit Name</label>
              <input
                type="text"
                style={S.input}
                value={permitEntryName}
                onChange={e => setPermitEntryName(e.target.value)}
                placeholder="e.g., Building Permit, Electrical Permit"
                autoFocus
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ ...S.label, color: '#333' }}>Actual Cost</label>
              <input
                type="number"
                style={S.input}
                value={permitEntryCost}
                onChange={e => setPermitEntryCost(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                style={{ ...S.btn2, background: '#666' }}
                onClick={() => {
                  setShowPermitModal(false);
                  setEditingPermitEntry(null);
                  setPermitEntryName('');
                  setPermitEntryCost('');
                }}
              >Cancel</button>
              <button
                style={S.btn}
                onClick={() => {
                  if (!permitEntryName.trim()) {
                    alert('Please enter a permit name');
                    return;
                  }

                  const cost = parseFloat(permitEntryCost) || 0;
                  const currentEntries = currentItem.permitEntries || [];

                  let updatedEntries;
                  if (editingPermitEntry) {
                    updatedEntries = currentEntries.map(entry =>
                      entry.id === editingPermitEntry.id
                        ? { ...entry, name: permitEntryName, cost }
                        : entry
                    );
                  } else {
                    const newEntry = {
                      id: genId(),
                      name: permitEntryName,
                      cost,
                      addedAt: new Date().toISOString(),
                      addedBy: userName
                    };
                    updatedEntries = [...currentEntries, newEntry];
                  }

                  setQuotes(prev => prev.map(q =>
                    q.id === currentItem.id
                      ? { ...q, permitEntries: updatedEntries, updatedAt: Date.now(), updatedBy: userName }
                      : q
                  ));
                  if (selQuote && selQuote.id === currentItem.id) {
                    setSelQuote(prev => ({ ...prev, permitEntries: updatedEntries, updatedAt: Date.now(), updatedBy: userName }));
                  }
                  if (selContract && selContract.id === currentItem.id) {
                    setSelContract(prev => ({ ...prev, permitEntries: updatedEntries, updatedAt: Date.now(), updatedBy: userName }));
                  }

                  setShowPermitModal(false);
                  setEditingPermitEntry(null);
                  setPermitEntryName('');
                  setPermitEntryCost('');
                }}
              >
                {editingPermitEntry ? 'Update' : 'Add'} Permit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/** Permit row in the scrubb table */
const PermitRow = ({ svc, S, currentItem, setQuotes, setSelQuote, userName, setEditingPermitEntry, setPermitEntryName, setPermitEntryCost, setShowPermitModal }) => {
  const permitEntries = currentItem.permitEntries || [];
  const totalPermitCost = permitEntries.reduce((sum, entry) => sum + (parseFloat(entry.cost) || 0), 0);
  const variance = totalPermitCost > 0 ? svc.contractPrice - totalPermitCost : 0;
  const variancePct = svc.contractPrice > 0 && totalPermitCost > 0 ? ((variance / svc.contractPrice) * 100).toFixed(1) : '0.0';

  return (
    <tr>
      <td style={S.td}>
        <strong>{svc.name}</strong>
        {svc.isAllowance && <span style={{ marginLeft: 8, fontSize: 11, color: '#856404', fontWeight: 600, background: '#ffc107', padding: '2px 6px', borderRadius: 3 }}>ALLOWANCE</span>}
      </td>
      <td style={{ ...S.td, color: '#2c5530', fontWeight: 600 }}>{fmt(svc.contractPrice)}</td>
      <td style={S.td}>
        <div>
          {permitEntries.length > 0 ? (
            <div style={{ marginBottom: 8 }}>
              {permitEntries.map((entry, index) => (
                <div key={entry.id || index} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '4px 8px', marginBottom: 4, background: '#f8f9fa', borderRadius: 4, fontSize: 13
                }}>
                  <span>{entry.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 600 }}>{fmt(entry.cost)}</span>
                    <button
                      style={{ background: 'transparent', border: 'none', color: '#1565c0', cursor: 'pointer', fontSize: 11, padding: 0 }}
                      onClick={() => {
                        setEditingPermitEntry(entry);
                        setPermitEntryName(entry.name);
                        setPermitEntryCost(entry.cost.toString());
                        setShowPermitModal(true);
                      }}
                      title="Edit"
                    >{'\u270F\uFE0F'}</button>
                    <button
                      style={{ background: 'transparent', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: 11, padding: 0 }}
                      onClick={() => {
                        if (confirm(`Delete ${entry.name}?`)) {
                          const updatedEntries = permitEntries.filter((_, i) => i !== index);
                          setQuotes(prev => prev.map(q =>
                            q.id === currentItem.id
                              ? { ...q, permitEntries: updatedEntries, updatedAt: Date.now(), updatedBy: userName }
                              : q
                          ));
                          setSelQuote(prev => ({ ...prev, permitEntries: updatedEntries, updatedAt: Date.now(), updatedBy: userName }));
                        }
                      }}
                      title="Delete"
                    >{'\u{1F5D1}\uFE0F'}</button>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #ddd', paddingTop: 4, marginTop: 4, fontWeight: 600, fontSize: 14 }}>
                Total: {fmt(totalPermitCost)}
              </div>
            </div>
          ) : (
            <div style={{ color: '#999', marginBottom: 8 }}>No permits entered</div>
          )}
          <button
            style={{ ...S.btnSm, padding: '4px 12px', fontSize: 12, width: '100%' }}
            onClick={() => {
              setEditingPermitEntry(null);
              setPermitEntryName('');
              setPermitEntryCost('');
              setShowPermitModal(true);
            }}
          >+ Add Permit</button>
        </div>
      </td>
      <td style={{
        ...S.td,
        color: totalPermitCost > 0 ? (variance > 0 ? '#28a745' : variance < 0 ? '#dc3545' : '#666') : '#999',
        fontWeight: totalPermitCost > 0 ? 600 : 400
      }}>
        {totalPermitCost > 0 ? (
          <>{variance >= 0 ? '+' : ''}{fmt(variance)} ({variancePct}%)</>
        ) : '-'}
      </td>
      <td style={S.td}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#666' }}>
            {svc.docs.length} file{svc.docs.length !== 1 ? 's' : ''}
          </span>
          <button
            style={{ ...S.btnSm, padding: '4px 8px', fontSize: 11 }}
            onClick={() => {
              const fileName = prompt('Enter document name (e.g., "Building Permit", "Electrical Permit"):');
              if (!fileName) return;
              const fileUrl = prompt('Enter document URL (Google Drive, Dropbox, etc.):');
              if (!fileUrl) return;

              const doc = {
                id: genId(),
                name: fileName,
                url: fileUrl,
                addedAt: new Date().toISOString(),
                addedBy: userName
              };

              const updatedDocs = { ...(currentItem.scrubbDocs || {}), [svc.key]: [...(currentItem.scrubbDocs?.[svc.key] || []), doc] };
              setQuotes(prev => prev.map(q =>
                q.id === currentItem.id ? { ...q, scrubbDocs: updatedDocs, updatedAt: Date.now(), updatedBy: userName } : q
              ));
              setSelQuote(prev => ({ ...prev, scrubbDocs: updatedDocs, updatedAt: Date.now(), updatedBy: userName }));
            }}
          >{'\u{1F4CE}'} Add</button>
        </div>
      </td>
      <td style={S.td}></td>
    </tr>
  );
};

/** Regular service row in the scrubb table */
const ServiceRow = ({ svc, S, currentItem, selQuote, setSelQuote, selContract, setSelContract, quotes, contracts, saveQuotes, saveContracts, userName, scrubbEditingService, setScrubbEditingService, scrubbNewCost, setScrubbNewCost, setQuotes }) => {
  const [coUnitPrice, setCoUnitPrice] = React.useState('');
  const [coQuantity, setCoQuantity] = React.useState('1');

  const isEditing = scrubbEditingService === svc.key;
  const isCO = svc.isChangeOrderAddition;

  const handleStartEdit = () => {
    setScrubbEditingService(svc.key);
    if (isCO) {
      const details = currentItem.scrubbCODetails?.[svc.key];
      if (details) {
        setCoUnitPrice(details.unitPrice?.toString() || '');
        setCoQuantity(details.quantity?.toString() || '1');
      } else {
        setCoUnitPrice(svc.actualCost > 0 ? svc.actualCost.toString() : '');
        setCoQuantity('1');
      }
    } else {
      setScrubbNewCost(svc.actualCost.toString());
    }
  };

  const handleCancelEdit = () => {
    setScrubbEditingService(null);
    setScrubbNewCost('');
  };

  const handleSaveCO = () => {
    const unitPrice = parseFloat(coUnitPrice) || 0;
    const qty = parseInt(coQuantity) || 1;
    const cost = unitPrice * qty;
    const previousCost = svc.actualCost || 0;

    const historyEntry = {
      id: genId(),
      serviceKey: svc.key,
      serviceName: svc.name,
      previousCost,
      newCost: cost,
      unitPrice,
      quantity: qty,
      contractPrice: svc.contractPrice,
      variance: cost > 0 ? svc.contractPrice - cost : 0,
      isAllowance: false,
      isChangeOrderAddition: true,
      updatedAt: new Date().toISOString(),
      updatedBy: userName
    };

    const updatedItem = {
      ...currentItem,
      scrubbCosts: { ...(currentItem.scrubbCosts || {}), [svc.key]: cost },
      scrubbCODetails: {
        ...(currentItem.scrubbCODetails || {}),
        [svc.key]: { unitPrice, quantity: qty }
      },
      scrubbHistory: [...(currentItem.scrubbHistory || []), historyEntry],
      updatedAt: Date.now(),
      updatedBy: userName
    };

    if (selQuote && selQuote.id === currentItem.id) {
      const updated = quotes.map(q => q.id === currentItem.id ? updatedItem : q);
      saveQuotes(updated);
      setSelQuote(updatedItem);
    } else if (selContract && selContract.id === currentItem.id) {
      const updated = contracts.map(c => c.id === currentItem.id ? updatedItem : c);
      saveContracts(updated);
      setSelContract(updatedItem);
    }

    setScrubbEditingService(null);
    setScrubbNewCost('');
  };

  const handleSaveRegular = () => {
    const cost = parseFloat(scrubbNewCost) || 0;
    const previousCost = svc.actualCost || 0;
    const isAllowanceItem = ALLOWANCE_ITEMS.includes(svc.key);

    const historyEntry = {
      id: genId(),
      serviceKey: svc.key,
      serviceName: svc.name,
      previousCost: previousCost,
      newCost: cost,
      contractPrice: svc.contractPrice,
      variance: cost > 0 ? svc.contractPrice - cost : 0,
      isAllowance: isAllowanceItem,
      updatedAt: new Date().toISOString(),
      updatedBy: userName
    };

    const updatedItem = {
      ...currentItem,
      scrubbCosts: { ...(currentItem.scrubbCosts || {}), [svc.key]: cost },
      scrubbHistory: [...(currentItem.scrubbHistory || []), historyEntry],
      updatedAt: Date.now(),
      updatedBy: userName
    };

    if (selQuote && selQuote.id === currentItem.id) {
      const updated = quotes.map(q => q.id === currentItem.id ? updatedItem : q);
      saveQuotes(updated);
      setSelQuote(updatedItem);
    } else if (selContract && selContract.id === currentItem.id) {
      const updated = contracts.map(c => c.id === currentItem.id ? updatedItem : c);
      saveContracts(updated);
      setSelContract(updatedItem);
    }

    setScrubbEditingService(null);
    setScrubbNewCost('');

    if (isAllowanceItem) {
      const varianceVal = cost > 0 ? svc.contractPrice - cost : 0;
      const message = varianceVal > 0
        ? `\u2705 Allowance updated!\n\n${svc.name} came in ${fmt(varianceVal)} under budget.\nThis amount has been added to the contingency fund.`
        : varianceVal < 0
        ? `\u26A0\uFE0F Allowance updated!\n\n${svc.name} is ${fmt(Math.abs(varianceVal))} over budget.\nThis amount will be drawn from the contingency fund.`
        : `\u2705 Allowance updated!\n\n${svc.name} is exactly on budget.`;
      alert(message);
    }
  };

  return (
    <tr>
      <td style={S.td}>
        <strong>{svc.name}</strong>
        {svc.isAllowance && <span style={{ marginLeft: 8, fontSize: 11, color: '#856404', fontWeight: 600, background: '#ffc107', padding: '2px 6px', borderRadius: 3 }}>ALLOWANCE</span>}
        {isCO && <span style={{ marginLeft: 8, fontSize: 11, color: '#fff', fontWeight: 600, background: '#17a2b8', padding: '2px 6px', borderRadius: 3 }}>CHANGE ORDER</span>}
      </td>
      <td style={{ ...S.td, color: '#2c5530', fontWeight: 600 }}>{fmt(svc.contractPrice)}</td>
      <td style={S.td}>
        {isEditing ? (
          isCO ? (
            /* Change Order service: editable unit price + quantity */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 10, color: '#666', display: 'block', marginBottom: 2 }}>Unit Price</label>
                  <input
                    type="number"
                    style={{ ...S.inputEdit, width: '100%' }}
                    value={coUnitPrice}
                    onChange={e => setCoUnitPrice(e.target.value)}
                    placeholder="0.00"
                    autoFocus
                  />
                </div>
                <div style={{ width: 60 }}>
                  <label style={{ fontSize: 10, color: '#666', display: 'block', marginBottom: 2 }}>Qty</label>
                  <input
                    type="number"
                    style={{ ...S.inputEdit, width: '100%' }}
                    value={coQuantity}
                    onChange={e => setCoQuantity(e.target.value)}
                    placeholder="1"
                    min="1"
                  />
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#1565c0', fontWeight: 600 }}>
                Total: {fmt((parseFloat(coUnitPrice) || 0) * (parseInt(coQuantity) || 1))}
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  style={{ ...S.btnSm, padding: '4px 8px', background: '#28a745' }}
                  onClick={handleSaveCO}
                >{'\u2713'}</button>
                <button
                  style={{ ...S.btnSm, padding: '4px 8px', background: '#dc3545' }}
                  onClick={handleCancelEdit}
                >{'\u2715'}</button>
              </div>
            </div>
          ) : (
            /* Regular service: single cost input */
            <div style={{ display: 'flex', gap: 4 }}>
              <input
                type="number"
                style={{ ...S.inputEdit, width: 100 }}
                value={scrubbNewCost}
                onChange={e => setScrubbNewCost(e.target.value)}
                placeholder="0.00"
                autoFocus
              />
              <button
                style={{ ...S.btnSm, padding: '4px 8px', background: '#28a745' }}
                onClick={handleSaveRegular}
              >{'\u2713'}</button>
              <button
                style={{ ...S.btnSm, padding: '4px 8px', background: '#dc3545' }}
                onClick={handleCancelEdit}
              >{'\u2715'}</button>
            </div>
          )
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {isCO && svc.actualCost > 0 ? (
              <span>
                {(() => {
                  const details = currentItem.scrubbCODetails?.[svc.key];
                  if (details && details.quantity > 1) {
                    return `${details.quantity} \u00D7 ${fmt(details.unitPrice)} = ${fmt(svc.actualCost)}`;
                  }
                  return fmt(svc.actualCost);
                })()}
              </span>
            ) : (
              <span style={{ color: svc.actualCost > 0 ? '#000' : '#999' }}>
                {svc.actualCost > 0 ? fmt(svc.actualCost) : 'Not entered'}
              </span>
            )}
            <button
              style={{ background: 'transparent', border: 'none', color: '#1565c0', cursor: 'pointer', fontSize: 12 }}
              onClick={handleStartEdit}
            >{'\u270F\uFE0F'}</button>
          </div>
        )}
      </td>
      <td style={{
        ...S.td,
        color: svc.actualCost > 0 ? (svc.variance > 0 ? '#28a745' : svc.variance < 0 ? '#dc3545' : '#666') : '#999',
        fontWeight: svc.actualCost > 0 ? 600 : 400
      }}>
        {svc.actualCost > 0 ? (
          <>{svc.variance >= 0 ? '+' : ''}{fmt(svc.variance)} ({svc.variancePct}%)</>
        ) : '-'}
      </td>
      <td style={S.td}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#666' }}>
            {svc.docs.length} file{svc.docs.length !== 1 ? 's' : ''}
          </span>
          <button
            style={{ ...S.btnSm, padding: '4px 8px', fontSize: 11 }}
            onClick={() => {
              const fileName = prompt('Enter document name (e.g., "Lien Waiver", "Receipt", "Contract"):');
              if (!fileName) return;
              const fileUrl = prompt('Enter document URL (or leave blank for note only):');
              const notes = prompt('Enter notes (optional):');

              const newDoc = {
                id: Date.now().toString(),
                name: fileName,
                url: fileUrl || '',
                notes: notes || '',
                addedAt: Date.now(),
                addedBy: userName
              };

              setQuotes(prev => prev.map(q =>
                q.id === currentItem.id
                  ? {
                      ...q,
                      scrubbDocs: {
                        ...(q.scrubbDocs || {}),
                        [svc.key]: [...(q.scrubbDocs?.[svc.key] || []), newDoc]
                      },
                      updatedAt: Date.now(),
                      updatedBy: userName
                    }
                  : q
              ));
              setSelQuote(prev => ({
                ...prev,
                scrubbDocs: {
                  ...(prev.scrubbDocs || {}),
                  [svc.key]: [...(prev.scrubbDocs?.[svc.key] || []), newDoc]
                },
                updatedAt: Date.now(),
                updatedBy: userName
              }));
            }}
          >+ Add Doc</button>
        </div>
      </td>
      <td style={S.td}>
        {svc.docs.length > 0 && (
          <button
            style={{ background: 'transparent', border: 'none', color: '#1565c0', cursor: 'pointer', fontSize: 12 }}
            onClick={() => {
              const docList = svc.docs.map((d, i) => `${i + 1}. ${d.name} (${fmtDate(d.addedAt)} by ${d.addedBy})`).join('\n');
              alert(`Documents for ${svc.name}:\n\n${docList}`);
            }}
          >{'\u{1F4C4}'} View</button>
        )}
      </td>
    </tr>
  );
};

/** Contingency Fund Tracker - Tracks the 2% contingency fund balance.
 *  The fund is a customer lifeline: it absorbs allowance overages and
 *  change-order service costs so the contract bottom line never changes.
 *  If the fund goes negative the customer must pay to cover the deficit. */
const ContingencyTracker = ({
  S, currentItem, totals, trackingItems,
  selQuote, setSelQuote,
  selContract, setSelContract,
  quotes, contracts,
  saveQuotes, saveContracts,
  userName,
  showPaymentForm, setShowPaymentForm,
  newPayment, setNewPayment,
  saveAllowanceProgressToFolders,
  custForQuote,
}) => {
  const coHistory = currentItem.changeOrderHistory || [];

  // V2 TRACKER - Log all values for debugging
  console.log('=== CONTINGENCY TRACKER V2 ===');
  console.log('CO History:', JSON.stringify(coHistory.map(co => ({ additions: co.additions, contingencyUsed: co.contingencyUsed, contingencyBalance: co.contingencyBalance, totalChange: co.totalChange }))));
  console.log('Tracking items (CO):', trackingItems.filter(i => i.isChangeOrderAddition).map(i => ({ key: i.key, contractPrice: i.contractPrice })));
  console.log('totals.contingency (inflated):', totals.contingency);

  // ── Starting Fund ──
  // The original 2% contingency BEFORE any change orders inflated the total.
  // The CO save logic stores contingencyUsed + contingencyBalance = original fund.
  const startingContingency = coHistory.length > 0
    ? (coHistory[0].contingencyUsed || 0) + (coHistory[0].contingencyBalance || 0)
    : (totals.contingency || 0);

  // ── Change-Order Service Draws ──
  // Full contract price of every CO-added service is drawn from the fund.
  const coServiceItems = trackingItems.filter(item => item.isChangeOrderAddition);
  const coServiceCosts = coServiceItems.reduce((sum, item) => sum + item.contractPrice, 0);

  // ── Allowance Variances ──
  // Only count items where actual cost has been entered (actualCost > 0).
  const allowanceItems = trackingItems.filter(
    item => ALLOWANCE_ITEMS.includes(item.key) && item.actualCost > 0
  );
  const allowanceSavings = allowanceItems
    .filter(item => item.variance > 0)
    .reduce((sum, item) => sum + item.variance, 0);
  const allowanceOverages = allowanceItems
    .filter(item => item.variance < 0)
    .reduce((sum, item) => sum + Math.abs(item.variance), 0);

  // ── Customer Contingency Payments (refill the fund) ──
  const payments = currentItem.scrubbPayments || [];
  const contingencyPaymentsReceived = payments
    .filter(p => p.isContingencyPayment)
    .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  // ── Running Balance ──
  const currentBalance =
    startingContingency
    - coServiceCosts
    + allowanceSavings
    - allowanceOverages
    + contingencyPaymentsReceived;

  const fundOverdrafted = currentBalance < 0;
  const overdraftAmount = Math.abs(Math.min(0, currentBalance));

  return (
    <div style={{ marginTop: 24, padding: 20, background: '#e3f2fd', borderRadius: 8, border: '2px solid #1565c0' }}>
      <h3 style={{ marginTop: 0, color: '#1565c0' }}>Contingency Fund Tracker (v2)</h3>
      <p style={{ fontSize: 13, color: '#666', marginBottom: 16, lineHeight: 1.6 }}>
        <strong>Purpose:</strong> A 2% fund that acts as a lifeline for the customer.
        Allowance savings add to it; allowance overages and change-order services draw from it.
        The contract amount never changes — only this fund is affected.
        At project completion any remaining balance is returned to the customer.
      </p>

      {/* ── Top Cards: Starting Fund + Current Balance ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ padding: 12, background: '#fff', borderRadius: 6 }}>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Starting Fund (2%)</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#1565c0' }}>{fmt(startingContingency)}</div>
        </div>
        <div style={{ padding: 12, background: '#fff', borderRadius: 6 }}>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Current Balance</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: currentBalance >= 0 ? '#28a745' : '#dc3545' }}>
            {fmt(currentBalance)}
          </div>
        </div>
      </div>

      {/* ── Line-item Breakdown ── */}
      <div style={{ padding: 12, background: '#fff', borderRadius: 6, marginBottom: 12 }}>
        {coServiceItems.length > 0 && coServiceItems.map(item => (
          <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: '#333' }}>CO: {item.name}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#dc3545' }}>-{fmt(item.contractPrice)}</span>
          </div>
        ))}
        {allowanceItems.filter(i => i.variance > 0).map(item => (
          <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: '#333' }}>{item.name} (under budget)</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#28a745' }}>+{fmt(item.variance)}</span>
          </div>
        ))}
        {allowanceItems.filter(i => i.variance < 0).map(item => (
          <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: '#333' }}>{item.name} (over budget)</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#dc3545' }}>-{fmt(Math.abs(item.variance))}</span>
          </div>
        ))}
        {contingencyPaymentsReceived > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: '#333' }}>Customer Payments (refund)</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#28a745' }}>+{fmt(contingencyPaymentsReceived)}</span>
          </div>
        )}
        {coServiceItems.length === 0 && allowanceItems.length === 0 && contingencyPaymentsReceived === 0 && (
          <div style={{ fontSize: 13, color: '#999', textAlign: 'center', padding: 8 }}>
            No activity yet — the full 2% fund is available.
          </div>
        )}
      </div>

      {/* ── Overdraft Warning ── */}
      {fundOverdrafted && (
        <div style={{
          marginBottom: 12, padding: 16, borderRadius: 8,
          background: '#f8d7da', border: '2px solid #dc3545',
          animation: 'pulse 2s infinite'
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#721c24', marginBottom: 8 }}>
            {'\u26A0\uFE0F'} CONTINGENCY FUND OVERDRAFTED
          </div>
          <div style={{ fontSize: 14, color: '#721c24', marginBottom: 12 }}>
            The contingency fund has gone negative. The customer must pay <strong>{fmt(overdraftAmount)}</strong> to cover the deficit. The contract amount does not change.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <div style={{ padding: 10, background: '#fff', borderRadius: 4, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#666' }}>Total Draws</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#dc3545' }}>{fmt(coServiceCosts + allowanceOverages)}</div>
            </div>
            <div style={{ padding: 10, background: '#fff', borderRadius: 4, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#666' }}>Fund + Savings</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#28a745' }}>{fmt(startingContingency + allowanceSavings + contingencyPaymentsReceived)}</div>
            </div>
            <div style={{ padding: 10, background: '#fff', borderRadius: 4, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#666' }}>Customer Owes</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#dc3545' }}>{fmt(overdraftAmount)}</div>
            </div>
          </div>
        </div>
      )}

      <p style={{ fontSize: 11, color: '#666', marginTop: 0, marginBottom: 0, fontStyle: 'italic' }}>
        * Allowances (permits, well, sand pad, sewer, gravel driveway, crane) and change-order additions affect this fund. Other services are tracked separately.
      </p>

      {/* ── Allowance & CO History ── */}
      {(() => {
        const ci = selQuote || selContract;
        const scrubbHistory = (ci?.scrubbHistory || [])
          .filter(entry => entry.isAllowance || entry.isChangeOrderAddition)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        if (scrubbHistory.length === 0) return null;

        return (
          <div style={{ marginTop: 16, padding: 16, background: '#f8f9fa', borderRadius: 6, border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#2c5530', marginBottom: 12 }}>
              Allowance & Change Order History
            </div>
            <div style={{ maxHeight: 200, overflowY: 'auto' }}>
              {scrubbHistory.map(entry => {
                const date = new Date(entry.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const time = new Date(entry.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                const isCO = entry.isChangeOrderAddition;
                const v = entry.variance;
                const color = isCO ? '#17a2b8' : (v > 0 ? '#28a745' : v < 0 ? '#dc3545' : '#666');
                const label = isCO ? 'Change Order' : (v > 0 ? 'Under Budget' : v < 0 ? 'Over Budget' : 'On Budget');

                return (
                  <div key={entry.id} style={{
                    padding: 8, marginBottom: 8, background: '#fff', borderRadius: 4,
                    borderLeft: `3px solid ${color}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 4 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{entry.serviceName}</div>
                        <div style={{ fontSize: 11, color: '#666' }}>{date} at {time}</div>
                      </div>
                      <div style={{
                        fontSize: 11, fontWeight: 700,
                        color: isCO ? '#fff' : color,
                        padding: '2px 8px',
                        background: isCO ? '#17a2b8' : (v > 0 ? '#d1e7dd' : v < 0 ? '#f8d7da' : '#e0e0e0'),
                        borderRadius: 10
                      }}>
                        {label}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: '#666' }}>
                      {isCO && entry.quantity ? (
                        <>Cost: {entry.quantity} x {fmt(entry.unitPrice)} = {fmt(entry.newCost)} (drawn from contingency)</>
                      ) : (
                        <>Estimated: {fmt(entry.contractPrice)} &rarr; Actual: {fmt(entry.newCost)}
                        <span style={{ fontWeight: 700, color, marginLeft: 8 }}>
                          ({v >= 0 ? '+' : ''}{fmt(v)})
                        </span></>
                      )}
                    </div>
                    <div style={{ fontSize: 10, color: '#999', marginTop: 2 }}>
                      Updated by {entry.updatedBy}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* ── Payment Tracking ── */}
      {(() => {
        const ci = selQuote || selContract;
        if (!ci) return null;

        const pmts = ci.scrubbPayments || [];
        const totalPayments = pmts.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
        const contingencyPayments = pmts.filter(p => p.isContingencyPayment).reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
        const regularPayments = pmts.filter(p => !p.isContingencyPayment).reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

        const handleAddPayment = () => {
          if (!newPayment.amount || parseFloat(newPayment.amount) <= 0) {
            NotificationSystem.error('Please enter a valid payment amount');
            return;
          }

          const payment = {
            id: genId(),
            amount: parseFloat(newPayment.amount),
            date: newPayment.date || new Date().toISOString().split('T')[0],
            notes: newPayment.notes || '',
            isContingencyPayment: newPayment.isContingencyPayment || false,
            createdAt: new Date().toISOString(),
            createdBy: userName
          };

          const updatedItem = {
            ...ci,
            scrubbPayments: [...pmts, payment],
            updatedAt: Date.now(),
            updatedBy: userName
          };

          if (selQuote && selQuote.id === ci.id) {
            const updated = quotes.map(q => q.id === ci.id ? updatedItem : q);
            saveQuotes(updated);
            setSelQuote(updatedItem);
          } else if (selContract && selContract.id === ci.id) {
            const updated = contracts.map(c => c.id === ci.id ? updatedItem : c);
            saveContracts(updated);
            setSelContract(updatedItem);
          }

          setNewPayment({ amount: '', date: '', notes: '', isContingencyPayment: false });
          setShowPaymentForm(false);
          NotificationSystem.success('Payment recorded successfully');
        };

        return (
          <div style={{ marginTop: 16, padding: 16, background: '#e3f2fd', borderRadius: 6, border: '1px solid #2196f3' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1565c0', marginBottom: 12 }}>
              Payment Tracking
            </div>

            <div style={{ marginBottom: 16, padding: 12, background: '#fff', borderRadius: 4, border: '1px solid #e0e0e0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#666' }}>Total Payments</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1565c0' }}>{fmt(totalPayments)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#666' }}>Regular Payments</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#2196f3' }}>{fmt(regularPayments)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#666' }}>Contingency Fund</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#ff9800' }}>{fmt(contingencyPayments)}</div>
                </div>
              </div>
            </div>

            {fundOverdrafted && (
              <div style={{ marginBottom: 16, padding: 12, background: '#fff3cd', borderRadius: 4, border: '1px solid #ffc107' }}>
                <div style={{ fontSize: 12, color: '#856404', marginBottom: 8 }}>
                  {'\u26A0\uFE0F'} Contingency fund overdrafted by <strong>{fmt(overdraftAmount)}</strong> — customer must pay to refund.
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#666' }}>Overdraft Amount</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#dc3545' }}>{fmt(overdraftAmount)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#666' }}>Customer Paid</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#28a745' }}>{fmt(contingencyPayments)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#666' }}>Still Owed</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: (overdraftAmount - contingencyPayments) > 0 ? '#dc3545' : '#28a745' }}>
                      {fmt(Math.max(0, overdraftAmount - contingencyPayments))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment History */}
            {pmts.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#856404', marginBottom: 8 }}>
                  Payment History
                </div>
                <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                  {pmts
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map(payment => {
                      const paymentDate = payment.date ? new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';
                      const createdDate = new Date(payment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                      const createdTime = new Date(payment.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                      const isContingency = payment.isContingencyPayment;
                      const borderColor = isContingency ? '#ff9800' : '#28a745';

                      return (
                        <div key={payment.id} style={{
                          padding: 8, marginBottom: 8, background: '#fff', borderRadius: 4,
                          borderLeft: `3px solid ${borderColor}`
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 4 }}>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: borderColor }}>{fmt(payment.amount)}</div>
                              <div style={{ fontSize: 11, color: '#666' }}>Payment Date: {paymentDate}</div>
                            </div>
                            <div style={{
                              fontSize: 11, fontWeight: 600, color: isContingency ? '#ff9800' : '#28a745',
                              padding: '2px 8px',
                              background: isContingency ? '#fff3e0' : '#d1e7dd',
                              borderRadius: 10
                            }}>
                              {isContingency ? 'Contingency Fund' : 'Regular Payment'}
                            </div>
                          </div>
                          {payment.notes && (
                            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{payment.notes}</div>
                          )}
                          <div style={{ fontSize: 10, color: '#999', marginTop: 2 }}>
                            Recorded on {createdDate} at {createdTime} by {payment.createdBy}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Add Payment Form */}
            {!showPaymentForm ? (
              <button
                style={{ ...S.btn, width: '100%', background: '#28a745' }}
                onClick={() => setShowPaymentForm(true)}
              >
                + Add Payment
              </button>
            ) : (
              <div style={{ padding: 12, background: '#fff', borderRadius: 4, border: '1px solid #e0e0e0' }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Record New Payment</div>

                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, display: 'block', marginBottom: 4, color: '#666' }}>
                    Payment Amount *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment(prev => ({ ...prev, amount: e.target.value }))}
                    style={{ ...S.input, width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, display: 'block', marginBottom: 4, color: '#666' }}>
                    Payment Date
                  </label>
                  <input
                    type="date"
                    value={newPayment.date || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setNewPayment(prev => ({ ...prev, date: e.target.value }))}
                    style={{ ...S.input, width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, display: 'block', marginBottom: 4, color: '#666' }}>
                    Notes (optional)
                  </label>
                  <textarea
                    placeholder="Payment method, check number, etc."
                    value={newPayment.notes}
                    onChange={(e) => setNewPayment(prev => ({ ...prev, notes: e.target.value }))}
                    style={{ ...S.input, width: '100%', minHeight: 60, resize: 'vertical' }}
                  />
                </div>

                <div style={{ marginBottom: 12, padding: 12, background: '#fff3e0', borderRadius: 4, border: '1px solid #ff9800' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={newPayment.isContingencyPayment}
                      onChange={(e) => setNewPayment(prev => ({ ...prev, isContingencyPayment: e.target.checked }))}
                      style={{ marginRight: 8, width: 16, height: 16, cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#856404' }}>
                      Apply to Contingency Fund
                    </span>
                  </label>
                  <div style={{ fontSize: 11, color: '#666', marginTop: 4, marginLeft: 24 }}>
                    Check this if customer is paying to refund the contingency fund
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    style={{ ...S.btn, flex: 1, background: '#28a745' }}
                    onClick={handleAddPayment}
                  >
                    Save Payment
                  </button>
                  <button
                    style={{ ...S.btn, flex: 1, background: '#6c757d' }}
                    onClick={() => {
                      setShowPaymentForm(false);
                      setNewPayment({ amount: '', date: '', notes: '', isContingencyPayment: false });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      <button
        style={{ ...S.btn, width: '100%', marginTop: 16, background: '#1565c0' }}
        onClick={() => saveAllowanceProgressToFolders(selQuote || selContract, custForQuote)}
        title="Generate and save allowance progress update for customer"
      >
        Generate Customer Update
      </button>
    </div>
  );
};

export default ScrubbTab;
