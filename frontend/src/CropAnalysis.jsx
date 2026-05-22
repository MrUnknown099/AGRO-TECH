import { useState, useEffect, useRef } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  en: {
    appName: "ArgoTech",
    tagline: "Precision Agriculture Intelligence",
    dashboard: "Dashboard", weather: "Weather", cropAnalysis: "Crop Analysis",
    diseaseDetection: "Disease Detection", aiAssistant: "AI Assistant",
    marketplace: "Marketplace", reports: "Reports", settings: "Settings",
    cropHealth: "Crop Health Overview", soilMoisture: "Soil Moisture",
    temperature: "Temperature", humidity: "Humidity", nutrientLevel: "Nutrient Level",
    irrigationStatus: "Irrigation Status", pestRisk: "Pest Risk", diseaseRisk: "Disease Risk",
    overallHealth: "Overall Crop Health", healthy: "Healthy", warning: "Warning", critical: "Critical",
    aiAnalysis: "AI Crop Analysis", yieldPrediction: "Yield Prediction",
    growthStage: "Growth Stage", recommendedActions: "Recommended Actions",
    viewFullAnalysis: "View Full Analysis", farmMap: "Live Farm Map",
    sensorData: "Live Sensor Data", soilPH: "Soil pH", rainProbability: "Rain Probability",
    sunlightIntensity: "Sunlight Intensity", waterUsage: "Water Usage", lastUpdated: "Last updated",
    diseaseAlerts: "Disease Detection & Alerts", confidence: "Confidence",
    severity: "Severity", affectedArea: "Affected Area", treatment: "Suggested Treatment",
    uploadImage: "Upload Crop Image", scanAgain: "Scan Again",
    weatherIntel: "Weather Intelligence", farmingSuitability: "Farming Suitability",
    uvIndex: "UV Index", windSpeed: "Wind Speed", yieldAnalytics: "Yield Analytics",
    expectedYield: "Expected Yield", monthlyGrowth: "Monthly Growth",
    waterConsumption: "Water Consumption", fertilizerUsage: "Fertilizer Usage",
    recommendations: "Smart Recommendations", weekly: "Weekly", monthly: "Monthly", seasonal: "Seasonal",
    notifications: "Notifications", searchPlaceholder: "Search fields, crops, reports…",
    goodMorning: "Good Morning", location: "Dehradun, Uttarakhand",
    sector: "Sector", zoom: "Zoom", satellite: "Satellite", heatmap: "Heatmap",
    bookmark: "Bookmark", priority: "Priority", high: "High", medium: "Medium", low: "Low",
    exportReport: "Export Report", voiceAssistant: "Voice Assistant",
    offline: "Online", synced: "Synced",
    increaseIrrigation: "Increase irrigation in Sector B",
    fungalInfection: "Possible fungal infection detected",
    nitrogenLow: "Nitrogen level is low — apply fertilizer",
    harvestReady: "Wheat in Sector A ready for harvest",
    pestAlert: "Aphid activity detected in Sector C",
    aiSummary: "Crops show strong health overall. Wheat is near harvest-ready. Monitor Sector B for moisture deficit and check Sector C for early-stage pest activity.",
    predictedCondition: "Good — Minor Risks",
    growthStageVal: "Late Vegetative (Week 11/16)",
    irrigationTip: "Reduce irrigation by 15% — soil moisture adequate",
    fertTip: "Apply Nitrogen-rich fertilizer to Sector B within 48h",
    pestTip: "Spray neem-based pesticide in Sector C immediately",
    harvestTip: "Begin wheat harvest in Sector A within 5–7 days",
  },
  hi: {
    appName: "ArgoTech",
    tagline: "सटीक कृषि बुद्धिमत्ता",
    dashboard: "डैशबोर्ड", weather: "मौसम", cropAnalysis: "फसल विश्लेषण",
    diseaseDetection: "रोग पहचान", aiAssistant: "AI सहायक",
    marketplace: "बाज़ार", reports: "रिपोर्ट", settings: "सेटिंग्स",
    cropHealth: "फसल स्वास्थ्य अवलोकन", soilMoisture: "मिट्टी नमी",
    temperature: "तापमान", humidity: "आर्द्रता", nutrientLevel: "पोषक स्तर",
    irrigationStatus: "सिंचाई स्थिति", pestRisk: "कीट जोखिम", diseaseRisk: "रोग जोखिम",
    overallHealth: "समग्र फसल स्वास्थ्य", healthy: "स्वस्थ", warning: "चेतावनी", critical: "गंभीर",
    aiAnalysis: "AI फसल विश्लेषण", yieldPrediction: "उपज पूर्वानुमान",
    growthStage: "विकास चरण", recommendedActions: "अनुशंसित कार्य",
    viewFullAnalysis: "पूरा विश्लेषण देखें", farmMap: "लाइव फार्म मानचित्र",
    sensorData: "लाइव सेंसर डेटा", soilPH: "मिट्टी pH", rainProbability: "वर्षा संभावना",
    sunlightIntensity: "सूर्यप्रकाश तीव्रता", waterUsage: "जल उपयोग", lastUpdated: "अंतिम अपडेट",
    diseaseAlerts: "रोग पहचान और अलर्ट", confidence: "विश्वास",
    severity: "गंभीरता", affectedArea: "प्रभावित क्षेत्र", treatment: "सुझाया उपचार",
    uploadImage: "फसल छवि अपलोड करें", scanAgain: "फिर स्कैन करें",
    weatherIntel: "मौसम बुद्धिमत्ता", farmingSuitability: "खेती उपयुक्तता",
    uvIndex: "UV सूचकांक", windSpeed: "हवा गति", yieldAnalytics: "उपज विश्लेषण",
    expectedYield: "अपेक्षित उपज", monthlyGrowth: "मासिक वृद्धि",
    waterConsumption: "जल खपत", fertilizerUsage: "उर्वरक उपयोग",
    recommendations: "स्मार्ट सिफारिशें", weekly: "साप्ताहिक", monthly: "मासिक", seasonal: "मौसमी",
    notifications: "सूचनाएं", searchPlaceholder: "खेत, फसल, रिपोर्ट खोजें…",
    goodMorning: "सुप्रभात", location: "देहरादून, उत्तराखंड",
    sector: "सेक्टर", zoom: "ज़ूम", satellite: "उपग्रह", heatmap: "हीटमैप",
    bookmark: "बुकमार्क", priority: "प्राथमिकता", high: "उच्च", medium: "मध्यम", low: "कम",
    exportReport: "रिपोर्ट निर्यात करें", voiceAssistant: "वॉयस असिस्टेंट",
    offline: "ऑनलाइन", synced: "समन्वयित",
    increaseIrrigation: "सेक्टर B में सिंचाई बढ़ाएं",
    fungalInfection: "फंगल संक्रमण संभव",
    nitrogenLow: "नाइट्रोजन कम — खाद डालें",
    harvestReady: "सेक्टर A में गेहूं कटाई के लिए तैयार",
    pestAlert: "सेक्टर C में कीट गतिविधि",
    aiSummary: "फसलें समग्र रूप से स्वस्थ हैं। गेहूं कटाई के करीब है। सेक्टर B में नमी की कमी और सेक्टर C में कीट गतिविधि पर ध्यान दें।",
    predictedCondition: "अच्छा — मामूली जोखिम",
    growthStageVal: "देर वनस्पति (सप्ताह 11/16)",
    irrigationTip: "सिंचाई 15% कम करें — मिट्टी नमी पर्याप्त है",
    fertTip: "48 घंटे में सेक्टर B में नाइट्रोजन खाद डालें",
    pestTip: "सेक्टर C में तुरंत नीम कीटनाशक छिड़कें",
    harvestTip: "5–7 दिनों में सेक्टर A में गेहूं कटाई शुरू करें",
  }
};

// ─── SPARKLINE ────────────────────────────────────────────────────────────────
function Sparkline({ data, color, height = 28 }) {
  const max = Math.max(...data), min = Math.min(...data);
  const w = 60, h = height;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/>
    </svg>
  );
}

// ─── RING CHART ───────────────────────────────────────────────────────────────
function RingChart({ pct, color, size = 44 }) {
  const r = 16, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox="0 0 44 44">
      <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4"/>
      <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={`${(pct / 100) * c} ${c}`}
        strokeDashoffset={c * 0.25}
        strokeLinecap="round" style={{ transition: "stroke-dasharray 1s ease" }}/>
      <text x="22" y="26" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="'Sora',sans-serif">{pct}%</text>
    </svg>
  );
}

// ─── BAR CHART ────────────────────────────────────────────────────────────────
function MiniBarChart({ data, color }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 40 }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: 2 }}>
          <div style={{ width: "100%", background: color, borderRadius: "3px 3px 0 0", height: `${(d.v / max) * 34}px`, opacity: i === data.length - 1 ? 1 : 0.5, transition: "height 0.6s ease" }}/>
          <span style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", fontFamily: "'Sora',sans-serif" }}>{d.l}</span>
        </div>
      ))}
    </div>
  );
}

// ─── ANIMATED LINE ────────────────────────────────────────────────────────────
function LineGraph({ data, color, labels }) {
  const w = 280, h = 60;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 8) - 4;
    return `${x},${y}`;
  }).join(" ");
  const area = `0,${h} ` + data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 8) - 4;
    return `${x},${y}`;
  }).join(" ") + ` ${w},${h}`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`lg${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#lg${color.replace("#","")})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / (max - min || 1)) * (h - 8) - 4;
        return <circle key={i} cx={x} cy={y} r="3" fill={color} stroke="#0d1a0f" strokeWidth="1.5"/>;
      })}
    </svg>
  );
}

// ─── FARM MAP SVG ─────────────────────────────────────────────────────────────
function FarmMapSVG({ activeLayer, t }) {
  const sectors = [
    { id: "A", x: 14, y: 14, w: 110, h: 90, crop: "Wheat 🌾", health: 88, color: "#4A7C59", status: "healthy" },
    { id: "B", x: 136, y: 14, w: 80, h: 55, crop: "Corn 🌽", health: 62, color: "#C8A84B", status: "warning" },
    { id: "C", x: 228, y: 14, w: 58, h: 55, crop: "Carrots 🥕", health: 45, color: "#C46A3E", status: "critical" },
    { id: "D", x: 136, y: 82, w: 150, h: 60, crop: "Soybeans 🫘", health: 79, color: "#2E6B3E", status: "healthy" },
  ];
  const getColor = (s) => {
    if (activeLayer === "health") return s.status === "healthy" ? "#4ade80" : s.status === "warning" ? "#facc15" : "#f87171";
    if (activeLayer === "moisture") return s.health > 70 ? "#60a5fa" : s.health > 50 ? "#93c5fd" : "#bfdbfe";
    return s.color;
  };
  const sensors = [{ x: 60, y: 55 }, { x: 170, y: 38 }, { x: 250, y: 38 }, { x: 200, y: 105 }];
  return (
    <svg viewBox="0 0 300 160" width="100%" style={{ borderRadius: 10, overflow: "hidden" }}>
      <rect width="300" height="160" fill="#0a1f0d" rx="10"/>
      {/* Grid */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1={i * 40} y1={0} x2={i * 40} y2={160} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} x1={0} y1={i * 40} x2={300} y2={i * 40} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      ))}
      {sectors.map((s) => (
        <g key={s.id}>
          <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="6"
            fill={getColor(s)} opacity={activeLayer === "satellite" ? 0.7 : 0.55}
            stroke={getColor(s)} strokeWidth="1.5" strokeOpacity="0.8"/>
          <text x={s.x + s.w / 2} y={s.y + s.h / 2 - 8} textAnchor="middle"
            fontSize="10" fontWeight="700" fill="white" fontFamily="'Sora',sans-serif">
            {t.sector} {s.id}
          </text>
          <text x={s.x + s.w / 2} y={s.y + s.h / 2 + 5} textAnchor="middle"
            fontSize="8" fill="rgba(255,255,255,0.8)" fontFamily="'Sora',sans-serif">{s.crop}</text>
          <text x={s.x + s.w / 2} y={s.y + s.h / 2 + 16} textAnchor="middle"
            fontSize="8" fill="rgba(255,255,255,0.65)" fontFamily="'Sora',sans-serif">{s.health}%</text>
        </g>
      ))}
      {/* Sensors */}
      {sensors.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="5" fill="rgba(200,168,75,0.9)" stroke="#fff" strokeWidth="1"/>
          <circle cx={s.x} cy={s.y} r="9" fill="none" stroke="rgba(200,168,75,0.3)" strokeWidth="1">
            <animate attributeName="r" values="5;12;5" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>
        </g>
      ))}
      {/* Disease zone */}
      <ellipse cx="250" cy="38" rx="22" ry="18" fill="rgba(248,113,113,0.25)" stroke="#f87171" strokeWidth="1" strokeDasharray="3,2">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
      </ellipse>
    </svg>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function CropAnalysis() {
  const [lang, setLang] = useState("en");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [activeFilter, setActiveFilter] = useState("monthly");
  const [mapLayer, setMapLayer] = useState("health");
  const [aiExpanded, setAiExpanded] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", text: "Hello! I'm ArgoTech AI. How can I help you optimize your farm today?" }
  ]);
  const [ticker, setTicker] = useState(0);
  const [voiceActive, setVoiceActive] = useState(false);
  const t = T[lang];

  // Live-updating sensor values
  const [sensors, setSensors] = useState({
    ph: 6.8, moisture: 67, temp: 28, rain: 22, sun: 78, water: 340
  });

  useEffect(() => {
    const id = setInterval(() => {
      setSensors(s => ({
        ph: +(s.ph + (Math.random() - 0.5) * 0.05).toFixed(2),
        moisture: Math.min(100, Math.max(0, s.moisture + (Math.random() - 0.5) * 2)),
        temp: +(s.temp + (Math.random() - 0.5) * 0.3).toFixed(1),
        rain: Math.min(100, Math.max(0, s.rain + (Math.random() - 0.5) * 3)),
        sun: Math.min(100, Math.max(0, s.sun + (Math.random() - 0.5) * 4)),
        water: Math.max(0, s.water + (Math.random() - 0.5) * 5),
      }));
      setTicker(x => x + 1);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const msg = chatMsg;
    setChatMsg("");
    setChatHistory(h => [...h, { role: "user", text: msg }]);
    setTimeout(() => {
      const replies = [
        "Based on your sensor data, Sector B needs irrigation within 24 hours.",
        "Wheat in Sector A looks ready. I'd recommend harvesting in 5–7 days.",
        "Soil pH in Sector C is slightly acidic. Consider lime application.",
        "Weather forecast shows light rain tomorrow — hold off on irrigation.",
      ];
      setChatHistory(h => [...h, { role: "ai", text: replies[Math.floor(Math.random() * replies.length)] }]);
    }, 800);
  };

  // ── Health cards data
  const healthCards = [
    { label: t.overallHealth, val: 76, unit: "%", icon: "🌿", status: "healthy", color: "#4ade80", trend: [68, 70, 72, 74, 73, 76], sparkColor: "#4ade80" },
    { label: t.soilMoisture, val: Math.round(sensors.moisture), unit: "%", icon: "💧", status: sensors.moisture < 40 ? "critical" : sensors.moisture < 55 ? "warning" : "healthy", color: "#60a5fa", trend: [58, 62, 65, 67, 64, Math.round(sensors.moisture)], sparkColor: "#60a5fa" },
    { label: t.temperature, val: sensors.temp.toFixed(1), unit: "°C", icon: "🌡️", status: sensors.temp > 35 ? "critical" : sensors.temp > 30 ? "warning" : "healthy", color: "#fb923c", trend: [26, 27, 28, 29, 27, sensors.temp], sparkColor: "#fb923c" },
    { label: t.humidity, val: Math.round(sensors.rain), unit: "%", icon: "🌫️", status: "healthy", color: "#a78bfa", trend: [18, 20, 22, 21, 22, Math.round(sensors.rain)], sparkColor: "#a78bfa" },
    { label: t.nutrientLevel, val: 58, unit: "%", icon: "🧪", status: "warning", color: "#facc15", trend: [65, 63, 60, 58, 57, 58], sparkColor: "#facc15" },
    { label: t.irrigationStatus, val: 82, unit: "%", icon: "🚿", status: "healthy", color: "#34d399", trend: [75, 78, 80, 82, 81, 82], sparkColor: "#34d399" },
    { label: t.pestRisk, val: 34, unit: "%", icon: "🐛", status: "warning", color: "#f97316", trend: [20, 22, 28, 30, 32, 34], sparkColor: "#f97316" },
    { label: t.diseaseRisk, val: 18, unit: "%", icon: "🦠", status: "healthy", color: "#4ade80", trend: [22, 20, 19, 18, 17, 18], sparkColor: "#4ade80" },
  ];

  const statusColor = { healthy: "#4ade80", warning: "#facc15", critical: "#f87171" };
  const statusLabel = { healthy: t.healthy, warning: t.warning, critical: t.critical };

  const recommendations = [
    { icon: "💧", text: t.increaseIrrigation, priority: "high", pinned: false, cat: "Irrigation" },
    { icon: "🦠", text: t.fungalInfection, priority: "high", pinned: true, cat: "Disease" },
    { icon: "🧪", text: t.nitrogenLow, priority: "medium", pinned: false, cat: "Nutrition" },
    { icon: "🌾", text: t.harvestReady, priority: "high", pinned: false, cat: "Harvest" },
    { icon: "🐛", text: t.pestAlert, priority: "medium", pinned: false, cat: "Pest" },
    { icon: "☀️", text: lang === "en" ? "UV levels high — reduce sun exposure for seedlings" : "UV स्तर उच्च — पौधों को धूप से बचाएं", priority: "low", pinned: false, cat: "Weather" },
  ];

  const yieldData = {
    monthly: [
      { l: "Jan", v: 3.2 }, { l: "Feb", v: 3.8 }, { l: "Mar", v: 4.1 }, { l: "Apr", v: 4.4 },
      { l: "May", v: 4.8 }, { l: "Jun", v: 4.6 },
    ],
    weekly: [
      { l: "W1", v: 4.2 }, { l: "W2", v: 4.4 }, { l: "W3", v: 4.6 }, { l: "W4", v: 4.8 },
    ],
    seasonal: [
      { l: "Kharif", v: 4.2 }, { l: "Rabi", v: 4.8 }, { l: "Zaid", v: 2.9 },
    ],
  };

  const forecastDays = [
    { day: "Today", icon: "⛅", hi: 29, lo: 21, suit: 88 },
    { day: "Mon", icon: "☀️", hi: 32, lo: 22, suit: 92 },
    { day: "Tue", icon: "🌦️", hi: 27, lo: 19, suit: 65 },
    { day: "Wed", icon: "🌧️", hi: 24, lo: 18, suit: 45 },
    { day: "Thu", icon: "⛅", hi: 28, lo: 20, suit: 78 },
    { day: "Fri", icon: "☀️", hi: 31, lo: 22, suit: 90 },
    { day: "Sat", icon: "☀️", hi: 33, lo: 23, suit: 85 },
  ];

  const sideNavItems = [
    { id: "dashboard", icon: "📊", label: t.dashboard },
    { id: "weather", icon: "🌦️", label: t.weather },
    { id: "crop", icon: "🌾", label: t.cropAnalysis },
    { id: "disease", icon: "🦠", label: t.diseaseDetection },
    { id: "ai", icon: "🤖", label: t.aiAssistant },
    { id: "market", icon: "🛒", label: t.marketplace },
    { id: "reports", icon: "📋", label: t.reports },
    { id: "settings", icon: "⚙️", label: t.settings },
  ];

  const notifs = [
    { icon: "🌧️", text: lang === "en" ? "Rain expected tomorrow — 18mm" : "कल बारिश — 18mm", time: "2m ago", color: "#60a5fa" },
    { icon: "🐛", text: lang === "en" ? "Aphid alert in Sector C" : "सेक्टर C में कीट", time: "18m ago", color: "#f97316" },
    { icon: "🌾", text: lang === "en" ? "Wheat ready for harvest (Sector A)" : "गेहूं कटाई तैयार", time: "1h ago", color: "#4ade80" },
    { icon: "🧪", text: lang === "en" ? "Soil report updated" : "मिट्टी रिपोर्ट अपडेट", time: "3h ago", color: "#a78bfa" },
  ];

  const lineData = [62, 65, 68, 64, 70, Math.round(sensors.moisture), 72];

  // CSS
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #060f08;
      --surface: #0d1a0f;
      --surface2: #111f13;
      --surface3: #162118;
      --border: rgba(255,255,255,0.06);
      --border2: rgba(255,255,255,0.1);
      --text: #e8f4e9;
      --text2: rgba(232,244,233,0.55);
      --text3: rgba(232,244,233,0.3);
      --accent: #4ade80;
      --accent2: #C8A84B;
      --red: #f87171;
      --yellow: #facc15;
      --blue: #60a5fa;
      --purple: #a78bfa;
      --orange: #fb923c;
      --sidebar-w: 200px;
      --sidebar-w-closed: 60px;
    }
    .light-mode {
      --bg: #f0f7f1;
      --surface: #ffffff;
      --surface2: #f5fbf6;
      --surface3: #eaf5ec;
      --border: rgba(0,0,0,0.07);
      --border2: rgba(0,0,0,0.12);
      --text: #0d2b12;
      --text2: rgba(13,43,18,0.55);
      --text3: rgba(13,43,18,0.3);
    }

    html, body { height: 100%; overflow: hidden; }

    .at-root {
      font-family: 'Sora', 'Noto Sans Devanagari', sans-serif;
      background: var(--bg);
      color: var(--text);
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* ── HEADER ── */
    .at-header {
      height: 56px;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 14px;
      flex-shrink: 0;
      position: sticky;
      top: 0;
      z-index: 50;
      backdrop-filter: blur(20px);
    }
    .at-logo {
      display: flex; align-items: center; gap: 8px;
      font-size: 18px; font-weight: 800; color: var(--accent);
      letter-spacing: -0.5px; white-space: nowrap;
    }
    .at-logo span { color: var(--accent2); }
    .at-search {
      flex: 1; max-width: 320px;
      display: flex; align-items: center; gap: 8px;
      background: var(--surface2); border: 1px solid var(--border2);
      border-radius: 10px; padding: 7px 12px;
    }
    .at-search input {
      background: none; border: none; outline: none;
      color: var(--text); font-family: 'Sora','Noto Sans Devanagari',sans-serif;
      font-size: 13px; width: 100%;
    }
    .at-search input::placeholder { color: var(--text3); }
    .at-header-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }
    .at-weather-badge {
      display: flex; align-items: center; gap: 6px;
      background: var(--surface2); border: 1px solid var(--border);
      border-radius: 20px; padding: 5px 12px; font-size: 12px; color: var(--text2);
    }
    .at-icon-btn {
      width: 34px; height: 34px; border-radius: 9px;
      background: var(--surface2); border: 1px solid var(--border2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 16px; position: relative;
      transition: background 0.15s;
    }
    .at-icon-btn:hover { background: var(--surface3); }
    .notif-dot {
      width: 8px; height: 8px; border-radius: 50%; background: var(--red);
      position: absolute; top: 4px; right: 4px; border: 1.5px solid var(--surface);
    }
    .at-avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: linear-gradient(135deg,#2E6B3E,#4A7C59);
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; cursor: pointer; border: 2px solid var(--accent);
    }
    .at-location { font-size: 11px; color: var(--text3); }
    .at-time { font-size: 11px; color: var(--accent2); font-weight: 600; }

    /* ── BODY ── */
    .at-body { display: flex; flex: 1; overflow: hidden; }

    /* ── SIDEBAR ── */
    .at-sidebar {
      width: var(--sidebar-w);
      background: var(--surface);
      border-right: 1px solid var(--border);
      display: flex; flex-direction: column;
      transition: width 0.25s ease;
      overflow: hidden; flex-shrink: 0;
      display: none; /* Hidden by default when embedded, uncomment if running standalone */
    }
    .at-sidebar.closed { width: var(--sidebar-w-closed); }
    .at-sidebar-toggle {
      padding: 12px; display: flex; justify-content: flex-end;
      cursor: pointer; font-size: 14px; color: var(--text3);
    }
    .at-nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px; border-radius: 9px; margin: 2px 8px;
      cursor: pointer; transition: all 0.15s; white-space: nowrap;
      font-size: 13px; color: var(--text2); font-weight: 500;
    }
    .at-nav-item:hover { background: var(--surface2); color: var(--text); }
    .at-nav-item.active {
      background: linear-gradient(135deg, rgba(74,222,128,0.15), rgba(74,222,128,0.05));
      color: var(--accent); border: 1px solid rgba(74,222,128,0.2);
    }
    .at-nav-icon { font-size: 17px; flex-shrink: 0; }
    .at-sidebar-bottom { margin-top: auto; padding: 12px; display: flex; flex-direction: column; gap: 6px; }
    .at-sync-badge {
      display: flex; align-items: center; gap: 6px;
      font-size: 10px; color: var(--accent); padding: 6px 8px;
      background: rgba(74,222,128,0.08); border-radius: 7px; border: 1px solid rgba(74,222,128,0.15);
      white-space: nowrap;
    }
    .at-export-btn {
      display: flex; align-items: center; gap: 6px;
      font-size: 11px; color: var(--accent2); padding: 7px 10px;
      background: rgba(200,168,75,0.1); border-radius: 8px; border: 1px solid rgba(200,168,75,0.2);
      cursor: pointer; font-weight: 600; white-space: nowrap;
    }

    /* ── MAIN CONTENT ── */
    .at-main {
      flex: 1; overflow-y: auto; padding: 20px;
      display: flex; flex-direction: column; gap: 20px;
      scrollbar-width: thin; scrollbar-color: rgba(74,222,128,0.2) transparent;
    }
    .at-main::-webkit-scrollbar { width: 4px; }
    .at-main::-webkit-scrollbar-thumb { background: rgba(74,222,128,0.2); border-radius: 2px; }

    /* ── SECTION TITLES ── */
    .at-section-title {
      font-size: 14px; font-weight: 700; color: var(--text);
      display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
    }
    .at-section-title span { color: var(--text3); font-size: 11px; font-weight: 400; }

    /* ── HEALTH CARDS GRID ── */
    .health-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    @media (max-width: 1100px) { .health-grid { grid-template-columns: repeat(2, 1fr); } }

    .health-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 14px;
      display: flex; flex-direction: column; gap: 8px;
      transition: transform 0.15s, box-shadow 0.15s;
      position: relative; overflow: hidden;
    }
    .health-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
    .health-card.pulse-warning { animation: pulseWarn 2s infinite; }
    .health-card.pulse-critical { animation: pulseCrit 1.5s infinite; }
    @keyframes pulseWarn {
      0%,100% { box-shadow: 0 0 0 0 rgba(250,204,21,0); }
      50% { box-shadow: 0 0 0 4px rgba(250,204,21,0.15); }
    }
    @keyframes pulseCrit {
      0%,100% { box-shadow: 0 0 0 0 rgba(248,113,113,0); }
      50% { box-shadow: 0 0 0 5px rgba(248,113,113,0.2); }
    }
    .hc-top { display: flex; align-items: center; justify-content: space-between; }
    .hc-icon { font-size: 20px; }
    .hc-status-dot {
      width: 7px; height: 7px; border-radius: 50%;
    }
    .hc-label { font-size: 11px; color: var(--text2); font-weight: 500; }
    .hc-mid { display: flex; align-items: flex-end; gap: 8px; }
    .hc-value { font-size: 24px; font-weight: 800; color: var(--text); line-height: 1; }
    .hc-unit { font-size: 12px; color: var(--text3); margin-bottom: 4px; }
    .hc-bottom { display: flex; align-items: center; justify-content: space-between; }
    .hc-status-badge {
      font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 20px;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .hc-glow {
      position: absolute; top: -20px; right: -20px; width: 60px; height: 60px;
      border-radius: 50%; opacity: 0.06; filter: blur(16px);
    }

    /* ── AI PANEL ── */
    .ai-panel {
      background: var(--surface);
      border: 1px solid rgba(74,222,128,0.2);
      border-radius: 16px; padding: 18px;
      background-image: radial-gradient(ellipse at top right, rgba(74,222,128,0.05) 0%, transparent 60%);
    }
    .ai-header { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
    .ai-icon {
      width: 40px; height: 40px; border-radius: 12px;
      background: linear-gradient(135deg,#16a34a,#4ade80);
      display: flex; align-items: center; justify-content: center; font-size: 20px;
      box-shadow: 0 4px 14px rgba(74,222,128,0.35);
    }
    .ai-title { font-size: 15px; font-weight: 700; color: var(--text); }
    .ai-sub { font-size: 11px; color: var(--accent); }
    .ai-summary {
      font-size: 13px; color: var(--text2); line-height: 1.65;
      background: var(--surface2); border-radius: 10px; padding: 12px 14px;
      border-left: 3px solid var(--accent); margin-bottom: 14px;
    }
    .ai-metrics { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 14px; }
    .ai-metric {
      background: var(--surface2); border-radius: 10px; padding: 10px 12px;
      border: 1px solid var(--border);
    }
    .ai-metric-label { font-size: 10px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .ai-metric-val { font-size: 13px; font-weight: 700; color: var(--text); }
    .ai-actions { display: flex; flex-direction: column; gap: 8px; }
    .ai-action-item {
      display: flex; align-items: flex-start; gap: 10px;
      background: var(--surface2); border-radius: 9px; padding: 9px 12px;
      border: 1px solid var(--border); font-size: 12px; color: var(--text2);
    }
    .ai-action-icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }
    .ai-btn {
      margin-top: 14px; width: 100%; padding: 11px;
      background: linear-gradient(135deg,#16a34a,#4ade80);
      color: #0d2b12; border: none; border-radius: 11px;
      font-family: 'Sora',sans-serif; font-size: 13px; font-weight: 700;
      cursor: pointer; transition: opacity 0.15s;
    }
    .ai-btn:hover { opacity: 0.9; }
    .expand-btn {
      background: none; border: none; color: var(--accent); font-size: 11px;
      cursor: pointer; font-family: 'Sora',sans-serif; font-weight: 600;
      display: flex; align-items: center; gap: 4px; margin-top: 8px;
    }

    /* ── TWO COL ── */
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    @media (max-width: 900px) { .two-col { grid-template-columns: 1fr; } }
    .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
    @media (max-width: 1000px) { .three-col { grid-template-columns: 1fr 1fr; } }

    /* ── FARM MAP ── */
    .map-panel {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 16px; padding: 16px;
    }
    .map-controls {
      display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap;
    }
    .map-ctrl-btn {
      padding: 5px 12px; border-radius: 20px; font-size: 11px;
      font-weight: 600; cursor: pointer; border: 1px solid var(--border2);
      background: var(--surface2); color: var(--text2);
      font-family: 'Sora',sans-serif; transition: all 0.15s;
    }
    .map-ctrl-btn.active {
      background: var(--accent); color: #0d2b12; border-color: var(--accent);
    }
    .map-legend {
      display: flex; gap: 12px; margin-top: 10px; flex-wrap: wrap;
    }
    .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: var(--text3); }
    .legend-dot { width: 8px; height: 8px; border-radius: 2px; }
    .zoom-controls { display: flex; gap: 4px; }
    .zoom-btn {
      width: 28px; height: 28px; border-radius: 7px;
      background: var(--surface2); border: 1px solid var(--border2);
      color: var(--text2); font-size: 14px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    }

    /* ── SENSOR CARDS ── */
    .sensor-grid {
      display: grid; grid-template-columns: repeat(3,1fr); gap: 10px;
    }
    @media (max-width: 800px) { .sensor-grid { grid-template-columns: repeat(2,1fr); } }
    .sensor-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 13px; padding: 14px;
    }
    .sensor-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
    .sensor-label { font-size: 10px; color: var(--text3); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
    .sensor-val { font-size: 22px; font-weight: 800; color: var(--text); }
    .sensor-unit { font-size: 11px; color: var(--text3); }
    .sensor-ts { font-size: 9px; color: var(--text3); margin-top: 6px; }
    .live-dot {
      width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
      display: inline-block;
      animation: blink 1.2s infinite;
    }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

    /* ── DISEASE PANEL ── */
    .disease-panel {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 16px; padding: 16px;
    }
    .disease-card {
      background: linear-gradient(135deg, rgba(248,113,113,0.08), rgba(248,113,113,0.03));
      border: 1px solid rgba(248,113,113,0.25); border-radius: 12px; padding: 14px;
      margin-bottom: 10px;
    }
    .disease-name { font-size: 14px; font-weight: 700; color: var(--red); margin-bottom: 8px; }
    .disease-meta { display: grid; grid-template-columns: repeat(2,1fr); gap: 8px; margin-bottom: 10px; }
    .dm-item { font-size: 11px; }
    .dm-label { color: var(--text3); margin-bottom: 2px; }
    .dm-val { color: var(--text); font-weight: 600; }
    .confidence-bar {
      background: var(--surface2); border-radius: 20px; height: 5px; overflow: hidden; margin-top: 4px;
    }
    .confidence-fill { height: 100%; border-radius: 20px; background: var(--red); transition: width 0.8s ease; }
    .disease-btns { display: flex; gap: 8px; margin-top: 12px; }
    .d-btn-primary {
      flex:1; padding:9px; border-radius:9px;
      background: linear-gradient(135deg,#dc2626,#f87171);
      color:white; border:none; font-family:'Sora',sans-serif;
      font-size:12px; font-weight:700; cursor:pointer;
    }
    .d-btn-secondary {
      flex:1; padding:9px; border-radius:9px;
      background: var(--surface2); color:var(--text2);
      border:1px solid var(--border2); font-family:'Sora',sans-serif;
      font-size:12px; font-weight:600; cursor:pointer;
    }

    /* ── WEATHER INTEL ── */
    .weather-panel {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 16px; padding: 16px;
    }
    .weather-current {
      display: flex; align-items: center; gap: 16px;
      background: linear-gradient(135deg, #1B3A2A, #2E6B3E);
      border-radius: 13px; padding: 16px; margin-bottom: 12px;
    }
    .wc-icon { font-size: 44px; }
    .wc-temp { font-size: 38px; font-weight: 800; color: #FAF3E0; }
    .wc-desc { font-size: 12px; color: rgba(250,243,224,0.7); margin-top: 3px; }
    .wc-meta { font-size: 11px; color: rgba(250,243,224,0.5); margin-top: 6px; display: flex; gap: 10px; }
    .forecast-row {
      display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px;
    }
    .forecast-row::-webkit-scrollbar { display: none; }
    .fc-card {
      flex-shrink: 0; background: var(--surface2); border: 1px solid var(--border);
      border-radius: 11px; padding: 10px 12px; text-align: center; min-width: 64px;
    }
    .fc-day2 { font-size: 9px; color: var(--text3); margin-bottom: 5px; text-transform: uppercase; }
    .fc-icon2 { font-size: 20px; margin-bottom: 4px; display: block; }
    .fc-hi2 { font-size: 12px; font-weight: 700; color: var(--text); }
    .fc-lo2 { font-size: 10px; color: var(--text3); }
    .suit-bar { height: 3px; border-radius: 10px; background: var(--surface3); overflow: hidden; margin-top: 5px; }
    .suit-fill { height: 100%; border-radius: 10px; }

    /* ── YIELD ANALYTICS ── */
    .yield-panel {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 16px; padding: 16px;
    }
    .filter-tabs {
      display: flex; gap: 4px; background: var(--surface2);
      border-radius: 8px; padding: 3px; margin-bottom: 14px; width: fit-content;
    }
    .filter-tab {
      padding: 5px 14px; border-radius: 6px; font-size: 11px; font-weight: 600;
      cursor: pointer; border: none; background: transparent; color: var(--text3);
      font-family: 'Sora',sans-serif; transition: all 0.15s;
    }
    .filter-tab.active { background: var(--accent); color: #0d2b12; }
    .yield-metrics { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
    .ym-item { font-size: 11px; color: var(--text2); }
    .ym-val { font-size: 19px; font-weight: 800; color: var(--text); display: block; }

    /* ── RECOMMENDATIONS ── */
    .reco-feed { display: flex; flex-direction: column; gap: 8px; }
    .reco-item {
      display: flex; align-items: flex-start; gap: 10px;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px; padding: 12px 14px;
      transition: background 0.15s;
    }
    .reco-item:hover { background: var(--surface2); }
    .reco-icon { font-size: 18px; flex-shrink: 0; }
    .reco-text { flex:1; font-size: 12px; color: var(--text2); line-height: 1.5; }
    .reco-actions { display: flex; gap: 6px; align-items: center; margin-left: auto; flex-shrink: 0; }
    .reco-tag {
      font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 20px;
      text-transform: uppercase; letter-spacing: 0.4px;
    }
    .tag-high { background: rgba(248,113,113,0.15); color: var(--red); }
    .tag-medium { background: rgba(250,204,21,0.15); color: var(--yellow); }
    .tag-low { background: rgba(74,222,128,0.15); color: var(--accent); }
    .reco-btn { background: none; border: none; font-size: 15px; cursor: pointer; color: var(--text3); transition: color 0.15s; }
    .reco-btn:hover { color: var(--accent2); }

    /* ── NOTIFICATIONS PANEL ── */
    .notif-panel {
      position: fixed; top: 62px; right: 16px; z-index: 200;
      width: 300px; background: var(--surface);
      border: 1px solid var(--border2); border-radius: 14px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      overflow: hidden;
      animation: slideDown 0.2s ease;
    }
    @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
    .notif-header { padding: 14px 16px 10px; font-size: 13px; font-weight: 700; border-bottom: 1px solid var(--border); }
    .notif-item {
      display: flex; align-items: center; gap: 10px;
      padding: 11px 16px; border-bottom: 1px solid var(--border);
      font-size: 12px; color: var(--text2);
    }
    .notif-time { font-size: 10px; color: var(--text3); margin-left: auto; white-space: nowrap; }

    /* ── CHAT BOT ── */
    .chat-fab {
      position: fixed; bottom: 84px; right: 24px;
      width: 52px; height: 52px; border-radius: 50%;
      background: linear-gradient(135deg,#16a34a,#4ade80);
      display: flex; align-items: center; justify-content: center;
      font-size: 22px; cursor: pointer; z-index: 100;
      box-shadow: 0 6px 24px rgba(74,222,128,0.45);
      border: none; transition: transform 0.15s;
    }
    .chat-fab:hover { transform: scale(1.08); }
    .chat-window {
      position: fixed; bottom: 146px; right: 24px;
      width: 320px; height: 420px; z-index: 100;
      background: var(--surface); border: 1px solid var(--border2);
      border-radius: 18px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      display: flex; flex-direction: column; overflow: hidden;
      animation: slideUp2 0.25s ease;
    }
    @keyframes slideUp2 { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    .chat-head {
      padding: 14px 16px; background: linear-gradient(135deg,#16a34a,#22c55e);
      display: flex; align-items: center; gap: 10px;
    }
    .chat-head-title { font-size: 13px; font-weight: 700; color: white; }
    .chat-head-sub { font-size: 10px; color: rgba(255,255,255,0.7); }
    .chat-msgs { flex:1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 8px; scrollbar-width: none; }
    .chat-msgs::-webkit-scrollbar { display: none; }
    .chat-bubble {
      max-width: 85%; padding: 9px 12px; border-radius: 13px;
      font-size: 12px; line-height: 1.5;
    }
    .chat-bubble.ai {
      background: var(--surface2); color: var(--text);
      border-bottom-left-radius: 3px; align-self: flex-start;
      border: 1px solid var(--border);
    }
    .chat-bubble.user {
      background: linear-gradient(135deg,#16a34a,#4ade80);
      color: #0d2b12; border-bottom-right-radius: 3px; align-self: flex-end;
      font-weight: 600;
    }
    .chat-input-row {
      padding: 10px 12px; border-top: 1px solid var(--border);
      display: flex; gap: 8px;
    }
    .chat-input {
      flex:1; background: var(--surface2); border: 1px solid var(--border2);
      border-radius: 9px; padding: 8px 12px;
      color: var(--text); font-family: 'Sora',sans-serif; font-size: 12px; outline: none;
    }
    .chat-send {
      width: 34px; height: 34px; border-radius: 9px;
      background: var(--accent); border: none; cursor: pointer; font-size: 14px;
      display: flex; align-items: center; justify-content: center;
    }

    /* ── VOICE FAB ── */
    .voice-fab {
      position: fixed; bottom: 84px; left: 24px;
      width: 48px; height: 48px; border-radius: 50%;
      background: linear-gradient(135deg,#7c3aed,#a78bfa);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; cursor: pointer; z-index: 100;
      border: none; box-shadow: 0 4px 16px rgba(167,139,250,0.4);
      transition: transform 0.15s;
    }
    .voice-fab:hover { transform: scale(1.08); }
    .voice-fab.active { animation: voicePulse 1s infinite; }
    @keyframes voicePulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(167,139,250,0.5); }
      50% { box-shadow: 0 0 0 14px rgba(167,139,250,0); }
    }

    /* ── LANG + DARK TOGGLE ── */
    .top-toggles { display: flex; align-items: center; gap: 8px; }
    .lang-toggle2 {
      display: flex; background: var(--surface2); border-radius: 20px;
      padding: 2px; border: 1px solid var(--border2); gap: 0;
    }
    .lang-btn2 {
      padding: 4px 10px; border-radius: 16px; border: none; cursor: pointer;
      font-size: 11px; font-weight: 700; font-family: 'Sora','Noto Sans Devanagari',sans-serif;
      background: transparent; color: var(--text3); transition: all 0.15s;
    }
    .lang-btn2.active { background: var(--accent); color: #0d2b12; }
    .dark-toggle {
      width: 30px; height: 30px; border-radius: 8px;
      background: var(--surface2); border: 1px solid var(--border2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 15px;
    }

    /* ── SCROLLBAR (main) ── */
    .at-root { scrollbar-width: thin; }
  `;

  const [now, setNow] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(i); }, []);

  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { weekday: "short", day: "numeric", month: "short" });

  const chatMsgsRef = useRef(null);
  useEffect(() => { if (chatMsgsRef.current) chatMsgsRef.current.scrollTop = chatMsgsRef.current.scrollHeight; }, [chatHistory]);

  return (
    <>
      <style>{css}</style>
      <div className={`at-root${darkMode ? "" : " light-mode"}`}>

        {/* ── HEADER ── */}
        <header className="at-header" style={{display: 'none'}}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setSidebarOpen(o => !o)} style={{ background: "none", border: "none", color: "var(--text2)", fontSize: 18, cursor: "pointer" }}>☰</button>
            <div className="at-logo">🌿 Argo<span>Tech</span></div>
          </div>

          <div className="at-search">
            <span style={{ color: "var(--text3)", fontSize: 13 }}>🔍</span>
            <input placeholder={t.searchPlaceholder} />
          </div>

          <div className="at-header-right">
            <div className="at-weather-badge">
              <span>⛅</span>
              <span>28°C</span>
              <span style={{ color: "var(--text3)" }}>|</span>
              <span style={{ fontSize: 10 }}>📍 {t.location}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div className="at-time">{timeStr}</div>
              <div className="at-location">{dateStr}</div>
            </div>

            <div className="top-toggles">
              <div className="lang-toggle2">
                <button className={`lang-btn2 ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
                <button className={`lang-btn2 ${lang === "hi" ? "active" : ""}`} onClick={() => setLang("hi")}>हि</button>
              </div>
              <div className="dark-toggle" onClick={() => setDarkMode(d => !d)}>{darkMode ? "☀️" : "🌙"}</div>
            </div>

            <div className="at-icon-btn" style={{ position: "relative" }} onClick={() => setNotifOpen(o => !o)}>
              🔔 <div className="notif-dot" />
            </div>
            <div className="at-avatar">🧑🌾</div>
          </div>
        </header>

        {/* ── BODY ── */}
        <div className="at-body">

          {/* ── MAIN ── */}
          <main className="at-main" style={{paddingBottom: '80px'}}>

            {/* Welcome */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>
                  {t.cropAnalysis}
                </div>
                <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 3 }}>
                  📍 {t.location} · {dateStr} · <span className="live-dot" /> Live
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {["🌾 3 Fields", "⚠️ 2 Alerts"].map((badge, i) => (
                  <div key={i} style={{
                    padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                    background: "var(--surface)", border: "1px solid var(--border2)",
                    color: i === 1 ? "var(--yellow)" : "var(--text2)"
                  }}>{badge}</div>
                ))}
              </div>
            </div>

            {/* ── 1. HEALTH CARDS ── */}
            <div>
              <div className="at-section-title">🌿 {t.cropHealth} <span><div className="live-dot" style={{ display: "inline-block" }} /></span></div>
              <div className="health-grid">
                {healthCards.map((card, i) => (
                  <div key={i} className={`health-card ${card.status === "warning" ? "pulse-warning" : card.status === "critical" ? "pulse-critical" : ""}`}>
                    <div className="hc-glow" style={{ background: card.color }} />
                    <div className="hc-top">
                      <div className="hc-icon">{card.icon}</div>
                      <div className="hc-status-dot" style={{ background: statusColor[card.status] }} />
                    </div>
                    <div className="hc-label">{card.label}</div>
                    <div className="hc-mid">
                      <div className="hc-value">{card.val}</div>
                      <div className="hc-unit">{card.unit}</div>
                      <div style={{ marginLeft: "auto" }}>
                        <RingChart pct={typeof card.val === "number" ? card.val : 70} color={card.color} />
                      </div>
                    </div>
                    <div className="hc-bottom">
                      <div className="hc-status-badge" style={{
                        background: `${statusColor[card.status]}18`,
                        color: statusColor[card.status]
                      }}>{statusLabel[card.status]}</div>
                      <Sparkline data={card.trend} color={card.sparkColor} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 2. AI PANEL + MAP ── */}
            <div className="two-col">
              {/* AI Panel */}
              <div className="ai-panel">
                <div className="ai-header">
                  <div className="ai-icon">🤖</div>
                  <div>
                    <div className="ai-title">{t.aiAnalysis}</div>
                    <div className="ai-sub">Powered by ArgoTech AI</div>
                  </div>
                </div>
                <div className="ai-summary">{t.aiSummary}</div>
                <div className="ai-metrics">
                  <div className="ai-metric">
                    <div className="ai-metric-label">{t.yieldPrediction}</div>
                    <div className="ai-metric-val">4.8 T/ha</div>
                  </div>
                  <div className="ai-metric">
                    <div className="ai-metric-label">{t.predictedCondition}</div>
                    <div className="ai-metric-val" style={{ color: "var(--yellow)" }}>{t.predictedCondition}</div>
                  </div>
                  <div className="ai-metric">
                    <div className="ai-metric-label">{t.growthStage}</div>
                    <div className="ai-metric-val">{t.growthStageVal}</div>
                  </div>
                </div>

                {(aiExpanded ? [t.irrigationTip, t.fertTip, t.pestTip, t.harvestTip] : [t.irrigationTip, t.fertTip]).map((action, i) => (
                  <div className="ai-action-item" key={i}>
                    <div className="ai-action-icon">{["💧", "🧪", "🐛", "🌾"][i]}</div>
                    <div>{action}</div>
                  </div>
                ))}

                <button className="expand-btn" onClick={() => setAiExpanded(e => !e)}>
                  {aiExpanded ? "▲ Show less" : "▼ Show all recommendations"}
                </button>
                <button className="ai-btn">{t.viewFullAnalysis} →</button>
              </div>

              {/* Farm Map */}
              <div className="map-panel">
                <div className="at-section-title" style={{ marginBottom: 10 }}>🗺️ {t.farmMap}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div className="map-controls">
                    {[["health", "🟢 Health"], ["moisture", "💧 Moisture"], ["satellite", "🛰️ Satellite"]].map(([id, label]) => (
                      <button key={id} className={`map-ctrl-btn ${mapLayer === id ? "active" : ""}`} onClick={() => setMapLayer(id)}>{label}</button>
                    ))}
                  </div>
                  <div className="zoom-controls">
                    <button className="zoom-btn">+</button>
                    <button className="zoom-btn">−</button>
                  </div>
                </div>
                <FarmMapSVG activeLayer={mapLayer} t={t} />
                <div className="map-legend">
                  {[["#4ade80", t.healthy], ["#facc15", t.warning], ["#f87171", t.critical], ["#C8A84B", "Sensor"]].map(([c, l]) => (
                    <div className="legend-item" key={l}>
                      <div className="legend-dot" style={{ background: c }} />
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 3. SENSOR DATA ── */}
            <div>
              <div className="at-section-title">📡 {t.sensorData} <span><div className="live-dot" style={{ display: "inline-block" }} /> {t.lastUpdated} {ticker}s ago</span></div>
              <div className="sensor-grid">
                {[
                  { label: t.soilPH, val: sensors.ph.toFixed(2), unit: "pH", icon: "🧪", color: "#a78bfa", data: [6.6, 6.7, 6.8, 6.75, sensors.ph] },
                  { label: t.soilMoisture, val: Math.round(sensors.moisture), unit: "%", icon: "💧", color: "#60a5fa", data: [65, 67, 66, 68, Math.round(sensors.moisture)] },
                  { label: t.temperature, val: sensors.temp.toFixed(1), unit: "°C", icon: "🌡️", color: "#fb923c", data: [27, 28, 28.5, 28.2, sensors.temp] },
                  { label: t.rainProbability, val: Math.round(sensors.rain), unit: "%", icon: "🌧️", color: "#60a5fa", data: [18, 20, 22, 21, Math.round(sensors.rain)] },
                  { label: t.sunlightIntensity, val: Math.round(sensors.sun), unit: "%", icon: "☀️", color: "#facc15", data: [72, 75, 78, 76, Math.round(sensors.sun)] },
                  { label: t.waterUsage, val: Math.round(sensors.water), unit: "L", icon: "🚰", color: "#34d399", data: [330, 335, 338, 340, Math.round(sensors.water)] },
                ].map((s, i) => (
                  <div className="sensor-card" key={i}>
                    <div className="sensor-top">
                      <div>
                        <div className="sensor-label">{s.label}</div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginTop: 4 }}>
                          <div className="sensor-val">{s.val}</div>
                          <div className="sensor-unit">{s.unit}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 22 }}>{s.icon}</div>
                    </div>
                    <LineGraph data={s.data} color={s.color} />
                    <div className="sensor-ts"><div className="live-dot" /> {t.lastUpdated} {ticker}s ago</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 4. DISEASE + WEATHER ── */}
            <div className="two-col">
              {/* Disease */}
              <div className="disease-panel">
                <div className="at-section-title" style={{ marginBottom: 12 }}>🦠 {t.diseaseAlerts}</div>
                <div className="disease-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className="disease-name">⚠️ Powdery Mildew</div>
                    <div style={{ fontSize: 10, background: "rgba(248,113,113,0.15)", color: "var(--red)", padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>HIGH</div>
                  </div>
                  <div className="disease-meta">
                    <div className="dm-item"><div className="dm-label">{t.confidence}</div><div className="dm-val">87%</div><div className="confidence-bar"><div className="confidence-fill" style={{ width: "87%" }} /></div></div>
                    <div className="dm-item"><div className="dm-label">{t.severity}</div><div className="dm-val" style={{ color: "var(--yellow)" }}>Moderate</div></div>
                    <div className="dm-item"><div className="dm-label">{t.affectedArea}</div><div className="dm-val">Sector C — 0.4 ha</div></div>
                    <div className="dm-item"><div className="dm-label">{t.treatment}</div><div className="dm-val">Neem + Sulfur spray</div></div>
                  </div>
                  <div className="disease-btns">
                    <button className="d-btn-primary">🔁 {t.scanAgain}</button>
                    <button className="d-btn-secondary">📤 {t.uploadImage}</button>
                  </div>
                </div>
                <div className="disease-card" style={{ background: "rgba(250,204,21,0.05)", borderColor: "rgba(250,204,21,0.2)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className="disease-name" style={{ color: "var(--yellow)" }}>🟡 Leaf Rust</div>
                    <div style={{ fontSize: 10, background: "rgba(250,204,21,0.15)", color: "var(--yellow)", padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>MEDIUM</div>
                  </div>
                  <div className="disease-meta">
                    <div className="dm-item"><div className="dm-label">{t.confidence}</div><div className="dm-val">63%</div><div className="confidence-bar"><div className="confidence-fill" style={{ width: "63%", background: "var(--yellow)" }} /></div></div>
                    <div className="dm-item"><div className="dm-label">{t.affectedArea}</div><div className="dm-val">Sector A — 0.2 ha</div></div>
                  </div>
                </div>
              </div>

              {/* Weather */}
              <div className="weather-panel">
                <div className="at-section-title" style={{ marginBottom: 12 }}>🌦️ {t.weatherIntel}</div>
                <div className="weather-current">
                  <div className="wc-icon">⛅</div>
                  <div>
                    <div className="wc-temp">28°<span style={{ fontSize: 20 }}>C</span></div>
                    <div className="wc-desc">Partly Cloudy</div>
                    <div className="wc-meta">
                      <span>💧 62%</span>
                      <span>💨 14 km/h</span>
                      <span>☀️ UV 5</span>
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "rgba(250,243,224,0.6)", marginBottom: 5 }}>{t.farmingSuitability}</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "#4ade80" }}>88%</div>
                    <div style={{ fontSize: 10, color: "rgba(250,243,224,0.5)" }}>✅ Good to Farm</div>
                  </div>
                </div>
                <div className="forecast-row">
                  {forecastDays.map((d, i) => (
                    <div className="fc-card" key={i}>
                      <div className="fc-day2">{d.day}</div>
                      <span className="fc-icon2">{d.icon}</span>
                      <div className="fc-hi2">{d.hi}°</div>
                      <div className="fc-lo2">{d.lo}°</div>
                      <div className="suit-bar">
                        <div className="suit-fill" style={{
                          width: `${d.suit}%`,
                          background: d.suit > 75 ? "var(--accent)" : d.suit > 50 ? "var(--yellow)" : "var(--red)"
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 5. YIELD ANALYTICS + RECOMMENDATIONS ── */}
            <div className="two-col">
              {/* Yield */}
              <div className="yield-panel">
                <div className="at-section-title" style={{ marginBottom: 8 }}>📊 {t.yieldAnalytics}</div>
                <div className="filter-tabs">
                  {[["weekly", t.weekly], ["monthly", t.monthly], ["seasonal", t.seasonal]].map(([id, label]) => (
                    <button key={id} className={`filter-tab ${activeFilter === id ? "active" : ""}`} onClick={() => setActiveFilter(id)}>{label}</button>
                  ))}
                </div>
                <div className="yield-metrics">
                  {[
                    { label: t.expectedYield, val: "4.8 T" },
                    { label: t.waterConsumption, val: "820 L" },
                    { label: t.fertilizerUsage, val: "42 kg" },
                  ].map((m, i) => (
                    <div className="ym-item" key={i}>
                      <span className="ym-val">{m.val}</span>
                      {m.label}
                    </div>
                  ))}
                </div>
                <MiniBarChart data={yieldData[activeFilter]} color="#4ade80" />
                <div style={{ height: 14 }} />
                <div className="at-section-title" style={{ fontSize: 12, marginBottom: 8 }}>💧 {t.waterConsumption}</div>
                <LineGraph data={[820, 800, 790, 810, 830, 820, 840]} color="#60a5fa" />
              </div>

              {/* Recommendations */}
              <div>
                <div className="at-section-title">💡 {t.recommendations}</div>
                <div className="reco-feed">
                  {recommendations.map((r, i) => (
                    <div className="reco-item" key={i}>
                      <div className="reco-icon">{r.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 9, color: "var(--text3)", textTransform: "uppercase", marginBottom: 3 }}>{r.cat}</div>
                        <div className="reco-text">{r.text}</div>
                      </div>
                      <div className="reco-actions">
                        <div className={`reco-tag tag-${r.priority}`}>{r.priority === "high" ? t.high : r.priority === "medium" ? t.medium : t.low}</div>
                        <button className="reco-btn">{r.pinned ? "🔖" : "📌"}</button>
                        <button className="reco-btn">🔊</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ height: 80 }} />
          </main>
        </div>

        {/* ── NOTIFICATIONS ── */}
        {notifOpen && (
          <div className="notif-panel">
            <div className="notif-header">🔔 {t.notifications}</div>
            {notifs.map((n, i) => (
              <div className="notif-item" key={i}>
                <span style={{ fontSize: 18 }}>{n.icon}</span>
                <span style={{ flex: 1 }}>{n.text}</span>
                <span className="notif-time">{n.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── CHATBOT ── */}
        {chatOpen && (
          <div className="chat-window">
            <div className="chat-head">
              <span style={{ fontSize: 22 }}>🤖</span>
              <div>
                <div className="chat-head-title">ArgoTech AI</div>
                <div className="chat-head-sub"><div className="live-dot" style={{ background: "#fff" }} /> Online</div>
              </div>
            </div>
            <div className="chat-msgs" ref={chatMsgsRef}>
              {chatHistory.map((m, i) => (
                <div key={i} className={`chat-bubble ${m.role}`}>{m.text}</div>
              ))}
            </div>
            <div className="chat-input-row">
              <input className="chat-input" placeholder={lang === "en" ? "Ask AI about your farm…" : "खेत के बारे में पूछें…"}
                value={chatMsg} onChange={e => setChatMsg(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendChat()} />
              <button className="chat-send" onClick={sendChat}>➤</button>
            </div>
          </div>
        )}

        {/* ── FABs ── */}
        <button className="chat-fab" onClick={() => setChatOpen(o => !o)}>{chatOpen ? "✕" : "🤖"}</button>
        <button className={`voice-fab${voiceActive ? " active" : ""}`} onClick={() => setVoiceActive(v => !v)}>{voiceActive ? "🔴" : "🎙️"}</button>

      </div>
    </>
  );
}
