// ---------------------------------------------------------------------------
// Fail-fast environment validation.
// Called once at server startup via instrumentation.ts register().
// The app must never boot with a broken or incomplete configuration.
// ---------------------------------------------------------------------------

const REQUIRED_VARS = [
  'DATABASE_URL',
  'DIRECT_URL',
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD',
  'ADMIN_SESSION_SECRET',
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_API_URL',
] as const;

export function validateEnv(): void {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]?.trim());

  if (missing.length > 0) {
    throw new Error(
      `[env] Missing required environment variables: ${missing.join(', ')}.\n` +
        'Check .env.example for the full list of required variables and their format.'
    );
  }

  // ADMIN_SESSION_SECRET must be at least 32 bytes — shorter secrets are too
  // weak for HMAC-SHA256 session token signing.
  const secret = process.env.ADMIN_SESSION_SECRET!;
  if (Buffer.from(secret, 'utf8').length < 32) {
    throw new Error(
      '[env] ADMIN_SESSION_SECRET must be at least 32 characters long.\n' +
        'Generate one with: node -e "require(\'crypto\').randomBytes(32).toString(\'hex\')" | pbcopy'
    );
  }
}
