"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { VIDEO_URLS } from "@/config/app.config";

export default function VideoSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="section-padding max-w-7xl mx-auto px-6">
      <div className="text-center mb-8 sm:mb-12">
        <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-2 sm:mb-3 font-semibold">
          Official Trailer & Demo
        </p>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
          WATCH THE{" "}
          <span className="gradient-text-red">TRAILER</span>
        </h2>
      </div>

      {/* Thumbnail / play area */}
      <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden glass border border-white/8 group cursor-pointer" onClick={() => setModalOpen(true)}>
        {/* Placeholder thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-[#12121A] to-[#1a0a0a] flex flex-col items-center justify-center gap-4">
          <div className="absolute inset-0 bg-[#E31C25]/4" />
          {/* Spider web SVG pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 400 300">
            <line x1="200" y1="150" x2="200" y2="0" stroke="#E31C25" strokeWidth="1" />
            <line x1="200" y1="150" x2="350" y2="75" stroke="#E31C25" strokeWidth="1" />
            <line x1="200" y1="150" x2="350" y2="225" stroke="#E31C25" strokeWidth="1" />
            <line x1="200" y1="150" x2="200" y2="300" stroke="#E31C25" strokeWidth="1" />
            <line x1="200" y1="150" x2="50" y2="225" stroke="#E31C25" strokeWidth="1" />
            <line x1="200" y1="150" x2="50" y2="75" stroke="#E31C25" strokeWidth="1" />
            <ellipse cx="200" cy="150" rx="60" ry="60" fill="none" stroke="#E31C25" strokeWidth="1" />
            <ellipse cx="200" cy="150" rx="120" ry="100" fill="none" stroke="#E31C25" strokeWidth="1" />
          </svg>

          <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-[#E31C25] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-red-500/35">
            <Play size={26} className="text-white ml-1" fill="white" />
          </div>
          <p className="relative text-[#A0A0B0] text-xs sm:text-sm font-medium tracking-wide">
            ▶ Click to watch the Official Spidey Companion Trailer & Demo
          </p>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#E31C25] transition-colors"
            onClick={() => setModalOpen(false)}
          >
            <X size={20} />
          </button>
          <div
            className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-[#0A0A0F]"
            onClick={(e) => e.stopPropagation()}
          >
            {VIDEO_URLS.demo ? (
              <iframe
                src={VIDEO_URLS.demo}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <Play size={48} className="text-[#E31C25]" />
                <p className="text-[#A0A0B0]">Video coming soon. Stay tuned!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
