import VersionBanner from "@/components/VersionBanner";
import Hero1 from "@/components/Hero1";
import Hero2 from "@/components/Hero2";
import Hero3 from "@/components/Hero3";
import Hero4 from "@/components/Hero4";
import Hero5 from "@/components/Hero5";

export default function Home() {
  return (
    <>
      <VersionBanner />
      {/* Spacer so the fixed banner doesn't overlap the first hero */}
      <div style={{ height: 46 }} />
      <main>
        <div id="hero-1" style={{ scrollMarginTop: 46 }}><Hero1 /></div>
        <div id="hero-2" style={{ scrollMarginTop: 46 }}><Hero2 /></div>
        <div id="hero-3" style={{ scrollMarginTop: 46 }}><Hero3 /></div>
        <div id="hero-4" style={{ scrollMarginTop: 46 }}><Hero4 /></div>
        <div id="hero-5" style={{ scrollMarginTop: 46 }}><Hero5 /></div>
      </main>
    </>
  );
}
