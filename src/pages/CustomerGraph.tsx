import { useState } from 'react';
import { Box, Typography, Button, LinearProgress, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Warning, CheckCircle, ArrowForward, Hub } from '@mui/icons-material';
import { CUSTOMER_SEGMENTS, type CustomerSegment } from '../data/mockData';

const RISK_CONFIG = {
  low: { color: '#059669', bg: 'rgba(5,150,105,0.08)', border: 'rgba(5,150,105,0.2)', label: '✓ Low Risk', icon: <CheckCircle sx={{ fontSize: 13 }} /> },
  medium: { color: '#d97706', bg: 'rgba(217,119,6,0.08)', border: 'rgba(217,119,6,0.2)', label: '⚠ Medium', icon: <Warning sx={{ fontSize: 13 }} /> },
  high: { color: '#dc2626', bg: 'rgba(220,38,38,0.08)', border: 'rgba(220,38,38,0.2)', label: '🔴 High Risk', icon: <Warning sx={{ fontSize: 13 }} /> },
};

const TIER_CONFIG = {
  enterprise: { color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
  growth: { color: '#2563eb', bg: 'rgba(37,99,235,0.08)' },
  starter: { color: '#6b7280', bg: 'rgba(107,114,128,0.08)' },
};

function CustomerCard({ customer }: { customer: CustomerSegment }) {
  const rc = RISK_CONFIG[customer.churnRisk];
  const tc = TIER_CONFIG[customer.tier];
  const monthsActive = Math.round((Date.now() - customer.since.getTime()) / (86400000 * 30));

  return (
    <Box sx={{
      background: 'var(--bg-surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', p: 2.5,
      transition: 'all 0.15s',
      cursor: 'pointer',
      '&:hover': { transform: 'translateY(-2px)', boxShadow: 'var(--shadow-md)', borderColor: rc.color + '40' },
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
        <Box sx={{ width: 40, height: 40, borderRadius: '10px', background: tc.bg, border: `1px solid ${tc.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
          {customer.logo}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{customer.name}</Typography>
            <Box className="badge" sx={{ background: rc.bg, color: rc.color, display: 'flex', alignItems: 'center', gap: 0.5, fontSize: 10, fontWeight: 700 }}>
              {rc.icon}{rc.label}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: 0.5, alignItems: 'center' }}>
            <Box className="badge" sx={{ background: tc.bg, color: tc.color, fontSize: 10 }}>{customer.tier}</Box>
            <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>{customer.industry}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Metrics grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 2 }}>
        {[
          { label: 'ARR', value: `$${(customer.arr / 1000).toFixed(0)}k` },
          { label: 'NPS', value: customer.nps },
          { label: 'Feedback', value: customer.feedbackCount },
          { label: 'Tenure', value: `${monthsActive}mo` },
        ].map(m => (
          <Box key={m.label} sx={{ background: 'var(--bg-surface-2)', borderRadius: '8px', p: 1.25 }}>
            <Typography sx={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.25 }}>{m.label}</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{m.value}</Typography>
          </Box>
        ))}
      </Box>

      {/* NPS bar */}
      <Box sx={{ mb: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography sx={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>NPS Score</Typography>
          <Typography sx={{ fontSize: 10, color: customer.nps >= 70 ? '#059669' : customer.nps >= 50 ? '#d97706' : '#dc2626', fontWeight: 700 }}>
            {customer.nps >= 70 ? 'Promoter' : customer.nps >= 50 ? 'Passive' : 'Detractor'}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={Math.max(0, (customer.nps + 100) / 2)}
          sx={{ height: 4, borderRadius: 2, bgcolor: 'var(--border)', '& .MuiLinearProgress-bar': { background: customer.nps >= 70 ? '#059669' : customer.nps >= 50 ? '#d97706' : '#dc2626', borderRadius: 2 } }}
        />
      </Box>

      {/* Top issue */}
      <Box sx={{ p: 1.25, background: customer.churnRisk === 'high' ? 'rgba(220,38,38,0.04)' : 'var(--bg-surface-2)', border: `1px solid ${customer.churnRisk === 'high' ? 'rgba(220,38,38,0.15)' : 'var(--border)'}`, borderRadius: '8px', mb: 1.5 }}>
        <Typography sx={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, mb: 0.25, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Top Issue</Typography>
        <Typography sx={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 }}>{customer.topIssue}</Typography>
      </Box>

      <Button size="small" fullWidth variant="outlined" endIcon={<ArrowForward sx={{ fontSize: 12 }} />} sx={{ textTransform: 'none', fontSize: 12, fontWeight: 600, borderRadius: '8px', borderColor: 'var(--border)', color: 'var(--text-secondary)', '&:hover': { borderColor: rc.color, color: rc.color } }}>
        View Customer Timeline
      </Button>
    </Box>
  );
}

export default function CustomerGraph() {
  const [tierFilter, setTierFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const filtered = CUSTOMER_SEGMENTS.filter(c => {
    if (tierFilter !== 'all' && c.tier !== tierFilter) return false;
    if (riskFilter !== 'all' && c.churnRisk !== riskFilter) return false;
    return true;
  });

  const highRisk = CUSTOMER_SEGMENTS.filter(c => c.churnRisk === 'high').length;
  const totalARR = CUSTOMER_SEGMENTS.reduce((s, c) => s + c.arr, 0);

  return (
    <Box className="fade-in">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography className="page-title">Customer Context Graph</Typography>
          <Typography className="page-subtitle">Connect feedback signals to customer accounts, tiers, and health scores</Typography>
        </Box>
        <Button startIcon={<Hub sx={{ fontSize: 14 }} />} size="small" variant="outlined" sx={{ textTransform: 'none', fontWeight: 600, fontSize: 12, borderRadius: '8px', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
          Graph View
        </Button>
      </Box>

      {/* Summary KPIs */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Accounts', value: CUSTOMER_SEGMENTS.length, color: '#7c3aed', suffix: '' },
          { label: 'Total ARR', value: `$${(totalARR / 1000000).toFixed(1)}M`, color: '#059669', suffix: '' },
          { label: 'Avg NPS', value: Math.round(CUSTOMER_SEGMENTS.reduce((s, c) => s + c.nps, 0) / CUSTOMER_SEGMENTS.length), color: '#2563eb', suffix: '' },
          { label: 'High Risk', value: highRisk, color: '#dc2626', suffix: ' accounts' },
        ].map(s => (
          <Box key={s.label} sx={{ flex: 1, minWidth: 130, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', p: 2, position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color }} />
            <Typography sx={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.5 }}>{s.label}</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}{s.suffix}</Typography>
          </Box>
        ))}
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>Tier:</Typography>
        <ToggleButtonGroup value={tierFilter} exclusive onChange={(_, v) => v && setTierFilter(v)} size="small" sx={{ '& .MuiToggleButton-root': { textTransform: 'none', fontSize: 11, fontWeight: 600, px: 1.5, border: '1px solid var(--border)', borderRadius: '8px !important' } }}>
          {['all', 'enterprise', 'growth', 'starter'].map(t => <ToggleButton key={t} value={t}>{t}</ToggleButton>)}
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, ml: 1 }}>Risk:</Typography>
        <ToggleButtonGroup value={riskFilter} exclusive onChange={(_, v) => v && setRiskFilter(v)} size="small" sx={{ '& .MuiToggleButton-root': { textTransform: 'none', fontSize: 11, fontWeight: 600, px: 1.5, border: '1px solid var(--border)', borderRadius: '8px !important' } }}>
          {['all', 'high', 'medium', 'low'].map(r => <ToggleButton key={r} value={r}>{r}</ToggleButton>)}
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: 12, color: 'var(--text-muted)', ml: 'auto' }}>{filtered.length} accounts</Typography>
      </Box>

      {/* Customer cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 2 }}>
        {filtered.map(customer => <CustomerCard key={customer.id} customer={customer} />)}
      </Box>
    </Box>
  );
}
