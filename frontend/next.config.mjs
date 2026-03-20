/** @type {import('next').NextConfig} */
const nextConfig = {
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
    output: 'standalone',
};

export default nextConfig;
