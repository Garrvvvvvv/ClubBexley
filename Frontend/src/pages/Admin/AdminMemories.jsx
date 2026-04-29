import { useEffect, useState } from "react";
import { useAdminEvent } from "../../context/AdminEventContext";
import { apiAdmin } from "../../lib/apiAdmin";
import { compressImage } from "../../lib/imageUtils";
import { toast } from "react-toastify";
import { Image, Upload, Trash2, X, Camera, Globe, CheckCircle, Download, Loader } from "lucide-react";

const TABS = { EVENT: "EVENT", GLOBAL: "GLOBAL" };
const GLOBAL_CATS = {
  home_announcement: "Announcements Carousel",
  home_memories: "Memories Section",
};

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --mm-bg: #06060b; --mm-card: #0d0d16; --mm-elevated: #121220;
    --mm-border: rgba(255,255,255,0.07); --mm-accent: #ff4d00; --mm-accent2: #ffc447;
    --mm-text: #f0ece4; --mm-muted: #888898; --mm-dim: #3a3a50;
    --mm-purple: #a78bfa;
    --mm-font-d: 'Bebas Neue', sans-serif; --mm-font: 'Plus Jakarta Sans', sans-serif;
  }

  .mm-page { font-family: var(--mm-font); color: var(--mm-text); max-width: 1400px; margin: 0 auto; padding-bottom: 80px; }

  /* page header */
  .mm-header {
    display: flex; flex-wrap: wrap; justify-content: space-between;
    align-items: flex-start; gap: 20px;
    padding-bottom: 24px; margin-bottom: 24px;
    border-bottom: 1px solid var(--mm-border);
  }
  .mm-header h1 {
    font-family: var(--mm-font-d); font-size: 36px; letter-spacing: 1px;
    color: var(--mm-text); margin: 0 0 4px; display: flex; align-items: center; gap: 12px;
  }
  .mm-header-icon { color: var(--mm-accent); }
  .mm-header p { font-size: 13px; color: var(--mm-muted); margin: 0; }

  /* tab switcher */
  .mm-tabs {
    display: flex; background: rgba(255,255,255,0.04);
    border: 1px solid var(--mm-border); border-radius: 12px; padding: 4px;
  }
  .mm-tab {
    padding: 9px 18px; border-radius: 9px; font-family: var(--mm-font);
    font-size: 13px; font-weight: 700; border: none; cursor: pointer;
    display: flex; align-items: center; gap: 7px; transition: all 0.2s;
    background: none;
  }
  .mm-tab-inactive { color: var(--mm-muted); }
  .mm-tab-inactive:hover { color: var(--mm-text); }
  .mm-tab-active-orange { background: linear-gradient(135deg,#ff5200,#ff7033); color: #fff; box-shadow: 0 4px 14px rgba(255,77,0,0.3); }
  .mm-tab-active-purple { background: rgba(167,139,250,0.2); color: var(--mm-purple); border: 1px solid rgba(167,139,250,0.3); }

  /* empty event */
  .mm-no-event {
    min-height: 50vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: var(--mm-card); border: 1px solid var(--mm-border); border-radius: 20px;
  }
  .mm-no-event-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2);
    display: flex; align-items: center; justify-content: center; color: var(--mm-accent); margin-bottom: 20px;
  }
  .mm-no-event p { font-size: 15px; font-weight: 600; color: var(--mm-muted); }

  /* upload bar */
  .mm-upload-bar {
    background: var(--mm-card); border: 1px solid var(--mm-border);
    border-radius: 20px; padding: 24px; margin-bottom: 20px;
    display: flex; flex-wrap: wrap; align-items: center; gap: 20px;
    position: relative; overflow: hidden;
  }
  .mm-upload-accent-line {
    position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
    background: linear-gradient(180deg, var(--mm-accent), var(--mm-accent2));
  }
  .mm-upload-bar-purple .mm-upload-accent-line { background: linear-gradient(180deg, var(--mm-purple), #c084fc); }
  .mm-upload-label {
    font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--mm-dim); display: block; margin-bottom: 8px;
  }
  .mm-upload-label em { color: var(--mm-accent); font-style: normal; }
  .mm-upload-label-purple em { color: var(--mm-purple); }
  .mm-file-input {
    width: 100%;
    background: rgba(255,255,255,0.03); border: 1px solid var(--mm-border);
    border-radius: 10px; padding: 10px 14px; color: var(--mm-text);
    font-family: var(--mm-font); font-size: 13px; outline: none; cursor: pointer;
    transition: all 0.2s;
  }
  .mm-file-input:focus { border-color: rgba(255,77,0,0.5); }
  .mm-file-input::file-selector-button {
    background: var(--mm-accent); color: #fff; border: none;
    padding: 4px 12px; border-radius: 6px; font-size: 11px; font-weight: 700;
    cursor: pointer; margin-right: 12px; transition: all 0.2s;
  }
  .mm-file-input-purple::file-selector-button { background: var(--mm-purple); color: #fff; }

  /* buttons */
  .mm-btn {
    display: flex; align-items: center; justify-content: center; gap: 7px;
    padding: 10px 20px; border-radius: 10px; font-family: var(--mm-font);
    font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; border: 1px solid;
    white-space: nowrap;
  }
  .mm-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .mm-btn-ghost { background: rgba(255,255,255,0.04); border-color: var(--mm-border); color: var(--mm-muted); }
  .mm-btn-ghost:not(:disabled):hover { color: var(--mm-text); border-color: rgba(255,255,255,0.15); }
  .mm-btn-primary { background: linear-gradient(135deg,#ff5200,#ff7033); border-color: transparent; color: #fff; box-shadow: 0 4px 14px rgba(255,77,0,0.25); }
  .mm-btn-primary:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,77,0,0.35); }
  .mm-btn-purple { background: rgba(167,139,250,0.15); border-color: rgba(167,139,250,0.3); color: var(--mm-purple); }
  .mm-btn-purple:not(:disabled):hover { background: rgba(167,139,250,0.25); }
  .mm-btn-divider { width: 1px; height: 32px; background: var(--mm-border); }

  /* global: category selector */
  .mm-cat-grid { display: flex; flex-direction: column; gap: 8px; min-width: 200px; }
  .mm-cat-btn {
    padding: 12px 16px; border-radius: 12px; font-family: var(--mm-font);
    font-size: 13px; font-weight: 700; border: 1px solid; cursor: pointer;
    text-align: left; transition: all 0.2s;
  }
  .mm-cat-active { background: rgba(167,139,250,0.15); border-color: rgba(167,139,250,0.35); color: var(--mm-purple); }
  .mm-cat-inactive { background: rgba(255,255,255,0.03); border-color: var(--mm-border); color: var(--mm-muted); }
  .mm-cat-inactive:hover { color: var(--mm-text); border-color: rgba(255,255,255,0.15); }

  /* gallery grid */
  .mm-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
  .mm-img-card {
    position: relative; border-radius: 16px; overflow: hidden;
    background: var(--mm-card); border: 1px solid var(--mm-border);
    aspect-ratio: 4/3; transition: all 0.3s ease;
  }
  .mm-img-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.15); }
  .mm-img-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .mm-img-overlay {
    position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: flex-end;
    padding: 12px; opacity: 0; transition: opacity 0.3s;
    background: linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%);
  }
  .mm-img-card:hover .mm-img-overlay { opacity: 1; }
  .mm-del-btn {
    width: 36px; height: 36px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.1); backdrop-filter: blur(6px); color: #fff;
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    transition: all 0.2s;
  }
  .mm-del-btn:hover { background: #f87171; border-color: #f87171; }

  /* gallery states */
  .mm-gallery-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 24px; color: var(--mm-muted); }
  .mm-gallery-loading p { margin-top: 16px; font-size: 13px; font-weight: 500; }
  .mm-spin { animation: mmSpin 0.7s linear infinite; }
  @keyframes mmSpin { to { transform: rotate(360deg); } }
  .mm-gallery-empty {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 72px 24px; background: var(--mm-card); border: 1px dashed var(--mm-border); border-radius: 20px;
  }
  .mm-gallery-empty-icon { color: var(--mm-dim); margin-bottom: 16px; }
  .mm-gallery-empty p { font-size: 15px; font-weight: 700; color: var(--mm-muted); margin: 0 0 6px; }
  .mm-gallery-empty small { font-size: 12px; color: var(--mm-dim); }

  /* import modal */
  .mm-modal-overlay { position: fixed; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; padding: 16px; background: rgba(0,0,0,0.8); backdrop-filter: blur(12px); }
  .mm-modal {
    background: var(--mm-card); border: 1px solid var(--mm-border);
    border-radius: 24px; width: 100%; max-width: 1000px; max-height: 90vh;
    display: flex; flex-direction: column; overflow: hidden;
    box-shadow: 0 40px 100px rgba(0,0,0,0.7);
  }
  .mm-modal-header {
    padding: 22px 28px; border-bottom: 1px solid var(--mm-border);
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(255,255,255,0.02); flex-shrink: 0;
  }
  .mm-modal-title { font-family: var(--mm-font-d); font-size: 26px; color: var(--mm-text); margin: 0; display: flex; align-items: center; gap: 10px; }
  .mm-modal-title-icon { color: var(--mm-accent); }
  .mm-modal-close {
    width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.06);
    border: 1px solid var(--mm-border); display: flex; align-items: center; justify-content: center;
    color: var(--mm-muted); cursor: pointer; transition: all 0.2s;
  }
  .mm-modal-close:hover { color: var(--mm-accent); border-color: rgba(255,77,0,0.3); }
  .mm-modal-body { flex: 1; overflow-y: auto; padding: 28px; background: rgba(255,255,255,0.01); }
  .mm-modal-select-wrap { max-width: 480px; margin-bottom: 28px; }
  .mm-modal-select-label { font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--mm-dim); display: block; margin-bottom: 8px; }
  .mm-modal-select {
    width: 100%; background: rgba(255,255,255,0.04); border: 1px solid var(--mm-border);
    border-radius: 12px; padding: 12px 16px; color: var(--mm-text);
    font-family: var(--mm-font); font-size: 14px; font-weight: 600;
    outline: none; appearance: none; cursor: pointer; transition: all 0.2s; box-sizing: border-box;
  }
  .mm-modal-select:focus { border-color: rgba(255,77,0,0.5); box-shadow: 0 0 0 3px rgba(255,77,0,0.08); }
  .mm-modal-select option { background: #0d0d16; color: #f0ece4; }
  .mm-import-bar {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--mm-border);
    flex-wrap: wrap; gap: 14px;
  }
  .mm-import-bar h3 { font-family: var(--mm-font-d); font-size: 20px; color: var(--mm-text); margin: 0 0 4px; }
  .mm-import-bar p { font-size: 12px; color: var(--mm-muted); margin: 0; }
  .mm-selected-count { font-size: 12px; font-weight: 700; color: var(--mm-accent); background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2); padding: 4px 14px; border-radius: 100px; }
  .mm-import-actions { display: flex; align-items: center; gap: 10px; }
  .mm-select-all-btn {
    font-size: 12px; font-weight: 700; color: var(--mm-muted); background: rgba(255,255,255,0.04);
    border: 1px solid var(--mm-border); padding: 5px 14px; border-radius: 100px; cursor: pointer;
    font-family: var(--mm-font); transition: all 0.2s;
  }
  .mm-select-all-btn:hover { color: var(--mm-text); border-color: rgba(255,255,255,0.15); }
  /* import photo grid */
  .mm-import-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
  .mm-import-photo {
    position: relative; aspect-ratio: 1; border-radius: 14px; overflow: hidden; cursor: pointer;
    border: 2px solid transparent; transition: all 0.2s;
  }
  .mm-import-photo:hover { border-color: rgba(255,255,255,0.2); transform: scale(1.02); }
  .mm-import-photo.selected { border-color: var(--mm-accent); box-shadow: 0 0 16px rgba(255,77,0,0.3); transform: scale(0.97); }
  .mm-import-photo img { width: 100%; height: 100%; object-fit: cover; display: block; background: #121220; }
  .mm-import-photo-overlay { position: absolute; inset: 0; transition: opacity 0.2s; }
  .mm-import-photo.selected .mm-import-photo-overlay { background: rgba(255,77,0,0.25); }
  .mm-import-check {
    position: absolute; top: 8px; right: 8px;
    color: var(--mm-accent); background: #fff; border-radius: 50%; padding: 1px;
  }
  .mm-modal-footer {
    padding: 16px 28px; border-top: 1px solid var(--mm-border);
    background: rgba(255,255,255,0.01); display: flex; justify-content: flex-end; gap: 10px; flex-shrink: 0;
  }
  .mm-modal-cancel {
    padding: 10px 20px; background: none; border: 1px solid var(--mm-border);
    border-radius: 10px; color: var(--mm-muted); font-family: var(--mm-font); font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.2s;
  }
  .mm-modal-cancel:hover { color: var(--mm-text); border-color: rgba(255,255,255,0.15); }
`;

export default function AdminMemories() {
  const { activeEvent } = useAdminEvent();
  const [tab, setTab] = useState(TABS.EVENT);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalImages, setGlobalImages] = useState([]);
  const [globalCat, setGlobalCat] = useState("home_announcement");
  const [showImportModal, setShowImportModal] = useState(false);
  const [importEvents, setImportEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [sourcePhotos, setSourcePhotos] = useState([]);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState(new Set());
  const [importing, setImporting] = useState(false);

  const loadEventPhotos = async () => {
    if (!activeEvent) return;
    setLoading(true);
    try {
      const res = await apiAdmin.get(`/api/admin/events/${activeEvent._id}/photos`);
      setImages(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const uploadEventPhoto = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const compressedFile = await compressImage(file, { quality: 0.85 });
      const form = new FormData();
      form.append("image", compressedFile);
      await apiAdmin.post(`/api/admin/events/${activeEvent._id}/photos`, form);
      setFile(null);
      document.getElementById("event-upload").value = "";
      loadEventPhotos();
      toast.success("Photo uploaded successfully!");
    } catch { toast.error("Failed to upload photo"); }
    finally { setUploading(false); }
  };

  const deleteEventPhoto = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this photo?")) return;
    try {
      await apiAdmin.delete(`/api/admin/events/${activeEvent._id}/photos/${id}`);
      loadEventPhotos();
      toast.success("Photo deleted");
    } catch { toast.error("Delete failed"); }
  };

  const openImportModal = async () => {
    setShowImportModal(true);
    try {
      const res = await apiAdmin.get("/api/admin/events");
      setImportEvents(res.data.filter(e => e._id !== activeEvent._id));
    } catch (e) { console.error(e); }
  };

  const handleSourceEventChange = async (e) => {
    const evtId = e.target.value;
    setSelectedEventId(evtId);
    setSourcePhotos([]);
    setSelectedPhotoIds(new Set());
    if (!evtId) return;
    setLoading(true);
    try {
      const res = await apiAdmin.get(`/api/admin/events/${evtId}/photos`);
      setSourcePhotos(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const togglePhotoSelection = (id) => {
    const s = new Set(selectedPhotoIds);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelectedPhotoIds(s);
  };

  const toggleSelectAll = () => {
    setSelectedPhotoIds(selectedPhotoIds.size === sourcePhotos.length ? new Set() : new Set(sourcePhotos.map(p => p._id)));
  };

  const executeImport = async () => {
    if (selectedPhotoIds.size === 0) return;
    setImporting(true);
    try {
      const selectedPhotos = sourcePhotos.filter(p => selectedPhotoIds.has(p._id));
      await apiAdmin.post(`/api/admin/events/${activeEvent._id}/photos/import`, {
        sourceEventId: selectedEventId,
        photos: selectedPhotos.map(p => ({ url: p.url, public_id: p.public_id }))
      });
      toast.success("Photos imported successfully!");
      setShowImportModal(false);
      loadEventPhotos();
    } catch { toast.error("Import failed"); }
    finally { setImporting(false); }
  };

  const loadGlobalPhotos = async () => {
    setLoading(true);
    try {
      const res = await apiAdmin.get("/api/admin/images", { params: { category: globalCat } });
      setGlobalImages(res.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const uploadGlobalPhoto = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const compressedFile = await compressImage(file, { quality: 0.85 });
      const form = new FormData();
      form.append("image", compressedFile);
      form.append("category", globalCat);
      await apiAdmin.post("/api/admin/images/upload", form);
      setFile(null);
      document.getElementById("global-upload").value = "";
      loadGlobalPhotos();
      toast.success("Global photo uploaded!");
    } catch { toast.error("Failed to upload global photo"); }
    finally { setUploading(false); }
  };

  const deleteGlobalPhoto = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this global photo?")) return;
    try {
      await apiAdmin.delete(`/api/admin/images/${id}`);
      loadGlobalPhotos();
      toast.success("Photo deleted");
    } catch { toast.error("Delete failed"); }
  };

  useEffect(() => {
    if (tab === TABS.EVENT && activeEvent) loadEventPhotos();
    else if (tab === TABS.GLOBAL) loadGlobalPhotos();
  }, [tab, activeEvent, globalCat]);

  return (
    <>
      <style>{S}</style>
      <div className="mm-page">

        {/* Header */}
        <div className="mm-header">
          <div>
            <h1><Image size={28} className="mm-header-icon" /> Gallery Manager</h1>
            <p>Manage event memories and global website imagery.</p>
          </div>
          <div className="mm-tabs">
            <button
              className={`mm-tab ${tab === TABS.EVENT ? "mm-tab-active-orange" : "mm-tab-inactive"}`}
              onClick={() => setTab(TABS.EVENT)}
            >
              <Camera size={14} /> Event Photos
            </button>
            <button
              className={`mm-tab ${tab === TABS.GLOBAL ? "mm-tab-active-purple" : "mm-tab-inactive"}`}
              onClick={() => setTab(TABS.GLOBAL)}
            >
              <Globe size={14} /> Global Assets
            </button>
          </div>
        </div>

        {/* Event Tab */}
        {tab === TABS.EVENT && (
          !activeEvent ? (
            <div className="mm-no-event">
              <div className="mm-no-event-icon"><Camera size={28} /></div>
              <p>Please select an event from the sidebar first.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Upload Bar */}
              <div className="mm-upload-bar">
                <div className="mm-upload-accent-line" />
                <div style={{ flex: 1, paddingLeft: 16 }}>
                  <label className="mm-upload-label">Upload to <em>{activeEvent.name}</em></label>
                  <input id="event-upload" type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="mm-file-input" />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  <button className="mm-btn mm-btn-ghost" onClick={uploadEventPhoto} disabled={!file || uploading}>
                    {uploading ? <Loader size={14} className="mm-spin" /> : <Upload size={14} />}
                    {uploading ? "Uploading…" : "Upload Photo"}
                  </button>
                  <div className="mm-btn-divider" />
                  <button className="mm-btn mm-btn-primary" onClick={openImportModal}>
                    <Download size={14} /> Import Photos
                  </button>
                </div>
              </div>
              <GalleryGrid images={images} onDelete={deleteEventPhoto} loading={loading} />
            </div>
          )
        )}

        {/* Global Tab */}
        {tab === TABS.GLOBAL && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="mm-upload-bar mm-upload-bar-purple">
              <div className="mm-upload-accent-line" />
              <div style={{ paddingLeft: 16, display: "flex", gap: 28, flexWrap: "wrap", flex: 1 }}>
                {/* Category selector */}
                <div>
                  <label className="mm-upload-label mm-upload-label-purple">Global Category</label>
                  <div className="mm-cat-grid">
                    {Object.entries(GLOBAL_CATS).map(([key, label]) => (
                      <button key={key} className={`mm-cat-btn ${globalCat === key ? "mm-cat-active" : "mm-cat-inactive"}`} onClick={() => setGlobalCat(key)}>{label}</button>
                    ))}
                  </div>
                </div>
                {/* Upload form */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 12 }}>
                  <div>
                    <label className="mm-upload-label mm-upload-label-purple">Upload New Global Asset</label>
                    <input id="global-upload" type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="mm-file-input mm-file-input-purple" />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button className="mm-btn mm-btn-purple" onClick={uploadGlobalPhoto} disabled={!file || uploading}>
                      {uploading ? <Loader size={14} className="mm-spin" /> : <Upload size={14} />}
                      {uploading ? "Uploading…" : "Upload to Global"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <GalleryGrid images={globalImages} onDelete={deleteGlobalPhoto} loading={loading} />
          </div>
        )}

        {/* Import Modal */}
        {showImportModal && (
          <div className="mm-modal-overlay">
            <div className="mm-modal">
              <div className="mm-modal-header">
                <div className="mm-modal-title"><Download size={20} className="mm-modal-title-icon" /> Import Memories</div>
                <button className="mm-modal-close" onClick={() => setShowImportModal(false)}><X size={14} /></button>
              </div>
              <div className="mm-modal-body">
                <div className="mm-modal-select-wrap">
                  <label className="mm-modal-select-label">Select Source Event</label>
                  <select className="mm-modal-select" value={selectedEventId} onChange={handleSourceEventChange}>
                    <option value="">-- Choose an event to copy from --</option>
                    {importEvents.map(evt => <option key={evt._id} value={evt._id}>{evt.name}</option>)}
                  </select>
                </div>

                {selectedEventId && (
                  <div>
                    <div className="mm-import-bar">
                      <div>
                        <h3>Select Photos to Clone</h3>
                        <p>These photos will be copied into {activeEvent?.name}</p>
                      </div>
                      <div className="mm-import-actions">
                        <span className="mm-selected-count">{selectedPhotoIds.size} selected</span>
                        <button className="mm-select-all-btn" onClick={toggleSelectAll}>
                          {selectedPhotoIds.size === sourcePhotos.length ? "Deselect All" : "Select All"}
                        </button>
                      </div>
                    </div>

                    {loading ? (
                      <div className="mm-gallery-loading" style={{ padding: "48px 24px" }}>
                        <Loader size={32} className="mm-spin" />
                        <p>Loading gallery…</p>
                      </div>
                    ) : sourcePhotos.length === 0 ? (
                      <div className="mm-gallery-empty" style={{ border: "2px dashed" }}>
                        <Image size={40} className="mm-gallery-empty-icon" />
                        <p>No photos found in this event.</p>
                      </div>
                    ) : (
                      <div className="mm-import-grid">
                        {sourcePhotos.map(img => {
                          const sel = selectedPhotoIds.has(img._id);
                          return (
                            <div key={img._id} className={`mm-import-photo${sel ? " selected" : ""}`} onClick={() => togglePhotoSelection(img._id)}>
                              <img src={img.url} alt="" />
                              <div className="mm-import-photo-overlay" />
                              {sel && <div className="mm-import-check"><CheckCircle size={22} /></div>}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="mm-modal-footer">
                <button className="mm-modal-cancel" onClick={() => setShowImportModal(false)}>Cancel</button>
                <button
                  className="mm-btn mm-btn-primary"
                  onClick={executeImport}
                  disabled={selectedPhotoIds.size === 0 || importing}
                >
                  {importing ? <Loader size={14} className="mm-spin" /> : <Download size={14} />}
                  {importing ? "Importing…" : `Pull in ${selectedPhotoIds.size} Photos`}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

function GalleryGrid({ images, onDelete, loading }) {
  if (loading) return (
    <div className="mm-gallery-loading">
      <Loader size={32} className="mm-spin" />
      <p>Loading gallery…</p>
    </div>
  );
  if (images.length === 0) return (
    <div className="mm-gallery-empty">
      <Image size={48} className="mm-gallery-empty-icon" />
      <p>Gallery is empty.</p>
      <small>Upload some photos to get started!</small>
    </div>
  );
  return (
    <div className="mm-grid">
      {images.map(img => (
        <div key={img._id} className="mm-img-card">
          <img src={img.url} alt="Gallery Memory" loading="lazy" />
          <div className="mm-img-overlay">
            <button className="mm-del-btn" onClick={() => onDelete(img._id)} title="Delete Photo">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
