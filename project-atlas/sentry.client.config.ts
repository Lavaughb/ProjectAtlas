import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Capture 100% of transactions for performance monitoring
  tracesSampleRate: 1.0,

  // Capture replays on 10% of sessions, 100% on errors
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration(),
  ],

  // Set to true during development to see what Sentry captures
  debug: false,
});
