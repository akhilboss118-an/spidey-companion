"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { APP_NAME } from "@/config/app.config";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/companion", label: "Companion" },
  { href: "/features", label: "Features" },
  { href: "/development", label: "Development" },
  { href: "/download", label: "Download" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#E31C25] flex items-center justify-center font-black text-white text-sm transition-transform group-hover:scale-110">
            S
          </div>
          <span className="font-bold text-white tracking-tight text-lg">
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#A0A0B0] hover:text-white transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/companion"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E31C25] text-white text-sm font-semibold tracking-wide hover:bg-[#FF4D55] transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20"
          >
            Meet Spidey
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 mx-4 rounded-2xl glass p-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/80 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/companion"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center py-3 rounded-full bg-[#E31C25] text-white font-semibold text-sm"
          >
            Meet Spidey
          </Link>
        </div>
      )}
    </nav>
  );
}
