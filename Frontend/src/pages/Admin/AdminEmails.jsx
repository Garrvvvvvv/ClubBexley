import { useEffect, useState } from "react";
import { useAdminEvent } from "../../context/AdminEventContext";
import { apiAdmin } from "../../lib/apiAdmin";
import { toast } from "react-toastify";
import { FaEnvelope, FaUserCircle, FaPaperPlane, FaSearch, FaCheck, FaClock, FaInbox } from "react-icons/fa";

export default function AdminEmails() {
    const { activeEvent } = useAdminEvent();
    const [regs, setRegs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all"); // "all" | "mailed" | "not_mailed"
    const [resendingId, setResendingId] = useState(null);
    const [selectedRegForHistory, setSelectedRegForHistory] = useState(null); // Modal state

    const fetchRegs = async () => {
        if (!activeEvent) return;
        setLoading(true);
        try {
            const res = await apiAdmin.get(`/api/admin/events/${activeEvent._id}/registrations`);
            // Only show APPROVED registrations on the email tracking page
            setRegs(res.data.filter(r => r.status === "APPROVED"));
        } catch (e) {
            toast.error("Failed to fetch registrations");
        }
        setLoading(false);
    };

    useEffect(() => { fetchRegs(); }, [activeEvent]);

    const handleResendMail = async (id) => {
        setResendingId(id);
        try {
            const res = await apiAdmin.put(
                `/api/admin/events/${activeEvent._id}/registrations/${id}/resend-mail`
            );
            toast.success(`✉ Email sent! (Total: ${res.data.mailCount}×)`);
            fetchRegs();
        } catch (e) {
            toast.error("Failed to send email");
        } finally {
            setResendingId(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit", hour12: true,
        });
    };

    const filtered = regs.filter(r => {
        const matchSearch = searchTerm
            ? r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.oauthEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.batch?.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

        const matchFilter =
            filter === "all" ? true :
                filter === "mailed" ? (r.mailLogs?.length > 0) :
                    filter === "not_mailed" ? (!r.mailLogs?.length) : true;

        return matchSearch && matchFilter;
    });

    const mailedCount = regs.filter(r => r.mailLogs?.length > 0).length;
    const notMailedCount = regs.filter(r => !r.mailLogs?.length).length;

    if (!activeEvent) return (
        <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="w-16 h-16 bg-red-50 text-[#CA0002] rounded-full flex items-center justify-center mb-4">
                <FaUserCircle size={32} opacity={0.5} />
            </div>
            <p className="text-xl font-medium text-gray-500">Select an event from the sidebar.</p>
        </div>
    );

    return (
        <div className="max-w-[1200px] mx-auto relative z-10 pb-20">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-1">
                        Email Tracking <span className="text-[#CA0002] mx-2">•</span>
                        <span className="font-bold text-gray-500">{activeEvent.name}</span>
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                        Track approval emails sent to registered participants
                    </p>
                    {/* Stats row */}
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="text-sm font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                            Approved: <span className="text-gray-900 font-black">{regs.length}</span>
                        </span>
                        <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 shadow-sm flex items-center gap-1.5">
                            <FaEnvelope size={10} /> Mailed: <span className="font-black">{mailedCount}</span>
                        </span>
                        <span className="text-sm font-semibold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 shadow-sm flex items-center gap-1.5">
                            <FaInbox size={10} /> Not Mailed: <span className="font-black">{notMailedCount}</span>
                        </span>
                    </div>
                </div>

                {/* Search */}
                <div className="relative group w-full lg:w-80">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#CA0002] transition-colors">
                        <FaSearch />
                    </div>
                    <input
                        type="text"
                        placeholder="Search name, email, batch..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#CA0002] focus:ring-4 focus:ring-[#CA0002]/10 transition-all font-medium shadow-sm"
                    />
                </div>
            </div>

            {/* FILTER TABS */}
            <div className="flex gap-2 mb-6">
                {[
                    { key: "all", label: "All Approved", count: regs.length },
                    { key: "mailed", label: "Email Sent", count: mailedCount },
                    { key: "not_mailed", label: "Not Emailed", count: notMailedCount },
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border ${filter === tab.key
                            ? "text-white border-transparent shadow-md"
                            : "text-gray-500 bg-white border-gray-200 hover:border-gray-300 hover:text-gray-800"
                            }`}
                        style={filter === tab.key ? { background: "linear-gradient(135deg,#CA0002,#e53535)", boxShadow: "0 4px 12px rgba(202,0,2,0.2)" } : {}}
                    >
                        {tab.label}
                        <span className={`ml-2 text-xs font-black px-1.5 py-0.5 rounded-full ${filter === tab.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                            }`}>{tab.count}</span>
                    </button>
                ))}
            </div>

            {/* LOADING */}
            {loading && (
                <div className="text-center py-20">
                    <div className="inline-block w-8 h-8 border-4 border-[#CA0002]/20 border-t-[#CA0002] rounded-full animate-spin"></div>
                    <p className="text-gray-400 mt-4 font-medium">Loading...</p>
                </div>
            )}

            {/* DESKTOP TABLE */}
            {!loading && filtered.length > 0 && (
                <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider font-bold">
                                <tr>
                                    <th className="p-5 border-b border-gray-200">Registrant</th>
                                    <th className="p-5 border-b border-gray-200">Details</th>
                                    <th className="p-5 border-b border-gray-200">Mail Status</th>
                                    <th className="p-5 border-b border-gray-200">Last Sent</th>
                                    <th className="p-5 border-b border-gray-200 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.map(r => {
                                    const mailCount = r.mailLogs?.length || 0;
                                    const lastSent = mailCount > 0 ? r.mailLogs[mailCount - 1].sentAt : null;

                                    return (
                                        <tr key={r._id} className="hover:bg-gray-50/80 transition-colors">
                                            {/* Registrant */}
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-red-50 text-[#CA0002] flex items-center justify-center font-bold text-base border border-red-100 flex-shrink-0">
                                                        {r.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-900">{r.name}</p>
                                                        <p className="text-xs text-gray-500">{r.oauthEmail}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Details */}
                                            <td className="p-5">
                                                <p className="text-sm font-semibold text-gray-700">Batch: {r.batch}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {r.familyMembers?.length > 0 ? `Family (${r.familyMembers.length + 1})` : "Solo"} · ₹{r.amount}
                                                </p>
                                            </td>

                                            {/* Mail Status */}
                                            <td className="p-5">
                                                {mailCount > 0 ? (
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                                                            <span className="text-sm font-bold text-blue-700">
                                                                {mailCount} email{mailCount > 1 ? "s" : ""} sent
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={() => setSelectedRegForHistory(r)}
                                                            className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline mt-1 text-left w-max transition-colors"
                                                        >
                                                            View History
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0"></span>
                                                        <span className="text-sm font-semibold text-gray-400">Not sent yet</span>
                                                    </div>
                                                )}
                                            </td>

                                            {/* Last Sent */}
                                            <td className="p-5">
                                                {lastSent ? (
                                                    <span className="text-xs font-medium text-gray-600 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">
                                                        {formatDate(lastSent)}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">—</span>
                                                )}
                                            </td>

                                            {/* Action */}
                                            <td className="p-5 text-right">
                                                <button
                                                    onClick={() => handleResendMail(r._id)}
                                                    disabled={resendingId === r._id}
                                                    className="flex items-center gap-2 ml-auto px-4 py-2 rounded-xl font-bold text-sm transition-all border disabled:opacity-50"
                                                    style={
                                                        mailCount === 0
                                                            ? { background: "linear-gradient(135deg,#CA0002,#e53535)", color: "#fff", boxShadow: "0 4px 12px rgba(202,0,2,0.18)", border: "none" }
                                                            : { background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }
                                                    }
                                                >
                                                    <FaPaperPlane size={12} />
                                                    {resendingId === r._id
                                                        ? "Sending..."
                                                        : mailCount === 0
                                                            ? "Send Approval Email"
                                                            : "Resend Reminder"}
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

            {/* EMPTY STATE */}
            {!loading && filtered.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-gray-200">
                            <FaEnvelope className="text-gray-300" size={24} />
                        </div>
                        <p className="text-gray-500 font-medium">
                            {searchTerm ? "No matches found." : "No approved registrations yet."}
                        </p>
                    </div>
                </div>
            )}

            {/* Mobile cards for small screens */}
            {!loading && filtered.length > 0 && (
                <div className="lg:hidden mt-6 space-y-4">
                    {filtered.map(r => {
                        const mailCount = r.mailLogs?.length || 0;
                        return (
                            <div key={r._id + "_m"} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="font-black text-gray-900">{r.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{r.oauthEmail}</p>
                                    </div>
                                    {mailCount > 0 ? (
                                        <span className="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded-full flex items-center gap-1">
                                            <FaEnvelope size={8} /> {mailCount}×
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-black text-gray-500 bg-gray-100 border border-gray-200 px-2 py-1 rounded-full">No Mail</span>
                                    )}
                                </div>
                                {mailCount > 0 && (
                                    <div className="mb-3">
                                        <button
                                            onClick={() => setSelectedRegForHistory(r)}
                                            className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline transition-colors"
                                        >
                                            View Mail History
                                        </button>
                                    </div>
                                )}
                                <button
                                    onClick={() => handleResendMail(r._id)}
                                    disabled={resendingId === r._id}
                                    className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                    style={
                                        mailCount === 0
                                            ? { background: "linear-gradient(135deg,#CA0002,#e53535)", color: "#fff" }
                                            : { background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }
                                    }
                                >
                                    <FaPaperPlane size={12} />
                                    {resendingId === r._id ? "Sending..." : mailCount === 0 ? "Send Email" : "Resend Reminder"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* MAIL HISTORY MODAL */}
            {selectedRegForHistory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                        style={{ animation: 'slideUp 0.3s ease-out' }}
                    >
                        {/* Header */}
                        <div className="bg-gray-50 p-5 border-b border-gray-200 flex justify-between items-center text-left">
                            <div>
                                <h3 className="text-lg font-black text-gray-900">Email History</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">{selectedRegForHistory.name}</p>
                            </div>
                            <button
                                onClick={() => setSelectedRegForHistory(null)}
                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors font-bold"
                            >
                                ×
                            </button>
                        </div>

                        {/* Body - Timeline */}
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            <div className="relative border-l-2 border-blue-100 ml-3 pl-6 space-y-6">
                                {selectedRegForHistory.mailLogs?.map((log, idx) => (
                                    <div key={idx} className="relative text-left">
                                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 border-white bg-blue-500 shadow-sm"></div>
                                        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                                            Mail #{idx + 1}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {formatDate(log.sentAt)}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Status: <span className="text-green-600 font-semibold">Sent Successfully</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-5 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={() => setSelectedRegForHistory(null)}
                                className="w-full py-3 bg-white border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
