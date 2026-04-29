import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAdminEvent } from "../context/AdminEventContext";
import { CalendarDays, Images, LogOut, Menu, X, ChevronDown, Zap } from "lucide-react";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --sb-bg: #08080f;
    --sb-surface: #0d0d18;
    --sb-border: rgba(255,255,255,0.06);
    --sb-border-hi: rgba(255,255,255,0.1);
    --sb-accent: #ff4d00;
    --sb-accent2: #ffc447;
    --sb-text: #f0ece4;
    --sb-muted: #7a7a8c;
    --sb-dim: #383850;
    --sb-font-d: 'Bebas Neue', sans-serif;
    --sb-font: 'Plus Jakarta Sans', sans-serif;
  }

  /* ─── SHELL ─── */
  .asb {
    width: 260px;
    flex-shrink: 0;
    background: var(--sb-bg);
    border-right: 1px solid var(--sb-border);
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky;
    top: 0;
    font-family: var(--sb-font);
    overflow: hidden;
    z-index: 50;
  }

  /* top accent line */
  .asb-topline {
    height: 2px;
    background: linear-gradient(90deg, var(--sb-accent) 0%, var(--sb-accent2) 50%, transparent 100%);
    flex-shrink: 0;
  }

  /* all direct children above z:0 so they appear over noise pseudo */
  .asb > * { position: relative; z-index: 1; }

  /* ─── HEADER ─── */
  .asb-header {
    padding: 22px 20px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .asb-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .asb-logo-img-wrap {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(255,77,0,0.1);
    border: 1px solid rgba(255,77,0,0.2);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; overflow: hidden;
  }

  .asb-logo-img {
    width: 28px; height: 28px;
    object-fit: contain;
  }

  .asb-logo-text {
    font-family: var(--sb-font-d);
    font-size: 17px;
    letter-spacing: 2px;
    color: var(--sb-text);
    line-height: 1;
  }

  .asb-logo-text em {
    font-style: normal;
    background: linear-gradient(135deg, #ff4d00, #ffc447);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .asb-close-btn {
    display: none;
    background: none;
    border: 1px solid var(--sb-border);
    color: var(--sb-muted);
    border-radius: 8px;
    padding: 6px;
    cursor: pointer;
    transition: all 0.2s;
    align-items: center;
  }
  .asb-close-btn:hover { color: var(--sb-accent); border-color: rgba(255,77,0,0.3); }
  @media (max-width: 1023px) { .asb-close-btn { display: flex; } }

  /* ─── DIVIDER ─── */
  .asb-divider {
    height: 1px;
    margin: 0 20px;
    background: var(--sb-border);
    flex-shrink: 0;
  }

  /* ─── EVENT SELECTOR ─── */
  .asb-event-wrap {
    padding: 16px 16px 14px;
    flex-shrink: 0;
  }

  .asb-event-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--sb-dim);
    margin-bottom: 9px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .asb-select-wrap { position: relative; }

  .asb-select {
    width: 100%;
    background: var(--sb-surface);
    border: 1px solid var(--sb-border-hi);
    border-radius: 11px;
    padding: 10px 38px 10px 13px;
    color: var(--sb-text);
    font-family: var(--sb-font);
    font-size: 13px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .asb-select:focus {
    border-color: rgba(255,77,0,0.5);
    box-shadow: 0 0 0 3px rgba(255,77,0,0.08);
  }

  .asb-select option { background: #0d0d18; color: #f0ece4; }

  .asb-select-chevron {
    position: absolute;
    right: 11px; top: 50%;
    transform: translateY(-50%);
    color: var(--sb-dim);
    pointer-events: none;
    transition: transform 0.2s;
  }

  /* ─── NAV ─── */
  .asb-nav {
    flex: 1;
    padding: 8px 12px 12px;
    overflow-y: auto;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .asb-nav::-webkit-scrollbar { display: none; }

  .asb-nav-section {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--sb-dim);
    padding: 12px 8px 6px;
  }

  .asb-link {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 11px 12px;
    border-radius: 11px;
    text-decoration: none;
    color: var(--sb-muted);
    font-size: 13px;
    font-weight: 600;
    transition: all 0.18s ease;
    border: 1px solid transparent;
    position: relative;
    overflow: hidden;
  }

  .asb-link:hover {
    color: var(--sb-text);
    background: rgba(255,255,255,0.04);
    border-color: var(--sb-border);
  }

  .asb-link.active {
    color: var(--sb-text);
    background: rgba(255,77,0,0.08);
    border-color: rgba(255,77,0,0.2);
  }

  /* left accent bar on active */
  .asb-link.active::before {
    content: '';
    position: absolute;
    left: 0; top: 25%; bottom: 25%;
    width: 2.5px;
    border-radius: 0 2px 2px 0;
    background: var(--sb-accent);
    box-shadow: 0 0 8px rgba(255,77,0,0.6);
  }

  .asb-link-icon {
    width: 34px; height: 34px;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    background: rgba(255,255,255,0.05);
    border: 1px solid transparent;
    transition: all 0.18s;
  }

  .asb-link.active .asb-link-icon {
    background: rgba(255,77,0,0.12);
    border-color: rgba(255,77,0,0.2);
    color: var(--sb-accent);
  }

  .asb-link:hover .asb-link-icon {
    background: rgba(255,255,255,0.08);
  }

  /* ─── ACTIVE EVENT CHIP ─── */
  .asb-event-chip {
    margin: 4px 12px 12px;
    padding: 10px 14px;
    border-radius: 12px;
    background: rgba(255,77,0,0.06);
    border: 1px solid rgba(255,77,0,0.15);
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .asb-event-chip-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--sb-accent);
    box-shadow: 0 0 8px rgba(255,77,0,0.6);
    flex-shrink: 0;
    animation: chipPulse 2.5s ease-in-out infinite;
  }
  @keyframes chipPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  .asb-event-chip-text {
    flex: 1; min-width: 0;
  }

  .asb-event-chip-label {
    font-size: 9px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--sb-accent); display: block; margin-bottom: 2px;
  }

  .asb-event-chip-name {
    font-size: 12px; font-weight: 700; color: var(--sb-text);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;
  }

  /* ─── BOTTOM ─── */
  .asb-bottom {
    padding: 12px;
    border-top: 1px solid var(--sb-border);
    flex-shrink: 0;
  }

  .asb-logout {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 14px;
    border-radius: 11px;
    width: 100%;
    background: none;
    border: 1px solid var(--sb-border);
    color: var(--sb-muted);
    font-family: var(--sb-font);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .asb-logout:hover {
    color: #f87171;
    border-color: rgba(248,113,113,0.3);
    background: rgba(248,113,113,0.06);
  }

  .asb-logout-icon {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.04); flex-shrink: 0; transition: all 0.2s;
  }

  .asb-logout:hover .asb-logout-icon {
    background: rgba(248,113,113,0.12);
    color: #f87171;
  }

  /* ─── MOBILE BURGER ─── */
  .asb-burger {
    display: none;
    position: fixed;
    top: 16px; left: 16px;
    z-index: 9999;
    background: linear-gradient(135deg, #ff5200, #ff7033);
    border: none; border-radius: 10px;
    width: 42px; height: 42px;
    align-items: center; justify-content: center;
    color: #fff; cursor: pointer;
    box-shadow: 0 4px 16px rgba(255,77,0,0.4);
    transition: all 0.2s ease;
  }
  .asb-burger:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,77,0,0.5); }

  @media (max-width: 1023px) {
    .asb-burger { display: flex; }

    .asb {
      position: fixed;
      inset-y: 0; left: 0;
      transform: translateX(-100%);
      transition: transform 300ms cubic-bezier(0.25, 0.9, 0.25, 1);
      box-shadow: none;
      z-index: 200;
    }

    .asb.open {
      transform: translateX(0);
      box-shadow: 12px 0 60px rgba(0,0,0,0.8);
    }
  }

  /* ─── MOBILE OVERLAY ─── */
  .asb-overlay {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(4px);
    z-index: 199;
  }
  @media (max-width: 1023px) { .asb-overlay { display: block; } }
`;

const NAV = [
  { to: "/admin/events", icon: CalendarDays, label: "Events" },
  { to: "/admin/memories", icon: Images,     label: "Photos" },
];

export default function AdminSidebar() {
  const { events, activeEvent, setActiveEvent } = useAdminEvent();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await fetch("/api/admin/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
    } catch {}
    finally {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    }
  };

  return (
    <>
      <style>{S}</style>

      {/* Mobile burger */}
      <button className="asb-burger" onClick={() => setOpen(s => !s)} aria-label="Toggle menu">
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {open && <div className="asb-overlay" onClick={close} />}

      <aside className={`asb${open ? " open" : ""}`}>

        {/* Top accent line */}
        <div className="asb-topline" />

        {/* Header */}
        <div className="asb-header">
          <a href="/" className="asb-logo">
            <div className="asb-logo-img-wrap">
              <img
                src="/assets/bglogo.png"
                alt="Club Bexley"
                className="asb-logo-img"
                onError={e => { e.target.style.display = "none"; }}
              />
            </div>
            <div>
              <div className="asb-logo-text">CLUB <em>BEXLEY</em></div>
            </div>
          </a>
          <button className="asb-close-btn" onClick={close} aria-label="Close menu">
            <X size={15} />
          </button>
        </div>

        <div className="asb-divider" />

        {/* Event selector */}
        <div className="asb-event-wrap">
          <span className="asb-event-label">
            <Zap size={9} /> Active Event
          </span>
          <div className="asb-select-wrap">
            <select
              className="asb-select"
              value={activeEvent?._id || ""}
              onChange={e => {
                setActiveEvent(events.find(ev => ev._id === e.target.value));
                close();
              }}
            >
              {events.length === 0 && <option value="">No Events</option>}
              {events.map(ev => (
                <option key={ev._id} value={ev._id}>{ev.name}</option>
              ))}
            </select>
            <ChevronDown size={13} className="asb-select-chevron" />
          </div>
        </div>

        <div className="asb-divider" />

        {/* Nav links */}
        <nav className="asb-nav">
          <div className="asb-nav-section">Manage</div>
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={close}
              className={({ isActive }) => `asb-link${isActive ? " active" : ""}`}
            >
              <span className="asb-link-icon">
                <Icon size={15} />
              </span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Active event chip */}
        {activeEvent && (
          <div className="asb-event-chip">
            <div className="asb-event-chip-dot" />
            <div className="asb-event-chip-text">
              <span className="asb-event-chip-label">Viewing</span>
              <span className="asb-event-chip-name">{activeEvent.name}</span>
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="asb-bottom">
          <button className="asb-logout" onClick={handleLogout}>
            <span className="asb-logout-icon">
              <LogOut size={14} />
            </span>
            Sign Out
          </button>
        </div>

      </aside>
    </>
  );
}
