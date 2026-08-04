import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize fonts & JavaScript for rapid surgical page rendering (Core Web Vitals LCP enhancement)
  reactStrictMode: true,
  poweredByHeader: false, // Security: hide framework identity from automated vulnerability scanners
  
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },

  // Enterprise Security & SEO Trust Headers for Medical Domains (YMYL - Your Money or Your Life)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Automated Bot & Probe Defense: deflect scanner scripts directly to triage portal without throwing server errors
  async redirects() {
    return [
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/xmlrpc.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/.env',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:path*.php',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
