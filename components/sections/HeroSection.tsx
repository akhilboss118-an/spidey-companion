"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import { APP_NAME } from "@/config/app.config";

const SpideyCanvas = dynamic(() => import("../3d/SpideyCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-14 h-14 rounded-full border-2 border-[#E31C25] border-t-transparent animate-spin" />
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
      tl.from(headlineRef.current, { y: 60, opacity: 0, duration: 1 })
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.7 }, "-=0.4");
    };
    load();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#E31C25]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#330000]/30 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div className="z-10 order-2 lg:order-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#E31C25]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E31C25] animate-pulse" />
            <span className="text-xs text-[#A0A0B0] tracking-widest uppercase">
              AI Companion · Flutter App
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6"
          >
            MEET YOUR
            <br />
            <span className="gradient-text-red">AI COMPANION</span>
          </h1>

          <p
            ref={subRef}
            className="text-lg text-[#A0A0B0] leading-relaxed mb-3 max-w-lg"
          >
            A 3D AI companion that can listen, talk, respond and react to you.
          </p>
          <p className="text-sm text-[#A0A0B0]/60 mb-8">
            Built with Flutter + Dart. Powered by AI.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <Link
              href="/companion"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E31C25] text-white font-bold tracking-wide hover:bg-[#FF4D55] transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105"
            >
              MEET YOUR AI COMPANION
            </Link>
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-white/10 text-white font-semibold tracking-wide hover:border-white/30 transition-all duration-200 hover:scale-105"
            >
              DOWNLOAD APP
            </Link>
          </div>

          {/* App stack badges */}
          <div className="flex items-center gap-3 mt-10">
            {["Flutter", "Gemini AI", "Groq", "3D"].map((badge) => (
              <span
                key={badge}
                className="px-3 py-1 rounded-md bg-white/5 border border-white/8 text-[#A0A0B0] text-xs font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* 3D canvas */}
        <div className="relative order-1 lg:order-2 flex items-center justify-center">
          <div className="relative w-full max-w-md lg:max-w-full" style={{ height: "560px" }}>
            {/* Glow ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-[#E31C25]/8 blur-3xl" />
            </div>
            <SpideyCanvas
              className="w-full h-full"
              height="560px"
              enableMouseTracking={true}
            />
          </div>

          {/* Floating stat cards */}
          <div className="absolute top-8 -left-4 glass rounded-xl px-4 py-3 border border-white/8 hidden lg:block">
            <p className="text-xs text-[#A0A0B0]">Powered by</p>
            <p className="text-sm font-bold text-white">Gemini + Groq</p>
          </div>
          <div className="absolute bottom-16 -right-4 glass rounded-xl px-4 py-3 border border-white/8 hidden lg:block">
            <p className="text-xs text-[#A0A0B0]">Built with</p>
            <p className="text-sm font-bold text-white">Flutter + Dart</p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <span className="text-xs text-[#A0A0B0] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-[#A0A0B0]" />
      </div>
    </section>
  );
}
