import { useEffect, useState } from "react";
import { useAdminEvent } from "../../context/AdminEventContext";
import { apiAdmin } from "../../lib/apiAdmin";
import { toast } from "react-toastify";
import { Mail, UserCircle, Send, Search, CheckCircle, Clock, Inbox, X } from "lucide-react";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --em-bg: #06060b; --em-card: #0d0d16; --em-elevated: #121220;
    --em-border: rgba(255,255,255,0.07); --em-accent: #ff4d00; --em-accent2: #ffc447;
    --em-text: #f0ece4; --em-muted: #888898; --em-dim: #3a3a50;
    --em-font-d: 'Bebas Neue', sans-serif; --em-font: 'Plus Jakarta Sans', sans-serif;
  }

  .em-page { font-family: var(--em-font); color: var(--em-text); max-width: 1200px; margin: 0 auto; padding-bottom: 80px; }

  /* empty / no event */
  .em-no-event {
    min-height: 60vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: var(--em-card); border: 1px solid var(--em-border); border-radius: 24px;
  }
  .em-no-event-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2);
    display: flex; align-items: center; justify-content: center; color: var(--em-accent); margin-bottom: 20px;
  }
  .em-no-event p { font-size: 16px; color: var(--em-muted); font-weight: 500; }

  /* page header */
  .em-header {
    display: flex; flex-direction: column; gap: 16px;
    padding-bottom: 24px; margin-bottom: 24px;
    border-bottom: 1px solid var(--em-border);
  }
  .em-header-top { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 20px; }
  .em-header h1 {
    font-family: var(--em-font-d); font-size: 36px; letter-spacing: 1px;
    color: var(--em-text); margin: 0 0 4px; line-height: 1;
  }
  .em-header-sub { font-size: 13px; color: var(--em-muted); margin: 0; }
  .em-header-name { color: var(--em-accent); }

  /* stat chips */
  .em-stats { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
  .em-chip {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 100px; border: 1px solid;
  }
  .em-chip-default { background: rgba(255,255,255,0.04); border-color: var(--em-border); color: var(--em-muted); }
  .em-chip-blue { background: rgba(96,165,250,0.1); border-color: rgba(96,165,250,0.25); color: #60a5fa; }
  .em-chip-amber { background: rgba(251,191,36,0.1); border-color: rgba(251,191,36,0.25); color: #fbbf24; }

  /* search */
  .em-search-wrap { position: relative; width: 100%; max-width: 320px; }
  .em-search-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: var(--em-dim); pointer-events: none; }
  .em-search {
    width: 100%; background: rgba(255,255,255,0.03); border: 1px solid var(--em-border);
    border-radius: 11px; padding: 11px 13px 11px 38px; color: var(--em-text);
    font-family: var(--em-font); font-size: 13px; font-weight: 500; outline: none;
    transition: all 0.2s; box-sizing: border-box;
  }
  .em-search::placeholder { color: var(--em-dim); }
  .em-search:focus { border-color: rgba(255,77,0,0.5); box-shadow: 0 0 0 3px rgba(255,77,0,0.08); }

  /* filter tabs */
  .em-tabs { display: flex; gap: 8px; margin-bottom: 20px; }
  .em-tab {
    padding: 8px 16px; border-radius: 10px; font-family: var(--em-font);
    font-size: 13px; font-weight: 700; border: 1px solid; cursor: pointer;
    transition: all 0.2s; display: flex; align-items: center; gap: 6px;
  }
  .em-tab-inactive { background: rgba(255,255,255,0.03); border-color: var(--em-border); color: var(--em-muted); }
  .em-tab-inactive:hover { border-color: rgba(255,255,255,0.15); color: var(--em-text); }
  .em-tab-active { background: linear-gradient(135deg,#ff5200,#ff7033); border-color: transparent; color: #fff; box-shadow: 0 4px 14px rgba(255,77,0,0.3); }
  .em-tab-count {
    font-size: 10px; font-weight: 800; padding: 1px 6px; border-radius: 100px;
  }
  .em-tab-active .em-tab-count { background: rgba(255,255,255,0.2); color: #fff; }
  .em-tab-inactive .em-tab-count { background: rgba(255,255,255,0.06); color: var(--em-dim); }

  /* loading spinner */
  .em-spinner { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 24px; }
  .em-spin { width: 32px; height: 32px; border-radius: 50%; border: 2px solid rgba(255,77,0,0.2); border-top-color: var(--em-accent); animation: emSpin 0.7s linear infinite; }
  @keyframes emSpin { to { transform: rotate(360deg); } }
  .em-spinner p { color: var(--em-muted); margin-top: 16px; font-size: 13px; font-weight: 500; }

  /* table */
  .em-table-card {
    background: var(--em-card); border: 1px solid var(--em-border);
    border-radius: 20px; overflow: hidden;
  }
  .em-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .em-table thead { background: rgba(255,255,255,0.02); }
  .em-table th {
    padding: 13px 20px; text-align: left;
    font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--em-dim); border-bottom: 1px solid var(--em-border); white-space: nowrap;
  }
  .em-table th:last-child { text-align: right; }
  .em-table td { padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
  .em-table tbody tr:last-child td { border-bottom: none; }
  .em-table tbody tr:hover td { background: rgba(255,255,255,0.02); }
  .em-table td:last-child { text-align: right; }

  /* registrant */
  .em-reg-cell { display: flex; align-items: center; gap: 10px; }
  .em-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 700; color: var(--em-accent); flex-shrink: 0;
  }
  .em-reg-name { font-weight: 700; color: var(--em-text); }
  .em-reg-email { font-size: 11px; color: var(--em-muted); margin-top: 2px; }

  /* detail cell */
  .em-detail-batch { font-size: 13px; font-weight: 600; color: var(--em-text); }
  .em-detail-sub { font-size: 11px; color: var(--em-dim); margin-top: 2px; }

  /* mail status */
  .em-status-sent { display: flex; flex-direction: column; gap: 4px; }
  .em-status-sent-row { display: flex; align-items: center; gap: 6px; }
  .em-status-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .em-status-count { font-size: 13px; font-weight: 700; color: #60a5fa; }
  .em-history-btn { font-size: 11px; font-weight: 600; color: #60a5fa; background: none; border: none; cursor: pointer; font-family: var(--em-font); text-decoration: underline; padding: 0; }
  .em-history-btn:hover { color: #93c5fd; }
  .em-status-none { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--em-dim); }

  /* last sent */
  .em-last-sent-chip {
    display: inline-block; font-size: 11px; font-weight: 500; color: #60a5fa;
    background: rgba(96,165,250,0.1); border: 1px solid rgba(96,165,250,0.2);
    padding: 3px 10px; border-radius: 8px;
  }
  .em-last-sent-none { font-size: 12px; color: var(--em-dim); font-style: italic; }

  /* action button */
  .em-send-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: 10px; font-family: var(--em-font);
    font-size: 12px; font-weight: 700; cursor: pointer; border: none; transition: all 0.2s;
  }
  .em-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .em-send-btn-primary { background: linear-gradient(135deg,#ff5200,#ff7033); color: #fff; box-shadow: 0 4px 14px rgba(255,77,0,0.25); }
  .em-send-btn-primary:not(:disabled):hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(255,77,0,0.35); }
  .em-send-btn-secondary { background: rgba(96,165,250,0.1); border: 1px solid rgba(96,165,250,0.25) !important; color: #60a5fa; }
  .em-send-btn-secondary:not(:disabled):hover { background: rgba(96,165,250,0.18); }

  /* empty state */
  .em-empty {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; padding: 72px 24px; text-align: center;
  }
  .em-empty-icon {
    width: 64px; height: 64px; border-radius: 50%;
    border: 1px dashed var(--em-border); display: flex;
    align-items: center; justify-content: center; color: var(--em-dim); margin-bottom: 16px;
  }
  .em-empty p { font-size: 14px; color: var(--em-muted); font-weight: 500; margin: 0; }

  /* mobile cards */
  .em-mobile { display: none; }
  @media (max-width: 1023px) {
    .em-desktop { display: none; }
    .em-mobile { display: block; margin-top: 16px; }
  }
  .em-m-card {
    background: var(--em-card); border: 1px solid var(--em-border);
    border-radius: 16px; padding: 18px; margin-bottom: 12px;
  }
  .em-m-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
  .em-m-badge {
    font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 100px; border: 1px solid;
  }
  .em-m-badge-blue { background: rgba(96,165,250,0.1); border-color: rgba(96,165,250,0.25); color: #60a5fa; }
  .em-m-badge-dim { background: rgba(255,255,255,0.04); border-color: var(--em-border); color: var(--em-dim); }

  /* modal */
  .em-modal-overlay { position: fixed; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); padding: 16px; }
  .em-modal {
    background: var(--em-card); border: 1px solid var(--em-border);
    border-radius: 20px; width: 100%; max-width: 440px; overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6);
  }
  .em-modal-header {
    padding: 20px 24px; border-bottom: 1px solid var(--em-border);
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(255,255,255,0.02);
  }
  .em-modal-title { font-family: var(--em-font-d); font-size: 22px; color: var(--em-text); margin: 0; }
  .em-modal-sub { font-size: 12px; color: var(--em-muted); margin: 4px 0 0; }
  .em-modal-close {
    width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.06);
    border: 1px solid var(--em-border); display: flex; align-items: center; justify-content: center;
    color: var(--em-muted); cursor: pointer; transition: all 0.2s;
  }
  .em-modal-close:hover { color: var(--em-accent); border-color: rgba(255,77,0,0.3); }
  .em-modal-body { padding: 24px; max-height: 60vh; overflow-y: auto; }
  .em-timeline { position: relative; border-left: 1px solid rgba(96,165,250,0.2); margin-left: 12px; padding-left: 24px; display: flex; flex-direction: column; gap: 24px; }
  .em-tl-item { position: relative; }
  .em-tl-dot { position: absolute; left: -31px; top: 4px; width: 14px; height: 14px; border-radius: 50%; border: 3px solid var(--em-card); background: #60a5fa; }
  .em-tl-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #60a5fa; margin-bottom: 4px; }
  .em-tl-date { font-size: 13px; font-weight: 600; color: var(--em-text); }
  .em-tl-status { font-size: 11px; color: var(--em-muted); margin-top: 3px; }
  .em-tl-status-ok { color: #34d399; font-weight: 600; }
  .em-modal-footer {
    padding: 16px 24px; border-top: 1px solid var(--em-border);
    background: rgba(255,255,255,0.01);
  }
  .em-modal-close-btn {
    width: 100%; padding: 12px; background: rgba(255,255,255,0.04); border: 1px solid var(--em-border);
    border-radius: 12px; color: var(--em-muted); font-family: var(--em-font); font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.2s;
  }
  .em-modal-close-btn:hover { color: var(--em-text); border-color: rgba(255,255,255,0.15); }
`;

export default function AdminEmails() {
  const { activeEvent } = useAdminEvent();
  const [regs, setRegs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [resendingId, setResendingId] = useState(null);
  const [selectedRegForHistory, setSelectedRegForHistory] = useState(null);

  const fetchRegs = async () => {
    if (!activeEvent) return;
    setLoading(true);
    try {
      const res = await apiAdmin.get(`/api/admin/events/${activeEvent._id}/registrations`);
      setRegs(res.data.filter(r => r.status === "APPROVED"));
    } catch { toast.error("Failed to fetch registrations"); }
    setLoading(false);
  };

  useEffect(() => { fetchRegs(); }, [activeEvent]);

  const handleResendMail = async (id) => {
    setResendingId(id);
    try {
      const res = await apiAdmin.put(`/api/admin/events/${activeEvent._id}/registrations/${id}/resend-mail`);
      toast.success(`✉ Email sent! (Total: ${res.data.mailCount}×)`);
      fetchRegs();
    } catch { toast.error("Failed to send email"); }
    finally { setResendingId(null); }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const filtered = regs.filter(r => {
    const matchSearch = searchTerm
      ? r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.oauthEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.batch?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchFilter = filter === "all" ? true : filter === "mailed" ? r.mailLogs?.length > 0 : !r.mailLogs?.length;
    return matchSearch && matchFilter;
  });

  const mailedCount = regs.filter(r => r.mailLogs?.length > 0).length;
  const notMailedCount = regs.filter(r => !r.mailLogs?.length).length;

  if (!activeEvent) return (
    <>
      <style>{S}</style>
      <div className="em-page">
        <div className="em-no-event">
          <div className="em-no-event-icon"><UserCircle size={32} /></div>
          <p>Select an event from the sidebar.</p>
        </div>
      </div>
    </>
  );

  const TABS = [
    { key: "all", label: "All Approved", count: regs.length },
    { key: "mailed", label: "Email Sent", count: mailedCount },
    { key: "not_mailed", label: "Not Emailed", count: notMailedCount },
  ];

  return (
    <>
      <style>{S}</style>
      <div className="em-page">

        {/* Header */}
        <div className="em-header">
          <div className="em-header-top">
            <div>
              <h1>Email Tracking <span className="em-header-name">· {activeEvent.name}</span></h1>
              <p className="em-header-sub">Track approval emails sent to registered participants</p>
              <div className="em-stats">
                <span className="em-chip em-chip-default">Approved: <strong>{regs.length}</strong></span>
                <span className="em-chip em-chip-blue"><Mail size={10} /> Mailed: <strong>{mailedCount}</strong></span>
                <span className="em-chip em-chip-amber"><Inbox size={10} /> Not Mailed: <strong>{notMailedCount}</strong></span>
              </div>
            </div>
            <div className="em-search-wrap">
              <Search size={14} className="em-search-icon" />
              <input className="em-search" type="text" placeholder="Search name, email, batch…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="em-tabs">
          {TABS.map(tab => (
            <button key={tab.key} className={`em-tab ${filter === tab.key ? "em-tab-active" : "em-tab-inactive"}`} onClick={() => setFilter(tab.key)}>
              {tab.label}
              <span className="em-tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="em-spinner">
            <div className="em-spin" />
            <p>Loading…</p>
          </div>
        )}

        {/* Desktop Table */}
        {!loading && filtered.length > 0 && (
          <div className="em-desktop em-table-card">
            <div style={{ overflowX: "auto" }}>
              <table className="em-table">
                <thead>
                  <tr>
                    <th>Registrant</th>
                    <th>Details</th>
                    <th>Mail Status</th>
                    <th>Last Sent</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => {
                    const mailCount = r.mailLogs?.length || 0;
                    const lastSent = mailCount > 0 ? r.mailLogs[mailCount - 1].sentAt : null;
                    return (
                      <tr key={r._id}>
                        <td>
                          <div className="em-reg-cell">
                            <div className="em-avatar">{r.name?.charAt(0).toUpperCase()}</div>
                            <div>
                              <div className="em-reg-name">{r.name}</div>
                              <div className="em-reg-email">{r.oauthEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="em-detail-batch">Batch: {r.batch}</div>
                          <div className="em-detail-sub">{r.familyMembers?.length > 0 ? `Family (${r.familyMembers.length + 1})` : "Solo"} · ₹{r.amount}</div>
                        </td>
                        <td>
                          {mailCount > 0 ? (
                            <div className="em-status-sent">
                              <div className="em-status-sent-row">
                                <span className="em-status-dot" style={{ background: "#60a5fa" }} />
                                <span className="em-status-count">{mailCount} email{mailCount > 1 ? "s" : ""} sent</span>
                              </div>
                              <button className="em-history-btn" onClick={() => setSelectedRegForHistory(r)}>View History</button>
                            </div>
                          ) : (
                            <div className="em-status-none">
                              <span className="em-status-dot" style={{ background: "#3a3a50" }} />
                              Not sent yet
                            </div>
                          )}
                        </td>
                        <td>
                          {lastSent
                            ? <span className="em-last-sent-chip">{formatDate(lastSent)}</span>
                            : <span className="em-last-sent-none">—</span>
                          }
                        </td>
                        <td>
                          <button
                            onClick={() => handleResendMail(r._id)}
                            disabled={resendingId === r._id}
                            className={`em-send-btn ${mailCount === 0 ? "em-send-btn-primary" : "em-send-btn-secondary"}`}
                          >
                            <Send size={12} />
                            {resendingId === r._id ? "Sending…" : mailCount === 0 ? "Send Approval Email" : "Resend Reminder"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mobile Cards */}
        {!loading && filtered.length > 0 && (
          <div className="em-mobile">
            {filtered.map(r => {
              const mailCount = r.mailLogs?.length || 0;
              return (
                <div key={r._id + "_m"} className="em-m-card">
                  <div className="em-m-header">
                    <div>
                      <div className="em-reg-name">{r.name}</div>
                      <div className="em-reg-email">{r.oauthEmail}</div>
                    </div>
                    {mailCount > 0
                      ? <span className="em-m-badge em-m-badge-blue"><Mail size={9} /> {mailCount}×</span>
                      : <span className="em-m-badge em-m-badge-dim">No Mail</span>
                    }
                  </div>
                  {mailCount > 0 && (
                    <button className="em-history-btn" style={{ marginBottom: 12 }} onClick={() => setSelectedRegForHistory(r)}>View Mail History</button>
                  )}
                  <button
                    onClick={() => handleResendMail(r._id)}
                    disabled={resendingId === r._id}
                    className={`em-send-btn ${mailCount === 0 ? "em-send-btn-primary" : "em-send-btn-secondary"}`}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <Send size={12} />
                    {resendingId === r._id ? "Sending…" : mailCount === 0 ? "Send Email" : "Resend Reminder"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="em-table-card">
            <div className="em-empty">
              <div className="em-empty-icon"><Mail size={22} /></div>
              <p>{searchTerm ? "No matches found." : "No approved registrations yet."}</p>
            </div>
          </div>
        )}

        {/* Mail History Modal */}
        {selectedRegForHistory && (
          <div className="em-modal-overlay" onClick={() => setSelectedRegForHistory(null)}>
            <div className="em-modal" onClick={e => e.stopPropagation()}>
              <div className="em-modal-header">
                <div>
                  <div className="em-modal-title">Email History</div>
                  <div className="em-modal-sub">{selectedRegForHistory.name}</div>
                </div>
                <button className="em-modal-close" onClick={() => setSelectedRegForHistory(null)}><X size={14} /></button>
              </div>
              <div className="em-modal-body">
                <div className="em-timeline">
                  {selectedRegForHistory.mailLogs?.map((log, idx) => (
                    <div key={idx} className="em-tl-item">
                      <div className="em-tl-dot" />
                      <div className="em-tl-label">Mail #{idx + 1}</div>
                      <div className="em-tl-date">{formatDate(log.sentAt)}</div>
                      <div className="em-tl-status">Status: <span className="em-tl-status-ok">Sent Successfully</span></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="em-modal-footer">
                <button className="em-modal-close-btn" onClick={() => setSelectedRegForHistory(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
