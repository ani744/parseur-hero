import Logo from "./Logo";
import HoloAnimation from "./animations/HoloAnimation";

// Layout: 2-column left-aligned — copy left, FUTURISTIC holographic animation right
export default function Hero5() {
  return (
    <section
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #003854 0%, #005a8a 50%, #0084C5 100%)" }}
    >
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/10">
        <Logo variant="light" />
        <div className="flex items-center gap-4">
          <a href="#" className="text-white/80 text-[15px] font-semibold hover:text-white transition-colors">Book a demo</a>
          <a href="#" className="bg-white text-[#003854] text-[15px] font-semibold px-5 py-2.5 rounded-md hover:bg-white/90 transition-colors">Sign up for free</a>
        </div>
      </nav>

      <div className="flex flex-1 items-center max-w-6xl mx-auto w-full px-10 py-16 gap-20 relative">
        {/* Ambient blobs */}
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[#0084C5]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Left — copy */}
        <div className="flex-1 min-w-0 relative">
          <span className="inline-block text-white/65 text-sm font-semibold tracking-widest uppercase mb-6 border border-white/20 px-4 py-1.5 rounded-full">
            AI Document Extraction
          </span>
          <h1 className="text-[52px] leading-[1.1] font-bold text-white mb-6">
            Documents in.<br />
            Clean data out.<br />
            Always.
          </h1>
          <p className="text-xl text-white/60 mb-8 leading-relaxed max-w-lg">
            Replace manual document work with reliable AI extraction that turns incoming documents into production-ready data.
          </p>
          <ul className="flex flex-col gap-3 mb-10 text-white/75 text-[15px]">
            {[
              {
                text: "Turn PDFs, emails, and scans into data your systems can use",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#5cc8ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14,2 14,8 20,8" stroke="#5cc8ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="13" x2="8" y2="13" stroke="#5cc8ff" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="16" y1="17" x2="8" y2="17" stroke="#5cc8ff" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                text: "Go live in minutes, no training needed",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="#5cc8ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                text: "Built for production, privacy, and scale",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#5cc8ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
            ].map(({ icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                {icon}
                {text}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <a href="#" className="bg-white text-[#003854] px-7 py-3.5 rounded-md text-[16px] font-semibold hover:bg-white/90 transition-colors shadow-lg shadow-black/20">Sign up for free</a>
            <a href="#" className="border border-white/40 text-white px-7 py-3.5 rounded-md text-[16px] font-semibold hover:bg-white/10 hover:border-white transition-colors">Book a demo</a>
          </div>
        </div>

        {/* Right — futuristic holographic animation */}
        <div className="flex-shrink-0 relative">
          <HoloAnimation />
        </div>
      </div>

      <div className="text-center text-xs text-white/20 pb-3 tracking-widest uppercase">Option 5 — Gradient · Futuristic Holo Animation</div>
    </section>
  );
}
