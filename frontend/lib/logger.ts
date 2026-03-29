// ---------------------------------------------------------------------------
// Structured JSON logger — works in Node.js and Edge (no Node-only APIs).
// Every log line is a single JSON object on stdout/stderr, making it trivially
// parseable by any log aggregation tool (Datadog, CloudWatch, Grafana Loki).
//
// Usage:
//   logger.info('User logged in', { userId, ip });
//   logger.error('DB query failed', { error: err.message, query });
//   logger.audit('create', 'service', id, { title: data.titleEn });
// ---------------------------------------------------------------------------

type Level = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: Level;
  message: string;
  [key: string]: unknown;
}

function write(level: Level, message: string, meta?: Record<string, unknown>): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    env: process.env.NODE_ENV,
    ...meta,
  };

  const line = JSON.stringify(entry);

  if (level === 'error' || level === 'warn') {
    console.error(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  debug: (message: string, meta?: Record<string, unknown>): void =>
    write('debug', message, meta),

  info: (message: string, meta?: Record<string, unknown>): void =>
    write('info', message, meta),

  warn: (message: string, meta?: Record<string, unknown>): void =>
    write('warn', message, meta),

  error: (message: string, meta?: Record<string, unknown>): void =>
    write('error', message, meta),

  // Dedicated audit helper — creates a consistent, queryable trail of all
  // admin mutations. Every create/update/delete must call this.
  audit: (
    action: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'login_failed' | 'login_blocked',
    entity: string,
    id: string,
    meta?: Record<string, unknown>
  ): void =>
    write('info', `AUDIT:${action}`, { entity, entityId: id, ...meta }),
};
