import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';

const QUICK_LINKS = [
  { name: "Home",             path: "/" },
  { name: "Trips",            path: "/events" },
  { name: "Memories",         path: "/memories" },
  { name: "Our Team",         path: "/meetourteam" },
  { name: "Meet Our Devs",    path: "/meetourdevelopers" },
];

const TRIP_TYPES = [
  "Himalayan Adventures",
  "Weekend Getaways",
  "Heritage Circuits",
  "Group Tours",
];

const MARQUEE_WORDS = [
  "ESCAPE", "EXPLORE", "EXPERIENCE", "MANALI", "LADAKH",
  "KASOL", "SPITI", "RISHIKESH", "KEDARNATH", "CHOPTA",
];

export default function Footer() {
  const navigate = useNavigate();

  const go = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .footer-root {
          position: relative;
          background: #06060b;
          color: #f0ece4;
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow: hidden;
        }

        /* ── noise overlay ── */
        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ── ambient glow orbs ── */
        .footer-orb-l {
          position: absolute;
          left: -160px; bottom: -80px;
          width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,77,0,0.13) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .footer-orb-r {
          position: absolute;
          right: -120px; top: -100px;
          width: 440px; height: 440px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,196,71,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* ── top border glow ── */
        .footer-topline {
          position: relative;
          z-index: 1;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,77,0,0.6) 20%,
            rgba(255,196,71,0.8) 50%,
            rgba(255,77,0,0.6) 80%,
            transparent 100%);
          box-shadow: 0 0 24px rgba(255,77,0,0.4), 0 0 60px rgba(255,77,0,0.15);
        }

        /* ── scrolling marquee ── */
        .footer-marquee-wrap {
          position: relative;
          z-index: 1;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 18px 0;
        }
        .footer-marquee {
          display: flex;
          gap: 0;
          width: max-content;
          animation: footerMarquee 22s linear infinite;
        }
        .footer-marquee:hover { animation-play-state: paused; }
        @keyframes footerMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .fmarquee-item {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          padding: 0 28px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.18);
          white-space: nowrap;
          transition: color 0.2s;
        }
        .fmarquee-item:hover { color: rgba(255,77,0,0.7); }
        .fmarquee-dot {
          color: #ff4d00;
          font-size: 8px;
          opacity: 0.6;
        }

        /* ── big wordmark ── */
        .footer-wordmark-wrap {
          position: relative;
          z-index: 1;
          padding: 48px 48px 0;
          overflow: hidden;
        }
        .footer-wordmark {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 12vw, 160px);
          line-height: 0.88;
          letter-spacing: 4px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.07);
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
        }
        .footer-wordmark span {
          -webkit-text-stroke: 1px rgba(255,77,0,0.2);
        }

        /* ── main grid ── */
        .footer-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
          gap: 48px;
          padding: 40px 48px 56px;
        }
        @media (max-width: 1023px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; padding: 32px 28px 48px; }
        }
        @media (max-width: 599px) {
          .footer-grid { grid-template-columns: 1fr; gap: 28px; padding: 28px 20px 40px; }
          .footer-wordmark-wrap { padding: 32px 20px 0; }
        }

        /* ── brand col ── */
        .footer-brand-logo-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .footer-logo-img {
          height: 40px; width: 40px;
          object-fit: contain;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          padding: 5px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .footer-brand-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 2.5px;
          color: #f0ece4;
          line-height: 1;
        }
        .footer-brand-name em {
          font-style: normal;
          background: linear-gradient(135deg, #ff4d00, #ffc447);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-brand-tagline {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #888898;
          margin-bottom: 16px;
        }
        .footer-brand-desc {
          font-size: 13px;
          line-height: 1.8;
          color: #888898;
          max-width: 280px;
        }

        /* ── pill tag ── */
        .footer-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,77,0,0.1);
          border: 1px solid rgba(255,77,0,0.2);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #ff6a1a;
          margin-top: 20px;
        }
        .footer-pill-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #ff4d00;
          box-shadow: 0 0 6px #ff4d00;
          animation: fpulse 2.5s infinite;
        }
        @keyframes fpulse {
          0%,100% { box-shadow: 0 0 4px #ff4d00; }
          50%      { box-shadow: 0 0 12px #ff4d00, 0 0 20px rgba(255,77,0,0.4); }
        }

        /* ── col headings ── */
        .footer-col-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          color: #f0ece4;
          margin-bottom: 20px;
          position: relative;
          display: inline-block;
        }
        .footer-col-title::after {
          content: '';
          position: absolute;
          bottom: -6px; left: 0;
          width: 24px; height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #ff4d00, #ffc447);
        }

        /* ── links ── */
        .footer-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
        .footer-link-btn {
          all: unset;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 500;
          color: #888898;
          cursor: pointer;
          padding: 5px 0;
          transition: color 0.2s, gap 0.2s;
          width: 100%;
        }
        .footer-link-btn:hover { color: #f0ece4; gap: 14px; }
        .footer-link-arrow {
          font-size: 10px;
          color: #ff4d00;
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
        }
        .footer-link-btn:hover .footer-link-arrow { opacity: 1; transform: translateX(2px); }

        /* ── contact ── */
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 14px;
        }
        .footer-contact-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(255,77,0,0.1);
          border: 1px solid rgba(255,77,0,0.18);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .footer-contact-text {
          font-size: 12px;
          color: #888898;
          line-height: 1.6;
        }
        .footer-contact-text a {
          color: #888898;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-contact-text a:hover { color: #ff4d00; }

        /* ── social buttons ── */
        .footer-socials {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }
        .footer-social-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #888898;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .footer-social-btn:hover {
          background: rgba(255,77,0,0.12);
          border-color: rgba(255,77,0,0.3);
          color: #ff4d00;
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(255,77,0,0.2);
        }

        /* ── divider ── */
        .footer-divider {
          position: relative;
          z-index: 1;
          margin: 0 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent);
        }
        @media (max-width: 599px) { .footer-divider { margin: 0 20px; } }

        /* ── bottom bar ── */
        .footer-bottom {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 20px 48px 28px;
        }
        @media (max-width: 599px) { .footer-bottom { padding: 16px 20px 24px; flex-direction: column; align-items: flex-start; } }
        .footer-copy {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.3px;
        }
        .footer-copy strong {
          background: linear-gradient(135deg, #ff4d00, #ffc447);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-legal {
          display: flex;
          gap: 20px;
        }
        .footer-legal a {
          font-size: 11px;
          color: rgba(255,255,255,0.18);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-legal a:hover { color: #ff4d00; }
      `}</style>

      <footer className="footer-root">
        <div className="footer-orb-l" />
        <div className="footer-orb-r" />

        {/* Glowing top border */}
        <div className="footer-topline" />

        {/* Scrolling marquee */}
        <div className="footer-marquee-wrap">
          <div className="footer-marquee">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
              <span key={i} className="fmarquee-item">
                <span className="fmarquee-dot">✦</span>{w}
              </span>
            ))}
          </div>
        </div>

        {/* Ghost wordmark */}
        <div className="footer-wordmark-wrap">
          <div className="footer-wordmark">
            CLUB&nbsp;<span>BEXLEY</span>
          </div>
        </div>

        {/* Main grid */}
        <div className="footer-grid">

          {/* Col 1 — Brand */}
          <div>
            <div className="footer-brand-logo-row">
              <img src="/assets/bglogo.png" alt="Club Bexley" className="footer-logo-img"
                onError={(e) => e.target.style.display = 'none'} />
              <span className="footer-brand-name">CLUB&nbsp;<em>BEXLEY</em></span>
            </div>
            <p className="footer-brand-tagline">Trips &amp; Travel Experiences</p>
            <p className="footer-brand-desc">
              We curate unforgettable group travel — Himalayan treks, heritage circuits, weekend escapes.
              No tourist traps. Just honest adventures at honest prices.
            </p>
            <div className="footer-pill">
              <span className="footer-pill-dot" />
              Trips Open Now
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="footer-col-title">Navigate</h4>
            <ul className="footer-links">
              {QUICK_LINKS.map((l) => (
                <li key={l.name}>
                  <button className="footer-link-btn" onClick={() => go(l.path)}>
                    <span className="footer-link-arrow">→</span>
                    {l.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Trip Types */}
          <div>
            <h4 className="footer-col-title">Trip Types</h4>
            <ul className="footer-links">
              {TRIP_TYPES.map((t) => (
                <li key={t}>
                  <button className="footer-link-btn" onClick={() => go('/events')}>
                    <span className="footer-link-arrow">→</span>
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="footer-col-title">Get In Touch</h4>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">📍</div>
              <div className="footer-contact-text">Club Bexley Travels,<br />India</div>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">✉️</div>
              <div className="footer-contact-text">
                <a href="mailto:hello@clubbexley.com">hello@clubbexley.com</a>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#888898', marginBottom: 10 }}>Follow Along</p>
              <div className="footer-socials">
                <a href="#" className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram size={15} />
                </a>
                <a href="#" className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedinIn size={15} />
                </a>
                <a href="#" className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <FaYoutube size={15} />
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="footer-divider" />

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 <strong>Club Bexley</strong>. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
}
