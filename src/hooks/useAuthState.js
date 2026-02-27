import { useState } from 'react';

/**
 * Groups all authentication-related useState declarations into one hook.
 * Replaces 11 individual useState calls in App.jsx.
 */
export const useAuthState = () => {
  const [isAuth, setIsAuth]                 = useState(true);
  const [isCustomerPortal, setIsCustomerPortal] = useState(false);
  const [customerData, setCustomerData]     = useState(null);
  const [userRole, setUserRole]             = useState('sales');
  const [originalRole, setOriginalRole]     = useState('admin');
  const [userName, setUserName]             = useState('SHERMAN');
  const [loginU, setLoginU]                 = useState('');
  const [loginP, setLoginP]                 = useState('');
  const [loginError, setLoginError]         = useState('');
  const [tempName, setTempName]             = useState('');
  const [tempRole, setTempRole]             = useState('');

  return {
    isAuth, setIsAuth,
    isCustomerPortal, setIsCustomerPortal,
    customerData, setCustomerData,
    userRole, setUserRole,
    originalRole, setOriginalRole,
    userName, setUserName,
    loginU, setLoginU,
    loginP, setLoginP,
    loginError, setLoginError,
    tempName, setTempName,
    tempRole, setTempRole,
  };
};
