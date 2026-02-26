/**
 * User Selector Component
 * After staff login, users select their username to set their role
 */

import React from 'react';

const UserSelector = ({
  users,
  tempName,
  setTempName,
  loginError,
  setLoginError,
  onSelectUser,
  styles: S
}) => {
  const handleSubmit = () => {
    // Special case: if no users exist, allow first admin setup
    if (users.length === 0 && tempName.toLowerCase() === 'admin') {
      onSelectUser({ role: 'admin', username: 'admin' });
      return;
    }

    const foundUser = users.find(u => u.username.toLowerCase() === tempName.toLowerCase());
    if (!foundUser) {
      setLoginError('Username not found. Please contact an admin to create your account.');
    } else {
      onSelectUser(foundUser);
    }
  };

  return (
    <div style={S.login}>
      <div style={{ ...S.card, maxWidth: 550 }}>
        <img
          src="https://shermanpolebuildings.com/wp-content/uploads/2021/07/SB-Logo-wide-144x61-1.png"
          alt="Sherman"
          style={{ maxWidth: 180, marginBottom: 16 }}
        />
        <h2 style={{ margin: '0 0 8px' }}>Welcome!</h2>
        <p style={{ color: '#666', marginBottom: 20 }}>Select your username to continue</p>

        <input
          data-testid="user-selector-input"
          type="text"
          placeholder="Enter your username..."
          style={S.input}
          value={tempName}
          onChange={e => { setTempName(e.target.value); setLoginError(''); }}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
        {loginError && (
          <p style={{ color: '#dc3545', margin: '0 0 12px', fontSize: 14 }}>{loginError}</p>
        )}

        {users.length === 0 ? (
          <div style={{ background: '#fff3cd', padding: 12, borderRadius: 6, marginBottom: 16 }}>
            <p style={{ margin: 0, fontSize: 13, color: '#856404' }}>
              <strong>First Time Setup:</strong> No users exist yet. Enter "admin" as username to create the first admin account.
            </p>
          </div>
        ) : (
          <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8, marginBottom: 16, textAlign: 'left' }}>
            <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#333' }}>👥 Available Users</p>
            <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #dee2e6' }}>
                  <th style={{ textAlign: 'left', padding: '8px', color: '#666' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: '#666' }}>Username</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: '#666' }}>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr
                    key={u.id}
                    data-testid={`select-user-${u.username}`}
                    style={{
                      borderBottom: '1px solid #eee',
                      cursor: 'pointer',
                      background: tempName.toLowerCase() === u.username.toLowerCase() ? '#e8f5e9' : 'transparent'
                    }}
                    onClick={() => setTempName(u.username)}
                  >
                    <td style={{ padding: '10px 8px' }}>{u.fullName}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <code style={{ background: '#e9ecef', padding: '3px 8px', borderRadius: 4, fontWeight: 600 }}>{u.username}</code>
                    </td>
                    <td style={{ padding: '10px 8px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        background: u.role === 'admin' ? '#dc3545' : u.role === 'sales' ? '#0d6efd' : '#198754',
                        color: '#fff'
                      }}>{u.role}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ margin: '12px 0 0', fontSize: 12, color: '#666' }}>
              💡 <strong>Tip:</strong> Click on a row to select that user, or type the username above.
            </p>
          </div>
        )}

        <button
          data-testid="user-selector-continue"
          style={{ ...S.btn, opacity: !tempName ? 0.5 : 1 }}
          disabled={!tempName}
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default UserSelector;
