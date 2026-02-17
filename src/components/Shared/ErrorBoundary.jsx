/**
 * Error Boundary Component
 * Catches React errors and displays fallback UI with error details
 */

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h1 style={{ color: '#dc3545', marginTop: 0 }}>⚠️ Something Went Wrong</h1>
          <p style={{ color: '#666', lineHeight: 1.6 }}>
            The application encountered an unexpected error. Please try refreshing the page.
          </p>
          <details style={{ marginTop: 20, padding: 12, background: '#f8f9fa', borderRadius: 4, fontSize: 12, fontFamily: 'monospace' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 600, marginBottom: 8 }}>Error Details</summary>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {this.state.error && this.state.error.toString()}
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: 20, padding: '12px 24px', background: '#2c5530', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
