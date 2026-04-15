import { useEffect, useState } from "react";
import { apiAdmin } from "../../lib/apiAdmin";
import { toast } from "react-toastify";
import { useAdminEvent } from "../../context/AdminEventContext";
import FilePicker from "../../components/FilePicker";
import { FaEdit, FaPlus, FaTimes, FaImage, FaTrash, FaQrcode } from "react-icons/fa";

/* ─── tiny helpers ─────────────────────────────────────── */
const InputCls = "w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-3 mt-1 outline-none focus:border-[#CA0002] focus:ring-2 focus:ring-[#CA0002]/20 font-medium text-sm";
const LabelCls = "text-xs font-bold text-gray-500 uppercase tracking-wide";
const SectionTitle = ({ children }) => (
  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
    <span className="w-1.5 h-5 rounded-full bg-[#CA0002] inline-block" />
    <h3 className="text-sm font-black text-gray-700 uppercase tracking-wide">{children}</h3>
  </div>
);

/* ─── list-of-strings editor (inclusions, exclusions etc.) */
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
      <label className={LabelCls}>{label}</label>
      <div className="flex gap-2 mt-1.5 mb-2">
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={`Add ${label.toLowerCase()}…`}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-[#CA0002]"
        />
        <button type="button" onClick={add} className="px-3 py-2 bg-[#CA0002] text-white rounded-xl text-sm font-bold hover:bg-[#a80001] transition">+</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200">
            {item}
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-600 transition ml-0.5">×</button>
          </span>
        ))}
        {items.length === 0 && <span className="text-xs text-gray-400 italic">None added yet.</span>}
      </div>
    </div>
  );
}

/* ─── main component ───────────────────────────────────── */
export default function AdminEvents() {
  const { fetchEvents } = useAdminEvent();
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [qrPreview, setQrPreview] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const emptyForm = {
    /* core */
    name: "", slug: "", description: "", type: "CLUB_EVENT",
    status: "DRAFT", isHidden: false,
    posterUrl: "", paymentQRUrl: "",
    googleFormLink: "",

    /* trip */
    duration: "", pickupDrop: "", startingPrice: 0,
    itinerary: [],
    pricingTiers: [],
    tripDates: [],
    inclusions: [], exclusions: [], notes: [],
    cancellationPolicy: "", thingsToCarry: [],

    /* club event */
    paid: false, basePrice: 0, familyAllowed: false, addonPricePerMember: 0,
    flow: [],
  };

  const [form, setForm] = useState(emptyForm);
  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  /* ── load ── */
  const loadList = async () => {
    try {
      const res = await apiAdmin.get("/api/admin/events");
      setEvents(Array.isArray(res.data) ? res.data : []);
      fetchEvents();
    } catch { toast.error("Could not load events"); }
  };
  useEffect(() => { loadList(); }, []);

  /* ── delete ── */
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

  /* ── upload ── */
  const handleUpload = async (type, file) => {
    if (!file) return;
    if (!editingId) return toast.warning("Save event first before uploading assets.");
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
      set(type === "poster" ? "posterUrl" : "paymentQRUrl", newUrl);
      setEvents(prev => prev.map(ev =>
        ev._id === editingId ? { ...ev, [type === "poster" ? "posterUrl" : "paymentQRUrl"]: newUrl } : ev
      ));
      toast.success(`${type === "poster" ? "Poster" : "QR"} uploaded!`);
    } catch { toast.error("Upload failed"); }
  };

  /* ── save ── */
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

  /* ── helpers ── */
  const handleEditClick = (ev) => {
    setEditingId(ev._id);
    setForm({
      ...emptyForm, ...ev,
      itinerary: ev.itinerary || [],
      pricingTiers: ev.pricingTiers || [],
      tripDates: ev.tripDates || [],
      inclusions: ev.inclusions || [],
      exclusions: ev.exclusions || [],
      notes: ev.notes || [],
      thingsToCarry: ev.thingsToCarry || [],
      flow: ev.flow || [],
    });
    setPosterPreview(ev.posterUrl || null);
    setQrPreview(ev.paymentQRUrl || null);
    setIsFormVisible(true);
  };
  const handleCreate = () => { setEditingId(null); setForm(emptyForm); setPosterPreview(null); setQrPreview(null); setIsFormVisible(true); };
  const handleReset = () => { setEditingId(null); setForm(emptyForm); setPosterPreview(null); setQrPreview(null); setIsFormVisible(false); };

  /* ── itinerary ── */
  const addItineraryDay = () => set("itinerary", [...form.itinerary, { dayNumber: form.itinerary.length + 1, title: "", description: "" }]);
  const removeItineraryDay = (i) => set("itinerary", form.itinerary.filter((_, j) => j !== i));
  const updateItinerary = (i, field, val) => {
    const arr = [...form.itinerary];
    arr[i] = { ...arr[i], [field]: val };
    set("itinerary", arr);
  };

  /* ── pricing tiers ── */
  const addTier = () => set("pricingTiers", [...form.pricingTiers, { roomType: "", pricePerPerson: 0 }]);
  const removeTier = (i) => set("pricingTiers", form.pricingTiers.filter((_, j) => j !== i));
  const updateTier = (i, field, val) => {
    const arr = [...form.pricingTiers];
    arr[i] = { ...arr[i], [field]: val };
    set("pricingTiers", arr);
  };

  /* ── trip dates ── */
  const addTripDate = () => set("tripDates", [...form.tripDates, { startDate: "", endDate: "", note: "" }]);
  const removeTripDate = (i) => set("tripDates", form.tripDates.filter((_, j) => j !== i));
  const updateTripDate = (i, field, val) => {
    const arr = [...form.tripDates];
    arr[i] = { ...arr[i], [field]: val };
    set("tripDates", arr);
  };

  /* ── club flow ── */
  const addFlow = () => set("flow", [...form.flow, { title: "", date: "", desc: "" }]);
  const removeFlow = (i) => set("flow", form.flow.filter((_, j) => j !== i));
  const updateFlow = (i, field, val) => {
    const arr = [...form.flow];
    arr[i] = { ...arr[i], [field]: val };
    set("flow", arr);
  };

  const isTrip = form.type === "TRIP";

  /* ════════════════════════════════════════ RENDER ═══════════════════════════════════════ */
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 relative z-10">

      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Event Manager</h1>
          <p className="text-gray-500 mt-1 font-medium">Create and manage trips & club events.</p>
        </div>
        {!isFormVisible && (
          <button onClick={handleCreate} className="text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#CA0002,#e53535)", boxShadow: "0 4px 14px rgba(202,0,2,.25)" }}>
            <FaPlus /> Create New
          </button>
        )}
      </div>

      {/* EVENT CARDS */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-6 bg-[#CA0002] rounded-full" />
          <h3 className="text-xl font-bold text-gray-800">Existing Events ({events.length})</h3>
        </div>

        {events.length === 0 && (
          <div className="text-center p-12 bg-white border border-dashed border-gray-200 rounded-2xl">
            <p className="text-gray-500 font-medium">No events yet. Click "Create New" to start.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map(ev => (
            <div key={ev._id} onClick={() => handleEditClick(ev)}
              className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2"
              style={{ border: "1px solid #eaeaea", boxShadow: editingId === ev._id && isFormVisible ? "0 0 0 2px #CA0002,0 8px 24px rgba(202,0,2,.15)" : "0 4px 20px rgba(0,0,0,.04)" }}>

              {editingId === ev._id && isFormVisible && <div className="absolute inset-0 bg-red-50/50 z-0 pointer-events-none" />}

              <button onClick={(e) => handleDelete(e, ev._id)}
                className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm text-red-600 p-2.5 rounded-full hover:bg-red-600 hover:text-white transition shadow-sm hover:scale-110"
                title="Delete Event"><FaTrash size={12} /></button>

              <span className={`absolute top-3 left-3 z-10 text-[10px] px-2.5 py-1 rounded-full font-black tracking-wider shadow-sm uppercase ${ev.status === "LIVE" ? "bg-green-100 text-green-700 border border-green-200" : "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                {ev.status}
              </span>

              <div className="h-44 bg-gray-50 relative w-full overflow-hidden">
                <img src={ev.posterUrl || "https://placehold.co/400x300?text=No+Poster"} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt={ev.name}
                  onError={e => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300?text=No+Image"; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              </div>

              <div className="p-5 relative z-10 bg-white group-hover:bg-gray-50 transition-colors">
                <h4 className="font-bold text-gray-900 truncate mb-1 text-lg">{ev.name}</h4>
                <p className="text-xs text-gray-500 font-mono bg-gray-100 inline-block px-2 py-1 rounded mb-3">{ev.slug}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full border font-bold border-blue-200 text-blue-600 bg-blue-50">
                    {ev.type === "TRIP" ? "Trip" : "Club Event"}
                  </span>
                  {ev.isHidden && <span className="text-[10px] text-orange-600 px-2 py-0.5 border border-orange-200 bg-orange-50 rounded-full font-bold">HIDDEN</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════ EDITOR FORM ═══════════════════ */}
      {isFormVisible && (
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden animate-fade-in" style={{ border: "1px solid #CA000240" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg,#CA0002,#ff4d4f)" }} />

          {/* Form header */}
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
              {editingId ? <FaEdit className="text-[#CA0002]" /> : <FaPlus className="text-[#CA0002]" />}
              {editingId ? "Editing Event" : "Create New Event"}
              {editingId && <span className="text-xs bg-red-50 border border-red-100 text-[#CA0002] px-3 py-1 rounded-full font-bold ml-2">{form.name}</span>}
            </h2>
            <button onClick={handleReset} className="text-gray-500 hover:text-[#CA0002] flex items-center gap-2 text-sm bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-lg transition font-semibold">
              <FaTimes /> Close
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ═══ LEFT: Content Fields ═══ */}
            <div className="lg:col-span-2 space-y-8">

              {/* ── Core ── */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-4">
                <SectionTitle>Core Details</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={LabelCls}>Name</label>
                    <input value={form.name} onChange={e => set("name", e.target.value)} className={InputCls} placeholder="E.g. Kasol Trek 2026" />
                  </div>
                  <div>
                    <label className={LabelCls}>Slug (URL)</label>
                    <input value={form.slug} onChange={e => set("slug", e.target.value)} className={InputCls + " font-mono"} placeholder="kasol-trek" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={LabelCls}>Type</label>
                    <select value={form.type} onChange={e => set("type", e.target.value)} className={InputCls}>
                      <option value="TRIP">Trip</option>
                      <option value="CLUB_EVENT">Club Event</option>
                    </select>
                  </div>
                  <div>
                    <label className={LabelCls}>Google Form Link (Registration)</label>
                    <input value={form.googleFormLink} onChange={e => set("googleFormLink", e.target.value)} className={InputCls} placeholder="https://forms.gle/..." />
                  </div>
                </div>

                <div>
                  <label className={LabelCls}>Description</label>
                  <textarea value={form.description} onChange={e => set("description", e.target.value)} className={InputCls + " h-24 resize-none"} placeholder="Short description shown in listings (10–500 chars)" />
                </div>
              </div>

              {/* ════════ TRIP FIELDS ════════ */}
              {isTrip && (
                <>
                  {/* Trip Stats */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-4">
                    <SectionTitle>Trip Info</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={LabelCls}>Duration</label>
                        <input value={form.duration} onChange={e => set("duration", e.target.value)} className={InputCls} placeholder="2N-3D" />
                      </div>
                      <div>
                        <label className={LabelCls}>Pickup & Drop</label>
                        <input value={form.pickupDrop} onChange={e => set("pickupDrop", e.target.value)} className={InputCls} placeholder="Delhi" />
                      </div>
                      <div>
                        <label className={LabelCls}>Starting Price (₹)</label>
                        <input type="number" value={form.startingPrice} onChange={e => set("startingPrice", Number(e.target.value))} className={InputCls} />
                      </div>
                    </div>
                  </div>

                  {/* Pricing Tiers */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                    <SectionTitle>Pricing Tiers</SectionTitle>
                    <div className="space-y-3 mb-3">
                      {form.pricingTiers.map((tier, i) => (
                        <div key={i} className="flex gap-3 items-center bg-white p-3 rounded-xl border border-gray-100">
                          <input placeholder="Room type (e.g. Quad Sharing)" value={tier.roomType} onChange={e => updateTier(i, "roomType", e.target.value)}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#CA0002]" />
                          <input type="number" placeholder="Price/person" value={tier.pricePerPerson} onChange={e => updateTier(i, "pricePerPerson", Number(e.target.value))}
                            className="w-32 bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#CA0002]" />
                          <button onClick={() => removeTier(i)} className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition"><FaTimes /></button>
                        </div>
                      ))}
                      {form.pricingTiers.length === 0 && <p className="text-xs text-gray-400 italic text-center py-3">No pricing tiers added.</p>}
                    </div>
                    <button onClick={addTier} className="text-xs bg-white border border-gray-200 shadow-sm hover:border-[#CA0002] hover:text-[#CA0002] text-gray-700 px-3 py-2 rounded-lg transition font-bold">+ Add Tier</button>
                  </div>

                  {/* Trip Dates */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                    <SectionTitle>Trip Dates</SectionTitle>
                    <div className="space-y-3 mb-3">
                      {form.tripDates.map((d, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 space-y-2">
                          <div className="flex gap-3 items-center">
                            <div className="flex-1">
                              <label className="text-[10px] text-gray-400 font-bold uppercase">Start</label>
                              <input type="date" value={d.startDate ? d.startDate.slice(0, 10) : ""} onChange={e => updateTripDate(i, "startDate", e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#CA0002]" />
                            </div>
                            <div className="flex-1">
                              <label className="text-[10px] text-gray-400 font-bold uppercase">End</label>
                              <input type="date" value={d.endDate ? d.endDate.slice(0, 10) : ""} onChange={e => updateTripDate(i, "endDate", e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#CA0002]" />
                            </div>
                            <button onClick={() => removeTripDate(i)} className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition mt-4"><FaTimes /></button>
                          </div>
                          <input placeholder='Note (e.g. "Limited Seats")' value={d.note} onChange={e => updateTripDate(i, "note", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs outline-none focus:border-[#CA0002]" />
                        </div>
                      ))}
                      {form.tripDates.length === 0 && <p className="text-xs text-gray-400 italic text-center py-3">No dates added.</p>}
                    </div>
                    <button onClick={addTripDate} className="text-xs bg-white border border-gray-200 shadow-sm hover:border-[#CA0002] hover:text-[#CA0002] text-gray-700 px-3 py-2 rounded-lg transition font-bold">+ Add Date</button>
                  </div>

                  {/* Itinerary */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                    <SectionTitle>Day-wise Itinerary</SectionTitle>
                    <div className="space-y-3 mb-3">
                      {form.itinerary.map((day, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-gray-100">
                          <div className="flex gap-3 items-start mb-2">
                            <input type="number" value={day.dayNumber} onChange={e => updateItinerary(i, "dayNumber", Number(e.target.value))}
                              className="w-16 bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-bold text-center outline-none focus:border-[#CA0002]" />
                            <input placeholder="Day title" value={day.title} onChange={e => updateItinerary(i, "title", e.target.value)}
                              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#CA0002]" />
                            <button onClick={() => removeItineraryDay(i)} className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition"><FaTimes /></button>
                          </div>
                          <textarea placeholder="Description (optional)" value={day.description || ""} onChange={e => updateItinerary(i, "description", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm resize-none h-16 outline-none focus:border-[#CA0002]" />
                        </div>
                      ))}
                      {form.itinerary.length === 0 && <p className="text-xs text-gray-400 italic text-center py-3">No itinerary days added.</p>}
                    </div>
                    <button onClick={addItineraryDay} className="text-xs bg-white border border-gray-200 shadow-sm hover:border-[#CA0002] hover:text-[#CA0002] text-gray-700 px-3 py-2 rounded-lg transition font-bold">+ Add Day</button>
                  </div>

                  {/* Inclusions & Exclusions */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-5">
                    <SectionTitle>Inclusions & Exclusions</SectionTitle>
                    <StringListEditor label="Inclusions" items={form.inclusions} onChange={v => set("inclusions", v)} />
                    <StringListEditor label="Exclusions" items={form.exclusions} onChange={v => set("exclusions", v)} />
                  </div>

                  {/* Notes & Things to Carry */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-5">
                    <SectionTitle>Notes & Things to Carry</SectionTitle>
                    <StringListEditor label="Notes" items={form.notes} onChange={v => set("notes", v)} />
                    <StringListEditor label="Things to Carry" items={form.thingsToCarry} onChange={v => set("thingsToCarry", v)} />
                  </div>

                  {/* Cancellation Policy */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                    <SectionTitle>Cancellation Policy</SectionTitle>
                    <textarea value={form.cancellationPolicy} onChange={e => set("cancellationPolicy", e.target.value)}
                      className={InputCls + " h-28 resize-none mt-0"} placeholder="Describe the cancellation and refund policy…" />
                  </div>
                </>
              )}

              {/* ════════ CLUB EVENT FIELDS ════════ */}
              {!isTrip && (
                <>
                  {/* Pricing */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-4">
                    <SectionTitle>Pricing</SectionTitle>
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input type="checkbox" checked={form.paid} onChange={e => set("paid", e.target.checked)} className="w-5 h-5 accent-[#CA0002]" />
                      <span className="font-bold text-gray-800 text-sm">Paid Event</span>
                    </label>
                    {form.paid && (
                      <div className="space-y-4 pl-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={LabelCls}>Base Price (INR)</label>
                            <input type="number" value={form.basePrice} onChange={e => set("basePrice", Number(e.target.value))} className={InputCls} />
                          </div>
                        </div>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={form.familyAllowed} onChange={e => set("familyAllowed", e.target.checked)} className="w-4 h-4 accent-[#CA0002]" />
                          <span className="text-sm font-semibold text-gray-700">Allow Family Members</span>
                        </label>
                        {form.familyAllowed && (
                          <div>
                            <label className={LabelCls}>Add-on Price per Member (INR)</label>
                            <input type="number" value={form.addonPricePerMember} onChange={e => set("addonPricePerMember", Number(e.target.value))} className={InputCls} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Event Timeline */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-5 rounded-full bg-[#CA0002] inline-block" />
                        <h3 className="text-sm font-black text-gray-700 uppercase tracking-wide">Event Timeline</h3>
                      </div>
                      <button onClick={addFlow} className="text-xs bg-white border border-gray-200 shadow-sm hover:border-[#CA0002] hover:text-[#CA0002] text-gray-700 px-3 py-2 rounded-lg transition font-bold">+ Add Activity</button>
                    </div>
                    <div className="space-y-3">
                      {form.flow.map((item, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-gray-100">
                          <div className="flex gap-3 items-start mb-2">
                            <input placeholder="Time (10:00 AM)" value={item.date} onChange={e => updateFlow(i, "date", e.target.value)}
                              className="w-1/4 bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#CA0002]" />
                            <input placeholder="Activity Title" value={item.title} onChange={e => updateFlow(i, "title", e.target.value)}
                              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#CA0002]" />
                            <button onClick={() => removeFlow(i)} className="text-gray-400 p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition"><FaTimes /></button>
                          </div>
                          <textarea placeholder="Description (optional)" value={item.desc || ""} onChange={e => updateFlow(i, "desc", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm h-16 resize-none outline-none focus:border-[#CA0002]" />
                        </div>
                      ))}
                      {form.flow.length === 0 && <p className="text-xs text-gray-400 italic text-center py-4">No timeline items added.</p>}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ═══ RIGHT: Settings & Assets ═══ */}
            <div className="space-y-6">

              {/* Status */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <label className={LabelCls}>Publish Status</label>
                <select value={form.status} onChange={e => set("status", e.target.value)} className={InputCls}>
                  <option value="DRAFT">Draft (Hidden)</option>
                  <option value="LIVE">Live (Active)</option>
                  <option value="PAUSED">Paused</option>
                  <option value="CLOSED">Closed</option>
                </select>
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 rounded-xl mt-3 border border-gray-100">
                  <input type="checkbox" checked={form.isHidden} onChange={e => set("isHidden", e.target.checked)} className="w-4 h-4 accent-[#CA0002] cursor-pointer" />
                  <span className="text-sm font-semibold text-gray-700">Hide from Public Page</span>
                </label>
              </div>

              {/* Assets */}
              <div className={`p-5 rounded-2xl border shadow-sm transition-opacity ${editingId ? "bg-white border-gray-200" : "bg-gray-50 border-gray-200 opacity-60 pointer-events-none"}`}>
                <p className={LabelCls + " flex items-center gap-2 mb-4"}><FaImage className="text-gray-400" /> Assets</p>
                {!editingId && <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg font-semibold mb-4 border border-orange-100">Save event first to upload assets.</p>}

                {/* Poster */}
                <div className="mb-5">
                  <span className="text-sm font-bold text-gray-700 block mb-2">Event Poster</span>
                  {posterPreview
                    ? <div className="relative rounded-xl overflow-hidden mb-3 border border-gray-200"><img src={posterPreview} className="w-full h-36 object-cover" alt="Poster" /></div>
                    : <div className="w-full h-36 bg-gray-50 rounded-xl mb-3 flex flex-col items-center justify-center text-gray-300 border border-dashed border-gray-200"><FaImage size={24} className="mb-2" /><span className="text-xs">No Image</span></div>
                  }
                  <FilePicker label={posterPreview ? "Change Poster" : "Upload Poster"} onChange={e => handleUpload("poster", e.target.files[0])} />
                </div>

                {/* QR (paid club events) */}
                {!isTrip && form.paid && (
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-sm font-bold text-gray-700 block mb-2">Payment QR</span>
                    <div className="flex gap-4 items-center">
                      {qrPreview
                        ? <div className="p-2 border border-gray-200 rounded-xl bg-white shadow-sm"><img src={qrPreview} className="w-16 h-16 object-contain" alt="QR" /></div>
                        : <div className="w-20 h-20 bg-gray-50 rounded-xl flex flex-col items-center justify-center text-gray-300 border border-dashed border-gray-200"><FaQrcode size={20} className="mb-1" /><span className="text-[10px]">No QR</span></div>
                      }
                      <div className="flex-1">
                        <FilePicker label={qrPreview ? "Change QR" : "Upload QR"} onChange={e => handleUpload("qr", e.target.files[0])} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button onClick={handleReset} className="flex-1 py-3.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition border border-gray-200">
                  Cancel
                </button>
                <button onClick={handleSubmit} className="flex-[2] py-3.5 rounded-xl font-bold text-white shadow-lg transition hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#CA0002,#e53535)", boxShadow: "0 8px 20px rgba(202,0,2,.25)" }}>
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
