import React from 'react';
import { S } from '../../utils/appStyles.js';

/**
 * Generic name + cost entry modal.
 * Replaces the duplicate permit and material modal implementations.
 *
 * @param {boolean} show - Whether to display the modal
 * @param {string}  title - Modal heading ("Add Permit", "Edit Material", etc.)
 * @param {string}  nameLabel - Label for the name field
 * @param {string}  namePlaceholder - Placeholder for the name input
 * @param {string}  costLabel - Label for the cost field
 * @param {string}  saveLabel - Text for the save button
 * @param {string}  entryName - Controlled name value
 * @param {string}  entryCost - Controlled cost value
 * @param {Function} setEntryName - Setter for name
 * @param {Function} setEntryCost - Setter for cost
 * @param {Function} onSave - Called when save button is clicked (validation lives in caller)
 * @param {Function} onClose - Called when cancel button or overlay is clicked
 */
const EntryModal = ({
  show,
  title,
  nameLabel = 'Name',
  namePlaceholder = '',
  costLabel = 'Cost',
  saveLabel = 'Save',
  entryName,
  entryCost,
  setEntryName,
  setEntryCost,
  onSave,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: '#fff', padding: 32, borderRadius: 8,
        maxWidth: 500, width: '90%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{ ...S.label, color: '#333' }}>{nameLabel}</label>
          <input
            type="text"
            style={S.input}
            value={entryName}
            onChange={e => setEntryName(e.target.value)}
            placeholder={namePlaceholder}
            autoFocus
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ ...S.label, color: '#333' }}>{costLabel}</label>
          <input
            type="number"
            style={S.input}
            value={entryCost}
            onChange={e => setEntryCost(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button style={{ ...S.btn2, background: '#666' }} onClick={onClose}>Cancel</button>
          <button style={S.btn} onClick={onSave}>{saveLabel}</button>
        </div>
      </div>
    </div>
  );
};

export default EntryModal;
