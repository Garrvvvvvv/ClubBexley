import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { apiUser } from "../../lib/apiUser";

function cld(url, t = []) {
  if (!url || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/${t.filter(Boolean).join(",")}/`);
}

/* ── useParallax: scrollY → offset for hero bg ── */
function useParallax(ref, strength = 0.35) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let raf;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const vhCenter = window.innerHeight / 2;
        setOffset((center - vhCenter) * strength);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [ref, strength]);
  return offset;
}

/* ── useReveal: fade+slide on scroll ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, [threshold]);
  return [ref, on];
}

/* ── number ticker ── */
function Ticker({ n, delay = 0 }) {
  const [ref, on] = useReveal(0.5);
  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .6s ${delay}s ease, transform .6s ${delay}s cubic-bezier(.23,1,.32,1)`,
      }}
    >{n}</span>
  );
}

/* ═══════════════════════════════════════════════════
   CINEMATIC TRIP SLIDE — full-viewport per trip
═══════════════════════════════════════════════════ */
function TripSlide({ ev, index }) {
  const slideRef = useRef(null);
  const parallaxOffset = useParallax(slideRef, 0.22);
  const [ref, on] = useReveal(0.06);
  const isEven = index % 2 === 0;

  const img = ev.posterUrl
    ? cld(ev.posterUrl, ["f_auto", "q_auto", "w_1400", "c_fill", "g_auto"])
    : null;

  const badgeStatus = ev.status === "LIVE"
    ? <span className="ts-status-live">Registeration Open</span>
    : ev.status === "PAUSED"
    ? <span className="ts-status-paused">⏸ Paused</span>
    : null;

  return (
    <section ref={slideRef} className="ts-slide">

      {/* full-bleed background image with parallax */}
      <div className="ts-bg-wrap">
        {img
          ? <div
              className="ts-bg-img"
              style={{
                backgroundImage: `url(${img})`,
                transform: `translateY(${parallaxOffset}px)`,
              }}
            />
          : <div className="ts-bg-empty" />
        }
        {/* dark scrim — heavier on content side */}
        <div className={`ts-scrim ts-scrim-${isEven ? "left" : "right"}`} />
      </div>

      {/* index number — giant ghost */}
      <div className={`ts-index-ghost ts-index-${isEven ? "right" : "left"}`} aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* content panel */}
      <div
        ref={ref}
        className={`ts-content ts-content-${isEven ? "left" : "right"}${on ? " ts-content-on" : ""}`}
      >
        {/* eyebrow */}
        <div className="ts-eyebrow">
          <span className="ts-eyebrow-dot" />
          <span>{ev.type === "TRIP" ? "Adventure Trip" : "Club Event"}</span>
          {badgeStatus}
        </div>

        {/* title */}
        <h2 className="ts-title">{ev.name}</h2>

        {/* description */}
        <p className="ts-desc">{ev.description || "An adventure worth taking."}</p>

        {/* meta pills */}
        <div className="ts-meta">
          {ev.duration && (
            <div className="ts-meta-pill">
              <span className="ts-meta-icon">🗓</span>
              <span>{ev.duration}</span>
            </div>
          )}
          {ev.pickupDrop && (
            <div className="ts-meta-pill">
              <span className="ts-meta-icon">📍</span>
              <span>{ev.pickupDrop}</span>
            </div>
          )}
          {ev.startingPrice > 0 && (
            <div className="ts-meta-pill ts-meta-pill-price">
              <span>from</span>
              <strong>₹{ev.startingPrice.toLocaleString("en-IN")}</strong>
            </div>
          )}
        </div>

        {/* CTAs */}
        <div className="ts-ctas">
          <a
            href={ev.googleFormLink || "#"}
            target={ev.googleFormLink ? "_blank" : undefined}
            rel="noreferrer"
            className="ts-btn-primary"
            style={!ev.googleFormLink ? { opacity: 0.45, cursor: "not-allowed", pointerEvents: "none" } : {}}
          >
            Register Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <Link to={`/event/${ev.slug}`} className="ts-btn-ghost">
            Full Details
          </Link>
          <Link to={`/event/${ev.slug}/memories`} className="ts-btn-icon" title="Gallery">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="5.5" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M1 11l3.5-3 2.5 2.5 2.5-2.5L15 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* bottom divider line */}
      <div className="ts-divider" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════ */
export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiUser.get("/api/events/ongoing")
      .then(r => setEvents(Array.isArray(r.data) ? r.data : []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{
      minHeight: "100vh", background: "#06060b",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
      fontFamily: "'Plus Jakarta Sans',sans-serif",
    }}>
      <style>{`@keyframes _spin{to{transform:rotate(360deg)}} @keyframes _pulse{0%,100%{opacity:.2}50%{opacity:1}}`}</style>
      <div style={{ width: 42, height: 42, borderRadius: "50%", border: "2px solid rgba(255,77,0,.15)", borderTopColor: "#ff4d00", animation: "_spin .8s linear infinite" }} />
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", color: "#3a3a50", animation: "_pulse 2s ease-in-out infinite", margin: 0 }}>
        Loading trips…
      </p>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital@1&display=swap');

        /* ═══ PAGE ═══ */
        .el-page {
          background: #06060b;
          color: #f0ece4;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ═══ INTRO BAND ═══ */
        .el-intro {
          position: relative;
          padding: 100px 72px 80px;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        @media(max-width:768px){ .el-intro{ padding:72px 24px 60px; } }

        .el-intro-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 600px 400px at 15% 80%, rgba(255,77,0,0.07), transparent);
          pointer-events: none;
        }

        .el-intro-grid {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: flex-end;
          gap: 40px;
        }
        @media(max-width:700px){ .el-intro-grid{ grid-template-columns:1fr; } }

        .el-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 700; letter-spacing: 3.5px;
          text-transform: uppercase; color: #888898;
          margin-bottom: 16px;
        }
        .el-tag-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #ff4d00; box-shadow: 0 0 10px #ff4d00;
          animation: el-dot 2s infinite;
        }
        @keyframes el-dot {
          0%,100%{ box-shadow:0 0 6px #ff4d00; }
          50%{ box-shadow:0 0 18px #ff4d00, 0 0 32px rgba(255,77,0,.5); }
        }

        .el-h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 12vw, 160px);
          line-height: .88; letter-spacing: 2px;
          margin: 0;
          background: linear-gradient(160deg, #f0ece4 0%, rgba(240,236,228,.45) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .el-h1-accent {
          display: block;
          background: linear-gradient(135deg, #ff4d00, #ffc447);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .el-intro-sub {
          font-size: 14px; color: #888898; line-height: 1.7; max-width: 380px; margin-top: 18px;
          font-style: italic;
        }

        .el-intro-stats {
          display: flex; flex-direction: column; align-items: flex-end; gap: 6px;
        }
        @media(max-width:700px){ .el-intro-stats{ align-items:flex-start; } }

        .el-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(60px, 8vw, 100px);
          line-height: 1; letter-spacing: -2px;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.12);
        }
        .el-stat-label {
          font-size: 10px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #3a3a50;
        }

        /* glow line */
        .el-glow {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,77,0,.6) 25%, rgba(255,196,71,.8) 50%, rgba(255,77,0,.6) 75%, transparent);
          box-shadow: 0 0 24px rgba(255,77,0,.2);
        }

        /* scroll hint */
        .el-scroll-hint {
          display: flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: #3a3a50;
          padding: 24px 72px;
          animation: el-hint 2.5s ease-in-out infinite;
        }
        @media(max-width:768px){ .el-scroll-hint{ padding:20px 24px; } }
        @keyframes el-hint {
          0%,100%{ opacity:.4; transform:translateY(0); }
          50%{ opacity:.9; transform:translateY(3px); }
        }
        .el-scroll-arrow { font-size: 18px; }

        /* ═══ TRIP SLIDE ═══ */
        .ts-slide {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* bg */
        .ts-bg-wrap {
          position: absolute; inset: 0; z-index: 0;
        }
        .ts-bg-img {
          position: absolute; inset: -15% 0;
          background-size: cover; background-position: center;
          will-change: transform;
          transition: transform 0s linear;
        }
        .ts-bg-empty {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #0d0d16, #06060b);
        }

        /* scrim */
        .ts-scrim {
          position: absolute; inset: 0;
          pointer-events: none; z-index: 1;
        }
        .ts-scrim-left {
          background:
            linear-gradient(to right, rgba(6,6,11,1) 0%, rgba(6,6,11,0.92) 30%, rgba(6,6,11,0.6) 55%, rgba(6,6,11,0.15) 75%, transparent 100%),
            linear-gradient(to top, rgba(6,6,11,0.8) 0%, transparent 40%),
            linear-gradient(to bottom, rgba(6,6,11,0.5) 0%, transparent 20%);
        }
        .ts-scrim-right {
          background:
            linear-gradient(to left, rgba(6,6,11,1) 0%, rgba(6,6,11,0.92) 30%, rgba(6,6,11,0.6) 55%, rgba(6,6,11,0.15) 75%, transparent 100%),
            linear-gradient(to top, rgba(6,6,11,0.8) 0%, transparent 40%),
            linear-gradient(to bottom, rgba(6,6,11,0.5) 0%, transparent 20%);
        }

        /* ghost index number */
        .ts-index-ghost {
          position: absolute; top: 50%; z-index: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(200px, 30vw, 380px);
          line-height: 1;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.04);
          pointer-events: none; user-select: none;
          transform: translateY(-50%);
          letter-spacing: -8px;
        }
        .ts-index-right { right: -24px; }
        .ts-index-left  { left:  -24px; }

        /* content */
        .ts-content {
          position: relative; z-index: 2;
          padding: 100px 80px;
          max-width: 580px;
          opacity: 0;
          transition: opacity .8s cubic-bezier(.23,1,.32,1), transform .8s cubic-bezier(.23,1,.32,1);
        }
        .ts-content-left {
          margin-left: 0;
          transform: translateX(-40px);
        }
        .ts-content-right {
          margin-left: auto;
          transform: translateX(40px);
        }
        .ts-content.ts-content-on {
          opacity: 1;
          transform: translateX(0) !important;
        }
        @media(max-width:900px){
          .ts-content { padding: 80px 32px; max-width: 100%; margin: 0 !important; }
        }
        @media(max-width:600px){
          .ts-content { padding: 60px 24px; }
        }

        /* eyebrow */
        .ts-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: #888898; margin-bottom: 20px; flex-wrap: wrap;
        }
        .ts-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #ff4d00; box-shadow: 0 0 8px #ff4d00; flex-shrink: 0;
        }
        .ts-status-live {
          font-size: 9px; padding: 3px 10px; border-radius: 100px;
          background: rgba(255,77,0,.15); color: #ff4d00; border: 1px solid rgba(255,77,0,.35);
        }
        .ts-status-paused {
          font-size: 9px; padding: 3px 10px; border-radius: 100px;
          background: rgba(251,146,60,.15); color: #fb923c; border: 1px solid rgba(251,146,60,.35);
        }

        /* title */
        .ts-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 7vw, 96px);
          line-height: .88; letter-spacing: 1.5px;
          margin: 0 0 20px;
          color: #f0ece4;
        }

        /* desc */
        .ts-desc {
          font-size: 15px; line-height: 1.75; color: rgba(240,236,228,.65);
          margin: 0 0 28px;
          max-width: 440px;
        }

        /* meta pills */
        .ts-meta {
          display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 36px;
        }
        .ts-meta-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 100px;
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
          font-size: 12px; font-weight: 600; color: rgba(240,236,228,.8);
          backdrop-filter: blur(4px);
        }
        .ts-meta-pill-price {
          background: rgba(255,196,71,.08); border-color: rgba(255,196,71,.25); color: #ffc447;
          gap: 4px;
        }
        .ts-meta-pill-price strong { font-size: 14px; font-weight: 800; }
        .ts-meta-icon { font-size: 14px; }

        /* CTAs */
        .ts-ctas {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
        }
        .ts-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #ff5200, #ff7a3a);
          color: #fff; text-decoration: none;
          font-size: 12px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase;
          padding: 13px 24px; border-radius: 12px;
          transition: all .3s cubic-bezier(.23,1,.32,1);
          box-shadow: 0 8px 24px rgba(255,77,0,.3);
        }
        .ts-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(255,77,0,.5);
        }
        .ts-btn-ghost {
          display: inline-flex; align-items: center;
          color: rgba(240,236,228,.7); text-decoration: none;
          font-size: 12px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase;
          padding: 13px 20px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.04);
          transition: all .25s ease;
          backdrop-filter: blur(4px);
        }
        .ts-btn-ghost:hover {
          color: #f0ece4; border-color: rgba(255,255,255,.3);
          background: rgba(255,255,255,.08);
        }
        .ts-btn-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.04);
          color: rgba(240,236,228,.6); text-decoration: none;
          transition: all .25s ease;
          backdrop-filter: blur(4px);
        }
        .ts-btn-icon:hover {
          color: #ff4d00; border-color: rgba(255,77,0,.35);
          background: rgba(255,77,0,.07);
        }

        /* slide divider */
        .ts-divider {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, transparent);
        }

        /* ═══ EMPTY ═══ */
        .el-empty {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          min-height: 60vh; gap: 16px; text-align: center; padding: 40px;
        }
        .el-empty-icon { font-size: 60px; }
        .el-empty-h {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 52px; letter-spacing: 1px; color: #3a3a50; margin: 0;
        }
        .el-empty-p { font-size: 14px; color: #3a3a50; margin: 0; }

        /* ═══ CLOSING STRIP ═══ */
        .el-closing {
          position: relative; overflow: hidden;
          padding: 80px 72px;
          background: #06060b;
          border-top: 1px solid rgba(255,255,255,.05);
          text-align: center;
        }
        @media(max-width:768px){ .el-closing{ padding:60px 24px; } }
        .el-closing-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 700px 300px at 50% 100%, rgba(255,77,0,.06), transparent);
          pointer-events: none;
        }
        .el-closing-pre {
          font-size: 10px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
          color: #888898; margin-bottom: 16px;
        }
        .el-closing-word {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 8vw, 100px);
          letter-spacing: 4px; line-height: 1;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.07);
          pointer-events: none; user-select: none; display: block;
          margin-bottom: 8px;
        }
        .el-closing-sub {
          font-size: 14px; color: #888898; font-style: italic;
        }
      `}</style>

      <div className="el-page">

        {/* ── INTRO BAND ── */}
        <div className="el-intro">
          <div className="el-intro-glow" />
          <div className="el-intro-grid">
            <div>
              <div className="el-tag">
                <span className="el-tag-dot" />
                Club Bexley
              </div>
              <h1 className="el-h1">
                OPEN
                <span className="el-h1-accent">TRIPS</span>
              </h1>
              <p className="el-intro-sub">
                Every route hand-picked. Every camp under real stars.
                Scroll down to find your next escape.
              </p>
            </div>
            {events.length > 0 && (
              <div className="el-intro-stats">
                <div className="el-stat-num">
                  <Ticker n={String(events.length).padStart(2, "0")} delay={0.2} />
                </div>
                <div className="el-stat-label">{events.length === 1 ? "trip open" : "trips open"}</div>
              </div>
            )}
          </div>
        </div>

        <div className="el-glow" />

        {/* scroll hint */}
        {events.length > 0 && (
          <div className="el-scroll-hint">
            <span className="el-scroll-arrow">↓</span>
            Scroll to explore
          </div>
        )}

        {/* ── TRIP SLIDES ── */}
        {events.length === 0 ? (
          <div className="el-empty">
            <div className="el-empty-icon">🏔️</div>
            <h2 className="el-empty-h">No trips yet</h2>
            <p className="el-empty-p">We're scouting the next route — check back soon.</p>
          </div>
        ) : (
          events.map((ev, i) => (
            <TripSlide key={ev._id} ev={ev} index={i} />
          ))
        )}

        {/* ── CLOSING ── */}
        {events.length > 0 && (
          <div className="el-closing">
            <div className="el-closing-glow" />
            <p className="el-closing-pre">That's everything for now</p>
            <span className="el-closing-word" aria-hidden>MORE SOON</span>
            <p className="el-closing-sub">New routes drop every season. Follow along.</p>
          </div>
        )}

      </div>
    </>
  );
}
