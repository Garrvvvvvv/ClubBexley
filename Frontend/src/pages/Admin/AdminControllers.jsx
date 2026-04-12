import { useEffect, useState } from "react";
import { apiAdmin } from "../../lib/apiAdmin";
import { useAdminEvent } from "../../context/AdminEventContext";
import { toast } from "react-toastify";
import { UserCheck, UserX, Shield, Calendar, Search, Edit3, Trash2, ChevronDown, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function AdminControllers() {
  const [pending, setPending] = useState([]);
  const [active, setActive] = useState([]);
  const [rejected, setRejected] = useState([]);
  const { events } = useAdminEvent();
  const [selections, setSelections] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPending, setExpandedPending] = useState(null);

  const loadData = async () => {
    try {
      const [pRes, aRes, rRes] = await Promise.all([
        apiAdmin.get("/api/admin/controllers/pending"),
        apiAdmin.get("/api/admin/controllers"),
        apiAdmin.get("/api/admin/controllers/rejected")
      ]);
      setPending(pRes.data);
      setActive(aRes.data);
      setRejected(rRes.data);
    } catch {
      // Silent fail
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleApprove = async (id, overrideEvents = null) => {
    const assigned = overrideEvents || selections[id] || [];

    try {
      await apiAdmin.post(`/api/admin/controllers/${id}/approve`, { events: assigned });
      toast.success("Controller approved successfully!");
      loadData();
      setSelections({});
      setExpandedPending(null);
    } catch {
      toast.error("Approval failed.");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this controller request?")) return;
    try {
      await apiAdmin.post(`/api/admin/controllers/${id}/reject`);
      toast.success("Controller rejected");
      loadData();
      setExpandedPending(null);
    } catch {
      toast.error("Failed to reject.");
    }
  };

  const handleRevert = async (id) => {
    try {
      await apiAdmin.post(`/api/admin/controllers/${id}/revert`);
      toast.success("Reverted to pending");
      loadData();
    } catch {
      toast.error("Failed to revert.");
    }
  };

  const handleRevoke = async (id) => {
    if (!window.confirm("Are you sure you want to completely revoke access for this controller?")) return;
    try {
      await apiAdmin.post(`/api/admin/controllers/${id}/revoke`);
      toast.success("Access revoked");
      loadData();
    } catch {
      toast.error("Failed to revoke.");
    }
  };

  const toggleEvent = (controllerId, eventId) => {
    const current = selections[controllerId] || [];
    const newSelection = current.includes(eventId)
      ? current.filter(id => id !== eventId)
      : [...current, eventId];
    setSelections({ ...selections, [controllerId]: newSelection });
  };

  const handleUpdateEvents = async (controllerId) => {
    try {
      await apiAdmin.post(`/api/admin/controllers/${controllerId}/approve`, {
        events: selections[controllerId] || [],
        replace: true
      });
      toast.success("Events updated successfully!");
      loadData();
      setSelections({ ...selections, editing: null });
    } catch {
      toast.error("Update failed");
    }
  };

  // Filter Active Controllers based on search query
  const filteredActive = active.filter(c => 
    c.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.approvedEvents?.some(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-[1400px] mx-auto pb-20 relative z-10 space-y-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-1 flex items-center gap-3">
            <Shield className="text-[#CA0002] h-8 w-8" /> Controller Access
          </h1>
          <p className="text-gray-500 font-medium tracking-wide">Manage scanner permissions and event assignments.</p>
        </div>
        
        {/* Stats Summary Panel */}
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <div className="bg-white px-5 py-3 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3">
            <div className="bg-blue-50 text-blue-600 p-2 rounded-xl"><Shield size={18} /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Active</p>
              <p className="text-xl font-black text-gray-800 leading-none">{active.length}</p>
            </div>
          </div>
          <div className="bg-white px-5 py-3 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3">
            <div className="bg-yellow-50 text-yellow-600 p-2 rounded-xl"><AlertCircle size={18} /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pending Review</p>
              <p className="text-xl font-black text-gray-800 leading-none">{pending.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PENDING REQUESTS SECTION (Collapsible Cards for high-density) */}
      {pending.length > 0 && (
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-yellow-100 shadow-[0_8px_30px_rgb(234,179,8,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-yellow-400 to-yellow-600"></div>
          
          <div className="flex items-center gap-3 mb-6 pl-2">
            <div className="bg-yellow-100 text-yellow-600 p-2 rounded-xl"><UserCheck size={20} /></div>
            <h2 className="text-xl font-black text-gray-900">Pending Approvals <span className="bg-yellow-100 text-yellow-800 py-0.5 px-2.5 rounded-full text-sm ml-2">{pending.length}</span></h2>
          </div>

          <div className="space-y-3 pl-2">
            {pending.map(c => {
              const requestedIds = c.requestedEvents?.map(e => e._id) || [];
              const selectedEvents = selections[c._id] || requestedIds;
              const isExpanded = expandedPending === c._id;

              return (
                <div key={c._id} className={`border rounded-2xl transition-all duration-300 ${isExpanded ? 'border-yellow-400 shadow-lg bg-yellow-50/30' : 'border-gray-200 hover:border-yellow-300 bg-white'}`}>
                  
                  {/* Summary Header (Always visible) */}
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedPending(isExpanded ? null : c._id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-500 text-lg border border-gray-200">
                        {c.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900 leading-tight">@{c.username}</p>
                        <p className="text-xs text-gray-500 font-medium">
                          Targeting {requestedIds.length} event{requestedIds.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {!isExpanded && (
                        <div className="hidden md:flex gap-2 mr-4">
                          <button onClick={(e) => { e.stopPropagation(); handleReject(c._id); }} className="px-4 py-1.5 rounded-lg text-sm font-bold text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors">Reject</button>
                        </div>
                      )}
                      <ChevronDown className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="p-5 border-t border-yellow-100 bg-white rounded-b-2xl animate-fade-in">
                      <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Assign Event Access</p>
                      
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-5 max-h-[250px] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                          {events.map(ev => {
                            const isSelected = selectedEvents.includes(ev._id);
                            const isRequested = requestedIds.includes(ev._id);

                            return (
                              <label
                                key={ev._id}
                                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border ${isSelected
                                  ? 'bg-yellow-50 border-yellow-400 shadow-sm'
                                  : 'bg-white border-gray-200 hover:border-yellow-300'
                                  }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleEvent(c._id, ev._id)}
                                  className="mt-1 h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-bold truncate ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                    {ev.name}
                                  </p>
                                  <div className="flex items-center justify-between mt-0.5">
                                    <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                      <Calendar size={12} /> {new Date(ev.date).toLocaleDateString()}
                                    </p>
                                    {isRequested && <span className="text-[10px] font-black uppercase text-yellow-600 bg-yellow-100 px-1.5 rounded">Requested</span>}
                                  </div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <p className="text-sm font-bold text-gray-600">
                          <span className="text-gray-900">{selectedEvents.length}</span> event{selectedEvents.length !== 1 ? 's' : ''} mapped to <span className="text-gray-900">@{c.username}</span>
                        </p>
                        <div className="flex w-full sm:w-auto gap-3">
                          <button
                            onClick={() => handleReject(c._id)}
                            className="flex-1 sm:flex-none border border-red-200 hover:border-red-300 text-red-600 bg-white hover:bg-red-50 px-6 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                          >
                            <XCircle size={16} /> Reject
                          </button>
                          <button
                            onClick={() => handleApprove(c._id, selectedEvents)}
                            className="flex-1 sm:flex-none text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            style={{ background: "linear-gradient(135deg, #eab308, #ca8a04)" }}
                          >
                            <CheckCircle2 size={16} /> Approve & Grant Access
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ACTIVE CONTROLLERS SECTION (High-Density Table) */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#CA0002] to-[#ff4d4f]"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pl-2">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 text-[#CA0002] p-2 rounded-xl"><Shield size={20} /></div>
            <h2 className="text-xl font-black text-gray-900">Active Controllers</h2>
          </div>
          
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search controllers or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-[#CA0002]/20 focus:border-[#CA0002] outline-none transition-all placeholder-gray-400"
            />
          </div>
        </div>

        {filteredActive.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 border border-dashed border-gray-200 rounded-2xl ml-2">
             <Shield className="h-12 w-12 text-gray-300 mx-auto mb-3" />
             <p className="text-gray-500 font-bold">No active controllers found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto ml-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="pb-4 pt-2 px-4 text-xs font-black text-gray-400 uppercase tracking-widest w-[25%]">Controller</th>
                  <th className="pb-4 pt-2 px-4 text-xs font-black text-gray-400 uppercase tracking-widest w-[55%]">Assigned Events</th>
                  <th className="pb-4 pt-2 px-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right w-[20%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredActive.map(c => {
                  const isEditing = selections.editing === c._id;
                  const currentEventIds = c.approvedEvents?.map(e => e._id) || [];
                  const selectedEvents = selections[c._id] || currentEventIds;

                  return (
                    <tr key={c._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-600 text-lg border border-gray-200 shadow-inner">
                            {c.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm md:text-base leading-tight">@{c.username}</p>
                            <span className="inline-flex items-center gap-1.5 mt-1 bg-green-50 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-green-200">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span> Active
                            </span>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4 align-top">
                        {isEditing ? (
                           <div className="bg-gray-50 p-4 rounded-xl border border-[#CA0002]/30 shadow-inner max-w-2xl">
                             <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Modify Event Access</p>
                             <div className="max-h-48 overflow-y-auto mb-4 bg-white border border-gray-200 rounded-lg p-2">
                               {events.map(ev => {
                                 const isSelected = selectedEvents.includes(ev._id);
                                 return (
                                   <label
                                     key={ev._id}
                                     className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}
                                   >
                                     <input
                                       type="checkbox"
                                       checked={isSelected}
                                       onChange={() => toggleEvent(c._id, ev._id)}
                                       className="h-4 w-4 rounded border-gray-300 text-[#CA0002] focus:ring-[#CA0002]"
                                     />
                                     <span className={`text-sm ${isSelected ? 'text-[#CA0002] font-bold' : 'text-gray-600 font-medium'}`}>
                                       {ev.name}
                                     </span>
                                   </label>
                                 );
                               })}
                             </div>
                             <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                               <button
                                 onClick={() => setSelections({ ...selections, editing: null })}
                                 className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                               >
                                 Cancel
                               </button>
                               <button
                                 onClick={() => handleUpdateEvents(c._id)}
                                 className="px-5 py-2 text-sm font-bold text-white bg-[#CA0002] hover:bg-[#a80002] rounded-lg shadow-md transition-all flex items-center gap-2"
                               >
                                 <CheckCircle2 size={16} /> Save Security
                               </button>
                             </div>
                           </div>
                        ) : (
                          <div className="flex flex-wrap gap-2 max-w-2xl">
                            {c.approvedEvents && c.approvedEvents.length > 0 ? (
                              c.approvedEvents.map(e => (
                                <span key={e._id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-gray-200 text-gray-700 shadow-sm whitespace-normal text-left">
                                  <Calendar size={12} className="text-gray-400" />
                                  {e.name}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">Zero active assignments</span>
                            )}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4 align-top text-right">
                         {!isEditing && (
                           <div className="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                             <button
                               onClick={() => setSelections({ ...selections, [c._id]: currentEventIds, editing: c._id })}
                               className="p-2.5 text-gray-500 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-gray-200 rounded-xl transition-colors shadow-sm"
                               title="Edit Assigned Events"
                             >
                               <Edit3 size={16} />
                             </button>
                             <button
                               onClick={() => handleRevoke(c._id)}
                               className="p-2.5 text-gray-500 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 rounded-xl transition-colors shadow-sm"
                               title="Revoke All Access"
                             >
                               <Trash2 size={16} />
                             </button>
                           </div>
                         )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* REJECTED REQUESTS SECTION */}
      {rejected.length > 0 && (
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-red-100 shadow-[0_4px_20px_rgb(220,38,38,0.03)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-gray-300 to-gray-400"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pl-2">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 text-gray-500 p-2 rounded-xl"><UserX size={20} /></div>
              <h2 className="text-xl font-black text-gray-900">Rejected Requests</h2>
            </div>
            <span className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">
               {rejected.length} Past Rejection{rejected.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pl-2">
            {rejected.map(c => (
              <div key={c._id} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col justify-between group hover:border-gray-300 hover:bg-white transition-all shadow-sm">
                <div className="mb-4">
                  <div className="flex justify-between items-start">
                    <p className="text-lg font-bold text-gray-800 break-all leading-tight">@{c.username}</p>
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100">Rejected</span>
                  </div>
                  <p className="text-xs font-medium text-gray-500 mt-2 line-clamp-2">
                    <span className="font-bold">Prior Request:</span> {c.requestedEvents?.map(e => e.name).join(", ") || "None"}
                  </p>
                </div>
                <button
                  onClick={() => handleRevert(c._id)}
                  className="w-full bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 text-gray-600 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                   <UserCheck size={14} /> Reevaluate Application
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}