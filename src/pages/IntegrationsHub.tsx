import { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Search, CheckCircle, Add, Link } from '@mui/icons-material';
import { INTEGRATIONS, type Integration } from '../data/mockData';

const CATEGORY_LABELS: Record<string, string> = {
  support: '🎫 Support',
  crm: '☁️ CRM',
  survey: '📋 Survey',
  social: '🐦 Social',
  analytics: '📈 Analytics',
  product: '🔧 Product',
  sales: '💰 Sales',
};

function IntegrationTile({ integration }: { integration: Integration }) {
  const [connected, setConnected] = useState(integration.status === 'connected');
  const [connecting, setConnecting] = useState(false);

  const handleConnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (connected || integration.status === 'coming_soon') return;
    setConnecting(true);
    setTimeout(() => { setConnecting(false); setConnected(true); }, 1500);
  };

  const statusBg    = connected ? 'rgba(5,150,105,0.08)' : integration.status === 'coming_soon' ? 'rgba(217,119,6,0.08)' : 'rgba(107,114,128,0.06)';
  const statusBorder= connected ? 'rgba(5,150,105,0.25)' : integration.status === 'coming_soon' ? 'rgba(217,119,6,0.2)' : 'var(--border)';

  return (
    <Box sx={{
      background: 'var(--bg-surface)',
      border: `1.5px solid ${connected ? 'rgba(5,150,105,0.25)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-md)', p: 2,
      display: 'flex', flexDirection: 'column', gap: 1.5,
      transition: 'all 0.15s', cursor: 'pointer',
      position: 'relative',
      '&:hover': {
        borderColor: connected ? 'rgba(5,150,105,0.4)' : 'var(--brand-purple)',
        transform: 'translateY(-2px)',
        boxShadow: connected ? '0 4px 16px rgba(5,150,105,0.15)' : 'var(--shadow-purple)',
      },
    }}>
      {/* Status badge */}
      {connected && (
        <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
          <CheckCircle sx={{ fontSize: 14, color: '#059669' }} />
        </Box>
      )}

      {/* Icon */}
      <Box sx={{ fontSize: 28, lineHeight: 1 }}>{integration.icon}</Box>

      {/* Name & desc */}
      <Box>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', mb: 0.25 }}>{integration.name}</Typography>
        <Typography sx={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{integration.description}</Typography>
      </Box>

      {/* Stats & action */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
        {connected && integration.feedbackCount ? (
          <Typography sx={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>
            {integration.feedbackCount.toLocaleString()} items
          </Typography>
        ) : (
          <Box sx={{ height: 16 }} />
        )}
        <Button
          size="small"
          onClick={handleConnect}
          disabled={integration.status === 'coming_soon' || connecting}
          startIcon={connected ? <CheckCircle sx={{ fontSize: 11 }} /> : connecting ? null : <Add sx={{ fontSize: 11 }} />}
          sx={{
            textTransform: 'none', fontSize: 10, fontWeight: 700,
            borderRadius: '6px', px: 1, py: 0.4, minWidth: 0,
            color: connected ? '#059669' : integration.status === 'coming_soon' ? '#d97706' : '#7c3aed',
            background: statusBg,
            border: `1px solid ${statusBorder}`,
            '&:hover': { filter: 'brightness(0.95)' },
            '&.Mui-disabled': { opacity: 0.6 },
          }}
        >
          {connecting ? 'Connecting…' : connected ? 'Connected' : integration.status === 'coming_soon' ? 'Soon' : 'Connect'}
        </Button>
      </Box>
    </Box>
  );
}

export default function IntegrationsHub() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = INTEGRATIONS.filter(i => {
    if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'all' && i.category !== category) return false;
    return true;
  });

  const connected = INTEGRATIONS.filter(i => i.status === 'connected').length;
  const totalFeedback = INTEGRATIONS.filter(i => i.feedbackCount).reduce((s, i) => s + (i.feedbackCount || 0), 0);

  const categories = ['all', ...Array.from(new Set(INTEGRATIONS.map(i => i.category)))];

  return (
    <Box className="fade-in">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography className="page-title">Integrations Hub</Typography>
          <Typography className="page-subtitle">Connect your feedback sources — {INTEGRATIONS.length}+ integrations available</Typography>
        </Box>
        <Button startIcon={<Link sx={{ fontSize: 14 }} />} size="small" variant="outlined" sx={{ textTransform: 'none', fontWeight: 600, fontSize: 12, borderRadius: '8px', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
          Request Integration
        </Button>
      </Box>

      {/* Summary */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
        {[
          { label: 'Connected', value: connected, color: '#059669', bg: 'rgba(5,150,105,0.06)', border: 'rgba(5,150,105,0.2)' },
          { label: 'Available', value: INTEGRATIONS.filter(i => i.status === 'available').length, color: '#7c3aed', bg: 'rgba(124,58,237,0.06)', border: 'rgba(124,58,237,0.2)' },
          { label: 'Coming Soon', value: INTEGRATIONS.filter(i => i.status === 'coming_soon').length, color: '#d97706', bg: 'rgba(217,119,6,0.06)', border: 'rgba(217,119,6,0.2)' },
          { label: 'Total Feedback Collected', value: totalFeedback.toLocaleString(), color: '#2563eb', bg: 'rgba(37,99,235,0.06)', border: 'rgba(37,99,235,0.2)' },
        ].map(s => (
          <Box key={s.label} sx={{ flex: 1, minWidth: 100, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 'var(--radius-md)', p: 1.75 }}>
            <Typography sx={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.5 }}>{s.label}</Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</Typography>
          </Box>
        ))}
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          placeholder="Search integrations…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
          sx={{ width: 200, '& .MuiOutlinedInput-root': { fontSize: 12, borderRadius: '8px' } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 14, color: 'var(--text-muted)' }} /></InputAdornment> }}
        />
        <ToggleButtonGroup value={category} exclusive onChange={(_, v) => v && setCategory(v)} size="small" sx={{ flexWrap: 'wrap', gap: 0.5, '& .MuiToggleButtonGroup-root': { flexWrap: 'wrap' }, '& .MuiToggleButton-root': { textTransform: 'none', fontSize: 11, fontWeight: 600, px: 1.25, border: '1px solid var(--border)', borderRadius: '8px !important' } }}>
          {categories.map(c => (
            <ToggleButton key={c} value={c}>
              {c === 'all' ? '⚡ All' : CATEGORY_LABELS[c] || c}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: 12, color: 'var(--text-muted)', ml: 'auto' }}>{filtered.length} integrations</Typography>
      </Box>

      {/* Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 1.5 }}>
        {filtered.map(integration => (
          <IntegrationTile key={integration.id} integration={integration} />
        ))}
      </Box>
    </Box>
  );
}
