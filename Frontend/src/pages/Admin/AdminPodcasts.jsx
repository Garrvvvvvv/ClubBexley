import { useEffect, useState } from "react";
import { apiAdmin } from "../../lib/apiAdmin";
import { toast } from "react-toastify";
import { FaEdit, FaPlus, FaTimes, FaTrash, FaArrowUp, FaArrowDown, FaPodcast } from "react-icons/fa";

const emptyForm = {
  series: "",
  title: "",
  host: "",
  guest: "",
  description: "",
  youtubeLink: "",
  date: "",
  order: "",
  isHidden: false,
};

export default function AdminPodcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [customSeries, setCustomSeries] = useState("");

  // Derived: unique series names from loaded podcasts
  const seriesList = [...new Set(podcasts.map((p) => p.series))].sort();

  // Group podcasts by series for display
  const grouped = podcasts.reduce((acc, p) => {
    (acc[p.series] = acc[p.series] || []).push(p);
    return acc;
  }, {});

  /* ---- LOAD ---- */
  const loadList = async () => {
    try {
      const res = await apiAdmin.get("/api/admin/podcasts");
      setPodcasts(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Could not load podcasts");
    }
  };

  useEffect(() => { loadList(); }, []);

  /* ---- DELETE ---- */
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (prompt("Type CONFIRM to delete this podcast permanently:") !== "CONFIRM") return;
    try {
      await apiAdmin.delete(`/api/admin/podcasts/${id}`);
      toast.success("Podcast deleted");
      setPodcasts((prev) => prev.filter((p) => p._id !== id));
      if (editingId === id) handleReset();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---- REORDER ---- */
  const handleReorder = async (e, series, idx, direction) => {
    e.stopPropagation();
    const seriesPodcasts = [...podcasts]
      .filter((p) => p.series === series)
      .sort((a, b) => a.order - b.order);

    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= seriesPodcasts.length) return;

    const idA = seriesPodcasts[idx]._id;
    const idB = seriesPodcasts[targetIdx]._id;

    try {
      await apiAdmin.patch("/api/admin/podcasts/reorder", { idA, idB });
      await loadList();
    } catch {
      toast.error("Reorder failed");
    }
  };

  /* ---- SAVE ---- */
  const handleSubmit = async () => {
    const seriesValue = form.series === "__custom__" ? customSeries.trim() : form.series;
    if (!seriesValue || !form.title || !form.host || !form.guest || !form.description || !form.youtubeLink) {
      return toast.warning("All fields except Date are required");
    }

    const payload = {
      ...form,
      series: seriesValue,
      order: form.order !== "" ? Number(form.order) : undefined,
    };

    try {
      if (editingId) {
        const res = await apiAdmin.patch(`/api/admin/podcasts/${editingId}`, payload);
        toast.success("Podcast updated");
        setPodcasts((prev) => prev.map((p) => (p._id === editingId ? res.data : p)));
        setForm(res.data);
      } else {
        const res = await apiAdmin.post("/api/admin/podcasts", payload);
        toast.success("Podcast created");
        setEditingId(res.data._id);
        setForm(res.data);
        setPodcasts((prev) => [...prev, res.data]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    }
  };

  /* ---- HELPERS ---- */
  const handleEditClick = (podcast) => {
    setEditingId(podcast._id);
    setForm({ ...podcast, order: podcast.order ?? "" });
    setCustomSeries("");
    setIsFormVisible(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setCustomSeries("");
    setIsFormVisible(true);
  };

  const handleReset = () => {
    setEditingId(null);
    setForm(emptyForm);
    setCustomSeries("");
    setIsFormVisible(false);
  };

  const field = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const inputCls = "w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-3.5 mt-1.5 outline-none transition-all focus:border-[#CA0002] focus:ring-2 focus:ring-[#CA0002]/20 font-medium";

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 relative z-10">

      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Podcast Manager</h1>
          <p className="text-gray-500 mt-1 font-medium">Add, edit, reorder, and manage podcast episodes.</p>
        </div>
        {!isFormVisible && (
          <button
            onClick={handleCreate}
            className="text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 shadow-md transform hover:-translate-y-1"
            style={{ background: "linear-gradient(135deg, #CA0002, #e53535)", boxShadow: "0 4px 14px rgba(202, 0, 2, 0.25)" }}
          >
            <FaPlus /> Add Episode
          </button>
        )}
      </div>

      {/* LIST: grouped by series */}
      {podcasts.length === 0 && !isFormVisible && (
        <div className="text-center p-12 bg-white border border-gray-200 border-dashed rounded-2xl shadow-sm">
          <div className="w-16 h-16 bg-red-50 text-[#CA0002] rounded-full flex items-center justify-center mx-auto mb-4">
            <FaPodcast size={24} />
          </div>
          <p className="text-gray-500 font-medium">No podcasts found. Click "Add Episode" to get started.</p>
        </div>
      )}

      {Object.entries(grouped).map(([series, items]) => {
        const sorted = [...items].sort((a, b) => a.order - b.order);
        return (
          <div key={series}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-6 bg-[#CA0002] rounded-full"></div>
              <h3 className="text-xl font-bold text-gray-800">{series} <span className="text-sm font-normal text-gray-400">({sorted.length} episodes)</span></h3>
            </div>

            <div className="space-y-3">
              {sorted.map((podcast, idx) => (
                <div
                  key={podcast._id}
                  onClick={() => handleEditClick(podcast)}
                  className="group flex items-center gap-4 bg-white rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    border: "1px solid #eaeaea",
                    boxShadow: editingId === podcast._id && isFormVisible
                      ? "0 0 0 2px #CA0002, 0 4px 16px rgba(202, 0, 2, 0.12)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Order badge */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500">
                    {idx + 1}
                  </div>

                  {/* YouTube thumbnail */}
                  <div className="flex-shrink-0 w-24 h-14 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={`https://img.youtube.com/vi/${extractYouTubeId(podcast.youtubeLink)}/mqdefault.jpg`}
                      alt={podcast.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-bold text-gray-900 truncate">{podcast.title}</h4>
                      {podcast.isHidden && (
                        <span className="text-[10px] px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-600 rounded-full font-bold flex-shrink-0">HIDDEN</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      <span className="font-medium">Host:</span> {podcast.host} &nbsp;·&nbsp; <span className="font-medium">Guest:</span> {podcast.guest}
                    </p>
                    {podcast.date && (
                      <p className="text-xs text-gray-400 mt-0.5">{new Date(podcast.date).toLocaleDateString("en-GB")}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => handleReorder(e, series, idx, "up")}
                      disabled={idx === 0}
                      className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-25 transition-colors"
                      title="Move Up"
                    >
                      <FaArrowUp size={12} />
                    </button>
                    <button
                      onClick={(e) => handleReorder(e, series, idx, "down")}
                      disabled={idx === sorted.length - 1}
                      className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-25 transition-colors"
                      title="Move Down"
                    >
                      <FaArrowDown size={12} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, podcast._id)}
                      className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors ml-1"
                      title="Delete"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* EDITOR FORM */}
      {isFormVisible && (
        <div
          className="mt-8 bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          style={{ border: "1px solid #CA000240" }}
        >
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #CA0002, #ff4d4f)" }}></div>

          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
              {editingId ? <FaEdit className="text-[#CA0002]" /> : <FaPlus className="text-[#CA0002]" />}
              {editingId ? "Editing Episode" : "Add New Episode"}
              {editingId && form.title && (
                <span className="text-xs bg-red-50 border border-red-100 text-[#CA0002] px-3 py-1 rounded-full font-bold ml-2">{form.title}</span>
              )}
            </h2>
            <button
              onClick={handleReset}
              className="text-gray-500 hover:text-[#CA0002] flex items-center gap-2 text-sm bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-lg transition-all font-semibold"
            >
              <FaTimes /> Close Form
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Series */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Series</label>
              <select
                value={form.series === customSeries && customSeries ? "__custom__" : form.series}
                onChange={(e) => {
                  if (e.target.value === "__custom__") {
                    field("series", "__custom__");
                  } else {
                    field("series", e.target.value);
                    setCustomSeries("");
                  }
                }}
                className={inputCls + " cursor-pointer"}
              >
                <option value="">— Select Series —</option>
                {seriesList.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
                <option value="__custom__">+ New Series…</option>
              </select>
              {(form.series === "__custom__") && (
                <input
                  value={customSeries}
                  onChange={(e) => setCustomSeries(e.target.value)}
                  className={inputCls + " mt-2"}
                  placeholder="Enter new series name"
                />
              )}
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Episode Title</label>
              <input value={form.title} onChange={(e) => field("title", e.target.value)} className={inputCls} placeholder="e.g. Podcast 7 / Episode 3" />
            </div>

            {/* Host */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Host</label>
              <input value={form.host} onChange={(e) => field("host", e.target.value)} className={inputCls} placeholder="Host name" />
            </div>

            {/* Guest */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Guest</label>
              <input value={form.guest} onChange={(e) => field("guest", e.target.value)} className={inputCls} placeholder="Guest name" />
            </div>

            {/* YouTube Link */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">YouTube Embed URL</label>
              <input value={form.youtubeLink} onChange={(e) => field("youtubeLink", e.target.value)} className={inputCls} placeholder="https://www.youtube.com/embed/..." />
            </div>

            {/* Date */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Date (optional)</label>
              <input type="date" value={form.date} onChange={(e) => field("date", e.target.value)} className={inputCls} />
            </div>

            {/* Description — full width */}
            <div className="lg:col-span-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => field("description", e.target.value)}
                className={inputCls + " h-32 resize-none"}
                placeholder="Episode description..."
              />
            </div>

            {/* Order + Hidden */}
            <div className="flex gap-4 items-end lg:col-span-2">
              <div className="w-40">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Order (within series)</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => field("order", e.target.value)}
                  className={inputCls}
                  placeholder="0"
                  min="0"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200 mb-0">
                <input
                  type="checkbox"
                  checked={form.isHidden}
                  onChange={(e) => field("isHidden", e.target.checked)}
                  className="w-4 h-4 accent-[#CA0002] cursor-pointer"
                />
                <span className="text-sm font-semibold text-gray-700">Hide from Public Page</span>
              </label>
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-8">
            <button onClick={handleReset} className="flex-1 py-3.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-[2] py-3.5 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #CA0002, #e53535)", boxShadow: "0 8px 20px rgba(202, 0, 2, 0.25)" }}
            >
              {editingId ? "Save Changes" : "Add Episode"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Extract YouTube video ID from embed URL */
function extractYouTubeId(url) {
  if (!url) return "";
  const match = url.match(/(?:embed\/|v=|youtu\.be\/)([^?&"'>]+)/);
  return match ? match[1] : "";
}
