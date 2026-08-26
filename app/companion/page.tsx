import type { Metadata } from "next";
import EmotionDemo from "@/components/sections/EmotionDemo";
import { APP_NAME } from "@/config/app.config";

export const metadata: Metadata = {
  title: "Meet the Companion",
  description: `Meet ${APP_NAME} — a 3D Spider-Man AI companion that listens, responds, and reacts emotionally.`,
};

const EMOTION_CARDS = [
  { emoji: "😐", label: "Neutral", desc: "Calm, attentive, and ready to listen.", color: "#A0A0B0" },
  { emoji: "😄", label: "Happy", desc: "Warm, energetic, waving and celebrating with you.", color: "#E31C25" },
  { emoji: "😲", label: "Surprised", desc: "Wide-eyed, analyzing, thinking and curious.", color: "#FF8800" },
  { emoji: "🔥", label: "Excited", desc: "Full energy, dancing, enthusiastic and hype.", color: "#FF2255" },
  { emoji: "🤸", label: "Acrobat", desc: "Dynamic front twist flip showing spider agility.", color: "#00E5FF" },
  { emoji: "👏", label: "Cheer", desc: "Clapping and cheering for your daily victories.", color: "#00E676" },
];

export default function CompanionPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-24 sm:pt-28 pb-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-[#E31C25]/8 blur-[100px] sm:blur-[140px]" />
        </div>

        <div className="text-center z-10 mb-8 sm:mb-12 max-w-2xl mx-auto">
          <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-3 font-semibold">
            The 3D Companion
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4 sm:mb-6">
            MEET THE
            <br />
            <span className="gradient-text-red">COMPANION</span>
          </h1>
          <p className="text-[#A0A0B0] text-sm sm:text-base md:text-lg leading-relaxed px-2">
            He listens, responds through AI intelligence, speaks with voice, and reacts with full 3D body motion.
          </p>
        </div>

        {/* 3D canvas + emotion controls */}
        <div className="w-full max-w-2xl mx-auto z-10">
          <EmotionDemo canvasHeight="clamp(340px, 48vh, 520px)" showCanvas={true} />
        </div>
      </section>

      {/* Emotion cards */}
      <section className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            DYNAMIC EMOTION{" "}
            <span className="gradient-text-red">STATES</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {EMOTION_CARDS.map((ec) => (
            <div
              key={ec.label}
              className="glass rounded-2xl p-5 sm:p-6 hover:border-opacity-40 transition-all hover:-translate-y-1 group"
              style={{ borderColor: `${ec.color}25` }}
            >
              <div
                className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-4 group-hover:scale-110 transition-transform"
                style={{ background: `${ec.color}15`, border: `1px solid ${ec.color}30` }}
              >
                {ec.emoji}
              </div>
              <h3 className="text-white font-bold tracking-wide mb-1.5 text-base sm:text-lg">{ec.label}</h3>
              <p className="text-[#A0A0B0] text-xs sm:text-sm leading-relaxed">{ec.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
