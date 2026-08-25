"use client";

import { useEffect, useRef } from "react";
import { Cpu, Mic, Heart, Box } from "lucide-react";

const FEATURES = [
  { icon: Cpu,   title: "AI",       description: "AI-powered conversations using Gemini + Groq." },
  { icon: Mic,   title: "VOICE",    description: "Talk naturally. Your companion listens and responds." },
  { icon: Heart, title: "EMOTIONS", description: "The companion reacts to conversations emotionally." },
  { icon: Box,   title: "3D",       description: "An interactive 3D character — not a plain chat box." },
];

export default function WhatIsApp() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const load = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(sectionRef.current?.querySelectorAll(".reveal-item") ?? [], {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    };
    load();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 reveal-item">
        <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-3 font-semibold">
          What is this?
        </p>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
          MORE THAN A{" "}
          <span className="gradient-text-red">CHATBOT</span>
        </h2>
        <p className="text-[#A0A0B0] max-w-xl mx-auto leading-relaxed">
          This is a 3D AI companion that can listen, respond through AI, speak back, and react
          emotionally to your conversations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature, i) => (
          <div
            key={feature.title}
            className="reveal-item glass rounded-2xl p-6 hover:border-[#E31C25]/30 transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E31C25]/10 flex items-center justify-center mb-5 group-hover:bg-[#E31C25]/20 transition-colors">
              <feature.icon size={22} className="text-[#E31C25]" />
            </div>
            <h3 className="text-white font-bold tracking-widest text-sm mb-2">
              {feature.title}
            </h3>
            <p className="text-[#A0A0B0] text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
