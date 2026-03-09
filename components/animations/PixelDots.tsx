"use client";

import { useEffect, useRef, useState } from "react";

const FLOAT_ANIMS = ["floatA", "floatB", "floatC", "floatD", "floatE", "floatF", "floatG", "floatH"];

interface Dot {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  peakOpacity: number;
  duration: number;
  delay: number;
  anim: string;
  type: "circle" | "square";
}

const REPEL_RADIUS = 130;
const REPEL_STRENGTH = 90;

export default function PixelDots({ count = 80 }: { count?: number }) {
  const [dots, setDots] = useState<Dot[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  // Generate dots once on mount
  useEffect(() => {
    setDots(
      Array.from({ length: count }, () => {
        const base = Math.random() * 0.15 + 0.08;
        const peak = Math.random() * 0.35 + 0.28;
        return {
          x:           Math.random() * 100,
          y:           Math.random() * 100,
          size:        Math.random() * 3.2 + 0.8,
          baseOpacity: base,
          peakOpacity: peak,
          duration:    Math.random() * 6 + 5,
          delay:       Math.random() * 6,
          anim:        FLOAT_ANIMS[Math.floor(Math.random() * FLOAT_ANIMS.length)],
          type:        Math.random() > 0.45 ? "circle" : "square",
        };
      })
    );
  }, [count]);

  // Cursor repulsion loop
  useEffect(() => {
    if (dots.length === 0) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const tick = () => {
      const container = containerRef.current;
      if (!container) { rafRef.current = requestAnimationFrame(tick); return; }

      const { width, height } = container.getBoundingClientRect();
      const { x: mx, y: my } = mouseRef.current;

      wrapperRefs.current.forEach((el, i) => {
        if (!el) return;
        const dot = dots[i];
        const dx = dot.x / 100 * width  - mx;
        const dy = dot.y / 100 * height - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let px = 0, py = 0;
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          px = (dx / dist) * force * REPEL_STRENGTH;
          py = (dy / dist) * force * REPEL_STRENGTH;
        }

        el.style.setProperty("--px", `${px}px`);
        el.style.setProperty("--py", `${py}px`);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [dots]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot, i) => (
        // Outer wrapper — handles cursor repulsion
        <div
          key={i}
          ref={el => { wrapperRefs.current[i] = el; }}
          style={{
            position:   "absolute",
            left:       `${dot.x}%`,
            top:        `${dot.y}%`,
            transform:  "translate(var(--px, 0px), var(--py, 0px))",
            transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
            willChange: "transform",
          } as React.CSSProperties}
        >
          {/* Inner dot — handles float + fade animation */}
          <div
            style={{
              width:        dot.size,
              height:       dot.size,
              background:   "#00A3FF",   // vivid, saturated blue
              borderRadius: dot.type === "circle" ? "50%" : "1px",
              boxShadow:    dot.size > 2.5 ? "0 0 4px rgba(0,163,255,0.6)" : "none",
              "--dot-lo":   dot.baseOpacity,
              "--dot-hi":   dot.peakOpacity,
              animation:    `${dot.anim} ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
            } as React.CSSProperties}
          />
        </div>
      ))}
    </div>
  );
}
