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
              "Turn PDFs, emails, and scans into data your systems can use",
              "Go live in minutes, no training needed",
              "Built for production, privacy, and scale",
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-5 h-5 bg-white/15 border border-white/25 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <a href="#" className="border-2 border-white/40 text-white px-7 py-3.5 rounded-md text-[16px] font-semibold hover:bg-white/10 hover:border-white transition-colors">Book a demo</a>
            <a href="#" className="bg-white text-[#003854] px-7 py-3.5 rounded-md text-[16px] font-semibold hover:bg-white/90 transition-colors shadow-lg shadow-black/20">Sign up for free</a>
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
