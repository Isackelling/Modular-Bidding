// scripts/lib/config.js
// Loads sync-check.config.json and merges with defaults.

import { readFileSync, existsSync } from 'fs';

const DEFAULTS = {
  diffTarget: 'HEAD',
  autoApply: 'prompt', // 'never' | 'prompt' | 'always'
  criticalDocuments: [
    'generateQuoteHtml',
    'generateCustomerQuote',
    'generateCrewWorkOrderDocument',
    'generateJobSummaryReport',
  ],
  optionalDocuments: [
    'generatePierDiagramHtml',
    'generateScopeOfWorkDocument',
    'generateChangeOrderDocument',
    'generateAllowanceProgressDocument',
  ],
  monitoredFiles: [
    'src/App.jsx',
    'src/utils/calculations.js',
    'src/utils/CalcHelpers.js',
    'src/constants/index.js',
  ],
  outputDocumentFile: 'src/utils/documentGeneration.js',
  ignoreFields: ['id', 'customerId', 'status', 'folders', 'scrubbHistory'],
};

export function loadConfig(configPath) {
  if (!existsSync(configPath)) {
    console.log('  No sync-check.config.json found — using defaults.\n');
    return DEFAULTS;
  }

  try {
    const raw = readFileSync(configPath, 'utf8');
    const userConfig = JSON.parse(raw);
    return { ...DEFAULTS, ...userConfig };
  } catch (err) {
    console.warn(`  Warning: Could not parse sync-check.config.json: ${err.message}`);
    console.warn('  Using defaults.\n');
    return DEFAULTS;
  }
}
