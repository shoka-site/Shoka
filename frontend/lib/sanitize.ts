// ---------------------------------------------------------------------------
// Server-side text sanitizer for user-submitted input.
// Strips HTML tags, script injection vectors, and javascript: protocols before
// data is persisted to the database. This is a defence-in-depth measure —
// React already auto-escapes on render, but sanitizing at the storage layer
// protects email templates, admin exports, and any future rendering paths.
// ---------------------------------------------------------------------------

/**
 * Strips all HTML markup and common injection vectors from a plain-text string.
 * Input is expected to be plain text; no HTML is intentionally preserved.
 */
export function sanitizeText(input: string): string {
  return (
    input
      // Remove <script>...</script> blocks and their content entirely
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Remove <style>...</style> blocks
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      // Remove all remaining HTML/XML tags
      .replace(/<[^>]+>/g, '')
      // Remove javascript: and vbscript: protocol strings
      .replace(/(?:javascript|vbscript|data)\s*:/gi, '')
      // Remove HTML event handler attributes (onerror=, onclick=, etc.)
      .replace(/\bon\w+\s*=/gi, '')
      // Collapse excess whitespace introduced by tag removal
      .replace(/\s{2,}/g, ' ')
      .trim()
  );
}

/**
 * Sanitizes an optional string field. Returns undefined if input is nullish.
 */
export function sanitizeOptionalText(input: string | null | undefined): string | undefined {
  if (input == null) return undefined;
  const cleaned = sanitizeText(input);
  return cleaned.length > 0 ? cleaned : undefined;
}
