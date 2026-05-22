import { useState, useRef, useEffect } from "react";
import WeatherDashboard from "./WeatherDashboard";
import MandiDashboard from "./MandiDashboard";
import CropAnalysis from "./CropAnalysis";
// ─── TRANSLATIONS ───────────────────────────────────────────────────────────
const T = {
  en: {
    appName: "AgriRoots",
    tagline: "Grow Smarter. Farm Better.",
    welcomeBack: "Welcome Back 👋",
    signInSub: "Sign in to your farm account",
    phonePlaceholder: "Phone / Email",
    passwordPlaceholder: "Password",
    signIn: "Sign In to My Farm",
    orWith: "or continue with",
    newFarmer: "New farmer?",
    createAccount: "Create account →",
    goodMorning: "Good morning,",
    quickActions: "Quick Actions",
    myCrops: "My Crops",
    dashboard: "Dashboard",
    home: "Home",
    fields: "Fields",
    market: "Market",
    profile: "Profile",
    addCrop: "Add Crop",
    editCrop: "Edit Crop",
    deleteCrop: "Delete",
    cropName: "Crop Name",
    cropField: "Field Name",
    cropStatus: "Status",
    cropProgress: "Progress (%)",
    cropEmoji: "Crop Icon",
    save: "Save",
    cancel: "Cancel",
    done: "Done",
    addTask: "Add Task",
    editTask: "Edit Task",
    taskName: "Task Name",
    taskTime: "Time",
    todayTasks: "Today's Tasks",
    marketPrices: "Market Prices",
    fieldOverview: "Field Overview",
    totalYield: "Total Yield",
    waterUsed: "Water Used",
    activeFields: "Active Fields",
    revenueEst: "Revenue Est.",
    rainAlert: "Rain forecast in 2 days",
    rainAlertBody: "Consider harvesting Field A early. Est. 18mm rainfall.",
    humidity: "humidity",
    wind: "wind",
    harvestIn: "Ready for harvest in",
    days: "days",
    justPlanted: "Just planted",
    week: "Week",
    editProfile: "Edit Profile",
    farmerName: "Farmer Name",
    location: "Location",
    season: "Season",
    editField: "Edit Field Info",
    totalHectares: "Total Hectares",
    vsLastSeason: "vs last season",
    thisWeek: "this week",
    needsAttention: "needs attention",
    onTarget: "on target",
    deleteConfirm: "Delete this item?",
    pricePerTon: "/ton",
    today: "today",
    edit: "Edit",
    markDone: "Mark Done",
    spring: "Spring",
    addMarket: "Add Market Item",
    cropBg: "Card Color",
    addField: "Add Field",
    editFieldMap: "Edit Field",
    fieldName: "Field Name",
    cropType: "Crop Type",
    fieldSize: "Field Size (ha)",
    irrigationNote: "Irrigation",
    readyHarvest: "Ready for harvest",
    growing: "Growing",
    planted: "Planted",
  },
  hi: {
    appName: "AgriRoots",
    tagline: "स्मार्ट खेती, बेहतर जीवन",
    welcomeBack: "स्वागत है 👋",
    signInSub: "अपने खेत खाते में प्रवेश करें",
    phonePlaceholder: "फ़ोन / ईमेल",
    passwordPlaceholder: "पासवर्ड",
    signIn: "मेरे खेत में प्रवेश करें",
    orWith: "या इससे जारी रखें",
    newFarmer: "नए किसान?",
    createAccount: "खाता बनाएं →",
    goodMorning: "सुप्रभात,",
    quickActions: "त्वरित क्रियाएँ",
    myCrops: "मेरी फसलें",
    dashboard: "डैशबोर्ड",
    home: "होम",
    fields: "खेत",
    market: "बाज़ार",
    profile: "प्रोफ़ाइल",
    addCrop: "फसल जोड़ें",
    editCrop: "फसल संपादित करें",
    deleteCrop: "हटाएं",
    cropName: "फसल का नाम",
    cropField: "खेत का नाम",
    cropStatus: "स्थिति",
    cropProgress: "प्रगति (%)",
    cropEmoji: "फसल आइकन",
    save: "सहेजें",
    cancel: "रद्द करें",
    done: "हो गया",
    addTask: "कार्य जोड़ें",
    editTask: "कार्य संपादित करें",
    taskName: "कार्य का नाम",
    taskTime: "समय",
    todayTasks: "आज के कार्य",
    marketPrices: "बाज़ार भाव",
    fieldOverview: "खेत का अवलोकन",
    totalYield: "कुल उत्पादन",
    waterUsed: "पानी उपयोग",
    activeFields: "सक्रिय खेत",
    revenueEst: "अनुमानित आय",
    rainAlert: "2 दिनों में बारिश का अनुमान",
    rainAlertBody: "खेत A की फसल जल्दी काटें। 18mm बारिश का अनुमान है।",
    humidity: "नमी",
    wind: "हवा",
    harvestIn: "कटाई में",
    days: "दिन",
    justPlanted: "अभी बोया",
    week: "सप्ताह",
    editProfile: "प्रोफ़ाइल संपादित करें",
    farmerName: "किसान का नाम",
    location: "स्थान",
    season: "मौसम",
    editField: "खेत की जानकारी संपादित करें",
    totalHectares: "कुल हेक्टेयर",
    vsLastSeason: "पिछले मौसम से",
    thisWeek: "इस हफ्ते",
    needsAttention: "ध्यान चाहिए",
    onTarget: "लक्ष्य पर",
    deleteConfirm: "इसे हटाएं?",
    pricePerTon: "/टन",
    today: "आज",
    edit: "संपादित",
    markDone: "पूर्ण करें",
    spring: "बसंत",
    addMarket: "बाज़ार आइटम जोड़ें",
    cropBg: "कार्ड रंग",
    addField: "खेत जोड़ें",
    editFieldMap: "खेत संपादित करें",
    fieldName: "खेत का नाम",
    cropType: "फसल का प्रकार",
    fieldSize: "खेत का आकार (हे)",
    irrigationNote: "सिंचाई",
    readyHarvest: "कटाई के लिए तैयार",
    growing: "बढ़ रही है",
    planted: "बोई गई",
  },
};

const EMOJI_OPTIONS = ["🌾","🌽","🥕","🍅","🥔","🧅","🧄","🌻","🫘","🍆","🥦","🌿","🌱","🍈","🍋","🍇","🍓","🫑","🥭","🍌"];
const BG_OPTIONS = ["#E8F5E0","#FDF8E0","#FFF0E8","#E0F0F8","#F8E8F0","#EEF0FF","#F5E8D0","#E8F0D0"];

// ─── STYLES ─────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Nunito:wght@300;400;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'Nunito', 'Noto Sans Devanagari', sans-serif; }

  .app-wrap {
    font-family: 'Nunito', 'Noto Sans Devanagari', sans-serif;
    background: linear-gradient(160deg, #0d1f0f 0%, #1a1208 60%, #0d100a 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 10px 40px;
    gap: 14px;
  }

  .top-controls {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }

  .screen-nav {
    display: flex;
    gap: 6px;
    background: rgba(255,255,255,0.07);
    border-radius: 40px;
    padding: 5px;
    border: 1px solid rgba(200,168,75,0.25);
  }
  .nav-btn {
    padding: 7px 14px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    font-family: 'Nunito','Noto Sans Devanagari',sans-serif;
    font-weight: 700;
    font-size: 12px;
    transition: all 0.25s;
    background: transparent;
    color: rgba(255,255,255,0.45);
  }
  .nav-btn.active {
    background: linear-gradient(135deg,#C8A84B,#E8C547);
    color: #1a1208;
    box-shadow: 0 4px 16px rgba(200,168,75,0.35);
  }

  .lang-toggle {
    display: flex;
    gap: 0;
    background: rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 3px;
    border: 1px solid rgba(200,168,75,0.2);
    overflow: hidden;
  }
  .lang-btn {
    padding: 6px 14px;
    border-radius: 16px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 12px;
    font-family: 'Nunito','Noto Sans Devanagari',sans-serif;
    transition: all 0.2s;
    background: transparent;
    color: rgba(255,255,255,0.5);
  }
  .lang-btn.active {
    background: linear-gradient(135deg,#2E6B3E,#4A7C59);
    color: white;
  }

  /* ── PHONE ── */
  .phone-frame {
    width: 375px;
    max-width: 100vw;
    min-height: 780px;
    border-radius: 46px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 0 2px #3a2a1a, 0 0 0 8px #111, 0 30px 80px rgba(0,0,0,0.7);
    border: 1.5px solid rgba(200,168,75,0.18);
    background: #FAF3E0;
  }

  /* ── MODAL ── */
  .modal-overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(4px);
    z-index: 100;
    display: flex;
    align-items: flex-end;
    animation: fadeIn 0.2s;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .modal-sheet {
    background: #FAF3E0;
    border-radius: 28px 28px 0 0;
    padding: 24px 22px 36px;
    width: 100%;
    max-height: 88%;
    overflow-y: auto;
    animation: slideUp 0.25s ease;
  }
  @keyframes slideUp { from{transform:translateY(60px);opacity:0} to{transform:translateY(0);opacity:1} }
  .modal-handle {
    width: 40px; height: 4px;
    background: #C8A84B;
    border-radius: 2px;
    margin: 0 auto 18px;
  }
  .modal-title {
    font-family: 'Playfair Display',serif;
    font-size: 20px;
    color: #3D2B1F;
    font-weight: 700;
    margin-bottom: 16px;
  }
  .form-group { margin-bottom: 14px; }
  .form-label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: #5C3D2E;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 6px;
    font-family: 'Nunito','Noto Sans Devanagari',sans-serif;
  }
  .form-input {
    width: 100%;
    padding: 11px 14px;
    background: #F0E8D0;
    border: 2px solid transparent;
    border-radius: 12px;
    font-family: 'Nunito','Noto Sans Devanagari',sans-serif;
    font-size: 14px;
    color: #3D2B1F;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-input:focus { border-color: #4A7C59; }
  .emoji-grid {
    display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;
  }
  .emoji-opt {
    width: 40px; height: 40px;
    border-radius: 10px;
    border: 2px solid #E8DCC8;
    background: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .emoji-opt.sel { border-color: #4A7C59; background: #E8F5E0; transform: scale(1.1); }
  .bg-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
  .bg-opt {
    width: 34px; height: 34px;
    border-radius: 8px;
    border: 2px solid #E8DCC8;
    cursor: pointer;
    transition: all 0.15s;
  }
  .bg-opt.sel { border-color: #4A7C59; transform: scale(1.15); }
  .modal-btns { display: flex; gap: 10px; margin-top: 18px; }
  .btn-primary {
    flex: 1; padding: 13px;
    background: linear-gradient(135deg,#2E6B3E,#4A7C59);
    color: white; border: none; border-radius: 14px;
    font-family: 'Nunito','Noto Sans Devanagari',sans-serif;
    font-size: 15px; font-weight: 700; cursor: pointer;
    box-shadow: 0 6px 20px rgba(46,107,62,0.35);
  }
  .btn-danger {
    flex:1; padding:13px;
    background: linear-gradient(135deg,#C46A3E,#E07040);
    color:white; border:none; border-radius:14px;
    font-family:'Nunito','Noto Sans Devanagari',sans-serif;
    font-size:15px; font-weight:700; cursor:pointer;
  }
  .btn-secondary {
    padding: 13px 20px;
    background: #EEE8D5;
    color: #5C3D2E; border: none; border-radius: 14px;
    font-family: 'Nunito','Noto Sans Devanagari',sans-serif;
    font-size: 15px; font-weight: 700; cursor: pointer;
  }

  /* ── LOGIN ── */
  .login-screen {
    min-height: 780px;
    background: linear-gradient(170deg,#1B3A2A,#2E6B3E 45%,#4A7C59 75%,#3D5A3E);
    display: flex; flex-direction: column;
    position: relative; overflow: hidden;
  }
  .login-sun {
    position: absolute; top:-70px; right:-50px;
    width:210px; height:210px; border-radius:50%;
    background: radial-gradient(circle,#F4A261,#E8C547 40%,transparent 70%);
    filter: blur(2px); opacity:0.55;
  }
  .login-content {
    position: relative; z-index:2;
    display: flex; flex-direction:column; align-items:center;
    padding: 65px 28px 28px; gap:6px;
  }
  .login-logo {
    font-family:'Playfair Display',serif;
    font-size:36px; font-weight:900;
    color:#FAF3E0; letter-spacing:-1px;
    text-shadow:0 2px 20px rgba(0,0,0,0.3); line-height:1;
  }
  .login-logo span{color:#E8C547;}
  .login-tagline{
    font-size:12px; color:rgba(250,243,224,0.6);
    letter-spacing:1.5px; text-transform:uppercase; font-weight:600;
    font-family:'Nunito','Noto Sans Devanagari',sans-serif;
  }
  .login-card{
    background:rgba(250,243,224,0.97);
    border-radius:26px; padding:26px 24px;
    width:100%;
    box-shadow:0 -20px 60px rgba(0,0,0,0.2),0 20px 40px rgba(0,0,0,0.1);
    margin-top:12px;
  }
  .login-card h2{
    font-family:'Playfair Display',serif;
    font-size:22px; color:#3D2B1F; margin-bottom:4px;
  }
  .login-card p{font-size:13px;color:#7a6a5a;margin-bottom:20px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .field-group{display:flex;flex-direction:column;gap:12px;margin-bottom:18px;}
  .field-label{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5C3D2E;margin-bottom:4px;display:block;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .field-input{
    background:#F4EDD8;border:2px solid transparent;border-radius:13px;
    padding:12px 14px;display:flex;align-items:center;gap:10px;
  }
  .field-input.focused{border-color:#4A7C59;}
  .field-text{color:#9a8a7a;font-size:14px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .login-btn{
    width:100%;padding:15px;
    background:linear-gradient(135deg,#2E6B3E,#4A7C59);
    color:#FAF3E0;border:none;border-radius:15px;
    font-family:'Nunito','Noto Sans Devanagari',sans-serif;
    font-size:15px;font-weight:700;cursor:pointer;
    box-shadow:0 8px 25px rgba(46,107,62,0.4);
    display:flex;align-items:center;justify-content:center;gap:8px;
  }
  .login-divider{
    display:flex;align-items:center;gap:10px;
    margin:14px 0;color:#9a8a7a;font-size:12px;
    font-family:'Nunito','Noto Sans Devanagari',sans-serif;
  }
  .login-divider::before,.login-divider::after{content:'';flex:1;height:1px;background:#ddd;}
  .social-row{display:flex;gap:10px;}
  .social-btn{
    flex:1;padding:11px;border:2px solid #E8DCC8;border-radius:12px;
    display:flex;align-items:center;justify-content:center;gap:6px;
    font-size:13px;color:#5C3D2E;font-weight:600;cursor:pointer;background:white;
    font-family:'Nunito','Noto Sans Devanagari',sans-serif;
  }
  .login-footer{
    text-align:center;margin-top:14px;font-size:13px;color:#9a8a7a;
    font-family:'Nunito','Noto Sans Devanagari',sans-serif;
  }
  .login-footer a{color:#4A7C59;font-weight:700;}

  /* ── HOME ── */
  .home-screen{min-height:780px;background:#FAF3E0;display:flex;flex-direction:column;}
  .home-header{
    background:linear-gradient(150deg,#1B3A2A,#2E6B3E);
    padding:46px 22px 68px;position:relative;overflow:hidden;
  }
  .home-top-row{
    display:flex;justify-content:space-between;align-items:flex-start;
    position:relative;z-index:2;margin-bottom:18px;
  }
  .home-greeting{color:rgba(250,243,224,0.65);font-size:13px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .home-name{
    font-family:'Playfair Display',serif;
    font-size:24px;color:#FAF3E0;font-weight:700;line-height:1.1;
  }
  .home-avatar{
    width:46px;height:46px;border-radius:50%;
    background:linear-gradient(135deg,#C8A84B,#E8C547);
    display:flex;align-items:center;justify-content:center;
    font-size:22px;box-shadow:0 4px 14px rgba(0,0,0,0.2);
    cursor:pointer;
  }
  .weather-pill{
    position:relative;z-index:2;
    background:rgba(255,255,255,0.12);backdrop-filter:blur(10px);
    border-radius:16px;padding:14px 16px;
    display:flex;align-items:center;justify-content:space-between;
    border:1px solid rgba(255,255,255,0.14);
  }
  .weather-temp{font-family:'Playfair Display',serif;font-size:30px;color:#FAF3E0;line-height:1;}
  .weather-desc{color:rgba(250,243,224,0.7);font-size:12px;margin-top:2px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .weather-loc{color:rgba(250,243,224,0.5);font-size:11px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .weather-icon{font-size:40px;}
  .weather-details{display:flex;gap:14px;margin-top:8px;}
  .weather-detail{
    display:flex;align-items:center;gap:4px;
    color:rgba(250,243,224,0.6);font-size:11px;
    font-family:'Nunito','Noto Sans Devanagari',sans-serif;
  }
  .home-body{flex:1;padding:0 18px 20px;margin-top:-28px;display:flex;flex-direction:column;gap:16px;}
  .section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;}
  .section-title{font-family:'Playfair Display',serif;font-size:17px;color:#3D2B1F;font-weight:700;}
  .add-btn{
    background:linear-gradient(135deg,#2E6B3E,#4A7C59);
    color:white;border:none;border-radius:10px;
    padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer;
    font-family:'Nunito','Noto Sans Devanagari',sans-serif;
  }
  .quick-actions{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;}
  .qa-item{
    background:white;border-radius:16px;padding:12px 6px;
    display:flex;flex-direction:column;align-items:center;gap:7px;
    box-shadow:0 2px 10px rgba(0,0,0,0.06);cursor:pointer;
    position:relative;transition:transform 0.15s;
  }
  .qa-item:active{transform:scale(0.95);}
  .qa-icon{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;}
  .qa-label{font-size:9.5px;font-weight:700;color:#5C3D2E;text-align:center;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .crop-card{
    background:white;border-radius:18px;padding:14px;
    display:flex;align-items:center;gap:12px;
    box-shadow:0 2px 10px rgba(0,0,0,0.06);
    position:relative;
  }
  .crop-emoji{width:50px;height:50px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;}
  .crop-info{flex:1;}
  .crop-name{font-weight:700;color:#3D2B1F;font-size:14px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .crop-status{font-size:11px;color:#7a6a5a;margin-top:2px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .crop-bar-wrap{width:100%;height:5px;background:#F0E8D0;border-radius:3px;margin-top:8px;overflow:hidden;}
  .crop-bar{height:100%;border-radius:3px;background:linear-gradient(90deg,#4A7C59,#E8C547);}
  .crop-pct{font-size:11px;color:#4A7C59;font-weight:700;flex-shrink:0;}
  .crop-edit-btn{
    position:absolute;top:10px;right:10px;
    background:rgba(74,124,89,0.12);border:none;border-radius:8px;
    padding:4px 10px;font-size:11px;color:#4A7C59;font-weight:700;cursor:pointer;
    font-family:'Nunito','Noto Sans Devanagari',sans-serif;
  }
  .alert-card{
    background:linear-gradient(135deg,#FFF4E6,#FFF0DC);
    border:1.5px solid #F4A261;border-radius:15px;padding:13px;
    display:flex;gap:10px;align-items:center;
  }
  .alert-icon{font-size:24px;}
  .alert-title{font-weight:700;color:#C46A3E;font-size:13px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .alert-body{font-size:11px;color:#7a6a5a;margin-top:2px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}

  /* ── BOTTOM NAV ── */
  .bottom-nav{
    background:white;border-top:1px solid #EEE8D5;
    padding:10px 16px 18px;display:flex;justify-content:space-around;
  }
  .bnav-item{
    display:flex;flex-direction:column;align-items:center;gap:3px;
    cursor:pointer;padding:4px 10px;border-radius:12px;transition:all 0.2s;
  }
  .bnav-item.active{background:rgba(74,124,89,0.1);}
  .bnav-icon{font-size:20px;}
  .bnav-label{font-size:9px;font-weight:700;color:#9a8a7a;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .bnav-item.active .bnav-label{color:#4A7C59;}

  /* ── DASHBOARD ── */
  .dash-screen{min-height:780px;background:#F4EDD8;display:flex;flex-direction:column;}
  .dash-header{
    background:linear-gradient(135deg,#3D2B1F,#5C3D2E);
    padding:46px 22px 26px;position:relative;overflow:hidden;
  }
  .dash-header-row{display:flex;justify-content:space-between;align-items:center;position:relative;z-index:2;}
  .dash-title{font-family:'Playfair Display',serif;color:#FAF3E0;font-size:22px;font-weight:700;}
  .dash-date{color:rgba(250,243,224,0.5);font-size:11px;margin-top:2px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .dash-body{flex:1;padding:18px 16px;display:flex;flex-direction:column;gap:16px;overflow-y:auto;}
  .stat-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .stat-card{background:white;border-radius:18px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);}
  .stat-label{font-size:10px;color:#9a8a7a;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .stat-value{font-family:'Playfair Display',serif;font-size:26px;color:#3D2B1F;font-weight:700;margin:4px 0 2px;line-height:1;}
  .stat-trend{font-size:11px;font-weight:600;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .stat-trend.up{color:#4A7C59;}
  .stat-trend.down{color:#C46A3E;}
  .stat-icon-bg{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:8px;}
  .field-map{background:white;border-radius:18px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.06);}
  .field-map-header{padding:14px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #F0E8D0;}
  .field-map-title{font-weight:700;color:#3D2B1F;font-size:14px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .field-map-sub{font-size:10px;color:#9a8a7a;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .view-btn{font-size:11px;color:#4A7C59;font-weight:700;background:rgba(74,124,89,0.1);padding:5px 10px;border-radius:8px;cursor:pointer;border:none;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .field-svg-wrap{padding:14px;}
  .task-list{display:flex;flex-direction:column;gap:9px;}
  .task-item{
    background:white;border-radius:14px;padding:12px 14px;
    display:flex;align-items:center;gap:10px;
    box-shadow:0 1px 6px rgba(0,0,0,0.05);
  }
  .task-check{
    width:22px;height:22px;border-radius:7px;border:2px solid #4A7C59;
    flex-shrink:0;display:flex;align-items:center;justify-content:center;
    font-size:12px;cursor:pointer;transition:all 0.2s;
  }
  .task-check.done{background:#4A7C59;color:white;border-color:#4A7C59;}
  .task-name{font-size:13px;color:#3D2B1F;font-weight:600;flex:1;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .task-time{font-size:11px;color:#9a8a7a;flex-shrink:0;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .task-name.done-text{text-decoration:line-through;color:#9a8a7a;}
  .task-edit-btn{
    background:none;border:none;font-size:15px;cursor:pointer;
    padding:2px 4px;border-radius:6px;
    color:#9a8a7a;transition:color 0.2s;
  }
  .task-edit-btn:hover{color:#4A7C59;}
  .market-scroll{display:flex;gap:10px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
  .market-card{
    background:white;border-radius:16px;padding:12px 14px;min-width:120px;
    box-shadow:0 2px 10px rgba(0,0,0,0.06);flex-shrink:0;position:relative;
  }
  .market-crop{font-size:20px;margin-bottom:5px;}
  .market-name{font-size:11px;color:#7a6a5a;font-weight:600;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .market-price{font-family:'Playfair Display',serif;font-size:18px;color:#3D2B1F;font-weight:700;margin:3px 0;}
  .market-change{font-size:10px;font-weight:700;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .market-change.up{color:#4A7C59;}
  .market-change.down{color:#C46A3E;}
  .market-edit{
    position:absolute;top:6px;right:6px;
    background:none;border:none;font-size:13px;cursor:pointer;opacity:0.4;
  }
  .profile-card{
    background:white;border-radius:18px;padding:18px;
    box-shadow:0 2px 10px rgba(0,0,0,0.06);
    display:flex;align-items:center;gap:14px;
  }
  .profile-avatar{
    width:60px;height:60px;border-radius:50%;
    background:linear-gradient(135deg,#C8A84B,#E8C547);
    display:flex;align-items:center;justify-content:center;font-size:30px;
    flex-shrink:0;
  }
  .profile-name{font-family:'Playfair Display',serif;font-size:20px;color:#3D2B1F;font-weight:700;}
  .profile-loc{font-size:12px;color:#7a6a5a;margin-top:3px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
  .tag-chip{
    display:inline-block;
    background:#E8F5E0;color:#4A7C59;
    border-radius:8px;padding:3px 10px;
    font-size:11px;font-weight:700;margin-top:6px;
    font-family:'Nunito','Noto Sans Devanagari',sans-serif;
  }
  .hint-text{font-size:11px;color:rgba(255,255,255,0.3);text-align:center;margin-top:4px;font-family:'Nunito','Noto Sans Devanagari',sans-serif;}
`;

// ─── FARM SVG ILLUSTRATION ──────────────────────────────────────────────────
const FarmIllus = () => (
  <svg viewBox="0 0 210 120" width="200" height="120">
    <circle cx="175" cy="26" r="18" fill="#E8C547" opacity="0.9"/>
    {[0,45,90,135,180,225,270,315].map((d,i)=>(
      <line key={i} x1={175+22*Math.cos(d*Math.PI/180)} y1={26+22*Math.sin(d*Math.PI/180)} x2={175+30*Math.cos(d*Math.PI/180)} y2={26+30*Math.sin(d*Math.PI/180)} stroke="#E8C547" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>
    ))}
    <ellipse cx="58" cy="20" rx="20" ry="9" fill="rgba(255,255,255,0.45)"/>
    <ellipse cx="74" cy="16" rx="14" ry="9" fill="rgba(255,255,255,0.45)"/>
    <ellipse cx="42" cy="18" rx="12" ry="7" fill="rgba(255,255,255,0.45)"/>
    <ellipse cx="110" cy="105" rx="130" ry="36" fill="#4A7C59" opacity="0.35"/>
    <rect x="0" y="90" width="210" height="30" fill="#4A7C59" opacity="0.55" rx="2"/>
    <rect x="26" y="56" width="48" height="38" fill="#C46A3E"/>
    <polygon points="18,60 76,60 50,38" fill="#3D2B1F"/>
    <rect x="41" y="75" width="14" height="19" fill="#2E2018" rx="2"/>
    <rect x="28" y="62" width="11" height="11" fill="#FAF3E0" opacity="0.75" rx="1"/>
    <rect x="63" y="62" width="11" height="11" fill="#FAF3E0" opacity="0.75" rx="1"/>
    <rect x="80" y="62" width="16" height="30" fill="#A0826D" rx="2"/>
    <ellipse cx="88" cy="62" rx="8" ry="4" fill="#8A6A55"/>
    {[108,118,128,138,148,158,168,178,188,198].map((x,i)=>(
      <g key={i}>
        <line x1={x} y1={90} x2={x} y2={72} stroke="#C8A84B" strokeWidth="2"/>
        <ellipse cx={x} cy={70} rx="3.5" ry="6" fill="#E8C547" opacity="0.9"/>
        <line x1={x} y1={82} x2={x-6} y2={76} stroke="#C8A84B" strokeWidth="1.3"/>
        <line x1={x} y1={82} x2={x+6} y2={76} stroke="#C8A84B" strokeWidth="1.3"/>
      </g>
    ))}
    <rect x="138" y="82" width="26" height="16" fill="#C46A3E" rx="2"/>
    <rect x="134" y="87" width="9" height="9" fill="#3D2B1F" rx="1"/>
    <circle cx="145" cy="100" r="6" fill="#2E2018"/>
    <circle cx="160" cy="100" r="5.5" fill="#2E2018"/>
  </svg>
);

// ─── FIELD MAP SVG ──────────────────────────────────────────────────────────
const FieldMapSVG = ({ fields }) => {
  const colors = ["#4A7C59","#C8A84B","#A0826D","#2E6B3E","#C46A3E","#7A9CBB"];
  return (
    <svg viewBox="0 0 320 150" width="100%" height="150">
      <rect width="320" height="150" fill="#e8f5e0" rx="8"/>
      {fields.slice(0,4).map((f,i)=>{
        const rects = [
          {x:10,y:10,w:130,h:80},{x:150,y:10,w:100,h:55},
          {x:258,y:10,w:50,h:55},{x:150,y:72,w:158,h:60},
        ];
        const r = rects[i] || {x:10+i*60,y:10,w:50,h:40};
        return (
          <g key={i}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="6" fill={colors[i%colors.length]} opacity="0.8"/>
            <text x={r.x+r.w/2} y={r.y+r.h/2-6} textAnchor="middle" fontSize="10" fill="white" fontWeight="bold" fontFamily="Nunito,sans-serif">{f.name}</text>
            <text x={r.x+r.w/2} y={r.y+r.h/2+8} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.8)" fontFamily="Nunito,sans-serif">{f.crop} · {f.size}ha</text>
          </g>
        );
      })}
    </svg>
  );
};

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState("login");
  const [email, setEmail] = useState("demo@farm.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const t = T[lang];

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://agro-tech-qfuy.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setScreen("home");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      setError("Please enter both email and password to register.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://agro-tech-qfuy.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Demo Farmer", email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setScreen("home");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  // Profile
  const [profile, setProfile] = useState({ name: "Farmer John", emoji: "🧑🌾", location: "Fresno, California" });

  // Crops
  const [crops, setCrops] = useState([
    { id:1, emoji:"🌾", name:"Wheat — Field A", nameh:"गेहूँ — खेत A", status:"Ready for harvest in 12 days", statush:"12 दिनों में कटाई", pct:88, bg:"#E8F5E0" },
    { id:2, emoji:"🌽", name:"Corn — Field B", nameh:"मक्का — खेत B", status:"Growing · Week 7/16", statush:"बढ़ रही है · सप्ताह 7/16", pct:44, bg:"#FDF8E0" },
    { id:3, emoji:"🥕", name:"Carrots — Field C", nameh:"गाजर — खेत C", status:"Just planted · Needs water", statush:"अभी बोई · पानी चाहिए", pct:12, bg:"#FFF0E8" },
  ]);

  // Tasks
  const [tasks, setTasks] = useState([
    { id:1, name:"Irrigate Field C", nameh:"खेत C में सिंचाई", time:"6:00 AM", done:true },
    { id:2, name:"Apply fertilizer — Field A", nameh:"खेत A में खाद डालें", time:"9:00 AM", done:true },
    { id:3, name:"Check pest traps — Field B", nameh:"खेत B में कीट जाल जांचें", time:"11:00 AM", done:false },
    { id:4, name:"Harvest inspection — Field A", nameh:"खेत A निरीक्षण", time:"2:00 PM", done:false },
    { id:5, name:"Log soil readings", nameh:"मिट्टी की रिपोर्ट दर्ज करें", time:"5:00 PM", done:false },
  ]);

  // Market
  const [market, setMarket] = useState(() => {
    const saved = localStorage.getItem("agroMarketData");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id:1, emoji:"🌾", name:"Wheat", nameh:"गेहूँ", price:"245", change:"+2.1%", up:true },
      { id:2, emoji:"🌽", name:"Corn", nameh:"मक्का", price:"178", change:"-0.8%", up:false },
      { id:3, emoji:"🥕", name:"Carrots", nameh:"गाजर", price:"89", change:"+5.3%", up:true },
      { id:4, emoji:"🍅", name:"Tomato", nameh:"टमाटर", price:"320", change:"+1.2%", up:true },
      { id:5, emoji:"🌻", name:"Sunflower", nameh:"सूरजमुखी", price:"198", change:"-1.4%", up:false },
    ];
  });

  useEffect(() => {
    localStorage.setItem("agroMarketData", JSON.stringify(market));
  }, [market]);

  // Fields (for map)
  const [fields, setFields] = useState([
    { id:1, name:"Field A", nameh:"खेत A", crop:"Wheat", croph:"गेहूँ", size:"4.2" },
    { id:2, name:"Field B", nameh:"खेत B", crop:"Corn", croph:"मक्का", size:"2.1" },
    { id:3, name:"Field C", nameh:"खेत C", crop:"Carrots", croph:"गाजर", size:"1.8" },
    { id:4, name:"Field D", nameh:"खेत D", crop:"Fallow", croph:"परती", size:"1.1" },
  ]);

  // Weather
  const [weather, setWeather] = useState({ temp:"24", desc:"Partly Cloudy", desch:"आंशिक बादल", loc:"Fresno, California", humidity:"62", wind:"14" });

  // Stats
  const [stats, setStats] = useState({ yield:"4.8t", water:"820L", revenue:"$12k" });

  // Modals
  const [modal, setModal] = useState(null); // {type, data}

  const closeModal = () => setModal(null);

  // ── Crop helpers
  const saveCrop = (crop) => {
    if (crop.id) {
      setCrops(prev => prev.map(c => c.id === crop.id ? crop : c));
    } else {
      setCrops(prev => [...prev, { ...crop, id: Date.now() }]);
    }
    closeModal();
  };
  const deleteCrop = (id) => { setCrops(prev => prev.filter(c => c.id !== id)); closeModal(); };

  // ── Task helpers
  const saveTask = (task) => {
    if (task.id) {
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
    } else {
      setTasks(prev => [...prev, { ...task, id: Date.now(), done: false }]);
    }
    closeModal();
  };
  const deleteTask = (id) => { setTasks(prev => prev.filter(t => t.id !== id)); closeModal(); };
  const toggleTask = (id) => setTasks(prev => prev.map(t => t.id === id ? {...t, done:!t.done} : t));

  // ── Market helpers
  const saveMarket = (item) => {
    if (item.id) {
      setMarket(prev => prev.map(m => m.id === item.id ? item : m));
    } else {
      setMarket(prev => [...prev, { ...item, id: Date.now() }]);
    }
    closeModal();
  };
  const deleteMarket = (id) => { setMarket(prev => prev.filter(m => m.id !== id)); closeModal(); };

  // ── Field helpers
  const saveField = (f) => {
    if (f.id) {
      setFields(prev => prev.map(x => x.id === f.id ? f : x));
    } else {
      setFields(prev => [...prev, { ...f, id: Date.now() }]);
    }
    closeModal();
  };
  const deleteField = (id) => { setFields(prev => prev.filter(f => f.id !== id)); closeModal(); };

  // ── Profile helper
  const saveProfile = (p) => { setProfile(p); closeModal(); };
  const saveWeather = (w) => { setWeather(w); closeModal(); };

  const totalHa = fields.reduce((s,f) => s + parseFloat(f.size||0), 0).toFixed(1);

  return (
    <>
      <style>{styles}</style>
      <div className="app-wrap">
        {/* TOP CONTROLS */}
        <div className="top-controls">
          <div className="lang-toggle">
            <button className={`lang-btn ${lang==="en"?"active":""}`} onClick={()=>setLang("en")}>🇬🇧 EN</button>
            <button className={`lang-btn ${lang==="hi"?"active":""}`} onClick={()=>setLang("hi")}>🇮🇳 हिंदी</button>
          </div>
          <div className="screen-nav">
            {[{id:"login",label:"🔑"},{id:"home",label:"🏠"},{id:"dashboard",label:"📊"}, {id:"weather",label:"🌦️"}, {id:"mandi",label:"🛒"}, {id:"crop",label:"🌾"}].map(s=>(
              <button key={s.id} className={`nav-btn ${screen===s.id?"active":""}`} onClick={()=>setScreen(s.id)}>{s.label}</button>
            ))}
          </div>
        </div>

        {/* PHONE */}
        <div className="phone-frame">

          {/* ── LOGIN ─────────────────────────────── */}
          {screen==="login" && (
            <div className="login-screen">
              <div className="login-sun"/>
              <div className="login-content">
                <div className="login-logo">🌾 Agri<span>Roots</span></div>
                <div className="login-tagline">{t.tagline}</div>
                <FarmIllus/>
                <div className="login-card">
                  <h2>{t.welcomeBack}</h2>
                  <p>{t.signInSub}</p>
                  {error && <div style={{color: "#ef4444", fontSize: 13, marginBottom: 12, textAlign: "center", fontWeight: "bold"}}>{error}</div>}
                  <div className="field-group">
                    <div>
                      <span className="field-label">{t.phonePlaceholder}</span>
                      <div className="field-input focused">
                        <span>📱</span>
                        <input type="text" placeholder="demo@farm.com" value={email} onChange={e => setEmail(e.target.value)} style={{border: "none", background: "transparent", outline: "none", flex: 1, fontSize: 14, color: "#3D2B1F"}} />
                      </div>
                    </div>
                    <div>
                      <span className="field-label">{t.passwordPlaceholder}</span>
                      <div className="field-input">
                        <span>🔒</span>
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{border: "none", background: "transparent", outline: "none", flex: 1, fontSize: 14, color: "#3D2B1F"}} />
                      </div>
                    </div>
                  </div>
                  <button className="login-btn" onClick={handleLogin} disabled={loading}>
                    {loading ? "⌛ Loading..." : `🌱 ${t.signIn}`}
                  </button>
                  <div className="login-divider">{t.orWith}</div>
                  <div className="social-row">
                    <div className="social-btn">🇬 Google</div>
                    <div className="social-btn">🍎 Apple</div>
                  </div>
                  <div className="login-footer">{t.newFarmer} <a onClick={handleRegister} style={{cursor: "pointer"}}>{t.createAccount}</a></div>
                </div>
              </div>
            </div>
          )}

          {/* ── HOME ──────────────────────────────── */}
          {screen==="home" && (
            <div className="home-screen">
              <div className="home-header">
                <div className="home-top-row">
                  <div>
                    <div className="home-greeting">{t.goodMorning}</div>
                    <div className="home-name">{profile.emoji} {lang==="hi" ? profile.name : profile.name}</div>
                  </div>
                  <div className="home-avatar" onClick={()=>setModal({type:"profile",data:{...profile}})}>{profile.emoji}</div>
                </div>
                {/* Weather — tap to edit */}
                <div className="weather-pill" onClick={()=>setModal({type:"weather",data:{...weather}})}>
                  <div>
                    <div className="weather-temp">{weather.temp}°C</div>
                    <div className="weather-desc">{lang==="hi"?weather.desch:weather.desc}</div>
                    <div className="weather-loc">📍 {weather.loc}</div>
                    <div className="weather-details">
                      <div className="weather-detail">💧 {weather.humidity}% {t.humidity}</div>
                      <div className="weather-detail">💨 {weather.wind} km/h {t.wind}</div>
                    </div>
                  </div>
                  <div className="weather-icon">⛅</div>
                </div>
              </div>

              <div className="home-body">
                {/* Alert */}
                <div className="alert-card">
                  <div className="alert-icon">⚠️</div>
                  <div>
                    <div className="alert-title">{t.rainAlert}</div>
                    <div className="alert-body">{t.rainAlertBody}</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <div className="section-title">{t.quickActions}</div>
                  <div style={{height:10}}/>
                  <div className="quick-actions">
                    {[
                      {icon:"🚜",en:"My Fields",hi:"मेरे खेत",bg:"#E8F5E0"},
                      {icon:"💧",en:"Irrigation",hi:"सिंचाई",bg:"#E0F0F8"},
                      {icon:"🌡️",en:"Soil Data",hi:"मिट्टी",bg:"#FFF4E0"},
                      {icon:"📊",en:"Markets",hi:"बाज़ार",bg:"#F8E8F0"},
                      {icon:"🐛",en:"Pest Alert",hi:"कीट चेतावनी",bg:"#FFE8E0"},
                      {icon:"🌦️",en:"Forecast",hi:"मौसम",bg:"#E0EEF8"},
                      {icon:"💊",en:"Crop Care",hi:"फसल देखभाल",bg:"#E8F8E8"},
                      {icon:"📋",en:"Tasks",hi:"कार्य",bg:"#F0E8F8"},
                    ].map((a,i)=>(
                      <div className="qa-item" key={i} onClick={()=>{ 
                        if(a.en==="Tasks") setScreen("dashboard"); 
                        else if(a.en==="Forecast") setScreen("weather");
                        else if(a.en==="Markets") setScreen("mandi");
                        else if(a.en==="My Fields" || a.en==="Soil Data" || a.en==="Crop Care" || a.en==="Pest Alert") setScreen("crop");
                      }}>
                        <div className="qa-icon" style={{background:a.bg}}>{a.icon}</div>
                        <div className="qa-label">{lang==="hi"?a.hi:a.en}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Crops */}
                <div>
                  <div className="section-header">
                    <div className="section-title">{t.myCrops}</div>
                    <button className="add-btn" onClick={()=>setModal({type:"crop",data:{emoji:"🌾",name:"",nameh:"",status:"",statush:"",pct:0,bg:"#E8F5E0"}})}>+ {t.addCrop}</button>
                  </div>
                  <div style={{height:10}}/>
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    {crops.map(c=>(
                      <div className="crop-card" key={c.id}>
                        <div className="crop-emoji" style={{background:c.bg}}>{c.emoji}</div>
                        <div className="crop-info">
                          <div className="crop-name">{lang==="hi"?c.nameh||c.name:c.name}</div>
                          <div className="crop-status">{lang==="hi"?c.statush||c.status:c.status}</div>
                          <div className="crop-bar-wrap"><div className="crop-bar" style={{width:`${c.pct}%`}}/></div>
                        </div>
                        <div className="crop-pct">{c.pct}%</div>
                        <button className="crop-edit-btn" onClick={()=>setModal({type:"crop",data:{...c}})}>✏️ {t.edit}</button>
                      </div>
                    ))}
                    {crops.length===0 && <div style={{textAlign:"center",color:"#9a8a7a",padding:"20px",fontSize:13}}>{lang==="hi"?"कोई फसल नहीं। ऊपर + से जोड़ें।":"No crops yet. Tap + to add."}</div>}
                  </div>
                </div>
              </div>

              <div className="bottom-nav">
                {[{icon:"🏠",en:"Home",hi:"होम",s:"home"},{icon:"🌦️",en:"Weather",hi:"मौसम",s:"weather"},{icon:"🌾",en:"Crop",hi:"फसल",s:"crop"},{icon:"🛒",en:"Market",hi:"बाज़ार",s:"mandi"},{icon:"📊",en:"Dash",hi:"डैश",s:"dashboard"}].map(n=>(
                  <div key={n.s} className={`bnav-item ${screen===n.s?"active":""}`} onClick={()=>setScreen(n.s)}>
                    <div className="bnav-icon">{n.icon}</div>
                    <div className="bnav-label">{lang==="hi"?n.hi:n.en}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── DASHBOARD ─────────────────────────── */}
          {screen==="dashboard" && (
            <div className="dash-screen">
              <div className="dash-header">
                <div className="dash-header-row">
                  <div>
                    <div className="dash-title">📊 {t.dashboard}</div>
                    <div className="dash-date">Wednesday, May 13 · {t.season}: {t.spring}</div>
                  </div>
                  <div style={{fontSize:26}}>{profile.emoji}</div>
                </div>
              </div>

              <div className="dash-body">
                {/* Stats */}
                <div className="stat-row">
                  {[
                    {label:t.totalYield,val:stats.yield,trend:`↑ 12% ${t.vsLastSeason}`,dir:"up",icon:"🌾",bg:"#E8F5E0"},
                    {label:t.waterUsed,val:stats.water,trend:`↓ 8% ${t.thisWeek}`,dir:"up",icon:"💧",bg:"#E0F0F8"},
                    {label:t.activeFields,val:fields.length.toString(),trend:`1 ${t.needsAttention}`,dir:"down",icon:"🗺️",bg:"#FFF4E0"},
                    {label:t.revenueEst,val:stats.revenue,trend:`↑ 5% ${t.onTarget}`,dir:"up",icon:"💰",bg:"#F0E8F8"},
                  ].map((s,i)=>(
                    <div className="stat-card" key={i}>
                      <div className="stat-icon-bg" style={{background:s.bg}}>{s.icon}</div>
                      <div className="stat-label">{s.label}</div>
                      <div className="stat-value">{s.val}</div>
                      <div className={`stat-trend ${s.dir}`}>{s.trend}</div>
                    </div>
                  ))}
                </div>

                {/* Field Map */}
                <div className="field-map">
                  <div className="field-map-header">
                    <div>
                      <div className="field-map-title">🗺️ {t.fieldOverview}</div>
                      <div className="field-map-sub">{fields.length} {lang==="hi"?"खेत":"fields"} · {totalHa} {lang==="hi"?"हेक्टेयर":"hectares"}</div>
                    </div>
                    <button className="view-btn" onClick={()=>setModal({type:"addField",data:{name:"",nameh:"",crop:"",croph:"",size:""}})}>+ {t.addField}</button>
                  </div>
                  <div className="field-svg-wrap"><FieldMapSVG fields={fields}/></div>
                  {/* Field list */}
                  <div style={{padding:"0 14px 14px",display:"flex",flexDirection:"column",gap:7}}>
                    {fields.map(f=>(
                      <div key={f.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:"#FAF3E0",borderRadius:10}}>
                        <span style={{fontSize:16}}>🌿</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,fontWeight:700,color:"#3D2B1F",fontFamily:"Nunito,sans-serif"}}>{lang==="hi"?f.nameh||f.name:f.name}</div>
                          <div style={{fontSize:11,color:"#7a6a5a",fontFamily:"Nunito,sans-serif"}}>{lang==="hi"?f.croph||f.crop:f.crop} · {f.size} ha</div>
                        </div>
                        <button className="view-btn" onClick={()=>setModal({type:"editField",data:{...f}})}>✏️</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market */}
                <div>
                  <div className="section-header">
                    <div className="section-title">📈 {t.marketPrices}</div>
                    <button className="add-btn" onClick={()=>setModal({type:"market",data:{emoji:"🌾",name:"",nameh:"",price:"",change:"",up:true}})}>+ {t.addMarket}</button>
                  </div>
                  <div style={{height:10}}/>
                  <div className="market-scroll">
                    {market.map(m=>(
                      <div className="market-card" key={m.id}>
                        <div className="market-crop">{m.emoji}</div>
                        <div className="market-name">{lang==="hi"?m.nameh||m.name:m.name}{t.pricePerTon}</div>
                        <div className="market-price">₹{m.price}</div>
                        <div className={`market-change ${m.up?"up":"down"}`}>{m.change} {t.today}</div>
                        <button className="market-edit" onClick={()=>setModal({type:"market",data:{...m}})}>✏️</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tasks */}
                <div>
                  <div className="section-header">
                    <div className="section-title">✅ {t.todayTasks}</div>
                    <button className="add-btn" onClick={()=>setModal({type:"task",data:{name:"",nameh:"",time:""}})}>+ {t.addTask}</button>
                  </div>
                  <div style={{height:10}}/>
                  <div className="task-list">
                    {tasks.map(task=>(
                      <div className="task-item" key={task.id}>
                        <div className={`task-check ${task.done?"done":""}`} onClick={()=>toggleTask(task.id)}>{task.done?"✓":""}</div>
                        <div className={`task-name ${task.done?"done-text":""}`}>{lang==="hi"?task.nameh||task.name:task.name}</div>
                        <div className="task-time">{task.time}</div>
                        <button className="task-edit-btn" onClick={()=>setModal({type:"task",data:{...task}})}>✏️</button>
                      </div>
                    ))}
                    {tasks.length===0 && <div style={{textAlign:"center",color:"#9a8a7a",padding:"16px",fontSize:13}}>{lang==="hi"?"कोई कार्य नहीं।":"No tasks yet."}</div>}
                  </div>
                </div>

                <div style={{height:16}}/>
              </div>

              <div className="bottom-nav">
                {[{icon:"🏠",en:"Home",hi:"होम",s:"home"},{icon:"🌦️",en:"Weather",hi:"मौसम",s:"weather"},{icon:"🌾",en:"Crop",hi:"फसल",s:"crop"},{icon:"🛒",en:"Market",hi:"बाज़ार",s:"mandi"},{icon:"📊",en:"Dash",hi:"डैश",s:"dashboard"}].map(n=>(
                  <div key={n.s} className={`bnav-item ${screen===n.s?"active":""}`} onClick={()=>setScreen(n.s)}>
                    <div className="bnav-icon">{n.icon}</div>
                    <div className="bnav-label">{lang==="hi"?n.hi:n.en}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── NEW SCREENS ─────────────────────────── */}
          {screen==="weather" && (
            <div style={{width: '100%', height: '100%', minHeight: '780px', overflowY: 'auto', background: 'white', position: 'relative'}}>
               <WeatherDashboard />
               <button onClick={() => setScreen("home")} style={{position: 'absolute', top: 16, left: 16, zIndex: 1000, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 20, cursor: 'pointer'}}>←</button>
            </div>
          )}
          {screen==="mandi" && (
            <div style={{width: '100%', height: '100%', minHeight: '780px', overflowY: 'auto', background: 'white', position: 'relative'}}>
               <MandiDashboard />
               <button onClick={() => setScreen("home")} style={{position: 'absolute', top: 16, left: 16, zIndex: 1000, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 20, cursor: 'pointer'}}>←</button>
            </div>
          )}
          {screen==="crop" && (
            <div style={{width: '100%', height: '100%', minHeight: '780px', overflowY: 'auto', background: 'white', position: 'relative'}}>
               <CropAnalysis />
               <button onClick={() => setScreen("home")} style={{position: 'absolute', top: 16, left: 16, zIndex: 1000, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 20, cursor: 'pointer'}}>←</button>
            </div>
          )}

          {/* ══ MODALS ══════════════════════════════ */}

          {/* CROP MODAL */}
          {modal?.type==="crop" && <CropModal t={t} lang={lang} data={modal.data} onSave={saveCrop} onDelete={deleteCrop} onClose={closeModal}/>}

          {/* TASK MODAL */}
          {modal?.type==="task" && <TaskModal t={t} lang={lang} data={modal.data} onSave={saveTask} onDelete={deleteTask} onClose={closeModal}/>}

          {/* MARKET MODAL */}
          {modal?.type==="market" && <MarketModal t={t} lang={lang} data={modal.data} onSave={saveMarket} onDelete={deleteMarket} onClose={closeModal}/>}

          {/* FIELD MODAL */}
          {(modal?.type==="addField"||modal?.type==="editField") && <FieldModal t={t} lang={lang} data={modal.data} onSave={saveField} onDelete={deleteField} onClose={closeModal}/>}

          {/* PROFILE MODAL */}
          {modal?.type==="profile" && <ProfileModal t={t} lang={lang} data={modal.data} onSave={saveProfile} onClose={closeModal}/>}

          {/* WEATHER MODAL */}
          {modal?.type==="weather" && <WeatherModal t={t} lang={lang} data={modal.data} onSave={saveWeather} onClose={closeModal}/>}

        </div>
        <div className="hint-text">{lang==="hi"?"✏️ सभी कार्ड टैप करके संपादित करें · + बटन से नया जोड़ें":"✏️ Tap any card to edit · Use + buttons to add new items"}</div>
      </div>
    </>
  );
}

// ─── CROP MODAL ─────────────────────────────────────────────────────────────
function CropModal({t, lang, data, onSave, onDelete, onClose}) {
  const [form, setForm] = useState(data);
  const isEdit = !!data.id;
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle"/>
        <div className="modal-title">{isEdit?t.editCrop:t.addCrop}</div>
        <div className="form-group">
          <label className="form-label">{t.cropEmoji}</label>
          <div className="emoji-grid">
            {EMOJI_OPTIONS.map(e=>(
              <div key={e} className={`emoji-opt ${form.emoji===e?"sel":""}`} onClick={()=>setForm(f=>({...f,emoji:e}))}>{e}</div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">{t.cropName} (English)</label>
          <input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Wheat — Field A"/>
        </div>
        <div className="form-group">
          <label className="form-label">{t.cropName} (हिंदी)</label>
          <input className="form-input" value={form.nameh||""} onChange={e=>setForm(f=>({...f,nameh:e.target.value}))} placeholder="जैसे गेहूँ — खेत A"/>
        </div>
        <div className="form-group">
          <label className="form-label">{t.cropStatus} (English)</label>
          <input className="form-input" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))} placeholder="e.g. Ready for harvest in 5 days"/>
        </div>
        <div className="form-group">
          <label className="form-label">{t.cropStatus} (हिंदी)</label>
          <input className="form-input" value={form.statush||""} onChange={e=>setForm(f=>({...f,statush:e.target.value}))} placeholder="जैसे 5 दिनों में कटाई"/>
        </div>
        <div className="form-group">
          <label className="form-label">{t.cropProgress}</label>
          <input className="form-input" type="number" min="0" max="100" value={form.pct} onChange={e=>setForm(f=>({...f,pct:parseInt(e.target.value)||0}))}/>
          <div style={{marginTop:8,height:6,background:"#F0E8D0",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${form.pct}%`,background:"linear-gradient(90deg,#4A7C59,#E8C547)",borderRadius:3,transition:"width 0.3s"}}/>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">{t.cropBg}</label>
          <div className="bg-grid">
            {BG_OPTIONS.map(b=>(
              <div key={b} className={`bg-opt ${form.bg===b?"sel":""}`} style={{background:b}} onClick={()=>setForm(f=>({...f,bg:b}))}/>
            ))}
          </div>
        </div>
        <div className="modal-btns">
          {isEdit && <button className="btn-danger" onClick={()=>onDelete(form.id)}>🗑️ {t.deleteCrop}</button>}
          <button className="btn-secondary" onClick={onClose}>{t.cancel}</button>
          <button className="btn-primary" onClick={()=>onSave(form)}>✅ {t.save}</button>
        </div>
      </div>
    </div>
  );
}

// ─── TASK MODAL ──────────────────────────────────────────────────────────────
function TaskModal({t, lang, data, onSave, onDelete, onClose}) {
  const [form, setForm] = useState(data);
  const isEdit = !!data.id;
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle"/>
        <div className="modal-title">{isEdit?t.editTask:t.addTask}</div>
        <div className="form-group">
          <label className="form-label">{t.taskName} (English)</label>
          <input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Check irrigation pump"/>
        </div>
        <div className="form-group">
          <label className="form-label">{t.taskName} (हिंदी)</label>
          <input className="form-input" value={form.nameh||""} onChange={e=>setForm(f=>({...f,nameh:e.target.value}))} placeholder="जैसे पंप की जांच करें"/>
        </div>
        <div className="form-group">
          <label className="form-label">{t.taskTime}</label>
          <input className="form-input" value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))} placeholder="e.g. 8:00 AM"/>
        </div>
        <div className="modal-btns">
          {isEdit && <button className="btn-danger" onClick={()=>onDelete(form.id)}>🗑️ {t.deleteCrop}</button>}
          <button className="btn-secondary" onClick={onClose}>{t.cancel}</button>
          <button className="btn-primary" onClick={()=>onSave(form)}>✅ {t.save}</button>
        </div>
      </div>
    </div>
  );
}

// ─── MARKET MODAL ────────────────────────────────────────────────────────────
function MarketModal({t, lang, data, onSave, onDelete, onClose}) {
  const [form, setForm] = useState(data);
  const isEdit = !!data.id;
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle"/>
        <div className="modal-title">{isEdit?`✏️ ${t.edit}`:t.addMarket}</div>
        <div className="form-group">
          <label className="form-label">{t.cropEmoji}</label>
          <div className="emoji-grid">
            {EMOJI_OPTIONS.map(e=>(
              <div key={e} className={`emoji-opt ${form.emoji===e?"sel":""}`} onClick={()=>setForm(f=>({...f,emoji:e}))}>{e}</div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">{t.cropName} (English)</label>
          <input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Rice"/>
        </div>
        <div className="form-group">
          <label className="form-label">{t.cropName} (हिंदी)</label>
          <input className="form-input" value={form.nameh||""} onChange={e=>setForm(f=>({...f,nameh:e.target.value}))} placeholder="जैसे चावल"/>
        </div>
        <div className="form-group">
          <label className="form-label">{lang==="hi"?"भाव (₹/टन)":"Price (₹/ton)"}</label>
          <input className="form-input" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} placeholder="e.g. 250"/>
        </div>
        <div className="form-group">
          <label className="form-label">{lang==="hi"?"आज का बदलाव":"Today's Change"}</label>
          <input className="form-input" value={form.change} onChange={e=>setForm(f=>({...f,change:e.target.value}))} placeholder="e.g. +2.5%"/>
        </div>
        <div className="form-group">
          <label className="form-label">{lang==="hi"?"रुझान":"Trend"}</label>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setForm(f=>({...f,up:true}))} style={{flex:1,padding:"10px",borderRadius:10,border:`2px solid ${form.up?"#4A7C59":"#E8DCC8"}`,background:form.up?"#E8F5E0":"white",cursor:"pointer",fontWeight:700,color:form.up?"#4A7C59":"#9a8a7a",fontFamily:"Nunito,sans-serif"}}>📈 {lang==="hi"?"बढ़त":"Up"}</button>
            <button onClick={()=>setForm(f=>({...f,up:false}))} style={{flex:1,padding:"10px",borderRadius:10,border:`2px solid ${!form.up?"#C46A3E":"#E8DCC8"}`,background:!form.up?"#FFE8E0":"white",cursor:"pointer",fontWeight:700,color:!form.up?"#C46A3E":"#9a8a7a",fontFamily:"Nunito,sans-serif"}}>📉 {lang==="hi"?"गिरावट":"Down"}</button>
          </div>
        </div>
        <div className="modal-btns">
          {isEdit && <button className="btn-danger" onClick={()=>onDelete(form.id)}>🗑️ {t.deleteCrop}</button>}
          <button className="btn-secondary" onClick={onClose}>{t.cancel}</button>
          <button className="btn-primary" onClick={()=>onSave(form)}>✅ {t.save}</button>
        </div>
      </div>
    </div>
  );
}

// ─── FIELD MODAL ─────────────────────────────────────────────────────────────
function FieldModal({t, lang, data, onSave, onDelete, onClose}) {
  const [form, setForm] = useState(data);
  const isEdit = !!data.id;
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle"/>
        <div className="modal-title">{isEdit?t.editFieldMap:t.addField}</div>
        <div className="form-group">
          <label className="form-label">{t.fieldName} (English)</label>
          <input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Field E"/>
        </div>
        <div className="form-group">
          <label className="form-label">{t.fieldName} (हिंदी)</label>
          <input className="form-input" value={form.nameh||""} onChange={e=>setForm(f=>({...f,nameh:e.target.value}))} placeholder="जैसे खेत E"/>
        </div>
        <div className="form-group">
          <label className="form-label">{t.cropType} (English)</label>
          <input className="form-input" value={form.crop} onChange={e=>setForm(f=>({...f,crop:e.target.value}))} placeholder="e.g. Wheat"/>
        </div>
        <div className="form-group">
          <label className="form-label">{t.cropType} (हिंदी)</label>
          <input className="form-input" value={form.croph||""} onChange={e=>setForm(f=>({...f,croph:e.target.value}))} placeholder="जैसे गेहूँ"/>
        </div>
        <div className="form-group">
          <label className="form-label">{t.fieldSize}</label>
          <input className="form-input" type="number" step="0.1" min="0" value={form.size} onChange={e=>setForm(f=>({...f,size:e.target.value}))} placeholder="e.g. 3.5"/>
        </div>
        <div className="modal-btns">
          {isEdit && <button className="btn-danger" onClick={()=>onDelete(form.id)}>🗑️ {t.deleteCrop}</button>}
          <button className="btn-secondary" onClick={onClose}>{t.cancel}</button>
          <button className="btn-primary" onClick={()=>onSave(form)}>✅ {t.save}</button>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE MODAL ────────────────────────────────────────────────────────────
function ProfileModal({t, lang, data, onSave, onClose}) {
  const [form, setForm] = useState(data);
  const FARMER_EMOJIS = ["🧑🌾","👨🌾","👩🌾","🤠","👴","👩","👨","🧓"];
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle"/>
        <div className="modal-title">{t.editProfile}</div>
        <div style={{textAlign:"center",fontSize:60,marginBottom:12}}>{form.emoji}</div>
        <div className="form-group">
          <label className="form-label">{lang==="hi"?"अवतार":"Avatar"}</label>
          <div className="emoji-grid">
            {FARMER_EMOJIS.map(e=>(
              <div key={e} className={`emoji-opt ${form.emoji===e?"sel":""}`} style={{fontSize:24,width:48,height:48}} onClick={()=>setForm(f=>({...f,emoji:e}))}>{e}</div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">{t.farmerName}</label>
          <input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
        </div>
        <div className="form-group">
          <label className="form-label">{t.location}</label>
          <input className="form-input" value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} placeholder="Village, District, State"/>
        </div>
        <div className="modal-btns">
          <button className="btn-secondary" onClick={onClose}>{t.cancel}</button>
          <button className="btn-primary" onClick={()=>onSave(form)}>✅ {t.save}</button>
        </div>
      </div>
    </div>
  );
}

// ─── WEATHER MODAL ────────────────────────────────────────────────────────────
function WeatherModal({t, lang, data, onSave, onClose}) {
  const [loc, setLoc] = useState(data.loc || "");
  const [loading, setLoading] = useState(false);

  const handleFetchAndSave = async () => {
    if (!loc) return;
    setLoading(true);
    try {
      const res = await fetch(`https://agro-tech-qfuy.onrender.com/api/weather/current?city=${encodeURIComponent(loc)}`);
      if (res.ok) {
        const weatherData = await res.json();
        // Update data using real values
        onSave({
          ...data,
          loc: weatherData.city,
          temp: Math.round(weatherData.temperature),
          desc: weatherData.condition,
          desch: weatherData.condition, // Can map this if needed
          humidity: weatherData.humidity,
          wind: Math.round(weatherData.wind_speed * 3.6) // m/s to km/h
        });
      } else {
        alert("City not found or API error");
      }
    } catch (e) {
      console.error(e);
      alert("Error fetching weather");
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle"/>
        <div className="modal-title">⛅ {lang==="hi"?"स्थान बदलें":"Change Location"}</div>
        <div className="form-group">
          <label className="form-label">{lang==="hi"?"शहर/स्थान":"City / Location"}</label>
          <input className="form-input" value={loc} onChange={e=>setLoc(e.target.value)} placeholder="e.g. Nashik" onKeyDown={e=>e.key==="Enter"&&handleFetchAndSave()}/>
        </div>
        <div className="modal-btns">
          <button className="btn-secondary" onClick={onClose}>{t.cancel}</button>
          <button className="btn-primary" onClick={handleFetchAndSave} disabled={loading}>
            {loading ? "⌛..." : `✅ ${lang==="hi"?"अपडेट करें":"Update"}`}
          </button>
        </div>
      </div>
    </div>
  );
}
