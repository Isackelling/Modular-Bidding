/**
 * Sherman Bidding System - Main App Component
 *
 * State management, business logic, and view routing.
 * Components are imported from the modular structure.
 */

import React, { useState, useEffect, useMemo } from 'react';

// Constants
import {
  DEFAULT_HOME_MODELS, DEFAULT_MATERIALS, DEFAULT_SERVICES,
  DEFAULT_SEWER, DEFAULT_PATIO, DEFAULT_FOUNDATION,
  DRIVE_RATE_INSTALL, DRIVE_RATE_SERVICE, DRIVE_RATE_PC, DRIVE_RATE_INSPECTION,
  MIN_MILES, HOME_MARKUP, QUOTE_TYPES, WARRANTIES, CHECKLIST, DELIVERY,
  ALLOWANCE_ITEMS, SUMMARY_SERVICES, HOME_OPTIONS, LICENSED_SERVICES,
  INSTALLATION_COSTS, PIER_SPECS, PRICING,
} from './constants/index.js';

// Utilities
import { genId, getGoogleMapsUrl, calcIBeam, fmt } from './utils/helpers.js';
import { blobToDataUrl } from './utils/blobToDataUrl.js';
import { createStateSaver } from './utils/createStateSaver.js';
import { NotificationSystem } from './utils/NotificationSystem.js';
import { DocumentUtils } from './utils/DocumentUtils.js';
import { Validators } from './utils/Validators.js';
import { CalcHelpers } from './utils/CalcHelpers.js';
import { FolderUtils } from './utils/FolderUtils.js';
import { calcTotals, enforceMiles, calcDefaultServicePrice, getFoundationAdjustment } from './utils/calculations.js';
import { generateQuoteHtml, generatePierDiagramHtml, generateCustomerQuote, generateScopeOfWorkDocument, generateCrewWorkOrderDocument, generateAllowanceProgressDocument, generateChangeOrderDocument } from './utils/documentGeneration.js';
import { createFolderSavers } from './utils/folderSavers.js';

// Shared Components
import ErrorBoundary from './components/Shared/ErrorBoundary.jsx';
import ExpandableNoteSection from './components/Shared/ExpandableNoteSection.jsx';
import PierDiagram from './components/Shared/PierDiagram.jsx';

// Auth Components
import { LoginForm, UserSelector, CustomerPortal } from './components/Auth/index.js';

// Dashboard
import { Dashboard } from './components/Dashboard/index.js';

// Customer Components
import { CustomerForm, CustomerView } from './components/Customers/index.js';

// ========================================================================
// TEMPLATES
// ========================================================================

const emptyQuote = () => ({
  id: '', customerId: '',
  quoteType: 'modular_home',
  homeModel: 'NONE', homeBasePrice: '0',
  houseWidth: '', houseLength: '', singleDouble: 'Single', walkDoors: '2',
  foundationType: 'slab',
  iBeamHeight: '',
  selectedServices: {
    installation_of_home: true, drywall: true, painting: true,
    carpet: true, dumpster: true, siding_install: true, interior_trim_out: true,
    permits: true, electric_connection: true, concrete_skirting: true, plumbing: true, gas_propane: true
  },
  servicePriceOverrides: {}, serviceQuantities: {}, serviceDays: {},
  serviceNotes: {}, serviceCrewNotes: {},
  publishedServiceNotes: {}, publishedServiceCrewNotes: {},
  generalCrewNote: '', generalCustomerNote: '',
  publishedGeneralCrewNotes: [], publishedGeneralCustomerNotes: [],
  removedMaterials: {}, removedServices: {},
  landscapingMaterialCost: '', deckMaterialCost: '',
  customServices: [{ name: '', price: '' }],
  customOptions: [],
  customMaterials: [],
  sewerType: 'none', wellDepth: '0', patioSize: 'none',
  driveTime: String(MIN_MILES), status: 'Draft',
  folders: {
    clayton_docs: [], crew_files: [], estimates: [],
    permits: [], change_orders: [],
  },
  scrubbCosts: {}, scrubbDocs: {}, scrubbHistory: [],
  permitEntries: []
});

const emptyCustomer = () => ({
  id: '', firstName: '', lastName: '',
  phone: '', email: '',
  person2FirstName: '', person2LastName: '',
  phone2: '', email2: '',
  siteAddress: '', siteCity: '', siteState: 'MN',
  siteZip: '', siteCounty: '',
  mailingAddress: '', mailingCity: '', mailingState: '',
  mailingZip: '',
});

// ========================================================================
// STYLES
// ========================================================================

const S = {
  app: { fontFamily: "'Segoe UI',sans-serif", minHeight: '100vh', background: '#f0f2f5' },
  login: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#2c5530,#1a3a1f)', padding: 20 },
  card: { background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 10px 40px rgba(0,0,0,0.3)', width: '100%', maxWidth: 420, textAlign: 'center' },
  input: { width: '100%', padding: '12px 14px', border: '2px solid #ddd', borderRadius: 6, fontSize: 15, marginBottom: 12, boxSizing: 'border-box' },
  inputSm: { width: '90px', padding: '8px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14, textAlign: 'right' },
  inputEdit: { padding: '6px 10px', border: '1px solid #2c5530', borderRadius: 4, fontSize: 14, textAlign: 'right', width: '100px' },
  btn: { padding: '14px 24px', background: '#2c5530', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 600, cursor: 'pointer', width: '100%' },
  btn2: { padding: '10px 20px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' },
  btnSm: { padding: '8px 12px', background: '#2c5530', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13, textDecoration: 'none', display: 'inline-block' },
  btnDanger: { padding: '10px 20px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' },
  header: { background: '#2c5530', color: '#fff', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 },
  nav: { background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontSize: 14 },
  main: { padding: 24, maxWidth: 1200, margin: '0 auto' },
  box: { background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 },
  row: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 16 },
  label: { display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 14 },
  select: { width: '100%', padding: '12px 14px', border: '2px solid #ddd', borderRadius: 6, fontSize: 15, background: '#fff' },
  svcGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 10 },
  svc: { display: 'flex', alignItems: 'center', gap: 10, padding: '12px', background: '#f8f9fa', borderRadius: 6, border: '1px solid #e0e0e0' },
  svcActive: { background: '#e8f5e9', borderColor: '#2c5530' },
  role: { padding: 20, border: '2px solid #ddd', borderRadius: 12, textAlign: 'center', cursor: 'pointer' },
  roleA: { borderColor: '#2c5530', background: '#f0f7f1' },
  tab: { padding: '10px 16px', background: '#fff', border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer', fontSize: 14 },
  tabA: { borderColor: '#2c5530', background: '#f0f7f1', fontWeight: 600 },
  badge: { display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid #ddd', background: '#f8f9fa', fontWeight: 600 },
  td: { padding: '8px', borderBottom: '1px solid #eee' },
  override: { background: '#fff3cd', borderColor: '#ffc107' },
  customSvc: { display: 'grid', gridTemplateColumns: '1fr 100px', gap: 8, padding: '10px', background: '#f0f7f1', borderRadius: 6, border: '1px dashed #2c5530', marginTop: 8 },
  projCmd: { background: '#e3f2fd', padding: 16, borderRadius: 8, marginTop: 16 },
  chk: { display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: '1px solid #eee' },
};

// ========================================================================
// FORMATTERS
// ========================================================================

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
const currencyFormatterDec = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtCurrency = n => currencyFormatter.format(n || 0);
const fmtDec = n => currencyFormatterDec.format(n || 0);
const fmtDate = d => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
const fmtDateTime = d => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

// ========================================================================
// HELPERS
// ========================================================================

const normalizePhone = (phone) => phone ? phone.replace(/\D/g, '') : '';
const normalizeEmail = (email) => email ? email.toLowerCase().trim() : '';

const CALLER_ID_SERVER = 'https://sherman-callerid.onrender.com';
const CALLER_ID_API_KEY = 'sherman-sync-key-2024';

// ========================================================================
// APP COMPONENT
// ========================================================================

export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}

function AppInner() {
  // ======================================================================
  // STATE DECLARATIONS
  // ======================================================================

  // Auth state
  const [isAuth, setIsAuth] = useState(true);
  const [isCustomerPortal, setIsCustomerPortal] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [userRole, setUserRole] = useState('admin');
  const [originalRole, setOriginalRole] = useState('admin');
  const [userName, setUserName] = useState('SHERMAN');
  const [loginU, setLoginU] = useState('');
  const [loginP, setLoginP] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tempName, setTempName] = useState('');
  const [tempRole, setTempRole] = useState('');

  // Navigation
  const [view, setView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Data state
  const [quotes, setQuotes] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);

  // Selection state
  const [selQuote, setSelQuote] = useState(null);
  const [selContract, setSelContract] = useState(null);
  const [selCustomer, setSelCustomer] = useState(null);

  // Quote editing state
  const [newQ, setNewQ] = useState(emptyQuote());
  const [editingQuoteId, setEditingQuoteId] = useState(null);
  const [originalQuoteForComparison, setOriginalQuoteForComparison] = useState(null);
  const [changeOrderDeletions, setChangeOrderDeletions] = useState([]);
  const [changeOrderAdjustments, setChangeOrderAdjustments] = useState({});
  const [changeOrderAdditions, setChangeOrderAdditions] = useState([]);

  // Customer editing state
  const [newCust, setNewCust] = useState(emptyCustomer());
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [showCustSecondContact, setShowCustSecondContact] = useState(false);
  const [showCustMailingAddress, setShowCustMailingAddress] = useState(false);
  const [showNewQuoteMenu, setShowNewQuoteMenu] = useState(false);

  // UI state
  const [quoteTab, setQuoteTab] = useState('details');
  const [crewTab, setCrewTab] = useState('jobs');
  const [pricingTab, setPricingTab] = useState('homes');
  const [pricingEditMode, setPricingEditMode] = useState(false);
  const [expandedServiceNotes, setExpandedServiceNotes] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleteCustomerConfirm, setDeleteCustomerConfirm] = useState(null);

  // Scope of Work state
  const [scopeSections, setScopeSections] = useState({
    overview: false, roles: false, foundation: false,
    services: false, deliverables: false, exclusions: false, assumptions: false
  });
  const [scopeEditMode, setScopeEditMode] = useState(false);
  const [scopeEditContent, setScopeEditContent] = useState(null);

  // Scrubb state
  const [scrubbEditingService, setScrubbEditingService] = useState(null);
  const [scrubbNewCost, setScrubbNewCost] = useState('');
  const [nhlExpanded, setNhlExpanded] = useState(false);
  const [showPermitModal, setShowPermitModal] = useState(false);
  const [editingPermitEntry, setEditingPermitEntry] = useState(null);
  const [permitEntryName, setPermitEntryName] = useState('');
  const [permitEntryCost, setPermitEntryCost] = useState('');
  const [showAddlMaterialModal, setShowAddlMaterialModal] = useState(false);
  const [editingMaterialEntry, setEditingMaterialEntry] = useState(null);
  const [materialEntryName, setMaterialEntryName] = useState('');
  const [materialEntryCost, setMaterialEntryCost] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [newPayment, setNewPayment] = useState({ amount: '', date: '', notes: '', isContingencyPayment: false });

  // Folder management
  const [activeFolder, setActiveFolder] = useState(null);
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [newFile, setNewFile] = useState({ name: '', type: 'link', url: '', notes: '' });
  const [dragOverFolder, setDragOverFolder] = useState(null);

  // Section collapse states
  const [isPierDiagramExpanded, setIsPierDiagramExpanded] = useState(false);
  const [isFloorPlanExpanded, setIsFloorPlanExpanded] = useState(false);
  const [isPierDiagramExpandedSummary, setIsPierDiagramExpandedSummary] = useState(false);
  const [isChangeOrderHistoryExpanded, setIsChangeOrderHistoryExpanded] = useState(true);
  const [expandedCO, setExpandedCO] = useState({});

  // Pricing state
  const [homeModels, setHomeModels] = useState(DEFAULT_HOME_MODELS);
  const [materials, setMaterials] = useState(DEFAULT_MATERIALS);
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [sewerPricing, setSewerPricing] = useState(DEFAULT_SEWER);
  const [patioPricing, setPatioPricing] = useState(DEFAULT_PATIO);
  const [foundationPricing, setFoundationPricing] = useState(DEFAULT_FOUNDATION);
  const [driveRates, setDriveRates] = useState({
    install: DRIVE_RATE_INSTALL,
    service: DRIVE_RATE_SERVICE,
    projectCommand: DRIVE_RATE_PC,
    inspection: DRIVE_RATE_INSPECTION
  });
  const [projectCommandRates, setProjectCommandRates] = useState({
    psPerService: 150,
    pmBase: 4000
  });

  // User management
  const [newUser, setNewUser] = useState({ username: '', fullName: '', company: '', role: 'sales', phone: '' });

  // ======================================================================
  // DATA LOADING
  // ======================================================================

  useEffect(() => {
    (async () => {
      try {
        const qr = await window.storage.get('sherman_quotes');
        if (qr?.value) setQuotes(JSON.parse(qr.value));
      } catch(e) {}
      try {
        const ctr = await window.storage.get('sherman_contracts');
        if (ctr?.value) setContracts(JSON.parse(ctr.value));
      } catch(e) {}
      try {
        const pr = await window.storage.get('sherman_pricing');
        if (pr?.value) {
          const p = JSON.parse(pr.value);
          if (p.homeModels) {
            const mergedModels = p.homeModels.map(saved => {
              const defaultModel = DEFAULT_HOME_MODELS.find(d => d.name === saved.name);
              return { ...saved, floorPlanUrl: saved.floorPlanUrl || defaultModel?.floorPlanUrl || '' };
            });
            setHomeModels(mergedModels);
          }
          if (p.materials) {
            const migratedMaterials = {};
            Object.entries(p.materials).forEach(([k, m]) => {
              migratedMaterials[k] = { ...m, cost: m.cost !== undefined ? m.cost : m.price || 0 };
            });
            setMaterials(migratedMaterials);
          }
          if (p.services) {
            const { landscaping, deck, ...filteredServices } = p.services;
            const cleanedServices = Object.fromEntries(
              Object.entries(filteredServices).filter(([_, value]) => value !== undefined && value !== null)
            );
            const mergedServices = { ...DEFAULT_SERVICES, ...cleanedServices };
            setServices(mergedServices);
          }
          if (p.sewer) setSewerPricing(p.sewer);
          if (p.patio) setPatioPricing(p.patio);
          if (p.foundation) setFoundationPricing(p.foundation);
          if (p.driveRates) setDriveRates(p.driveRates);
          if (p.projectCommandRates) setProjectCommandRates(p.projectCommandRates);
        }
      } catch(e) {}
      try {
        const ur = await window.storage.get('sherman_users');
        if (ur?.value) setUsers(JSON.parse(ur.value));
      } catch(e) {}
      try {
        const cr = await window.storage.get('sherman_customers');
        if (cr?.value) setCustomers(JSON.parse(cr.value));
      } catch(e) {}
    })();
  }, []);

  // ======================================================================
  // STATE SAVERS
  // ======================================================================

  const saveQuotes = createStateSaver('sherman_quotes', setQuotes);
  const saveContracts = createStateSaver('sherman_contracts', setContracts);
  const saveCustomers = createStateSaver('sherman_customers', setCustomers);
  const saveUsers = createStateSaver('sherman_users', setUsers);

  // ======================================================================
  // COMPUTED VALUES
  // ======================================================================

  const isAdmin = userRole === 'admin';
  const isSales = userRole === 'sales';
  const myQuotes = (isAdmin || isSales) ? quotes : quotes.filter(q => q.createdBy === userName);
  const myCustomers = (isAdmin || isSales) ? customers : customers.filter(c => c.createdBy === userName);
  const currentItem = selContract || selQuote;
  const getCustomer = (customerId) => customers.find(c => c.id === customerId);
  const custForQuote = selCustomer || (currentItem ? getCustomer(currentItem.customerId) : null);
  const mapsUrl = custForQuote ? getGoogleMapsUrl(custForQuote.siteAddress, custForQuote.siteCity, custForQuote.siteState, custForQuote.siteZip) : null;
  const quoteWithCust = currentItem && custForQuote ? { ...currentItem, ...custForQuote, customerFirstName: custForQuote.firstName, customerLastName: custForQuote.lastName } : null;
  const currentUserData = users.find(u => u.username === userName);

  // Memoized totals calculation
  const totals = useMemo(() => {
    if (view === 'newQuote' && selCustomer && newQ.houseWidth && newQ.houseLength) {
      return CalcHelpers.calculateQuoteTotals(newQ, selCustomer, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, projectCommandRates);
    }
    if (view === 'viewQuote' && quoteWithCust) {
      return calcTotals(quoteWithCust, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, projectCommandRates);
    }
    return null;
  }, [view, newQ, selCustomer, quoteWithCust, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, projectCommandRates]);

  // Folder saver functions (document generation + folder persistence)
  const folderSavers = useMemo(() => createFolderSavers({
    materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, homeModels,
    userName, quotes, contracts, selQuote, selContract, selCustomer,
    setSelQuote, setSelContract, saveQuotes, saveContracts,
    generateQuoteHtml, generatePierDiagramHtml, generateScopeOfWorkDocument,
    generateCrewWorkOrderDocument, generateAllowanceProgressDocument, generateChangeOrderDocument,
  }), [materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, homeModels,
    userName, quotes, contracts, selQuote, selContract, selCustomer]);

  // ======================================================================
  // CALLER ID SYNC
  // ======================================================================

  const syncCustomersToServer = async (custList) => {
    const list = custList || customers;
    try {
      const syncData = list.filter(c => c.phone).map(c => {
        const latestQuote = quotes.filter(q => q.customerId === c.id || q.createdBy === c.createdBy).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        return {
          name: `${c.firstName} ${c.lastName}`,
          phone: c.phone,
          phone2: c.phone2 || '',
          quoteInfo: latestQuote ? `${latestQuote.houseWidth}'x${latestQuote.houseLength}' ${latestQuote.singleDouble || ''} - ${latestQuote.homeModel || 'Custom'} (${latestQuote.status})` : '',
        };
      });
      const resp = await fetch(`${CALLER_ID_SERVER}/api/sync-customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': CALLER_ID_API_KEY },
        body: JSON.stringify({ customers: syncData }),
      });
      if (!resp.ok) throw new Error(`Server returned ${resp.status}`);
      return true;
    } catch (err) {
      console.warn('Caller ID sync failed:', err.message);
      return false;
    }
  };

  // ======================================================================
  // AUTH HANDLERS
  // ======================================================================

  const login = () => {
    if (loginU.toUpperCase() === 'SHERMAN' && loginP.toUpperCase() === 'BIDDING') {
      setIsAuth(true);
      setIsCustomerPortal(false);
      setLoginError('');
    } else if (loginP.toLowerCase() === 'mybid') {
      const inputName = loginU.trim().toLowerCase().replace(/\s+/g, '');
      const customer = customers.find(c => {
        const customerFullName = (c.firstName + c.lastName).toLowerCase().replace(/\s+/g, '');
        return customerFullName === inputName;
      });
      if (customer) {
        setIsAuth(true);
        setIsCustomerPortal(true);
        setCustomerData(customer);
        setLoginError('');
        return;
      }
      setLoginError('Customer not found. Enter your first and last name (no spaces) as username.');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const logout = () => {
    setIsAuth(false);
    setIsCustomerPortal(false);
    setCustomerData(null);
    setUserRole(null);
    setOriginalRole(null);
    setUserName('');
  };

  const handleSelectUser = (user) => {
    setUserRole(user.role);
    setOriginalRole(user.role);
    setUserName(user.username);
  };

  // ======================================================================
  // CUSTOMER HANDLERS
  // ======================================================================

  const updateCustField = (f, v) => setNewCust(p => ({ ...p, [f]: v }));

  const saveCustomer = async () => {
    if (!newCust.firstName?.trim() || !newCust.lastName?.trim() || !newCust.siteAddress?.trim() || !newCust.phone?.trim() || !newCust.email?.trim()) {
      alert('Please fill in required fields: Name, Site Address, Phone, and Email');
      return;
    }

    const existingCustomers = customers.filter(c => {
      if (editingCustomerId && c.id === editingCustomerId) return false;
      return true;
    });

    // Check for duplicate primary email
    const normalizedNewEmail = normalizeEmail(newCust.email);
    if (normalizedNewEmail) {
      const duplicateEmail = existingCustomers.find(c =>
        (normalizeEmail(c.email) && normalizeEmail(c.email) === normalizedNewEmail) ||
        (normalizeEmail(c.email2) && normalizeEmail(c.email2) === normalizedNewEmail)
      );
      if (duplicateEmail) {
        const creatorData = users.find(u => u.username === duplicateEmail.createdBy);
        const creatorName = creatorData?.fullName || duplicateEmail.createdBy;
        NotificationSystem.error(`DUPLICATE EMAIL ADDRESS\n\nThis email already exists for:\n\n${duplicateEmail.firstName} ${duplicateEmail.lastName}\nEmail: ${newCust.email}\nSaved by: ${creatorName}\n\nCannot save customer with duplicate email.`);
        return;
      }
    }

    // Check for duplicate secondary email
    if (newCust.email2) {
      const normalizedNewEmail2 = normalizeEmail(newCust.email2);
      if (normalizedNewEmail2) {
        const duplicateEmail2 = existingCustomers.find(c =>
          (normalizeEmail(c.email) && normalizeEmail(c.email) === normalizedNewEmail2) ||
          (normalizeEmail(c.email2) && normalizeEmail(c.email2) === normalizedNewEmail2)
        );
        if (duplicateEmail2) {
          const creatorData = users.find(u => u.username === duplicateEmail2.createdBy);
          const creatorName = creatorData?.fullName || duplicateEmail2.createdBy;
          NotificationSystem.error(`DUPLICATE EMAIL ADDRESS\n\nThis email already exists for:\n\n${duplicateEmail2.firstName} ${duplicateEmail2.lastName}\nEmail: ${newCust.email2}\nSaved by: ${creatorName}\n\nCannot save customer with duplicate email.`);
          return;
        }
      }
    }

    // Check for duplicate primary phone
    const normalizedNewPhone = normalizePhone(newCust.phone);
    if (normalizedNewPhone) {
      const duplicatePhone = existingCustomers.find(c =>
        (normalizePhone(c.phone) && normalizePhone(c.phone) === normalizedNewPhone) ||
        (normalizePhone(c.phone2) && normalizePhone(c.phone2) === normalizedNewPhone)
      );
      if (duplicatePhone) {
        const creatorData = users.find(u => u.username === duplicatePhone.createdBy);
        const creatorName = creatorData?.fullName || duplicatePhone.createdBy;
        NotificationSystem.error(`DUPLICATE PHONE NUMBER\n\nThis phone number already exists for:\n\n${duplicatePhone.firstName} ${duplicatePhone.lastName}\nPhone: ${newCust.phone}\nSaved by: ${creatorName}\n\nCannot save customer with duplicate phone number.`);
        return;
      }
    }

    // Check for duplicate secondary phone
    if (newCust.phone2) {
      const normalizedNewPhone2 = normalizePhone(newCust.phone2);
      if (normalizedNewPhone2) {
        const duplicatePhone2 = existingCustomers.find(c =>
          (normalizePhone(c.phone) && normalizePhone(c.phone) === normalizedNewPhone2) ||
          (normalizePhone(c.phone2) && normalizePhone(c.phone2) === normalizedNewPhone2)
        );
        if (duplicatePhone2) {
          const creatorData = users.find(u => u.username === duplicatePhone2.createdBy);
          const creatorName = creatorData?.fullName || duplicatePhone2.createdBy;
          NotificationSystem.error(`DUPLICATE PHONE NUMBER\n\nThis phone number already exists for:\n\n${duplicatePhone2.firstName} ${duplicatePhone2.lastName}\nPhone: ${newCust.phone2}\nSaved by: ${creatorName}\n\nCannot save customer with duplicate phone number.`);
          return;
        }
      }
    }

    // Trim all string fields before saving
    const trimmedData = Object.keys(newCust).reduce((acc, key) => {
      acc[key] = typeof newCust[key] === 'string' ? newCust[key].trim() : newCust[key];
      return acc;
    }, {});

    if (editingCustomerId) {
      const updated = { ...trimmedData, updatedAt: new Date().toISOString(), updatedBy: userName };
      const updatedList = customers.map(c => c.id === editingCustomerId ? updated : c);
      await saveCustomers(updatedList);
      setSelCustomer(updated);
      setView('viewCustomer');
    } else {
      const cust = { ...trimmedData, id: genId(), createdAt: new Date().toISOString(), createdBy: userName };
      await saveCustomers([...customers, cust]);
      setSelCustomer(cust);
      setView('viewCustomer');
    }
    setNewCust(emptyCustomer());
    setEditingCustomerId(null);
    setShowCustSecondContact(false);
    setShowCustMailingAddress(false);
    syncCustomersToServer();
  };

  const startEditCustomer = (cust) => {
    setNewCust({ ...cust });
    setEditingCustomerId(cust.id);
    setShowCustSecondContact(!!(cust.person2FirstName || cust.phone2 || cust.email2));
    setShowCustMailingAddress(!!(cust.mailingAddress));
    setView('newCustomer');
  };

  const deleteCustomer = async (id) => {
    const custQuotes = quotes.filter(q => q.customerId === id && !q.changeOrderOf);
    if (custQuotes.length > 0) {
      alert(`Cannot delete customer with ${custQuotes.length} quote(s). Delete quotes first.`);
      return;
    }
    await saveCustomers(customers.filter(c => c.id !== id));
    setView('dashboard');
    setSelCustomer(null);
  };

  // ======================================================================
  // QUOTE FIELD HANDLERS
  // ======================================================================

  const updateField = (f, v) => {
    setNewQ(p => {
      const u = { ...p, [f]: v };
      if (f === 'houseLength' && v) u.iBeamHeight = calcIBeam(parseFloat(v));
      if (f === 'houseWidth' && parseFloat(v) > 16) u.singleDouble = 'Double';
      else if (f === 'houseWidth' && parseFloat(v) > 0 && parseFloat(v) <= 16) u.singleDouble = 'Single';
      if (f === 'driveTime') u.driveTime = String(enforceMiles(v));
      if (f === 'homeModel') {
        const m = homeModels.find(x => x.name === v);
        u.homeBasePrice = m ? String(m.price) : '0';
        if (m && m.width && m.length) {
          u.houseWidth = String(m.width);
          u.houseLength = String(m.length);
          u.iBeamHeight = calcIBeam(m.length);
          u.singleDouble = m.width > 16 ? 'Double' : 'Single';
        }
      }
      if (f === 'foundationType') {
        u.selectedServices = { ...p.selectedServices };
        if (v === 'basement') {
          u.selectedServices.basement_stairs = true;
          u.selectedServices.water_heater = true;
          u.selectedServices.updraft_furnace = true;
          u.selectedServices.gravel_driveway = true;
          u.selectedServices.sand_pad = true;
          u.selectedServices.plumbing = true;
          u.selectedServices.electric_connection = true;
          u.selectedServices.crane = true;
        }
        if (v === 'crawlspace') {
          u.selectedServices.gravel_driveway = true;
          u.selectedServices.sand_pad = true;
          u.selectedServices.crane = true;
        }
      }
      return u;
    });
  };

  // Service handlers
  const toggleSvc = k => setNewQ(p => {
    const sel = { ...p.selectedServices, [k]: !p.selectedServices[k] };
    const ovr = { ...p.servicePriceOverrides }; if (!sel[k]) delete ovr[k];
    return { ...p, selectedServices: sel, servicePriceOverrides: ovr };
  });

  const updateServicePrice = (k, v) => setNewQ(p => ({ ...p, servicePriceOverrides: { ...p.servicePriceOverrides, [k]: v } }));
  const updateCustomService = (i, f, v) => setNewQ(p => { const cs = [...p.customServices]; cs[i] = { ...cs[i], [f]: v }; return { ...p, customServices: cs }; });
  const addCustomService = () => setNewQ(p => ({ ...p, customServices: [...p.customServices, { name: '', price: '' }] }));
  const removeCustomService = (i) => setNewQ(p => ({ ...p, customServices: p.customServices.filter((_, idx) => idx !== i) }));

  const updateCustomOption = (i, f, v) => setNewQ(p => { const co = [...(p.customOptions || [])]; co[i] = { ...co[i], [f]: v }; return { ...p, customOptions: co }; });
  const addCustomOption = () => setNewQ(p => ({ ...p, customOptions: [...(p.customOptions || []), { name: '', price: '', quantity: '1' }] }));
  const removeCustomOption = (i) => setNewQ(p => ({ ...p, customOptions: (p.customOptions || []).filter((_, idx) => idx !== i) }));

  const updateCustomMaterial = (i, f, v) => setNewQ(p => { const cm = [...(p.customMaterials || [])]; cm[i] = { ...cm[i], [f]: v }; return { ...p, customMaterials: cm }; });
  const addCustomMaterial = () => setNewQ(p => ({ ...p, customMaterials: [...(p.customMaterials || []), { name: '', price: '', quantity: '1' }] }));
  const removeCustomMaterial = (i) => setNewQ(p => ({ ...p, customMaterials: (p.customMaterials || []).filter((_, idx) => idx !== i) }));

  const toggleRemoveMaterial = (key) => setNewQ(p => ({ ...p, removedMaterials: { ...p.removedMaterials, [key]: !p.removedMaterials?.[key] } }));
  const toggleRemoveService = (key) => setNewQ(p => ({ ...p, removedServices: { ...p.removedServices, [key]: !p.removedServices?.[key] } }));
  const toggleRemoveInstall = () => setNewQ(p => ({ ...p, removedInstall: !p.removedInstall }));

  const getDefaultPrice = k => {
    if (!services[k]) return 0;
    const days = (newQ.serviceDays && newQ.serviceDays[k]) || 1;
    let basePrice = calcDefaultServicePrice(k, services[k], enforceMiles(newQ.driveTime), parseFloat(newQ.houseWidth) || 0, parseFloat(newQ.houseLength) || 0, driveRates.service, days, newQ.singleDouble, newQ.foundationType);
    basePrice += getFoundationAdjustment(k, newQ.foundationType || 'slab');
    return basePrice;
  };

  // ======================================================================
  // NOTE HANDLERS
  // ======================================================================

  const handlePublishCustomerNote = (serviceKey) => {
    const noteText = newQ.serviceNotes?.[serviceKey];
    if (!noteText || !noteText.trim()) return;
    const publishedNote = { text: noteText, publishedAt: new Date().toISOString(), publishedBy: userName || 'User' };
    setNewQ(prev => ({
      ...prev,
      publishedServiceNotes: { ...prev.publishedServiceNotes, [serviceKey]: [...(prev.publishedServiceNotes?.[serviceKey] || []), publishedNote] },
      serviceNotes: { ...prev.serviceNotes, [serviceKey]: '' }
    }));
  };

  const handlePublishCrewNote = (serviceKey) => {
    const noteText = newQ.serviceCrewNotes?.[serviceKey];
    if (!noteText || !noteText.trim()) return;
    const publishedNote = { text: noteText, publishedAt: new Date().toISOString(), publishedBy: userName || 'User' };
    setNewQ(prev => ({
      ...prev,
      publishedServiceCrewNotes: { ...prev.publishedServiceCrewNotes, [serviceKey]: [...(prev.publishedServiceCrewNotes?.[serviceKey] || []), publishedNote] },
      serviceCrewNotes: { ...prev.serviceCrewNotes, [serviceKey]: '' }
    }));
  };

  const handleEditCustomerNote = (serviceKey, noteIndex) => {
    const publishedNotes = newQ.publishedServiceNotes?.[serviceKey] || [];
    const noteToEdit = publishedNotes[noteIndex];
    if (!noteToEdit) return;
    setNewQ(prev => ({
      ...prev,
      serviceNotes: { ...prev.serviceNotes, [serviceKey]: noteToEdit.text },
      publishedServiceNotes: { ...prev.publishedServiceNotes, [serviceKey]: publishedNotes.filter((_, idx) => idx !== noteIndex) }
    }));
    setExpandedServiceNotes(prev => ({ ...prev, [serviceKey]: true }));
  };

  const handleEditCrewNote = (serviceKey, noteIndex) => {
    const publishedNotes = newQ.publishedServiceCrewNotes?.[serviceKey] || [];
    const noteToEdit = publishedNotes[noteIndex];
    if (!noteToEdit) return;
    setNewQ(prev => ({
      ...prev,
      serviceCrewNotes: { ...prev.serviceCrewNotes, [serviceKey]: noteToEdit.text },
      publishedServiceCrewNotes: { ...prev.publishedServiceCrewNotes, [serviceKey]: publishedNotes.filter((_, idx) => idx !== noteIndex) }
    }));
    setExpandedServiceNotes(prev => ({ ...prev, [serviceKey]: true }));
  };

  const handleDeleteCustomerNote = (serviceKey, noteIndex) => {
    const publishedNotes = newQ.publishedServiceNotes?.[serviceKey] || [];
    setNewQ(prev => ({
      ...prev,
      publishedServiceNotes: { ...prev.publishedServiceNotes, [serviceKey]: publishedNotes.filter((_, idx) => idx !== noteIndex) }
    }));
  };

  const handleDeleteCrewNote = (serviceKey, noteIndex) => {
    const publishedNotes = newQ.publishedServiceCrewNotes?.[serviceKey] || [];
    setNewQ(prev => ({
      ...prev,
      publishedServiceCrewNotes: { ...prev.publishedServiceCrewNotes, [serviceKey]: publishedNotes.filter((_, idx) => idx !== noteIndex) }
    }));
  };

  // ======================================================================
  // FILE MANAGEMENT HANDLERS
  // ======================================================================

  const autoSaveFileToFolders = async (file, folderIds, quote, customer) => {
    let updatedFolders = FolderUtils.getFolders(quote);
    for (const folderId of folderIds) {
      const existingFiles = updatedFolders[folderId] || [];
      const existingIndex = existingFiles.findIndex(f => f.name === file.name);
      if (existingIndex >= 0) {
        existingFiles[existingIndex] = { ...file, id: existingFiles[existingIndex].id };
        updatedFolders[folderId] = existingFiles;
      } else {
        updatedFolders[folderId] = [...existingFiles, { ...file, id: genId() }];
      }
    }
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
    return updatedItem;
  };

  const addFileToFolder = async (folderId, quote) => {
    try {
      Validators.required(newFile.name, 'File name');
      if (newFile.type === 'link') Validators.required(newFile.url, 'URL');
    } catch (error) {
      NotificationSystem.error(error.message);
      return;
    }
    const file = FolderUtils.createFileObject(newFile.name, newFile.type, newFile.url, newFile.notes, userName);
    const updatedQuote = { ...quote, folders: { ...quote.folders, [folderId]: [...(quote.folders?.[folderId] || []), file] } };
    const isInQuotes = quotes.find(q => q.id === quote.id);
    const isInContracts = contracts.find(c => c.id === quote.id);
    if (isInQuotes) {
      const updatedQuotes = quotes.map(q => q.id === quote.id ? updatedQuote : q);
      await saveQuotes(updatedQuotes);
      setSelQuote(updatedQuote);
    } else if (isInContracts) {
      const updatedContracts = contracts.map(c => c.id === quote.id ? updatedQuote : c);
      await saveContracts(updatedContracts);
      setSelContract(updatedQuote);
    }
    setNewFile({ name: '', type: 'link', url: '', notes: '' });
    setShowAddFileModal(false);
  };

  const deleteFileFromFolder = async (folderId, fileId, quote) => {
    if (!confirm('Delete this file?')) return;
    const updatedQuote = { ...quote, folders: { ...quote.folders, [folderId]: (quote.folders?.[folderId] || []).filter(f => f.id !== fileId) } };
    const isInQuotes = quotes.find(q => q.id === quote.id);
    const isInContracts = contracts.find(c => c.id === quote.id);
    if (isInQuotes) {
      const updatedQuotes = quotes.map(q => q.id === quote.id ? updatedQuote : q);
      await saveQuotes(updatedQuotes);
      setSelQuote(updatedQuote);
    } else if (isInContracts) {
      const updatedContracts = contracts.map(c => c.id === quote.id ? updatedQuote : c);
      await saveContracts(updatedContracts);
      setSelContract(updatedQuote);
    }
  };

  const handleFileDrop = async (e, folderId, quote) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverFolder(null);
    try {
      if (!quote) { alert('Please select a quote or contract first'); return; }
      const files = Array.from(e.dataTransfer.files);
      if (files.length === 0) return;
      const MAX_FILE_SIZE = 50 * 1024 * 1024;
      for (const file of files) {
        if (file.size > MAX_FILE_SIZE) { NotificationSystem.error(`File "${file.name}" is too large (max 50MB)`); return; }
      }
      let updatedFolders = FolderUtils.getFolders(quote);
      for (const file of files) {
        let fileType = 'other';
        if (file.type === 'application/pdf') fileType = 'pdf';
        else if (file.type.startsWith('image/')) fileType = 'image';
        const dataUrl = await blobToDataUrl(file, file.name);
        const newFileObj = FolderUtils.createFileObject(file.name, fileType, dataUrl, '', userName);
        updatedFolders[folderId] = [...(updatedFolders[folderId] || []), newFileObj];
      }
      const updatedQuote = { ...quote, folders: updatedFolders };
      const isInQuotes = quotes.find(q => q.id === quote.id);
      if (isInQuotes) {
        const updatedQuotes = quotes.map(q => q.id === quote.id ? updatedQuote : q);
        await saveQuotes(updatedQuotes);
        setSelQuote(updatedQuote);
      } else {
        const updatedContracts = contracts.map(c => c.id === quote.id ? updatedQuote : c);
        await saveContracts(updatedContracts);
        setSelContract(updatedQuote);
      }
      setActiveFolder(folderId);
      NotificationSystem.success(`${files.length} file${files.length > 1 ? 's' : ''} added to folder!`);
    } catch (error) {
      console.error('Error uploading files:', error);
      NotificationSystem.error(`Error uploading files: ${error.message}`);
    }
  };

  // ======================================================================
  // QUOTE SAVE / EDIT / DELETE HANDLERS
  // ======================================================================

  const saveNew = async () => {
    try {
      Validators.required(selCustomer, 'Customer');
      if (!newQ.houseWidth || !newQ.houseLength) {
        throw new Error('Please select a home or enter house dimensions');
      }
    } catch (error) {
      NotificationSystem.error(error.message);
      return;
    }

    const isChangeOrder = editingQuoteId && originalQuoteForComparison;

    if (editingQuoteId && !isChangeOrder) {
      // Normal edit: Create a COPY
      const currentVersion = newQ.editVersion || 0;
      const copiedQuote = {
        ...newQ,
        customerId: selCustomer.id,
        id: genId(),
        createdAt: new Date().toISOString(),
        createdBy: userName,
        iBeamHeight: newQ.iBeamHeight || calcIBeam(parseFloat(newQ.houseLength) || 56),
        editVersion: currentVersion + 1,
        copiedFrom: editingQuoteId,
        status: 'Draft'
      };
      await saveQuotes([...quotes, copiedQuote]);
      setSelQuote(copiedQuote);
      setView('viewQuote');
      setNewQ(emptyQuote());
      setEditingQuoteId(null);
      setOriginalQuoteForComparison(null);
    } else if (isChangeOrder) {
      // Change Order: UPDATE the existing contract and add to history
      const currentHistory = newQ.changeOrderHistory || [];
      const nextCONum = currentHistory.length + 1;

      const adjustedQuote = {
        ...newQ,
        servicePriceOverrides: { ...(newQ.servicePriceOverrides || {}) },
        selectedServices: { ...(newQ.selectedServices || {}) },
        customServices: [...(newQ.customServices || [])],
        removedMaterials: { ...(newQ.removedMaterials || {}) },
        removedServices: { ...(newQ.removedServices || {}) }
      };

      // Apply price adjustments
      Object.entries(changeOrderAdjustments).forEach(([key, adj]) => {
        if (adj && adj.amount) {
          if (key === 'home_base_price') {
            adjustedQuote.homeBasePrice = (parseFloat(newQ.homeBasePrice) || 0) + adj.amount;
          } else if (key === 'install_price') {
            adjustedQuote.installPrice = (parseFloat(newQ.installPrice) || 0) + adj.amount;
          } else {
            const currentServicePrice = adjustedQuote.servicePriceOverrides[key] !== undefined
              ? adjustedQuote.servicePriceOverrides[key]
              : (services[key] ? calcDefaultServicePrice(key, services[key], enforceMiles(newQ.driveTime), parseFloat(newQ.houseWidth) || 0, parseFloat(newQ.houseLength) || 0, driveRates.service, (newQ.serviceDays && newQ.serviceDays[key]) || 1, newQ.singleDouble, newQ.foundationType) : 0);
            adjustedQuote.servicePriceOverrides[key] = currentServicePrice + adj.amount;
          }
        }
      });

      const newTotals = CalcHelpers.calculateQuoteTotals(adjustedQuote, selCustomer, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, projectCommandRates);
      const originalTotals = CalcHelpers.calculateQuoteTotals(originalQuoteForComparison, selCustomer, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, projectCommandRates);
      const totalChange = newTotals.totalWithContingency - originalTotals.totalWithContingency;

      // Calculate running contingency from original + all previous COs
      let runningContingency = originalTotals.contingency || 0;
      currentHistory.forEach(co => { if (co.contingencyUsed) runningContingency -= co.contingencyUsed; });

      // Determine the previous customer-facing total (what the customer currently owes)
      let previousCustomerTotal = originalTotals.totalWithContingency;
      if (currentHistory.length > 0) {
        previousCustomerTotal = currentHistory[currentHistory.length - 1].newTotal;
      }

      // Contracts: COs only adjust contingency fund, NEVER change contracted price
      // Quotes: COs change the bottom line directly (no contingency fund yet)
      const isContract = contracts.find(c => c.id === editingQuoteId);
      let contingencyUsed = 0;
      let customerCost = 0;

      if (isContract) {
        // CONTRACT: entire change draws from contingency, customer total never changes
        contingencyUsed = totalChange; // positive = drawn, negative = added back
        customerCost = 0;
        const remainingContingency = runningContingency - totalChange;
        if (remainingContingency < 0) {
          const proceed = window.confirm(
            `Change Order Cost: ${fmt(totalChange)}\n\n` +
            `Contingency Available: ${fmt(runningContingency)}\n` +
            `Remaining After CO: ${fmt(remainingContingency)}\n\n` +
            `WARNING: This will overdraft the contingency fund by ${fmt(Math.abs(remainingContingency))}.\n` +
            `The contracted price will NOT change.\n\n` +
            `Proceed anyway?`
          );
          if (!proceed) return;
        } else {
          const proceed = window.confirm(
            `Change Order Cost: ${fmt(totalChange)}\n\n` +
            `Contingency Available: ${fmt(runningContingency)}\n` +
            `Remaining After CO: ${fmt(remainingContingency)}\n\n` +
            `The contracted price will NOT change. This will be drawn from the contingency fund.\n\n` +
            `Proceed?`
          );
          if (!proceed) return;
        }
      } else {
        // QUOTE: changes affect the bottom line directly
        customerCost = totalChange;
      }

      // Generate change order document
      const changeOrderDoc = generateChangeOrderDocument(
        newQ, originalQuoteForComparison,
        { ...selCustomer, customerId: selCustomer.id },
        newTotals, originalTotals,
        materials, services, sewerPricing, patioPricing, driveRates, foundationPricing,
        changeOrderDeletions, changeOrderAdjustments, changeOrderAdditions
      );

      // Save change order document to folders
      const docFileName = `Change_Order_#${nextCONum}_${new Date().toLocaleDateString('en-US').replace(/\//g, '-')}.html`;
      const utf8Bytes = new TextEncoder().encode(changeOrderDoc);
      const base64String = btoa(String.fromCharCode(...utf8Bytes));
      const changeOrderFile = FolderUtils.createFileObject(
        docFileName, 'change_order', `data:text/html;base64,${base64String}`, '', userName
      );

      const updatedItem = {
        ...adjustedQuote,
        id: editingQuoteId,
        customerId: selCustomer.id,
        updatedAt: new Date().toISOString(),
        updatedBy: userName,
        iBeamHeight: adjustedQuote.iBeamHeight || calcIBeam(parseFloat(adjustedQuote.houseLength) || 56),
        folders: {
          ...(adjustedQuote.folders || FolderUtils.getFolders()),
          crew_files: [...(adjustedQuote.folders?.crew_files || []), changeOrderFile],
          change_orders: [...(adjustedQuote.folders?.change_orders || []), changeOrderFile]
        },
        changeOrderHistory: [
          ...currentHistory,
          {
            changeOrderNum: nextCONum,
            status: newQ.status,
            totalChange: totalChange,
            contingencyUsed: contingencyUsed,
            customerCost: customerCost,
            contingencyBalance: runningContingency - contingencyUsed,
            newTotal: previousCustomerTotal + customerCost,
            createdAt: new Date().toISOString(),
            createdBy: userName,
            deletions: changeOrderDeletions,
            adjustments: changeOrderAdjustments,
            additions: changeOrderAdditions
          }
        ]
      };

      const isInQuotes = quotes.find(q => q.id === editingQuoteId);
      const isInContracts = contracts.find(c => c.id === editingQuoteId);
      if (isInContracts) {
        const updatedContracts = contracts.map(ct => ct.id === editingQuoteId ? updatedItem : ct);
        await saveContracts(updatedContracts);
        setSelContract(updatedItem);
        setSelQuote(null);
      } else if (isInQuotes) {
        const updatedQuotes = quotes.map(qt => qt.id === editingQuoteId ? updatedItem : qt);
        await saveQuotes(updatedQuotes);
        setSelQuote(updatedItem);
        setSelContract(null);
      }

      setView('viewQuote');
      setNewQ(emptyQuote());
      setEditingQuoteId(null);
      setOriginalQuoteForComparison(null);
      setChangeOrderDeletions([]);
      setChangeOrderAdjustments({});
      setChangeOrderAdditions([]);
      NotificationSystem.success(`Change Order #${nextCONum} saved!`);

      // Check if contingency fund went negative after this CO
      const coBalanceAfter = runningContingency - contingencyUsed;
      if (coBalanceAfter < 0) {
        setTimeout(() => {
          alert(
            `⚠️ CONTINGENCY FUND OVERDRAWN ⚠️\n\n` +
            `The contingency fund is now negative by ${fmt(Math.abs(coBalanceAfter))}.\n\n` +
            `A payment must be collected from the customer before any additional work can continue.\n\n` +
            `Go to the Contingency Fund Tracker on the Scrubb tab to review the balance.`
          );
        }, 300);
      }
    } else {
      // Create new quote
      let q = {
        ...newQ,
        customerId: selCustomer.id,
        id: genId(),
        createdAt: new Date().toISOString(),
        createdBy: userName,
        iBeamHeight: newQ.iBeamHeight || calcIBeam(parseFloat(newQ.houseLength) || 56),
        editVersion: 0
      };
      await saveQuotes([...quotes, q]);
      setSelQuote(q);
      setView('viewQuote');
      setNewQ(emptyQuote());
      setOriginalQuoteForComparison(null);
    }
  };

  const startEdit = (quote) => {
    setNewQ({ ...quote });
    setEditingQuoteId(quote.id);
    setView('newQuote');
  };

  const startChangeOrder = (quote) => {
    setOriginalQuoteForComparison({ ...quote });
    setChangeOrderDeletions([]);
    setChangeOrderAdjustments({});
    setChangeOrderAdditions([]);
    setNewQ({ ...quote });
    setEditingQuoteId(quote.id);
    setView('newQuote');
  };

  const copyQuoteForEdit = (quote) => {
    const { id, createdAt, createdBy, updatedAt, updatedBy, editVersion, ...quoteData } = quote;
    setNewQ({ ...quoteData, status: 'Draft' });
    setEditingQuoteId(null);
    setView('newQuote');
  };

  const cancelEdit = () => {
    setNewQ(emptyQuote());
    setEditingQuoteId(null);
    setOriginalQuoteForComparison(null);
    setChangeOrderDeletions([]);
    setChangeOrderAdjustments({});
    setChangeOrderAdditions([]);
    if (selCustomer) setView('viewCustomer');
    else setView('dashboard');
  };

  const delQuote = async id => {
    try {
      const inQuotes = quotes.some(q => q.id === id);
      const inContracts = contracts.some(c => c.id === id);
      if (inQuotes) await saveQuotes(quotes.filter(q => q.id !== id));
      if (inContracts) await saveContracts(contracts.filter(c => c.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
    if (selCustomer) setView('viewCustomer');
    else setView('dashboard');
    setSelQuote(null);
    setSelContract(null);
    setDeleteConfirm(null);
  };

  const updateStatus = async (q, s) => {
    const isQuote = quotes.find(x => x.id === q.id);
    const isContract = contracts.find(x => x.id === q.id);
    const isConvertingToContract = isQuote && s === 'Accepted' && q.status !== 'Accepted';

    if (isConvertingToContract) {
      const contract = {
        ...q,
        status: s,
        contractCreatedAt: new Date().toISOString(),
        contractCreatedBy: userName,
        changeOrderHistory: []
      };
      const updatedQuotes = quotes.filter(x => x.id !== q.id);
      const updatedContracts = [...contracts, contract];
      await saveQuotes(updatedQuotes);
      await saveContracts(updatedContracts);
      if (selQuote && selQuote.id === q.id) {
        setSelContract(contract);
        setSelQuote(null);
      }
      // Auto-generate Scope of Work
      try {
        const customer = customers.find(c => c.id === contract.customerId);
        if (customer) {
          await folderSavers.saveScopeOfWorkToFolders(contract, customer);
          alert('Quote accepted and converted to Contract!\n\nScope of Work document has been automatically generated and saved to Customer Docs folder.');
        } else {
          alert('Quote accepted and converted to Contract!');
        }
      } catch (error) {
        console.error('Error generating Scope of Work:', error);
        alert('Quote accepted and converted to Contract!');
      }
      // Final cleanup: ensure the quote is removed from localStorage and state
      // (folderSavers may have re-added it due to stale closure)
      const cleanQuotes = JSON.parse(localStorage.getItem('sherman_quotes') || '[]').filter(x => x.id !== q.id);
      localStorage.setItem('sherman_quotes', JSON.stringify(cleanQuotes));
      setQuotes(cleanQuotes);
    } else if (isContract) {
      const u = contracts.map(x => x.id === q.id ? { ...x, status: s } : x);
      await saveContracts(u);
      if (selContract && selContract.id === q.id) setSelContract({ ...q, status: s });
    } else if (isQuote) {
      const u = quotes.map(x => x.id === q.id ? { ...x, status: s } : x);
      await saveQuotes(u);
      if (selQuote && selQuote.id === q.id) setSelQuote({ ...q, status: s });
    }
  };

  // Update general notes on a specific quote/contract (used from CustomerView)
  const updateQuoteNotes = async (quoteId, updatedFields) => {
    const inQuotes = quotes.find(q => q.id === quoteId);
    const inContracts = contracts.find(c => c.id === quoteId);
    if (inQuotes) {
      const updated = quotes.map(q => q.id === quoteId ? { ...q, ...updatedFields } : q);
      await saveQuotes(updated);
    } else if (inContracts) {
      const updated = contracts.map(c => c.id === quoteId ? { ...c, ...updatedFields } : c);
      await saveContracts(updated);
    }
  };

  // ======================================================================
  // SCOPE OF WORK HANDLERS
  // ======================================================================

  const enterScopeEditMode = () => {
    const existingContent = currentItem.customScopeContent || {};
    setScopeEditContent(existingContent);
    setScopeEditMode(true);
  };

  const saveScopeChanges = async () => {
    const target = selContract || selQuote;
    const updatedItem = { ...target, customScopeContent: scopeEditContent };
    if (selContract) {
      const updatedContracts = contracts.map(c => c.id === target.id ? updatedItem : c);
      await saveContracts(updatedContracts);
      setSelContract(updatedItem);
    } else {
      const updatedQuotes = quotes.map(q => q.id === target.id ? updatedItem : q);
      await saveQuotes(updatedQuotes);
      setSelQuote(updatedItem);
    }
    setScopeEditMode(false);
    setScopeEditContent(null);
  };

  const cancelScopeEdit = () => {
    setScopeEditMode(false);
    setScopeEditContent(null);
  };

  const updateScopeField = (field, value) => {
    setScopeEditContent(prev => ({ ...prev, [field]: value }));
  };

  // ======================================================================
  // USER MANAGEMENT HANDLERS
  // ======================================================================

  const addUser = async () => {
    try {
      Validators.required(newUser.username, 'Username');
      Validators.required(newUser.fullName, 'Full Name');
      const duplicate = users.find(u => u.username.toLowerCase() === newUser.username.toLowerCase());
      if (duplicate) { NotificationSystem.error('Username already exists'); return; }
      const user = { ...newUser, id: genId(), createdAt: new Date().toISOString() };
      await saveUsers([...users, user]);
      setNewUser({ username: '', fullName: '', company: '', role: 'sales', phone: '' });
    } catch (error) {
      NotificationSystem.error(error.message);
    }
  };

  const deleteUser = async (id) => {
    if (confirm('Delete this user?')) {
      await saveUsers(users.filter(u => u.id !== id));
    }
  };

  // ======================================================================
  // PRICING HANDLERS
  // ======================================================================

  const savePricing = async () => {
    try {
      await window.storage.set('sherman_pricing', JSON.stringify({ homeModels, materials, services, sewer: sewerPricing, patio: patioPricing, foundation: foundationPricing, driveRates, projectCommandRates }));
      setPricingEditMode(false);
      alert('Pricing saved and locked!');
    } catch(e) { alert('Error'); }
  };

  const cancelPricingEdit = async () => {
    if (confirm('Discard all unsaved changes?')) {
      try {
        const saved = await window.storage.get('sherman_pricing');
        if (saved?.value) {
          const p = JSON.parse(saved.value);
          if (p.homeModels) setHomeModels(p.homeModels);
          if (p.materials) {
            const migratedMaterials = {};
            Object.entries(p.materials).forEach(([k, m]) => {
              migratedMaterials[k] = { ...m, cost: m.cost !== undefined ? m.cost : m.price || 0 };
            });
            setMaterials(migratedMaterials);
          }
          if (p.services) {
            const { landscaping, deck, ...filteredServices } = p.services;
            const cleanedServices = Object.fromEntries(
              Object.entries(filteredServices).filter(([_, value]) => value !== undefined && value !== null)
            );
            setServices({ ...DEFAULT_SERVICES, ...cleanedServices });
          }
          if (p.sewer) setSewerPricing(p.sewer);
          if (p.patio) setPatioPricing(p.patio);
          if (p.foundation) setFoundationPricing(p.foundation);
          if (p.driveRates) setDriveRates(p.driveRates);
          if (p.projectCommandRates) setProjectCommandRates(p.projectCommandRates);
        }
      } catch(e) {}
      setPricingEditMode(false);
    }
  };

  const resetPricing = async () => {
    if (confirm('Reset all pricing to factory defaults?')) {
      setHomeModels(DEFAULT_HOME_MODELS);
      setMaterials(DEFAULT_MATERIALS);
      setServices(DEFAULT_SERVICES);
      setSewerPricing(DEFAULT_SEWER);
      setPatioPricing(DEFAULT_PATIO);
      setFoundationPricing(DEFAULT_FOUNDATION);
      setDriveRates({ install: DRIVE_RATE_INSTALL, service: DRIVE_RATE_SERVICE, projectCommand: DRIVE_RATE_PC, inspection: DRIVE_RATE_INSPECTION });
      setProjectCommandRates({ psPerService: 150, pmBase: 4000 });
      try {
        await window.storage.set('sherman_pricing', JSON.stringify({
          homeModels: DEFAULT_HOME_MODELS, materials: DEFAULT_MATERIALS, services: DEFAULT_SERVICES,
          sewer: DEFAULT_SEWER, patio: DEFAULT_PATIO, foundation: DEFAULT_FOUNDATION,
          driveRates: { install: DRIVE_RATE_INSTALL, service: DRIVE_RATE_SERVICE, projectCommand: DRIVE_RATE_PC, inspection: DRIVE_RATE_INSPECTION },
          projectCommandRates: { psPerService: 150, pmBase: 4000 }
        }));
        alert('Pricing reset to defaults and saved!');
      } catch(e) {
        NotificationSystem.warning('Pricing reset but failed to save');
      }
    }
  };

  // ======================================================================
  // EFFECTS
  // ======================================================================

  // Expose edit function for popup windows
  useEffect(() => {
    window.editQuoteFromPopup = (quoteId) => {
      const quote = quotes.find(q => q.id === quoteId);
      if (quote) {
        const customer = customers.find(c => c.id === quote.customerId);
        if (customer) setSelCustomer(customer);
        copyQuoteForEdit(quote);
      }
    };
    return () => { delete window.editQuoteFromPopup; };
  }, [quotes, customers]);

  // ======================================================================
  // RENDER
  // ======================================================================

  // Login screen
  if (!isAuth) {
    return (
      <LoginForm
        loginU={loginU} setLoginU={setLoginU}
        loginP={loginP} setLoginP={setLoginP}
        loginError={loginError}
        onLogin={login}
        styles={S}
      />
    );
  }

  // Customer Portal
  if (isCustomerPortal && customerData) {
    return (
      <CustomerPortal
        customerData={customerData}
        quotes={quotes}
        services={services} materials={materials}
        sewerPricing={sewerPricing} patioPricing={patioPricing}
        driveRates={driveRates} foundationPricing={foundationPricing}
        homeModels={homeModels}
        onLogout={logout}
        onGenerateQuote={() => {}}
        fmtDate={fmtDate}
        styles={S}
      />
    );
  }

  // User Selection
  if (!userRole) {
    return (
      <UserSelector
        users={users}
        tempName={tempName} setTempName={setTempName}
        loginError={loginError} setLoginError={setLoginError}
        onSelectUser={handleSelectUser}
        styles={S}
      />
    );
  }

  // Crew View - separate layout for field crew
  if (userRole === 'crew') return (
    <div style={S.app}>
      <header style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" alt="" style={{ height: 32 }} /><span style={{ fontWeight: 600 }}>Field Crew</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {originalRole === 'admin' && (
            <select
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '8px 12px', borderRadius: 4, fontSize: 14, cursor: 'pointer' }}
              value={userRole}
              onChange={e => { setUserRole(e.target.value); setView('dashboard'); setSelQuote(null); setSelCustomer(null); }}
            >
              <option value="admin" style={{ color: '#333' }}>Admin View</option>
              <option value="sales" style={{ color: '#333' }}>Sales View</option>
              <option value="crew" style={{ color: '#333' }}>Crew View</option>
            </select>
          )}
          <span>{userName} {originalRole === 'admin' && <span style={{ opacity: 0.7 }}>(viewing as crew)</span>}</span>
          <button style={S.nav} onClick={logout}>Sign Out</button>
        </div>
      </header>
      <div style={S.main}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['Jobs', 'Warranties', 'Checklists'].map(t => <button key={t} style={{ ...S.tab, ...(crewTab === t.toLowerCase() ? S.tabA : {}) }} onClick={() => setCrewTab(t.toLowerCase())}>{t}</button>)}
        </div>
        {crewTab === 'jobs' && !selQuote && <div><h2>Active Jobs</h2>{contracts.filter(c => c.status !== 'Cancelled').concat(quotes.filter(q => ['Accepted', 'Under Contract'].includes(q.status))).map(q => {
          const cust = customers.find(c => c.id === q.customerId);
          return <div key={q.id} style={{ ...S.box, cursor: 'pointer' }} onClick={() => setSelQuote(q)}><h3 style={{ margin: 0 }}>{cust?.firstName || 'Unknown'} {cust?.lastName || 'Customer'}</h3><p style={{ color: '#666' }}>{cust?.siteCity || 'Unknown'}, {cust?.siteState || ''}</p></div>;
        })}{contracts.filter(c => c.status !== 'Cancelled').length === 0 && quotes.filter(q => ['Accepted', 'Under Contract'].includes(q.status)).length === 0 && <div style={S.box}>No active jobs</div>}</div>}
        {crewTab === 'jobs' && selQuote && (() => {
          const cust = customers.find(c => c.id === selQuote.customerId);
          const crewFiles = selQuote.folders?.crew_files || [];
          return <div><button style={S.btn2} onClick={() => setSelQuote(null)}>← Back</button><div style={{ ...S.box, marginTop: 16 }}><h2>{cust?.firstName || 'Unknown'} {cust?.lastName || 'Customer'}</h2><p>{cust?.phone || 'N/A'}</p><p>{cust?.siteAddress || 'N/A'}, {cust?.siteCity || 'N/A'}, {cust?.siteState || 'N/A'}</p><a href={getGoogleMapsUrl(cust?.siteAddress, cust?.siteCity, cust?.siteState, cust?.siteZip)} target="_blank" style={{ ...S.btnSm, background: '#4285f4', marginTop: 12 }}>Maps / Directions</a><PierDiagram quote={selQuote} /></div><div style={{ ...S.box, marginTop: 16 }}><h3 style={{ marginTop: 0, color: '#2c5530' }}>Crew Files</h3>{crewFiles.length > 0 ? <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{crewFiles.map(file => <div key={file.id || file.url} style={{ padding: 12, background: '#f8f9fa', borderRadius: 6, border: '1px solid #dee2e6' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}><div style={{ fontWeight: 700, fontSize: 15 }}>{file.type === 'link' ? '🔗' : file.type === 'pdf' ? '📄' : file.type === 'image' ? '🖼️' : '📎'} {file.name}</div><button onClick={() => { if (file.url.startsWith('data:')) { const newWindow = window.open(); if (newWindow) { const doc = newWindow.document; doc.open(); doc.write('<!DOCTYPE html><html><head><title>' + file.name + '</title><style>body{margin:0;padding:0;overflow:hidden;}</style></head><body></body></html>'); doc.close(); const elem = file.type === 'image' ? doc.createElement('img') : doc.createElement('iframe'); elem.style.cssText = file.type === 'image' ? 'max-width:100%;display:block;' : 'width:100%;height:100vh;border:none;'; elem.src = file.url; doc.body.appendChild(elem); } } else { window.open(file.url, '_blank'); } }} style={{ ...S.btnSm, background: '#2c5530' }}>Open</button></div>{file.notes && <div style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>{file.notes}</div>}<div style={{ fontSize: 11, color: '#999' }}>Added by {file.addedBy} on {new Date(file.addedAt).toLocaleDateString()}</div></div>)}</div> : <p style={{ color: '#666', fontStyle: 'italic' }}>No crew files available</p>}</div></div>;
        })()}
        {crewTab === 'warranties' && <div style={S.box}><h2>Warranties</h2><table style={S.table}><thead><tr><th style={S.th}>Manufacturer</th><th style={S.th}>Terms</th><th style={S.th}>Phone</th></tr></thead><tbody>{WARRANTIES.map((w, i) => <tr key={i}><td style={S.td}>{w.mfr}</td><td style={S.td}>{w.terms}</td><td style={S.td}>{w.phone}</td></tr>)}</tbody></table></div>}
        {crewTab === 'checklists' && <div><div style={S.box}><h3>Delivery Checklist</h3>{DELIVERY.docs.map((d, i) => <label key={i} style={S.chk}><input type="checkbox" /><span>{d}</span></label>)}{DELIVERY.exterior.map((d, i) => <label key={`ext-${i}`} style={S.chk}><input type="checkbox" /><span>{d}</span></label>)}</div><div style={S.box}><h3>Contract Checklist</h3>{CHECKLIST.map(c => <label key={c.id} style={S.chk}><input type="checkbox" /><span>{c.id}. {c.item}</span></label>)}</div></div>}
      </div>
    </div>
  );

  // Main Application
  return (
    <div style={S.app}>
      {/* Header */}
      <header style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png" alt="" style={{ height: 32 }} />
          <span style={{ fontWeight: 600 }}>Bidding System</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ ...S.nav, ...(view === 'dashboard' ? { background: 'rgba(255,255,255,0.2)' } : {}) }} onClick={() => { setView('dashboard'); setSelQuote(null); setSelContract(null); setSelCustomer(null); }}>Dashboard</button>
          <button style={{ ...S.nav, ...(view === 'warranties' ? { background: 'rgba(255,255,255,0.2)' } : {}) }} onClick={() => setView('warranties')}>Warranties</button>
          {isAdmin && <button style={{ ...S.nav, ...(view === 'users' ? { background: 'rgba(255,255,255,0.2)' } : {}) }} onClick={() => setView('users')}>Users</button>}
          {isAdmin && <button style={{ ...S.nav, ...(view === 'pricing' ? { background: 'rgba(255,255,255,0.2)' } : {}) }} onClick={() => setView('pricing')}>Pricing</button>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {originalRole === 'admin' && (
            <select
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '8px 12px', borderRadius: 4, fontSize: 14, cursor: 'pointer' }}
              value={userRole}
              onChange={e => { setUserRole(e.target.value); setView('dashboard'); setSelQuote(null); setSelCustomer(null); }}
            >
              <option value="admin" style={{ color: '#333' }}>Admin View</option>
              <option value="sales" style={{ color: '#333' }}>Sales View</option>
              <option value="crew" style={{ color: '#333' }}>Crew View</option>
            </select>
          )}
          <span>{userName} {originalRole === 'admin' && userRole !== 'admin' && <span style={{ opacity: 0.7 }}>(viewing as {userRole})</span>}</span>
          <button style={S.nav} onClick={logout}>Sign Out</button>
        </div>
      </header>

      <div style={S.main}>
        {/* Dashboard View */}
        {view === 'dashboard' && (
          <Dashboard
            myCustomers={myCustomers}
            myQuotes={myQuotes}
            quotes={quotes}
            contracts={contracts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isAdmin={isAdmin}
            userName={userName}
            fmtDate={fmtDate}
            onNewCustomer={() => {
              setNewCust(emptyCustomer());
              setEditingCustomerId(null);
              setShowCustSecondContact(false);
              setShowCustMailingAddress(false);
              setView('newCustomer');
            }}
            onSelectCustomer={(c) => { setSelCustomer(c); setView('viewCustomer'); }}
            onDeleteCustomer={(c) => setDeleteCustomerConfirm(c)}
            styles={S}
          />
        )}

        {/* New/Edit Customer View */}
        {view === 'newCustomer' && (
          <CustomerForm
            newCust={newCust}
            updateCustField={updateCustField}
            editingCustomerId={editingCustomerId}
            showCustSecondContact={showCustSecondContact}
            setShowCustSecondContact={setShowCustSecondContact}
            showCustMailingAddress={showCustMailingAddress}
            setShowCustMailingAddress={setShowCustMailingAddress}
            onSave={saveCustomer}
            onCancel={() => { setNewCust(emptyCustomer()); setEditingCustomerId(null); setView('dashboard'); }}
            styles={S}
          />
        )}

        {/* View Customer View */}
        {view === 'viewCustomer' && selCustomer && (
          <CustomerView
            selCustomer={selCustomer}
            quotes={quotes}
            contracts={contracts}
            customers={customers}
            services={services}
            materials={materials}
            sewerPricing={sewerPricing}
            patioPricing={patioPricing}
            driveRates={driveRates}
            foundationPricing={foundationPricing}
            isAdmin={isAdmin}
            showNewQuoteMenu={showNewQuoteMenu}
            setShowNewQuoteMenu={setShowNewQuoteMenu}
            fmtDate={fmtDate}
            fmtDateTime={fmtDateTime}
            onBack={() => { setView('dashboard'); setSelCustomer(null); }}
            onEditCustomer={() => startEditCustomer(selCustomer)}
            onDeleteCustomer={(c) => setDeleteCustomerConfirm(c)}
            onNewQuote={(quoteTypeId) => {
              setNewQ({ ...emptyQuote(), quoteType: quoteTypeId, driveTime: String(MIN_MILES) });
              setEditingQuoteId(null);
              setView('newQuote');
            }}
            onViewQuote={(item) => {
              const isContract = contracts.find(c => c.id === item.id);
              if (isContract) { setSelContract(item); setSelQuote(null); }
              else { setSelQuote(item); setSelContract(null); }
              setQuoteTab('details');
              setView('viewQuote');
            }}
            onEditQuote={(item) => startEdit(item)}
            onStartChangeOrder={(item) => startChangeOrder(item)}
            onDeleteQuote={(item) => setDeleteConfirm(item)}
            onUpdateStatus={updateStatus}
            onUpdateQuoteNotes={updateQuoteNotes}
            userName={userName}
            emptyQuote={emptyQuote}
            styles={S}
          />
        )}

        {/* View Quote/Contract View */}
        {view === 'viewQuote' && currentItem && (
          <div style={S.box}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <button style={S.btn2} onClick={() => {
                if (selCustomer) setView('viewCustomer');
                else setView('dashboard');
                setSelQuote(null);
                setSelContract(null);
              }}>Back</button>
              <h2 style={{ margin: 0 }}>
                {selContract ? 'Contract' : 'Quote'} #{DocumentUtils.getQuoteNum(currentItem)}
              </h2>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <select
                  style={{
                    fontSize: 13,
                    padding: '6px 12px',
                    fontWeight: 700,
                    borderRadius: 6,
                    border: '2px solid',
                    cursor: 'pointer',
                    background: currentItem.status === 'Completed' ? '#198754' : currentItem.status === 'Under Contract' ? '#0d6efd' : currentItem.status === 'Accepted' ? '#d1e7dd' : currentItem.status === 'Draft' ? '#fff3cd' : currentItem.status === 'Declined' ? '#f8d7da' : '#e9ecef',
                    color: ['Completed', 'Under Contract'].includes(currentItem.status) ? '#fff' : '#000',
                    borderColor: currentItem.status === 'Completed' ? '#146c43' : currentItem.status === 'Under Contract' ? '#0a58ca' : currentItem.status === 'Accepted' ? '#a3cfbb' : currentItem.status === 'Draft' ? '#ffca2c' : currentItem.status === 'Declined' ? '#f1aeb5' : '#dee2e6'
                  }}
                  value={currentItem.status}
                  onChange={e => updateStatus(currentItem, e.target.value)}
                >
                  {selContract ? (
                    ['Accepted', 'Under Contract', 'Completed'].map(s => <option key={s} value={s}>{s}</option>)
                  ) : (
                    ['Draft', 'Sent', 'Accepted', 'Declined'].map(s => <option key={s} value={s}>{s}</option>)
                  )}
                </select>
                {selContract ? (
                  <button style={{ ...S.btnSm, background: '#1565c0' }} onClick={() => startChangeOrder(currentItem)}>Change Order</button>
                ) : (
                  <button style={S.btnSm} onClick={() => startEdit(currentItem)}>Edit</button>
                )}
              </div>
            </div>

            {/* Quote/Contract tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' }}>
              {['details', 'files', 'scrubb'].map(tab => (
                <button key={tab} style={{ ...S.tab, ...(quoteTab === tab ? S.tabA : {}) }} onClick={() => setQuoteTab(tab)}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
              {selContract && (
                <button style={{ ...S.tab, ...(quoteTab === 'scope' ? S.tabA : {}) }} onClick={() => setQuoteTab('scope')}>
                  Scope of Work
                </button>
              )}
            </div>

            {/* Details tab - Show quote/contract summary */}
            {quoteTab === 'details' && totals && (
              <div>
                {/* Document Generation Buttons */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  <button
                    style={{ ...S.btnSm, background: '#2c5530' }}
                    onClick={() => {
                      const q = { ...currentItem, customerFirstName: custForQuote?.firstName, customerLastName: custForQuote?.lastName, phone: custForQuote?.phone, email: custForQuote?.email, siteAddress: custForQuote?.siteAddress, siteCity: custForQuote?.siteCity, siteState: custForQuote?.siteState, siteZip: custForQuote?.siteZip, person2FirstName: custForQuote?.person2FirstName, person2LastName: custForQuote?.person2LastName, phone2: custForQuote?.phone2, email2: custForQuote?.email2, mailingAddress: custForQuote?.mailingAddress, mailingCity: custForQuote?.mailingCity, mailingState: custForQuote?.mailingState, mailingZip: custForQuote?.mailingZip };
                      generateCustomerQuote(q, totals, homeModels);
                    }}
                  >📄 View Quote</button>
                  <button
                    style={{ ...S.btnSm, background: '#1565c0' }}
                    onClick={() => {
                      const quoteNum = DocumentUtils.getQuoteNum(currentItem);
                      const homeDesc = currentItem.homeModel !== 'NONE' ? currentItem.homeModel : `${currentItem.houseWidth}'x${currentItem.houseLength}'`;
                      const totalStr = fmtCurrency(totals.totalWithContingency);
                      const custName = `${custForQuote?.firstName || ''} ${custForQuote?.lastName || ''}`;
                      const loginName = (custForQuote?.firstName + custForQuote?.lastName).replace(/\s+/g, '');
                      const subject = encodeURIComponent(`Sherman Lumber - Quote #${quoteNum} for ${custName}`);
                      const body = encodeURIComponent(`Hi ${custForQuote?.firstName || 'there'},\n\nThank you for choosing Sherman Lumber! Here are your quote details:\n\nQuote #: ${quoteNum}\nHome: ${homeDesc}\nTotal Investment: ${totalStr}\n\nTo view your full quote online:\n- Username: ${loginName}\n- Password: mybid\n\nPlease don't hesitate to reach out with any questions.\n\nBest regards,\n${userName}\nSherman Lumber Inc.`);
                      window.location.href = `mailto:${custForQuote?.email || ''}?subject=${subject}&body=${body}`;
                    }}
                  >✉️ Email Quote</button>
                  {selContract && (
                    <button
                      style={{ ...S.btnSm, background: '#6f42c1' }}
                      onClick={() => generateScopeOfWorkDocument(currentItem, custForQuote, services)}
                    >📋 Scope of Work</button>
                  )}
                  {selContract && (
                    <button
                      style={{ ...S.btnSm, background: '#e65100' }}
                      onClick={() => {
                        const html = generateCrewWorkOrderDocument(currentItem, custForQuote, services);
                        const w = window.open('', '_blank');
                        if (w) { w.document.write(html); w.document.close(); }
                      }}
                    >🔧 Crew Work Order</button>
                  )}
                </div>

                <h3>Quote Summary</h3>
                <div style={S.row}>
                  <div><strong>Home:</strong> {currentItem.homeModel !== 'NONE' ? currentItem.homeModel : 'Custom'}</div>
                  <div><strong>Size:</strong> {currentItem.houseWidth}' x {currentItem.houseLength}'</div>
                  <div><strong>Foundation:</strong> {currentItem.foundationType}</div>
                  <div><strong>Status:</strong> {currentItem.status}</div>
                </div>
                <table style={S.table}>
                  <tbody>
                    {totals.homePrice > 0 && <tr><td style={S.td}><strong>Home</strong></td><td style={{ ...S.td, textAlign: 'right' }}>{fmtCurrency(totals.homePrice)}</td></tr>}
                    {isAdmin && <tr><td style={S.td}><strong>Materials</strong></td><td style={{ ...S.td, textAlign: 'right' }}>{fmtCurrency(totals.matT)}</td></tr>}
                    <tr><td style={S.td}><strong>Services</strong></td><td style={{ ...S.td, textAlign: 'right' }}>{fmtCurrency(totals.svcT)}</td></tr>
                    {isAdmin && <tr><td style={S.td}><strong>Project Command</strong></td><td style={{ ...S.td, textAlign: 'right' }}>{fmtCurrency(totals.projCmd.total)}</td></tr>}
                    {isAdmin && <tr style={{ borderTop: '1px solid #ddd' }}><td style={S.td}><strong>Subtotal</strong></td><td style={{ ...S.td, textAlign: 'right' }}>{fmtCurrency(totals.sub)}</td></tr>}
                    {isAdmin && <tr><td style={S.td}>Overhead (5%)</td><td style={{ ...S.td, textAlign: 'right' }}>{fmtCurrency(totals.oh)}</td></tr>}
                    {isAdmin && <tr><td style={S.td}>Markup (10%)</td><td style={{ ...S.td, textAlign: 'right' }}>{fmtCurrency(totals.mu)}</td></tr>}
                    <tr style={{ borderTop: '2px solid #2c5530' }}><td style={S.td}><strong>Total</strong></td><td style={{ ...S.td, textAlign: 'right', fontWeight: 700 }}>{fmtCurrency(totals.total)}</td></tr>
                    <tr><td style={S.td}><strong>Contingency (2%)</strong></td><td style={{ ...S.td, textAlign: 'right' }}>{fmtCurrency(totals.contingency)}</td></tr>
                    <tr><td colSpan={2} style={{ ...S.td, fontSize: 11, color: '#856404', fontStyle: 'italic', padding: '2px 12px' }}>This is the original contracted contingency amount, not a running balance. See the Contingency Fund Tracker on the Scrubb tab for the current balance.</td></tr>
                    <tr style={{ fontWeight: 700, fontSize: 18, borderTop: '3px solid #2c5530' }}><td style={S.td}><strong>Total Investment</strong></td><td style={{ ...S.td, textAlign: 'right', color: '#2c5530' }}>{fmtCurrency(totals.totalWithContingency)}</td></tr>
                  </tbody>
                </table>

                {/* Pier Diagram */}
                {currentItem.houseWidth && currentItem.houseLength && (
                  <div style={{ marginTop: 16 }}>
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '8px 0' }}
                      onClick={() => setIsPierDiagramExpandedSummary(!isPierDiagramExpandedSummary)}
                    >
                      <h4 style={{ margin: 0 }}>{isPierDiagramExpandedSummary ? '▼' : '▶'} Pier Layout</h4>
                    </div>
                    {isPierDiagramExpandedSummary && <PierDiagram quote={currentItem} />}
                  </div>
                )}

                {/* Change Order History - view on Scrubb tab in Contingency Fund Tracker */}
                {currentItem.changeOrderHistory?.length > 0 && (
                  <div style={{ marginTop: 16, padding: 12, background: '#e3f2fd', borderRadius: 8, border: '1px solid #1565c0' }}>
                    <div style={{ fontSize: 13, color: '#1565c0', fontWeight: 600 }}>
                      {currentItem.changeOrderHistory.filter(co => !co.isReversal).length} Change Order(s) - See the Contingency Fund Tracker on the Scrubb tab for full details and running balance.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Files tab */}
            {quoteTab === 'files' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ margin: 0 }}>Project Files</h3>
                  <button style={{ ...S.btnSm, background: '#ff6f00', padding: '8px 20px', fontSize: 14 }} onClick={() => folderSavers.saveAllDocsToFolders(currentItem, custForQuote)} title="Generate and save all documents - replaces outdated copies with latest versions">Update All Files</button>
                </div>
                {Object.entries(FolderUtils.getFolders(currentItem)).map(([folderId, files]) => (
                  <div key={folderId}
                    style={{ ...S.box, padding: 12, border: dragOverFolder === folderId ? '2px dashed #2c5530' : '1px solid #eee' }}
                    onDragOver={(e) => { e.preventDefault(); setDragOverFolder(folderId); }}
                    onDragLeave={() => setDragOverFolder(null)}
                    onDrop={(e) => handleFileDrop(e, folderId, currentItem)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      onClick={() => setActiveFolder(activeFolder === folderId ? null : folderId)}>
                      <strong>{folderId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong>
                      <span style={S.badge}>{files.length} file{files.length !== 1 ? 's' : ''}</span>
                    </div>
                    {activeFolder === folderId && (
                      <div style={{ marginTop: 8 }}>
                        {files.length === 0 ? (
                          <p style={{ color: '#999', fontSize: 13 }}>No files yet. Drag and drop to add.</p>
                        ) : (
                          files.map(file => (
                            <div key={file.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #eee' }}>
                              <button
                                onClick={() => {
                                  if (file.url?.startsWith('data:text/html;base64,')) {
                                    try {
                                      const base64 = file.url.split(',')[1];
                                      const html = decodeURIComponent(escape(atob(base64)));
                                      const blob = new Blob([html], { type: 'text/html' });
                                      const blobUrl = URL.createObjectURL(blob);
                                      window.open(blobUrl, '_blank');
                                    } catch (e) {
                                      const newWindow = window.open();
                                      if (newWindow) { newWindow.document.open(); newWindow.document.write('<iframe src="' + file.url + '" style="width:100%;height:100vh;border:none;"></iframe>'); newWindow.document.close(); }
                                    }
                                  } else if (file.url?.startsWith('data:')) {
                                    const newWindow = window.open();
                                    if (newWindow) { newWindow.document.open(); newWindow.document.write('<img src="' + file.url + '" style="max-width:100%;">'); newWindow.document.close(); }
                                  } else {
                                    window.open(file.url, '_blank');
                                  }
                                }}
                                style={{ background: 'none', border: 'none', color: '#2c5530', cursor: 'pointer', textAlign: 'left', padding: 0, font: 'inherit', fontSize: 14 }}
                              >
                                {file.type === 'link' ? '🔗' : file.type === 'image' ? '🖼️' : '📄'} {file.name}
                              </button>
                              <button style={{ background: 'transparent', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: 12 }}
                                onClick={() => deleteFileFromFolder(folderId, file.id, currentItem)}>Delete</button>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Scrubb Tab - Cost Tracking */}
            {quoteTab === 'scrubb' && currentItem && ['Accepted', 'Under Contract', 'Completed'].includes(currentItem.status) && (
              <div style={S.box}>
                <h2 style={{ marginTop: 0, borderBottom: '2px solid #2c5530', paddingBottom: 8 }}>Project Cost Tracking (Scrubb)</h2>
                <p style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>
                  Track actual costs for professional services as the project progresses.
                </p>
                {(() => {
                  if (!totals) return <div style={{ textAlign: 'center', padding: 40, color: '#999' }}><p>Unable to load cost tracking data.</p></div>;

                  const trackingItems = [];
                  const mkItem = (key, name, cp, cat, isAllowance = false) => {
                    const ac = currentItem.scrubbCosts?.[key] || 0;
                    const v = ac > 0 ? cp - ac : 0;
                    return { key, name, contractPrice: cp, actualCost: ac, variance: v, variancePct: cp > 0 && ac > 0 ? ((v / cp) * 100).toFixed(1) : '0.0', docs: currentItem.scrubbDocs?.[key] || [], isAllowance, category: cat };
                  };

                  // Home
                  if (totals?.homePrice > 0) trackingItems.push(mkItem('home_dealership', 'Home from Dealership', totals.homePrice, 'home'));

                  // NHL Contract: lumped Materials + Installation of Home + Painting
                  const NHL_KEYS = ['installation_of_home', 'painting'];
                  const svcArr = totals?.svc || [];
                  const nhlSubs = [];
                  const installSvc = svcArr.find(s => s.key === 'installation_of_home');
                  if (installSvc?.cost > 0) nhlSubs.push({ label: 'Install', cost: installSvc.cost });
                  const paintSvc = svcArr.find(s => s.key === 'painting');
                  if (paintSvc?.cost > 0) nhlSubs.push({ label: 'Paint', cost: paintSvc.cost });
                  if (totals.matT > 0) nhlSubs.push({ label: 'Install Materials', cost: totals.matT });
                  const nhlTotal = nhlSubs.reduce((sum, s) => sum + s.cost, 0);
                  if (nhlTotal > 0) {
                    const nhlItem = mkItem('nhl_contract', 'NHL Contract', nhlTotal, 'services');
                    nhlItem.subItems = nhlSubs;
                    trackingItems.push(nhlItem);
                  }

                  // All other services from totals.svc
                  svcArr.forEach(s => {
                    if (s.cost > 0 && !NHL_KEYS.includes(s.key)) {
                      const item = mkItem(s.key, s.item, s.cost, 'services', ALLOWANCE_ITEMS.includes(s.key));
                      // Permits uses permitEntries for actual cost, not scrubbCosts
                      if (s.key === 'permits') {
                        const pe = currentItem.permitEntries || [];
                        const peTotal = pe.reduce((sum, e) => sum + (parseFloat(e.cost) || 0), 0);
                        item.actualCost = peTotal;
                        item.variance = peTotal > 0 ? s.cost - peTotal : 0;
                        item.variancePct = s.cost > 0 && peTotal > 0 ? ((item.variance / s.cost) * 100).toFixed(1) : '0.0';
                      }
                      trackingItems.push(item);
                    }
                  });

                  // Project Command
                  if (totals.projCmd?.total > 0) trackingItems.push(mkItem('project_command', 'Project Command (PS + PM + PC)', totals.projCmd.total, 'services'));

                  // Additional Materials (always show — entries-based like permits)
                  trackingItems.push({ key: 'addl_materials', name: 'Additional Materials', contractPrice: 0, actualCost: 0, variance: 0, variancePct: '0.0', docs: currentItem.scrubbDocs?.['addl_materials'] || [], isAllowance: false, category: 'services' });

                  // Overhead & Markup — fixed costs, actualCost = contractPrice
                  if (totals.oh > 0) trackingItems.push({ ...mkItem('overhead', 'Overhead (5%)', totals.oh, 'margin'), actualCost: totals.oh });
                  if (totals.mu > 0) trackingItems.push({ ...mkItem('markup', 'Markup (10%)', totals.mu, 'margin'), actualCost: totals.mu });

                  if (trackingItems.length === 0) return <div style={{ textAlign: 'center', padding: 40, color: '#999' }}><p>No items to track.</p></div>;

                  const startC = totals.contingency || 0;

                  // Format number string with commas as user types
                  const fmtInput = (val) => {
                    const raw = val.replace(/[^0-9.]/g, '');
                    const parts = raw.split('.');
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    return parts.length > 1 ? parts[0] + '.' + parts[1].slice(0, 2) : parts[0];
                  };
                  const parseInput = (val) => parseFloat(val.replace(/,/g, '')) || 0;

                  const saveScrubbUpdate = (updatedItem) => {
                    if (selQuote?.id === currentItem.id) { saveQuotes(quotes.map(q => q.id === currentItem.id ? updatedItem : q)); setSelQuote(updatedItem); }
                    else if (selContract?.id === currentItem.id) { saveContracts(contracts.map(c => c.id === currentItem.id ? updatedItem : c)); setSelContract(updatedItem); }
                  };

                  const handleScrubbSave = (svc) => {
                    const cost = parseInput(scrubbNewCost);
                    const historyEntry = { id: genId(), serviceKey: svc.key, serviceName: svc.name, previousCost: svc.actualCost || 0, newCost: cost, contractPrice: svc.contractPrice, variance: cost > 0 ? svc.contractPrice - cost : 0, isAllowance: ALLOWANCE_ITEMS.includes(svc.key), updatedAt: new Date().toISOString(), updatedBy: userName };
                    saveScrubbUpdate({ ...currentItem, scrubbCosts: { ...(currentItem.scrubbCosts || {}), [svc.key]: cost }, scrubbHistory: [...(currentItem.scrubbHistory || []), historyEntry], updatedAt: Date.now(), updatedBy: userName });
                    setScrubbEditingService(null); setScrubbNewCost('');
                    if (ALLOWANCE_ITEMS.includes(svc.key)) {
                      const v = cost > 0 ? svc.contractPrice - cost : 0;
                      const updatedCosts = { ...(currentItem.scrubbCosts || {}), [svc.key]: cost };
                      let newSavings = 0, newOverages = 0;
                      trackingItems.forEach(ti => {
                        if (ALLOWANCE_ITEMS.includes(ti.key)) {
                          const ac = ti.key === svc.key ? cost : (updatedCosts[ti.key] || ti.actualCost || 0);
                          if (ac > 0) {
                            const diff = ti.contractPrice - ac;
                            if (diff > 0) newSavings += diff; else newOverages += Math.abs(diff);
                          }
                        }
                      });
                      const coUsedCheck = (currentItem.changeOrderHistory || []).reduce((s, co) => s + (co.contingencyUsed || 0), 0);
                      const cPmtsCheck = (currentItem.scrubbPayments || []).filter(p => p.isContingencyPayment).reduce((s, p) => s + parseFloat(p.amount || 0), 0);
                      const balanceAfter = startC + newSavings - newOverages - cPmtsCheck - coUsedCheck;
                      if (balanceAfter < 0) {
                        alert(
                          `⚠️ CONTINGENCY FUND OVERDRAWN ⚠️\n\n` +
                          `${svc.name} is ${fmt(Math.abs(v))} over budget.\n\n` +
                          `The contingency fund is now negative by ${fmt(Math.abs(balanceAfter))}.\n\n` +
                          `A payment must be collected from the customer before any additional work can continue.`
                        );
                      } else {
                        alert(v > 0 ? `${svc.name} came in ${fmt(v)} under budget.\nAdded to contingency fund.` : v < 0 ? `${svc.name} is ${fmt(Math.abs(v))} over budget.\nDrawn from contingency fund.` : `${svc.name} is exactly on budget.`);
                      }
                    }
                  };

                  return (
                    <div>
                      <table style={S.table}>
                        <thead><tr><th style={S.th}>Service</th><th style={S.th}>Contract Price</th><th style={S.th}>Actual Cost</th><th style={S.th}>Variance</th><th style={S.th}>Docs</th><th style={S.th}></th></tr></thead>
                        <tbody>
                          {[{ key: 'home', label: 'Home' }, { key: 'services', label: 'Services & Site Work' }, { key: 'cost_basis', label: 'Cost Basis' }, { key: 'margin', label: 'Margin' }].map(group => {
                            const items = trackingItems.filter(i => i.category === group.key);
                            if (items.length === 0) return null;
                            return (<React.Fragment key={group.key}>
                              <tr><td colSpan={6} style={{ background: '#e9ecef', fontWeight: 700, fontSize: 13, padding: '8px 12px', color: '#2c5530', borderBottom: '2px solid #2c5530' }}>{group.label}</td></tr>
                              {items.map(svc => {
                            if (svc.key === 'permits') {
                              const pe = currentItem.permitEntries || [];
                              const totalPC = pe.reduce((sum, e) => sum + (parseFloat(e.cost) || 0), 0);
                              const pv = totalPC > 0 ? svc.contractPrice - totalPC : 0;
                              const pvp = svc.contractPrice > 0 && totalPC > 0 ? ((pv / svc.contractPrice) * 100).toFixed(1) : '0.0';
                              return (
                                <tr key={svc.key}>
                                  <td style={S.td}><strong>{svc.name}</strong>{svc.isAllowance && <span style={{ marginLeft: 8, fontSize: 11, color: '#856404', fontWeight: 600, background: '#ffc107', padding: '2px 6px', borderRadius: 3 }}>ALLOWANCE</span>}</td>
                                  <td style={{ ...S.td, color: '#2c5530', fontWeight: 600 }}>{fmt(svc.contractPrice)}</td>
                                  <td style={S.td}>
                                    {pe.length > 0 ? <div style={{ marginBottom: 8 }}>{pe.map((entry, idx) => (
                                      <div key={entry.id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px', marginBottom: 4, background: '#f8f9fa', borderRadius: 4, fontSize: 13 }}>
                                        <span>{entry.name}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                          <span style={{ fontWeight: 600 }}>{fmt(entry.cost)}</span>
                                          <button style={{ background: 'transparent', border: 'none', color: '#1565c0', cursor: 'pointer', fontSize: 11 }} onClick={() => { setEditingPermitEntry(entry); setPermitEntryName(entry.name); setPermitEntryCost(entry.cost.toString()); setShowPermitModal(true); }}>✏️</button>
                                          <button style={{ background: 'transparent', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: 11 }} onClick={() => { if (confirm(`Delete ${entry.name}?`)) { const updated = pe.filter((_, i) => i !== idx); saveScrubbUpdate({ ...currentItem, permitEntries: updated, updatedAt: Date.now(), updatedBy: userName }); } }}>🗑️</button>
                                        </div>
                                      </div>
                                    ))}<div style={{ borderTop: '1px solid #ddd', paddingTop: 4, marginTop: 4, fontWeight: 600, fontSize: 14 }}>Total: {fmt(totalPC)}</div></div> : <div style={{ color: '#999', marginBottom: 8 }}>No permits entered</div>}
                                    <button style={{ ...S.btnSm, padding: '4px 12px', fontSize: 12, width: '100%' }} onClick={() => { setEditingPermitEntry(null); setPermitEntryName(''); setPermitEntryCost(''); setShowPermitModal(true); }}>+ Add Permit</button>
                                  </td>
                                  <td style={{ ...S.td, color: totalPC > 0 ? (pv > 0 ? '#28a745' : pv < 0 ? '#dc3545' : '#666') : '#999', fontWeight: totalPC > 0 ? 600 : 400 }}>{totalPC > 0 ? <>{pv >= 0 ? '+' : ''}{fmt(pv)} ({pvp}%)</> : '-'}</td>
                                  <td style={S.td}><span style={{ fontSize: 12, color: '#666' }}>{svc.docs.length} file{svc.docs.length !== 1 ? 's' : ''}</span></td>
                                  <td style={S.td}></td>
                                </tr>
                              );
                            }
                            // Additional Materials: entries-based like permits
                            if (svc.key === 'addl_materials') {
                              const me = currentItem.addlMaterialEntries || [];
                              const totalMC = me.reduce((sum, e) => sum + (parseFloat(e.cost) || 0), 0);
                              return (
                                <tr key={svc.key}>
                                  <td style={S.td}><strong>{svc.name}</strong></td>
                                  <td style={{ ...S.td, color: '#999' }}>-</td>
                                  <td style={S.td}>
                                    {me.length > 0 ? <div style={{ marginBottom: 8 }}>{me.map((entry, idx) => (
                                      <div key={entry.id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px', marginBottom: 4, background: '#f8f9fa', borderRadius: 4, fontSize: 13 }}>
                                        <span>{entry.name}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                          <span style={{ fontWeight: 600 }}>{fmt(entry.cost)}</span>
                                          <button style={{ background: 'transparent', border: 'none', color: '#1565c0', cursor: 'pointer', fontSize: 11 }} onClick={() => { setEditingMaterialEntry(entry); setMaterialEntryName(entry.name); setMaterialEntryCost(entry.cost.toString()); setShowAddlMaterialModal(true); }}>✏️</button>
                                          <button style={{ background: 'transparent', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: 11 }} onClick={() => { if (confirm(`Delete ${entry.name}?`)) { const updated = me.filter((_, i) => i !== idx); saveScrubbUpdate({ ...currentItem, addlMaterialEntries: updated, updatedAt: Date.now(), updatedBy: userName }); } }}>🗑️</button>
                                        </div>
                                      </div>
                                    ))}<div style={{ borderTop: '1px solid #ddd', paddingTop: 4, marginTop: 4, fontWeight: 600, fontSize: 14 }}>Total: {fmt(totalMC)}</div></div> : <div style={{ color: '#999', marginBottom: 8 }}>No materials entered</div>}
                                    <button style={{ ...S.btnSm, padding: '4px 12px', fontSize: 12, width: '100%' }} onClick={() => { setEditingMaterialEntry(null); setMaterialEntryName(''); setMaterialEntryCost(''); setShowAddlMaterialModal(true); }}>+ Add Material</button>
                                  </td>
                                  <td style={S.td}></td>
                                  <td style={S.td}></td>
                                  <td style={S.td}></td>
                                </tr>
                              );
                            }
                            // NHL Contract: expandable row
                            if (svc.key === 'nhl_contract') {
                              return (<React.Fragment key={svc.key}>
                                <tr>
                                  <td style={S.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                      <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, padding: 0, lineHeight: 1 }} onClick={() => setNhlExpanded(p => !p)}>{nhlExpanded ? '▼' : '▶'}</button>
                                      <strong>{svc.name}</strong>
                                    </div>
                                  </td>
                                  <td style={{ ...S.td, color: '#2c5530', fontWeight: 600 }}>{fmt(svc.contractPrice)}</td>
                                  <td style={S.td}>
                                    {scrubbEditingService === svc.key ? (
                                      <div style={{ display: 'flex', gap: 4 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #2c5530', borderRadius: 4, padding: '0 8px' }}><span style={{ color: '#666', fontSize: 14 }}>$</span><input type="text" inputMode="decimal" style={{ ...S.inputEdit, width: 110, border: 'none', padding: '6px 4px' }} value={fmtInput(scrubbNewCost)} onChange={e => setScrubbNewCost(e.target.value.replace(/[^0-9.]/g, ''))} onKeyDown={e => { if (e.key === 'Enter') handleScrubbSave(svc); if (e.key === 'Escape') { setScrubbEditingService(null); setScrubbNewCost(''); } }} placeholder="0.00" autoFocus /></div>
                                        <button style={{ ...S.btnSm, padding: '4px 8px', background: '#28a745' }} onClick={() => handleScrubbSave(svc)}>✓</button>
                                        <button style={{ ...S.btnSm, padding: '4px 8px', background: '#dc3545' }} onClick={() => { setScrubbEditingService(null); setScrubbNewCost(''); }}>✕</button>
                                      </div>
                                    ) : (
                                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ color: svc.actualCost > 0 ? '#000' : '#999' }}>{svc.actualCost > 0 ? fmt(svc.actualCost) : 'Not entered'}</span>
                                        <button style={{ background: 'transparent', border: 'none', color: '#1565c0', cursor: 'pointer', fontSize: 12 }} onClick={() => { setScrubbEditingService(svc.key); setScrubbNewCost(svc.actualCost > 0 ? svc.actualCost.toString() : ''); }}>✏️</button>
                                      </div>
                                    )}
                                  </td>
                                  <td style={S.td}>{svc.actualCost > 0 ? <span style={{ color: svc.variance > 0 ? '#28a745' : svc.variance < 0 ? '#dc3545' : '#666', fontWeight: 600 }}>{svc.variance >= 0 ? '+' : ''}{fmt(svc.variance)} ({svc.variancePct}%)</span> : '-'}</td>
                                  <td style={S.td}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 12, color: '#666' }}>{svc.docs.length} file{svc.docs.length !== 1 ? 's' : ''}</span>
                                    <button style={{ ...S.btnSm, padding: '4px 8px', fontSize: 11 }} onClick={() => {
                                      const fileName = prompt('Document name:'); if (!fileName) return;
                                      const fileUrl = prompt('Document URL (or leave blank):');
                                      const doc = { id: genId(), name: fileName, url: fileUrl || '', addedAt: new Date().toISOString(), addedBy: userName };
                                      saveScrubbUpdate({ ...currentItem, scrubbDocs: { ...(currentItem.scrubbDocs || {}), [svc.key]: [...(currentItem.scrubbDocs?.[svc.key] || []), doc] }, updatedAt: Date.now(), updatedBy: userName });
                                    }}>+ Add Doc</button>
                                  </div></td>
                                  <td style={S.td}>{svc.docs.length > 0 && <button style={{ background: 'transparent', border: 'none', color: '#1565c0', cursor: 'pointer', fontSize: 12 }} onClick={() => alert(`Documents for ${svc.name}:\n\n${svc.docs.map((d, i) => `${i + 1}. ${d.name}`).join('\n')}`)}>View</button>}</td>
                                </tr>
                                {nhlExpanded && svc.subItems?.map((sub, idx) => (
                                  <tr key={`nhl-sub-${idx}`} style={{ background: '#f8f9fa' }}>
                                    <td style={{ ...S.td, paddingLeft: 36, fontSize: 13, color: '#555' }}>{sub.label}</td>
                                    <td style={{ ...S.td, fontSize: 13, color: '#555' }}>{fmt(sub.cost)}</td>
                                    <td style={S.td}></td><td style={S.td}></td><td style={S.td}></td><td style={S.td}></td>
                                  </tr>
                                ))}
                              </React.Fragment>);
                            }
                            const readOnly = svc.category === 'cost_basis' || svc.category === 'margin';
                            return (
                              <tr key={svc.key} style={readOnly ? { background: '#f8f9fa' } : {}}>
                                <td style={S.td}><strong>{svc.name}</strong>{svc.isAllowance && <span style={{ marginLeft: 8, fontSize: 11, color: '#856404', fontWeight: 600, background: '#ffc107', padding: '2px 6px', borderRadius: 3 }}>ALLOWANCE</span>}</td>
                                <td style={{ ...S.td, color: '#2c5530', fontWeight: 600 }}>{fmt(svc.contractPrice)}</td>
                                <td style={S.td}>
                                  {readOnly ? (
                                    <span style={{ color: '#666', fontStyle: 'italic', fontSize: 12 }}>Fixed cost</span>
                                  ) : scrubbEditingService === svc.key ? (
                                    <div style={{ display: 'flex', gap: 4 }}>
                                      <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #2c5530', borderRadius: 4, padding: '0 8px' }}><span style={{ color: '#666', fontSize: 14 }}>$</span><input type="text" inputMode="decimal" style={{ ...S.inputEdit, width: 110, border: 'none', padding: '6px 4px' }} value={fmtInput(scrubbNewCost)} onChange={e => setScrubbNewCost(e.target.value.replace(/[^0-9.]/g, ''))} onKeyDown={e => { if (e.key === 'Enter') handleScrubbSave(svc); if (e.key === 'Escape') { setScrubbEditingService(null); setScrubbNewCost(''); } }} placeholder="0.00" autoFocus /></div>
                                      <button style={{ ...S.btnSm, padding: '4px 8px', background: '#28a745' }} onClick={() => handleScrubbSave(svc)}>✓</button>
                                      <button style={{ ...S.btnSm, padding: '4px 8px', background: '#dc3545' }} onClick={() => { setScrubbEditingService(null); setScrubbNewCost(''); }}>✕</button>
                                    </div>
                                  ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                      <span style={{ color: svc.actualCost > 0 ? '#000' : '#999' }}>{svc.actualCost > 0 ? fmt(svc.actualCost) : 'Not entered'}</span>
                                      <button style={{ background: 'transparent', border: 'none', color: '#1565c0', cursor: 'pointer', fontSize: 12 }} onClick={() => { setScrubbEditingService(svc.key); setScrubbNewCost(svc.actualCost > 0 ? svc.actualCost.toString() : ''); }}>✏️</button>
                                    </div>
                                  )}
                                </td>
                                <td style={S.td}>{readOnly ? <span style={{ color: '#666' }}>-</span> : svc.actualCost > 0 ? <span style={{ color: svc.variance > 0 ? '#28a745' : svc.variance < 0 ? '#dc3545' : '#666', fontWeight: 600 }}>{svc.variance >= 0 ? '+' : ''}{fmt(svc.variance)} ({svc.variancePct}%)</span> : '-'}</td>
                                <td style={S.td}>
                                  {readOnly ? null : <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 12, color: '#666' }}>{svc.docs.length} file{svc.docs.length !== 1 ? 's' : ''}</span>
                                    <button style={{ ...S.btnSm, padding: '4px 8px', fontSize: 11 }} onClick={() => {
                                      const fileName = prompt('Document name:'); if (!fileName) return;
                                      const fileUrl = prompt('Document URL (or leave blank):');
                                      const doc = { id: genId(), name: fileName, url: fileUrl || '', addedAt: new Date().toISOString(), addedBy: userName };
                                      saveScrubbUpdate({ ...currentItem, scrubbDocs: { ...(currentItem.scrubbDocs || {}), [svc.key]: [...(currentItem.scrubbDocs?.[svc.key] || []), doc] }, updatedAt: Date.now(), updatedBy: userName });
                                    }}>+ Add Doc</button>
                                  </div>}
                                </td>
                                <td style={S.td}>{!readOnly && svc.docs.length > 0 && <button style={{ background: 'transparent', border: 'none', color: '#1565c0', cursor: 'pointer', fontSize: 12 }} onClick={() => alert(`Documents for ${svc.name}:\n\n${svc.docs.map((d, i) => `${i + 1}. ${d.name}`).join('\n')}`)}>View</button>}</td>
                              </tr>
                            );
                          })}
                            </React.Fragment>);
                          })}
                        </tbody>
                      </table>

                      {/* Summary */}
                      <div style={{ marginTop: 32, padding: 20, background: '#f8f9fa', borderRadius: 8 }}>
                        <h3 style={{ marginTop: 0 }}>Summary</h3>
                        {(() => {
                          const totalContract = trackingItems.reduce((s, i) => s + i.contractPrice, 0);
                          const totalActual = trackingItems.reduce((s, i) => s + i.actualCost, 0);
                          const totalVar = trackingItems.reduce((s, i) => s + i.variance, 0);
                          const overBudget = totalActual > totalContract;
                          return (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                              <div><div style={{ fontSize: 12, color: '#666' }}>Total Contract Price</div><div style={{ fontSize: 24, fontWeight: 700, color: '#2c5530' }}>{fmt(totalContract)}</div></div>
                              <div><div style={{ fontSize: 12, color: '#666' }}>Total Actual Cost</div><div style={{ fontSize: 24, fontWeight: 700, color: overBudget ? '#dc3545' : '#1565c0' }}>{fmt(totalActual)}</div></div>
                              <div><div style={{ fontSize: 12, color: '#666' }}>Total Variance</div><div style={{ fontSize: 24, fontWeight: 700, color: overBudget ? '#dc3545' : totalVar > 0 ? '#28a745' : totalVar < 0 ? '#dc3545' : '#666' }}>{(totalVar >= 0 ? '+' : '') + fmt(totalVar)}</div></div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Contingency Fund Tracker */}
                      <div style={{ marginTop: 24, padding: 20, background: '#e3f2fd', borderRadius: 8, border: '2px solid #1565c0' }}>
                        <h3 style={{ marginTop: 0, color: '#1565c0' }}>Contingency Fund Tracker</h3>
                        <p style={{ fontSize: 13, color: '#666', marginBottom: 16, lineHeight: 1.6 }}>
                          <strong>Purpose:</strong> A 2% fund for change orders and allowance adjustments. When allowances come in under budget, savings are added here. When costs exceed estimates or change orders are made, funds are drawn from here first, minimizing customer out-of-pocket costs. At project completion, if there are no overages or change orders, the customer receives back the full 2% contingency amount plus any allowance savings.
                        </p>
                        {(() => {
                          // Starting fund: original 2% BEFORE any CO additions inflated the total
                          const coHistory = currentItem.changeOrderHistory || [];
                          const startC = coHistory.length > 0
                            ? (coHistory[0].contingencyUsed || 0) + (coHistory[0].contingencyBalance || 0)
                            : (totals.contingency || 0);

                          // CO service costs: full contract price of each CO-added service draws from fund
                          const coServiceItems = trackingItems.filter(i => i.isChangeOrderAddition);
                          const coServiceCosts = coServiceItems.reduce((s, i) => s + i.contractPrice, 0);

                          // Allowance variances (only items with actual costs entered)
                          const allowanceItemsWithCosts = trackingItems.filter(i => ALLOWANCE_ITEMS.includes(i.key) && i.actualCost > 0);
                          const savings = allowanceItemsWithCosts.filter(i => i.variance > 0).reduce((s, i) => s + i.variance, 0);
                          const overages = allowanceItemsWithCosts.filter(i => i.variance < 0).reduce((s, i) => s + Math.abs(i.variance), 0);

                          // Customer contingency payments REFILL the fund (add back)
                          const payments = currentItem.scrubbPayments || [];
                          const cPayments = payments.filter(p => p.isContingencyPayment).reduce((s, p) => s + parseFloat(p.amount || 0), 0);

                          // Running balance
                          const balance = startC - coServiceCosts + savings - overages + cPayments;
                          const fundOverdrafted = balance < 0;
                          const overdraftAmount = Math.abs(Math.min(0, balance));
                          return (
                            <div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                                <div style={{ padding: 12, background: '#fff', borderRadius: 6 }}><div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Starting Fund (2%)</div><div style={{ fontSize: 20, fontWeight: 700, color: '#1565c0' }}>{fmt(startC)}</div></div>
                                <div style={{ padding: 12, background: '#fff', borderRadius: 6 }}><div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Current Balance</div><div style={{ fontSize: 20, fontWeight: 700, color: balance >= 0 ? '#28a745' : '#dc3545' }}>{fmt(balance)}</div></div>
                              </div>
                              {fundOverdrafted && (
                                <div style={{ padding: 16, background: '#f8d7da', border: '2px solid #dc3545', borderRadius: 8, marginBottom: 16, textAlign: 'center' }}>
                                  <div style={{ fontSize: 18, fontWeight: 700, color: '#dc3545', marginBottom: 6 }}>CONTINGENCY FUND OVERDRAWN</div>
                                  <div style={{ fontSize: 14, color: '#721c24', marginBottom: 8 }}>The contingency fund is negative by <strong>{fmt(overdraftAmount)}</strong>.</div>
                                  <div style={{ fontSize: 13, color: '#721c24' }}>The customer must pay <strong>{fmt(overdraftAmount)}</strong> to cover the deficit. The contract amount does not change.</div>
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 12 }}>
                                    <div style={{ padding: 10, background: '#fff', borderRadius: 4, textAlign: 'center' }}><div style={{ fontSize: 11, color: '#666' }}>Total Draws</div><div style={{ fontSize: 16, fontWeight: 700, color: '#dc3545' }}>{fmt(coServiceCosts + overages)}</div></div>
                                    <div style={{ padding: 10, background: '#fff', borderRadius: 4, textAlign: 'center' }}><div style={{ fontSize: 11, color: '#666' }}>Fund + Savings</div><div style={{ fontSize: 16, fontWeight: 700, color: '#28a745' }}>{fmt(startC + savings + cPayments)}</div></div>
                                    <div style={{ padding: 10, background: '#fff', borderRadius: 4, textAlign: 'center' }}><div style={{ fontSize: 11, color: '#666' }}>Customer Owes</div><div style={{ fontSize: 16, fontWeight: 700, color: '#dc3545' }}>{fmt(overdraftAmount)}</div></div>
                                  </div>
                                </div>
                              )}
                              {/* Line-item breakdown */}
                              <div style={{ padding: 12, background: '#fff', borderRadius: 6, marginBottom: 8 }}>
                                {coServiceItems.map(item => (
                                  <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: 13, color: '#333' }}>CO: {item.name}</span>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#dc3545' }}>-{fmt(item.contractPrice)}</span>
                                  </div>
                                ))}
                                {savings > 0 && <div style={{ marginBottom: 6 }}><div style={{ fontSize: 12, color: '#666' }}>Allowance Savings (added to fund)</div><div style={{ fontSize: 16, fontWeight: 600, color: '#28a745' }}>+{fmt(savings)}</div></div>}
                                {overages > 0 && <div style={{ marginBottom: 6 }}><div style={{ fontSize: 12, color: '#666' }}>Allowance Overages (drawn from fund)</div><div style={{ fontSize: 16, fontWeight: 600, color: '#dc3545' }}>-{fmt(overages)}</div></div>}
                                {cPayments > 0 && <div style={{ marginBottom: 6 }}><div style={{ fontSize: 12, color: '#666' }}>Customer Payments (refunding fund)</div><div style={{ fontSize: 16, fontWeight: 600, color: '#28a745' }}>+{fmt(cPayments)}</div></div>}
                                {coServiceItems.length === 0 && savings === 0 && overages === 0 && cPayments === 0 && (
                                  <div style={{ fontSize: 13, color: '#999', textAlign: 'center', padding: 8 }}>No activity yet — the full 2% fund is available.</div>
                                )}
                              </div>

                              {/* Allowance Item Breakdown */}
                              {(() => {
                                const allowanceItems = trackingItems.filter(i => ALLOWANCE_ITEMS.includes(i.key) && i.actualCost > 0);
                                if (allowanceItems.length === 0) return null;
                                return (
                                  <div style={{ marginTop: 12, padding: 16, background: '#fff', borderRadius: 6, border: '1px solid #e0e0e0' }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#2c5530', marginBottom: 12 }}>Allowance Breakdown</div>
                                    {allowanceItems.map(item => {
                                      const vc = item.variance > 0 ? '#28a745' : item.variance < 0 ? '#dc3545' : '#666';
                                      const label = item.variance > 0 ? 'Under Budget' : item.variance < 0 ? 'Over Budget' : 'On Budget';
                                      const permitEntries = item.key === 'permits' ? (currentItem.permitEntries || []) : [];
                                      return (
                                        <div key={item.key} style={{ padding: 8, marginBottom: 6, background: '#f8f9fa', borderRadius: 4, borderLeft: `3px solid ${vc}` }}>
                                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</span>
                                            <span style={{ fontSize: 11, fontWeight: 600, color: vc, padding: '2px 8px', background: item.variance > 0 ? '#d1e7dd' : item.variance < 0 ? '#f8d7da' : '#e0e0e0', borderRadius: 10 }}>{label}</span>
                                          </div>
                                          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Budget: {fmt(item.contractPrice)} | Actual: {fmt(item.actualCost)} <span style={{ fontWeight: 700, color: vc, marginLeft: 8 }}>({item.variance >= 0 ? '+' : ''}{fmt(item.variance)})</span></div>
                                          {permitEntries.length > 0 && (
                                            <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid #e0e0e0' }}>
                                              {permitEntries.map((pe, idx) => (
                                                <div key={pe.id || idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0 3px 12px', fontSize: 12, color: '#555' }}>
                                                  <span>{pe.name}</span>
                                                  <span style={{ fontWeight: 600 }}>{fmt(pe.cost)}</span>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              })()}

                              {/* Change Order History */}
                              {coHistory.length > 0 && (
                                <div style={{ marginTop: 12, padding: 16, background: '#fff3e0', borderRadius: 6, border: '1px solid #ff9800' }}>
                                  <div style={{ fontSize: 14, fontWeight: 700, color: '#e65100', marginBottom: 12 }}>Change Orders ({coHistory.filter(co => !co.isReversal).length})</div>
                                  {coHistory.map((co, i) => {
                                    const isVoided = co.isReversal || co.status === 'Voided';
                                    return (
                                      <div key={i} style={{ padding: 10, marginBottom: 8, background: '#fff', borderRadius: 4, borderLeft: `3px solid ${isVoided ? '#999' : co.totalChange >= 0 ? '#dc3545' : '#28a745'}`, opacity: isVoided ? 0.6 : 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ fontWeight: 700, fontSize: 13 }}>CO #{co.changeOrderNum}</span>
                                            <span style={{
                                              fontSize: 10, padding: '2px 6px', borderRadius: 10, fontWeight: 600,
                                              background: co.status === 'Signed' ? '#d1e7dd' : co.status === 'Draft' ? '#fff3cd' : co.status === 'Sent' ? '#cfe2ff' : '#e2e3e5',
                                              color: co.status === 'Signed' ? '#0f5132' : co.status === 'Draft' ? '#664d03' : co.status === 'Sent' ? '#084298' : '#41464b'
                                            }}>
                                              {isVoided ? 'VOIDED' : co.status === 'Signed' ? '✓ Signed' : co.status}
                                            </span>
                                          </div>
                                          <span style={{ fontWeight: 700, fontSize: 14, color: co.totalChange >= 0 ? '#dc3545' : '#198754' }}>
                                            {co.totalChange >= 0 ? '+' : ''}{fmtCurrency(co.totalChange)}
                                          </span>
                                        </div>
                                        <div style={{ fontSize: 12, marginTop: 6 }}>
                                          {co.contingencyUsed > 0 ? (
                                            <span style={{ color: '#ff9800' }}>From contingency: -{fmtCurrency(co.contingencyUsed)}{co.customerCost > 0 ? ` | Customer pays: +${fmtCurrency(co.customerCost)}` : ' (fully covered)'}</span>
                                          ) : co.contingencyUsed < 0 ? (
                                            <span style={{ color: '#198754' }}>Savings added to contingency: +{fmtCurrency(Math.abs(co.contingencyUsed))}</span>
                                          ) : co.totalChange > 0 ? (
                                            <span style={{ color: '#dc3545' }}>Customer pays: +{fmtCurrency(co.totalChange)}</span>
                                          ) : null}
                                        </div>
                                        {/* CO Details - what changed */}
                                        {(co.deletions?.length > 0 || co.additions?.length > 0 || Object.keys(co.adjustments || {}).some(k => co.adjustments[k]?.amount)) && (
                                          <div style={{ fontSize: 12, marginTop: 8, padding: 8, background: '#f8f9fa', borderRadius: 4 }}>
                                            {co.additions?.length > 0 && (
                                              <div style={{ marginBottom: 4 }}>
                                                <span style={{ color: '#198754', fontWeight: 600 }}>Added: </span>
                                                {co.additions.map(k => services[k]?.name || k.replace(/_/g, ' ')).join(', ')}
                                              </div>
                                            )}
                                            {co.deletions?.length > 0 && (
                                              <div style={{ marginBottom: 4 }}>
                                                <span style={{ color: '#dc3545', fontWeight: 600 }}>Removed: </span>
                                                {co.deletions.map(k => services[k]?.name || k.replace(/_/g, ' ')).join(', ')}
                                              </div>
                                            )}
                                            {Object.entries(co.adjustments || {}).filter(([, adj]) => adj?.amount).length > 0 && (
                                              <div>
                                                <span style={{ color: '#e65100', fontWeight: 600 }}>Adjusted: </span>
                                                {Object.entries(co.adjustments).filter(([, adj]) => adj?.amount).map(([k, adj]) => {
                                                  const name = k === 'home_base_price' ? 'Home Base Price' : k === 'install_price' ? 'Install Price' : (services[k]?.name || k.replace(/_/g, ' '));
                                                  return `${name} (${adj.amount >= 0 ? '+' : ''}${fmtCurrency(adj.amount)})`;
                                                }).join(', ')}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                                          <div style={{ fontSize: 11, color: '#666' }}>{fmtDate(co.createdAt)} by {co.createdBy}</div>
                                          {!isVoided && (
                                            <div style={{ display: 'flex', gap: 6 }}>
                                              {co.status !== 'Signed' && (
                                                <button
                                                  style={{ ...S.btnSm, background: '#198754', fontSize: 10, padding: '3px 8px' }}
                                                  onClick={async () => {
                                                    const updated = { ...currentItem, changeOrderHistory: currentItem.changeOrderHistory.map((c, idx) => idx === i ? { ...c, status: 'Signed' } : c) };
                                                    if (selContract) { await saveContracts(contracts.map(c => c.id === updated.id ? updated : c)); setSelContract(updated); }
                                                    else { await saveQuotes(quotes.map(q => q.id === updated.id ? updated : q)); setSelQuote(updated); }
                                                  }}
                                                >✓ Sign</button>
                                              )}
                                              {co.status === 'Signed' && (
                                                <button
                                                  style={{ ...S.btnSm, background: '#6c757d', fontSize: 10, padding: '3px 8px' }}
                                                  onClick={async () => {
                                                    const updated = { ...currentItem, changeOrderHistory: currentItem.changeOrderHistory.map((c, idx) => idx === i ? { ...c, status: 'Draft' } : c) };
                                                    if (selContract) { await saveContracts(contracts.map(c => c.id === updated.id ? updated : c)); setSelContract(updated); }
                                                    else { await saveQuotes(quotes.map(q => q.id === updated.id ? updated : q)); setSelQuote(updated); }
                                                  }}
                                                >Undo</button>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}

                              <p style={{ fontSize: 11, color: '#666', marginTop: 12, marginBottom: 0, fontStyle: 'italic' }}>
                                * Allowances (permits, well, sand pad, sewer, etc.) and change orders affect the contingency fund. Other services are tracked separately.
                              </p>

                              {/* Allowance Update History */}
                              {(() => {
                                const hist = (currentItem.scrubbHistory || []).filter(e => e.isAllowance).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                                if (hist.length === 0) return null;
                                return (
                                  <div style={{ marginTop: 20, padding: 16, background: '#f8f9fa', borderRadius: 6, border: '1px solid #e0e0e0' }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#2c5530', marginBottom: 12 }}>Allowance Update History</div>
                                    <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                                      {hist.map(entry => {
                                        const v = entry.variance;
                                        const sc = v > 0 ? '#28a745' : v < 0 ? '#dc3545' : '#666';
                                        return (
                                          <div key={entry.id} style={{ padding: 8, marginBottom: 8, background: '#fff', borderRadius: 4, borderLeft: `3px solid ${sc}` }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                              <div><div style={{ fontSize: 13, fontWeight: 600 }}>{entry.serviceName}</div><div style={{ fontSize: 11, color: '#666' }}>{fmtDate(entry.updatedAt)}</div></div>
                                              <div style={{ fontSize: 11, fontWeight: 700, color: sc, padding: '2px 8px', background: v > 0 ? '#d1e7dd' : v < 0 ? '#f8d7da' : '#e0e0e0', borderRadius: 10 }}>{v > 0 ? 'Under Budget' : v < 0 ? 'Over Budget' : 'On Budget'}</div>
                                            </div>
                                            <div style={{ fontSize: 12, color: '#666' }}>Estimated: {fmt(entry.contractPrice)} → Actual: {fmt(entry.newCost)} <span style={{ fontWeight: 700, color: sc, marginLeft: 8 }}>({v >= 0 ? '+' : ''}{fmt(v)})</span></div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })()}

                              <button style={{ ...S.btn, width: '100%', marginTop: 16, background: '#1565c0' }} onClick={() => folderSavers.saveAllowanceProgressToFolders(currentItem, custForQuote)} title="Generate and save allowance progress update for customer">Generate Customer Update</button>

                              {/* Payment Tracking */}
                              {(() => {
                                const pmts = currentItem.scrubbPayments || [];
                                const totalPmts = pmts.reduce((s, p) => s + parseFloat(p.amount || 0), 0);
                                const contingencyPmts = pmts.filter(p => p.isContingencyPayment).reduce((s, p) => s + parseFloat(p.amount || 0), 0);
                                const regularPmts = pmts.filter(p => !p.isContingencyPayment).reduce((s, p) => s + parseFloat(p.amount || 0), 0);
                                const remainingBalance = overdraftAmount - contingencyPmts;
                                const handleAddPmt = () => {
                                  if (!newPayment.amount || parseFloat(newPayment.amount) <= 0) { NotificationSystem.error('Please enter a valid amount'); return; }
                                  const pmt = { id: genId(), amount: parseFloat(newPayment.amount), date: newPayment.date || new Date().toISOString().split('T')[0], notes: newPayment.notes || '', isContingencyPayment: newPayment.isContingencyPayment || false, createdAt: new Date().toISOString(), createdBy: userName };
                                  saveScrubbUpdate({ ...currentItem, scrubbPayments: [...pmts, pmt], updatedAt: Date.now(), updatedBy: userName });
                                  setNewPayment({ amount: '', date: '', notes: '', isContingencyPayment: false }); setShowPaymentForm(false);
                                  NotificationSystem.success('Payment recorded');
                                };
                                return (
                                  <div style={{ marginTop: 20, padding: 16, background: '#e3f2fd', borderRadius: 6, border: '1px solid #2196f3' }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1565c0', marginBottom: 12 }}>Payment Tracking</div>
                                    <div style={{ marginBottom: 16, padding: 12, background: '#fff', borderRadius: 4, border: '1px solid #e0e0e0' }}>
                                      <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>
                                        Track all project payments (down payment, progress payments, etc.)
                                      </div>
                                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                                        <div><div style={{ fontSize: 11, color: '#666' }}>Total Payments</div><div style={{ fontSize: 16, fontWeight: 700, color: '#1565c0' }}>{fmt(totalPmts)}</div></div>
                                        <div><div style={{ fontSize: 11, color: '#666' }}>Regular Payments</div><div style={{ fontSize: 16, fontWeight: 700, color: '#2196f3' }}>{fmt(regularPmts)}</div></div>
                                        <div><div style={{ fontSize: 11, color: '#666' }}>Contingency Fund</div><div style={{ fontSize: 16, fontWeight: 700, color: '#ff9800' }}>{fmt(contingencyPmts)}</div></div>
                                      </div>
                                    </div>
                                    {fundOverdrafted && (
                                      <div style={{ marginBottom: 16, padding: 12, background: '#fff3cd', borderRadius: 4, border: '1px solid #ffc107' }}>
                                        <div style={{ fontSize: 12, color: '#856404', marginBottom: 8 }}>
                                          Contingency fund overdrafted by <strong>{fmt(overdraftAmount)}</strong> — customer must pay to refund.
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                                          <div><div style={{ fontSize: 11, color: '#666' }}>Overdraft Amount</div><div style={{ fontSize: 14, fontWeight: 600, color: '#dc3545' }}>{fmt(overdraftAmount)}</div></div>
                                          <div><div style={{ fontSize: 11, color: '#666' }}>Customer Paid</div><div style={{ fontSize: 14, fontWeight: 600, color: '#28a745' }}>{fmt(contingencyPmts)}</div></div>
                                          <div><div style={{ fontSize: 11, color: '#666' }}>Still Owed</div><div style={{ fontSize: 14, fontWeight: 600, color: remainingBalance > 0 ? '#dc3545' : '#28a745' }}>{fmt(Math.max(0, remainingBalance))}</div></div>
                                        </div>
                                      </div>
                                    )}
                                    {pmts.length > 0 && <div style={{ marginBottom: 12, maxHeight: 200, overflowY: 'auto' }}>{pmts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(p => (
                                      <div key={p.id} style={{ padding: 8, marginBottom: 8, background: '#fff', borderRadius: 4, borderLeft: `3px solid ${p.isContingencyPayment ? '#ff9800' : '#28a745'}` }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                          <div style={{ fontSize: 13, fontWeight: 600, color: p.isContingencyPayment ? '#ff9800' : '#28a745' }}>{fmt(p.amount)}</div>
                                          <span style={{ fontSize: 11, fontWeight: 600, color: p.isContingencyPayment ? '#ff9800' : '#28a745', padding: '2px 8px', background: p.isContingencyPayment ? '#fff3e0' : '#d1e7dd', borderRadius: 10 }}>{p.isContingencyPayment ? 'Contingency' : 'Regular'}</span>
                                        </div>
                                        {p.notes && <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{p.notes}</div>}
                                        <div style={{ fontSize: 10, color: '#999', marginTop: 2 }}>Recorded {fmtDate(p.createdAt)} by {p.createdBy}</div>
                                      </div>
                                    ))}</div>}
                                    {!showPaymentForm ? (
                                      <button style={{ ...S.btn, width: '100%', background: '#28a745' }} onClick={() => setShowPaymentForm(true)}>+ Add Payment</button>
                                    ) : (
                                      <div style={{ padding: 12, background: '#fff', borderRadius: 4, border: '1px solid #e0e0e0' }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Record New Payment</div>
                                        <div style={{ marginBottom: 12 }}><label style={{ fontSize: 11, display: 'block', marginBottom: 4, color: '#666' }}>Amount *</label><input type="number" step="0.01" placeholder="0.00" value={newPayment.amount} onChange={e => setNewPayment(p => ({ ...p, amount: e.target.value }))} style={{ ...S.input, width: '100%' }} /></div>
                                        <div style={{ marginBottom: 12 }}><label style={{ fontSize: 11, display: 'block', marginBottom: 4, color: '#666' }}>Date</label><input type="date" value={newPayment.date || new Date().toISOString().split('T')[0]} onChange={e => setNewPayment(p => ({ ...p, date: e.target.value }))} style={{ ...S.input, width: '100%' }} /></div>
                                        <div style={{ marginBottom: 12 }}><label style={{ fontSize: 11, display: 'block', marginBottom: 4, color: '#666' }}>Notes</label><textarea placeholder="Payment method, check number..." value={newPayment.notes} onChange={e => setNewPayment(p => ({ ...p, notes: e.target.value }))} style={{ ...S.input, width: '100%', minHeight: 60, resize: 'vertical' }} /></div>
                                        <div style={{ marginBottom: 12, padding: 12, background: '#fff3e0', borderRadius: 4, border: '1px solid #ff9800' }}>
                                          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" checked={newPayment.isContingencyPayment} onChange={e => setNewPayment(p => ({ ...p, isContingencyPayment: e.target.checked }))} style={{ marginRight: 8, width: 16, height: 16 }} /><span style={{ fontSize: 12, fontWeight: 600, color: '#856404' }}>Apply to Contingency Fund</span></label>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}><button style={{ ...S.btn, flex: 1, background: '#28a745' }} onClick={handleAddPmt}>Save Payment</button><button style={{ ...S.btn, flex: 1, background: '#6c757d' }} onClick={() => { setShowPaymentForm(false); setNewPayment({ amount: '', date: '', notes: '', isContingencyPayment: false }); }}>Cancel</button></div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
            {quoteTab === 'scrubb' && currentItem && !['Accepted', 'Under Contract', 'Completed'].includes(currentItem.status) && (
              <div style={{ textAlign: 'center', padding: 40, color: '#666' }}>
                <p style={{ fontSize: 16 }}>Cost tracking is available for accepted quotes and contracts.</p>
                <p style={{ fontSize: 13 }}>Current status: <strong>{currentItem.status}</strong></p>
              </div>
            )}

            {/* Permit Entry Modal */}
            {showPermitModal && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                <div style={{ background: '#fff', padding: 32, borderRadius: 8, maxWidth: 500, width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                  <h3 style={{ marginTop: 0 }}>{editingPermitEntry ? 'Edit Permit' : 'Add Permit'}</h3>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ ...S.label, color: '#333' }}>Permit Name</label>
                    <input type="text" style={S.input} value={permitEntryName} onChange={e => setPermitEntryName(e.target.value)} placeholder="e.g., Building Permit, Electrical Permit" autoFocus />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ ...S.label, color: '#333' }}>Actual Cost</label>
                    <input type="number" style={S.input} value={permitEntryCost} onChange={e => setPermitEntryCost(e.target.value)} placeholder="0.00" />
                  </div>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                    <button style={{ ...S.btn2, background: '#666' }} onClick={() => { setShowPermitModal(false); setEditingPermitEntry(null); setPermitEntryName(''); setPermitEntryCost(''); }}>Cancel</button>
                    <button style={S.btn} onClick={() => {
                      if (!permitEntryName.trim()) { alert('Please enter a permit name'); return; }
                      const cost = parseFloat(permitEntryCost) || 0;
                      const currentEntries = currentItem.permitEntries || [];
                      let updatedEntries;
                      if (editingPermitEntry) {
                        updatedEntries = currentEntries.map(entry => entry.id === editingPermitEntry.id ? { ...entry, name: permitEntryName, cost } : entry);
                      } else {
                        updatedEntries = [...currentEntries, { id: genId(), name: permitEntryName, cost, addedAt: new Date().toISOString(), addedBy: userName }];
                      }
                      const updatedItem = { ...currentItem, permitEntries: updatedEntries, updatedAt: Date.now(), updatedBy: userName };
                      if (selQuote?.id === currentItem.id) { saveQuotes(quotes.map(q => q.id === currentItem.id ? updatedItem : q)); setSelQuote(updatedItem); }
                      else if (selContract?.id === currentItem.id) { saveContracts(contracts.map(c => c.id === currentItem.id ? updatedItem : c)); setSelContract(updatedItem); }
                      setShowPermitModal(false); setEditingPermitEntry(null); setPermitEntryName(''); setPermitEntryCost('');
                    }}>{editingPermitEntry ? 'Update' : 'Add'} Permit</button>
                  </div>
                </div>
              </div>
            )}

            {showAddlMaterialModal && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                <div style={{ background: '#fff', padding: 32, borderRadius: 8, maxWidth: 500, width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                  <h3 style={{ marginTop: 0 }}>{editingMaterialEntry ? 'Edit Material' : 'Add Material'}</h3>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ ...S.label, color: '#333' }}>Material Name</label>
                    <input type="text" style={S.input} value={materialEntryName} onChange={e => setMaterialEntryName(e.target.value)} placeholder="e.g., Lumber, Hardware, Fixtures" autoFocus />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ ...S.label, color: '#333' }}>Cost</label>
                    <input type="number" style={S.input} value={materialEntryCost} onChange={e => setMaterialEntryCost(e.target.value)} placeholder="0.00" />
                  </div>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                    <button style={{ ...S.btn2, background: '#666' }} onClick={() => { setShowAddlMaterialModal(false); setEditingMaterialEntry(null); setMaterialEntryName(''); setMaterialEntryCost(''); }}>Cancel</button>
                    <button style={S.btn} onClick={() => {
                      if (!materialEntryName.trim()) { alert('Please enter a material name'); return; }
                      const cost = parseFloat(materialEntryCost) || 0;
                      const currentEntries = currentItem.addlMaterialEntries || [];
                      let updatedEntries;
                      if (editingMaterialEntry) {
                        updatedEntries = currentEntries.map(entry => entry.id === editingMaterialEntry.id ? { ...entry, name: materialEntryName, cost } : entry);
                      } else {
                        updatedEntries = [...currentEntries, { id: genId(), name: materialEntryName, cost, addedAt: new Date().toISOString(), addedBy: userName }];
                      }
                      const updatedItem = { ...currentItem, addlMaterialEntries: updatedEntries, updatedAt: Date.now(), updatedBy: userName };
                      if (selQuote?.id === currentItem.id) { saveQuotes(quotes.map(q => q.id === currentItem.id ? updatedItem : q)); setSelQuote(updatedItem); }
                      else if (selContract?.id === currentItem.id) { saveContracts(contracts.map(c => c.id === currentItem.id ? updatedItem : c)); setSelContract(updatedItem); }
                      setShowAddlMaterialModal(false); setEditingMaterialEntry(null); setMaterialEntryName(''); setMaterialEntryCost('');
                    }}>{editingMaterialEntry ? 'Update' : 'Add'} Material</button>
                  </div>
                </div>
              </div>
            )}

            {/* Scope of Work tab */}
            {quoteTab === 'scope' && selContract && (() => {
              const scopeHtml = generateScopeOfWorkDocument(currentItem, custForQuote, services);
              return (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ margin: 0 }}>Scope of Work</h3>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ ...S.btnSm, background: '#6f42c1' }} onClick={() => {
                        const w = window.open('', '_blank');
                        if (w) { w.document.write(scopeHtml); w.document.close(); }
                      }}>Open in New Tab</button>
                      <button style={S.btnSm} onClick={() => {
                        const blob = new Blob([scopeHtml], { type: 'text/html' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url; a.download = `Scope_of_Work_${DocumentUtils.getQuoteNum(currentItem)}.html`;
                        a.click(); URL.revokeObjectURL(url);
                      }}>Download</button>
                    </div>
                  </div>
                  <iframe
                    srcDoc={scopeHtml}
                    style={{ width: '100%', height: 'calc(100vh - 200px)', border: '1px solid #e0e0e0', borderRadius: 8 }}
                    title="Scope of Work"
                  />
                </div>
              );
            })()}
          </div>
        )}

        {/* New/Edit Quote View - Full Quote Form */}
        {view === 'newQuote' && selCustomer && <div>

          {/* Change Order Banner */}
          {originalQuoteForComparison && (
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#1a1a1a' }}>
                Change Order #{newQ.changeOrderNum}{newQ.changeOrderVersion}
              </h1>
              <p style={{ margin: '6px 0 0', fontSize: 14, color: '#888', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#ffc107', fontSize: 16 }}>&#9888;</span>
                Original Quote: {originalQuoteForComparison.homeModel} — {fmt(CalcHelpers.calculateQuoteTotals(originalQuoteForComparison, selCustomer, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, projectCommandRates).totalWithContingency)}
              </p>
            </div>
          )}

          {/* Header with title and action buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              {(() => {
                const qType = QUOTE_TYPES.find(qt => qt.id === newQ.quoteType) || QUOTE_TYPES[0];
                const title = originalQuoteForComparison ? `Change Order #${newQ.changeOrderNum || ''}${newQ.changeOrderVersion || ''}` :
                              editingQuoteId ? 'Edit Quote' : `${qType.icon} New ${qType.name} Quote`;
                return <h1 style={{ margin: 0 }}>{title}</h1>;
              })()}
              <p style={{ color: '#666', margin: '4px 0 0' }}>Customer: {selCustomer.firstName} {selCustomer.lastName}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={S.btn2} onClick={cancelEdit}>← Back</button>
              <button style={{ ...S.btn, width: 'auto' }} onClick={saveNew}>
                {originalQuoteForComparison ? 'Save Change Order' : editingQuoteId ? 'Update' : 'Save Quote'}
              </button>
            </div>
          </div>

          {/* Change Order Tracking Interface */}
          {originalQuoteForComparison ? (
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              {/* LEFT COLUMN - Services Table */}
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <div style={{ ...S.box, marginBottom: 24 }}>
                {/* Table Header */}
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#666' }}>Service</th>
                      <th style={{ textAlign: 'right', padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#666' }}>Original</th>
                      <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#666' }}>Adj.</th>
                      <th style={{ textAlign: 'right', padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#666' }}>New Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Home Base Price Row */}
                    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: 14 }}>
                        Installation of Home
                        {changeOrderAdjustments['home_base_price']?.amount ? (
                          <span style={{ marginLeft: 8, fontSize: 11, padding: '2px 10px', background: '#1976d2', color: '#fff', borderRadius: 10, fontWeight: 600 }}>ADJUSTED</span>
                        ) : null}
                      </td>
                      <td style={{ textAlign: 'right', padding: '14px 16px', color: '#666', fontSize: 14 }}>
                        {fmt((parseFloat(originalQuoteForComparison.homeBasePrice) || 0) * HOME_MARKUP)}
                      </td>
                      <td style={{ textAlign: 'center', padding: '14px 16px' }}>
                        {changeOrderAdjustments['home_base_price']?.amount ? (
                          <input
                            type="number"
                            style={{ width: 80, padding: '6px 8px', border: '2px solid #1976d2', borderRadius: 6, fontSize: 13, textAlign: 'center', fontWeight: 600, color: '#1976d2', background: '#e3f2fd' }}
                            value={changeOrderAdjustments['home_base_price']?.amount || ''}
                            onChange={e => {
                              const amount = parseFloat(e.target.value) || 0;
                              setChangeOrderAdjustments(prev => ({
                                ...prev,
                                home_base_price: { ...prev['home_base_price'], amount }
                              }));
                            }}
                          />
                        ) : (
                          <input
                            type="number"
                            placeholder="—"
                            style={{ width: 80, padding: '6px 8px', border: '1px solid #e0e0e0', borderRadius: 6, fontSize: 13, textAlign: 'center', color: '#999', background: '#fafafa' }}
                            value={changeOrderAdjustments['home_base_price']?.amount || ''}
                            onChange={e => {
                              const amount = parseFloat(e.target.value) || 0;
                              setChangeOrderAdjustments(prev => ({
                                ...prev,
                                home_base_price: { ...prev['home_base_price'], amount }
                              }));
                            }}
                          />
                        )}
                      </td>
                      <td style={{ textAlign: 'right', padding: '14px 16px', fontWeight: 700, fontSize: 14, color: '#1a1a1a' }}>
                        {fmt((parseFloat(originalQuoteForComparison.homeBasePrice) || 0) * HOME_MARKUP + (changeOrderAdjustments['home_base_price']?.amount || 0))}
                      </td>
                    </tr>

                {/* Services */}
                {(() => {
                  const origTotals = CalcHelpers.calculateQuoteTotals(originalQuoteForComparison, selCustomer, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, projectCommandRates);

                  const originalServiceKeys = Object.keys(originalQuoteForComparison.selectedServices || {}).filter(key => originalQuoteForComparison.selectedServices[key] && services[key]);
                  if (originalServiceKeys.length === 0) return null;

                  return originalServiceKeys.map(serviceKey => {
                          const service = services[serviceKey];
                          const isDeleted = changeOrderDeletions.includes(serviceKey);
                          const adjustment = changeOrderAdjustments[serviceKey]?.amount || 0;
                          const hasAdjustment = adjustment !== 0;

                          const serviceInTotals = origTotals.svc.find(s => s.key === serviceKey);
                          const originalCost = serviceInTotals?.cost || 0;
                          const newCost = originalCost + adjustment;

                          return (
                            <tr key={serviceKey} style={{
                              borderBottom: '1px solid #f0f0f0',
                              background: isDeleted ? '#fff5f5' : 'transparent',
                              cursor: 'pointer'
                            }} onClick={() => {
                              if (isDeleted) {
                                setChangeOrderDeletions(prev => prev.filter(id => id !== serviceKey));
                              } else {
                                setChangeOrderDeletions(prev => [...prev, serviceKey]);
                              }
                            }}>
                              <td style={{ padding: '14px 16px' }}>
                                <span style={{
                                  fontWeight: 600, fontSize: 14,
                                  textDecoration: isDeleted ? 'line-through' : 'none',
                                  color: isDeleted ? '#999' : '#1a1a1a'
                                }}>{service.name}</span>
                                {isDeleted && (
                                  <span style={{ marginLeft: 8, fontSize: 11, padding: '2px 10px', background: '#dc3545', color: '#fff', borderRadius: 10, fontWeight: 600 }}>DELETED</span>
                                )}
                                {!isDeleted && hasAdjustment && (
                                  <span style={{ marginLeft: 8, fontSize: 11, padding: '2px 10px', background: '#1976d2', color: '#fff', borderRadius: 10, fontWeight: 600 }}>ADJUSTED</span>
                                )}
                              </td>
                              <td style={{
                                textAlign: 'right', padding: '14px 16px', fontSize: 14,
                                color: isDeleted ? '#dc3545' : '#666',
                                textDecoration: isDeleted ? 'line-through' : 'none'
                              }}>
                                {fmt(originalCost)}
                              </td>
                              <td style={{ textAlign: 'center', padding: '14px 16px' }} onClick={e => e.stopPropagation()}>
                                {isDeleted ? (
                                  <span style={{ color: '#999' }}>—</span>
                                ) : (
                                  <input
                                    type="number"
                                    placeholder="—"
                                    style={{
                                      width: 80, padding: '6px 8px', fontSize: 13, textAlign: 'center',
                                      borderRadius: 6, fontWeight: hasAdjustment ? 600 : 400,
                                      border: hasAdjustment ? '2px solid #1976d2' : '1px solid #e0e0e0',
                                      color: hasAdjustment ? '#1976d2' : '#999',
                                      background: hasAdjustment ? '#e3f2fd' : '#fafafa'
                                    }}
                                    value={changeOrderAdjustments[serviceKey]?.amount || ''}
                                    onChange={e => {
                                      const amount = parseFloat(e.target.value) || 0;
                                      setChangeOrderAdjustments(prev => ({
                                        ...prev,
                                        [serviceKey]: { ...prev[serviceKey], amount }
                                      }));
                                    }}
                                  />
                                )}
                              </td>
                              <td style={{
                                textAlign: 'right', padding: '14px 16px', fontWeight: 700, fontSize: 14,
                                color: isDeleted ? '#dc3545' : '#1a1a1a',
                                textDecoration: isDeleted ? 'line-through' : 'none'
                              }}>
                                {isDeleted ? fmt(originalCost) : fmt(newCost)}
                              </td>
                            </tr>
                          );
                        });
                })()}

                {/* Added Services rows in the same table */}
                {(() => {
                  const origTotalsForAdded = CalcHelpers.calculateQuoteTotals({...newQ, selectedServices: {...newQ.selectedServices}}, selCustomer, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, projectCommandRates);
                  return changeOrderAdditions.map(serviceKey => {
                    const service = services[serviceKey];
                    if (!service) return null;
                    const serviceInTotals = origTotalsForAdded.svc.find(s => s.key === serviceKey);
                    const cost = serviceInTotals?.cost || 0;
                    return (
                      <tr key={serviceKey} style={{ borderBottom: '1px solid #f0f0f0', background: '#f0fdf4' }}>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a' }}>{service.name}</span>
                          <span style={{ marginLeft: 8, fontSize: 11, padding: '2px 10px', background: '#28a745', color: '#fff', borderRadius: 10, fontWeight: 600 }}>NEW</span>
                          <button
                            style={{ marginLeft: 8, background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: 12, fontWeight: 600, textDecoration: 'underline' }}
                            onClick={() => {
                              setChangeOrderAdditions(prev => prev.filter(id => id !== serviceKey));
                              setNewQ(prev => ({ ...prev, selectedServices: { ...prev.selectedServices, [serviceKey]: false } }));
                            }}
                          >remove</button>
                        </td>
                        <td style={{ textAlign: 'right', padding: '14px 16px', color: '#999', fontSize: 14 }}>—</td>
                        <td style={{ textAlign: 'center', padding: '14px 16px', color: '#28a745', fontWeight: 600, fontSize: 14 }}>+{fmt(cost)}</td>
                        <td style={{ textAlign: 'right', padding: '14px 16px', fontWeight: 700, fontSize: 14, color: '#28a745' }}>{fmt(cost)}</td>
                      </tr>
                    );
                  });
                })()}
                  </tbody>
                </table>

                {/* Add Service Dropdown below table */}
                {(() => {
                  const originalServiceKeys = Object.keys(originalQuoteForComparison.selectedServices || {}).filter(key => originalQuoteForComparison.selectedServices[key]);
                  const availableServiceKeys = Object.keys(services).filter(key => !originalServiceKeys.includes(key) && !changeOrderAdditions.includes(key));
                  if (availableServiceKeys.length === 0) return null;
                  return (
                    <div style={{ padding: '16px', borderTop: '2px solid #e0e0e0' }}>
                      <select
                        style={{ ...S.select, fontSize: 13, maxWidth: 300 }}
                        onChange={(e) => {
                          if (e.target.value) {
                            const serviceKey = e.target.value;
                            setChangeOrderAdditions(prev => [...prev, serviceKey]);
                            setNewQ(prev => ({ ...prev, selectedServices: { ...prev.selectedServices, [serviceKey]: true } }));
                            e.target.value = '';
                          }
                        }}
                      >
                        <option value="">+ Add a service...</option>
                        {availableServiceKeys.map(key => (
                          <option key={key} value={key}>{services[key].name}</option>
                        ))}
                      </select>
                    </div>
                  );
                })()}
              </div>
              </div>{/* END LEFT COLUMN */}

              {/* RIGHT COLUMN - Summary Sidebar */}
              <div style={{ width: 340, flexShrink: 0, position: 'sticky', top: 80, alignSelf: 'flex-start' }}>
                {(() => {
                  const origTotals = CalcHelpers.calculateQuoteTotals(originalQuoteForComparison, selCustomer, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, projectCommandRates);
                  const addedTotals = CalcHelpers.calculateQuoteTotals({...newQ, selectedServices: {...newQ.selectedServices}}, selCustomer, materials, services, sewerPricing, patioPricing, driveRates, foundationPricing, projectCommandRates);

                  const adjustmentTotal = Object.values(changeOrderAdjustments).reduce((sum, adj) => sum + (adj.amount || 0), 0);
                  const deletedTotal = changeOrderDeletions.reduce((sum, serviceKey) => {
                    const svc = origTotals.svc.find(s => s.key === serviceKey);
                    return sum + (svc?.cost || 0);
                  }, 0);
                  const addedTotal = changeOrderAdditions.reduce((sum, key) => {
                    const svc = addedTotals.svc.find(s => s.key === key);
                    return sum + (svc?.cost || 0);
                  }, 0);
                  const netChange = adjustmentTotal - deletedTotal + addedTotal;

                  // Contingency preview — contracts: COs only affect contingency, never the contracted price
                  const isContractCO = contracts.find(c => c.id === editingQuoteId);
                  const currentHistory = newQ.changeOrderHistory || [];
                  let previewContingency = origTotals.contingency || 0;
                  currentHistory.forEach(co => { if (co.contingencyUsed) previewContingency -= co.contingencyUsed; });
                  let previousTotal = origTotals.totalWithContingency;
                  if (currentHistory.length > 0) previousTotal = currentHistory[currentHistory.length - 1].newTotal;
                  // For contracts: entire netChange draws from contingency, customer total unchanged
                  // For quotes: netChange directly affects the total
                  const previewRemainingContingency = previewContingency - netChange;
                  const previewNewTotal = isContractCO ? previousTotal : previousTotal + netChange;
                  const isOverdrafted = isContractCO && previewRemainingContingency < 0;

                  return (
                    <div style={{ background: '#2c5530', color: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                      <h3 style={{ margin: '0 0 20px', fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
                        CHANGE ORDER SUMMARY
                      </h3>

                      {/* Original Total */}
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Original Total</div>
                        <div style={{ fontSize: 24, fontWeight: 800 }}>{fmt(origTotals.totalWithContingency)}</div>
                      </div>

                      {/* Deleted Items */}
                      {changeOrderDeletions.length > 0 && (
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#ff6b6b', letterSpacing: 0.5, marginBottom: 8, textTransform: 'uppercase' }}>Deleted Items:</div>
                          {changeOrderDeletions.map(serviceKey => {
                            const service = services[serviceKey];
                            const svc = origTotals.svc.find(s => s.key === serviceKey);
                            return (
                              <div key={serviceKey} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                                <div style={{ opacity: 0.9 }}>{service?.name || serviceKey}</div>
                                <div style={{ color: '#ff6b6b', fontWeight: 700 }}>-{fmt(svc?.cost || 0)}</div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Adjusted Items */}
                      {Object.keys(changeOrderAdjustments).filter(key => changeOrderAdjustments[key]?.amount !== 0).length > 0 && (
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#ffc107', letterSpacing: 0.5, marginBottom: 8, textTransform: 'uppercase' }}>Adjusted Items:</div>
                          {Object.keys(changeOrderAdjustments).filter(key => changeOrderAdjustments[key]?.amount !== 0).map(key => {
                            const adj = changeOrderAdjustments[key];
                            let itemName = key === 'home_base_price' ? 'Home Base Price' : (services[key]?.name || key);
                            let originalCost = key === 'home_base_price'
                              ? (parseFloat(originalQuoteForComparison.homeBasePrice) || 0) * HOME_MARKUP
                              : (origTotals.svc.find(s => s.key === key)?.cost || 0);
                            return (
                              <div key={key} style={{ marginBottom: 6 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                  <div style={{ opacity: 0.9 }}>{itemName}</div>
                                  <div style={{ color: adj.amount > 0 ? '#90ee90' : '#ff6b6b', fontWeight: 700 }}>
                                    {adj.amount > 0 ? '+' : ''}{fmt(adj.amount)}
                                  </div>
                                </div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                                  {fmt(originalCost)} &rarr; {fmt(originalCost + adj.amount)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Added Items */}
                      {changeOrderAdditions.length > 0 && (
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#90ee90', letterSpacing: 0.5, marginBottom: 8, textTransform: 'uppercase' }}>Added Items:</div>
                          {changeOrderAdditions.map(serviceKey => {
                            const service = services[serviceKey];
                            const svc = addedTotals.svc.find(s => s.key === serviceKey);
                            return (
                              <div key={serviceKey} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                                <div style={{ opacity: 0.9 }}>{service?.name || serviceKey}</div>
                                <div style={{ color: '#90ee90', fontWeight: 700 }}>+{fmt(svc?.cost || 0)}</div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Divider */}
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', margin: '16px 0' }} />

                      {/* Contingency Fund (compact) — only shown for contracts */}
                      {isContractCO && (
                      <div style={{ padding: 12, background: isOverdrafted ? 'rgba(255,80,80,0.15)' : 'rgba(255,255,255,0.08)', borderRadius: 8, marginBottom: 16, fontSize: 12, border: isOverdrafted ? '1px solid rgba(255,80,80,0.4)' : 'none' }}>
                        <div style={{ fontWeight: 600, marginBottom: 6, color: '#ffc107', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>Contingency Fund</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                          <span style={{ opacity: 0.8 }}>Available:</span>
                          <span style={{ fontWeight: 600 }}>{fmt(previewContingency)}</span>
                        </div>
                        {netChange > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, color: '#ffc107' }}>
                            <span>Drawn:</span>
                            <span style={{ fontWeight: 600 }}>-{fmt(netChange)}</span>
                          </div>
                        )}
                        {netChange < 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, color: '#90ee90' }}>
                            <span>Savings added:</span>
                            <span style={{ fontWeight: 600 }}>+{fmt(Math.abs(netChange))}</span>
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                          <span style={{ opacity: 0.8 }}>Remaining:</span>
                          <span style={{ fontWeight: 700, color: previewRemainingContingency > 0 ? '#90ee90' : '#ff6b6b' }}>{fmt(previewRemainingContingency)}</span>
                        </div>
                        {isOverdrafted && (
                          <div style={{ marginTop: 8, padding: '6px 8px', background: 'rgba(255,80,80,0.2)', borderRadius: 4, color: '#ff6b6b', fontSize: 11, fontWeight: 600 }}>
                            WARNING: Contingency overdrafted by {fmt(Math.abs(previewRemainingContingency))}
                          </div>
                        )}
                      </div>
                      )}

                      {/* New Total */}
                      <div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                          {isContractCO ? 'Contracted Price' : 'New Total'}
                        </div>
                        <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.2 }}>{fmt(previewNewTotal)}</div>
                        {isContractCO && netChange !== 0 && (
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                            Contracted price unchanged — {netChange > 0 ? 'cost' : 'savings'} applied to contingency
                          </div>
                        )}
                        {!isContractCO && netChange !== 0 && (
                          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4, color: netChange < 0 ? '#90ee90' : '#ff6b6b' }}>
                            {netChange < 0 ? fmt(Math.abs(netChange)) + ' savings' : '+' + fmt(netChange) + ' increase'}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : (
            // Normal quote form (not a change order)
            <div>

          <div style={{ ...S.box, background: '#f0f7f1', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: '0 0 8px', color: '#2c5530' }}>{selCustomer.firstName} {selCustomer.lastName}</h3>
                <p style={{ margin: 0, fontSize: 13 }}>{selCustomer.siteAddress}, {selCustomer.siteCity}, {selCustomer.siteState}</p>
                <p style={{ margin: '4px 0 0', fontSize: 13 }}>{selCustomer.phone} {selCustomer.email}</p>
              </div>
              <div style={{ background: '#f8f9fa', padding: 12, borderRadius: 8, textAlign: 'center' }}>
                <label style={{ ...S.label, marginBottom: 4 }}>Drive Distance</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input style={{ ...S.input, width: 70, marginBottom: 0, textAlign: 'center', fontWeight: 600 }} type="number" value={newQ.driveTime} onChange={e => updateField('driveTime', e.target.value)} />
                  <span>mi</span>
                </div>
                {mapsUrl && <a href={mapsUrl} target="_blank" style={{ ...S.btnSm, background: '#4285f4', marginTop: 8, fontSize: 11 }}>Maps</a>}
              </div>
            </div>
          </div>

          <div style={S.box}><h2 style={{ marginTop: 0, borderBottom: '2px solid #2c5530', paddingBottom: 8 }}>Home Selection</h2>
            <p style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>Selecting a home will auto-fill dimensions below</p>
            <div style={S.row}>
              <div style={{ gridColumn: 'span 2' }}><label style={S.label}>Model</label><select style={S.select} value={newQ.homeModel} onChange={e => updateField('homeModel', e.target.value)}>{homeModels.map(m => <option key={m.name} value={m.name}>{m.name}{m.width > 0 ? ` (${m.width}x${m.length})` : ''} {m.price > 0 && `- ${fmt(m.price * HOME_MARKUP)}`}</option>)}</select></div>
              <div><label style={S.label}>Price</label><input style={{ ...S.input, background: '#e8f5e9', fontWeight: 600, fontSize: 18 }} value={fmt((parseFloat(newQ.homeBasePrice) || 0) * HOME_MARKUP)} readOnly />{isAdmin && <small style={{ color: '#666' }}>Base x 1.2</small>}</div>
            </div>

            {/* Floor Plan Section */}
            {newQ.homeModel && newQ.homeModel !== 'NONE' && (() => {
              const selectedHome = homeModels.find(m => m.name === newQ.homeModel);
              const floorPlanUrl = selectedHome?.floorPlanUrl || '';
              return (
                <div style={{ marginTop: 16, padding: 16, background: '#f8f9fa', borderRadius: 8 }}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isFloorPlanExpanded ? 12 : 0, cursor: 'pointer' }}
                    onClick={() => setIsFloorPlanExpanded(!isFloorPlanExpanded)}
                  >
                    <label style={{ ...S.label, margin: 0, fontWeight: 600, cursor: 'pointer' }}>
                      {isFloorPlanExpanded ? '▼' : '▶'} Floor Plan
                    </label>
                    <button
                      type="button"
                      style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                      onClick={(e) => { e.stopPropagation(); setIsFloorPlanExpanded(!isFloorPlanExpanded); }}
                    >
                      {isFloorPlanExpanded ? 'Minimize' : 'Maximize'}
                    </button>
                  </div>
                  {isFloorPlanExpanded && (
                    <>
                      {isAdmin && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                          <input
                            type="text"
                            placeholder="Paste floor plan image URL..."
                            style={{ ...S.input, width: 300, marginBottom: 0, fontSize: 12 }}
                            value={floorPlanUrl}
                            onChange={e => setHomeModels(prev => prev.map(m => m.name === newQ.homeModel ? { ...m, floorPlanUrl: e.target.value } : m))}
                          />
                          {floorPlanUrl && <a href={floorPlanUrl} target="_blank" style={{ fontSize: 12 }}>View</a>}
                        </div>
                      )}
                      {floorPlanUrl ? (
                        <div style={{ textAlign: 'center', padding: 20, background: '#fff', borderRadius: 8 }}>
                          <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#2c5530' }}>{newQ.homeModel}</p>
                          <a
                            href={floorPlanUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-block',
                              padding: '12px 24px',
                              background: '#2c5530',
                              color: '#fff',
                              borderRadius: 6,
                              textDecoration: 'none',
                              fontWeight: 600
                            }}
                          >
                            View Floor Plan, Photos & 3D Tour
                          </a>
                          <p style={{ margin: '12px 0 0', fontSize: 12, color: '#666' }}>Opens Clayton Homes website with full details</p>
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: 20, color: '#666' }}>
                          <p style={{ margin: 0 }}>No floor plan link available for this model.</p>
                          {isAdmin && <p style={{ margin: '8px 0 0', fontSize: 12 }}>Paste a Clayton Homes URL above to add one.</p>}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })()}

            {/* Home Selection Notes */}
            <ExpandableNoteSection
              serviceKey="home_selection"
              customerNote={newQ.serviceNotes?.home_selection}
              crewNote={newQ.serviceCrewNotes?.home_selection}
              isExpanded={expandedServiceNotes.home_selection}
              onToggleExpand={() => setExpandedServiceNotes(prev => ({ ...prev, home_selection: !prev.home_selection }))}
              onUpdateCustomerNote={(key, value) => setNewQ(p => ({ ...p, serviceNotes: { ...p.serviceNotes, [key]: value } }))}
              onUpdateCrewNote={(key, value) => setNewQ(p => ({ ...p, serviceCrewNotes: { ...p.serviceCrewNotes, [key]: value } }))}
              publishedCustomerNotes={newQ.publishedServiceNotes?.home_selection || []}
              publishedCrewNotes={newQ.publishedServiceCrewNotes?.home_selection || []}
              onPublishCustomerNote={handlePublishCustomerNote}
              onPublishCrewNote={handlePublishCrewNote}
              onEditCustomerNote={handleEditCustomerNote}
              onEditCrewNote={handleEditCrewNote}
              onDeleteCustomerNote={handleDeleteCustomerNote}
              onDeleteCrewNote={handleDeleteCrewNote}
              userName={userName}
            />
          </div>

          <div style={S.box}><h2 style={{ marginTop: 0, borderBottom: '2px solid #2c5530', paddingBottom: 8 }}>House Specs</h2>
            {!isAdmin && newQ.houseWidth && newQ.houseLength ? (
              // Sales view - read only display
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
                  <div style={{ background: '#f8f9fa', padding: 12, borderRadius: 6 }}><label style={{ ...S.label, color: '#666' }}>Width</label><div style={{ fontSize: 18, fontWeight: 600 }}>{newQ.houseWidth}'</div></div>
                  <div style={{ background: '#f8f9fa', padding: 12, borderRadius: 6 }}><label style={{ ...S.label, color: '#666' }}>Length</label><div style={{ fontSize: 18, fontWeight: 600 }}>{newQ.houseLength}'</div></div>
                  <div style={{ background: '#f8f9fa', padding: 12, borderRadius: 6 }}><label style={{ ...S.label, color: '#666' }}>Type</label><div style={{ fontSize: 18, fontWeight: 600 }}>{newQ.singleDouble}</div></div>
                </div>
                <div style={S.row}><div style={{ background: '#f8f9fa', padding: 12, borderRadius: 6 }}><label style={{ ...S.label, color: '#666' }}>I-Beam</label><div style={{ fontSize: 18, fontWeight: 600 }}>{newQ.iBeamHeight || calcIBeam(parseFloat(newQ.houseLength) || 56)}"</div></div><div style={{ background: '#f8f9fa', padding: 12, borderRadius: 6 }}><label style={{ ...S.label, color: '#666' }}>Pre Built Stairs</label><div style={{ fontSize: 18, fontWeight: 600 }}>{newQ.walkDoors || '2'}</div></div></div>

                {/* Home Options */}
                <div style={{ marginTop: 20, padding: 16, background: '#f8f9fa', borderRadius: 8 }}>
                  <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: '#2c5530' }}>Additional Home Options</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                    {(() => {
                      const length = parseFloat(newQ.houseLength) || 0;
                      let lpSidingPrice = 0;
                      if (length <= 52) lpSidingPrice = 6550 * 1.05;
                      else if (length >= 53 && length <= 64) lpSidingPrice = 6950 * 1.05;
                      else if (length >= 65) lpSidingPrice = 7850 * 1.05;

                      return [
                        { key: 'lp_siding', name: 'LP Siding', price: lpSidingPrice, hasQty: false },
                        { key: 'tray_ceiling', name: 'Tray Ceiling', price: 900, hasQty: true },
                        { key: 'full_backsplash', name: 'Full Backsplash', price: 800, hasQty: false },
                        { key: 'sets_of_drawers', name: 'Sets of Drawers', price: 900, hasQty: true },
                        { key: 'meter_loop', name: 'Meter Loop', price: 300, hasQty: false },
                        { key: 'drop_down_beam', name: 'Drop Down Beam', price: 500, hasQty: false },
                        { key: 'lp_trim', name: 'LP Trim', price: 2000, hasQty: false },
                        { key: 'amp_service_200', name: '200 Amp Service', price: 400, hasQty: false }
                      ];
                    })().map(opt => {
                      const qty = newQ.serviceQuantities?.[opt.key] || 1;
                      const isSelected = newQ.selectedServices?.[opt.key] || false;
                      const totalPrice = opt.hasQty ? opt.price * qty : opt.price;

                      return (
                        <div key={opt.key} style={{ padding: 12, background: isSelected ? '#e8f5e9' : '#fff', borderRadius: 4, border: `1px solid ${isSelected ? '#2c5530' : '#dee2e6'}` }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSvc(opt.key)}
                              style={{ width: 16, height: 16, cursor: 'pointer' }}
                            />
                            <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{opt.name}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#2c5530' }}>
                              {opt.price > 0 ? (opt.hasQty ? `${fmt(opt.price)} each` : fmt(totalPrice)) : 'Enter length'}
                            </span>
                          </label>
                          {isSelected && opt.hasQty && (
                            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                              <label style={{ fontSize: 12, fontWeight: 600, color: '#666' }}>Quantity:</label>
                              <input
                                type="number"
                                min="1"
                                value={qty}
                                onChange={e => setNewQ(p => ({ ...p, serviceQuantities: { ...p.serviceQuantities, [opt.key]: parseInt(e.target.value) || 1 } }))}
                                style={{ width: 60, padding: '4px 8px', fontSize: 13, border: '1px solid #dee2e6', borderRadius: 4 }}
                                onClick={e => e.stopPropagation()}
                              />
                              <span style={{ fontSize: 13, fontWeight: 600, color: '#2c5530' }}>= {fmt(totalPrice)}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginTop: 16 }}><label style={{ ...S.label, color: '#dc3545', fontSize: 15, fontWeight: 600 }}>Foundation Type *</label><select style={{ ...S.select, padding: '12px', fontSize: 15, fontWeight: 500 }} value={newQ.foundationType || 'slab'} onChange={e => updateField('foundationType', e.target.value)}><option value="slab">Engineered Slab</option><option value="basement">Basement</option><option value="crawlspace">Crawl Space</option></select></div>

                {(newQ.foundationType === 'basement' || newQ.foundationType === 'crawlspace') && (
                  <div style={{ marginTop: 12, padding: 12, background: '#fff3cd', borderRadius: 6, border: '1px solid #ffc107' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#856404' }}>ALLOWANCE</span>
                      <span style={{ fontSize: 12, color: '#856404' }}>
                        {newQ.foundationType === 'basement' ? 'Basement (includes waterproofing & insulation)' : 'Crawl Space'}
                      </span>
                    </div>
                    <label style={{ ...S.label, fontSize: 12 }}>Override Price (optional)</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      style={{ ...S.inputSm, ...(newQ.servicePriceOverrides?.foundation ? S.override : {}), width: '100%' }}
                      placeholder={fmt(newQ.foundationType === 'basement' ? (foundationPricing?.basement || 30000) : (foundationPricing?.crawlspace || 22000))}
                      value={newQ.servicePriceOverrides?.foundation || ''}
                      onChange={e => {
                        const value = e.target.value;
                        if (value === '' || /^\d*\.?\d*$/.test(value)) {
                          updateServicePrice('foundation', value);
                        }
                      }}
                      onFocus={e => e.target.select()}
                    />
                  </div>
                )}

                <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>House dimensions are set by home model selection. Contact admin to change.</p>
              </div>
            ) : !isAdmin && !newQ.houseWidth ? (
              // Sales view - no home selected yet
              <div style={{ background: '#fff3cd', padding: 16, borderRadius: 6, textAlign: 'center' }}>
                <p style={{ margin: 0, color: '#856404' }}>Please select a home model above to set house dimensions</p>
              </div>
            ) : (
              // Admin view - full editing
              <>
                <div style={S.row}><div><label style={S.label}>Width</label><input style={S.input} type="number" value={newQ.houseWidth} onChange={e => updateField('houseWidth', e.target.value)} /></div><div><label style={S.label}>Length</label><input style={S.input} type="number" value={newQ.houseLength} onChange={e => updateField('houseLength', e.target.value)} /></div><div><label style={S.label}>Type</label><select style={S.select} value={newQ.singleDouble} onChange={e => updateField('singleDouble', e.target.value)}><option value="Single">Single</option><option value="Double">Double</option></select></div></div>
                <div style={S.row}><div><label style={S.label}>I-Beam</label><input style={{ ...S.input, background: '#f8f9fa' }} value={`${newQ.iBeamHeight || calcIBeam(parseFloat(newQ.houseLength) || 56)}"`} readOnly /></div><div><label style={S.label}># of Pre Built Stairs</label><input style={S.input} type="number" min="0" value={newQ.walkDoors || ''} onChange={e => updateField('walkDoors', e.target.value)} placeholder="2" /></div></div>

                {/* Home Options */}
                <div style={{ marginTop: 20, padding: 16, background: '#f8f9fa', borderRadius: 8 }}>
                  <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: '#2c5530' }}>Additional Home Options</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                    {(() => {
                      const length = parseFloat(newQ.houseLength) || 0;
                      let lpSidingPrice = 0;
                      if (length <= 52) lpSidingPrice = 6550 * 1.05;
                      else if (length >= 53 && length <= 64) lpSidingPrice = 6950 * 1.05;
                      else if (length >= 65) lpSidingPrice = 7850 * 1.05;

                      return [
                        { key: 'lp_siding', name: 'LP Siding', price: lpSidingPrice, hasQty: false },
                        { key: 'tray_ceiling', name: 'Tray Ceiling', price: 900, hasQty: true },
                        { key: 'full_backsplash', name: 'Full Backsplash', price: 800, hasQty: false },
                        { key: 'sets_of_drawers', name: 'Sets of Drawers', price: 900, hasQty: true },
                        { key: 'meter_loop', name: 'Meter Loop', price: 300, hasQty: false },
                        { key: 'drop_down_beam', name: 'Drop Down Beam', price: 500, hasQty: false },
                        { key: 'lp_trim', name: 'LP Trim', price: 2000, hasQty: false },
                        { key: 'amp_service_200', name: '200 Amp Service', price: 400, hasQty: false }
                      ];
                    })().map(opt => {
                      const qty = newQ.serviceQuantities?.[opt.key] || 1;
                      const isSelected = newQ.selectedServices?.[opt.key] || false;
                      const totalPrice = opt.hasQty ? opt.price * qty : opt.price;

                      return (
                        <div key={opt.key} style={{ padding: 12, background: isSelected ? '#e8f5e9' : '#fff', borderRadius: 4, border: `1px solid ${isSelected ? '#2c5530' : '#dee2e6'}` }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSvc(opt.key)}
                              style={{ width: 16, height: 16, cursor: 'pointer' }}
                            />
                            <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{opt.name}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#2c5530' }}>
                              {opt.price > 0 ? (opt.hasQty ? `${fmt(opt.price)} each` : fmt(totalPrice)) : 'Enter length'}
                            </span>
                          </label>
                          {isSelected && opt.hasQty && (
                            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                              <label style={{ fontSize: 12, fontWeight: 600, color: '#666' }}>Quantity:</label>
                              <input
                                type="number"
                                min="1"
                                value={qty}
                                onChange={e => setNewQ(p => ({ ...p, serviceQuantities: { ...p.serviceQuantities, [opt.key]: parseInt(e.target.value) || 1 } }))}
                                style={{ width: 60, padding: '4px 8px', fontSize: 13, border: '1px solid #dee2e6', borderRadius: 4 }}
                                onClick={e => e.stopPropagation()}
                              />
                              <span style={{ fontSize: 13, fontWeight: 600, color: '#2c5530' }}>= {fmt(totalPrice)}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginTop: 16 }}><label style={{ ...S.label, color: '#dc3545', fontSize: 15, fontWeight: 600 }}>Foundation Type *</label><select style={{ ...S.select, padding: '12px', fontSize: 15, fontWeight: 500 }} value={newQ.foundationType || 'slab'} onChange={e => updateField('foundationType', e.target.value)}><option value="slab">Engineered Slab</option><option value="basement">Basement</option><option value="crawlspace">Crawl Space</option></select></div>

                {(newQ.foundationType === 'basement' || newQ.foundationType === 'crawlspace') && (
                  <div style={{ marginTop: 12, padding: 12, background: '#fff3cd', borderRadius: 6, border: '1px solid #ffc107' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#856404' }}>ALLOWANCE</span>
                      <span style={{ fontSize: 12, color: '#856404' }}>
                        {newQ.foundationType === 'basement' ? 'Basement (includes waterproofing & insulation)' : 'Crawl Space'}
                      </span>
                    </div>
                    <label style={{ ...S.label, fontSize: 12 }}>Override Price (optional)</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      style={{ ...S.inputSm, ...(newQ.servicePriceOverrides?.foundation ? S.override : {}), width: '100%' }}
                      placeholder={fmt(newQ.foundationType === 'basement' ? (foundationPricing?.basement || 30000) : (foundationPricing?.crawlspace || 22000))}
                      value={newQ.servicePriceOverrides?.foundation || ''}
                      onChange={e => {
                        const value = e.target.value;
                        if (value === '' || /^\d*\.?\d*$/.test(value)) {
                          updateServicePrice('foundation', value);
                        }
                      }}
                      onFocus={e => e.target.select()}
                    />
                  </div>
                )}
              </>
            )}

            {/* Foundation Type Notes */}
            <ExpandableNoteSection
              serviceKey="foundation"
              customerNote={newQ.serviceNotes?.foundation}
              crewNote={newQ.serviceCrewNotes?.foundation}
              isExpanded={expandedServiceNotes.foundation}
              onToggleExpand={() => setExpandedServiceNotes(prev => ({ ...prev, foundation: !prev.foundation }))}
              onUpdateCustomerNote={(key, value) => setNewQ(p => ({ ...p, serviceNotes: { ...p.serviceNotes, [key]: value } }))}
              onUpdateCrewNote={(key, value) => setNewQ(p => ({ ...p, serviceCrewNotes: { ...p.serviceCrewNotes, [key]: value } }))}
              publishedCustomerNotes={newQ.publishedServiceNotes?.foundation || []}
              publishedCrewNotes={newQ.publishedServiceCrewNotes?.foundation || []}
              onPublishCustomerNote={handlePublishCustomerNote}
              onPublishCrewNote={handlePublishCrewNote}
              onEditCustomerNote={handleEditCustomerNote}
              onEditCrewNote={handleEditCrewNote}
              onDeleteCustomerNote={handleDeleteCustomerNote}
              onDeleteCrewNote={handleDeleteCrewNote}
              userName={userName}
            />
          </div>

          {/* Pier Diagram Section - Standalone for better visibility */}
          {newQ.houseWidth && newQ.houseLength && (
            <div style={S.box}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isPierDiagramExpanded ? 16 : 0, cursor: 'pointer', borderBottom: '2px solid #2c5530', paddingBottom: 8 }}
                onClick={() => setIsPierDiagramExpanded(!isPierDiagramExpanded)}
              >
                <h2 style={{ margin: 0, cursor: 'pointer' }}>
                  {isPierDiagramExpanded ? '▼' : '▶'} Pier Layout & Plan View
                </h2>
                <button
                  type="button"
                  style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                  onClick={(e) => { e.stopPropagation(); setIsPierDiagramExpanded(!isPierDiagramExpanded); }}
                >
                  {isPierDiagramExpanded ? 'Minimize' : 'Maximize'}
                </button>
              </div>
              {isPierDiagramExpanded && (
                <div style={{ marginTop: 16 }}>
                  <PierDiagram quote={newQ} />
                </div>
              )}
            </div>
          )}

          <div style={S.box}>
            <h2 style={{ marginTop: 0, borderBottom: '2px solid #2c5530', paddingBottom: 8 }}>Home Installation Services</h2>
            <p style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>
              Select installation services and edit prices as needed. Prices can be customized per quote.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e0e0e0', borderRadius: 6, overflow: 'hidden' }}>
              {SUMMARY_SERVICES.map((k, idx) => {
                const svc = services[k];
                if (!svc) return null;
                const sel = newQ.selectedServices?.[k];
                const ovr = newQ.servicePriceOverrides?.[k];
                const qty = newQ.serviceQuantities?.[k] || 1;
                const hasNotes = newQ.serviceNotes?.[k] || newQ.serviceCrewNotes?.[k] || (newQ.publishedServiceNotes?.[k]?.length > 0) || (newQ.publishedServiceCrewNotes?.[k]?.length > 0);
                return <React.Fragment key={k}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: sel ? (ovr ? '#fffbeb' : '#e8f5e9') : '#fff', borderBottom: idx < SUMMARY_SERVICES.length - 1 ? '1px solid #eee' : 'none' }}>
                    <input type="checkbox" checked={sel || false} onChange={() => toggleSvc(k)} />
                    {svc.hasQuantity && sel && <input type="number" min="1" style={{ width: '50px', padding: '4px', border: '1px solid #ddd', borderRadius: 4, fontSize: 13, textAlign: 'center' }} value={qty} onChange={e => setNewQ(p => ({ ...p, serviceQuantities: { ...p.serviceQuantities, [k]: parseInt(e.target.value) || 1 } }))} />}
                    <span style={{ flex: 1, fontSize: 14, fontWeight: sel ? 600 : 400, color: sel ? '#2c5530' : '#333' }}>
                      {svc.name}
                      {LICENSED_SERVICES.includes(k) && <span style={{ fontSize: 9, background: '#e3f2fd', color: '#1565c0', padding: '1px 5px', borderRadius: 3, marginLeft: 6, fontWeight: 600, cursor: 'help' }} title="Installer's license required per MN State Statute">MN LICENSE REQ.</span>}
                    </span>
                    {sel ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 11, color: '#666' }}>$</span>
                        <input
                          type="number"
                          style={{ ...S.inputSm, ...(ovr ? S.override : {}), width: '90px', padding: '4px 6px' }}
                          placeholder={getDefaultPrice(k) * qty}
                          value={ovr || ''}
                          onChange={e => updateServicePrice(k, e.target.value)}
                          onFocus={e => e.target.select()}
                        />
                        {ovr && <button type="button" style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', fontSize: 11, padding: 0 }} onClick={() => updateServicePrice(k, '')} title="Reset to default price">↺</button>}
                      </div>
                    ) : <span style={{ color: '#999', fontSize: 13 }}>{svc.calc ? 'Calc' : fmt(getDefaultPrice(k))}</span>}
                    {sel && (
                      <button
                        type="button"
                        onClick={() => setExpandedServiceNotes(prev => ({ ...prev, [k]: !prev[k] }))}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, padding: '2px 4px', color: hasNotes ? '#1565c0' : '#bbb', position: 'relative' }}
                        title={expandedServiceNotes[k] ? 'Hide notes' : 'Add/view notes'}
                      >
                        {expandedServiceNotes[k] ? '▼' : '📝'}
                        {hasNotes && !expandedServiceNotes[k] && <span style={{ position: 'absolute', top: 0, right: 0, width: 6, height: 6, background: '#1565c0', borderRadius: '50%' }} />}
                      </button>
                    )}
                  </div>
                  {sel && expandedServiceNotes[k] && (
                    <div style={{ padding: '0 12px 12px', background: '#f9fafb', borderBottom: '1px solid #e0e0e0' }}>
                      <ExpandableNoteSection
                        serviceKey={k}
                        customerNote={newQ.serviceNotes?.[k]}
                        crewNote={newQ.serviceCrewNotes?.[k]}
                        isExpanded={expandedServiceNotes[k]}
                        onToggleExpand={() => setExpandedServiceNotes(prev => ({ ...prev, [k]: !prev[k] }))}
                        onUpdateCustomerNote={(key, value) => setNewQ(p => ({ ...p, serviceNotes: { ...p.serviceNotes, [key]: value } }))}
                        onUpdateCrewNote={(key, value) => setNewQ(p => ({ ...p, serviceCrewNotes: { ...p.serviceCrewNotes, [key]: value } }))}
                        publishedCustomerNotes={newQ.publishedServiceNotes?.[k] || []}
                        publishedCrewNotes={newQ.publishedServiceCrewNotes?.[k] || []}
                        onPublishCustomerNote={handlePublishCustomerNote}
                        onPublishCrewNote={handlePublishCrewNote}
                        onEditCustomerNote={handleEditCustomerNote}
                        onEditCrewNote={handleEditCrewNote}
                        onDeleteCustomerNote={handleDeleteCustomerNote}
                        onDeleteCrewNote={handleDeleteCrewNote}
                        userName={userName}
                      />
                    </div>
                  )}
                </React.Fragment>;
              })}
            </div>

          </div>

          <div style={S.box}><h2 style={{ marginTop: 0, borderBottom: '2px solid #2c5530', paddingBottom: 8 }}>Professional Services</h2>
            <p style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>Items marked with <span style={{ background: '#fff3cd', padding: '2px 6px', borderRadius: 3, fontSize: 11 }}>ALLOWANCE</span> are estimates that may vary based on site conditions. Final costs will be confirmed upon completion of work.</p>
            <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e0e0e0', borderRadius: 6, overflow: 'hidden' }}>
              {(() => {
                const proServices = Object.entries(services).filter(([k]) => !SUMMARY_SERVICES.includes(k) && !HOME_OPTIONS.includes(k));
                return proServices.map(([k, svc], idx) => {
                  const sel = newQ.selectedServices?.[k];
                  const ovr = newQ.servicePriceOverrides?.[k];
                  const qty = newQ.serviceQuantities?.[k] || 1;
                  const days = newQ.serviceDays?.[k] || 1;
                  const isAllowance = ALLOWANCE_ITEMS.includes(k);
                  const hasNotes = newQ.serviceNotes?.[k] || newQ.serviceCrewNotes?.[k] || (newQ.publishedServiceNotes?.[k]?.length > 0) || (newQ.publishedServiceCrewNotes?.[k]?.length > 0);
                  return <React.Fragment key={k}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: sel ? (ovr ? '#fffbeb' : '#e8f5e9') : '#fff', borderBottom: idx < proServices.length - 1 ? '1px solid #eee' : 'none' }}>
                      <input type="checkbox" checked={sel || false} onChange={() => toggleSvc(k)} />
                      {svc.hasQuantity && sel && <input type="number" min="1" style={{ width: '50px', padding: '4px', border: '1px solid #ddd', borderRadius: 4, fontSize: 13, textAlign: 'center' }} value={qty} onChange={e => setNewQ(p => ({ ...p, serviceQuantities: { ...p.serviceQuantities, [k]: parseInt(e.target.value) || 1 } }))} />}
                      {svc.hasDays && sel && <input type="number" min="1" style={{ width: '50px', padding: '4px', border: '1px solid #ddd', borderRadius: 4, fontSize: 13, textAlign: 'center' }} value={days} onChange={e => setNewQ(p => ({ ...p, serviceDays: { ...p.serviceDays, [k]: parseInt(e.target.value) || 1 } }))} placeholder="Days" title="Number of days crew will be on site" />}
                      <span style={{ flex: 1, fontSize: 14, fontWeight: sel ? 600 : 400, color: sel ? '#2c5530' : '#333' }}>
                        {svc.name}
                        {isAllowance && <span style={{ fontSize: 9, background: '#fff3cd', padding: '1px 4px', borderRadius: 3, marginLeft: 4 }}>ALLOWANCE</span>}
                        {LICENSED_SERVICES.includes(k) && <span style={{ fontSize: 9, background: '#e3f2fd', color: '#1565c0', padding: '1px 5px', borderRadius: 3, marginLeft: 6, fontWeight: 600, cursor: 'help' }} title="Installer's license required per MN State Statute">MN LICENSE REQ.</span>}
                      </span>
                      {sel ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 11, color: '#666' }}>$</span>
                          <input
                            type="number"
                            style={{ ...S.inputSm, ...(ovr ? S.override : {}), width: '90px', padding: '4px 6px' }}
                            placeholder={fmt(getDefaultPrice(k) * qty)}
                            value={ovr || ''}
                            onChange={e => updateServicePrice(k, e.target.value)}
                            onFocus={e => e.target.select()}
                          />
                          {ovr && <button type="button" style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', fontSize: 11, padding: 0 }} onClick={() => updateServicePrice(k, '')} title="Reset to default price">↺</button>}
                        </div>
                      ) : <span style={{ color: '#999', fontSize: 13 }}>{svc.calc ? 'Calc' : fmt(getDefaultPrice(k))}</span>}
                      {sel && (
                        <button
                          type="button"
                          onClick={() => setExpandedServiceNotes(prev => ({ ...prev, [k]: !prev[k] }))}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, padding: '2px 4px', color: hasNotes ? '#1565c0' : '#bbb', position: 'relative' }}
                          title={expandedServiceNotes[k] ? 'Hide notes' : 'Add/view notes'}
                        >
                          {expandedServiceNotes[k] ? '▼' : '📝'}
                          {hasNotes && !expandedServiceNotes[k] && <span style={{ position: 'absolute', top: 0, right: 0, width: 6, height: 6, background: '#1565c0', borderRadius: '50%' }} />}
                        </button>
                      )}
                    </div>
                    {sel && expandedServiceNotes[k] && (
                      <div style={{ padding: '0 12px 12px', background: '#f9fafb', borderBottom: '1px solid #e0e0e0' }}>
                        <ExpandableNoteSection
                          serviceKey={k}
                          customerNote={newQ.serviceNotes?.[k]}
                          crewNote={newQ.serviceCrewNotes?.[k]}
                          isExpanded={expandedServiceNotes[k]}
                          onToggleExpand={() => setExpandedServiceNotes(prev => ({ ...prev, [k]: !prev[k] }))}
                          onUpdateCustomerNote={(key, value) => setNewQ(p => ({ ...p, serviceNotes: { ...p.serviceNotes, [key]: value } }))}
                          onUpdateCrewNote={(key, value) => setNewQ(p => ({ ...p, serviceCrewNotes: { ...p.serviceCrewNotes, [key]: value } }))}
                          publishedCustomerNotes={newQ.publishedServiceNotes?.[k] || []}
                          publishedCrewNotes={newQ.publishedServiceCrewNotes?.[k] || []}
                          onPublishCustomerNote={handlePublishCustomerNote}
                          onPublishCrewNote={handlePublishCrewNote}
                          onEditCustomerNote={handleEditCustomerNote}
                          onEditCrewNote={handleEditCrewNote}
                          onDeleteCustomerNote={handleDeleteCustomerNote}
                          onDeleteCrewNote={handleDeleteCrewNote}
                          userName={userName}
                        />
                      </div>
                    )}
                  </React.Fragment>;
                });
              })()}
            </div>
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h4 style={{ color: '#2c5530', margin: 0 }}>Additional Services</h4>
                <button type="button" style={{ ...S.btnSm, background: '#2c5530' }} onClick={addCustomService}>+ Add Service</button>
              </div>
              {newQ.customServices.map((cs, i) => (
                <div key={i} style={{ ...S.customSvc, gridTemplateColumns: '1fr 100px 32px' }}>
                  <input type="text" placeholder="Service name..." style={{ ...S.input, marginBottom: 0 }} value={cs.name} onChange={e => updateCustomService(i, 'name', e.target.value)} />
                  <input type="number" placeholder="$" style={S.inputSm} value={cs.price} onChange={e => updateCustomService(i, 'price', e.target.value)} />
                  {newQ.customServices.length > 1 && (
                    <button type="button" style={{ background: 'transparent', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: 16, padding: 0 }} onClick={() => removeCustomService(i)} title="Remove">X</button>
                  )}
                </div>
              ))}
            </div>
            <div style={{ ...S.row, marginTop: 20 }}>
              <div>
                <label style={S.label}>Patio</label>
                <select style={S.select} value={newQ.patioSize} onChange={e => updateField('patioSize', e.target.value)}>
                  <option value="none">None</option>
                  {Object.entries(patioPricing).filter(([k]) => k !== 'none').map(([k, v]) => <option key={k} value={k}>{k}ft - {fmt(v)}</option>)}
                </select>
                {newQ.patioSize && newQ.patioSize !== 'none' && (
                  <>
                    <div style={{ marginTop: 8 }}>
                      <label style={{ ...S.label, fontSize: 12 }}>Override Price (optional)</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        style={{ ...S.inputSm, ...(newQ.servicePriceOverrides?.patio ? S.override : {}), width: '100%' }}
                        placeholder={fmt(patioPricing[newQ.patioSize])}
                        value={newQ.servicePriceOverrides?.patio || ''}
                        onChange={e => {
                          const value = e.target.value;
                          if (value === '' || /^\d*\.?\d*$/.test(value)) {
                            updateServicePrice('patio', value);
                          }
                        }}
                        onFocus={e => e.target.select()}
                      />
                    </div>
                    <ExpandableNoteSection
                      serviceKey="patio"
                      customerNote={newQ.serviceNotes?.patio}
                      crewNote={newQ.serviceCrewNotes?.patio}
                      isExpanded={expandedServiceNotes.patio}
                      onToggleExpand={() => setExpandedServiceNotes(prev => ({ ...prev, patio: !prev.patio }))}
                      onUpdateCustomerNote={(key, value) => setNewQ(p => ({ ...p, serviceNotes: { ...p.serviceNotes, [key]: value } }))}
                      onUpdateCrewNote={(key, value) => setNewQ(p => ({ ...p, serviceCrewNotes: { ...p.serviceCrewNotes, [key]: value } }))}
                      publishedCustomerNotes={newQ.publishedServiceNotes?.patio || []}
                      publishedCrewNotes={newQ.publishedServiceCrewNotes?.patio || []}
                      onPublishCustomerNote={handlePublishCustomerNote}
                      onPublishCrewNote={handlePublishCrewNote}
                      onEditCustomerNote={handleEditCustomerNote}
                      onEditCrewNote={handleEditCrewNote}
                      onDeleteCustomerNote={handleDeleteCustomerNote}
                      onDeleteCrewNote={handleDeleteCrewNote}
                      userName={userName}
                    />
                  </>
                )}
              </div>
              <div>
                <label style={S.label}>Sewer <span style={{ fontSize: 9, background: '#fff3cd', padding: '1px 4px', borderRadius: 3 }}>ALLOWANCE</span></label>
                <select style={S.select} value={newQ.sewerType} onChange={e => updateField('sewerType', e.target.value)}>
                  <option value="none">None</option>
                  {Object.entries(sewerPricing).filter(([k]) => k !== 'none').map(([k, v]) => <option key={k} value={k}>{k.replace('_', ' ')} - {fmt(v)}</option>)}
                </select>
                {newQ.sewerType && newQ.sewerType !== 'none' && (
                  <>
                    <div style={{ marginTop: 8 }}>
                      <label style={{ ...S.label, fontSize: 12 }}>Override Price (optional)</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        style={{ ...S.inputSm, ...(newQ.servicePriceOverrides?.sewer ? S.override : {}), width: '100%' }}
                        placeholder={fmt(sewerPricing[newQ.sewerType])}
                        value={newQ.servicePriceOverrides?.sewer || ''}
                        onChange={e => {
                          const value = e.target.value;
                          if (value === '' || /^\d*\.?\d*$/.test(value)) {
                            updateServicePrice('sewer', value);
                          }
                        }}
                        onFocus={e => e.target.select()}
                      />
                    </div>
                    <ExpandableNoteSection
                      serviceKey="sewer"
                      customerNote={newQ.serviceNotes?.sewer}
                      crewNote={newQ.serviceCrewNotes?.sewer}
                      isExpanded={expandedServiceNotes.sewer}
                      onToggleExpand={() => setExpandedServiceNotes(prev => ({ ...prev, sewer: !prev.sewer }))}
                      onUpdateCustomerNote={(key, value) => setNewQ(p => ({ ...p, serviceNotes: { ...p.serviceNotes, [key]: value } }))}
                      onUpdateCrewNote={(key, value) => setNewQ(p => ({ ...p, serviceCrewNotes: { ...p.serviceCrewNotes, [key]: value } }))}
                      publishedCustomerNotes={newQ.publishedServiceNotes?.sewer || []}
                      publishedCrewNotes={newQ.publishedServiceCrewNotes?.sewer || []}
                      onPublishCustomerNote={handlePublishCustomerNote}
                      onPublishCrewNote={handlePublishCrewNote}
                      onEditCustomerNote={handleEditCustomerNote}
                      onEditCrewNote={handleEditCrewNote}
                      onDeleteCustomerNote={handleDeleteCustomerNote}
                      onDeleteCrewNote={handleDeleteCrewNote}
                      userName={userName}
                    />
                  </>
                )}
              </div>
              <div>
                <label style={S.label}>Well (ft) <span style={{ fontSize: 9, background: '#fff3cd', padding: '1px 4px', borderRadius: 3 }}>ALLOWANCE</span></label>
                <input style={S.input} type="number" value={newQ.wellDepth} onChange={e => updateField('wellDepth', e.target.value)} />
                {parseFloat(newQ.wellDepth) > 0 && (
                  <>
                    <div style={{ marginTop: 8 }}>
                      <label style={{ ...S.label, fontSize: 12 }}>Override Price (optional)</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        style={{ ...S.inputSm, ...(newQ.servicePriceOverrides?.well ? S.override : {}), width: '100%' }}
                        placeholder={fmt((120 * parseFloat(newQ.wellDepth)) + (enforceMiles(newQ.driveTime) * DRIVE_RATE_SERVICE))}
                        value={newQ.servicePriceOverrides?.well || ''}
                        onChange={e => {
                          const value = e.target.value;
                          if (value === '' || /^\d*\.?\d*$/.test(value)) {
                            updateServicePrice('well', value);
                          }
                        }}
                        onFocus={e => e.target.select()}
                      />
                    </div>
                    <ExpandableNoteSection
                      serviceKey="well"
                      customerNote={newQ.serviceNotes?.well}
                      crewNote={newQ.serviceCrewNotes?.well}
                      isExpanded={expandedServiceNotes.well}
                      onToggleExpand={() => setExpandedServiceNotes(prev => ({ ...prev, well: !prev.well }))}
                      onUpdateCustomerNote={(key, value) => setNewQ(p => ({ ...p, serviceNotes: { ...p.serviceNotes, [key]: value } }))}
                      onUpdateCrewNote={(key, value) => setNewQ(p => ({ ...p, serviceCrewNotes: { ...p.serviceCrewNotes, [key]: value } }))}
                      publishedCustomerNotes={newQ.publishedServiceNotes?.well || []}
                      publishedCrewNotes={newQ.publishedServiceCrewNotes?.well || []}
                      onPublishCustomerNote={handlePublishCustomerNote}
                      onPublishCrewNote={handlePublishCrewNote}
                      onEditCustomerNote={handleEditCustomerNote}
                      onEditCrewNote={handleEditCrewNote}
                      onDeleteCustomerNote={handleDeleteCustomerNote}
                      onDeleteCrewNote={handleDeleteCrewNote}
                      userName={userName}
                    />
                  </>
                )}
              </div>
            </div>

            <div style={{ marginTop: 24, padding: 16, background: '#f9f9f9', borderRadius: 8 }}>
              <h3 style={{ marginTop: 0, marginBottom: 16, color: '#2c5530' }}>Landscaping & Deck Services</h3>
              <div style={{ ...S.row }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <input
                      type="checkbox"
                      checked={newQ.hasLandscaping || false}
                      onChange={e => setNewQ(p => ({ ...p, hasLandscaping: e.target.checked }))}
                      style={{ width: 20, height: 20 }}
                    />
                    <label style={{ ...S.label, margin: 0, fontWeight: 600 }}>Landscaping</label>
                  </div>
                  {newQ.hasLandscaping && (
                    <>
                      <div style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
                        Labor: $1,200 (2-man crew) | Drive cost calculated per day
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <label style={{ ...S.label, fontSize: 12 }}>Material Cost ($)</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          style={{ ...S.input, marginBottom: 0 }}
                          placeholder="Enter material cost"
                          value={newQ.landscapingMaterialCost || ''}
                          onChange={e => {
                            const value = e.target.value;
                            if (value === '' || /^\d*\.?\d*$/.test(value)) {
                              setNewQ(p => ({ ...p, landscapingMaterialCost: value }));
                            }
                          }}
                          onFocus={e => e.target.select()}
                        />
                      </div>
                      <div>
                        <label style={{ ...S.label, fontSize: 12 }}>Days on Site</label>
                        <input
                          type="number"
                          min="1"
                          style={{ ...S.input, marginBottom: 0 }}
                          value={newQ.landscapingDays || 1}
                          onChange={e => setNewQ(p => ({ ...p, landscapingDays: parseInt(e.target.value) || 1 }))}
                        />
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <div
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: '#1565c0', background: '#e3f2fd', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' }}
                          onClick={() => setExpandedServiceNotes(prev => ({ ...prev, landscaping: !prev.landscaping }))}
                        >
                          <span>Customer Note</span>
                          <span style={{ fontSize: 16 }}>{expandedServiceNotes.landscaping ? '▼' : '▶'}</span>
                        </div>
                        {expandedServiceNotes.landscaping && (
                          <textarea
                            style={{ width: '100%', padding: 12, border: '2px solid #1565c0', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', minHeight: 100, resize: 'vertical', boxSizing: 'border-box', background: '#fff', marginTop: 6 }}
                            placeholder="e.g., Seed front yard, sod around deck area..."
                            value={newQ.serviceNotes?.landscaping || ''}
                            onChange={e => setNewQ(p => ({ ...p, serviceNotes: { ...p.serviceNotes, landscaping: e.target.value } }))}
                          />
                        )}
                        {!expandedServiceNotes.landscaping && newQ.serviceNotes?.landscaping && (
                          <div style={{ fontSize: 12, color: '#666', fontStyle: 'italic', marginTop: 4, padding: '4px 8px', background: '#f5f5f5', borderRadius: 4 }}>
                            {newQ.serviceNotes.landscaping.substring(0, 60)}{newQ.serviceNotes.landscaping.length > 60 ? '...' : ''}
                          </div>
                        )}
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#e65100', background: '#fff3e0', padding: '6px 10px', borderRadius: 4 }}>Internal Crew Note</label>
                        <textarea
                          style={{ width: '100%', padding: 12, border: '2px solid #ff9800', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', minHeight: 100, resize: 'vertical', boxSizing: 'border-box', background: '#fff' }}
                          placeholder="e.g., Bring rototiller and topsoil..."
                          value={newQ.serviceCrewNotes?.landscaping || ''}
                          onChange={e => setNewQ(p => ({ ...p, serviceCrewNotes: { ...p.serviceCrewNotes, landscaping: e.target.value } }))}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <input
                      type="checkbox"
                      checked={newQ.hasDeck || false}
                      onChange={e => setNewQ(p => ({ ...p, hasDeck: e.target.checked }))}
                      style={{ width: 20, height: 20 }}
                    />
                    <label style={{ ...S.label, margin: 0, fontWeight: 600 }}>Deck</label>
                  </div>
                  {newQ.hasDeck && (
                    <>
                      <div style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
                        Labor: $1,200 (2-man crew) | Drive cost calculated per day
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <label style={{ ...S.label, fontSize: 12 }}>Material Cost ($)</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          style={{ ...S.input, marginBottom: 0 }}
                          placeholder="Enter material cost"
                          value={newQ.deckMaterialCost || ''}
                          onChange={e => {
                            const value = e.target.value;
                            if (value === '' || /^\d*\.?\d*$/.test(value)) {
                              setNewQ(p => ({ ...p, deckMaterialCost: value }));
                            }
                          }}
                          onFocus={e => e.target.select()}
                        />
                      </div>
                      <div>
                        <label style={{ ...S.label, fontSize: 12 }}>Days on Site</label>
                        <input
                          type="number"
                          min="1"
                          style={{ ...S.input, marginBottom: 0 }}
                          value={newQ.deckDays || 1}
                          onChange={e => setNewQ(p => ({ ...p, deckDays: parseInt(e.target.value) || 1 }))}
                        />
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <div
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: '#1565c0', background: '#e3f2fd', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' }}
                          onClick={() => setExpandedServiceNotes(prev => ({ ...prev, deck: !prev.deck }))}
                        >
                          <span>Customer Note</span>
                          <span style={{ fontSize: 16 }}>{expandedServiceNotes.deck ? '▼' : '▶'}</span>
                        </div>
                        {expandedServiceNotes.deck && (
                          <textarea
                            style={{ width: '100%', padding: 12, border: '2px solid #1565c0', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', minHeight: 100, resize: 'vertical', boxSizing: 'border-box', background: '#fff', marginTop: 6 }}
                            placeholder="e.g., Deck will be 12x16 with composite decking and railing..."
                            value={newQ.serviceNotes?.deck || ''}
                            onChange={e => setNewQ(p => ({ ...p, serviceNotes: { ...p.serviceNotes, deck: e.target.value } }))}
                          />
                        )}
                        {!expandedServiceNotes.deck && newQ.serviceNotes?.deck && (
                          <div style={{ fontSize: 12, color: '#666', fontStyle: 'italic', marginTop: 4, padding: '4px 8px', background: '#f5f5f5', borderRadius: 4 }}>
                            {newQ.serviceNotes.deck.substring(0, 60)}{newQ.serviceNotes.deck.length > 60 ? '...' : ''}
                          </div>
                        )}
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#e65100', background: '#fff3e0', padding: '6px 10px', borderRadius: 4 }}>Internal Crew Note</label>
                        <textarea
                          style={{ width: '100%', padding: 12, border: '2px solid #ff9800', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', minHeight: 100, resize: 'vertical', boxSizing: 'border-box', background: '#fff' }}
                          placeholder="e.g., Customer wants composite decking - order 2 weeks ahead..."
                          value={newQ.serviceCrewNotes?.deck || ''}
                          onChange={e => setNewQ(p => ({ ...p, serviceCrewNotes: { ...p.serviceCrewNotes, deck: e.target.value } }))}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {totals && <div style={S.box}><h2 style={{ marginTop: 0, borderBottom: '2px solid #2c5530', paddingBottom: 8 }}>Quote Summary</h2>
            {isAdmin && totals.homePrice > 0 && <div style={{ background: '#e8f5e9', padding: 12, borderRadius: 6, marginBottom: 16 }}><strong>Home:</strong> {fmt(totals.homePrice)}</div>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <h4>Materials{(isAdmin || isSales) ? `: ${fmt(totals.matT)}` : ''}</h4>
                <table style={{ ...S.table, fontSize: 12 }}>
                  <tbody>
                    {totals.mat.map((c, i) => (
                      <tr key={i}>
                        {(isAdmin || isSales) && <td style={{ width: 24 }}>
                          <button
                            type="button"
                            style={{ background: 'transparent', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: 12, padding: 0 }}
                            onClick={() => toggleRemoveMaterial(c.key)}
                            title="Remove item"
                          >X</button>
                        </td>}
                        <td>{c.item}</td>
                        <td style={{ textAlign: 'right' }}>{c.qty}</td>
                        {isAdmin && <td style={{ textAlign: 'right' }}>{fmtDec(c.total)}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(isAdmin || isSales) && Object.keys(newQ.removedMaterials || {}).filter(k => newQ.removedMaterials[k]).length > 0 && (
                  <div style={{ marginTop: 8, fontSize: 11, color: '#666' }}>
                    <strong>Removed:</strong> {Object.keys(newQ.removedMaterials).filter(k => newQ.removedMaterials[k]).map(k => materials[k]?.name || k).join(', ')}
                    <button type="button" style={{ marginLeft: 8, background: '#6c757d', color: '#fff', border: 'none', borderRadius: 3, padding: '2px 6px', fontSize: 10, cursor: 'pointer' }} onClick={() => setNewQ(p => ({ ...p, removedMaterials: {} }))}>Restore All</button>
                  </div>
                )}

                {/* Custom Materials Section */}
                {(isAdmin || isSales) && (newQ.customMaterials || []).length > 0 && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #ddd' }}>
                    <h5 style={{ margin: '0 0 12px 0', fontSize: 13, color: '#666' }}>Custom Materials</h5>
                    {newQ.customMaterials.map((cm, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 100px 80px 32px', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="Material name..."
                          style={{ ...S.input, marginBottom: 0, fontSize: 12 }}
                          value={cm.name}
                          onChange={e => updateCustomMaterial(i, 'name', e.target.value)}
                        />
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="Price"
                          style={{ ...S.inputSm, marginBottom: 0 }}
                          value={cm.price}
                          onChange={e => {
                            const value = e.target.value;
                            if (value === '' || /^\d*\.?\d*$/.test(value)) {
                              updateCustomMaterial(i, 'price', value);
                            }
                          }}
                        />
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="Qty"
                          style={{ ...S.inputSm, marginBottom: 0 }}
                          value={cm.quantity}
                          onChange={e => {
                            const value = e.target.value;
                            if (value === '' || /^\d*\.?\d*$/.test(value)) {
                              updateCustomMaterial(i, 'quantity', value);
                            }
                          }}
                        />
                        <button
                          type="button"
                          style={{ background: 'transparent', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: 16, padding: 0 }}
                          onClick={() => removeCustomMaterial(i)}
                          title="Remove"
                        >X</button>
                      </div>
                    ))}
                  </div>
                )}

                {(isAdmin || isSales) && (
                  <button
                    type="button"
                    style={{ ...S.btnSm, background: '#2c5530', marginTop: 12, fontSize: 13 }}
                    onClick={addCustomMaterial}
                  >
                    + Add Custom Material
                  </button>
                )}
              </div>
              <div>
                {(() => {
                  // Get install services from totals.svc that are in SUMMARY_SERVICES - ONLY show services with checkboxes
                  const summaryServices = totals.svc.filter(c => SUMMARY_SERVICES.includes(c.key));
                  const summaryTotal = summaryServices.reduce((sum, s) => sum + s.cost, 0);
                  const installTotal = totals.labT + summaryTotal;

                  return summaryServices.length > 0 && (
                    <>
                      <h4>Install{(isAdmin || isSales) ? `: ${fmt(installTotal)}` : ''}</h4>
                      <table style={{ ...S.table, fontSize: 12 }}>
                        <tbody>
                          {totals.lab.map((c, i) => (
                            <tr key={i}>
                              <td>{c.item}</td>
                              {isAdmin && <td style={{ textAlign: 'right' }}>{fmt(c.total)}</td>}
                            </tr>
                          ))}
                          {summaryServices.map((s, i) => (
                            <tr key={`summary-${i}`} style={s.isOverride ? { background: '#fffbeb' } : {}}>
                              <td>{s.item}</td>
                              {isAdmin && <td style={{ textAlign: 'right' }}>{fmt(s.cost)}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  );
                })()}

                {(() => {
                  // Separate allowances from other professional services
                  const allProfessionalServices = totals.svc.filter(c => !SUMMARY_SERVICES.includes(c.key));
                  const allowances = allProfessionalServices.filter(c => ALLOWANCE_ITEMS.includes(c.key));
                  const professionalServices = allProfessionalServices.filter(c => !ALLOWANCE_ITEMS.includes(c.key));
                  const professionalTotal = professionalServices.reduce((sum, s) => sum + s.cost, 0);
                  const allowanceTotal = allowances.reduce((sum, s) => sum + s.cost, 0);

                  return <>
                    {allowances.length > 0 && (
                      <>
                        <h4 style={{ marginTop: 16, color: '#856404' }}>Allowances (Estimated Costs){(isAdmin || isSales) ? `: ${fmt(allowanceTotal)}` : ''}</h4>
                        <div style={{ background: '#fff9e6', padding: 12, borderRadius: 6, marginBottom: 8, fontSize: 12, color: '#856404', border: '1px solid #ffc107' }}>
                          <strong>What are allowances?</strong> These are estimated costs based on 49 years of experience. Actual costs may vary depending on site conditions. Savings or overages are tracked in your Contingency Fund.
                        </div>
                        <table style={{ ...S.table, fontSize: 12 }}>
                          <tbody>
                            {allowances.map((c, i) => (
                              <tr key={i} style={{ background: '#fffbeb' }}>
                                <td>{c.item} <span style={{ fontSize: 11, color: '#856404' }}>(Allowance)</span></td>
                                {(isAdmin || isSales) && <td style={{ textAlign: 'right', fontWeight: 600 }}>{fmt(c.cost)}</td>}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                    {professionalServices.length > 0 && (
                      <>
                        <h4 style={{ marginTop: 16 }}>Professional Services{(isAdmin || isSales) ? `: ${fmt(professionalTotal)}` : ''}</h4>
                        <table style={{ ...S.table, fontSize: 12 }}>
                          <tbody>
                            {professionalServices.map((c, i) => (
                              <tr key={i} style={c.isOverride || c.isCustom ? { background: '#fffbeb' } : {}}>
                                <td>{c.item}</td>
                                {isAdmin && <td style={{ textAlign: 'right' }}>{fmt(c.cost)}</td>}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </>;
                })()}
                {isAdmin && Object.keys(newQ.removedServices || {}).filter(k => newQ.removedServices[k]).length > 0 && (
                  <div style={{ marginTop: 8, fontSize: 11, color: '#666' }}>
                    <strong>Removed Services:</strong> {Object.keys(newQ.removedServices).filter(k => newQ.removedServices[k]).map(k => {
                      if (services[k]) return services[k].name;
                      if (k === 'sewer') return 'Sewer';
                      if (k === 'well') return 'Well';
                      if (k === 'patio') return 'Patio';
                      if (k.startsWith('custom_')) return 'Custom Service';
                      return k;
                    }).join(', ')}
                    <button type="button" style={{ marginLeft: 8, background: '#6c757d', color: '#fff', border: 'none', borderRadius: 3, padding: '2px 6px', fontSize: 10, cursor: 'pointer' }} onClick={() => setNewQ(p => ({ ...p, removedServices: {} }))}>Restore All</button>
                  </div>
                )}
              </div>
            </div>

            {isAdmin && <div style={S.projCmd}>
              <h4 style={{ margin: '0 0 12px', color: '#1565c0' }}>Project Command: {fmt(totals.projCmd.total)}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, fontSize: 13 }}>
                <div><strong>PS</strong><div style={{ color: '#666' }}>{totals.projCmd.numSvc} svc x ${totals.projCmd.psPerService || projectCommandRates.psPerService} + ({totals.projCmd.miles} mi x ${driveRates.projectCommand} x {totals.projCmd.numSvc})</div><div style={{ fontWeight: 600 }}>{fmt(totals.projCmd.ps)}</div></div>
                <div><strong>PM</strong><div style={{ color: '#666' }}>{totals.projCmd.miles} mi x ${driveRates.projectCommand} + {fmtCurrency(totals.projCmd.pmBase || projectCommandRates.pmBase)}</div><div style={{ fontWeight: 600 }}>{fmt(totals.projCmd.pm)}</div></div>
                <div><strong>PC</strong><div style={{ color: '#666' }}>PM / 2 + {totals.projCmd.miles} mi x ${driveRates.projectCommand}</div><div style={{ fontWeight: 600 }}>{fmt(totals.projCmd.pc)}</div></div>
              </div>
            </div>}

            <div style={{ marginTop: 24, padding: 16, background: '#f8f9fa', borderRadius: 8 }}>
              {isAdmin && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Materials</span><span>{fmt(totals.matT)}</span></div>}
              {isAdmin && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Install</span><span>{fmt(totals.labT)}</span></div>}
              {isAdmin && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Services</span><span>{fmt(totals.svcT)}</span></div>}
              {isAdmin && totals.homePrice > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Home</span><span>{fmt(totals.homePrice)}</span></div>}
              {isAdmin && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Project Command</span><span>{fmt(totals.projCmd.total)}</span></div>}
              {isAdmin && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, borderTop: '1px solid #ddd', paddingTop: 8 }}><span>Subtotal</span><span>{fmt(totals.sub)}</span></div>}
              {isAdmin && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Overhead (5%)</span><span>{fmt(totals.oh)}</span></div>}
              {isAdmin && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Markup (10%)</span><span>{fmt(totals.mu)}</span></div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 24, color: '#2c5530', borderTop: '2px solid #2c5530', paddingTop: 12, marginBottom: 12 }}><span>Total</span><span>{fmt(totals.total)}</span></div>

              {/* 2% Contingency Allowance */}
              <div style={{ background: '#e3f2fd', padding: 16, borderRadius: 8, marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18, color: '#1565c0', marginBottom: 8 }}>
                  <span>2% Contingency Allowance</span>
                  <span>{fmt(totals.contingency)}</span>
                </div>
                <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
                  <strong>Purpose:</strong> A dedicated fund for change orders and allowance adjustments. If allowances (permits, well, sand pad, sewer, etc.) come in under budget, savings are added to this fund. If they exceed estimates or you make change orders, funds are drawn from here first, minimizing out-of-pocket costs. At project completion, if there are no overages or change orders, you receive back the full 2% contingency amount plus any allowance savings.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 28, color: '#2c5530', borderTop: '3px solid #2c5530', paddingTop: 16, marginTop: 16 }}>
                <span>Total Investment</span>
                <span>{fmt(totals.totalWithContingency)}</span>
              </div>
            </div>
          </div>}
          </div>
          )}

        </div>}

        {/* Warranties View */}
        {view === 'warranties' && (
          <div style={S.box}>
            <h1>Warranty Reference</h1>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Manufacturer</th>
                  <th style={S.th}>Terms</th>
                  <th style={S.th}>Phone</th>
                </tr>
              </thead>
              <tbody>
                {WARRANTIES.map((w, i) => (
                  <tr key={i}>
                    <td style={S.td}>{w.mfr}</td>
                    <td style={S.td}>{w.terms}</td>
                    <td style={S.td}>{w.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Users View */}
        {view === 'users' && isAdmin && (
          <div style={S.box}>
            <h2>User Management</h2>

            {/* Add User Form */}
            <div style={{ ...S.box, background: '#f8f9fa' }}>
              <h3 style={{ margin: '0 0 12px' }}>Add New User</h3>
              <div style={S.row}>
                <div>
                  <label style={S.label}>Username</label>
                  <input style={S.input} value={newUser.username} onChange={e => setNewUser(p => ({ ...p, username: e.target.value }))} />
                </div>
                <div>
                  <label style={S.label}>Full Name</label>
                  <input style={S.input} value={newUser.fullName} onChange={e => setNewUser(p => ({ ...p, fullName: e.target.value }))} />
                </div>
                <div>
                  <label style={S.label}>Company</label>
                  <input style={S.input} value={newUser.company} onChange={e => setNewUser(p => ({ ...p, company: e.target.value }))} />
                </div>
              </div>
              <div style={S.row}>
                <div>
                  <label style={S.label}>Role</label>
                  <select style={S.select} value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))}>
                    <option value="sales">Sales</option>
                    <option value="admin">Admin</option>
                    <option value="crew">Crew</option>
                  </select>
                </div>
                <div>
                  <label style={S.label}>Phone</label>
                  <input style={S.input} value={newUser.phone} onChange={e => setNewUser(p => ({ ...p, phone: e.target.value }))} />
                </div>
              </div>
              <button style={{ ...S.btn, width: 'auto' }} onClick={addUser}>Add User</button>
            </div>

            {/* Users Table */}
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Username</th>
                  <th style={S.th}>Full Name</th>
                  <th style={S.th}>Company</th>
                  <th style={S.th}>Role</th>
                  <th style={S.th}>Phone</th>
                  <th style={S.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td style={S.td}>{u.username}</td>
                    <td style={S.td}>{u.fullName}</td>
                    <td style={S.td}>{u.company}</td>
                    <td style={S.td}>{u.role}</td>
                    <td style={S.td}>{u.phone}</td>
                    <td style={S.td}>
                      <button style={{ ...S.btnDanger, padding: '4px 8px', fontSize: 12 }} onClick={() => deleteUser(u.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pricing View */}
        {view === 'pricing' && isAdmin && (
          <div style={S.box}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ margin: 0 }}>Pricing Management</h2>
              <div style={{ display: 'flex', gap: 8 }}>
                {!pricingEditMode ? (
                  <button style={{ ...S.btn, width: 'auto' }} onClick={() => setPricingEditMode(true)}>Edit Pricing</button>
                ) : (
                  <>
                    <button style={{ ...S.btn, width: 'auto' }} onClick={savePricing}>Save & Lock</button>
                    <button style={S.btn2} onClick={cancelPricingEdit}>Cancel</button>
                    <button style={S.btnDanger} onClick={resetPricing}>Reset to Defaults</button>
                  </>
                )}
              </div>
            </div>

            {/* Pricing Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' }}>
              {['homes', 'services', 'materials', 'sewer', 'patio', 'foundation', 'drive', 'project command'].map(tab => (
                <button key={tab} style={{ ...S.tab, ...(pricingTab === tab ? S.tabA : {}) }} onClick={() => setPricingTab(tab)}>
                  {tab.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
            </div>

            {/* Home Models Tab */}
            {pricingTab === 'homes' && (
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Model Name</th>
                    <th style={S.th}>Width</th>
                    <th style={S.th}>Length</th>
                    <th style={S.th}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {homeModels.map((m, i) => (
                    <tr key={i}>
                      <td style={S.td}>{pricingEditMode ? <input style={S.inputEdit} value={m.name} onChange={e => { const u = [...homeModels]; u[i] = { ...m, name: e.target.value }; setHomeModels(u); }} /> : m.name}</td>
                      <td style={S.td}>{pricingEditMode ? <input type="number" style={S.inputEdit} value={m.width} onChange={e => { const u = [...homeModels]; u[i] = { ...m, width: parseFloat(e.target.value) || 0 }; setHomeModels(u); }} /> : m.width}</td>
                      <td style={S.td}>{pricingEditMode ? <input type="number" style={S.inputEdit} value={m.length} onChange={e => { const u = [...homeModels]; u[i] = { ...m, length: parseFloat(e.target.value) || 0 }; setHomeModels(u); }} /> : m.length}</td>
                      <td style={S.td}>{pricingEditMode ? <input type="number" style={S.inputEdit} value={m.price} onChange={e => { const u = [...homeModels]; u[i] = { ...m, price: parseFloat(e.target.value) || 0 }; setHomeModels(u); }} /> : fmtCurrency(m.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Services Pricing Tab */}
            {pricingTab === 'services' && (
              <div>
                <div style={{ marginBottom: 16, padding: 12, background: '#f0f7f1', borderRadius: 6, border: '1px solid #2c5530' }}>
                  <div style={{ fontSize: 13, color: '#333', lineHeight: 1.6 }}>
                    <strong>How Service Pricing Works:</strong> Each service has a <strong>Base Price</strong>. Services marked with <span style={{ background: '#e3f2fd', padding: '1px 6px', borderRadius: 3, fontSize: 12 }}>+Drive</span> add a drive cost calculated as: <strong>Miles x Drive Rate (${driveRates.service}/mi)</strong>. Some services use special formulas (pad, skirting, installation, etc).
                  </div>
                </div>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Service</th>
                      <th style={S.th}>Base Price</th>
                      <th style={S.th}>Drive</th>
                      <th style={S.th}>Pricing Formula</th>
                      <th style={S.th}>Example @ 30mi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(services).map(([k, svc]) => {
                      const exampleMiles = 30;
                      const exampleDrive = exampleMiles * driveRates.service;
                      let formula = '';
                      let exampleTotal = 0;

                      if (svc.calc === 'install_home') {
                        formula = 'Calculated (base + axles + delivery + drive)';
                        exampleTotal = null;
                      } else if (svc.calc === 'pad') {
                        formula = 'Width x Length x $8/sqft + Drive';
                        exampleTotal = null;
                      } else if (svc.calc === 'skirt') {
                        formula = '(24 x Perimeter + (miles+200) x 3) x 1.1';
                        exampleTotal = null;
                      } else if (svc.calc === 'lp_siding') {
                        formula = 'By length: ≤52\'=$6,878 | 53-64\'=$7,298 | 65+\'=$8,243';
                        exampleTotal = null;
                      } else if (svc.calc === 'closing') {
                        formula = '7% of Total (calculated automatically)';
                        exampleTotal = null;
                      } else if (svc.calc === 'landscaping') {
                        formula = '$2,200 + Drive x Days';
                        exampleTotal = 2200 + exampleDrive;
                      } else if (svc.calc === 'deck') {
                        formula = '$3,700 + Drive x Days';
                        exampleTotal = 3700 + exampleDrive;
                      } else if (svc.addDrive) {
                        formula = `Base + Drive`;
                        exampleTotal = (svc.base || 0) + exampleDrive;
                      } else {
                        formula = 'Flat rate (no drive)';
                        exampleTotal = svc.base || 0;
                      }

                      return (
                        <tr key={k} style={{ background: svc.calc ? '#f8f9fa' : 'transparent' }}>
                          <td style={S.td}>
                            <strong>{svc.name}</strong>
                            {svc.calc && <span style={{ display: 'block', fontSize: 11, color: '#666', fontStyle: 'italic' }}>Special calc</span>}
                          </td>
                          <td style={S.td}>
                            {pricingEditMode && !svc.calc ? (
                              <input type="number" style={{ ...S.inputEdit, width: 90 }}
                                value={svc.base || 0}
                                onChange={e => {
                                  const val = parseFloat(e.target.value) || 0;
                                  setServices(prev => ({ ...prev, [k]: { ...prev[k], base: val, basePrice: val, price: val } }));
                                }}
                              />
                            ) : (
                              <span style={{ fontWeight: 600 }}>{svc.calc ? (svc.base > 0 ? fmtCurrency(svc.base) : 'Calc') : fmtCurrency(svc.base || 0)}</span>
                            )}
                          </td>
                          <td style={{ ...S.td, textAlign: 'center' }}>
                            {svc.addDrive ? (
                              <span style={{ background: '#e3f2fd', color: '#1565c0', padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600 }}>+${driveRates.service}/mi</span>
                            ) : svc.calc === 'skirt' || svc.calc === 'pad' ? (
                              <span style={{ background: '#fff3e0', color: '#e65100', padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600 }}>In formula</span>
                            ) : (
                              <span style={{ color: '#999', fontSize: 11 }}>No</span>
                            )}
                          </td>
                          <td style={{ ...S.td, fontSize: 12, color: '#666' }}>{formula}</td>
                          <td style={{ ...S.td, fontWeight: 600, color: '#2c5530' }}>
                            {exampleTotal !== null ? fmtCurrency(exampleTotal) : <span style={{ color: '#999', fontSize: 12 }}>Varies</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Drive Rate for Services */}
                <div style={{ marginTop: 16, padding: 16, background: '#e3f2fd', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 8px', color: '#1565c0' }}>Service Drive Rate</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 13 }}>Per-mile rate for services:</span>
                    {pricingEditMode ? (
                      <input type="number" style={{ ...S.inputEdit, width: 80 }} value={driveRates.service}
                        onChange={e => setDriveRates(prev => ({ ...prev, service: parseFloat(e.target.value) || 0 }))} />
                    ) : (
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#1565c0' }}>${driveRates.service}/mile</span>
                    )}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                    Example: At 30 miles, drive cost = 30 x ${driveRates.service} = {fmtCurrency(30 * driveRates.service)} added to base price
                  </div>
                </div>
              </div>
            )}

            {/* Materials Pricing Tab */}
            {pricingTab === 'materials' && (
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Material</th>
                    <th style={S.th}>Price</th>
                    <th style={S.th}>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(materials).map(([k, mat]) => (
                    <tr key={k}>
                      <td style={S.td}>{mat.name}</td>
                      <td style={S.td}>
                        {pricingEditMode ? (
                          <input type="number" style={S.inputEdit} value={mat.price}
                            onChange={e => setMaterials(prev => ({ ...prev, [k]: { ...prev[k], price: parseFloat(e.target.value) || 0 } }))} />
                        ) : fmtCurrency(mat.price)}
                      </td>
                      <td style={S.td}>
                        {pricingEditMode ? (
                          <input type="number" style={S.inputEdit} value={mat.cost || 0}
                            onChange={e => setMaterials(prev => ({ ...prev, [k]: { ...prev[k], cost: parseFloat(e.target.value) || 0 } }))} />
                        ) : fmtCurrency(mat.cost || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Sewer Pricing Tab */}
            {pricingTab === 'sewer' && (
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Type</th>
                    <th style={S.th}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(sewerPricing).filter(([k]) => k !== 'none').map(([k, v]) => (
                    <tr key={k}>
                      <td style={S.td}>{k.replace('_', ' ')}</td>
                      <td style={S.td}>
                        {pricingEditMode ? (
                          <input type="number" style={S.inputEdit} value={v}
                            onChange={e => setSewerPricing(prev => ({ ...prev, [k]: parseFloat(e.target.value) || 0 }))} />
                        ) : fmtCurrency(v)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Patio Pricing Tab */}
            {pricingTab === 'patio' && (
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Size</th>
                    <th style={S.th}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(patioPricing).filter(([k]) => k !== 'none').map(([k, v]) => (
                    <tr key={k}>
                      <td style={S.td}>{k} ft</td>
                      <td style={S.td}>
                        {pricingEditMode ? (
                          <input type="number" style={S.inputEdit} value={v}
                            onChange={e => setPatioPricing(prev => ({ ...prev, [k]: parseFloat(e.target.value) || 0 }))} />
                        ) : fmtCurrency(v)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Foundation Pricing Tab */}
            {pricingTab === 'foundation' && (
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Type</th>
                    <th style={S.th}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={S.td}>Basement (includes waterproofing & insulation)</td>
                    <td style={S.td}>
                      {pricingEditMode ? (
                        <input type="number" style={S.inputEdit} value={foundationPricing.basement}
                          onChange={e => setFoundationPricing(prev => ({ ...prev, basement: parseFloat(e.target.value) || 0 }))} />
                      ) : fmtCurrency(foundationPricing.basement)}
                    </td>
                  </tr>
                  <tr>
                    <td style={S.td}>Crawl Space</td>
                    <td style={S.td}>
                      {pricingEditMode ? (
                        <input type="number" style={S.inputEdit} value={foundationPricing.crawlspace}
                          onChange={e => setFoundationPricing(prev => ({ ...prev, crawlspace: parseFloat(e.target.value) || 0 }))} />
                      ) : fmtCurrency(foundationPricing.crawlspace)}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            {/* Drive Rates Tab */}
            {pricingTab === 'drive' && (
              <div>
                <h3>Drive Time Rates</h3>
                <div style={S.row}>
                  {Object.entries(driveRates).map(([k, rate]) => (
                    <div key={k}>
                      <label style={S.label}>{k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())} Rate ($/mile)</label>
                      {pricingEditMode ? (
                        <input type="number" style={S.input} value={rate}
                          onChange={e => setDriveRates(prev => ({ ...prev, [k]: parseFloat(e.target.value) || 0 }))} />
                      ) : (
                        <div style={{ padding: '12px 14px', background: '#f8f9fa', borderRadius: 6 }}>${rate}/mile</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Command Tab */}
            {pricingTab === 'project command' && (
              <div>
                <div style={{ marginBottom: 16, padding: 12, background: '#f3e5f5', borderRadius: 6, border: '1px solid #7b1fa2' }}>
                  <div style={{ fontSize: 13, color: '#333', lineHeight: 1.6 }}>
                    <strong>How Project Command Pricing Works:</strong> Project Command is calculated from three roles based on the number of services and drive distance. The <strong>Project Command Drive Rate</strong> is currently <strong>${driveRates.projectCommand}/mi</strong> (editable in the Drive tab).
                  </div>
                </div>

                {/* Role Breakdown Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
                  {/* Project Supervisor */}
                  <div style={{ padding: 20, background: '#e8f5e9', borderRadius: 8, border: '2px solid #388e3c' }}>
                    <h4 style={{ margin: '0 0 12px', color: '#2e7d32', fontSize: 16 }}>Project Supervisor (PS)</h4>
                    <div style={{ fontSize: 13, color: '#333', lineHeight: 1.8 }}>
                      <div style={{ marginBottom: 8 }}>
                        <strong>Formula:</strong>
                        <div style={{ background: '#fff', padding: 8, borderRadius: 4, marginTop: 4, fontFamily: 'monospace', fontSize: 12 }}>
                          (numServices x ${projectCommandRates.psPerService}) + (miles x ${driveRates.projectCommand} x numServices)
                        </div>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>Per-Service Base:</strong>
                        {pricingEditMode ? (
                          <input type="number" style={{ ...S.inputEdit, width: 100, marginLeft: 8 }}
                            value={projectCommandRates.psPerService}
                            onChange={e => setProjectCommandRates(prev => ({ ...prev, psPerService: parseFloat(e.target.value) || 0 }))}
                          />
                        ) : (
                          <span style={{ fontWeight: 700, color: '#2e7d32', marginLeft: 8 }}>${projectCommandRates.psPerService}/service</span>
                        )}
                      </div>
                      <div style={{ padding: 8, background: '#c8e6c9', borderRadius: 4, fontSize: 12 }}>
                        <strong>Example:</strong> 5 services, 30 miles<br/>
                        = (5 x ${projectCommandRates.psPerService}) + (30 x ${driveRates.projectCommand} x 5)<br/>
                        = ${5 * projectCommandRates.psPerService} + ${30 * driveRates.projectCommand * 5}<br/>
                        = <strong>{fmtCurrency(5 * projectCommandRates.psPerService + 30 * driveRates.projectCommand * 5)}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Project Manager */}
                  <div style={{ padding: 20, background: '#e3f2fd', borderRadius: 8, border: '2px solid #1976d2' }}>
                    <h4 style={{ margin: '0 0 12px', color: '#1565c0', fontSize: 16 }}>Project Manager (PM)</h4>
                    <div style={{ fontSize: 13, color: '#333', lineHeight: 1.8 }}>
                      <div style={{ marginBottom: 8 }}>
                        <strong>Formula:</strong>
                        <div style={{ background: '#fff', padding: 8, borderRadius: 4, marginTop: 4, fontFamily: 'monospace', fontSize: 12 }}>
                          (miles x ${driveRates.projectCommand}) + ${projectCommandRates.pmBase}
                        </div>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>Base Amount:</strong>
                        {pricingEditMode ? (
                          <input type="number" style={{ ...S.inputEdit, width: 100, marginLeft: 8 }}
                            value={projectCommandRates.pmBase}
                            onChange={e => setProjectCommandRates(prev => ({ ...prev, pmBase: parseFloat(e.target.value) || 0 }))}
                          />
                        ) : (
                          <span style={{ fontWeight: 700, color: '#1565c0', marginLeft: 8 }}>{fmtCurrency(projectCommandRates.pmBase)}</span>
                        )}
                      </div>
                      <div style={{ padding: 8, background: '#bbdefb', borderRadius: 4, fontSize: 12 }}>
                        <strong>Example:</strong> 30 miles<br/>
                        = (30 x ${driveRates.projectCommand}) + ${projectCommandRates.pmBase}<br/>
                        = ${30 * driveRates.projectCommand} + ${projectCommandRates.pmBase}<br/>
                        = <strong>{fmtCurrency(30 * driveRates.projectCommand + projectCommandRates.pmBase)}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Project Coordinator */}
                  <div style={{ padding: 20, background: '#fff3e0', borderRadius: 8, border: '2px solid #f57c00' }}>
                    <h4 style={{ margin: '0 0 12px', color: '#e65100', fontSize: 16 }}>Project Coordinator (PC)</h4>
                    <div style={{ fontSize: 13, color: '#333', lineHeight: 1.8 }}>
                      <div style={{ marginBottom: 8 }}>
                        <strong>Formula:</strong>
                        <div style={{ background: '#fff', padding: 8, borderRadius: 4, marginTop: 4, fontFamily: 'monospace', fontSize: 12 }}>
                          (PM / 2) + (miles x ${driveRates.projectCommand})
                        </div>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>Based on:</strong>
                        <span style={{ fontWeight: 600, color: '#e65100', marginLeft: 8 }}>Half of PM + drive</span>
                      </div>
                      <div style={{ padding: 8, background: '#ffe0b2', borderRadius: 4, fontSize: 12 }}>
                        {(() => {
                          const exPm = 30 * driveRates.projectCommand + projectCommandRates.pmBase;
                          const exPc = (exPm / 2) + (30 * driveRates.projectCommand);
                          return (<>
                            <strong>Example:</strong> 30 miles (PM = {fmtCurrency(exPm)})<br/>
                            = ({fmtCurrency(exPm)} / 2) + (30 x ${driveRates.projectCommand})<br/>
                            = {fmtCurrency(exPm / 2)} + ${30 * driveRates.projectCommand}<br/>
                            = <strong>{fmtCurrency(exPc)}</strong>
                          </>);
                        })()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Example Summary */}
                <div style={{ padding: 20, background: '#f5f5f5', borderRadius: 8, border: '2px solid #616161' }}>
                  <h4 style={{ margin: '0 0 12px', color: '#333' }}>Total Project Command - Example Summary</h4>
                  <div style={{ fontSize: 13, color: '#555', marginBottom: 12 }}>
                    Based on <strong>5 services</strong> and <strong>30 miles</strong> drive time:
                  </div>
                  {(() => {
                    const exMiles = 30, exSvc = 5;
                    const exPs = (exSvc * projectCommandRates.psPerService) + ((exMiles * driveRates.projectCommand) * exSvc);
                    const exPm = (exMiles * driveRates.projectCommand) + projectCommandRates.pmBase;
                    const exPc = (exPm / 2) + (exMiles * driveRates.projectCommand);
                    const exTotal = exPs + exPm + exPc;
                    return (
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr>
                            <th style={{ ...S.th, background: '#e0e0e0' }}>Role</th>
                            <th style={{ ...S.th, background: '#e0e0e0' }}>Calculation</th>
                            <th style={{ ...S.th, background: '#e0e0e0', textAlign: 'right' }}>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ ...S.td, fontWeight: 600, color: '#2e7d32' }}>Project Supervisor</td>
                            <td style={{ ...S.td, fontSize: 12, fontFamily: 'monospace' }}>({exSvc} x ${projectCommandRates.psPerService}) + ({exMiles} x ${driveRates.projectCommand} x {exSvc})</td>
                            <td style={{ ...S.td, textAlign: 'right', fontWeight: 700 }}>{fmtCurrency(exPs)}</td>
                          </tr>
                          <tr>
                            <td style={{ ...S.td, fontWeight: 600, color: '#1565c0' }}>Project Manager</td>
                            <td style={{ ...S.td, fontSize: 12, fontFamily: 'monospace' }}>({exMiles} x ${driveRates.projectCommand}) + ${projectCommandRates.pmBase}</td>
                            <td style={{ ...S.td, textAlign: 'right', fontWeight: 700 }}>{fmtCurrency(exPm)}</td>
                          </tr>
                          <tr>
                            <td style={{ ...S.td, fontWeight: 600, color: '#e65100' }}>Project Coordinator</td>
                            <td style={{ ...S.td, fontSize: 12, fontFamily: 'monospace' }}>({fmtCurrency(exPm)} / 2) + ({exMiles} x ${driveRates.projectCommand})</td>
                            <td style={{ ...S.td, textAlign: 'right', fontWeight: 700 }}>{fmtCurrency(exPc)}</td>
                          </tr>
                          <tr style={{ background: '#e8eaf6', fontWeight: 700 }}>
                            <td style={{ ...S.td, fontSize: 16 }}>TOTAL</td>
                            <td style={S.td}></td>
                            <td style={{ ...S.td, textAlign: 'right', fontSize: 18, color: '#2c5530' }}>{fmtCurrency(exTotal)}</td>
                          </tr>
                        </tbody>
                      </table>
                    );
                  })()}
                </div>

                {/* Editable Settings Summary */}
                <div style={{ marginTop: 16, padding: 16, background: '#f3e5f5', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 8px', color: '#7b1fa2' }}>Editable Project Command Settings</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={{ ...S.label, fontSize: 12 }}>PS Per-Service Rate</label>
                      {pricingEditMode ? (
                        <input type="number" style={S.input}
                          value={projectCommandRates.psPerService}
                          onChange={e => setProjectCommandRates(prev => ({ ...prev, psPerService: parseFloat(e.target.value) || 0 }))}
                        />
                      ) : (
                        <div style={{ padding: '12px 14px', background: '#fff', borderRadius: 6, fontWeight: 700, fontSize: 18 }}>${projectCommandRates.psPerService}</div>
                      )}
                    </div>
                    <div>
                      <label style={{ ...S.label, fontSize: 12 }}>PM Base Amount</label>
                      {pricingEditMode ? (
                        <input type="number" style={S.input}
                          value={projectCommandRates.pmBase}
                          onChange={e => setProjectCommandRates(prev => ({ ...prev, pmBase: parseFloat(e.target.value) || 0 }))}
                        />
                      ) : (
                        <div style={{ padding: '12px 14px', background: '#fff', borderRadius: 6, fontWeight: 700, fontSize: 18 }}>{fmtCurrency(projectCommandRates.pmBase)}</div>
                      )}
                    </div>
                    <div>
                      <label style={{ ...S.label, fontSize: 12 }}>PC Drive Rate (edit in Drive tab)</label>
                      <div style={{ padding: '12px 14px', background: '#fff', borderRadius: 6, fontWeight: 700, fontSize: 18 }}>${driveRates.projectCommand}/mi</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Quote/Contract Confirmation Modal */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ ...S.card, textAlign: 'center', maxWidth: 420 }}>
            <h3 style={{ marginBottom: 8 }}>
              Delete this {contracts.some(c => c.id === deleteConfirm.id) ? 'contract' : 'quote'}?
            </h3>
            <p style={{ color: '#666', margin: '0 0 4px', fontSize: 14 }}>
              {deleteConfirm.homeModel !== 'NONE' ? deleteConfirm.homeModel : `${deleteConfirm.houseWidth}' × ${deleteConfirm.houseLength}'`}
            </p>
            <p style={{
              display: 'inline-block',
              padding: '2px 10px',
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 700,
              background: ['Accepted', 'Under Contract', 'Completed'].includes(deleteConfirm.status) ? '#dc3545' : '#ffc107',
              color: ['Accepted', 'Under Contract', 'Completed'].includes(deleteConfirm.status) ? '#fff' : '#000',
              marginBottom: 12
            }}>
              Status: {deleteConfirm.status}
            </p>
            {['Accepted', 'Under Contract', 'Completed', 'Cancelled'].includes(deleteConfirm.status) && (
              <p style={{ color: '#dc3545', fontWeight: 600, fontSize: 14, margin: '0 0 8px' }}>
                All associated data, change orders, payments, and files will be permanently lost.
              </p>
            )}
            <p style={{ color: '#666', fontSize: 13 }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
              <button style={S.btnDanger} onClick={() => delQuote(deleteConfirm.id)}>Yes, Delete</button>
              <button style={S.btn2} onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Customer Confirmation Modal */}
      {deleteCustomerConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ ...S.card, textAlign: 'center' }}>
            <h3>Delete {deleteCustomerConfirm.firstName} {deleteCustomerConfirm.lastName}?</h3>
            <p style={{ color: '#666' }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button style={S.btnDanger} onClick={() => { deleteCustomer(deleteCustomerConfirm.id); setDeleteCustomerConfirm(null); }}>Delete</button>
              <button style={S.btn2} onClick={() => setDeleteCustomerConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
