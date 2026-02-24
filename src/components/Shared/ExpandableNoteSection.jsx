/**
 * ExpandableNoteSection Component
 * Provides collapsible customer and crew note sections with publish/edit/delete
 */

import React from 'react';

const ExpandableNoteSection = ({
  serviceKey,
  customerNote,
  crewNote,
  isExpanded,
  onToggleExpand,
  onUpdateCustomerNote,
  onUpdateCrewNote,
  publishedCustomerNotes = [],
  publishedCrewNotes = [],
  onPublishCustomerNote,
  onPublishCrewNote,
  onEditCustomerNote,
  onEditCrewNote,
  onDeleteCustomerNote,
  onDeleteCrewNote,
  userName = 'User'
}) => {
  const [isCrewExpanded, setIsCrewExpanded] = React.useState(false);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Customer Note - Collapsible */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            background: '#e3f2fd',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          onClick={() => onToggleExpand(serviceKey)}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1565c0' }}>
            📋 Customer Note (shows on quote & scope of work) {publishedCustomerNotes.length > 0 && `(${publishedCustomerNotes.length} published)`}
          </span>
          <span style={{ fontSize: 16, color: '#1565c0' }}>{isExpanded ? '▼' : '▶'}</span>
        </div>
        {isExpanded && (
          <div style={{ border: '1px solid #90caf9', borderTop: 'none', borderRadius: '0 0 4px 4px' }}>
            <textarea
              style={{
                width: '100%',
                minHeight: 100,
                padding: 12,
                fontSize: 14,
                fontFamily: 'inherit',
                border: 'none',
                borderBottom: customerNote ? '1px solid #90caf9' : 'none',
                borderRadius: 0,
                resize: 'vertical'
              }}
              placeholder="Add notes visible to customer..."
              value={customerNote || ''}
              onChange={e => onUpdateCustomerNote(serviceKey, e.target.value)}
            />
            {customerNote && (
              <div style={{ padding: '8px 12px', background: '#f5f5f5', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => onPublishCustomerNote(serviceKey)}
                  style={{
                    padding: '6px 16px',
                    background: '#1565c0',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  📤 Publish Note
                </button>
              </div>
            )}
            {publishedCustomerNotes.length > 0 && (
              <div style={{ padding: 12, background: '#f9f9f9', borderTop: '1px solid #90caf9' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1565c0', marginBottom: 8 }}>Published Notes:</div>
                {publishedCustomerNotes.map((note, idx) => (
                  <div key={idx} style={{ padding: 8, background: '#fff', borderRadius: 4, marginBottom: 6, border: '1px solid #e3f2fd' }}>
                    <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 4 }}>{note.text}</div>
                    <div style={{ fontSize: 11, color: '#999', marginBottom: 6 }}>
                      {formatDateTime(note.publishedAt)} by {note.publishedBy}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => onEditCustomerNote(serviceKey, idx)}
                        style={{
                          padding: '4px 12px',
                          background: '#1976d2',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 3,
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this published note?')) {
                            onDeleteCustomerNote(serviceKey, idx);
                          }
                        }}
                        style={{
                          padding: '4px 12px',
                          background: '#d32f2f',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 3,
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {!isExpanded && customerNote && (
          <div style={{
            padding: 8,
            fontSize: 12,
            color: '#666',
            background: '#f5f5f5',
            borderRadius: '0 0 4px 4px',
            fontStyle: 'italic'
          }}>
            {customerNote.slice(0, 60)}{customerNote.length > 60 ? '...' : ''}
          </div>
        )}
      </div>

      {/* Crew Note - Collapsible (Expanded by Default) */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            background: '#fff3e0',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          onClick={() => setIsCrewExpanded(!isCrewExpanded)}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: '#e65100' }}>
            🔧 Internal Crew Note (staff only - not visible to customer) {publishedCrewNotes.length > 0 && `(${publishedCrewNotes.length} published)`}
          </span>
          <span style={{ fontSize: 16, color: '#e65100' }}>{isCrewExpanded ? '▼' : '▶'}</span>
        </div>
        {isCrewExpanded && (
          <div style={{ border: '1px solid #ffb74d', borderTop: 'none', borderRadius: '0 0 4px 4px' }}>
            <textarea
              style={{
                width: '100%',
                minHeight: 100,
                padding: 12,
                fontSize: 14,
                fontFamily: 'inherit',
                border: 'none',
                borderBottom: crewNote ? '1px solid #ffb74d' : 'none',
                borderRadius: 0,
                resize: 'vertical'
              }}
              placeholder="Add internal notes for crew..."
              value={crewNote || ''}
              onChange={e => onUpdateCrewNote(serviceKey, e.target.value)}
            />
            {crewNote && (
              <div style={{ padding: '8px 12px', background: '#f5f5f5', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => onPublishCrewNote(serviceKey)}
                  style={{
                    padding: '6px 16px',
                    background: '#e65100',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  📤 Publish Note
                </button>
              </div>
            )}
            {publishedCrewNotes.length > 0 && (
              <div style={{ padding: 12, background: '#f9f9f9', borderTop: '1px solid #ffb74d' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#e65100', marginBottom: 8 }}>Published Notes:</div>
                {publishedCrewNotes.map((note, idx) => (
                  <div key={idx} style={{ padding: 8, background: '#fff', borderRadius: 4, marginBottom: 6, border: '1px solid #fff3e0' }}>
                    <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 4 }}>{note.text}</div>
                    <div style={{ fontSize: 11, color: '#999', marginBottom: 6 }}>
                      {formatDateTime(note.publishedAt)} by {note.publishedBy}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => onEditCrewNote(serviceKey, idx)}
                        style={{
                          padding: '4px 12px',
                          background: '#f57c00',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 3,
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this published note?')) {
                            onDeleteCrewNote(serviceKey, idx);
                          }
                        }}
                        style={{
                          padding: '4px 12px',
                          background: '#d32f2f',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 3,
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {!isCrewExpanded && crewNote && (
          <div style={{
            padding: 8,
            fontSize: 12,
            color: '#666',
            background: '#f5f5f5',
            borderRadius: '0 0 4px 4px',
            fontStyle: 'italic'
          }}>
            {crewNote.slice(0, 60)}{crewNote.length > 60 ? '...' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandableNoteSection;
