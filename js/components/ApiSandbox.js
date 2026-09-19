// Interactive API Integration Sandbox Component
const { useState } = React;

function ApiSandbox() {
  const [method, setMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("/api/v1/student/profile");
  const [requestBody, setRequestBody] = useState('{\n  "query": "dsa-c++",\n  "semester": 3\n}');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({
    status: 200,
    statusText: "OK",
    latency: 38,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-powered-by": "Express / Node / C++ Service",
      "cache-control": "max-age=3600"
    },
    data: {
      student: "Abdullah Pervaiz",
      semester: 3,
      program: "Computer Science & Engineering",
      coreStack: ["Python", "C++", "DSA", "TypeScript", "Angular", "SQL", "APIs"],
      status: "Actively Available for Internships & Projects"
    }
  });

  const sampleEndpoints = [
    {
      name: "Student Profile API",
      method: "GET",
      url: "/api/v1/student/profile",
      body: ""
    },
    {
      name: "DSA Problem-Set Telemetry",
      method: "GET",
      url: "/api/v1/dsa/problem-set",
      body: ""
    },
    {
      name: "C++ In-Memory Cache Query",
      method: "POST",
      url: "/api/v1/cache/lookup",
      body: '{\n  "key": "user:abdullah:session",\n  "evictionPolicy": "LRU"\n}'
    },
    {
      name: "SQL Analytics Aggregator",
      method: "GET",
      url: "/api/v1/sql/query-plan",
      body: ""
    }
  ];

  const handleSelectSample = (sample) => {
    window.soundManager.playClick();
    setMethod(sample.method);
    setEndpoint(sample.url);
    if (sample.body) setRequestBody(sample.body);
  };

  const handleSendRequest = () => {
    window.soundManager.playClick();
    setIsLoading(true);

    const start = performance.now();

    setTimeout(() => {
      const latency = Math.round(performance.now() - start + Math.random() * 25 + 15);
      let resData;

      if (endpoint.includes("profile")) {
        resData = {
          student: "Abdullah Pervaiz",
          semester: 3,
          major: "Computer Science",
          skills: ["Python", "C++", "DSA", "TypeScript", "Angular", "SQL", "APIs"],
          gpaStatus: "Dean's Honor Roll Track",
          availability: "Immediate"
        };
      } else if (endpoint.includes("dsa")) {
        resData = {
          category: "Data Structures & Algorithms",
          totalSolved: 250,
          breakdown: {
            arraysAndStrings: 85,
            linkedListsAndStacks: 60,
            treesAndGraphs: 75,
            dynamicProgramming: 30
          },
          targetComplexity: "O(N) to O(N log N)"
        };
      } else if (endpoint.includes("cache")) {
        resData = {
          cacheHit: true,
          lookupLatencyMs: 0.4,
          storedValue: {
            sessionToken: "c18a-9e7f-442b",
            ttlSeconds: 3600,
            engine: "C++ LRU In-Memory Store"
          }
        };
      } else {
        resData = {
          query: "EXPLAIN ANALYZE SELECT * FROM projects JOIN skills ON id",
          executionPlan: "Index Scan on idx_skills (cost=0.15..8.17 rows=1)",
          planningTimeMs: 0.12,
          executionTimeMs: 0.45,
          status: "Optimal"
        };
      }

      setResponse({
        status: method === "POST" ? 201 : 200,
        statusText: method === "POST" ? "Created" : "OK",
        latency,
        headers: {
          "content-type": "application/json",
          "x-response-time": `${latency}ms`,
          "access-control-allow-origin": "*"
        },
        data: resData
      });

      setIsLoading(false);
      window.soundManager.playSuccess();
    }, 450);
  };

  return (
    <section id="api-sandbox" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-4">
            <i data-lucide="network" className="w-3.5 h-3.5"></i>
            <span>Interactive REST Integration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Live API Integration Lab
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            Hands-on proof of API architecture skills. Select or configure an HTTP endpoint to test 
            payload serialization, response headers, latency metrics, and JSON data pipelines in real time.
          </p>
        </div>

        {/* Sandbox Interface Box */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
          
          {/* Quick Preset Badges */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-white/10">
            <span className="text-xs font-mono text-slate-400 mr-2">Sample Endpoints:</span>
            {sampleEndpoints.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSample(item)}
                className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                  endpoint === item.url 
                    ? 'bg-violet-600/30 border-violet-500/50 text-violet-300 shadow-sm' 
                    : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <span className={`font-bold mr-1.5 ${item.method === 'GET' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {item.method}
                </span>
                {item.name}
              </button>
            ))}
          </div>

          {/* URL & Method Input Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>

            <div className="flex-1 flex items-center bg-slate-950 rounded-xl border border-white/10 px-3.5 py-1 focus-within:border-cyan-500/60 transition-colors">
              <span className="text-xs font-mono text-slate-500 mr-1 select-none">https://api.abdullah.dev</span>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full bg-transparent border-none text-xs font-mono text-slate-200 outline-none p-1.5 focus:ring-0"
              />
            </div>

            <button
              onClick={handleSendRequest}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-violet-500/25 transition-all disabled:opacity-50"
            >
              <i data-lucide={isLoading ? "loader" : "send"} className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`}></i>
              <span>{isLoading ? "Fetching..." : "Send Request"}</span>
            </button>
          </div>

          {/* If POST: Show Request Body Editor */}
          {method === "POST" && (
            <div className="space-y-1.5 animate-fadeIn">
              <label className="text-xs font-mono text-slate-400">Request Body (application/json):</label>
              <textarea
                rows="3"
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 font-mono text-xs text-amber-300 outline-none focus:border-amber-400"
              ></textarea>
            </div>
          )}

          {/* Response Inspector */}
          <div className="bg-slate-950 rounded-xl border border-white/10 overflow-hidden">
            
            {/* Response Meta Header */}
            <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-white/5 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Response Status:</span>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  response.status >= 200 && response.status < 300 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {response.status} {response.statusText}
                </span>
              </div>

              <div className="flex items-center gap-4 text-slate-400">
                <span className="flex items-center gap-1">
                  <i data-lucide="clock" className="w-3.5 h-3.5 text-cyan-400"></i>
                  Latency: <strong className="text-cyan-300">{response.latency}ms</strong>
                </span>
                <span className="flex items-center gap-1">
                  <i data-lucide="shield-check" className="w-3.5 h-3.5 text-emerald-400"></i>
                  CORS: OK
                </span>
              </div>
            </div>

            {/* JSON Response Body */}
            <div className="p-4 overflow-x-auto max-h-72">
              <pre className="text-xs font-mono text-cyan-300 leading-relaxed">
                <code>{JSON.stringify(response.data, null, 2)}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

window.ApiSandbox = ApiSandbox;
