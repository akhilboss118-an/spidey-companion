import type { Metadata } from "next";
import { Download, ExternalLink, Smartphone, Package, Shield, Zap } from "lucide-react";
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
  { icon: Smartphone, label: "Platform",        value: PLATFORM },
  { icon: Package,    label: "Version",          value: VERSION },
  { icon: Zap,        label: "APK Size",         value: APK_SIZE },
  { icon: Shield,     label: "Min Android",      value: MIN_ANDROID },
];

export default function DownloadPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full bg-[#E31C25]/6 blur-[130px]" />
        </div>

        <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-4 font-semibold relative z-10">
          Available now
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 relative z-10">
          GET YOUR
          <br />
          <span className="gradient-text-red">AI COMPANION</span>
        </h1>
        <p className="text-[#A0A0B0] max-w-lg mx-auto text-lg leading-relaxed mb-12 relative z-10">
          Download the Android app and meet your companion.
        </p>

        {/* Download buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          {/* APK Download */}
          {APK_URL ? (
            <a
              href={APK_URL}
              download
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#E31C25] text-white font-bold text-lg hover:bg-[#FF4D55] transition-all hover:shadow-xl hover:shadow-red-500/25 hover:scale-105"
            >
              <Download size={22} />
              DOWNLOAD APK
            </a>
          ) : (
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#E31C25]/20 text-[#E31C25] font-bold text-lg border border-[#E31C25]/30 cursor-not-allowed">
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
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass border border-white/15 text-white font-bold text-lg hover:border-white/30 transition-all hover:scale-105"
            >
              <ExternalLink size={22} />
              GET ON GOOGLE PLAY
            </a>
          ) : (
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass border border-white/8 text-[#A0A0B0] font-bold text-lg cursor-not-allowed">
              <ExternalLink size={22} />
              PLAY STORE — COMING SOON
            </div>
          )}
        </div>
      </section>

      {/* App info card */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="glass rounded-3xl overflow-hidden border border-white/8">
          <div className="p-8 border-b border-white/5">
            <h2 className="text-2xl font-black tracking-tight mb-1">
              APP INFORMATION
            </h2>
            <p className="text-[#A0A0B0] text-sm">
              Technical details about the {APP_NAME} app.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
            {APP_INFO.map((info) => (
              <div key={info.label} className="p-6 flex items-center gap-4 border-b border-white/5 last:border-b-0">
                <div className="w-10 h-10 rounded-xl bg-[#E31C25]/10 flex items-center justify-center flex-shrink-0">
                  <info.icon size={18} className="text-[#E31C25]" />
                </div>
                <div>
                  <p className="text-[#A0A0B0] text-xs tracking-widest uppercase mb-0.5">
                    {info.label}
                  </p>
                  <p className="text-white font-bold text-sm">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="glass rounded-3xl p-8 border border-white/5">
          <h2 className="text-xl font-black tracking-tight mb-6">REQUIREMENTS</h2>
          <div className="space-y-3">
            {[
              "Android device required",
              `Minimum ${MIN_ANDROID}`,
              "Internet connection for AI responses",
              "Microphone access for voice interaction",
              "Storage space for the app and 3D assets",
            ].map((req, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-[#A0A0B0]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E31C25] flex-shrink-0" />
                {req}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay updated */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <div className="glass rounded-3xl p-10 border border-[#E31C25]/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E31C25]/5 to-transparent pointer-events-none" />
          <h2 className="text-2xl font-black tracking-tight mb-3 relative z-10">
            STAY UPDATED
          </h2>
          <p className="text-[#A0A0B0] text-sm mb-6 relative z-10">
            Follow the development journey and be first to know when the app launches.
          </p>
          <a
            href="/development"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#E31C25] text-white font-bold text-sm hover:bg-[#FF4D55] transition-all hover:scale-105 relative z-10"
          >
            SEE THE JOURNEY
          </a>
        </div>
      </section>
    </>
  );
}
