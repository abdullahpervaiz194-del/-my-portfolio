// Footer Component
function Footer() {
  const scrollToTop = () => {
    window.soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-slate-950/80 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center font-mono font-bold text-xs text-cyan-300">
                AP
              </div>
            </div>
            <div>
              <span className="text-sm font-bold text-slate-100">Abdullah Pervaiz</span>
              <p className="text-[11px] text-slate-400 font-mono">
                Computer Science & Engineering • Semester 3
              </p>
            </div>
          </div>

          {/* Quick Anchor Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#visualizer" className="hover:text-white transition-colors">DSA Lab</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#api-sandbox" className="hover:text-white transition-colors">API Lab</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all"
            title="Scroll back to top"
          >
            <span>Top</span>
            <i data-lucide="arrow-up" className="w-3.5 h-3.5"></i>
          </button>

        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>
            © {new Date().getFullYear()} Abdullah Pervaiz. Built with React, Tailwind & Pure Algorithms.
          </span>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>C++</span>
            <span>•</span>
            <span>Python</span>
            <span>•</span>
            <span>DSA</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Angular</span>
            <span>•</span>
            <span>SQL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
