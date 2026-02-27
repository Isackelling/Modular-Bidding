import { useState } from 'react';

/**
 * Groups all UI/tab/collapse/confirmation useState declarations into one hook.
 * Replaces 22 individual useState calls in App.jsx.
 */
export const useUIState = () => {
  // Tab & mode state
  const [quoteTab, setQuoteTab]                       = useState('details');
  const [generalNoteMode, setGeneralNoteMode]         = useState(null); // 'crew' | 'customer' | null
  const [generalNoteDraft, setGeneralNoteDraft]       = useState('');
  const [crewTab, setCrewTab]                         = useState('jobs');
  const [pricingTab, setPricingTab]                   = useState('homes');
  const [pricingEditMode, setPricingEditMode]         = useState(false);
  const [expandedServiceNotes, setExpandedServiceNotes] = useState({});

  // Collapse/expand state
  const [installSvcCollapsed, setInstallSvcCollapsed] = useState(true);
  const [proSvcCollapsed, setProSvcCollapsed]         = useState(false);
  const [homeSelCollapsed, setHomeSelCollapsed]       = useState(false);
  const [houseSpecsCollapsed, setHouseSpecsCollapsed] = useState(false);

  // Confirmation dialogs
  const [deleteConfirm, setDeleteConfirm]               = useState(null);
  const [deleteCustomerConfirm, setDeleteCustomerConfirm] = useState(null);
  const [showRestoreMaterials, setShowRestoreMaterials] = useState(false);

  // Section expansions (view quote page)
  const [isPierDiagramExpanded, setIsPierDiagramExpanded]             = useState(false);
  const [isFloorPlanExpanded, setIsFloorPlanExpanded]                 = useState(false);
  const [isPierDiagramExpandedSummary, setIsPierDiagramExpandedSummary] = useState(false);
  const [isChangeOrderHistoryExpanded, setIsChangeOrderHistoryExpanded] = useState(true);
  const [expandedCO, setExpandedCO]                                   = useState({});

  return {
    quoteTab, setQuoteTab,
    generalNoteMode, setGeneralNoteMode,
    generalNoteDraft, setGeneralNoteDraft,
    crewTab, setCrewTab,
    pricingTab, setPricingTab,
    pricingEditMode, setPricingEditMode,
    expandedServiceNotes, setExpandedServiceNotes,
    installSvcCollapsed, setInstallSvcCollapsed,
    proSvcCollapsed, setProSvcCollapsed,
    homeSelCollapsed, setHomeSelCollapsed,
    houseSpecsCollapsed, setHouseSpecsCollapsed,
    deleteConfirm, setDeleteConfirm,
    deleteCustomerConfirm, setDeleteCustomerConfirm,
    showRestoreMaterials, setShowRestoreMaterials,
    isPierDiagramExpanded, setIsPierDiagramExpanded,
    isFloorPlanExpanded, setIsFloorPlanExpanded,
    isPierDiagramExpandedSummary, setIsPierDiagramExpandedSummary,
    isChangeOrderHistoryExpanded, setIsChangeOrderHistoryExpanded,
    expandedCO, setExpandedCO,
  };
};
