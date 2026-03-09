import Logo from "./Logo";
import BoxAnimation from "./animations/BoxAnimation";

export default function Hero3() {
  return (
    <section className="min-h-screen bg-white flex flex-col">

      {/* Nav — same boxed width as hero body */}
      <nav className="border-b border-gray-100">
        <div className="flex items-center justify-between max-w-6xl mx-auto w-full px-10 py-6">
          <Logo variant="dark" />
          <div className="flex items-center gap-4">
            <a href="#" className="bg-[#0084C5] text-white text-[15px] font-semibold px-5 py-2.5 rounded-md hover:bg-[#006fa8] transition-colors">Sign up for free</a>
            <a href="#" className="text-[#003854] text-[15px] font-semibold hover:opacity-70 transition-opacity">Book a demo</a>
          </div>
        </div>
      </nav>

      {/* Hero body — same max-w-6xl container, two columns */}
      <div className="flex flex-1 max-w-6xl mx-auto w-full px-10 py-16 gap-14 items-center">

        {/* Left — copy */}
        <div className="flex-1 min-w-0">
          <span className="inline-block text-[#0084C5] text-sm font-semibold tracking-widest uppercase mb-6">
            AI Document Extraction
          </span>
          <h1 className="text-[66px] leading-[1.05] font-bold text-[#003854] mb-6">
            Documents in.<br />
            Clean data out.<br />
            Always.
          </h1>
          <p className="text-lg text-[#003854]/65 mb-8 leading-relaxed max-w-md">
            Replace manual document work with reliable AI extraction that turns incoming documents into production-ready data.
          </p>
          <ul className="flex flex-col gap-3 mb-10 text-[#003854] text-[15px]">
            {[
              "Turn PDFs, emails, and scans into data your systems can use",
              "Go live in minutes, no training needed",
              "Built for production, privacy, and scale",
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
                  <rect width="20" height="20" rx="6" fill="#0084C5"/>
                  <path d="M5.5 10.5l3 3 6-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <a href="#" className="btn-hero3-primary bg-[#0084C5] text-white px-6 py-3 rounded-md text-[15px] font-semibold shadow-md">Sign up for free</a>
            <a href="#" className="btn-hero3-secondary text-[#003854] px-6 py-3 rounded-md text-[15px] font-semibold" style={{ border: "1.5px solid rgba(0,56,84,0.2)" }}>Book a demo</a>
          </div>
        </div>

        {/* Right — dark navy panel */}
        <div className="flex-shrink-0 bg-[#003854] rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ width: 400, minHeight: 580 }}>
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle, #0084C5 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-10 p-8 flex items-center justify-center w-full">
            <BoxAnimation />
          </div>
        </div>

      </div>

      <div className="text-center text-xs text-gray-300 pb-3 tracking-widest uppercase">Option 3 — Split · Box Animation</div>
    </section>
  );
}
