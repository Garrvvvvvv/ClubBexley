import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiController } from "../../lib/apiController";
import { ArrowLeft, User, Phone, Mail, Calendar, Download, X, FileSpreadsheet } from "lucide-react";
import EventControllerNavbar from "../../components/EventControllerNavbar";
import * as Papa from "papaparse";

export default function ControllerEventDetails() {
    const { eventId } = useParams();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [filter, setFilter] = useState("ALL");
    const [showExportModal, setShowExportModal] = useState(false);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const res = await apiController.get(`/api/controller/registrations/${eventId}`);
                setCandidates(res.data.candidates || []);
            } catch {
                setErr("Failed to load registrations. You may not be authorized for this event.");
            } finally {
                setLoading(false);
            }
        };

        fetchRegistrations();
    }, [eventId]);

    // Fix ambiguous arrow function by wrapping conditional in parentheses
    const filtered = candidates.filter(c => (filter === "ALL" ? true : c.status === filter));

    // Export to CSV
    const exportToCSV = () => {
        const data = filtered.map(c => ({
            Name: c.name,
            Email: c.oauthEmail,
            Contact: c.contact || "N/A",
            Status: c.status,
        }));

        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", `Event_${eventId}_Registrations_${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setShowExportModal(false);
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50">
            <EventControllerNavbar />
            <div className="p-10 text-center text-gray-500">Loading registrations...</div>
        </div>
    );
    if (err) return (
        <div className="min-h-screen bg-gray-50">
            <EventControllerNavbar />
            <div className="p-10 text-center text-red-500 font-bold">{err}</div>
        </div>
    );

    const getStatusBadgeStyles = (status) => {
        if (status === "APPROVED") return "bg-green-50 text-green-700 border-green-200";
        if (status === "REJECTED") return "bg-red-50 text-red-700 border-red-200";
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <EventControllerNavbar />
            <div className="max-w-6xl mx-auto space-y-6 w-full p-6 pb-12">
                <Link to="/controller/dashboard" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition gap-2">
                    <ArrowLeft className="size-4" /> Back to Dashboard
                </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Event Registrations</h1>
                    <p className="text-gray-500 mt-1">Total Candidates: {candidates.length} | Showing: {filtered.length}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                    <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm overflow-x-auto">
                        {["ALL", "PENDING", "APPROVED", "REJECTED"].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-bold transition whitespace-nowrap ${filter === status ? "bg-[#ca0002] text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowExportModal(true)}
                        disabled={filtered.length === 0}
                        className="flex items-center justify-center gap-2 bg-[#ca0002] hover:bg-[#a80002] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition whitespace-nowrap shadow-sm"
                    >
                        <Download className="size-4" /> Export
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-200">
                            <tr>
                                <th className="p-4">Candidate</th>
                                <th className="p-4">Contact Info</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="p-8 text-center text-gray-500 italic">No registrations found for this filter.</td>
                                </tr>
                            )}
                            {filtered.map(c => (
                                <tr key={c._id} className="hover:bg-gray-50 transition group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gray-100 p-2 rounded-full text-gray-600">
                                                <User className="size-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{c.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="space-y-1 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Mail className="size-3 text-gray-400" /> {c.oauthEmail}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="size-3 text-gray-400" /> {c.contact || "N/A"}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`
                               inline-block px-2 py-1 rounded text-xs font-bold border
                               ${getStatusBadgeStyles(c.status)}
                            `}>
                                            {c.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Export Modal */}
            {showExportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowExportModal(false)}>
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Export Registrations</h3>
                            <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-gray-900 transition">
                                <X className="size-5" />
                            </button>
                        </div>

                        <p className="text-gray-500 mb-6">Choose your preferred export format:</p>

                        <div className="space-y-3">
                            <button
                                onClick={exportToCSV}
                                className="w-full flex items-center justify-center gap-3 bg-[#ca0002] hover:bg-[#a80002] text-white px-6 py-4 rounded-xl font-bold transition transform active:scale-95"
                            >
                                <FileSpreadsheet className="size-6" />
                                <span>Export as CSV (.csv)</span>
                            </button>
                        </div>

                        <p className="text-xs text-gray-400 mt-4 text-center">
                            {filtered.length} registration{filtered.length !== 1 ? "s" : ""} will be exported
                        </p>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}
