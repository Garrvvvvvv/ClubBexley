import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen font-sans" style={{ background: "#ffffff", color: "#333" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div 
        className="flex-1 overflow-y-auto p-8 relative" 
        style={{ background: "#ffffff" }}
      >
        {/* Subtle red ambient blurs */}
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
        
        <div className="relative z-10 h-full min-h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}