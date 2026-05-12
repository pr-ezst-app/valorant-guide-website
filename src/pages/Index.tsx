import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.ezst.app/projects/d2667be7-6fea-4165-aae5-e9d630f347bc/files/9aafaf31-ce04-4c3a-88b3-5bed72f672c0.jpg";

const AGENTS = [
  { name: "Jett", role: "Duelist", color: "#00e5d0", tip: "Use Tailwind to reposition after kills. Never stand still." },
  { name: "Sage", role: "Sentinel", color: "#5fc8f5", tip: "Wall placement wins rounds. Block mid before the spike is planted." },
  { name: "Sova", role: "Initiator", color: "#5b7fcb", tip: "Learn 3 recon bolt lineups per map. Information is everything." },
  { name: "Omen", role: "Controller", color: "#7b5ea7", tip: "Paranoia mid-round forces enemies to reposition. Use it aggressively." },
  { name: "Raze", role: "Duelist", color: "#ff9a3c", tip: "Satchel jumps aren't just mobility — they're fakeouts." },
  { name: "Killjoy", role: "Sentinel", color: "#f5c518", tip: "Place turret to give audio cues, not kills. Let it be bait." },
];

const FAQ_ITEMS = [
  { q: "What rank should I be to benefit from this guide?", a: "This guide covers fundamentals to advanced tactics — relevant from Iron to Platinum. Diamond+ players may find the meta sections most useful." },
  { q: "How often is the guide updated?", a: "We push updates after each major patch. Subscribe to notifications so you never miss key meta shifts." },
  { q: "Can I contribute tips or corrections?", a: "Absolutely — use the Community section to post discussions, and top-upvoted suggestions get reviewed by our editorial team." },
  { q: "Are crosshair placements covered?", a: "Yes — the Aim Guide chapter covers crosshair placement, pre-aiming, and peeking mechanics in detail." },
  { q: "Is there a mobile version?", a: "The site is fully responsive. We're also working on a condensed pocket-guide format optimized for phones." },
];

const GUIDE_CHAPTERS = [
  { icon: "Target", title: "Crosshair Placement", desc: "Head-level discipline, corner pre-aiming, and counter-strafing basics.", tag: "Fundamentals" },
  { icon: "Map", title: "Map Control", desc: "How to gain, trade, and hold map control across all 8 competitive maps.", tag: "Strategy" },
  { icon: "Users", title: "Team Comp", desc: "Composition archetypes, role synergies, and what to first-pick vs. fill.", tag: "Meta" },
  { icon: "Zap", title: "Economy", desc: "Eco rounds, force buys, and when to save vs. buy as a full team.", tag: "Mid-game" },
  { icon: "Eye", title: "Game Reading", desc: "Reading enemy patterns, predicting rotations, and using minimap intel.", tag: "Advanced" },
  { icon: "Shield", title: "Clutch Mechanics", desc: "1v2 and 1v3 decision trees, spike timing, and sound mastery.", tag: "Advanced" },
];

const INITIAL_COMMENTS = [
  { user: "PhoenixMain", time: "2 hours ago", text: "The economy chapter finally convinced me to stop force buying every round. Won 3 extra rounds just from proper saves.", likes: 47, replies: 12 },
  { user: "SilverSova", time: "5 hours ago", text: "Jett tip is 100% accurate. My kill count dropped but my survival rate went up and we actually won more.", likes: 89, replies: 23 },
  { user: "KillJoyIGL", time: "Yesterday", text: "Anyone else think Omen's paranoia usage is underrated at lower ranks? This guide opened my eyes.", likes: 134, replies: 41 },
];

const SECTIONS = ["Home", "Guide", "Community", "FAQ", "About"];

const roleColor: Record<string, string> = {
  Duelist: "#ff4655",
  Sentinel: "#00e5d0",
  Initiator: "#5b7fcb",
  Controller: "#7b5ea7",
};

export default function Index() {
  const [activeSection, setActiveSection] = useState("Home");
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [newUser, setNewUser] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const submitComment = () => {
    if (!newComment.trim()) return;
    setComments([
      { user: newUser.trim() || "Anonymous", time: "Just now", text: newComment.trim(), likes: 0, replies: 0 },
      ...comments,
    ]);
    setNewComment("");
    setNewUser("");
  };

  return (
    <div className="min-h-screen noise-bg" style={{ background: "var(--val-dark)", color: "#e8eaf0" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 scanline" style={{ background: "rgba(15,17,23,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--val-border)" }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-sm flex items-center justify-center" style={{ background: "var(--val-red)" }}>
              <span className="font-barlow font-bold text-white text-xs tracking-wider">VG</span>
            </div>
            <span className="font-barlow font-bold text-lg tracking-widest text-white" style={{ letterSpacing: "0.2em" }}>VAL<span style={{ color: "var(--val-red)" }}>GUIDE</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {SECTIONS.map(s => (
              <button key={s} onClick={() => scrollTo(s)} className={`nav-link ${activeSection === s ? "active" : ""}`}>{s}</button>
            ))}
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4 pt-4" style={{ borderTop: "1px solid var(--val-border)" }}>
            {SECTIONS.map(s => (
              <button key={s} onClick={() => scrollTo(s)} className={`nav-link text-left ${activeSection === s ? "active" : ""}`}>{s}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HOME / HERO */}
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

      {/* GUIDE */}
      <section id="guide" className="py-24 max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-px w-8" style={{ background: "var(--val-red)" }} />
          <span className="tag" style={{ color: "var(--val-cyan)", background: "rgba(0,229,208,0.08)" }}>Strategy Database</span>
        </div>
        <h2 className="font-barlow font-bold mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", letterSpacing: "-0.01em" }}>
          THE <span style={{ color: "var(--val-red)" }}>GUIDE</span>
        </h2>
        <p className="font-rajdhani mb-12" style={{ color: "#8892a4", fontSize: "1.05rem", maxWidth: "480px" }}>
          Six chapters covering everything from raw mechanics to high-level game reading.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {GUIDE_CHAPTERS.map((ch, i) => (
            <div key={ch.title} className="val-card-hover p-6 rounded-sm cursor-pointer" style={{ background: "var(--val-card)", border: "1px solid var(--val-border)" }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ background: "rgba(255,70,85,0.12)" }}>
                  <Icon name={ch.icon as "Target"} size={20} color="var(--val-red)" fallback="Star" />
                </div>
                <span className="tag" style={{ color: "#8892a4", background: "rgba(255,255,255,0.04)" }}>{ch.tag}</span>
              </div>
              <h3 className="font-barlow font-bold text-xl mb-2 text-white tracking-wide">{`0${i + 1} — ${ch.title}`}</h3>
              <p className="font-rajdhani text-sm leading-relaxed" style={{ color: "#8892a4" }}>{ch.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-4 flex items-center gap-4">
          <div className="h-px w-8" style={{ background: "var(--val-cyan)" }} />
          <span className="tag" style={{ color: "var(--val-cyan)", background: "rgba(0,229,208,0.08)" }}>Agent Tier Tips</span>
        </div>
        <h3 className="font-barlow font-bold text-2xl text-white mb-8 tracking-wide">AGENT QUICK TIPS</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AGENTS.map(agent => (
            <div key={agent.name} className="val-card-hover p-5 rounded-sm" style={{ background: "var(--val-card)", border: "1px solid var(--val-border)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center font-barlow font-bold text-sm" style={{ background: `${agent.color}18`, color: agent.color }}>
                  {agent.name[0]}
                </div>
                <div>
                  <div className="font-rajdhani font-bold text-white text-sm">{agent.name}</div>
                  <div className="font-rajdhani text-xs font-bold" style={{ color: roleColor[agent.role] || "#888", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{agent.role}</div>
                </div>
              </div>
              <p className="font-rajdhani text-sm leading-relaxed" style={{ color: "#8892a4" }}>{agent.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, var(--val-red), var(--val-cyan), transparent)" }} />

      {/* COMMUNITY */}
      <section id="community" className="py-24 max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-px w-8" style={{ background: "var(--val-cyan)" }} />
          <span className="tag" style={{ color: "var(--val-cyan)", background: "rgba(0,229,208,0.08)" }}>Player Discussion</span>
        </div>
        <h2 className="font-barlow font-bold mb-10" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", letterSpacing: "-0.01em" }}>
          COMM<span style={{ color: "var(--val-cyan)" }} className="val-glow-cyan">UNITY</span>
        </h2>

        {/* Comment Form */}
        <div className="p-6 rounded-sm mb-8" style={{ background: "var(--val-card)", border: "1px solid var(--val-border)" }}>
          <h3 className="font-rajdhani font-bold text-white mb-4 tracking-wide">DROP YOUR THOUGHTS</h3>
          <input
            type="text"
            placeholder="Your callsign..."
            value={newUser}
            onChange={e => setNewUser(e.target.value)}
            className="w-full mb-3 px-4 py-2.5 rounded-sm font-rajdhani text-sm text-white placeholder-gray-600 outline-none transition-colors"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--val-border)" }}
          />
          <textarea
            placeholder="Share your insight, tip, or question..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            rows={3}
            className="w-full mb-4 px-4 py-3 rounded-sm font-rajdhani text-sm text-white placeholder-gray-600 outline-none transition-colors resize-none"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--val-border)" }}
          />
          <button
            onClick={submitComment}
            className="font-rajdhani font-bold tracking-widest text-sm text-white px-6 py-2.5 rounded-sm"
            style={{ background: "var(--val-red)", letterSpacing: "0.12em" }}
          >
            POST COMMENT
          </button>
        </div>

        {/* Comments */}
        <div className="flex flex-col gap-4">
          {comments.map((post, i) => (
            <div key={i} className="val-card-hover p-5 rounded-sm" style={{ background: "var(--val-card)", border: "1px solid var(--val-border)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center font-barlow font-bold text-sm" style={{ background: "rgba(255,70,85,0.15)", color: "var(--val-red)" }}>
                    {post.user[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-rajdhani font-bold text-white text-sm">{post.user}</div>
                    <div className="font-rajdhani text-xs" style={{ color: "#4a5568" }}>{post.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 font-rajdhani text-xs transition-colors hover:text-red-400" style={{ color: "#4a5568" }}>
                    <Icon name="Heart" size={13} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 font-rajdhani text-xs transition-colors hover:text-cyan-400" style={{ color: "#4a5568" }}>
                    <Icon name="MessageSquare" size={13} />
                    {post.replies}
                  </button>
                </div>
              </div>
              <p className="font-rajdhani text-sm leading-relaxed" style={{ color: "#8892a4" }}>{post.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24" style={{ background: "rgba(255,70,85,0.02)", borderTop: "1px solid var(--val-border)", borderBottom: "1px solid var(--val-border)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-8" style={{ background: "var(--val-red)" }} />
            <span className="tag" style={{ color: "var(--val-red)", background: "rgba(255,70,85,0.08)" }}>Common Questions</span>
          </div>
          <h2 className="font-barlow font-bold mb-12" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", letterSpacing: "-0.01em" }}>
            F<span style={{ color: "var(--val-red)" }}>A</span>Q
          </h2>
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="rounded-sm overflow-hidden" style={{ border: "1px solid", borderColor: openFaq === i ? "var(--val-red)" : "var(--val-border)", background: "var(--val-card)", transition: "border-color 0.2s" }}>
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-rajdhani font-semibold text-white" style={{ fontSize: "1rem" }}>{item.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16} color={openFaq === i ? "var(--val-red)" : "#4a5568"} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 animate-fade-in">
                    <div className="h-px mb-4" style={{ background: "var(--val-border)" }} />
                    <p className="font-rajdhani text-sm leading-relaxed" style={{ color: "#8892a4" }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px w-8" style={{ background: "var(--val-cyan)" }} />
              <span className="tag" style={{ color: "var(--val-cyan)", background: "rgba(0,229,208,0.08)" }}>Our Mission</span>
            </div>
            <h2 className="font-barlow font-bold mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", letterSpacing: "-0.01em" }}>
              ABOUT <span style={{ color: "var(--val-cyan)" }} className="val-glow-cyan">US</span>
            </h2>
            <p className="font-rajdhani mb-4 leading-relaxed" style={{ color: "#8892a4", fontSize: "1.05rem" }}>
              ValGuide was created by Diamond+ players tired of scattered Reddit threads and outdated YouTube videos. We wanted one authoritative, always-updated source for competitive Valorant knowledge.
            </p>
            <p className="font-rajdhani mb-8 leading-relaxed" style={{ color: "#8892a4", fontSize: "1.05rem" }}>
              Every tip is playtested. Every strategy is validated. Our editorial team reviews submissions weekly and updates chapters with each patch cycle.
            </p>
            <div className="flex flex-wrap gap-3">
              {[{ icon: "Shield", label: "Diamond+ Authors" }, { icon: "RefreshCw", label: "Patch-Synced" }, { icon: "Users", label: "Community Driven" }].map(item => (
                <div key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-sm font-rajdhani text-sm font-semibold" style={{ border: "1px solid var(--val-border)", color: "#8892a4" }}>
                  <Icon name={item.icon as "Shield"} size={14} color="var(--val-cyan)" fallback="Star" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="p-8 rounded-sm" style={{ background: "var(--val-card)", border: "1px solid var(--val-border)" }}>
              <div className="font-barlow font-bold text-5xl mb-1" style={{ color: "var(--val-red)" }}>Val<span style={{ color: "var(--val-cyan)" }}>Guide</span></div>
              <div className="font-rajdhani text-xs tracking-widest mb-6" style={{ color: "#4a5568", letterSpacing: "0.2em", textTransform: "uppercase" }}>Tactical Intelligence Hub</div>
              <div className="space-y-4">
                {[["Content Updates", "Weekly"], ["Chapters", "6 Core + Extras"], ["Agents Covered", "All 25+"], ["Maps", "All Competitive"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center py-3" style={{ borderBottom: "1px solid var(--val-border)" }}>
                    <span className="font-rajdhani text-sm" style={{ color: "#8892a4" }}>{k}</span>
                    <span className="font-rajdhani font-bold text-sm" style={{ color: "var(--val-cyan)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-sm" style={{ background: "var(--val-red)" }} />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-sm" style={{ background: "var(--val-cyan)" }} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8" style={{ borderTop: "1px solid var(--val-border)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-barlow font-bold tracking-widest" style={{ letterSpacing: "0.2em" }}>VAL<span style={{ color: "var(--val-red)" }}>GUIDE</span></span>
          <span className="font-rajdhani text-xs" style={{ color: "#4a5568" }}>Not affiliated with Riot Games. Valorant™ is a trademark of Riot Games.</span>
          <div className="flex gap-6">
            {SECTIONS.map(s => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="font-rajdhani text-xs tracking-wider uppercase transition-colors"
                style={{ color: "#4a5568" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "#fff"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "#4a5568"}
              >{s}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
