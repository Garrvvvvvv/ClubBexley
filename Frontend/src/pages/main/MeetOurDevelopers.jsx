import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const developers = [
  {
    name: "Garv Noor Sandha",
    role: "Full Stack Developer",
    photo: "https://res.cloudinary.com/dbl2so7ff/image/upload/v1762839758/Profile_LINK_x49mdb.jpg",
    linkedin: "https://www.linkedin.com/in/garvsandha/",
    github: "https://github.com/Garrvvvvvv",
  },
  {
    name: "Yuvraj Chawla",
    role: "Full Stack Developer",
    photo: "https://res.cloudinary.com/dc45s96yk/image/upload/v1770222123/yuvi_eqdws3.jpg",
    linkedin: "https://www.linkedin.com/in/yuvraj-chawla-b8a708286/",
    github: "https://github.com/yc786",
  },
];

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --bg: #06060b;
    --card: #0d0d16;
    --elevated: #121220;
    --border: rgba(255,255,255,0.07);
    --accent: #ff4d00;
    --accent2: #ffc447;
    --text: #f0ece4;
    --muted: #888898;
    --dim: #3a3a50;
    --font-d: 'Bebas Neue', sans-serif;
    --font: 'Plus Jakarta Sans', sans-serif;
  }

  .mod-page {
    min-height: 100vh;
    background: var(--bg);
    font-family: var(--font);
    color: var(--text);
    position: relative;
    overflow: hidden;
    padding: 80px 24px 120px;
  }

  /* ── ORBS ── */
  .mod-orb-1 {
    position: fixed; top: -180px; left: -220px;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,0.09) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
    animation: modOrb1 16s ease-in-out infinite;
  }
  .mod-orb-2 {
    position: fixed; bottom: -200px; right: -180px;
    width: 540px; height: 540px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,196,71,0.07) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
    animation: modOrb2 20s ease-in-out infinite;
  }
  .mod-orb-3 {
    position: fixed; top: 40%; left: 50%; transform: translate(-50%, -50%);
    width: 800px; height: 400px; border-radius: 50%;
    background: radial-gradient(ellipse, rgba(255,77,0,0.03) 0%, transparent 65%);
    pointer-events: none; z-index: 0;
  }
  @keyframes modOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
  @keyframes modOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,-40px)} }

  /* ── HERO ── */
  .mod-hero {
    position: relative; z-index: 1;
    text-align: center;
    margin-bottom: 80px;
  }
  .mod-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 10px; font-weight: 700; letter-spacing: 3.5px;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 18px;
  }
  .mod-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent); box-shadow: 0 0 8px var(--accent);
    animation: modDotPulse 2.5s infinite;
  }
  @keyframes modDotPulse {
    0%,100% { box-shadow: 0 0 5px var(--accent); }
    50%      { box-shadow: 0 0 16px var(--accent), 0 0 28px rgba(255,77,0,0.4); }
  }
  .mod-title-line1 {
    font-family: var(--font-d);
    font-size: clamp(52px, 9vw, 108px);
    line-height: 0.88;
    letter-spacing: 4px;
    color: var(--text);
    display: block;
  }
  .mod-title-line2 {
    font-family: var(--font-d);
    font-size: clamp(52px, 9vw, 108px);
    line-height: 0.88;
    letter-spacing: 4px;
    background: linear-gradient(135deg, #ff4d00 0%, #ff8c00 40%, #ffc447 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
    margin-bottom: 28px;
  }
  .mod-title-divider {
    width: 60px; height: 2px; margin: 0 auto;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    border-radius: 2px;
  }

  /* ── GRID ── */
  .mod-grid {
    position: relative; z-index: 1;
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
    max-width: 900px;
    margin: 0 auto;
  }

  /* ── CARD ── */
  .mod-card {
    width: 340px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    transition: transform 0.4s cubic-bezier(0.23,1,0.32,1),
                border-color 0.4s ease,
                box-shadow 0.4s ease;
  }
  .mod-card:hover {
    transform: translateY(-10px);
    border-color: rgba(255,77,0,0.35);
    box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(255,77,0,0.1);
  }

  /* top accent line */
  .mod-card-topline {
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent) 30%, var(--accent2) 70%, transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .mod-card:hover .mod-card-topline { opacity: 1; }

  /* photo */
  .mod-photo-wrap {
    height: 280px;
    overflow: hidden;
    position: relative;
    background: var(--elevated);
  }
  .mod-photo-wrap img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: top center;
    transition: transform 0.7s cubic-bezier(0.23,1,0.32,1);
    display: block;
  }
  .mod-card:hover .mod-photo-wrap img { transform: scale(1.06); }

  .mod-photo-gradient {
    position: absolute; bottom: 0; left: 0; right: 0; height: 120px;
    background: linear-gradient(to top, var(--card) 0%, transparent 100%);
    pointer-events: none;
  }

  /* card body */
  .mod-card-body {
    padding: 24px 28px 28px;
  }

  .mod-card-tag {
    display: inline-block;
    font-size: 9px; font-weight: 700; letter-spacing: 2.5px;
    text-transform: uppercase; color: var(--accent);
    background: rgba(255,77,0,0.1);
    border: 1px solid rgba(255,77,0,0.2);
    padding: 3px 10px; border-radius: 100px;
    margin-bottom: 12px;
  }

  .mod-card-name {
    font-family: var(--font-d);
    font-size: 36px; line-height: 0.92;
    letter-spacing: 1px;
    color: var(--text);
    margin-bottom: 20px;
  }

  .mod-card-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 18px;
    border-top: 1px solid var(--border);
  }

  .mod-socials {
    display: flex; gap: 10px;
  }

  .mod-social-link {
    display: flex; align-items: center; justify-content: center;
    width: 36px; height: 36px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--muted);
    font-size: 16px;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .mod-social-link:hover {
    color: var(--text);
    background: rgba(255,77,0,0.1);
    border-color: rgba(255,77,0,0.35);
    transform: translateY(-2px);
  }

  .mod-card-index {
    font-family: var(--font-d);
    font-size: 48px; line-height: 1;
    color: rgba(255,255,255,0.04);
    letter-spacing: 2px;
    user-select: none;
    transition: color 0.4s ease;
  }
  .mod-card:hover .mod-card-index {
    color: rgba(255,77,0,0.12);
  }
`;

export default function MeetOurDevelopers() {
  return (
    <>
      <style>{S}</style>
      <div className="mod-page">
        <div className="mod-orb-1" />
        <div className="mod-orb-2" />
        <div className="mod-orb-3" />

        {/* Hero */}
        <div className="mod-hero">
          <div className="mod-eyebrow">
            <span className="mod-eyebrow-dot" />
            The Team Behind The Platform
          </div>
          <span className="mod-title-line1">MEET THE</span>
          <span className="mod-title-line2">DEVELOPERS</span>
          <div className="mod-title-divider" />
        </div>

        {/* Cards */}
        <div className="mod-grid">
          {developers.map((dev, i) => (
            <div key={i} className="mod-card">
              <div className="mod-card-topline" />

              <div className="mod-photo-wrap">
                <img src={dev.photo} alt={dev.name} />
                <div className="mod-photo-gradient" />
              </div>

              <div className="mod-card-body">
                <span className="mod-card-tag">{dev.role}</span>
                <div className="mod-card-name">{dev.name}</div>

                <div className="mod-card-footer">
                  <div className="mod-socials">
                    <a href={dev.linkedin} target="_blank" rel="noreferrer" className="mod-social-link" title="LinkedIn">
                      <FaLinkedin />
                    </a>
                    <a href={dev.github} target="_blank" rel="noreferrer" className="mod-social-link" title="GitHub">
                      <FaGithub />
                    </a>
                  </div>
                  <span className="mod-card-index">0{i + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
