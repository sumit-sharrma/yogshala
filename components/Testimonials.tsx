"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { testimonials, type Testimonial } from "@/data/testimonials";

const ROW_COUNT = 2;
const mid = Math.ceil(testimonials.length / ROW_COUNT);
const row1Items = testimonials.slice(0, mid);
const row2Items = testimonials.slice(mid);

// Duplicate each row for seamless infinite loop
const duplicatedRow1 = [...row1Items, ...row1Items];
const duplicatedRow2 = [...row2Items, ...row2Items];

const SCROLL_DURATION = 70000; // 70 seconds per full loop (slow speed)

const starsHtml = (count: number) =>
  Array.from({ length: count }).map((_, i) => (
    <svg
      key={i}
      className="w-4 h-4 fill-current text-clay-500"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.363 1.118l1.286 3.958c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.175 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.285-3.958a1 1 0 00-.362-1.118L2.363 9.385c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
    </svg>
  ));

const Card = ({ item }: { item: Testimonial }) => (
  <figure
    data-card
    className="flex-none w-full max-w-[380px] shrink-0 bg-white border border-hairline rounded-2xl shadow-soft flex flex-col p-8 h-[420px] overflow-hidden"
  >
    <div className="flex items-start gap-3 mb-6">
      {starsHtml(item.stars)}
    </div>
    <blockquote className="text-fluid-small text-ink-soft leading-relaxed mb-6 flex-1">
      “{item.quote}”
    </blockquote>
    <figcaption className="flex items-center gap-3 pt-4 border-t border-hairline">
      <span
        className="w-10 h-10 rounded-full bg-gradient-to-br from-clay-500 to-clay-600 flex items-center justify-center text-white font-semibold text-sm"
      >
        {item.name.charAt(0)}
      </span>
      <span>
        <span className="block text-fluid-small font-semibold text-ink">
          {item.name}
        </span>
        <span className="block text-fluid-small text-ink-faint">
          {item.role}
        </span>
      </span>
    </figcaption>
  </figure>
);

type RowProps = {
  items: Testimonial[];
  duplicatedItems: Testimonial[];
  rowIndex: number;
  direction: "ltr" | "rtl";
  trackRef: React.RefObject<HTMLDivElement | null>;
};

const AutoScrollRow = ({
  items,
  duplicatedItems,
  rowIndex,
  direction,
  trackRef,
}: RowProps) => {
  const isHovered = useRef(false);
  const animationRef = useRef<number | null>(null);
  const singleWidth = useRef<number>(0);
  const startTime = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    singleWidth.current = track.scrollWidth / 2;

    // Initial position
    if (direction === "ltr") {
      track.scrollLeft = 0;
    } else {
      track.scrollLeft = singleWidth.current;
    }

    startTime.current = performance.now();

    let lastTime = 0;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;

      const trackEl = trackRef.current;
      if (!trackEl) return;

      if (isHovered.current) {
        lastTime = time;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // If we just resumed from hover, anchor startTime so progress continues
      // from the current scroll position instead of jumping to 0.
      if (startTime.current === 0) {
        const trackEl = trackRef.current!;
        const current = direction === "ltr" ? trackEl.scrollLeft : singleWidth.current - trackEl.scrollLeft;
        startTime.current = time - (current / singleWidth.current) * SCROLL_DURATION;
      }

      const elapsed = time - startTime.current;
      const progress = (elapsed % SCROLL_DURATION) / SCROLL_DURATION;
      const targetScroll = progress * singleWidth.current;

      if (direction === "ltr") {
        trackEl.scrollLeft = targetScroll;
      } else {
        trackEl.scrollLeft = singleWidth.current - targetScroll;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      isHovered.current = true;
      startTime.current = 0;
    };
    const handleMouseLeave = () => {
      isHovered.current = false;
    };

    track.addEventListener("mouseenter", handleMouseEnter);
    track.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      track.removeEventListener("mouseenter", handleMouseEnter);
      track.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [items, duplicatedItems, rowIndex, direction, trackRef, SCROLL_DURATION]);

  return (
    <div className="relative w-full">
      {/* Viewport: clips overflow, no scrollbar visible */}
      <div className="w-full overflow-x-hidden scrollbar-hide relative">
        {/* Gradient masks for smooth edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-paper via-paper/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-paper via-paper/60 to-transparent" />

        {/* Track: items-stretch ensures all cards have equal height */}
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 pb-8 min-w-full overflow-x-scroll scrollbar-hide"
          style={{ scrollBehavior: "auto" }}
        >
          {duplicatedItems.map((item, i) => (
            <Card key={`${item.name}-${rowIndex}-${i}`} item={item} />
          ))}
          <div className="w-24" />
        </div>
      </div>
    </div>
  );
};

export default function Testimonials() {
  const row1TrackRef = useRef<HTMLDivElement>(null);
  const row2TrackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="testimonials">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-clay-600">
            <span className="w-2 h-2 rounded-full bg-clay-500" />
            Testimonials
          </span>
          <h2 className="mt-3 font-display text-fluid-h2 font-semibold tracking-tight text-ink">
            Discover What Our Customers Are Saying
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Real stories from people who found relief at Sthiram Yoga Shala.
          </p>
        </div>

        <div className="relative">
          <div className="flex flex-col gap-10">
            <AutoScrollRow
              items={row1Items}
              duplicatedItems={duplicatedRow1}
              rowIndex={0}
              direction="ltr"
              trackRef={row1TrackRef}
            />
            <AutoScrollRow
              items={row2Items}
              duplicatedItems={duplicatedRow2}
              rowIndex={1}
              direction="rtl"
              trackRef={row2TrackRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
