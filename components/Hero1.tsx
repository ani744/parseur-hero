import Logo from "./Logo";
import PipelineAnimation from "./animations/PipelineAnimation";
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

export default function Hero1() {
  return (
    <section className="relative min-h-screen bg-white flex flex-col overflow-hidden">

      {/* Animated light-blue pixel background */}
      <PixelDots count={80} />

      {/* Nav */}
      <nav className="relative border-b border-gray-100">
        <div className="flex items-center justify-between max-w-6xl mx-auto w-full px-10 py-6">
        <Logo variant="dark" />
        <div className="flex items-center gap-4">
          {/* Sign up first, Book a demo second */}
          <a href="#" className="bg-[#0084C5] text-white text-[15px] font-semibold px-5 py-2.5 rounded-md hover:bg-[#006fa8] transition-colors shadow-sm">
            Sign up for free
          </a>
          <a href="#" className="text-[#003854] text-[15px] font-semibold hover:opacity-60 transition-opacity">
            Book a demo
          </a>
        </div>
        </div>
      </nav>

      {/* Hero body */}
      <div className="relative flex flex-1 items-center max-w-6xl mx-auto w-full px-10 py-[60px] gap-20">
        {/* Left — copy */}
        <div className="flex-1 min-w-0">
          <span className="inline-block text-[#0084C5] text-sm font-semibold tracking-widest uppercase mb-6">
            AI Document Extraction
          </span>
          <h1 className="text-[72px] leading-[1.05] font-bold text-[#003854] mb-6">
            Documents in.<br />
            Clean data out.<br />
            <span style={{ color: "#0084C5", animation: "alwaysPulse 3s ease-in-out infinite" }}>Always.</span>
          </h1>
          <p className="text-xl text-[#003854]/65 mb-8 leading-relaxed max-w-lg">
            Replace manual document work with reliable AI extraction that turns incoming documents into production-ready data.
          </p>

          {/* Checklist with new square-check icons */}
          <ul className="flex flex-col gap-3.5 mb-10 text-[#003854] text-[15px]">
            {items.map(({ icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                {icon}
                {text}
              </li>
            ))}
          </ul>

          {/* Buttons — Sign up first, Book a demo second */}
          <div className="flex items-center gap-4">
            <a href="#" className="btn-hero1-primary bg-[#0084C5] text-white px-7 py-3.5 rounded-md text-[16px] font-semibold hover:bg-[#006fa8]">
              Sign up for free
            </a>
            <a href="#" className="btn-hero1-secondary border border-[#003854]/30 text-[#003854] px-7 py-3.5 rounded-md text-[16px] font-semibold hover:border-[#003854] hover:bg-[#003854]/5">
              Book a demo
            </a>
          </div>
        </div>

        {/* Right — vertical pipeline */}
        <div className="flex-shrink-0">
          <PipelineAnimation />
        </div>
      </div>

      <div className="relative text-center text-xs text-gray-300 pb-3 tracking-widest uppercase">
        Option 1 — Pure White · Pipeline Animation
      </div>
    </section>
  );
}
