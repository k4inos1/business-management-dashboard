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
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const customers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "+1 555-0101", city: "New York", status: "Active", orders: 14 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "+1 555-0102", city: "Los Angeles", status: "Active", orders: 7 },
  { id: 3, name: "Carol White", email: "carol@example.com", phone: "+1 555-0103", city: "Chicago", status: "Inactive", orders: 3 },
  { id: 4, name: "David Brown", email: "david@example.com", phone: "+1 555-0104", city: "Houston", status: "Active", orders: 21 },
  { id: 5, name: "Eva Martinez", email: "eva@example.com", phone: "+1 555-0105", city: "Phoenix", status: "Active", orders: 9 },
  { id: 6, name: "Frank Wilson", email: "frank@example.com", phone: "+1 555-0106", city: "Philadelphia", status: "Suspended", orders: 0 },
  { id: 7, name: "Grace Lee", email: "grace@example.com", phone: "+1 555-0107", city: "San Antonio", status: "Active", orders: 5 },
  { id: 8, name: "Henry Davis", email: "henry@example.com", phone: "+1 555-0108", city: "San Diego", status: "Inactive", orders: 2 },
];

const statusColors = {
  Active: "success",
  Inactive: "default",
  Suspended: "error",
};

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function Customers() {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Customer Management
      </Typography>

      <TextField
        placeholder="Search customers…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{ mb: 3, width: 320 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Customer</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>City</strong></TableCell>
              <TableCell><strong>Orders</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((customer) => (
              <TableRow key={customer.id} hover>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: "#1a237e" }}>
                      {getInitials(customer.name)}
                    </Avatar>
                    {customer.name}
                  </Box>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.city}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>
                  <Chip
                    label={customer.status}
                    color={statusColors[customer.status] || "default"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "text.secondary", py: 4 }}>
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
        Showing {filtered.length} of {customers.length} customers
      </Typography>
    </Box>
  );
}
