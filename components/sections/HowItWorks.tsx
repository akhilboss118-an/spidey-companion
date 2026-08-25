"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const FLOW_STEPS = [
  { id: "you",       label: "YOU",            sub: "User" },
  { id: "input",     label: "VOICE / TEXT",   sub: "Input" },
  { id: "backend",   label: "SECURE BACKEND", sub: "Server" },
  { id: "ai",        label: "GEMINI + GROQ",  sub: "AI Engine" },
  { id: "response",  label: "AI RESPONSE",    sub: "Output" },
  { id: "emotion",   label: "EMOTION",        sub: "Analysis" },
  { id: "character", label: "CHARACTER",      sub: "Reaction" },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const load = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const steps = sectionRef.current?.querySelectorAll(".flow-step");
      const arrows = sectionRef.current?.querySelectorAll(".flow-arrow");

      if (steps) {
        gsap.from(steps, {
          scale: 0.7,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      }
      if (arrows) {
        gsap.from(arrows, {
          scaleX: 0,
          opacity: 0,
          stagger: 0.1,
          duration: 0.4,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      }
    };
    load();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background line */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E31C25]/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-3 font-semibold">
            Architecture
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            HOW IT{" "}
            <span className="gradient-text-red">WORKS</span>
          </h2>
        </div>

        {/* Flow - desktop horizontal, mobile vertical */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-0 flex-wrap">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.id} className="flex flex-col lg:flex-row items-center">
              {/* Step node */}
              <div className="flow-step flex flex-col items-center">
                <div
                  className={`w-20 h-20 rounded-2xl glass border flex flex-col items-center justify-center text-center px-2 transition-all hover:border-[#E31C25]/40 hover:-translate-y-1 ${
                    step.id === "you" || step.id === "character"
                      ? "border-[#E31C25]/30 bg-[#E31C25]/5"
                      : "border-white/8"
                  }`}
                >
                  <span className="text-white font-black text-[9px] tracking-wider leading-tight">
                    {step.label}
                  </span>
                </div>
                <span className="text-[#A0A0B0] text-[10px] mt-2 tracking-widest uppercase">
                  {step.sub}
                </span>
              </div>

              {/* Arrow connector */}
              {i < FLOW_STEPS.length - 1 && (
                <div className="flow-arrow flex items-center lg:mx-2 my-2 lg:my-0 rotate-90 lg:rotate-0">
                  <ArrowRight size={14} className="text-[#E31C25]" />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-[#A0A0B0] text-xs mt-8 max-w-md mx-auto">
          No API keys are exposed on this website. All AI integration happens securely inside the Flutter app and backend.
        </p>
      </div>
    </section>
  );
}
