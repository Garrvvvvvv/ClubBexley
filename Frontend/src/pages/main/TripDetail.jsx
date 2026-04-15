import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

const TAB_DAY   = "itinerary";
const TAB_DATES = "dates";
const TAB_INC   = "inclusions";

export default function TripDetail() {
  const { eventSlug } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);
  const [activeTab, setActiveTab] = useState(TAB_DAY);

  useEffect(() => {
    api
      .get(`/api/events/${eventSlug}`)
      .then((r) => { setTrip(r.data); setLoading(false); })
      .catch(() => { setError("Trip not found."); setLoading(false); });
  }, [eventSlug]);

  if (loading) return <PageLoader />;
  if (error || !trip) return <NotFound onBack={() => navigate("/events")} />;

  const lowestPrice = trip.pricingTiers?.length
    ? Math.min(...trip.pricingTiers.map((t) => t.pricePerPerson))
    : trip.startingPrice;

  return (
    <div style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif", background: "#f7f5f2", minHeight: "100vh" }}>

      {/* ── HERO ── full-bleed under fixed navbar (negative margin pulls it up) */}
      <div style={{ position: "relative", height: 500, overflow: "hidden", background: "#1a1a1a", marginTop: -90 }}>
        {trip.posterUrl ? (
          <img
            src={trip.posterUrl}
            alt={trip.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a1a1a 0%, #3a1a0a 100%)" }} />
        )}

        {/* gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
        }} />

        {/* text over hero */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 32px 32px",
          maxWidth: 1100, margin: "0 auto"
        }}>
          {/* type badge */}
          <span style={{
            display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: 2,
            textTransform: "uppercase", color: "#fff", background: "#CA0002",
            padding: "4px 12px", borderRadius: 4, marginBottom: 12
          }}>
            {trip.type === "TRIP" ? "Adventure Trip" : "Club Event"}
          </span>

          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.1 }}>
            {trip.name}
          </h1>

          {/* quick stats row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
            {trip.duration && (
              <Stat icon="🗓️" label="Duration" value={trip.duration} />
            )}
            {lowestPrice > 0 && (
              <Stat icon="💰" label="Starting at" value={`₹${lowestPrice.toLocaleString("en-IN")}/-`} accent />
            )}
            {trip.pickupDrop && (
              <Stat icon="📍" label="Pickup & Drop" value={trip.pickupDrop} />
            )}
          </div>
        </div>
      </div>

      {/* ── BOOK NOW STICKY BAR ── */}
      {trip.googleFormLink && (
        <div style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "#fff", borderBottom: "3px solid #CA0002",
          padding: "10px 32px", display: "flex", justifyContent: "space-between",
          alignItems: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
        }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>{trip.name}</span>
          <a
            href={trip.googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#CA0002", color: "#fff", fontWeight: 700, fontSize: 14,
              padding: "10px 28px", borderRadius: 8, textDecoration: "none",
              letterSpacing: 0.5, transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#a80001"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#CA0002"}
          >
            Book Now →
          </a>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}
        className="trip-grid">

        {/* LEFT COLUMN */}
        <div>

          {/* description */}
          {trip.description && (
            <p style={{ fontSize: 16, color: "#555", lineHeight: 1.8, margin: "0 0 32px" }}>
              {trip.description}
            </p>
          )}

          {/* TABS */}
          <div style={{ borderBottom: "2px solid #e8e8e8", marginBottom: 32, display: "flex", gap: 0 }}>
            {[
              { id: TAB_DAY,   label: "Day Wise Plan" },
              { id: TAB_DATES, label: "Dates & Costing" },
              { id: TAB_INC,   label: "Inclusions & Excl." },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  border: "none", background: "none", cursor: "pointer",
                  padding: "12px 20px", fontSize: 14, fontWeight: 600,
                  color: activeTab === tab.id ? "#CA0002" : "#888",
                  borderBottom: activeTab === tab.id ? "3px solid #CA0002" : "3px solid transparent",
                  marginBottom: -2, transition: "all 0.15s",
                  fontFamily: "inherit"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB: DAY WISE PLAN */}
          {activeTab === TAB_DAY && (
            <div>
              {trip.itinerary?.length > 0 ? (
                <div style={{ position: "relative", paddingLeft: 32 }}>
                  {/* vertical line */}
                  <div style={{
                    position: "absolute", left: 11, top: 8, bottom: 8,
                    width: 2, background: "linear-gradient(to bottom, #CA0002, #ff9090)"
                  }} />

                  {trip.itinerary.map((day, i) => (
                    <div key={i} style={{ position: "relative", marginBottom: 28 }}>
                      {/* dot */}
                      <div style={{
                        position: "absolute", left: -32, top: 6,
                        width: 24, height: 24, borderRadius: "50%",
                        background: "#CA0002", display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff",
                        border: "3px solid #f7f5f2"
                      }}>
                        {day.dayNumber}
                      </div>
                      <div style={{
                        background: "#fff", border: "1px solid #eee",
                        borderRadius: 12, padding: "16px 20px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                      }}>
                        <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>
                          Day {day.dayNumber} — {day.title}
                        </h3>
                        {day.description && (
                          <p style={{ margin: 0, color: "#666", fontSize: 14, lineHeight: 1.7 }}>
                            {day.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty text="Itinerary coming soon." />
              )}
            </div>
          )}

          {/* TAB: DATES & COSTING */}
          {activeTab === TAB_DATES && (
            <div>
              {/* pricing table */}
              {trip.pricingTiers?.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 12 }}>Package Cost</h3>
                  <div style={{ border: "1px solid #e8e8e8", borderRadius: 12, overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "#CA0002" }}>
                          <th style={{ padding: "12px 20px", textAlign: "left", color: "#fff", fontSize: 13, fontWeight: 700 }}>
                            Room Sharing
                          </th>
                          <th style={{ padding: "12px 20px", textAlign: "right", color: "#fff", fontSize: 13, fontWeight: 700 }}>
                            Cost (per person)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {trip.pricingTiers.map((tier, i) => (
                          <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf9f9" }}>
                            <td style={{ padding: "14px 20px", fontSize: 14, color: "#333", fontWeight: 500 }}>
                              {tier.roomType}
                            </td>
                            <td style={{ padding: "14px 20px", textAlign: "right", fontSize: 15, fontWeight: 700, color: "#CA0002" }}>
                              ₹{tier.pricePerPerson.toLocaleString("en-IN")}/-
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* trip dates */}
              {trip.tripDates?.length > 0 && (
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 12 }}>Available Dates</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {trip.tripDates.map((d, i) => (
                      <div key={i} style={{
                        background: "#fff", border: "1px solid #e8e8e8", borderRadius: 10,
                        padding: "12px 20px", minWidth: 180
                      }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>
                          {new Date(d.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          {" – "}
                          {new Date(d.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                        {d.note && <div style={{ fontSize: 12, color: "#CA0002", marginTop: 4 }}>{d.note}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!trip.pricingTiers?.length && !trip.tripDates?.length && (
                <Empty text="Dates and pricing coming soon." />
              )}
            </div>
          )}

          {/* TAB: INCLUSIONS & EXCLUSIONS */}
          {activeTab === TAB_INC && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {/* inclusions */}
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#16a34a", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <span>✅</span> Inclusions
                </h3>
                {trip.inclusions?.length > 0 ? (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {trip.inclusions.map((item, i) => (
                      <li key={i} style={{
                        display: "flex", gap: 10, alignItems: "flex-start",
                        padding: "8px 0", borderBottom: "1px solid #f0f0f0",
                        fontSize: 14, color: "#333"
                      }}>
                        <span style={{ color: "#16a34a", flexShrink: 0 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                ) : <Empty text="Details coming soon." />}
              </div>

              {/* exclusions */}
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#CA0002", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <span>❌</span> Exclusions
                </h3>
                {trip.exclusions?.length > 0 ? (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {trip.exclusions.map((item, i) => (
                      <li key={i} style={{
                        display: "flex", gap: 10, alignItems: "flex-start",
                        padding: "8px 0", borderBottom: "1px solid #f0f0f0",
                        fontSize: 14, color: "#333"
                      }}>
                        <span style={{ color: "#CA0002", flexShrink: 0 }}>✗</span> {item}
                      </li>
                    ))}
                  </ul>
                ) : <Empty text="Details coming soon." />}
              </div>
            </div>
          )}

          {/* ── NOTES ── */}
          {trip.notes?.length > 0 && (
            <div style={{
              marginTop: 40, background: "#fffbf0", border: "1px solid #f5e090",
              borderRadius: 12, padding: "20px 24px"
            }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "#92400e" }}>
                📋 Important Notes
              </h3>
              <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
                {trip.notes.map((note, i) => (
                  <li key={i} style={{ fontSize: 13.5, color: "#78350f", lineHeight: 1.7, marginBottom: 4 }}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── CANCELLATION POLICY ── */}
          {trip.cancellationPolicy && (
            <div style={{
              marginTop: 24, background: "#fff8f8", border: "1px solid #fecaca",
              borderRadius: 12, padding: "20px 24px"
            }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 700, color: "#CA0002" }}>
                🔖 Cancellation Policy
              </h3>
              <p style={{ margin: 0, fontSize: 13.5, color: "#7f1d1d", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                {trip.cancellationPolicy}
              </p>
            </div>
          )}

          {/* ── THINGS TO CARRY ── */}
          {trip.thingsToCarry?.length > 0 && (
            <div style={{
              marginTop: 24, background: "#f0fdf4", border: "1px solid #bbf7d0",
              borderRadius: 12, padding: "20px 24px"
            }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "#166534" }}>
                🎒 Things to Carry
              </h3>
              <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
                {trip.thingsToCarry.map((item, i) => (
                  <li key={i} style={{ fontSize: 13.5, color: "#14532d", lineHeight: 1.7, marginBottom: 4 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — BOOKING CARD */}
        <div>
          <div style={{
            position: "sticky", top: 72,
            background: "#fff", border: "1px solid #e8e8e8",
            borderRadius: 16, overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
          }}>
            {/* card header */}
            <div style={{ background: "#CA0002", padding: "20px 24px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>
                Starting from
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                ₹{lowestPrice > 0 ? lowestPrice.toLocaleString("en-IN") : "—"}
                <span style={{ fontSize: 14, fontWeight: 500, opacity: 0.8 }}>/person</span>
              </div>
            </div>

            {/* card body */}
            <div style={{ padding: "20px 24px" }}>
              {/* quick info */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                {trip.duration && (
                  <InfoRow icon="🗓️" label="Duration" value={trip.duration} />
                )}
                {trip.pickupDrop && (
                  <InfoRow icon="📍" label="Pickup & Drop" value={trip.pickupDrop} />
                )}
                {trip.pricingTiers?.length > 0 && (
                  <InfoRow
                    icon="🛏️"
                    label="Sharing options"
                    value={trip.pricingTiers.map(t => t.roomType).join(", ")}
                  />
                )}
              </div>

              {/* CTA */}
              {trip.googleFormLink ? (
                <a
                  href={trip.googleFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block", textAlign: "center", textDecoration: "none",
                    background: "#CA0002", color: "#fff", fontWeight: 700,
                    fontSize: 16, padding: "14px", borderRadius: 10,
                    transition: "background 0.2s", letterSpacing: 0.3
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#a80001"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#CA0002"}
                >
                  Book Now →
                </a>
              ) : (
                <div style={{
                  textAlign: "center", padding: "14px", borderRadius: 10,
                  background: "#f3f4f6", color: "#9ca3af", fontWeight: 600, fontSize: 14
                }}>
                  Bookings opening soon
                </div>
              )}

              {/* trust badges */}
              <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Best Price Assured", "Flexible Cancellation", "Expert Trip Captains"].map((badge) => (
                  <span key={badge} style={{
                    fontSize: 11, fontWeight: 600, color: "#555",
                    background: "#f5f5f5", padding: "4px 10px", borderRadius: 20,
                    border: "1px solid #e8e8e8"
                  }}>
                    ✓ {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .trip-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ── small helpers ── */
function Stat({ icon, label, value, accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: accent ? "#fbbf24" : "#fff" }}>{value}</div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 11, color: "#aaa", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
        <div style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>{value}</div>
      </div>
    </div>
  );
}

function Empty({ text }) {
  return <p style={{ color: "#aaa", fontSize: 14, fontStyle: "italic" }}>{text}</p>;
}

function PageLoader() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{
        width: 40, height: 40, border: "4px solid #eee",
        borderTopColor: "#CA0002", borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: "#888", fontSize: 14 }}>Loading trip details…</p>
    </div>
  );
}

function NotFound({ onBack }) {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ fontSize: 48 }}>🏔️</div>
      <h2 style={{ margin: 0, color: "#333" }}>Trip not found</h2>
      <button
        onClick={onBack}
        style={{ background: "#CA0002", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}
      >
        ← Back to Trips
      </button>
    </div>
  );
}
