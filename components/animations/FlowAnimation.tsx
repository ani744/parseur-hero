"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = [
  { id: 1, label: "Import",   sublabel: "PDF · Email · Scan", icon: (active: boolean) => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4 6h14M4 11h10M4 16h7" stroke={active ? "white" : "#9ca3af"} strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="17" cy="16" r="4" fill={active ? "#0084C5" : "#e5e7eb"} style={{ transition: "fill 0.3s" }}/>
      <path d="M15.5 16h3M17 14.5v3" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )},
  { id: 2, label: "Parse",    sublabel: "Structure detection", icon: (active: boolean) => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={active ? "#0084C5" : "#9ca3af"} strokeWidth="1.8" style={{ transition: "stroke 0.3s" }}/>
      <rect x="12" y="3" width="7" height="7" rx="1.5" stroke={active ? "#0084C5" : "#9ca3af"} strokeWidth="1.8" style={{ transition: "stroke 0.3s" }}/>
      <rect x="3" y="12" width="7" height="7" rx="1.5" stroke={active ? "#0084C5" : "#9ca3af"} strokeWidth="1.8" style={{ transition: "stroke 0.3s" }}/>
      <rect x="12" y="12" width="7" height="7" rx="1.5" fill={active ? "#0084C5" : "none"} stroke={active ? "#0084C5" : "#9ca3af"} strokeWidth="1.8" style={{ transition: "all 0.3s" }}/>
    </svg>
  )},
  { id: 3, label: "Extract",  sublabel: "AI field mapping", icon: (active: boolean) => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2l1.8 5.5H19l-4.9 3.6 1.8 5.5L11 13.1 6.1 16.6l1.8-5.5L3 7.5h6.2L11 2z"
        fill={active ? "#0084C5" : "none"} stroke={active ? "#0084C5" : "#9ca3af"} strokeWidth="1.6" strokeLinejoin="round" style={{ transition: "all 0.3s" }}/>
    </svg>
  )},
  { id: 4, label: "Export",   sublabel: "API · Webhook · CSV", icon: (active: boolean) => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4 11h14M15 7l4 4-4 4" stroke={active ? "white" : "#9ca3af"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="11" r="4" fill={active ? "#0084C5" : "#e5e7eb"} style={{ transition: "fill 0.3s" }}/>
      <path d="M4.5 11h3M6 9.5v3" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )},
];

export default function FlowAnimation() {
  const [activeStage, setActiveStage] = useState(0);
  const [lineProgress, setLineProgress] = useState<number[]>([0, 0, 0]); // 0-100 each connector
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const after = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };

  useEffect(() => {
    const cycle = () => {
      clear();
      setActiveStage(0);
      setLineProgress([0, 0, 0]);
      setDone(false);

      after(() => setActiveStage(1), 300);

      after(() => setLineProgress(p => [100, p[1], p[2]]), 1100);
      after(() => setActiveStage(2), 1300);

      after(() => setLineProgress(p => [p[0], 100, p[2]]), 2100);
      after(() => setActiveStage(3), 2300);

      after(() => setLineProgress([100, 100, 100]), 3100);
      after(() => setActiveStage(4), 3300);

      after(() => setDone(true), 4000);
      after(() => cycle(), 6200);
    };
    cycle();
    return clear;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-[680px] mx-auto">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">

        {/* Stages row */}
        <div className="flex items-center justify-between">
          {STAGES.map((stage, idx) => {
            const isActive = activeStage >= stage.id;
            return (
              <div key={stage.id} className="flex items-center flex-1">
                {/* Stage node */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div
                    style={{
                      transition: "all 0.4s ease",
                      animation: isActive && activeStage === stage.id ? "stageOn 0.4s ease forwards" : "none",
                    }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-400 ${
                      isActive
                        ? "bg-[#0084C5] shadow-md shadow-[#0084C5]/30"
                        : "bg-white border-2 border-gray-200"
                    }`}
                  >
                    {stage.icon(isActive)}
                  </div>
                  <div className="text-center">
                    <p className={`text-xs font-bold transition-colors duration-300 ${isActive ? "text-[#003854]" : "text-gray-300"}`}>
                      {stage.label}
                    </p>
                    <p className={`text-[10px] transition-colors duration-300 ${isActive ? "text-gray-400" : "text-gray-200"}`}>
                      {stage.sublabel}
                    </p>
                  </div>
                </div>

                {/* Connector line (not after last) */}
                {idx < STAGES.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-200 mx-3 relative overflow-hidden rounded-full mb-8">
                    <div
                      style={{
                        position: "absolute", left: 0, top: 0, bottom: 0,
                        width: `${lineProgress[idx]}%`,
                        background: "#0084C5",
                        transition: "width 0.6s ease",
                        borderRadius: "9999px",
                      }}
                    />
                    {/* Animated dot */}
                    {lineProgress[idx] > 0 && lineProgress[idx] < 100 && (
                      <div
                        style={{
                          position: "absolute", top: "50%", width: 8, height: 8,
                          background: "#0084C5", borderRadius: "50%",
                          transform: "translate(-50%, -50%)",
                          left: `${lineProgress[idx]}%`,
                          boxShadow: "0 0 6px rgba(0,132,197,0.7)",
                          transition: "left 0.6s ease",
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Status bar */}
        <div className="mt-6 relative h-8 flex items-center justify-center">
          <div
            style={{ transition: "opacity 0.4s", opacity: done ? 1 : 0, position: "absolute" }}
            className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 self-center flex-shrink-0" style={{ animation: "blink 1.4s ease-in-out infinite" }} />
            <span className="text-xs font-semibold text-green-600">Data ready — 4 fields extracted</span>
          </div>
          <div
            style={{ transition: "opacity 0.4s", opacity: (!done && activeStage > 0) ? 1 : 0, position: "absolute" }}
            className="flex items-center gap-2 bg-[#0084C5]/5 border border-[#0084C5]/20 rounded-full px-4 py-1.5"
          >
            <div className="w-2 h-2 rounded-full bg-[#0084C5] self-center flex-shrink-0" style={{ animation: "blink 0.7s ease-in-out infinite" }} />
            <span className="text-xs font-semibold text-[#0084C5]">
              {STAGES.find(s => s.id === activeStage)?.label}ing…
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
