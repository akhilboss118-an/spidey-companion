import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import EmotionDemoSection from "@/components/sections/EmotionDemoSection";
import WhatIsApp from "@/components/sections/WhatIsApp";
import HowItWorks from "@/components/sections/HowItWorks";
import AppPreview from "@/components/sections/AppPreview";
import DevelopmentChallenge from "@/components/sections/DevelopmentChallenge";
import VideoSection from "@/components/sections/VideoSection";
import FAQ from "@/components/sections/FAQ";
import CreatorSection from "@/components/sections/CreatorSection";
import { APP_NAME, DESCRIPTION } from "@/config/app.config";

export const metadata: Metadata = {
  title: `${APP_NAME} — Your AI Companion`,
  description: DESCRIPTION,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EmotionDemoSection />
      <WhatIsApp />
      <HowItWorks />
      <AppPreview />
      <DevelopmentChallenge />
      <VideoSection />
      <FAQ />
      <CreatorSection />
    </>
  );
}
