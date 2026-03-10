import Logo from "./Logo";
import CascadeAnimation from "./animations/CascadeAnimation";
import PixelDots from "./animations/PixelDots";

const items = [
  {
    text: "Turn PDFs, emails, and scans into data your systems can use",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#0084C5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14,2 14,8 20,8" stroke="#0084C5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="13" x2="8" y2="13" stroke="#0084C5" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="16" y1="17" x2="8" y2="17" stroke="#0084C5" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    text: "Go live in minutes, no training needed",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="#0084C5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    text: "Built for production, privacy, and scale",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#0084C5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Hero1b() {
  return (
    <section className="relative min-h-screen bg-white flex flex-col overflow-hidden">

      <PixelDots count={80} />

      {/* Nav */}
      <nav className="relative border-b border-gray-100">
        <div className="flex items-center justify-between max-w-6xl mx-auto w-full px-10 py-6">
          <Logo variant="dark" />
          <div className="flex items-center gap-4">
            <a href="#" className="bg-[#0084C5] text-white text-[15px] font-semibold px-5 py-2.5 rounded-md hover:bg-[#006fa8] transition-colors shadow-sm">
              Sign up for free
            </a>
            <a href="#" className="text-[#003854] text-[15px] font-semibold hover:opacity-60 transition-opacity">
              Book a demo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero body — centered */}
      <div className="relative flex flex-col items-center flex-1 px-6 py-16 max-w-5xl mx-auto w-full">

        <span className="inline-block text-[#0084C5] text-sm font-semibold tracking-widest uppercase mb-6">
          AI Document Extraction
        </span>

        <h1 className="text-[56px] leading-[1.1] font-bold text-[#003854] mb-6 text-center">
          Documents in.<br />
          <span style={{ background: "linear-gradient(90deg, #0084C5 0%, #0099dd 50%, #00cfff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Clean data out.
          </span>{" "}Always.
        </h1>

        <p className="text-xl text-[#003854]/65 mb-8 leading-relaxed text-center max-w-xl">
          Replace manual document work with reliable AI extraction that turns incoming documents into production-ready data.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10 w-full max-w-2xl">
          {items.map(({ icon, text }) => (
            <div key={text} className="flex flex-col items-center text-center gap-3 rounded-xl p-4"
              style={{ background: "linear-gradient(135deg, rgba(0,132,197,0.06), rgba(0,132,197,0.02))", border: "1px solid rgba(0,132,197,0.15)" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, rgba(0,132,197,0.15), rgba(0,132,197,0.04))", border: "1px solid rgba(0,132,197,0.25)" }}>
                {icon}
              </div>
              <p className="text-sm leading-snug text-[#003854]/60">{text}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-12">
          <a href="#" className="btn-hero1-primary bg-[#0084C5] text-white px-7 py-3.5 rounded-md text-[16px] font-semibold hover:bg-[#006fa8]">
            Sign up for free
          </a>
          <a href="#" className="btn-hero1-secondary border border-[#003854]/30 text-[#003854] px-7 py-3.5 rounded-md text-[16px] font-semibold hover:border-[#003854] hover:bg-[#003854]/5">
            Book a demo
          </a>
        </div>

        <CascadeAnimation />
      </div>

      <div className="relative text-center text-xs text-gray-300 pb-3 tracking-widest uppercase">
        Option 1.2 — Pure White · Center Aligned · Cascade Animation
      </div>
    </section>
  );
}
