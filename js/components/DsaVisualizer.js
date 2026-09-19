// Interactive Data Structures & Algorithms Visualizer
const { useState, useEffect, useRef } = React;

function DsaVisualizer() {
  const [array, setArray] = useState([45, 20, 75, 12, 60, 32, 88, 15, 52, 28, 95, 40]);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [comparing, setComparing] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(120); // ms per step
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, status: "Ready" });

  const generatorRef = useRef(null);
  const timerRef = useRef(null);

  // Complexity metadata
  const complexities = {
    bubble: {
      name: "Bubble Sort",
      best: "O(N)",
      avg: "O(N²)",
      worst: "O(N²)",
      space: "O(1)",
      desc: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
    },
    selection: {
      name: "Selection Sort",
      best: "O(N²)",
      avg: "O(N²)",
      worst: "O(N²)",
      space: "O(1)",
      desc: "Finds the minimum element from the unsorted part and puts it at the beginning. Minimizes swap operations."
    },
    insertion: {
      name: "Insertion Sort",
      best: "O(N)",
      avg: "O(N²)",
      worst: "O(N²)",
      space: "O(1)",
      desc: "Builds the sorted array one item at a time by repeatedly taking the next element and inserting it into its correct position."
    }
  };

  // Generate random array
  const generateNewArray = (size = 14) => {
    stopSorting();
    const newArr = [];
    for (let i = 0; i < size; i++) {
      newArr.push(Math.floor(Math.random() * 85) + 12);
    }
    setArray(newArr);
    setComparing([]);
    setSortedIndices([]);
    setSwapping([]);
    setStats({ comparisons: 0, swaps: 0, status: "Generated new random array" });
    window.soundManager.playClick();
  };

  // Stop / pause
  const stopSorting = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Reset state
  const resetArray = () => {
    generateNewArray(14);
  };

  // Generator for Bubble Sort
  function* bubbleSortGen(arr) {
    const a = [...arr];
    const n = a.length;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        yield { 
          array: [...a], 
          comparing: [j, j + 1], 
          swapping: [], 
          sorted: a.map((_, idx) => idx >= n - i ? idx : null).filter(x => x !== null),
          stats: { comparisons, swaps, status: `Comparing index ${j} (${a[j]}) and ${j + 1} (${a[j + 1]})` }
        };

        if (a[j] > a[j + 1]) {
          swaps++;
          const temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
          swapped = true;

          yield { 
            array: [...a], 
            comparing: [], 
            swapping: [j, j + 1], 
            sorted: a.map((_, idx) => idx >= n - i ? idx : null).filter(x => x !== null),
            stats: { comparisons, swaps, status: `Swapped ${a[j]} and ${a[j + 1]}` }
          };
        }
      }
      if (!swapped) break;
    }

    yield {
      array: [...a],
      comparing: [],
      swapping: [],
      sorted: a.map((_, idx) => idx),
      stats: { comparisons, swaps, status: "Complete! Array is fully sorted." }
    };
  }

  // Generator for Selection Sort
  function* selectionSortGen(arr) {
    const a = [...arr];
    const n = a.length;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        yield {
          array: [...a],
          comparing: [minIdx, j],
          swapping: [],
          sorted: a.map((_, idx) => idx < i ? idx : null).filter(x => x !== null),
          stats: { comparisons, swaps, status: `Checking if element at ${j} (${a[j]}) < min at ${minIdx} (${a[minIdx]})` }
        };

        if (a[j] < a[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        swaps++;
        const temp = a[i];
        a[i] = a[minIdx];
        a[minIdx] = temp;

        yield {
          array: [...a],
          comparing: [],
          swapping: [i, minIdx],
          sorted: a.map((_, idx) => idx <= i ? idx : null).filter(x => x !== null),
          stats: { comparisons, swaps, status: `Swapped minimum element ${a[i]} into position ${i}` }
        };
      }
    }

    yield {
      array: [...a],
      comparing: [],
      swapping: [],
      sorted: a.map((_, idx) => idx),
      stats: { comparisons, swaps, status: "Complete! Array is fully sorted." }
    };
  }

  // Generator for Insertion Sort
  function* insertionSortGen(arr) {
    const a = [...arr];
    const n = a.length;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 1; i < n; i++) {
      let key = a[i];
      let j = i - 1;

      yield {
        array: [...a],
        comparing: [i],
        swapping: [],
        sorted: a.map((_, idx) => idx < i ? idx : null).filter(x => x !== null),
        stats: { comparisons, swaps, status: `Selected key ${key} at index ${i}` }
      };

      while (j >= 0 && a[j] > key) {
        comparisons++;
        swaps++;
        a[j + 1] = a[j];
        yield {
          array: [...a],
          comparing: [j, j + 1],
          swapping: [j + 1],
          sorted: [],
          stats: { comparisons, swaps, status: `Shifted element ${a[j]} to position ${j + 1}` }
        };
        j = j - 1;
      }
      a[j + 1] = key;
    }

    yield {
      array: [...a],
      comparing: [],
      swapping: [],
      sorted: a.map((_, idx) => idx),
      stats: { comparisons, swaps, status: "Complete! Array is fully sorted." }
    };
  }

  const stepForward = () => {
    if (!generatorRef.current) {
      if (algorithm === "bubble") generatorRef.current = bubbleSortGen(array);
      else if (algorithm === "selection") generatorRef.current = selectionSortGen(array);
      else generatorRef.current = insertionSortGen(array);
    }

    const next = generatorRef.current.next();
    if (!next.done) {
      setArray(next.value.array);
      setComparing(next.value.comparing);
      setSwapping(next.value.swapping);
      setSortedIndices(next.value.sorted);
      setStats(next.value.stats);
      window.soundManager.playKeypress();
    } else {
      stopSorting();
      generatorRef.current = null;
      window.soundManager.playSuccess();
    }
  };

  const togglePlay = () => {
    if (isRunning) {
      stopSorting();
      window.soundManager.playClick();
    } else {
      setIsRunning(true);
      window.soundManager.playClick();
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        stepForward();
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, speed, array, algorithm]);

  const handleAlgoChange = (algoKey) => {
    stopSorting();
    generatorRef.current = null;
    setAlgorithm(algoKey);
    setComparing([]);
    setSortedIndices([]);
    setSwapping([]);
    setStats({ comparisons: 0, swaps: 0, status: `Selected ${complexities[algoKey].name}` });
    window.soundManager.playClick();
  };

  const currComplexity = complexities[algorithm];

  return (
    <section id="visualizer" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
            <i data-lucide="play" className="w-3.5 h-3.5"></i>
            <span>Live Interactive Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Data Structures & Algorithms Visualizer
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            Direct demonstration of 3rd-semester algorithmic knowledge. Interact in real-time, adjust speed, 
            inspect step comparisons, and analyze computational complexities.
          </p>
        </div>

        {/* Visualizer Workbench */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            
            {/* Algorithm Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-white/5">
              {Object.keys(complexities).map((key) => (
                <button
                  key={key}
                  onClick={() => handleAlgoChange(key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    algorithm === key
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {complexities[key].name}
                </button>
              ))}
            </div>

            {/* Execution Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all ${
                  isRunning 
                    ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                }`}
              >
                <i data-lucide={isRunning ? "pause" : "play"} className="w-3.5 h-3.5"></i>
                <span>{isRunning ? "Pause" : "Play Run"}</span>
              </button>

              <button
                onClick={() => {
                  stopSorting();
                  stepForward();
                }}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-white/10 text-xs font-medium transition-all"
                title="Execute single comparison step"
              >
                <i data-lucide="skip-forward" className="w-3.5 h-3.5 text-cyan-400"></i>
                <span>Step</span>
              </button>

              <button
                onClick={resetArray}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-medium transition-all"
                title="Randomize data array"
              >
                <i data-lucide="refresh-cw" className="w-3.5 h-3.5 text-indigo-400"></i>
                <span>Randomize</span>
              </button>
            </div>

            {/* Speed Slider */}
            <div className="flex items-center gap-3 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-white/5">
              <span className="text-[11px] font-mono text-slate-400">Speed:</span>
              <input
                type="range"
                min="30"
                max="300"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-24 cursor-pointer"
              />
              <span className="text-[11px] font-mono text-cyan-300 w-12">{speed}ms</span>
            </div>

          </div>

          {/* Graphical Bars Display */}
          <div className="h-64 sm:h-72 w-full bg-slate-950/70 rounded-xl p-4 sm:p-6 border border-white/5 flex items-end justify-center gap-2 sm:gap-3 relative overflow-hidden">
            {array.map((val, idx) => {
              const isComp = comparing.includes(idx);
              const isSwap = swapping.includes(idx);
              const isSorted = sortedIndices.includes(idx);

              let barColor = "bg-indigo-500/60 border-indigo-400/50";
              if (isSorted) barColor = "bg-emerald-500/80 border-emerald-400 shadow-lg shadow-emerald-500/30";
              else if (isSwap) barColor = "bg-rose-500 border-rose-300 animate-pulse";
              else if (isComp) barColor = "bg-amber-400 border-amber-200 shadow-md shadow-amber-400/30";

              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end max-w-[48px]">
                  <span className="text-[10px] font-mono text-slate-400 mb-1 hidden sm:block">
                    {val}
                  </span>
                  <div
                    style={{ height: `${val}%` }}
                    className={`w-full rounded-t-md border-t-2 transition-all duration-100 ${barColor}`}
                  ></div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1">
                    {idx}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Real-time Status & Complexity Footer */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2">
            
            {/* Status & Stats */}
            <div className="md:col-span-6 bg-slate-900/60 rounded-xl p-3.5 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500">Comparisons: </span>
                  <strong className="text-cyan-300">{stats.comparisons}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Swaps: </span>
                  <strong className="text-indigo-300">{stats.swaps}</strong>
                </div>
              </div>
              <div className="text-right truncate max-w-[200px] text-xs font-mono text-emerald-400">
                {stats.status}
              </div>
            </div>

            {/* Complexity Badges */}
            <div className="md:col-span-6 flex flex-wrap items-center justify-end gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-white/5">
                Best: <strong className="text-emerald-400">{currComplexity.best}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-white/5">
                Avg: <strong className="text-amber-400">{currComplexity.avg}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-white/5">
                Worst: <strong className="text-rose-400">{currComplexity.worst}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-white/5">
                Space: <strong className="text-cyan-400">{currComplexity.space}</strong>
              </span>
            </div>

          </div>

          <p className="text-xs text-slate-400 italic">
            *Built with custom JavaScript generators in React to simulate real synchronous step execution and memory swapping without blocking the browser thread.
          </p>

        </div>

      </div>
    </section>
  );
}

window.DsaVisualizer = DsaVisualizer;
