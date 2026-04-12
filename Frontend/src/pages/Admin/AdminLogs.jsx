import { useEffect, useState, useCallback } from "react";
import { apiAdmin } from "../../lib/apiAdmin";
import { toast } from "react-toastify";
import {
    FaHistory, FaFilter, FaSearch, FaUserShield, FaClock,
    FaInfoCircle, FaChevronLeft, FaChevronRight, FaTimes
} from "react-icons/fa";

export default function AdminLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [availableActions, setAvailableActions] = useState([]);

    // Filters
    const [filterAction, setFilterAction] = useState("");
    const [filterFrom, setFilterFrom] = useState("");
    const [filterTo, setFilterTo] = useState("");

    const fetchActions = async () => {
        try {
            const res = await apiAdmin.get("/api/admin/logs/actions");
            setAvailableActions(res.data);
        } catch (e) {
            console.error("Failed to fetch action types", e);
        }
    };

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page,
                limit: 20,
                action: filterAction,
                from: filterFrom,
                to: filterTo
            });
            const res = await apiAdmin.get(`/api/admin/logs?${params.toString()}`);
            setLogs(res.data.logs);
            setTotalPages(res.data.pages);
        } catch (e) {
            toast.error("Failed to load audit logs");
        } finally {
            setLoading(false);
        }
    }, [page, filterAction, filterFrom, filterTo]);

    useEffect(() => {
        fetchActions();
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const resetFilters = () => {
        setFilterAction("");
        setFilterFrom("");
        setFilterTo("");
        setPage(1);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true
        });
    };

    const getActionBadge = (action) => {
        const base = "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ";
        if (action.includes("APPROVE") || action === "LOGIN")
            return base + "bg-green-50 text-green-700 border-green-200";
        if (action.includes("REJECT") || action.includes("DELETE") || action === "LOGOUT" || action.includes("REVOKE"))
            return base + "bg-red-50 text-[#CA0002] border-red-200";
        if (action.includes("UPDATE") || action.includes("RESET") || action.includes("REVERT"))
            return base + "bg-orange-50 text-orange-700 border-orange-200";
        return base + "bg-blue-50 text-blue-700 border-blue-200";
    };

    const formatDetails = (details) => {
        if (!details || Object.keys(details).length === 0) return "-";

        // Custom pretty-printing for common logs
        const parts = [];
        if (details.name) parts.push(`Event: ${details.name}`);
        if (details.controllerName) parts.push(`Staff: ${details.controllerName}`);
        if (details.status) parts.push(`Status: ${details.status}`);
        if (details.count) parts.push(`Count: ${details.count}`);

        if (parts.length > 0) return parts.join(" • ");

        // Fallback for others (exclude internal IDs if names exist)
        return JSON.stringify(details).replace(/["{}]/g, "").replace(/:/g, ": ");
    };

    return (
        <div className="max-w-[1400px] mx-auto pb-12 animate-fade-in relative z-10">

            {/* PREMIUM HEADER SECTION */}
            <div
                className="rounded-3xl p-8 mb-8 relative overflow-hidden flex flex-col justify-center min-h-[160px]"
                style={{
                    background: "linear-gradient(135deg, #CA0002, #ff4d4f)",
                    boxShadow: "0 10px 30px rgba(202, 0, 2, 0.2)",
                }}
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/20 mb-3 backdrop-blur-md">
                        <FaHistory className="text-white/90 text-xs" />
                        <span className="text-white/90 text-[10px] font-black uppercase tracking-widest">Audit Trail</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                        Admin Activity Logs
                    </h1>
                    <p className="text-white/80 font-medium mt-2 max-w-xl">
                        Complete history of all administrative actions performed in the system for the last 15 days.
                    </p>
                </div>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-6 flex flex-wrap items-end gap-4">
                {/* Action Select */}
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Filter by Action</label>
                    <div className="relative">
                        <select
                            value={filterAction}
                            onChange={(e) => { setFilterAction(e.target.value); setPage(1); }}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#CA0002] transition-all text-sm font-bold text-gray-700 appearance-none"
                        >
                            <option value="">All Actions</option>
                            {availableActions.map(act => (
                                <option key={act} value={act}>{act}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <FaFilter size={12} />
                        </div>
                    </div>
                </div>

                {/* Date From */}
                <div className="flex-1 min-w-[150px]">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">From Date</label>
                    <input
                        type="date"
                        value={filterFrom}
                        onChange={(e) => { setFilterFrom(e.target.value); setPage(1); }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#CA0002] transition-all text-sm font-bold text-gray-700"
                    />
                </div>

                {/* Date To */}
                <div className="flex-1 min-w-[150px]">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">To Date</label>
                    <input
                        type="date"
                        value={filterTo}
                        onChange={(e) => { setFilterTo(e.target.value); setPage(1); }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#CA0002] transition-all text-sm font-bold text-gray-700"
                    />
                </div>

                {/* Reset */}
                {(filterAction || filterFrom || filterTo) && (
                    <button
                        onClick={resetFilters}
                        className="h-[50px] px-6 bg-red-50 text-[#CA0002] rounded-xl flex items-center gap-2 font-bold text-sm hover:bg-[#CA0002] hover:text-white transition-all border border-red-100"
                    >
                        <FaTimes /> Clear
                    </button>
                )}
            </div>

            {/* LOGS TABLE/LIST */}
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50/50 text-gray-500 uppercase text-[10px] tracking-widest font-black">
                            <tr>
                                <th className="p-5 border-b border-gray-100">Admin</th>
                                <th className="p-5 border-b border-gray-100">Action</th>
                                <th className="p-5 border-b border-gray-100">Operation Details</th>
                                <th className="p-5 border-b border-gray-100">IP Address</th>
                                <th className="p-5 border-b border-gray-100 text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                // Skeleton loading state
                                [1, 2, 3, 4, 5].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="p-5"><div className="h-10 w-32 bg-gray-100 rounded-lg"></div></td>
                                        <td className="p-5"><div className="h-6 w-24 bg-gray-100 rounded-full"></div></td>
                                        <td className="p-5"><div className="h-4 w-48 bg-gray-100 rounded"></div></td>
                                        <td className="p-5"><div className="h-4 w-24 bg-gray-100 rounded"></div></td>
                                        <td className="p-5 text-right"><div className="h-4 w-32 bg-gray-100 rounded ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : logs.length > 0 ? (
                                logs.map(log => (
                                    <tr key={log._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-red-50 text-[#CA0002] flex items-center justify-center font-bold text-xs border border-red-100 group-hover:bg-[#CA0002] group-hover:text-white transition-all">
                                                    {log.adminName.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-bold text-gray-900">{log.adminName}</span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className={getActionBadge(log.action)}>{log.action.replace(/_/g, " ")}</span>
                                        </td>
                                        <td className="p-5 max-w-[300px] truncate">
                                            <span className="text-gray-600 font-medium italic text-xs">{formatDetails(log.details)}</span>
                                        </td>
                                        <td className="p-5">
                                            <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                                                {log.ip || "local"}
                                            </span>
                                        </td>
                                        <td className="p-5 text-right font-medium text-gray-500 text-xs">
                                            <div className="flex flex-col items-end">
                                                <span className="font-bold text-gray-700">{formatDate(log.createdAt).split(",")[0]}</span>
                                                <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{formatDate(log.createdAt).split(",")[1]}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">
                                        <div className="flex flex-col items-center justify-center py-20 text-center">
                                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-dashed border-gray-200">
                                                <FaClock className="text-gray-300" size={32} />
                                            </div>
                                            <h3 className="text-xl font-black text-gray-700 mb-2">No logs found</h3>
                                            <p className="text-gray-500 max-w-xs font-medium">
                                                Try adjusting your filters or check back later after some actions have been performed.
                                            </p>
                                            {(filterAction || filterFrom || filterTo) && (
                                                <button onClick={resetFilters} className="mt-6 text-[#CA0002] font-bold text-sm underline underline-offset-4 hover:no-underline">
                                                    Reset all filters
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                {!loading && totalPages > 1 && (
                    <div className="p-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Page <span className="text-gray-900">{page}</span> of <span className="text-gray-900">{totalPages}</span>
                        </p>
                        <div className="flex gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#CA0002] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
                            >
                                <FaChevronLeft size={12} />
                            </button>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#CA0002] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
                            >
                                <FaChevronRight size={12} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* INFO FOOTER */}
            <div className="mt-8 flex items-center gap-3 text-gray-400 bg-white/50 p-4 rounded-2xl border border-gray-100">
                <FaInfoCircle />
                <p className="text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                    Logs older than 15 days are automatically purged from the database to maintain performance and data privacy.
                </p>
            </div>

        </div>
    );
}
