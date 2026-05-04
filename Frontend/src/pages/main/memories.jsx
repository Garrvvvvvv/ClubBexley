import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Masonry from "react-masonry-css";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { apiUser } from "../../lib/apiUser";
import LazyImage from "../../components/LazyImage";

const PAGE_SIZE = 24;

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    apiUser.get("/api/images/public/memories")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setPhotos(shuffleArray(data));
        setVisibleCount(PAGE_SIZE);
      })
      .catch((err) => console.error("Error fetching memories:", err))
      .finally(() => setLoading(false));
  }, []);

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
    if (!loadMoreRef.current) return;
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
  }, [photos.length, loadingMore]);

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
        @keyframes memSpin { to { transform: rotate(360deg); } }

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

      {/* Empty / Loading State */}
      {loading ? (
        <div className="mem-empty-dark">
          <div style={{ width: 32, height: 32, border: "2px solid rgba(255,77,0,0.2)", borderTopColor: "#ff4d00", borderRadius: "50%", animation: "memSpin 0.8s linear infinite", margin: "0 auto 12px" }} />
          <p style={{ color: "#888898" }}>Loading gallery...</p>
        </div>
      ) : photos.length === 0 ? (
        <div className="mem-empty-dark">
          <ImageIcon size={48} strokeWidth={1} style={{ margin: "0 auto 12px", display: "block", color: "#3a3a50" }} />
          <p>No photos yet — check back soon!</p>
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