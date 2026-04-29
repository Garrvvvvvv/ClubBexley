import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      background: "#06060b",
      color: "#f0ece4",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      overflow: "hidden",
    }}>
      <AdminSidebar />

      {/* Main content */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        background: "#06060b",
        position: "relative",
      }}>
        {/* Fixed ambient orbs — purely decorative */}
        <div style={{
          position: "fixed", top: -100, right: -100,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,77,0,0.05) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "fixed", bottom: -150, left: 300,
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,196,71,0.03) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* Page content */}
        <div style={{ position: "relative", zIndex: 1, padding: "32px", minHeight: "100%" }}>
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
}
