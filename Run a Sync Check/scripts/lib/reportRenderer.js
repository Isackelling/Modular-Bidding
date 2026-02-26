// scripts/lib/reportRenderer.js
// Renders a color-coded terminal report from Claude's structured analysis.

// ANSI terminal color codes
const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  red:    '\x1b[31m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  blue:   '\x1b[34m',
  cyan:   '\x1b[36m',
  gray:   '\x1b[90m',
  white:  '\x1b[97m',
};

function statusBadge(status) {
  switch (status) {
    case 'COMPLETE':        return `${C.green}COMPLETE ✓${C.reset}`;
    case 'NEEDS_UPDATE':    return `${C.yellow}NEEDS UPDATE ⚠${C.reset}`;
    case 'BROKEN':          return `${C.red}BROKEN ✗${C.reset}`;
    case 'NOT_APPLICABLE':  return `${C.gray}N/A${C.reset}`;
    default:                return `${C.gray}${status}${C.reset}`;
  }
}

function severityLabel(severity) {
  switch (severity) {
    case 'CRITICAL': return `${C.red}[CRITICAL]${C.reset}`;
    case 'WARNING':  return `${C.yellow}[WARNING]${C.reset}`;
    case 'INFO':     return `${C.blue}[INFO]${C.reset}`;
    default:         return `[${severity}]`;
  }
}

// The 8 document generators in display order (most important first)
const DOC_ORDER = [
  'generateCustomerQuote',
  'generateQuoteHtml',
  'generateCrewWorkOrderDocument',
  'generateJobSummaryReport',
  'generateScopeOfWorkDocument',
  'generateChangeOrderDocument',
  'generateAllowanceProgressDocument',
  'generatePierDiagramHtml',
];

// Friendly display names for each generator
const DOC_NAMES = {
  generateQuoteHtml:                  'Quote HTML (Internal)',
  generateCustomerQuote:              'Customer Quote',
  generatePierDiagramHtml:            'Pier Diagram',
  generateScopeOfWorkDocument:        'Scope of Work',
  generateCrewWorkOrderDocument:      'Crew Work Order',
  generateJobSummaryReport:           'Job Summary Report',
  generateChangeOrderDocument:        'Change Order',
  generateAllowanceProgressDocument:  'Allowance Progress',
};

export function renderReport(analysis, changedFiles) {
  const line = '─'.repeat(62);

  console.log(`\n${C.bold}${C.cyan}${'═'.repeat(62)}${C.reset}`);
  console.log(`${C.bold}  SHERMAN BIDDING — SYNC-CHECK REPORT${C.reset}`);
  console.log(`${C.bold}${C.cyan}${'═'.repeat(62)}${C.reset}\n`);

  // Changed files
  if (changedFiles.length > 0) {
    console.log(`${C.bold}Changed Files:${C.reset}`);
    changedFiles.forEach((f) => console.log(`  ${C.gray}•${C.reset} ${f}`));
    console.log();
  }

  // Summary of detected changes
  const { changesDetected, totalGaps, criticalGaps, triggerType } = analysis.summary;

  if (triggerType && triggerType !== 'unknown') {
    const label = triggerType === 'edit_quote'
      ? 'Edit Quote button flow'
      : triggerType === 'change_order'
      ? 'Change Order button flow'
      : triggerType.replace(/_/g, ' ');
    console.log(`${C.bold}Trigger Type:${C.reset} ${C.cyan}${label}${C.reset}\n`);
  }

  console.log(`${C.bold}Changes Detected:${C.reset}`);
  if (changesDetected.length === 0) {
    console.log(`  ${C.gray}(none detected — Claude may need a cleaner diff)${C.reset}`);
  } else {
    changesDetected.forEach((change) => console.log(`  ${C.gray}→${C.reset} ${change}`));
  }

  const gapColor = criticalGaps > 0 ? C.red : totalGaps > 0 ? C.yellow : C.green;
  console.log(
    `\n${C.bold}Gaps Found:${C.reset} ${gapColor}${totalGaps}${C.reset} total, ` +
    `${C.red}${criticalGaps}${C.reset} critical\n`
  );

  // Per-document breakdown
  console.log(`${C.bold}Document Analysis:${C.reset}`);
  console.log(line);

  for (const docKey of DOC_ORDER) {
    const doc = analysis.documents[docKey];
    if (!doc) continue;

    const displayName = DOC_NAMES[docKey] || docKey;
    const badge = statusBadge(doc.status);

    console.log(`\n${C.bold}${displayName}${C.reset}  ${badge}`);
    if (doc.reason) {
      console.log(`  ${C.gray}${doc.reason}${C.reset}`);
    }

    if (doc.gaps && doc.gaps.length > 0) {
      console.log(`  ${C.yellow}Gaps:${C.reset}`);
      doc.gaps.forEach((gap) => console.log(`    ${C.yellow}•${C.reset} ${gap}`));
    }

    if (doc.fixes && doc.fixes.length > 0) {
      console.log(`  ${C.cyan}Suggested Fixes: ${doc.fixes.length}${C.reset}`);
      doc.fixes.forEach((fix, i) => {
        console.log(`    ${i + 1}. ${fix.description}`);
        if (fix.location) {
          console.log(`       ${C.gray}Location: ${fix.location}${C.reset}`);
        }
        if (fix.replaceWith) {
          const firstLine = fix.replaceWith.split('\n')[0].slice(0, 72);
          const ellipsis = fix.replaceWith.includes('\n') ? '…' : '';
          console.log(`       ${C.gray}Code: ${firstLine}${ellipsis}${C.reset}`);
        }
      });
    }
  }

  // Cross-cutting issues
  if (analysis.crossCuttingIssues && analysis.crossCuttingIssues.length > 0) {
    console.log(`\n${C.bold}${C.red}Cross-Cutting Issues:${C.reset}`);
    console.log(line);
    analysis.crossCuttingIssues.forEach((issue) => {
      console.log(`\n  ${severityLabel(issue.severity)} ${issue.description}`);
      if (issue.affectedDocuments && issue.affectedDocuments.length > 0) {
        console.log(`  ${C.gray}Affects: ${issue.affectedDocuments.join(', ')}${C.reset}`);
      }
      if (issue.recommendation) {
        console.log(`  ${C.cyan}Action: ${issue.recommendation}${C.reset}`);
      }
    });
  }

  // Calculations impact
  if (analysis.calculationsImpact?.affectsCalculations) {
    console.log(`\n${C.bold}${C.yellow}Calculations Impact:${C.reset}`);
    console.log(`  ${analysis.calculationsImpact.explanation}`);
    if (analysis.calculationsImpact.filesToUpdate?.length > 0) {
      console.log(
        `  ${C.cyan}Files to update: ${analysis.calculationsImpact.filesToUpdate.join(', ')}${C.reset}`
      );
    }
  }

  // Consistency checks (from Grok-inspired domain knowledge)
  if (analysis.consistencyChecks) {
    const checks = analysis.consistencyChecks;
    const allGood =
      checks.grandTotalConsistent !== false &&
      checks.contingencyFormulaConsistent !== false &&
      checks.nhlContractConsistent !== false &&
      checks.varianceSignConsistent !== false;

    console.log(`\n${C.bold}Consistency Checks:${C.reset}`);
    const tick = (ok) => (ok !== false ? `${C.green}✓${C.reset}` : `${C.red}✗${C.reset}`);
    console.log(`  ${tick(checks.grandTotalConsistent)}  Grand total (quote ↔ documents ↔ scrubb)`);
    console.log(`  ${tick(checks.contingencyFormulaConsistent)}  Contingency fund formula (ScrubbTab ↔ Allowance Progress)`);
    console.log(`  ${tick(checks.nhlContractConsistent)}  NHL Contract = matT + installation_of_home + painting`);
    console.log(`  ${tick(checks.varianceSignConsistent)}  Allowance variance sign (+savings / -overage)`);
    if (checks.notes) {
      console.log(`  ${C.gray}Notes: ${checks.notes}${C.reset}`);
    }
    if (!allGood) {
      console.log(
        `\n  ${C.red}${C.bold}CONSISTENCY ISSUES DETECTED — review before applying fixes${C.reset}`
      );
    }
  }

  console.log(`\n${line}\n`);
}
