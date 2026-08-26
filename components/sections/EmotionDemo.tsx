"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import type { SpideyCanvasRef, EmotionType } from "../3d/SpideyCanvas";

const SpideyCanvas = dynamic(() => import("../3d/SpideyCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-full border-2 border-[#E31C25] border-t-transparent animate-spin" />
      <p className="text-[#A0A0B0] text-xs tracking-widest animate-pulse">LOADING 3D CHARACTER...</p>
    </div>
  ),
});

const EMOTIONS: {
  id: EmotionType;
  label: string;
  emoji: string;
  color: string;
  description: string;
  animation: string;
}[] = [
  {
    id: "neutral",
    label: "Neutral",
    emoji: "😐",
    color: "#A0A0B0",
    description: "Standing calm, alert and ready for your voice.",
    animation: "Standing Idle",
  },
  {
    id: "happy",
    label: "Happy",
    emoji: "😄",
    color: "#E31C25",
    description: "Excited and cheerful! Waves a friendly greeting to you.",
    animation: "Waving Gesture",
  },
  {
    id: "surprised",
    label: "Surprised",
    emoji: "😲",
    color: "#FF8800",
    description: "Deep in thought, analyzing the situation carefully.",
    animation: "Thinking & Pondering",
  },
  {
    id: "excited",
    label: "Excited",
    emoji: "🔥",
    color: "#FF2255",
    description: "High energy mode! Breaks out into full wave hip hop dance.",
    animation: "Wave Hip Hop Dance",
  },
  {
    id: "flip",
    label: "Acrobat",
    emoji: "🤸",
    color: "#00E5FF",
    description: "Spider agility in motion with a full front twist flip.",
    animation: "Front Twist Flip",
  },
  {
    id: "clap",
    label: "Cheer",
    emoji: "👏",
    color: "#00E676",
    description: "Celebrating your wins and cheering you on!",
    animation: "Clapping Sequence",
  },
];

interface EmotionDemoProps {
  canvasHeight?: string;
  showCanvas?: boolean;
}

export default function EmotionDemo({ canvasHeight = "520px", showCanvas = true }: EmotionDemoProps) {
  const [activeEmotion, setActiveEmotion] = useState<EmotionType>("neutral");
  const canvasRef = useRef<SpideyCanvasRef>(null);

  const handleEmotion = (emotion: EmotionType) => {
    setActiveEmotion(emotion);
    canvasRef.current?.setEmotion(emotion);
  };

  const current = EMOTIONS.find((e) => e.id === activeEmotion) || EMOTIONS[0];

  return (
    <div className="flex flex-col items-center gap-8">
      {showCanvas && (
        <div className="relative w-full max-w-sm sm:max-w-md mx-auto" style={{ height: canvasHeight }}>
          <SpideyCanvas
            ref={canvasRef}
            className="w-full h-full rounded-2xl"
            height={canvasHeight}
            enableMouseTracking={true}
            initialEmotion="neutral"
          />
          {/* Emotion dynamic glow overlay */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-700"
            style={{
              boxShadow: `inset 0 0 90px ${current.color}22`,
              border: `1px solid ${current.color}35`,
            }}
          />
          {/* Real-time active animation indicator badge */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-500 whitespace-nowrap shadow-lg flex items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${current.color}25, #0a0a14cc)`,
              color: current.color,
              border: `1px solid ${current.color}50`,
              backdropFilter: "blur(12px)",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: current.color }} />
            ▶ PLAYING: {current.animation}
          </div>
        </div>
      )}

      {/* Status text */}
      <div className="text-center">
        <p className="text-xs text-[#A0A0B0] tracking-widest uppercase mb-1">Active AI Emotion Reaction</p>
        <p
          className="text-2xl font-black transition-colors duration-300 tracking-tight"
          style={{ color: current.color }}
        >
          {current.emoji} {current.label.toUpperCase()}
        </p>
        <p className="text-[#A0A0B0] text-sm mt-1 max-w-md mx-auto">{current.description}</p>
      </div>

      {/* Emotion interactive action buttons */}
      <div className="flex flex-wrap justify-center gap-3 max-w-lg">
        {EMOTIONS.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => handleEmotion(emotion.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              activeEmotion === emotion.id
                ? "text-white scale-105 shadow-lg"
                : "text-[#A0A0B0] hover:text-white hover:scale-105"
            }`}
            style={{
              background:
                activeEmotion === emotion.id
                  ? `linear-gradient(135deg, ${emotion.color}, ${emotion.color}88)`
                  : "rgba(255,255,255,0.06)",
              border: `1px solid ${activeEmotion === emotion.id ? emotion.color : "rgba(255,255,255,0.12)"}`,
              boxShadow:
                activeEmotion === emotion.id
                  ? `0 0 24px ${emotion.color}55`
                  : "none",
            }}
          >
            {emotion.emoji} {emotion.label}
          </button>
        ))}
      </div>
    </div>
  );
}
