// 1. Извлекаем инструменты из глобальных объектов (загруженных в index.html)
const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence } = FramerMotion;
const { 
  Phone, Search, ChevronRight, MapPin, Home, Trees, Droplets,
  Shield, Star, Clock, ArrowRight, Menu, X, MessageCircle,
  Send, Award, Users, CheckCircle, Building2, Leaf, Heart,
  Instagram, Facebook, Youtube, Mail, ExternalLink 
} = LucideIcons;

const COLORS = {
  white: "#FFFFFF",
  fog: "#F4F1EE",
  sage: "#A8C3A0",
  sand: "#D9CABB",
  charcoal: "#2C2C2C",
  charcoalLight: "#5A5A5A",
  sageLight: "#C8DCC4",
  sandLight: "#EDE5DA",
};

// Подключаем шрифты
const googleFontsLink = document.createElement("link");
googleFontsLink.rel = "stylesheet";
googleFontsLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap";
document.head.appendChild(googleFontsLink);

// Стили
const style = document.createElement("style");
style.textContent = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: #F4F1EE; color: #2C2C2C; }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  .btn-primary { background: #2C2C2C; color: #fff; border: none; padding: 14px 32px; cursor: pointer; transition: 0.3s; border-radius: 2px; }
  .btn-primary:hover { background: #A8C3A0; }
  .glass-header { backdrop-filter: blur(20px); background: rgba(255,255,255,0.82); border-bottom: 1px solid rgba(217,202,187,0.4); }
`;
document.head.appendChild(style);

// --- КОМПОНЕНТЫ ---

function Header({ currentPage, setPage }) {
  return (
    <header className="glass-header" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "15px 48px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
          <span className="serif" style={{ fontSize: 24, color: COLORS.charcoal }}>Загородный Мир</span>
        </div>
        <nav style={{ display: "flex", gap: 30 }}>
          {["catalog", "sell", "legal", "about"].map(p => (
            <span key={p} onClick={() => setPage(p)} style={{ cursor: "pointer", fontSize: 13, textTransform: "uppercase" }}>{p}</span>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <div style={{ paddingTop: 200, textAlign: "center", minHeight: "100vh" }}>
      <h1 className="serif" style={{ fontSize: 80 }}>Дом, который <em style={{ color: COLORS.sage }}>похож на вас</em></h1>
      <p style={{ marginTop: 20 }}>Премиальная недвижимость Подмосковья</p>
    </div>
  );
}

// --- ГЛАВНОЕ ПРИЛОЖЕНИЕ ---

function App() {
  const [page, setPage] = useState("home");

  const setPageAndScroll = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch(page) {
      case "home": return <HomePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.fog }}>
      <Header currentPage={page} setPage={setPageAndScroll} />
      <AnimatePresence mode="wait">
        <motion.div 
          key={page}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ЗАПУСК
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
