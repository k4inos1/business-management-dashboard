import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { Timeline, Person, Work, Info } from '@mui/icons-material';

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalUsers: 154,
    activeUsers: 89,
    totalProjects: 42,
    activeProjects: 12
  });

  const [systemHealth, setSystemHealth] = useState({
    status: 'healthy',
    cpu: 24,
    memory: 45,
    disk: 60
  });

  const [recentActivity, setRecentActivity] = useState([
    { type: 'user', action: 'New User Registered', description: 'John Doe joined the platform', timestamp: new Date() },
    { type: 'project', action: 'Project Updated', description: 'IoT Sensor network V2 deployed', timestamp: new Date(Date.now() - 3600000) },
    { type: 'info', action: 'System Backup', description: 'Automated database backup completed', timestamp: new Date(Date.now() - 7200000) },
  ]);

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      default: return 'primary';
    }
  };

  return (
    <Box>
      {/* Stats Grid */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="h6">Users</Typography>
              <Typography variant="h3" component="div">{stats.totalUsers}</Typography>
              <Typography variant="body2" color="textSecondary">Total</Typography>
              <Typography variant="body2" color="success.main" sx={{ mt: 1, fontWeight: 'bold' }}>{stats.activeUsers} active</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="h6">Projects</Typography>
              <Typography variant="h3" component="div">{stats.totalProjects}</Typography>
              <Typography variant="body2" color="textSecondary">Total</Typography>
              <Typography variant="body2" color="success.main" sx={{ mt: 1, fontWeight: 'bold' }}>{stats.activeProjects} active</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box mb={4}>
        <Typography variant="h5" gutterBottom>Quick Actions</Typography>
        <Button variant="contained" color="primary" startIcon={<Timeline />}>
          View Roadmap
        </Button>
      </Box>

      {/* System Health */}
      <Card elevation={2} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>System Health</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" gutterBottom>CPU</Typography>
              <LinearProgress variant="determinate" value={systemHealth.cpu} color={getHealthColor(systemHealth.status) as any} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
              <Typography variant="body2" color="textSecondary">{systemHealth.cpu}%</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" gutterBottom>Memory</Typography>
              <LinearProgress variant="determinate" value={systemHealth.memory} color={getHealthColor(systemHealth.status) as any} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
              <Typography variant="body2" color="textSecondary">{systemHealth.memory}%</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" gutterBottom>Disk</Typography>
              <LinearProgress variant="determinate" value={systemHealth.disk} color={getHealthColor(systemHealth.status) as any} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
              <Typography variant="body2" color="textSecondary">{systemHealth.disk}%</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Recent Activity</Typography>
          <List>
            {recentActivity.map((activity, index) => (
              <ListItem key={index} divider={index < recentActivity.length - 1}>
                <ListItemIcon>
                  {activity.type === 'user' ? <Person color="primary" /> : activity.type === 'project' ? <Work color="secondary" /> : <Info color="info" />}
                </ListItemIcon>
                <ListItemText 
                  primary={activity.action} 
                  secondary={<React.Fragment>
                    <Typography component="span" variant="body2" color="text.primary">
                      {activity.description}
                    </Typography>
                    {" — " + activity.timestamp.toLocaleTimeString()}
                  </React.Fragment>} 
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
