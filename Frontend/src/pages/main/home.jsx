import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css";
import { FaClipboardList, FaRegCalendarAlt, FaImage, FaUsers, FaMicrophone } from "react-icons/fa";
import { api } from "../../lib/api";
import { useEventLock } from "../../context/EventLockContext";
function isCloudinary(url) {
  return typeof url === "string" && /res\.cloudinary\.com\/[^/]+\/image\/upload\//.test(url);
}
function addTransform(url, transform) {
  if (!isCloudinary(url)) return url;
  return url.replace(/\/image\/upload\/(?!.*\/image\/upload\/)/, `/image/upload/${transform}/`);
}

function buildCloudinarySources(url, widths, { crop = "c_fill", gravity = "g_auto", quality = "q_auto", fmt = "f_auto", dpr = "dpr_auto" } = {}) {
  if (!isCloudinary(url)) {
    return { src: url, srcSet: undefined };
  }
  const baseTransform = [fmt, quality, dpr, gravity, crop].filter(Boolean).join(",");
  const srcSet = widths.map((w) => `${addTransform(url, `${baseTransform},w_${w}`)} ${w}w`).join(", ");
  const src = addTransform(url, `${baseTransform},w_${Math.max(...widths)}`);
  return { src, srcSet };
}

function Home() {
  const [posterImages, setPosterImages] = useState([]);
  const [jubileeImages, setJubileeImages] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const { isLocked, eventData: lockedEvent } = useEventLock();

  useEffect(() => {
    // Headers removed as they were unused

    api
      .get("/api/images/public/home-images", { params: { category: "home_announcement" } })
      .then((res) => {
        const urls = Array.isArray(res.data) ? res.data.map((img) => img && img.url).filter(Boolean) : [];
        setPosterImages(Array.from(new Set(urls)));
      })
      .catch((err) => console.error("Error fetching poster images:", err));

    api
      .get("/api/images/public/home-images", { params: { category: "home_memories" } })
      .then((res) => {
        const urls = Array.isArray(res.data) ? res.data.map((img) => img && img.url).filter(Boolean) : [];
        setJubileeImages(Array.from(new Set(urls)));
      })
      .catch((err) => console.error("Error fetching memories images:", err));

    // Handle Event Fetching (Locked vs Ongoing)
    if (isLocked && lockedEvent) {
      // If locked, we only show the locked event
      setEvents([lockedEvent]);

    } else {
      // Not locked: fetch all ongoing events
      api
        .get("/api/events/ongoing")
        .then((res) => {
          const eventsData = Array.isArray(res.data) ? res.data : [];
          setEvents(eventsData);
        })
        .catch((err) => console.error("Error fetching events:", err));
    }
  }, [isLocked, lockedEvent]);

  useEffect(() => {
    if (events.length === 0) return;
    const eventInterval = setInterval(() => {
      setCurrentEventIndex(prev => (prev + 1) % events.length);
    }, 6000);

    return () => {
      clearInterval(eventInterval);
    };
  }, [events]);



  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-[#f4f4f400] hover:bg-[#00000030] p-3 rounded-full shadow-md transition-transform duration-200 hover:scale-110"
      onClick={onClick}
      aria-label="Next"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5 sm:w-6 sm:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-[#f4f4f400] hover:bg-[#00000030] p-3 rounded-full shadow-md transition-transform duration-200 hover:scale-110"
      onClick={onClick}
      aria-label="Previous"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5 sm:w-6 sm:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );

  const posterSettings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 600,
      autoplay: true,
      autoplaySpeed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      centerMode: true,
      centerPadding: "0px",
      lazyLoad: "ondemand", // react-slick lazy load
      responsive: [
        {
          breakpoint: 640,
          settings: {
            centerMode: false,
            arrows: true,
            dots: true,
            lazyLoad: "ondemand",
          },
        },
      ],
    }),
    []
  );

  const jubileeSettings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 2500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      lazyLoad: "ondemand", // react-slick lazy load
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2, lazyLoad: "ondemand" } },
        { breakpoint: 768, settings: { slidesToShow: 1, lazyLoad: "ondemand" } },
      ],
    }),
    []
  );



  /* ---------- Responsive image intent (sizes + widths) ---------- */
  // Posters: large hero-style slides; we target up to ~1600px effective width
  const posterWidths = [480, 768, 1024, 1280, 1600, 1920];
  const posterSizes =
    "(max-width: 640px) 95vw, (max-width: 1024px) 90vw, (max-width: 1536px) 75vw, 70vw";

  // Memories: smaller cards inside carousel
  const memWidths = [360, 540, 720, 960, 1200];
  const memSizes =
    "(max-width: 768px) 90vw, (max-width: 1024px) 42vw, 28vw";

  const navItems = useMemo(() => {
    if (isLocked && lockedEvent) {
      return [
        {
          href: `/event/${lockedEvent.slug}/register`,
          text: "Register Now",
          desc: "Secure your spot for the event.",
          icon: <FaClipboardList />
        },
        {
          href: `/event/${lockedEvent.slug}/flow`,
          text: "Event Flow",
          desc: "See the timeline of the event.",
          icon: <FaRegCalendarAlt />
        },
        {
          href: `/event/${lockedEvent.slug}/memories`,
          text: "Gallery",
          desc: "Relive highlights through photos.",
          icon: <FaImage />
        },
        {
          href: "/meetourteam",
          text: "Meet ARC Team",
          desc: "Get to know the organizers making it happen.",
          icon: <FaUsers />
        },
      ];
    } else {
      return [
        {
          href: "/register",
          text: "Register Now",
          desc: "Complete your registration to confirm your participation in the upcoming event.",
          icon: <FaClipboardList />
        },
        {
          href: "/memories",
          text: "Gallery",
          desc: "Relive highlights through photos.",
          icon: <FaImage />
        },
        {
          href: "/podcasts",
          text: "Podcasts",
          desc: "Empowering creative voices through digital media, providing resources for storytelling and content creation.",
          icon: <FaMicrophone />
        },
        {
          href: "/meetourteam",
          text: "Meet ARC Team",
          desc: "Get to know the organizers making it happen.",
          icon: <FaUsers />
        },
      ];
    }
  }, [isLocked, lockedEvent]);

  return (
    <>
      <div className="page-content">
        {/* Posters - Maroon Background */}
        <div className="w-full bg-[#8B0000] p-0 m-0">
          <section className="relative w-full">
            <Slider {...posterSettings}>
              {posterImages.map((url, idx) => {
                const { src, srcSet } = buildCloudinarySources(url, posterWidths, {
                  crop: "c_fill",
                  gravity: "g_auto",
                  quality: "q_auto",
                  fmt: "f_auto",
                  dpr: "dpr_auto",
                });
                return (
                  <div key={idx} className="px-0">
                    <div className="overflow-hidden bg-black">
                      <img
                        src={src}
                        srcSet={srcSet}
                        sizes={posterSizes}
                        alt={`Poster ${idx + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="
                          w-full 
                          h-[250px]
                          sm:h-[400px]
                          md:h-[calc(100vh-90px)]
                          object-cover 
                          transition-transform 
                          duration-300 
                          hover:scale-[1.01]
                        "
                      />
                    </div>
                  </div>
                );
              })}
            </Slider>
          </section>
        </div>

        {/* Dynamic Events Showcase - Diagonal Split Design */}
        {events.length > 0 && events[currentEventIndex] && (
          <div className="w-full h-[180px] sm:h-[140px] relative overflow-hidden mb-8">
            {/* Diagonal Split Container */}
            <div className="absolute inset-0 flex">
              {/* Left Side - Maroon with Event Name */}
              <div
                className="relative flex items-center justify-start px-6 sm:px-12 md:px-16 lg:px-20"
                style={{
                  background: '#8B0000',
                  clipPath: 'polygon(0 0, 100% 0, 65% 100%, 0% 100%)',
                  width: '70%',
                  zIndex: 2
                }}
              >
                <div className="flex items-center gap-3 sm:gap-4 text-white">
                  {/* Icon */}
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                  </svg>

                  {/* Event Name with Animation */}
                  <h2
                    key={currentEventIndex}
                    className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wide animate-fade-in"
                    style={{
                      animation: 'fadeIn 0.5s ease-in-out'
                    }}
                  >
                    {events[currentEventIndex].name}
                  </h2>
                </div>
              </div>

              {/* Right Side - White with Link */}
              <div
                className="absolute right-0 top-0 h-full flex items-center justify-end pr-6 sm:pr-12 md:pr-16 lg:pr-20"
                style={{
                  background: '#ffffff',
                  width: '50%'
                }}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* CTA Text and Button */}
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-gray-700 text-xs sm:text-sm md:text-base font-medium hidden sm:block">
                      Join us :
                    </p>
                    <Link
                      to={`/event/${events[currentEventIndex].slug}/register`}
                      className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#8B0000] text-white font-bold text-xs sm:text-sm hover:bg-[#a00002] transition-all rounded shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      REGISTER NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Quick Navigation – dark, accent top border, animated hover */}
        {/* Quick Navigation - Redesigned to match TI Style */}
        <section className="py-20 my-8 px-4">
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className={`
                  group block p-4 sm:p-6 lg:p-10 rounded-[16px] sm:rounded-[24px] transition-all duration-300 h-full flex flex-col justify-between 
                  min-h-[240px] sm:min-h-[320px] lg:min-h-[380px]
                  bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-transparent
                  hover:bg-[#FFF5F5] hover:shadow-none
                `}
              >
                <div>
                  {/* Icon Container */}
                  <div className={`
                      w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center 
                      text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-6 lg:mb-8
                      transition-colors text-[#ca0002] 
                  `}>
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-[1.1rem] sm:text-[1.4rem] lg:text-[1.8rem] font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 leading-tight">
                    {item.text}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-[0.75rem] sm:text-[0.9rem] lg:text-[1.05rem] leading-5 sm:leading-6 lg:leading-7 font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* Learn More Link */}
                <div className="flex items-center text-[#ca0002] font-bold text-[0.8rem] sm:text-[0.9rem] lg:text-[1rem] mt-4 sm:mt-6 lg:mt-8 group-hover:translate-x-1 transition-transform">
                  <span className="mr-2">Learn More</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px]">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Core Values Section - Maroon Alternating Layout */}
        <section className="w-full">
          {[
            {
              title: "CONNECT",
              text: "ARC bridges past, present, and future, uniting students and alumni. We turn conversations into mentorships and ideas into opportunities, building a community where connections shape the future.",
              img: "https://res.cloudinary.com/dc45s96yk/image/upload/v1770219928/connect_vf0uya.jpg",
              layout: "left"
            },
            {
              title: "CREATE",
              text: "We foster a space for meaningful impact where ambition meets experience. Through events and mentorship, ARC builds networks that unlock possibilities and shape successful futures.",
              img: "https://res.cloudinary.com/dc45s96yk/image/upload/v1770220094/contribute_ayitgb.jpg",
              layout: "right"
            },
            {
              title: "CONTRIBUTE",
              text: "Where energy meets experience, everyone adds value. Students bring creativity, alumni share wisdom—together turning conversations into collaborations and building a lasting legacy.",
              img: "https://res.cloudinary.com/dq8uyd4qb/image/upload/v1772211911/WhatsApp_Image_2026-02-27_at_10.31.21_PM_hjz6uf.webp",
              layout: "left"
            }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-row min-h-[300px]">
              {/* Image Side */}
              <div className={`w-1/2 relative ${item.layout === 'right' ? 'order-2' : ''}`}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Side - Maroon Background */}
              <div className={`w-1/2 bg-[#8B0000] text-white p-4 sm:p-8 md:p-16 flex flex-col justify-center ${item.layout === 'right' ? 'order-1' : ''}`}>
                <h2 className="text-xl sm:text-3xl md:text-5xl font-serif font-bold mb-3 md:mb-6 tracking-wide">
                  {item.title}
                </h2>
                <p className="text-[0.7rem] sm:text-sm md:text-lg leading-relaxed text-gray-100 font-light">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Memories */}
        <section className="w-[95%] sm:w-[90%] mx-auto my-14">
          <h2 className="text-l sm:text-xl md:text-2xl xl:text-3xl font-bold text-center mb-8 text-[#EE634F]">
            Memories Through the Years
          </h2>
          <Slider {...jubileeSettings}>
            {jubileeImages.map((url, idx) => {
              const { src, srcSet } = buildCloudinarySources(url, memWidths, {
                crop: "c_fill",
                gravity: "g_auto",
                quality: "q_auto",
                fmt: "f_auto",
                dpr: "dpr_auto",
              });
              return (
                <div key={idx} className="px-2 sm:px-3">
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border-2 border-[#C5D7DC] p-0.5 bg-white">
                    <img
                      src={src}
                      srcSet={srcSet}
                      sizes={memSizes}
                      alt={`Memory ${idx + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-[200px] sm:h-[280px] md:h-[320px] lg:h-[400px] object-cover rounded-xl"
                    />
                  </div>
                </div>
              );
            })}
          </Slider>
        </section>
      </div>
    </>
  );
}

export default Home;
