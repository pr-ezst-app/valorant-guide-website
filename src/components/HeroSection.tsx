import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.ezst.app/projects/d2667be7-6fea-4165-aae5-e9d630f347bc/files/9aafaf31-ce04-4c3a-88b3-5bed72f672c0.jpg";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-14">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Valorant" className="w-full h-full object-cover" style={{ opacity: 0.25 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,17,23,0.95) 0%, rgba(15,17,23,0.5) 60%, rgba(15,17,23,0.9) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(255,70,85,0.08) 0%, transparent 60%)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6 animate-fade-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <div className="h-px w-12" style={{ background: "var(--val-red)" }} />
            <span className="tag" style={{ color: "var(--val-red)" }}>Season 2025 — Patch 10.x</span>
          </div>
          <h1 className="font-barlow font-bold mb-6 animate-fade-up delay-100" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 0.9, letterSpacing: "-0.01em", opacity: 0, animationFillMode: "forwards" }}>
            MASTER<br />
            <span style={{ color: "var(--val-red)" }} className="val-glow-red">VALORANT</span><br />
            <span style={{ color: "#8892a4", fontSize: "0.6em" }}>ONE ROUND AT A TIME</span>
          </h1>
          <p className="mb-10 animate-fade-up delay-200 font-rajdhani" style={{ fontSize: "1.1rem", color: "#8892a4", lineHeight: 1.7, maxWidth: "520px", opacity: 0, animationFillMode: "forwards" }}>
            Tactical breakdowns, agent synergies, map control guides, and economy management — built for players who want to actually rank up.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up delay-300" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <button
              onClick={() => scrollTo("Guide")}
              className="font-rajdhani font-bold tracking-widest text-sm text-white px-8 py-3 clip-diagonal animate-pulse-glow"
              style={{ background: "var(--val-red)", letterSpacing: "0.15em" }}
            >
              START LEARNING
            </button>
            <button
              onClick={() => scrollTo("Community")}
              className="font-rajdhani font-bold tracking-widest text-sm px-8 py-3 rounded-sm"
              style={{ border: "1px solid var(--val-border)", color: "#8892a4", letterSpacing: "0.15em", transition: "all 0.2s" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = "var(--val-red)"; (e.target as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = "var(--val-border)"; (e.target as HTMLElement).style.color = "#8892a4"; }}
            >
              COMMUNITY
            </button>
          </div>

          <div className="flex gap-8 mt-16 animate-fade-up delay-400" style={{ opacity: 0, animationFillMode: "forwards" }}>
            {[["6", "Guide Chapters"], ["200+", "Tips & Strategies"], ["Active", "Community"]].map(([val, label]) => (
              <div key={label}>
                <div className="font-barlow font-bold text-3xl" style={{ color: "var(--val-red)" }}>{val}</div>
                <div className="font-rajdhani text-xs uppercase tracking-wider" style={{ color: "#8892a4" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-500" style={{ opacity: 0, animationFillMode: "forwards" }}>
        <span className="font-rajdhani text-xs tracking-widest" style={{ color: "#4a5568" }}>SCROLL</span>
        <Icon name="ChevronDown" size={16} color="#4a5568" />
      </div>
    </section>
  );
}
