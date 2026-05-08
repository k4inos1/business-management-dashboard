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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const products = [
  { id: 1, name: "Wireless Keyboard", category: "Electronics", price: 49.99, stock: 120, sku: "EL-001", status: "In Stock" },
  { id: 2, name: "Ergonomic Chair", category: "Furniture", price: 299.00, stock: 35, sku: "FU-002", status: "In Stock" },
  { id: 3, name: "Standing Desk", category: "Furniture", price: 549.00, stock: 0, sku: "FU-003", status: "Out of Stock" },
  { id: 4, name: "USB-C Hub", category: "Electronics", price: 29.99, stock: 200, sku: "EL-004", status: "In Stock" },
  { id: 5, name: "Monitor 27\"", category: "Electronics", price: 399.00, stock: 15, sku: "EL-005", status: "Low Stock" },
  { id: 6, name: "Laptop Stand", category: "Accessories", price: 39.99, stock: 85, sku: "AC-006", status: "In Stock" },
  { id: 7, name: "Mechanical Keyboard", category: "Electronics", price: 89.99, stock: 4, sku: "EL-007", status: "Low Stock" },
  { id: 8, name: "Webcam HD", category: "Electronics", price: 79.99, stock: 0, sku: "EL-008", status: "Out of Stock" },
  { id: 9, name: "Desk Lamp", category: "Accessories", price: 24.99, stock: 150, sku: "AC-009", status: "In Stock" },
  { id: 10, name: "Office Shelf", category: "Furniture", price: 129.00, stock: 22, sku: "FU-010", status: "In Stock" },
];

const statusColors = {
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "error",
};

export default function Products() {
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Product Catalog
      </Typography>

      <TextField
        placeholder="Search products…"
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
              <TableCell><strong>SKU</strong></TableCell>
              <TableCell><strong>Product Name</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell align="right"><strong>Price</strong></TableCell>
              <TableCell align="right"><strong>Stock</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell sx={{ fontFamily: "monospace", color: "text.secondary" }}>
                  {product.sku}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell>
                  <Chip
                    label={product.status}
                    color={statusColors[product.status] || "default"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "text.secondary", py: 4 }}>
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
        Showing {filtered.length} of {products.length} products
      </Typography>
    </Box>
  );
}
