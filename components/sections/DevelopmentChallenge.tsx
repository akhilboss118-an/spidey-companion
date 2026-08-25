"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle, Clock, Play, X } from "lucide-react";
import { DEVELOPMENT_DAYS } from "@/config/app.config";

function getYouTubeEmbed(url: string) {
  if (!url) return "";
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
}

export default function DevelopmentChallenge() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeVideo, setActiveVideo] = useState<{ day: number; url: string; title: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(sectionRef.current?.querySelectorAll(".day-card") ?? [], {
        x: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
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
    <section ref={sectionRef} className="section-padding relative">
      {/* Red accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#E31C25] to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-16">
          <div>
            <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-3 font-semibold">
              Development Story
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              MY 6-DAY AI
              <br />
              <span className="gradient-text-red">COMPANION CHALLENGE</span>
            </h2>
          </div>
          <p className="text-[#A0A0B0] max-w-sm leading-relaxed pt-2">
            Built this entire AI companion app from scratch in just 6 days — documenting every step of the journey with daily devlogs.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector on desktop */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#E31C25]/20 via-[#E31C25]/40 to-[#E31C25]/20 hidden lg:block" />

          <div className="space-y-6">
            {DEVELOPMENT_DAYS.map((day) => (
              <div
                key={day.day}
                className="day-card flex items-start gap-6 group"
              >
                {/* Day indicator */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-sm font-black z-10 relative transition-transform group-hover:scale-110 ${
                      day.status === "done"
                        ? "bg-[#E31C25] text-white shadow-lg shadow-red-500/20"
                        : "glass border border-white/20 text-[#A0A0B0]"
                    }`}
                  >
                    {day.day}/6
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 glass rounded-2xl p-5 hover:border-[#E31C25]/30 transition-all duration-300 group-hover:-translate-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold text-lg tracking-tight">
                        DAY {day.day} — {day.title}
                      </h3>
                      {day.status === "done" ? (
                        <CheckCircle size={18} className="text-[#E31C25] flex-shrink-0" />
                      ) : (
                        <Clock size={18} className="text-[#A0A0B0] flex-shrink-0" />
                      )}
                    </div>

                    {day.video && (
                      <button
                        onClick={() => setActiveVideo({ day: day.day, url: getYouTubeEmbed(day.video), title: `Day ${day.day}: ${day.title}` })}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E31C25]/15 text-[#E31C25] hover:bg-[#E31C25] hover:text-white transition-all text-xs font-semibold w-fit"
                      >
                        <Play size={12} fill="currentColor" /> Watch Video
                      </button>
                    )}
                  </div>
                  <p className="text-[#A0A0B0] text-sm leading-relaxed">{day.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/development"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#E31C25] text-white font-bold tracking-wide hover:bg-[#FF4D55] transition-all hover:shadow-lg hover:shadow-red-500/25 hover:scale-105"
          >
            SEE THE FULL JOURNEY
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999] flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#E31C25] transition-colors"
            onClick={() => setActiveVideo(null)}
          >
            <X size={20} />
          </button>
          <div
            className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-[#0A0A0F] shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={activeVideo.url}
              title={activeVideo.title}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      )}
    </section>
  );
}
