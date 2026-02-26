// scripts/lib/responseParser.js
// Parses Claude's JSON response into a structured analysis object.
// Handles edge cases where Claude adds markdown fences or preamble despite instructions.

export function parseResponse(rawResponse) {
  let cleaned = rawResponse.trim();

  // Strip markdown code fences if Claude added them despite instructions
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
  else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  cleaned = cleaned.trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (firstErr) {
    // Attempt to extract JSON from response if Claude added preamble text
    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      try {
        parsed = JSON.parse(cleaned.slice(jsonStart, jsonEnd + 1));
      } catch (secondErr) {
        throw new Error(
          `Could not parse Claude's response as JSON.\n\n` +
            `First attempt error: ${firstErr.message}\n` +
            `Second attempt error: ${secondErr.message}\n\n` +
            `First 800 chars of response:\n${rawResponse.slice(0, 800)}`
        );
      }
    } else {
      throw new Error(
        `Claude's response did not contain a JSON object.\n\n` +
          `Parse error: ${firstErr.message}\n\n` +
          `First 800 chars of response:\n${rawResponse.slice(0, 800)}`
      );
    }
  }

  // Validate the required top-level structure
  if (!parsed.summary) {
    throw new Error('Claude response JSON is missing required "summary" field.');
  }
  if (!parsed.documents) {
    throw new Error('Claude response JSON is missing required "documents" field.');
  }

  // Normalize defaults for any missing optional fields
  parsed.summary.changesDetected = parsed.summary.changesDetected || [];
  parsed.summary.totalGaps = parsed.summary.totalGaps || 0;
  parsed.summary.criticalGaps = parsed.summary.criticalGaps || 0;
  parsed.summary.triggerType = parsed.summary.triggerType || 'unknown';
  parsed.crossCuttingIssues = parsed.crossCuttingIssues || [];
  parsed.calculationsImpact = parsed.calculationsImpact || {
    affectsCalculations: false,
    explanation: '',
    filesToUpdate: [],
  };

  // Collect all fixes from all documents into a flat list for auto-apply
  const fixes = [];
  const docNames = Object.keys(parsed.documents);
  for (const docName of docNames) {
    const doc = parsed.documents[docName];
    if (!doc) continue;
    doc.gaps = doc.gaps || [];
    doc.fixes = doc.fixes || [];
    for (const fix of doc.fixes) {
      if (fix.searchFor && fix.replaceWith) {
        fixes.push({
          ...fix,
          document: docName,
          file: 'src/utils/documentGeneration.js',
        });
      }
    }
  }

  return {
    ...parsed,
    fixes, // flat list of all actionable fixes
  };
}
