import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { apiUser } from "../../lib/apiUser";
import LazyImage from "../../components/LazyImage";

const PAGE_SIZE = 24;

export default function PhotoGallery() {
  const { eventSlug } = useParams();

  // --- STATE: MODE SWITCHING ---
  // If null, show Event List. If set, show Gallery for that event.
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsList, setEventsList] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  // Auto-select event if slug provided in URL
  useEffect(() => {
    if (eventSlug && !selectedEvent) {
      setSelectedEvent({ slug: eventSlug, name: "Event Memories" });
    }
  }, [eventSlug]);

  // --- STATE: GALLERY INTERNALS ---
  const [photos, setPhotos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef(null);

  // =========================================================
  // 1. FETCH EVENT LIST (Directory Mode)
  // =========================================================
  useEffect(() => {
    // Only fetch list if we aren't looking at a specific gallery
    if (!selectedEvent) {
      setIsLoadingEvents(true);
      apiUser
        .get("/api/events/ongoing")
        .then((res) => {
          const data = res.data;
          setEventsList(Array.isArray(data) ? data : []);
        })
        .catch((e) => {
          console.error("Failed to load events:", e);
          setEventsList([]);
        })
        .finally(() => setIsLoadingEvents(false));
    }
  }, [selectedEvent]);

  // =========================================================
  // 2. FETCH PHOTOS (Gallery Mode)
  // =========================================================
  useEffect(() => {
    if (!selectedEvent) {
      setPhotos([]); // Clear photos when going back
      return;
    }

    // Fetch memories for the specific selected event
    apiUser.get(`/api/events/${selectedEvent.slug}/memories`)
      .then((res) => {
        console.log("Memory API Response:", res.data); // DEBUG
        const data = Array.isArray(res.data) ? res.data : [];
        setPhotos(shuffleArray(data));
        setVisibleCount(PAGE_SIZE);
      })
      .catch((err) => console.error("Error fetching gallery images:", err));
  }, [selectedEvent]);

  // =========================================================
  // HELPER FUNCTIONS (Preserved from your original code)
  // =========================================================
  const shuffleArray = (arr) => {
    const array = Array.isArray(arr) ? [...arr] : [];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const cldTransform = (url, transforms) => {
    if (!url || !url.includes("/upload/")) return url;
    const t = transforms.filter(Boolean).join(",");
    return url.replace("/upload/", `/upload/${t}/`);
  };

  const placeholderUrl = (url) => cldTransform(url, ["f_auto", "q_1", "e_blur:2000", "w_20", "dpr_auto"]);

  const buildImageSources = (url) => {
    const widths = [320, 480, 640, 960, 1280, 1600];
    const transformsBase = ["f_auto", "q_auto", "dpr_auto"];
    const src = cldTransform(url, [...transformsBase, "w_960"]);
    const srcSet = widths.map((w) => `${cldTransform(url, [...transformsBase, `w_${w}`])} ${w}w`).join(", ");
    const sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw";
    return { src, srcSet, sizes };
  };

  // =========================================================
  // INFINITE SCROLL & NAVIGATION (Preserved)
  // =========================================================
  useEffect(() => {
    if (!loadMoreRef.current || !selectedEvent) return;
    const el = loadMoreRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingMore) {
        setLoadingMore(true);
        setTimeout(() => {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, photos.length));
          setLoadingMore(false);
        }, 100);
      }
    }, { rootMargin: "800px 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [photos.length, loadingMore, selectedEvent]);

  const openLightbox = (photo, index) => { setSelectedPhoto(photo); setCurrentIndex(index); };
  const closeLightbox = () => { setSelectedPhoto(null); setIsNavigating(false); };

  const goToPrevious = useCallback(() => {
    if (isNavigating || photos.length === 0) return;
    setIsNavigating(true);
    setCurrentIndex((prev) => {
      const newIndex = prev === 0 ? photos.length - 1 : prev - 1;
      setSelectedPhoto(photos[newIndex]);
      return newIndex;
    });
    setTimeout(() => setIsNavigating(false), 150);
  }, [isNavigating, photos]);

  const goToNext = useCallback(() => {
    if (isNavigating || photos.length === 0) return;
    setIsNavigating(true);
    setCurrentIndex((prev) => {
      const newIndex = prev === photos.length - 1 ? 0 : prev + 1;
      setSelectedPhoto(photos[newIndex]);
      return newIndex;
    });
    setTimeout(() => setIsNavigating(false), 150);
  }, [isNavigating, photos]);

  // Keyboard & Touch Handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, goToPrevious, goToNext]);

  useEffect(() => {
    let startX = 0;
    const handleTouchStart = (e) => { startX = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
      if (!startX || !selectedPhoto) return;
      if (Math.abs(startX - e.changedTouches[0].clientX) > 50)
        startX - e.changedTouches[0].clientX > 0 ? goToNext() : goToPrevious();
      startX = 0;
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selectedPhoto, goToNext, goToPrevious]);

  const visiblePhotos = useMemo(() => photos.slice(0, visibleCount), [photos, visibleCount]);
  const breakpointColumnsObj = { default: 5, 1280: 4, 1024: 3, 640: 2, 0: 1 };

  // =========================================================
  // VIEW 1: EVENT DIRECTORY (Grid of Events)
  // =========================================================
  if (!selectedEvent) {
    return (
      <div style={{ minHeight: "100vh", background: "#06060b", padding: "0 0 80px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
          .mem-dir-orb-l {
            position: fixed; left: -200px; top: 30%; width: 500px; height: 500px;
            border-radius: 50%; pointer-events: none; z-index: 0;
            background: radial-gradient(circle, rgba(255,77,0,0.07) 0%, transparent 70%);
          }
          .mem-dir-orb-r {
            position: fixed; right: -160px; top: 10%; width: 420px; height: 420px;
            border-radius: 50%; pointer-events: none; z-index: 0;
            background: radial-gradient(circle, rgba(255,196,71,0.05) 0%, transparent 70%);
          }
          .mem-dir-inner { position: relative; z-index: 1; max-width: 1400px; margin: 0 auto; padding: 40px 32px 0; }
          .mem-dir-eyebrow {
            display: inline-flex; align-items: center; gap: 8px;
            font-size: 10px; font-weight: 700; letter-spacing: 3.5px;
            text-transform: uppercase; color: #888898; margin-bottom: 14px;
          }
          .mem-dir-eyebrow-dot {
            width: 6px; height: 6px; border-radius: 50%; background: #ff4d00;
            box-shadow: 0 0 8px #ff4d00; animation: memDotPulse 2.5s infinite;
          }
          @keyframes memDotPulse {
            0%,100% { box-shadow: 0 0 5px #ff4d00; }
            50%      { box-shadow: 0 0 14px #ff4d00, 0 0 24px rgba(255,77,0,0.4); }
          }
          .mem-dir-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(48px, 8vw, 96px);
            line-height: 0.9; letter-spacing: 3px; color: #f0ece4; margin-bottom: 12px;
          }
          .mem-dir-title span {
            background: linear-gradient(135deg, #ff4d00, #ffc447);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          }
          .mem-dir-sub { font-size: 14px; color: #888898; margin-bottom: 52px; }
          .mem-dir-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
          }
          @media (max-width: 1023px) { .mem-dir-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 599px)  { .mem-dir-grid { grid-template-columns: 1fr; } }

          .mem-dir-card {
            background: #0d0d16; border: 1px solid rgba(255,255,255,0.06);
            border-radius: 16px; overflow: hidden; cursor: pointer;
            transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          }
          .mem-dir-card:hover {
            border-color: rgba(255,77,0,0.35);
            transform: translateY(-5px);
            box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(255,77,0,0.08);
          }
          .mem-dir-img-wrap { height: 200px; background: #121220; position: relative; overflow: hidden; }
          .mem-dir-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
          .mem-dir-card:hover .mem-dir-img-wrap img { transform: scale(1.07); }
          .mem-dir-img-grad {
            position: absolute; inset: 0;
            background: linear-gradient(to top, rgba(6,6,11,0.85) 0%, transparent 55%);
          }
          .mem-dir-placeholder {
            width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #3a3a50;
          }
          .mem-dir-info { padding: 18px 20px; }
          .mem-dir-name {
            font-size: 15px; font-weight: 700; color: #f0ece4; margin-bottom: 6px;
            transition: color 0.2s;
          }
          .mem-dir-card:hover .mem-dir-name { color: #ff6a1a; }
          .mem-dir-cta {
            font-size: 11px; font-weight: 600; letter-spacing: 1.5px;
            text-transform: uppercase; color: #3a3a50; transition: color 0.2s;
            display: flex; align-items: center; gap: 6px;
          }
          .mem-dir-card:hover .mem-dir-cta { color: #ff4d00; }
          .mem-empty {
            border: 1px dashed rgba(255,255,255,0.08); border-radius: 20px;
            padding: 80px 20px; text-align: center; color: #3a3a50; font-size: 14px;
          }
          .mem-loading { color: #ff4d00; font-size: 13px; display: flex; align-items: center; gap: 10px; }
          .mem-loading-spinner {
            width: 18px; height: 18px; border: 2px solid rgba(255,77,0,0.2);
            border-top-color: #ff4d00; border-radius: 50%;
            animation: memSpin 0.8s linear infinite;
          }
          @keyframes memSpin { to { transform: rotate(360deg); } }
        `}</style>

        <div className="mem-dir-orb-l" />
        <div className="mem-dir-orb-r" />

        <div className="mem-dir-inner">
          <div className="mem-dir-eyebrow">
            <span className="mem-dir-eyebrow-dot" />
            Gallery
          </div>
          <h1 className="mem-dir-title">
            MOMENTS<br /><span>THAT MATTER</span>
          </h1>
          <p className="mem-dir-sub">Select a trip to relive the memories.</p>

          {isLoadingEvents ? (
            <div className="mem-loading">
              <div className="mem-loading-spinner" /> Loading trips...
            </div>
          ) : eventsList.length === 0 ? (
            <div className="mem-empty">No trips found yet — check back soon.</div>
          ) : (
            <div className="mem-dir-grid">
              {eventsList.map((ev) => (
                <div key={ev._id} className="mem-dir-card" onClick={() => setSelectedEvent(ev)}>
                  <div className="mem-dir-img-wrap">
                    {ev.posterUrl ? (
                      <img src={ev.posterUrl} alt={ev.name} />
                    ) : (
                      <div className="mem-dir-placeholder">
                        <ImageIcon size={40} strokeWidth={1} />
                      </div>
                    )}
                    <div className="mem-dir-img-grad" />
                  </div>
                  <div className="mem-dir-info">
                    <p className="mem-dir-name">{ev.name}</p>
                    <p className="mem-dir-cta">View Gallery <span>→</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================
  // VIEW 2: PHOTO GALLERY (Masonry)
  // =========================================================
  return (
    <div style={{ minHeight: "100vh", background: "#06060b", paddingTop: 16, paddingBottom: 80, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        .mem-tile-wrap {
          margin-bottom: 12px; overflow: hidden; border-radius: 12px;
          cursor: pointer; position: relative;
          border: 1px solid rgba(255,255,255,0.04);
          transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s, border-color 0.3s;
        }
        .mem-tile-wrap:hover {
          transform: scale(1.025);
          box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,77,0,0.2);
          border-color: rgba(255,77,0,0.2);
        }
        .mem-tile-wrap img { display: block; width: 100%; height: auto; object-fit: cover; border-radius: 12px; }
        .mem-tile-hover {
          position: absolute; inset: 0; border-radius: 12px;
          background: linear-gradient(to top, rgba(255,77,0,0.18) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }
        .mem-tile-wrap:hover .mem-tile-hover { opacity: 1; }

        .mem-empty-dark {
          border: 1px dashed rgba(255,255,255,0.08); border-radius: 20px;
          padding: 80px 20px; text-align: center; color: #3a3a50; font-size: 14px;
          margin: 0 16px;
        }
        .mem-load-more {
          text-align: center; padding: 40px 0;
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          color: #3a3a50; animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        /* Lightbox */
        .mem-lb-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(4,4,8,0.97); backdrop-filter: blur(20px);
          display: flex; align-items: center; justify-content: center; padding: 16px;
        }
        .mem-lb-close {
          position: absolute; top: 20px; right: 20px; z-index: 10;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          color: #888898; border-radius: 10px; padding: 8px;
          cursor: pointer; transition: all 0.2s; display: flex; align-items: center;
        }
        .mem-lb-close:hover { background: rgba(255,77,0,0.12); border-color: rgba(255,77,0,0.3); color: #ff4d00; }
        .mem-lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          color: #888898; border-radius: 12px; padding: 10px;
          cursor: pointer; transition: all 0.2s; display: flex; align-items: center;
        }
        .mem-lb-nav:hover { background: rgba(255,77,0,0.12); border-color: rgba(255,77,0,0.3); color: #ff4d00; }
        .mem-lb-nav-l { left: 16px; }
        .mem-lb-nav-r { right: 16px; }
        .mem-lb-img-wrap { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; pointer-events: none; padding: 8px 72px; }
        .mem-lb-img-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 12px; box-shadow: 0 32px 80px rgba(0,0,0,0.8); }
        .mem-lb-counter {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          color: #888898; font-size: 11px; font-weight: 600; letter-spacing: 2px;
          padding: 6px 18px; border-radius: 100px; backdrop-filter: blur(8px);
        }
      `}</style>

      {/* Empty State */}
      {photos.length === 0 ? (
        <div className="mem-empty-dark">
          <ImageIcon size={48} strokeWidth={1} style={{ margin: "0 auto 12px", display: "block", color: "#3a3a50" }} />
          <p>No photos yet — check back after the trip!</p>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto"
          columnClassName="bg-clip-padding"
          style={{ padding: "0 8px", gap: "12px" }}
        >
          {visiblePhotos.map((photo, index) => {
            const { src, srcSet, sizes } = buildImageSources(photo.url);
            const tiny = placeholderUrl(photo.url);
            return (
              <div
                key={photo._id || `${photo.url}-${index}`}
                className="mem-tile-wrap"
                style={{ margin: "0 6px 12px" }}
                onClick={() => openLightbox(photo, index)}
              >
                <LazyImage
                  src={src}
                  srcSet={srcSet}
                  sizes={sizes}
                  placeholder={tiny}
                  alt={`memory-${index}`}
                  className="w-full h-auto object-cover"
                  style={{ borderRadius: 12 }}
                />
                <div className="mem-tile-hover" />
              </div>
            );
          })}
        </Masonry>
      )}

      {/* Infinite scroll sentinel */}
      {visibleCount < photos.length && (
        <div ref={loadMoreRef} className="mem-load-more">
          {loadingMore ? "Loading..." : "↓ Scroll for more"}
        </div>
      )}

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="mem-lb-overlay" onClick={closeLightbox}>
          <button className="mem-lb-close" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>
            <X size={22} />
          </button>
          <button className="mem-lb-nav mem-lb-nav-l" onClick={(e) => { e.stopPropagation(); goToPrevious(); }}>
            <ChevronLeft size={28} />
          </button>
          <button className="mem-lb-nav mem-lb-nav-r" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
            <ChevronRight size={28} />
          </button>
          <div className="mem-lb-img-wrap">
            <img
              src={cldTransform(selectedPhoto.url, ["f_auto", "q_auto", "dpr_auto", "w_1600"])}
              srcSet={["640", "960", "1280", "1600"].map(w => `${cldTransform(selectedPhoto.url, ["f_auto", "q_auto", "dpr_auto", `w_${w}`])} ${w}w`).join(", ")}
              sizes="90vw"
              alt="Memory"
            />
          </div>
          <div className="mem-lb-counter">{currentIndex + 1} / {photos.length}</div>
        </div>
      )}
    </div>
  );
}