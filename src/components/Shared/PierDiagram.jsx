/**
 * PierDiagram Component
 * SVG-based visualization of pier layout with cross-section and plan views
 */

import React from 'react';
import { calcIBeam } from '../../utils/helpers.js';
import { PIER_SPECS } from '../../constants/index.js';

const PierDiagram = ({ quote: q }) => {
  const w = parseFloat(q.houseWidth) || 28, l = parseFloat(q.houseLength) || 56;
  const iBeam = q.iBeamHeight || calcIBeam(l);
  const dbl = q.singleDouble?.toLowerCase() === 'double';
  const pierSize = iBeam >= 11 ? 20 : 22;
  const boltHeight = 1;
  const totalHeight = pierSize + iBeam + boltHeight;

  // Cantilever: house overhangs frame by 2' on each end
  const cantilever = PIER_SPECS.CANTILEVER;
  const frameLength = l - (cantilever * 2);

  // Pier spacing: use constants for consistency
  const outerSpacing = PIER_SPECS.SPACING.OUTER_BEAMS;
  const marriageSpacing = PIER_SPECS.SPACING.MARRIAGE_LINE;

  // Calculate outer pier positions (6' o/c)
  const numOuterPiers = Math.ceil(frameLength / outerSpacing) + 1;
  const actualOuterSpacing = frameLength / (numOuterPiers - 1);

  // Calculate marriage line pier positions (10' o/c) - only for double-wide
  const numMarriagePiers = dbl ? Math.ceil(frameLength / marriageSpacing) + 1 : 0;
  const actualMarriageSpacing = dbl ? frameLength / (numMarriagePiers - 1) : 0;

  // SVG scaling
  const sc = 5;
  const marginL = 60, marginT = 70, marginB = 80;
  const svgW = l * sc + marginL + 40;
  const svgH = w * sc + marginT + marginB;

  const houseX = marginL;
  const houseY = marginT;
  const frameX = marginL + cantilever * sc;

  // Generate pier positions with cumulative distances
  const half1OuterPiers = [];
  const half1InnerPiers = [];
  const marriagePiers = [];
  const half2InnerPiers = [];
  const half2OuterPiers = [];

  // Half 1 and Half 2 outer beams - 6' o/c with 20/22" piers
  for (let i = 0; i < numOuterPiers; i++) {
    const dist = i * actualOuterSpacing;
    const x = frameX + dist * sc;
    half1OuterPiers.push({ x, y: houseY, dist: cantilever + dist });
    half2OuterPiers.push({ x, y: houseY + w * sc, dist: cantilever + dist });
  }

  if (dbl) {
    for (let i = 0; i < numOuterPiers; i++) {
      const dist = i * actualOuterSpacing;
      const x = frameX + dist * sc;
      half1InnerPiers.push({ x, y: houseY + (w/4) * sc, dist: cantilever + dist });
      half2InnerPiers.push({ x, y: houseY + (3*w/4) * sc, dist: cantilever + dist });
    }

    // Marriage line - 10' o/c with 32" piers (always)
    for (let i = 0; i < numMarriagePiers; i++) {
      const dist = i * actualMarriageSpacing;
      const x = frameX + dist * sc;
      marriagePiers.push({ x, y: houseY + (w/2) * sc, dist: cantilever + dist });
    }
  }

  const totalPiers = half1OuterPiers.length + half1InnerPiers.length + marriagePiers.length + half2InnerPiers.length + half2OuterPiers.length;

  const fmtDist = (ft) => {
    const feet = Math.floor(ft);
    const inches = Math.round((ft - feet) * 12);
    return `${feet}'-${inches}"`;
  };

  return (
    <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8, marginTop: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <h4 style={{ margin: '0 0 4px', color: '#2c5530', fontSize: 14 }}>📐 Pier Layout</h4>
          <p style={{ margin: 0, fontSize: 12, color: '#666' }}>{q.homeModel !== 'NONE' ? q.homeModel : `${w}' × ${l}'`}</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: 11 }}>
          <div><strong>{pierSize}"</strong> Piers @ 6' o/c {dbl && <><span> • </span><strong>32"</strong> Marriage @ 12' o/c</>}</div>
          <div style={{ color: '#666' }}>{totalPiers} total piers • {iBeam}" I-Beam</div>
        </div>
      </div>

      {/* Cross-Section Diagram */}
      <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 4, padding: 16, marginBottom: 16 }}>
        <h5 style={{ margin: '0 0 8px', fontSize: 12, color: '#666', textAlign: 'center' }}>CROSS-SECTION VIEW</h5>
        <svg width="100%" viewBox="0 0 700 390">
          {/* Ground */}
          <rect x="50" y="255" width="600" height="40" fill="#8B4513" stroke="#5D3A1A" strokeWidth="2" />
          <text x="350" y="280" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">GROUND</text>

          {/* 6" Concrete Slab with 10x10 thickened edges */}
          <rect x="95" y="215" width="40" height="40" fill="#A0A0A0" stroke="#666" strokeWidth="2" />
          <rect x="565" y="215" width="40" height="40" fill="#A0A0A0" stroke="#666" strokeWidth="2" />
          <rect x="135" y="215" width="430" height="30" fill="#A0A0A0" stroke="#666" strokeWidth="2" />

          <rect x="135" y="245" width="430" height="10" fill="#8B4513" stroke="none" />

          {/* Pier (green pyramid) */}
          <polygon points={`350,${215 - pierSize * 5} 290,215 410,215`} fill="#2c5530" stroke="#1a3a1f" strokeWidth="2" />

          {/* Bolt - 1" = 5px */}
          <rect x="338" y={215 - pierSize * 5 - 5} width="24" height="5" fill="#444" stroke="#222" strokeWidth="1" />

          {/* I-Beam */}
          <rect x="270" y={215 - pierSize * 5 - 5 - iBeam * 5} width="160" height="12" fill="#8B4513" stroke="#5D3A1A" strokeWidth="2" />
          <rect x="338" y={215 - pierSize * 5 - 5 - iBeam * 5 + 12} width="24" height={iBeam * 5 - 24} fill="#8B4513" stroke="#5D3A1A" strokeWidth="2" />
          <rect x="270" y={215 - pierSize * 5 - 5 - 12} width="160" height="12" fill="#8B4513" stroke="#5D3A1A" strokeWidth="2" />

          {/* House Floor */}
          <rect x="82" y={215 - pierSize * 5 - 5 - iBeam * 5 - 5 - 25} width="536" height="25" fill="#DEB887" stroke="#8B4513" strokeWidth="2" />
          <text x="350" y={215 - pierSize * 5 - 5 - iBeam * 5 - 5 - 9} textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">HOUSE FLOOR</text>

          {/* Blue Siding */}
          <rect x="65" y={215 - pierSize * 5 - 5 - iBeam * 5 - 5 - 25} width="17" height="45" fill="#1565C0" stroke="#0D47A1" strokeWidth="2" />
          <rect x="618" y={215 - pierSize * 5 - 5 - iBeam * 5 - 5 - 25} width="17" height="45" fill="#1565C0" stroke="#0D47A1" strokeWidth="2" />

          {/* 32" Concrete Skirting */}
          <rect x="97" y={215 - pierSize * 5 - iBeam * 5} width="20" height={pierSize * 5 + iBeam * 5} fill="#707070" stroke="#505050" strokeWidth="2" />
          <rect x="583" y={215 - pierSize * 5 - iBeam * 5} width="20" height={pierSize * 5 + iBeam * 5} fill="#707070" stroke="#505050" strokeWidth="2" />

          {/* Labels */}
          <text x="40" y={215 - pierSize * 5 - 5 - iBeam * 5 - 35} textAnchor="start" fontSize="11" fill="#1565C0" fontWeight="bold">SIDING</text>

          {/* Skirting 32" measurement */}
          <line x1="670" y1={215 - pierSize * 5 - iBeam * 5} x2="670" y2="215" stroke="#707070" strokeWidth="2" />
          <line x1="663" y1={215 - pierSize * 5 - iBeam * 5} x2="677" y2={215 - pierSize * 5 - iBeam * 5} stroke="#707070" strokeWidth="2" />
          <line x1="663" y1="215" x2="677" y2="215" stroke="#707070" strokeWidth="2" />
          <text x="682" y={215 - (pierSize * 5 + iBeam * 5) / 2 + 5} textAnchor="start" fontSize="14" fontWeight="bold" fill="#707070">32"</text>

          {/* I-Beam measurement */}
          <line x1="445" y1={215 - pierSize * 5 - 5 - iBeam * 5} x2="460" y2={215 - pierSize * 5 - 5 - iBeam * 5} stroke="#8B4513" strokeWidth="1" />
          <line x1="445" y1={215 - pierSize * 5 - 5} x2="460" y2={215 - pierSize * 5 - 5} stroke="#8B4513" strokeWidth="1" />
          <line x1="455" y1={215 - pierSize * 5 - 5 - iBeam * 5} x2="455" y2={215 - pierSize * 5 - 5} stroke="#8B4513" strokeWidth="1" />
          <text x="465" y={215 - pierSize * 5 - 5 - iBeam * 2.5 + 4} textAnchor="start" fontSize="12" fill="#8B4513" fontWeight="bold">I-BEAM {iBeam}"</text>

          {/* Bolt label */}
          <text x="200" y={215 - pierSize * 5 - 2} textAnchor="start" fontSize="12" fill="#333" fontWeight="bold">BOLT 1"</text>
          <line x1="250" y1={215 - pierSize * 5 - 3} x2="335" y2={215 - pierSize * 5 - 3} stroke="#333" strokeWidth="1" strokeDasharray="3,2" />

          {/* Pier measurement */}
          <line x1="425" y1={215 - pierSize * 5} x2="500" y2={215 - pierSize * 5} stroke="#2c5530" strokeWidth="1" />
          <line x1="425" y1="215" x2="500" y2="215" stroke="#2c5530" strokeWidth="1" />
          <line x1="490" y1={215 - pierSize * 5} x2="490" y2="215" stroke="#2c5530" strokeWidth="1" />
          <text x="505" y={215 - pierSize * 2.5 + 4} textAnchor="start" fontSize="12" fill="#2c5530" fontWeight="bold">PIER {pierSize}"</text>

          {/* Legend */}
          <rect x="100" y="315" width="500" height="45" fill="#f5f5f5" stroke="#ccc" strokeWidth="1" rx="4" />
          <text x="350" y="333" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#333">LEGEND</text>
          <rect x="115" y="342" width="18" height="12" fill="#DEB887" stroke="#8B4513" strokeWidth="1" />
          <text x="137" y="352" fontSize="10" fill="#333">Floor</text>
          <rect x="185" y="342" width="18" height="12" fill="#1565C0" stroke="#0D47A1" strokeWidth="1" />
          <text x="207" y="352" fontSize="10" fill="#333">Siding</text>
          <rect x="265" y="342" width="18" height="12" fill="#707070" stroke="#505050" strokeWidth="1" />
          <text x="287" y="352" fontSize="10" fill="#333">Skirting</text>
          <rect x="350" y="342" width="18" height="12" fill="#2c5530" stroke="#1a3a1f" strokeWidth="1" />
          <text x="372" y="352" fontSize="10" fill="#333">Pier</text>
          <rect x="415" y="342" width="18" height="12" fill="#8B4513" stroke="#5D3A1A" strokeWidth="1" />
          <text x="437" y="352" fontSize="10" fill="#333">I-Beam</text>
          <rect x="495" y="342" width="18" height="12" fill="#A0A0A0" stroke="#666" strokeWidth="1" />
          <text x="517" y="352" fontSize="10" fill="#333">Slab</text>
          <rect x="560" y="342" width="18" height="12" fill="#8B4513" stroke="#5D3A1A" strokeWidth="1" />
          <text x="582" y="352" fontSize="10" fill="#333">Ground</text>
        </svg>
      </div>

      {/* Plan View */}
      <h5 style={{ margin: '0 0 8px', fontSize: 12, color: '#666' }}>PLAN VIEW</h5>
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{ background: '#fff', borderRadius: 4, border: '1px solid #ddd' }}>
        {/* House outline */}
        <rect x={houseX} y={houseY} width={l * sc} height={w * sc} fill="none" stroke="#333" strokeWidth="2" />

        {/* I-Beam lines */}
        <line x1={frameX} y1={houseY} x2={frameX + frameLength * sc} y2={houseY} stroke="#333" strokeWidth="1" />
        {dbl && <line x1={frameX} y1={houseY + (w/4) * sc} x2={frameX + frameLength * sc} y2={houseY + (w/4) * sc} stroke="#333" strokeWidth="1" />}
        {dbl && <line x1={frameX} y1={houseY + (w/2) * sc} x2={frameX + frameLength * sc} y2={houseY + (w/2) * sc} stroke="#333" strokeWidth="1.5" strokeDasharray="6,3" />}
        {dbl && <line x1={frameX} y1={houseY + (3*w/4) * sc} x2={frameX + frameLength * sc} y2={houseY + (3*w/4) * sc} stroke="#333" strokeWidth="1" />}
        <line x1={frameX} y1={houseY + w * sc} x2={frameX + frameLength * sc} y2={houseY + w * sc} stroke="#333" strokeWidth="1" />

        {/* Piers */}
        {half1OuterPiers.map((p, i) => (
          <g key={`h1o-${i}`}><rect x={p.x - 6} y={p.y - 6} width="12" height="12" fill="none" stroke="#333" strokeWidth="1.5" /></g>
        ))}
        {half1InnerPiers.map((p, i) => (
          <g key={`h1i-${i}`}><rect x={p.x - 6} y={p.y - 6} width="12" height="12" fill="none" stroke="#333" strokeWidth="1.5" /></g>
        ))}
        {marriagePiers.map((p, i) => (
          <g key={`mar-${i}`}><rect x={p.x - 6} y={p.y - 6} width="12" height="12" fill="#333" stroke="#333" strokeWidth="1.5" /></g>
        ))}
        {half2InnerPiers.map((p, i) => (
          <g key={`h2i-${i}`}><rect x={p.x - 6} y={p.y - 6} width="12" height="12" fill="none" stroke="#333" strokeWidth="1.5" /></g>
        ))}
        {half2OuterPiers.map((p, i) => (
          <g key={`h2o-${i}`}><rect x={p.x - 6} y={p.y - 6} width="12" height="12" fill="none" stroke="#333" strokeWidth="1.5" /></g>
        ))}

        {/* Top dimension line */}
        <line x1={houseX} y1={houseY - 30} x2={houseX + l * sc} y2={houseY - 30} stroke="#333" strokeWidth="1" />
        <line x1={houseX} y1={houseY - 35} x2={houseX} y2={houseY - 25} stroke="#333" strokeWidth="1" />
        {half1OuterPiers.map((p, i) => (
          <g key={`dim-${i}`}>
            <line x1={p.x} y1={houseY - 35} x2={p.x} y2={houseY - 25} stroke="#333" strokeWidth="1" />
            {i < half1OuterPiers.length - 1 && (
              <text x={(p.x + half1OuterPiers[i+1].x) / 2} y={houseY - 40} textAnchor="middle" fontSize="9">{fmtDist(actualOuterSpacing)}</text>
            )}
          </g>
        ))}
        <line x1={houseX + l * sc} y1={houseY - 35} x2={houseX + l * sc} y2={houseY - 25} stroke="#333" strokeWidth="1" />

        {/* Cantilever dimensions */}
        <text x={houseX + (cantilever * sc) / 2} y={houseY - 42} textAnchor="middle" fontSize="8" fill="#666">{cantilever}'-0"</text>
        <text x={houseX + l * sc - (cantilever * sc) / 2} y={houseY - 42} textAnchor="middle" fontSize="8" fill="#666">{cantilever}'-0"</text>

        {/* Total length */}
        <text x={houseX + (l * sc) / 2} y={houseY - 52} textAnchor="middle" fontSize="11" fontWeight="bold">{l}'-0"</text>

        {/* Width dimensions */}
        <line x1={houseX + l * sc + 15} y1={houseY} x2={houseX + l * sc + 15} y2={houseY + w * sc} stroke="#333" strokeWidth="1" />
        <line x1={houseX + l * sc + 10} y1={houseY} x2={houseX + l * sc + 20} y2={houseY} stroke="#333" strokeWidth="1" />
        <line x1={houseX + l * sc + 10} y1={houseY + w * sc} x2={houseX + l * sc + 20} y2={houseY + w * sc} stroke="#333" strokeWidth="1" />
        {dbl && <line x1={houseX + l * sc + 10} y1={houseY + (w/2) * sc} x2={houseX + l * sc + 20} y2={houseY + (w/2) * sc} stroke="#333" strokeWidth="1" />}

        {dbl ? (
          <>
            <text x={houseX + l * sc + 25} y={houseY + (w/4) * sc + 4} textAnchor="start" fontSize="9">HALF 1</text>
            <text x={houseX + l * sc + 25} y={houseY + (3*w/4) * sc + 4} textAnchor="start" fontSize="9">HALF 2</text>
          </>
        ) : (
          <text x={houseX + l * sc + 25} y={houseY + (w/2) * sc + 4} textAnchor="start" fontSize="10" fontWeight="bold">{w}'-0"</text>
        )}

        {/* Bottom spacing info */}
        <text x={houseX + (l * sc) / 2} y={houseY + w * sc + 20} textAnchor="middle" fontSize="10">
          {pierSize}" Piers: {actualOuterSpacing.toFixed(1)}' o/c{dbl && ` | 32" Marriage Piers: ${actualMarriageSpacing.toFixed(1)}' o/c`}
        </text>

        {/* Left side labels */}
        <text x={houseX - 5} y={houseY + 4} textAnchor="end" fontSize="8" fill="#666">Half 1</text>
        {dbl && <text x={houseX - 5} y={houseY + (w/2) * sc + 4} textAnchor="end" fontSize="8" fill="#666">Marriage</text>}
        <text x={houseX - 5} y={houseY + w * sc + 4} textAnchor="end" fontSize="8" fill="#666">Half 2</text>
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 11, color: '#666', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, border: '1.5px solid #333' }}></div>
            <span>{pierSize}" Pier (6' o/c)</span>
          </div>
          {dbl && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, background: '#333' }}></div>
              <span>32" Marriage Pier (12' o/c)</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 20, height: 2, background: '#333' }}></div>
            <span>I-Beam</span>
          </div>
        </div>
        <div style={{ fontSize: 10, color: '#999' }}>
          {dbl
            ? `Half 1: ${half1OuterPiers.length + half1InnerPiers.length} piers | Marriage: ${marriagePiers.length} piers | Half 2: ${half2InnerPiers.length + half2OuterPiers.length} piers | Total: ${totalPiers}`
            : `${half1OuterPiers.length + half2OuterPiers.length} piers on 2 beams`}
        </div>
      </div>
    </div>
  );
};

export default PierDiagram;
