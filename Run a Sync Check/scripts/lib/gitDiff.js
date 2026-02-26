// scripts/lib/gitDiff.js
// Retrieves the git diff representing what the user just changed.
// Cascade: staged changes → unstaged changes → last commit.

import { execSync } from 'child_process';

export function getGitDiff(root, diffTarget = 'HEAD') {
  try {
    // First priority: staged changes (user ran git add)
    const staged = execSync('git diff --cached', { cwd: root, encoding: 'utf8' });
    if (staged.trim()) return staged;

    // Second priority: unstaged changes vs HEAD
    const unstaged = execSync('git diff HEAD', { cwd: root, encoding: 'utf8' });
    if (unstaged.trim()) return unstaged;

    // Third priority: diff against a specific commit if provided
    if (diffTarget && diffTarget !== 'HEAD') {
      const targeted = execSync(`git diff ${diffTarget} HEAD`, {
        cwd: root,
        encoding: 'utf8',
      });
      if (targeted.trim()) return targeted;
    }

    // Last resort: show the most recent commit's changes
    const lastCommit = execSync('git diff HEAD~1 HEAD', { cwd: root, encoding: 'utf8' });
    return lastCommit;
  } catch (err) {
    throw new Error(
      `Git diff failed: ${err.message}\n  Make sure you are in a git repository and git is installed.`
    );
  }
}

export function getChangedFiles(diff) {
  const files = [];
  const lines = diff.split('\n');
  for (const line of lines) {
    if (line.startsWith('diff --git ')) {
      // Format: "diff --git a/src/App.jsx b/src/App.jsx"
      const match = line.match(/b\/(.+)$/);
      if (match) files.push(match[1]);
    }
  }
  return files;
}
