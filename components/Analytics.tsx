"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

const SCROLL_DEPTHS = [25, 50, 75, 100];

type Device = "mobile" | "tablet" | "desktop";

function detectDevice(): Device {
  const ua = navigator.userAgent || "";
  const hasTouch = "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0;
  if (/ipad|tablet/i.test(ua)) return "tablet";
  if (/mobi|android|iphone|ipod/i.test(ua)) return "mobile";
  if (!hasTouch) return "desktop";
  const width = Math.min(window.screen.width, window.screen.height);
  if (width < 768) return "mobile";
  if (width <= 1024) return "tablet";
  return "desktop";
}

const device: Device = typeof window === "undefined" ? "desktop" : detectDevice();

function isPostHogReady() {
  return typeof posthog.capture === "function";
}

export function trackEvent(name: string, properties?: Record<string, string | number | boolean | null>) {
  if (!isPostHogReady()) return;
  posthog.capture(name, { ...properties, device });
}

function describeTarget(el: Element | null): string {
  if (!el) return "unknown";
  const label =
    el.getAttribute("aria-label") ||
    el.getAttribute("name") ||
    (el.textContent ?? "").trim().slice(0, 60);
  const tag = el.tagName.toLowerCase();
  return `${tag}: ${label || el.getAttribute("href") || "unknown"}`;
}

export default function AnalyticsProvider() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest?.(
        'a, button, [role="button"], input, select, textarea, label'
      );
      if (!el) return;
      const kind =
        el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT"
          ? "focus"
          : "click";
      trackEvent("interaction", {
        kind,
        target: describeTarget(el),
        path: window.location.pathname,
      });
    };

    const reportScroll = (depth: number) => {
      trackEvent("scroll_depth", {
        depth,
        path: window.location.pathname,
      });
    };

    const fired = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const ratio = (window.scrollY / scrollable) * 100;
      for (const depth of SCROLL_DEPTHS) {
        if (!fired.has(depth) && ratio >= depth) {
          fired.add(depth);
          reportScroll(depth);
        }
      }
    };

    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}