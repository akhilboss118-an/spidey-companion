"use client";

import dynamic from "next/dynamic";

const EmotionDemo = dynamic(() => import("./EmotionDemo"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center py-16">
      <div className="w-10 h-10 rounded-full border-2 border-[#E31C25] border-t-transparent animate-spin" />
    </div>
  ),
});

export default function EmotionDemoSection() {
  return (
    <section className="py-12 sm:py-20 relative">
      {/* Dynamic top/bottom borders */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E31C25]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E31C25]/20 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-2 sm:mb-3 font-semibold">
            Interactive 3D Demo
          </p>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 sm:mb-4">
            WATCH HIM{" "}
            <span className="gradient-text-red">REACT</span>
          </h2>
          <p className="text-[#A0A0B0] text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Tap an emotion below to watch your Spider-Man companion execute dynamic 3D movements in real-time.
          </p>
        </div>

        <EmotionDemo canvasHeight="clamp(320px, 46vh, 480px)" showCanvas={true} />
      </div>
    </section>
  );
}
