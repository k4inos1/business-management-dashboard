import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";

const kpiCards = [
  {
    label: "Total Revenue",
    value: "$124,500",
    change: "+12% vs last month",
    icon: <TrendingUpIcon fontSize="large" />,
    color: "#1a237e",
  },
  {
    label: "Total Customers",
    value: "3,842",
    change: "+5% vs last month",
    icon: <PeopleIcon fontSize="large" />,
    color: "#00695c",
  },
  {
    label: "Total Orders",
    value: "1,267",
    change: "+8% vs last month",
    icon: <ShoppingCartIcon fontSize="large" />,
    color: "#e65100",
  },
  {
    label: "Products in Stock",
    value: "528",
    change: "-3% vs last month",
    icon: <InventoryIcon fontSize="large" />,
    color: "#4a148c",
  },
];

const recentOrders = [
  { id: "#ORD-001", customer: "Alice Johnson", amount: "$320.00", status: "Delivered", date: "2025-04-28" },
  { id: "#ORD-002", customer: "Bob Smith", amount: "$145.50", status: "Pending", date: "2025-04-29" },
  { id: "#ORD-003", customer: "Carol White", amount: "$890.00", status: "Processing", date: "2025-04-30" },
  { id: "#ORD-004", customer: "David Brown", amount: "$55.75", status: "Delivered", date: "2025-05-01" },
  { id: "#ORD-005", customer: "Eva Martinez", amount: "$1,200.00", status: "Pending", date: "2025-05-02" },
];

const statusColors = {
  Delivered: "success",
  Pending: "warning",
  Processing: "info",
  Cancelled: "error",
};

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Dashboard Overview
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        {kpiCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {card.label}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {card.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {card.change}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: card.color,
                      borderRadius: 2,
                      p: 1,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Orders Table */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Recent Orders
      </Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Customer</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={statusColors[order.status] || "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
