import { SOCIAL_LINKS } from "@/config/app.config";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
    </svg>
  );
}
function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

const SOCIAL_ITEMS = [
  { href: SOCIAL_LINKS.instagram, Icon: InstagramIcon, label: "Instagram", color: "#E4405F" },
  { href: SOCIAL_LINKS.youtube,   Icon: YoutubeIcon,   label: "YouTube",   color: "#FF0000" },
  { href: SOCIAL_LINKS.github,    Icon: GithubIcon,    label: "GitHub",    color: "#ffffff" },
];

export default function CreatorSection() {
  return (
    <section className="section-padding max-w-7xl mx-auto px-6">
      <div className="relative rounded-3xl overflow-hidden glass border border-white/8 p-8 md:p-16">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#E31C25]/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#330000]/30 blur-3xl" />
        </div>

        <div className="relative flex flex-col md:flex-row items-center gap-12">
          {/* Avatar placeholder */}
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-full bg-[#E31C25]/15 border-2 border-[#E31C25]/30 flex items-center justify-center">
              <span className="text-4xl">👨‍💻</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-3 font-semibold">
              The Creator
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              BUILT ONE DAY
              <br />
              <span className="gradient-text-red">AT A TIME</span>
            </h2>
            <p className="text-[#A0A0B0] leading-relaxed max-w-lg mb-6">
              I&apos;m building this AI companion step by step and documenting the entire process
              through a 6-day development challenge. From zero to a fully functional 3D AI
              companion app — all in public.
            </p>

            {/* Social buttons */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {SOCIAL_ITEMS.map((social) => (
                <a
                  key={social.label}
                  href={social.href || "#"}
                  target={social.href ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-white/10 text-[#A0A0B0] hover:text-white hover:border-white/30 transition-all text-sm font-medium hover:scale-105"
                >
                  <span style={{ color: social.href ? social.color : undefined }}>
                    <social.Icon size={16} />
                  </span>
                  {social.label}
                  {!social.href && (
                    <span className="text-xs text-[#A0A0B0]/50 ml-1">soon</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex-shrink-0 grid grid-cols-2 gap-4">
            {[
              { number: "6", label: "Days" },
              { number: "1", label: "App" },
              { number: "3D", label: "Character" },
              { number: "2", label: "AI Engines" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center border border-white/5">
                <p className="text-2xl font-black gradient-text-red">{stat.number}</p>
                <p className="text-xs text-[#A0A0B0] tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
