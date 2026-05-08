import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
} from "@mui/material";

const monthlySales = [
  { month: "Jan", revenue: 10200, orders: 85 },
  { month: "Feb", revenue: 9800, orders: 78 },
  { month: "Mar", revenue: 12500, orders: 104 },
  { month: "Apr", revenue: 11300, orders: 96 },
  { month: "May", revenue: 14700, orders: 120 },
];

const topProducts = [
  { name: "Standing Desk", revenue: 21960, share: 88 },
  { name: "Monitor 27\"", revenue: 15960, share: 64 },
  { name: "Ergonomic Chair", revenue: 11960, share: 48 },
  { name: "Mechanical Keyboard", revenue: 8999, share: 36 },
  { name: "USB-C Hub", revenue: 5998, share: 24 },
];

const maxRevenue = Math.max(...monthlySales.map((m) => m.revenue));

export default function Reports() {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Reports &amp; Analytics
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                YTD Revenue
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                $58,500
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Jan – May 2025
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                483
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Jan – May 2025
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Avg. Order Value
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                $121.12
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Jan – May 2025
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Monthly Sales Table */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Monthly Sales
          </Typography>
          <TableContainer component={Paper} elevation={2}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell><strong>Month</strong></TableCell>
                  <TableCell align="right"><strong>Revenue</strong></TableCell>
                  <TableCell align="right"><strong>Orders</strong></TableCell>
                  <TableCell><strong>Bar</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {monthlySales.map((row) => (
                  <TableRow key={row.month} hover>
                    <TableCell>{row.month}</TableCell>
                    <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                    <TableCell align="right">{row.orders}</TableCell>
                    <TableCell sx={{ width: 120 }}>
                      <LinearProgress
                        variant="determinate"
                        value={(row.revenue / maxRevenue) * 100}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Top Products by Revenue
          </Typography>
          <TableContainer component={Paper} elevation={2}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell><strong>Product</strong></TableCell>
                  <TableCell align="right"><strong>Revenue</strong></TableCell>
                  <TableCell><strong>Share</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topProducts.map((p) => (
                  <TableRow key={p.name} hover>
                    <TableCell>{p.name}</TableCell>
                    <TableCell align="right">${p.revenue.toLocaleString()}</TableCell>
                    <TableCell sx={{ width: 140 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LinearProgress
                          variant="determinate"
                          value={p.share}
                          sx={{ height: 8, borderRadius: 4, flexGrow: 1 }}
                          color="secondary"
                        />
                        <Typography variant="caption">{p.share}%</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
