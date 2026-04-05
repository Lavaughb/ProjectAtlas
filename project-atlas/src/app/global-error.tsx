"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ textAlign: "center", color: "#F5F5F0" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Something went wrong
          </h2>
          <button
            onClick={reset}
            style={{
              padding: "0.5rem 1.5rem",
              backgroundColor: "#c5a059",
              color: "#050505",
              border: "none",
              cursor: "pointer",
              fontSize: "0.9rem",
              letterSpacing: "0.05em",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
