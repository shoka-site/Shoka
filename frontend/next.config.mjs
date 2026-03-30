/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disable the client-side Router Cache so every page refresh fetches
    // fresh HTML from the server instead of serving stale cached segments.
    staleTimes: {
      dynamic: 0,
      static: 30,
    },
    // Tree-shake large packages at import time — reduces per-page JS bundle
    // significantly for libraries that don't support named exports properly.
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
      'date-fns',
    ],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  generateEtags: true,
  trailingSlash: true,
  output: 'standalone',

  // ---------------------------------------------------------------------------
  // Security + caching headers
  // ---------------------------------------------------------------------------
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';

    // Content-Security-Policy directives.
    // Why unsafe-inline for script-src:
    //   - app/layout.tsx injects an inline <script> for RTL detection and JSON-LD
    //     structured data — both are required at parse time before React hydrates.
    //   - Google Analytics uses an inline gtag() initialiser.
    //   Migrating to nonces would harden this further but requires middleware to
    //   generate and thread a per-request nonce through all rendering layers.
    // Why unsafe-eval in development only:
    //   - React dev mode uses eval() to reconstruct call stacks for debugging.
    //   - React NEVER uses eval() in production — safe to omit there.
    // Why unsafe-inline for style-src:
    //   - Framer Motion and Radix UI inject inline style attributes at runtime.
    //   - Tailwind utility classes applied dynamically also rely on inline styles.
    const csp = [
      "default-src 'self'",

      // Scripts: own origin + inline (JSON-LD + GA init) + Google Analytics + Vercel
      // unsafe-eval is added in dev only for React's call-stack debugging
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com`,

      // Styles: own origin + inline (Framer Motion, Radix, Tailwind dynamic classes)
      "style-src 'self' 'unsafe-inline'",

      // Images: own origin + data URIs (base64 placeholders) + any HTTPS host (next/image proxied remote images)
      "img-src 'self' data: blob: https:",

      // Fonts: served from same origin via next/font (no external font CDN)
      "font-src 'self'",

      // XHR / fetch / WebSocket: own origin + analytics endpoints
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://api.resend.com",

      // Media: own origin only
      "media-src 'self'",

      // No plugins (Flash, etc.)
      "object-src 'none'",

      // Iframes: own origin only (admin panel iframes if any)
      "frame-src 'self'",

      // Prevent this page from being embedded in any other site (replaces X-Frame-Options)
      "frame-ancestors 'none'",

      // Restrict <base> tag to same origin to prevent base-tag injection attacks
      "base-uri 'self'",

      // Restrict <form> submissions to same origin
      "form-action 'self'",

      // Force all sub-resource loads over HTTPS
      "upgrade-insecure-requests",
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking (legacy; CSP frame-ancestors is the modern equivalent)
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent MIME type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Control referrer information
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Force HTTPS for 2 years
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Restrict browser APIs
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          // Basic XSS protection for older browsers
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Content Security Policy
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
      // Public content API — cache at CDN/browser for 60s, serve stale for 30s while revalidating.
      // stale-while-revalidate was reduced from 300s to 30s so that CDN/proxy caches don't serve
      // deleted or updated content for more than ~90s total after an admin mutation fires revalidateTag.
      {
        source: '/api/content/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=30' },
        ],
      },
      // Long cache for truly static, build-fingerprinted assets (fonts, bundled icons).
      // Excludes user-uploaded images — those are handled by the /uploads rule below.
      {
        source: '/(.*)\\.(woff|woff2|ttf|otf|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Static images that are bundled at build time (not user uploads) — 1 day, no immutable.
      // Using immutable here would be wrong: these files don't have content-hash suffixes so the
      // browser would never re-fetch them even if they are replaced during a redeploy.
      {
        source: '/(.*)\\.(png|jpg|jpeg|gif|webp|avif|svg|mp4|webm)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=3600' },
        ],
      },
      // User-uploaded content — must never be cached long-term.
      // Files in /uploads/ are mutable: admin can delete a content item whose image is still
      // on disk, or replace it. `immutable` would lock deleted images in the browser cache for
      // up to a year. This rule overrides the broader image rule above for the uploads path.
      {
        source: '/uploads/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
