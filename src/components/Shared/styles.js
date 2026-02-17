/**
 * Shared styles and CSS constants used throughout the application
 * Centralized styling for consistency
 */

// Color palette
export const colors = {
  primary: '#2c5530',      // Sherman green
  primaryLight: '#e8f5e9',
  primaryDark: '#1a3a1f',
  secondary: '#1565c0',    // Blue for secondary actions
  secondaryLight: '#e3f2fd',
  danger: '#dc3545',       // Red for errors/deletions
  warning: '#ffc107',      // Yellow for warnings
  warningLight: '#fff9e6',
  success: '#28a745',      // Green for success
  info: '#17a2b8',         // Teal for info
  gray: '#666',
  grayLight: '#f8f9fa',
  grayMedium: '#ddd',
  grayDark: '#333',
  white: '#fff',
  black: '#000',
};

// Common button styles
export const buttonStyles = {
  base: {
    padding: '10px 20px',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    transition: 'all 0.2s ease',
  },
  primary: {
    background: colors.primary,
    color: colors.white,
  },
  secondary: {
    background: colors.secondary,
    color: colors.white,
  },
  danger: {
    background: colors.danger,
    color: colors.white,
  },
  success: {
    background: colors.success,
    color: colors.white,
  },
  outline: {
    background: 'transparent',
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

// Common input styles
export const inputStyles = {
  base: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 4,
    border: `1px solid ${colors.grayMedium}`,
    fontSize: 14,
    boxSizing: 'border-box',
  },
  label: {
    display: 'block',
    marginBottom: 5,
    fontWeight: 600,
    fontSize: 13,
    color: colors.grayDark,
  },
  container: {
    marginBottom: 15,
  },
};

// Card/section styles
export const cardStyles = {
  base: {
    background: colors.white,
    borderRadius: 8,
    padding: 20,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.grayDark,
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: `2px solid ${colors.primary}`,
  },
};

// Layout styles
export const layoutStyles = {
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: 20,
  },
  header: {
    background: colors.primary,
    color: colors.white,
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  sidebar: {
    width: 280,
    background: colors.grayLight,
    borderRadius: 8,
    padding: 20,
    marginRight: 20,
  },
  mainContent: {
    flex: 1,
  },
};

// Table styles
export const tableStyles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 10,
  },
  th: {
    padding: 12,
    background: colors.primary,
    color: colors.white,
    textAlign: 'left',
    fontWeight: 600,
    borderBottom: `2px solid ${colors.primaryDark}`,
  },
  td: {
    padding: 10,
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  trHover: {
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
};

// Utility functions
export const combineStyles = (...styles) => {
  return Object.assign({}, ...styles);
};

export const responsive = {
  mobile: '@media (max-width: 768px)',
  tablet: '@media (max-width: 1024px)',
  desktop: '@media (min-width: 1025px)',
};
