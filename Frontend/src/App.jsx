import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------- Main Website Pages ---------- */
import Home from "./pages/main/home";
import EventList from "./pages/main/EventList";
import EventFlow from "./pages/main/EventFlowpage.jsx";
import PhotoGallery from "./pages/main/memories";
import UserLogin from "./pages/main/userlogin";
import Meetourteam from "./pages/main/meetourteam";
import MeetOurDevelopers from "./pages/main/MeetOurDevelopers";
import TripDetail from "./pages/main/TripDetail";

/* ---------- Layouts ---------- */
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

/* ---------- Auth Guards ---------- */
import AdminProtectedRoute from "./components/ProtectedRoute.jsx";
import { AdminEventProvider } from "./context/AdminEventContext";

/* ---------- Admin Pages ---------- */
import Login from "./pages/Admin/Login.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AdminMemories from "./pages/Admin/AdminMemories.jsx";
import AdminEvents from "./pages/Admin/AdminEvents";
import AdminSidebar from "./components/AdminSidebar.jsx";
import AdminForgotPassword from "./pages/Admin/ForgotPassword.jsx";
import AdminLogs from "./pages/Admin/AdminLogs.jsx";
import AdminEmails from "./pages/Admin/AdminEmails.jsx";


/* =========================================
   ADMIN LAYOUT WRAPPER
   ========================================= */
function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />
      <div className="flex-1 w-full lg:w-auto relative overflow-hidden">
        <div style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(202, 0, 2, 0.04) 0%, rgba(255, 255, 255, 0) 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: -150,
          left: -50,
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(202, 0, 2, 0.03) 0%, rgba(255, 255, 255, 0) 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }} />
        <div className="relative z-10 p-4 md:p-6 lg:p-8 pt-20 lg:pt-8 text-gray-800 min-h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}


function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');
  const hideNavAndFooter = isAdminRoute;

  return (
    <>
      {!hideNavAndFooter && <Navbar />}

      <div className={!hideNavAndFooter ? "pt-[90px]" : ""} style={!hideNavAndFooter ? { background: "#06060b", minHeight: "100vh" } : {}}>
        <Routes>

          {/* =========================================
              PUBLIC ROUTES
          ========================================= */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/meetourteam" element={<Meetourteam />} />
          <Route path="/meetourdevelopers" element={<MeetOurDevelopers />} />

          <Route path="/eventFlow" element={<EventFlow />} />
          <Route path="/event/:eventSlug/flow" element={<EventFlow />} />

          <Route path="/memories" element={<PhotoGallery />} />
          <Route path="/events/memories" element={<PhotoGallery />} />
          <Route path="/event/:eventSlug/memories" element={<PhotoGallery />} />
          <Route path="/event/:eventSlug" element={<TripDetail />} />

          {/* =========================================
              ADMIN ROUTES
          ========================================= */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <AdminEventProvider>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="events" element={<AdminEvents />} />
                      <Route path="memories" element={<AdminMemories />} />
                      <Route path="logs" element={<AdminLogs />} />
                      <Route path="emails" element={<AdminEmails />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </AdminLayout>
                </AdminEventProvider>
              </AdminProtectedRoute>
            }
          />

          {/* Global Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>

      {!hideNavAndFooter && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
