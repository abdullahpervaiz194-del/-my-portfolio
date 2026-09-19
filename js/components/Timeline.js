// Academic & Engineering Milestones Timeline Component
function Timeline() {
  const items = window.PORTFOLIO_DATA.timeline;

  return (
    <section id="timeline" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <i data-lucide="milestone" className="w-3.5 h-3.5"></i>
            <span>Academic Progression</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Curriculum & Engineering Milestones
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            A transparent timeline of my university computer science journey, detailing completed domains, 
            current 3rd semester mastery, and upcoming specializations.
          </p>
        </div>

        {/* Timeline Line & Nodes */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central bar */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-indigo-500 via-cyan-500 to-slate-800"></div>

          <div className="space-y-12">
            {items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isCurrent = item.badge === "In Progress";

              return (
                <div 
                  key={idx} 
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Node Icon in Center */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 z-20 shadow-lg shadow-cyan-500/30">
                    {isCurrent ? (
                      <span className="w-3 h-3 rounded-full bg-cyan-400 status-dot-pulse"></span>
                    ) : (
                      <i data-lucide="check" className="w-4 h-4 text-emerald-400"></i>
                    )}
                  </div>

                  {/* Content Card */}
                  <div className={`ml-12 sm:ml-0 sm:w-1/2 ${
                    isEven ? 'sm:pl-10' : 'sm:pr-10'
                  }`}>
                    <div className={`glass-panel rounded-2xl p-6 border transition-all ${
                      isCurrent 
                        ? 'border-cyan-500/50 shadow-cyan-500/10' 
                        : 'border-white/10 hover:border-white/20'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-lg text-white">
                          {item.semester}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                          isCurrent 
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                            : 'bg-slate-800 text-slate-400 border border-white/5'
                        }`}>
                          {item.badge}
                        </span>
                      </div>

                      <div className="text-xs font-medium text-indigo-400 font-mono mb-3">
                        {item.period}
                      </div>

                      <ul className="space-y-2">
                        {item.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                            <span className="text-cyan-400 font-bold mt-0.5">›</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

window.Timeline = Timeline;
