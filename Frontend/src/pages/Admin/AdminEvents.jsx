import { useEffect, useState } from "react";
import { apiAdmin } from "../../lib/apiAdmin";
import { toast } from "react-toastify";
import { useAdminEvent } from "../../context/AdminEventContext";
import FilePicker from "../../components/FilePicker";
import { Edit2, Plus, X, Image, Trash2, QrCode } from "lucide-react";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --ev-bg: #06060b; --ev-card: #0d0d16; --ev-elevated: #121220;
    --ev-border: rgba(255,255,255,0.07); --ev-accent: #ff4d00; --ev-accent2: #ffc447;
    --ev-text: #f0ece4; --ev-muted: #888898; --ev-dim: #3a3a50;
    --ev-font-d: 'Bebas Neue', sans-serif; --ev-font: 'Plus Jakarta Sans', sans-serif;
  }

  .ev-page { font-family: var(--ev-font); color: var(--ev-text); max-width: 1200px; margin: 0 auto; padding-bottom: 80px; }

  /* page header */
  .ev-header {
    display: flex; justify-content: space-between; align-items: flex-end;
    padding-bottom: 24px; margin-bottom: 32px; border-bottom: 1px solid var(--ev-border);
  }
  .ev-header h1 { font-family: var(--ev-font-d); font-size: 36px; letter-spacing: 1px; color: var(--ev-text); margin: 0 0 4px; }
  .ev-header p { font-size: 13px; color: var(--ev-muted); margin: 0; }

  /* create button */
  .ev-create-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 11px 22px; background: linear-gradient(135deg,#ff5200,#ff7033);
    border: none; border-radius: 12px; color: #fff;
    font-family: var(--ev-font); font-size: 13px; font-weight: 700;
    cursor: pointer; box-shadow: 0 6px 20px rgba(255,77,0,0.3); transition: all 0.3s;
    white-space: nowrap;
  }
  .ev-create-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(255,77,0,0.4); }

  /* events section label */
  .ev-section-label { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
  .ev-section-bar { width: 3px; height: 22px; background: var(--ev-accent); border-radius: 2px; }
  .ev-section-title { font-size: 18px; font-weight: 700; color: var(--ev-text); }

  /* events grid */
  .ev-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }

  /* empty */
  .ev-empty {
    padding: 48px 24px; background: rgba(255,255,255,0.02);
    border: 1px dashed var(--ev-border); border-radius: 20px; text-align: center;
  }
  .ev-empty p { font-size: 14px; color: var(--ev-muted); font-weight: 500; }

  /* event card */
  .ev-card {
    position: relative; background: var(--ev-card); border: 1px solid var(--ev-border);
    border-radius: 18px; overflow: hidden; cursor: pointer;
    transition: all 0.3s ease; flex-direction: column;
  }
  .ev-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.14); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
  .ev-card.active-card { border-color: rgba(255,77,0,0.5); box-shadow: 0 0 0 2px rgba(255,77,0,0.3), 0 12px 30px rgba(255,77,0,0.15); }

  .ev-card-img { height: 160px; overflow: hidden; background: #121220; position: relative; }
  .ev-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .ev-card:hover .ev-card-img img { transform: scale(1.08); }
  .ev-card-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent); }

  .ev-card-status {
    position: absolute; top: 10px; left: 10px; z-index: 5;
    font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    padding: 3px 10px; border-radius: 100px; border: 1px solid;
  }
  .ev-status-live { background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.35); color: #34d399; }
  .ev-status-draft { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); color: var(--ev-muted); }
  .ev-status-paused { background: rgba(251,191,36,0.15); border-color: rgba(251,191,36,0.35); color: #fbbf24; }
  .ev-status-closed { background: rgba(248,113,113,0.15); border-color: rgba(248,113,113,0.35); color: #f87171; }

  .ev-del-btn {
    position: absolute; top: 10px; right: 10px; z-index: 20;
    width: 30px; height: 30px; border-radius: 8px;
    background: rgba(255,255,255,0.08); backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.1); color: var(--ev-muted);
    display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
  }
  .ev-del-btn:hover { background: #f87171; color: #fff; border-color: #f87171; }

  .ev-card-body { padding: 16px; }
  .ev-card-name { font-weight: 700; font-size: 15px; color: var(--ev-text); margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .ev-card-slug { font-size: 10px; font-family: monospace; color: var(--ev-dim); background: rgba(255,255,255,0.04); padding: 2px 8px; border-radius: 5px; display: inline-block; margin-bottom: 10px; }
  .ev-card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .ev-tag {
    font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    padding: 2px 8px; border-radius: 100px; border: 1px solid;
  }
  .ev-tag-blue { background: rgba(96,165,250,0.1); border-color: rgba(96,165,250,0.25); color: #60a5fa; }
  .ev-tag-amber { background: rgba(251,191,36,0.1); border-color: rgba(251,191,36,0.25); color: #fbbf24; }

  /* ═══ EDITOR FORM ═══ */
  .ev-form {
    background: var(--ev-card); border: 1px solid rgba(255,77,0,0.25);
    border-radius: 20px; padding: 0; margin-top: 40px; overflow: hidden;
    position: relative;
  }
  .ev-form-topline {
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--ev-accent) 30%, var(--ev-accent2) 60%, transparent);
    box-shadow: 0 0 20px rgba(255,77,0,0.4);
  }
  .ev-form-inner { padding: 32px; }
  .ev-form-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid var(--ev-border);
  }
  .ev-form-title { font-family: var(--ev-font-d); font-size: 28px; color: var(--ev-text); margin: 0; display: flex; align-items: center; gap: 10px; }
  .ev-form-title-icon { color: var(--ev-accent); }
  .ev-form-name-badge {
    font-size: 11px; font-weight: 700; color: var(--ev-accent);
    background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2);
    padding: 3px 12px; border-radius: 100px; margin-left: 8px;
  }
  .ev-close-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px; background: rgba(255,255,255,0.04); border: 1px solid var(--ev-border);
    border-radius: 10px; color: var(--ev-muted); font-family: var(--ev-font); font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.2s;
  }
  .ev-close-btn:hover { color: var(--ev-accent); border-color: rgba(255,77,0,0.3); }

  /* section panel */
  .ev-panel {
    background: rgba(255,255,255,0.02); border: 1px solid var(--ev-border);
    border-radius: 16px; padding: 20px; margin-bottom: 20px;
  }
  .ev-panel-title {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--ev-border);
  }
  .ev-panel-bar { width: 3px; height: 16px; background: var(--ev-accent); border-radius: 2px; }
  .ev-panel-bar-amber { background: var(--ev-accent2); }
  .ev-panel-bar-blue { background: #60a5fa; }
  .ev-panel-bar-green { background: #34d399; }
  .ev-panel-name { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--ev-text); }

  /* inputs */
  .ev-label { font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--ev-dim); display: block; margin-bottom: 6px; }
  .ev-input, .ev-select, .ev-textarea {
    width: 100%; background: rgba(255,255,255,0.04); border: 1px solid var(--ev-border);
    border-radius: 10px; padding: 11px 14px; color: var(--ev-text);
    font-family: var(--ev-font); font-size: 13px; font-weight: 500; outline: none;
    transition: all 0.2s; box-sizing: border-box; margin-top: 0;
  }
  .ev-input::placeholder, .ev-textarea::placeholder { color: var(--ev-dim); }
  .ev-input:focus, .ev-select:focus, .ev-textarea:focus { border-color: rgba(255,77,0,0.5); box-shadow: 0 0 0 3px rgba(255,77,0,0.08); background: rgba(255,255,255,0.06); }
  .ev-select { appearance: none; cursor: pointer; }
  .ev-select option { background: #0d0d16; color: #f0ece4; }
  .ev-textarea { resize: none; }
  .ev-input-mono { font-family: monospace; }

  /* grid layouts */
  .ev-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .ev-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
  @media (max-width: 640px) { .ev-grid-2, .ev-grid-3 { grid-template-columns: 1fr; } }

  /* form row items */
  .ev-field { margin-bottom: 14px; }
  .ev-field:last-child { margin-bottom: 0; }

  /* list item row */
  .ev-list-item {
    display: flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.03); border: 1px solid var(--ev-border);
    border-radius: 10px; padding: 10px 12px; margin-bottom: 8px;
  }
  .ev-list-input {
    flex: 1; background: transparent; border: none; outline: none;
    color: var(--ev-text); font-family: var(--ev-font); font-size: 13px; font-weight: 500; padding: 0;
  }
  .ev-list-input::placeholder { color: var(--ev-dim); }
  .ev-small-input {
    background: rgba(255,255,255,0.04); border: 1px solid var(--ev-border);
    border-radius: 8px; padding: 8px 10px; color: var(--ev-text);
    font-family: var(--ev-font); font-size: 13px; outline: none;
    transition: border-color 0.2s;
  }
  .ev-small-input:focus { border-color: rgba(255,77,0,0.5); }
  .ev-small-input::placeholder { color: var(--ev-dim); }

  /* remove btn */
  .ev-remove-btn {
    width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
    background: none; border: 1px solid var(--ev-border); color: var(--ev-dim);
    display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
  }
  .ev-remove-btn:hover { background: rgba(248,113,113,0.15); border-color: rgba(248,113,113,0.35); color: #f87171; }

  /* add btn */
  .ev-add-btn {
    font-size: 12px; font-weight: 700; color: var(--ev-muted);
    background: rgba(255,255,255,0.04); border: 1px solid var(--ev-border);
    padding: 7px 16px; border-radius: 8px; cursor: pointer; font-family: var(--ev-font); transition: all 0.2s;
  }
  .ev-add-btn:hover { color: var(--ev-accent); border-color: rgba(255,77,0,0.3); }

  /* empty hint */
  .ev-list-empty { font-size: 12px; color: var(--ev-dim); font-style: italic; text-align: center; padding: 12px; }

  /* tag chip */
  .ev-chip {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.05); border: 1px solid var(--ev-border);
    color: var(--ev-muted); font-size: 12px; font-weight: 600;
    padding: 4px 10px; border-radius: 100px;
  }
  .ev-chip button { background: none; border: none; color: var(--ev-dim); cursor: pointer; font-size: 14px; line-height: 1; padding: 0 0 0 2px; }
  .ev-chip button:hover { color: #f87171; }
  .ev-chips-wrap { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
  .ev-add-chip-row { display: flex; gap: 8px; margin-top: 8px; }
  .ev-chip-input {
    flex: 1; background: rgba(255,255,255,0.04); border: 1px solid var(--ev-border);
    border-radius: 8px; padding: 8px 12px; color: var(--ev-text);
    font-family: var(--ev-font); font-size: 13px; outline: none; transition: border-color 0.2s;
  }
  .ev-chip-input::placeholder { color: var(--ev-dim); }
  .ev-chip-input:focus { border-color: rgba(255,77,0,0.5); }
  .ev-chip-add-btn {
    padding: 8px 16px; background: var(--ev-accent); color: #fff; border: none;
    border-radius: 8px; font-family: var(--ev-font); font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.2s; flex-shrink: 0;
  }
  .ev-chip-add-btn:hover { background: #e04400; }

  /* checkbox */
  .ev-check-row {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    background: rgba(255,255,255,0.03); border: 1px solid var(--ev-border);
    border-radius: 10px; cursor: pointer;
  }
  .ev-check-row input { accent-color: var(--ev-accent); width: 16px; height: 16px; cursor: pointer; }
  .ev-check-row span { font-size: 13px; font-weight: 600; color: var(--ev-text); }

  /* itinerary block */
  .ev-itin-item {
    background: rgba(255,255,255,0.03); border: 1px solid var(--ev-border);
    border-radius: 12px; padding: 14px; margin-bottom: 8px;
  }
  .ev-itin-row { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 8px; }
  .ev-day-num {
    width: 52px; flex-shrink: 0; text-align: center;
    background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2);
    border-radius: 8px; padding: 8px 4px; color: var(--ev-accent);
    font-family: var(--ev-font); font-size: 13px; font-weight: 700; outline: none;
  }

  /* assets panel */
  .ev-assets {
    background: rgba(255,255,255,0.02); border: 1px solid var(--ev-border);
    border-radius: 14px; padding: 18px;
  }
  .ev-asset-section { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--ev-border); }
  .ev-asset-section:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
  .ev-asset-name { font-size: 13px; font-weight: 700; color: var(--ev-text); margin-bottom: 2px; }
  .ev-asset-hint { font-size: 11px; color: var(--ev-dim); margin-bottom: 10px; }
  .ev-asset-img { border-radius: 10px; overflow: hidden; margin-bottom: 8px; border: 1px solid var(--ev-border); }
  .ev-asset-img img { width: 100%; height: 120px; object-fit: cover; display: block; }
  .ev-asset-empty {
    width: 100%; height: 120px; background: rgba(255,255,255,0.02);
    border: 1px dashed var(--ev-border); border-radius: 10px; margin-bottom: 8px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    color: var(--ev-dim);
  }
  .ev-asset-empty span { font-size: 11px; margin-top: 6px; }
  .ev-asset-warn {
    font-size: 11px; color: #fbbf24; background: rgba(251,191,36,0.08);
    border: 1px solid rgba(251,191,36,0.2); border-radius: 8px; padding: 8px 12px;
    margin-bottom: 12px; font-weight: 600;
  }
  .ev-qr-preview { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
  .ev-qr-img { padding: 8px; background: #fff; border-radius: 10px; border: 1px solid var(--ev-border); }
  .ev-qr-img img { width: 56px; height: 56px; object-fit: contain; display: block; }
  .ev-qr-empty {
    width: 72px; height: 72px; background: rgba(255,255,255,0.02);
    border: 1px dashed var(--ev-border); border-radius: 10px;
    display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--ev-dim);
  }
  .ev-qr-empty span { font-size: 9px; margin-top: 4px; }

  /* action buttons */
  .ev-actions { display: flex; gap: 10px; margin-top: 0; }
  .ev-cancel-btn {
    flex: 1; padding: 14px; border-radius: 12px; border: 1px solid var(--ev-border);
    background: rgba(255,255,255,0.04); color: var(--ev-muted);
    font-family: var(--ev-font); font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;
  }
  .ev-cancel-btn:hover { color: var(--ev-text); border-color: rgba(255,255,255,0.15); }
  .ev-save-btn {
    flex: 2; padding: 14px; border-radius: 12px; border: none;
    background: linear-gradient(135deg,#ff5200,#ff7033); color: #fff;
    font-family: var(--ev-font); font-size: 14px; font-weight: 700; cursor: pointer;
    box-shadow: 0 8px 24px rgba(255,77,0,0.3); transition: all 0.3s;
  }
  .ev-save-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(255,77,0,0.45); }

  /* form grid */
  .ev-form-grid { display: grid; grid-template-columns: 1fr 360px; gap: 24px; }
  @media (max-width: 1024px) { .ev-form-grid { grid-template-columns: 1fr; } }
`;

/* ── helpers ─────────────────────────────────── */
const Lbl = ({ children }) => <label className="ev-label">{children}</label>;
const Field = ({ children, className = "" }) => <div className={`ev-field${className ? " " + className : ""}`}>{children}</div>;
const SectionTitle = ({ children, color = "" }) => (
  <div className="ev-panel-title">
    <span className={`ev-panel-bar${color ? " ev-panel-bar-" + color : ""}`} />
    <span className="ev-panel-name">{children}</span>
  </div>
);

function StringListEditor({ label, items = [], onChange }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...items, v]);
    setDraft("");
  };
  return (
    <div>
      <Lbl>{label}</Lbl>
      <div className="ev-add-chip-row">
        <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), add())} placeholder={`Add ${label.toLowerCase()}…`} className="ev-chip-input" />
        <button type="button" onClick={add} className="ev-chip-add-btn">+</button>
      </div>
      <div className="ev-chips-wrap">
        {items.map((item, i) => (
          <span key={i} className="ev-chip">{item}<button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}>×</button></span>
        ))}
        {items.length === 0 && <span style={{ fontSize: 12, color: "#3a3a50", fontStyle: "italic" }}>None added yet.</span>}
      </div>
    </div>
  );
}

/* ── main ─────────────────────────────────────── */
export default function AdminEvents() {
  const { fetchEvents } = useAdminEvent();
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [mobilePosterPreview, setMobilePosterPreview] = useState(null);
  const [qrPreview, setQrPreview] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const emptyForm = {
    name: "", slug: "", description: "", type: "CLUB_EVENT",
    status: "DRAFT", isHidden: false,
    posterUrl: "", mobilePosterUrl: "", paymentQRUrl: "", googleFormLink: "",
    duration: "", pickupDrop: "", startingPrice: 0,
    itinerary: [], pricingTiers: [], tripDates: [],
    inclusions: [], exclusions: [], notes: [], cancellationPolicy: "", thingsToCarry: [],
    paid: false, basePrice: 0, familyAllowed: false, addonPricePerMember: 0, flow: [],
  };
  const [form, setForm] = useState(emptyForm);
  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const loadList = async () => {
    try {
      const res = await apiAdmin.get("/api/admin/events");
      setEvents(Array.isArray(res.data) ? res.data : []);
      fetchEvents();
    } catch { toast.error("Could not load events"); }
  };
  useEffect(() => { loadList(); }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (prompt("Type CONFIRM to delete this event permanently:") !== "CONFIRM") return;
    try {
      await apiAdmin.delete(`/api/admin/events/${id}`);
      toast.success("Event deleted");
      setEvents(prev => prev.filter(ev => ev._id !== id));
      if (editingId === id) handleReset();
    } catch { toast.error("Delete failed"); }
  };

  const handleUpload = async (type, file) => {
    if (!file) return;
    if (!editingId) return toast.warning("Save event first before uploading assets.");
    const objectUrl = URL.createObjectURL(file);
    if (type === "poster") setPosterPreview(objectUrl);
    else if (type === "mobile-poster") setMobilePosterPreview(objectUrl);
    else setQrPreview(objectUrl);
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await apiAdmin.post(`/api/admin/events/${editingId}/${type}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      const urlMap = { poster: "posterUrl", "mobile-poster": "mobilePosterUrl", qr: "paymentQRUrl" };
      const key = urlMap[type];
      const newUrl = res.data[key];
      set(key, newUrl);
      setEvents(prev => prev.map(ev => ev._id === editingId ? { ...ev, [key]: newUrl } : ev));
      toast.success(`${type === "poster" ? "Desktop Poster" : type === "mobile-poster" ? "Mobile Poster" : "QR"} uploaded!`);
    } catch { toast.error("Upload failed"); }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.slug) return toast.warning("Name and Slug are required");
    if (form.name.length < 3 || form.name.length > 80) return toast.error("Name must be 3–80 characters");
    if (form.slug.length < 1 || form.slug.length > 60) return toast.error("Slug must be 1–60 characters");
    if (form.description.length < 10 || form.description.length > 500) return toast.error("Description must be 10–500 characters");
    const { _id, createdAt, updatedAt, __v, createdBy, ...payload } = form;
    try {
      if (editingId) {
        const res = await apiAdmin.patch(`/api/admin/events/${editingId}`, payload);
        toast.success("Event updated");
        setEvents(prev => prev.map(ev => ev._id === editingId ? res.data : ev));
        setForm(res.data);
      } else {
        const res = await apiAdmin.post("/api/admin/events", payload);
        toast.success("Event created! Now upload a poster.");
        setEditingId(res.data._id);
        setForm(res.data);
        setEvents(prev => [res.data, ...prev]);
      }
    } catch (err) { toast.error(err.response?.data?.message || "Save failed"); }
  };

  const handleEditClick = (ev) => {
    setEditingId(ev._id);
    setForm({ ...emptyForm, ...ev, itinerary: ev.itinerary || [], pricingTiers: ev.pricingTiers || [], tripDates: ev.tripDates || [], inclusions: ev.inclusions || [], exclusions: ev.exclusions || [], notes: ev.notes || [], thingsToCarry: ev.thingsToCarry || [], flow: ev.flow || [] });
    setPosterPreview(ev.posterUrl || null);
    setMobilePosterPreview(ev.mobilePosterUrl || null);
    setQrPreview(ev.paymentQRUrl || null);
    setIsFormVisible(true);
  };
  const handleCreate = () => { setEditingId(null); setForm(emptyForm); setPosterPreview(null); setQrPreview(null); setIsFormVisible(true); };
  const handleReset = () => { setEditingId(null); setForm(emptyForm); setPosterPreview(null); setQrPreview(null); setIsFormVisible(false); };

  const addItineraryDay = () => set("itinerary", [...form.itinerary, { dayNumber: form.itinerary.length + 1, title: "", description: "" }]);
  const removeItineraryDay = (i) => set("itinerary", form.itinerary.filter((_, j) => j !== i));
  const updateItinerary = (i, field, val) => { const arr = [...form.itinerary]; arr[i] = { ...arr[i], [field]: val }; set("itinerary", arr); };

  const addTier = () => set("pricingTiers", [...form.pricingTiers, { roomType: "", pricePerPerson: 0 }]);
  const removeTier = (i) => set("pricingTiers", form.pricingTiers.filter((_, j) => j !== i));
  const updateTier = (i, field, val) => { const arr = [...form.pricingTiers]; arr[i] = { ...arr[i], [field]: val }; set("pricingTiers", arr); };

  const addTripDate = () => set("tripDates", [...form.tripDates, { startDate: "", endDate: "", note: "" }]);
  const removeTripDate = (i) => set("tripDates", form.tripDates.filter((_, j) => j !== i));
  const updateTripDate = (i, field, val) => { const arr = [...form.tripDates]; arr[i] = { ...arr[i], [field]: val }; set("tripDates", arr); };

  const addFlow = () => set("flow", [...form.flow, { title: "", date: "", desc: "" }]);
  const removeFlow = (i) => set("flow", form.flow.filter((_, j) => j !== i));
  const updateFlow = (i, field, val) => { const arr = [...form.flow]; arr[i] = { ...arr[i], [field]: val }; set("flow", arr); };

  const isTrip = form.type === "TRIP";

  const statusClass = (s) => {
    if (s === "LIVE") return "ev-status-live";
    if (s === "PAUSED") return "ev-status-paused";
    if (s === "CLOSED") return "ev-status-closed";
    return "ev-status-draft";
  };

  return (
    <>
      <style>{S}</style>
      <div className="ev-page">

        {/* Header */}
        <div className="ev-header">
          <div>
            <h1>Event Manager</h1>
            <p>Create and manage trips & club events.</p>
          </div>
          {!isFormVisible && (
            <button className="ev-create-btn" onClick={handleCreate}><Plus size={15} /> Create New</button>
          )}
        </div>

        {/* Event Cards */}
        <div>
          <div className="ev-section-label">
            <div className="ev-section-bar" />
            <span className="ev-section-title">Existing Events ({events.length})</span>
          </div>

          {events.length === 0 && (
            <div className="ev-empty"><p>No events yet. Click "Create New" to start.</p></div>
          )}

          <div className="ev-grid">
            {events.map(ev => (
              <div key={ev._id} className={`ev-card${editingId === ev._id && isFormVisible ? " active-card" : ""}`} onClick={() => handleEditClick(ev)}>
                <div className="ev-card-img">
                  <img src={ev.posterUrl || "https://placehold.co/400x300/0d0d16/3a3a50?text=No+Poster"} alt={ev.name}
                    onError={e => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/0d0d16/3a3a50?text=No+Image"; }} />
                  <div className="ev-card-img-overlay" />
                </div>
                <span className={`ev-card-status ${statusClass(ev.status)}`}>{ev.status}</span>
                <button className="ev-del-btn" onClick={e => handleDelete(e, ev._id)} title="Delete"><Trash2 size={12} /></button>
                <div className="ev-card-body">
                  <div className="ev-card-name">{ev.name}</div>
                  <div className="ev-card-slug">{ev.slug}</div>
                  <div className="ev-card-tags">
                    <span className="ev-tag ev-tag-blue">{ev.type === "TRIP" ? "Trip" : "Club Event"}</span>
                    {ev.isHidden && <span className="ev-tag ev-tag-amber">Hidden</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor Form */}
        {isFormVisible && (
          <div className="ev-form">
            <div className="ev-form-topline" />
            <div className="ev-form-inner">
              <div className="ev-form-header">
                <div className="ev-form-title">
                  {editingId ? <Edit2 size={20} className="ev-form-title-icon" /> : <Plus size={20} className="ev-form-title-icon" />}
                  {editingId ? "Editing Event" : "Create New Event"}
                  {editingId && <span className="ev-form-name-badge">{form.name}</span>}
                </div>
                <button className="ev-close-btn" onClick={handleReset}><X size={14} /> Close</button>
              </div>

              <div className="ev-form-grid">

                {/* LEFT: content */}
                <div>

                  {/* Core Details */}
                  <div className="ev-panel">
                    <SectionTitle>Core Details</SectionTitle>
                    <div className="ev-grid-2">
                      <Field>
                        <Lbl>Name</Lbl>
                        <input className="ev-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="E.g. Kasol Trek 2026" />
                      </Field>
                      <Field>
                        <Lbl>Slug (URL)</Lbl>
                        <input className="ev-input ev-input-mono" value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="kasol-trek" />
                      </Field>
                    </div>
                    <div className="ev-grid-2" style={{ marginTop: 14 }}>
                      <Field>
                        <Lbl>Type</Lbl>
                        <select className="ev-select" value={form.type} onChange={e => set("type", e.target.value)}>
                          <option value="TRIP">Trip</option>
                          <option value="CLUB_EVENT">Club Event</option>
                        </select>
                      </Field>
                      <Field>
                        <Lbl>Google Form Link</Lbl>
                        <input className="ev-input" value={form.googleFormLink} onChange={e => set("googleFormLink", e.target.value)} placeholder="https://forms.gle/…" />
                      </Field>
                    </div>
                    <Field style={{ marginTop: 14 }}>
                      <Lbl>Description</Lbl>
                      <textarea className="ev-textarea" style={{ height: 80 }} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Short description shown in listings (10–500 chars)" />
                    </Field>
                  </div>

                  {/* Trip Fields */}
                  {isTrip && (
                    <>
                      <div className="ev-panel">
                        <SectionTitle color="amber">Trip Info</SectionTitle>
                        <div className="ev-grid-3">
                          <Field>
                            <Lbl>Duration</Lbl>
                            <input className="ev-input" value={form.duration} onChange={e => set("duration", e.target.value)} placeholder="2N-3D" />
                          </Field>
                          <Field>
                            <Lbl>Pickup & Drop</Lbl>
                            <input className="ev-input" value={form.pickupDrop} onChange={e => set("pickupDrop", e.target.value)} placeholder="Delhi" />
                          </Field>
                          <Field>
                            <Lbl>Starting Price (₹)</Lbl>
                            <input type="number" className="ev-input" value={form.startingPrice} onChange={e => set("startingPrice", Number(e.target.value))} />
                          </Field>
                        </div>
                      </div>

                      <div className="ev-panel">
                        <SectionTitle color="amber">Pricing Tiers</SectionTitle>
                        {form.pricingTiers.map((tier, i) => (
                          <div key={i} className="ev-list-item">
                            <input className="ev-list-input" placeholder="Room type (e.g. Quad Sharing)" value={tier.roomType} onChange={e => updateTier(i, "roomType", e.target.value)} />
                            <input type="number" className="ev-small-input" style={{ width: 110 }} placeholder="Price/person" value={tier.pricePerPerson} onChange={e => updateTier(i, "pricePerPerson", Number(e.target.value))} />
                            <button className="ev-remove-btn" onClick={() => removeTier(i)}><X size={12} /></button>
                          </div>
                        ))}
                        {form.pricingTiers.length === 0 && <p className="ev-list-empty">No pricing tiers added.</p>}
                        <button className="ev-add-btn" onClick={addTier}>+ Add Tier</button>
                      </div>

                      <div className="ev-panel">
                        <SectionTitle color="amber">Trip Dates</SectionTitle>
                        {form.tripDates.map((d, i) => (
                          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--ev-border)", borderRadius: 10, padding: 12, marginBottom: 8 }}>
                            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                              <div style={{ flex: 1 }}>
                                <Lbl>Start</Lbl>
                                <input type="date" className="ev-small-input" style={{ width: "100%", colorScheme: "dark" }} value={d.startDate ? d.startDate.slice(0, 10) : ""} onChange={e => updateTripDate(i, "startDate", e.target.value)} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <Lbl>End</Lbl>
                                <input type="date" className="ev-small-input" style={{ width: "100%", colorScheme: "dark" }} value={d.endDate ? d.endDate.slice(0, 10) : ""} onChange={e => updateTripDate(i, "endDate", e.target.value)} />
                              </div>
                              <button className="ev-remove-btn" style={{ marginTop: 20 }} onClick={() => removeTripDate(i)}><X size={12} /></button>
                            </div>
                            <input className="ev-small-input" style={{ width: "100%", boxSizing: "border-box" }} placeholder='Note (e.g. "Limited Seats")' value={d.note} onChange={e => updateTripDate(i, "note", e.target.value)} />
                          </div>
                        ))}
                        {form.tripDates.length === 0 && <p className="ev-list-empty">No dates added.</p>}
                        <button className="ev-add-btn" onClick={addTripDate}>+ Add Date</button>
                      </div>

                      <div className="ev-panel">
                        <SectionTitle color="amber">Day-wise Itinerary</SectionTitle>
                        {form.itinerary.map((day, i) => (
                          <div key={i} className="ev-itin-item">
                            <div className="ev-itin-row">
                              <input type="number" className="ev-day-num" value={day.dayNumber} onChange={e => updateItinerary(i, "dayNumber", Number(e.target.value))} />
                              <input className="ev-small-input" style={{ flex: 1 }} placeholder="Day title" value={day.title} onChange={e => updateItinerary(i, "title", e.target.value)} />
                              <button className="ev-remove-btn" onClick={() => removeItineraryDay(i)}><X size={12} /></button>
                            </div>
                            <textarea className="ev-small-input" style={{ width: "100%", height: 56, resize: "none", boxSizing: "border-box" }} placeholder="Description (optional)" value={day.description || ""} onChange={e => updateItinerary(i, "description", e.target.value)} />
                          </div>
                        ))}
                        {form.itinerary.length === 0 && <p className="ev-list-empty">No itinerary days added.</p>}
                        <button className="ev-add-btn" onClick={addItineraryDay}>+ Add Day</button>
                      </div>

                      <div className="ev-panel">
                        <SectionTitle color="green">Inclusions & Exclusions</SectionTitle>
                        <div style={{ marginBottom: 20 }}><StringListEditor label="Inclusions" items={form.inclusions} onChange={v => set("inclusions", v)} /></div>
                        <StringListEditor label="Exclusions" items={form.exclusions} onChange={v => set("exclusions", v)} />
                      </div>

                      <div className="ev-panel">
                        <SectionTitle color="green">Notes & Things to Carry</SectionTitle>
                        <div style={{ marginBottom: 20 }}><StringListEditor label="Notes" items={form.notes} onChange={v => set("notes", v)} /></div>
                        <StringListEditor label="Things to Carry" items={form.thingsToCarry} onChange={v => set("thingsToCarry", v)} />
                      </div>

                      <div className="ev-panel">
                        <SectionTitle>Cancellation Policy</SectionTitle>
                        <textarea className="ev-textarea" style={{ height: 100 }} value={form.cancellationPolicy} onChange={e => set("cancellationPolicy", e.target.value)} placeholder="Describe the cancellation and refund policy…" />
                      </div>
                    </>
                  )}

                  {/* Club Event Fields */}
                  {!isTrip && (
                    <>
                      <div className="ev-panel">
                        <SectionTitle color="amber">Pricing</SectionTitle>
                        <label className="ev-check-row" style={{ marginBottom: 12 }}>
                          <input type="checkbox" checked={form.paid} onChange={e => set("paid", e.target.checked)} />
                          <span>Paid Event</span>
                        </label>
                        {form.paid && (
                          <div style={{ paddingLeft: 8 }}>
                            <Field>
                              <Lbl>Base Price (INR)</Lbl>
                              <input type="number" className="ev-input" style={{ maxWidth: 240 }} value={form.basePrice} onChange={e => set("basePrice", Number(e.target.value))} />
                            </Field>
                            <label className="ev-check-row" style={{ margin: "12px 0" }}>
                              <input type="checkbox" checked={form.familyAllowed} onChange={e => set("familyAllowed", e.target.checked)} />
                              <span>Allow Family Members</span>
                            </label>
                            {form.familyAllowed && (
                              <Field>
                                <Lbl>Add-on Price per Member (INR)</Lbl>
                                <input type="number" className="ev-input" style={{ maxWidth: 240 }} value={form.addonPricePerMember} onChange={e => set("addonPricePerMember", Number(e.target.value))} />
                              </Field>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="ev-panel">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid var(--ev-border)" }}>
                          <div className="ev-panel-title" style={{ margin: 0, padding: 0, border: "none" }}>
                            <span className="ev-panel-bar" /><span className="ev-panel-name">Event Timeline</span>
                          </div>
                          <button className="ev-add-btn" onClick={addFlow}>+ Add Activity</button>
                        </div>
                        {form.flow.map((item, i) => (
                          <div key={i} className="ev-itin-item">
                            <div className="ev-itin-row">
                              <input className="ev-small-input" style={{ width: "25%" }} placeholder="10:00 AM" value={item.date} onChange={e => updateFlow(i, "date", e.target.value)} />
                              <input className="ev-small-input" style={{ flex: 1 }} placeholder="Activity Title" value={item.title} onChange={e => updateFlow(i, "title", e.target.value)} />
                              <button className="ev-remove-btn" onClick={() => removeFlow(i)}><X size={12} /></button>
                            </div>
                            <textarea className="ev-small-input" style={{ width: "100%", height: 52, resize: "none", boxSizing: "border-box" }} placeholder="Description (optional)" value={item.desc || ""} onChange={e => updateFlow(i, "desc", e.target.value)} />
                          </div>
                        ))}
                        {form.flow.length === 0 && <p className="ev-list-empty">No timeline items added.</p>}
                      </div>
                    </>
                  )}
                </div>

                {/* RIGHT: settings & assets */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                  {/* Publish Status */}
                  <div className="ev-panel">
                    <SectionTitle color="blue">Publish Status</SectionTitle>
                    <Field>
                      <Lbl>Status</Lbl>
                      <select className="ev-select" value={form.status} onChange={e => set("status", e.target.value)}>
                        <option value="DRAFT">Draft (Hidden)</option>
                        <option value="LIVE">Live (Active)</option>
                        <option value="PAUSED">Paused</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                    </Field>
                    <label className="ev-check-row" style={{ marginTop: 12 }}>
                      <input type="checkbox" checked={form.isHidden} onChange={e => set("isHidden", e.target.checked)} />
                      <span>Hide from Public Page</span>
                    </label>
                  </div>

                  {/* Assets */}
                  <div className="ev-panel" style={{ opacity: editingId ? 1 : 0.6, pointerEvents: editingId ? "all" : "none" }}>
                    <SectionTitle><Image size={13} style={{ display: "inline", marginRight: 6 }} />Assets</SectionTitle>
                    {!editingId && <div className="ev-asset-warn">Save event first to upload assets.</div>}

                    <div className="ev-assets">
                      {/* Desktop Poster */}
                      <div className="ev-asset-section">
                        <div className="ev-asset-name">Desktop Poster</div>
                        <div className="ev-asset-hint">Landscape · 1920×1080 px (16:9)</div>
                        {posterPreview
                          ? <div className="ev-asset-img"><img src={posterPreview} alt="Poster" /></div>
                          : <div className="ev-asset-empty"><Image size={20} /><span>No Image</span></div>
                        }
                        <FilePicker label={posterPreview ? "Change Desktop Poster" : "Upload Desktop Poster"} onChange={e => handleUpload("poster", e.target.files[0])} />
                      </div>

                      {/* Mobile Poster */}
                      <div className="ev-asset-section">
                        <div className="ev-asset-name">Mobile Poster</div>
                        <div className="ev-asset-hint">Portrait · 1080×1350 px (4:5)</div>
                        {mobilePosterPreview
                          ? <div className="ev-asset-img"><img src={mobilePosterPreview} alt="Mobile Poster" style={{ height: 160, objectFit: "cover" }} /></div>
                          : <div className="ev-asset-empty"><Image size={20} /><span>No Image</span></div>
                        }
                        <FilePicker label={mobilePosterPreview ? "Change Mobile Poster" : "Upload Mobile Poster"} onChange={e => handleUpload("mobile-poster", e.target.files[0])} />
                      </div>

                      {/* QR */}
                      {!isTrip && form.paid && (
                        <div className="ev-asset-section">
                          <div className="ev-asset-name">Payment QR</div>
                          <div className="ev-qr-preview">
                            {qrPreview
                              ? <div className="ev-qr-img"><img src={qrPreview} alt="QR" /></div>
                              : <div className="ev-qr-empty"><QrCode size={20} /><span>No QR</span></div>
                            }
                            <FilePicker label={qrPreview ? "Change QR" : "Upload QR"} onChange={e => handleUpload("qr", e.target.files[0])} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="ev-actions">
                    <button className="ev-cancel-btn" onClick={handleReset}>Cancel</button>
                    <button className="ev-save-btn" onClick={handleSubmit}>{editingId ? "Save Changes" : "Create Event"}</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
