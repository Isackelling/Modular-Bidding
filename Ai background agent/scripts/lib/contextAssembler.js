// scripts/lib/contextAssembler.js
// Assembles the context package sent to Claude.
// Strategy: always include the diff, emptyQuote(), documentGeneration.js, and constants.
// Include calculations.js only when it or App.jsx changed.

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Rough token estimator: ~4 characters per token
const estimateTokens = (str) => Math.ceil(str.length / 4);

/**
 * Extracts just the emptyQuote() function from App.jsx.
 * This is the source of truth for all quote fields.
 */
function extractEmptyQuote(appContent) {
  // Find the function definition
  const startMarkers = ['function emptyQuote()', 'const emptyQuote = ()'];
  let start = -1;
  for (const marker of startMarkers) {
    start = appContent.indexOf(marker);
    if (start !== -1) break;
  }

  if (start === -1) {
    // Fallback: grab lines that define the quote shape
    const lines = appContent.split('\n');
    const quoteLines = [];
    let inEmptyQuote = false;
    let braceDepth = 0;
    for (const line of lines) {
      if (line.includes('emptyQuote')) inEmptyQuote = true;
      if (inEmptyQuote) {
        quoteLines.push(line);
        braceDepth += (line.match(/\{/g) || []).length;
        braceDepth -= (line.match(/\}/g) || []).length;
        if (inEmptyQuote && braceDepth <= 0 && quoteLines.length > 3) break;
      }
    }
    return quoteLines.join('\n');
  }

  // Find the matching closing brace/paren for the function
  let depth = 0;
  let i = start;
  let foundOpen = false;
  while (i < appContent.length) {
    const ch = appContent[i];
    if (ch === '{' || ch === '(') { depth++; foundOpen = true; }
    if (ch === '}' || ch === ')') { depth--; }
    if (foundOpen && depth === 0) { i++; break; }
    i++;
  }

  return appContent.slice(start, i);
}

export async function assembleContext(root, diff, changedFiles, config) {
  const srcDir = join(root, 'src');

  // --- Always included ---

  // 1. The full git diff
  const diffContent = diff;

  // 2. emptyQuote() — source of truth for all quote fields
  const appPath = join(srcDir, 'App.jsx');
  const appContent = readFileSync(appPath, 'utf8');
  const emptyQuoteSection = extractEmptyQuote(appContent);

  // 3. Full documentGeneration.js — the primary analysis target
  const docGenPath = join(srcDir, 'utils', 'documentGeneration.js');
  const documentGenerationContent = readFileSync(docGenPath, 'utf8');

  // 4. constants/index.js — defines services, allowances, home options
  const constantsPath = join(srcDir, 'constants', 'index.js');
  const constantsContent = existsSync(constantsPath)
    ? readFileSync(constantsPath, 'utf8')
    : '// constants/index.js not found';

  // --- Conditionally included ---

  // 5. calculations.js — include if App.jsx or a calculations file changed
  const shouldIncludeCalcs = changedFiles.some(
    (f) =>
      f.includes('calculations.js') ||
      f.includes('CalcHelpers.js') ||
      f.includes('App.jsx')
  );

  let changedCalcContent = null;
  if (shouldIncludeCalcs) {
    const calcPath = join(srcDir, 'utils', 'calculations.js');
    if (existsSync(calcPath)) {
      changedCalcContent = readFileSync(calcPath, 'utf8');
    }
  }

  // Token budget summary
  const totalText =
    diffContent +
    emptyQuoteSection +
    documentGenerationContent +
    constantsContent +
    (changedCalcContent || '');
  const estimatedTokens = estimateTokens(totalText);

  return {
    diff: diffContent,
    emptyQuoteSection,
    documentGenerationContent,
    constantsContent,
    changedCalcContent,
    estimatedTokens,
  };
}
