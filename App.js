import React, { useState } from "react";
import { Box, Toolbar, AppBar, Typography, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "./components/Sidebar.js";
import Dashboard from "./components/Dashboard.js";
import Customers from "./components/Customers.js";
import Products from "./components/Products.js";
import Orders from "./components/Orders.js";
import Reports from "./components/Reports.js";

const theme = createTheme({
  palette: {
    primary: { main: "#1a237e" },
    secondary: { main: "#00695c" },
  },
});

const VIEW_LABELS = {
  dashboard: "Dashboard",
  customers: "Customers",
  products: "Products",
  orders: "Orders",
  reports: "Reports",
};

function renderView(view) {
  switch (view) {
    case "customers": return <Customers />;
    case "products":  return <Products />;
    case "orders":    return <Orders />;
    case "reports":   return <Reports />;
    default:          return <Dashboard />;
  }
}

function App() {
  const [currentView, setCurrentView] = useState("dashboard");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar currentView={currentView} onNavigate={setCurrentView} />
        <Box component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <AppBar position="static" elevation={1} sx={{ backgroundColor: "#fff", color: "text.primary" }}>
            <Toolbar>
              <Typography variant="h6" fontWeight="bold">
                {VIEW_LABELS[currentView]}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Business Management Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ p: 3, flexGrow: 1, backgroundColor: "#f9fafb" }}>
            {renderView(currentView)}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
