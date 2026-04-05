import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },


  // Disable strict mode to prevent double-rendering in dev
  reactStrictMode: true,

  // Ensure trailing slashes for GitHub Pages
  trailingSlash: true,
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Upload source maps for readable stack traces in Sentry
  silent: !process.env.CI,

  // Disable server/edge features since this is a static export
  autoInstrumentServerFunctions: false,
  autoInstrumentMiddleware: false,
});

