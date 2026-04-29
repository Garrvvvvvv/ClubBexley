import { useState } from "react";
import { Link } from "react-router-dom";
import { apiAdmin } from "../../lib/apiAdmin";
import { Eye, EyeOff } from "lucide-react";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --al-bg: #06060b;
    --al-card: #0d0d16;
    --al-border: rgba(255,255,255,0.07);
    --al-accent: #ff4d00;
    --al-accent2: #ffc447;
    --al-text: #f0ece4;
    --al-muted: #888898;
    --al-dim: #3a3a50;
    --al-font-d: 'Bebas Neue', sans-serif;
    --al-font: 'Plus Jakarta Sans', sans-serif;
  }

  .al-page {
    min-height: 100vh;
    background: var(--al-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    font-family: var(--al-font);
    position: relative;
    overflow: hidden;
  }

  /* orbs */
  .al-orb-1 {
    position: absolute;
    width: 600px; height: 600px;
    top: -200px; left: -200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,0.1) 0%, transparent 70%);
    pointer-events: none;
    animation: alOrb1 14s ease-in-out infinite;
  }
  .al-orb-2 {
    position: absolute;
    width: 500px; height: 500px;
    bottom: -150px; right: -150px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,196,71,0.07) 0%, transparent 70%);
    pointer-events: none;
    animation: alOrb2 18s ease-in-out infinite;
  }
  @keyframes alOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
  @keyframes alOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,-40px)} }

  /* noise */
  .al-noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    opacity: 0.022;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* mountain silhouette */
  .al-mountains {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    height: 120px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  /* card */
  .al-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 420px;
    background: var(--al-card);
    border: 1px solid var(--al-border);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6);
  }

  /* top glow line */
  .al-topline {
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--al-accent) 30%, var(--al-accent2) 60%, transparent);
    box-shadow: 0 0 20px rgba(255,77,0,0.4);
  }

  .al-body { padding: 40px; }

  /* logo row */
  .al-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
  }

  .al-logo-img {
    width: 36px; height: 36px;
    border-radius: 9px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--al-border);
    padding: 4px;
    object-fit: contain;
  }

  .al-logo-name {
    font-family: var(--al-font-d);
    font-size: 20px;
    letter-spacing: 1.5px;
    color: var(--al-text);
    line-height: 1;
  }

  .al-logo-name em {
    font-style: normal;
    background: linear-gradient(135deg, #ff4d00, #ffc447);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .al-logo-badge {
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--al-accent);
    background: rgba(255,77,0,0.1);
    border: 1px solid rgba(255,77,0,0.2);
    padding: 2px 8px;
    border-radius: 100px;
    margin-top: 2px;
    display: block;
  }

  /* headline */
  .al-headline {
    font-family: var(--al-font-d);
    font-size: 48px;
    line-height: 0.9;
    letter-spacing: 1px;
    color: var(--al-text);
    margin-bottom: 6px;
  }

  .al-sub {
    font-size: 13px;
    color: var(--al-muted);
    margin-bottom: 32px;
  }

  /* fields */
  .al-field { margin-bottom: 18px; }

  .al-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--al-dim);
    display: block;
    margin-bottom: 8px;
  }

  .al-input-wrap { position: relative; }

  .al-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--al-border);
    border-radius: 11px;
    padding: 13px 16px;
    color: var(--al-text);
    font-family: var(--al-font);
    font-size: 14px;
    font-weight: 500;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    box-sizing: border-box;
  }

  .al-input::placeholder { color: var(--al-dim); }

  .al-input:focus {
    border-color: rgba(255,77,0,0.5);
    box-shadow: 0 0 0 3px rgba(255,77,0,0.08);
    background: rgba(255,255,255,0.04);
  }

  .al-input.has-toggle { padding-right: 44px; }

  .al-eye {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--al-dim);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }

  .al-eye:hover { color: var(--al-muted); }

  /* forgot */
  .al-forgot {
    text-align: right;
    margin-bottom: 24px;
  }

  .al-forgot a {
    font-size: 11px;
    font-weight: 700;
    color: var(--al-muted);
    text-decoration: none;
    letter-spacing: 0.5px;
    transition: color 0.2s;
  }

  .al-forgot a:hover { color: var(--al-accent); }

  /* error */
  .al-error {
    font-size: 12px;
    color: var(--al-accent);
    background: rgba(255,77,0,0.08);
    border: 1px solid rgba(255,77,0,0.2);
    border-radius: 10px;
    padding: 11px 14px;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* submit */
  .al-btn {
    width: 100%;
    background: linear-gradient(135deg, #ff5200, #ff7033);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 15px;
    font-family: var(--al-font);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    box-shadow: 0 8px 24px rgba(255,77,0,0.3);
    position: relative;
    overflow: hidden;
  }

  .al-btn:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 36px rgba(255,77,0,0.5);
  }

  .al-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .al-btn-loader {
    display: inline-block;
    width: 16px; height: 16px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    animation: alSpin 0.7s linear infinite;
    margin-right: 8px;
    vertical-align: middle;
  }

  @keyframes alSpin { to { transform: rotate(360deg); } }

  /* footer */
  .al-footer {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--al-border);
    text-align: center;
    font-size: 11px;
    color: var(--al-dim);
    letter-spacing: 0.5px;
  }
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await apiAdmin.post("/api/admin/auth/login", { username, password });
      const token = res.data?.token;
      if (!token) throw new Error("No token");
      localStorage.setItem("adminToken", token);
      window.location.href = "/admin/dashboard";
    } catch (error) {
      setErr(error?.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{S}</style>
      <div className="al-page">
        <div className="al-noise" />
        <div className="al-orb-1" />
        <div className="al-orb-2" />

        {/* Mountain silhouette */}
        <svg className="al-mountains" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,120 L0,80 L100,52 L200,72 L300,36 L400,60 L500,24 L600,55 L700,22 L800,56 L900,30 L1000,58 L1100,38 L1200,62 L1300,42 L1440,58 L1440,120 Z" fill="#0d0d16"/>
          <path d="M0,120 L0,92 L120,70 L240,85 L360,58 L480,75 L600,50 L720,72 L840,48 L960,70 L1080,55 L1200,75 L1320,60 L1440,72 L1440,120 Z" fill="#06060b"/>
        </svg>

        <div className="al-card">
          <div className="al-topline" />

          <div className="al-body">
            {/* Logo */}
            <div className="al-logo">
              <img
                src="/assets/bglogo.png"
                alt="Club Bexley"
                className="al-logo-img"
                onError={e => { e.target.style.display = "none"; }}
              />
              <div>
                <div className="al-logo-name">CLUB <em>BEXLEY</em></div>
                <span className="al-logo-badge">Admin Portal</span>
              </div>
            </div>

            <h1 className="al-headline">SIGN<br />IN</h1>
            <p className="al-sub">Enter your credentials to access the dashboard.</p>

            {err && (
              <div className="al-error">
                <span>⚠</span> {err}
              </div>
            )}

            <form onSubmit={submit}>
              <div className="al-field">
                <label className="al-label">Username</label>
                <input
                  className="al-input"
                  placeholder="Enter username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>

              <div className="al-field">
                <label className="al-label">Password</label>
                <div className="al-input-wrap">
                  <input
                    className="al-input has-toggle"
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button type="button" className="al-eye" onClick={() => setShowPw(s => !s)}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="al-forgot">
                <Link to="/admin/forgot-password">Forgot password?</Link>
              </div>

              <button type="submit" className="al-btn" disabled={loading}>
                {loading && <span className="al-btn-loader" />}
                {loading ? "Signing in…" : "Sign In →"}
              </button>
            </form>

            <div className="al-footer">Club Bexley Admin · Authorised access only</div>
          </div>
        </div>
      </div>
    </>
  );
}
