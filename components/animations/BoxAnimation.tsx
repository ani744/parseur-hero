"use client";

import { useEffect, useRef, useState } from "react";

const PDFS = [
  { label: "Invoice_2025",  color: "#0084C5", bg: "rgba(0,132,197,0.12)",  border: "rgba(0,132,197,0.4)"  },
  { label: "Contract_NDA",  color: "#0099d4", bg: "rgba(0,153,212,0.12)",  border: "rgba(0,153,212,0.4)"  },
  { label: "Statement_Q1",  color: "#00b4e0", bg: "rgba(0,180,224,0.12)",  border: "rgba(0,180,224,0.4)"  },
];

const FIELD_SETS = [
  [{ k: "Vendor",  v: "Acme Corp" },    { k: "Invoice", v: "INV-2025-041" }, { k: "Amount",  v: "$4,320.00"  }, { k: "Due date", v: "Mar 30, 2025" }],
  [{ k: "Party",  v: "GlobalTech Ltd"},  { k: "Ref",     v: "NDA-2025-007"  }, { k: "Signed",  v: "Feb 14, 2025" }, { k: "Expires", v: "Feb 14, 2027" }],
  [{ k: "Account", v: "98-2210-04" },   { k: "Period",  v: "Q1 2025"       }, { k: "Balance", v: "$12,540.80" }, { k: "Currency", v: "USD"          }],
];

const ParseurMark = ({ active }: { active: boolean }) => {
  const c = active ? "#0084C5" : "rgba(255,255,255,0.2)";
  return (
    <svg width="38" height="38" viewBox="0 0 32 36" fill="none"
      style={active ? { filter: "drop-shadow(0 0 8px rgba(0,132,197,0.8))" } : { transition: "filter 0.4s" }}
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

// Illustrated PDF card
const PdfCard = ({
  pdf, flying, floatDelay, size = 1,
}: {
  pdf: typeof PDFS[0];
  flying: boolean;
  floatDelay: number;
  size?: number;
}) => (
  <div style={{
    width: 88 * size, flexShrink: 0,
    animation: flying
      ? "pdfDrop 0.65s cubic-bezier(0.4,0,0.8,0.6) forwards"
      : `pdfFloat 3s ease-in-out ${floatDelay}s infinite`,
    transformOrigin: "center bottom",
  }}>
    {/* Page shape */}
    <div style={{
      background: "#fff",
      borderRadius: 7 * size,
      boxShadow: `0 6px 20px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.12), inset 0 0 0 1.5px ${pdf.border}`,
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Top color bar */}
      <div style={{ height: 7 * size, background: `linear-gradient(90deg, ${pdf.color}, ${pdf.color}cc)` }} />

      {/* Folded corner */}
      <div style={{
        position: "absolute", top: 7 * size, right: 0,
        width: 0, height: 0,
        borderStyle: "solid",
        borderWidth: `0 ${14 * size}px ${14 * size}px 0`,
        borderColor: `transparent #e0eef5 transparent transparent`,
      }} />

      <div style={{ padding: `${8 * size}px ${10 * size}px ${10 * size}px` }}>
        {/* PDF icon */}
        <div style={{
          width: 24 * size, height: 28 * size, marginBottom: 6 * size,
          background: pdf.bg, borderRadius: 3 * size,
          border: `1px solid ${pdf.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width={14 * size} height={16 * size} viewBox="0 0 14 16" fill="none">
            <path d="M2 0h7l5 5v11H2z" fill="none" stroke={pdf.color} strokeWidth="1.2" strokeLinejoin="round"/>
            <path d="M9 0v5h5" fill="none" stroke={pdf.color} strokeWidth="1.2" strokeLinejoin="round"/>
            <rect x="3.5" y="7"  width="7" height="1.2" rx="0.6" fill={pdf.color} opacity="0.5"/>
            <rect x="3.5" y="9"  width="5" height="1.2" rx="0.6" fill={pdf.color} opacity="0.4"/>
            <rect x="3.5" y="11" width="6" height="1.2" rx="0.6" fill={pdf.color} opacity="0.3"/>
          </svg>
        </div>

        {/* Label lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 * size }}>
          <div style={{ height: 4.5 * size, width: "90%", borderRadius: 9999, background: `${pdf.color}33` }} />
          <div style={{ height: 3.5 * size, width: "65%", borderRadius: 9999, background: "rgba(0,0,0,0.07)" }} />
          <div style={{ height: 3.5 * size, width: "80%", borderRadius: 9999, background: "rgba(0,0,0,0.05)" }} />
        </div>

        {/* PDF badge */}
        <div style={{ marginTop: 7 * size, display: "flex", justifyContent: "flex-end" }}>
          <span style={{
            fontSize: 6.5 * size, fontWeight: 800, letterSpacing: "0.06em",
            color: pdf.color, background: pdf.bg,
            padding: `${1.5 * size}px ${4 * size}px`, borderRadius: 3 * size,
            border: `1px solid ${pdf.border}`,
          }}>PDF</span>
        </div>
      </div>
    </div>
  </div>
);

export default function BoxAnimation() {
  const [step,        setStep]        = useState(-1);   // which PDF is currently flying (0,1,2)
  const [processed,   setProcessed]   = useState<number[]>([]);
  const [revealCount, setRevealCount] = useState(0);
  const [done,        setDone]        = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const after = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };

  useEffect(() => {
    const cycle = () => {
      clear();
      setStep(-1);
      setProcessed([]);
      setRevealCount(0);
      setDone(false);

      const runPdf = (i: number, onDone: () => void) => {
        setStep(i);
        after(() => setRevealCount(0), 0);
        // PDF flies in; after 650ms it's "inside"
        after(() => {
          setProcessed(p => [...p, i]);
          setStep(-1);
          // reveal fields for this doc
          FIELD_SETS[i].forEach((_, fi) => after(() => setRevealCount(fi + 1), fi * 320));
          after(onDone, FIELD_SETS[i].length * 320 + 400);
        }, 750);
      };

      after(() =>
        runPdf(0, () =>
          runPdf(1, () =>
            runPdf(2, () => {
              after(() => setDone(true), 300);
              after(cycle, 2800);
            })
          )
        )
      , 600);
    };

    cycle();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Which set of fields to show = last processed doc
  const activeFieldSet = processed.length > 0 ? FIELD_SETS[processed[processed.length - 1]] : [];
  const processing = step >= 0;
  const dataVisible = processed.length > 0;

  return (
    <div style={{ width: 340, height: 520, display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>

      {/* ── TOP: 3 PDF cards in a row ── */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 14, height: 140, position: "relative", width: "100%" }}>
        {PDFS.map((pdf, i) => {
          const isFlying    = step === i;
          const isProcessed = processed.includes(i);
          return (
            <div key={i} style={{
              // no transition while flying — pdfDrop handles everything
              transition: (!isFlying && !isProcessed) ? "opacity 0.4s ease, transform 0.4s ease" : "none",
              opacity:   isProcessed ? 0 : 1,
              transform: isProcessed ? "scale(0.3)" : "scale(1)",
              pointerEvents: "none",
            }}>
              <PdfCard pdf={pdf} flying={isFlying} floatDelay={i * 0.9} />
            </div>
          );
        })}
      </div>

      {/* ── Connector ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: 28 }}>
        <div style={{ width: 2, flex: 1, background: processing ? "#0084C5" : "rgba(255,255,255,0.12)", transition: "background 0.4s", boxShadow: processing ? "0 0 8px rgba(0,132,197,0.7)" : "none" }} />
        <svg width="10" height="8" viewBox="0 0 10 8">
          <path d="M5 8L0 0h10z" fill={processing ? "#0084C5" : "rgba(255,255,255,0.12)"} style={{ transition: "fill 0.4s" }} />
        </svg>
      </div>

      {/* ── CENTER: Parseur box ── */}
      <div style={{
        width: "100%",
        borderRadius: 16,
        padding: "16px 20px",
        transition: "background 0.4s, border-color 0.4s",
        background: processing
          ? "linear-gradient(135deg, rgba(0,56,84,0.95), rgba(0,20,42,0.98))"
          : "rgba(255,255,255,0.04)",
        border: "1.5px solid",
        borderColor: processing ? "rgba(0,132,197,0.7)" : "rgba(255,255,255,0.1)",
        animation: processing ? "boxPulse 1s ease-in-out infinite" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <ParseurMark active={processing} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: processing ? "#fff" : "rgba(255,255,255,0.25)", transition: "color 0.4s", marginBottom: 4, letterSpacing: "-0.01em" }}>Parseur</div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: processing ? "#0084C5" : "rgba(255,255,255,0.15)", transition: "color 0.4s" }}>
              {processing ? "Extracting…" : done ? "Complete" : processed.length > 0 ? "Waiting…" : "Ready"}
            </div>
          </div>
          {processing && (
            <div style={{ display: "flex", gap: 5 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#0084C5", animation: `blink 0.7s ease-in-out ${i * 0.18}s infinite`, boxShadow: "0 0 6px rgba(0,132,197,1)" }} />
              ))}
            </div>
          )}
        </div>

        {/* Progress dots for processed PDFs */}
        <div style={{ display: "flex", gap: 6, marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {PDFS.map((pdf, i) => (
            <div key={i} style={{
              height: 4, flex: 1, borderRadius: 9999,
              transition: "background 0.4s",
              background: processed.includes(i) || step === i ? pdf.color : "rgba(255,255,255,0.08)",
              boxShadow: processed.includes(i) || step === i ? `0 0 6px ${pdf.color}80` : "none",
            }} />
          ))}
        </div>
      </div>

      {/* ── Connector ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: 28 }}>
        <div style={{ width: 2, flex: 1, background: dataVisible ? "#0084C5" : "rgba(255,255,255,0.12)", transition: "background 0.4s", boxShadow: dataVisible ? "0 0 8px rgba(0,132,197,0.7)" : "none" }} />
        <svg width="10" height="8" viewBox="0 0 10 8">
          <path d="M5 8L0 0h10z" fill={dataVisible ? "#0084C5" : "rgba(255,255,255,0.12)"} style={{ transition: "fill 0.4s" }} />
        </svg>
      </div>

      {/* ── BOTTOM: Extracted data ── */}
      <div style={{
        width: "100%", flex: 1, borderRadius: 12, padding: "14px 16px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid",
        borderColor: dataVisible ? "rgba(0,132,197,0.4)" : "rgba(255,255,255,0.08)",
        transition: "border-color 0.6s ease",
        overflow: "hidden",
      }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,132,197,0.65)", marginBottom: 10 }}>Extracted Data</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {activeFieldSet.map((f, i) => (
            <div key={`${processed.length}-${f.k}`} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              opacity:   revealCount > i ? 1 : 0,
              transform: revealCount > i ? "translateY(0)" : "translateY(7px)",
            }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.38)" }}>{f.k}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>{f.v}</span>
            </div>
          ))}
        </div>
        {done && (
          <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid rgba(0,132,197,0.2)", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "blink 1.4s ease-in-out infinite", boxShadow: "0 0 6px rgba(74,222,128,0.6)" }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: "#4ade80" }}>3 docs processed · Ready to export</span>
          </div>
        )}
      </div>

    </div>
  );
}
