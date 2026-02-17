/**
 * Reusable UI component helpers
 * Note: These are component factories, not actual React components
 * In practice, inline JSX is often better for complex forms
 */

import React from 'react';

export const UIComponents = {
  /**
   * Text input with label
   */
  TextInput: ({ label, value, onChange, placeholder = '', required = false, style = {} }) => {
    return (
      <div style={{ marginBottom: 15, ...style }}>
        {label && (
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600, fontSize: 13 }}>
            {label}{required && <span style={{ color: '#dc3545' }}>*</span>}
          </label>
        )}
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          style={{ width: '100%', padding: '8px 12px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14, boxSizing: 'border-box' }}
        />
      </div>
    );
  },

  /**
   * Number input with label
   */
  NumberInput: ({ label, value, onChange, placeholder = '', required = false, min, max, step, style = {} }) => {
    return (
      <div style={{ marginBottom: 15, ...style }}>
        {label && (
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600, fontSize: 13 }}>
            {label}{required && <span style={{ color: '#dc3545' }}>*</span>}
          </label>
        )}
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
          style={{ width: '100%', padding: '8px 12px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14, boxSizing: 'border-box' }}
        />
      </div>
    );
  },

  /**
   * Select dropdown with label
   */
  SelectInput: ({ label, value, onChange, options, required = false, style = {} }) => {
    return (
      <div style={{ marginBottom: 15, ...style }}>
        {label && (
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600, fontSize: 13 }}>
            {label}{required && <span style={{ color: '#dc3545' }}>*</span>}
          </label>
        )}
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          style={{ width: '100%', padding: '8px 12px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14, boxSizing: 'border-box', background: 'white' }}
        >
          {options.map((opt) => (
            <option key={typeof opt === 'object' ? opt.value : opt} value={typeof opt === 'object' ? opt.value : opt}>
              {typeof opt === 'object' ? opt.label : opt}
            </option>
          ))}
        </select>
      </div>
    );
  },

  /**
   * Textarea with label
   */
  TextArea: ({ label, value, onChange, placeholder = '', required = false, rows = 3, style = {} }) => {
    return (
      <div style={{ marginBottom: 15, ...style }}>
        {label && (
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600, fontSize: 13 }}>
            {label}{required && <span style={{ color: '#dc3545' }}>*</span>}
          </label>
        )}
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          style={{ width: '100%', padding: '8px 12px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14, boxSizing: 'border-box', resize: 'vertical' }}
        />
      </div>
    );
  }
};
