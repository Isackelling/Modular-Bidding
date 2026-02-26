#!/usr/bin/env node
// scripts/sync-check.js
// Sherman Bidding System — AI Sync-Check Agent
//
// Usage: npm run sync-check
//
// What it does:
//   1. Reads your staged/unstaged git diff
//   2. Sends it to Claude claude-opus-4-6 with the full document generation context
//   3. Claude identifies which of the 8 output documents are missing the change
//   4. Prints a color-coded report with exact code fix suggestions
//   5. Optionally auto-applies the fixes to documentGeneration.js
//
// Requirements:
//   - .env file with ANTHROPIC_API_KEY=sk-ant-...
//   - Node.js 20.6+ (for --env-file flag)
//   - @anthropic-ai/sdk installed (npm install @anthropic-ai/sdk)

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { loadConfig } from './lib/config.js';
import { getGitDiff, getChangedFiles } from './lib/gitDiff.js';
import { assembleContext } from './lib/contextAssembler.js';
import { callClaude } from './lib/claudeClient.js';
import { parseResponse } from './lib/responseParser.js';
import { renderReport } from './lib/reportRenderer.js';
import { promptAutoApply } from './lib/autoApply.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const AGENT_DIR = join(__dirname, '..');   // "Ai background agent/" folder
const ROOT = join(AGENT_DIR, '..');        // project root (Modular Bidding/)

async function main() {
  console.log('\n  Sherman Bidding System — Sync-Check Agent\n');

  // ── Step 1: Load configuration ──────────────────────────────────────────
  const config = loadConfig(join(AGENT_DIR, 'sync-check.config.json'));

  // ── Step 2: Validate environment ─────────────────────────────────────────
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('  ERROR: ANTHROPIC_API_KEY not found in environment.\n');
    console.error('  Fix: Copy .env.example to .env and add your key.');
    console.error('  Get a key at: https://console.anthropic.com/settings/keys\n');
    process.exit(1);
  }

  // ── Step 3: Get git diff ──────────────────────────────────────────────────
  let diff;
  try {
    diff = getGitDiff(ROOT, config.diffTarget);
  } catch (err) {
    console.error(`  ERROR: ${err.message}\n`);
    process.exit(1);
  }

  if (!diff || diff.trim().length === 0) {
    console.log('  No changes detected.\n');
    console.log('  Tips:');
    console.log('    • Stage your changes first: git add src/App.jsx');
    console.log('    • Or check that you have uncommitted changes');
    console.log('    • Or set "diffTarget" in sync-check.config.json to a commit SHA\n');
    process.exit(0);
  }

  const changedFiles = getChangedFiles(diff);
  if (changedFiles.length > 0) {
    console.log(`  Changed files: ${changedFiles.join(', ')}`);
  }

  // ── Step 4: Assemble context ──────────────────────────────────────────────
  console.log('  Assembling context for Claude...');
  let context;
  try {
    context = await assembleContext(ROOT, diff, changedFiles, config);
    console.log(`  Context ready: ~${Math.round(context.estimatedTokens / 1000)}k tokens\n`);
  } catch (err) {
    console.error(`  ERROR assembling context: ${err.message}\n`);
    process.exit(1);
  }

  // ── Step 5: Call Claude ───────────────────────────────────────────────────
  console.log('  Sending to Claude claude-opus-4-6 for analysis...');
  console.log('  (This usually takes 20-40 seconds for large files)\n');

  let rawResponse;
  try {
    rawResponse = await callClaude(apiKey, context);
  } catch (err) {
    // Provide helpful error messages for common API failures
    if (err.message.includes('401') || err.message.includes('authentication')) {
      console.error('  ERROR: API key is invalid or expired.\n');
      console.error('  Fix: Check your ANTHROPIC_API_KEY in .env\n');
    } else if (err.message.includes('429') || err.message.includes('rate')) {
      console.error('  ERROR: API rate limit reached.\n');
      console.error('  Fix: Wait a moment and try again\n');
    } else if (err.message.includes('timeout') || err.message.includes('ETIMEDOUT')) {
      console.error('  ERROR: Request timed out.\n');
      console.error('  Fix: Check your internet connection and try again\n');
    } else {
      console.error(`  ERROR calling Claude API: ${err.message}\n`);
    }
    process.exit(1);
  }

  // ── Step 6: Parse response ────────────────────────────────────────────────
  let analysis;
  try {
    analysis = parseResponse(rawResponse);
  } catch (err) {
    console.error(`  ERROR parsing Claude response:\n  ${err.message}\n`);
    process.exit(1);
  }

  // ── Step 7: Render report ─────────────────────────────────────────────────
  renderReport(analysis, changedFiles);

  // ── Step 8: Optionally auto-apply fixes ───────────────────────────────────
  if (analysis.fixes && analysis.fixes.length > 0) {
    await promptAutoApply(analysis.fixes, ROOT, config);
  } else {
    const allComplete = Object.values(analysis.documents).every(
      (d) => d.status === 'COMPLETE' || d.status === 'NOT_APPLICABLE'
    );
    if (allComplete) {
      console.log('  All documents are up to date. No fixes needed.\n');
    }
  }
}

main().catch((err) => {
  console.error(`\n  Sync-check failed unexpectedly: ${err.message}\n`);
  if (process.env.DEBUG) console.error(err.stack);
  process.exit(1);
});
