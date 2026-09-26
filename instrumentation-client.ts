import posthog from "posthog-js";

try {
  const key = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (key && host) {
    posthog.init(key, {
      api_host: "/ingest",
      capture_pageleave: true,
      capture_pageview: true,
      capture_exceptions: true,
      debug: process.env.NODE_ENV === "development",
      disable_session_recording: false,
    });
  }
} catch (error) {
  console.error("[PostHog] init failed", error);
}