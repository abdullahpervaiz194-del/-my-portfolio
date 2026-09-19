// Navbar Component with Glassmorphism and Controls
const { useState, useEffect } = React;

function Navbar({ soundEnabled, onToggleSound, onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'DSA Visualizer', href: '#visualizer' },
    { name: 'Projects', href: '#projects' },
    { name: 'API Lab', href: '#api-sandbox' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    window.soundManager.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3 glass-panel border-b border-white/10' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={() => window.soundManager.playClick()}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 text-lg">AP</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 text-base tracking-tight group-hover:text-cyan-300 transition-colors">
              Abdullah Pervaiz
            </span>
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-dot-pulse"></span>
              3rd Sem CS Undergrad
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Action Icons & Toggles */}
        <div className="hidden sm:flex items-center gap-2">
          {/* CLI Terminal Shortcut */}
          <button
            onClick={() => {
              window.soundManager.playClick();
              onOpenTerminal();
            }}
            title="Open Interactive Terminal (CLI)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-600/30 text-xs font-mono text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-sm"
          >
            <i data-lucide="terminal" className="w-3.5 h-3.5"></i>
            <span>CLI</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            title={soundEnabled ? "Mute UI Sound Effects" : "Enable UI Sound Effects (Audio Synthesis)"}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled 
                ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' 
                : 'bg-slate-800/60 border-white/5 text-slate-400 hover:text-slate-200'
            }`}
          >
            <i data-lucide={soundEnabled ? "volume-2" : "volume-x"} className="w-4 h-4"></i>
          </button>

          {/* Resume / Connect CTA */}
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:opacity-95 transition-all"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => {
              window.soundManager.playClick();
              onOpenTerminal();
            }}
            className="p-2 rounded-lg bg-slate-800 text-cyan-400 border border-cyan-500/30"
          >
            <i data-lucide="terminal" className="w-4 h-4"></i>
          </button>
          <button
            onClick={() => {
              window.soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-slate-800 text-slate-200"
          >
            <i data-lucide={mobileMenuOpen ? "x" : "menu"} className="w-5 h-5"></i>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 mt-2 glass-panel border-b border-white/10 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400">Audio Feedback</span>
            <button
              onClick={onToggleSound}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 ${
                soundEnabled ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400'
              }`}
            >
              <i data-lucide={soundEnabled ? "volume-2" : "volume-x"} className="w-4 h-4"></i>
              <span>{soundEnabled ? "Active" : "Muted"}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

window.Navbar = Navbar;
