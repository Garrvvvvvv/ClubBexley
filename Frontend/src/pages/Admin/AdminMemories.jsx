import { useEffect, useState } from "react";
import { useAdminEvent } from "../../context/AdminEventContext";
import { apiAdmin } from "../../lib/apiAdmin";
import { compressImage } from "../../lib/imageUtils";
import { toast } from "react-toastify";
import { FaImage, FaUpload, FaTrash, FaTimes, FaCameraRetro, FaGlobeAfrica, FaCheckCircle, FaCloudDownloadAlt, FaSpinner } from "react-icons/fa";

const TABS = { EVENT: "EVENT", GLOBAL: "GLOBAL" };
const GLOBAL_CATS = {
  home_announcement: "Announcements Carousel",
  home_memories: "Memories Section",
};

export default function AdminMemories() {
  const { activeEvent } = useAdminEvent();
  const [tab, setTab] = useState(TABS.EVENT);

  // Event Gallery State
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Global Gallery State
  const [globalImages, setGlobalImages] = useState([]);
  const [globalCat, setGlobalCat] = useState("home_announcement");

  // Import Modal State
  const [showImportModal, setShowImportModal] = useState(false);
  const [importEvents, setImportEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [sourcePhotos, setSourcePhotos] = useState([]);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState(new Set());
  const [importing, setImporting] = useState(false);

  // --- EVENT GALLERY FUNCTIONS ---
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
    } catch (e) {
      console.error(e);
      toast.error("Failed to upload photo");
    }
    finally { setUploading(false); }
  };

  const deleteEventPhoto = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this photo?")) return;
    try {
      await apiAdmin.delete(`/api/admin/events/${activeEvent._id}/photos/${id}`);
      loadEventPhotos();
      toast.success("Photo deleted");
    } catch (e) { toast.error("Delete failed"); }
  };

  // --- IMPORT FUNCTIONS ---
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
    const newSet = new Set(selectedPhotoIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedPhotoIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedPhotoIds.size === sourcePhotos.length) {
      setSelectedPhotoIds(new Set());
    } else {
      const allIds = new Set(sourcePhotos.map(p => p._id));
      setSelectedPhotoIds(allIds);
    }
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
    } catch (e) {
      console.error(e);
      toast.error("Import failed");
    } finally {
      setImporting(false);
    }
  };

  // --- GLOBAL GALLERY FUNCTIONS ---
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
    } catch (e) {
      console.error(e);
      toast.error("Failed to upload global photo");
    }
    finally { setUploading(false); }
  };

  const deleteGlobalPhoto = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this global photo?")) return;
    try {
      await apiAdmin.delete(`/api/admin/images/${id}`);
      loadGlobalPhotos();
      toast.success("Photo deleted");
    } catch (e) { toast.error("Delete failed"); }
  };

  useEffect(() => {
    if (tab === TABS.EVENT && activeEvent) {
      loadEventPhotos();
    } else if (tab === TABS.GLOBAL) {
      loadGlobalPhotos();
    }
  }, [tab, activeEvent, globalCat]);

  return (
    <div className="max-w-[1400px] mx-auto pb-20 relative z-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-1 flex items-center gap-3">
            <FaImage className="text-[#CA0002]" /> Gallery Manager
          </h1>
          <p className="text-gray-500 font-medium">Manage event memories and global website imagery.</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner border border-gray-200">
          <button
            onClick={() => setTab(TABS.EVENT)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${tab === TABS.EVENT ? 'bg-white text-[#CA0002] shadow-[0_4px_12px_rgba(0,0,0,0.05)]' : 'text-gray-500 hover:text-gray-800'}`}
          >
            <FaCameraRetro /> Event Photos
          </button>
          <button
            onClick={() => setTab(TABS.GLOBAL)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${tab === TABS.GLOBAL ? 'bg-white text-[#CA0002] shadow-[0_4px_12px_rgba(0,0,0,0.05)]' : 'text-gray-500 hover:text-gray-800'}`}
          >
            <FaGlobeAfrica /> Global Assets
          </button>
        </div>
      </div>

      {/* EVENT MODE */}
      {tab === TABS.EVENT && (
        !activeEvent ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-red-50 text-[#CA0002] rounded-full flex items-center justify-center mb-4 border border-red-100">
               <FaCameraRetro size={32} opacity={0.6} />
            </div>
            <p className="text-xl font-bold text-gray-500">Please select an event from the sidebar first.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Upload Control Bar */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
               {/* Accent Line */}
               <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#CA0002] to-[#ff4d4f]"></div>
              
              <div className="flex-1 w-full pl-2">
                <label className="block text-gray-500 text-xs uppercase font-black tracking-widest mb-2">
                  Upload to <span className="text-[#CA0002]">{activeEvent.name}</span>
                </label>
                <div className="relative group">
                  <input
                    id="event-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none transition-all focus:border-[#CA0002] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#CA0002] file:text-white hover:file:bg-[#a80002] file:cursor-pointer file:transition-colors cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto h-full pt-1">
                <button 
                  onClick={uploadEventPhoto} 
                  disabled={!file || uploading} 
                  className="w-full md:w-auto flex-1 bg-white border border-gray-200 text-gray-700 hover:text-[#CA0002] hover:border-[#CA0002] hover:bg-red-50 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {uploading ? <FaSpinner className="animate-spin" /> : <FaUpload />} 
                  {uploading ? "Uploading..." : "Upload Photo"}
                </button>
  
                <div className="w-px h-8 bg-gray-200 hidden md:block"></div>
  
                <button 
                  onClick={openImportModal} 
                  className="w-full md:w-auto flex-1 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #CA0002, #e53535)",
                    boxShadow: "0 4px 14px rgba(202, 0, 2, 0.25)"
                  }}
                >
                  <FaCloudDownloadAlt size={16} /> Import Photos
                </button>
              </div>
            </div>
            
            <GalleryGrid images={images} onDelete={deleteEventPhoto} loading={loading} />
          </div>
        )
      )}

      {/* GLOBAL MODE */}
      {tab === TABS.GLOBAL && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
             {/* Accent Line */}
             <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#8b5cf6] to-[#c084fc]"></div>

            <div className="flex flex-col md:flex-row gap-8 pl-2">
              {/* Category Selector */}
              <div className="w-full md:w-1/3">
                <label className="block text-gray-500 text-xs uppercase font-black tracking-widest mb-3">Global Category</label>
                <div className="flex flex-col gap-2">
                  {Object.entries(GLOBAL_CATS).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setGlobalCat(key)}
                      className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all text-left ${
                        globalCat === key 
                          ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-sm' 
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Form */}
              <div className="flex-1 flex flex-col justify-end gap-4">
                <div>
                  <label className="block text-gray-500 text-xs uppercase font-black tracking-widest mb-2">Upload New Global Asset</label>
                   <input
                    id="global-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none transition-all focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer file:transition-colors cursor-pointer"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={uploadGlobalPhoto} 
                    disabled={!file || uploading} 
                    className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-400 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm transform hover:-translate-y-0.5"
                  >
                   {uploading ? <FaSpinner className="animate-spin" /> : <FaUpload />} 
                   {uploading ? "Uploading..." : "Upload to Global"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <GalleryGrid images={globalImages} onDelete={deleteGlobalPhoto} loading={loading} isGlobal={true} />
        </div>
      )}

      {/* IMPORT MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl border border-gray-200 flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <FaCloudDownloadAlt className="text-[#CA0002]" /> Import Memories
              </h3>
              <button 
                onClick={() => setShowImportModal(false)} 
                className="text-gray-400 hover:text-[#CA0002] bg-white border border-gray-200 hover:border-red-200 p-2.5 rounded-full transition-all shadow-sm"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 flex-1 overflow-y-auto bg-gray-50/50">
              <div className="mb-8 max-w-xl">
                <label className="block text-gray-500 text-xs uppercase font-black tracking-widest mb-2">Select Source Event</label>
                <div className="relative">
                  <select
                    className="w-full bg-white text-gray-900 font-bold p-4 rounded-xl border border-gray-200 focus:border-[#CA0002] focus:ring-4 focus:ring-[#CA0002]/10 outline-none transition-all shadow-sm appearance-none cursor-pointer"
                    value={selectedEventId}
                    onChange={handleSourceEventChange}
                  >
                    <option value="">-- Choose an Event to copy from --</option>
                    {importEvents.map(evt => (
                      <option key={evt._id} value={evt._id}>{evt.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              {/* Photos Grid */}
              {selectedEventId && (
                <div className="animate-fade-in">
                  <div className="flex justify-between items-end mb-6 pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-gray-900 font-black text-lg">Select photos to clone</p>
                      <p className="text-gray-500 text-sm font-medium">These photos will be copied into {activeEvent.name}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <p className="bg-red-50 text-[#CA0002] border border-red-100 px-4 py-1.5 rounded-full text-sm font-black shadow-sm">
                        {selectedPhotoIds.size} selected
                      </p>
                      <button
                        onClick={toggleSelectAll}
                        className="text-sm font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm transition-all"
                      >
                        {selectedPhotoIds.size === sourcePhotos.length ? "Deselect All" : "Select All"}
                      </button>
                    </div>
                  </div>

                  {loading ? (
                    <div className="text-center py-20 text-gray-400 flex flex-col items-center">
                      <FaSpinner className="animate-spin text-4xl mb-4 text-gray-300" />
                      <p className="font-bold">Loading gallery...</p>
                    </div>
                  ) : sourcePhotos.length === 0 ? (
                    <div className="text-center py-20 bg-white border-2 border-dashed border-gray-200 rounded-2xl shadow-sm">
                      <FaImage className="text-gray-300 text-5xl mx-auto mb-4" />
                      <p className="text-gray-500 font-bold text-lg">No photos found in this event.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {sourcePhotos.map(img => {
                        const isSelected = selectedPhotoIds.has(img._id);
                        return (
                          <div
                            key={img._id}
                            onClick={() => togglePhotoSelection(img._id)}
                            className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-4 transition-all transform ${isSelected ? 'border-[#CA0002] scale-95 shadow-lg' : 'border-transparent hover:scale-[1.02] shadow-sm'}`}
                          >
                            <img src={img.url} className="w-full h-full object-cover bg-gray-100" />
                            <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? 'bg-[#CA0002]/20' : 'bg-black/0 group-hover:bg-black/10'}`}></div>
                            {isSelected && (
                              <div className="absolute top-3 right-3 text-[#CA0002] bg-white rounded-full p-0.5 shadow-xl animate-fade-in">
                                <FaCheckCircle size={24} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-100 bg-white flex justify-end gap-3 rounded-b-3xl">
              <button 
                onClick={() => setShowImportModal(false)} 
                className="px-5 py-2.5 text-gray-500 font-bold text-sm hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeImport}
                disabled={selectedPhotoIds.size === 0 || importing}
                className="text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:shadow-none flex items-center gap-2"
                style={{
                    background: (selectedPhotoIds.size === 0 || importing) ? "#d1d5db" : "linear-gradient(135deg, #CA0002, #e53535)",
                }}
              >
                {importing ? <FaSpinner className="animate-spin" /> : <FaCloudDownloadAlt size={16} />}
                {importing ? "Importing..." : `Pull in ${selectedPhotoIds.size} Photos`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryGrid({ images, onDelete, loading, isGlobal=false }) {
  if (loading) return (
    <div className="text-center py-20 text-gray-400 flex flex-col items-center">
      <FaSpinner className="animate-spin text-4xl mb-4 text-gray-300" />
      <p className="font-bold">Loading gallery...</p>
    </div>
  );
  if (images.length === 0) return (
    <div className="text-center py-20 bg-white border border-gray-200 border-dashed rounded-3xl shadow-sm">
      <FaImage className="text-gray-200 text-6xl mx-auto mb-4" />
      <p className="text-gray-500 font-bold text-lg">Gallery is empty.</p>
      <p className="text-gray-400 text-sm mt-1">Upload some awesome photos to get started!</p>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {images.map(img => (
        <div key={img._id} className="group relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1">
          <img src={img.url} className="w-full h-56 object-cover" alt="Gallery Memory" loading="lazy" />
          
          <div className="absolute inset-x-0 bottom-0 p-4 flex justify-end items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12">
            <button
              onClick={() => onDelete(img._id)}
              className="bg-white text-red-600 hover:bg-[#CA0002] hover:text-white p-2.5 rounded-xl shadow-lg transition-colors border border-transparent hover:border-red-400 transform active:scale-90"
              title="Delete Photo"
            >
              <FaTrash size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}