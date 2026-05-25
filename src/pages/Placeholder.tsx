import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Construction as ConstructionIcon } from '@mui/icons-material';

interface PlaceholderProps {
  title: string;
}

export default function Placeholder({ title }: PlaceholderProps) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper elevation={3} sx={{ p: 5, textAlign: 'center', maxWidth: 500, borderRadius: 2 }}>
        <ConstructionIcon sx={{ fontSize: 80, color: 'warning.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          This module is currently under construction. It has been scaffolded as part of the React migration and is ready for future implementation.
        </Typography>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }} onClick={() => window.history.back()}>
          Go Back
        </Button>
      </Paper>
    </Box>
  );
}
