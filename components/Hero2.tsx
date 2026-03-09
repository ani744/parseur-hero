import Logo from "./Logo";
import CascadeAnimation from "./animations/CascadeAnimation";

export default function Hero2() {
  return (
    <section className="min-h-screen flex flex-col overflow-hidden" style={{ background: "linear-gradient(135deg, #020d18 0%, #003854 45%, #004e78 75%, #0084C5 100%)" }}>

      {/* Ambient glow blobs */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,132,197,0.18) 0%, transparent 70%)", top: -120, right: -80, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,84,197,0.12) 0%, transparent 70%)", bottom: 60, left: -100, pointerEvents: "none" }} />

      <nav className="relative flex items-center justify-between px-10 py-6 border-b border-white/10">
        <Logo variant="light" />
        <div className="flex items-center gap-4">
          <a href="#" className="text-white/70 text-[15px] font-semibold hover:text-white transition-colors">Book a demo</a>
          <a href="#" className="text-[15px] font-semibold px-5 py-2.5 rounded-md text-white transition-colors" style={{ background: "linear-gradient(135deg, #0084C5, #0066a0)", boxShadow: "0 0 20px rgba(0,132,197,0.4)" }}>
            Sign up for free
          </a>
        </div>
      </nav>

      <div className="relative flex flex-col items-center flex-1 px-6 py-14 max-w-5xl mx-auto w-full">

        {/* Badge */}
        <span className="inline-block text-sm font-semibold tracking-widest uppercase mb-6 px-4 py-1.5 rounded-full" style={{ background: "linear-gradient(135deg, rgba(0,132,197,0.25), rgba(0,132,197,0.08))", border: "1px solid rgba(0,132,197,0.4)", color: "#5cc8ff" }}>
          AI Document Extraction
        </span>

        {/* Headline */}
        <h1 className="text-[56px] leading-[1.1] font-bold text-white mb-6 text-center">
          Documents in.<br />
          <span style={{ background: "linear-gradient(90deg, #5cc8ff 0%, #0084C5 50%, #00cfff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Clean data out.
          </span>{" "}Always.
        </h1>

        <p className="text-xl mb-8 leading-relaxed text-center max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
          Replace manual document work with reliable AI extraction that turns incoming documents into production-ready data.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-3 gap-4 mb-10 w-full max-w-2xl">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#5cc8ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="14,2 14,8 20,8" stroke="#5cc8ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="#5cc8ff" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="#5cc8ff" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ),
              text: "Turn PDFs, emails, and scans into data your systems can use",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="#5cc8ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              text: "Go live in minutes, no training needed",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#5cc8ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              text: "Built for production, privacy, and scale",
            },
          ].map(({ icon, text }) => (
            <div key={text} className="flex flex-col items-center text-center gap-3 rounded-xl p-4" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, rgba(0,132,197,0.2), rgba(0,132,197,0.05))", border: "1px solid rgba(0,132,197,0.3)" }}>
                {icon}
              </div>
              <p className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.55)" }}>{text}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-4 mb-12">
          <a href="#" className="btn-hero2-primary text-white px-7 py-3.5 rounded-md text-[16px] font-semibold" style={{ background: "linear-gradient(135deg, #0084C5 0%, #00a8f0 100%)", boxShadow: "0 4px 24px rgba(0,132,197,0.5), 0 0 0 1px rgba(0,168,240,0.3)" }}>
            Sign up for free
          </a>
          <a href="#" className="btn-hero2-secondary text-white px-7 py-3.5 rounded-md text-[16px] font-semibold" style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}>
            Book a demo
          </a>
        </div>

        {/* Animation */}
        <CascadeAnimation />
      </div>

      <div className="relative text-center text-xs pb-3 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.15)" }}>
        Option 2 — Futuristic Gradient · Center Aligned · Cascade Animation
      </div>
    </section>
  );
}
