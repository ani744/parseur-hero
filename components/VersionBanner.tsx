"use client";

import { useEffect, useState } from "react";

const VERSIONS = [
  { id: "hero-1", label: "Option 1", desc: "Pure White"  },
  { id: "hero-2", label: "Option 2", desc: "Dark Navy"   },
  { id: "hero-3", label: "Option 3", desc: "Split"       },
  { id: "hero-4", label: "Option 4", desc: "Blue Bar"    },
  { id: "hero-5", label: "Option 5", desc: "Gradient"    },
];

export default function VersionBanner() {
  const [active, setActive] = useState("hero-1");

  useEffect(() => {
    const onScroll = () => {
      const offset = window.scrollY + window.innerHeight * 0.35;
      let current = "hero-1";
      VERSIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= offset) current = id;
      });
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-1.5 px-6 h-[46px] border-b border-white/10"
      style={{ background: "#060f1a" }}>
      <span className="text-white/25 text-[11px] font-semibold uppercase tracking-widest mr-3 hidden sm:block">
        Versions
      </span>
      {VERSIONS.map(({ id, label, desc }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12px] font-semibold transition-all duration-200 whitespace-nowrap ${
              isActive
                ? "bg-[#0084C5] text-white shadow-md shadow-[#0084C5]/30"
                : "text-white/40 hover:text-white/80 hover:bg-white/8"
            }`}
          >
            <span>{label}</span>
            <span className={`transition-opacity duration-200 ${isActive ? "opacity-80" : "opacity-0"}`}>
              — {desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}
