import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiController } from "../../lib/apiController";
import EventControllerNavbar from "../../components/EventControllerNavbar";
import { ArrowLeft } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaUsers, FaCheckCircle, FaHourglassHalf, FaChartLine, FaTimesCircle } from "react-icons/fa";

export default function ControllerEventAnalytics() {
    const { eventId } = useParams();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [timeRange, setTimeRange] = useState("30");

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

    if (loading) return (
        <div>
            <EventControllerNavbar />
            <div className="p-10 text-center text-gray-500">Loading analytics...</div>
        </div>
    );
    if (err) return (
        <div>
            <EventControllerNavbar />
            <div className="p-10 text-center text-red-500 font-bold">{err}</div>
        </div>
    );

    // Calculate stats
    const totalRegs = candidates.length;
    const approvedRegs = candidates.filter(c => c.status === "APPROVED").length;
    const pendingRegs = candidates.filter(c => c.status === "PENDING").length;
    const rejectedRegs = candidates.filter(c => c.status === "REJECTED").length;

    // Charts Setup
    const statusDistribution = [
      { name: 'Approved', value: approvedRegs },
      { name: 'Pending', value: pendingRegs },
      { name: 'Rejected', value: rejectedRegs }
    ].filter(s => s.value > 0);

    const COLORS = ['#22c55e', '#eab308', '#ef4444'];

    // Registration Trend
    const trendDays = parseInt(timeRange, 10);
    const chartData = Array.from({ length: trendDays }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (trendDays - 1 - i));
        return {
            fullDate: d.toISOString().split('T')[0],
            name: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            regs: 0
        };
    });

    candidates.forEach(c => {
        if (c.createdAt) {
            const rDate = new Date(c.createdAt).toISOString().split('T')[0];
            const targetDay = chartData.find(t => t.fullDate === rDate);
            if (targetDay) {
                targetDay.regs++;
            }
        }
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <EventControllerNavbar />
            <div className="max-w-6xl mx-auto space-y-8 p-6 pb-12">
                <Link to="/controller/dashboard" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition gap-2">
                    <ArrowLeft className="size-4" /> Back to Dashboard
                </Link>

                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Premium Page Header */}
                    <div
                        className="rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[140px]"
                        style={{
                          background: "linear-gradient(135deg, #CA0002, #ff404a)",
                          boxShadow: "0 10px 30px rgba(202, 0, 2, 0.15)",
                        }}
                    >
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                        <div className="absolute bottom-0 left-10 w-40 h-40 bg-black opacity-10 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10">
                            <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md mb-3 inline-flex items-center gap-1.5 border border-white/20 shadow-sm">
                                <FaChartLine />
                                Live Event Metrics
                            </span>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
                                Analytical Overview
                            </h1>
                        </div>
                    </div>

                    {/* Main KPI Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <StatCard label="Total Registrations" value={totalRegs} icon={<FaUsers />} accentColor="#3b82f6" trend="All time" />
                        <StatCard label="Approved (Guest List)" value={approvedRegs} icon={<FaCheckCircle />} accentColor="#22c55e" trend="Ready for event" />
                        <StatCard label="Pending Review" value={pendingRegs} icon={<FaHourglassHalf />} accentColor="#eab308" trend="Action required" />
                        <StatCard label="Rejected" value={rejectedRegs} icon={<FaTimesCircle />} accentColor="#ef4444" trend="Not attending" />
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Trend Chart */}
                        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:col-span-2 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-3xl group-hover:bg-[#ca0002]/5 transition-colors duration-700"></div>
                             <div className="flex justify-between items-start sm:items-center mb-8 relative z-10 gap-4 flex-col sm:flex-row">
                                <div>
                                    <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Registration Trends</h3>
                                    <p className="text-sm text-gray-500 font-medium mt-1">Daily influx over the {timeRange === '7' ? 'last 7 days' : 'last 30 days'}</p>
                                </div>
                                <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
                                    <button 
                                        onClick={() => setTimeRange("7")}
                                        className={`flex-1 sm:flex-none px-4 py-2 sm:py-1.5 text-xs font-bold rounded-md transition-colors ${timeRange === "7" ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Past Week
                                    </button>
                                    <button 
                                        onClick={() => setTimeRange("30")}
                                        className={`flex-1 sm:flex-none px-4 py-2 sm:py-1.5 text-xs font-bold rounded-md transition-colors ${timeRange === "30" ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Past Month
                                    </button>
                                </div>
                             </div>
                             <div className="h-[320px] w-full relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorRegsController" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#CA0002" stopOpacity={0.25}/>
                                                <stop offset="95%" stopColor="#CA0002" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} minTickGap={30} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} allowDecimals={false} />
                                        <RechartsTooltip 
                                            contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                                            itemStyle={{ color: '#CA0002' }}
                                            labelStyle={{ color: '#64748b', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                                        />
                                        <Area type="monotone" dataKey="regs" name="Registrations" stroke="#CA0002" strokeWidth={4} fillOpacity={1} fill="url(#colorRegsController)" activeDot={{ r: 6, strokeWidth: 3, stroke: '#fff', fill: '#CA0002' }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Pie Chart */}
                        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-3xl group-hover:bg-[#ca0002]/5 transition-colors duration-700"></div>
                            <div className="mb-6 relative z-10">
                                <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Status Overview</h3>
                                <p className="text-sm text-gray-500 font-medium mt-1">Current distribution</p>
                            </div>
                            
                            <div className="flex-1 flex flex-col justify-center items-center relative min-h-[250px] z-10">
                                {statusDistribution.length > 0 ? (
                                    <>
                                        <div className="h-[220px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={statusDistribution}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={65}
                                                        outerRadius={95}
                                                        paddingAngle={4}
                                                        dataKey="value"
                                                        stroke="none"
                                                    >
                                                        {statusDistribution.map((entry, index) => {
                                                            const colorMap = {
                                                                'Approved': COLORS[0],
                                                                'Pending': COLORS[1],
                                                                'Rejected': COLORS[2]
                                                            };
                                                            return <Cell key={`cell-${index}`} fill={colorMap[entry.name]} />;
                                                        })}
                                                    </Pie>
                                                    <RechartsTooltip 
                                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                        
                                        {/* Custom Legend inside Pie Card */}
                                        <div className="w-full mt-4 space-y-2.5">
                                            {statusDistribution.map((entry) => {
                                                const colorMap = {
                                                    'Approved': COLORS[0],
                                                    'Pending': COLORS[1],
                                                    'Rejected': COLORS[2]
                                                };
                                                return (
                                                    <div key={entry.name} className="flex justify-between items-center text-sm">
                                                        <div className="flex items-center gap-2.5">
                                                            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: colorMap[entry.name] }}></div>
                                                            <span className="text-gray-600 font-semibold">{entry.name}</span>
                                                        </div>
                                                        <span className="text-gray-900 font-bold bg-gray-50 px-2.5 py-0.5 rounded-md">{entry.value}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Center Total overlay */}
                                        <div className="absolute top-[110px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                                            <p className="text-3xl font-black text-gray-900">{totalRegs}</p>
                                            <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest mt-0.5">Total</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center text-gray-400 font-medium">No data available</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const StatCard = ({ label, value, icon, accentColor, trend }) => (
  <div
    className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl relative overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 border border-gray-100 flex flex-col justify-between h-full"
    style={{
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.03)",
    }}
  >
    {/* Hover gradient background effect */}
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      style={{ background: `radial-gradient(circle at top right, ${accentColor}10, transparent 70%)` }}
    />

    <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-3 sm:mb-4 relative z-10 gap-3">
      <div
        className="flex items-center justify-center rounded-xl sm:rounded-2xl p-2 sm:p-3.5 shadow-inner border self-start"
        style={{
          background: accentColor + "10",
          color: accentColor,
          borderColor: accentColor + "20"
        }}
      >
        <div className="text-xl sm:text-2xl">{icon}</div>
      </div>
      <div className="text-left sm:text-right flex-1">
        <p className="text-[10px] sm:text-[11px] uppercase font-extrabold tracking-widest text-gray-400 mb-1 leading-tight sm:mb-1.5 line-clamp-2">
          {label}
        </p>
        <p className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
          {value}
        </p>
      </div>
    </div>
    
    <div className="flex items-center gap-2 mt-auto pt-3 sm:pt-4 border-t border-gray-50 relative z-10">
      <div className="w-1.5 h-1.5 rounded-full shadow-sm flex-shrink-0" style={{ backgroundColor: accentColor }}></div>
      <p className="text-[9px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wide truncate">{trend}</p>
    </div>

    {/* Bottom Accent Bar */}
    <div
      className="absolute bottom-0 left-0 h-1 transition-all duration-300 group-hover:h-1.5"
      style={{
        width: "100%",
        background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`,
      }}
    />
  </div>
);
