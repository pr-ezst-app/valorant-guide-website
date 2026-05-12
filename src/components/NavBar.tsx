import Icon from "@/components/ui/icon";

interface NavBarProps {
  activeSection: string;
  sections: string[];
  mobileMenuOpen: boolean;
  scrollTo: (id: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function NavBar({ activeSection, sections, mobileMenuOpen, scrollTo, setMobileMenuOpen }: NavBarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 scanline" style={{ background: "rgba(15,17,23,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--val-border)" }}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-sm flex items-center justify-center" style={{ background: "var(--val-red)" }}>
            <span className="font-barlow font-bold text-white text-xs tracking-wider">VG</span>
          </div>
          <span className="font-barlow font-bold text-lg tracking-widest text-white" style={{ letterSpacing: "0.2em" }}>VAL<span style={{ color: "var(--val-red)" }}>GUIDE</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {sections.map(s => (
            <button key={s} onClick={() => scrollTo(s)} className={`nav-link ${activeSection === s ? "active" : ""}`}>{s}</button>
          ))}
        </div>
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 pt-4" style={{ borderTop: "1px solid var(--val-border)" }}>
          {sections.map(s => (
            <button key={s} onClick={() => scrollTo(s)} className={`nav-link text-left ${activeSection === s ? "active" : ""}`}>{s}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
