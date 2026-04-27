const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence } = FramerMotion; // Было window.Motion
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

const googleFontsLink = document.createElement("link");
googleFontsLink.rel = "stylesheet";
googleFontsLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap";
document.head.appendChild(googleFontsLink);

const style = document.createElement("style");
style.textContent = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: #F4F1EE; color: #2C2C2C; }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  .nav-link { position: relative; cursor: pointer; font-size: 13px; font-weight: 400; letter-spacing: 0.04em; color: #2C2C2C; transition: color 0.3s; text-decoration: none; }
  .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #A8C3A0; transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
  .nav-link:hover::after { width: 100%; }
  .nav-link:hover { color: #A8C3A0; }
  .btn-primary { background: #2C2C2C; color: #fff; border: none; padding: 14px 32px; font-family: 'Inter', sans-serif; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); border-radius: 2px; }
  .btn-primary:hover { background: #A8C3A0; transform: translateY(-1px); }
  .btn-outline { background: transparent; color: #2C2C2C; border: 1px solid #2C2C2C; padding: 12px 28px; font-family: 'Inter', sans-serif; font-size: 13px; letter-spacing: 0.06em; cursor: pointer; transition: all 0.3s; border-radius: 2px; }
  .btn-outline:hover { background: #2C2C2C; color: #fff; }
  .filter-chip { background: #fff; border: 1px solid #D9CABB; color: #5A5A5A; padding: 8px 18px; font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 0.04em; cursor: pointer; transition: all 0.3s; border-radius: 20px; }
  .filter-chip:hover, .filter-chip.active { background: #A8C3A0; border-color: #A8C3A0; color: #fff; }
  .property-card { background: #fff; border-radius: 12px; overflow: hidden; cursor: pointer; transition: all 0.4s cubic-bezier(0.4,0,0.2,1); box-shadow: 0 2px 20px rgba(44,44,44,0.06); }
  .property-card:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 12px 48px rgba(44,44,44,0.14); }
  .property-card:hover .card-img { transform: scale(1.04); }
  .card-img { transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); }
  .glass-header { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); background: rgba(255,255,255,0.82); border-bottom: 1px solid rgba(217,202,187,0.4); }
  .search-bar { border: none; border-bottom: 1.5px solid #D9CABB; background: transparent; width: 100%; padding: 16px 0; font-family: 'Inter', sans-serif; font-size: 15px; color: #2C2C2C; outline: none; transition: border-color 0.3s; }
  .search-bar:focus { border-bottom-color: #A8C3A0; }
  .search-bar::placeholder { color: #A0A0A0; }
  .floating-btn { position: fixed; right: 28px; border: none; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); border-radius: 50%; width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0,0,0,0.15); z-index: 999; }
  .floating-btn:hover { transform: scale(1.1) translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
  .whatsapp-btn { bottom: 100px; background: #25D366; color: #fff; }
  .telegram-btn { bottom: 164px; background: #2AABEE; color: #fff; }
  .section-label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #A8C3A0; font-weight: 500; margin-bottom: 12px; display: block; }
  .divider { width: 40px; height: 1px; background: #D9CABB; margin: 24px 0; }
  @media (max-width: 768px) {
    .nav-desktop { display: none; }
    .hero-title { font-size: 52px !important; }
  }
`;
document.head.appendChild(style);

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

function Header({ currentPage, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Каталог", page: "catalog" },
    { label: "Продать объект", page: "sell" },
    { label: "Услуги", page: "legal" },
    { label: "О компании", page: "about" },
    { label: "Контакты", page: "contacts" },
  ];

  return (
    <motion.header
      className="glass-header"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "12px 48px" : "18px 48px",
        transition: "padding 0.4s ease",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 1 }}>
          <span className="serif" style={{ fontSize: 20, fontWeight: 500, color: COLORS.charcoal, letterSpacing: "0.02em", lineHeight: 1 }}>Загородный Мир</span>
          <span style={{ fontSize: 10, letterSpacing: "0.14em", color: "#A8C3A0", textTransform: "uppercase" }}>zagmir.ru</span>
        </div>
        <nav className="nav-desktop" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {navItems.map(item => (
            <span key={item.page} className="nav-link" onClick={() => setPage(item.page)}
              style={{ fontWeight: currentPage === item.page ? 500 : 400, color: currentPage === item.page ? "#A8C3A0" : "#2C2C2C" }}>
              {item.label}
            </span>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="tel:+74957887877" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: COLORS.charcoal }}>
            <Phone size={14} strokeWidth={1.5} style={{ color: "#A8C3A0" }} />
            <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.02em" }}>+7 (495) 788-78-77</span>
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "none" }}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden", background: "rgba(255,255,255,0.96)", borderTop: "1px solid rgba(217,202,187,0.4)" }}>
            <div style={{ padding: "20px 48px", display: "flex", flexDirection: "column", gap: 16 }}>
              {navItems.map(item => (
                <span key={item.page} className="nav-link" onClick={() => { setPage(item.page); setMenuOpen(false); }} style={{ fontSize: 15 }}>
                  {item.label}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function FloatingButtons() {
  return (
    <>
      <a href="https://t.me/zagmir" target="_blank" rel="noopener" className="floating-btn telegram-btn">
        <Send size={20} />
      </a>
      <a href="https://wa.me/74957887877" target="_blank" rel="noopener" className="floating-btn whatsapp-btn">
        <MessageCircle size={22} />
      </a>
    </>
  );
}

function HomePage({ setPage }) {
  const [query, setQuery] = useState("");
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/hero-cinematic.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.92)",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(255,255,255,0.88) 0%, rgba(244,241,238,0.72) 50%, rgba(168,195,160,0.2) 100%)" }} />

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 48px", width: "100%" }}>
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            <motion.span variants={fadeUp} className="section-label">Загородная недвижимость Подмосковья</motion.span>
            <motion.h1 variants={fadeUp} className="serif hero-title"
              style={{ fontSize: 88, fontWeight: 300, lineHeight: 1.0, color: COLORS.charcoal, maxWidth: 720, letterSpacing: "-0.01em", marginBottom: 32 }}>
              Дом, который<br />
              <em style={{ fontStyle: "italic", color: "#A8C3A0" }}>похож на вас</em>
            </motion.h1>
            <motion.div variants={fadeUp} style={{ maxWidth: 600, marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.85)", borderRadius: 4, padding: "4px 20px", border: "1px solid rgba(217,202,187,0.6)", backdropFilter: "blur(12px)" }}>
                <Search size={18} strokeWidth={1.5} style={{ color: "#A8C3A0", flexShrink: 0 }} />
                <input
                  className="search-bar"
                  placeholder="Опишите дом вашей мечты... (например, коттедж у воды на Новой Риге)"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  style={{ border: "none", borderBottom: "none", padding: "18px 0" }}
                />
                <button className="btn-primary" style={{ flexShrink: 0, whiteSpace: "nowrap", padding: "10px 24px" }} onClick={() => setPage("catalog")}>
                  Найти
                </button>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              {["16 лет опыта", "Только проверенные объекты", "Юридическая гарантия"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#A8C3A0" }} />
                  <span style={{ fontSize: 13, color: COLORS.charcoalLight, letterSpacing: "0.04em" }}>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div style={{ position: "absolute", bottom: 40, left: "50%", x: "-50%" }}
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #A8C3A0)", margin: "0 auto" }} />
        </motion.div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section style={{ padding: "100px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="section-label">Направления</span>
          <h2 className="serif" style={{ fontSize: 48, fontWeight: 300, color: COLORS.charcoal, marginBottom: 56 }}>
            Находим именно то,<br />что вы ищете
          </h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
          {[
            { icon: <Home size={24} strokeWidth={1.2} />, title: "Коттеджи и виллы", desc: "Современные дома в охраняемых посёлках", count: "142 объекта" },
            { icon: <Droplets size={24} strokeWidth={1.2} />, title: "У воды", desc: "Дома с выходом к реке или озеру", count: "38 объектов" },
            { icon: <Trees size={24} strokeWidth={1.2} />, title: "Рядом с лесом", desc: "Экологически чистые локации", count: "67 объектов" },
            { icon: <Building2 size={24} strokeWidth={1.2} />, title: "Таунхаусы", desc: "Городской комфорт за городом", count: "29 объектов" },
          ].map((cat, i) => (
            <motion.div key={i} onClick={() => setPage("catalog")}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ background: "#fff", padding: "36px 32px", borderRadius: 12, cursor: "pointer", border: "1px solid rgba(217,202,187,0.4)", transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)" }}
              whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(44,44,44,0.1)" }}>
              <div style={{ color: "#A8C3A0", marginBottom: 20 }}>{cat.icon}</div>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 400, marginBottom: 8, color: COLORS.charcoal }}>{cat.title}</h3>
              <p style={{ fontSize: 13, color: COLORS.charcoalLight, lineHeight: 1.6, marginBottom: 16 }}>{cat.desc}</p>
              <span style={{ fontSize: 11, color: "#A8C3A0", letterSpacing: "0.1em", textTransform: "uppercase" }}>{cat.count}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS BAND */}
      <section style={{ background: COLORS.charcoal, padding: "72px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 48 }}>
          {[
            { num: "16+", label: "лет на рынке" },
            { num: "2400+", label: "сделок закрыто" },
            { num: "98%", label: "клиентов довольны" },
            { num: "0", label: "юридических рисков" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ textAlign: "center" }}>
              <div className="serif" style={{ fontSize: 56, fontWeight: 300, color: "#A8C3A0", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section style={{ padding: "100px 48px", maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="section-label">Наш подход</span>
          <h2 className="serif" style={{ fontSize: 44, fontWeight: 300, lineHeight: 1.15, marginBottom: 24, color: COLORS.charcoal }}>
            Честный мир — это<br />не просто слова
          </h2>
          <div className="divider" />
          <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.charcoalLight, marginBottom: 20 }}>
            С 2009 года мы строим отношения с клиентами на основе прозрачности, профессионализма и глубокого знания загородного рынка Подмосковья.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.charcoalLight, marginBottom: 32 }}>
            Каждый объект проходит юридическую проверку. Каждая сделка защищена нашими специалистами от начала до конца.
          </p>
          <button className="btn-outline" onClick={() => setPage("about")}>О компании <ArrowRight size={14} style={{ display: "inline", marginLeft: 8 }} /></button>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div style={{ aspectRatio: "4/3", borderRadius: 16, overflow: "hidden", position: "relative" }}>
            <img src="/images/agent-portrait.jpg" alt="Команда Загородный Мир" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 24, left: 24, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", padding: "16px 24px", borderRadius: 8, borderLeft: "3px solid #A8C3A0" }}>
              <div className="serif" style={{ fontSize: 20, color: COLORS.charcoal }}>«Честный мир»</div>
              <div style={{ fontSize: 12, color: COLORS.charcoalLight, marginTop: 4 }}>Философия с 2009 года</div>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}

function CatalogPage() {
  const [activeFilter, setActiveFilter] = useState(null);
  const filters = ["У воды", "Рядом лес", "Готовый", "Новая Рига"];
  const properties = [
    { img: "/images/cat-modern-villa.jpg", title: "Современная Вилла в КП Весна", price: "45 млн ₽", area: "280 м²", plot: "12 сот.", mkad: "15 км", badge: "Новинка", tag: "Готовый" },
    { img: "/images/cat-family-house.jpg", title: "Кирпичный усадебный дом", price: "28 млн ₽", area: "190 м²", plot: "15 сот.", mkad: "40 км", tag: "Рядом лес" },
    { img: "/images/cat-land-plot.jpg", title: "Участок 20 соток у леса", price: "12 млн ₽", area: null, plot: "20 сот.", mkad: "60 км", tag: "Рядом лес" },
    { img: "/images/cat-townhouse.jpg", title: "Таунхаус в Истре", price: "19 млн ₽", area: "150 м²", plot: "4 сот.", mkad: "25 км", badge: "Торг", tag: "Готовый" },
  ];
  const shown = activeFilter ? properties.filter(p => p.tag === activeFilter) : properties;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 48px" }}>
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <motion.span variants={fadeUp} className="section-label">Каталог объектов</motion.span>
          <motion.h1 variants={fadeUp} className="serif" style={{ fontSize: 64, fontWeight: 300, color: COLORS.charcoal, marginBottom: 16 }}>
            Загородная<br /><em style={{ fontStyle: "italic", color: "#A8C3A0" }}>недвижимость</em>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: COLORS.charcoalLight, marginBottom: 40 }}>
            Подмосковье · Только проверенные объекты
          </motion.p>

          {/* Filters */}
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
            <button className={`filter-chip ${activeFilter === null ? "active" : ""}`} onClick={() => setActiveFilter(null)}>Все объекты</button>
            {filters.map(f => (
              <button key={f} className={`filter-chip ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(activeFilter === f ? null : f)}>{f}</button>
            ))}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeFilter}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            {shown.map((p, i) => (
              <motion.div key={p.title} className="property-card"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "1/1" }}>
                  <img className="card-img" src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  {p.badge && (
                    <div style={{ position: "absolute", top: 16, left: 16, background: "#A8C3A0", color: "#fff", fontSize: 11, letterSpacing: "0.08em", padding: "4px 12px", borderRadius: 20, textTransform: "uppercase" }}>
                      {p.badge}
                    </div>
                  )}
                  <div style={{ position: "absolute", top: 16, right: 16 }}>
                    <motion.button whileHover={{ scale: 1.2 }} style={{ background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <Heart size={16} strokeWidth={1.5} style={{ color: "#D9CABB" }} />
                    </motion.button>
                  </div>
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ fontSize: 11, color: "#A8C3A0", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{p.tag}</div>
                  <h3 className="serif" style={{ fontSize: 20, fontWeight: 400, color: COLORS.charcoal, marginBottom: 12, lineHeight: 1.3 }}>{p.title}</h3>
                  <div style={{ fontSize: 22, fontWeight: 600, color: COLORS.charcoal, marginBottom: 16, letterSpacing: "-0.01em" }}>{p.price}</div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", borderTop: "1px solid rgba(217,202,187,0.5)", paddingTop: 16 }}>
                    {p.area && <div style={{ fontSize: 12, color: COLORS.charcoalLight }}><span style={{ fontWeight: 500 }}>{p.area}</span><br /><span style={{ color: "#A0A0A0" }}>Площадь</span></div>}
                    <div style={{ fontSize: 12, color: COLORS.charcoalLight }}><span style={{ fontWeight: 500 }}>{p.plot}</span><br /><span style={{ color: "#A0A0A0" }}>Участок</span></div>
                    <div style={{ fontSize: 12, color: COLORS.charcoalLight }}><span style={{ fontWeight: 500 }}>{p.mkad}</span><br /><span style={{ color: "#A0A0A0" }}>от МКАД</span></div>
                  </div>
                  <motion.button whileHover={{ gap: 12 }} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#A8C3A0", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Подробнее <ChevronRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function SellPage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <span className="section-label">Продать объект</span>
            <h1 className="serif" style={{ fontSize: 60, fontWeight: 300, color: COLORS.charcoal, marginBottom: 24, lineHeight: 1.1 }}>
              Продайте<br /><em style={{ fontStyle: "italic", color: "#A8C3A0" }}>правильно</em>
            </h1>
            <div className="divider" />
            <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.charcoalLight, marginBottom: 32 }}>
              Мы берём на себя всё: от профессиональной фотосъёмки и маркетинга до юридического сопровождения сделки. Вы получаете максимальную цену в минимальные сроки.
            </p>
            {[
              { n: "01", title: "Бесплатная оценка", desc: "Приедем, оценим, предложим стратегию продажи в тот же день" },
              { n: "02", title: "Маркетинг 360°", desc: "Профессиональные фото, видео, 3D-тур, размещение на 50+ площадках" },
              { n: "03", title: "Юридическая чистота", desc: "Полное сопровождение сделки нашими юристами" },
            ].map(step => (
              <div key={step.n} style={{ display: "flex", gap: 20, marginBottom: 28 }}>
                <span className="serif" style={{ fontSize: 32, fontWeight: 300, color: "#D9CABB", lineHeight: 1, flexShrink: 0 }}>{step.n}</span>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 15, color: COLORS.charcoal, marginBottom: 4 }}>{step.title}</div>
                  <div style={{ fontSize: 14, color: COLORS.charcoalLight, lineHeight: 1.6 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", padding: 40, borderRadius: 16, border: "1px solid rgba(217,202,187,0.4)" }}>
            <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, color: COLORS.charcoal, marginBottom: 28 }}>Оставить заявку</h3>
            {["Ваше имя", "Телефон", "Адрес объекта"].map(placeholder => (
              <div key={placeholder} style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, color: COLORS.charcoalLight, letterSpacing: "0.04em", display: "block", marginBottom: 8 }}>{placeholder}</label>
                <input placeholder="" style={{ width: "100%", border: "none", borderBottom: "1.5px solid #D9CABB", padding: "10px 0", fontFamily: "'Inter', sans-serif", fontSize: 14, color: COLORS.charcoal, background: "transparent", outline: "none" }} />
              </div>
            ))}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 12, color: COLORS.charcoalLight, letterSpacing: "0.04em", display: "block", marginBottom: 8 }}>Комментарий</label>
              <textarea placeholder="" rows={3} style={{ width: "100%", border: "none", borderBottom: "1.5px solid #D9CABB", padding: "10px 0", fontFamily: "'Inter', sans-serif", fontSize: 14, color: COLORS.charcoal, background: "transparent", outline: "none", resize: "none" }} />
            </div>
            <button className="btn-primary" style={{ width: "100%" }}>Отправить заявку</button>
            <p style={{ fontSize: 11, color: "#A0A0A0", marginTop: 14, textAlign: "center", lineHeight: 1.6 }}>
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LegalPage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 48px" }}>
        <span className="section-label">Юридические услуги</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", marginBottom: 80 }}>
          <div>
            <h1 className="serif" style={{ fontSize: 60, fontWeight: 300, color: COLORS.charcoal, lineHeight: 1.1, marginBottom: 24 }}>
              Безопасность<br /><em style={{ fontStyle: "italic", color: "#A8C3A0" }}>сделки</em>
            </h1>
            <div className="divider" />
            <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.charcoalLight, marginBottom: 24 }}>
              Каждая сделка через «Загородный Мир» защищена полным юридическим аудитом. Мы проверяем историю объекта, документы продавца и юридическую чистоту перехода права собственности.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.charcoalLight }}>
              Наши эксперты с 2009 года сопровождают тысячи сделок — ни одна из них не была оспорена в суде.
            </p>
          </div>
          <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "4/3" }}>
            <img src="/images/legal-guarantee.jpg" alt="Юридическая гарантия" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {[
            { icon: <Shield size={28} strokeWidth={1.2} />, title: "Полный аудит объекта", items: ["История права собственности", "Обременения и аресты", "Проверка продавца", "Земельный кадастр"] },
            { icon: <CheckCircle size={28} strokeWidth={1.2} />, title: "Подготовка документов", items: ["Договор купли-продажи", "Предварительный договор", "Акт приёма-передачи", "Регистрация в Росреестре"] },
            { icon: <Award size={28} strokeWidth={1.2} />, title: "Экспертное сопровождение", items: ["Юрист на переговорах", "Нотариальное оформление", "Безопасные расчёты", "Постсделочная поддержка"] },
          ].map((service, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ background: "#fff", padding: 32, borderRadius: 12, border: "1px solid rgba(217,202,187,0.4)" }}>
              <div style={{ color: "#A8C3A0", marginBottom: 20 }}>{service.icon}</div>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 400, color: COLORS.charcoal, marginBottom: 16 }}>{service.title}</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {service.items.map(item => (
                  <li key={item} style={{ display: "flex", gap: 10, fontSize: 13, color: COLORS.charcoalLight, alignItems: "flex-start" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#A8C3A0", marginTop: 6, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 60, background: COLORS.charcoal, borderRadius: 16, padding: 48, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h3 className="serif" style={{ fontSize: 32, fontWeight: 300, color: "#fff", marginBottom: 8 }}>Бесплатная консультация юриста</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Ответим на все вопросы по вашей ситуации</p>
          </div>
          <button className="btn-primary" style={{ background: "#A8C3A0", color: "#fff" }}>Записаться</button>
        </div>
      </div>
    </motion.div>
  );
}

function AboutPage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 48px" }}>
        <div style={{ maxWidth: 720 }}>
          <span className="section-label">О компании</span>
          <h1 className="serif" style={{ fontSize: 64, fontWeight: 300, color: COLORS.charcoal, lineHeight: 1.05, marginBottom: 32 }}>
            С 2009 года мы делаем<br />
            <em style={{ fontStyle: "italic", color: "#A8C3A0" }}>загородную мечту</em><br />
            реальностью
          </h1>
          <div className="divider" />
          <p style={{ fontSize: 15, lineHeight: 1.9, color: COLORS.charcoalLight, marginBottom: 20 }}>
            «Загородный Мир» — это команда профессионалов, объединённых одной философией: «Честный мир». Мы верим, что поиск загородного дома должен быть радостным, а не стрессовым опытом.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: COLORS.charcoalLight, marginBottom: 20 }}>
            За 16 лет работы мы закрыли более 2 400 сделок, выстроили доверительные отношения с ведущими застройщиками Подмосковья и создали уникальную базу проверенных объектов — от компактных таунхаусов до усадеб с прудом.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ margin: "80px 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0 }}>
          {[
            { year: "2009", title: "Основание", desc: "Открытие агентства, первые 12 сделок" },
            { year: "2013", title: "Расширение", desc: "300+ объектов в базе, юридический отдел" },
            { year: "2018", title: "Лидерство", desc: "ТОП-10 агентств Подмосковья" },
            { year: "2024", title: "Новая эра", desc: "Цифровая платформа, AI-поиск" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              style={{ padding: "32px 32px 32px 0", borderLeft: i === 0 ? "2px solid #A8C3A0" : "1px solid rgba(217,202,187,0.5)", paddingLeft: 32, position: "relative" }}>
              <div style={{ position: "absolute", top: 32, left: -7, width: 12, height: 12, borderRadius: "50%", background: "#A8C3A0", border: "2px solid #fff" }} />
              <div className="serif" style={{ fontSize: 36, fontWeight: 300, color: "#A8C3A0", marginBottom: 4 }}>{item.year}</div>
              <div style={{ fontWeight: 500, fontSize: 14, color: COLORS.charcoal, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: COLORS.charcoalLight, lineHeight: 1.6 }}>{item.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <h2 className="serif" style={{ fontSize: 44, fontWeight: 300, color: COLORS.charcoal, marginBottom: 40 }}>Команда</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 28 }}>
          {[
            { img: "/images/agent-portrait.jpg", name: "Елена Воронова", role: "Генеральный директор", exp: "16 лет опыта" },
            { img: "/images/agent-portrait.jpg", name: "Дмитрий Коваль", role: "Старший агент", exp: "12 лет опыта" },
            { img: "/images/agent-portrait.jpg", name: "Анна Светлова", role: "Юридический консультант", exp: "10 лет опыта" },
          ].map((member, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(217,202,187,0.4)" }}>
              <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "20px 24px" }}>
                <div style={{ fontWeight: 500, fontSize: 16, color: COLORS.charcoal }}>{member.name}</div>
                <div style={{ fontSize: 13, color: COLORS.charcoalLight, margin: "4px 0" }}>{member.role}</div>
                <div style={{ fontSize: 11, color: "#A8C3A0", letterSpacing: "0.08em", textTransform: "uppercase" }}>{member.exp}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ContactsPage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <span className="section-label">Контакты</span>
            <h1 className="serif" style={{ fontSize: 60, fontWeight: 300, color: COLORS.charcoal, lineHeight: 1.1, marginBottom: 40 }}>
              Свяжитесь<br /><em style={{ fontStyle: "italic", color: "#A8C3A0" }}>с нами</em>
            </h1>
            {[
              { icon: <Phone size={18} strokeWidth={1.5} />, label: "Телефон", val: "+7 (495) 788-78-77", href: "tel:+74957887877" },
              { icon: <Mail size={18} strokeWidth={1.5} />, label: "Email", val: "info@zagmir.ru", href: "mailto:info@zagmir.ru" },
              { icon: <MapPin size={18} strokeWidth={1.5} />, label: "Адрес", val: "Москва, Кутузовский проспект, 32", href: null },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 28, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#EDF4EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#A8C3A0" }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#A0A0A0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} style={{ fontSize: 16, fontWeight: 500, color: COLORS.charcoal, textDecoration: "none" }}>{c.val}</a>
                  ) : (
                    <div style={{ fontSize: 15, color: COLORS.charcoal }}>{c.val}</div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ marginTop: 40 }}>
              <div style={{ fontSize: 12, color: COLORS.charcoalLight, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Режим работы</div>
              <div style={{ fontSize: 14, color: COLORS.charcoalLight, lineHeight: 2 }}>
                Пн–Пт: 9:00 – 20:00<br />
                Сб–Вс: 10:00 – 18:00
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
              <a href="https://wa.me/74957887877" target="_blank" rel="noopener"
                style={{ background: "#25D366", color: "#fff", padding: "12px 24px", borderRadius: 4, fontSize: 13, fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href="https://t.me/zagmir" target="_blank" rel="noopener"
                style={{ background: "#2AABEE", color: "#fff", padding: "12px 24px", borderRadius: 4, fontSize: 13, fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <Send size={16} /> Telegram
              </a>
            </div>
          </div>

          {/* Map Placeholder */}
          <div>
            <div style={{ width: "100%", height: 420, borderRadius: 16, overflow: "hidden", background: "#EDE9E4", border: "1px solid rgba(217,202,187,0.4)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(217,202,187,0.3) 39px, rgba(217,202,187,0.3) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(217,202,187,0.3) 39px, rgba(217,202,187,0.3) 40px)" }} />
              <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#A8C3A0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", boxShadow: "0 0 0 8px rgba(168,195,160,0.2)" }}>
                  <MapPin size={22} color="#fff" />
                </div>
                <div style={{ fontWeight: 500, fontSize: 14, color: COLORS.charcoal }}>Кутузовский проспект, 32</div>
                <div style={{ fontSize: 12, color: COLORS.charcoalLight, marginTop: 4 }}>Москва</div>
              </div>
              <a href="https://maps.google.com/?q=Кутузовский+проспект+32+Москва" target="_blank" rel="noopener"
                style={{ position: "absolute", bottom: 20, right: 20, background: "#fff", border: "1px solid rgba(217,202,187,0.6)", borderRadius: 8, padding: "8px 16px", fontSize: 12, color: COLORS.charcoal, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                Открыть карту <ExternalLink size={12} />
              </a>
            </div>

            {/* Quick form */}
            <div style={{ background: "#fff", padding: 32, borderRadius: 12, border: "1px solid rgba(217,202,187,0.4)", marginTop: 24 }}>
              <h3 className="serif" style={{ fontSize: 24, fontWeight: 400, color: COLORS.charcoal, marginBottom: 20 }}>Быстрый вопрос</h3>
              <div style={{ display: "flex", gap: 12 }}>
                <input placeholder="Ваш телефон" style={{ flex: 1, border: "none", borderBottom: "1.5px solid #D9CABB", padding: "10px 0", fontFamily: "'Inter', sans-serif", fontSize: 14, background: "transparent", outline: "none" }} />
                <button className="btn-primary">Позвонить</button>
              </div>
              <p style={{ fontSize: 11, color: "#A0A0A0", marginTop: 12 }}>Перезвоним в течение 15 минут</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: COLORS.charcoal, padding: "72px 48px 40px", marginTop: 40 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }}>
          <div>
            <div className="serif" style={{ fontSize: 22, color: "#fff", marginBottom: 4 }}>Загородный Мир</div>
            <div style={{ fontSize: 11, color: "#A8C3A0", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>zagmir.ru</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 260 }}>
              Загородная недвижимость Подмосковья. С вами с 2009 года.
            </p>
          </div>
          {[
            { title: "Каталог", links: [["Коттеджи", "catalog"], ["Таунхаусы", "catalog"], ["Участки", "catalog"], ["У воды", "catalog"]] },
            { title: "Компания", links: [["О нас", "about"], ["Услуги", "legal"], ["Продать", "sell"], ["Контакты", "contacts"]] },
            { title: "Контакты", links: [["+7 (495) 788-78-77", null], ["info@zagmir.ru", null], ["Пн–Вс 9:00–20:00", null]] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, color: "#A8C3A0", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(([label, page]) => (
                  <span key={label} onClick={page ? () => setPage(page) : null}
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", cursor: page ? "pointer" : "default", transition: "color 0.2s" }}
                    onMouseEnter={e => { if (page) e.target.style.color = "#A8C3A0"; }}
                    onMouseLeave={e => { if (page) e.target.style.color = "rgba(255,255,255,0.55)"; }}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>© 2009–2026 Загородный Мир. Все права защищены.</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Политика конфиденциальности · Пользовательское соглашение</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  const setPageAndScroll = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = {
    home: <HomePage setPage={setPageAndScroll} />,
    catalog: <CatalogPage />,
    sell: <SellPage />,
    legal: <LegalPage />,
    about: <AboutPage />,
    contacts: <ContactsPage />,
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.fog }}>
      <Header currentPage={page} setPage={setPageAndScroll} />
      <AnimatePresence mode="wait">
        <motion.div key={page}>
          {pages[page]}
        </motion.div>
      </AnimatePresence>
      <Footer setPage={setPageAndScroll} />
      <FloatingButtons />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
