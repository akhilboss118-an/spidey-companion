"use client";

import dynamic from "next/dynamic";

const EmotionDemo = dynamic(() => import("./EmotionDemo"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center py-20">
      <div className="w-12 h-12 rounded-full border-2 border-[#E31C25] border-t-transparent animate-spin" />
    </div>
  ),
});

export default function EmotionDemoSection() {
  return (
    <section className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E31C25]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E31C25]/20 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-3 font-semibold">
            Interactive
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            WATCH HIM{" "}
            <span className="gradient-text-red">REACT</span>
          </h2>
          <p className="text-[#A0A0B0] max-w-md mx-auto">
            Click an emotion below and watch Spidey react in real-time.
          </p>
        </div>

        <EmotionDemo canvasHeight="420px" showCanvas={true} />
      </div>
    </section>
  );
}
