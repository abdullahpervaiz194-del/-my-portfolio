// About Component with 3rd Semester Journey & Core Focus
function About() {
  const pillars = [
    {
      icon: "Binary",
      title: "Algorithmic Precision (DSA)",
      desc: "Deeply engaged in mastering trees, graphs, recursion, sorting algorithms, and complexity analysis (Time & Space O(N)) in C++ and Python.",
      gradient: "from-blue-500/20 to-indigo-500/20",
      border: "border-blue-500/30",
      textColor: "text-blue-300"
    },
    {
      icon: "Layers",
      title: "Full-Stack & Angular Engineering",
      desc: "Building structured web applications utilizing Angular's component architecture, dependency injection, TypeScript generics, and reactive RxJS pipelines.",
      gradient: "from-rose-500/20 to-orange-500/20",
      border: "border-rose-500/30",
      textColor: "text-rose-300"
    },
    {
      icon: "Database",
      title: "Data Modeling & SQL",
      desc: "Designing normalized relational schemas (1NF to 3NF), writing analytical queries with multi-table joins, subqueries, and database indexing.",
      gradient: "from-purple-500/20 to-indigo-500/20",
      border: "border-purple-500/30",
      textColor: "text-purple-300"
    },
    {
      icon: "Network",
      title: "API Architecture & Integration",
      desc: "Integrating RESTful services, error handling, async fetch workflows, token management, and translating raw JSON into dynamic, interactive UI states.",
      gradient: "from-cyan-500/20 to-emerald-500/20",
      border: "border-cyan-500/30",
      textColor: "text-cyan-300"
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-4">
            <i data-lucide="user" className="w-3.5 h-3.5"></i>
            <span>Engineering Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Who I Am & What Drives Me
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg leading-relaxed">
            Currently in my <strong>3rd semester of Computer Science</strong>, where I combine theoretical depth 
            in computation with practical software craftsmanship across languages and frameworks.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Main Narrative Card */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 space-y-5 border border-white/10">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span className="text-indigo-400">#</span> Academic & Engineering Philosophy
            </h3>
            
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Computer science is more than just writing code that runs—it's about understanding how memory is allocated, 
              how data travels across network boundaries, and how algorithms scale from 100 items to 10 million items.
            </p>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              In my 3rd semester, my daily routine centers around two core tracks:
            </p>

            <div className="space-y-3 pl-2 border-l-2 border-indigo-500/40">
              <div>
                <span className="font-semibold text-cyan-300 text-sm">1. Low-Level Rigor & Problem Solving:</span>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Writing high-performance C++ and Python implementations of Data Structures (balanced trees, graphs, heaps) 
                  and analyzing asymptotic time & space trade-offs.
                </p>
              </div>
              <div>
                <span className="font-semibold text-indigo-300 text-sm">2. Modern Web & Application Ecosystem:</span>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Building reactive user interfaces with Angular and React, leveraging TypeScript for bulletproof contracts, 
                  and consuming REST APIs with clean error handling and SQL databases.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-white/5">
                <i data-lucide="graduation-cap" className="w-4 h-4 text-indigo-400"></i>
                CS Undergraduate
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-white/5">
                <i data-lucide="clock" className="w-4 h-4 text-cyan-400"></i>
                Semester 3 Active
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-white/5">
                <i data-lucide="terminal" className="w-4 h-4 text-emerald-400"></i>
                Terminal & Git Native
              </span>
            </div>
          </div>

          {/* Key Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, idx) => (
              <div 
                key={idx}
                className="glass-card rounded-xl p-5 border border-white/10 hover:border-indigo-500/40 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${p.gradient} ${p.border} border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <i data-lucide={p.icon.toLowerCase()} className={`w-5 h-5 ${p.textColor}`}></i>
                  </div>
                  <h4 className="font-semibold text-slate-100 text-sm mb-1.5">{p.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

window.About = About;
