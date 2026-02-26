/**
 * Login Form Component
 * Handles both staff login (SHERMAN/BIDDING) and customer portal login
 */

import React from 'react';

const LoginForm = ({
  loginU,
  setLoginU,
  loginP,
  setLoginP,
  loginError,
  onLogin,
  styles: S
}) => {
  return (
    <div style={S.login}>
      <div style={S.card}>
        <img
          src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png"
          alt="Sherman"
          style={{ maxWidth: 180, marginBottom: 20 }}
        />
        <h2 style={{ margin: '0 0 8px', color: '#333' }}>Bidding System</h2>
        <p style={{ color: '#666', marginBottom: 24 }}>Manufactured Home Installation</p>

        <input
          data-testid="login-username"
          type="text"
          placeholder="Username"
          style={S.input}
          value={loginU}
          onChange={e => setLoginU(e.target.value)}
        />
        <input
          data-testid="login-password"
          type="password"
          placeholder="Password"
          style={S.input}
          value={loginP}
          onChange={e => setLoginP(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onLogin()}
        />
        {loginError && (
          <p style={{ color: '#dc3545', margin: '0 0 12px' }}>{loginError}</p>
        )}
        <button data-testid="login-btn" style={S.btn} onClick={onLogin}>Sign In</button>

        <div style={{ marginTop: 20, padding: 12, background: '#e8f5e9', borderRadius: 6, textAlign: 'left' }}>
          <p style={{ margin: 0, fontSize: 13, color: '#2c5530' }}>
            <strong>👷 Staff Login</strong>
          </p>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#666' }}>
            Username: <code style={{ background: '#fff', padding: '2px 6px', borderRadius: 3 }}>SHERMAN</code><br/>
            Password: <code style={{ background: '#fff', padding: '2px 6px', borderRadius: 3 }}>BIDDING</code>
          </p>
        </div>

        <div style={{ marginTop: 12, padding: 12, background: '#e3f2fd', borderRadius: 6, textAlign: 'left' }}>
          <p style={{ margin: 0, fontSize: 13, color: '#1565c0' }}>
            <strong>🏠 Customer Portal</strong>
          </p>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#666' }}>
            Username: <code style={{ background: '#fff', padding: '2px 6px', borderRadius: 3 }}>firstnamelastname</code> (no spaces)<br/>
            Password: <code style={{ background: '#fff', padding: '2px 6px', borderRadius: 3 }}>mybid</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
