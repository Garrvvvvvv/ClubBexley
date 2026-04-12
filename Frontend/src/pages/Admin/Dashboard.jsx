import { useEffect, useState } from "react";
import { useAdminEvent } from "../../context/AdminEventContext";
import { apiAdmin } from "../../lib/apiAdmin";
import { toast } from "react-toastify";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { FaUsers, FaCheckCircle, FaHourglassHalf, FaUserShield, FaChartLine } from "react-icons/fa";

export default function Dashboard() {
  const { activeEvent } = useAdminEvent();
  const [stats, setStats] = useState(null);
  const [timeframe, setTimeframe] = useState('1W'); // '1W' or '1M'
  const [last30DaysTrend, setLast30DaysTrend] = useState([]);

  useEffect(() => {
    if (activeEvent) {
      Promise.all([
        apiAdmin.get(`/api/admin/events/${activeEvent._id}/stats`),
        apiAdmin.get(`/api/admin/events/${activeEvent._id}/registrations`)
      ])
        .then(([statsRes, regsRes]) => {
          const baseData = statsRes.data;
          const regs = regsRes.data || [];
          
          // Calculate exact revenue from approved registrations
          const totalRevenue = regs
            .filter(r => r.status === "APPROVED")
            .reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

          // Build continuous 30-day history going backward from today
          const today = new Date();
          const trendArray = [];
          
          for (let i = 29; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateString = d.toISOString().split('T')[0];
            const shortDateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            trendArray.push({
              fullDate: dateString,
              name: shortDateStr, // X-Axis Label
              regs: 0
            });
          }
          
          // Map actual registrations to those continuous days
          regs.forEach(r => {
            if (r.createdAt) {
              const rDate = new Date(r.createdAt).toISOString().split('T')[0];
              const targetDay = trendArray.find(t => t.fullDate === rDate);
              if (targetDay) {
                targetDay.regs++;
              }
            }
          });

          setLast30DaysTrend(trendArray); // Store full 30 days of data

          // Calculate exact status distribution
          const statusCount = { 'APPROVED': 0, 'PENDING': 0, 'REJECTED': 0 };
          regs.forEach(r => {
            if (statusCount[r.status] !== undefined) {
              statusCount[r.status]++;
            }
          });

          const statusDistribution = [
            { name: 'Approved', value: statusCount['APPROVED'] },
            { name: 'Pending', value: statusCount['PENDING'] },
            { name: 'Rejected', value: statusCount['REJECTED'] }
          ];
          
          const extendedStats = {
            ...baseData,
            revenue: totalRevenue,
            statusDistribution
          };
          setStats(extendedStats);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load dashboard data");
        });
    }
  }, [activeEvent]);

  // Derived state based on timeframe toggle
  const currentTrendData = timeframe === '1W' ? last30DaysTrend.slice(-7) : last30DaysTrend;

  if (!activeEvent) return (
    <div className="h-[70vh] flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-100 shadow-sm">
      <div className="w-20 h-20 bg-red-50 text-[#CA0002] rounded-full flex items-center justify-center mb-6 border border-red-100 shadow-inner">
        <FaChartLine size={32} />
      </div>
      <h2 className="text-2xl font-black text-gray-800 mb-2">Event Analytics</h2>
      <p className="text-lg font-medium text-gray-500 max-w-sm text-center">
        Select an event from the sidebar to view its performance dashboard and metrics.
      </p>
    </div>
  );

  const COLORS = ['#22c55e', '#eab308', '#ef4444'];

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-12">
      {/* Premium Page Header */}
      <div
        className="rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[160px]"
        style={{
          background: "linear-gradient(135deg, #CA0002, #ff4d4f)",
          boxShadow: "0 10px 30px rgba(202, 0, 2, 0.2)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pattern-grid-lg"></div>
        <div className="absolute bottom-0 left-10 w-40 h-40 bg-black opacity-10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="bg-red-950/30 text-white/90 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md mb-3 inline-block border border-white/10">
              Live Analytics Dashboard
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
              {activeEvent.name}
            </h1>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-right">
            <p className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-1">Total Revenue Est.</p>
            <p className="text-3xl font-black text-white">₹{(stats?.revenue || 0).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Registrations" value={stats?.total || 0} icon={<FaUsers />} accentColor="#CA0002" trend="+12% this week" />
        <StatCard label="Approved (Paid)" value={stats?.approved || 0} icon={<FaCheckCircle />} accentColor="#22c55e" trend="Ready for event" />
        <StatCard label="Pending Review" value={stats?.pending || 0} icon={<FaHourglassHalf />} accentColor="#eab308" trend="Requires action" />
        <StatCard label="Active Controllers" value={stats?.controllers || 0} icon={<FaUserShield />} accentColor="#6366f1" trend="Managing access" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Trend Chart */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:col-span-2 relative overflow-hidden">
          <div className="flex justify-between items-end mb-8 relative z-10">
            <div>
              <h3 className="text-xl font-black text-gray-800">Registration Trends</h3>
              <p className="text-sm text-gray-500 font-medium">Daily registration velocity</p>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setTimeframe('1W')}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${timeframe === '1W' ? 'bg-white text-[#CA0002] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                1 Week
              </button>
              <button 
                onClick={() => setTimeframe('1M')}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${timeframe === '1M' ? 'bg-white text-[#CA0002] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                1 Month
              </button>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRegs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CA0002" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#CA0002" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }} dy={10} minTickGap={20} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                  itemStyle={{ color: '#CA0002' }}
                  labelStyle={{ color: '#6b7280', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="regs" name="Registrations" stroke="#CA0002" strokeWidth={4} fillOpacity={1} fill="url(#colorRegs)" activeDot={{ r: 8, strokeWidth: 0, fill: '#CA0002' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown Pie Chart */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
          <h3 className="text-xl font-black text-gray-800 mb-1">Status Overview</h3>
          <p className="text-sm text-gray-500 font-medium mb-6">Approval distribution</p>
          
          <div className="flex-1 flex flex-col justify-center items-center relative">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.statusDistribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {(stats?.statusDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Legend */}
            <div className="w-full mt-4 space-y-2">
              {(stats?.statusDistribution || []).map((entry, index) => (
                <div key={entry.name} className="flex justify-between items-center text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-gray-600">{entry.name}</span>
                  </div>
                  <span className="text-gray-900">{entry.value}</span>
                </div>
              ))}
            </div>

            {/* Center Total */}
            <div className="absolute top-[90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="text-3xl font-black text-gray-800">{stats?.total || 0}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Total</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const StatCard = ({ label, value, icon, accentColor, trend }) => (
  <div
    className="bg-white p-6 rounded-3xl relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
    style={{
      border: "1px solid #f3f4f6",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.03)",
    }}
  >
    {/* Hover gradient background effect */}
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: `radial-gradient(circle at top right, ${accentColor}10, transparent 60%)` }}
    />

    <div className="flex items-start justify-between mb-4 relative z-10">
      <div
        className="flex items-center justify-center rounded-2xl p-3 shadow-inner"
        style={{
          background: accentColor + "15",
          color: accentColor,
        }}
      >
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="text-right">
        <p className="text-[11px] uppercase font-bold tracking-widest text-gray-400 mb-1">
          {label}
        </p>
        <p className="text-4xl font-black text-gray-800 tracking-tight">
          {value}
        </p>
      </div>
    </div>
    
    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 relative z-10">
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
      <p className="text-xs font-semibold text-gray-500">{trend}</p>
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