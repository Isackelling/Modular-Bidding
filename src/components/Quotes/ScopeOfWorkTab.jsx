import React from 'react';
import { DocumentUtils } from '../../utils/index.js';

/**
 * ScopeOfWorkTab - The "Scope of Work" tab for accepted/contracted quotes.
 * Contains 8 collapsible sections covering project overview, roles,
 * foundation specs, services, deliverables, exclusions, assumptions, and acknowledgment.
 */
const ScopeOfWorkTab = ({
  S, currentItem, custForQuote,
  customers, services,
  scopeEditMode, scopeEditContent,
  scopeSections, setScopeSections,
  enterScopeEditMode,
  saveScopeChanges,
  cancelScopeEdit,
  updateScopeField,
  generateScopeOfWorkDocument,
}) => {
  // Re-derive custForQuote from customers if needed (original code does this)
  const custLocal = customers.find(c => c.id === currentItem.customerId) || custForQuote || {};
  const today = DocumentUtils.formatDate();
  const quoteNum = DocumentUtils.getQuoteNum(currentItem);

  // Get all selected services with details
  const selectedServicesList = Object.entries(currentItem.selectedServices || {})
    .filter(([key, selected]) => selected)
    .map(([key]) => ({
      key,
      name: services[key]?.name || key,
      description: services[key]?.description || ''
    }));

  // Foundation type descriptions
  const foundationTypes = {
    slab: {
      name: 'Concrete Slab Foundation',
      description: 'Monolithic concrete slab on grade with integrated footings',
      specifications: [
        'Minimum 4" thick concrete slab (3000 PSI)',
        '6" compacted gravel base',
        '6-mil polyethylene vapor barrier',
        'Wire mesh reinforcement (WWF 6x6 W1.4xW1.4)',
        'Perimeter frost footings per local code',
        'Anchor bolts for home attachment'
      ],
      workIncluded: [
        'Site excavation and rough grading (up to 6" cut/fill)',
        'Removal of topsoil and organic material in foundation area',
        'Installation of compacted gravel base',
        'Installation of vapor barrier',
        'Setting grade stakes and forming',
        'Pouring and finishing concrete slab',
        'Installation of anchor bolts per manufacturer specs',
        'Minimum 7-day cure time before home installation',
        'Final grade and slope for drainage away from foundation'
      ],
      excluded: [
        'Excavation exceeding 6" depth (rock, excessive soil removal)',
        'Removal of trees, stumps, or large obstacles',
        'Utility trenching and connections',
        'Site access road or driveway construction',
        'Permits (unless separately contracted)',
        'Dewatering or soil stabilization for poor soil conditions'
      ]
    },
    crawlspace: {
      name: 'Crawl Space Foundation',
      description: 'Elevated foundation with perimeter walls and ventilated crawl space',
      specifications: [
        'Concrete block or poured concrete perimeter walls',
        'Concrete footings per local frost depth requirements',
        'Minimum 18" crawl space height',
        'Pressure-treated sill plates',
        'Foundation vents (1 sq ft per 150 sq ft of crawl space)',
        'Access door (minimum 18" x 24")'
      ],
      workIncluded: [
        'Site excavation and rough grading',
        'Excavation for footings per local frost depth',
        'Pouring concrete footings',
        'Construction of perimeter foundation walls',
        'Installation of sill plates with anchor bolts',
        'Installation of foundation vents',
        'Installation of crawl space access door',
        '6-mil vapor barrier over crawl space floor',
        'Backfilling and compaction around foundation',
        'Final grade sloped away from foundation'
      ],
      excluded: [
        'Interior crawl space insulation',
        'Crawl space encapsulation or conditioning',
        'Pest control treatments or barriers',
        'Plumbing or electrical rough-ins',
        'Excessive excavation for rock or poor soil',
        'Drainage systems beyond perimeter grading'
      ]
    },
    basement: {
      name: 'Full Basement Foundation',
      description: 'Full-depth excavated basement with concrete walls and floor',
      specifications: [
        'Poured concrete or concrete block walls (8" minimum)',
        'Concrete footings sized per load requirements',
        'Minimum 7\'6" clear height inside basement',
        '4" concrete floor slab with gravel base',
        'Exterior waterproofing and drainage board',
        'Perimeter drain tile system',
        'At least one egress window per building code',
        'Sump pump pit (if required by site conditions)'
      ],
      workIncluded: [
        'Full-depth basement excavation',
        'Excavation for footings',
        'Installation of perimeter drain tile and gravel',
        'Pouring concrete footings',
        'Construction of basement walls',
        'Exterior waterproofing application',
        'Installation of drainage board',
        'Backfilling and compaction',
        'Installation of egress window wells and windows',
        'Pouring basement floor slab',
        'Installation of sump pump pit (if needed)',
        'Final grading around foundation'
      ],
      excluded: [
        'Interior basement finishing (framing, drywall, flooring)',
        'Additional windows beyond minimum egress requirements',
        'Plumbing fixtures and final connections',
        'Electrical fixtures and final connections',
        'HVAC installation',
        'Basement stairs (unless specifically quoted)',
        'Interior drainage systems',
        'Radon mitigation systems'
      ]
    }
  };

  const foundationType = currentItem.foundationType || 'slab';
  const foundation = foundationTypes[foundationType] || foundationTypes.slab;

  /** Helper to render a checkmark list item */
  const CheckItem = ({ children }) => (
    <li style={{ padding: '10px 0 10px 32px', position: 'relative', fontSize: 15, lineHeight: 1.6 }}>
      <span style={{ position: 'absolute', left: 0, color: '#28a745', fontWeight: 900, fontSize: 20 }}>{'\u2713'}</span>
      {children}
    </li>
  );

  /** Helper to render an X list item */
  const ExcludeItem = ({ children }) => (
    <li style={{ padding: '10px 0 10px 32px', position: 'relative', fontSize: 15, lineHeight: 1.6, color: '#666' }}>
      <span style={{ position: 'absolute', left: 0, color: '#dc3545', fontWeight: 900, fontSize: 20 }}>{'\u2717'}</span>
      {children}
    </li>
  );

  /** Section header style */
  const sectionHeaderStyle = {
    fontSize: 26, fontWeight: 800, color: '#2c5530', margin: '50px 0 24px',
    borderBottom: '4px solid #2c5530', paddingBottom: 10,
    textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer'
  };

  /** Phase banner style */
  const phaseBannerStyle = {
    background: '#fff', borderLeft: '6px solid #1565c0', padding: 20,
    margin: '20px 0', borderRadius: 6, boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
  };

  /** Card style */
  const cardStyle = {
    background: '#fff', border: '2px solid #dee2e6', borderRadius: 10,
    padding: 24, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  };

  /** Sub-heading style */
  const subHeadingStyle = {
    fontSize: 19, fontWeight: 700, color: '#1565c0', margin: '28px 0 14px',
    borderLeft: '4px solid #1565c0', paddingLeft: 12
  };

  return (
    <div style={{ ...S.box, maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: 30, borderRadius: 8, marginBottom: 40, borderBottom: '5px solid #2c5530' }}>
        <h1 style={{ margin: 0, fontSize: 42, fontWeight: 900, color: '#2c5530', letterSpacing: '-1px' }}>SCOPE OF WORK</h1>
        <p style={{ margin: '12px 0 0', fontSize: 18, color: '#555', fontWeight: 500 }}>Comprehensive Project Specifications & Deliverables</p>
        <div style={{ marginTop: 16, fontSize: 15, color: '#666', display: 'flex', justifyContent: 'space-between' }}>
          <span><strong>Quote #:</strong> {quoteNum}</span>
          <span><strong>Date:</strong> {today}</span>
        </div>
      </div>

      {/* Edit/Save/Cancel Buttons */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 30, justifyContent: 'flex-end' }}>
        {!scopeEditMode ? (
          <button
            style={{ ...S.btn, background: '#1565c0', padding: '10px 24px', fontSize: 15, fontWeight: 600 }}
            onClick={enterScopeEditMode}
          >
            {'\u270F\uFE0F'} Edit Scope
          </button>
        ) : (
          <>
            <button
              style={{ ...S.btn, background: '#28a745', padding: '10px 24px', fontSize: 15, fontWeight: 600 }}
              onClick={saveScopeChanges}
            >
              {'\u2705'} Save Changes
            </button>
            <button
              style={{ ...S.btn, background: '#dc3545', padding: '10px 24px', fontSize: 15, fontWeight: 600 }}
              onClick={cancelScopeEdit}
            >
              {'\u274C'} Cancel
            </button>
          </>
        )}
      </div>

      {/* SECTION 1: PROJECT OVERVIEW */}
      <div style={sectionHeaderStyle}
        onClick={() => setScopeSections(prev => ({ ...prev, overview: !prev.overview }))}>
        {scopeSections.overview ? '\u25BC' : '\u25B6'} 1. Project Overview & Objectives
      </div>

      {scopeSections.overview && (<div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
          <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 8, borderLeft: '4px solid #2c5530' }}>
            <div style={{ fontWeight: 700, marginBottom: 10, color: '#2c5530', fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer Information</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{custLocal.firstName} {custLocal.lastName}</div>
            <div style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>{'\u{1F4DE}'} {custLocal.phone}</div>
            <div style={{ fontSize: 14, color: '#555' }}>{'\u2709\uFE0F'} {custLocal.email}</div>
          </div>
          <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 8, borderLeft: '4px solid #2c5530' }}>
            <div style={{ fontWeight: 700, marginBottom: 10, color: '#2c5530', fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Project Location</div>
            <div style={{ fontSize: 15, marginBottom: 4 }}>{custLocal.siteAddress}</div>
            <div style={{ fontSize: 15 }}>{custLocal.siteCity}, {custLocal.siteState} {custLocal.siteZip}</div>
          </div>
        </div>

        <div style={{ background: '#e7f5ff', border: '3px solid #1565c0', padding: 24, borderRadius: 10, marginBottom: 32 }}>
          <div style={{ fontWeight: 800, fontSize: 20, color: '#1565c0', marginBottom: 12 }}>Project Description</div>
          {scopeEditMode ? (
            <textarea
              style={{ width: '100%', minHeight: 120, padding: 12, fontSize: 15, borderRadius: 6, border: '2px solid #1565c0', fontFamily: 'inherit', resize: 'vertical' }}
              value={scopeEditContent.projectDescription || `Installation of ${currentItem.singleDouble === 'double' ? 'Double-Wide' : 'Single-Wide'} Modular Home${currentItem.homeModel !== 'NONE' ? ` - Model: ${currentItem.homeModel}` : ''}\n\nHome Dimensions: ${currentItem.houseWidth} feet wide \u00D7 ${currentItem.houseLength} feet long\nFoundation Type: ${foundation.name}`}
              onChange={(e) => updateScopeField('projectDescription', e.target.value)}
              placeholder="Enter project description..."
            />
          ) : (
            <>
              <div style={{ fontSize: 17, marginBottom: 8, whiteSpace: 'pre-wrap' }}>
                {currentItem.customScopeContent?.projectDescription || (
                  <>
                    <strong>Installation of {currentItem.singleDouble === 'double' ? 'Double-Wide' : 'Single-Wide'} Modular Home</strong>
                    {currentItem.homeModel !== 'NONE' ? ` - Model: ${currentItem.homeModel}` : ''}
                  </>
                )}
              </div>
              {!currentItem.customScopeContent?.projectDescription && (
                <div style={{ fontSize: 15, color: '#555', marginTop: 12 }}>
                  <strong>Home Dimensions:</strong> {currentItem.houseWidth} feet wide {'\u00D7'} {currentItem.houseLength} feet long<br/>
                  <strong>Foundation Type:</strong> {foundation.name}
                </div>
              )}
            </>
          )}
        </div>

        <div style={{ background: '#d4edda', border: '3px solid #28a745', padding: 24, borderRadius: 10, marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12, color: '#28a745' }}>Project Objectives</div>
          {scopeEditMode ? (
            <textarea
              style={{ width: '100%', minHeight: 150, padding: 12, fontSize: 15, borderRadius: 6, border: '2px solid #28a745', fontFamily: 'inherit', resize: 'vertical' }}
              value={scopeEditContent.projectObjectives || `\u2022 Deliver and install a turn-key modular home at the specified location\n\u2022 Construct a code-compliant foundation to manufacturer specifications\n\u2022 Complete all selected services to meet or exceed industry standards\n\u2022 Ensure site safety and minimize disruption during construction\n\u2022 Coordinate all inspections and obtain required approvals\n\u2022 Provide customer with a completed, move-in ready home`}
              onChange={(e) => updateScopeField('projectObjectives', e.target.value)}
              placeholder="Enter project objectives (one per line with bullet)..."
            />
          ) : (
            <div style={{ margin: 0, paddingLeft: 0, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              {currentItem.customScopeContent?.projectObjectives ? (
                currentItem.customScopeContent.projectObjectives
              ) : (
                <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
                  <li>Deliver and install a turn-key modular home at the specified location</li>
                  <li>Construct a code-compliant foundation to manufacturer specifications</li>
                  <li>Complete all selected services to meet or exceed industry standards</li>
                  <li>Ensure site safety and minimize disruption during construction</li>
                  <li>Coordinate all inspections and obtain required approvals</li>
                  <li>Provide customer with a completed, move-in ready home</li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>)}

      {/* SECTION 2: ROLES & RESPONSIBILITIES */}
      <div style={sectionHeaderStyle}
        onClick={() => setScopeSections(prev => ({ ...prev, roles: !prev.roles }))}>
        {scopeSections.roles ? '\u25BC' : '\u25B6'} 2. Roles & Responsibilities
      </div>

      {scopeSections.roles && (<div>
        {scopeEditMode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 8, border: '2px solid #2c5530' }}>
              <div style={{ fontWeight: 700, color: '#2c5530', marginBottom: 10 }}>Sherman Pole Buildings Responsibilities:</div>
              <textarea
                style={{ width: '100%', minHeight: 140, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical' }}
                value={scopeEditContent.rolesSherman || `\u2022 Provide all labor, materials, and equipment for contracted work\n\u2022 Coordinate with home manufacturer for delivery schedule\n\u2022 Ensure all work meets local building codes and manufacturer specs\n\u2022 Manage subcontractors and ensure quality workmanship\n\u2022 Coordinate inspections with local authorities\n\u2022 Communicate progress and any issues to customer promptly\n\u2022 Clean work site upon completion`}
                onChange={(e) => updateScopeField('rolesSherman', e.target.value)}
              />
            </div>
            <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 8, border: '2px solid #2c5530' }}>
              <div style={{ fontWeight: 700, color: '#2c5530', marginBottom: 10 }}>Customer Responsibilities:</div>
              <textarea
                style={{ width: '100%', minHeight: 140, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical' }}
                value={scopeEditContent.rolesCustomer || `\u2022 Provide clear, legal access to work site for all vehicles and equipment\n\u2022 Obtain necessary permits (unless included in contract)\n\u2022 Ensure utilities are available at property line prior to installation\n\u2022 Remove any obstacles that would interfere with construction\n\u2022 Make timely payments per contract terms\n\u2022 Communicate any concerns or questions promptly\n\u2022 Be available for walkthroughs and sign-offs\n\u2022 Provide adequate space for material storage during construction`}
                onChange={(e) => updateScopeField('rolesCustomer', e.target.value)}
              />
            </div>
            <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 8, border: '2px solid #2c5530' }}>
              <div style={{ fontWeight: 700, color: '#2c5530', marginBottom: 10 }}>Home Manufacturer Responsibilities:</div>
              <textarea
                style={{ width: '100%', minHeight: 100, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical' }}
                value={scopeEditContent.rolesManufacturer || `\u2022 Manufacture home to specifications and quality standards\n\u2022 Deliver home sections to site on agreed schedule\n\u2022 Provide installation instructions and specifications\n\u2022 Honor manufacturer's warranty on home components\n\u2022 Provide technical support during installation if needed`}
                onChange={(e) => updateScopeField('rolesManufacturer', e.target.value)}
              />
            </div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
            <thead>
              <tr>
                <th style={{ background: '#2c5530', color: '#fff', padding: 14, textAlign: 'left', fontWeight: 700, fontSize: 15, width: '30%' }}>Party</th>
                <th style={{ background: '#2c5530', color: '#fff', padding: 14, textAlign: 'left', fontWeight: 700, fontSize: 15 }}>Responsibilities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px 14px', borderBottom: '1px solid #dee2e6', fontWeight: 700, color: '#2c5530' }}>Sherman Pole Buildings</td>
                <td style={{ padding: '12px 14px', borderBottom: '1px solid #dee2e6', fontSize: 14, whiteSpace: 'pre-wrap' }}>
                  {currentItem.customScopeContent?.rolesSherman || (
                    <>
                      {'\u2022'} Provide all labor, materials, and equipment for contracted work<br/>
                      {'\u2022'} Coordinate with home manufacturer for delivery schedule<br/>
                      {'\u2022'} Ensure all work meets local building codes and manufacturer specs<br/>
                      {'\u2022'} Manage subcontractors and ensure quality workmanship<br/>
                      {'\u2022'} Coordinate inspections with local authorities<br/>
                      {'\u2022'} Communicate progress and any issues to customer promptly<br/>
                      {'\u2022'} Clean work site upon completion
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 14px', borderBottom: '1px solid #dee2e6', fontWeight: 700, color: '#2c5530' }}>Customer</td>
                <td style={{ padding: '12px 14px', borderBottom: '1px solid #dee2e6', fontSize: 14, whiteSpace: 'pre-wrap' }}>
                  {currentItem.customScopeContent?.rolesCustomer || (
                    <>
                      {'\u2022'} Provide clear, legal access to work site for all vehicles and equipment<br/>
                      {'\u2022'} Obtain necessary permits (unless included in contract)<br/>
                      {'\u2022'} Ensure utilities are available at property line prior to installation<br/>
                      {'\u2022'} Remove any obstacles that would interfere with construction<br/>
                      {'\u2022'} Make timely payments per contract terms<br/>
                      {'\u2022'} Communicate any concerns or questions promptly<br/>
                      {'\u2022'} Be available for walkthroughs and sign-offs<br/>
                      {'\u2022'} Provide adequate space for material storage during construction
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#2c5530' }}>Home Manufacturer</td>
                <td style={{ padding: '12px 14px', fontSize: 14, whiteSpace: 'pre-wrap' }}>
                  {currentItem.customScopeContent?.rolesManufacturer || (
                    <>
                      {'\u2022'} Manufacture home to specifications and quality standards<br/>
                      {'\u2022'} Deliver home sections to site on agreed schedule<br/>
                      {'\u2022'} Provide installation instructions and specifications<br/>
                      {'\u2022'} Honor manufacturer's warranty on home components<br/>
                      {'\u2022'} Provide technical support during installation if needed
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>)}

      {/* SECTION 3: FOUNDATION SPECIFICATIONS */}
      <div style={sectionHeaderStyle}
        onClick={() => setScopeSections(prev => ({ ...prev, foundation: !prev.foundation }))}>
        {scopeSections.foundation ? '\u25BC' : '\u25B6'} 3. Foundation Specifications
      </div>

      {scopeSections.foundation && (<div>
        <div style={phaseBannerStyle}>
          <div style={{ fontWeight: 700, color: '#1565c0', fontSize: 18, marginBottom: 12 }}>Phase 1: Site Preparation & Foundation</div>
          <div style={{ fontSize: 14, color: '#666' }}>Duration: 3-7 days depending on weather and site conditions</div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#2c5530', marginBottom: 16, paddingBottom: 8, borderBottom: '2px solid #e9ecef' }}>{foundation.name}</div>
          <div style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>{foundation.description}</div>

          {scopeEditMode ? (
            <>
              <div style={{ background: '#f1f3f5', padding: 16, borderRadius: 6, margin: '16px 0', borderLeft: '4px solid #495057' }}>
                <div style={{ fontWeight: 700, color: '#495057', marginBottom: 10, fontSize: 16 }}>Technical Specifications:</div>
                <textarea
                  style={{ width: '100%', minHeight: 120, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical' }}
                  value={scopeEditContent.foundationSpecs || foundation.specifications.map(s => `\u2022 ${s}`).join('\n')}
                  onChange={(e) => updateScopeField('foundationSpecs', e.target.value)}
                  placeholder="Enter specifications (one per line with bullet)..."
                />
              </div>
              <div style={{ marginTop: 24 }}>
                <div style={subHeadingStyle}>Work Included in This Phase</div>
                <textarea
                  style={{ width: '100%', minHeight: 150, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical' }}
                  value={scopeEditContent.foundationIncluded || foundation.workIncluded.map(s => `\u2022 ${s}`).join('\n')}
                  onChange={(e) => updateScopeField('foundationIncluded', e.target.value)}
                  placeholder="Enter included work items (one per line with bullet)..."
                />
              </div>
              <div style={{ marginTop: 24 }}>
                <div style={subHeadingStyle}>Work NOT Included (Additional Cost if Needed)</div>
                <textarea
                  style={{ width: '100%', minHeight: 120, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical' }}
                  value={scopeEditContent.foundationExcluded || foundation.excluded.map(s => `\u2022 ${s}`).join('\n')}
                  onChange={(e) => updateScopeField('foundationExcluded', e.target.value)}
                  placeholder="Enter excluded work items (one per line with bullet)..."
                />
              </div>
            </>
          ) : (
            <>
              <div style={{ background: '#f1f3f5', padding: 16, borderRadius: 6, margin: '16px 0', borderLeft: '4px solid #495057' }}>
                <div style={{ fontWeight: 700, color: '#495057', marginBottom: 10, fontSize: 16 }}>Technical Specifications:</div>
                {currentItem.customScopeContent?.foundationSpecs ? (
                  <div style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap', marginLeft: 8 }}>{currentItem.customScopeContent.foundationSpecs}</div>
                ) : (
                  <ul style={{ margin: '8px 0', paddingLeft: 20, fontSize: 14, lineHeight: 1.7 }}>
                    {foundation.specifications.map((spec, i) => <li key={i}>{spec}</li>)}
                  </ul>
                )}
              </div>

              <div style={subHeadingStyle}>Work Included in This Phase</div>
              {currentItem.customScopeContent?.foundationIncluded ? (
                <div style={{ fontSize: 15, lineHeight: 1.6, whiteSpace: 'pre-wrap', marginLeft: 8 }}>{currentItem.customScopeContent.foundationIncluded}</div>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
                  {foundation.workIncluded.map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
                </ul>
              )}

              <div style={subHeadingStyle}>Work NOT Included (Additional Cost if Needed)</div>
              {currentItem.customScopeContent?.foundationExcluded ? (
                <div style={{ fontSize: 15, lineHeight: 1.6, color: '#666', whiteSpace: 'pre-wrap', marginLeft: 8 }}>{currentItem.customScopeContent.foundationExcluded}</div>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
                  {foundation.excluded.map((item, i) => <ExcludeItem key={i}>{item}</ExcludeItem>)}
                </ul>
              )}
            </>
          )}
        </div>
      </div>)}

      {/* SECTION 4: SELECTED SERVICES */}
      <div style={sectionHeaderStyle}
        onClick={() => setScopeSections(prev => ({ ...prev, services: !prev.services }))}>
        {scopeSections.services ? '\u25BC' : '\u25B6'} 4. Selected Services
      </div>

      {scopeSections.services && (<div>
        {/* Phase 2: Delivery */}
        <div style={phaseBannerStyle}>
          <div style={{ fontWeight: 700, color: '#1565c0', fontSize: 18, marginBottom: 12 }}>Phase 2: Home Delivery & Set</div>
          <div style={{ fontSize: 14, color: '#666' }}>Duration: 1-2 days for delivery and crane set</div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#2c5530', marginBottom: 16, paddingBottom: 8, borderBottom: '2px solid #e9ecef' }}>Modular Home Delivery</div>
          {scopeEditMode ? (
            <textarea
              style={{ width: '100%', minHeight: 60, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical', marginBottom: 20 }}
              value={scopeEditContent.deliveryDescription || 'Factory-built home sections transported to site and prepared for installation'}
              onChange={(e) => updateScopeField('deliveryDescription', e.target.value)}
              placeholder="Enter delivery description..."
            />
          ) : (
            <div style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>
              {currentItem.customScopeContent?.deliveryDescription || 'Factory-built home sections transported to site and prepared for installation'}
            </div>
          )}

          <div style={subHeadingStyle}>What's Included</div>
          {scopeEditMode ? (
            <textarea
              style={{ width: '100%', minHeight: 120, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical' }}
              value={scopeEditContent.deliveryIncluded || `\u2022 Factory construction of home per manufacturer specifications\n\u2022 All factory-installed features, finishes, and appliances\n\u2022 Transport of home sections from factory to site\n\u2022 Delivery on agreed date (weather permitting)\n\u2022 Basic delivery route preparation coordination\n\u2022 Manufacturer's structural warranty documentation`}
              onChange={(e) => updateScopeField('deliveryIncluded', e.target.value)}
              placeholder="Enter included items (one per line with bullet)..."
            />
          ) : currentItem.customScopeContent?.deliveryIncluded ? (
            <div style={{ fontSize: 15, lineHeight: 1.6, whiteSpace: 'pre-wrap', marginLeft: 8 }}>{currentItem.customScopeContent.deliveryIncluded}</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
              {['Factory construction of home per manufacturer specifications', 'All factory-installed features, finishes, and appliances', 'Transport of home sections from factory to site', 'Delivery on agreed date (weather permitting)', 'Basic delivery route preparation coordination', 'Manufacturer\'s structural warranty documentation'].map((item, i) => (
                <CheckItem key={i}>{item}</CheckItem>
              ))}
            </ul>
          )}

          <div style={subHeadingStyle}>What's NOT Included</div>
          {scopeEditMode ? (
            <textarea
              style={{ width: '100%', minHeight: 100, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical' }}
              value={scopeEditContent.deliveryExcluded || `\u2022 Site preparation (covered in Phase 1)\n\u2022 Foundation construction (covered in Phase 1)\n\u2022 Utility connections beyond what's factory-installed\n\u2022 Permit fees (unless specifically contracted)\n\u2022 Oversize load permits (included in delivery cost)\n\u2022 Custom modifications not in original factory order`}
              onChange={(e) => updateScopeField('deliveryExcluded', e.target.value)}
              placeholder="Enter excluded items (one per line with bullet)..."
            />
          ) : currentItem.customScopeContent?.deliveryExcluded ? (
            <div style={{ fontSize: 15, lineHeight: 1.6, color: '#666', whiteSpace: 'pre-wrap', marginLeft: 8 }}>{currentItem.customScopeContent.deliveryExcluded}</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
              {['Site preparation (covered in Phase 1)', 'Foundation construction (covered in Phase 1)', 'Utility connections beyond what\'s factory-installed', 'Permit fees (unless specifically contracted)', 'Oversize load permits (included in delivery cost)', 'Custom modifications not in original factory order'].map((item, i) => (
                <ExcludeItem key={i}>{item}</ExcludeItem>
              ))}
            </ul>
          )}
        </div>

        {/* Phase 3: Installation */}
        {selectedServicesList.filter(s => s.key === 'installation_of_home').length > 0 && (<>
          <div style={phaseBannerStyle}>
            <div style={{ fontWeight: 700, color: '#1565c0', fontSize: 18, marginBottom: 12 }}>Phase 3: Home Installation & Finishing</div>
            <div style={{ fontSize: 14, color: '#666' }}>Duration: 3-7 days depending on home size and weather</div>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#2c5530', marginBottom: 16, paddingBottom: 8, borderBottom: '2px solid #e9ecef' }}>Professional Home Installation</div>
            {scopeEditMode ? (
              <textarea
                style={{ width: '100%', minHeight: 60, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical', marginBottom: 20 }}
                value={scopeEditContent.installationDescription || 'Complete installation of home sections including marriage wall, roof connection, and weatherproofing'}
                onChange={(e) => updateScopeField('installationDescription', e.target.value)}
                placeholder="Enter installation description..."
              />
            ) : (
              <div style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>
                {currentItem.customScopeContent?.installationDescription || 'Complete installation of home sections including marriage wall, roof connection, and weatherproofing'}
              </div>
            )}

            {currentItem.serviceNotes?.['installation_of_home'] && (
              <div style={{ background: '#e7f5ff', padding: 16, borderRadius: 6, marginBottom: 20, borderLeft: '4px solid #1565c0' }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#1565c0', marginBottom: 8 }}>{'\u{1F4DD}'} Project-Specific Notes:</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{currentItem.serviceNotes['installation_of_home']}</div>
              </div>
            )}

            <div style={subHeadingStyle}>Installation Work Included</div>
            {scopeEditMode ? (
              <textarea
                style={{ width: '100%', minHeight: 200, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical' }}
                value={scopeEditContent.installationIncluded || `\u2022 Crane Service: Professional crane operation to lift and set home sections on foundation\n\u2022 Alignment & Leveling: Precise positioning and leveling of all home sections\n\u2022 Marriage Wall Construction: Complete marriage wall framing, insulation, and sealing\n\u2022 Roof Connection: Roof sections joined, shingled over seam, and fully weatherproofed\n\u2022 Exterior Completion: All exterior trim, siding seams, and weatherproofing completed\n\u2022 Door & Window Check: Verify all doors and windows operate properly after set\n\u2022 Utility Connections: Connect plumbing, electrical, and HVAC systems at marriage wall\n\u2022 Final Walkthrough: Complete inspection with customer, address any concerns\n\u2022 Inspection Coordination: Schedule and coordinate final building inspections`}
                onChange={(e) => updateScopeField('installationIncluded', e.target.value)}
                placeholder="Enter included work items (one per line with bullet)..."
              />
            ) : currentItem.customScopeContent?.installationIncluded ? (
              <div style={{ fontSize: 15, lineHeight: 1.6, whiteSpace: 'pre-wrap', marginLeft: 8 }}>{currentItem.customScopeContent.installationIncluded}</div>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
                {[
                  { title: 'Crane Service:', desc: 'Professional crane operation to lift and set home sections on foundation' },
                  { title: 'Alignment & Leveling:', desc: 'Precise positioning and leveling of all home sections' },
                  { title: 'Marriage Wall Construction:', desc: 'Complete marriage wall framing, insulation, and sealing' },
                  { title: 'Roof Connection:', desc: 'Roof sections joined, shingled over seam, and fully weatherproofed' },
                  { title: 'Exterior Completion:', desc: 'All exterior trim, siding seams, and weatherproofing completed' },
                  { title: 'Door & Window Check:', desc: 'Verify all doors and windows operate properly after set' },
                  { title: 'Utility Connections:', desc: 'Connect plumbing, electrical, and HVAC systems at marriage wall' },
                  { title: 'Final Walkthrough:', desc: 'Complete inspection with customer, address any concerns' },
                  { title: 'Inspection Coordination:', desc: 'Schedule and coordinate final building inspections' }
                ].map((item, i) => (
                  <CheckItem key={i}><strong>{item.title}</strong> {item.desc}</CheckItem>
                ))}
              </ul>
            )}

            <div style={subHeadingStyle}>Installation Limitations & Exclusions</div>
            {scopeEditMode ? (
              <textarea
                style={{ width: '100%', minHeight: 100, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical' }}
                value={scopeEditContent.installationExcluded || `\u2022 Foundation repairs or modifications after home is set\n\u2022 Structural changes to home layout or design\n\u2022 Custom modifications not part of original factory order\n\u2022 Repairs to any pre-existing damage from transport\n\u2022 Interior finishing beyond what's factory-installed\n\u2022 Additional windows, doors, or openings`}
                onChange={(e) => updateScopeField('installationExcluded', e.target.value)}
                placeholder="Enter excluded items (one per line with bullet)..."
              />
            ) : currentItem.customScopeContent?.installationExcluded ? (
              <div style={{ fontSize: 15, lineHeight: 1.6, color: '#666', whiteSpace: 'pre-wrap', marginLeft: 8 }}>{currentItem.customScopeContent.installationExcluded}</div>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
                {['Foundation repairs or modifications after home is set', 'Structural changes to home layout or design', 'Custom modifications not part of original factory order', 'Repairs to any pre-existing damage from transport', 'Interior finishing beyond what\'s factory-installed', 'Additional windows, doors, or openings'].map((item, i) => (
                  <ExcludeItem key={i}>{item}</ExcludeItem>
                ))}
              </ul>
            )}
          </div>
        </>)}

        {/* Phase 4: Additional Services */}
        {selectedServicesList.filter(s => s.key !== 'installation_of_home').length > 0 && (<>
          <div style={phaseBannerStyle}>
            <div style={{ fontWeight: 700, color: '#1565c0', fontSize: 18, marginBottom: 12 }}>
              Phase {selectedServicesList.filter(s => s.key === 'installation_of_home').length > 0 ? '4' : '3'}: Additional Services & Site Completion
            </div>
            <div style={{ fontSize: 14, color: '#666' }}>Services performed as needed throughout or after main installation</div>
          </div>

          {selectedServicesList.filter(s => s.key !== 'installation_of_home').map((service, i) => {
            const customerNote = currentItem.serviceNotes?.[service.key] || '';
            return (
              <div key={i} style={cardStyle}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#2c5530', marginBottom: 8, paddingBottom: 8, borderBottom: '2px solid #e9ecef' }}>{service.name}</div>
                <div style={{ fontSize: 14, color: '#666', marginTop: 8 }}>Service will be completed per industry standards and local code requirements</div>

                {customerNote && (
                  <div style={{ background: '#e7f5ff', padding: 16, borderRadius: 6, marginTop: 16, borderLeft: '4px solid #1565c0' }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#1565c0', marginBottom: 8 }}>{'\u{1F4DD}'} Project-Specific Notes:</div>
                    <div style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{customerNote}</div>
                  </div>
                )}
              </div>
            );
          })}
        </>)}
      </div>)}

      {/* SECTION 5: PROJECT DELIVERABLES */}
      <div style={sectionHeaderStyle}
        onClick={() => setScopeSections(prev => ({ ...prev, deliverables: !prev.deliverables }))}>
        {scopeSections.deliverables ? '\u25BC' : '\u25B6'} 5. Project Deliverables
      </div>

      {scopeSections.deliverables && (<div>
        <div style={{ background: '#fff3cd', border: '3px solid #ffc107', padding: 24, borderRadius: 10, marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12, color: '#856404' }}>Site Access & Preparation Requirements</div>
          {scopeEditMode ? (
            <textarea
              style={{ width: '100%', minHeight: 180, padding: 12, fontSize: 15, borderRadius: 6, border: '1px solid #ffc107', fontFamily: 'inherit', resize: 'vertical' }}
              value={scopeEditContent.deliverables || `\u2022 Access Road: Must accommodate semi-truck with 65'+ trailer and 85-ton crane\n\u2022 Turning Radius: Minimum 45-foot turning radius for delivery vehicles\n\u2022 Overhead Clearance: Minimum 16 feet clearance (power lines, tree branches, etc.)\n\u2022 Foundation Ready: Foundation must be complete, cured, and inspected before delivery date\n\u2022 Utilities: Electric, water, and sewer/septic available at property line\n\u2022 Site Clearing: Work area clear of vehicles, equipment, debris, and obstacles\n\u2022 Staging Area: Minimum 50' x 100' clear area near home site for crane setup\n\u2022 Weather Dependent: Installation cannot proceed in high winds, rain, or icy conditions`}
              onChange={(e) => updateScopeField('deliverables', e.target.value)}
              placeholder="Enter deliverables (one per line with bullet)..."
            />
          ) : currentItem.customScopeContent?.deliverables ? (
            <div style={{ fontSize: 15, lineHeight: 1.9, whiteSpace: 'pre-wrap', marginLeft: 8 }}>{currentItem.customScopeContent.deliverables}</div>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9, fontSize: 15 }}>
              <li><strong>Access Road:</strong> Must accommodate semi-truck with 65'+ trailer and 85-ton crane</li>
              <li><strong>Turning Radius:</strong> Minimum 45-foot turning radius for delivery vehicles</li>
              <li><strong>Overhead Clearance:</strong> Minimum 16 feet clearance (power lines, tree branches, etc.)</li>
              <li><strong>Foundation Ready:</strong> Foundation must be complete, cured, and inspected before delivery date</li>
              <li><strong>Utilities:</strong> Electric, water, and sewer/septic available at property line</li>
              <li><strong>Site Clearing:</strong> Work area clear of vehicles, equipment, debris, and obstacles</li>
              <li><strong>Staging Area:</strong> Minimum 50' x 100' clear area near home site for crane setup</li>
              <li><strong>Weather Dependent:</strong> Installation cannot proceed in high winds, rain, or icy conditions</li>
            </ul>
          )}
        </div>
      </div>)}

      {/* SECTION 6: EXCLUSIONS & LIMITATIONS */}
      <div style={sectionHeaderStyle}
        onClick={() => setScopeSections(prev => ({ ...prev, exclusions: !prev.exclusions }))}>
        {scopeSections.exclusions ? '\u25BC' : '\u25B6'} 6. Exclusions & Limitations
      </div>

      {scopeSections.exclusions && (<div>
        <div style={cardStyle}>
          <div style={{ fontSize: 16, marginBottom: 20, fontWeight: 600, color: '#495057' }}>
            Unless specifically listed in this scope of work as included, the following items are <strong>NOT</strong> part of this contract:
          </div>

          {scopeEditMode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <div style={{ fontWeight: 700, color: '#2c5530', marginBottom: 10, fontSize: 16 }}>Site & Exterior:</div>
                <textarea
                  style={{ width: '100%', minHeight: 120, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical' }}
                  value={scopeEditContent.exclusionsSite || `\u2022 Landscaping, seeding, or sod installation\n\u2022 Decorative grading or site beautification\n\u2022 Driveway paving or surfacing beyond gravel (if selected)\n\u2022 Fencing or property line work\n\u2022 Tree removal (unless obstructing work)\n\u2022 Retaining walls or extensive grading\n\u2022 Outdoor structures (sheds, garages, decks)\n\u2022 Mailbox installation`}
                  onChange={(e) => updateScopeField('exclusionsSite', e.target.value)}
                />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#2c5530', marginBottom: 10, fontSize: 16 }}>Interior & Finish Work:</div>
                <textarea
                  style={{ width: '100%', minHeight: 100, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical' }}
                  value={scopeEditContent.exclusionsInterior || `\u2022 Interior painting or wall finishes\n\u2022 Flooring beyond factory-installed\n\u2022 Cabinet or countertop upgrades\n\u2022 Appliance installation beyond factory\n\u2022 Window treatments (blinds, curtains)\n\u2022 Light fixture upgrades\n\u2022 Furniture or decorations\n\u2022 Custom carpentry or built-ins`}
                  onChange={(e) => updateScopeField('exclusionsInterior', e.target.value)}
                />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#2c5530', marginBottom: 10, fontSize: 16 }}>Utilities & Systems:</div>
                <textarea
                  style={{ width: '100%', minHeight: 120, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical' }}
                  value={scopeEditContent.exclusionsUtilities || `\u2022 Well drilling or septic system installation (unless contracted separately)\n\u2022 Utility company connection fees and meter installation\n\u2022 Electrical service upgrade at pole or transformer\n\u2022 HVAC system installation (unless contracted separately)\n\u2022 Interior plumbing beyond factory-installed fixtures\n\u2022 Water softener or filtration systems\n\u2022 Security or camera systems\n\u2022 Smart home technology installation`}
                  onChange={(e) => updateScopeField('exclusionsUtilities', e.target.value)}
                />
              </div>
            </div>
          ) : currentItem.customScopeContent?.exclusionsSite ? (
            <div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, color: '#2c5530', marginBottom: 12, fontSize: 16 }}>Site & Exterior</div>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: '#666', whiteSpace: 'pre-wrap', marginLeft: 8 }}>{currentItem.customScopeContent.exclusionsSite}</div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, color: '#2c5530', marginBottom: 12, fontSize: 16 }}>Interior & Finish Work</div>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: '#666', whiteSpace: 'pre-wrap', marginLeft: 8 }}>{currentItem.customScopeContent.exclusionsInterior || ''}</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#2c5530', marginBottom: 12, fontSize: 16 }}>Utilities & Systems</div>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: '#666', whiteSpace: 'pre-wrap', marginLeft: 8 }}>{currentItem.customScopeContent.exclusionsUtilities || ''}</div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#2c5530', marginBottom: 12, fontSize: 16 }}>Site & Exterior</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
                    {['Landscaping, seeding, or sod installation', 'Decorative grading or site beautification', 'Driveway paving or surfacing beyond gravel (if selected)', 'Fencing or property line work', 'Tree removal (unless obstructing work)', 'Retaining walls or extensive grading', 'Outdoor structures (sheds, garages, decks)', 'Mailbox installation'].map((item, i) => (
                      <ExcludeItem key={i}>{item}</ExcludeItem>
                    ))}
                  </ul>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#2c5530', marginBottom: 12, fontSize: 16 }}>Interior & Finish Work</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
                    {['Interior painting or wall finishes', 'Flooring beyond factory-installed', 'Cabinet or countertop upgrades', 'Appliance installation beyond factory', 'Window treatments (blinds, curtains)', 'Light fixture upgrades', 'Furniture or decorations', 'Custom carpentry or built-ins'].map((item, i) => (
                      <ExcludeItem key={i}>{item}</ExcludeItem>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: 24 }}>
                <div style={{ fontWeight: 700, color: '#2c5530', marginBottom: 12, fontSize: 16 }}>Utilities & Systems</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
                  {['Well drilling or septic system installation (unless contracted separately)', 'Utility company connection fees and meter installation', 'Electrical service upgrade at pole or transformer', 'HVAC system installation (unless contracted separately)', 'Interior plumbing beyond factory-installed fixtures', 'Water softener or filtration systems', 'Security or camera systems', 'Smart home technology installation'].map((item, i) => (
                    <ExcludeItem key={i}>{item}</ExcludeItem>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>)}

      {/* SECTION 7: ASSUMPTIONS */}
      <div style={sectionHeaderStyle}
        onClick={() => setScopeSections(prev => ({ ...prev, assumptions: !prev.assumptions }))}>
        {scopeSections.assumptions ? '\u25BC' : '\u25B6'} 7. Assumptions
      </div>

      {scopeSections.assumptions && (<div>
        <div style={cardStyle}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 16, color: '#2c5530' }}>This Scope of Work is Based on the Following Assumptions:</div>

          {scopeEditMode ? (
            <textarea
              style={{ width: '100%', minHeight: 200, padding: 12, fontSize: 14, borderRadius: 6, border: '1px solid #dee2e6', fontFamily: 'inherit', resize: 'vertical', marginTop: 20 }}
              value={scopeEditContent.assumptions || `Site Conditions | Normal soil conditions, adequate drainage, no rock or unsuitable soil, water table below foundation depth\nAccess | Clear, unrestricted access for all delivery and construction vehicles during normal business hours\nUtilities | Electric, water, and sewer/septic available at property line; utility connections within 100 feet of home\nPermits | All necessary permits can be obtained; no zoning restrictions or variance requirements unknown at time of quote\nWeather | Typical weather conditions for the season; work may be delayed by extreme weather\nSchedule | Home manufacturer delivers on agreed date; materials and subcontractors available as scheduled\nExisting Structures | No demolition or removal of existing buildings required (unless specifically quoted)`}
              onChange={(e) => updateScopeField('assumptions', e.target.value)}
              placeholder="Enter assumptions (format: Category | Details, one per line)..."
            />
          ) : currentItem.customScopeContent?.assumptions ? (
            <div style={{ marginTop: 20, fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap', padding: 12, background: '#f8f9fa', borderRadius: 6 }}>
              {currentItem.customScopeContent.assumptions}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
              <thead>
                <tr>
                  <th style={{ background: '#2c5530', color: '#fff', padding: 14, textAlign: 'left', fontWeight: 700, fontSize: 15 }}>Assumption Category</th>
                  <th style={{ background: '#2c5530', color: '#fff', padding: 14, textAlign: 'left', fontWeight: 700, fontSize: 15 }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Site Conditions', 'Normal soil conditions, adequate drainage, no rock or unsuitable soil, water table below foundation depth'],
                  ['Access', 'Clear, unrestricted access for all delivery and construction vehicles during normal business hours'],
                  ['Utilities', 'Electric, water, and sewer/septic available at property line; utility connections within 100 feet of home'],
                  ['Permits', 'All necessary permits can be obtained; no zoning restrictions or variance requirements unknown at time of quote'],
                  ['Weather', 'Typical weather conditions for the season; work may be delayed by extreme weather'],
                  ['Schedule', 'Home manufacturer delivers on agreed date; materials and subcontractors available as scheduled'],
                  ['Existing Structures', 'No demolition or removal of existing buildings required (unless specifically quoted)'],
                ].map(([cat, detail], i, arr) => (
                  <tr key={i}>
                    <td style={{ padding: '12px 14px', borderBottom: i < arr.length - 1 ? '1px solid #dee2e6' : 'none', fontWeight: 700 }}>{cat}</td>
                    <td style={{ padding: '12px 14px', borderBottom: i < arr.length - 1 ? '1px solid #dee2e6' : 'none', fontSize: 14 }}>{detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div style={{ background: '#fff3cd', border: '3px solid #ffc107', padding: 24, borderRadius: 10, marginTop: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Important Note About Unforeseen Conditions:</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>
              If unforeseen site conditions are discovered (rock, poor soil, high water table, underground utilities, etc.), work may need to be stopped
              until the condition is addressed. Additional costs for dealing with unforeseen conditions will be documented in a Change Order and approved
              by the customer before work proceeds.
            </p>
          </div>
        </div>
      </div>)}

      {/* SECTION 8: ACKNOWLEDGMENT */}
      <div style={{ marginTop: 70, paddingTop: 40, borderTop: '4px solid #2c5530' }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#2c5530', marginBottom: 24 }}>Acknowledgment & Agreement</div>

        <p style={{ marginBottom: 20, fontSize: 15, lineHeight: 1.8 }}>
          By signing below, both parties acknowledge that they have read, understood, and agree to the scope of work as outlined in this document.
          This Scope of Work is an integral part of <strong>Quote #{quoteNum}</strong> and should be reviewed in conjunction with all contract documents including:
        </p>

        <ul style={{ margin: '20px 0', paddingLeft: 24, lineHeight: 1.9, fontSize: 15 }}>
          <li>Full itemized quote with pricing</li>
          <li>Payment schedule and terms</li>
          <li>Warranty information</li>
          <li>Home manufacturer specifications</li>
          <li>Any addendums or Change Orders</li>
        </ul>

        <p style={{ margin: '24px 0', fontSize: 15, lineHeight: 1.8, fontWeight: 600 }}>
          Both parties understand that work not specifically included in this Scope of Work is not part of the contracted services and will require
          a separate agreement or Change Order if requested.
        </p>

        <div style={{ marginTop: 50 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 16 }}>Customer Signature:</div>
          <div style={{ borderBottom: '2px solid #333', margin: '50px 0 12px', minHeight: 60 }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#666' }}>
            <span>Print Name</span>
            <span>Date</span>
          </div>
        </div>

        <div style={{ marginTop: 50 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 16 }}>Sherman Pole Buildings Representative:</div>
          <div style={{ borderBottom: '2px solid #333', margin: '50px 0 12px', minHeight: 60 }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#666' }}>
            <span>Print Name</span>
            <span>Date</span>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div style={{ textAlign: 'center', marginTop: 60, paddingTop: 40, borderTop: '2px solid #dee2e6' }}>
        <button style={{ ...S.btn, background: '#1565c0', fontSize: 16, padding: '14px 40px', fontWeight: 600 }}
          onClick={() => {
            const scopeContent = generateScopeOfWorkDocument(currentItem, custLocal, services);
            const blob = new Blob([scopeContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Scope_of_Work_${custLocal.firstName}_${custLocal.lastName}.html`;
            a.click();
            URL.revokeObjectURL(url);
            alert('\u2705 Scope of Work document downloaded!');
          }}>
          {'\u{1F4E5}'} Download Printable Version
        </button>
      </div>
    </div>
  );
};

export default ScopeOfWorkTab;
