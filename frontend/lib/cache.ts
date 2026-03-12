/**
 * In-memory cache implementation for database queries
 * This reduces database latency by caching frequently accessed data
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface CacheOptions {
  ttl: number; // Time to live in milliseconds
}

/**
 * Simple in-memory cache with TTL support
 */
class MemoryCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private defaultTtl: number;

  constructor(defaultTtl: number = 5 * 60 * 1000) { // Default 5 minutes
    this.defaultTtl = defaultTtl;
  }

  private generateKey(...args: unknown[]): string {
    return JSON.stringify(args);
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.defaultTtl) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.data;
  }

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  invalidatePattern(pattern: string): void {
    // Simple pattern matching - removes keys that start with the pattern
    for (const key of this.cache.keys()) {
      if (key.startsWith(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }

  // Get cache size for monitoring
  size(): number {
    return this.cache.size;
  }

  // Clean up expired entries
  cleanup(): number {
    const now = Date.now();
    let removed = 0;
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.defaultTtl) {
        this.cache.delete(key);
        removed++;
      }
    }
    return removed;
  }
}

/**
 * Cache factory with typed caches for different data types
 */
export class CacheFactory {
  // Cache instances for different data types
  static services = new MemoryCache<unknown>(5 * 60 * 1000); // 5 minutes
  static projects = new MemoryCache<unknown>(5 * 60 * 1000);
  static testimonials = new MemoryCache<unknown>(5 * 60 * 1000);
  static platformUpdates = new MemoryCache<unknown>(5 * 60 * 1000);
  static industries = new MemoryCache<unknown>(5 * 60 * 1000);
  static solutions = new MemoryCache<unknown>(5 * 60 * 1000);
  static teamMembers = new MemoryCache<unknown>(5 * 60 * 1000);
  static packages = new MemoryCache<unknown>(5 * 60 * 1000);
  static consultations = new MemoryCache<unknown>(5 * 60 * 1000);

  /**
   * Invalidate all caches - useful when data is updated
   */
  static invalidateAll(): void {
    this.services.clear();
    this.projects.clear();
    this.testimonials.clear();
    this.platformUpdates.clear();
    this.industries.clear();
    this.solutions.clear();
    this.teamMembers.clear();
    this.packages.clear();
    this.consultations.clear();
  }

  /**
   * Invalidate caches related to a specific entity
   */
  static invalidate(entity: string): void {
    switch (entity) {
      case 'services':
        this.services.clear();
        break;
      case 'projects':
        this.projects.clear();
        break;
      case 'testimonials':
        this.testimonials.clear();
        break;
      case 'platformUpdates':
      case 'platform-updates':
        this.platformUpdates.clear();
        break;
      case 'industries':
        this.industries.clear();
        break;
      case 'solutions':
        this.solutions.clear();
        break;
      case 'teamMembers':
      case 'team':
        this.teamMembers.clear();
        break;
      case 'packages':
        this.packages.clear();
        break;
      case 'consultations':
        this.consultations.clear();
        break;
    }
  }
}

/**
 * Helper to create a cached fetch function
 */
export function createCachedFetch<T>(
  cache: MemoryCache<T>,
  fetchFn: () => Promise<T>,
  key: string
): () => Promise<T> {
  return async () => {
    const cached = cache.get(key);
    if (cached) {
      return cached;
    }

    const data = await fetchFn();
    cache.set(key, data);
    return data;
  };
}

/**
 * Cache statistics for monitoring
 */
export function getCacheStats() {
  return {
    services: CacheFactory.services.size(),
    projects: CacheFactory.projects.size(),
    testimonials: CacheFactory.testimonials.size(),
    platformUpdates: CacheFactory.platformUpdates.size(),
    industries: CacheFactory.industries.size(),
    solutions: CacheFactory.solutions.size(),
    teamMembers: CacheFactory.teamMembers.size(),
    packages: CacheFactory.packages.size(),
    consultations: CacheFactory.consultations.size(),
  };
}
