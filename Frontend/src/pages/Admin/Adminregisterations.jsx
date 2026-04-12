import { useEffect, useState } from "react";
import { useAdminEvent } from "../../context/AdminEventContext";
import { apiAdmin } from "../../lib/apiAdmin";
import { toast } from "react-toastify";
import * as Papa from 'papaparse';
import { FaFileCsv, FaDownload, FaTimes, FaSearch, FaUserCircle, FaCheck, FaBan, FaTrash, FaEnvelope } from "react-icons/fa";

export default function AdminRegistrations() {
  const { activeEvent } = useAdminEvent();
  const [regs, setRegs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewReceipt, setViewReceipt] = useState(null);
  const [loadingReceiptId, setLoadingReceiptId] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  // Approval confirmation modal state
  const [approvalModal, setApprovalModal] = useState({ open: false, reg: null });

  const fetchRegs = async () => {
    if (!activeEvent) return;
    setLoading(true);
    try {
      const res = await apiAdmin.get(`/api/admin/events/${activeEvent._id}/registrations`);
      setRegs(res.data);
    } catch (e) { toast.error("Fetch failed"); }
    setLoading(false);
  };

  useEffect(() => { fetchRegs(); }, [activeEvent]);

  const handleStatus = async (id, status, sendMail = false) => {
    try {
      const res = await apiAdmin.put(
        `/api/admin/events/${activeEvent._id}/registrations/${id}/status`,
        { status, sendMail }
      );
      if (status === "APPROVED") {
        if (sendMail && res.data.mailSent) {
          toast.success("✅ Approved & confirmation email sent!");
        } else if (sendMail && !res.data.mailSent) {
          toast.warning("Approved, but email failed to send.");
        } else {
          toast.success("Registration approved.");
        }
      } else {
        toast.success(`Marked as ${status}`);
      }
      fetchRegs();
    } catch (e) { toast.error("Update failed"); }
  };

  const handleDelete = async (id, candidateName) => {
    const expectedInput = `Yes, I confirm the deletion of the registration for ${candidateName} from the event ${activeEvent.name}.`;
    const userInput = window.prompt(
      `WARNING: This action cannot be undone!\n\nTo confirm deletion, please type exactly:\n${expectedInput}`
    );

    if (userInput !== expectedInput) {
      if (userInput !== null) {
        toast.error("Deletion cancelled: Input did not match exactly.");
      }
      return;
    }

    try {
      await apiAdmin.delete(`/api/admin/events/${activeEvent._id}/registrations/${id}`);
      toast.success("Registration deleted successfully");
      fetchRegs();
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete registration");
    }
  };

  const fetchReceipt = async (regId) => {
    setLoadingReceiptId(regId);
    try {
      const response = await apiAdmin.get(
        `/api/admin/events/${activeEvent._id}/registrations/${regId}/receipt`,
        { responseType: 'blob' }
      );
      const imageUrl = URL.createObjectURL(response.data);
      setViewReceipt(imageUrl);
    } catch (error) {
      console.error("Failed to load receipt", error);
      toast.error("Could not load receipt image");
    } finally {
      setLoadingReceiptId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  const toggleRow = (id) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const filteredRegs = regs.filter(r => {
    const searchLower = searchTerm.toLowerCase();
    return (
      r.name?.toLowerCase().includes(searchLower) ||
      r.oauthEmail?.toLowerCase().includes(searchLower) ||
      r.batch?.toLowerCase().includes(searchLower) ||
      r.contact?.toLowerCase().includes(searchLower) ||
      r.mobile?.toLowerCase().includes(searchLower)
    );
  });

  const exportToCSV = () => {
    const data = filteredRegs.map(r => ({
      Name: r.name,
      Email: r.oauthEmail,
      Batch: r.batch,
      Contact: r.contact || r.mobile || "N/A",
      Type: r.familyMembers?.length > 0 ? `Family (${r.familyMembers.length})` : "Solo",
      "Family Members": r.familyMembers?.map(fm => `${fm.name} (${fm.relation})`).join(", ") || "N/A",
      Amount: r.amount || 0,
      Status: r.status,
      "Registered On": formatDate(r.createdAt),
      "Approved By": r.approvedBy?.username || "N/A",
      "Emails Sent": r.mailLogs?.length || 0,
    }));

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `${activeEvent.name}_Registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV file downloaded!");
    setShowExportModal(false);
  };

  if (!activeEvent) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="w-16 h-16 bg-red-50 text-[#CA0002] rounded-full flex items-center justify-center mb-4">
        <FaUserCircle size={32} opacity={0.5} />
      </div>
      <p className="text-xl font-medium text-gray-500">Select an event from the sidebar.</p>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto relative z-10 pb-20">

      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-1">
            Registrations <span className="text-[#CA0002] mx-2">•</span> <span className="font-bold text-gray-500">{activeEvent.name}</span>
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              Total: <span className="text-gray-900 font-black">{regs.length}</span>
            </span>
            <span className="text-sm font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              Showing: <span className="text-[#CA0002] font-black">{filteredRegs.length}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative group w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#CA0002] transition-colors">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search candidate, email, batch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#CA0002] focus:ring-4 focus:ring-[#CA0002]/10 transition-all font-medium shadow-sm"
            />
          </div>

          <button
            onClick={() => setShowExportModal(true)}
            disabled={filteredRegs.length === 0}
            className="flex items-center justify-center gap-2 bg-white hover:bg-red-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 border border-gray-200 text-[#CA0002] px-6 py-3 rounded-xl font-bold transition-all shadow-sm transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <FaDownload /> Export CSV
          </button>
        </div>
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider font-bold">
              <tr>
                <th className="p-5 border-b border-gray-200">Candidate</th>
                <th className="p-5 border-b border-gray-200">Contact</th>
                <th className="p-5 border-b border-gray-200">Type & Amount</th>
                <th className="p-5 border-b border-gray-200">Receipt</th>
                <th className="p-5 border-b border-gray-200">Registration Details</th>
                <th className="p-5 border-b border-gray-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRegs.length > 0 ? (
                filteredRegs.map(r => (
                  <tr key={r._id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-50 text-[#CA0002] flex items-center justify-center font-bold text-lg border border-red-100">
                          {r.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-base">{r.name}</p>
                          <p className="text-xs text-gray-500 font-medium">{r.oauthEmail}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-5">
                      <p className="font-semibold text-gray-700">{r.contact || r.mobile || "N/A"}</p>
                      <p className="text-xs text-gray-500 inline-block bg-gray-100 px-2 py-0.5 rounded mt-1">Batch: {r.batch}</p>
                    </td>

                    <td className="p-5">
                      <div className="flex flex-col gap-1.5 items-start">
                        {r.familyMembers?.length > 0 ? (
                          <div className="relative">
                            <button
                              onClick={() => toggleRow(r._id)}
                              className="bg-purple-50 text-purple-700 border border-purple-200 font-bold px-2.5 py-1 rounded-md text-xs hover:bg-purple-100 transition-colors flex items-center gap-1"
                            >
                              Family ({r.familyMembers.length})
                              <span className="text-[10px] ml-1">{expandedRows.has(r._id) ? '▼' : '▶'}</span>
                            </button>
                            {expandedRows.has(r._id) && (
                              <div className="absolute z-20 top-full left-0 mt-2 min-w-[200px] bg-white border border-gray-200 shadow-xl rounded-xl p-3">
                                <p className="text-xs font-bold text-gray-400 uppercase border-b border-gray-100 pb-2 mb-2">Dependents</p>
                                {r.familyMembers.map((fm, idx) => (
                                  <div key={idx} className="text-sm mb-1.5 last:mb-0 flex justify-between">
                                    <span className="text-gray-800 font-semibold">{fm.name}</span>
                                    <span className="text-purple-600 bg-purple-50 px-1.5 rounded text-xs py-0.5">{fm.relation}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="bg-blue-50 text-blue-700 border border-blue-200 font-bold px-2.5 py-1 rounded-md text-xs">Solo</span>
                        )}
                        <span className="text-sm font-black text-green-600">₹{r.amount}</span>
                      </div>
                    </td>

                    <td className="p-5">
                      {r.receipt ? (
                        <button
                          onClick={() => fetchReceipt(r._id)}
                          className="text-[#CA0002] bg-red-50 hover:bg-[#CA0002] hover:text-white border border-red-100 font-semibold text-xs px-3 py-1.5 rounded-lg transition-all"
                        >
                          {loadingReceiptId === r._id ? "Loading..." : "View Receipt"}
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs italic bg-gray-50 px-2 py-1 rounded border border-gray-100">No Receipt</span>
                      )}
                    </td>

                    <td className="p-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5 text-ellipsis">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {formatDate(r.createdAt)}
                        </span>
                        {r.approvedBy && (
                          <span className="text-xs font-semibold text-[#CA0002] flex items-center gap-1.5 mt-0.5">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            By: {r.approvedBy.username}
                          </span>
                        )}
                        {/* Mail log badge */}
                        {r.mailLogs?.length > 0 && (
                          <span className="text-xs font-semibold text-blue-600 flex items-center gap-1.5">
                            <FaEnvelope size={10} />
                            Mail sent {r.mailLogs.length}×
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {r.status === "PENDING" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => setApprovalModal({ open: true, reg: r })}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors shadow-sm font-bold text-xs"
                            >Approve</button>
                            <button onClick={() => handleStatus(r._id, "REJECTED")} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors shadow-sm font-bold text-xs">Reject</button>
                          </div>
                        )}

                        {r.status === "APPROVED" && (
                          <div className="flex items-center gap-2">
                            <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-black uppercase px-2 py-1 rounded-full tracking-wider">Approved</span>
                            <button onClick={() => handleStatus(r._id, "PENDING")} className="text-gray-500 hover:text-orange-600 px-3 py-1.5 transition-colors border border-transparent hover:border-orange-200 hover:bg-orange-50 rounded-lg text-xs font-bold" title="Reset to Pending">Undo</button>
                          </div>
                        )}

                        {r.status === "REJECTED" && (
                          <div className="flex items-center gap-2">
                            <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-black uppercase px-2 py-1 rounded-full tracking-wider">Rejected</span>
                            <button
                              onClick={() => setApprovalModal({ open: true, reg: r })}
                              className="text-gray-500 hover:text-green-600 px-3 py-1.5 transition-colors border border-transparent hover:border-green-200 hover:bg-green-50 rounded-lg text-xs font-bold"
                            >Approve</button>
                            <button onClick={() => handleStatus(r._id, "PENDING")} className="text-gray-500 hover:text-gray-800 px-3 py-1.5 transition-colors border border-transparent hover:border-gray-300 hover:bg-gray-100 rounded-lg text-xs font-bold">Undo</button>
                            <div className="w-px h-4 bg-gray-200 mx-1"></div>
                            <button onClick={() => handleDelete(r._id, r.name)} className="text-red-500 hover:text-white hover:bg-[#CA0002] px-3 py-1.5 rounded-lg transition-all border border-transparent hover:border-red-600 shadow-sm text-xs font-bold">Delete</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-gray-200">
                        <FaSearch className="text-gray-300" size={24} />
                      </div>
                      <p className="text-gray-500 font-medium">
                        {searchTerm ? "No candidates match your search criteria." : "No registrations found yet."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="lg:hidden space-y-4 pt-2">
        {filteredRegs.length > 0 ? (
          filteredRegs.map(r => (
            <div key={r._id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm relative overflow-hidden">
              {/* Status Border Accent */}
              <div className={`absolute top-0 left-0 w-1 h-full ${r.status === 'APPROVED' ? 'bg-green-500' : r.status === 'REJECTED' ? 'bg-orange-500' : 'bg-gray-300'}`}></div>

              {/* Header */}
              <div className="flex justify-between items-start mb-4 pl-2">
                <div>
                  <p className="font-black text-gray-900 text-lg">{r.name}</p>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">{r.oauthEmail}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">Batch: {r.batch}</span>
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">₹{r.amount}</span>
                    {r.mailLogs?.length > 0 && (
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
                        <FaEnvelope size={8} /> {r.mailLogs.length}×
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  {r.status === "APPROVED" && <span className="text-[10px] font-black px-2.5 py-1 rounded-full text-green-700 bg-green-50 border border-green-200 uppercase tracking-wider">APPROVED</span>}
                  {r.status === "REJECTED" && <span className="text-[10px] font-black px-2.5 py-1 rounded-full text-orange-700 bg-orange-50 border border-orange-200 uppercase tracking-wider">REJECTED</span>}
                  {r.status === "PENDING" && <span className="text-[10px] font-black px-2.5 py-1 rounded-full text-gray-600 bg-gray-100 border border-gray-200 uppercase tracking-wider">PENDING</span>}

                  {r.receipt && (
                    <button onClick={() => fetchReceipt(r._id)} className="text-[#CA0002] font-bold text-[10px] underline hover:no-underline">
                      {loadingReceiptId === r._id ? "..." : "Receipt"}
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm border border-gray-100 ml-2">
                <div className="grid grid-cols-2 gap-y-2">
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Contact</span>
                    <span className="font-semibold text-gray-800">{r.contact || r.mobile || "N/A"}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Type</span>
                    {r.familyMembers?.length > 0 ? (
                      <span className="font-semibold text-purple-700">Family ({r.familyMembers.length})</span>
                    ) : (
                      <span className="font-semibold text-blue-700">Solo</span>
                    )}
                  </div>
                  <div className="col-span-2 mt-1">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Registered On</span>
                    <span className="text-xs font-medium text-gray-600">{formatDate(r.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pl-2">
                {r.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => setApprovalModal({ open: true, reg: r })}
                      className="flex-1 bg-green-500 text-white py-2 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-transform"
                    >Approve</button>
                    <button onClick={() => handleStatus(r._id, "REJECTED")} className="flex-1 bg-orange-500 text-white py-2 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-transform">Reject</button>
                  </>
                )}
                {r.status === "APPROVED" && (
                  <>
                    <button onClick={() => handleStatus(r._id, "PENDING")} className="flex-1 bg-white border-2 border-orange-500 text-orange-600 py-2 rounded-xl font-bold text-sm active:scale-95 transition-transform">Undo</button>
                  </>
                )}
                {r.status === "REJECTED" && (
                  <>
                    <button onClick={() => setApprovalModal({ open: true, reg: r })} className="flex-1 bg-white border-2 border-green-500 text-green-600 py-2 rounded-xl font-bold text-sm active:scale-95 transition-transform">Approve</button>
                    <button onClick={() => handleDelete(r._id, r.name)} className="bg-red-50 text-[#CA0002] border border-red-200 px-4 rounded-xl font-bold text-sm active:scale-95 transition-transform"><FaTrash /></button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 shadow-sm text-gray-400 font-medium">
            {searchTerm ? "No candidates found." : "No registrations found yet."}
          </div>
        )}
      </div>

      {/* ============================================
          APPROVAL CONFIRMATION MODAL
      ============================================ */}
      {approvalModal.open && approvalModal.reg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md"
          onClick={() => setApprovalModal({ open: false, reg: null })}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-3">
                  <FaCheck size={20} />
                </div>
                <h3 className="text-xl font-black text-gray-900">Approve Registration</h3>
                <p className="text-sm text-gray-500 mt-1 font-medium">
                  How would you like to approve <span className="text-gray-900 font-bold">{approvalModal.reg.name}</span>?
                </p>
              </div>
              <button
                onClick={() => setApprovalModal({ open: false, reg: null })}
                className="text-gray-400 hover:text-[#CA0002] bg-gray-50 hover:bg-red-50 p-2 rounded-full transition-colors"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Registration summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm border border-gray-100">
              <div className="flex justify-between mb-1.5">
                <span className="text-gray-500">Email</span>
                <span className="font-semibold text-gray-800 truncate ml-4">{approvalModal.reg.oauthEmail}</span>
              </div>
              <div className="flex justify-between mb-1.5">
                <span className="text-gray-500">Batch</span>
                <span className="font-semibold text-gray-800">{approvalModal.reg.batch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-bold text-green-600">₹{approvalModal.reg.amount}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {/* Approve & Send Email */}
              <button
                onClick={() => {
                  handleStatus(approvalModal.reg._id, "APPROVED", true);
                  setApprovalModal({ open: false, reg: null });
                }}
                className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg transform hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#CA0002,#e53535)", boxShadow: "0 8px 20px rgba(202,0,2,0.2)" }}
              >
                <FaEnvelope size={14} />
                Approve & Send Email
              </button>

              {/* Approve only */}
              <button
                onClick={() => {
                  handleStatus(approvalModal.reg._id, "APPROVED", false);
                  setApprovalModal({ open: false, reg: null });
                }}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-bold transition-all shadow-sm"
              >
                <FaCheck size={14} />
                Approve Only
              </button>

              {/* Cancel */}
              <button
                onClick={() => setApprovalModal({ open: false, reg: null })}
                className="w-full py-3 rounded-xl font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md" onClick={() => setShowExportModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform scale-100 animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-black text-gray-900">Export CSV</h3>
              <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-[#CA0002] bg-gray-50 hover:bg-red-50 p-2 rounded-full transition-colors">
                <FaTimes size={16} />
              </button>
            </div>

            <p className="text-gray-500 font-medium text-sm mb-8">Download registration data for <span className="font-bold text-gray-800">{activeEvent.name}</span>.</p>

            <button
              onClick={exportToCSV}
              className="w-full flex items-center justify-center gap-3 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg transform hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #CA0002, #e53535)", boxShadow: "0 8px 20px rgba(202, 0, 2, 0.25)" }}
            >
              <FaFileCsv size={24} />
              <span>Download CSV File</span>
            </button>

            <p className="text-xs font-bold text-gray-400 mt-6 text-center uppercase tracking-wide">
              {filteredRegs.length} record{filteredRegs.length !== 1 ? 's' : ''} prepared for export
            </p>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {viewReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-md animate-fade-in" onClick={() => setViewReceipt(null)}>
          <div className="relative max-w-2xl max-h-[85vh] w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setViewReceipt(null)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-[#CA0002] hover:text-white text-gray-700 shadow-md backdrop-blur-sm rounded-full p-2.5 transition-colors z-10 border border-gray-100"
            >
              <FaTimes size={16} />
            </button>
            <div className="w-full h-full bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-100">
              <img src={viewReceipt} alt="Receipt" className="max-w-full max-h-[80vh] object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
