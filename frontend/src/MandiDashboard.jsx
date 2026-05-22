import { useState, useEffect, useRef } from "react";

const DEFAULT_MANDIS = [
  {
    id: 1, name: "Azadpur Mandi", city: "Delhi", distance: 2.1, verified: true,
    status: "open", crowd: "low", rating: 4.7, demand: "high",
    lat: 28.718, lng: 77.178,
    crops: [
      { name: "Wheat", price: 2450, unit: "q", trend: "up", change: "+120" },
      { name: "Tomato", price: 1800, unit: "q", trend: "down", change: "-200" },
      { name: "Onion", price: 2100, unit: "q", trend: "up", change: "+80" },
      { name: "Potato", price: 1250, unit: "q", trend: "up", change: "+60" },
      { name: "Rice", price: 3200, unit: "q", trend: "down", change: "-150" },
    ],
    bestCrop: "Wheat", lastUpdated: "2 min ago", image: "🌾", bookmarked: false,
  },
  {
    id: 2, name: "Ghazipur Sabzi Mandi", city: "East Delhi", distance: 4.2, verified: true,
    status: "open", crowd: "moderate", rating: 4.3, demand: "high",
    lat: 28.645, lng: 77.315,
    crops: [
      { name: "Wheat", price: 2580, unit: "q", trend: "up", change: "+250" },
      { name: "Tomato", price: 2100, unit: "q", trend: "up", change: "+300" },
      { name: "Onion", price: 1950, unit: "q", trend: "down", change: "-100" },
      { name: "Corn", price: 1680, unit: "q", trend: "up", change: "+90" },
      { name: "Rice", price: 3450, unit: "q", trend: "up", change: "+200" },
    ],
    bestCrop: "Wheat", lastUpdated: "5 min ago", image: "🥬", bookmarked: true,
  },
  {
    id: 3, name: "Okhla Fruit Market", city: "South Delhi", distance: 6.8, verified: false,
    status: "open", crowd: "high", rating: 3.9, demand: "moderate",
    lat: 28.538, lng: 77.271,
    crops: [
      { name: "Tomato", price: 1600, unit: "q", trend: "down", change: "-400" },
      { name: "Potato", price: 1100, unit: "q", trend: "down", change: "-150" },
      { name: "Onion", price: 1800, unit: "q", trend: "up", change: "+50" },
      { name: "Rice", price: 2900, unit: "q", trend: "down", change: "-300" },
    ],
    bestCrop: "Onion", lastUpdated: "12 min ago", image: "🍅", bookmarked: false,
  },
  {
    id: 4, name: "Shahdara Krishi Bazar", city: "North Delhi", distance: 8.5, verified: true,
    status: "closed", crowd: "low", rating: 4.5, demand: "low",
    lat: 28.673, lng: 77.289,
    crops: [
      { name: "Wheat", price: 2350, unit: "q", trend: "down", change: "-100" },
      { name: "Rice", price: 3100, unit: "q", trend: "down", change: "-200" },
      { name: "Corn", price: 1500, unit: "q", trend: "down", change: "-180" },
    ],
    bestCrop: "Rice", lastUpdated: "1 hr ago", image: "🌽", bookmarked: false,
  },
  {
    id: 5, name: "Narela Anaj Mandi", city: "North Delhi", distance: 11.3, verified: true,
    status: "open", crowd: "low", rating: 4.6, demand: "high",
    lat: 28.851, lng: 77.094,
    crops: [
      { name: "Wheat", price: 2620, unit: "q", trend: "up", change: "+190" },
      { name: "Rice", price: 3550, unit: "q", trend: "up", change: "+350" },
      { name: "Corn", price: 1750, unit: "q", trend: "up", change: "+70" },
      { name: "Potato", price: 1320, unit: "q", trend: "up", change: "+70" },
    ],
    bestCrop: "Rice", lastUpdated: "3 min ago", image: "🌾", bookmarked: false,
  },
];

const AI_INSIGHTS = [
  { icon: "📈", text: "Best wheat price available 4.2 km away at Ghazipur Sabzi Mandi", type: "opportunity" },
  { icon: "⚡", text: "Tomato prices expected to rise tomorrow by ₹200-300/q", type: "prediction" },
  { icon: "🕐", text: "Market crowd is low right now — ideal time to visit Narela Mandi", type: "timing" },
  { icon: "🎯", text: "Rice demand is surging. Best rates: Narela ₹3550/q", type: "alert" },
];

const CROPS_LIST = ["All Crops", "Wheat", "Rice", "Tomato", "Potato", "Onion", "Corn"];

const demandColor = (d) => d === "high" ? "#16a34a" : d === "moderate" ? "#ca8a04" : "#dc2626";
const demandBg = (d) => d === "high" ? "#dcfce7" : d === "moderate" ? "#fef9c3" : "#fee2e2";
const crowdColor = (c) => c === "low" ? "#16a34a" : c === "moderate" ? "#ca8a04" : "#dc2626";
const crowdLabel = (c) => c === "low" ? "Low Crowd" : c === "moderate" ? "Moderate" : "High Crowd";

function PulsePin({ x, y, color, active, mandi, onClick }) {
  return (
    <g style={{ cursor: "pointer" }} onClick={onClick}>
      {active && (
        <>
          <circle cx={x} cy={y} r="22" fill={color} opacity="0.15">
            <animate attributeName="r" values="18;28;18" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={x} cy={y} r="16" fill={color} opacity="0.25">
            <animate attributeName="r" values="12;20;12" dur="2s" begin="0.5s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      <circle cx={x} cy={y} r="12" fill={color} stroke="white" strokeWidth="2" />
      <circle cx={x} cy={y} r="5" fill="white" />
    </g>
  );
}

function MandiCard({ mandi, selected, onSelect, mobile, onEdit, onDelete }) {
  const [bookmarked, setBookmarked] = useState(mandi.bookmarked);
  return (
    <div
      onClick={() => onSelect(mandi)}
      style={{
        background: selected
          ? "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
          : "white",
        border: selected ? "2px solid #16a34a" : "1.5px solid #e5e7eb",
        borderRadius: 20,
        padding: "18px 20px",
        marginBottom: 14,
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(.4,0,.2,1)",
        boxShadow: selected
          ? "0 8px 30px rgba(22,163,74,0.15)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {mandi.demand === "high" && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          background: "linear-gradient(135deg, #16a34a, #15803d)",
          color: "white", fontSize: 10, fontWeight: 700,
          padding: "4px 14px 4px 10px",
          borderBottomLeftRadius: 12, letterSpacing: "0.05em",
        }}>HIGH DEMAND</div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 50, height: 50, borderRadius: 14,
          background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, flexShrink: 0,
          boxShadow: "0 2px 8px rgba(22,163,74,0.2)",
        }}>{mandi.image}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#14532d", fontFamily: "'DM Sans', sans-serif" }}>
              {mandi.name}
            </span>
            {mandi.verified && (
              <span style={{ color: "#16a34a", fontSize: 13 }} title="Verified">✓</span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
            <span style={{ fontSize: 12, color: "#6b7280" }}>📍 {mandi.city}</span>
            <span style={{
              fontSize: 11, fontWeight: 700, color: "#15803d",
              background: "#dcfce7", borderRadius: 8, padding: "2px 8px",
            }}>{mandi.distance} km</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <button
            onClick={e => { e.stopPropagation(); setBookmarked(!bookmarked); }}
            style={{
              background: bookmarked ? "#fef9c3" : "transparent",
              border: "none", cursor: "pointer",
              fontSize: 16, padding: 4, borderRadius: 8,
              transition: "all 0.2s",
            }}
          >{bookmarked ? "🔖" : "🏷️"}</button>
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: mandi.status === "open" ? "#16a34a" : "#dc2626",
            background: mandi.status === "open" ? "#dcfce7" : "#fee2e2",
            borderRadius: 8, padding: "2px 8px",
          }}>{mandi.status === "open" ? "● Open" : "● Closed"}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 14 }}>
        {mandi.crops.slice(0, 4).map(c => (
          <div key={c.name} style={{
            display: "flex", alignItems: "center", gap: 5,
            background: c.trend === "up" ? "#f0fdf4" : "#fff1f2",
            border: `1px solid ${c.trend === "up" ? "#bbf7d0" : "#fecdd3"}`,
            borderRadius: 10, padding: "4px 10px", fontSize: 12,
          }}>
            <span style={{ color: "#374151", fontWeight: 600 }}>{c.name}</span>
            <span style={{ color: "#374151" }}>₹{c.price.toLocaleString()}/{c.unit}</span>
            <span style={{
              color: c.trend === "up" ? "#16a34a" : "#dc2626",
              fontWeight: 700, fontSize: 13,
            }}>{c.trend === "up" ? "↑" : "↓"}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, borderRadius: 8, padding: "2px 8px",
            color: demandColor(mandi.demand),
            background: demandBg(mandi.demand),
          }}>● {mandi.demand === "high" ? "High Demand" : mandi.demand === "moderate" ? "Moderate" : "Low Alert"}</span>
          <span style={{
            fontSize: 11, fontWeight: 600, borderRadius: 8, padding: "2px 8px",
            color: crowdColor(mandi.crowd),
            background: mandi.crowd === "low" ? "#dcfce7" : mandi.crowd === "moderate" ? "#fef9c3" : "#fee2e2",
          }}>👥 {crowdLabel(mandi.crowd)}</span>
        </div>
        <span style={{ fontSize: 11, color: "#9ca3af" }}>⭐ {mandi.rating}</span>
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: 12, borderTop: "1px solid #f3f4f6",
      }}>
        <div style={{ fontSize: 11, color: "#6b7280" }}>
          🏆 <strong style={{ color: "#15803d" }}>{mandi.bestCrop}</strong> best today · {mandi.lastUpdated}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Navigate", "Call"].map(btn => (
            <button key={btn} onClick={e => e.stopPropagation()} style={{
              fontSize: 11, fontWeight: 600,
              color: btn === "Navigate" ? "white" : "#15803d",
              background: btn === "Navigate"
                ? "linear-gradient(135deg, #16a34a, #15803d)"
                : "#f0fdf4",
              border: "none", borderRadius: 8,
              padding: "5px 10px", cursor: "pointer",
              transition: "all 0.18s",
              boxShadow: btn === "Navigate" ? "0 2px 8px rgba(22,163,74,0.3)" : "none",
            }}>{btn}</button>
          ))}
          <button onClick={e => { e.stopPropagation(); onEdit(mandi); }} style={{ fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 8, border: "1px solid #16a34a", background: "white", color: "#16a34a", cursor: "pointer" }}>✏️</button>
          <button onClick={e => { e.stopPropagation(); onDelete(mandi.id); }} style={{ fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 8, border: "1px solid #dc2626", background: "white", color: "#dc2626", cursor: "pointer" }}>🗑️</button>
        </div>
      </div>
    </div>
  );
}

function MapView({ mandis, selected, onSelect }) {
  const mapMandis = [
    { ...mandis[0], mx: 310, my: 155 },
    { ...mandis[1], mx: 430, my: 225 },
    { ...mandis[2], mx: 370, my: 305 },
    { ...mandis[3], mx: 455, my: 180 },
    { ...mandis[4], mx: 200, my: 95 },
  ];
  const pinColor = (m) =>
    m.demand === "high" ? "#16a34a" : m.demand === "moderate" ? "#ca8a04" : "#dc2626";
  const sel = selected ? mapMandis.find(m => m.id === selected.id) : null;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 420 }}>
      <svg width="100%" height="100%" viewBox="0 0 600 420" style={{ display: "block" }}>
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e8f5e9" strokeWidth="0.8" />
          </pattern>
          <radialGradient id="mapbg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#dcfce7" />
          </radialGradient>
        </defs>
        <rect width="600" height="420" fill="url(#mapbg)" rx="16" />
        <rect width="600" height="420" fill="url(#grid)" rx="16" />

        {/* Road network */}
        <g stroke="#bbf7d0" strokeWidth="2.5" fill="none" opacity="0.7">
          <path d="M 100,200 Q 200,180 310,155 Q 400,135 490,120" />
          <path d="M 200,95 Q 260,140 310,155 Q 370,165 430,225" />
          <path d="M 430,225 Q 420,265 370,305" />
          <path d="M 310,155 Q 380,165 455,180" />
          <path d="M 370,305 Q 400,340 450,370" />
        </g>
        <g stroke="#86efac" strokeWidth="1.5" fill="none" opacity="0.5">
          <path d="M 50,300 Q 150,280 250,290 Q 320,295 370,305" />
          <path d="M 250,50 Q 230,70 200,95" />
          <path d="M 455,180 Q 490,210 520,250" />
        </g>

        {/* Demand zones */}
        <ellipse cx="310" cy="190" rx="90" ry="70" fill="#16a34a" opacity="0.06" />
        <ellipse cx="430" cy="225" rx="60" ry="50" fill="#ca8a04" opacity="0.06" />
        <ellipse cx="200" cy="100" rx="50" ry="40" fill="#16a34a" opacity="0.06" />

        {/* User location */}
        <circle cx="300" cy="210" r="18" fill="#3b82f6" opacity="0.15">
          <animate attributeName="r" values="14;22;14" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="210" r="8" fill="#3b82f6" stroke="white" strokeWidth="2" />
        <text x="300" y="235" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="600">You</text>

        {/* Pins */}
        {mapMandis.map(m => (
          <PulsePin
            key={m.id}
            x={m.mx} y={m.my}
            color={pinColor(m)}
            active={m.demand === "high"}
            mandi={m}
            onClick={() => onSelect(m)}
          />
        ))}
        {mapMandis.map(m => (
          <text key={m.id + "lbl"} x={m.mx} y={m.my + 24}
            textAnchor="middle" fontSize="9" fill="#374151" fontWeight="700">
            {m.name.split(" ")[0]}
          </text>
        ))}

        {/* Selected popup */}
        {sel && (
          <g>
            <rect x={Math.min(sel.mx - 85, 420)} y={sel.my - 105} width="170" height="95"
              fill="white" rx="12" stroke="#16a34a" strokeWidth="1.5"
              style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }} />
            <text x={Math.min(sel.mx - 85, 420) + 10} y={sel.my - 82} fontSize="11" fill="#14532d" fontWeight="700">{sel.name}</text>
            <text x={Math.min(sel.mx - 85, 420) + 10} y={sel.my - 66} fontSize="9.5" fill="#6b7280">📍 {sel.city} · {sel.distance} km</text>
            <text x={Math.min(sel.mx - 85, 420) + 10} y={sel.my - 50} fontSize="9.5" fill="#374151">
              🌾 ₹{sel.crops[0].price.toLocaleString()}/q  🍅 ₹{sel.crops.find(c=>c.name==="Tomato")?.price?.toLocaleString() || "N/A"}/q
            </text>
            <rect x={Math.min(sel.mx - 85, 420) + 10} y={sel.my - 38} width="60" height="18" rx="6"
              fill={sel.status === "open" ? "#dcfce7" : "#fee2e2"} />
            <text x={Math.min(sel.mx - 85, 420) + 40} y={sel.my - 25} textAnchor="middle" fontSize="9"
              fill={sel.status === "open" ? "#16a34a" : "#dc2626"} fontWeight="700">
              {sel.status === "open" ? "● OPEN" : "● CLOSED"}
            </text>
            <rect x={Math.min(sel.mx - 85, 420) + 82} y={sel.my - 38} width="68" height="18" rx="6"
              fill="#16a34a" />
            <text x={Math.min(sel.mx - 85, 420) + 116} y={sel.my - 25} textAnchor="middle" fontSize="9"
              fill="white" fontWeight="700">Navigate →</text>
          </g>
        )}

        {/* Legend */}
        <g transform="translate(14, 380)">
          <circle cx="8" cy="8" r="5" fill="#16a34a" />
          <text x="16" y="12" fontSize="9" fill="#374151">Best Price</text>
          <circle cx="70" cy="8" r="5" fill="#ca8a04" />
          <text x="78" y="12" fontSize="9" fill="#374151">Moderate</text>
          <circle cx="135" cy="8" r="5" fill="#dc2626" />
          <text x="143" y="12" fontSize="9" fill="#374151">Low Demand</text>
          <circle cx="205" cy="8" r="5" fill="#3b82f6" />
          <text x="213" y="12" fontSize="9" fill="#374151">You</text>
        </g>
      </svg>

      {/* Map controls */}
      <div style={{
        position: "absolute", top: 14, right: 14,
        display: "flex", flexDirection: "column", gap: 6,
      }}>
        {["+", "−", "⊞", "🛰"].map((btn, i) => (
          <button key={i} style={{
            width: 34, height: 34, borderRadius: 10,
            background: "white", border: "1px solid #e5e7eb",
            cursor: "pointer", fontSize: i < 2 ? 18 : 14, fontWeight: 700,
            color: "#374151", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}>{btn}</button>
        ))}
      </div>
    </div>
  );
}

export default function MandiDashboard() {
  const [mandis, setMandis] = useState(() => {
    const saved = localStorage.getItem("agro_mandis");
    return saved ? JSON.parse(saved) : DEFAULT_MANDIS;
  });
  
  useEffect(() => {
    localStorage.setItem("agro_mandis", JSON.stringify(mandis));
  }, [mandis]);

  const [selectedMandi, setSelectedMandi] = useState(mandis[0] || null);
  const [modalData, setModalData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All Crops");
  const [filterOpen, setFilterOpen] = useState(false);
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [maxDist, setMaxDist] = useState(15);
  const [aiIdx, setAiIdx] = useState(0);
  const [insightVisible, setInsightVisible] = useState(true);
  const [mobileTab, setMobileTab] = useState("list");
  const [isMobile, setIsMobile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState("distance");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setAiIdx(i => (i + 1) % AI_INSIGHTS.length);
      setInsightVisible(false);
      setTimeout(() => setInsightVisible(true), 300);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const filtered = mandis
    .filter(m => {
      const q = searchQuery.toLowerCase();
      if (q && !m.name.toLowerCase().includes(q) && !m.city.toLowerCase().includes(q)) return false;
      if (showOpenOnly && m.status !== "open") return false;
      if (m.distance > maxDist) return false;
      if (selectedCrop !== "All Crops" && !m.crops.find(c => c.name === selectedCrop)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") {
        const pa = a.crops.reduce((s, c) => s + c.price, 0) / a.crops.length;
        const pb = b.crops.reduce((s, c) => s + c.price, 0) / b.crops.length;
        return pb - pa;
      }
      return 0;
    });

  const insight = AI_INSIGHTS[aiIdx];

  const headerStyle = {
    background: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)",
    padding: isMobile ? "16px 16px 12px" : "18px 28px 14px",
    position: "sticky", top: 0, zIndex: 100,
    boxShadow: "0 4px 20px rgba(5,46,22,0.3)",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8fffe",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f0fdf4; }
        ::-webkit-scrollbar-thumb { background: #86efac; border-radius: 3px; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(22,163,74,0.15) !important; }
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.7; transform:scale(1.15); } }
        @keyframes fade-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ai-fade { animation: fade-in 0.4s ease; }
        .refresh-spin { animation: spin 1s linear infinite; }
        .filter-panel { animation: fade-in 0.2s ease; }
      `}</style>

      {/* Header */}
      <div style={headerStyle}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}>🌿</div>
              <div>
                <div style={{ color: "white", fontWeight: 700, fontSize: isMobile ? 16 : 20, letterSpacing: "-0.02em" }}>
                  Nearby Mandis
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%", background: "#4ade80",
                    animation: "pulse-dot 1.5s infinite",
                  }} />
                  <span style={{ color: "#86efac", fontSize: 11, fontWeight: 500 }}>
                    📍 New Delhi, Uttarakhand · Live
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["🎙", "⟳"].map((icon, i) => (
                <button key={i} onClick={i === 1 ? handleRefresh : undefined} style={{
                  width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.1)", color: "white",
                  cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span className={i === 1 && refreshing ? "refresh-spin" : ""}>{icon}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div style={{
              flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.12)", borderRadius: 12,
              padding: "0 14px", border: "1px solid rgba(255,255,255,0.15)",
            }}>
              <span style={{ color: "#86efac", fontSize: 15 }}>🔍</span>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search mandis, crops..."
                style={{
                  flex: 1, background: "none", border: "none", outline: "none",
                  color: "white", fontSize: 13, padding: "10px 0",
                }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}
                  style={{ background: "none", border: "none", color: "#86efac", cursor: "pointer", fontSize: 15 }}>
                  ✕
                </button>
              )}
            </div>
            <button onClick={() => setModalData({})} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "#16a34a", border: "none", borderRadius: 12,
              color: "white", cursor: "pointer", padding: "0 14px", fontSize: 12, fontWeight: 600,
            }}>
              + Add
            </button>
            <button onClick={() => setFilterOpen(!filterOpen)} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: filterOpen ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12,
              color: "white", cursor: "pointer", padding: "0 14px", fontSize: 12, fontWeight: 600,
            }}>
              ⚙ Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <div className="filter-panel" style={{
          background: "white", borderBottom: "1px solid #e5e7eb",
          padding: "16px 28px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Crop Type</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {CROPS_LIST.map(c => (
                    <button key={c} onClick={() => setSelectedCrop(c)} style={{
                      fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 10,
                      border: "1.5px solid",
                      borderColor: selectedCrop === c ? "#16a34a" : "#e5e7eb",
                      background: selectedCrop === c ? "#dcfce7" : "white",
                      color: selectedCrop === c ? "#15803d" : "#374151",
                      cursor: "pointer",
                    }}>{c}</button>
                  ))}
                </div>
              </div>
              <div style={{ minWidth: 180 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Distance: {maxDist} km
                </div>
                <input type="range" min="1" max="20" value={maxDist}
                  onChange={e => setMaxDist(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#16a34a" }} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Sort By</div>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                  padding: "6px 10px", borderRadius: 10, border: "1.5px solid #e5e7eb",
                  fontSize: 12, color: "#374151", cursor: "pointer",
                }}>
                  <option value="distance">Distance</option>
                  <option value="rating">Rating</option>
                  <option value="price">Price</option>
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Open Now</div>
                <div
                  onClick={() => setShowOpenOnly(!showOpenOnly)}
                  style={{
                    width: 40, height: 22, borderRadius: 11,
                    background: showOpenOnly ? "#16a34a" : "#e5e7eb",
                    cursor: "pointer", position: "relative", transition: "all 0.2s",
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%", background: "white",
                    position: "absolute", top: 2, transition: "left 0.2s",
                    left: showOpenOnly ? 20 : 2,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Tab Bar */}
      {isMobile && (
        <div style={{
          display: "flex", background: "white", borderBottom: "1px solid #e5e7eb",
          position: "sticky", top: isMobile ? 130 : 0, zIndex: 50,
        }}>
          {["list", "map"].map(tab => (
            <button key={tab} onClick={() => setMobileTab(tab)} style={{
              flex: 1, padding: "12px", border: "none", cursor: "pointer",
              background: mobileTab === tab ? "#f0fdf4" : "white",
              borderBottom: mobileTab === tab ? "2px solid #16a34a" : "none",
              color: mobileTab === tab ? "#15803d" : "#6b7280",
              fontSize: 13, fontWeight: 700, textTransform: "capitalize",
            }}>
              {tab === "list" ? "📋 Mandi List" : "🗺 Map View"}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0" : "20px 20px 0" }}>
        <div style={{
          display: "flex", gap: 20,
          flexDirection: isMobile ? "column" : "row",
        }}>

          {/* Left: Mandi List */}
          {(!isMobile || mobileTab === "list") && (
            <div style={{ flex: "0 0 420px", minWidth: 0 }}>
              {/* AI Insights */}
              <div className={insightVisible ? "ai-fade" : ""} style={{
                background: "linear-gradient(135deg, #052e16, #166534)",
                borderRadius: 16, padding: "14px 18px", marginBottom: 16,
                display: "flex", alignItems: "center", gap: 12,
                boxShadow: "0 4px 16px rgba(5,46,22,0.2)",
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 12,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, flexShrink: 0,
                }}>{insight.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: "#86efac", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
                    ✦ AI Insight
                  </div>
                  <div style={{ color: "white", fontSize: 12.5, fontWeight: 500, lineHeight: 1.4 }}>
                    {insight.text}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {AI_INSIGHTS.map((_, i) => (
                    <div key={i} style={{
                      width: i === aiIdx ? 16 : 5, height: 5, borderRadius: 3,
                      background: i === aiIdx ? "#4ade80" : "rgba(255,255,255,0.3)",
                      transition: "all 0.3s",
                    }} />
                  ))}
                </div>
              </div>

              {/* Count */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: 12, padding: "0 2px",
              }}>
                <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>
                  {filtered.length} mandis found
                </span>
                <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>
                  {refreshing ? "⟳ Updating..." : "● Live prices"}
                </span>
              </div>

              {/* Cards */}
              <div style={{ overflowY: "auto", maxHeight: isMobile ? "none" : "calc(100vh - 260px)", paddingRight: 4, paddingBottom: 20 }}>
                {filtered.length === 0 ? (
                  <div style={{
                    textAlign: "center", padding: "40px 20px",
                    color: "#9ca3af", fontSize: 14,
                  }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                    No mandis match your filters
                  </div>
                ) : filtered.map(m => (
                  <div key={m.id} className="card-hover" style={{ transition: "all 0.25s" }}>
                    <MandiCard
                      mandi={m}
                      selected={selectedMandi?.id === m.id}
                      onSelect={setSelectedMandi}
                      mobile={isMobile}
                      onEdit={setModalData}
                      onDelete={(id) => setMandis(prev => prev.filter(x => x.id !== id))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right: Map */}
          {(!isMobile || mobileTab === "map") && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                background: "white",
                borderRadius: 20,
                border: "1.5px solid #e5e7eb",
                overflow: "hidden",
                height: isMobile ? "65vh" : "calc(100vh - 190px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                position: "sticky",
                top: isMobile ? 160 : 20,
              }}>
                {/* Map Header */}
                <div style={{
                  padding: "14px 18px",
                  borderBottom: "1px solid #f0fdf4",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "linear-gradient(90deg, #f0fdf4, white)",
                }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "#14532d", fontSize: 14 }}>🗺 Mandi Map</div>
                    <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Click a pin for details</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["Heatmap", "Satellite", "Route"].map(btn => (
                      <button key={btn} style={{
                        fontSize: 11, fontWeight: 600, padding: "4px 10px",
                        borderRadius: 8, border: "1px solid #e5e7eb",
                        background: "white", color: "#374151", cursor: "pointer",
                      }}>{btn}</button>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div style={{ height: "calc(100% - 62px)" }}>
                  <MapView mandis={mandis} selected={selectedMandi} onSelect={setSelectedMandi} />
                </div>
              </div>

              {/* Selected Mandi Quick Info */}
              {selectedMandi && !isMobile && (
                <div style={{
                  background: "white", borderRadius: 16, border: "1.5px solid #e5e7eb",
                  padding: "16px 20px", marginTop: 14,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  animation: "fade-in 0.3s ease",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#14532d", fontSize: 14 }}>{selectedMandi.name}</div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                        {selectedMandi.city} · {selectedMandi.distance} km away · ⭐ {selectedMandi.rating}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{
                        background: "linear-gradient(135deg, #16a34a, #15803d)",
                        border: "none", borderRadius: 10, color: "white",
                        padding: "8px 16px", fontSize: 12, fontWeight: 700,
                        cursor: "pointer", boxShadow: "0 2px 8px rgba(22,163,74,0.3)",
                      }}>🧭 Navigate</button>
                      <button style={{
                        background: "#f0fdf4", border: "1px solid #bbf7d0",
                        borderRadius: 10, color: "#15803d",
                        padding: "8px 14px", fontSize: 12, fontWeight: 700,
                        cursor: "pointer",
                      }}>📞 Call</button>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                    {selectedMandi.crops.map(c => (
                      <div key={c.name} style={{
                        background: c.trend === "up" ? "#f0fdf4" : "#fff1f2",
                        borderRadius: 10, padding: "5px 10px",
                        fontSize: 12, display: "flex", gap: 5, alignItems: "center",
                        border: `1px solid ${c.trend === "up" ? "#bbf7d0" : "#fecdd3"}`,
                      }}>
                        <span style={{ fontWeight: 600, color: "#374151" }}>{c.name}</span>
                        <span style={{ color: "#374151" }}>₹{c.price.toLocaleString()}/q</span>
                        <span style={{ color: c.trend === "up" ? "#16a34a" : "#dc2626", fontWeight: 700 }}>
                          {c.trend === "up" ? "↑" : "↓"} {c.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile FAB */}
      {isMobile && (
        <div style={{
          position: "fixed", bottom: 20, right: 20, zIndex: 200,
          display: "flex", flexDirection: "column", gap: 10,
        }}>
          <button style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "linear-gradient(135deg, #16a34a, #15803d)",
            border: "none", cursor: "pointer", fontSize: 22,
            boxShadow: "0 4px 16px rgba(22,163,74,0.4)",
          }}>🎙</button>
          <button onClick={handleRefresh} style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "white", border: "2px solid #16a34a",
            cursor: "pointer", fontSize: 20,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}>
            <span className={refreshing ? "refresh-spin" : ""} style={{ display: "block" }}>⟳</span>
          </button>
        </div>
      )}

      {/* Modal for Add/Edit Mandi */}
      {modalData && (
        <MandiModal 
          data={modalData}
          onClose={() => setModalData(null)}
          onSave={(m) => {
            if (m.id) {
              setMandis(prev => prev.map(x => x.id === m.id ? m : x));
              if (selectedMandi?.id === m.id) setSelectedMandi(m);
            } else {
              const newMandi = { ...m, id: Date.now() };
              setMandis(prev => [...prev, newMandi]);
            }
            setModalData(null);
          }}
        />
      )}
    </div>
  );
}

// ─── MANDI MODAL ─────────────────────────────────────────────────────────────
function MandiModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(data.id ? data : {
    name: "", city: "", distance: 5, verified: true,
    status: "open", crowd: "low", rating: 4.5, demand: "moderate",
    lat: 28.6, lng: 77.2,
    crops: [
      { name: "Wheat", price: 2500, unit: "q", trend: "up", change: "+100" }
    ],
    bestCrop: "Wheat", lastUpdated: "Just now", image: "🌾", bookmarked: false,
  });

  const isEdit = !!data.id;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.6)", zIndex: 1000,
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      backdropFilter: "blur(4px)",
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "white", width: "100%", maxWidth: 500,
        borderRadius: "24px 24px 0 0", padding: "24px",
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.1)",
        fontFamily: "'DM Sans', sans-serif"
      }}>
        <div style={{ width: 40, height: 5, background: "#e5e7eb", borderRadius: 3, margin: "0 auto 20px" }} />
        <div style={{ fontSize: 20, fontWeight: 700, color: "#14532d", marginBottom: 20 }}>
          {isEdit ? "✏️ Edit Mandi" : "🛒 Add Mandi"}
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 6 }}>NAME</label>
            <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 14 }}
              placeholder="e.g. Azadpur Mandi" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 6 }}>CITY / LOCATION</label>
            <input value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 14 }}
              placeholder="e.g. North Delhi" />
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 6 }}>DISTANCE (km)</label>
              <input type="number" step="0.1" value={form.distance} onChange={e => setForm(f => ({...f, distance: parseFloat(e.target.value)||0}))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 14 }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 6 }}>EMOJI</label>
              <input value={form.image} onChange={e => setForm(f => ({...f, image: e.target.value}))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 14 }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 6 }}>STATUS</label>
              <select value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 14, background: "white" }}>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 6 }}>DEMAND</label>
              <select value={form.demand} onChange={e => setForm(f => ({...f, demand: e.target.value}))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 14, background: "white" }}>
                <option value="high">High</option>
                <option value="moderate">Moderate</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "14px", borderRadius: 12, border: "1px solid #d1d5db",
            background: "white", color: "#374151", fontWeight: 700, fontSize: 15, cursor: "pointer"
          }}>Cancel</button>
          <button onClick={() => onSave(form)} style={{
            flex: 1, padding: "14px", borderRadius: 12, border: "none",
            background: "#16a34a", color: "white", fontWeight: 700, fontSize: 15, cursor: "pointer",
            boxShadow: "0 4px 12px rgba(22,163,74,0.3)"
          }}>✅ Save</button>
        </div>
      </div>
    </div>
  );
}
