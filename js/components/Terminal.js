// Interactive Developer Terminal CLI Component
const { useState, useEffect, useRef } = React;

function Terminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Tauseef Noor\'s Interactive Terminal [Version 3.2.0-CS3]' },
    { type: 'system', text: 'Type "help" to see available commands or "whoami" to inspect profile.\n' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixMode, setIsMatrixMode] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isMatrixMode]);

  if (!isOpen) return null;

  const handleKeyDown = (e) => {
    window.soundManager.playKeypress();

    if (e.key === 'Enter') {
      const trimmed = inputVal.trim();
      if (!trimmed) return;

      const newHistory = [...history, { type: 'user', text: `$ ${trimmed}` }];
      const cmdKey = trimmed.toLowerCase();

      // Add to command history for arrow navigation
      setCmdHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      // Evaluate command
      if (cmdKey === 'clear') {
        setHistory([]);
        setIsMatrixMode(false);
        setInputVal('');
        return;
      } else if (cmdKey === 'matrix') {
        setIsMatrixMode(true);
        newHistory.push({ type: 'output', text: 'Initiating Cyber Matrix Rain... (type "clear" to exit)' });
        window.soundManager.playSuccess();
      } else if (window.PORTFOLIO_DATA.terminalCommands[cmdKey]) {
        newHistory.push({ type: 'output', text: window.PORTFOLIO_DATA.terminalCommands[cmdKey] });
        if (cmdKey === 'sudo hire') window.soundManager.playSuccess();
      } else {
        newHistory.push({ 
          type: 'error', 
          text: `zsh: command not found: ${trimmed}. Type "help" for a list of valid commands.` 
        });
      }

      setHistory(newHistory);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(cmdHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const available = ['help', 'whoami', 'skills', 'projects', 'dsa', 'contact', 'matrix', 'clear', 'sudo hire'];
      const match = available.find(c => c.startsWith(inputVal.toLowerCase().trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-4xl h-[80vh] rounded-2xl border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                window.soundManager.playClick();
                onClose();
              }}
              className="w-3.5 h-3.5 rounded-full bg-rose-500/90 hover:bg-rose-600 transition-colors"
              title="Close Terminal"
            ></button>
            <button
              onClick={() => setHistory([])}
              className="w-3.5 h-3.5 rounded-full bg-amber-500/90 hover:bg-amber-600 transition-colors"
              title="Clear Terminal"
            ></button>
            <button
              onClick={() => setIsMatrixMode(!isMatrixMode)}
              className="w-3.5 h-3.5 rounded-full bg-emerald-500/90 hover:bg-emerald-600 transition-colors"
              title="Toggle Matrix Rain"
            ></button>
            <span className="font-mono text-xs text-slate-400 ml-3">
              tauseef@cs3-workstation: ~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-cyan-400 hidden sm:inline-block">
              Interactive Dev CLI
            </span>
            <button
              onClick={() => {
                window.soundManager.playClick();
                onClose();
              }}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10"
            >
              <i data-lucide="x" className="w-4 h-4"></i>
            </button>
          </div>
        </div>

        {/* Terminal Content Area */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className={`flex-1 p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-y-auto space-y-2.5 ${
            isMatrixMode ? 'bg-black text-emerald-400' : 'bg-slate-950 text-slate-200'
          }`}
        >
          {history.map((item, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {item.type === 'user' && (
                <span className="text-cyan-400 font-bold">{item.text}</span>
              )}
              {item.type === 'system' && (
                <span className="text-slate-400">{item.text}</span>
              )}
              {item.type === 'output' && (
                <span className={isMatrixMode ? 'text-emerald-400' : 'text-slate-200'}>
                  {item.text}
                </span>
              )}
              {item.type === 'error' && (
                <span className="text-rose-400">{item.text}</span>
              )}
            </div>
          ))}

          {/* Prompt Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-indigo-400 font-bold">tauseef@cs3</span>
            <span className="text-slate-500">:</span>
            <span className="text-cyan-400 font-bold">~</span>
            <span className="text-slate-300">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-slate-100 font-mono focus:ring-0 p-0"
              autoFocus
              spellCheck="false"
            />
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Terminal Footer Quick Buttons */}
        <div className="px-4 py-2 bg-slate-900/80 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500">Quick:</span>
            {['whoami', 'skills', 'projects', 'dsa', 'sudo hire', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInputVal(cmd);
                  inputRef.current?.focus();
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
          <span className="text-slate-500 hidden md:inline">
            [Tab]: autocomplete • [↑/↓]: history
          </span>
        </div>

      </div>
    </div>
  );
}

window.Terminal = Terminal;
