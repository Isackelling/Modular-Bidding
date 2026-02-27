import { useState } from 'react';

/**
 * Groups all Scrubb-tab-specific useState declarations into one hook.
 * Replaces 13 individual useState calls in App.jsx.
 *
 * Usage in App.jsx:
 *   const scrubb = useScrubbState();
 *   const { showPermitModal, setShowPermitModal, ... } = scrubb;
 */
export const useScrubbState = () => {
  const [scrubbEditingService, setScrubbEditingService] = useState(null);
  const [scrubbNewCost, setScrubbNewCost]               = useState('');
  const [nhlExpanded, setNhlExpanded]                   = useState(false);

  // Permit entry modal
  const [showPermitModal, setShowPermitModal]         = useState(false);
  const [editingPermitEntry, setEditingPermitEntry]   = useState(null);
  const [permitEntryName, setPermitEntryName]         = useState('');
  const [permitEntryCost, setPermitEntryCost]         = useState('');

  // Additional materials modal
  const [showAddlMaterialModal, setShowAddlMaterialModal]     = useState(false);
  const [editingMaterialEntry, setEditingMaterialEntry]       = useState(null);
  const [materialEntryName, setMaterialEntryName]             = useState('');
  const [materialEntryCost, setMaterialEntryCost]             = useState('');

  // Payment form
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [newPayment, setNewPayment]           = useState({ amount: '', date: '', notes: '', isContingencyPayment: false });

  return {
    scrubbEditingService, setScrubbEditingService,
    scrubbNewCost, setScrubbNewCost,
    nhlExpanded, setNhlExpanded,
    showPermitModal, setShowPermitModal,
    editingPermitEntry, setEditingPermitEntry,
    permitEntryName, setPermitEntryName,
    permitEntryCost, setPermitEntryCost,
    showAddlMaterialModal, setShowAddlMaterialModal,
    editingMaterialEntry, setEditingMaterialEntry,
    materialEntryName, setMaterialEntryName,
    materialEntryCost, setMaterialEntryCost,
    showPaymentForm, setShowPaymentForm,
    newPayment, setNewPayment,
  };
};
