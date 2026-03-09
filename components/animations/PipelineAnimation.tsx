"use client";

import { useEffect, useRef, useState } from "react";

const DOCS = [
  {
    tag: "PDF", label: "Invoice_2025.pdf", lines: [100, 80, 90, 60, 75],
    fields: [
      { key: "Vendor",   value: "Acme Corp"    },
      { key: "Invoice",  value: "INV-2025-041" },
      { key: "Amount",   value: "$4,320.00"    },
      { key: "Due date", value: "Mar 30, 2025" },
    ],
  },
  {
    tag: "PDF", label: "Contract_NDA.pdf", lines: [95, 70, 100, 55, 80],
    fields: [
      { key: "Party",    value: "GlobalTech Ltd" },
      { key: "Ref",      value: "NDA-2025-007"   },
      { key: "Signed",   value: "Feb 14, 2025"   },
      { key: "Expires",  value: "Feb 14, 2027"   },
    ],
  },
  {
    tag: "PDF", label: "Statement_Q1.pdf", lines: [90, 85, 65, 100, 70],
    fields: [
      { key: "Account",  value: "98-2210-04"    },
      { key: "Period",   value: "Q1 2025"       },
      { key: "Balance",  value: "$12,540.80"    },
      { key: "Currency", value: "USD"           },
    ],
  },
];

type Phase = "enter" | "scan" | "process" | "reveal" | "done";

const PHASE_LABELS: Record<Phase, string> = {
  enter:   "Waiting…",
  scan:    "Scanning…",
  process: "Extracting…",
  reveal:  "Building output…",
  done:    "Complete",
};

// Just the Parseur icon mark (paths before the wordmark)
function ParseurMark({ active }: { active: boolean }) {
  const navy  = active ? "#0084C5" : "#c0cdd6";
  const blue  = active ? "#0084C5" : "#c0cdd6";

  return (
    <svg
      width="36" height="36"
      viewBox="0 0 32 36"
      fill="none"
      style={active ? { animation: "blink 1.4s ease-in-out infinite", filter: "drop-shadow(0 0 4px rgba(0,132,197,0.5))" } : { transition: "filter 0.4s" }}
    >
      <path d="M5.406 5.742L5.63 5.779l.97.559.969.559.97.559.969.559.969.559.97.559.149.149-.336.224-.671.373-.895.522-.97.559-.969.559-.969.559-.636.373-.037 17.748-.187-.075-1.044-.596-.97-.559-.969-.559-.97-.559-.969-.559-.97-.559-.037-.037V8.874l.634-.373.97-.559.969-.559.97-.559.969-.559.895-.522z" fill={navy}/>
      <path d="M30.686 19.687h.074v7.009l-.634.373-.969.559-.97.559-.969.559-.97.559-.894.522-1.044.597-.895.522-.969.559-.97.559-.969.559-.97.559-.969.559-.97.559-.969.559-.37.149-.932-.522-.634-.373-.97-.559-.969-.559-.97-.559-.895-.522-.037-.075v-7.084l.187.075.932.522.895.522.969.559.97.559.969.559.559.336.559-.299.895-.522.932-.522.634-.373 1.044-.597 1.044-.597 1.044-.597 1.044-.597 1.044-.597.97-.54 1.044-.597 1.044-.597 1.044-.597.895-.522z" fill={navy}/>
      <path d="M15.362 0l.447.224.895.522.969.559.97.559.969.559.97.559.969.559.895.522 1.044.597.895.522.969.559.97.559.969.559.97.559.97.559.559.336v6.413l-.932.522-.634.373-.969.559-.97.559-.969.559-.97.559-.634.373h-.037l-.037-6.338-1.044-.634-1.193-.708-1.044-.634-.932-.559-1.044-.634-1.193-.708-1.044-.634-1.193-.708-1.044-.634-1.044-.634-1.193-.708-1.044-.597.895-.522.97-.559.969-.559.97-.559.969-.559.97-.559z" fill={navy}/>
      <path d="M15.324 11.447l.187.037.969.559.97.559.969.559.97.559.969.559.522.298v6.413l-.932.522-.634.373-.969.559-.97.559-.969.559-.97.559-.187-.037-.969-.559-.97-.559-.969-.559-.97-.559-.969-.559-.522-.298v-6.413l.932-.522.895-.522.969-.559.97-.559.969-.559.708-.41z" fill={blue}/>
      <path d="M9.881 25.317l.186.074.932.522.895.522.969.559.97.559.969.559.559.336.037.037v7.084l-.447-.224-.895-.522-.969-.559-.97-.559-.969-.559-.97-.559-.298-.187v-7.084z" fill={blue}/>
      <path d="M5.406 5.742l.224.037.969.559.97.559.969.559.97.559.969.559.97.559.149.149-.336.224-.671.373-.895.522-.97.559-.969.559-.969.559-.448-.224-.895-.522-.969-.559-.97-.559-.969-.559-.895-.522L0 8.948v-.112l.932-.522.634-.373.969-.559.97-.559.969-.559.932-.522z" fill={blue}/>
      <path d="M30.723 8.911h.037v6.376l-.932.522-.634.373-.969.559-.97.559-.969.559-.97.559-.634.373h-.037V12.416l.97-.559.969-.559.97-.559.970-.559.895-.522 1.044-.597.261-.149z" fill={blue}/>
    </svg>
  );
}

export default function PipelineAnimation() {
  const [phase,       setPhase]      = useState<Phase>("enter");
  const [docIdx,      setDocIdx]     = useState(0);
  const [docVisible,  setDocVisible] = useState(false);
  const [scanKey,     setScanKey]    = useState(0);
  const [revealCount, setRevealCount]= useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const after = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };

  useEffect(() => {
    const cycle = () => {
      clear();
      setPhase("enter");
      setRevealCount(0);
      setDocVisible(false);
      after(() => setDocVisible(true), 120);
      after(() => { setPhase("scan"); setScanKey(k => k + 1); }, 750);
      after(() => setPhase("process"), 2100);
      after(() => {
        setPhase("reveal");
        DOCS[docIdx].fields.forEach((_, i) => after(() => setRevealCount(i + 1), i * 370));
      }, 2750);
      after(() => setPhase("done"), 4300);
      after(() => {
        setDocVisible(false);
        setRevealCount(0);
        after(() => { setDocIdx(p => (p + 1) % DOCS.length); cycle(); }, 450);
      }, 5900);
    };
    cycle();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doc          = DOCS[docIdx];
  const fields       = doc.fields;
  const arrowActive  = phase !== "enter" && phase !== "scan";
  const outputActive = phase === "reveal" || phase === "done";

  return (
    // Fixed width — won't shrink during animation
    <div className="w-[310px] flex-shrink-0 space-y-1">

      {/* INPUT label */}
      <div className="flex items-center gap-2 px-1 mb-0.5">
        <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${docVisible ? "text-[#0084C5]" : "text-gray-300"}`}>
          Input
        </span>
        <div className="h-px flex-1 transition-colors duration-500" style={{ background: docVisible ? "rgba(0,132,197,0.35)" : "#f3f4f6" }} />
      </div>

      {/* Doc card */}
      <div
        style={{
          transition: "opacity 0.45s ease, transform 0.45s ease",
          opacity:    docVisible ? 1 : 0,
          transform:  docVisible ? "translateX(0)" : "translateX(14px)",
        }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 relative overflow-hidden"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0084C5]/10 text-[#0084C5] tracking-wider">
            {doc.tag}
          </span>
          <span className="text-sm text-gray-400 truncate">{doc.label}</span>
        </div>
        <div className="space-y-2">
          {doc.lines.map((w, i) => (
            <div key={i} style={{ width: `${w}%` }} className="h-2 rounded-full bg-gray-100" />
          ))}
        </div>
        {phase === "scan" && (
          <div
            key={scanKey}
            style={{
              position: "absolute", left: 0, right: 0, height: 44, top: -44,
              background: "linear-gradient(to bottom, transparent, rgba(0,132,197,0.18), transparent)",
              animation: "scanBeam 1.35s ease-in-out forwards",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* PARSEUR processing connector */}
      <div className="flex flex-col items-center gap-0 py-1">
        <div className="w-full h-px transition-colors duration-400" style={{ background: arrowActive ? "#0084C5" : "#f3f4f6" }} />
        <div className="flex items-center gap-3 py-2 px-3 w-full">
          <ParseurMark active={arrowActive} />
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-[#003854] leading-none" style={{ opacity: arrowActive ? 1 : 0.3, transition: "opacity 0.3s" }}>
              Parseur
            </span>
            <span
              className="text-[11px] font-semibold leading-none transition-colors duration-300"
              style={{ color: arrowActive ? "#0084C5" : "#d1d5db" }}
            >
              {PHASE_LABELS[phase]}
            </span>
          </div>
        </div>
        <div className="w-full h-px transition-colors duration-400" style={{ background: outputActive ? "#0084C5" : "#f3f4f6" }} />
      </div>

      {/* OUTPUT label */}
      <div className="flex items-center gap-2 px-1 mb-0.5">
        <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${outputActive ? "text-[#0084C5]" : "text-gray-300"}`}>
          Output
        </span>
        <div className="h-px flex-1 transition-colors duration-500" style={{ background: outputActive ? "rgba(0,132,197,0.35)" : "#f3f4f6" }} />
      </div>

      {/* Data card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#0084C5] mb-3">Extracted Fields</p>
        <div className="space-y-2.5">
          {fields.map((f, i) => (
            <div
              key={f.key}
              style={{
                transition: "opacity 0.35s ease, transform 0.35s ease",
                opacity:    revealCount > i ? 1 : 0,
                transform:  revealCount > i ? "translateY(0)" : "translateY(6px)",
              }}
              className="flex justify-between text-sm"
            >
              <span className="text-gray-400">{f.key}</span>
              <span className="font-semibold text-[#003854]">{f.value}</span>
            </div>
          ))}
        </div>
        <div
          style={{ transition: "opacity 0.4s", opacity: phase === "done" ? 1 : 0 }}
          className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-green-400" style={{ animation: "blink 1.4s ease-in-out infinite" }} />
          <span className="text-xs font-semibold text-green-500">Ready to export</span>
        </div>
      </div>

    </div>
  );
}
