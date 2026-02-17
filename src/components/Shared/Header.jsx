/**
 * Application Header Component
 * Displays logo, user info, and navigation
 */

import React from 'react';
import { colors, layoutStyles } from './styles.js';

const Header = ({ user, onLogout, currentView }) => {
  return (
    <div style={layoutStyles.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
          Sherman Bidding System
        </h1>
        {currentView && (
          <span style={{ fontSize: 14, opacity: 0.9 }}>
            {currentView}
          </span>
        )}
      </div>
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <span style={{ fontSize: 14 }}>
            👤 {user.firstName} {user.lastName}
            {user.role && <span style={{ opacity: 0.8, marginLeft: 8 }}>({user.role})</span>}
          </span>
          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.2)',
                color: colors.white,
                border: `1px solid rgba(255,255,255,0.3)`,
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
