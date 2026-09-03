"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronDown, Sparkles, Download, ArrowRight } from "lucide-react";
import { APP_NAME } from "@/config/app.config";

const SpideyCanvas = dynamic(() => import("../3d/SpideyCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-[#E31C25] border-t-transparent animate-spin" />
    </div>
  ),
});

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const gsap = (await import("gsap")).default;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(headlineRef.current, { y: 40, opacity: 0, duration: 0.9 })
        .from(subRef.current, { y: 25, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.3");
    };
    load();
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20 sm:pt-24 pb-12 sm:pb-16">
      {/* Dynamic Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#E31C25]/8 blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/6 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full bg-[#330000]/40 blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Text content */}
        <div className="z-10 order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#E31C25]/25 mb-4 sm:mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#E31C25] animate-pulse" />
            <span className="text-[11px] sm:text-xs text-[#A0A0B0] font-semibold tracking-wider uppercase">
              3D AI Companion · Flutter App
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-4 sm:mb-6"
          >
            MEET YOUR
            <br />
            <span className="gradient-text-red">AI COMPANION</span>
          </h1>

          <p
            ref={subRef}
            className="text-base sm:text-lg text-[#A0A0B0] leading-relaxed mb-3 max-w-lg"
          >
            A 3D AI companion that can listen, talk, respond and react emotionally to your conversations.
          </p>
          <p className="text-xs sm:text-sm text-[#A0A0B0]/70 mb-6 sm:mb-8 font-medium">
            Built with Flutter & Three.js. Powered by Gemini & Groq AI.
          </p>

          {/* Action CTAs (Full width on mobile for effortless touch) */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/companion"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-[#E31C25] text-white font-bold tracking-wide hover:bg-[#FF4D55] transition-all duration-200 hover:shadow-xl hover:shadow-red-500/25 active:scale-95 sm:hover:scale-105 text-sm sm:text-base"
            >
              <Sparkles size={18} />
              MEET YOUR COMPANION
            </Link>
            <Link
              href="/download"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full glass border border-white/15 text-white font-semibold tracking-wide hover:border-white/30 transition-all duration-200 active:scale-95 sm:hover:scale-105 text-sm sm:text-base"
            >
              <Download size={18} />
              DOWNLOAD APK (v1.2.0)
            </Link>
          </div>

          {/* App technology stack chips */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-6 sm:mt-8">
            {["Flutter", "3D WebGL", "Gemini 1.5", "Groq 120B", "Vision AI"].map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-[#A0A0B0] text-[11px] font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* 3D Model Interactive Viewport */}
        <div className="relative order-1 lg:order-2 flex flex-col items-center justify-center w-full">
          <div
            className="relative w-full max-w-sm sm:max-w-md lg:max-w-full rounded-2xl overflow-hidden"
            style={{ height: "clamp(340px, 48vh, 560px)" }}
          >
            {/* Ambient Radial Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-[#E31C25]/12 blur-3xl" />
            </div>

            <SpideyCanvas
              className="w-full h-full"
              height="100%"
              enableMouseTracking={true}
              initialEmotion="neutral"
            />
          </div>

          {/* Floating Mobile/Desktop Info Pills */}
          <div className="flex items-center justify-center gap-3 mt-2 w-full max-w-sm">
            <div className="glass rounded-xl px-3 py-1.5 border border-white/8 flex items-center gap-2 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span className="text-[#A0A0B0]">Powered by:</span>
              <span className="font-bold text-white">Gemini & Groq</span>
            </div>
            <div className="glass rounded-xl px-3 py-1.5 border border-white/8 flex items-center gap-2 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
              <span className="text-[#A0A0B0]">Engine:</span>
              <span className="font-bold text-white">Flutter Native</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 opacity-60">
        <span className="text-[10px] text-[#A0A0B0] tracking-widest uppercase">Scroll Down</span>
        <ChevronDown size={14} className="text-[#A0A0B0] animate-bounce" />
      </div>
    </section>
  );
}
