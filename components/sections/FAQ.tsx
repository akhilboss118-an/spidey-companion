"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQ_ITEMS } from "@/config/app.config";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding max-w-3xl mx-auto px-6">
      <div className="text-center mb-12">
        <p className="text-xs text-[#E31C25] tracking-widest uppercase mb-3 font-semibold">
          FAQ
        </p>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
          COMMON{" "}
          <span className="gradient-text-red">QUESTIONS</span>
        </h2>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            className={`glass rounded-xl overflow-hidden transition-all duration-300 ${
              openIndex === i ? "border-[#E31C25]/30" : "border-white/8"
            }`}
          >
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left group"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span
                className={`font-semibold text-sm tracking-wide transition-colors ${
                  openIndex === i ? "text-white" : "text-[#A0A0B0] group-hover:text-white"
                }`}
              >
                {item.question}
              </span>
              <span className={`flex-shrink-0 ml-4 transition-colors ${openIndex === i ? "text-[#E31C25]" : "text-[#A0A0B0]"}`}>
                {openIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>

            {openIndex === i && (
              <div className="px-6 pb-5">
                <p className="text-[#A0A0B0] text-sm leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
