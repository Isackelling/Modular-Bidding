import { useState } from 'react';

/**
 * Groups Scope-of-Work editing state into one hook.
 * Replaces 3 individual useState calls in App.jsx.
 */
export const useScopeEditState = () => {
  const [scopeSections, setScopeSections] = useState({
    overview: false, roles: false, foundation: false,
    services: false, deliverables: false, exclusions: false, assumptions: false
  });
  const [scopeEditMode, setScopeEditMode]     = useState(false);
  const [scopeEditContent, setScopeEditContent] = useState(null);

  return {
    scopeSections, setScopeSections,
    scopeEditMode, setScopeEditMode,
    scopeEditContent, setScopeEditContent,
  };
};
