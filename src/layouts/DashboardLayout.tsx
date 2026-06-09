import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, AppBar, Toolbar, IconButton, Typography, Avatar, Tooltip, Badge } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Psychology as AIIcon,
  AccountTree as TaxonomyIcon,
  Hub as GraphIcon,
  Extension as IntegrationsIcon,
  TrendingUp as SalesIcon,
  Forum as FeedbackIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  NotificationsNone as BellIcon,
  Search as SearchIcon,
  ChevronLeft as CollapseIcon,
  ChevronRight as ExpandIcon,
  Bolt as BoltIcon,
} from '@mui/icons-material';

const DRAWER_W = 240;
const COLLAPSED_W = 60;

interface NavGroup {
  label: string;
  items: { text: string; icon: React.ReactNode; path: string; badge?: number }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { text: 'Dashboard', icon: <DashboardIcon fontSize="small" />, path: '/dashboard' },
    ],
  },
  {
    label: 'Unify',
    items: [
      { text: 'Feedback Intelligence', icon: <FeedbackIcon fontSize="small" />, path: '/feedback', badge: 12 },
      { text: 'Integrations', icon: <IntegrationsIcon fontSize="small" />, path: '/integrations' },
    ],
  },
  {
    label: 'Understand',
    items: [
      { text: 'AI Insights', icon: <AIIcon fontSize="small" />, path: '/insights', badge: 6 },
      { text: 'Taxonomy', icon: <TaxonomyIcon fontSize="small" />, path: '/taxonomy' },
      { text: 'Customer Graph', icon: <GraphIcon fontSize="small" />, path: '/customers' },
    ],
  },
  {
    label: 'Act',
    items: [
      { text: 'Sales Intelligence', icon: <SalesIcon fontSize="small" />, path: '/sales-intelligence' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { text: 'Team', icon: <PeopleIcon fontSize="small" />, path: '/users' },
      { text: 'Settings', icon: <SettingsIcon fontSize="small" />, path: '/settings' },
    ],
  },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = collapsed ? COLLAPSED_W : DRAWER_W;

  const currentPage = NAV_GROUPS
    .flatMap(g => g.items)
    .find(i => i.path === location.pathname)?.text || 'Dashboard';

  const Sidebar = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Logo */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 1.5,
        px: collapsed ? 1.5 : 2.5, py: 2.5,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        minHeight: 64,
      }}>
        <Box sx={{
          width: 32, height: 32, borderRadius: '8px', flexShrink: 0,
          background: 'linear-gradient(135deg, #7c3aed 0%, #60a5fa 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <BoltIcon sx={{ fontSize: 18, color: 'white' }} />
        </Box>
        {!collapsed && (
          <Box>
            <Typography sx={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontWeight: 700, fontSize: '14px', color: 'white', lineHeight: 1.1,
            }}>
              InsightFlow
            </Typography>
            <Typography sx={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
              AI PLATFORM
            </Typography>
          </Box>
        )}
      </Box>

      {/* Nav Groups */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', py: 1.5 }}>
        {NAV_GROUPS.map((group) => (
          <Box key={group.label} sx={{ mb: 0.5 }}>
            {!collapsed && (
              <Typography sx={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.3)', px: 2.5, py: 1,
                textTransform: 'uppercase',
              }}>
                {group.label}
              </Typography>
            )}
            {group.items.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Tooltip key={item.path} title={collapsed ? item.text : ''} placement="right">
                  <Box
                    onClick={() => { navigate(item.path); setMobileOpen(false); }}
                    sx={{
                      display: 'flex', alignItems: 'center',
                      gap: collapsed ? 0 : 1.5,
                      px: collapsed ? 0 : 2,
                      mx: 1,
                      py: 1,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      position: 'relative',
                      transition: 'all 0.15s ease',
                      background: active ? 'rgba(167,139,250,0.18)' : 'transparent',
                      '&:hover': {
                        background: active ? 'rgba(167,139,250,0.22)' : 'rgba(255,255,255,0.07)',
                      },
                    }}
                  >
                    {/* Active indicator */}
                    {active && (
                      <Box sx={{
                        position: 'absolute', left: 0, top: '20%', bottom: '20%',
                        width: 3, borderRadius: '0 3px 3px 0',
                        background: 'linear-gradient(180deg, #a78bfa, #60a5fa)',
                      }} />
                    )}
                    <Box sx={{ color: active ? '#a78bfa' : 'rgba(255,255,255,0.55)', display: 'flex', flexShrink: 0 }}>
                      {item.icon}
                    </Box>
                    {!collapsed && (
                      <>
                        <Typography sx={{
                          fontSize: '13px', fontWeight: active ? 600 : 400,
                          color: active ? '#a78bfa' : 'rgba(255,255,255,0.78)',
                          flex: 1,
                          transition: 'color 0.15s',
                        }}>
                          {item.text}
                        </Typography>
                        {item.badge && (
                          <Box sx={{
                            background: 'rgba(124,58,237,0.6)',
                            color: '#e9d5ff',
                            fontSize: '10px', fontWeight: 700,
                            px: 0.8, py: 0.1, borderRadius: '20px',
                            minWidth: 18, textAlign: 'center',
                          }}>
                            {item.badge}
                          </Box>
                        )}
                      </>
                    )}
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        ))}
      </Box>

      {/* User + Collapse */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.08)', p: 1.5 }}>
        {!collapsed && (
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: 1.5,
            p: 1, borderRadius: '8px', mb: 1,
            background: 'rgba(255,255,255,0.05)',
          }}>
            <Avatar sx={{ width: 30, height: 30, fontSize: 12, bgcolor: '#7c3aed' }}>R</Avatar>
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'white', lineHeight: 1.2 }}>
                Ricardo
              </Typography>
              <Typography sx={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
                Admin · Pro Plan
              </Typography>
            </Box>
          </Box>
        )}
        <Box
          onClick={() => setCollapsed(!collapsed)}
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            p: 0.8, borderRadius: '6px', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)',
            '&:hover': { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' },
            transition: 'all 0.15s',
          }}
        >
          {collapsed ? <ExpandIcon fontSize="small" /> : <CollapseIcon fontSize="small" />}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* Desktop sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: '#1a0533',
            border: 'none',
            transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
            overflow: 'hidden',
            boxShadow: '4px 0 24px rgba(0,0,0,0.3)',
          },
        }}
        open
      >
        {Sidebar}
      </Drawer>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_W, background: '#1a0533', border: 'none' },
        }}
      >
        {Sidebar}
      </Drawer>

      {/* Main content area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, transition: 'all 0.25s' }}>
        {/* Top App Bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border)',
            boxShadow: 'none',
            color: 'var(--text-primary)',
            zIndex: 1100,
          }}
        >
          <Toolbar sx={{ gap: 2, minHeight: '56px !important', px: { xs: 2, sm: 3 } }}>
            <IconButton
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { sm: 'none' }, color: 'var(--text-secondary)' }}
            >
              <DashboardIcon />
            </IconButton>

            <Typography sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600, fontSize: '16px', color: 'var(--text-primary)', mr: 'auto',
            }}>
              {currentPage}
            </Typography>

            {/* AI Query shortcut */}
            <Box sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center', gap: 1,
              background: 'var(--bg-surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              px: 1.5, py: 0.75,
              cursor: 'pointer',
              width: 220,
              transition: 'all 0.15s',
              '&:hover': { borderColor: 'var(--brand-purple)', background: 'var(--brand-purple-50)' },
            }}>
              <SearchIcon sx={{ fontSize: 14, color: 'var(--text-muted)' }} />
              <Typography sx={{ fontSize: '12px', color: 'var(--text-muted)', flex: 1 }}>
                Ask AI anything…
              </Typography>
              <Box sx={{
                fontSize: '10px', color: 'var(--text-muted)',
                border: '1px solid var(--border)', borderRadius: '4px', px: 0.5,
              }}>⌘K</Box>
            </Box>

            <Tooltip title="Notifications">
              <IconButton sx={{ color: 'var(--text-secondary)' }}>
                <Badge badgeContent={4} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '9px', minWidth: 14, height: 14 } }}>
                  <BellIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            <Avatar sx={{ width: 30, height: 30, fontSize: 12, bgcolor: '#7c3aed', cursor: 'pointer' }}>R</Avatar>
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box
          component="main"
          sx={{ flex: 1, p: { xs: 2, sm: 3 }, maxWidth: '100%', overflow: 'auto' }}
          className="fade-in"
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
