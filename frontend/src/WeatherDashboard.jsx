import { useState, useEffect, useRef } from "react";

// ─── Tiny SVG Icon Components ────────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor", fill = "none", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const icons = {
  sun: "M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z",
  cloud: "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z",
  rain: ["M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25", "M8 19v1M8 23v1M12 21v1M12 25v1M16 19v1M16 23v1"],
  wind: ["M9.59 4.59A2 2 0 1 1 11 8H2", "M12.59 19.41A2 2 0 1 0 11 16H2", "M6.34 13.34A4 4 0 1 1 8 20H2"],
  droplets: ["M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"],
  thermometer: ["M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"],
  uv: ["M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
  sunrise: ["M17 18a5 5 0 0 0-10 0", "M12 9V2", "M4.22 10.22l1.42 1.42", "M1 18h2", "M21 18h2", "M18.36 11.64l1.42-1.42", "M23 22H1", "M8 6l4-4 4 4"],
  leaf: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z",
  alert: ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4", "M12 17h.01"],
  bug: ["M8 2l1.88 1.88", "M14.12 3.88L16 2", "M9 7.13v-1a3.003 3.003 0 1 1 6 0v1", "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z", "M16 13h6", "M2 13h6", "M12 20v-3"],
  fire: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
  soil: ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"],
  irrigate: ["M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z", "M12 6v6l4 2"],
  x: "M18 6 6 18M6 6l12 12",
  chevronRight: "M9 18l6-6-6-6",
  tractor: ["M3 4h9l1 7H3z", "M15 4h1l2 7h-3z", "M7 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", "M17 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", "M5 11H2v4h1"],
  map: ["M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z", "M8 2v16", "M16 6v16"],
  bell: ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  arrowUp: "M12 19V5M5 12l7-7 7 7",
};

// ─── Animated Weather Icon ───────────────────────────────────────────────────
const AnimatedSun = () => (
  <div style={{ position: "relative", width: 72, height: 72 }}>
    <style>{`
      @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes pulse { 0%,100% { opacity:0.7; transform:scale(1); } 50% { opacity:1; transform:scale(1.08); } }
      @keyframes rainDrop { 0% { transform: translateY(-8px); opacity: 0; } 60% { opacity: 1; } 100% { transform: translateY(14px); opacity: 0; } }
      @keyframes cloudFloat { 0%,100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
      @keyframes glowPulse { 0%,100% { box-shadow: 0 0 20px rgba(251,191,36,0.4); } 50% { box-shadow: 0 0 40px rgba(251,191,36,0.8); } }
    `}</style>
    <div style={{ animation: "glowPulse 2.5s ease-in-out infinite", borderRadius: "50%", width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)" }}>
      <div style={{ animation: "spinSlow 12s linear infinite", color: "#FCD34D" }}>
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" fill="rgba(251,191,36,0.35)" />
          <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </div>
    </div>
  </div>
);

// ─── Floating Rain Particles ─────────────────────────────────────────────────
const RainEffect = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "inherit", pointerEvents: "none", zIndex: 0 }}>
    {[...Array(18)].map((_, i) => (
      <div key={i} style={{
        position: "absolute",
        width: 1.5,
        height: Math.random() * 14 + 8,
        background: "linear-gradient(to bottom, transparent, rgba(147,210,255,0.5))",
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `rainDrop ${Math.random() * 1.5 + 1}s linear infinite`,
        animationDelay: `${Math.random() * 2}s`,
        borderRadius: 4,
      }} />
    ))}
  </div>
);

// ─── Soil Moisture Ring ──────────────────────────────────────────────────────
const SoilRing = ({ pct = 62 }) => {
  const r = 22, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
      <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
        <circle cx="32" cy="32" r={r} fill="none" stroke="url(#soilGrad)" strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
        <defs>
          <linearGradient id="soilGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ADE80" /><stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>{pct}%</span>
      </div>
    </div>
  );
};

// ─── Data ────────────────────────────────────────────────────────────────────
const hourlyData = [
  { time: "Now", temp: 24, icon: "sun", rain: 5 },
  { time: "2PM", temp: 26, icon: "sun", rain: 0 },
  { time: "4PM", temp: 25, icon: "cloud", rain: 15 },
  { time: "6PM", temp: 22, icon: "cloud", rain: 40 },
  { time: "8PM", temp: 20, icon: "rain", rain: 70 },
  { time: "10PM", temp: 18, icon: "rain", rain: 85 },
  { time: "12AM", temp: 17, icon: "rain", rain: 60 },
  { time: "2AM", temp: 16, icon: "cloud", rain: 30 },
];

const weeklyData = [
  { day: "Mon", hi: 27, lo: 17, icon: "sun", rain: 5 },
  { day: "Tue", hi: 24, lo: 16, icon: "rain", rain: 75 },
  { day: "Wed", hi: 22, lo: 15, icon: "cloud", rain: 40 },
  { day: "Thu", hi: 28, lo: 19, icon: "sun", rain: 0 },
  { day: "Fri", hi: 30, lo: 20, icon: "sun", rain: 0 },
  { day: "Sat", hi: 25, lo: 17, icon: "cloud", rain: 25 },
  { day: "Sun", hi: 23, lo: 16, icon: "rain", rain: 60 },
];

const alertsData = [
  {
    id: 1, type: "rain", icon: "rain", title: "Heavy Rain Alert",
    titleHi: "भारी वर्षा चेतावनी",
    desc: "70mm+ rainfall expected 8–11PM tonight. Protect harvested crops immediately.",
    descHi: "आज रात 8–11 बजे तक 70mm+ बारिश संभव। फसल सुरक्षित करें।",
    severity: "High", color: "#3B82F6", bg: "rgba(59,130,246,0.12)",
    border: "#3B82F6", cta: "View Details", time: "10 min ago"
  },
  {
    id: 2, type: "pest", icon: "bug", title: "Pest Attack Risk",
    titleHi: "कीट हमले का खतरा",
    desc: "Aphid infestation probability 82% in wheat fields. Apply neem-based pesticide.",
    descHi: "गेहूं के खेतों में 82% कीट संक्रमण संभव। नीम आधारित कीटनाशक लगाएं।",
    severity: "Critical", color: "#EF4444", bg: "rgba(239,68,68,0.12)",
    border: "#EF4444", cta: "Take Action", time: "25 min ago"
  },
  {
    id: 3, type: "heat", icon: "fire", title: "High Temperature Warning",
    titleHi: "उच्च तापमान चेतावनी",
    desc: "38°C expected Friday. Irrigate before 7AM or after 6PM to prevent crop stress.",
    descHi: "शुक्रवार को 38°C। सुबह 7 बजे से पहले या शाम 6 बजे के बाद सिंचाई करें।",
    severity: "High", color: "#F97316", bg: "rgba(249,115,22,0.12)",
    border: "#F97316", cta: "View Details", time: "1 hr ago"
  },
  {
    id: 4, type: "moisture", icon: "soil", title: "Low Soil Moisture",
    titleHi: "मिट्टी में नमी की कमी",
    desc: "Field Block-3 soil moisture at 28%. Immediate drip irrigation recommended.",
    descHi: "ब्लॉक-3 में नमी 28% पर है। तत्काल ड्रिप सिंचाई करें।",
    severity: "Medium", color: "#EAB308", bg: "rgba(234,179,8,0.12)",
    border: "#EAB308", cta: "Take Action", time: "2 hr ago"
  },
  {
    id: 5, type: "wind", icon: "wind", title: "Strong Wind Alert",
    titleHi: "तेज़ हवा की चेतावनी",
    desc: "55km/h gusts expected at 3PM. Secure greenhouse covers and tall crops.",
    descHi: "दोपहर 3 बजे 55km/h की तेज हवाएं संभव। ग्रीनहाउस और फसल सुरक्षित करें।",
    severity: "Medium", color: "#8B5CF6", bg: "rgba(139,92,246,0.12)",
    border: "#8B5CF6", cta: "View Details", time: "3 hr ago"
  },
  {
    id: 6, type: "irrigate", icon: "irrigate", title: "Irrigation Reminder",
    titleHi: "सिंचाई अनुस्मारक",
    desc: "Tomato Block-2 due for irrigation. Optimal window: tonight 9–10PM.",
    descHi: "टमाटर ब्लॉक-2 की सिंचाई का समय। आज रात 9–10 बजे सही समय है।",
    severity: "Low", color: "#22C55E", bg: "rgba(34,197,94,0.12)",
    border: "#22C55E", cta: "Schedule", time: "4 hr ago"
  },
];

const severityStyle = {
  "Low": { bg: "rgba(34,197,94,0.2)", color: "#4ADE80" },
  "Medium": { bg: "rgba(234,179,8,0.2)", color: "#FCD34D" },
  "High": { bg: "rgba(249,115,22,0.2)", color: "#FB923C" },
  "Critical": { bg: "rgba(239,68,68,0.25)", color: "#F87171" },
};

const iconColor = { sun: "#FCD34D", cloud: "#94A3B8", rain: "#60A5FA", wind: "#A78BFA", bug: "#F87171", fire: "#FB923C", soil: "#A16207", irrigate: "#34D399" };

// ─── Main Component ──────────────────────────────────────────────────────────
export default function AgroTechDashboard() {
  const [dismissed, setDismissed] = useState([]);
  const [bilingual, setBilingual] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [tick, setTick] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 3000);
    return () => clearInterval(t);
  }, []);

  const alerts = alertsData.filter(a => !dismissed.includes(a.id));

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0A1A0E; }
    ::-webkit-scrollbar { height: 4px; width: 4px; }
    ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
    @keyframes spinSlow { from{transform:rotate(0)} to{transform:rotate(360deg)} }
    @keyframes pulse { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
    @keyframes rainDrop { 0%{transform:translateY(-8px);opacity:0} 60%{opacity:1} 100%{transform:translateY(14px);opacity:0} }
    @keyframes glowPulse { 0%,100%{filter:drop-shadow(0 0 8px rgba(251,191,36,.4))} 50%{filter:drop-shadow(0 0 20px rgba(251,191,36,.9))} }
    @keyframes slideUp { from{transform:translateY(24px);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
    @keyframes waveGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
    .card-hover { transition: transform 0.22s ease, box-shadow 0.22s ease; }
    .card-hover:hover { transform: translateY(-2px); box-shadow: 0 20px 60px rgba(0,0,0,0.5) !important; }
    .btn-press { transition: transform 0.12s ease, opacity 0.12s ease; }
    .btn-press:active { transform: scale(0.95); opacity: 0.85; }
    .alert-slide { animation: slideUp 0.4s ease forwards; }
    .sun-glow { animation: glowPulse 2.5s ease-in-out infinite; }
    .float-anim { animation: float 4s ease-in-out infinite; }
  `;

  const glass = {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
  };

  return (
    <>
      <style>{css}</style>
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0A1A0E 0%, #0D2010 40%, #1A1205 70%, #0A0F0A 100%)",
        fontFamily: "'DM Sans', sans-serif",
        color: "#F0FDF4",
        overflowX: "hidden",
      }}>
        {/* Ambient background orbs */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,83,45,0.25) 0%, transparent 70%)", top: -100, left: -100 }} />
          <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(120,53,15,0.15) 0%, transparent 70%)", bottom: 200, right: -80 }} />
          <div style={{ position: "absolute", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,78,59,0.2) 0%, transparent 70%)", top: "50%", left: "40%" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 430, margin: "0 auto", padding: "0 0 40px" }}>

          {/* ── Header ── */}
          <div style={{ padding: "52px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, background: "linear-gradient(135deg, #86EFAC, #FCD34D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AgroTech</span>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px #4ADE80", animation: "pulse 2s ease-in-out infinite" }} />
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>Smart Farming Intelligence</div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button
                className="btn-press"
                onClick={() => setBilingual(!bilingual)}
                style={{ ...glass, borderRadius: 12, padding: "6px 12px", fontSize: 11, fontWeight: 600, color: bilingual ? "#FCD34D" : "rgba(255,255,255,0.5)", cursor: "pointer", border: bilingual ? "1px solid rgba(252,211,77,0.4)" : "1px solid rgba(255,255,255,0.08)", letterSpacing: "0.05em" }}
              >
                {bilingual ? "EN | हि" : "EN | हि"}
              </button>
              <div style={{ ...glass, borderRadius: 12, padding: 8, position: "relative", cursor: "pointer" }}>
                <Icon d={icons.bell} size={18} color="rgba(255,255,255,0.6)" />
                <div style={{ position: "absolute", top: 6, right: 6, width: 7, height: 7, borderRadius: "50%", background: "#EF4444", border: "1.5px solid #0A1A0E" }} />
              </div>
            </div>
          </div>

          {/* ── Main Weather Card ── */}
          <div style={{ margin: "0 16px", marginBottom: 16 }}>
            <div className="card-hover" style={{
              borderRadius: 24,
              background: "linear-gradient(145deg, rgba(20,83,45,0.7) 0%, rgba(10,25,14,0.85) 50%, rgba(30,18,5,0.7) 100%)",
              border: "1px solid rgba(134,239,172,0.15)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(134,239,172,0.1)",
              overflow: "hidden",
              position: "relative",
              backdropFilter: "blur(30px)",
            }}>
              <RainEffect />

              {/* Top section */}
              <div style={{ padding: "28px 24px 0", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <Icon d={icons.map} size={13} color="rgba(134,239,172,0.6)" />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Nashik, Maharashtra</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
                      <span style={{ fontSize: 76, fontWeight: 300, lineHeight: 1, letterSpacing: "-4px", background: "linear-gradient(160deg, #ffffff 60%, rgba(134,239,172,0.7) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>24</span>
                      <span style={{ fontSize: 28, fontWeight: 300, marginTop: 12, color: "rgba(255,255,255,0.6)" }}>°C</span>
                    </div>
                    <div style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginTop: 4, fontWeight: 400 }}>Partly Cloudy · Feels 26°C</div>
                  </div>
                  <div className="float-anim" style={{ marginTop: 8 }}>
                    <AnimatedSun />
                  </div>
                </div>

                {/* Metrics row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 20 }}>
                  {[
                    { icon: icons.droplets, label: "Humidity", value: "68%", color: "#60A5FA" },
                    { icon: icons.wind, label: "Wind", value: "12km/h", color: "#A78BFA" },
                    { icon: icons.rain, label: "Rain", value: "45%", color: "#38BDF8" },
                    { icon: icons.uv, label: "UV Index", value: "5 Mod", color: "#FCD34D" },
                  ].map((m, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "10px 8px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ color: m.color, display: "flex", justifyContent: "center", marginBottom: 5 }}>
                        <Icon d={m.icon} size={15} color={m.color} />
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "-0.3px" }}>{m.value}</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 1, fontWeight: 500 }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Sunrise/Sunset */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, padding: "12px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ color: "#FCD34D" }}><Icon d={icons.sunrise} size={16} color="#FCD34D" /></div>
                    <div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>SUNRISE</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>06:12 AM</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontWeight: 500, textAlign: "right" }}>SUNSET</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>18:45 PM</div>
                    </div>
                    <div style={{ color: "#FB923C" }}><Icon d={icons.sunrise} size={16} color="#FB923C" /></div>
                  </div>
                </div>
                <div style={{ height: 24 }} />
              </div>
            </div>
          </div>
          
          {/* Smart Alerts */}
          <div style={{ margin: "0 16px 20px" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Smart Alerts</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {alerts.map(a => (
                <div key={a.id} className="alert-slide card-hover" style={{ background: a.bg, border: \`1px solid \${a.border}\`, borderRadius: 16, padding: 16, display: "flex", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon d={a.icon} color={a.color} size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: a.color }}>{bilingual ? a.titleHi : a.title}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{a.time}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.4, marginBottom: 8 }}>
                      {bilingual ? a.descHi : a.desc}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ background: a.color, color: "#fff", border: "none", padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{a.cta}</button>
                      <button onClick={() => setDismissed(d => [...d, a.id])} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Dismiss</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
