// ============================================================
// SPIDEY COMPANION — Central Configuration
// Change any value here and it propagates across the entire site
// ============================================================

export const APP_NAME = "Spidey Companion";

export const TAGLINE = "Your 3D AI Companion";

export const DESCRIPTION =
  "Meet a 3D AI companion that can listen, talk, respond and react emotionally. Built with Flutter. Powered by Gemini + Groq AI.";

export const APK_URL = "/SpideyCompanion-v1.2.0.apk";
export const PLAY_STORE_URL = ""; // Set when available — empty = "Coming Soon"

export const VERSION = "1.2.0";
export const APK_SIZE = "83.7 MB";
export const MIN_ANDROID = "Android 7.0+";
export const PLATFORM = "Android";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/boss_pvtttt_8155?igsi=MXJpZmVnMXgzNms0bw==",
  youtube: "https://youtube.com/@bossakhil-v9v?si=p1aK3HIYVy0vQm8w",
  github: "https://github.com/akhilboss118-an",
};

export const VIDEO_URLS = {
  demo: "https://www.youtube.com/embed/SgeIAiXDJWc", // Official Spidey Companion Trailer & Demo
  trailer: "https://youtu.be/SgeIAiXDJWc?si=31UUZg1kaQ_BkN3P",
  thumbnail: "/thumbnails/trailer.jpg",
  day6: "https://youtu.be/qq3MloPkK3A?si=OhQkojWZAUHJb6c1",
};

export const APP_SCREENSHOTS: string[] = [
  // Add screenshot paths here, e.g. "/screenshots/home.png"
];

export const DEVELOPMENT_DAYS = [
  {
    day: 1,
    title: "Foundation",
    description:
      "Set up the Flutter project structure, integrated core dependencies, and established the foundation for the AI companion app.",
    status: "done" as const,
    thumbnail: "/thumbnails/day1.jpg",
    video: "https://youtu.be/Ao_SgEFZzC4?si=xNuTtU3GXf5qK1JK",
  },
  {
    day: 2,
    title: "UI Design",
    description:
      "Built the custom Flutter UI from scratch — dark theme, premium cards, chat interface, and the main companion screen.",
    status: "done" as const,
    thumbnail: "/thumbnails/day2.jpg",
    video: "https://youtu.be/-0OzoRXP83s?si=TFq4Jk-gHEPW61vL",
  },
  {
    day: 3,
    title: "Companion Rebuild",
    description:
      "Integrated the 3D Spider-Man character model, set up Three.js-powered rendering, and rebuilt the companion display system.",
    status: "done" as const,
    thumbnail: "/thumbnails/day3.jpg",
    video: "https://youtu.be/GIu961zXOdI?si=9guAX6K3o-tXTsjS",
  },
  {
    day: 4,
    title: "Gemini + Groq + Voice",
    description:
      "Connected Gemini and Groq AI backends. Implemented real-time voice input, speech recognition, and AI-generated responses.",
    status: "done" as const,
    thumbnail: "/thumbnails/day4.jpg",
    video: "https://youtu.be/ZmCLEaptJ94?si=r86wRURXzJByq3NQ",
  },
  {
    day: 5,
    title: "Emotions",
    description:
      "Built the emotion detection and reaction system. The companion now analyzes conversation tone and reacts with appropriate expressions.",
    status: "done" as const,
    thumbnail: "/thumbnails/day5.jpg",
    video: "https://youtu.be/_o-jELP_fbw?si=rTfhV1MCqjiLfOMy",
  },
  {
    day: 6,
    title: "Final App & Vision 🔥",
    description:
      "Polished the full app, multimodal camera vision, hero wardrobe suits, affinity bond progression, and shipped the final Spidey Companion release.",
    status: "done" as const,
    thumbnail: "/thumbnails/day6.jpg",
    video: "https://youtu.be/qq3MloPkK3A?si=OhQkojWZAUHJb6c1",
  },
];

export const FAQ_ITEMS = [
  {
    question: "What is Spidey Companion?",
    answer:
      "Spidey Companion is a 3D AI companion mobile app built with Flutter. It features a Spider-Man-inspired 3D character that can listen, respond, and react emotionally to your conversations.",
  },
  {
    question: "What can the AI companion do?",
    answer:
      "Your companion can hold natural conversations, respond intelligently using Gemini and Groq AI, react to emotional tone, speak back to you, and display dynamic animations based on context.",
  },
  {
    question: "Can I talk to it?",
    answer:
      "Yes! Spidey Companion supports voice input. Simply tap the voice button, speak naturally, and the companion will listen and respond.",
  },
  {
    question: "Does it have emotions?",
    answer:
      "Yes. The companion analyzes conversations and reacts with different emotional states — Happy, Excited, Surprised, or Neutral — changing its animations and expressions accordingly.",
  },
  {
    question: "Is it a Flutter app?",
    answer:
      "Yes. The app is built entirely with Flutter and Dart, giving it a smooth, native feel on Android devices.",
  },
  {
    question: "Can I download it on Android?",
    answer:
      "Yes! The app APK is available now to download directly. Google Play Store version will be available soon.",
  },
  {
    question: "Is it free?",
    answer:
      "Spidey Companion is completely free to download and try on Android.",
  },
];
