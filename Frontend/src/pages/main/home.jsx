import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import "./home.css";

/* ─── Cloudinary helper ─────────────────────────────── */
function cld(url, transforms = []) {
  if (!url || !url.includes("/upload/")) return url;
  const t = transforms.filter(Boolean).join(",");
  return url.replace("/upload/", `/upload/${t}/`);
}

/* ─── 3D Tilt Card ──────────────────────────────────── */
function TiltCard({ children, className }) {
  const ref   = useRef(null);
  const rafId = useRef(null);

  const onMove = useCallback((e) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r  = el.getBoundingClientRect();
      const x  = ((e.clientX - r.left)  / r.width  - 0.5) * 2;
      const y  = ((e.clientY - r.top)   / r.height - 0.5) * 2;
      el.style.transform    = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
      el.style.transition   = "transform 0.08s linear";
    });
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform  = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)";
      ref.current.style.transition = "transform 0.6s cubic-bezier(0.23,1,0.32,1)";
    }
  }, []);

  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/* ─── Animated counter hook ─────────────────────────── */
function useCounter(target, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active || target === 0) return;
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      setVal(Math.round(ease * target));
      if (pct < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return val;
}

/* ─── Main Component ─────────────────────────────────── */
export default function Home() {
  const [trips,        setTrips]        = useState([]);
  const [heroImages,   setHeroImages]   = useState([]);
  const [memImages,    setMemImages]    = useState([]);
  const [heroBg,       setHeroBg]       = useState(0);
  const [statsOn,      setStatsOn]      = useState(false);
  const statsRef = useRef(null);

  /* ── fetch data ── */
  useEffect(() => {
    api.get("/api/events/ongoing")
      .then(r => setTrips(Array.isArray(r.data) ? r.data : []))
      .catch(() => {});

    api.get("/api/images/public/home-images", { params: { category: "home_announcement" } })
      .then(r => setHeroImages(Array.isArray(r.data) ? r.data.map(i => i.url).filter(Boolean) : []))
      .catch(() => {});

    api.get("/api/images/public/home-images", { params: { category: "home_memories" } })
      .then(r => setMemImages(Array.isArray(r.data) ? r.data.map(i => i.url).filter(Boolean) : []))
      .catch(() => {});
  }, []);

  /* ── hero bg crossfade ── */
  useEffect(() => {
    if (heroImages.length < 2) return;
    const t = setInterval(() => setHeroBg(p => (p + 1) % heroImages.length), 5500);
    return () => clearInterval(t);
  }, [heroImages.length]);

  /* ── stats trigger ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsOn(true); },
      { threshold: 0.25 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── hero parallax ── */
  const heroRef  = useRef(null);
  const heroPara = useCallback((e) => {
    const el = heroRef.current;
    if (!el) return;
    const { width, height, left, top } = el.getBoundingClientRect();
    const x = (e.clientX - left - width  / 2) / width;
    const y = (e.clientY - top  - height / 2) / height;
    el.querySelectorAll(".hero-bg-layer.active").forEach(l => {
      l.style.transform  = `scale(1.08) translate(${x * 22}px, ${y * 18}px)`;
      l.style.transition = "transform 0.12s linear, opacity 1.8s ease";
    });
  }, []);
  const heroParaLeave = useCallback(() => {
    const el = heroRef.current;
    if (!el) return;
    el.querySelectorAll(".hero-bg-layer").forEach(l => {
      l.style.transform  = "";
      l.style.transition = "transform 1.2s ease, opacity 1.8s ease";
    });
  }, []);

  /* counters */
  const c1 = useCounter(200,  2200, statsOn);
  const c2 = useCounter(50,   1900, statsOn);
  const c3 = useCounter(5000, 2600, statsOn);

  const DESTINATIONS = [
    "MANALI","KASOL","SPITI VALLEY","KEDARNATH","LADAKH",
    "RISHIKESH","CHOPTA","MCLEODGANJ","DHARAMSHALA","BADRINATH",
  ];

  /* ════ RENDER ════════════════════════════════════════ */
  return (
    <div className="home-v2">

      {/* ══════════ HERO ══════════ */}
      <section
        className="hero-v2"
        ref={heroRef}
        onMouseMove={heroPara}
        onMouseLeave={heroParaLeave}
      >
        {/* BG */}
        <div className="hero-bg">
          <div className="hero-bg-fallback" />
          {heroImages.map((url, i) => (
            <div
              key={i}
              className={`hero-bg-layer${i === heroBg ? " active" : ""}`}
              style={{ backgroundImage: `url(${cld(url, ["f_auto","q_auto","w_1920","c_fill"])})` }}
            />
          ))}
          <div className="hero-overlay" />
          <div className="hero-noise" />
        </div>

        {/* Particles */}
        <div className="particles-container" aria-hidden>
          {Array.from({ length: 10 }, (_, i) => <div key={i} className="particle" />)}
        </div>

        {/* Main */}
        <div className="hero-content">

          {/* LEFT — text */}
          <div className="hero-text-block">
            <div className="hero-tag">
              <span className="tag-dot" />
              <span>Club Bexley · Trips & Travel</span>
            </div>

            <h1 className="hero-headline">
              <span className="headline-line line-1">ESCAPE</span>
              <span className="headline-line line-2">EXPLORE</span>
              <span className="headline-line line-3 accent-text">EXPERIENCE</span>
            </h1>

            <p className="hero-sub">
              Curated Himalayan adventures, heritage circuits & weekend escapes —
              crafted for explorers who want more than just a holiday.
            </p>

            <div className="hero-actions">
              <Link to="/events" className="btn-primary-v2">
                <span>Browse Trips</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/memories" className="btn-ghost-v2">View Gallery</Link>
            </div>
          </div>

          {/* RIGHT — 3D card stack */}
          {trips.length > 0 && (
            <div className="hero-card-stack" aria-hidden>
              {trips.slice(0, 3).map((trip, i) => (
                <Link
                  key={trip._id}
                  to={`/event/${trip.slug}`}
                  className={`stack-card stack-card-${i}`}
                  tabIndex={-1}
                >
                  <div
                    className="stack-card-img"
                    style={{
                      backgroundImage: `url(${cld(
                        trip.posterUrl || "",
                        ["f_auto","q_auto","w_600","c_fill","g_auto"]
                      )})`,
                      backgroundColor: "#0d0d16",
                    }}
                  />
                  <div className="stack-card-overlay" />
                  <div className="stack-card-info">
                    <span className="stack-card-tag">
                      {trip.type === "TRIP" ? "Adventure Trip" : "Club Event"}
                    </span>
                    <h3>{trip.name}</h3>
                    {trip.duration && <p className="stack-card-meta">📍 {trip.duration}</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Destinations marquee */}
        <div className="hero-marquee-wrap">
          <div className="hero-marquee">
            {[...DESTINATIONS, ...DESTINATIONS].map((d, i) => (
              <span key={i} className="marquee-item">
                <span className="marquee-dot">✦</span>{d}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-indicator" aria-hidden>
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ══════════ MOUNTAIN SCENE ══════════ */}
      <div className="mountain-scene" aria-hidden="true">
        <svg viewBox="0 0 1440 340" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06060b"/>
              <stop offset="100%" stopColor="#0d0d1a"/>
            </linearGradient>
            <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0ece4" stopOpacity="0.92"/>
              <stop offset="100%" stopColor="#c8c4bc" stopOpacity="0.4"/>
            </linearGradient>
            <linearGradient id="mtn1Grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a2e"/>
              <stop offset="100%" stopColor="#06060b"/>
            </linearGradient>
            <linearGradient id="mtn2Grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#141428"/>
              <stop offset="100%" stopColor="#06060b"/>
            </linearGradient>
            <linearGradient id="mtn3Grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f0f20"/>
              <stop offset="100%" stopColor="#06060b"/>
            </linearGradient>
            <linearGradient id="lakeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d1a2e" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#06060b" stopOpacity="1"/>
            </linearGradient>
            <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff4d00" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#ff4d00" stopOpacity="0"/>
            </linearGradient>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffc447" stopOpacity="0.22"/>
              <stop offset="100%" stopColor="#ffc447" stopOpacity="0"/>
            </radialGradient>
            <filter id="blur2">
              <feGaussianBlur stdDeviation="2"/>
            </filter>
            <filter id="blur4">
              <feGaussianBlur stdDeviation="4"/>
            </filter>
            <clipPath id="sceneClip">
              <rect width="1440" height="340"/>
            </clipPath>
          </defs>

          <g clipPath="url(#sceneClip)">
            {/* Sky */}
            <rect width="1440" height="340" fill="url(#skyGrad)"/>

            {/* Stars */}
            {[
              [80,18],[200,8],[340,22],[500,12],[620,28],[720,6],[850,16],[980,24],[1100,10],[1240,20],[1380,14],
              [140,38],[430,44],[700,36],[950,48],[1200,40],[1350,32],[60,52],[290,56],[560,42],[800,58],[1050,34],
            ].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r={i%3===0?1.2:0.7} fill="#f0ece4" opacity={0.3+Math.sin(i)*0.25}/>
            ))}

            {/* Moon glow */}
            <ellipse cx="1100" cy="48" rx="80" ry="80" fill="url(#moonGlow)"/>
            {/* Moon */}
            <circle cx="1100" cy="48" r="18" fill="#f5f0e8" opacity="0.88"/>
            <circle cx="1108" cy="44" r="15" fill="#0d0d1a"/>

            {/* Horizon orange glow (sunrise/sunset) */}
            <ellipse cx="720" cy="200" rx="480" ry="90" fill="url(#glowGrad)" filter="url(#blur4)"/>

            {/* Far mountains — layer 4 (most distant, lightest) */}
            <path
              d="M0,210 L90,160 L160,185 L240,130 L310,160 L400,110 L470,148 L560,95 L640,135 L720,85 L800,128 L880,98 L960,138 L1040,108 L1120,145 L1200,118 L1280,152 L1360,125 L1440,160 L1440,340 L0,340 Z"
              fill="#0d0d1e" opacity="0.6"
            />

            {/* Mid mountains — layer 3 */}
            <path
              d="M0,230 L70,185 L140,210 L220,155 L300,190 L390,135 L460,172 L550,118 L640,158 L720,105 L800,148 L890,112 L970,155 L1060,122 L1150,162 L1240,132 L1330,170 L1440,148 L1440,340 L0,340 Z"
              fill="url(#mtn3Grad)"
            />

            {/* Main mountains — layer 2 */}
            <path
              d="M0,260 L60,220 L130,245 L210,188 L290,228 L380,168 L450,210 L540,152 L620,198 L710,138 L790,188 L870,155 L960,195 L1050,162 L1140,202 L1220,172 L1310,215 L1440,195 L1440,340 L0,340 Z"
              fill="url(#mtn2Grad)"
            />

            {/* Foreground mountains — layer 1 (darkest) */}
            <path
              d="M0,290 L80,248 L160,272 L250,218 L340,258 L420,200 L510,245 L600,188 L690,238 L770,180 L860,228 L940,195 L1020,238 L1110,205 L1200,250 L1290,218 L1380,258 L1440,240 L1440,340 L0,340 Z"
              fill="url(#mtn1Grad)"
            />

            {/* Snow caps on peaks */}
            <path d="M710,138 L730,160 L750,145 L760,155 L780,138 L790,188 Z" fill="url(#snowGrad)" opacity="0.7"/>
            <path d="M540,152 L558,175 L572,160 L585,170 L600,152 L620,198 Z" fill="url(#snowGrad)" opacity="0.55"/>
            <path d="M380,168 L398,188 L412,176 L425,184 L438,170 L450,210 Z" fill="url(#snowGrad)" opacity="0.5"/>
            <path d="M860,155 L876,178 L888,166 L900,173 L912,158 L928,195 Z" fill="url(#snowGrad)" opacity="0.52"/>
            <path d="M210,188 L226,208 L240,196 L252,204 L265,190 L290,228 Z" fill="url(#snowGrad)" opacity="0.45"/>

            {/* Lake / reflection */}
            <rect x="0" y="280" width="1440" height="60" fill="url(#lakeGrad)"/>

            {/* Lake shine line */}
            <line x1="400" y1="282" x2="1040" y2="282" stroke="#1a3a5c" strokeWidth="1" opacity="0.6"/>

            {/* Moon reflection in lake */}
            <ellipse cx="1100" cy="300" rx="28" ry="6" fill="#ffc447" opacity="0.08" filter="url(#blur2)"/>
            <path d="M1088,290 Q1100,295 1112,290 Q1106,305 1100,308 Q1094,305 1088,290 Z" fill="#ffc447" opacity="0.06"/>

            {/* Mountain reflections in lake (flipped, faded) */}
            <path
              d="M0,280 L80,300 L160,288 L250,310 L340,295 L420,318 L510,300 L600,328 L690,306 L770,330 L860,308 L940,322 L1020,305 L1110,320 L1200,300 L1290,315 L1380,298 L1440,308 L1440,340 L0,340 Z"
              fill="#0a0a18" opacity="0.55"
            />

            {/* Lake ripple lines */}
            <ellipse cx="580" cy="312" rx="120" ry="3" stroke="#1e3a5a" strokeWidth="0.8" fill="none" opacity="0.5"/>
            <ellipse cx="580" cy="318" rx="85" ry="2" stroke="#1e3a5a" strokeWidth="0.5" fill="none" opacity="0.3"/>
            <ellipse cx="900" cy="308" rx="100" ry="2.5" stroke="#1e3a5a" strokeWidth="0.8" fill="none" opacity="0.45"/>
            <ellipse cx="900" cy="315" rx="70" ry="2" stroke="#1e3a5a" strokeWidth="0.5" fill="none" opacity="0.25"/>

            {/* Pine tree silhouettes — left cluster */}
            {[30,55,78,18,100].map((x,i) => {
              const h = [52,62,48,44,56][i], base = 275;
              return (
                <g key={i}>
                  <polygon points={`${x},${base-h} ${x-10},${base} ${x+10},${base}`} fill="#080812" opacity="0.9"/>
                  <polygon points={`${x},${base-h*0.65} ${x-13},${base-h*0.2} ${x+13},${base-h*0.2}`} fill="#080812" opacity="0.9"/>
                  <rect x={x-3} y={base} width="6" height="8" fill="#080812" opacity="0.8"/>
                </g>
              );
            })}

            {/* Pine tree silhouettes — right cluster */}
            {[1360,1385,1410,1340,1430].map((x,i) => {
              const h = [50,60,46,54,42][i], base = 275;
              return (
                <g key={i}>
                  <polygon points={`${x},${base-h} ${x-10},${base} ${x+10},${base}`} fill="#080812" opacity="0.9"/>
                  <polygon points={`${x},${base-h*0.65} ${x-13},${base-h*0.2} ${x+13},${base-h*0.2}`} fill="#080812" opacity="0.9"/>
                  <rect x={x-3} y={base} width="6" height="8" fill="#080812" opacity="0.8"/>
                </g>
              );
            })}

            {/* Ground fade to page */}
            <rect x="0" y="300" width="1440" height="40"
              fill="url(#skyGrad)" opacity="0.95"/>
          </g>
        </svg>
      </div>

      {/* ══════════ TRIPS ══════════ */}
      <section className="trips-section">
        <div className="section-header">
          <div className="section-header-left">
            <span className="section-eyebrow">Upcoming Trips</span>
            <h2 className="section-title">Next Destinations</h2>
          </div>
          <Link to="/events" className="see-all-link">
            View All<span className="arrow-icon"> →</span>
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="trips-empty">
            <span className="trips-empty-icon">🏔️</span>
            <p>No upcoming trips yet — check back soon.</p>
          </div>
        ) : (
          <div className="trips-grid">
            {trips.map((trip, i) => (
              <TiltCard key={trip._id} className={`trip-card${i === 0 ? " trip-card-featured" : ""}`}>
                <Link to={`/event/${trip.slug}`} className="trip-card-inner">
                  <div className="trip-img-wrap">
                    <img
                      src={cld(trip.posterUrl || "", ["f_auto","q_auto","w_900","c_fill","g_auto"])}
                      alt={trip.name}
                      className="trip-img"
                      loading="lazy"
                      onError={e => { e.target.style.display = "none"; }}
                    />
                    <div className="trip-img-grad" />
                    <div className="trip-badges">
                      <span className="badge-type">{trip.type === "TRIP" ? "Trip" : "Event"}</span>
                      {trip.status === "LIVE" && <span className="badge-live">● Live</span>}
                    </div>
                  </div>

                  <div className="trip-info">
                    <h3 className="trip-name">{trip.name}</h3>
                    <p className="trip-desc">{trip.description}</p>
                    <div className="trip-meta-row">
                      {trip.duration    && <span className="trip-meta-item">🗓 {trip.duration}</span>}
                      {trip.pickupDrop  && <span className="trip-meta-item">📍 {trip.pickupDrop}</span>}
                      {trip.startingPrice > 0 && (
                        <span className="trip-meta-item trip-price">
                          ₹{trip.startingPrice.toLocaleString("en-IN")}+
                        </span>
                      )}
                    </div>
                    <div className="trip-cta-row">
                      <span className="trip-cta-text">View Trip Details</span>
                      <span className="trip-cta-arrow">↗</span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        )}
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-word" aria-hidden>ADVENTURES</div>
        <div className="stats-grid">
          {[
            { n: c1, suf: "+", label: "Trips Organised" },
            { n: c2, suf: "+", label: "Destinations" },
            { n: c3, suf: "+", label: "Community Members" },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-number">
                {s.n.toLocaleString("en-IN")}<span className="stat-suffix">{s.suf}</span>
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ WHY US ══════════ */}
      <section className="why-section">
        <div className="why-left">
          <span className="why-eyebrow">Why Travel With Us</span>
          <h2 className="why-title">
            Built for explorers,<br />
            <em>by explorers</em>
          </h2>
          <p className="why-sub">
            Every route is scouted by our team who've been there. No tourist traps,
            no compromise — just honest adventures at honest prices.
          </p>
          <Link to="/meetourteam" className="btn-primary-v2" style={{ marginTop: 36, display: "inline-flex" }}>
            <span>Meet the Team</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <div className="why-right">
          <div className="why-cards">
            {[
              { icon: "🏔️", title: "Vetted Routes",    desc: "Every trail is scouted and safety-checked before we take a single booking." },
              { icon: "👥", title: "Travel Community", desc: "Travel with like-minded explorers. Connections that outlast the trip." },
              { icon: "💰", title: "Best Value",       desc: "Group pricing means extraordinary experiences at honest, transparent costs." },
              { icon: "🛡️", title: "Safety First",     desc: "24/7 support, insurance coverage, and experienced guides on every trip." },
            ].map((c, i) => (
              <div key={i} className="why-card">
                <span className="why-icon">{c.icon}</span>
                <h4 className="why-card-title">{c.title}</h4>
                <p className="why-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MEMORIES ══════════ */}
      {memImages.length >= 4 && (
        <section className="memories-section">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-eyebrow">Gallery</span>
              <h2 className="section-title">Moments That Matter</h2>
            </div>
            <Link to="/memories" className="see-all-link">
              View Gallery<span className="arrow-icon"> →</span>
            </Link>
          </div>

          <div className="memories-mosaic">
            {memImages.slice(0, 6).map((url, i) => (
              <Link key={i} to="/memories" className={`mem-tile mem-tile-${i}`}>
                <img
                  src={cld(url, ["f_auto","q_auto","w_700","c_fill","g_auto"])}
                  alt={`Memory ${i + 1}`}
                  loading="lazy"
                />
                <div className="mem-tile-overlay"><span>View Gallery →</span></div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ LAKE DIVIDER ══════════ */}
      <div className="lake-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lk2Sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d0d1a"/>
              <stop offset="100%" stopColor="#121220"/>
            </linearGradient>
            <linearGradient id="lk2Water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1526" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="#121220"/>
            </linearGradient>
            <radialGradient id="lk2Glow" cx="50%" cy="100%" r="55%">
              <stop offset="0%" stopColor="#ff4d00" stopOpacity="0.12"/>
              <stop offset="100%" stopColor="#ff4d00" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="lk2Snow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0ece4" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#c8c4bc" stopOpacity="0.2"/>
            </linearGradient>
            <filter id="lk2blur">
              <feGaussianBlur stdDeviation="3"/>
            </filter>
          </defs>

          {/* Sky bg */}
          <rect width="1440" height="180" fill="url(#lk2Sky)"/>

          {/* Distant orange horizon glow */}
          <ellipse cx="720" cy="120" rx="500" ry="60" fill="url(#lk2Glow)" filter="url(#lk2blur)"/>

          {/* Far ridge */}
          <path d="M0,115 L120,85 L240,100 L360,68 L480,90 L600,58 L720,78 L840,55 L960,75 L1080,60 L1200,82 L1320,70 L1440,88 L1440,180 L0,180 Z"
            fill="#0d0d20" opacity="0.7"/>

          {/* Main ridge */}
          <path d="M0,130 L100,100 L200,118 L320,82 L440,108 L560,72 L680,98 L800,68 L920,92 L1040,76 L1160,100 L1280,84 L1440,105 L1440,180 L0,180 Z"
            fill="#0f0f22"/>

          {/* Foreground ridge */}
          <path d="M0,148 L120,120 L240,138 L360,108 L500,132 L640,100 L760,128 L900,108 L1040,130 L1160,115 L1300,138 L1440,122 L1440,180 L0,180 Z"
            fill="#0a0a18"/>

          {/* Snow caps */}
          <path d="M600,58 L618,78 L630,66 L643,74 L656,60 L680,98 Z" fill="url(#lk2Snow)" opacity="0.65"/>
          <path d="M800,68 L816,86 L827,76 L839,83 L852,70 L870,92 Z" fill="url(#lk2Snow)" opacity="0.58"/>
          <path d="M360,68 L374,86 L384,76 L395,82 L406,70 L420,108 Z" fill="url(#lk2Snow)" opacity="0.5"/>

          {/* Lake surface */}
          <rect x="0" y="148" width="1440" height="32" fill="url(#lk2Water)"/>

          {/* Ripples */}
          <ellipse cx="500" cy="158" rx="140" ry="3" stroke="#1a3550" strokeWidth="0.8" fill="none" opacity="0.5"/>
          <ellipse cx="500" cy="164" rx="95" ry="2" stroke="#1a3550" strokeWidth="0.5" fill="none" opacity="0.3"/>
          <ellipse cx="940" cy="155" rx="120" ry="2.5" stroke="#1a3550" strokeWidth="0.8" fill="none" opacity="0.45"/>
          <ellipse cx="940" cy="161" rx="80" ry="2" stroke="#1a3550" strokeWidth="0.5" fill="none" opacity="0.25"/>

          {/* Faint orange reflection streak */}
          <ellipse cx="720" cy="162" rx="180" ry="4" fill="#ff4d00" opacity="0.04" filter="url(#lk2blur)"/>

          {/* Pine trees — sparse mid */}
          {[620,645,668,692,715,740,762,785].map((x,i) => {
            const h = [30,38,28,35,40,26,34,30][i], base = 150;
            return (
              <g key={i}>
                <polygon points={`${x},${base-h} ${x-7},${base} ${x+7},${base}`} fill="#06060b" opacity="0.95"/>
                <polygon points={`${x},${base-h*0.6} ${x-9},${base-h*0.18} ${x+9},${base-h*0.18}`} fill="#06060b" opacity="0.95"/>
              </g>
            );
          })}

          {/* Bottom fade to elevated bg */}
          <rect x="0" y="155" width="1440" height="25" fill="#121220" opacity="0.8"/>
        </svg>
      </div>

      {/* ══════════ CTA BAND ══════════ */}
      <section className="cta-band">
        <h2 className="cta-band-title">
          Your next adventure<br />
          <span className="accent-text">starts here.</span>
        </h2>
        <p className="cta-band-sub">
          Join hundreds of travellers exploring incredible destinations together, every year.
        </p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <Link to="/events" className="btn-primary-v2">
            <span>Explore All Trips</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link to="/meetourteam" className="btn-ghost-v2">Our Team</Link>
        </div>
      </section>

    </div>
  );
}
