import type { Metadata } from "next";
import EmotionDemo from "@/components/sections/EmotionDemo";
import { APP_NAME } from "@/config/app.config";

export const metadata: Metadata = {
  title: "Meet the Companion",
  description: `Meet ${APP_NAME} — a 3D Spider-Man AI companion that listens, responds, and reacts emotionally.`,
};

const EMOTION_CARDS = [
  { emoji: "😐", label: "Neutral",   desc: "Calm, attentive, ready to listen.", color: "#A0A0B0" },
  { emoji: "😄", label: "Happy",     desc: "Warm, energetic, celebrating with you.", color: "#E31C25" },
  { emoji: "😲", label: "Surprised", desc: "Wide-eyed, caught off guard, curious.", color: "#FF8800" },
  { emoji: "🔥", label: "Excited",   desc: "Full energy, pulsing, enthusiastic.", color: "#FF2255" },
];

export default function CompanionPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#E31C25]/5 blur-[120px]" />
        </div>

        <div className="text-center z-10 mb-12">
          <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-4 font-semibold">
            The Companion
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            MEET THE
            <br />
            <span className="gradient-text-red">COMPANION</span>
          </h1>
          <p className="text-[#A0A0B0] max-w-lg mx-auto text-lg leading-relaxed">
            He can listen, respond, speak and react based on the conversation.
            A 3D AI companion — not just a chatbot.
          </p>
        </div>

        {/* Big 3D canvas + emotion controls */}
        <div className="w-full max-w-2xl mx-auto z-10">
          <EmotionDemo canvasHeight="550px" showCanvas={true} />
        </div>
      </section>

      {/* Emotion cards */}
      <section className="section-padding max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            FOUR EMOTION{" "}
            <span className="gradient-text-red">STATES</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EMOTION_CARDS.map((ec) => (
            <div
              key={ec.label}
              className="glass rounded-2xl p-6 hover:border-opacity-40 transition-all hover:-translate-y-1 group"
              style={{ borderColor: `${ec.color}22` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform"
                style={{ background: `${ec.color}15`, border: `1px solid ${ec.color}30` }}
              >
                {ec.emoji}
              </div>
              <h3 className="text-white font-bold tracking-wide mb-2">{ec.label}</h3>
              <p className="text-[#A0A0B0] text-sm leading-relaxed">{ec.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
