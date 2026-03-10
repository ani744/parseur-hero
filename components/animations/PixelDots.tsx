"use client";

import { useEffect, useRef } from "react";

const REPEL_RADIUS = 130;
const REPEL_STRENGTH = 90;

interface Particle {
  x: number;
  y: number;
  size: number;
  maxOp: number;
  speed: number;    // px/s upward
  driftX: number;   // px/s horizontal
  type: "circle" | "square";
  repelX: number;
  repelY: number;
}

export default function PixelDots({ count = 80 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const init = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      // Start particles at random y so they're visible immediately
      particlesRef.current = Array.from({ length: count }, () => ({
        x:      Math.random() * w,
        y:      Math.random() * h,
        size:   Math.random() * 3.2 + 0.8,
        maxOp:  Math.random() * 0.3 + 0.7,
        speed:  Math.random() * 18 + 10,   // 10–28 px/s (slow)
        driftX: (Math.random() - 0.5) * 8,
        type:   Math.random() > 0.45 ? "circle" : "square",
        repelX: 0,
        repelY: 0,
      }));
    };

    init();

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const tick = (time: number) => {
      const dt = Math.min((time - (lastTimeRef.current || time)) / 1000, 0.05);
      lastTimeRef.current = time;

      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      const { x: mx, y: my } = mouseRef.current;

      for (const p of particlesRef.current) {
        // Move upward + drift
        p.y -= p.speed * dt;
        p.x += p.driftX * dt;

        // Wrap: reset to bottom when off top
        if (p.y < -p.size) { p.y = h + p.size; p.x = Math.random() * w; }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;

        // Cursor repulsion using actual visual position
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let rx = 0, ry = 0;
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          rx = (dx / dist) * force * REPEL_STRENGTH;
          ry = (dy / dist) * force * REPEL_STRENGTH;
        }
        p.repelX += (rx - p.repelX) * 0.15;
        p.repelY += (ry - p.repelY) * 0.15;

        // Opacity: fade in from bottom, fade out near top
        const progress = 1 - p.y / h; // 0 = bottom, 1 = top
        let op = p.maxOp;
        if (progress < 0.08) op *= progress / 0.08;
        else if (progress > 0.82) op *= Math.max(0, (1 - progress) / 0.18);

        // Draw
        const drawX = p.x + p.repelX;
        const drawY = p.y + p.repelY;

        ctx.globalAlpha = Math.max(0, op);
        ctx.fillStyle = "#0af";
        ctx.shadowColor = "rgba(0,170,255,1)";
        ctx.shadowBlur = p.size > 2.5 ? 10 : 5;

        if (p.type === "circle") {
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(drawX - p.size / 2, drawY - p.size / 2, p.size, p.size);
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
