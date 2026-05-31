import { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, LinearProgress, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Timeline, Person, Work, Info } from '@mui/icons-material';

const recentActivity = [
  { type: 'user', action: 'New User Registered', description: 'John Doe joined the platform', timestamp: new Date('2026-05-31T00:00:00Z') },
  { type: 'project', action: 'Project Updated', description: 'IoT Sensor network V2 deployed', timestamp: new Date('2026-05-30T23:00:00Z') },
  { type: 'info', action: 'System Backup', description: 'Automated database backup completed', timestamp: new Date('2026-05-30T22:00:00Z') },
];

export default function DashboardHome() {
  const [stats] = useState({
    totalUsers: 154,
    activeUsers: 89,
    totalProjects: 42,
    activeProjects: 12
  });

  const [systemHealth] = useState({
    status: 'healthy',
    cpu: 24,
    memory: 45,
    disk: 60
  });

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
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          mb: 4,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
        }}
      >
        <Box>
          <Card elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="h6">Users</Typography>
              <Typography variant="h3" component="div">{stats.totalUsers}</Typography>
              <Typography variant="body2" color="textSecondary">Total</Typography>
              <Typography variant="body2" color="success.main" sx={{ mt: 1, fontWeight: 'bold' }}>{stats.activeUsers} active</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="h6">Projects</Typography>
              <Typography variant="h3" component="div">{stats.totalProjects}</Typography>
              <Typography variant="body2" color="textSecondary">Total</Typography>
              <Typography variant="body2" color="success.main" sx={{ mt: 1, fontWeight: 'bold' }}>{stats.activeProjects} active</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>Quick Actions</Typography>
        <Button variant="contained" color="primary" startIcon={<Timeline />}>
          View Roadmap
        </Button>
      </Box>

      {/* System Health */}
      <Card elevation={2} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>System Health</Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            }}
          >
            <Box>
              <Typography variant="body2" gutterBottom>CPU</Typography>
              <LinearProgress variant="determinate" value={systemHealth.cpu} color={getHealthColor(systemHealth.status) as 'success' | 'warning' | 'error' | 'primary'} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
              <Typography variant="body2" color="textSecondary">{systemHealth.cpu}%</Typography>
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>Memory</Typography>
              <LinearProgress variant="determinate" value={systemHealth.memory} color={getHealthColor(systemHealth.status) as 'success' | 'warning' | 'error' | 'primary'} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
              <Typography variant="body2" color="textSecondary">{systemHealth.memory}%</Typography>
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>Disk</Typography>
              <LinearProgress variant="determinate" value={systemHealth.disk} color={getHealthColor(systemHealth.status) as 'success' | 'warning' | 'error' | 'primary'} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
              <Typography variant="body2" color="textSecondary">{systemHealth.disk}%</Typography>
            </Box>
          </Box>
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
                  secondary={                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {activity.description}
                    </Typography>
                    {" — " + activity.timestamp.toLocaleTimeString()}
                  </>
                  } 
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
