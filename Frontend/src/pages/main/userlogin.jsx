import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { apiUser } from "../../lib/apiUser";
import { useMemo } from "react";

const DESTINATIONS = [
  "MANALI", "KASOL", "SPITI VALLEY", "KEDARNATH", "LADAKH",
  "RISHIKESH", "CHOPTA", "MCLEODGANJ", "DHARAMSHALA", "BADRINATH",
];

const PERKS = [
  { icon: "🏔️", label: "Vetted Routes",    desc: "Every trail hand-scouted" },
  { icon: "👥", label: "Travel Community", desc: "Like-minded explorers" },
  { icon: "💰", label: "Best Value",       desc: "Group pricing, honest costs" },
  { icon: "🛡️", label: "Safety First",     desc: "24/7 support, expert guides" },
];

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

  .login-page {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }

  @media (max-width: 900px) {
    .login-page { grid-template-columns: 1fr; }
  }

  /* ── NOISE OVERLAY ── */
  .login-noise {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* ══════════════════════
     LEFT PANEL
  ══════════════════════ */
  .login-left {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 56px 48px;
    overflow: hidden;
    background: var(--bg-card);
    border-right: 1px solid var(--border);
    z-index: 1;
  }

  @media (max-width: 900px) { .login-left { display: none; } }

  /* orbs */
  .login-orb-1 {
    position: absolute;
    width: 700px; height: 700px;
    top: -200px; left: -200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,0.1) 0%, transparent 70%);
    pointer-events: none;
    animation: loginOrb1 14s ease-in-out infinite;
  }

  .login-orb-2 {
    position: absolute;
    width: 500px; height: 500px;
    bottom: -150px; right: -100px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,196,71,0.07) 0%, transparent 70%);
    pointer-events: none;
    animation: loginOrb2 18s ease-in-out infinite;
  }

  @keyframes loginOrb1 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%      { transform: translate(40px, 30px) scale(1.05); }
  }

  @keyframes loginOrb2 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%      { transform: translate(-30px, -40px) scale(1.08); }
  }

  /* wordmark top */
  .login-left-logo {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }

  .login-left-logo-img {
    height: 38px; width: 38px;
    border-radius: 10px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    padding: 4px;
    object-fit: contain;
  }

  .login-left-logo-name {
    font-family: var(--font-display);
    font-size: 24px;
    letter-spacing: 2px;
    color: var(--text);
    line-height: 1;
  }

  .login-left-logo-name em {
    font-style: normal;
    background: linear-gradient(135deg, #ff4d00, #ffc447);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* center content */
  .login-left-center {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 48px 0;
  }

  .login-left-eyebrow {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .login-left-eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
    animation: loginDotPulse 2.5s infinite;
  }

  @keyframes loginDotPulse {
    0%,100% { box-shadow: 0 0 6px var(--accent); }
    50%      { box-shadow: 0 0 18px var(--accent), 0 0 30px rgba(255,77,0,0.4); }
  }

  .login-left-headline {
    font-family: var(--font-display);
    font-size: clamp(64px, 7vw, 96px);
    line-height: 0.88;
    letter-spacing: 1.5px;
    color: var(--text);
    margin: 0 0 24px;
  }

  .login-left-headline em {
    font-style: normal;
    display: block;
    background: linear-gradient(135deg, #ff4d00 0%, #ffc447 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .login-left-sub {
    font-size: 14px;
    line-height: 1.8;
    color: var(--text-muted);
    max-width: 360px;
    margin-bottom: 40px;
  }

  /* perks grid */
  .login-perks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .login-perk {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 14px;
    background: rgba(255,255,255,0.025);
    border: 1px solid var(--border);
    transition: border-color 0.2s, background 0.2s;
  }

  .login-perk:hover {
    border-color: rgba(255,77,0,0.2);
    background: rgba(255,77,0,0.04);
  }

  .login-perk-icon {
    font-size: 22px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .login-perk-label {
    font-size: 12px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 2px;
  }

  .login-perk-desc {
    font-size: 11px;
    color: var(--text-dim);
    line-height: 1.5;
  }

  /* bottom marquee */
  .login-left-bottom {
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-top: 1px solid var(--border);
    padding-top: 20px;
  }

  .login-marquee {
    display: flex;
    width: max-content;
    animation: loginMarquee 30s linear infinite;
    gap: 0;
  }

  .login-marquee-item {
    font-family: var(--font-display);
    font-size: 11px;
    letter-spacing: 3.5px;
    color: var(--text-dim);
    padding: 0 20px;
    white-space: nowrap;
  }

  .login-marquee-dot { color: var(--accent); margin-right: 8px; font-size: 8px; }

  @keyframes loginMarquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ══════════════════════
     RIGHT PANEL
  ══════════════════════ */
  .login-right {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 64px 56px;
    min-height: 100vh;
  }

  @media (max-width: 900px) {
    .login-right { padding: 100px 24px 60px; }
  }

  .login-right-inner {
    width: 100%;
    max-width: 400px;
  }

  /* mobile logo */
  .login-mobile-logo {
    display: none;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    margin-bottom: 40px;
    justify-content: center;
  }

  @media (max-width: 900px) { .login-mobile-logo { display: flex; } }

  .login-mobile-logo-name {
    font-family: var(--font-display);
    font-size: 22px;
    letter-spacing: 2px;
    color: var(--text);
    line-height: 1;
  }

  .login-mobile-logo-name em {
    font-style: normal;
    background: linear-gradient(135deg, #ff4d00, #ffc447);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* welcome block */
  .login-welcome-eyebrow {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 14px;
  }

  .login-welcome-title {
    font-family: var(--font-display);
    font-size: 56px;
    line-height: 0.9;
    letter-spacing: 1.5px;
    color: var(--text);
    margin: 0 0 8px;
  }

  .login-welcome-sub {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.75;
    margin-bottom: 40px;
  }

  /* divider */
  .login-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin-bottom: 32px;
  }

  /* google login wrapper */
  .login-google-wrap {
    position: relative;
    margin-bottom: 28px;
  }

  .login-google-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 16px;
  }

  .login-google-btn-wrap {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px 20px;
    display: flex;
    justify-content: center;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
  }

  .login-google-btn-wrap:hover {
    border-color: rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.05);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }

  /* error */
  .login-error {
    font-size: 12px;
    color: var(--accent);
    background: rgba(255,77,0,0.08);
    border: 1px solid rgba(255,77,0,0.2);
    border-radius: 10px;
    padding: 12px 16px;
    margin-bottom: 20px;
  }

  /* trust line */
  .login-trust {
    font-size: 11px;
    color: var(--text-dim);
    text-align: center;
    line-height: 1.6;
  }

  .login-trust a {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  .login-trust a:hover { color: var(--accent); }

  /* glow orb behind form */
  .login-right-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,0.06) 0%, transparent 65%);
    pointer-events: none;
  }

  /* mountain silhouette bottom */
  .login-mountain-strip {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  @media (max-width: 900px) {
    .login-mountain-strip { opacity: 0.25; }
  }
`;

function LoginInner() {
  const navigate = useNavigate();

  const handleAuthResponse = async (credential) => {
    try {
      const { data } = await apiUser.post("/api/auth/google", { id_token: credential });
      localStorage.setItem("app_auth", JSON.stringify(data));
      navigate("/register", { replace: true });
    } catch {
      alert("Google sign-in failed. Please try again.");
    }
  };

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <>
      <style>{STYLES}</style>

      <div className="login-page">
        <div className="login-noise" />

        {/* ── SVG mountain silhouette ── */}
        <svg className="login-mountain-strip" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 L0,70 L80,48 L160,65 L250,32 L340,55 L420,20 L510,48 L600,18 L690,50 L770,22 L860,52 L940,28 L1020,55 L1110,32 L1200,58 L1290,38 L1380,60 L1440,45 L1440,100 Z"
            fill="#0d0d16" />
          <path d="M0,100 L0,82 L100,60 L200,75 L300,50 L400,68 L500,42 L600,65 L700,40 L800,62 L900,45 L1000,68 L1100,50 L1200,72 L1300,55 L1440,68 L1440,100 Z"
            fill="#06060b" />
        </svg>

        {/* ══ LEFT PANEL ══ */}
        <div className="login-left">
          <div className="login-orb-1" />
          <div className="login-orb-2" />

          {/* Logo */}
          <a href="/" className="login-left-logo">
            <img
              src="/assets/bglogo.png"
              alt="Club Bexley"
              className="login-left-logo-img"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <span className="login-left-logo-name">CLUB <em>BEXLEY</em></span>
          </a>

          {/* Center */}
          <div className="login-left-center">
            <div className="login-left-eyebrow">
              <span className="login-left-eyebrow-dot" />
              Trips &amp; Travel Experiences
            </div>

            <h2 className="login-left-headline">
              YOUR NEXT
              <em>ADVENTURE</em>
              AWAITS
            </h2>

            <p className="login-left-sub">
              Curated Himalayan treks, weekend escapes, and heritage circuits —
              crafted for people who want more than just a holiday.
            </p>

            <div className="login-perks">
              {PERKS.map((p) => (
                <div key={p.label} className="login-perk">
                  <span className="login-perk-icon">{p.icon}</span>
                  <div>
                    <div className="login-perk-label">{p.label}</div>
                    <div className="login-perk-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom marquee */}
          <div className="login-left-bottom">
            <div className="login-marquee">
              {[...DESTINATIONS, ...DESTINATIONS].map((d, i) => (
                <span key={i} className="login-marquee-item">
                  <span className="login-marquee-dot">✦</span>{d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="login-right">
          <div className="login-right-glow" />

          <div className="login-right-inner">

            {/* Mobile logo */}
            <a href="/" className="login-mobile-logo">
              <img
                src="/assets/bglogo.png"
                alt="Club Bexley"
                style={{ height: 32, width: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)", padding: 3, objectFit: "contain" }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <span className="login-mobile-logo-name">CLUB <em>BEXLEY</em></span>
            </a>

            <p className="login-welcome-eyebrow">Sign in to continue</p>
            <h1 className="login-welcome-title">WELCOME<br />BACK</h1>
            <p className="login-welcome-sub">
              Sign in to access trips, track your bookings, and join the community.
            </p>

            <div className="login-divider" />

            {!clientId ? (
              <div className="login-error">
                ⚠ Missing VITE_GOOGLE_CLIENT_ID — check your environment configuration.
              </div>
            ) : (
              <div className="login-google-wrap">
                <p className="login-google-label">Continue with</p>
                <div className="login-google-btn-wrap">
                  <GoogleLogin
                    onSuccess={(resp) => handleAuthResponse(resp.credential)}
                    onError={() => alert("Google sign-in failed")}
                    useOneTap
                    size="large"
                    theme="outline"
                    width="320"
                    logo_alignment="left"
                    shape="rectangular"
                  />
                </div>
              </div>
            )}

            <p className="login-trust">
              By signing in, you agree to our{" "}
              <a href="#">Terms of Service</a>
              {" "}and{" "}
              <a href="#">Privacy Policy</a>.
              <br />
              No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Login() {
  const clientId = useMemo(() => import.meta.env.VITE_GOOGLE_CLIENT_ID, []);
  return (
    <GoogleOAuthProvider clientId={clientId || ""}>
      <LoginInner />
    </GoogleOAuthProvider>
  );
}
