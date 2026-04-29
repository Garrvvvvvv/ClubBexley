import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../../lib/api";

const TAB_DAY   = "itinerary";
const TAB_DATES = "dates";
const TAB_INC   = "inclusions";

function cld(url, t = []) {
  if (!url || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/${t.filter(Boolean).join(",")}/`);
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

  :root {
    --bg: #06060b;
    --bg-card: #0d0d16;
    --bg-elevated: #121220;
    --accent: #ff4d00;
    --accent2: #ffc447;
    --text: #f0ece4;
    --text-muted: #888898;
    --text-dim: #3a3a50;
    --border: rgba(255,255,255,0.07);
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;
  }

  .td-page {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── HERO ── */
  .td-hero {
    position: relative;
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    margin-top: -90px;
  }

  .td-hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: transform 0.1s linear;
    will-change: transform;
  }

  .td-hero-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to top, rgba(6,6,11,1) 0%, rgba(6,6,11,0.7) 40%, rgba(6,6,11,0.3) 70%, transparent 100%),
      linear-gradient(to right, rgba(6,6,11,0.6) 0%, transparent 60%);
  }

  .td-hero-noise {
    position: absolute; inset: 0; z-index: 2;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  .td-hero-content {
    position: relative;
    z-index: 10;
    padding: 90px 72px 56px;
    max-width: 1300px;
    width: 100%;
  }

  @media (max-width: 768px) {
    .td-hero-content { padding: 90px 24px 40px; }
  }

  .td-hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 16px;
    animation: tdFadeUp 0.7s 0.1s both;
  }

  .td-hero-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
    animation: tdDotPulse 2.5s infinite;
  }

  @keyframes tdDotPulse {
    0%,100% { box-shadow: 0 0 6px var(--accent); }
    50%      { box-shadow: 0 0 18px var(--accent), 0 0 30px rgba(255,77,0,0.4); }
  }

  .td-hero-title {
    font-family: var(--font-display);
    font-size: clamp(52px, 8vw, 120px);
    line-height: 0.88;
    letter-spacing: 1.5px;
    color: var(--text);
    margin: 0 0 28px;
    animation: tdFadeUp 0.7s 0.25s both;
  }

  .td-hero-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    animation: tdFadeUp 0.7s 0.4s both;
  }

  .td-hero-stat {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .td-hero-stat-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .td-hero-stat-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 2px;
  }

  .td-hero-stat-value {
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
  }

  .td-hero-stat-value.accent { color: var(--accent2); font-size: 17px; }

  /* ── STICKY BAR ── */
  .td-sticky {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(6,6,11,0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 14px 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    box-shadow: 0 4px 40px rgba(0,0,0,0.5);
  }

  @media (max-width: 768px) {
    .td-sticky { padding: 12px 24px; }
  }

  .td-sticky-name {
    font-family: var(--font-display);
    font-size: 20px;
    letter-spacing: 1px;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .td-sticky-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #ff5200, #ff7033);
    color: #fff;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 11px 24px;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    box-shadow: 0 6px 20px rgba(255,77,0,0.3);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .td-sticky-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(255,77,0,0.5);
  }

  /* ── MAIN GRID ── */
  .td-main {
    max-width: 1300px;
    margin: 0 auto;
    padding: 56px 72px 100px;
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 40px;
    align-items: start;
  }

  @media (max-width: 1100px) {
    .td-main { grid-template-columns: 1fr; padding: 40px 40px 80px; }
  }

  @media (max-width: 768px) {
    .td-main { padding: 32px 24px 64px; gap: 32px; }
  }

  /* ── DESC ── */
  .td-description {
    font-size: 16px;
    line-height: 1.85;
    color: var(--text-muted);
    margin-bottom: 40px;
    max-width: 660px;
  }

  /* ── TABS ── */
  .td-tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid var(--border);
    margin-bottom: 40px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .td-tab-btn {
    all: unset;
    cursor: pointer;
    padding: 14px 20px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-dim);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: color 0.2s, border-color 0.2s;
    white-space: nowrap;
  }

  .td-tab-btn:hover { color: var(--text-muted); }
  .td-tab-btn.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  /* ── TIMELINE (itinerary) ── */
  .td-timeline {
    position: relative;
    padding-left: 44px;
  }

  .td-timeline-line {
    position: absolute;
    left: 14px; top: 6px; bottom: 6px;
    width: 1px;
    background: linear-gradient(to bottom, var(--accent), rgba(255,77,0,0.05));
  }

  .td-timeline-item {
    position: relative;
    margin-bottom: 24px;
  }

  .td-timeline-dot {
    position: absolute;
    left: -44px; top: 12px;
    width: 28px; height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff5200, #ff7033);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display);
    font-size: 13px;
    letter-spacing: 0.5px;
    color: #fff;
    box-shadow: 0 0 0 4px rgba(255,77,0,0.12), 0 4px 12px rgba(255,77,0,0.3);
    flex-shrink: 0;
  }

  .td-timeline-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px 24px;
    transition: border-color 0.25s, box-shadow 0.25s;
  }

  .td-timeline-card:hover {
    border-color: rgba(255,77,0,0.2);
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  }

  .td-timeline-day-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 6px;
  }

  .td-timeline-title {
    font-family: var(--font-display);
    font-size: 22px;
    letter-spacing: 0.5px;
    color: var(--text);
    margin: 0 0 8px;
  }

  .td-timeline-desc {
    font-size: 13.5px;
    color: var(--text-muted);
    line-height: 1.75;
    margin: 0;
  }

  /* ── PRICING TABLE ── */
  .td-table-wrap {
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--border);
    margin-bottom: 32px;
  }

  .td-table {
    width: 100%;
    border-collapse: collapse;
  }

  .td-table thead tr {
    background: linear-gradient(135deg, #ff5200, #ff7033);
  }

  .td-table th {
    padding: 14px 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #fff;
  }

  .td-table th:last-child { text-align: right; }

  .td-table td {
    padding: 14px 20px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border);
  }

  .td-table td:last-child {
    text-align: right;
    font-size: 16px;
    font-weight: 800;
    color: var(--accent2);
  }

  .td-table tr:last-child td { border-bottom: none; }
  .td-table tbody tr:hover { background: rgba(255,255,255,0.02); }

  /* ── DATE CHIPS ── */
  .td-date-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .td-date-chip {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 20px;
    min-width: 200px;
    transition: border-color 0.2s;
  }

  .td-date-chip:hover { border-color: rgba(255,77,0,0.25); }

  .td-date-chip-dates {
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 4px;
  }

  .td-date-chip-note {
    font-size: 12px;
    color: var(--accent);
  }

  /* ── INCLUSIONS / EXCLUSIONS ── */
  .td-inc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  @media (max-width: 600px) { .td-inc-grid { grid-template-columns: 1fr; } }

  .td-inc-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .td-inc-list {
    list-style: none;
    margin: 0; padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .td-inc-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    font-size: 13.5px;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .td-inc-item:last-child { border-bottom: none; }

  .td-inc-check { color: #34d399; flex-shrink: 0; font-size: 14px; margin-top: 1px; }
  .td-inc-cross { color: var(--accent); flex-shrink: 0; font-size: 14px; margin-top: 1px; }

  /* ── INFO BLOCKS (notes, cancellation, carry) ── */
  .td-info-block {
    margin-top: 28px;
    border-radius: 16px;
    padding: 22px 24px;
    border: 1px solid;
  }

  .td-info-block.notes {
    background: rgba(255,196,71,0.04);
    border-color: rgba(255,196,71,0.15);
  }

  .td-info-block.cancel {
    background: rgba(255,77,0,0.04);
    border-color: rgba(255,77,0,0.15);
  }

  .td-info-block.carry {
    background: rgba(52,211,153,0.04);
    border-color: rgba(52,211,153,0.15);
  }

  .td-info-block-title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .td-info-block.notes .td-info-block-title  { color: var(--accent2); }
  .td-info-block.cancel .td-info-block-title { color: var(--accent); }
  .td-info-block.carry .td-info-block-title  { color: #34d399; }

  .td-info-block ul {
    margin: 0;
    padding: 0 0 0 18px;
  }

  .td-info-block li {
    font-size: 13.5px;
    line-height: 1.75;
    color: var(--text-muted);
    margin-bottom: 4px;
  }

  .td-info-block p {
    margin: 0;
    font-size: 13.5px;
    color: var(--text-muted);
    line-height: 1.85;
    white-space: pre-line;
  }

  /* ── SECTION LABEL ── */
  .td-section-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 20px;
    display: block;
  }

  /* ── BOOKING CARD ── */
  .td-book-card {
    position: sticky;
    top: 84px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 24px 80px rgba(0,0,0,0.5);
  }

  .td-book-card-header {
    background: linear-gradient(135deg, #ff5200, #ff7033);
    padding: 24px 28px;
    position: relative;
    overflow: hidden;
  }

  .td-book-card-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.04;
    pointer-events: none;
  }

  .td-book-card-from {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.65);
    margin-bottom: 6px;
    position: relative;
  }

  .td-book-card-price {
    font-family: var(--font-display);
    font-size: 62px;
    line-height: 1;
    letter-spacing: -1px;
    color: #fff;
    position: relative;
  }

  .td-book-card-price-sub {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    opacity: 0.75;
    margin-left: 4px;
    vertical-align: bottom;
    line-height: 2.5;
  }

  .td-book-card-body { padding: 24px 28px; }

  .td-book-info-row {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
  }

  .td-book-info-row:last-of-type { border-bottom: none; margin-bottom: 20px; }

  .td-book-info-icon {
    font-size: 16px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .td-book-info-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 2px;
  }

  .td-book-info-value {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
  }

  .td-book-cta {
    display: block;
    text-align: center;
    text-decoration: none;
    background: linear-gradient(135deg, #ff5200, #ff7033);
    color: #fff;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 16px;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    box-shadow: 0 8px 28px rgba(255,77,0,0.35);
    margin-bottom: 16px;
  }

  .td-book-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(255,77,0,0.55);
  }

  .td-book-cta-disabled {
    display: block;
    text-align: center;
    padding: 16px;
    border-radius: 12px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    color: var(--text-dim);
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .td-trust-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .td-trust-badge {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: var(--text-dim);
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    padding: 5px 12px;
    border-radius: 100px;
  }

  /* ── QUICK LINKS ── */
  .td-quick-links {
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }

  .td-quick-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: rgba(255,255,255,0.03);
    color: var(--text-muted);
    text-decoration: none;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.2s ease;
  }

  .td-quick-link:hover {
    color: var(--accent);
    border-color: rgba(255,77,0,0.3);
    background: rgba(255,77,0,0.06);
  }

  /* ── EMPTY / LOADER / 404 ── */
  .td-empty {
    color: var(--text-dim);
    font-size: 14px;
    font-style: italic;
    padding: 20px 0;
  }

  .td-loader {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-family: var(--font-body);
  }

  .td-loader-ring {
    width: 44px; height: 44px;
    border-radius: 50%;
    border: 2px solid rgba(255,77,0,0.15);
    border-top-color: var(--accent);
    animation: tdSpin 0.8s linear infinite;
  }

  .td-loader-text {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--text-dim);
    animation: tdPulse 2s ease-in-out infinite;
  }

  @keyframes tdSpin { to { transform: rotate(360deg); } }
  @keyframes tdPulse { 0%,100%{opacity:.3} 50%{opacity:1} }

  .td-notfound {
    min-height: 80vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-family: var(--font-body);
    text-align: center;
  }

  .td-notfound-icon {
    font-family: var(--font-display);
    font-size: 120px;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.08);
  }

  .td-notfound h2 {
    font-family: var(--font-display);
    font-size: 48px;
    color: var(--text-dim);
    margin: 0;
    letter-spacing: 1px;
  }

  .td-notfound p {
    font-size: 14px;
    color: var(--text-dim);
    margin: 0;
  }

  .td-notfound-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #ff5200, #ff7033);
    color: #fff;
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 13px 28px;
    border-radius: 11px;
    transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    box-shadow: 0 8px 24px rgba(255,77,0,0.3);
  }

  .td-notfound-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(255,77,0,0.5);
  }

  @keyframes tdFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export default function TripDetail() {
  const { eventSlug } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [activeTab, setActiveTab] = useState(TAB_DAY);

  useEffect(() => {
    api
      .get(`/api/events/${eventSlug}`)
      .then((r) => { setTrip(r.data); setLoading(false); })
      .catch(() => { setError("Trip not found."); setLoading(false); });
  }, [eventSlug]);

  if (loading) return (
    <>
      <style>{STYLES}</style>
      <div className="td-loader">
        <div className="td-loader-ring" />
        <p className="td-loader-text">Loading trip…</p>
      </div>
    </>
  );

  if (error || !trip) return (
    <>
      <style>{STYLES}</style>
      <div className="td-notfound">
        <div className="td-notfound-icon">404</div>
        <h2>Trip Not Found</h2>
        <p>We couldn't find that route. Maybe it's still being scouted.</p>
        <button className="td-notfound-btn" onClick={() => navigate("/events")}>
          ← Back to Trips
        </button>
      </div>
    </>
  );

  const lowestPrice = trip.pricingTiers?.length
    ? Math.min(...trip.pricingTiers.map((t) => t.pricePerPerson))
    : trip.startingPrice;

  const heroBg = trip.posterUrl
    ? cld(trip.posterUrl, ["f_auto", "q_auto", "w_1800", "c_fill", "g_auto"])
    : null;

  return (
    <>
      <style>{STYLES}</style>

      <div className="td-page">

        {/* ── HERO ── */}
        <section className="td-hero">
          {heroBg
            ? <div className="td-hero-bg" style={{ backgroundImage: `url(${heroBg})` }} />
            : <div className="td-hero-bg" style={{ background: "linear-gradient(135deg, #0f0a1a 0%, #1a0a08 60%, #06060b 100%)" }} />
          }
          <div className="td-hero-overlay" />
          <div className="td-hero-noise" />

          <div className="td-hero-content">
            <div className="td-hero-eyebrow">
              <span className="td-hero-eyebrow-dot" />
              <span>{trip.type === "TRIP" ? "Adventure Trip" : "Club Event"}</span>
              {trip.status === "LIVE" && (
                <span style={{
                  fontSize: 9, padding: "3px 10px", borderRadius: "100px",
                  background: "rgba(255,77,0,.15)", color: "#ff4d00",
                  border: "1px solid rgba(255,77,0,.35)", letterSpacing: "1.5px"
                }}>
                  ● Live
                </span>
              )}
            </div>

            <h1 className="td-hero-title">{trip.name}</h1>

            <div className="td-hero-stats">
              {trip.duration && (
                <div className="td-hero-stat">
                  <div className="td-hero-stat-icon">🗓️</div>
                  <div>
                    <div className="td-hero-stat-label">Duration</div>
                    <div className="td-hero-stat-value">{trip.duration}</div>
                  </div>
                </div>
              )}
              {lowestPrice > 0 && (
                <div className="td-hero-stat">
                  <div className="td-hero-stat-icon">💰</div>
                  <div>
                    <div className="td-hero-stat-label">Starting at</div>
                    <div className="td-hero-stat-value accent">₹{lowestPrice.toLocaleString("en-IN")}/-</div>
                  </div>
                </div>
              )}
              {trip.pickupDrop && (
                <div className="td-hero-stat">
                  <div className="td-hero-stat-icon">📍</div>
                  <div>
                    <div className="td-hero-stat-label">Pickup &amp; Drop</div>
                    <div className="td-hero-stat-value">{trip.pickupDrop}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── STICKY BAR ── */}
        {trip.googleFormLink && (
          <div className="td-sticky">
            <span className="td-sticky-name">{trip.name}</span>
            <a href={trip.googleFormLink} target="_blank" rel="noopener noreferrer" className="td-sticky-btn">
              Book Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        )}

        {/* ── MAIN CONTENT ── */}
        <div className="td-main">

          {/* LEFT COLUMN */}
          <div>
            {trip.description && (
              <p className="td-description">{trip.description}</p>
            )}

            {/* TABS */}
            <div className="td-tabs">
              {[
                { id: TAB_DAY,   label: "Day-Wise Plan" },
                { id: TAB_DATES, label: "Dates & Costing" },
                { id: TAB_INC,   label: "What's Included" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`td-tab-btn${activeTab === tab.id ? " active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── TAB: DAY WISE PLAN ── */}
            {activeTab === TAB_DAY && (
              <div>
                {trip.itinerary?.length > 0 ? (
                  <div className="td-timeline">
                    <div className="td-timeline-line" />
                    {trip.itinerary.map((day, i) => (
                      <div key={i} className="td-timeline-item">
                        <div className="td-timeline-dot">{day.dayNumber}</div>
                        <div className="td-timeline-card">
                          <div className="td-timeline-day-label">Day {day.dayNumber}</div>
                          <h3 className="td-timeline-title">{day.title}</h3>
                          {day.description && (
                            <p className="td-timeline-desc">{day.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="td-empty">Itinerary coming soon — check back shortly.</p>
                )}
              </div>
            )}

            {/* ── TAB: DATES & COSTING ── */}
            {activeTab === TAB_DATES && (
              <div>
                {trip.pricingTiers?.length > 0 && (
                  <div style={{ marginBottom: 36 }}>
                    <span className="td-section-label">Package Pricing</span>
                    <div className="td-table-wrap">
                      <table className="td-table">
                        <thead>
                          <tr>
                            <th style={{ textAlign: "left" }}>Room Sharing</th>
                            <th>Cost per Person</th>
                          </tr>
                        </thead>
                        <tbody>
                          {trip.pricingTiers.map((tier, i) => (
                            <tr key={i}>
                              <td>{tier.roomType}</td>
                              <td>₹{tier.pricePerPerson.toLocaleString("en-IN")}/-</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {trip.tripDates?.length > 0 && (
                  <div>
                    <span className="td-section-label">Available Dates</span>
                    <div className="td-date-chips">
                      {trip.tripDates.map((d, i) => (
                        <div key={i} className="td-date-chip">
                          <div className="td-date-chip-dates">
                            {new Date(d.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            {" – "}
                            {new Date(d.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </div>
                          {d.note && <div className="td-date-chip-note">{d.note}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!trip.pricingTiers?.length && !trip.tripDates?.length && (
                  <p className="td-empty">Dates and pricing will be announced soon.</p>
                )}
              </div>
            )}

            {/* ── TAB: INCLUSIONS ── */}
            {activeTab === TAB_INC && (
              <div className="td-inc-grid">
                <div>
                  <div className="td-inc-section-title" style={{ color: "#34d399" }}>
                    <span>✓</span> Inclusions
                  </div>
                  {trip.inclusions?.length > 0 ? (
                    <ul className="td-inc-list">
                      {trip.inclusions.map((item, i) => (
                        <li key={i} className="td-inc-item">
                          <span className="td-inc-check">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : <p className="td-empty">Details coming soon.</p>}
                </div>

                <div>
                  <div className="td-inc-section-title" style={{ color: "#ff4d00" }}>
                    <span>✗</span> Exclusions
                  </div>
                  {trip.exclusions?.length > 0 ? (
                    <ul className="td-inc-list">
                      {trip.exclusions.map((item, i) => (
                        <li key={i} className="td-inc-item">
                          <span className="td-inc-cross">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : <p className="td-empty">Details coming soon.</p>}
                </div>
              </div>
            )}

            {/* ── NOTES ── */}
            {trip.notes?.length > 0 && (
              <div className="td-info-block notes">
                <div className="td-info-block-title">
                  <span>📋</span> Important Notes
                </div>
                <ul>
                  {trip.notes.map((note, i) => <li key={i}>{note}</li>)}
                </ul>
              </div>
            )}

            {/* ── CANCELLATION ── */}
            {trip.cancellationPolicy && (
              <div className="td-info-block cancel">
                <div className="td-info-block-title">
                  <span>🔖</span> Cancellation Policy
                </div>
                <p>{trip.cancellationPolicy}</p>
              </div>
            )}

            {/* ── THINGS TO CARRY ── */}
            {trip.thingsToCarry?.length > 0 && (
              <div className="td-info-block carry">
                <div className="td-info-block-title">
                  <span>🎒</span> Things to Carry
                </div>
                <ul>
                  {trip.thingsToCarry.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN — BOOKING CARD */}
          <div>
            <div className="td-book-card">
              <div className="td-book-card-header">
                <div className="td-book-card-from">Starting from</div>
                <div className="td-book-card-price">
                  ₹{lowestPrice > 0 ? lowestPrice.toLocaleString("en-IN") : "—"}
                  <span className="td-book-card-price-sub">/person</span>
                </div>
              </div>

              <div className="td-book-card-body">
                {trip.duration && (
                  <div className="td-book-info-row">
                    <span className="td-book-info-icon">🗓️</span>
                    <div>
                      <div className="td-book-info-label">Duration</div>
                      <div className="td-book-info-value">{trip.duration}</div>
                    </div>
                  </div>
                )}
                {trip.pickupDrop && (
                  <div className="td-book-info-row">
                    <span className="td-book-info-icon">📍</span>
                    <div>
                      <div className="td-book-info-label">Pickup &amp; Drop</div>
                      <div className="td-book-info-value">{trip.pickupDrop}</div>
                    </div>
                  </div>
                )}
                {trip.pricingTiers?.length > 0 && (
                  <div className="td-book-info-row" style={{ marginBottom: 24 }}>
                    <span className="td-book-info-icon">🛏️</span>
                    <div>
                      <div className="td-book-info-label">Sharing Options</div>
                      <div className="td-book-info-value">
                        {trip.pricingTiers.map((t) => t.roomType).join(", ")}
                      </div>
                    </div>
                  </div>
                )}

                {trip.googleFormLink ? (
                  <a
                    href={trip.googleFormLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="td-book-cta"
                  >
                    Reserve Your Spot →
                  </a>
                ) : (
                  <div className="td-book-cta-disabled">
                    Bookings opening soon
                  </div>
                )}

                <div className="td-trust-badges">
                  {["Best Price Assured", "Flexible Cancellation", "Expert Guides"].map((b) => (
                    <span key={b} className="td-trust-badge">✓ {b}</span>
                  ))}
                </div>

                <div className="td-quick-links">
                  <Link to={`/event/${eventSlug}/flow`} className="td-quick-link">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <circle cx="4" cy="4" r="1.5" fill="currentColor"/>
                      <circle cx="4" cy="8" r="1.5" fill="currentColor"/>
                      <circle cx="4" cy="12" r="1.5" fill="currentColor"/>
                      <line x1="6.5" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="6.5" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="6.5" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Timeline
                  </Link>
                  <Link to={`/event/${eventSlug}/memories`} className="td-quick-link">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="5.5" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M1 11l3.5-3 2.5 2.5 2.5-2.5L15 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Gallery
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
