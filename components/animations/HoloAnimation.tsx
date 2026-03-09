"use client";

import { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "0123456789ABCDEF█▓▒░$#@%&?!";

function useScramble(target: string, active: boolean, delayMs = 0): string {
  const [display, setDisplay] = useState(() => "─".repeat(target.length));
  const handle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (interval.current) clearInterval(interval.current);
    if (handle.current) clearTimeout(handle.current);

    if (!active) {
      setDisplay("─".repeat(target.length));
      return;
    }

    let iteration = 0;
    const total = target.length * 2.5;

    handle.current = setTimeout(() => {
      interval.current = setInterval(() => {
        setDisplay(
          target.split("").map((char, i) => {
            if (i < iteration / 2.5) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }).join("")
        );
        iteration++;
        if (iteration >= total) {
          clearInterval(interval.current!);
          setDisplay(target);
        }
      }, 38);
    }, delayMs);

    return () => {
      if (interval.current) clearInterval(interval.current);
      if (handle.current) clearTimeout(handle.current);
    };
  }, [active, target, delayMs]);

  return display;
}

const FIELDS = [
  { key: "VENDOR",   value: "Acme Corp",     delay: 0   },
  { key: "INV_NO",   value: "INV-2025-041",  delay: 400 },
  { key: "AMOUNT",   value: "$4,320.00",     delay: 800 },
  { key: "DUE_DATE", value: "30/03/2025",    delay: 1200 },
];

const DOCS = [
  { tag: "PDF",   label: "Invoice_2025.pdf"        },
  { tag: "EMAIL", label: "purchase_order@acme.com" },
  { tag: "SCAN",  label: "Receipt_March.jpg"       },
];

type Phase = "idle" | "scanning" | "extracting" | "done";

function ScrambledField({ target, active, delay }: { target: string; active: boolean; delay: number }) {
  const display = useScramble(target, active, delay);
  const resolved = display === target;
  return (
    <span
      className="font-mono text-xs font-bold transition-colors duration-200"
      style={{ color: resolved ? "#00e5ff" : "rgba(0,229,255,0.4)" }}
    >
      {display}
    </span>
  );
}

export default function HoloAnimation() {
  const [phase,      setPhase]      = useState<Phase>("idle");
  const [docVisible, setDocVisible] = useState(false);
  const [docIdx,     setDocIdx]     = useState(0);
  const [scanKeys,   setScanKeys]   = useState([0, 0, 0]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const after = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };

  useEffect(() => {
    const cycle = () => {
      clear();
      setPhase("idle");
      setDocVisible(false);

      after(() => setDocVisible(true), 200);
      after(() => {
        setPhase("scanning");
        setScanKeys(k => [k[0] + 1, k[1] + 1, k[2] + 1]);
      }, 800);
      after(() => setPhase("extracting"), 2600);
      after(() => setPhase("done"), 4500);
      after(() => {
        setDocVisible(false);
        setPhase("idle");
        after(() => { setDocIdx(p => (p + 1) % DOCS.length); cycle(); }, 500);
      }, 6200);
    };
    cycle();
    return clear;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doc = DOCS[docIdx];
  const isExtracting = phase === "extracting" || phase === "done";

  return (
    <div
      className="relative w-full max-w-[340px] rounded-xl overflow-hidden select-none"
      style={{
        background: "#060d18",
        border: "1px solid rgba(0,132,197,0.4)",
        animation: "neonGlow 2.5s ease-in-out infinite",
      }}
    >
      {/* CSS grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,132,197,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,132,197,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          animation: "gridline 3s ease-in-out infinite",
        }}
      />

      {/* Corner brackets */}
      {[["top-2 left-2", "border-t border-l"], ["top-2 right-2", "border-t border-r"], ["bottom-2 left-2", "border-b border-l"], ["bottom-2 right-2", "border-b border-r"]].map(([pos, border]) => (
        <div
          key={pos}
          className={`absolute ${pos} w-3 h-3 ${border} border-[#0084C5] pointer-events-none`}
          style={{ animation: "cornerPulse 2s ease-in-out infinite" }}
        />
      ))}

      {/* Header */}
      <div className="relative flex items-center justify-between px-4 py-3 border-b border-[#0084C5]/20">
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#0084C5]/80 uppercase">
          Parseur Extract v2.0
        </span>
        <div className="flex gap-1">
          {[phase === "scanning", phase === "extracting" || phase === "done", phase === "done"].map((active, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: active ? "#0084C5" : "rgba(0,132,197,0.2)",
                boxShadow: active ? "0 0 6px rgba(0,132,197,0.8)" : "none",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative p-4 space-y-4">

        {/* Doc panel */}
        <div>
          <p className="text-[9px] font-mono text-[#0084C5]/50 uppercase tracking-widest mb-2">// input_document</p>
          <div
            style={{
              transition: "opacity 0.5s ease, transform 0.5s ease",
              opacity: docVisible ? 1 : 0,
              transform: docVisible ? "translateY(0)" : "translateY(-8px)",
              border: "1px solid rgba(0,132,197,0.25)",
              borderRadius: 8,
              padding: "12px",
              background: "rgba(0,132,197,0.05)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded tracking-wider"
                style={{ background: "rgba(0,132,197,0.15)", color: "#0084C5" }}
              >
                {doc.tag}
              </span>
              <span className="text-xs font-mono text-white/30 truncate">{doc.label}</span>
            </div>
            <div className="space-y-1.5">
              {[100, 78, 88, 62, 72].map((w, i) => (
                <div
                  key={i}
                  style={{ width: `${w}%`, height: 3, borderRadius: 9999, background: "rgba(0,132,197,0.15)" }}
                />
              ))}
            </div>

            {/* Multiple scan beams */}
            {phase === "scanning" && [0, 1, 2].map((i) => (
              <div
                key={`${scanKeys[i]}-${i}`}
                style={{
                  position: "absolute", left: 0, right: 0, height: 3, top: -3,
                  background: i === 0
                    ? "rgba(0,132,197,0.9)"
                    : i === 1
                    ? "rgba(0,229,255,0.6)"
                    : "rgba(255,255,255,0.35)",
                  boxShadow: i === 0 ? "0 0 8px rgba(0,132,197,0.8)" : "none",
                  animation: `scanFast 1.8s ease-in-out ${i * 0.38}s infinite`,
                  pointerEvents: "none",
                }}
              />
            ))}
          </div>

          {/* Status line */}
          <div className="mt-2 flex items-center gap-2">
            <span
              className="text-[10px] font-mono uppercase tracking-widest"
              style={{
                color: phase === "scanning" ? "#0084C5" : phase === "extracting" || phase === "done" ? "#00e5ff" : "rgba(0,132,197,0.3)",
                transition: "color 0.3s",
              }}
            >
              {phase === "idle" ? "READY" : phase === "scanning" ? "SCANNING…" : phase === "extracting" ? "EXTRACTING…" : "COMPLETE"}
            </span>
            {(phase === "scanning" || phase === "extracting") && (
              <div className="flex gap-0.5">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full"
                    style={{ background: "#0084C5", animation: `blink 0.6s ease-in-out ${i * 0.18}s infinite` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Data output panel */}
        <div>
          <p className="text-[9px] font-mono text-[#0084C5]/50 uppercase tracking-widest mb-2">// extracted_data</p>
          <div
            style={{
              border: "1px solid",
              borderColor: isExtracting ? "rgba(0,229,255,0.3)" : "rgba(0,132,197,0.1)",
              borderRadius: 8,
              padding: "12px",
              background: "rgba(0,229,255,0.03)",
              transition: "border-color 0.4s",
            }}
          >
            {FIELDS.map((f) => (
              <div key={f.key} className="flex justify-between items-center mb-2 last:mb-0">
                <span className="text-[10px] font-mono text-white/25">{f.key}</span>
                <ScrambledField target={f.value} active={isExtracting} delay={f.delay} />
              </div>
            ))}
          </div>
        </div>

        {/* Done badge */}
        <div
          style={{ transition: "opacity 0.5s", opacity: phase === "done" ? 1 : 0 }}
          className="flex items-center justify-center gap-2 py-1"
        >
          <span
            className="text-[10px] font-mono font-bold tracking-widest uppercase"
            style={{ color: "#00e5ff", textShadow: "0 0 8px rgba(0,229,255,0.6)", animation: "holoFlicker 4s ease-in-out infinite" }}
          >
            ✓ Extraction complete — ready for API
          </span>
        </div>

      </div>
    </div>
  );
}
