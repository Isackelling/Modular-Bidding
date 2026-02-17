import React from 'react';
import { fmt, genId, DocumentUtils, NotificationSystem } from '../../utils/index.js';
import { ALLOWANCE_ITEMS, SUMMARY_SERVICES, HOME_OPTIONS, DEFAULT_SERVICES, HOME_MARKUP } from '../../constants/index.js';

/**
 * CUSTOMER_FOLDERS is defined locally in the main file (not exported from constants).
 * We re-declare it here so the component is self-contained.
 */
const CUSTOMER_FOLDERS = [
  { id: 'clayton_docs', name: 'Clayton Docs', icon: '\u{1F4CB}', description: 'Factory documents, specs, order confirmations' },
  { id: 'crew_files', name: 'Crew Files', icon: '\u{1F527}', description: 'Installation docs, checklists, photos' },
  { id: 'estimates', name: 'Estimates', icon: '\u{1F4B0}', description: 'Quotes, pricing, allowances' },
  { id: 'permits', name: 'Permits', icon: '\u{1F4DC}', description: 'Building permits, inspections, approvals' },
  { id: 'change_orders', name: 'Customer Docs', icon: '\u{1F4C4}', description: 'Change orders, contingency updates, customer communications' },
];

/** Format a date for display */
const fmtDate = d => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

/**
 * QuoteView - Displays the full quote/contract viewer with tabs for
 * Details, Customer Quote, Scrubb, and Scope of Work.
 *
 * This component was extracted from the monolithic sherman-bidding-system.jsx
 * (lines 9944-12906, the view === 'viewQuote' section).
 */
const QuoteView = ({
  // Styles
  S,
  // Core data for the currently viewed item
  currentItem,
  custForQuote,
  totals,
  // Selected quote/contract
  selQuote, setSelQuote,
  selContract, setSelContract,
  selCustomer, setSelCustomer,
  // Pricing data
  services,
  materials,
  sewerPricing,
  patioPricing,
  driveRates,
  foundationPricing,
  homeModels,
  // Collections
  quotes, setQuotes,
  contracts, setContracts,
  customers,
  // User info
  userRole, isAdmin, isSales, userName,
  // Tab state
  quoteTab, setQuoteTab,
  // Navigation
  setView,
  // Quote editing handlers
  startEdit,
  startChangeOrder,
  setNewQ,
  setEditingQuoteId,
  setOriginalQuoteForComparison,
  // Status / delete
  updateStatus,
  setDeleteConfirm,
  // Save handlers
  saveQuotes,
  saveContracts,
  // Folder state
  activeFolder, setActiveFolder,
  dragOverFolder, setDragOverFolder,
  showAddFileModal, setShowAddFileModal,
  newFile, setNewFile,
  // Folder handlers
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
  // Change order history
  isChangeOrderHistoryExpanded, setIsChangeOrderHistoryExpanded,
  expandedCO, setExpandedCO,
  // Scope of Work
  scopeEditMode,
  scopeEditContent,
  scopeSections, setScopeSections,
  enterScopeEditMode,
  saveScopeChanges,
  cancelScopeEdit,
  updateScopeField,
  generateScopeOfWorkDocument,
  // Scrubb
  scrubbEditingService, setScrubbEditingService,
  scrubbNewCost, setScrubbNewCost,
  // Scrubb - Permits
  showPermitModal, setShowPermitModal,
  editingPermitEntry, setEditingPermitEntry,
  permitEntryName, setPermitEntryName,
  permitEntryCost, setPermitEntryCost,
  // Scrubb - Payments
  showPaymentForm, setShowPaymentForm,
  newPayment, setNewPayment,
  // Scrubb - Allowance progress
  saveAllowanceProgressToFolders,
  // Calculation function (needed inside scrubb payment section)
  calcTotals,
  // Expanded notes (if used)
  expandedNotes, setExpandedNotes,
}) => {
  if (!currentItem || !custForQuote || !totals) return null;

  return (
    <div>
      <button style={{ ...S.btn2, marginBottom: 16 }} onClick={() => {
        setView(selCustomer ? 'viewCustomer' : 'dashboard');
        setSelQuote(null);
        setSelContract(null);
      }}>{'\u2190'} Back</button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0 }}>
            {custForQuote.firstName} {custForQuote.lastName}
            {selContract && <span style={{ fontSize: 16, fontWeight: 700, color: '#2c5530', marginLeft: 8 }}>{'\u2022'} CONTRACT</span>}
            {selQuote && currentItem.editVersion > 0 && <span style={{ fontSize: 16, fontWeight: 400, color: '#666' }}>- Edited Draft {currentItem.editVersion}</span>}
          </h1>
          <p style={{ color: '#666' }}>{currentItem.homeModel !== 'NONE' ? currentItem.homeModel : `${currentItem.houseWidth}' \u00D7 ${currentItem.houseLength}'`}</p>
          <p style={{ color: '#999', fontSize: 12 }}>
            Created by {currentItem.createdBy} on {fmtDate(currentItem.createdAt)}
            {currentItem.updatedAt && ` \u2022 Last edited: ${fmtDate(currentItem.updatedAt)} by ${currentItem.updatedBy}`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {/* Edit Quote button - only works for Draft/Sent/Declined quotes */}
          {selQuote && (
            <button
              style={{ ...S.btn, width: 'auto', background: '#ffc107', color: '#000' }}
              onClick={() => {
                if (['Accepted', 'Under Contract', 'Completed'].includes(currentItem.status)) {
                  alert('\u274C Cannot edit an accepted quote.\n\nA Change Order must be created instead.\n\nClick the "\u{1F4DD} Change Order" button to make changes to this project.');
                } else {
                  if (!selCustomer) setSelCustomer(custForQuote);
                  startEdit(currentItem);
                }
              }}
            >
              {'\u270F\uFE0F'} Edit Quote
            </button>
          )}

          {/* Change Order button - only works for contracts */}
          {selContract && (
            <button
              style={{ ...S.btn, width: 'auto', background: '#0d6efd', color: '#fff' }}
              onClick={() => {
                if (!selCustomer) setSelCustomer(custForQuote);
                startChangeOrder(currentItem);
              }}
            >
              {'\u{1F4DD}'} Change Order
            </button>
          )}

          {/* Email Quote button */}
          <button
            style={{ ...S.btn, width: 'auto', background: '#1565c0' }}
            onClick={() => {
              const customerEmail = custForQuote.email || '';
              if (!customerEmail) {
                alert('\u274C No email address on file for this customer.\n\nPlease add an email address to the customer profile first.');
                return;
              }
              const customerName = `${custForQuote.firstName} ${custForQuote.lastName}`;
              const customerLogin = `${custForQuote.firstName}${custForQuote.lastName}`.toLowerCase().replace(/\s+/g, '');
              const quoteNum = DocumentUtils.getQuoteNum(currentItem);
              const total = fmt(totals.total);
              const homeModel = DocumentUtils.getHomeDesc(currentItem);

              const subject = encodeURIComponent(`Sherman Buildings - Your Project Quote #${quoteNum}`);
              const body = encodeURIComponent(
                `Dear ${customerName},\n\n` +
                `Thank you for your interest in Sherman Buildings! Please find your project quote details below:\n\n` +
                `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n` +
                `QUOTE SUMMARY\n` +
                `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n` +
                `Quote #: ${quoteNum}\n` +
                `Home: ${homeModel}\n` +
                `Total Contract Price: ${total}\n` +
                `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n` +
                `\u{1F517} VIEW YOUR QUOTE ONLINE\n` +
                `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n` +
                `Visit our Customer Portal to view your complete quote:\n` +
                `https://claude.site/artifacts/YOUR_ARTIFACT_ID\n\n` +
                `Login with:\n` +
                `  Username: ${customerLogin}\n` +
                `  Password: mybid\n` +
                `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n` +
                `This quote is valid for 30 days. A 50% deposit is required to schedule installation.\n\n` +
                `If you have any questions, please don't hesitate to reach out:\n` +
                `\u{1F4DE} (320) 679-3438\n` +
                `\u{1F4CD} 2244 Hwy 65, Mora, MN 55051\n\n` +
                `We look forward to working with you!\n\n` +
                `Best regards,\n` +
                `Sherman Pole Buildings\n` +
                `Quality Erections Since 1976`
              );

              window.location.href = `mailto:${customerEmail}?subject=${subject}&body=${body}`;
            }}
          >
            {'\u2709\uFE0F'} Email Quote
          </button>

          <select
            style={{ ...S.select, width: 'auto' }}
            value={currentItem.status}
            onChange={e => updateStatus(currentItem, e.target.value)}
          >
            {selContract ? (
              ['Accepted', 'Under Contract', 'Completed'].map(s => <option key={s} value={s}>{s}</option>)
            ) : (
              ['Draft', 'Sent', 'Accepted', 'Declined'].map(s => <option key={s} value={s}>{s}</option>)
            )}
          </select>
          <button style={S.btnDanger} onClick={() => setDeleteConfirm(currentItem)}>{'\u{1F5D1}\uFE0F'}</button>
        </div>
      </div>

      {/* Tabs for Quote Details, Scrubb, Scope of Work, and Customer Quote */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[
          { id: 'details', label: '\u{1F4CB} Quote Details' },
          { id: 'customer', label: selContract ? '\u{1F4C4} Customer Contract' : '\u{1F4C4} Customer Quote' },
          ...((['Accepted', 'Under Contract', 'Completed'].includes(currentItem.status)) ? [
            { id: 'scrubb', label: '\u{1F4B0} Scrubb' },
            { id: 'scope', label: '\u{1F4C4} Scope of Work' }
          ] : [])
        ].map(t => (
          <button
            key={t.id}
            style={{ ...S.tab, ...(quoteTab === t.id ? S.tabA : {}) }}
            onClick={() => setQuoteTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ===== DETAILS TAB ===== */}
      {quoteTab === 'details' && <DetailsTab
        S={S} currentItem={currentItem} custForQuote={custForQuote} totals={totals}
        selQuote={selQuote} setSelQuote={setSelQuote}
        selContract={selContract} setSelContract={setSelContract}
        contracts={contracts} quotes={quotes}
        saveContracts={saveContracts} saveQuotes={saveQuotes}
        isAdmin={isAdmin} userName={userName} homeModels={homeModels}
        isChangeOrderHistoryExpanded={isChangeOrderHistoryExpanded}
        setIsChangeOrderHistoryExpanded={setIsChangeOrderHistoryExpanded}
        expandedCO={expandedCO} setExpandedCO={setExpandedCO}
        activeFolder={activeFolder} setActiveFolder={setActiveFolder}
        dragOverFolder={dragOverFolder} setDragOverFolder={setDragOverFolder}
        showAddFileModal={showAddFileModal} setShowAddFileModal={setShowAddFileModal}
        newFile={newFile} setNewFile={setNewFile}
        handleFileDrop={handleFileDrop}
        addFileToFolder={addFileToFolder}
        deleteFileFromFolder={deleteFileFromFolder}
        saveAllDocsToFolders={saveAllDocsToFolders}
        saveQuoteToFolder={saveQuoteToFolder}
        savePierLayoutToFolder={savePierLayoutToFolder}
        saveFloorPlanToFolders={saveFloorPlanToFolders}
        saveMaterialListToFolder={saveMaterialListToFolder}
        saveCustomerInfoToFolder={saveCustomerInfoToFolder}
        saveDecorChecklistToFolder={saveDecorChecklistToFolder}
        saveLatestChangeOrderToFolders={saveLatestChangeOrderToFolders}
        saveCrewWorkOrderToFolders={saveCrewWorkOrderToFolders}
      />}

      {/* ===== CUSTOMER QUOTE TAB ===== */}
      {quoteTab === 'customer' && <CustomerQuoteTab
        S={S} currentItem={currentItem} custForQuote={custForQuote} totals={totals}
        homeModels={homeModels}
      />}

      {/* ===== SCOPE OF WORK TAB ===== */}
      {quoteTab === 'scope' && <ScopeOfWorkTab
        S={S} currentItem={currentItem} custForQuote={custForQuote}
        customers={customers} services={services}
        scopeEditMode={scopeEditMode} scopeEditContent={scopeEditContent}
        scopeSections={scopeSections} setScopeSections={setScopeSections}
        enterScopeEditMode={enterScopeEditMode}
        saveScopeChanges={saveScopeChanges}
        cancelScopeEdit={cancelScopeEdit}
        updateScopeField={updateScopeField}
        generateScopeOfWorkDocument={generateScopeOfWorkDocument}
      />}

      {/* ===== SCRUBB TAB ===== */}
      {quoteTab === 'scrubb' && currentItem && ['Accepted', 'Under Contract', 'Completed'].includes(currentItem.status) && (
        <ScrubbTab
          S={S} currentItem={currentItem} custForQuote={custForQuote} totals={totals}
          selQuote={selQuote} setSelQuote={setSelQuote}
          selContract={selContract} setSelContract={setSelContract}
          quotes={quotes} setQuotes={setQuotes}
          contracts={contracts} setContracts={setContracts}
          saveQuotes={saveQuotes} saveContracts={saveContracts}
          userName={userName}
          scrubbEditingService={scrubbEditingService} setScrubbEditingService={setScrubbEditingService}
          scrubbNewCost={scrubbNewCost} setScrubbNewCost={setScrubbNewCost}
          showPermitModal={showPermitModal} setShowPermitModal={setShowPermitModal}
          editingPermitEntry={editingPermitEntry} setEditingPermitEntry={setEditingPermitEntry}
          permitEntryName={permitEntryName} setPermitEntryName={setPermitEntryName}
          permitEntryCost={permitEntryCost} setPermitEntryCost={setPermitEntryCost}
          showPaymentForm={showPaymentForm} setShowPaymentForm={setShowPaymentForm}
          newPayment={newPayment} setNewPayment={setNewPayment}
          saveAllowanceProgressToFolders={saveAllowanceProgressToFolders}
          calcTotals={calcTotals}
          materials={materials} services={services}
          sewerPricing={sewerPricing} patioPricing={patioPricing}
          driveRates={driveRates} foundationPricing={foundationPricing}
        />
      )}
    </div>
  );
};

export default QuoteView;
