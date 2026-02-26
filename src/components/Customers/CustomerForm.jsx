/**
 * Customer Form Component
 * Form for creating new customers or editing existing ones
 */

import React from 'react';
import { S } from '../../utils/appStyles.js';

const CustomerForm = ({
  newCust,
  updateCustField,
  editingCustomerId,
  showCustSecondContact,
  setShowCustSecondContact,
  showCustMailingAddress,
  setShowCustMailingAddress,
  onSave,
  onCancel,
}) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0 }}>{editingCustomerId ? '✏️ Edit Customer' : '👤 New Customer'}</h1>
          {editingCustomerId && <p style={{ color: '#666', margin: '4px 0 0' }}>Editing: {newCust.firstName} {newCust.lastName}</p>}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={S.btn2} onClick={onCancel}>Cancel</button>
          <button data-testid="save-customer-btn" style={{ ...S.btn, width: 'auto' }} onClick={onSave}>💾 {editingCustomerId ? 'Update' : 'Save Customer'}</button>
        </div>
      </div>

      <div style={S.box}>
        <h2 style={{ marginTop: 0, borderBottom: '2px solid #2c5530', paddingBottom: 8 }}>Contact Information</h2>
        <h4 style={{ margin: '0 0 12px', color: '#2c5530' }}>Primary Contact</h4>
        <div style={S.row}>
          <div>
            <label style={{ ...S.label, color: '#dc3545' }}>First Name *</label>
            <input data-testid="customer-firstName" style={{ ...S.input, borderColor: '#dc3545' }} value={newCust.firstName} onChange={e => updateCustField('firstName', e.target.value)} />
          </div>
          <div>
            <label style={{ ...S.label, color: '#dc3545' }}>Last Name *</label>
            <input data-testid="customer-lastName" style={{ ...S.input, borderColor: '#dc3545' }} value={newCust.lastName} onChange={e => updateCustField('lastName', e.target.value)} />
          </div>
        </div>
        <div style={S.row}>
          <div>
            <label style={{ ...S.label, color: '#dc3545' }}>Phone *</label>
            <input data-testid="customer-phone" style={{ ...S.input, borderColor: '#dc3545' }} value={newCust.phone} onChange={e => updateCustField('phone', e.target.value)} />
          </div>
          <div>
            <label style={{ ...S.label, color: '#dc3545' }}>Email *</label>
            <input data-testid="customer-email" style={{ ...S.input, borderColor: '#dc3545' }} type="email" value={newCust.email} onChange={e => updateCustField('email', e.target.value)} />
          </div>
        </div>

        {/* Second Contact (collapsible) */}
        <div style={{ borderTop: '1px solid #eee', marginTop: 16, paddingTop: 12 }}>
          <button
            type="button"
            onClick={() => setShowCustSecondContact(!showCustSecondContact)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#2c5530', fontSize: 14, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span style={{ fontSize: 12 }}>{showCustSecondContact ? '▼' : '▶'}</span>
            <span>Second Contact {newCust.person2FirstName && `(${newCust.person2FirstName} ${newCust.person2LastName})`}</span>
          </button>
          {showCustSecondContact && (
            <div style={{ marginTop: 12 }}>
              <div style={S.row}>
                <div><label style={S.label}>First Name</label><input style={S.input} value={newCust.person2FirstName} onChange={e => updateCustField('person2FirstName', e.target.value)} /></div>
                <div><label style={S.label}>Last Name</label><input style={S.input} value={newCust.person2LastName} onChange={e => updateCustField('person2LastName', e.target.value)} /></div>
              </div>
              <div style={S.row}>
                <div><label style={S.label}>Phone 2</label><input style={S.input} value={newCust.phone2} onChange={e => updateCustField('phone2', e.target.value)} /></div>
                <div><label style={S.label}>Email 2</label><input style={S.input} type="email" value={newCust.email2} onChange={e => updateCustField('email2', e.target.value)} /></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={S.box}>
        <h2 style={{ marginTop: 0, borderBottom: '2px solid #2c5530', paddingBottom: 8 }}>Site Address (Installation Location)</h2>
        <div>
          <label style={{ ...S.label, color: '#dc3545' }}>Address *</label>
          <input data-testid="customer-siteAddress" style={{ ...S.input, borderColor: '#dc3545' }} value={newCust.siteAddress} onChange={e => updateCustField('siteAddress', e.target.value)} />
        </div>
        <div style={S.row}>
          <div><label style={S.label}>City</label><input data-testid="customer-siteCity" style={S.input} value={newCust.siteCity} onChange={e => updateCustField('siteCity', e.target.value)} /></div>
          <div><label style={S.label}>State</label><input data-testid="customer-siteState" style={S.input} value={newCust.siteState} onChange={e => updateCustField('siteState', e.target.value)} /></div>
          <div><label style={S.label}>Zip</label><input data-testid="customer-siteZip" style={S.input} value={newCust.siteZip} onChange={e => updateCustField('siteZip', e.target.value)} /></div>
        </div>
        <div><label style={S.label}>County</label><input data-testid="customer-siteCounty" style={S.input} value={newCust.siteCounty} onChange={e => updateCustField('siteCounty', e.target.value)} /></div>

        {/* Mailing Address (collapsible) */}
        <div style={{ borderTop: '1px solid #eee', marginTop: 16, paddingTop: 12 }}>
          <button
            type="button"
            onClick={() => setShowCustMailingAddress(!showCustMailingAddress)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#2c5530', fontSize: 14, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span style={{ fontSize: 12 }}>{showCustMailingAddress ? '▼' : '▶'}</span>
            <span>Mailing Address {newCust.mailingAddress && `(${newCust.mailingCity}, ${newCust.mailingState})`}</span>
          </button>
          {showCustMailingAddress && (
            <div style={{ marginTop: 12 }}>
              <div><label style={S.label}>Address</label><input style={S.input} value={newCust.mailingAddress} onChange={e => updateCustField('mailingAddress', e.target.value)} /></div>
              <div style={S.row}>
                <div><label style={S.label}>City</label><input style={S.input} value={newCust.mailingCity} onChange={e => updateCustField('mailingCity', e.target.value)} /></div>
                <div><label style={S.label}>State</label><input style={S.input} value={newCust.mailingState} onChange={e => updateCustField('mailingState', e.target.value)} /></div>
                <div><label style={S.label}>Zip</label><input style={S.input} value={newCust.mailingZip} onChange={e => updateCustField('mailingZip', e.target.value)} /></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
