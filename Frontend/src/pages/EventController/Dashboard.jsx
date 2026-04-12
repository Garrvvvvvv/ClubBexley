import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiController } from "../../lib/apiController";
import EventControllerNavbar from "../../components/EventControllerNavbar.jsx";
import { Calendar, Users, CheckCircle, XCircle, TrendingUp, Eye, ClipboardList, BarChart2 } from "lucide-react";

export default function EventControllerDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controllerName, setControllerName] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("controllerUser");
    if (username) setControllerName(username);

    apiController.get("/api/controller/events")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          setEvents([]);
          console.error("Unexpected API response:", res.data);
        }
      })
      .catch((err) => {
        console.error("Dashboard Load Error:", err);
        setError("Failed to load dashboard. Ensure server is running.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-400 mx-auto mb-3"></div>
          <p className="text-gray-300 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-900 min-h-screen">
        <div className="bg-white/10 border border-red-400/30 text-red-300 p-6 rounded-lg max-w-md mx-auto">
          <XCircle className="h-10 w-10 mx-auto mb-3 text-red-400" />
          <p className="font-medium text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-0 pt-0">
      <EventControllerNavbar />
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Event Controller Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, <span className="font-semibold text-gray-900">{controllerName || "Controller"}</span>
              </p>
            </div>
            <ClipboardList className="h-10 w-10 text-gray-300" />
          </div>
        </div>

        {/* Events Section */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#ca0002]" />
            Your Events <span className="text-gray-500 font-normal">({events.length})</span>
          </h2>
        </div>

        {events.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center shadow-sm">
            <Calendar className="h-14 w-14 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-900 font-medium text-lg">No events assigned yet</p>
            <p className="text-gray-500 text-sm mt-2">Contact admin to get events assigned to you</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  // Kept for compatibility, though seemingly unused
  const styles = {
    blue: {
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      valueColor: "text-blue-700",
      border: "border-blue-100"
    },
    green: {
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      valueColor: "text-green-700",
      border: "border-green-100"
    },
    red: {
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      valueColor: "text-red-700",
      border: "border-red-100"
    }
  };

  const style = styles[color] || styles.blue;

  return (
    <div className={`bg-white border ${style.border} rounded-lg p-6 shadow-sm hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-2">{label}</p>
          <p className={`text-3xl font-bold ${style.valueColor}`}>{value}</p>
        </div>
        <div className={`${style.iconBg} p-3 rounded-lg ${style.iconColor}`}>{icon}</div>
      </div>
    </div>
  );
}

function EventCard({ event }) {
  const pendingCount = event.registrations - event.approved - event.rejected;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
      {/* Event Header */}
      <div className="bg-gray-50 border-b border-gray-100 p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.name}</h3>
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <Calendar className="h-3.5 w-3.5" />
          <span>Event ID: {event._id.slice(-8)}</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3 mb-5">
          <MiniStat
            icon={<Users className="h-4 w-4" />}
            label="Total"
            value={event.registrations}
            color="blue"
          />
          <MiniStat
            icon={<CheckCircle className="h-4 w-4" />}
            label="Approved"
            value={event.approved}
            color="green"
          />
          <MiniStat
            icon={<XCircle className="h-4 w-4" />}
            label="Rejected"
            value={event.rejected}
            color="red"
          />
          <MiniStat
            icon={<TrendingUp className="h-4 w-4" />}
            label="Pending"
            value={pendingCount}
            color="amber"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to={`/controller/events/${event._id}`}
            className="flex items-center justify-center gap-2 w-full bg-white border border-[#ca0002] text-[#ca0002] hover:bg-red-50 font-medium py-3 px-4 rounded-lg text-sm transition-colors shadow-sm"
          >
            <Eye className="h-4 w-4" />
            <span className="truncate">View Candidates</span>
          </Link>
          <Link
            to={`/controller/events/${event._id}/analytics`}
            className="flex items-center justify-center gap-2 w-full bg-[#ca0002] hover:bg-[#a00002] text-white font-medium py-3 px-4 rounded-lg text-sm transition-colors shadow-sm"
          >
            <BarChart2 className="h-4 w-4" />
            <span className="truncate">Analytical Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value, color }) {
  const styles = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      iconColor: "text-blue-600",
      valueColor: "text-blue-900"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-100",
      iconColor: "text-green-600",
      valueColor: "text-green-900"
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-100",
      iconColor: "text-red-600",
      valueColor: "text-red-900"
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      iconColor: "text-amber-600",
      valueColor: "text-amber-900"
    }
  };

  const style = styles[color] || styles.blue;

  return (
    <div className={`${style.bg} p-3 rounded-lg border ${style.border}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={style.iconColor}>{icon}</span>
        <span className="text-xs text-gray-500 uppercase font-semibold tracking-wide">{label}</span>
      </div>
      <p className={`text-xl font-bold ${style.valueColor}`}>{value}</p>
    </div>
  );
}
