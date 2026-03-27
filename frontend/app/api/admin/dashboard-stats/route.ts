import { storage } from '@/lib/storage';
import { assertAdmin } from '@/lib/auth';
import { ok, withErrorHandler } from '@/lib/api-response';

export const GET = withErrorHandler(async () => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const [
    services,
    projects,
    testimonials,
    updates,
    industries,
    solutions,
    packages,
  ] = await Promise.all([
    storage.getServiceCount(),
    storage.getProjectCount(),
    storage.getTestimonialCount(),
    storage.getPlatformUpdateCount(),
    storage.getIndustryCount(),
    storage.getSolutionCount(),
    storage.getPackageCount(),
  ]);

  return ok({ services, projects, testimonials, updates, industries, solutions, packages });
});
