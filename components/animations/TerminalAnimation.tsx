"use client";

import { useEffect, useRef, useState } from "react";

type Line = { text: string; color: string };

const SCRIPTS: Line[][] = [
  [
    { text: "$ parseur extract invoice_2025.pdf",      color: "text-[#0084C5]" },
    { text: "  → type detected: PDF document",         color: "text-white/50"  },
    { text: "  → scanning document structure...",      color: "text-white/50"  },
    { text: "  → extracting fields",                   color: "text-white/50"  },
    { text: '    vendor    ✓  "Acme Corp"',             color: "text-green-400" },
    { text: '    invoice   ✓  "INV-2025-041"',          color: "text-green-400" },
    { text: '    amount    ✓  "$4,320.00"',             color: "text-green-400" },
    { text: '    due_date  ✓  "Mar 30, 2025"',          color: "text-green-400" },
    { text: "  ✓ 4 fields extracted · 0.8s",           color: "text-[#0084C5]" },
  ],
  [
    { text: "$ parseur extract purchase_order@acme",   color: "text-[#0084C5]" },
    { text: "  → type detected: Email / HTML",         color: "text-white/50"  },
    { text: "  → parsing email body...",               color: "text-white/50"  },
    { text: "  → extracting fields",                   color: "text-white/50"  },
    { text: '    vendor    ✓  "TechSupply Co"',         color: "text-green-400" },
    { text: '    order_no  ✓  "PO-88412"',             color: "text-green-400" },
    { text: '    total     ✓  "$12,450.00"',           color: "text-green-400" },
    { text: '    ship_date ✓  "Apr 05, 2025"',         color: "text-green-400" },
    { text: "  ✓ 4 fields extracted · 1.1s",           color: "text-[#0084C5]" },
  ],
  [
    { text: "$ parseur extract receipt_scan.jpg",      color: "text-[#0084C5]" },
    { text: "  → type detected: Image / OCR",          color: "text-white/50"  },
    { text: "  → running OCR engine...",               color: "text-white/50"  },
    { text: "  → extracting fields",                   color: "text-white/50"  },
    { text: '    merchant  ✓  "Corner Café"',           color: "text-green-400" },
    { text: '    items     ✓  "3"',                    color: "text-green-400" },
    { text: '    subtotal  ✓  "$24.75"',               color: "text-green-400" },
    { text: '    paid_on   ✓  "Mar 09, 2025"',         color: "text-green-400" },
    { text: "  ✓ 4 fields extracted · 1.4s",           color: "text-[#0084C5]" },
  ],
];

const SPEEDS: Record<string, number> = {
  "text-[#0084C5]": 42,
  "text-white/50":  28,
  "text-green-400": 22,
};

const PAUSES: Record<string, number> = {
  "text-[#0084C5]": 350,
  "text-white/50":  120,
  "text-green-400": 70,
};

export default function TerminalAnimation() {
  const [completedLines, setCompletedLines] = useState<Line[]>([]);
  const [currentText,    setCurrentText]    = useState("");
  const [currentColor,   setCurrentColor]   = useState("text-white");
  const [cursor,         setCursor]         = useState(true);
  const handles = useRef<(ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>)[]>([]);

  const clear = () => {
    handles.current.forEach(h => { clearTimeout(h as ReturnType<typeof setTimeout>); clearInterval(h as ReturnType<typeof setInterval>); });
    handles.current = [];
  };

  useEffect(() => {
    let scriptIdx = 0;

    const runScript = () => {
      const script = SCRIPTS[scriptIdx];
      let lineIdx = 0;

      const runLine = () => {
        if (lineIdx >= script.length) {
          const t = setTimeout(() => {
            setCompletedLines([]);
            setCurrentText("");
            scriptIdx = (scriptIdx + 1) % SCRIPTS.length;
            const t2 = setTimeout(runScript, 350);
            handles.current.push(t2);
          }, 1600);
          handles.current.push(t);
          return;
        }

        const line = script[lineIdx];
        setCurrentColor(line.color);
        let charIdx = 0;
        setCurrentText("");

        const speed = SPEEDS[line.color] ?? 30;
        const pause = PAUSES[line.color] ?? 150;

        const interval = setInterval(() => {
          charIdx++;
          setCurrentText(line.text.slice(0, charIdx));
          if (charIdx >= line.text.length) {
            clearInterval(interval);
            const t = setTimeout(() => {
              setCompletedLines(prev => [...prev, { text: line.text, color: line.color }]);
              setCurrentText("");
              lineIdx++;
              runLine();
            }, pause);
            handles.current.push(t);
          }
        }, speed);
        handles.current.push(interval);
      };

      runLine();
    };

    runScript();

    const cursorInt = setInterval(() => setCursor(c => !c), 480);
    handles.current.push(cursorInt);

    return clear;
  }, []);

  return (
    <div className="w-full max-w-[420px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Title bar */}
      <div className="bg-[#1a1f2e] flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-400/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
        <div className="w-3 h-3 rounded-full bg-green-400/60" />
        <span className="ml-3 text-white/30 text-xs font-mono">parseur-cli — bash</span>
      </div>

      {/* Terminal body */}
      <div className="bg-[#0d1117] p-5 font-mono text-[13px] leading-relaxed min-h-[260px] overflow-hidden">
        {completedLines.map((line, i) => (
          <div key={i} className={`${line.color} whitespace-pre`}>{line.text}</div>
        ))}
        {currentText !== "" && (
          <div className={`${currentColor} whitespace-pre`}>
            {currentText}
            <span className={cursor ? "opacity-100" : "opacity-0"} style={{ color: "#0084C5" }}>▌</span>
          </div>
        )}
        {currentText === "" && (
          <span className={cursor ? "opacity-100" : "opacity-0"} style={{ color: "#0084C5" }}>▌</span>
        )}
      </div>
    </div>
  );
}
