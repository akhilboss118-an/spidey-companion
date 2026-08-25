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
  { id: "neutral",   label: "Neutral",   emoji: "😐", color: "#A0A0B0", description: "Calm and ready.",                animation: "Standing Idle" },
  { id: "happy",     label: "Happy",     emoji: "😄", color: "#E31C25", description: "Your companion is happy!",        animation: "Waving Gesture" },
  { id: "surprised", label: "Surprised", emoji: "😲", color: "#FF8800", description: "Whoa! Did not see that coming.",  animation: "Thinking" },
  { id: "excited",   label: "Excited",   emoji: "🔥", color: "#FF2255", description: "Full energy mode activated!",     animation: "Hip Hop Dance" },
];

interface EmotionDemoProps {
  canvasHeight?: string;
  showCanvas?: boolean;
}

export default function EmotionDemo({ canvasHeight = "500px", showCanvas = true }: EmotionDemoProps) {
  const [activeEmotion, setActiveEmotion] = useState<EmotionType>("neutral");
  const canvasRef = useRef<SpideyCanvasRef>(null);

  const handleEmotion = (emotion: EmotionType) => {
    setActiveEmotion(emotion);
    canvasRef.current?.setEmotion(emotion);
  };

  const current = EMOTIONS.find((e) => e.id === activeEmotion)!;

  return (
    <div className="flex flex-col items-center gap-8">
      {showCanvas && (
        <div className="relative w-full max-w-sm mx-auto" style={{ height: canvasHeight }}>
          <SpideyCanvas
            ref={canvasRef}
            className="w-full h-full rounded-2xl"
            height={canvasHeight}
            enableMouseTracking={true}
          />
          {/* Emotion glow overlay */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-700"
            style={{
              boxShadow: `inset 0 0 80px ${current.color}18`,
              border: `1px solid ${current.color}28`,
            }}
          />
          {/* Animation badge */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-500 whitespace-nowrap"
            style={{
              background: `${current.color}18`,
              color: current.color,
              border: `1px solid ${current.color}35`,
            }}
          >
            ▶ {current.animation}
          </div>
        </div>
      )}

      {/* Status text */}
      <div className="text-center">
        <p className="text-xs text-[#A0A0B0] tracking-widest uppercase mb-1">Current Mood</p>
        <p
          className="text-xl font-bold transition-colors duration-300"
          style={{ color: current.color }}
        >
          {current.emoji} {current.label.toUpperCase()}
        </p>
        <p className="text-[#A0A0B0] text-sm mt-1">{current.description}</p>
      </div>

      {/* Emotion buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {EMOTIONS.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => handleEmotion(emotion.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
              activeEmotion === emotion.id
                ? "text-white scale-105"
                : "text-[#A0A0B0] hover:text-white hover:scale-105"
            }`}
            style={{
              background:
                activeEmotion === emotion.id
                  ? `linear-gradient(135deg, ${emotion.color}, ${emotion.color}88)`
                  : "rgba(255,255,255,0.05)",
              border: `1px solid ${activeEmotion === emotion.id ? emotion.color : "rgba(255,255,255,0.1)"}`,
              boxShadow:
                activeEmotion === emotion.id
                  ? `0 0 20px ${emotion.color}44`
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
