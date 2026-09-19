// Main React Application Root Component
const { useState, useEffect } = React;

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Initialize Canvas constellation and Lucide icons
  useEffect(() => {
    const cleanupCanvas = window.initCanvasBackground ? window.initCanvasBackground("bg-canvas") : null;
    
    // Refresh icons whenever DOM updates
    if (window.lucide) {
      window.lucide.createIcons();
    }

    return () => {
      if (cleanupCanvas) cleanupCanvas();
    };
  }, []);

  // Update lucide icons when modals or state changes
  useEffect(() => {
    if (window.lucide) {
      setTimeout(() => window.lucide.createIcons(), 50);
    }
  }, [isTerminalOpen, soundEnabled]);

  const handleToggleSound = () => {
    const newState = window.soundManager.toggle();
    setSoundEnabled(newState);
  };

  const handleOpenTerminal = () => {
    setIsTerminalOpen(true);
  };

  const handleCloseTerminal = () => {
    setIsTerminalOpen(false);
  };

  return (
    <div className="min-h-screen text-slate-100 relative cyber-grid">
      
      {/* Background Interactive Particle Canvas */}
      <canvas
        id="bg-canvas"
        className="fixed inset-0 pointer-events-auto z-0 opacity-80"
      ></canvas>

      {/* Foreground Content Stack */}
      <div className="relative z-10 flex flex-col">
        {/* Navigation Bar */}
        <Navbar
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenTerminal={handleOpenTerminal}
        />

        {/* Hero Section */}
        <Hero onOpenTerminal={handleOpenTerminal} />

        {/* About Section */}
        <About />

        {/* Skills with Code Peek */}
        <Skills />

        {/* Playable DSA Visualizer Lab */}
        <DsaVisualizer />

        {/* Projects Gallery */}
        <Projects />

        {/* Interactive API Lab */}
        <ApiSandbox />

        {/* Timeline Progression */}
        <Timeline />

        {/* Contact Form */}
        <Contact />

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Developer CLI Terminal Modal */}
      <Terminal
        isOpen={isTerminalOpen}
        onClose={handleCloseTerminal}
      />

    </div>
  );
}

// Mount the React Application into the DOM
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
