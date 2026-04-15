import * as React from "react";
import { Link, useLocation } from "react-router-dom";

const basePages = [
  { name: "Home",     path: "/" },
  { name: "Trips",    path: "/events" },
  { name: "Memories", path: "/memories" },
];

function getAuthUser() {
  try {
    const raw = localStorage.getItem("app_auth");
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed?.user || null;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled,   setScrolled]   = React.useState(false);
  const [user,       setUser]       = React.useState(() => getAuthUser());
  const scrollYRef = React.useRef(0);

  /* ── scroll shadow ── */
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── auth sync ── */
  React.useEffect(() => {
    const onStorage = (e) => { if (e.key === "app_auth") setUser(getAuthUser()); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  React.useEffect(() => { setUser(getAuthUser()); }, [location.pathname]);

  /* ── scroll lock for mobile menu ── */
  React.useEffect(() => {
    if (mobileOpen) {
      scrollYRef.current = window.scrollY || 0;
      document.body.style.position   = "fixed";
      document.body.style.top        = `-${scrollYRef.current}px`;
      document.body.style.left       = "0";
      document.body.style.right      = "0";
      document.body.style.overflow   = "hidden";
      document.body.style.width      = "100%";
    } else {
      const saved = scrollYRef.current;
      document.body.style.position   = "";
      document.body.style.top        = "";
      document.body.style.left       = "";
      document.body.style.right      = "";
      document.body.style.overflow   = "";
      document.body.style.width      = "";
      window.scrollTo(0, saved);
    }
    return () => {
      document.body.style.position   = "";
      document.body.style.top        = "";
      document.body.style.left       = "";
      document.body.style.right      = "";
      document.body.style.overflow   = "";
      document.body.style.width      = "";
    };
  }, [mobileOpen]);

  const firstName = user?.name ? user.name.split(" ")[0] : null;

  const logout = () => {
    localStorage.removeItem("app_auth");
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1200;
          height: 72px;
          display: flex;
          align-items: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          background: rgba(6,6,11,0);
          border-bottom: 1px solid transparent;
        }
        .nav-root.scrolled {
          background: rgba(6,6,11,0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 4px 40px rgba(0,0,0,0.5);
        }

        .nav-inner {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── LOGO ── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo-img {
          height: 36px;
          width: 36px;
          object-fit: contain;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          padding: 4px;
        }
        .nav-logo-wordmark {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          color: #f0ece4;
          line-height: 1;
        }
        .nav-logo-wordmark span {
          background: linear-gradient(135deg, #ff4d00, #ffc447);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── DESKTOP LINKS ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
        }
        @media (max-width: 767px) { .nav-links { display: none; } }

        .nav-link {
          position: relative;
          text-decoration: none;
          color: #888898;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 8px 14px;
          border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .nav-link:hover {
          color: #f0ece4;
          background: rgba(255,255,255,0.05);
        }
        .nav-link.active {
          color: #ff4d00;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #ff4d00, #ffc447);
        }

        /* ── RIGHT SIDE ── */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        @media (max-width: 767px) { .nav-right .nav-user-desktop { display: none; } }

        .nav-user-desktop {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-greeting {
          font-size: 12px;
          font-weight: 600;
          color: #888898;
          letter-spacing: 0.3px;
        }
        .nav-greeting strong {
          color: #f0ece4;
          margin-left: 3px;
        }
        .nav-logout-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          color: #888898;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-logout-btn:hover {
          color: #ff4d00;
          border-color: rgba(255,77,0,0.4);
          background: rgba(255,77,0,0.06);
        }

        .nav-login-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #ff5200, #ff7033);
          color: #fff;
          text-decoration: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 9px 20px;
          border-radius: 9px;
          transition: all 0.25s cubic-bezier(0.23,1,0.32,1);
          box-shadow: 0 4px 18px rgba(255,77,0,0.3);
        }
        .nav-login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(255,77,0,0.45);
        }

        /* ── MOBILE BURGER ── */
        .nav-burger {
          display: none;
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9px;
          padding: 8px 10px;
          cursor: pointer;
          flex-direction: column;
          gap: 4px;
          transition: border-color 0.2s ease;
        }
        .nav-burger:hover { border-color: rgba(255,77,0,0.4); }
        @media (max-width: 767px) { .nav-burger { display: flex; } }

        .burger-bar {
          width: 20px; height: 2px;
          border-radius: 2px;
          background: #888898;
          transition: all 0.28s cubic-bezier(0.23,1,0.32,1);
          transform-origin: center;
        }
        .nav-burger.open .burger-bar:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
          background: #ff4d00;
        }
        .nav-burger.open .burger-bar:nth-child(2) {
          opacity: 0; transform: scaleX(0);
        }
        .nav-burger.open .burger-bar:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
          background: #ff4d00;
        }

        /* ── MOBILE DRAWER ── */
        .nav-drawer {
          position: fixed;
          inset: 0;
          z-index: 1100;
          background: rgba(6,6,11,0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          padding: 96px 32px 40px;
          gap: 4px;
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: transform 320ms cubic-bezier(0.2,0.9,0.2,1), opacity 240ms ease;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nav-drawer.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .nav-drawer-link {
          text-decoration: none;
          color: #888898;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-drawer-link:hover, .nav-drawer-link.active { color: #ff4d00; }
        .nav-drawer-link .arrow { opacity: 0; transition: opacity 0.2s, transform 0.2s; }
        .nav-drawer-link:hover .arrow { opacity: 1; transform: translateX(4px); }
        .nav-drawer-link.active .arrow { opacity: 1; color: #ff4d00; }

        .nav-drawer-bottom {
          margin-top: auto;
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .nav-drawer-greeting {
          font-size: 13px;
          color: #888898;
          padding: 0 0 4px;
        }
        .nav-drawer-greeting strong { color: #f0ece4; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">

          {/* Logo */}
          <Link to="/" className="nav-logo">
            <img src="/assets/bglogo.png" alt="Club Bexley" className="nav-logo-img" />
            <span className="nav-logo-wordmark">CLUB <span>BEXLEY</span></span>
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-links">
            {basePages.map((p) => (
              <li key={p.name}>
                <Link
                  to={p.path}
                  className={`nav-link${location.pathname === p.path ? " active" : ""}`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="nav-right">
            <div className="nav-user-desktop">
              {user ? (
                <>
                  <span className="nav-greeting">
                    Hey,<strong>{firstName}</strong>
                  </span>
                  <button className="nav-logout-btn" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="nav-login-btn">
                  Login
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              )}
            </div>

            {/* Burger */}
            <button
              className={`nav-burger${mobileOpen ? " open" : ""}`}
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className="burger-bar" />
              <span className="burger-bar" />
              <span className="burger-bar" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`nav-drawer${mobileOpen ? " open" : ""}`} aria-hidden={!mobileOpen}>
        {basePages.map((p) => (
          <Link
            key={p.name}
            to={p.path}
            className={`nav-drawer-link${location.pathname === p.path ? " active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            {p.name}
            <span className="arrow">→</span>
          </Link>
        ))}

        <div className="nav-drawer-bottom">
          {user ? (
            <>
              <p className="nav-drawer-greeting">Logged in as <strong>{firstName}</strong></p>
              <button className="nav-logout-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-login-btn" onClick={() => setMobileOpen(false)}>
              Login
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
