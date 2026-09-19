// Filterable Projects Component with Interactive Architecture Modal
const { useState } = React;

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ["All", "DSA & Algorithms", "Fullstack & Angular", "C++ & Systems", "Python & APIs"];
  const allProjects = window.PORTFOLIO_DATA.projects;

  const filteredProjects = selectedCategory === "All"
    ? allProjects
    : allProjects.filter(p => p.category === selectedCategory);

  const handleFilterChange = (cat) => {
    window.soundManager.playClick();
    setSelectedCategory(cat);
  };

  const handleOpenModal = (project) => {
    window.soundManager.playClick();
    setActiveModalProject(project);
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-4">
            <i data-lucide="folder-git-2" className="w-3.5 h-3.5"></i>
            <span>Featured Portfolio Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Applied Engineering & Projects
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            Real implementations bridging low-level computational efficiency in C++ and Python 
            with modern reactive applications in Angular, TypeScript, and SQL.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 scale-105'
                  : 'glass-panel text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Card Header: Badge & Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    {proj.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {proj.category}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {proj.title}
                </h3>
                <p className="text-xs font-medium text-indigo-400 mt-1 mb-3">
                  {proj.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {proj.description}
                </p>

                {/* Highlights List */}
                <ul className="space-y-1.5 mb-5 border-t border-white/5 pt-3">
                  {proj.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="text-[11px] text-slate-400 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <button
                    onClick={() => handleOpenModal(proj)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <i data-lucide="info" className="w-3.5 h-3.5"></i>
                    <span>Architecture Details</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {proj.demo.startsWith("#") ? (
                      <a
                        href={proj.demo}
                        onClick={() => window.soundManager.playClick()}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-xs font-mono border border-indigo-500/30 flex items-center gap-1 transition-all"
                      >
                        <i data-lucide="play" className="w-3 h-3"></i>
                        <span>Live Lab</span>
                      </a>
                    ) : (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      >
                        <i data-lucide="external-link" className="w-4 h-4"></i>
                      </a>
                    )}

                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      title="View GitHub Repository"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    >
                      <i data-lucide="github" className="w-4 h-4"></i>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Project Architecture Deep-Dive Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="glass-panel rounded-2xl max-w-2xl w-full border border-indigo-500/30 shadow-2xl overflow-hidden animate-scaleUp">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  <h4 className="font-bold text-slate-100 text-base">
                    {activeModalProject.title}
                  </h4>
                </div>
                <button
                  onClick={() => {
                    window.soundManager.playClick();
                    setActiveModalProject(null);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <i data-lucide="x" className="w-5 h-5"></i>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">
                    Core Technical Concept:
                  </span>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {activeModalProject.description}
                  </p>
                </div>

                {/* Architecture Diagram Representation */}
                <div className="bg-slate-950 p-4 rounded-xl border border-white/10 space-y-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    System Architecture & Data Flow:
                  </span>
                  <div className="p-3 bg-slate-900/70 rounded-lg border border-white/5 font-mono text-[11px] text-emerald-300 leading-relaxed overflow-x-auto">
                    [Client Request / UI] ──&gt; [Controller / Routing] ──&gt; [Data Structures &amp; Engine] ──&gt; [Normalized SQL / Cache Store]
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-indigo-400 font-semibold">
                    Key Implementation Challenges Solved:
                  </span>
                  <ul className="mt-2 space-y-1.5">
                    {activeModalProject.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <i data-lucide="check-circle-2" className="w-3.5 h-3.5 text-emerald-400 mt-0.5"></i>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-mono text-slate-400">Technologies Employed:</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {activeModalProject.techStack.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 text-xs font-mono border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 bg-slate-900/60 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => {
                    window.soundManager.playClick();
                    setActiveModalProject(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Close Specification
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

window.Projects = Projects;
