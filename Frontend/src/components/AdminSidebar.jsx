import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAdminEvent } from "../context/AdminEventContext";
import { FaBars, FaTimes, FaHome, FaCalendar, FaImages, FaSignOutAlt, FaHistory, FaEnvelope } from "react-icons/fa";

export default function AdminSidebar() {
  const { events, activeEvent, setActiveEvent } = useAdminEvent();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const hasSeenHint = localStorage.getItem("admin_mobile_hint_seen");
    if (!hasSeenHint && window.innerWidth < 1024) {
      setShowHint(true);
      setTimeout(() => {
        setShowHint(false);
        localStorage.setItem("admin_mobile_hint_seen", "true");
      }, 4000);
    }
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await fetch("/api/admin/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${isActive
      ? "text-white shadow-sm"
      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
    }`;

  const linkStyle = (isActive) =>
    isActive
      ? { background: "#CA0002", boxShadow: "0 2px 8px rgba(202, 0, 2, 0.2)" }
      : {};

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => {
          setIsMobileMenuOpen(!isMobileMenuOpen);
          setShowHint(false);
        }}
        className="lg:hidden fixed top-4 left-4 z-[9999] text-white p-3.5 rounded-xl transition-all active:scale-95"
        aria-label="Toggle menu"
        style={{
          background: "#CA0002",
          boxShadow: "0 4px 16px rgba(202, 0, 2, 0.3)",
          width: 52,
          height: 52,
        }}
      >
        {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Hint */}
      {showHint && (
        <div
          className="lg:hidden fixed top-20 left-4 z-[9999] text-white px-4 py-2 rounded-lg shadow-xl animate-bounce max-w-xs text-sm font-medium"
          style={{ background: "#CA0002" }}
        >
          👈 Tap here for navigation
        </div>
      )}

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[45] backdrop-blur-sm"
          style={{ background: "rgba(0, 0, 0, 0.3)" }}
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-[50]
          w-72 flex flex-col overflow-hidden
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          background: "#ffffff",
          borderRight: "1px solid #eee",
          boxShadow: "2px 0 20px rgba(0, 0, 0, 0.04)",
        }}
      >
        {/* Header */}
        <div className="px-6 py-5" style={{ borderBottom: "1px solid #f0f0f0" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-lg overflow-hidden bg-white"
                style={{
                  width: 38,
                  height: 38,
                  boxShadow: "0 2px 8px rgba(202, 0, 2, 0.2)",
                }}
              >
                <img
                  src="/assets/ti_logo.png"
                  alt="ARC Logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800 tracking-tight">
                  ARC Admin
                </h2>
                <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#CA0002" }}>
                  Dashboard
                </p>
              </div>
            </div>

            <button
              onClick={closeMobileMenu}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        {/* Event Selector */}
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #f0f0f0" }}>
          <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1.5 block">
            Event Scope
          </label>
          <select
            value={activeEvent?._id || ""}
            onChange={(e) => {
              setActiveEvent(events.find((ev) => ev._id === e.target.value));
              closeMobileMenu();
            }}
            className="w-full py-2.5 px-3 rounded-lg text-sm text-gray-700 appearance-none cursor-pointer outline-none transition-all"
            style={{
              background: "#fafafa",
              border: "1.5px solid #e8e8e8",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#CA0002";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(202, 0, 2, 0.06)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e8e8e8";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {events.length === 0 && <option>No Events</option>}
            {events.map((ev) => (
              <option key={ev._id} value={ev._id}>
                {ev.name}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto" style={{ minHeight: 0 }}>
          {[
            { to: "/admin/dashboard", icon: FaHome, label: "Dashboard" },
            { to: "/admin/events", icon: FaCalendar, label: "Events" },
            { to: "/admin/memories", icon: FaImages, label: "Photos" },
            { to: "/admin/emails", icon: FaEnvelope, label: "Email Tracking" },
            { to: "/admin/logs", icon: FaHistory, label: "Audit Logs" },
          ].map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={linkClass}
              onClick={closeMobileMenu}
              style={({ isActive }) => linkStyle(isActive)}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="mt-auto px-4 pb-4 pt-2" style={{ borderTop: "1px solid #f0f0f0" }}>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-3 w-full rounded-lg cursor-pointer transition-all duration-200 text-sm font-medium"
            style={{
              color: "#CA0002",
              background: "rgba(202, 0, 2, 0.04)",
              border: "1px solid rgba(202, 0, 2, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(202, 0, 2, 0.08)";
              e.currentTarget.style.borderColor = "rgba(202, 0, 2, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(202, 0, 2, 0.04)";
              e.currentTarget.style.borderColor = "rgba(202, 0, 2, 0.1)";
            }}
          >
            <FaSignOutAlt size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
