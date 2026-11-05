import type { NextConfig } from 'next';

// GitHub Pages serves only static files from /<repo-name>/, so that build is a
// static export with a base path. Everywhere else the app runs as a normal
// Next.js server (API routes, image optimization, redirects).
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      basePath,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      images: {
        formats: ['image/avif', 'image/webp'],
      },
      // Preserve SEO for the legacy react-router URL pairs that rendered
      // identical pages (/gallery + /before-and-after, /blog + /blogs).
      async redirects() {
        return [
          { source: '/gallery', destination: '/before-and-after', permanent: true },
          { source: '/blogs/:slug', destination: '/blog/:slug', permanent: true },
        ];
      },
    };

export default nextConfig;
