import { useState } from 'react';

/**
 * Groups quote-editing-related useState declarations into one hook.
 * Replaces 6 individual useState calls in App.jsx.
 *
 * @param {Function} emptyQuoteFn - Factory function returning a blank quote object
 */
export const useQuoteEditingState = (emptyQuoteFn) => {
  const [newQ, setNewQ]                                       = useState(emptyQuoteFn());
  const [editingQuoteId, setEditingQuoteId]                   = useState(null);
  const [originalQuoteForComparison, setOriginalQuoteForComparison] = useState(null);
  const [changeOrderDeletions, setChangeOrderDeletions]       = useState([]);
  const [changeOrderAdjustments, setChangeOrderAdjustments]   = useState({});
  const [changeOrderAdditions, setChangeOrderAdditions]       = useState([]);

  return {
    newQ, setNewQ,
    editingQuoteId, setEditingQuoteId,
    originalQuoteForComparison, setOriginalQuoteForComparison,
    changeOrderDeletions, setChangeOrderDeletions,
    changeOrderAdjustments, setChangeOrderAdjustments,
    changeOrderAdditions, setChangeOrderAdditions,
  };
};
