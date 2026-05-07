import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Chip,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const initialUsers = [
  { id: 1, name: 'Admin User', email: 'admin@system.com', role: 'ADMIN', status: 'Active' },
  { id: 2, name: 'Ricardo Manager', email: 'ricardo@system.com', role: 'MANAGER', status: 'Active' },
  { id: 3, name: 'Test User', email: 'test@system.com', role: 'USER', status: 'Inactive' },
];

export default function UserManagement() {
  const [users] = useState(initialUsers);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">User Management</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: 'grey.100' }}>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.role} 
                    color={user.role === 'ADMIN' ? 'error' : user.role === 'MANAGER' ? 'secondary' : 'default'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={user.status} 
                    color={user.status === 'Active' ? 'success' : 'default'} 
                    variant="outlined"
                    size="small" 
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
