import Logo from "./Logo";
import PipelineAnimation from "./animations/PipelineAnimation";
import PixelDots from "./animations/PixelDots";

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
    <rect width="20" height="20" rx="6" fill="#0084C5" />
    <path d="M5.5 10.5l3 3 6-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
      <div className="relative flex flex-1 items-center max-w-6xl mx-auto w-full px-10 py-16 gap-20">
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
            {[
              "Turn PDFs, emails, and scans into data your systems can use",
              "Go live in minutes, no training needed",
              "Built for production, privacy, and scale",
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>

          {/* Buttons — Sign up first, Book a demo second */}
          <div className="flex items-center gap-4">
            <a href="#" className="btn-hero1-primary bg-[#0084C5] text-white px-7 py-3.5 rounded-md text-[16px] font-semibold hover:bg-[#006fa8]">
              Sign up for free
            </a>
            <a href="#" className="btn-hero1-secondary border-2 border-[#003854]/30 text-[#003854] px-7 py-3.5 rounded-md text-[16px] font-semibold hover:border-[#003854] hover:bg-[#003854]/5">
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
