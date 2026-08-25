"use client";

import { useEffect, useRef } from "react";
import { Mic } from "lucide-react";

interface ScreenElement {
  label: string;
  sub?: string;
  isTitle?: boolean;
  isEmotion?: boolean;
  isChat?: boolean;
  isAI?: boolean;
  isSub?: boolean;
  isWave?: boolean;
}

interface PhoneScreen {
  title: string;
  icon: string;
  description: string;
  color: string;
  elements: ScreenElement[];
}

const PHONE_SCREENS: PhoneScreen[] = [
  {
    title: "Companion",
    icon: "🕷️",
    description: "Your 3D Spider-Man companion",
    color: "#E31C25",
    elements: [
      { label: "Spidey Companion", sub: "AI · Voice · 3D", isTitle: true },
      { label: "MOOD: HAPPY ❤️", isEmotion: true },
      { label: "Hey! How are you doing today?", isChat: true, isAI: true },
      { label: "I'm feeling great!", isChat: true, isAI: false },
    ],
  },
  {
    title: "Voice Chat",
    icon: "🎙️",
    description: "Speak naturally",
    color: "#FF4D55",
    elements: [
      { label: "Voice Mode Active", sub: "Listening...", isTitle: true },
      { label: "●●●●●", isWave: true },
      { label: "Tap to speak to Spidey", isSub: true },
    ],
  },
  {
    title: "Emotions",
    icon: "💡",
    description: "Reactive character",
    color: "#E31C25",
    elements: [
      { label: "Emotion State", sub: "Detected", isTitle: true },
      { label: "😄 EXCITED", isEmotion: true },
      { label: "That's amazing! Tell me more!", isChat: true, isAI: true },
    ],
  },
];

export default function AppPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const load = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(sectionRef.current?.querySelectorAll(".phone-mock") ?? [], {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    };
    load();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#E31C25]/4 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-3 font-semibold">
            App Preview
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            THE APP IN{" "}
            <span className="gradient-text-red">YOUR HANDS</span>
          </h2>
          <p className="text-[#A0A0B0] mt-4 max-w-md mx-auto">
            A premium mobile experience built natively with Flutter.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-end justify-center gap-6 sm:gap-4">
          {PHONE_SCREENS.map((screen, i) => (
            <div
              key={screen.title}
              className={`phone-mock flex-shrink-0 ${
                i === 1 ? "sm:-mt-8 scale-105 z-10" : "opacity-90"
              }`}
            >
              {/* Phone frame */}
              <div
                className="w-52 rounded-[2.5rem] border-2 border-white/10 bg-[#12121A] overflow-hidden shadow-2xl"
                style={{ boxShadow: `0 30px 80px ${screen.color}22` }}
              >
                {/* Status bar */}
                <div className="flex justify-between items-center px-5 pt-3 pb-1">
                  <span className="text-white text-[9px] font-medium">9:41</span>
                  <div className="w-16 h-4 rounded-full bg-black" />
                  <div className="flex gap-1">
                    <div className="w-3 h-1.5 rounded-sm bg-white/40" />
                  </div>
                </div>

                {/* App content */}
                <div className="px-4 py-3 min-h-[400px] flex flex-col gap-3">
                  {screen.elements.map((el, j) => (
                    <div key={j}>
                      {el.isTitle && (
                        <div className="mb-2">
                          <p className="text-white font-black text-sm">{el.label}</p>
                          {el.sub && <p className="text-[#A0A0B0] text-[10px]">{el.sub}</p>}
                        </div>
                      )}
                      {el.isEmotion && (
                        <div
                          className="px-3 py-1.5 rounded-full text-[10px] font-bold text-center"
                          style={{
                            background: `${screen.color}22`,
                            color: screen.color,
                            border: `1px solid ${screen.color}44`,
                          }}
                        >
                          {el.label}
                        </div>
                      )}
                      {el.isChat && (
                        <div className={`flex ${el.isAI ? "justify-start" : "justify-end"}`}>
                          <div
                            className="px-3 py-2 rounded-2xl text-[10px] max-w-[80%] leading-tight"
                            style={
                              el.isAI
                                ? { background: "#1E1E2A", color: "#ffffff" }
                                : { background: screen.color, color: "white" }
                            }
                          >
                            {el.label}
                          </div>
                        </div>
                      )}
                      {el.isSub && (
                        <p className="text-center text-[#A0A0B0] text-[10px]">{el.label}</p>
                      )}
                      {el.isWave && (
                        <div className="flex items-center justify-center gap-1 my-4">
                          {[3, 6, 9, 7, 4, 8, 5].map((h, k) => (
                            <div
                              key={k}
                              className="w-1 rounded-full animate-pulse"
                              style={{
                                height: `${h * 2}px`,
                                background: screen.color,
                                animationDelay: `${k * 0.1}s`,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Voice button at bottom */}
                  <div className="mt-auto flex justify-center pb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: screen.color }}
                    >
                      <Mic size={18} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="flex justify-center pb-3">
                  <div className="w-20 h-1 rounded-full bg-white/20" />
                </div>
              </div>

              <p className="text-center text-[#A0A0B0] text-xs mt-3 tracking-widest uppercase">
                {screen.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
