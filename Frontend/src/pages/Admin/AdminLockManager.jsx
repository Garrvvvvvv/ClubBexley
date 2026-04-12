import React, { useState, useEffect } from "react";
import { apiAdmin } from "../../lib/apiAdmin";
import { useAdminEvent } from "../../context/AdminEventContext";
import { toast } from "react-toastify";
import { Link as LinkIcon, Lock, Copy, Trash2, CheckCircle2, XCircle, AlertTriangle, Loader2 } from "lucide-react";

export default function AdminLockManager() {
  const { events, loading: eventsLoading } = useAdminEvent();
  const [locks, setLocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // Form state
  const [selectedEventId, setSelectedEventId] = useState("");

  // UI state
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");

  const CONFIRMATION_PHRASE = "Yes, I confirm  that i wanna revoke link permanently.";

  // Fetch locks
  const fetchLocks = async () => {
    try {
      const res = await apiAdmin.get("/api/locks");
      setLocks(res.data || []);
    } catch (err) {
      console.error("Failed to fetch locks:", err);
      toast.error("Failed to load lock links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocks();
  }, []);

  const handleGenerate = async () => {
    if (!selectedEventId) {
      toast.error("Please select an event");
      return;
    }

    setGenerating(true);
    try {
      const res = await apiAdmin.post("/api/locks/generate", {
        eventId: selectedEventId,
      });

      if (res.data.success) {
        const origin = window.location.origin;
        setGeneratedUrl(`${origin}/lock/${res.data.lock.token}`);
        toast.success("Lock link generated successfully!");
        fetchLocks();
        setSelectedEventId("");
      }
    } catch (err) {
      console.error("Failed to generate lock:", err);
      toast.error(err.response?.data?.message || "Failed to generate lock");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleRevoke = async () => {
    if (!confirmDelete) return;
    if (deleteConfirmationText !== CONFIRMATION_PHRASE) return;
    
    setDeleting(true);
    try {
      await apiAdmin.delete(`/api/locks/${confirmDelete.id}`);
      toast.success("Lock link permanently revoked!");
      fetchLocks();
      setConfirmDelete(null);
      setDeleteConfirmationText("");
    } catch (err) {
      console.error("Failed to revoke lock:", err);
      toast.error("Failed to revoke lock link");
    } finally {
      setDeleting(false);
    }
  };

  const closeModal = () => {
    if (deleting) return;
    setConfirmDelete(null);
    setDeleteConfirmationText("");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading || eventsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <Loader2 className="animate-spin h-10 w-10 mb-4 text-[#CA0002]" />
        <p className="font-bold">Loading lock manager...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto pb-20 relative z-10 space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-1 flex items-center gap-3">
            <Lock className="text-[#CA0002] h-8 w-8" /> Event Lock Links
          </h1>
          <p className="text-gray-500 font-medium tracking-wide">Generate isolation links for specific events.</p>
        </div>
      </div>

      {/* INFO BANNER */}
      <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-start gap-4 shadow-sm">
        <div className="bg-blue-100 text-blue-600 p-2 rounded-xl mt-0.5">
          <AlertTriangle size={20} />
        </div>
        <div>
          <h3 className="text-blue-900 font-bold mb-1">How Lock Links Work</h3>
          <p className="text-blue-700 text-sm font-medium leading-relaxed">
            Lock links transform the entire platform into a single-event microsite. Users accessing via these links 
            will bypass standard navigation and only see/interact with the specifically locked event.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* GENERATOR COLUMN */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#CA0002] to-[#ff4d4f]"></div>
             
             <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2 mt-2">
               <LinkIcon size={20} className="text-[#CA0002]" /> Generate New Link
             </h2>

             <div className="space-y-5">
               <div>
                  <label className="block text-gray-500 text-xs uppercase font-black tracking-widest mb-2">Select Target Event</label>
                  <div className="relative">
                    <select
                      className="w-full bg-gray-50 text-gray-900 font-bold p-3.5 rounded-xl border border-gray-200 focus:border-[#CA0002] focus:ring-4 focus:ring-[#CA0002]/10 outline-none transition-all shadow-sm appearance-none cursor-pointer"
                      value={selectedEventId}
                      onChange={(e) => setSelectedEventId(e.target.value)}
                    >
                      <option value="">-- Choose an Event --</option>
                      {events.map((event) => (
                        <option key={event._id} value={event._id}>
                          {event.name} ({event.slug})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <ChevronDownIcon />
                    </div>
                  </div>
               </div>

               <button
                 onClick={handleGenerate}
                 disabled={generating || !selectedEventId}
                 className="w-full text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
                 style={{ background: (!selectedEventId || generating) ? "#d1d5db" : "linear-gradient(135deg, #CA0002, #e53535)" }}
               >
                 {generating ? <Loader2 className="animate-spin" size={18} /> : <LinkIcon size={18} />}
                 {generating ? "Generating..." : "Generate Lock Link"}
               </button>
             </div>
          </div>

          {/* GENERATED URL RESULT */}
          {generatedUrl && (
            <div className="bg-green-50 border border-green-200 rounded-3xl p-6 shadow-sm animate-fade-in relative">
              <button onClick={() => setGeneratedUrl(null)} className="absolute top-4 right-4 text-green-400 hover:text-green-600 transition-colors">
                <XCircle size={20} />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 text-green-600 p-2 rounded-full"><CheckCircle2 size={24} /></div>
                <h3 className="text-green-900 font-bold text-lg">Link Generated!</h3>
              </div>

              <div className="bg-white border border-green-100 p-3 rounded-xl flex items-center gap-3 shadow-inner">
                <p className="text-xs font-mono text-gray-600 flex-1 break-all select-all">
                  {generatedUrl}
                </p>
                <button 
                  onClick={() => handleCopy(generatedUrl)}
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg shadow transition-colors shrink-0"
                  title="Copy to clipboard"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ACTIVE LOCKS TABLE */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
             
             <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-black text-gray-900">Active Lock Links</h2>
               <span className="bg-gray-100 text-gray-600 font-bold text-xs py-1 px-3 rounded-full border border-gray-200">
                 {locks.length} Total
               </span>
             </div>

             {locks.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
                   <Lock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                   <p className="text-gray-500 font-bold">No lock links created yet.</p>
                </div>
             ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b-2 border-gray-100">
                        <th className="pb-4 pt-2 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Locked Event</th>
                        <th className="pb-4 pt-2 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status / Created</th>
                        <th className="pb-4 pt-2 px-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {locks.map((lock) => (
                        <tr key={lock.id} className="hover:bg-gray-50/50 transition-colors group">
                           <td className="py-4 px-4 align-middle">
                              <p className="font-bold text-gray-900 text-base">{lock.eventName}</p>
                              <p className="text-xs font-mono text-gray-400 mt-0.5">/{lock.eventSlug}</p>
                           </td>
                           <td className="py-4 px-4 align-middle">
                              <div className="flex flex-col items-start gap-1.5">
                                {lock.isValid ? (
                                   <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-green-200">
                                      <CheckCircle2 size={10} /> Active
                                   </span>
                                ) : (
                                   <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-red-200">
                                      <XCircle size={10} /> Expired
                                   </span>
                                )}
                                <span className="text-xs text-gray-500 font-medium">{formatDate(lock.createdAt)}</span>
                              </div>
                           </td>
                           <td className="py-4 px-4 align-middle text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleCopy(`${window.location.origin}/lock/${lock.token}`)}
                                  className="p-2.5 text-gray-500 hover:text-[#CA0002] bg-white hover:bg-red-50 border border-gray-200 rounded-xl transition-colors shadow-sm"
                                  title="Copy URL"
                                >
                                  <Copy size={16} />
                                </button>
                                <button
                                  onClick={() => setConfirmDelete(lock)}
                                  className="p-2.5 text-gray-500 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 rounded-xl transition-colors shadow-sm"
                                  title="Revoke Lock"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* STRICT REVOKE CONFIRMATION MODAL */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-gray-200 shadow-2xl overflow-hidden transform transition-all">
             
             {/* Header */}
             <div className="bg-red-50 p-6 flex flex-col items-center text-center border-b border-red-100">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-red-600 shadow-sm border border-red-100 mb-4">
                   <AlertTriangle size={32} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Revoke Lock Access?</h3>
             </div>

             {/* Body */}
             <div className="p-8 text-center bg-white space-y-6">
                <div>
                  <p className="text-gray-600 font-medium md:text-lg leading-relaxed">
                    This action <span className="text-red-600 font-black">cannot be undone</span>. 
                    Anyone using this link will immediately lose access to the locked version of <span className="font-black text-gray-900">{confirmDelete.eventName}</span>.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 text-left">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    To confirm, please type "<span className="text-[#CA0002] select-all">{CONFIRMATION_PHRASE}</span>" below:
                  </label>
                  <input 
                    type="text" 
                    value={deleteConfirmationText}
                    onChange={(e) => setDeleteConfirmationText(e.target.value)}
                    placeholder="Type confirmation here..."
                    className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium focus:ring-4 focus:ring-red-100 focus:border-[#CA0002] outline-none transition-all placeholder-gray-400"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
             </div>

             {/* Actions */}
             <div className="p-5 bg-gray-50 border-t border-gray-100 flex gap-4">
               <button 
                 onClick={closeModal}
                 disabled={deleting}
                 className="flex-1 px-5 py-4 text-gray-600 hover:text-gray-900 font-bold bg-white border border-gray-200 hover:border-gray-300 rounded-xl transition-colors shadow-sm disabled:opacity-50"
               >
                 Cancel Action
               </button>
               <button 
                 onClick={handleRevoke}
                 disabled={deleting || deleteConfirmationText !== CONFIRMATION_PHRASE}
                 className="flex-[1.5] px-5 py-4 text-white font-black rounded-xl transition-all shadow-md transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100 disabled:shadow-none bg-[#CA0002] hover:bg-[#a80002]"
               >
                 {deleting ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                 {deleting ? "Revoking..." : "Permanently Revoke Link"}
               </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Quick helper for chevron down icon
function ChevronDownIcon() {
  return (
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
    </svg>
  );
}
