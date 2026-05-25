import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const orders = [
  { id: "#ORD-001", customer: "Alice Johnson", product: "Wireless Keyboard", amount: 49.99, status: "Delivered", date: "2025-04-28" },
  { id: "#ORD-002", customer: "Bob Smith", product: "Ergonomic Chair", amount: 299.00, status: "Pending", date: "2025-04-29" },
  { id: "#ORD-003", customer: "Carol White", product: "Monitor 27\"", amount: 399.00, status: "Processing", date: "2025-04-30" },
  { id: "#ORD-004", customer: "David Brown", product: "USB-C Hub", amount: 29.99, status: "Delivered", date: "2025-05-01" },
  { id: "#ORD-005", customer: "Eva Martinez", product: "Standing Desk", amount: 549.00, status: "Pending", date: "2025-05-02" },
  { id: "#ORD-006", customer: "Frank Wilson", product: "Laptop Stand", amount: 39.99, status: "Cancelled", date: "2025-05-02" },
  { id: "#ORD-007", customer: "Grace Lee", product: "Mechanical Keyboard", amount: 89.99, status: "Processing", date: "2025-05-03" },
  { id: "#ORD-008", customer: "Henry Davis", product: "Webcam HD", amount: 79.99, status: "Delivered", date: "2025-05-03" },
  { id: "#ORD-009", customer: "Alice Johnson", product: "Desk Lamp", amount: 24.99, status: "Delivered", date: "2025-05-04" },
  { id: "#ORD-010", customer: "David Brown", product: "Office Shelf", amount: 129.00, status: "Pending", date: "2025-05-05" },
];

const statusColors = {
  Delivered: "success",
  Pending: "warning",
  Processing: "info",
  Cancelled: "error",
};

export default function Orders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const total = filtered.reduce((sum, o) => sum + o.amount, 0);

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Order Management
      </Typography>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          placeholder="Search orders…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ width: 280 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Customer</strong></TableCell>
              <TableCell><strong>Product</strong></TableCell>
              <TableCell align="right"><strong>Amount</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell sx={{ fontFamily: "monospace", color: "text.secondary" }}>
                  {order.id}
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell align="right">${order.amount.toFixed(2)}</TableCell>
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
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "text.secondary", py: 4 }}>
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography variant="caption" color="text.secondary">
          Showing {filtered.length} of {orders.length} orders
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Total: ${total.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
}
