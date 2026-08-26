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
      <div
        className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden glass border border-white/10 group cursor-pointer shadow-2xl hover:border-[#E31C25]/40 transition-all duration-300 hover:scale-[1.01]"
        onClick={() => setModalOpen(true)}
      >
        <div className="aspect-video relative overflow-hidden bg-[#12121A] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={VIDEO_URLS.thumbnail || "/thumbnails/trailer.jpg"}
            alt="Official Spidey Companion Trailer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-[#E31C25] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-red-500/50">
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
            <p className="text-white font-semibold text-xs sm:text-sm tracking-wide bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 shadow-lg">
              ▶ Watch the Official Spidey Companion Trailer & Demo
            </p>
          </div>
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
