// Contact Component with Interactive Form Validation and Toast Notifications
const { useState } = React;

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailAddress = window.PORTFOLIO_DATA.personal.email;
  const phoneNumber = window.PORTFOLIO_DATA.personal.phone || "03138977582";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    window.soundManager.playSuccess();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    window.soundManager.playSuccess();
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please enter your name";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please provide a valid email address";
    }
    if (!formData.subject.trim()) errs.subject = "Please enter a subject";
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = "Message must be at least 10 characters long";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.soundManager.playClick();

    if (!validate()) {
      window.soundManager.playBeep(240, 0.15, 'sawtooth');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.soundManager.playSuccess();
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
            <i data-lucide="mail" className="w-3.5 h-3.5"></i>
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Connect & Collaborate
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            Interested in discussing software engineering, 3rd semester collaboration, internship opportunities, 
            or algorithmic problem solving? Send a message directly below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Quick Contact & Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email & Phone Cards */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Direct Contact
              </span>
              
              {/* Email Item */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <i data-lucide="mail" className="w-4 h-4 text-cyan-400 flex-shrink-0"></i>
                  <span className="text-xs font-mono text-slate-200 truncate">
                    {emailAddress}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-mono transition-all flex-shrink-0"
                >
                  <i data-lucide={copiedEmail ? "check" : "copy"} className="w-3.5 h-3.5 text-cyan-400"></i>
                  <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                </button>
              </div>

              {/* Phone Item */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <i data-lucide="phone" className="w-4 h-4 text-emerald-400 flex-shrink-0"></i>
                  <a href={`tel:${phoneNumber}`} className="text-xs font-mono text-slate-200 hover:text-emerald-300 transition-colors">
                    {phoneNumber}
                  </a>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={handleCopyPhone}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 text-xs font-mono transition-all"
                  >
                    <i data-lucide={copiedPhone ? "check" : "copy"} className="w-3.5 h-3.5 text-emerald-400"></i>
                    <span>{copiedPhone ? "Copied!" : "Copy"}</span>
                  </button>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/5 transition-colors"
                    title="Call Now"
                  >
                    <i data-lucide="phone-call" className="w-3.5 h-3.5 text-emerald-400"></i>
                  </a>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot-pulse"></span>
                <span>Response time: Usually &lt; 24 hours</span>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                Profiles & Coding Hubs
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={window.PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => window.soundManager.playClick()}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-white/5 hover:border-white/20 text-slate-200 transition-all text-xs font-medium"
                >
                  <i data-lucide="github" className="w-4 h-4 text-cyan-400"></i>
                  <span>GitHub</span>
                </a>

                <a
                  href={window.PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => window.soundManager.playClick()}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-white/5 hover:border-white/20 text-slate-200 transition-all text-xs font-medium"
                >
                  <i data-lucide="linkedin" className="w-4 h-4 text-blue-400"></i>
                  <span>LinkedIn</span>
                </a>

                <a
                  href={window.PORTFOLIO_DATA.personal.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => window.soundManager.playClick()}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-white/5 hover:border-white/20 text-slate-200 transition-all text-xs font-medium"
                >
                  <i data-lucide="code" className="w-4 h-4 text-amber-400"></i>
                  <span>LeetCode</span>
                </a>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-white/5 text-slate-200 text-xs font-medium">
                  <i data-lucide="map-pin" className="w-4 h-4 text-rose-400"></i>
                  <span>Remote / Global</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl relative">
            
            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-3 animate-fadeIn">
                <i data-lucide="check-circle" className="w-5 h-5 text-emerald-400 flex-shrink-0"></i>
                <div>
                  <span className="font-bold">Transmission Received!</span>
                  <p className="text-emerald-200/80 mt-0.5">
                    Thank you for reaching out. Your message has been noted and I will reply promptly!
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-slate-100 outline-none transition-colors ${
                      errors.name ? 'border-rose-500' : 'border-white/10 focus:border-cyan-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-slate-100 outline-none transition-colors ${
                      errors.email ? 'border-rose-500' : 'border-white/10 focus:border-cyan-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Subject <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Software Internship / Project Collaboration"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-slate-100 outline-none transition-colors ${
                    errors.subject ? 'border-rose-500' : 'border-white/10 focus:border-cyan-500'
                  }`}
                />
                {errors.subject && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows="4"
                  placeholder="Share a brief overview of your team, project, or what you'd like to collaborate on..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-slate-100 outline-none transition-colors resize-none ${
                    errors.message ? 'border-rose-500' : 'border-white/10 focus:border-cyan-500'
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:opacity-95 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
              >
                <i data-lucide={isSubmitting ? "loader" : "send"} className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`}></i>
                <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

window.Contact = Contact;
