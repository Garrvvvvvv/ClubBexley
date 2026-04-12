import { useEffect, useState } from "react";
import { apiAdmin } from "../../lib/apiAdmin";
import { toast } from "react-toastify";
import { useAdminEvent } from "../../context/AdminEventContext";
import FilePicker from "../../components/FilePicker";
import { FaEdit, FaPlus, FaTimes, FaImage, FaTrash, FaQrcode } from "react-icons/fa";

export default function AdminEvents() {
  const { fetchEvents } = useAdminEvent();
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Local Previews
  const [posterPreview, setPosterPreview] = useState(null);
  const [qrPreview, setQrPreview] = useState(null);

  const emptyForm = {
    name: "", slug: "", description: "",
    status: "DRAFT", isHidden: false,
    paid: false, basePrice: 10000, familyAllowed: false, addonPricePerMember: 5000,
    flow: [], posterUrl: "", paymentQRUrl: ""
  };

  const [form, setForm] = useState(emptyForm);

  const [isFormVisible, setIsFormVisible] = useState(false);

  /* =========================================
     1. LOAD DATA
     ========================================= */
  const loadList = async () => {
    try {
      const res = await apiAdmin.get("/api/admin/events");
      setEvents(Array.isArray(res.data) ? res.data : []);
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error("Could not load events");
    }
  };

  useEffect(() => { loadList(); }, []);

  /* =========================================
     2. DELETE HANDLER
     ========================================= */
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (prompt("Type CONFIRM to delete this event permanently:") !== "CONFIRM") return;

    try {
      await apiAdmin.delete(`/api/admin/events/${id}`);
      toast.success("Event deleted");
      setEvents(prev => prev.filter(ev => ev._id !== id));
      if (editingId === id) handleReset();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  /* =========================================
     3. UPLOAD HANDLER
     ========================================= */
  const handleUpload = async (type, file) => {
    if (!file) return;
    if (!editingId) {
      return toast.warning("Please Click 'Create Event' first to save details before uploading.");
    }

    // Preview instantly
    const objectUrl = URL.createObjectURL(file);
    if (type === "poster") setPosterPreview(objectUrl);
    else setQrPreview(objectUrl);

    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await apiAdmin.post(`/api/admin/events/${editingId}/${type}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newUrl = type === "poster" ? res.data.posterUrl : res.data.paymentQRUrl;

      // Update Form State
      setForm(prev => ({
        ...prev,
        [type === "poster" ? "posterUrl" : "paymentQRUrl"]: newUrl
      }));

      // Update List State (Instant Reflection)
      setEvents(prev => prev.map(ev =>
        ev._id === editingId
          ? { ...ev, [type === "poster" ? "posterUrl" : "paymentQRUrl"]: newUrl }
          : ev
      ));

      toast.success(`${type === "poster" ? "Poster" : "QR"} uploaded!`);
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error("Upload failed");
    }
  };

  /* =========================================
     4. SAVE (Create / Update)
     ========================================= */
  const handleSubmit = async () => {
    try {
      if (!form.name || !form.slug) return toast.warning("Name and Slug are required");

      // Validation Limits
      if (form.name.length < 3 || form.name.length > 40) return toast.error("Name must be between 3 and 40 characters");
      if (form.slug.length < 1 || form.slug.length > 10) return toast.error("Slug must be between 1 and 10 characters");
      if (form.description.length < 10 || form.description.length > 150) return toast.error("Description must be between 10 and 150 characters");

      // Validate Flow Items
      for (const item of form.flow) {
        if (!item.title || item.title.length < 3 || item.title.length > 40) {
          return toast.error("Activity Title must be between 3 and 40 characters");
        }
      }

      // Filter out system fields
      const { _id, createdAt, updatedAt, __v, createdBy, ...rest } = form;
      const payload = { ...rest };

      if (editingId) {
        // UPDATE
        const res = await apiAdmin.patch(`/api/admin/events/${editingId}`, payload);
        toast.success("Event updated");

        // Update local list
        setEvents(prev => prev.map(ev => ev._id === editingId ? res.data : ev));
        setForm(res.data); // Sync form with server response
      } else {
        // CREATE
        const res = await apiAdmin.post("/api/admin/events", payload);
        toast.success("Event created! Now you can upload assets.");

        setEditingId(res.data._id);
        setForm(res.data);
        setEvents(prev => [res.data, ...prev]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    }
  };

  /* =========================================
     5. HELPER ACTIONS
     ========================================= */
  const handleEditClick = (ev) => {
    setEditingId(ev._id);
    setForm({
      ...ev,
      paid: ev.paid || false,
      familyAllowed: ev.familyAllowed || false,
      basePrice: ev.basePrice || 0,
      addonPricePerMember: ev.addonPricePerMember || 0,
      flow: ev.flow || []
    });
    setPosterPreview(ev.posterUrl);
    setQrPreview(ev.paymentQRUrl);
    setIsFormVisible(true);
    // setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 100);
  };

  const handleCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setPosterPreview(null);
    setQrPreview(null);
    setIsFormVisible(true);
    // setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 100);
  };

  const handleReset = () => {
    setEditingId(null);
    setForm(emptyForm);
    setPosterPreview(null);
    setQrPreview(null);
    setIsFormVisible(false); // Hide form on reset/cancel
  };

  // Safe State Updates for Nested Objects
  const addFlow = () => setForm(prev => ({ ...prev, flow: [...prev.flow, { title: "", date: "", desc: "" }] }));
  const removeFlow = (idx) => setForm(prev => ({ ...prev, flow: prev.flow.filter((_, i) => i !== idx) }));

  const updateFlow = (idx, field, val) => {
    setForm(prev => {
      const newFlow = [...prev.flow];
      newFlow[idx][field] = val;
      return { ...prev, flow: newFlow };
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 relative z-10">

      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Event Manager</h1>
          <p className="text-gray-500 mt-1 font-medium">Create, edit, and manage ARC events.</p>
        </div>
        {!isFormVisible && (
          <button
            onClick={handleCreate}
            className="text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 shadow-md transform hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, #CA0002, #e53535)",
              boxShadow: "0 4px 14px rgba(202, 0, 2, 0.25)",
            }}
          >
            <FaPlus /> Create New
          </button>
        )}
      </div>

      {/* LIST SECTION: Existing Events (MOVED TO TOP) */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-6 bg-[#CA0002] rounded-full"></div>
          <h3 className="text-xl font-bold text-gray-800">Existing Events ({events.length})</h3>
        </div>

        {events.length === 0 && (
          <div className="text-center p-12 bg-white border border-gray-200 border-dashed rounded-2xl shadow-sm">
            <div className="w-16 h-16 bg-red-50 text-[#CA0002] rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPlus size={24} />
            </div>
            <p className="text-gray-500 font-medium">No events found. Click "Create New" to start.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map(ev => (
            <div
              key={ev._id}
              onClick={() => handleEditClick(ev)}
              className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
              style={{
                border: "1px solid #eaeaea",
                boxShadow: editingId === ev._id && isFormVisible 
                  ? "0 0 0 2px #CA0002, 0 8px 24px rgba(202, 0, 2, 0.15)" 
                  : "0 4px 20px rgba(0, 0, 0, 0.04)",
              }}
            >
              {(editingId === ev._id && isFormVisible) && (
                <div className="absolute inset-0 bg-red-50/50 z-0 pointer-events-none"></div>
              )}

              <button
                onClick={(e) => handleDelete(e, ev._id)}
                className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm text-red-600 p-2.5 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm transform hover:scale-110"
                title="Permanently Delete Event"
              >
                <FaTrash size={12} />
              </button>

              <span className={`absolute top-3 left-3 z-10 text-[10px] px-2.5 py-1 rounded-full font-black tracking-wider shadow-sm uppercase ${
                ev.status === "LIVE" 
                  ? "bg-green-100 text-green-700 border border-green-200" 
                  : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}>
                {ev.status}
              </span>

              <div className="h-44 bg-gray-50 relative w-full overflow-hidden">
                <img
                  src={ev.posterUrl || "https://placehold.co/400x300?text=No+Poster"}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  alt={ev.name}
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300?text=No+Image"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              </div>

              <div className="p-5 relative z-10 bg-white group-hover:bg-gray-50 transition-colors">
                <h4 className="font-bold text-gray-900 truncate mb-1 text-lg">{ev.name}</h4>
                <p className="text-xs text-gray-500 font-mono bg-gray-100 inline-block px-2 py-1 rounded mb-4">{ev.slug}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${
                    ev.paid 
                      ? 'border-[#CA0002]/30 text-[#CA0002] bg-[#CA0002]/5' 
                      : 'border-green-500/30 text-green-600 bg-green-500/5'
                  }`}>
                    {ev.paid ? "PAID" : "FREE"}
                  </span>
                  {ev.isHidden && <span className="text-[10px] text-orange-600 px-2 py-0.5 border border-orange-200 bg-orange-50 rounded-full font-bold">HIDDEN</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDITOR SECTION (CONDITIONAL) */}
      {isFormVisible && (
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-all duration-300 animate-fade-in"
             style={{ border: `1px solid #CA000240` }}>
          
          {/* Top colored line accent */}
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #CA0002, #ff4d4f)" }}></div>

          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
              {editingId ? <FaEdit className="text-[#CA0002]" /> : <FaPlus className="text-[#CA0002]" />}
              {editingId ? "Editing Event" : "Create New Event"}
              {editingId && <span className="text-xs bg-red-50 border border-red-100 text-[#CA0002] px-3 py-1 rounded-full font-bold ml-2">{form.name}</span>}
            </h2>
            <button
              onClick={handleReset}
              className="text-gray-500 hover:text-[#CA0002] flex items-center gap-2 text-sm bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-lg transition-all font-semibold"
            >
              <FaTimes /> Close Form
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT: Text Fields */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Event Name</label>
                  <input 
                    value={form.name} 
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-3.5 mt-1.5 outline-none transition-all focus:border-[#CA0002] focus:ring-2 focus:ring-[#CA0002]/20 font-medium" 
                    placeholder="E.g. Tech Symposium 2026" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Slug (URL)</label>
                  <input 
                    value={form.slug} 
                    onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))} 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-3.5 mt-1.5 outline-none transition-all focus:border-[#CA0002] focus:ring-2 focus:ring-[#CA0002]/20 font-mono text-sm" 
                    placeholder="tech-symposium" 
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Description</label>
                <textarea 
                  value={form.description} 
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-3.5 mt-1.5 h-28 outline-none transition-all focus:border-[#CA0002] focus:ring-2 focus:ring-[#CA0002]/20 font-medium resize-none" 
                  placeholder="Describe your event..."
                />
              </div>

              {/* Timeline Editor */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#CA0002]"></span>
                    Event Timeline
                  </label>
                  <button onClick={addFlow} className="text-xs bg-white border border-gray-200 shadow-sm hover:border-[#CA0002] hover:text-[#CA0002] text-gray-700 px-3 py-1.5 rounded-lg transition-all font-bold">+ Add Activity</button>
                </div>
                <div className="space-y-4">
                  {form.flow.map((item, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative group">
                      <div className="flex gap-3 items-start mb-3">
                        <input placeholder="Time (10:00 AM)" value={item.date} onChange={e => updateFlow(idx, "date", e.target.value)} className="w-1/4 bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm text-gray-800 font-medium outline-none focus:border-[#CA0002]" />
                        <input placeholder="Activity Title" value={item.title} onChange={e => updateFlow(idx, "title", e.target.value)} className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm text-gray-800 font-medium outline-none focus:border-[#CA0002]" />
                        <button onClick={() => removeFlow(idx)} className="text-gray-400 p-2.5 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"><FaTimes /></button>
                      </div>
                      <textarea
                        placeholder="Activity Description (optional)"
                        value={item.desc || ""}
                        onChange={e => updateFlow(idx, "desc", e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm text-gray-800 h-20 resize-none outline-none focus:border-[#CA0002]"
                      />
                    </div>
                  ))}
                  {form.flow.length === 0 && (
                    <div className="text-center py-6 bg-white rounded-xl border border-dashed border-gray-300">
                      <p className="text-gray-400 text-sm font-medium">No timeline items added yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Settings & Assets */}
            <div className="space-y-6">

              {/* Status Panel */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Publish Status</label>
                <select 
                  value={form.status} 
                  onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))} 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl p-3 mt-2 mb-4 cursor-pointer outline-none focus:border-[#CA0002] font-semibold"
                >
                  <option value="DRAFT">Draft (Hidden)</option>
                  <option value="LIVE">Live (Active)</option>
                  <option value="PAUSED">Paused</option>
                  <option value="CLOSED">Closed</option>
                </select>
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-100">
                  <input type="checkbox" checked={form.isHidden} onChange={e => setForm(prev => ({ ...prev, isHidden: e.target.checked }))} className="w-4 h-4 accent-[#CA0002] cursor-pointer" />
                  <span className="text-sm font-semibold text-gray-700">Hide from Public Page</span>
                </label>
              </div>

              {/* Pricing Panel */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <label className="flex items-center gap-3 cursor-pointer mb-3 select-none pb-3 border-b border-gray-100">
                  <input
                    type="checkbox"
                    checked={form.paid}
                    onChange={e => setForm(prev => ({ ...prev, paid: e.target.checked }))}
                    className="w-5 h-5 accent-[#CA0002] cursor-pointer"
                  />
                  <span className="font-bold text-gray-800">Paid Event</span>
                </label>

                {form.paid && (
                  <div className="space-y-4 pt-2 animate-fade-in pl-1">
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Base Price (INR)</span>
                      <input type="number" value={form.basePrice} onChange={e => setForm(prev => ({ ...prev, basePrice: Number(e.target.value) }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-800 font-bold outline-none focus:border-[#CA0002]" />
                    </div>

                    <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 mt-2 cursor-pointer bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <input type="checkbox" checked={form.familyAllowed} onChange={e => setForm(prev => ({ ...prev, familyAllowed: e.target.checked }))} className="w-4 h-4 accent-[#CA0002]" />
                      Allow Family Members
                    </label>

                    {form.familyAllowed && (
                      <div className="pt-2">
                        <span className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Add-on Price (per person)</span>
                        <input type="number" value={form.addonPricePerMember} onChange={e => setForm(prev => ({ ...prev, addonPricePerMember: Number(e.target.value) }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-800 font-bold outline-none focus:border-[#CA0002]" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Assets Panel */}
              <div className={`p-5 rounded-2xl border shadow-sm transition-opacity ${editingId ? "bg-white border-gray-200" : "bg-gray-50 border-gray-200 opacity-60 pointer-events-none"}`}>
                <p className="text-xs font-bold text-gray-500 uppercase mb-4 flex items-center gap-2 tracking-wide"><FaImage className="text-gray-400" /> Assets</p>
                {!editingId && <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg font-semibold mb-4 border border-orange-100">Save event first to upload assets.</p>}

                {/* Poster */}
                <div className="mb-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700">Event Poster</span>
                  </div>
                  {posterPreview ? (
                    <div className="relative rounded-xl overflow-hidden mb-3 border border-gray-200">
                      <img src={posterPreview} className="w-full h-36 object-cover" alt="Poster" />
                    </div>
                  ) : (
                    <div className="w-full h-36 bg-gray-50 rounded-xl mb-3 flex flex-col items-center justify-center text-gray-400 border border-gray-200 border-dashed">
                      <FaImage size={24} className="mb-2 text-gray-300" />
                      <span className="text-xs font-medium">No Image Uploaded</span>
                    </div>
                  )}
                  <FilePicker label={posterPreview ? "Change Poster" : "Upload Poster"} onChange={(e) => handleUpload("poster", e.target.files[0])} />
                </div>

                {/* QR (Only if Paid) */}
                {form.paid && (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-gray-700">Payment QR</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      {qrPreview ? (
                        <div className="p-2 border border-gray-200 rounded-xl bg-white shadow-sm">
                          <img src={qrPreview} className="w-16 h-16 object-contain" alt="QR" />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gray-50 rounded-xl flex flex-col items-center justify-center text-gray-400 border border-gray-200 border-dashed">
                           <FaQrcode size={20} className="mb-1 text-gray-300" />
                           <span className="text-[10px] font-medium">No QR</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <FilePicker label={qrPreview ? "Change QR" : "Upload QR"} onChange={(e) => handleUpload("qr", e.target.files[0])} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={handleReset} className="flex-1 py-3.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200">
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit} 
                  className="flex-[2] py-3.5 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(135deg, #CA0002, #e53535)",
                    boxShadow: "0 8px 20px rgba(202, 0, 2, 0.25)"
                  }}
                >
                  {editingId ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}