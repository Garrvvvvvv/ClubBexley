import { useEffect, useState, useCallback } from "react";
import { apiAdmin } from "../../lib/apiAdmin";
import { toast } from "react-toastify";
import { History, Filter, Clock, Info, ChevronLeft, ChevronRight, X } from "lucide-react";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --lg-bg: #06060b; --lg-card: #0d0d16; --lg-elevated: #121220;
    --lg-border: rgba(255,255,255,0.07); --lg-accent: #ff4d00; --lg-accent2: #ffc447;
    --lg-text: #f0ece4; --lg-muted: #888898; --lg-dim: #3a3a50;
    --lg-font-d: 'Bebas Neue', sans-serif; --lg-font: 'Plus Jakarta Sans', sans-serif;
  }

  .lg-page { font-family: var(--lg-font); color: var(--lg-text); max-width: 1400px; margin: 0 auto; padding-bottom: 48px; }

  /* header */
  .lg-header {
    background: var(--lg-card); border: 1px solid var(--lg-border);
    border-radius: 20px; padding: 32px; margin-bottom: 24px;
    position: relative; overflow: hidden;
  }
  .lg-header-topline {
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--lg-accent) 30%, var(--lg-accent2) 60%, transparent);
    box-shadow: 0 0 20px rgba(255,77,0,0.4);
  }
  .lg-header-orb {
    position: absolute; width: 300px; height: 300px;
    top: -80px; right: -80px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,0,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .lg-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--lg-accent); background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2);
    padding: 3px 12px; border-radius: 100px; margin-bottom: 12px;
  }
  .lg-header h1 { font-family: var(--lg-font-d); font-size: 40px; color: var(--lg-text); margin: 0 0 6px; letter-spacing: 1px; position: relative; z-index: 1; }
  .lg-header p { font-size: 13px; color: var(--lg-muted); margin: 0; position: relative; z-index: 1; max-width: 480px; }

  /* filter bar */
  .lg-filters {
    background: var(--lg-card); border: 1px solid var(--lg-border);
    border-radius: 16px; padding: 20px; margin-bottom: 20px;
    display: flex; flex-wrap: wrap; align-items: flex-end; gap: 14px;
  }
  .lg-filter-group { flex: 1; min-width: 180px; }
  .lg-filter-label {
    font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--lg-dim); display: block; margin-bottom: 8px;
  }
  .lg-select, .lg-date-input {
    width: 100%; background: rgba(255,255,255,0.03); border: 1px solid var(--lg-border);
    border-radius: 10px; padding: 10px 14px; color: var(--lg-text);
    font-family: var(--lg-font); font-size: 13px; font-weight: 500; outline: none;
    transition: all 0.2s; appearance: none; box-sizing: border-box;
    color-scheme: dark;
  }
  .lg-select:focus, .lg-date-input:focus { border-color: rgba(255,77,0,0.5); box-shadow: 0 0 0 3px rgba(255,77,0,0.08); }
  .lg-select option { background: #0d0d16; color: #f0ece4; }
  .lg-clear-btn {
    height: 42px; padding: 0 20px; background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.25);
    color: var(--lg-accent); border-radius: 10px; font-family: var(--lg-font); font-size: 13px;
    font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;
    transition: all 0.2s; white-space: nowrap;
  }
  .lg-clear-btn:hover { background: var(--lg-accent); color: #fff; }

  /* table card */
  .lg-table-card {
    background: var(--lg-card); border: 1px solid var(--lg-border);
    border-radius: 20px; overflow: hidden; min-height: 400px;
  }
  .lg-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .lg-table thead { background: rgba(255,255,255,0.02); }
  .lg-table th {
    padding: 14px 20px; text-align: left;
    font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--lg-dim); border-bottom: 1px solid var(--lg-border); white-space: nowrap;
  }
  .lg-table th:last-child { text-align: right; }
  .lg-table td { padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
  .lg-table tbody tr:last-child td { border-bottom: none; }
  .lg-table tbody tr:hover td { background: rgba(255,255,255,0.02); }
  .lg-table td:last-child { text-align: right; }

  /* admin cell */
  .lg-admin-cell { display: flex; align-items: center; gap: 10px; }
  .lg-avatar {
    width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--lg-border);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; flex-shrink: 0; transition: all 0.2s;
    background: rgba(255,77,0,0.1); color: var(--lg-accent);
  }
  .lg-table tbody tr:hover .lg-avatar { background: var(--lg-accent); color: #fff; border-color: var(--lg-accent); }
  .lg-admin-name { font-weight: 700; color: var(--lg-text); }

  /* action badge */
  .lg-badge-action {
    display: inline-block; padding: 3px 10px; border-radius: 100px;
    font-size: 9px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
    border: 1px solid; white-space: nowrap;
  }
  .lg-badge-green { background: rgba(52,211,153,0.1); color: #34d399; border-color: rgba(52,211,153,0.25); }
  .lg-badge-red { background: rgba(255,77,0,0.1); color: #f87171; border-color: rgba(248,113,113,0.25); }
  .lg-badge-amber { background: rgba(251,191,36,0.1); color: #fbbf24; border-color: rgba(251,191,36,0.25); }
  .lg-badge-blue { background: rgba(96,165,250,0.1); color: #60a5fa; border-color: rgba(96,165,250,0.25); }

  /* details */
  .lg-details { font-size: 11px; color: var(--lg-muted); font-style: italic; max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* IP chip */
  .lg-ip {
    font-size: 10px; font-family: monospace; font-weight: 700;
    color: var(--lg-dim); background: rgba(255,255,255,0.04);
    border: 1px solid var(--lg-border); padding: 3px 8px; border-radius: 6px;
  }

  /* timestamp */
  .lg-ts { display: flex; flex-direction: column; align-items: flex-end; }
  .lg-ts-date { font-weight: 700; color: var(--lg-text); font-size: 12px; }
  .lg-ts-time { font-size: 10px; color: var(--lg-dim); letter-spacing: 0.5px; text-transform: uppercase; margin-top: 2px; }

  /* skeleton */
  .lg-skel { background: rgba(255,255,255,0.05); border-radius: 6px; animation: lgPulse 1.5s ease-in-out infinite; }
  @keyframes lgPulse { 0%,100%{opacity:0.5} 50%{opacity:1} }

  /* empty */
  .lg-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 24px; text-align: center; }
  .lg-empty-icon { width: 72px; height: 72px; border-radius: 50%; border: 1px dashed var(--lg-border); display: flex; align-items: center; justify-content: center; color: var(--lg-dim); margin-bottom: 20px; }
  .lg-empty h3 { font-family: var(--lg-font-d); font-size: 24px; color: var(--lg-text); margin: 0 0 8px; }
  .lg-empty p { font-size: 13px; color: var(--lg-muted); margin: 0 0 16px; max-width: 300px; }
  .lg-empty-link { font-size: 12px; font-weight: 700; color: var(--lg-accent); text-decoration: underline; underline-offset: 4px; background: none; border: none; cursor: pointer; font-family: var(--lg-font); }

  /* pagination */
  .lg-pagination {
    padding: 16px 20px; border-top: 1px solid var(--lg-border);
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(255,255,255,0.01);
  }
  .lg-page-info { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--lg-dim); }
  .lg-page-info span { color: var(--lg-text); }
  .lg-page-btns { display: flex; gap: 8px; }
  .lg-page-btn {
    width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;
    border-radius: 10px; background: rgba(255,255,255,0.04); border: 1px solid var(--lg-border);
    color: var(--lg-muted); cursor: pointer; transition: all 0.2s;
  }
  .lg-page-btn:hover:not(:disabled) { border-color: rgba(255,77,0,0.4); color: var(--lg-accent); }
  .lg-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

  /* info footer */
  .lg-footer {
    margin-top: 20px; display: flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.02); border: 1px solid var(--lg-border);
    border-radius: 12px; padding: 14px 18px;
  }
  .lg-footer p { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--lg-dim); margin: 0; line-height: 1.6; }

  @media (max-width: 768px) {
    .lg-table th:nth-child(3), .lg-table td:nth-child(3),
    .lg-table th:nth-child(4), .lg-table td:nth-child(4) { display: none; }
  }
`;

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [availableActions, setAvailableActions] = useState([]);
  const [filterAction, setFilterAction] = useState("");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

  const fetchActions = async () => {
    try {
      const res = await apiAdmin.get("/api/admin/logs/actions");
      setAvailableActions(res.data);
    } catch (e) { console.error(e); }
  };

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 20, action: filterAction, from: filterFrom, to: filterTo });
      const res = await apiAdmin.get(`/api/admin/logs?${params.toString()}`);
      setLogs(res.data.logs);
      setTotalPages(res.data.pages);
    } catch { toast.error("Failed to load audit logs"); }
    finally { setLoading(false); }
  }, [page, filterAction, filterFrom, filterTo]);

  useEffect(() => { fetchActions(); }, []);
  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const resetFilters = () => { setFilterAction(""); setFilterFrom(""); setFilterTo(""); setPage(1); };

  const formatDate = (d) => {
    const date = new Date(d);
    return date.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const getActionClass = (action) => {
    if (action.includes("APPROVE") || action === "LOGIN") return "lg-badge-action lg-badge-green";
    if (action.includes("REJECT") || action.includes("DELETE") || action === "LOGOUT" || action.includes("REVOKE")) return "lg-badge-action lg-badge-red";
    if (action.includes("UPDATE") || action.includes("RESET") || action.includes("REVERT")) return "lg-badge-action lg-badge-amber";
    return "lg-badge-action lg-badge-blue";
  };

  const formatDetails = (details) => {
    if (!details || Object.keys(details).length === 0) return "—";
    const parts = [];
    if (details.name) parts.push(`Event: ${details.name}`);
    if (details.controllerName) parts.push(`Staff: ${details.controllerName}`);
    if (details.status) parts.push(`Status: ${details.status}`);
    if (details.count) parts.push(`Count: ${details.count}`);
    if (parts.length > 0) return parts.join(" • ");
    return JSON.stringify(details).replace(/["{}]/g, "").replace(/:/g, ": ");
  };

  const hasFilters = filterAction || filterFrom || filterTo;

  return (
    <>
      <style>{S}</style>
      <div className="lg-page">

        {/* Header */}
        <div className="lg-header">
          <div className="lg-header-topline" />
          <div className="lg-header-orb" />
          <div className="lg-badge" style={{ position: "relative", zIndex: 1 }}><History size={10} /> Audit Trail</div>
          <h1>Admin Activity Logs</h1>
          <p>Complete history of all administrative actions performed in the system for the last 15 days.</p>
        </div>

        {/* Filters */}
        <div className="lg-filters">
          <div className="lg-filter-group">
            <label className="lg-filter-label">Filter by Action</label>
            <div style={{ position: "relative" }}>
              <select className="lg-select" value={filterAction} onChange={e => { setFilterAction(e.target.value); setPage(1); }}>
                <option value="">All Actions</option>
                {availableActions.map(act => <option key={act} value={act}>{act}</option>)}
              </select>
              <Filter size={12} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#3a3a50", pointerEvents: "none" }} />
            </div>
          </div>
          <div className="lg-filter-group">
            <label className="lg-filter-label">From Date</label>
            <input type="date" className="lg-date-input" value={filterFrom} onChange={e => { setFilterFrom(e.target.value); setPage(1); }} />
          </div>
          <div className="lg-filter-group">
            <label className="lg-filter-label">To Date</label>
            <input type="date" className="lg-date-input" value={filterTo} onChange={e => { setFilterTo(e.target.value); setPage(1); }} />
          </div>
          {hasFilters && (
            <button className="lg-clear-btn" onClick={resetFilters}><X size={13} /> Clear</button>
          )}
        </div>

        {/* Table */}
        <div className="lg-table-card">
          <div style={{ overflowX: "auto" }}>
            <table className="lg-table">
              <thead>
                <tr>
                  <th>Admin</th>
                  <th>Action</th>
                  <th>Operation Details</th>
                  <th>IP Address</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [1, 2, 3, 4, 5].map(i => (
                    <tr key={i}>
                      <td><div className="lg-skel" style={{ height: 36, width: 140 }} /></td>
                      <td><div className="lg-skel" style={{ height: 22, width: 90, borderRadius: 100 }} /></td>
                      <td><div className="lg-skel" style={{ height: 16, width: 200 }} /></td>
                      <td><div className="lg-skel" style={{ height: 22, width: 90 }} /></td>
                      <td style={{ textAlign: "right" }}><div className="lg-skel" style={{ height: 32, width: 110, marginLeft: "auto" }} /></td>
                    </tr>
                  ))
                ) : logs.length > 0 ? (
                  logs.map(log => {
                    const parts = formatDate(log.createdAt).split(",");
                    return (
                      <tr key={log._id}>
                        <td>
                          <div className="lg-admin-cell">
                            <div className="lg-avatar">{log.adminName?.charAt(0).toUpperCase()}</div>
                            <span className="lg-admin-name">{log.adminName}</span>
                          </div>
                        </td>
                        <td>
                          <span className={getActionClass(log.action)}>{log.action.replace(/_/g, " ")}</span>
                        </td>
                        <td>
                          <span className="lg-details">{formatDetails(log.details)}</span>
                        </td>
                        <td>
                          <span className="lg-ip">{log.ip || "local"}</span>
                        </td>
                        <td>
                          <div className="lg-ts">
                            <span className="lg-ts-date">{parts[0]}</span>
                            <span className="lg-ts-time">{parts[1]}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">
                      <div className="lg-empty">
                        <div className="lg-empty-icon"><Clock size={28} /></div>
                        <h3>No Logs Found</h3>
                        <p>Try adjusting your filters or check back after some actions have been performed.</p>
                        {hasFilters && <button className="lg-empty-link" onClick={resetFilters}>Reset all filters</button>}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {!loading && totalPages > 1 && (
            <div className="lg-pagination">
              <p className="lg-page-info">Page <span>{page}</span> of <span>{totalPages}</span></p>
              <div className="lg-page-btns">
                <button className="lg-page-btn" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>
                  <ChevronLeft size={14} />
                </button>
                <button className="lg-page-btn" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="lg-footer">
          <Info size={14} style={{ color: "#3a3a50", flexShrink: 0 }} />
          <p>Logs older than 15 days are automatically purged from the database to maintain performance and data privacy.</p>
        </div>

      </div>
    </>
  );
}
