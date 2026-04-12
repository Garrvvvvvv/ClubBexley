import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function EventControllerNavbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const controllerName =
    localStorage.getItem("controllerUser") || "Controller";

  const firstName = controllerName.split(" ")[0];

  const handleLogout = () => {
    localStorage.removeItem("controllerToken");
    localStorage.removeItem("controllerUser");
    navigate("/controller/login");
  };

  const toggleDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar
        position="sticky" // ✅ Prevents content cutting
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "0px 1px 2px #ca0002",
          borderBottom: "4px solid #ca0002",
          zIndex: 1200,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", minHeight: 80 }}>
            
            {/* LEFT: LOGOS */}
            <Box
              onClick={() => navigate("/controller/dashboard")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
            >
              <img
                src="/assets/ti-logo.png"
                alt="TI Logo"
                style={{ height: 50 }}
              />
              <img
                src="/assets/arc-logo.png"
                alt="ARC Logo"
                style={{ height: 50 }}
              />
            </Box>

            {/* DESKTOP: USER + LOGOUT */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 3,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "#333",
                }}
              >
                Welcome, {firstName}
              </Typography>

              <IconButton
                onClick={handleLogout}
                size="small"
                sx={{ color: "#ca0002" }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* MOBILE: HAMBURGER */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: "#333" }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
      >
        <Box sx={{ width: 250, padding: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 2 }}
          >
            Welcome, {firstName}
          </Typography>

          <Divider />

          <List>
            <ListItem button onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1, color: "#ca0002" }} />
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}