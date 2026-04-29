import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiAdmin } from "../../lib/apiAdmin";
import { ArrowRight, Lock, Mail, KeyRound, CheckCircle } from "lucide-react";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --fp-bg: #06060b; --fp-card: #0d0d16; --fp-border: rgba(255,255,255,0.07);
    --fp-accent: #ff4d00; --fp-accent2: #ffc447; --fp-text: #f0ece4;
    --fp-muted: #888898; --fp-dim: #3a3a50;
    --fp-font-d: 'Bebas Neue', sans-serif; --fp-font: 'Plus Jakarta Sans', sans-serif;
  }

  .fp-page {
    min-height: 100vh;
    background: var(--fp-bg);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    font-family: var(--fp-font);
    position: relative; overflow: hidden;
  }

  .fp-orb-1 {
    position: absolute; width: 600px; height: 600px;
    top: -200px; left: -200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,0.09) 0%, transparent 70%);
    pointer-events: none; animation: fpOrb1 14s ease-in-out infinite;
  }
  .fp-orb-2 {
    position: absolute; width: 500px; height: 500px;
    bottom: -150px; right: -150px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,196,71,0.06) 0%, transparent 70%);
    pointer-events: none; animation: fpOrb2 18s ease-in-out infinite;
  }
  @keyframes fpOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
  @keyframes fpOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,-40px)} }

  .fp-mountains {
    position: fixed; bottom: 0; left: 0; right: 0; height: 100px;
    pointer-events: none; z-index: 0; opacity: 0.35;
  }

  .fp-card {
    position: relative; z-index: 1;
    width: 100%; max-width: 440px;
    background: var(--fp-card);
    border: 1px solid var(--fp-border);
    border-radius: 24px; overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6);
  }

  .fp-topline {
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--fp-accent) 30%, var(--fp-accent2) 60%, transparent);
    box-shadow: 0 0 20px rgba(255,77,0,0.4);
  }

  .fp-body { padding: 40px; }

  /* step tracker */
  .fp-steps {
    display: flex; align-items: center; gap: 0; margin-bottom: 36px;
  }
  .fp-step {
    display: flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; border-radius: 50%;
    font-size: 11px; font-weight: 700;
    border: 1px solid var(--fp-border);
    color: var(--fp-dim); background: rgba(255,255,255,0.02);
    transition: all 0.3s;
  }
  .fp-step.active { background: var(--fp-accent); color: #fff; border-color: var(--fp-accent); box-shadow: 0 0 14px rgba(255,77,0,0.4); }
  .fp-step.done { background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.4); color: #34d399; }
  .fp-step-line { flex: 1; height: 1px; background: var(--fp-border); margin: 0 6px; }
  .fp-step-line.done { background: rgba(52,211,153,0.3); }

  /* logo */
  .fp-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; text-decoration: none; }
  .fp-logo-img { width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,0.04); border: 1px solid var(--fp-border); padding: 3px; object-fit: contain; }
  .fp-logo-name { font-family: var(--fp-font-d); font-size: 18px; letter-spacing: 1.5px; color: var(--fp-text); }
  .fp-logo-name em { font-style: normal; background: linear-gradient(135deg,#ff4d00,#ffc447); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

  .fp-headline { font-family: var(--fp-font-d); font-size: 42px; line-height: 0.9; color: var(--fp-text); margin-bottom: 6px; }
  .fp-sub { font-size: 13px; color: var(--fp-muted); margin-bottom: 28px; }

  /* messages */
  .fp-error { font-size: 12px; color: var(--fp-accent); background: rgba(255,77,0,0.08); border: 1px solid rgba(255,77,0,0.2); border-radius: 10px; padding: 11px 14px; margin-bottom: 18px; display: flex; align-items: center; gap: 8px; }
  .fp-success { font-size: 12px; color: #34d399; background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.2); border-radius: 10px; padding: 11px 14px; margin-bottom: 18px; display: flex; align-items: center; gap: 8px; }

  /* input */
  .fp-field { margin-bottom: 18px; }
  .fp-label { font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--fp-dim); display: block; margin-bottom: 8px; }
  .fp-input-wrap { position: relative; }
  .fp-input-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: var(--fp-dim); pointer-events: none; }
  .fp-input {
    width: 100%; background: rgba(255,255,255,0.03); border: 1px solid var(--fp-border);
    border-radius: 11px; padding: 13px 13px 13px 40px;
    color: var(--fp-text); font-family: var(--fp-font); font-size: 14px; font-weight: 500;
    outline: none; transition: all 0.2s; box-sizing: border-box;
  }
  .fp-input::placeholder { color: var(--fp-dim); }
  .fp-input:focus { border-color: rgba(255,77,0,0.5); box-shadow: 0 0 0 3px rgba(255,77,0,0.08); background: rgba(255,255,255,0.04); }

  /* btn */
  .fp-btn {
    width: 100%; background: linear-gradient(135deg,#ff5200,#ff7033); color: #fff;
    border: none; border-radius: 12px; padding: 15px;
    font-family: var(--fp-font); font-size: 14px; font-weight: 700; letter-spacing: 0.5px;
    cursor: pointer; transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    box-shadow: 0 8px 24px rgba(255,77,0,0.3);
    display: flex; align-items: center; justify-content: center; gap: 8px;
    margin-top: 8px;
  }
  .fp-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(255,77,0,0.5); }
  .fp-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .fp-btn-spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; animation: fpSpin .7s linear infinite; }
  @keyframes fpSpin { to { transform: rotate(360deg); } }

  .fp-back { font-size: 11px; font-weight: 700; color: var(--fp-dim); text-decoration: none; margin-top: 16px; display: inline-block; transition: color .2s; }
  .fp-back:hover { color: var(--fp-muted); }

  .fp-footer { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--fp-border); text-align: center; font-size: 11px; color: var(--fp-dim); }
  .fp-footer a { color: var(--fp-muted); text-decoration: none; transition: color .2s; }
  .fp-footer a:hover { color: var(--fp-accent); }
`;

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  const clear = () => { setErr(""); setMsg(""); };

  const requestOtp = async (e) => {
    e.preventDefault(); clear(); setLoading(true);
    try {
      const res = await apiAdmin.post("/api/admin/auth/forgot-password", { username });
      setMsg(res.data.message);
      setStep(2);
    } catch (error) { setErr(error.response?.data?.message || "Failed to request OTP"); }
    finally { setLoading(false); }
  };

  const verifyOtp = async (e) => {
    e.preventDefault(); clear(); setLoading(true);
    try {
      const res = await apiAdmin.post("/api/admin/auth/verify-otp", { username, otp });
      setResetToken(res.data.resetToken);
      setMsg("OTP verified. Set your new password below.");
      setStep(3);
    } catch (error) { setErr(error.response?.data?.message || "Invalid or expired OTP"); }
    finally { setLoading(false); }
  };

  const resetPassword = async (e) => {
    e.preventDefault(); clear();
    if (newPassword !== confirmPassword) return setErr("Passwords do not match");
    setLoading(true);
    try {
      const res = await apiAdmin.post("/api/admin/auth/reset-password", { resetToken, newPassword });
      setMsg(res.data.message);
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (error) { setErr(error.response?.data?.message || "Failed to reset password"); }
    finally { setLoading(false); }
  };

  const TITLES = ["Recover Access", "Verify OTP", "New Password"];
  const SUBS = [
    "Enter your admin username to receive a one-time code.",
    "Enter the 6-digit code sent to your registered email.",
    "Create a new secure password for your account.",
  ];

  return (
    <>
      <style>{S}</style>
      <div className="fp-page">
        <div className="fp-orb-1" /><div className="fp-orb-2" />
        <svg className="fp-mountains" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,100 L0,70 L100,46 L200,62 L300,30 L400,54 L500,22 L600,50 L700,20 L800,52 L900,28 L1000,54 L1100,35 L1200,58 L1300,40 L1440,55 L1440,100 Z" fill="#0d0d16"/>
          <path d="M0,100 L0,84 L120,65 L240,78 L360,54 L480,70 L600,46 L720,68 L840,44 L960,66 L1080,52 L1200,70 L1320,56 L1440,68 L1440,100 Z" fill="#06060b"/>
        </svg>

        <div className="fp-card">
          <div className="fp-topline" />
          <div className="fp-body">

            {/* Logo */}
            <a href="/" className="fp-logo">
              <img src="/assets/bglogo.png" alt="Club Bexley" className="fp-logo-img" onError={e => { e.target.style.display = "none"; }} />
              <span className="fp-logo-name">CLUB <em>BEXLEY</em></span>
            </a>

            {/* Step tracker */}
            <div className="fp-steps">
              {[1, 2, 3].map((s, i) => (
                <>
                  <div key={s} className={`fp-step${step === s ? " active" : step > s ? " done" : ""}`}>
                    {step > s ? <CheckCircle size={13} /> : s}
                  </div>
                  {i < 2 && <div key={`line-${s}`} className={`fp-step-line${step > s ? " done" : ""}`} />}
                </>
              ))}
            </div>

            <h1 className="fp-headline">{TITLES[step - 1]}</h1>
            <p className="fp-sub">{SUBS[step - 1]}</p>

            {err && <div className="fp-error"><span>⚠</span>{err}</div>}
            {msg && <div className="fp-success"><CheckCircle size={14} />{msg}</div>}

            {/* Step 1 */}
            {step === 1 && (
              <form onSubmit={requestOtp}>
                <div className="fp-field">
                  <label className="fp-label">Admin Username / Email</label>
                  <div className="fp-input-wrap">
                    <Mail size={16} className="fp-input-icon" />
                    <input type="email" required placeholder="your@email.com" value={username} onChange={e => setUsername(e.target.value)} className="fp-input" />
                  </div>
                </div>
                <button type="submit" className="fp-btn" disabled={loading}>
                  {loading ? <span className="fp-btn-spin" /> : <><span>Send OTP</span><ArrowRight size={15} /></>}
                </button>
              </form>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <form onSubmit={verifyOtp}>
                <div className="fp-field">
                  <label className="fp-label">6-Digit OTP</label>
                  <div className="fp-input-wrap">
                    <KeyRound size={16} className="fp-input-icon" />
                    <input type="text" required placeholder="123456" maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} className="fp-input" />
                  </div>
                </div>
                <button type="submit" className="fp-btn" disabled={loading}>
                  {loading ? <span className="fp-btn-spin" /> : <><span>Verify Code</span><ArrowRight size={15} /></>}
                </button>
                <div style={{ textAlign: "center", marginTop: 14 }}>
                  <button type="button" onClick={() => { clear(); setStep(1); }} className="fp-back">← Didn't get a code? Go back</button>
                </div>
              </form>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <form onSubmit={resetPassword}>
                <div className="fp-field">
                  <label className="fp-label">New Password</label>
                  <div className="fp-input-wrap">
                    <Lock size={16} className="fp-input-icon" />
                    <input type="password" required placeholder="••••••••" minLength={6} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="fp-input" />
                  </div>
                </div>
                <div className="fp-field">
                  <label className="fp-label">Confirm Password</label>
                  <div className="fp-input-wrap">
                    <Lock size={16} className="fp-input-icon" />
                    <input type="password" required placeholder="••••••••" minLength={6} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="fp-input" />
                  </div>
                </div>
                <button type="submit" className="fp-btn" disabled={loading}>
                  {loading ? <span className="fp-btn-spin" /> : <><span>Reset Password</span><ArrowRight size={15} /></>}
                </button>
              </form>
            )}

            <div className="fp-footer">
              Remember your password?{" "}
              <Link to="/admin/login">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
