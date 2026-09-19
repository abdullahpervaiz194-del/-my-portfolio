// Skills Component with Interactive Code Peek Modal
const { useState } = React;

function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [copied, setCopied] = useState(false);
  const categories = window.PORTFOLIO_DATA.skills;

  const handleOpenCodePeek = (skill) => {
    window.soundManager.playClick();
    setSelectedSkill(skill);
    setCopied(false);
  };

  const handleCopyCode = () => {
    if (!selectedSkill) return;
    navigator.clipboard.writeText(selectedSkill.snippet);
    window.soundManager.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <i data-lucide="cpu" className="w-3.5 h-3.5"></i>
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Languages, Frameworks & Core Mastery
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            Click any skill card below to open <span className="text-cyan-300 font-semibold">"Code Peek"</span> and view authentic code implementations demonstrating real mastery.
          </p>
        </div>

        {/* Skill Categories Grid */}
        <div className="space-y-12">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-white/10 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    {cat.category}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>
                </div>
                <span className="text-xs font-mono text-cyan-400/80 bg-cyan-500/10 px-3 py-1 rounded-full w-fit">
                  {cat.items.length} Core Competencies
                </span>
              </div>

              {/* Skills Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.items.map((skill, skillIdx) => (
                  <div
                    key={skillIdx}
                    onClick={() => handleOpenCodePeek(skill)}
                    className="glass-card glass-card-interactive rounded-2xl p-5 border border-white/10 hover:border-cyan-500/50 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-500/50 transition-all">
                            <i data-lucide="code-2" className="w-4 h-4 text-cyan-400"></i>
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                              {skill.name}
                            </h4>
                            <span className="text-[11px] font-mono text-indigo-400">
                              {skill.badge}
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-white/5">
                          {skill.level}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mt-2">
                        {skill.experience}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-cyan-400 font-mono group-hover:text-cyan-300">
                      <span className="flex items-center gap-1.5">
                        <i data-lucide="eye" className="w-3.5 h-3.5"></i>
                        Peek Code Snippet
                      </span>
                      <i data-lucide="arrow-up-right" className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Code Peek Modal */}
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="glass-panel rounded-2xl max-w-3xl w-full border border-cyan-500/30 shadow-2xl overflow-hidden animate-scaleUp">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/90">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="font-mono text-sm text-slate-200 font-semibold ml-2">
                    {selectedSkill.name} — Implementation Code
                  </span>
                </div>
                <button
                  onClick={() => {
                    window.soundManager.playClick();
                    setSelectedSkill(null);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <i data-lucide="x" className="w-5 h-5"></i>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Topic: <strong className="text-cyan-300">{selectedSkill.badge}</strong>
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-white/10 transition-all"
                  >
                    <i data-lucide={copied ? "check" : "copy"} className="w-3.5 h-3.5 text-cyan-400"></i>
                    <span>{copied ? "Copied!" : "Copy Code"}</span>
                  </button>
                </div>

                <div className="bg-slate-950 rounded-xl p-4 border border-white/10 overflow-x-auto">
                  <pre className="text-xs font-mono text-emerald-300 leading-relaxed">
                    <code>{selectedSkill.snippet}</code>
                  </pre>
                </div>

                <p className="text-xs text-slate-400 italic">
                  *Demonstrates practical implementation concepts learned and applied during Semester 3 coursework and personal builds.
                </p>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-white/10 bg-slate-900/60 flex justify-end">
                <button
                  onClick={() => {
                    window.soundManager.playClick();
                    setSelectedSkill(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all"
                >
                  Close Peek
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

window.Skills = Skills;
