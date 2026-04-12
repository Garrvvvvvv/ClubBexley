import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiUser } from "../../lib/apiUser";
import { ArrowLeft, Calendar, Clock, AlertCircle } from "lucide-react";

/* =========================================
   TIMELINE VIEW
========================================= */
const TimelineView = ({ eventData, onBack }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const flowData = eventData?.flow || [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || flowData.length === 0) return;

    const handleScroll = () => {
      const center =
        container.scrollTop + container.clientHeight / 2;

      let closest = 0;
      let min = Infinity;

      Array.from(container.children).forEach((child, i) => {
        if (child.dataset.spacer) return; // ignore spacers

        const childCenter =
          child.offsetTop + child.clientHeight / 2;
        const dist = Math.abs(childCenter - center);

        if (dist < min) {
          min = dist;
          closest = i - 1; // adjust index because of top spacer
        }
      });

      setActiveIndex(Math.max(0, closest));
    };

    container.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 100);

    return () =>
      container.removeEventListener("scroll", handleScroll);
  }, [flowData]);

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-20 p-6 pt-5
        bg-gradient-to-b from-white via-white to-transparent
        flex items-center gap-4">

        <button
          onClick={onBack}
          className="p-3 rounded-full bg-slate-100
          hover:bg-slate-200 transition border border-slate-200 group"
        >
          <ArrowLeft
            size={20}
            className="text-slate-700
            group-hover:-translate-x-1 transition-transform"
          />
        </button>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            {eventData.name}
          </h1>
          <div className="flex items-center gap-2 text-[#CA0002]
            text-sm font-bold uppercase tracking-widest mt-1">
            <Clock size={14} /> Official Timeline
          </div>
        </div>
      </div>

      {/* Scrollable Timeline */}
      <div
        ref={containerRef}
        className="relative z-10 h-full overflow-y-auto
        pt-18 pb-32 px-4 space-y-32 scroll-smooth
        no-scrollbar snap-y snap-mandatory"
      >
        {/* TOP SPACER */}
        <div data-spacer className="h-[50vh] snap-none" />

        {flowData.length === 0 ? (
          <div className="h-full flex flex-col items-center
            justify-center text-slate-400">
            <Calendar size={48} className="mb-4 opacity-50" />
            <p className="text-xl">Timeline details coming soon.</p>
          </div>
        ) : (
          flowData.map((item, i) => {
            const isActive = i === activeIndex;

            return (
              <div
                key={i}
                className={`snap-center max-w-2xl mx-auto
                transition-all duration-700 ease-out
                ${
                  isActive
                    ? "opacity-100 scale-100"
                    : "opacity-40 scale-95 blur-[1.5px]"
                }`}
              >
                <div
                  className={`relative p-8 rounded-2xl border-l-4
                  transition-all duration-500
                  ${
                    isActive
                      ? "bg-white border-[#CA0002] shadow-[0_0_40px_rgba(202,0,2,0.18)]"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex gap-5">
                    {/* Icon */}
                    <div
                      className={`mt-1 p-3 rounded-xl h-fit shrink-0
                      transition-colors duration-500
                      ${
                        isActive
                          ? "bg-[#CA0002]/10 text-[#CA0002]"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Clock size={24} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div
                        className="flex flex-col sm:flex-row
                        sm:items-center justify-between gap-2 mb-3"
                      >
                        <h3
                          className={`text-xl font-bold transition-colors
                          ${
                            isActive
                              ? "text-slate-900"
                              : "text-slate-600"
                          }`}
                        >
                          {item.title}
                        </h3>

                        <span
                          className={`text-xs font-mono px-2 py-1
                          rounded w-fit border whitespace-nowrap
                          ${
                            isActive
                              ? "bg-[#CA0002]/10 text-[#CA0002] border-[#CA0002]/30"
                              : "bg-white text-slate-400 border-slate-200"
                          }`}
                        >
                          {item.date}
                        </span>
                      </div>

                      <p
                        className={`leading-relaxed text-base
                        ${
                          isActive
                            ? "text-slate-600"
                            : "text-slate-400"
                        }`}
                      >
                        {item.desc || "Details to be announced."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* BOTTOM SPACER */}
        <div data-spacer className="h-[50vh] snap-none" />
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>
    </div>
  );
};

/* =========================================
   MAIN CONTROLLER
========================================= */
export default function EventFlow() {
  const { eventSlug } = useParams();
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventSlug) {
      setLoading(true);
      setError(null);
      apiUser
        .get("/api/events/ongoing")
        .then((res) =>
          setEventsList(Array.isArray(res.data) ? res.data : [])
        )
        .catch(() => {
          setError("Failed to load events directory.");
          setEventsList([]);
        })
        .finally(() => setLoading(false));
    }
  }, [eventSlug]);

  useEffect(() => {
    if (eventSlug) {
      setLoading(true);
      setError(null);
      apiUser
        .get(`/api/events/${eventSlug}/flow`)
        .then((res) => {
          if (!res.data) throw new Error();
          setSelectedEvent(res.data);
        })
        .catch(() =>
          setError("Could not load timeline for this event.")
        )
        .finally(() => setLoading(false));
    } else {
      setSelectedEvent(null);
    }
  }, [eventSlug]);

  const handleBack = () => navigate("/events");
  const handleSelectEvent = (ev) =>
    ev?.slug && navigate(`/event/${ev.slug}/flow`);

  /* Loading */
  if (loading) {
    return (
      <div className="min-h-screen bg-white
        flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#CA0002]
          border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-500 font-medium">
          Loading timeline…
        </p>
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className="min-h-screen bg-white
        flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Something went wrong
        </h3>
        <p className="text-slate-500 mb-6">{error}</p>
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-slate-100
            hover:bg-slate-200 rounded-lg transition"
        >
          Back to Events List
        </button>
      </div>
    );
  }

  if (eventSlug && selectedEvent) {
    return (
      <TimelineView
        eventData={selectedEvent}
        onBack={handleBack}
      />
    );
  }

  /* Directory View */
  return (
    <div className="min-h-screen bg-white p-6 md:p-12 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Event Schedules
        </h1>

        <p className="text-slate-500 mb-12 max-w-2xl text-lg">
          Select an event to view its detailed timeline.
        </p>

        {eventsList.length === 0 ? (
          <div className="p-16 text-center border border-dashed
            border-slate-300 rounded-2xl bg-slate-50">
            <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">
              No upcoming events found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsList.map((ev) => (
              <div
                key={ev._id}
                onClick={() => handleSelectEvent(ev)}
                className="group relative bg-white rounded-2xl
                border border-slate-200 overflow-hidden cursor-pointer
                hover:border-[#CA0002]/40
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                transition-all"
              >
                <div className="h-56 bg-slate-100 relative">
                  {ev.posterUrl ? (
                    <img
                      src={ev.posterUrl}
                      alt={ev.name}
                      className="w-full h-full object-cover
                      opacity-90 group-hover:opacity-100
                      group-hover:scale-105 transition"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Calendar className="text-slate-400 w-12 h-12" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3
                    className="text-xl font-bold text-slate-900
                    group-hover:text-[#CA0002] transition"
                  >
                    {ev.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Clock size={12} /> View Timeline
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
