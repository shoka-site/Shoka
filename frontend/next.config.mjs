/** @type {import('next').NextConfig} */
const nextConfig = {
    // SEO & Performance optimizations
    i18n: {
        locales: ['ar', 'en'],
        defaultLocale: 'ar',
    },
    
    // Ensure proper asset handling
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    
    // Generate ETags for caching
    generateEtags: true,
    
    // Enable trailing slashes for better SEO
    trailingSlash: true,
};

export default nextConfig;
