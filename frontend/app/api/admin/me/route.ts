import { assertAdmin } from '@/lib/auth';
import { ok } from '@/lib/api-response';

// Returns 200 when the admin_auth cookie is valid, 401 otherwise.
// Used by AuthContext on mount to verify session without relying on localStorage.
export async function GET() {
  const deny = await assertAdmin();
  if (deny) return deny;
  return ok({ authenticated: true });
}
