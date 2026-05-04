import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------- Main Website Pages ---------- */
import Home from "./pages/main/home";
import EventList from "./pages/main/EventList";
import EventFlow from "./pages/main/EventFlowpage.jsx";
import PhotoGallery from "./pages/main/memories";
import Meetourteam from "./pages/main/meetourteam";
import MeetOurDevelopers from "./pages/main/MeetOurDevelopers";
import TripDetail from "./pages/main/TripDetail";

/* ---------- Layouts ---------- */
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

/* ---------- Auth Guards ---------- */
import AdminProtectedRoute from "./components/ProtectedRoute.jsx";
import { AdminEventProvider } from "./context/AdminEventContext";
import AdminLayout from "./pages/Admin/AdminLayout.jsx";

/* ---------- Admin Pages ---------- */
import Login from "./pages/Admin/Login.jsx";
import AdminMemories from "./pages/Admin/AdminMemories.jsx";
import AdminEvents from "./pages/Admin/AdminEvents";
import AdminForgotPassword from "./pages/Admin/ForgotPassword.jsx";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const hideNavAndFooter = isAdminRoute;

  return (
    <>
      {!hideNavAndFooter && <Navbar />}

      <div className={!hideNavAndFooter ? "pt-[90px]" : ""} style={!hideNavAndFooter ? { background: "#06060b", minHeight: "100vh" } : {}}>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/meetourteam" element={<Meetourteam />} />
          <Route path="/meetourdevelopers" element={<MeetOurDevelopers />} />

          <Route path="/eventFlow" element={<EventFlow />} />
          <Route path="/event/:eventSlug/flow" element={<EventFlow />} />

          <Route path="/memories" element={<PhotoGallery />} />
          <Route path="/events/memories" element={<PhotoGallery />} />
          <Route path="/event/:eventSlug/memories" element={<PhotoGallery />} />
          <Route path="/event/:eventSlug" element={<TripDetail />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <AdminEventProvider>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<AdminEvents />} />
                      <Route path="dashboard/events" element={<AdminEvents />} />
                      <Route path="events" element={<AdminEvents />} />
                      <Route path="memories" element={<AdminMemories />} />
                      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                    </Routes>
                  </AdminLayout>
                </AdminEventProvider>
              </AdminProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>

      {!hideNavAndFooter && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
