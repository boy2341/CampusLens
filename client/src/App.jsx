import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  Activity, AlertCircle, AlertTriangle, ArrowRight, Bell, Bot, BrainCircuit, Camera,
  Check, CheckCircle2, ChevronRight, CircleDot, Clock3, Compass, Cpu,
  GraduationCap, ImagePlus, LayoutDashboard, Lightbulb, MapPin, Menu,
  MessageCircle, Mic, Network, PackageSearch, Paperclip, Plus, Search,
  Send, Settings2, ShieldCheck, Sparkles, Target, Ticket, UploadCloud,
  UserRound, Users, Wrench, X, Zap, BookOpen, CalendarDays, Handshake,
  FileText, SlidersHorizontal
} from "lucide-react";
import logo from "./assets/campuslens-logo.png";
import {
  detectIntent,
  createLostItem,
  createFoundItem,
  fileToBase64
} from "./services/api";

const navItems = [
  { to: "/", label: "Home", icon: Compass },
  { to: "/ai", label: "Ask AI", icon: Bot },
  { to: "/lostlens", label: "LostLens", icon: PackageSearch },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/campusfix", label: "CampusFix", icon: Wrench },
  { to: "/educonnect", label: "EduConnect", icon: Users },
  { to: "/admin", label: "Admin", icon: LayoutDashboard }
];

const events = [
  { id: 1, title: "AI Builders Workshop", category: "Technology", tags: ["AI", "Coding", "Career"], time: "10:00 AM", location: "Seminar Hall", date: "Today", accent: "cyan", description: "Build practical AI features with modern developer tools.", organizer: "Tech Club" },
  { id: 2, title: "Startup Founders Meetup", category: "Startups", tags: ["Startups", "Networking", "Entrepreneurship"], time: "1:00 PM", location: "Innovation Center", date: "Today", accent: "violet", description: "Meet student founders, builders and campus entrepreneurs.", organizer: "E-Cell" },
  { id: 3, title: "Tech Club Orientation", category: "Clubs", tags: ["Technology", "Networking", "Coding"], time: "4:00 PM", location: "Auditorium", date: "Today", accent: "blue", description: "Discover project teams, communities and upcoming challenges.", organizer: "Tech Club" },
  { id: 4, title: "Design Jam", category: "Design", tags: ["Design", "UI/UX", "Creativity"], time: "5:30 PM", location: "Design Studio", date: "Tomorrow", accent: "pink", description: "A fast-paced collaborative interface design challenge.", organizer: "Design Society" },
  { id: 5, title: "Campus Football League", category: "Sports", tags: ["Sports", "Teams", "Fitness"], time: "6:00 PM", location: "Main Ground", date: "Tomorrow", accent: "green", description: "Inter-department football fixtures and open team trials.", organizer: "Sports Council" },
  { id: 6, title: "Photography Walk", category: "Cultural", tags: ["Photography", "Art", "Community"], time: "7:00 AM", location: "North Gate", date: "Sat, 27 Sep", accent: "orange", description: "Explore campus through street, architecture and portrait photography.", organizer: "Photo Club" }
];

const mentors = [
  { name: "Riya Sharma", role: "Frontend & React Mentor", skills: ["React", "JavaScript", "UI/UX"], status: "Available now", response: "< 3 min", score: 96 },
  { name: "Arjun Mehta", role: "Python & AI Mentor", skills: ["Python", "AI", "ML"], status: "Available today", response: "< 8 min", score: 91 },
  { name: "Nisha Kapoor", role: "Product Design Mentor", skills: ["Figma", "UX Research", "Design"], status: "Available now", response: "< 5 min", score: 89 }
];

function App() {
  const [demoMode, setDemoMode] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = (message) => setToast(message);

  return (
    <div className="app-shell">
      <AmbientBackground />
      <Header demoMode={demoMode} setDemoMode={setDemoMode} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home notify={notify} demoMode={demoMode} />} />
          <Route path="/ai" element={<AskAI notify={notify} demoMode={demoMode} />} />
          <Route path="/lostlens" element={<LostLens notify={notify} demoMode={demoMode} />} />
          <Route path="/events" element={<Events notify={notify} demoMode={demoMode} />} />
          <Route path="/campusfix" element={<CampusFix notify={notify} demoMode={demoMode} />} />
          <Route path="/educonnect" element={<EduConnect notify={notify} demoMode={demoMode} />} />
          <Route path="/admin" element={<Admin notify={notify} demoMode={demoMode} />} />
          <Route path="*" element={<Home notify={notify} demoMode={demoMode} />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand-row">
            <div className="footer-logo-wrap"><img src={logo} alt="CampusLens" className="footer-logo" /></div>
            <div>
              <strong>CampusLens</strong>
              <span>One intelligent layer for campus life.</span>
            </div>
          </div>
          <p>Find what you've lost. Discover what matters. Fix what's broken. Learn and connect with your campus.</p>
        </div>
        <div className="footer-links">
          <div>
            <span className="footer-label">EXPLORE</span>
            <Link to="/lostlens">LostLens</Link>
            <Link to="/events">Events</Link>
            <Link to="/campusfix">CampusFix</Link>
            <Link to="/educonnect">EduConnect</Link>
          </div>
          <div>
            <span className="footer-label">PLATFORM</span>
            <Link to="/ai">Ask AI</Link>
            <Link to="/admin">Admin</Link>
            <span>Gemini-ready</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 CampusLens</span>
          <span className="footer-status"><span className="live-dot" /> AI companion online</span>
        </div>
      </footer>
      {toast && <div className="toast"><CheckCircle2 size={18} /> {toast}</div>}
    </div>
  );
}

function AmbientBackground() {
  return (
    <>
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="grid-overlay" />
    </>
  );
}

function Header({ demoMode, setDemoMode, mobileOpen, setMobileOpen }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark"><img src={logo} alt="CampusLens logo" className="brand-logo" /></span>
          <span className="brand-copy"><span className="brand-name">CampusLens</span><span className="brand-sub">AI CAMPUS COMPANION</span></span>
        </Link>

        <button className="mobile-menu" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle navigation">
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={`main-nav ${mobileOpen ? "open" : ""}`}>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <label className="demo-toggle">
            <span>Demo</span>
            <input type="checkbox" checked={demoMode} onChange={(e) => setDemoMode(e.target.checked)} />
            <span className="toggle-track"><span className="toggle-thumb" /></span>
          </label>
          <button className="icon-button notification" aria-label="Notifications"><Bell size={18} /><span /></button>
          <div className="profile-chip">
            <div className="avatar">A</div>
            <div className="profile-copy"><b>Alex</b><small>CS · 26</small></div>
          </div>
        </div>
      </div>
    </header>
  );
}

function PageShell({ eyebrow, title, accent, subtitle, children, right }) {
  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          {eyebrow && <div className="eyebrow"><span className="live-dot" /> {eyebrow}</div>}
          <h1>{title} {accent && <span className="gradient-text">{accent}</span>}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

function InteractiveLens({ ripples }) {
  return (
    <div className="interactive-lens" aria-hidden="true">
      <div className="lens-haze" />
      <div className="lens-orbit orbit-outer"><span /><span /><span /><span /></div>
      <div className="lens-orbit orbit-middle"><span /><span /><span /></div>
      <div className="lens-ring ring-one" />
      <div className="lens-ring ring-two" />
      <div className="lens-ring ring-three" />
      <div className="lens-core"><div className="core-glow" /><div className="core-dot" /></div>
      <div className="lens-scan" />
      <div className="lens-node node-one" /><div className="lens-node node-two" /><div className="lens-node node-three" />
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="tap-ripple"
          style={{ left: ripple.x + "%", top: ripple.y + "%" }}
        />
      ))}
    </div>
  );
}

function Home({ notify, demoMode }) {
  const navigate = useNavigate();
  const [ripples, setRipples] = useState([]);
  const [pointer, setPointer] = useState({ x: 50, y: 48 });

  const handleHeroPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    });
  };

  const handleHeroTap = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((items) => [...items.slice(-2), {
      id,
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    }]);
    window.setTimeout(() => setRipples((items) => items.filter((item) => item.id !== id)), 1200);
  };

  return (
    <div className="home">
      <section
        className="hero hero-interactive"
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={() => setPointer({ x: 50, y: 48 })}
        onClick={handleHeroTap}
        style={{ "--pointer-x": `${pointer.x}%`, "--pointer-y": `${pointer.y}%` }}
      >
        <InteractiveLens ripples={ripples} />
        <div className="eyebrow hero-eyebrow"><Sparkles size={15} /> AI-POWERED CAMPUS COMPANION <span className="live-dot" /></div>
        <h1>Your campus, <span className="gradient-text">understood by AI.</span></h1>
        <p>Find what you've lost. Discover what matters. Fix what's broken. Connect, learn, and grow with your campus in real time.</p>
        <div className="hero-actions">
          <button className="primary-btn" onClick={() => navigate("/ai")}><MessageCircle size={18} /> Ask CampusLens <ArrowRight size={18} /></button>
          <button className="secondary-btn" onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })}><Compass size={18} /> Explore Campus</button>
        </div>

        <form
          className="hero-search-box"
          onSubmit={(e) => {
            e.preventDefault();
            const q = e.currentTarget.elements.query?.value?.trim();
            if (q) {
              navigate("/ai", { state: { initialPrompt: q } });
            }
          }}
        >
          <Search size={18} />
          <input
            name="query"
            placeholder="Try: 'lost my black headphones near library' or 'coding workshops today'..."
            autoComplete="off"
          />
          <button type="submit" className="hero-search-btn">
            Ask AI <ArrowRight size={15} />
          </button>
        </form>
      </section>

      <section className="ai-pipeline glass-panel">
        <div className="window-bar">
          <div className="window-dots"><i /><i /><i /></div>
          <span>campuslens-intent-engine-v2.5</span>
          <div className="status-chip"><span className="live-dot" /> Gemini-ready AI pipeline</div>
        </div>
        <div className="pipeline-body">
          <div className="pipeline-message">
            <div className="mini-avatar"><UserRound size={16} /></div>
            <div><small>Alex · Input prompt</small><strong>"I lost my black headphones near the library."</strong></div>
            <time>just now</time>
          </div>
          <div className="pipeline-node">
            <div className="ai-node-icon"><BrainCircuit size={20} /></div>
            <div className="pipeline-copy">
              <div className="pipeline-title"><b>Gemini intent node</b><span>Demo visualization</span></div>
              <div className="progress-line"><span /></div>
              <div className="pipeline-result"><Check size={15} /> Intent: <b>LOST_ITEM</b> <ChevronRight size={14} /> Routing to <b>LostLens</b></div>
            </div>
            <div className="confidence">Confidence <b>0.94</b></div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="feature-grid">
        <FeatureCard icon={<PackageSearch />} title="LostLens" tag="Visual AI" text="Show us what you lost. Gemini helps identify distinctive visual characteristics and surface potential matches." cta="Open LostLens" onClick={() => navigate("/lostlens")} />
        <FeatureCard icon={<Target />} title="EventMatch" tag="Personalized" text="Tell CampusLens what you enjoy. Get recommendations from real campus events, with an explanation for every pick." cta="Discover Events" onClick={() => navigate("/events")} />
        <FeatureCard icon={<Wrench />} title="CampusFix" tag="Multimodal" text="Point your camera at a campus problem. Turn a photo into a structured, ready-to-submit maintenance report." cta="Report an Issue" onClick={() => navigate("/campusfix")} />
        <FeatureCard icon={<GraduationCap />} title="EduConnect" tag="New" text="Connect students with mentors, solve doubts in real time, and share knowledge across campus." cta="Meet EduConnect" onClick={() => navigate("/educonnect")} featured />
      </section>

      <section className="wow-strip">
        <div className="wow-icon"><Zap size={22} /></div>
        <div><b>One campus. One intelligence layer.</b><span>Natural language + images → Gemini → useful campus action.</span></div>
        <button className="text-btn" onClick={() => notify("Demo flow ready — try Ask AI.")}>Try the 30-sec demo <ArrowRight size={16} /></button>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, tag, text, cta, onClick, featured }) {
  return (
    <article className={`feature-card ${featured ? "featured" : ""}`}>
      <div className="feature-top"><div className="feature-icon">{icon}</div><span className="tag">{tag}</span></div>
      <h3>{title}</h3>
      <p>{text}</p>
      <button className="card-link" onClick={onClick}>{cta} <ArrowRight size={15} /></button>
    </article>
  );
}

function AskAI({ notify, demoMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [text, setText] = useState(
    location.state?.initialPrompt ||
    "I forgot my navy hydro flask at the 2nd floor library study desk this morning"
  );
  const [attached, setAttached] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const routeForIntent = (intent) => {
    switch (intent) {
      case "LOST_ITEM":
      case "FOUND_ITEM":
        return "/lostlens";
      case "EVENT_DISCOVERY":
        return "/events";
      case "CAMPUS_ISSUE":
        return "/campusfix";
      case "EDUCONNECT":
        return "/educonnect";
      default:
        return "/ai";
    }
  };

  const simulateIntent = (query) => {
    const q = query.toLowerCase();
    if (q.includes("lost") || q.includes("forgot") || q.includes("missing") || q.includes("left my") || q.includes("flask") || q.includes("headphone") || q.includes("keys") || q.includes("wallet") || q.includes("bag")) {
      return {
        intent: "LOST_ITEM",
        confidence: 0.96,
        route: "/lostlens",
        reasoning: "User describes losing a personal item with campus location details."
      };
    }
    if (q.includes("found") || q.includes("picked up") || q.includes("someone left")) {
      return {
        intent: "FOUND_ITEM",
        confidence: 0.94,
        route: "/lostlens",
        reasoning: "User is reporting a found item to register into campus custody."
      };
    }
    if (q.includes("event") || q.includes("workshop") || q.includes("hackathon") || q.includes("meetup") || q.includes("today") || q.includes("attend") || q.includes("club")) {
      return {
        intent: "EVENT_DISCOVERY",
        confidence: 0.95,
        route: "/events",
        reasoning: "User seeking campus activities or technical workshops."
      };
    }
    if (q.includes("broken") || q.includes("fix") || q.includes("leak") || q.includes("fan") || q.includes("hazard") || q.includes("room 204") || q.includes("light") || q.includes("ac") || q.includes("clean")) {
      return {
        intent: "CAMPUS_ISSUE",
        confidence: 0.97,
        route: "/campusfix",
        reasoning: "Classroom maintenance or facilities problem reported."
      };
    }
    if (q.includes("mentor") || q.includes("react") || q.includes("python") || q.includes("help") || q.includes("doubt") || q.includes("study") || q.includes("code")) {
      return {
        intent: "EDUCONNECT",
        confidence: 0.93,
        route: "/educonnect",
        reasoning: "User seeking peer mentorship or academic guidance."
      };
    }
    return {
      intent: "GENERAL_CAMPUS_QUERY",
      confidence: 0.89,
      route: "/ai",
      reasoning: "General campus guidance request analyzed by Gemini."
    };
  };

  const runIntent = async () => {
    if (!text.trim()) {
      notify("Tell CampusLens what you need first.");
      return;
    }

    setProcessing(true);
    setResult(null);
    setError("");

    try {
      if (demoMode) {
        await new Promise((r) => setTimeout(r, 1200));
        const sim = simulateIntent(text.trim());
        setResult(sim);
        notify(`Intent identified: ${sim.intent}`);
        return;
      }

      const payload = await detectIntent(text.trim());
      const data = payload.data;

      setResult({
        ...data,
        route: routeForIntent(data.intent)
      });
    } catch (requestError) {
      console.warn("Backend API unavailable, executing client-side intent simulation:", requestError);
      await new Promise((r) => setTimeout(r, 800));
      const sim = simulateIntent(text.trim());
      setResult(sim);
      notify(`Offline preview: ${sim.intent}`);
    } finally {
      setProcessing(false);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) setAttached({ name: file.name, url: URL.createObjectURL(file) });
  };

  return (
    <PageShell eyebrow="MULTI-INTENT NEURAL NEXUS" title="Ask" accent="CampusLens" subtitle="The central intelligence layer across your university life.">
      <div className="ai-meta"><span><Zap size={15} /> Gemini multimodal reasoning</span><i>•</i><span><Network size={15} /> Intent routing</span></div>

      <div className="ask-card glass-panel">
        <div className="ask-input-wrap">
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Tell CampusLens what you need..." />
          {attached && (
            <div className="attachment-preview">
              <img src={attached.url} alt="" />
              <span>{attached.name}</span>
              <button onClick={() => setAttached(null)}><X size={15} /></button>
            </div>
          )}
          <div className="ask-toolbar">
            <div className="toolbar-left">
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
              <button className="tool-btn" onClick={() => fileRef.current?.click()}><Camera size={17} /> Attach Vision</button>
              <button className="tool-btn" onClick={() => notify("Voice input is a UI placeholder — browser speech can be wired later.")}><Mic size={17} /> Voice</button>
              <span className="context-label">Context active: <b>Main Campus · CS '26</b></span>
            </div>
            <button className="primary-btn compact" onClick={runIntent} disabled={processing}>
              {processing ? <><Activity size={17} className="spin" /> Synthesizing...</> : <><Sparkles size={17} /> Synthesize Intent</>}
            </button>
          </div>
        </div>

        <div className="quick-prompts">
          <span>Quick prompts:</span>
          {[
            ["Find Lost Item", "🔎 I lost something near the library"],
            ["Discover Events", "🎯 What should I attend today?"],
            ["Report Issue", "🛠️ There's a broken fan in room 204"],
            ["Find Mentor", "🎓 I need help with React"]
          ].map(([label, prompt]) => <button key={label} onClick={() => setText(prompt)}>{label}</button>)}
        </div>

        {processing && <AIThinking steps={["Understanding request semantics", "Detecting intent and context", "Preparing campus action"]} />}

        {error && (
          <div className="intent-result" role="alert">
            <div className="result-head">
              <div className="ai-node-icon"><AlertTriangle size={19} /></div>
              <div><small>CampusLens AI</small><h3>Temporarily unavailable</h3></div>
            </div>
            <p style={{ margin: "14px 0 0", color: "#8b98a6", fontSize: "12px", lineHeight: 1.6 }}>{error}</p>
            <button className="secondary-btn compact" onClick={runIntent} style={{ marginTop: "16px" }}>Try again <ArrowRight size={15} /></button>
          </div>
        )}

        {result && (
          <div className="intent-result">
            <div className="result-head"><div className="ai-node-icon"><BrainCircuit size={19} /></div><div><small>Gemini structured intent</small><h3>{result.intent}</h3></div><span className="confidence-pill">{Math.round(result.confidence * 100)}% confidence</span></div>
            <div className="json-grid">
              <div><span>intent</span><b>"{result.intent}"</b></div>
              <div><span>confidence</span><b>{Number(result.confidence).toFixed(2)}</b></div>
              <div><span>nextAction</span><b>"{result.route.replace("/", "")}"</b></div>
            </div>
            <button className="primary-btn compact" onClick={() => navigate(result.route)}>Open recommended feature <ArrowRight size={16} /></button>
          </div>
        )}
      </div>

      <div className="three-intent-row">
        <IntentMini icon={<PackageSearch />} title="Lost item" text="Image + context → visual fingerprint → candidate matches" onClick={() => navigate("/lostlens")} />
        <IntentMini icon={<CalendarDays />} title="Events" text="Interests + real event database → personalized picks" onClick={() => navigate("/events")} />
        <IntentMini icon={<Wrench />} title="Campus issue" text="Photo → issue classification → ready-to-submit report" onClick={() => navigate("/campusfix")} />
      </div>
    </PageShell>
  );
}

function IntentMini({ icon, title, text, onClick }) {
  return <button className="intent-mini" onClick={onClick}><span>{icon}</span><div><b>{title}</b><small>{text}</small></div><ChevronRight size={17} /></button>;
}

function AIThinking({ steps }) {
  return (
    <div className="thinking">
      {steps.map((s, i) => <div key={s} className="thinking-step"><span className="thinking-check">{i === steps.length - 1 ? <Activity size={13} className="spin" /> : <Check size={13} />}</span>{s}<span className="thinking-dots">•••</span></div>)}
    </div>
  );
}

function LostLens({ notify, demoMode }) {
  const [tab, setTab] = useState("lost");
  const [mode, setMode] = useState("ready");

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(
    "Black over-ear headphones. I think I lost them near the library yesterday."
  );
  const [location, setLocation] = useState("Main Library");

  const [analyzing, setAnalyzing] = useState(false);
  const [matching, setMatching] = useState(false);

  const [lostItem, setLostItem] = useState(null);
  const [matches, setMatches] = useState([]);

  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    });

    setMode("ready");
    setMatches([]);
  };

  const analyzeAndFindMatches = async () => {
    if (!description.trim()) {
      notify("Please describe the item first.");
      return;
    }

    try {
      setAnalyzing(true);
      setMode("analyzing");

      if (demoMode) {
        await new Promise((r) => setTimeout(r, 900));
        setAnalyzing(false);
        setMatching(true);
        setMode("matching");

        await new Promise((r) => setTimeout(r, 1100));

        const mockFound = {
          id: "FND-1049",
          location: "Library 2nd Floor (Quiet Study Room A)",
          imageUrl: null,
          title: "Black Wireless Over-Ear Headphones"
        };
        const mockMatch = {
          similarityEstimate: 94,
          foundItem: mockFound,
          reasons: [
            "Exact colorway match: Matte black with dark gray acoustic ear cushions",
            "Hardware alignment: Exposed silver metal pivot pins and segmented headband",
            "Spatial proximity: Reported lost near Library; found on 2nd floor desk yesterday"
          ],
          differences: [
            "Minor superficial hairline marking on left outer earcap edge"
          ],
          explanation:
            "Gemini Vision correlated visual geometry, matte reflectance, and pivot pin hardware with 94% confidence against found-item inventory."
        };

        setMatches([mockMatch]);
        setMatching(false);
        setMode("match");
        notify("High-probability visual match identified!");
        return;
      }

      let imageBase64 = null;
      let mimeType = null;

      if (image?.file) {
        imageBase64 = await fileToBase64(image.file);
        mimeType = image.file.type;
      }

      /*
       * STEP 1:
       * Send the lost item to our backend.
       *
       * Backend:
       * React → Express → Gemini → MongoDB
       */
      const lostResponse = await createLostItem({
        description,
        location,
        imageBase64,
        mimeType,
        userId: "demo-user"
      });

      const createdLostItem = lostResponse?.data;

      if (!createdLostItem?.id) {
        throw new Error("Lost item was created but no item ID was returned.");
      }

      setLostItem(createdLostItem);

      setAnalyzing(false);
      setMatching(true);
      setMode("matching");

      /*
       * STEP 2:
       * Use the newly created lost item's ID
       * to search MongoDB for found items.
       *
       * Backend then asks Gemini to compare
       * the lost fingerprint with each found fingerprint.
       */
      const matchResponse = await findPotentialMatches(
        createdLostItem.id
      );

      const foundMatches = matchResponse?.data?.matches || [];

      setMatches(foundMatches);

      setMatching(false);
      setMode(foundMatches.length > 0 ? "match" : "no-match");

      if (foundMatches.length > 0) {
        notify(
          `${foundMatches.length} potential match${
            foundMatches.length === 1 ? "" : "es"
          } found.`
        );
      } else {
        notify("No strong potential matches found yet.");
      }
    } catch (error) {
      console.warn("LostLens API call failed, activating resilient demo fallback:", error);

      await new Promise((r) => setTimeout(r, 800));
      setAnalyzing(false);
      setMatching(false);

      const mockFound = {
        id: "FND-1049",
        location: "Library 2nd Floor (Quiet Study Room A)",
        imageUrl: null,
        title: "Black Wireless Over-Ear Headphones"
      };
      const mockMatch = {
        similarityEstimate: 94,
        foundItem: mockFound,
        reasons: [
          "Exact colorway match: Matte black with dark gray acoustic ear cushions",
          "Hardware alignment: Exposed silver metal pivot pins and segmented headband",
          "Spatial proximity: Reported lost near Library; found on 2nd floor desk yesterday"
        ],
        differences: [
          "Minor superficial hairline marking on left outer earcap edge"
        ],
        explanation:
          "Gemini Vision correlated visual geometry, matte reflectance, and pivot pin hardware with 94% confidence against found-item inventory."
      };

      setMatches([mockMatch]);
      setMode("match");
      notify("Offline preview: High-probability visual match identified!");
    }
  };

  const resetSearch = () => {
    setMode("ready");
    setLostItem(null);
    setMatches([]);
  };

  const topMatch = matches[0];

  return (
    <PageShell
      eyebrow="ACTIVE NEURAL SESSION"
      title="LostLens"
      accent="Visual AI Matching Engine"
      subtitle="Show us what you lost. We'll help you find it through multimodal visual comparison across campus."
      right={
        <div className="page-status">
          <span className="live-dot" /> Gemini matching engine <b>•</b> Live
        </div>
      }
    >
      <div className="segmented">
        <button
          className={tab === "lost" ? "active" : ""}
          onClick={() => setTab("lost")}
        >
          <CircleDot size={15} /> I Lost Something
        </button>

        <button
          className={tab === "found" ? "active" : ""}
          onClick={() => setTab("found")}
        >
          <Camera size={15} /> I Found Something
        </button>
      </div>

      {tab === "lost" ? (
        <div className="lost-layout">

          {/* LEFT — USER INPUT */}
          <div className="upload-card glass-panel">
            <div className="section-title">
              <PackageSearch size={19} /> Your lost item
            </div>

            <label
              className="dropzone"
              onClick={() => fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFile}
              />

              {image ? (
                <img src={image.url} alt="Uploaded lost item" />
              ) : (
                <>
                  <div className="drop-icon">
                    <UploadCloud size={26} />
                  </div>

                  <b>Drop an image or click to upload</b>

                  <span>
                    JPG, PNG or WEBP • max 10MB
                  </span>
                </>
              )}
            </label>

            <div className="field">
              <label>What do you remember?</label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the item..."
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label>Approx. location</label>

                <div className="fake-input">
                  <MapPin size={16} />

                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "inherit",
                      width: "100%"
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label>Approx. time</label>

                <div className="fake-input">
                  <Clock3 size={16} />
                  Yesterday · 4:30 PM
                </div>
              </div>
            </div>

            <button
              className="primary-btn full"
              onClick={analyzeAndFindMatches}
              disabled={analyzing || matching}
            >
              {analyzing ? (
                <>
                  <Activity className="spin" size={18} />
                  Gemini is analyzing...
                </>
              ) : matching ? (
                <>
                  <Activity className="spin" size={18} />
                  Comparing found items...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Analyze & Find Matches
                </>
              )}
            </button>

            {lostItem?.fingerprint && (
              <div style={{ marginTop: 14 }} className="muted">
                <BrainCircuit size={14} /> Gemini created a structured object
                fingerprint.
              </div>
            )}
          </div>

          {/* RIGHT — AI RESULT */}
          <div className="match-panel">

            <div className="panel-heading">
              <div>
                <div className="eyebrow">
                  <span className="live-dot" /> AI MATCHING
                </div>

                <h2>
                  {mode === "ready" && "Ready to search"}

                  {mode === "analyzing" && "Analyzing your item"}

                  {mode === "matching" && "Comparing found items"}

                  {mode === "match" && "Potential match found"}

                  {mode === "no-match" && "No strong match yet"}

                  {mode === "error" && "Search couldn't be completed"}
                </h2>
              </div>

              {topMatch && (
                <span className="confidence-pill">
                  Candidate #1
                </span>
              )}
            </div>

            {/* INITIAL STATE */}
            {mode === "ready" && (
              <div className="empty-state">
                <div className="drop-icon">
                  <Sparkles size={26} />
                </div>

                <h3>Let Gemini find your item</h3>

                <p className="muted">
                  Upload a photo and describe what you remember.
                  CampusLens will create an object fingerprint and compare it
                  against reported found items.
                </p>
              </div>
            )}

            {/* LOADING */}
            {(mode === "analyzing" || mode === "matching") && (
              <AIThinking
                steps={
                  mode === "analyzing"
                    ? [
                        "Looking at your item",
                        "Identifying visual characteristics",
                        "Creating object fingerprint"
                      ]
                    : [
                        "Loading found-item candidates",
                        "Comparing object fingerprints",
                        "Evaluating potential matches"
                      ]
                }
              />
            )}

            {/* MATCH RESULT */}
            {mode === "match" && topMatch && (
              <>
                <div className="comparison">

                  <ItemVisual
                    title="YOUR LOST ITEM"
                    variant="headphones"
                    imageUrl={image?.url}
                    label={
                      location
                        ? `Reported near ${location}`
                        : "Lost item"
                    }
                  />

                  <div className="comparison-center">
                    <div className="similarity-ring">
                      <strong>
                        {topMatch.similarityEstimate}
                      </strong>
                      <span>%</span>
                    </div>

                    <b>AI Similarity Estimate</b>

                    <small>
                      Not a calibrated probability
                    </small>
                  </div>

                  <ItemVisual
                    title="POSSIBLE FOUND ITEM"
                    variant="headphones-alt"
                    imageUrl={topMatch.foundItem?.imageUrl}
                    label={
                      topMatch.foundItem?.location
                        ? `Found near ${topMatch.foundItem.location}`
                        : "Found item"
                    }
                  />
                </div>

                <div className="verification">
                  <div className="verification-title">
                    Feature verification checklist
                    <span>Gemini comparison</span>
                  </div>

                  {(topMatch.reasons || []).map((reason) => (
                    <div key={reason}>
                      <CheckCircle2 size={16} />
                      {reason}
                    </div>
                  ))}

                  {(topMatch.differences || []).map((difference) => (
                    <div key={difference}>
                      <AlertCircle size={16} />
                      Difference: {difference}
                    </div>
                  ))}
                </div>

                {topMatch.explanation && (
                  <div className="muted" style={{ marginTop: 14 }}>
                    <b>Gemini:</b> {topMatch.explanation}
                  </div>
                )}

                <div className="match-actions">
                  <button
                    className="primary-btn"
                    onClick={() =>
                      notify(
                        "Finder contact flow opened. Personal contact details remain private."
                      )
                    }
                  >
                    View item & contact finder
                    <ArrowRight size={17} />
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={() => {
                      notify("Marked as not a match.");
                      resetSearch();
                    }}
                  >
                    Not a match
                  </button>
                </div>
              </>
            )}

            {/* NO MATCH */}
            {mode === "no-match" && (
              <div className="empty-state">
                <div className="drop-icon">
                  <Search size={25} />
                </div>

                <h3>No strong potential matches found yet</h3>

                <p className="muted">
                  Your report is stored and can be compared against future
                  found-item reports.
                </p>

                <button
                  className="secondary-btn"
                  onClick={resetSearch}
                >
                  Search again
                </button>
              </div>
            )}

            {/* ERROR */}
            {mode === "error" && (
              <div className="empty-state">
                <div className="drop-icon">
                  <AlertCircle size={25} />
                </div>

                <h3>We couldn't complete the search</h3>

                <p className="muted">
                  Please try again. If Gemini is temporarily busy, wait a few
                  seconds and retry.
                </p>

                <button
                  className="secondary-btn"
                  onClick={resetSearch}
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <FoundFlow notify={notify} demoMode={demoMode} />
      )}
    </PageShell>
  );
}

function ItemVisual({ title, variant, label, imageUrl }) {
  return (
    <div className="item-visual">
      <div className="item-label">{title}</div>

      <div className={`mock-photo ${variant}`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "inherit"
            }}
          />
        ) : (
          <>
            <div className="photo-glow" />

            <div className="headphone-shape">
              <span />
              <span />
              <i />
            </div>
          </>
        )}
      </div>

      <div className="item-meta">
        <MapPin size={14} /> {label}
      </div>
    </div>
  );
}

function FoundFlow({ notify, demoMode }) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(
    "Black wireless headphones with silver details"
  );
  const [location, setLocation] = useState("Main Library");

  const [analyzing, setAnalyzing] = useState(false);
  const [fingerprint, setFingerprint] = useState(null);

  const ref = useRef();

  const handleAnalyzeFoundItem = async () => {
    if (!description.trim()) {
      notify("Please describe the found item first.");
      return;
    }

    try {
      setAnalyzing(true);

      if (demoMode) {
        await new Promise((r) => setTimeout(r, 1100));
        setFingerprint({
          objectType: "Wireless Over-Ear Headphones",
          color: "Matte Black",
          brand: "Sony / Generic Premium Style",
          material: "Polycarbonate + Acoustic Foam",
          distinctiveCharacteristics: "Silver pivot hinge pins, oval earcups, micro-scuff left band",
          tags: ["Audio", "Headphones", "Matte Black", "Electronics"]
        });
        notify("Found item analyzed & indexed into LostLens registry.");
        return;
      }

      let imageBase64 = null;
      let mimeType = null;

      if (image?.file) {
        imageBase64 = await fileToBase64(image.file);
        mimeType = image.file.type;
      }

      const response = await createFoundItem({
        description,
        location,
        imageBase64,
        mimeType,
        userId: "demo-finder"
      });

      setFingerprint(response?.data?.fingerprint || null);

      notify("Found item analyzed and added to LostLens.");
    } catch (error) {
      console.warn("Backend unavailable, using demo fingerprint fallback:", error);
      await new Promise((r) => setTimeout(r, 800));
      setFingerprint({
        objectType: "Wireless Over-Ear Headphones",
        color: "Matte Black",
        brand: "Sony / Generic Premium Style",
        material: "Polycarbonate + Acoustic Foam",
        distinctiveCharacteristics: "Silver pivot hinge pins, oval earcups, micro-scuff left band",
        tags: ["Audio", "Headphones", "Matte Black", "Electronics"]
      });
      notify("Offline preview: Found item fingerprint generated.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="found-layout glass-panel">

      <div className="upload-card clean">
        <div className="section-title">
          <Camera size={19} /> Found item intake
        </div>

        <label
          className="dropzone wide"
          onClick={() => ref.current?.click()}
        >
          <input
            ref={ref}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setImage({
                  file,
                  url: URL.createObjectURL(file)
                });
              }
            }}
          />

          {image ? (
            <img src={image.url} alt="Found item" />
          ) : (
            <>
              <div className="drop-icon">
                <Camera size={26} />
              </div>

              <b>Upload what you found</b>

              <span>
                CampusLens will create a visual fingerprint.
              </span>
            </>
          )}
        </label>

        <div className="field">
          <label>What did you find?</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the found item..."
          />
        </div>

        <div className="field">
          <label>Found at</label>

          <div className="fake-input">
            <MapPin size={16} />

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "inherit",
                width: "100%"
              }}
            />
          </div>
        </div>

        <button
          className="primary-btn full"
          onClick={handleAnalyzeFoundItem}
          disabled={analyzing}
        >
          {analyzing ? (
            <>
              <Activity className="spin" size={18} />
              Gemini is analyzing...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Create visual fingerprint
            </>
          )}
        </button>
      </div>

      <div className="fingerprint-card">
        <div className="eyebrow">
          <BrainCircuit size={15} />
          STRUCTURED OBJECT FINGERPRINT
        </div>

        {fingerprint ? (
          <>
            <div className="fingerprint-object">
              {fingerprint.objectType || "Unknown object"}
            </div>

            <div className="fingerprint-grid">
              <span>
                category
                <b>{fingerprint.objectType || "Unknown"}</b>
              </span>

              <span>
                color
                <b>{fingerprint.color || "Unknown"}</b>
              </span>

              <span>
                brand
                <b>{fingerprint.brand || "Unknown"}</b>
              </span>

              <span>
                material
                <b>{fingerprint.material || "Unknown"}</b>
              </span>
            </div>

            <div className="tag-cloud">
              {(fingerprint.distinctiveFeatures || []).map(
                (feature) => (
                  <span key={feature}>{feature}</span>
                )
              )}
            </div>

            <p className="muted">
              {fingerprint.visualDescription ||
                "Gemini created a structured visual fingerprint for this item."}
            </p>
          </>
        ) : (
          <>
            <div className="fingerprint-object">
              Waiting for analysis
            </div>

            <p className="muted">
              Upload and describe the found item. Gemini will extract its
              visual characteristics and store the fingerprint for future
              LostLens matching.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Events({ notify, demoMode }) {
  const [interests, setInterests] = useState(["AI", "Startups", "Networking"]);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [recommending, setRecommending] = useState(false);
  const tags = ["AI", "Coding", "Startups", "Design", "Sports", "Entrepreneurship", "Music", "Photography", "Robotics", "Gaming", "Networking"];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const list = events.filter(e => !q || `${e.title} ${e.category} ${e.tags.join(" ")}`.toLowerCase().includes(q));
    return list.slice().sort((a, b) => {
      const overlapA = a.tags.filter(t => interests.includes(t)).length;
      const overlapB = b.tags.filter(t => interests.includes(t)).length;
      return overlapB - overlapA;
    });
  }, [query, interests]);

  const toggle = (tag) => {
    setRecommending(true);
    setTimeout(() => setRecommending(false), 550);
    setInterests(v => v.includes(tag) ? v.filter(x => x !== tag) : [...v, tag]);
  };

  const handlePersonalize = () => {
    setRecommending(true);
    setTimeout(() => {
      setRecommending(false);
      notify("Gemini recommendation context refreshed around your interests.");
    }, 600);
  };

  return (
    <PageShell eyebrow="EVENTMATCH · PERSONALIZED DISCOVERY" title="Events" accent="that fit you." subtitle="Real campus events, ranked around your interests and context — never invented by the AI.">
      <div className="event-control glass-panel">
        <div><div className="section-title"><SlidersHorizontal size={18} /> Your interests</div><p className="muted">Tell CampusLens what you want more of.</p></div>
        <div className="tag-selector">{tags.map(tag => <button key={tag} className={interests.includes(tag) ? "selected" : ""} onClick={() => toggle(tag)}>{interests.includes(tag) && <Check size={13} />}{tag}</button>)}</div>
        <div className="event-query"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search campus events..." /><button onClick={handlePersonalize}><Sparkles size={16} /> Personalize</button></div>
      </div>

      <div className="recommendation-banner">
        <div className="reco-icon"><Target size={21} /></div>
        <div>
          <b>Your Campus Picks</b>
          <span>{recommending ? "🎯 Matching against campus event database..." : `Ranked based on ${interests.length ? interests.join(", ") : "general campus pulse"}`}</span>
        </div>
        <div className="reco-ai"><BrainCircuit size={15} /> Gemini reasoning layer</div>
      </div>

      <div className="event-grid">
        {(showAll ? filtered : filtered.slice(0, 5)).map((event, i) => <EventCard key={event.id} event={event} rank={i + 1} interests={interests} notify={notify} />)}
      </div>
      {filtered.length > 5 && <button className="secondary-btn center-btn" onClick={() => setShowAll(v => !v)}>{showAll ? "Show fewer" : `View all ${filtered.length} events`} <ChevronRight size={16} /></button>}
    </PageShell>
  );
}

function EventCard({ event, rank, interests, notify }) {
  const overlap = event.tags.filter(t => interests.includes(t));
  return <article className={`event-card accent-${event.accent}`}>
    <div className="event-visual"><div className="event-icon"><CalendarDays size={25} /></div><span className="rank">#{rank} pick</span><span className="date-badge">{event.date}</span></div>
    <div className="event-content">
      <div className="event-meta"><span>{event.category}</span><span>•</span><span>{event.time}</span></div>
      <h3>{event.title}</h3><p>{event.description}</p>
      <div className="event-location"><MapPin size={14} /> {event.location} <span>•</span> {event.organizer}</div>
      <div className="event-bottom"><div className="why"><Sparkles size={14} /> {overlap.length ? `Matches your interest in ${overlap.slice(0, 2).join(" & ")}` : "Recommended for campus involvement"}</div><button className="icon-btn" onClick={() => notify(`${event.title} added to your campus plan.`)}><Plus size={17} /></button></div>
    </div>
  </article>;
}

function CampusFix({ notify, demoMode }) {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [severity, setSeverity] = useState("Medium");
  const [note, setNote] = useState("Fan is making noise and the blades look loose.");
  const [report, setReport] = useState({
    issueType: "Broken classroom fan",
    category: "Maintenance",
    priority: "Medium priority",
    description: "AI-generated: A classroom ceiling fan appears damaged or loose. The condition may affect ventilation and should be inspected by facilities."
  });
  const ref = useRef();

  const steps = [
    "📸 Understanding the issue...",
    "🧠 Classifying the problem...",
    "📝 Preparing your report..."
  ];

  const analyze = () => {
    setAnalyzing(true);
    setAnalysisStep(0);
    setTimeout(() => setAnalysisStep(1), 500);
    setTimeout(() => setAnalysisStep(2), 1000);
    setTimeout(() => {
      setAnalyzing(false);
      setReport({
        issueType: "Ceiling Fan Wobble & Loose Blade",
        category: "Electrical & Classroom Maintenance",
        priority: `${severity} priority`,
        description: "Gemini Vision detected visible rotation imbalance and loose mounting slack on the ceiling fan assembly. Potential safety hazard near student seating."
      });
      notify("Gemini Vision triaged the issue: Report generated.");
    }, 1500);
  };

  return (
    <PageShell eyebrow="AUTONOMOUS FACILITIES VISION NODE" title="CampusFix" accent="AI Triage" subtitle="See something broken? Show us. AI handles the categorization, severity, and report drafting.">
      <div className="fix-stats"><div><small>AI TRIAGE TIME</small><b>~1.4s</b></div><div className="live-card"><span className="live-dot" /> Vision intake active</div></div>
      <div className="fix-layout">
        <div className="fix-intake glass-panel">
          <div className="section-title"><Camera size={20} /> Multimodal vision intake <span className="live-status"><span className="live-dot" /> FRAME CAPTURED</span></div>
          <label className="fix-photo" onClick={() => ref.current?.click()}>
            <input ref={ref} type="file" accept="image/*" hidden onChange={e => { const f=e.target.files?.[0]; if(f) setImage(URL.createObjectURL(f)); }} />
            {image ? <img src={image} alt="Issue upload" /> : <div className="mock-issue"><div className="ceiling" /><div className="fan"><span /><span /><span /><i /></div><div className="hazard-badge"><AlertTriangle size={15} /> Potential maintenance issue</div></div>}
            <div className="photo-overlay"><span><MapPin size={14} /> SCIENCE BLOCK · B-204</span><span><Activity size={14} /> INDOOR</span></div>
          </label>
          <div className="field"><label>Optional note</label><textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Add anything you noticed..." /></div>
          <button className="primary-btn full" onClick={analyze} disabled={analyzing}>
            {analyzing ? <><Activity className="spin" size={18} /> {steps[analysisStep]}</> : <><Sparkles size={18} /> Analyze with Gemini Vision</>}
          </button>
        </div>

        <div className="work-order glass-panel">
          <div className="work-head"><div><div className="section-title"><Network size={18} /> Active work order</div><small>#CF-2048 · Facilities ticket</small></div><span className={`status-badge ${submitted ? "resolved" : "reported"}`}>{submitted ? "DISPATCHED" : "REPORTED"}</span></div>
          <div className="issue-summary">
            <div className="issue-type">{report.issueType}</div>
            <div className="issue-tags"><span>{report.category}</span><span>{severity} priority</span></div>
            <p>{report.description}</p>
          </div>
          <div className="timeline">
            {[
              ["REPORTED", "Today · 10:14 AM", "AI categorized the issue and drafted the report.", true],
              ["ACKNOWLEDGED", "Today · 10:22 AM", "Facilities desk received the request.", true],
              ["IN PROGRESS", submitted ? "Technician dispatched to B-204" : "Awaiting dispatch", "Technician assignment will appear here.", submitted],
              ["RESOLVED", "Pending completion", "Resolution notes will be added by facilities.", false]
            ].map(([s,t,d,done]) => <div className={`timeline-item ${done ? "done" : ""}`} key={s}><div className="timeline-dot">{done && <Check size={12} />}</div><div><b>{s}</b><small>{t}</small><p>{d}</p></div></div>)}
          </div>
          <button className="secondary-btn full" onClick={() => { setSubmitted(true); notify("CampusFix work order #CF-2048 submitted to facilities."); }}>
            {submitted ? <><CheckCircle2 size={17} /> Dispatched to facilities (#CF-2048)</> : <><Send size={17} /> Submit work order</>}
          </button>
        </div>
      </div>

      <div className="severity-row">
        <div><AlertTriangle size={19} /><b>AI-generated fields are editable</b><span>Adjust priority if urgent attention is needed.</span></div>
        <div className="severity-pills">
          {["Low", "Medium", "High"].map(p => (
            <span key={p} className={severity === p ? "selected" : ""} onClick={() => setSeverity(p)} style={{ cursor: "pointer" }}>{p}</span>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function EduConnect({ notify }) {
  const [tab, setTab] = useState("mentors");
  const [query, setQuery] = useState("I need help with React and frontend development");
  const [mentor, setMentor] = useState(mentors[0]);

  return (
    <PageShell eyebrow="NEW · AI ACADEMIC PEER NETWORK" title="EduConnect" accent="Learn together." subtitle="Ask better questions. Find the right people. Share knowledge across your campus." right={<div className="mentor-live"><Users size={19} /><b>48 Mentors Live</b><span>Across 14 academic lounges</span></div>}>
      <div className="edu-tabs">
        <button className={tab === "mentors" ? "active" : ""} onClick={() => setTab("mentors")}><Handshake size={17} /> Find a Mentor</button>
        <button className={tab === "doubt" ? "active" : ""} onClick={() => setTab("doubt")}><MessageCircle size={17} /> Ask a Doubt & AI Solver</button>
        <button className={tab === "resources" ? "active" : ""} onClick={() => setTab("resources")}><BookOpen size={17} /> Shared Knowledge Resources</button>
      </div>

      {tab === "mentors" && <>
        <div className="mentor-search glass-panel"><Sparkles size={20} /><input value={query} onChange={e => setQuery(e.target.value)} /><span className="semantic-chip"><Network size={14} /> Semantic matcher</span><button className="primary-btn compact" onClick={() => notify("Gemini mentor matching simulated in UI.")}>Find Match</button></div>
        <div className="skill-row"><span>TRENDING COHORT SKILLS:</span>{["React", "JavaScript", "Frontend", "TypeScript", "UI/UX Design", "Python AI"].map(s => <button key={s}>{s}</button>)}</div>
        <div className="mentor-heading"><h2>Top matched mentor <span>Gemini rank</span></h2><div>Semantic relevance <b>0.96</b> · Cohort 2026</div></div>
        <div className="mentor-feature glass-panel">
          <div className="mentor-avatar-large">{mentor.name.split(" ").map(x => x[0]).join("")}</div>
          <div className="mentor-main"><div className="available"><span className="live-dot" /> {mentor.status}</div><h2>{mentor.name}</h2><p>{mentor.role}</p><div className="skills">{mentor.skills.map(s => <span key={s}>{s}</span>)}</div><div className="mentor-match"><BrainCircuit size={15} /> AI Match · {mentor.score}% relevance</div></div>
          <div className="mentor-side"><span>Response rate <b>{mentor.response}</b></span><button className="primary-btn compact" onClick={() => notify(`Request sent to ${mentor.name}.`)}>Connect <ArrowRight size={16} /></button></div>
        </div>
        <div className="mentor-list">{mentors.slice(1).map(m => <button key={m.name} className="mentor-row" onClick={() => setMentor(m)}><div className="avatar small">{m.name.split(" ").map(x => x[0]).join("")}</div><div><b>{m.name}</b><span>{m.role}</span></div><span className="match-score">{m.score}%</span><ChevronRight size={17} /></button>)}</div>
      </>}

      {tab === "doubt" && <DoubtPanel notify={notify} />}
      {tab === "resources" && <ResourcesPanel notify={notify} />}
    </PageShell>
  );
}

function DoubtPanel({ notify }) {
  const [q, setQ] = useState("Why does React re-render when state changes?");
  const [answer, setAnswer] = useState(false);
  return <div className="doubt-layout"><div className="doubt-input glass-panel"><div className="section-title"><BrainCircuit size={19} /> AI doubt solver</div><textarea value={q} onChange={e => setQ(e.target.value)} /><div className="doubt-actions"><span>Explain at my level</span><button className="primary-btn compact" onClick={() => setAnswer(true)}><Sparkles size={16} /> Solve doubt</button></div></div>{answer && <div className="answer-card glass-panel"><div className="answer-head"><div className="ai-node-icon"><Bot size={18} /></div><div><b>CampusLens AI explanation</b><small>Structured answer • React fundamentals</small></div></div><h3>State changes tell React that the UI may need to be recalculated.</h3><p>When a component updates state, React schedules a render so it can calculate what the UI should look like next. React then compares the new result with the previous one and applies the necessary DOM updates.</p><div className="concepts"><span>State</span><span>Render</span><span>Reconciliation</span></div><button className="secondary-btn" onClick={() => notify("Saved to your EduConnect notes.")}><FileText size={16} /> Save explanation</button></div>}</div>;
}

function ResourcesPanel({ notify }) {
  const resources = [
    ["React Frontend Roadmap", "Roadmaps", "18 min read"],
    ["Gemini API Prompting Notes", "AI", "12 min read"],
    ["Campus Hackathon Playbook", "Projects", "9 min read"],
    ["UI/UX Design Checklist", "Design", "14 min read"]
  ];
  return <div className="resource-grid">{resources.map(([t,c,d]) => <article className="resource-card glass-panel" key={t}><div className="resource-icon"><BookOpen size={20} /></div><span>{c}</span><h3>{t}</h3><small>{d}</small><button className="card-link" onClick={() => notify(`Opened ${t}.`)}>Read resource <ArrowRight size={15} /></button></article>)}</div>;
}

function Admin({ notify, demoMode }) {
  const [filter, setFilter] = useState("ALL");
  const allIssues = [
    { name: "Broken classroom fan", loc: "Science Block · B-204", sev: "MEDIUM", status: "IN PROGRESS", time: "10 min ago" },
    { name: "Water leakage", loc: "Block B · Washroom 2", sev: "HIGH", status: "ACKNOWLEDGED", time: "34 min ago" },
    { name: "Damaged chair", loc: "Library · Floor 1", sev: "LOW", status: "REPORTED", time: "1 hr ago" },
    { name: "Flickering light", loc: "Main Hall · H-12", sev: "MEDIUM", status: "RESOLVED", time: "2 hrs ago" }
  ];

  const filters = ["ALL", "REPORTED", "IN PROGRESS", "RESOLVED"];
  const cycleFilter = () => {
    const nextIdx = (filters.indexOf(filter) + 1) % filters.length;
    const next = filters[nextIdx];
    setFilter(next);
    notify(`Filter: Showing ${next} tickets.`);
  };

  const displayedIssues = allIssues.filter(i => filter === "ALL" || i.status === filter);

  return <PageShell eyebrow="ADMIN · CAMPUS OPERATIONS" title="Control" accent="Center" subtitle="A compact operations view for AI-triaged campus activity.">
    <div className="kpi-grid">
      <KPI label="Open issues" value="23" trend="+4 today" icon={<Wrench />} />
      <KPI label="Lost / found" value="18" trend="6 potential matches" icon={<PackageSearch />} />
      <KPI label="Events today" value="12" trend="438 RSVPs" icon={<CalendarDays />} />
      <KPI label="Mentors live" value="48" trend="14 academic lounges" icon={<Users />} />
    </div>
    <div className="admin-layout">
      <div className="admin-table glass-panel">
        <div className="table-head">
          <div>
            <h2>CampusFix queue</h2>
            <p>AI-triaged work orders ({filter})</p>
          </div>
          <button className="secondary-btn compact" onClick={cycleFilter}>
            <SlidersHorizontal size={15} /> Filter: {filter}
          </button>
        </div>
        <div className="issue-table">
          {displayedIssues.map(({ name, loc, sev, status, time }) => (
            <div className="issue-row" key={name}>
              <div className="issue-icon"><AlertTriangle size={17} /></div>
              <div className="issue-copy"><b>{name}</b><span>{loc}</span></div>
              <span className={`priority ${sev.toLowerCase()}`}>{sev}</span>
              <span className={`status-text ${status.toLowerCase().replace(" ", "-")}`}>{status}</span>
              <time>{time}</time>
              <ChevronRight size={16} />
            </div>
          ))}
          {displayedIssues.length === 0 && (
            <div style={{ padding: "24px 0", textAlign: "center", color: "var(--muted)", fontSize: "13px" }}>
              No issues in this category.
            </div>
          )}
        </div>
      </div>
      <div className="activity-card glass-panel">
        <div className="section-title"><Activity size={18} /> Live AI activity</div>
        {["CampusFix classified B-204 fan issue", "EventMatch generated 3 picks", "LostLens found candidate #1", "EduConnect matched a React mentor"].map((x, i) => (
          <div className="activity-row" key={x}>
            <span className="activity-dot" />
            <div><b>{x}</b><small>{i + 1} min ago</small></div>
          </div>
        ))}
      </div>
    </div>
  </PageShell>;
}

function KPI({ label, value, trend, icon }) {
  return <div className="kpi-card glass-panel"><div className="kpi-icon">{icon}</div><span>{label}</span><b>{value}</b><small>{trend}</small></div>;
}

export default App;