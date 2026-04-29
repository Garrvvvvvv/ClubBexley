import { useEffect, useState } from "react";
import { useAdminEvent } from "../../context/AdminEventContext";
import { apiAdmin } from "../../lib/apiAdmin";
import { toast } from "react-toastify";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Users, CheckCircle, Clock, ShieldCheck, TrendingUp } from "lucide-react";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --db-bg: #06060b; --db-card: #0d0d16; --db-elevated: #121220;
    --db-border: rgba(255,255,255,0.07); --db-accent: #ff4d00; --db-accent2: #ffc447;
    --db-text: #f0ece4; --db-muted: #888898; --db-dim: #3a3a50;
    --db-green: #34d399; --db-amber: #fbbf24; --db-blue: #60a5fa;
    --db-font-d: 'Bebas Neue', sans-serif; --db-font: 'Plus Jakarta Sans', sans-serif;
  }

  .db-page { font-family: var(--db-font); color: var(--db-text); }

  /* empty state */
  .db-empty {
    min-height: 60vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: var(--db-card); border: 1px solid var(--db-border);
    border-radius: 24px; text-align: center; padding: 48px 24px;
  }
  .db-empty-icon {
    width: 80px; height: 80px; border-radius: 50%;
    background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2);
    display: flex; align-items: center; justify-content: center;
    color: var(--db-accent); margin: 0 auto 24px;
  }
  .db-empty h2 { font-family: var(--db-font-d); font-size: 32px; color: var(--db-text); margin: 0 0 8px; }
  .db-empty p { font-size: 14px; color: var(--db-muted); max-width: 320px; margin: 0 auto; line-height: 1.6; }

  /* page header */
  .db-header {
    background: var(--db-card); border: 1px solid var(--db-border);
    border-radius: 20px; padding: 32px; margin-bottom: 28px;
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
    flex-wrap: wrap;
  }
  .db-header-topline {
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--db-accent) 30%, var(--db-accent2) 60%, transparent);
    box-shadow: 0 0 20px rgba(255,77,0,0.4);
  }
  .db-header-orb {
    position: absolute; width: 300px; height: 300px;
    top: -80px; right: -80px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .db-header-badge {
    display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 2.5px;
    text-transform: uppercase; color: var(--db-accent);
    background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2);
    padding: 3px 12px; border-radius: 100px; margin-bottom: 10px;
  }
  .db-header h1 {
    font-family: var(--db-font-d); font-size: 40px; line-height: 0.9;
    color: var(--db-text); margin: 0; letter-spacing: 1px;
  }
  .db-revenue-card {
    background: rgba(255,77,0,0.08); border: 1px solid rgba(255,77,0,0.2);
    border-radius: 16px; padding: 18px 24px; text-align: right; flex-shrink: 0;
  }
  .db-revenue-label {
    font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--db-muted); margin-bottom: 6px;
  }
  .db-revenue-value {
    font-family: var(--db-font-d); font-size: 36px; color: var(--db-accent2);
    letter-spacing: 1px; line-height: 1;
  }

  /* stat cards */
  .db-kpi-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 16px; margin-bottom: 28px;
  }
  @media (max-width: 1100px) { .db-kpi-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .db-kpi-grid { grid-template-columns: 1fr; } }

  .db-stat {
    background: var(--db-card); border: 1px solid var(--db-border);
    border-radius: 18px; padding: 22px; position: relative; overflow: hidden;
    transition: transform 0.3s ease, border-color 0.3s ease;
  }
  .db-stat:hover { transform: translateY(-3px); }
  .db-stat-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; }
  .db-stat-icon {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 16px; flex-shrink: 0;
  }
  .db-stat-label {
    font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--db-dim); margin-bottom: 6px;
  }
  .db-stat-value {
    font-family: var(--db-font-d); font-size: 44px; line-height: 1;
    color: var(--db-text); letter-spacing: 1px;
  }
  .db-stat-trend {
    margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--db-border);
    font-size: 11px; font-weight: 600; color: var(--db-muted);
    display: flex; align-items: center; gap: 6px;
  }
  .db-stat-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

  /* charts */
  .db-charts-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }
  @media (max-width: 1100px) { .db-charts-grid { grid-template-columns: 1fr; } }

  .db-chart-card {
    background: var(--db-card); border: 1px solid var(--db-border);
    border-radius: 20px; padding: 24px; position: relative; overflow: hidden;
  }
  .db-chart-card.span2 { grid-column: span 2; }
  @media (max-width: 1100px) { .db-chart-card.span2 { grid-column: span 1; } }

  .db-chart-title {
    font-family: var(--db-font-d); font-size: 22px; color: var(--db-text);
    margin: 0 0 4px; letter-spacing: 0.5px;
  }
  .db-chart-sub { font-size: 12px; color: var(--db-muted); margin: 0 0 24px; }

  .db-timeframe {
    display: flex; gap: 0; background: rgba(255,255,255,0.04);
    border: 1px solid var(--db-border); border-radius: 10px; padding: 3px;
  }
  .db-tf-btn {
    padding: 6px 14px; border-radius: 7px; font-family: var(--db-font);
    font-size: 12px; font-weight: 700; background: none; border: none;
    color: var(--db-muted); cursor: pointer; transition: all 0.2s;
  }
  .db-tf-btn.active { background: var(--db-accent); color: #fff; box-shadow: 0 4px 12px rgba(255,77,0,0.3); }

  /* pie legend */
  .db-legend { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }
  .db-legend-row { display: flex; justify-content: space-between; align-items: center; font-size: 12px; }
  .db-legend-left { display: flex; align-items: center; gap: 8px; }
  .db-legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .db-legend-name { color: var(--db-muted); font-weight: 600; }
  .db-legend-val { color: var(--db-text); font-weight: 700; }

  /* pie total overlay */
  .db-pie-wrap { position: relative; }
  .db-pie-center {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    text-align: center; pointer-events: none;
  }
  .db-pie-total { font-family: var(--db-font-d); font-size: 32px; color: var(--db-text); line-height: 1; }
  .db-pie-label { font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--db-dim); margin-top: 2px; }
`;

const PIE_COLORS = ['#34d399', '#fbbf24', '#f87171'];

export default function Dashboard() {
  const { activeEvent } = useAdminEvent();
  const [stats, setStats] = useState(null);
  const [timeframe, setTimeframe] = useState('1W');
  const [last30DaysTrend, setLast30DaysTrend] = useState([]);

  useEffect(() => {
    if (activeEvent) {
      Promise.all([
        apiAdmin.get(`/api/admin/events/${activeEvent._id}/stats`),
        apiAdmin.get(`/api/admin/events/${activeEvent._id}/registrations`)
      ])
        .then(([statsRes, regsRes]) => {
          const baseData = statsRes.data;
          const regs = regsRes.data || [];

          const totalRevenue = regs
            .filter(r => r.status === "APPROVED")
            .reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

          const today = new Date();
          const trendArray = [];
          for (let i = 29; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            trendArray.push({
              fullDate: d.toISOString().split('T')[0],
              name: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              regs: 0
            });
          }
          regs.forEach(r => {
            if (r.createdAt) {
              const rDate = new Date(r.createdAt).toISOString().split('T')[0];
              const t = trendArray.find(t => t.fullDate === rDate);
              if (t) t.regs++;
            }
          });
          setLast30DaysTrend(trendArray);

          const statusCount = { APPROVED: 0, PENDING: 0, REJECTED: 0 };
          regs.forEach(r => { if (statusCount[r.status] !== undefined) statusCount[r.status]++; });

          setStats({
            ...baseData,
            revenue: totalRevenue,
            statusDistribution: [
              { name: 'Approved', value: statusCount.APPROVED },
              { name: 'Pending', value: statusCount.PENDING },
              { name: 'Rejected', value: statusCount.REJECTED },
            ]
          });
        })
        .catch(() => toast.error("Failed to load dashboard data"));
    }
  }, [activeEvent]);

  const currentTrendData = timeframe === '1W' ? last30DaysTrend.slice(-7) : last30DaysTrend;

  if (!activeEvent) return (
    <>
      <style>{S}</style>
      <div className="db-page">
        <div className="db-empty">
          <div className="db-empty-icon"><TrendingUp size={32} /></div>
          <h2>Event Analytics</h2>
          <p>Select an event from the sidebar to view its performance dashboard and metrics.</p>
        </div>
      </div>
    </>
  );

  const KPI = [
    { label: "Total Registrations", value: stats?.total || 0, icon: <Users size={18} />, color: "#ff4d00", bg: "rgba(255,77,0,0.12)", trend: "+12% this week" },
    { label: "Approved (Paid)", value: stats?.approved || 0, icon: <CheckCircle size={18} />, color: "#34d399", bg: "rgba(52,211,153,0.12)", trend: "Ready for event" },
    { label: "Pending Review", value: stats?.pending || 0, icon: <Clock size={18} />, color: "#fbbf24", bg: "rgba(251,191,36,0.12)", trend: "Requires action" },
    { label: "Active Controllers", value: stats?.controllers || 0, icon: <ShieldCheck size={18} />, color: "#60a5fa", bg: "rgba(96,165,250,0.12)", trend: "Managing access" },
  ];

  return (
    <>
      <style>{S}</style>
      <div className="db-page">

        {/* Header */}
        <div className="db-header">
          <div className="db-header-topline" />
          <div className="db-header-orb" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="db-header-badge">Live Analytics Dashboard</div>
            <h1>{activeEvent.name}</h1>
          </div>
          <div className="db-revenue-card" style={{ position: "relative", zIndex: 1 }}>
            <div className="db-revenue-label">Total Revenue Est.</div>
            <div className="db-revenue-value">₹{(stats?.revenue || 0).toLocaleString()}</div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="db-kpi-grid">
          {KPI.map(k => (
            <div key={k.label} className="db-stat" style={{ borderColor: `${k.color}22` }}>
              <div className="db-stat-bar" style={{ background: `linear-gradient(90deg, ${k.color}, ${k.color}60)` }} />
              <div className="db-stat-icon" style={{ background: k.bg, color: k.color }}>
                {k.icon}
              </div>
              <div className="db-stat-label">{k.label}</div>
              <div className="db-stat-value">{k.value}</div>
              <div className="db-stat-trend">
                <div className="db-stat-dot" style={{ background: k.color }} />
                {k.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="db-charts-grid">

          {/* Area Chart */}
          <div className="db-chart-card span2">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <div className="db-chart-title">Registration Trends</div>
                <div className="db-chart-sub">Daily registration velocity</div>
              </div>
              <div className="db-timeframe">
                <button className={`db-tf-btn${timeframe === '1W' ? ' active' : ''}`} onClick={() => setTimeframe('1W')}>1 Week</button>
                <button className={`db-tf-btn${timeframe === '1M' ? ' active' : ''}`} onClick={() => setTimeframe('1M')}>1 Month</button>
              </div>
            </div>
            <div style={{ height: 280, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="dbColorRegs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff4d00" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#ff4d00" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#3a3a50', fontSize: 11, fontWeight: 600 }} dy={8} minTickGap={20} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#3a3a50', fontSize: 11, fontWeight: 600 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ background: '#0d0d16', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
                    itemStyle={{ color: '#ff4d00' }}
                    labelStyle={{ color: '#888898', marginBottom: 4 }}
                    cursor={{ stroke: 'rgba(255,77,0,0.2)', strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="regs" name="Registrations" stroke="#ff4d00" strokeWidth={3} fillOpacity={1} fill="url(#dbColorRegs)" activeDot={{ r: 7, strokeWidth: 0, fill: '#ff4d00' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="db-chart-card" style={{ display: "flex", flexDirection: "column" }}>
            <div className="db-chart-title">Status Overview</div>
            <div className="db-chart-sub">Approval distribution</div>
            <div className="db-pie-wrap" style={{ flex: 1, position: "relative" }}>
              <div style={{ height: 200, width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={stats?.statusDistribution || []} cx="50%" cy="50%" innerRadius={56} outerRadius={84} paddingAngle={4} dataKey="value" stroke="none">
                      {(stats?.statusDistribution || []).map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#0d0d16', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
                      labelStyle={{ color: '#888898' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="db-pie-center">
                <div className="db-pie-total">{stats?.total || 0}</div>
                <div className="db-pie-label">Total</div>
              </div>
            </div>
            <div className="db-legend">
              {(stats?.statusDistribution || []).map((entry, i) => (
                <div key={entry.name} className="db-legend-row">
                  <div className="db-legend-left">
                    <div className="db-legend-dot" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span className="db-legend-name">{entry.name}</span>
                  </div>
                  <span className="db-legend-val">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
