import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";

const DRAWER_WIDTH = 240;

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, view: "dashboard" },
  { label: "Customers", icon: <PeopleIcon />, view: "customers" },
  { label: "Products", icon: <InventoryIcon />, view: "products" },
  { label: "Orders", icon: <ShoppingCartIcon />, view: "orders" },
  { label: "Reports", icon: <BarChartIcon />, view: "reports" },
];

export default function Sidebar({ currentView, onNavigate }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#1a237e",
          color: "#fff",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap fontWeight="bold">
          BizDashboard
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.view} disablePadding>
            <ListItemButton
              selected={currentView === item.view}
              onClick={() => onNavigate(item.view)}
              sx={{
                color: "#fff",
                "&.Mui-selected": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
          Business Management Dashboard
        </Typography>
      </Box>
    </Drawer>
  );
}
