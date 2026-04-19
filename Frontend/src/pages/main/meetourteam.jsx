import React, { useEffect, useRef, useState } from "react";
import { Linkedin, Github, Instagram } from "lucide-react";

/* ─────────────────────────────────────────────
   TEAM DATA  — update names/roles/socials here
───────────────────────────────────────────── */
const TEAM = [
  {
    id: 1,
    name: "Add Name",
    role: "Trip Architect",
    tagline: "Turns blank maps into legends.",
    funFact: "Has never taken a bad photo. Ever.",
    image: "/assets/team/IMG_7387.PNG",
    accent: "#ff4d00",
    linkedin: "#",
    github: "#",
    instagram: "#",
  },
  {
    id: 2,
    name: "Add Name",
    role: "Adventure Lead",
    tagline: "If it's steep, she's already been there.",
    funFact: "Packs for a week in a 10L bag.",
    image: "/assets/team/IMG_7389.PNG",
    accent: "#ffc447",
    linkedin: "#",
    github: "",
    instagram: "#",
  },
  {
    id: 3,
    name: "Add Name",
    role: "Vibe Curator",
    tagline: "Makes every campfire feel like a concert.",
    funFact: "Knows the best chai spot in every hill town.",
    image: "/assets/team/IMG_4414.JPG",
    accent: "#a78bfa",
    linkedin: "#",
    github: "#",
    instagram: "#",
  },
  {
    id: 4,
    name: "Add Name",
    role: "Route Scout",
    tagline: "Finds the path no one else dares to take.",
    funFact: "Has memorised every mountain pass in Himachal.",
    image: "/assets/team/IMG_7391.PNG",
    accent: "#34d399",
    linkedin: "#",
    github: "",
    instagram: "#",
  },
  {
    id: 5,
    name: "Add Name",
    role: "Logistics Head",
    tagline: "Chaos is just a plan waiting to happen.",
    funFact: "Can set up camp in under 8 minutes flat.",
    image: "/assets/team/IMG_7392.PNG",
    accent: "#38bdf8",
    linkedin: "#",
    github: "#",
    instagram: "#",
  },
  {
    id: 6,
    name: "Add Name",
    role: "Media & Storytelling",
    tagline: "Every peak is a frame worth capturing.",
    funFact: "Shot 4,000 photos on a single Ladakh trip.",
    image: "/assets/team/IMG_7394.PNG",
    accent: "#f472b6",
    linkedin: "#",
    github: "",
    instagram: "#",
  },
  {
    id: 7,
    name: "Add Name",
    role: "Safety Officer",
    tagline: "Adventure is only fun when everyone comes back.",
    funFact: "Certified in wilderness first aid and avalanche rescue.",
    image: "/assets/team/IMG_7397.JPG",
    accent: "#fb923c",
    linkedin: "#",
    github: "#",
    instagram: "#",
  },
  {
    id: 8,
    name: "Add Name",
    role: "Community Manager",
    tagline: "Strangers become family by day two.",
    funFact: "Remembers every member's name after one trip.",
    image: "/assets/team/IMG_7398.JPG",
    accent: "#e879f9",
    linkedin: "#",
    github: "",
    instagram: "#",
  },
  {
    id: 9,
    name: "Add Name",
    role: "Finance & Deals",
    tagline: "Epic adventures, surprisingly honest prices.",
    funFact: "Once haggled a guesthouse down 60% — in Hindi.",
    image: "/assets/team/IMG_7399.PNG",
    accent: "#facc15",
    linkedin: "#",
    github: "#",
    instagram: "#",
  },
  {
    id: 10,
    name: "Add Name",
    role: "Co-Founder",
    tagline: "Started this whole thing on a midnight dare.",
    funFact: "Has slept under open sky in 12 different states.",
    image: "/assets/team/IMG_7400.JPG",
    accent: "#ff4d00",
    linkedin: "#",
    github: "#",
    instagram: "#",
  },
];

const isUrl = (u) => u && u.startsWith("http");

/* ─────────────────────────────────────────────
   HOOK — scroll-linked value 0→1 for an element
───────────────────────────────────────────── */
function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      // 0 when top enters viewport, 1 when bottom leaves
      const p = 1 - (rect.bottom / (winH + rect.height));
      setProgress(Math.min(1, Math.max(0, p)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

/* ─────────────────────────────────────────────
   MEMBER CARD — 3-D tilt + scroll parallax
───────────────────────────────────────────── */
function MemberCard({ member, index }) {
  const cardRef = useRef(null);
  const rafRef  = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [entered, setEntered] = useState(false);
  const sectionRef = useRef(null);
  const scrollP = useScrollProgress(sectionRef);

  // 3-D mouse tilt
  const onMouseMove = (e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      setTilt({ x: x * 14, y: -y * 14 });
    });
  };
  const onMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTilt({ x: 0, y: 0 });
  };

  // entrance observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setEntered(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // parallax offset driven by scroll
  const parallaxY = (scrollP - 0.5) * -40 * (index % 2 === 0 ? 1 : -1);

  return (
    <div
      ref={sectionRef}
      className="member-scene"
      style={{
        transform: `translateY(${parallaxY}px)`,
        transition: "transform 0.08s linear",
        opacity: entered ? 1 : 0,
        translate: entered ? "none" : `0 40px`,
        transitionProperty: "opacity, translate",
        transitionDuration: "0.7s",
        transitionDelay: `${index * 0.12}s`,
        transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      {/* card */}
      <div
        ref={cardRef}
        className="member-card"
        style={{
          "--accent": member.accent,
          transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(0)`,
          transition: tilt.x === 0 && tilt.y === 0
            ? "transform 0.6s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease"
            : "transform 0.08s linear",
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* glow corona */}
        <div className="card-corona" />

        {/* shine sweep on hover */}
        <div className="card-shine" />

        {/* photo */}
        <div className="card-photo-wrap">
          <img
            src={member.image}
            alt={member.name}
            className="card-photo"
            onError={(e) => { e.target.style.background = "#1a1a2e"; e.target.style.display = "none"; }}
          />
          <div className="card-photo-grad" />

          {/* index number watermark */}
          <span className="card-num">{String(index + 1).padStart(2, '0')}</span>
        </div>

        {/* content */}
        <div className="card-body">
          <p className="card-role">{member.role}</p>
          <h3 className="card-name">{member.name}</h3>

          <div className="card-tagline-wrap">
            <span className="card-tagline-dot" />
            <p className="card-tagline">"{member.tagline}"</p>
          </div>

          <div className="card-fun-fact">
            <span className="fun-label">Fun fact</span>
            <span className="fun-text">{member.funFact}</span>
          </div>

          <div className="card-socials">
            {isUrl(member.linkedin) && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="card-social" aria-label="LinkedIn">
                <Linkedin size={13} />
              </a>
            )}
            {isUrl(member.github) && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="card-social" aria-label="GitHub">
                <Github size={13} />
              </a>
            )}
            {isUrl(member.instagram) && (
              <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="card-social" aria-label="Instagram">
                <Instagram size={13} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* floating accent blobs */}
      <div className="card-blob card-blob-1" style={{ background: member.accent }} />
      <div className="card-blob card-blob-2" style={{ background: member.accent }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   HORIZONTAL MARQUEE — infinite scroll text
───────────────────────────────────────────── */
function Marquee({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-track" style={{ direction: reverse ? "rtl" : "ltr" }}>
      <div className={`marquee-inner ${reverse ? "marquee-reverse" : ""}`}>
        {doubled.map((t, i) => (
          <span key={i} className="marquee-word">
            <span className="marquee-sep">✦</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function TeamPage() {
  const heroRef = useRef(null);
  const heroP   = useScrollProgress(heroRef);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

        /* ── BASE ── */
        .team-pg {
          background: #06060b;
          color: #f0ece4;
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow-x: hidden;
          min-height: 100vh;
        }

        /* ── FIXED GRAIN ── */
        .team-pg::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ══════════════════════════════════════
           HERO
        ══════════════════════════════════════ */
        .team-hero {
          position: relative; z-index: 1;
          min-height: 100vh;
          display: flex; flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
        }

        /* giant bg text */
        .team-hero-bg-text {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(120px, 22vw, 320px);
          letter-spacing: -4px; white-space: nowrap;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.04);
          pointer-events: none; user-select: none; z-index: 0;
          will-change: transform;
        }

        /* orbs */
        .hero-orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; filter: blur(80px);
        }
        .hero-orb-1 {
          width: 600px; height: 600px;
          top: -100px; left: -150px;
          background: radial-gradient(circle, rgba(255,77,0,0.12), transparent 70%);
          animation: orbDrift1 12s ease-in-out infinite;
        }
        .hero-orb-2 {
          width: 500px; height: 500px;
          bottom: 0; right: -100px;
          background: radial-gradient(circle, rgba(255,196,71,0.09), transparent 70%);
          animation: orbDrift2 15s ease-in-out infinite;
        }
        .hero-orb-3 {
          width: 350px; height: 350px;
          top: 40%; left: 45%;
          background: radial-gradient(circle, rgba(167,139,250,0.07), transparent 70%);
          animation: orbDrift3 10s ease-in-out infinite;
        }
        @keyframes orbDrift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(60px,40px)} }
        @keyframes orbDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,-30px)} }
        @keyframes orbDrift3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-50px)} }

        /* hero copy */
        .team-hero-content {
          position: relative; z-index: 2;
          padding: 0 64px 72px;
          max-width: 1400px;
        }
        @media(max-width:768px){ .team-hero-content { padding: 0 24px 52px; } }

        .team-eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 10px; font-weight: 700; letter-spacing: 3.5px;
          text-transform: uppercase; color: #888898; margin-bottom: 18px;
        }
        .team-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
          background: #ff4d00; box-shadow: 0 0 8px #ff4d00;
          animation: eyeDot 2.5s infinite;
        }
        @keyframes eyeDot {
          0%,100%{box-shadow:0 0 5px #ff4d00}
          50%{box-shadow:0 0 18px #ff4d00, 0 0 32px rgba(255,77,0,.45)}
        }

        .team-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 14vw, 180px);
          line-height: 0.85; letter-spacing: 2px;
          color: #f0ece4; margin: 0 0 28px;
        }
        .team-headline em {
          font-style: normal;
          background: linear-gradient(135deg, #ff4d00 0%, #ffc447 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .team-hero-sub {
          font-size: 15px; color: #888898; line-height: 1.75;
          max-width: 500px; margin-bottom: 40px;
        }

        .hero-scroll-hint {
          display: flex; align-items: center; gap: 12px;
          font-size: 10px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: #3a3a50;
        }
        .hero-scroll-line {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, #ff4d00, transparent);
          animation: scrollPulse 2.5s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%,100%{opacity:.3; transform:scaleX(1)}
          50%{opacity:1; transform:scaleX(1.3)}
        }

        /* member count badge */
        .hero-count {
          position: absolute; top: 48px; right: 64px; z-index: 2;
          font-family: 'Bebas Neue', sans-serif;
        }
        .hero-count-num {
          font-size: 96px; line-height: 1; letter-spacing: -2px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
        }
        .hero-count-label {
          font-size: 10px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #3a3a50; text-align: right;
        }
        @media(max-width:768px){ .hero-count { display: none; } }

        /* ══════════════════════════════════════
           MARQUEE STRIP
        ══════════════════════════════════════ */
        .marquee-strip {
          position: relative; z-index: 1;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 14px 0; background: rgba(255,255,255,0.015);
          backdrop-filter: blur(4px);
        }
        .marquee-track { overflow: hidden; }
        .marquee-inner {
          display: flex; width: max-content;
          animation: mRun 28s linear infinite;
          gap: 0;
        }
        .marquee-reverse { animation: mRunR 28s linear infinite; }
        @keyframes mRun  { from{transform:translateX(0)}  to{transform:translateX(-50%)} }
        @keyframes mRunR { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        .marquee-word {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px; letter-spacing: 4px;
          color: rgba(255,255,255,0.13); white-space: nowrap;
          padding: 0 24px; transition: color .2s;
        }
        .marquee-word:hover { color: rgba(255,77,0,0.6); }
        .marquee-sep { color: #ff4d00; margin-right: 12px; font-size: 8px; opacity: .6; }

        /* ══════════════════════════════════════
           CARDS SECTION
        ══════════════════════════════════════ */
        .cards-section {
          position: relative; z-index: 1;
          padding: 120px 64px 140px;
          max-width: 1400px; margin: 0 auto;
        }
        @media(max-width:768px){ .cards-section { padding: 80px 24px 100px; } }

        .cards-section-label {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 72px;
        }
        .cards-section-label-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(255,77,0,0.4), transparent);
        }
        .cards-section-label-text {
          font-size: 10px; font-weight: 700; letter-spacing: 4px;
          text-transform: uppercase; color: #3a3a50; white-space: nowrap;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          align-items: start;
        }
        @media(max-width:1023px){ .cards-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; } }
        @media(max-width:599px) { .cards-grid { grid-template-columns: 1fr; gap: 24px; } }

        /* offset alternating cards */
        .member-scene:nth-child(even) { margin-top: 48px; }
        @media(max-width:599px){ .member-scene:nth-child(even){ margin-top: 0; } }

        /* ── MEMBER CARD ── */
        .member-card {
          position: relative;
          background: #0d0d16;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
          overflow: hidden;
          transform-style: preserve-3d;
          will-change: transform;
          cursor: default;
        }
        .member-card:hover {
          border-color: color-mix(in srgb, var(--accent) 30%, transparent);
          box-shadow:
            0 32px 80px rgba(0,0,0,0.6),
            0 0 0 1px color-mix(in srgb, var(--accent) 18%, transparent),
            0 0 60px color-mix(in srgb, var(--accent) 10%, transparent);
        }

        /* glow corona */
        .card-corona {
          position: absolute; inset: 0; z-index: 0; pointer-events: none; border-radius: 24px;
          background: radial-gradient(ellipse at 50% -10%,
            color-mix(in srgb, var(--accent) 18%, transparent), transparent 60%);
          opacity: 0; transition: opacity 0.45s ease;
        }
        .member-card:hover .card-corona { opacity: 1; }

        /* shine sweep */
        .card-shine {
          position: absolute; inset: 0; z-index: 5; pointer-events: none; border-radius: 24px;
          background: linear-gradient(135deg,
            transparent 30%,
            rgba(255,255,255,0.04) 50%,
            transparent 70%);
          opacity: 0; transition: opacity 0.3s;
          transform: translateX(-100%);
        }
        .member-card:hover .card-shine {
          opacity: 1;
          animation: shineSweep 0.6s ease forwards;
        }
        @keyframes shineSweep {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }

        /* photo */
        .card-photo-wrap {
          position: relative; width: 100%; padding-top: 120%;
          overflow: hidden; background: #121220;
        }
        .card-photo {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: top center;
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
          filter: grayscale(25%) brightness(0.9);
        }
        .member-card:hover .card-photo {
          transform: scale(1.08);
          filter: grayscale(0%) brightness(1);
        }
        .card-photo-grad {
          display: none;
        }
        .card-num {
          position: absolute; top: 16px; left: 20px; z-index: 2;
          font-family: 'Bebas Neue', sans-serif; font-size: 52px;
          line-height: 1; letter-spacing: -1px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.12);
          pointer-events: none;
        }

        /* body */
        .card-body { position: relative; z-index: 2; padding: 20px 24px 26px; }

        .card-role {
          font-size: 9px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: var(--accent);
          margin: 0 0 6px; opacity: 0.9;
        }
        .card-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px; letter-spacing: 1px;
          color: #f0ece4; margin: 0 0 14px; line-height: 1;
        }

        .card-tagline-wrap {
          display: flex; align-items: flex-start; gap: 10px;
          margin-bottom: 16px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-left: 3px solid color-mix(in srgb, var(--accent) 60%, transparent);
          border-radius: 0 10px 10px 0;
        }
        .card-tagline-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent); flex-shrink: 0; margin-top: 5px;
          box-shadow: 0 0 6px var(--accent);
          animation: eyeDot 2.5s infinite;
        }
        .card-tagline {
          font-size: 12px; color: #888898; line-height: 1.6;
          font-style: italic; margin: 0;
        }

        .card-fun-fact {
          display: flex; flex-direction: column; gap: 3px;
          margin-bottom: 18px; padding: 10px 14px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 10px;
        }
        .fun-label {
          font-size: 8px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: #3a3a50;
        }
        .fun-text { font-size: 12px; color: #888898; }

        .card-socials { display: flex; gap: 8px; }
        .card-social {
          width: 32px; height: 32px; border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #888898; display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: all 0.22s ease;
        }
        .card-social:hover {
          background: color-mix(in srgb, var(--accent) 16%, transparent);
          border-color: color-mix(in srgb, var(--accent) 40%, transparent);
          color: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px color-mix(in srgb, var(--accent) 20%, transparent);
        }

        /* floating blobs */
        .card-blob {
          position: absolute; border-radius: 50%;
          pointer-events: none; opacity: 0;
          transition: opacity 0.5s ease;
          filter: blur(40px);
        }
        .member-scene:hover .card-blob { opacity: 1; }
        .card-blob-1 {
          width: 200px; height: 200px;
          bottom: -60px; right: -60px; opacity: 0.06;
        }
        .card-blob-2 {
          width: 120px; height: 120px;
          top: -30px; left: -30px; opacity: 0.04;
        }
        .member-scene:hover .card-blob-1 { opacity: 0.08; }
        .member-scene:hover .card-blob-2 { opacity: 0.05; }

        /* ══════════════════════════════════════
           BOTTOM CTA STRIP
        ══════════════════════════════════════ */
        .team-cta-strip {
          position: relative; z-index: 1;
          background: #0d0d16;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 80px 64px;
          text-align: center;
          overflow: hidden;
        }
        .team-cta-strip::before {
          content: '';
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,77,0,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .team-cta-big {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 9vw, 100px);
          line-height: 0.9; letter-spacing: 2px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.12);
          margin: 0 0 24px;
          position: relative;
        }
        .team-cta-sub {
          font-size: 14px; color: #888898; line-height: 1.7;
          max-width: 440px; margin: 0 auto 36px;
          position: relative;
        }
        .team-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #ff5200, #ff7033);
          color: #fff; text-decoration: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 700; letter-spacing: 0.5px;
          padding: 14px 30px; border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
          box-shadow: 0 8px 28px rgba(255,77,0,0.35);
          position: relative;
        }
        .team-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(255,77,0,0.5);
        }
        @media(max-width:768px){ .team-cta-strip { padding: 60px 24px; } }
      `}</style>

      <div className="team-pg">

        {/* ── HERO ── */}
        <section className="team-hero" ref={heroRef}>
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />

          {/* paralax bg text */}
          <div
            className="team-hero-bg-text"
            style={{ transform: `translate(-50%, calc(-50% + ${heroP * 80}px))` }}
          >
            CREW
          </div>

          {/* member count */}
          <div className="hero-count">
            <div className="hero-count-num">{String(TEAM.length).padStart(2, '0')}</div>
            <div className="hero-count-label">Members</div>
          </div>

          <div className="team-hero-content">
            <div className="team-eyebrow">
              <span className="team-eyebrow-dot" />
              The People Behind The Plans
            </div>
            <h1 className="team-headline">
              MEET<br />THE <em>CREW</em>
            </h1>
            <p className="team-hero-sub">
              Small team. Big mountains. Questionable decisions at altitude.
              These are the people who make every trip happen — and somehow survive to plan the next one.
            </p>
            <div className="hero-scroll-hint">
              <div className="hero-scroll-line" />
              Scroll to meet them
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee-strip">
          <Marquee items={["ESCAPE","EXPLORE","EXPERIENCE","ADVENTURE","HILLS","TRAILS","CAMPING","LADAKH","SPITI","MANALI","PEAKS"]} />
        </div>

        {/* ── CARDS ── */}
        <div className="cards-section">
          <div className="cards-section-label">
            <div className="cards-section-label-line" />
            <span className="cards-section-label-text">The full team — all {TEAM.length} of them</span>
            <div className="cards-section-label-line" style={{ background: "linear-gradient(90deg, transparent, rgba(255,77,0,0.4))" }} />
          </div>

          <div className="cards-grid">
            {TEAM.map((m, i) => (
              <MemberCard key={m.id} member={m} index={i} />
            ))}
          </div>
        </div>

        {/* ── SECOND MARQUEE ── */}
        <div className="marquee-strip">
          <Marquee
            items={["VETTED ROUTES","HONEST PRICES","SAFETY FIRST","GROUP VIBES","NO TOURIST TRAPS","REAL GUIDES","MEMORIES"]}
            reverse
          />
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="team-cta-strip">
          <div className="team-cta-big">WANT IN?</div>
          <p className="team-cta-sub">
            We're always looking for people who love the mountains as much as we do. Come explore with us.
          </p>
          <a href="/events" className="team-cta-btn">
            Browse Trips
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

      </div>
    </>
  );
}
