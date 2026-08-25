"use client";

import { useState } from "react";
import { CheckCircle, Play, X } from "lucide-react";
import { DEVELOPMENT_DAYS, APP_NAME } from "@/config/app.config";

function getYouTubeEmbed(url: string) {
  if (!url) return "";
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
}

export default function DevelopmentPage() {
  const [activeVideo, setActiveVideo] = useState<{ day: number; url: string; title: string } | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#E31C25]/5 blur-[120px]" />
        </div>
        <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-4 font-semibold relative z-10">
          The Journey
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 relative z-10">
          THE 6-DAY
          <br />
          <span className="gradient-text-red">JOURNEY</span>
        </h1>
        <p className="text-[#A0A0B0] max-w-xl mx-auto text-lg leading-relaxed relative z-10">
          Building a complete 3D AI companion Flutter app in 6 days — every step documented with video devlogs.
        </p>
      </section>

      {/* Day cards grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEVELOPMENT_DAYS.map((day) => (
            <div
              key={day.day}
              className="glass rounded-2xl overflow-hidden hover:border-[#E31C25]/30 transition-all duration-300 group hover:-translate-y-1 flex flex-col"
            >
              {/* Thumbnail */}
              {day.thumbnail ? (
                <div
                  className="relative aspect-video overflow-hidden cursor-pointer group/thumb"
                  onClick={() => day.video && setActiveVideo({ day: day.day, url: getYouTubeEmbed(day.video), title: `Day ${day.day}: ${day.title}` })}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={day.thumbnail}
                    alt={`Day ${day.day}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                  />
                  {day.video && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-[#E31C25] flex items-center justify-center shadow-lg shadow-red-500/40">
                        <Play size={20} fill="white" className="text-white ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="w-full aspect-video bg-gradient-to-br from-[#12121A] to-[#1a0808] flex items-center justify-center relative overflow-hidden cursor-pointer group/thumb"
                  onClick={() => day.video && setActiveVideo({ day: day.day, url: getYouTubeEmbed(day.video), title: `Day ${day.day}: ${day.title}` })}
                >
                  <div className="absolute inset-0 bg-[#E31C25]/5" />
                  <span className="text-6xl font-black text-[#E31C25]/20 relative z-10">
                    {day.day}
                  </span>
                  {day.video && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-[#E31C25] flex items-center justify-center shadow-lg shadow-red-500/40">
                        <Play size={20} fill="white" className="text-white ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#E31C25]/10 text-[#E31C25] text-[10px] font-bold tracking-widest">
                      DAY {day.day}/6
                    </span>
                    {day.status === "done" && (
                      <CheckCircle size={16} className="text-[#E31C25]" />
                    )}
                  </div>

                  <h3 className="text-white font-black text-lg tracking-tight mb-2">
                    {day.title}
                  </h3>
                  <p className="text-[#A0A0B0] text-sm leading-relaxed mb-4">
                    {day.description}
                  </p>
                </div>

                {/* Video button */}
                <div className="pt-2">
                  {day.video ? (
                    <button
                      onClick={() => setActiveVideo({ day: day.day, url: getYouTubeEmbed(day.video), title: `Day ${day.day}: ${day.title}` })}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E31C25]/10 text-[#E31C25] text-xs font-semibold hover:bg-[#E31C25] hover:text-white transition-all w-fit"
                    >
                      <Play size={12} fill="currentColor" /> Watch Day {day.day}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-[#A0A0B0] text-xs">
                      Video coming soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stack used */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="glass rounded-3xl p-10 text-center border border-white/5">
          <h2 className="text-3xl font-black tracking-tight mb-8">
            BUILT WITH
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Flutter", "Dart", "Three.js", "Gemini AI", "Groq", "Voice AI", "Custom Backend", "3D FBX Animations"].map((tech) => (
              <span
                key={tech}
                className="px-5 py-2.5 rounded-full glass border border-white/8 text-[#A0A0B0] text-sm font-medium hover:text-white hover:border-[#E31C25]/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

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
    </>
  );
}
