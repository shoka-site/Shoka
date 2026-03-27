// ---------------------------------------------------------------------------
// Environment variable validation
// Call validateEnv() at application startup to fail fast on missing config.
// ---------------------------------------------------------------------------

const REQUIRED_VARS = [
  'DATABASE_URL',
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD',
] as const;

export function validateEnv(): void {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    const list = missing.join(', ');
    throw new Error(
      `[env] Missing required environment variables: ${list}\n` +
      `Copy .env.example to .env and fill in the values.`
    );
  }
}
