/* ============================================================
   EL PADEL – HOME PAGE
   Design: Dark Editorial (Huckberry-inspired)
   
   SECTION ORDER (developer priority):
   1. Hero         – "Wyróżnij swoją inwestycję"
   2. Differentiator – vs. siłownia/plac zabaw
   3. Zero Management – bezobsługowość (tech)
   4. Revenue      – przychód dla kupującego
   5. Footprint    – nie zabiera terenu, przenośny
   6. Padel Growth – sport rosnący w Polsce
   7. Process      – współpraca
   8. Contact      – formularz
   
   DIVIDER: TornEdge is a standalone block between sections.
   SVG rect = fromColor, wave path = toColor. Zero gaps guaranteed.
   ============================================================ */

import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

const EP_DARK  = "#0D1B2A";
const EP_CREAM = "#F5F0E8";
const EP_AMBER = "#C8893A";
const EP_AMBER_LIGHT = "#E8A84A";

const LOGO_URL = "/images/logo_white.svg";

const IMG = {
  hero:      "/images/hero.png",
  offer:     "/images/offer.jpg",
  techGate:  "/images/tech_gate.jpg",
  techVend:  "/images/tech_vending.jpg",
  processBg: "/images/process_bg.jpg",
  footer:    "/images/footer.png",
};

// ── Torn paper SVG divider ────────────────────────────────────────────────────
function TornEdge({ fromColor, toColor }: { fromColor: string; toColor: string }) {
  const path = "M0,80 L0,45 C180,15 360,65 540,38 C720,12 900,58 1080,32 C1260,8 1380,48 1440,36 L1440,80 Z";
  return (
    <div style={{ display: "block", lineHeight: 0, fontSize: 0, margin: 0, padding: 0, border: 0, overflow: "hidden" }}>
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        style={{ width: "100%", height: "72px", display: "block" }}>
        <rect width="1440" height="80" fill={fromColor} />
        <path d={path} fill={toColor} />
      </svg>
    </div>
  );
}

// ── Navigation ────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const linkStyle = {
    color: "rgba(245,240,232,0.7)" as const,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.78rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    transition: "color 0.2s",
  };

  const navLinks: [string, string][] = [
    ["#differentiator", "Oferta"],
    ["#management", "Zarządzanie"],
    ["#revenue", "Przychód"],
    ["#process", "Współpraca"],
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      background: scrolled ? "rgba(13,27,42,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(200,137,58,0.15)" : "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 2.5rem", maxWidth: 1400, margin: "0 auto" }}>
        <a href="#hero" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: EP_CREAM }}>Autonomous Courts</span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden md:flex">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = EP_AMBER)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}>
              {label}
            </a>
          ))}
          <a href="#contact" className="ep-btn-primary" style={{ padding: "0.6rem 1.4rem", fontSize: "0.7rem" }}>Umów spotkanie</a>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", color: EP_CREAM, cursor: "pointer", padding: "0.5rem" }} aria-label="Menu">
          <div style={{ width: 22, height: 2, background: EP_CREAM, marginBottom: 5, transition: "transform 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <div style={{ width: 22, height: 2, background: EP_CREAM, opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s" }} />
          <div style={{ width: 22, height: 2, background: EP_CREAM, marginTop: 5, transition: "transform 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: "rgba(13,27,42,0.97)", padding: "1.5rem 2.5rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
              style={{ color: EP_CREAM, fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="ep-btn-primary" style={{ textAlign: "center", marginTop: "0.5rem" }}>Umów spotkanie</a>
        </div>
      )}
    </nav>
  );
}

// ── 1. Hero Section ───────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="hero" style={{
      position: "relative", minHeight: "100vh", display: "flex",
      alignItems: "center", overflow: "hidden", background: EP_DARK,
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.hero})`, backgroundSize: "cover", backgroundPosition: "center 40%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,27,42,0.65) 0%, rgba(13,27,42,0.4) 40%, rgba(13,27,42,0.92) 100%)" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1400, margin: "0 auto", padding: "8rem 2.5rem 4rem", width: "100%" }}>
        <div style={{ maxWidth: 700 }}>

          <h1 className="animate-fade-in-up opacity-0-start animate-delay-100" style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)", lineHeight: 1.08, color: EP_CREAM, marginBottom: "1.5rem",
          }}>
            Wyróżnij<br />
            <em style={{ fontStyle: "italic", color: EP_AMBER_LIGHT }}>swoją inwestycję.</em>
          </h1>
          <p className="animate-fade-in-up opacity-0-start animate-delay-200" style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
            fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "rgba(245,240,232,0.82)",
            lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 560,
          }}>
            Autonomiczny kort padlowy dla nowoczesnych osiedli.<br />Jeden obiekt. Zero obsługi. Stały przychód.
          </p>
          <div className="animate-fade-in-up opacity-0-start animate-delay-300" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="/broszura.pdf" target="_blank" rel="noopener" className="ep-btn-primary">Pobierz Broszurę</a>
            <a href="#contact" className="ep-btn-outline">Umów spotkanie z doradcą</a>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "5.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", zIndex: 2 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)" }}>Przewiń</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(200,137,58,0.6), transparent)" }} />
      </div>
    </section>
  );
}

// ── 2. Differentiator Section ─────────────────────────────────────────────────
// "Siłownia. Plac zabaw. A może coś, co naprawdę wyróżni Twoją inwestycję?"
function DifferentiatorSection() {
  const { ref, inView } = useInView();
  const amenities = [
    { old: "Siłownia", icon: "—", note: "Standard. Każdy to ma." },
    { old: "Plac zabaw", icon: "—", note: "Wszędzie jest. Prawie nikt nie używa." },
    { old: "Kort padlowy Autonomous Courts", icon: "✓", note: "Wyróżnik. Zarabia.", highlight: true },
  ];

  return (
    <section id="differentiator" style={{ background: EP_CREAM, paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2.5rem" }}>
        <div ref={ref} style={{ display: "grid", gap: "5rem", alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
            <p className="ep-label" style={{ marginBottom: "1.2rem" }}>Przewaga Inwestycji</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 700,
              fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15, color: EP_DARK, marginBottom: "1.8rem",
            }}>
              Siłownia. Plac zabaw.<br />
              <em style={{ fontStyle: "italic" }}>A może coś więcej?</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8, color: "#3A4A5A", marginBottom: "1.5rem" }}>
              Każde osiedle ma siłownię. Każde ma plac zabaw. Żadne z nich nie zarabia. Kort padlowy Autonomous Courts to pierwsze udogodnienie, które podnosi prestiż inwestycji i jednocześnie generuje realny przychód — dla Ciebie i dla Twoich kupujących.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8, color: "#3A4A5A", marginBottom: "1.5rem" }}>
              To nie kolejna infrastruktura do utrzymania. To aktyw, który pracuje za Ciebie — przez całą dobę, bez Twojej obecności.
            </p>
            <a href="#contact" className="ep-btn-primary" style={{ background: EP_DARK, color: EP_CREAM }}>Porozmawiaj z nami</a>
          </div>

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid rgba(13,27,42,0.12)" }}>
              {amenities.map((item) => (
                <div key={item.old} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "1.5rem 2rem",
                  background: item.highlight ? EP_DARK : "white",
                  borderBottom: "1px solid rgba(13,27,42,0.08)",
                }}>
                  <div>
                    <p style={{
                      fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem",
                      color: item.highlight ? EP_CREAM : "#3A4A5A", marginBottom: "0.2rem",
                    }}>{item.old}</p>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 300,
                      color: item.highlight ? EP_AMBER : "rgba(58,74,90,0.6)",
                    }}>{item.note}</p>
                  </div>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "1.4rem", fontWeight: 700,
                    color: item.highlight ? EP_AMBER : "rgba(13,27,42,0.25)",
                  }}>{item.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 3. Zero Management Section ────────────────────────────────────────────────
const MGMT_FEATURES = [
  { icon: "◈", title: "Inteligentny dostęp", text: "Rezerwacja w aplikacji, unikalny kod PIN lub QR. Brama otwiera się automatycznie tylko na czas opłaconej gry. Żadnego personelu przy wejściu.", img: IMG.techGate },
  { icon: "◉", title: "Płatności i rezerwacje", text: "System obsługuje całą ścieżkę klienta — od rezerwacji, przez płatność online, aż po wejście na kort. Bez kas, bez obsługi.", img: IMG.techVend },
  { icon: "◎", title: "Panel zarządczy", text: "Śledź obłożenie, przychody i status techniczny w czasie rzeczywistym z poziomu prostego panelu. Jeden rzut oka wystarczy.", img: "/images/dashboard.webp" },
  { icon: "◇", title: "Bezpieczeństwo 24/7", text: "Zintegrowany system kamer CCTV eliminuje potrzebę zatrudniania ochrony. Obiekt jest monitorowany całą dobę.", img: "/images/cctv.webp" },
];

function ManagementSection() {
  const { ref, inView } = useInView();
  return (
    <section id="management" style={{ position: "relative", background: EP_DARK, paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2.5rem" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: "4rem", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <p className="ep-label" style={{ marginBottom: "1rem" }}>Bezobsługowość</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15, color: EP_CREAM, marginBottom: "1.2rem" }}>
            Żadnych pracowników.<br />
            <em style={{ fontStyle: "italic", color: EP_AMBER_LIGHT }}>Żadnych problemów.</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8, color: "rgba(245,240,232,0.65)", maxWidth: 600, margin: "0 auto" }}>
            Kort działa sam. Rezerwacje, płatności, dostęp, oświetlenie — wszystko odbywa się automatycznie, bez Twojej ingerencji. Jedyne, co musisz robić, to sprawdzać saldo.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {MGMT_FEATURES.map((f, i) => <TechCard key={f.title} feature={f} delay={i * 0.12} />)}
        </div>
      </div>
    </section>
  );
}

function TechCard({ feature, delay }: { feature: typeof MGMT_FEATURES[0]; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,137,58,0.15)",
      borderRadius: "2px", overflow: "hidden",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {feature.img && (
        <div style={{ height: 200, overflow: "hidden" }}>
          <img src={feature.img} alt={feature.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
        </div>
      )}
      <div style={{ padding: "1.8rem" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.2rem", color: EP_AMBER, marginBottom: "0.8rem" }}>{feature.icon}</div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", color: EP_CREAM, marginBottom: "0.8rem" }}>{feature.title}</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(245,240,232,0.6)" }}>{feature.text}</p>
      </div>
    </div>
  );
}

// ── 4. Revenue Section ────────────────────────────────────────────────────────
const STATS = [
  { number: "0 PLN", unit: "", label: "Koszty stałe obsługi — żadnego personelu, żadnych faktur" },
  { number: "24/7", unit: "", label: "Gotowość do generowania przychodów bez przerw" },
  { number: "80 PLN", unit: "/h", label: "Cena za godzinę — przychód dla wspólnoty mieszkaniowej" },
];

function RevenueSection() {
  const { ref, inView } = useInView();
  return (
    <section id="revenue" style={{ position: "relative", background: EP_CREAM, paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2.5rem" }}>
        <div ref={ref} style={{ display: "grid", gap: "5rem", alignItems: "start", marginBottom: "4rem" }} className="grid-cols-1 md:grid-cols-2">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
            <p className="ep-label" style={{ marginBottom: "1rem" }}>Przychód</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15, color: EP_DARK, marginBottom: "1.5rem" }}>
              Twoi mieszkańcy grają.<br />
              <em style={{ fontStyle: "italic" }}>Twoja wspólnota zarabia.</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8, color: "#3A4A5A" }}>
              Każda godzina na korcie to przychód dla wspólnoty mieszkaniowej. Środki zasilają fundusz remontowy, obniżają czynsz lub finansują inne udogodnienia. Dla Ciebie jako dewelopera to konkretny argument sprzedażowy: nie sprzedajesz mieszkania — sprzedajesz inwestycję.
            </p>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>
            <div style={{ background: EP_DARK, padding: "2.5rem", borderRadius: "2px" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: EP_AMBER, marginBottom: "1.5rem" }}>Przykładowy rachunek</p>
              {[
                ["Godziny dostępne rocznie", "8 760 h"],
                ["Szacowane obłożenie", "20%"],
                ["Płatne godziny rocznie", "1 752 h"],
                ["Cena za godzinę", "80 PLN"],
                ["Przychód roczny (netto)", "~140 000 PLN"],
              ].map(([label, value], i) => (
                <div key={label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  padding: "0.75rem 0",
                  borderBottom: i < 4 ? "1px solid rgba(245,240,232,0.08)" : "none",
                  borderTop: i === 4 ? "1px solid rgba(200,137,58,0.3)" : "none",
                  marginTop: i === 4 ? "0.5rem" : 0,
                }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 300, color: "rgba(245,240,232,0.6)" }}>{label}</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: i === 4 ? "1.3rem" : "1rem", color: i === 4 ? EP_AMBER_LIGHT : EP_CREAM }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid rgba(13,27,42,0.12)", maxWidth: 900, margin: "0 auto" }}>
          {STATS.map((s, i) => <StatCard key={s.number + s.unit} stat={s} delay={i * 0.15} />)}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{
      borderRight: "1px solid rgba(13,27,42,0.12)", borderBottom: "1px solid rgba(13,27,42,0.12)",
      padding: "2.5rem 2rem",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.6rem" }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: EP_DARK, lineHeight: 1 }}>{stat.number}</span>
        {stat.unit && <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: "1rem", color: EP_AMBER }}>{stat.unit}</span>}
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.88rem", lineHeight: 1.6, color: "#5A6A7A" }}>{stat.label}</p>
    </div>
  );
}

// ── 5. Footprint Section ──────────────────────────────────────────────────────
const FOOTPRINT_POINTS = [
  {
    num: "01",
    title: "Poza bilansem PUM",
    text: "Kort zajmuje ok. 280–350 m² przestrzeni buforowej lub rekreacyjnej. Nie wchodzi do bilansu powierzchni użytkowej mieszkań — nie tracisz ani jednego metra kwadratowego pod zabudowę.",
  },
  {
    num: "02",
    title: "Krótki i mało inwazyjny montaż",
    text: "Instalacja trwa kilka tygodni i nie wymaga głębokich fundamentów ani rozległych prac ziemnych. Obiekt można zamontować na istniejącym podłożu bez ingerencji w infrastrukturę osiedla.",
  },
  {
    num: "03",
    title: "Przenośny. Modularny. Odwracalny.",
    text: "Jeśli plany się zmienią — zmiana koncepcji, sprzedaż działki, nowa inwestycja — kort można zdemontować i przenieść na inną lokalizację. Żadnego trwałego zobowiązania w terenie.",
  },
];

function FootprintSection() {
  const { ref, inView } = useInView();
  return (
    <section id="footprint" style={{ position: "relative", background: EP_DARK, paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2.5rem" }}>
        <div ref={ref} style={{ maxWidth: 700, marginBottom: "4rem", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <p className="ep-label" style={{ marginBottom: "1rem" }}>Teren i Logistyka</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15, color: EP_CREAM, marginBottom: "1.5rem" }}>
            Nie tracisz terenu.<br />
            <em style={{ fontStyle: "italic", color: EP_AMBER_LIGHT }}>Zyskujesz argument.</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8, color: "rgba(245,240,232,0.65)" }}>
            Kort zajmuje przestrzeń, która w każdym projekcie istnieje — buforową, zieloną, rekreacyjną — ale rzadko pracuje. Nie ingerujesz w bilans PUM. Nie blokujesz przyszłych planów. I jeśli kiedykolwiek zmienisz zdanie — obiekt można przenieść.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "rgba(200,137,58,0.12)" }}>
          {FOOTPRINT_POINTS.map((point, i) => {
            const { ref: pRef, inView: pInView } = useInView();
            return (
              <div key={point.num} ref={pRef} style={{
                background: EP_DARK, padding: "2.5rem 2rem",
                opacity: pInView ? 1 : 0, transform: pInView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "3rem", color: "rgba(200,137,58,0.2)", lineHeight: 1, marginBottom: "1.2rem" }}>{point.num}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", color: EP_CREAM, marginBottom: "1rem" }}>{point.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(245,240,232,0.6)" }}>{point.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 6. Padel Growth Section ───────────────────────────────────────────────────
const PADEL_STATS = [
  { number: "25M+", label: "graczy padla na świecie" },
  { number: "3×", label: "wzrost liczby kortów w Polsce w ciągu 3 lat" },
  { number: "#1", label: "najszybciej rosnący sport w Europie" },
];

function PadelGrowthSection() {
  const { ref, inView } = useInView();
  return (
    <section id="padel-growth" style={{ background: EP_CREAM, paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2.5rem" }}>
        <div ref={ref} style={{ display: "grid", gap: "5rem", alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
            <p className="ep-label" style={{ marginBottom: "1.2rem" }}>Trend, nie chwilowa moda</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 700,
              fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15, color: EP_DARK, marginBottom: "1.8rem",
            }}>
              Padel w Polsce<br />
              <em style={{ fontStyle: "italic" }}>dopiero nabiera tempa.</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8, color: "#3A4A5A", marginBottom: "1.5rem" }}>
              Padel to najszybciej rosnący sport w Europie. W Polsce liczba kortów potroiła się w ciągu trzech lat. Popyt rośnie szybciej niż podaż — i ta luka nie zamknie się prędko.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8, color: "#3A4A5A" }}>
              Deweloperzy, którzy inwestują teraz, trafiają w dokładnie tę grupę docelową, której szukają: aktywnych, zamożnych mieszkańców w wieku 25–45 lat.
            </p>
          </div>

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              {PADEL_STATS.map((stat, i) => (
                <div key={stat.number} style={{
                  display: "flex", alignItems: "center", gap: "2rem",
                  padding: "2rem",
                  background: i % 2 === 0 ? "rgba(13,27,42,0.04)" : "white",
                  borderLeft: `3px solid ${EP_AMBER}`,
                }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)", color: EP_DARK, lineHeight: 1, minWidth: "5rem" }}>{stat.number}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.5, color: "#3A4A5A" }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 7. Process Section ────────────────────────────────────────────────────────
const STEPS = [
  { num: "01", title: "Analiza i Projekt", text: "Oceniamy potencjał Twojej działki (wymagane ok. 280–350 m²) i przygotowujemy indywidualną wycenę bez zobowiązań." },
  { num: "02", title: "Dostawa i Montaż", text: "Budujemy kort, instalujemy nawierzchnię, oświetlenie LED oraz systemy dostępowe. Montaż trwa kilka tygodni." },
  { num: "03", title: "Uruchomienie Systemu", text: "Konfigurujemy aplikację do rezerwacji, płatności i zarządzania obiektem. Pełne szkolenie i wsparcie techniczne." },
  { num: "04", title: "Zarabianie", text: "Kort zostaje oddany do użytku i zaczyna zarabiać. Oferujemy opcjonalne pakiety serwisowe — sprzątanie, wymiana piasku, przeglądy techniczne — żebyś nie musiał myśleć o niczym więcej." },
];

function ProcessSection() {
  const { ref, inView } = useInView();
  return (
    <section id="process" style={{ position: "relative", background: EP_DARK, paddingTop: "5rem", paddingBottom: "5rem", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.processBg})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.07 }} />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2.5rem", position: "relative", zIndex: 1 }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: "4rem", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <p className="ep-label" style={{ marginBottom: "1rem" }}>Współpraca</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15, color: EP_CREAM }}>
            Od projektu<br />
            <em style={{ fontStyle: "italic", color: EP_AMBER_LIGHT }}>po pierwszy serw.</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {STEPS.map((step, i) => <ProcessStep key={step.num} step={step} delay={i * 0.15} isLast={i === STEPS.length - 1} />)}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, delay, isLast }: { step: typeof STEPS[0]; delay: number; isLast: boolean }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{
      borderRight: isLast ? "none" : "1px solid rgba(200,137,58,0.15)",
      padding: "2rem",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "3.5rem", color: "rgba(200,137,58,0.2)", lineHeight: 1, marginBottom: "1rem" }}>{step.num}</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", color: EP_CREAM, marginBottom: "0.8rem" }}>{step.title}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(245,240,232,0.6)" }}>{step.text}</p>
    </div>
  );
}

// ── 8. Contact / Footer CTA ───────────────────────────────────────────────────
function ContactSection() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(245,240,232,0.07)",
    border: "1px solid rgba(245,240,232,0.2)",
    color: EP_CREAM,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    padding: "0.75rem 1rem",
    outline: "none",
    transition: "border-color 0.2s",
    borderRadius: 0,
    boxSizing: "border-box" as const,
  };

  return (
    <>
      <section id="contact" style={{ position: "relative", minHeight: "80vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.footer})`, backgroundSize: "cover", backgroundPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.85) 100%)" }} />

        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2.5rem", position: "relative", zIndex: 2, width: "100%" }}>
          <div ref={ref} style={{ display: "grid", gap: "5rem", alignItems: "start" }} className="grid-cols-1 md:grid-cols-2">

            <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
              <p className="ep-label" style={{ marginBottom: "1.2rem" }}>Kontakt</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15, color: EP_CREAM, marginBottom: "1.5rem" }}>
                Zbuduj przewagę<br />
                <em style={{ fontStyle: "italic", color: EP_AMBER_LIGHT }}>swojej inwestycji.</em>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8, color: "rgba(245,240,232,0.7)", marginBottom: "2rem" }}>
                Porozmawiajmy o Twojej inwestycji. Ocenimy potencjał działki, przygotujemy wycenę i odpowiemy na każde pytanie. Bezpłatna konsultacja, bez zobowiązań.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <a href="mailto:info@acourts.pl" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(245,240,232,0.6)", textDecoration: "none" }}>info@acourts.pl</a>
                <a href="tel:+48000000000" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(245,240,232,0.6)", textDecoration: "none" }}>+48 000 000 000</a>
              </div>
            </div>

            <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>
              {submitted ? (
                <div style={{ background: "rgba(200,137,58,0.12)", border: "1px solid rgba(200,137,58,0.3)", padding: "2.5rem", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: EP_CREAM, marginBottom: "0.8rem" }}>Dziękujemy.</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "rgba(245,240,232,0.7)" }}>Odezwiemy się w ciągu 24 godzin.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { key: "name", label: "Imię i Nazwisko", type: "text", required: true },
                    { key: "company", label: "Firma / Deweloper", type: "text", required: true },
                    { key: "email", label: "E-mail", type: "email", required: true },
                    { key: "phone", label: "Telefon", type: "tel", required: false },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)", display: "block", marginBottom: "0.4rem" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = EP_AMBER)}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(245,240,232,0.2)")}
                      />
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                    <button type="submit" className="ep-btn-primary" style={{ flex: 1 }}>Umów spotkanie online</button>
                    <a href="/broszura.pdf" target="_blank" rel="noopener" className="ep-btn-outline" style={{ flex: 1, textAlign: "center" }}>Pobierz broszurę (PDF)</a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

      </section>
      <footer style={{ background: "#070F18", padding: "1.5rem 0", borderTop: "1px solid rgba(200,137,58,0.1)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)" }}>Autonomous Courts</span>
          <div style={{ display: "flex", gap: "2rem" }}>
            <a href="/prywatnosc.html" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", color: "rgba(245,240,232,0.35)", textDecoration: "none" }}>Polityka Prywatności</a>
            <a href="/prywatnosc.html#regulamin" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", color: "rgba(245,240,232,0.35)", textDecoration: "none" }}>Regulamin</a>
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.25)" }}>© 2026 Autonomous Courts. Wszelkie prawa zastrzeżone.</span>
        </div>
      </footer>
    </>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: EP_DARK }}>
      <Nav />
      <HeroSection />
      <TornEdge fromColor={EP_DARK} toColor={EP_CREAM} />
      <DifferentiatorSection />
      <TornEdge fromColor={EP_CREAM} toColor={EP_DARK} />
      <ManagementSection />
      <TornEdge fromColor={EP_DARK} toColor={EP_CREAM} />
      <RevenueSection />
      <TornEdge fromColor={EP_CREAM} toColor={EP_DARK} />
      <FootprintSection />
      <TornEdge fromColor={EP_DARK} toColor={EP_CREAM} />
      <PadelGrowthSection />
      <TornEdge fromColor={EP_CREAM} toColor={EP_DARK} />
      <ProcessSection />
      <ContactSection />
    </div>
  );
}
