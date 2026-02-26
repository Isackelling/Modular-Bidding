// scripts/lib/autoApply.js
// Applies Claude's suggested fixes to source files using exact string replacement.
// Offers three modes: apply all (y), skip all (n), review one-by-one (review).

import { createInterface } from 'readline';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
  cyan:   '\x1b[36m',
  gray:   '\x1b[90m',
};

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

/**
 * Apply a single fix to the cached file content.
 * Returns the updated content, or null if the pattern wasn't found.
 */
function applyFix(content, fix) {
  if (!content.includes(fix.searchFor)) return null;
  return content.replace(fix.searchFor, fix.replaceWith);
}

/**
 * Write all modified files in the cache back to disk.
 */
function flushCache(fileCache, root) {
  let written = 0;
  for (const [filePath, content] of fileCache.entries()) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`  ${C.gray}Saved: ${filePath.replace(root, '.')}${C.reset}`);
    written++;
  }
  return written;
}

/**
 * Main entry: prompt user about applying fixes.
 */
export async function promptAutoApply(fixes, root, config) {
  if (!fixes || fixes.length === 0) return;
  if (config.autoApply === 'never') return;

  console.log(`${C.bold}Auto-Apply Fixes${C.reset}`);
  console.log(
    `${fixes.length} suggested code fix${fixes.length > 1 ? 'es are' : ' is'} available.\n`
  );

  // autoApply: 'always' — skip the prompt
  if (config.autoApply === 'always') {
    await applyAll(fixes, root);
    return;
  }

  // autoApply: 'prompt' — ask the user (default)
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  const answer = await ask(
    rl,
    `Apply ${fixes.length} fix${fixes.length > 1 ? 'es' : ''} to documentGeneration.js? (y / n / review): `
  );

  const choice = answer.trim().toLowerCase();
  if (choice === 'y' || choice === 'yes') {
    await applyAll(fixes, root);
  } else if (choice === 'review') {
    await reviewEach(fixes, root, rl);
  } else {
    console.log(
      `\n${C.yellow}No fixes applied.${C.reset} ` +
        `Review the suggestions above and apply them manually in\n  src/utils/documentGeneration.js\n`
    );
  }

  rl.close();
}

/**
 * Apply all fixes at once.
 */
async function applyAll(fixes, root) {
  const fileCache = new Map(); // filePath → content string
  let successCount = 0;
  let failCount = 0;

  for (const fix of fixes) {
    const filePath = join(root, fix.file);

    // Load file into cache on first encounter
    if (!fileCache.has(filePath)) {
      fileCache.set(filePath, readFileSync(filePath, 'utf8'));
    }

    const current = fileCache.get(filePath);
    const updated = applyFix(current, fix);

    if (updated === null) {
      console.log(
        `  ${C.red}FAIL${C.reset}  ${fix.description}\n` +
          `         ${C.gray}Pattern not found in file — apply manually.${C.reset}`
      );
      console.log(`         ${C.gray}Searched for: "${fix.searchFor.slice(0, 70)}..."${C.reset}`);
      failCount++;
    } else {
      fileCache.set(filePath, updated);
      console.log(`  ${C.green}APPLIED${C.reset} ${fix.description}`);
      successCount++;
    }
  }

  const written = flushCache(fileCache, root);
  console.log(
    `\n${C.bold}${successCount} fix${successCount !== 1 ? 'es' : ''} applied${C.reset}, ` +
      `${failCount} failed, ${written} file${written !== 1 ? 's' : ''} saved.\n`
  );

  if (failCount > 0) {
    console.log(
      `${C.yellow}The ${failCount} failed fix${failCount > 1 ? 'es' : ''} could not be auto-applied.\n` +
        `Apply them manually using the code suggestions shown above.\n${C.reset}`
    );
  }

  if (successCount > 0) {
    console.log(
      `${C.cyan}To undo all changes: git checkout src/utils/documentGeneration.js${C.reset}\n`
    );
  }
}

/**
 * Review and apply fixes one at a time.
 */
async function reviewEach(fixes, root, rl) {
  const fileCache = new Map();
  const line = '─'.repeat(62);
  let applied = 0;
  let skipped = 0;

  for (let i = 0; i < fixes.length; i++) {
    const fix = fixes[i];
    console.log(`\n${line}`);
    console.log(`Fix ${i + 1} of ${fixes.length}: ${fix.document}`);
    console.log(`Description: ${fix.description}`);
    if (fix.location) console.log(`Location: ${fix.location}`);
    console.log(`\n${C.yellow}Search for:${C.reset}\n${fix.searchFor}`);
    console.log(`\n${C.cyan}Replace with:${C.reset}\n${fix.replaceWith}`);

    const ans = await ask(rl, '\nApply this fix? (y/n): ');
    if (ans.trim().toLowerCase() === 'y') {
      const filePath = join(root, fix.file);
      if (!fileCache.has(filePath)) {
        fileCache.set(filePath, readFileSync(filePath, 'utf8'));
      }
      const current = fileCache.get(filePath);
      const updated = applyFix(current, fix);
      if (updated === null) {
        console.log(`  ${C.red}FAIL${C.reset} Pattern not found — apply manually.`);
        skipped++;
      } else {
        fileCache.set(filePath, updated);
        console.log(`  ${C.green}APPLIED${C.reset}`);
        applied++;
      }
    } else {
      console.log(`  ${C.gray}Skipped.${C.reset}`);
      skipped++;
    }
  }

  if (applied > 0) flushCache(fileCache, root);
  console.log(`\n${applied} applied, ${skipped} skipped.\n`);
  if (applied > 0) {
    console.log(
      `${C.cyan}To undo: git checkout src/utils/documentGeneration.js${C.reset}\n`
    );
  }
}
