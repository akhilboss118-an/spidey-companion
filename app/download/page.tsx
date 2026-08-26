import type { Metadata } from "next";
import { Download, ExternalLink, Smartphone, Package, Shield, Zap, Sparkles } from "lucide-react";
import {
  APP_NAME,
  APK_URL,
  PLAY_STORE_URL,
  VERSION,
  APK_SIZE,
  MIN_ANDROID,
  PLATFORM,
} from "@/config/app.config";

export const metadata: Metadata = {
  title: "Download",
  description: `Download ${APP_NAME} for Android. Get the APK or find it on Google Play.`,
};

const APP_INFO = [
  { icon: Smartphone, label: "Platform",    value: PLATFORM },
  { icon: Package,    label: "Version",     value: `v${VERSION}` },
  { icon: Zap,        label: "APK Size",    value: APK_SIZE },
  { icon: Shield,     label: "Min Android", value: MIN_ANDROID },
];

export default function DownloadPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[500px] rounded-full bg-[#E31C25]/8 blur-[100px] sm:blur-[140px]" />
        </div>

        <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-3 sm:mb-4 font-semibold relative z-10">
          Official Release Available Now
        </p>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4 sm:mb-6 relative z-10">
          GET YOUR
          <br />
          <span className="gradient-text-red">AI COMPANION</span>
        </h1>
        <p className="text-[#A0A0B0] max-w-lg mx-auto text-base sm:text-lg leading-relaxed mb-8 sm:mb-12 relative z-10 px-2">
          Download the latest Android APK v{VERSION} and experience interactive 3D, camera vision, and smart AI chat.
        </p>

        {/* Download buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative z-10 max-w-md sm:max-w-none mx-auto w-full">
          {/* APK Download */}
          {APK_URL ? (
            <a
              href={APK_URL}
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#E31C25] text-white font-bold text-base sm:text-lg hover:bg-[#FF4D55] transition-all hover:shadow-xl hover:shadow-red-500/25 active:scale-95 sm:hover:scale-105"
            >
              <Download size={22} />
              DOWNLOAD APK (v{VERSION})
            </a>
          ) : (
            <div className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#E31C25]/20 text-[#E31C25] font-bold text-base sm:text-lg border border-[#E31C25]/30 cursor-not-allowed">
              <Download size={22} />
              APK — COMING SOON
            </div>
          )}

          {/* Play Store */}
          {PLAY_STORE_URL ? (
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass border border-white/15 text-white font-bold text-base sm:text-lg hover:border-white/30 transition-all active:scale-95 sm:hover:scale-105"
            >
              <ExternalLink size={22} />
              GET ON GOOGLE PLAY
            </a>
          ) : (
            <div className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass border border-white/8 text-[#A0A0B0] font-bold text-base sm:text-lg cursor-not-allowed">
              <ExternalLink size={22} />
              PLAY STORE — COMING SOON
            </div>
          )}
        </div>
      </section>

      {/* App info card */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="glass rounded-3xl overflow-hidden border border-white/8">
          <div className="p-6 sm:p-8 border-b border-white/5">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
              APP INFORMATION
            </h2>
            <p className="text-[#A0A0B0] text-xs sm:text-sm">
              Technical details and specifications for {APP_NAME}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
            {APP_INFO.map((info) => (
              <div key={info.label} className="p-5 sm:p-6 flex items-center gap-4 border-b border-white/5 last:border-b-0">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#E31C25]/10 flex items-center justify-center flex-shrink-0">
                  <info.icon size={20} className="text-[#E31C25]" />
                </div>
                <div>
                  <p className="text-xs text-[#A0A0B0]">{info.label}</p>
                  <p className="text-white font-bold text-sm sm:text-base">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Installation guide card */}
        <div className="glass rounded-3xl p-6 sm:p-8 mt-6 border border-white/8">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-[#E31C25]" />
            Easy 3-Step Installation Guide
          </h3>
          <ol className="flex flex-col gap-3 text-xs sm:text-sm text-[#A0A0B0]">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#E31C25]/20 text-[#E31C25] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
              <span>Tap <strong>Download APK</strong> above on your Android phone or tablet.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#E31C25]/20 text-[#E31C25] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
              <span>Open the downloaded file and tap <strong>Install</strong> (Allow from this source if prompted).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#E31C25]/20 text-[#E31C25] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
              <span>Launch Spidey Companion, snap a photo or speak, and enjoy your 3D superhero companion!</span>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
