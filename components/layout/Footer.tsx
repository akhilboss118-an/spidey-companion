import Link from "next/link";
import { APP_NAME, SOCIAL_LINKS, TAGLINE } from "@/config/app.config";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#08080D] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#E31C25] flex items-center justify-center font-black text-white text-sm">
                S
              </div>
              <span className="font-bold text-white text-lg">{APP_NAME}</span>
            </div>
            <p className="text-[#A0A0B0] text-sm leading-relaxed max-w-xs">
              {TAGLINE}. A 3D AI companion that listens, responds, and reacts emotionally.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              {SOCIAL_LINKS.instagram && (
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#A0A0B0] hover:text-white transition-all">
                  <InstagramIcon />
                </a>
              )}
              {SOCIAL_LINKS.youtube && (
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#A0A0B0] hover:text-white transition-all">
                  <YoutubeIcon />
                </a>
              )}
              {SOCIAL_LINKS.github && (
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#A0A0B0] hover:text-white transition-all">
                  <GithubIcon />
                </a>
              )}
              {!SOCIAL_LINKS.instagram && !SOCIAL_LINKS.youtube && !SOCIAL_LINKS.github && (
                <p className="text-[#A0A0B0] text-xs">Social links coming soon</p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Pages</h3>
            <ul className="space-y-3">
              {["/", "/companion", "/features", "/development", "/download"].map((href, i) => (
                <li key={href}>
                  <Link href={href} className="text-[#A0A0B0] hover:text-white text-sm transition-colors">
                    {["Home", "Companion", "Features", "Development", "Download"][i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">The App</h3>
            <ul className="space-y-3 text-sm text-[#A0A0B0]">
              <li>Platform: Android</li>
              <li>Built with: Flutter + Dart</li>
              <li>AI: Gemini + Groq</li>
              <li>Character: 3D Spider-Man</li>
              <li><Link href="/download" className="text-[#E31C25] hover:text-[#FF4D55] transition-colors font-medium">Download App →</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A0A0B0] text-xs">© {year} {APP_NAME}. All rights reserved.</p>
          <p className="text-[#A0A0B0] text-xs">Built with Flutter · Powered by Gemini + Groq</p>
        </div>
      </div>
    </footer>
  );
}
