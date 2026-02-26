/**
 * Dashboard Component
 * Main view showing customer cards with search and summary stats
 */

import React from 'react';

const Dashboard = ({
  myCustomers,
  myQuotes,
  quotes,
  contracts,
  searchQuery,
  setSearchQuery,
  isAdmin,
  userName,
  fmtDate,
  onNewCustomer,
  onSelectCustomer,
  onDeleteCustomer,
  styles: S
}) => {
  // Filter customers based on search query
  const filtered = myCustomers.filter(c => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const custQuotes = quotes.filter(q => q.customerId === c.id);
    const custContracts = (contracts || []).filter(ct => ct.customerId === c.id);
    const matchesName = (c.firstName + ' ' + c.lastName).toLowerCase().includes(query);
    const matchesPhone = (c.phone || '').toLowerCase().includes(query);
    const matchesEmail = (c.email || '').toLowerCase().includes(query);
    const matchesAddress = ((c.siteAddress || '') + ' ' + (c.siteCity || '') + ' ' + (c.siteState || '') + ' ' + (c.siteZip || '')).toLowerCase().includes(query);
    const matchesQuoteNumber = [...custQuotes, ...custContracts].some(q =>
      (q.id || '').slice(-8).toUpperCase().toLowerCase().includes(query)
    );
    return matchesName || matchesPhone || matchesEmail || matchesAddress || matchesQuoteNumber;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0 }}>{isAdmin ? 'All Customers' : 'My Customers'}</h1>
          {!isAdmin && <p style={{ margin: '4px 0 0', color: '#666', fontSize: 14 }}>Showing customers created by {userName}</p>}
        </div>
        <button data-testid="new-customer-btn" style={{ ...S.btn, width: 'auto' }} onClick={onNewCustomer}>+ New Customer</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { l: 'Customers', v: myCustomers.length },
          { l: 'Total Quotes', v: myQuotes.length },
          { l: 'Accepted', v: myQuotes.filter(q => q.status === 'Accepted').length },
          { l: 'Draft', v: myQuotes.filter(q => q.status === 'Draft').length }
        ].map(s => (
          <div key={s.l} style={{ ...S.box, textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#2c5530' }}>{s.v}</div>
            <div style={{ color: '#666' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div style={{ ...S.box, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 18 }}>🔍</span>
          <input
            data-testid="search-input"
            type="text"
            placeholder="Search by name, phone, email, address, or quote number..."
            style={{ ...S.input, marginBottom: 0, flex: 1 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button style={{ ...S.btn2, padding: '8px 16px' }} onClick={() => setSearchQuery('')}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Customer Cards */}
      {myCustomers.length === 0 ? (
        <div style={{ ...S.box, textAlign: 'center', padding: 40 }}>
          <p style={{ fontSize: 18, marginBottom: 16 }}>No customers yet</p>
          <p style={{ color: '#666' }}>Create your first customer profile to get started with quotes.</p>
        </div>
      ) : (
        <div style={S.grid}>
          {filtered.length === 0 ? (
            <div style={{ ...S.box, textAlign: 'center', padding: 40, gridColumn: '1 / -1' }}>
              <p style={{ fontSize: 18, marginBottom: 16 }}>No customers found</p>
              <p style={{ color: '#666' }}>Try a different search term or clear the search.</p>
            </div>
          ) : (
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(c => {
              const custQuotes = quotes.filter(q => q.customerId === c.id && !q.changeOrderOf);
              const acceptedQuotes = custQuotes.filter(q => q.status === 'Accepted').length;
              const hasQuotes = custQuotes.length > 0;
              return (
                <div key={c.id} style={{ ...S.box, position: 'relative', cursor: 'pointer' }} onClick={() => onSelectCustomer(c)}>
                  <button
                    style={{ position: 'absolute', top: 8, right: 8, background: 'transparent', border: 'none', color: hasQuotes ? '#ccc' : '#dc3545', cursor: hasQuotes ? 'not-allowed' : 'pointer', fontSize: 16, padding: 4, zIndex: 10 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (hasQuotes) {
                        alert(`Cannot delete customer with ${custQuotes.length} quote(s). Delete quotes first.`);
                      } else {
                        onDeleteCustomer(c);
                      }
                    }}
                    title={hasQuotes ? `Has ${custQuotes.length} quote(s) - delete quotes first` : "Delete customer"}
                  >🗑️</button>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 24 }}>
                    <h3 style={{ margin: 0 }}>{c.firstName} {c.lastName}</h3>
                    {custQuotes.length > 0 && <span style={{ ...S.badge, background: acceptedQuotes > 0 ? '#d1e7dd' : '#e9ecef' }}>{custQuotes.length} quote{custQuotes.length !== 1 ? 's' : ''}</span>}
                  </div>
                  {c.person2FirstName && <p style={{ color: '#666', fontSize: 13, margin: '4px 0 0' }}>& {c.person2FirstName} {c.person2LastName}</p>}
                  <p style={{ color: '#666', fontSize: 13, marginTop: 8 }}>📍 {c.siteCity}, {c.siteState}</p>
                  <p style={{ color: '#666', fontSize: 13 }}>📞 {c.phone}</p>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>{fmtDate(c.createdAt)}{isAdmin && c.createdBy && ` • by ${c.createdBy}`}</div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
