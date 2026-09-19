// Hero Component with Dynamic Typing & Interactive Action Dock
const { useState, useEffect } = React;

function Hero({ onOpenTerminal }) {
  const titles = [
    "3rd-Semester CS Undergrad",
    "DSA & Algorithms Enthusiast (C++ / Python)",
    "Full-Stack Web Developer (Angular & TS)",
    "API & Database Systems Explorer (SQL / REST)"
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  useEffect(() => {
    const currentFullTitle = titles[currentTitleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentFullTitle.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentFullTitle.length) {
          setIsDeleting(true);
          setTypingSpeed(1800); // pause at full text
        } else {
          setTypingSpeed(60);
        }
      } else {
        setDisplayedText(currentFullTitle.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          setTypingSpeed(300); // pause before next title
        } else {
          setTypingSpeed(35);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIndex, typingSpeed]);

  return (
    <section className="relative min-h-[92vh] pt-32 pb-16 flex items-center justify-center overflow-hidden">
      {/* Ambient Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/20 to-cyan-500/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 shadow-inner backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 status-dot-pulse"></span>
              <span className="text-xs font-mono text-slate-300">
                Semester 3 CS • Open to Internships & Projects
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300">Muhammad Shahzad</span>
              </h1>
              
              {/* Dynamic Subtitle with Terminal Cursor */}
              <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
                <span className="text-lg sm:text-2xl font-mono text-cyan-400 font-semibold">
                  &gt; {displayedText}
                </span>
                <span className="cli-cursor ml-1"></span>
              </div>
            </div>

            {/* Core Narrative / Bio */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Transforming fundamental computer science concepts into elegant, robust applications. 
              Bridging the gap between <strong className="text-indigo-300 font-semibold">C++ and Python DSA</strong> logic 
              and modern web engineering with <strong className="text-cyan-300 font-semibold">TypeScript, Angular, SQL</strong>, and 
              resilient <strong className="text-violet-300 font-semibold">API integrations</strong>.
            </p>

            {/* Technical Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {[
                { name: "C++", color: "from-blue-500/20 to-blue-600/20 text-blue-300 border-blue-500/30" },
                { name: "Python", color: "from-amber-500/20 to-amber-600/20 text-amber-300 border-amber-500/30" },
                { name: "DSA & Algorithms", color: "from-emerald-500/20 to-emerald-600/20 text-emerald-300 border-emerald-500/30" },
                { name: "TypeScript", color: "from-sky-500/20 to-sky-600/20 text-sky-300 border-sky-500/30" },
                { name: "Angular Framework", color: "from-rose-500/20 to-rose-600/20 text-rose-300 border-rose-500/30" },
                { name: "SQL Databases", color: "from-purple-500/20 to-purple-600/20 text-purple-300 border-purple-500/30" },
                { name: "API Integration", color: "from-cyan-500/20 to-cyan-600/20 text-cyan-300 border-cyan-500/30" },
              ].map((tech) => (
                <span
                  key={tech.name}
                  className={`px-3 py-1 rounded-md text-xs font-mono bg-gradient-to-r ${tech.color} border backdrop-blur-sm`}
                >
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Action Buttons Dock */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#projects"
                onClick={() => window.soundManager.playClick()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <i data-lucide="sparkles" className="w-4 h-4"></i>
                <span>Explore Featured Projects</span>
              </a>

              <a
                href="#visualizer"
                onClick={() => window.soundManager.playClick()}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 font-medium text-sm transition-all duration-200"
              >
                <i data-lucide="play-circle" className="w-4 h-4"></i>
                <span>Live DSA Visualizer</span>
              </a>

              <button
                onClick={() => {
                  window.soundManager.playClick();
                  onOpenTerminal();
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-white/10 hover:border-indigo-400 font-mono text-sm transition-all duration-200"
              >
                <i data-lucide="terminal" className="w-4 h-4 text-indigo-400"></i>
                <span>Terminal (CLI)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Code Terminal Card Preview */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-2xl p-5 border border-white/10 shadow-2xl relative group hover:border-indigo-500/40 transition-all duration-300">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="font-mono text-slate-400 ml-2">shahzad_profile.cpp</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-indigo-400 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
                  C++20 / STL
                </div>
              </div>

              {/* Code Snippet Body */}
              <pre className="mt-4 text-xs font-mono leading-relaxed overflow-x-auto text-slate-300">
                <code>
                  <span className="text-slate-500">// 3rd Semester Undergrad Profile</span>{'\n'}
                  <span className="text-purple-400">struct</span> <span className="text-yellow-300">Engineer</span> {'{'}{'\n'}
                  {'  '}<span className="text-cyan-400">string</span> name = <span className="text-emerald-400">"Muhammad Shahzad"</span>;{'\n'}
                  {'  '}<span className="text-purple-400">int</span> semester = <span className="text-amber-300">3</span>;{'\n'}
                  {'  '}<span className="text-cyan-400">vector</span>&lt;<span className="text-cyan-400">string</span>&gt; coreStack = {'{'}{'\n'}
                  {'    '}<span className="text-emerald-400">"C++"</span>, <span className="text-emerald-400">"Python"</span>, <span className="text-emerald-400">"DSA"</span>,{'\n'}
                  {'    '}<span className="text-emerald-400">"TypeScript"</span>, <span className="text-emerald-400">"Angular"</span>, <span className="text-emerald-400">"SQL"</span>{'\n'}
                  {'  '}{'}'};{'\n'}
                  {'\n'}
                  {'  '}<span className="text-purple-400">void</span> <span className="text-blue-400">buildFuture</span>() {'{'}{'\n'}
                  {'    '}<span className="text-purple-400">while</span> (<span className="text-amber-300">true</span>) {'{'}{'\n'}
                  {'      '}solveProblems();{'\n'}
                  {'      '}integrateAPIs();{'\n'}
                  {'      '}optimizeAlgorithms();{'\n'}
                  {'    '}{'}'}{'\n'}
                  {'  '}{'}'}{'\n'}
                  {'}'};
                </code>
              </pre>

              {/* Quick interactive trigger inside card */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  Compiled with <span className="text-emerald-400">0 errors</span>
                </span>
                <button
                  onClick={() => {
                    window.soundManager.playSuccess();
                    onOpenTerminal();
                  }}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/btn"
                >
                  <span>Execute in CLI</span>
                  <i data-lucide="arrow-right" className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform"></i>
                </button>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {window.PORTFOLIO_DATA.personal.stats.map((stat, index) => (
                <div key={index} className="glass-card rounded-xl p-3 text-center">
                  <div className="text-xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
