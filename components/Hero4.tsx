import Logo from "./Logo";
import FlowAnimation from "./animations/FlowAnimation";

// Layout: CENTER-ALIGNED — headline centered, wide 4-stage flow animation below
export default function Hero4() {
  return (
    <section className="min-h-screen bg-white flex flex-col">
      {/* Blue accent bar */}
      <div className="h-1.5 bg-[#0084C5] w-full" />

      <nav className="flex items-center justify-between px-10 py-6 border-b border-gray-100">
        <Logo variant="dark" />
        <div className="flex items-center gap-4">
          <a href="#" className="text-[#003854] text-[15px] font-semibold hover:opacity-70 transition-opacity">Book a demo</a>
          <a href="#" className="bg-[#0084C5] text-white text-[15px] font-semibold px-5 py-2.5 rounded-md hover:bg-[#006fa8] transition-colors">Sign up for free</a>
        </div>
      </nav>

      <div className="flex flex-col items-center flex-1 px-6 py-12 max-w-5xl mx-auto w-full">
        {/* Centered copy */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-px w-8 bg-[#0084C5]" />
          <span className="text-[#0084C5] text-sm font-semibold tracking-widest uppercase">AI Document Extraction</span>
          <div className="h-px w-8 bg-[#0084C5]" />
        </div>
        <h1 className="text-[54px] leading-[1.1] font-bold text-[#003854] mb-6 text-center">
          Documents in. Clean data out.<br />
          <span className="text-[#0084C5]">Always.</span>
        </h1>
        <p className="text-xl text-[#003854]/65 mb-8 leading-relaxed text-center max-w-2xl">
          Replace manual document work with reliable AI extraction that turns incoming documents into production-ready data.
        </p>

        {/* Inline checklist for center layout */}
        <div className="flex items-center gap-6 mb-10 flex-wrap justify-center">
          {[
            "Turn PDFs, emails, and scans into data",
            "Go live in minutes, no training needed",
            "Built for production, privacy, and scale",
          ].map(item => (
            <div key={item} className="flex items-center gap-2 text-[#003854] text-sm">
              <span className="w-4 h-4 bg-[#0084C5] rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0">✓</span>
              {item}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-12">
          <a href="#" className="border-2 border-[#003854] text-[#003854] px-7 py-3.5 rounded-md text-[16px] font-semibold hover:bg-[#003854] hover:text-white transition-colors">Book a demo</a>
          <a href="#" className="bg-[#0084C5] text-white px-7 py-3.5 rounded-md text-[16px] font-semibold hover:bg-[#006fa8] transition-colors shadow-md">Sign up for free</a>
        </div>

        {/* Wide flow animation */}
        <div className="w-full">
          <FlowAnimation />
        </div>
      </div>

      <div className="text-center text-xs text-gray-300 pb-3 tracking-widest uppercase">Option 4 — White + Blue Bar · Center Aligned · Flow Animation</div>
    </section>
  );
}
