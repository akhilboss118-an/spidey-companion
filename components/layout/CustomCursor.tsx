"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on non-touch devices
    if (
      typeof window === "undefined" ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    )
      return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = -100;
    let ringY = -100;
    let mouseX = -100;
    let mouseY = -100;
    let isHovering = false;
    let rafId = 0;

    // ── Move DOT instantly (zero lag) ────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot: direct CSS transform — absolutely no lag
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // ── Ring follows with a gentle lerp (fast = 0.18) ────────────────
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animateRing = () => {
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);
      const scale = isHovering ? 2.2 : 1;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px) scale(${scale})`;
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();

    // ── Hover detection ───────────────────────────────────────────────
    const SELECTORS = "a, button, [data-cursor]";

    const handleEnter = () => {
      isHovering = true;
      ring.style.borderColor = "#E31C25";
      ring.style.backgroundColor = "rgba(227,28,37,0.08)";
      dot.style.backgroundColor = "#FF4D55";
      dot.style.width = "6px";
      dot.style.height = "6px";
    };
    const handleLeave = () => {
      isHovering = false;
      ring.style.borderColor = "rgba(255,255,255,0.35)";
      ring.style.backgroundColor = "transparent";
      dot.style.backgroundColor = "#E31C25";
      dot.style.width = "8px";
      dot.style.height = "8px";
    };

    // Delegated event listeners on document
    const onEnter = (e: MouseEvent) => {
      if ((e.target as Element)?.closest(SELECTORS)) handleEnter();
    };
    const onLeave = (e: MouseEvent) => {
      if ((e.target as Element)?.closest(SELECTORS)) handleLeave();
    };

    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });

    // Hide on mouse leave window
    const onLeaveWindow = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnterWindow = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot — zero lag via direct transform */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#E31C25] pointer-events-none z-[9999] transition-colors duration-150 hidden md:block will-change-transform"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      {/* Ring — smooth lerp at 0.18 speed */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/35 pointer-events-none z-[9998] transition-colors duration-200 transition-transform hidden md:block will-change-transform"
        style={{ transform: "translate(-100px, -100px)" }}
      />
    </>
  );
}
