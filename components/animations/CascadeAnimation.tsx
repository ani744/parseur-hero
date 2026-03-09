"use client";

import { useEffect, useRef, useState } from "react";

const DOCS = [
  { tag: "PDF", label: "Invoice_2025.pdf",  lines: [100, 75, 90], fields: [{ key: "Vendor",  value: "Acme Corp"     }, { key: "Invoice", value: "INV-2025-041" }, { key: "Amount",  value: "$4,320.00"    }] },
  { tag: "PDF", label: "Contract_NDA.pdf",  lines: [95,  80, 60], fields: [{ key: "Party",   value: "GlobalTech Ltd" }, { key: "Ref",     value: "NDA-2025-007"  }, { key: "Signed",  value: "Feb 14, 2025" }] },
  { tag: "PDF", label: "Statement_Q1.pdf",  lines: [85, 100, 70], fields: [{ key: "Account", value: "98-2210-04"    }, { key: "Period",  value: "Q1 2025"       }, { key: "Balance", value: "$12,540.80"   }] },
];

type DocPhase = "hidden" | "entering" | "processing" | "leaving";

const ParseurMark = ({ active }: { active: boolean }) => {
  const c = active ? "#5cc8ff" : "rgba(255,255,255,0.2)";
  return (
    <svg width="28" height="28" viewBox="0 0 32 36" fill="none"
      style={active ? { animation: "blink 1.4s ease-in-out infinite", filter: "drop-shadow(0 0 4px rgba(0,168,255,0.7))" } : { transition: "filter 0.4s" }}
    >
      <path d="M5.406 5.742L5.63 5.779l.97.559.969.559.97.559.969.559.969.559.97.559.149.149-.336.224-.671.373-.895.522-.97.559-.969.559-.969.559-.636.373-.037 17.748-.187-.075-1.044-.596-.97-.559-.969-.559-.97-.559-.969-.559-.97-.559-.037-.037V8.874l.634-.373.97-.559.969-.559.97-.559.969-.559.895-.522z" fill={c}/>
      <path d="M30.686 19.687h.074v7.009l-.634.373-.969.559-.97.559-.969.559-.97.559-.894.522-1.044.597-.895.522-.969.559-.97.559-.969.559-.97.559-.969.559-.97.559-.969.559-.37.149-.932-.522-.634-.373-.97-.559-.969-.559-.97-.559-.895-.522-.037-.075v-7.084l.187.075.932.522.895.522.969.559.97.559.969.559.559.336.559-.299.895-.522.932-.522.634-.373 1.044-.597 1.044-.597 1.044-.597 1.044-.597 1.044-.597.97-.54 1.044-.597 1.044-.597 1.044-.597.895-.522z" fill={c}/>
      <path d="M15.362 0l.447.224.895.522.969.559.97.559.969.559.97.559.969.559.895.522 1.044.597.895.522.969.559.97.559.969.559.97.559.97.559.559.336v6.413l-.932.522-.634.373-.969.559-.97.559-.969.559-.97.559-.634.373h-.037l-.037-6.338-1.044-.634-1.193-.708-1.044-.634-.932-.559-1.044-.634-1.193-.708-1.044-.634-1.193-.708-1.044-.634-1.044-.634-1.193-.708-1.044-.597.895-.522.97-.559.969-.559.97-.559.969-.559.97-.559z" fill={c}/>
      <path d="M15.324 11.447l.187.037.969.559.97.559.969.559.97.559.969.559.522.298v6.413l-.932.522-.634.373-.969.559-.97.559-.969.559-.97.559-.187-.037-.969-.559-.97-.559-.969-.559-.97-.559-.969-.559-.522-.298v-6.413l.932-.522.895-.522.969-.559.97-.559.969-.559.708-.41z" fill={c}/>
      <path d="M9.881 25.317l.186.074.932.522.895.522.969.559.97.559.969.559.559.336.037.037v7.084l-.447-.224-.895-.522-.969-.559-.97-.559-.969-.559-.97-.559-.298-.187v-7.084z" fill={c}/>
      <path d="M5.406 5.742l.224.037.969.559.97.559.969.559.97.559.969.559.97.559.149.149-.336.224-.671.373-.895.522-.97.559-.969.559-.969.559-.448-.224-.895-.522-.969-.559-.97-.559-.969-.559-.895-.522L0 8.948v-.112l.932-.522.634-.373.969-.559.97-.559.969-.559.932-.522z" fill={c}/>
      <path d="M30.723 8.911h.037v6.376l-.932.522-.634.373-.969.559-.97.559-.969.559-.97.559-.634.373h-.037V12.416l.97-.559.969-.559.97-.559.970-.559.895-.522 1.044-.597.261-.149z" fill={c}/>
    </svg>
  );
};

export default function CascadeAnimation() {
  const [activeDoc,    setActiveDoc]    = useState(0);
  const [docPhase,     setDocPhase]     = useState<DocPhase>("hidden");
  const [revealCount,  setRevealCount]  = useState(0);
  const [done,         setDone]         = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const after = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };

  useEffect(() => {
    const runDoc = (idx: number, onDone: () => void) => {
      setActiveDoc(idx);
      setRevealCount(0);
      setDocPhase("entering");

      // start processing — Parseur activates, fields reveal staggered
      after(() => {
        setDocPhase("processing");
        DOCS[idx].fields.forEach((_, i) => after(() => setRevealCount(i + 1), i * 350));
      }, 700);

      // doc leaves, fields stay
      after(() => setDocPhase("leaving"), 2100);

      // doc hidden, move on
      after(() => {
        setDocPhase("hidden");
        after(onDone, 300);
      }, 2600);
    };

    const cycle = () => {
      clear();
      setDone(false);
      setDocPhase("hidden");
      setRevealCount(0);

      after(() => {
        runDoc(0, () =>
          runDoc(1, () =>
            runDoc(2, () => {
              after(() => setDone(true), 400);
              after(cycle, 2800);
            })
          )
        );
      }, 400);
    };

    cycle();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doc    = DOCS[activeDoc];
  const active = docPhase === "processing";
  const docVisible = docPhase === "entering" || docPhase === "processing" || docPhase === "leaving";

  return (
    // Fixed total width — never reflows
    <div style={{ width: 640, flexShrink: 0 }}>
      <div
        style={{
          width: 640,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: 24,
          borderRadius: 16,
          background: "linear-gradient(135deg, rgba(0,20,40,0.85) 0%, rgba(0,56,84,0.6) 100%)",
          border: "1px solid rgba(0,132,197,0.25)",
          boxShadow: "0 0 40px rgba(0,132,197,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
          backdropFilter: "blur(16px)",
          boxSizing: "border-box",
        }}
      >

        {/* ── Left: incoming PDF ── fixed 190px */}
        <div style={{ width: 190, flexShrink: 0 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(92,200,255,0.5)", marginBottom: 10 }}>Incoming</p>
          <div
            style={{
              width: 190,
              minHeight: 120,
              transition: "opacity 0.4s ease, transform 0.4s ease",
              opacity:   docVisible ? 1 : 0,
              transform: docPhase === "entering"   ? "translateX(0)"
                       : docPhase === "leaving"    ? "translateX(12px)"
                       : "translateX(-14px)",
              background: "linear-gradient(135deg, rgba(0,132,197,0.12), rgba(0,56,84,0.3))",
              border: "1px solid rgba(0,132,197,0.3)",
              borderRadius: 12,
              padding: 14,
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "linear-gradient(135deg, rgba(0,132,197,0.4), rgba(0,168,240,0.2))", color: "#5cc8ff", border: "1px solid rgba(0,132,197,0.4)", letterSpacing: "0.08em" }}>
                {doc.tag}
              </span>
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.label}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {doc.lines.map((w, i) => (
                <div key={i} style={{ width: `${w}%`, height: 6, borderRadius: 9999, background: "linear-gradient(90deg, rgba(0,132,197,0.3), rgba(0,132,197,0.08))" }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Center: Parseur processor ── fixed 80px */}
        <div style={{ width: 80, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {[0,1,2,3,4].map(i => (
              <div key={i} style={{
                width: 5, height: 5, borderRadius: "50%",
                transition: "background 0.3s",
                background: active ? "#0084C5" : "rgba(255,255,255,0.12)",
                ...(active ? { animation: `blink 0.7s ease-in-out ${i * 0.12}s infinite`, boxShadow: "0 0 5px rgba(0,132,197,0.8)" } : {}),
              }} />
            ))}
          </div>

          <div style={{
            width: 60, height: 60, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s",
            background: active ? "linear-gradient(135deg, rgba(0,132,197,0.25), rgba(0,168,240,0.1))" : "rgba(255,255,255,0.04)",
            border: active ? "1.5px solid rgba(0,168,240,0.7)" : "1.5px solid rgba(255,255,255,0.12)",
            boxShadow: active ? "0 0 20px rgba(0,132,197,0.5), 0 0 40px rgba(0,132,197,0.2)" : "none",
          }}>
            <ParseurMark active={active} />
          </div>

          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: active ? "#5cc8ff" : "rgba(255,255,255,0.2)", transition: "color 0.3s", textAlign: "center" }}>
            {active ? "Parsing" : "Parseur"}
          </div>
        </div>

        {/* ── Right: structured data ── fills remaining space */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(92,200,255,0.5)", marginBottom: 10 }}>Structured Data</p>
          <div style={{
            background: "linear-gradient(135deg, rgba(0,10,25,0.8), rgba(0,30,55,0.6))",
            border: "1px solid rgba(0,132,197,0.2)",
            borderRadius: 12,
            padding: 14,
            minHeight: 120,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {doc.fields.map((field, i) => (
                <div key={`${activeDoc}-${field.key}`} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                  opacity:   revealCount > i ? 1 : 0,
                  transform: revealCount > i ? "translateX(0)" : "translateX(-8px)",
                }}>
                  <span style={{ fontSize: 11, color: "rgba(92,200,255,0.5)" }}>{field.key}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>{field.value}</span>
                </div>
              ))}
            </div>
            <div style={{ transition: "opacity 0.4s", opacity: done ? 1 : 0, marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(0,132,197,0.2)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", flexShrink: 0, animation: "blink 1.4s ease-in-out infinite", boxShadow: "0 0 8px rgba(74,222,128,0.6)", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#4ade80" }}>3 docs processed</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
