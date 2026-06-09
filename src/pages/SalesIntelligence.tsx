import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { EmojiEvents, Cancel } from '@mui/icons-material';
import { DEAL_INSIGHTS, type DealInsight } from '../data/mockData';

function DealCard({ deal }: { deal: DealInsight }) {
  const won = deal.outcome === 'won';
  const daysAgo = Math.round((Date.now() - deal.date.getTime()) / 86400000);

  return (
    <Box sx={{
      background: 'var(--bg-surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', p: 2.5,
      borderLeft: `4px solid ${won ? '#059669' : '#dc2626'}`,
      transition: 'all 0.15s',
      '&:hover': { transform: 'translateX(2px)', boxShadow: 'var(--shadow-md)' },
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            {won
              ? <EmojiEvents sx={{ fontSize: 16, color: '#059669' }} />
              : <Cancel sx={{ fontSize: 16, color: '#dc2626' }} />}
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{deal.dealName}</Typography>
          </Box>
          <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>{daysAgo}d ago</Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: won ? '#059669' : '#dc2626' }}>
            ${(deal.value / 1000).toFixed(0)}k
          </Typography>
          <Box className={`badge ${won ? 'badge-positive' : 'badge-negative'}`}>
            {won ? '✓ Won' : '✗ Lost'}
          </Box>
        </Box>
      </Box>

      {/* Reason */}
      <Box sx={{ mb: 1.5, p: 1.25, background: won ? 'rgba(5,150,105,0.04)' : 'rgba(220,38,38,0.04)', border: `1px solid ${won ? 'rgba(5,150,105,0.15)' : 'rgba(220,38,38,0.15)'}`, borderRadius: '8px' }}>
        <Typography sx={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, mb: 0.25, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {won ? 'Win Reason' : 'Loss Reason'}
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{deal.reason}</Typography>
      </Box>

      {/* Competitor */}
      {deal.competitor && (
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>vs.</Typography>
          <Box className="badge badge-neutral">{deal.competitor}</Box>
        </Box>
      )}

      {/* Themes */}
      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
        {deal.themes.map(theme => (
          <Box key={theme} className="badge badge-purple">{theme}</Box>
        ))}
      </Box>
    </Box>
  );
}

export default function SalesIntelligence() {
  const [filter, setFilter] = useState<'all' | 'won' | 'lost'>('all');

  const filtered = DEAL_INSIGHTS.filter(d => filter === 'all' || d.outcome === filter);
  const won = DEAL_INSIGHTS.filter(d => d.outcome === 'won');
  const lost = DEAL_INSIGHTS.filter(d => d.outcome === 'lost');
  const winRate = Math.round((won.length / DEAL_INSIGHTS.length) * 100);
  const totalWonARR = won.reduce((s, d) => s + d.value, 0);
  const totalLostARR = lost.reduce((s, d) => s + d.value, 0);

  // Top win/loss themes
  const allThemes = DEAL_INSIGHTS.flatMap(d => d.themes.map(t => ({ theme: t, outcome: d.outcome })));
  const themeMap: Record<string, { won: number; lost: number }> = {};
  allThemes.forEach(({ theme, outcome }) => {
    if (!themeMap[theme]) themeMap[theme] = { won: 0, lost: 0 };
    themeMap[theme][outcome as 'won' | 'lost']++;
  });
  const topThemes = Object.entries(themeMap).sort((a, b) => (b[1].won + b[1].lost) - (a[1].won + a[1].lost)).slice(0, 6);

  // Competitors
  const competitors: Record<string, { won: number; lost: number }> = {};
  DEAL_INSIGHTS.filter(d => d.competitor).forEach(d => {
    if (!competitors[d.competitor!]) competitors[d.competitor!] = { won: 0, lost: 0 };
    competitors[d.competitor!][d.outcome]++;
  });

  return (
    <Box className="fade-in">
      <Box sx={{ mb: 3 }}>
        <Typography className="page-title">Sales Intelligence</Typography>
        <Typography className="page-subtitle">Understand every deal to win more — powered by call recordings and CRM signals</Typography>
      </Box>

      {/* KPI row */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
        {[
          { label: 'Win Rate', value: `${winRate}%`, sub: `${won.length} of ${DEAL_INSIGHTS.length} deals`, color: '#059669', bg: 'rgba(5,150,105,0.06)', border: 'rgba(5,150,105,0.2)' },
          { label: 'Won ARR', value: `$${(totalWonARR / 1000).toFixed(0)}k`, sub: `${won.length} deals closed`, color: '#2563eb', bg: 'rgba(37,99,235,0.06)', border: 'rgba(37,99,235,0.2)' },
          { label: 'Lost ARR', value: `$${(totalLostARR / 1000).toFixed(0)}k`, sub: `${lost.length} deals lost`, color: '#dc2626', bg: 'rgba(220,38,38,0.06)', border: 'rgba(220,38,38,0.2)' },
          { label: 'Avg Deal Size', value: `$${Math.round(DEAL_INSIGHTS.reduce((s, d) => s + d.value, 0) / DEAL_INSIGHTS.length / 1000)}k`, sub: 'across all deals', color: '#7c3aed', bg: 'rgba(124,58,237,0.06)', border: 'rgba(124,58,237,0.2)' },
        ].map(s => (
          <Box key={s.label} sx={{ flex: 1, minWidth: 130, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 'var(--radius-lg)', p: 2 }}>
            <Typography sx={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.5 }}>{s.label}</Typography>
            <Typography sx={{ fontSize: 24, fontWeight: 700, color: s.color, mb: 0.25 }}>{s.value}</Typography>
            <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.sub}</Typography>
          </Box>
        ))}
      </Box>

      {/* Win rate visual */}
      <Box sx={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', p: 2.5, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography className="section-title">Win Rate</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ fontSize: 12, color: '#059669', fontWeight: 600 }}>Won: {winRate}%</Typography>
            <Typography sx={{ fontSize: 12, color: '#dc2626', fontWeight: 600 }}>Lost: {100 - winRate}%</Typography>
          </Box>
        </Box>
        <Box sx={{ height: 12, borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
          <Box sx={{ width: `${winRate}%`, background: 'linear-gradient(90deg, #059669, #34d399)', transition: 'width 0.8s' }} />
          <Box sx={{ flex: 1, background: 'linear-gradient(90deg, #dc2626, #f87171)' }} />
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2, mb: 3 }}>
        {/* Deal themes */}
        <Box sx={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', p: 2.5 }}>
          <Typography className="section-title" sx={{ mb: 1.5 }}>Deal Themes Analysis</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {topThemes.map(([theme, counts]) => {
              const total = counts.won + counts.lost;
              const wonPct = Math.round((counts.won / total) * 100);
              return (
                <Box key={theme}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{theme}</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Typography sx={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>+{counts.won}</Typography>
                      <Typography sx={{ fontSize: 11, color: '#dc2626', fontWeight: 600 }}>-{counts.lost}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ height: 6, background: 'var(--bg-surface-2)', borderRadius: '3px', overflow: 'hidden', display: 'flex' }}>
                    <Box sx={{ width: `${wonPct}%`, background: '#059669', borderRadius: '3px', transition: 'width 0.6s' }} />
                    <Box sx={{ flex: 1, background: '#dc2626', opacity: 0.6 }} />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Competitive */}
        <Box sx={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', p: 2.5 }}>
          <Typography className="section-title" sx={{ mb: 1.5 }}>Competitive Landscape</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {Object.entries(competitors).map(([comp, counts]) => (
              <Box key={comp} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', flex: 1 }}>{comp}</Typography>
                <Box className="badge badge-positive">{counts.won}W</Box>
                <Box className="badge badge-negative">{counts.lost}L</Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Deals filter */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography className="section-title">Recent Deals</Typography>
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {(['all', 'won', 'lost'] as const).map(f => (
            <Box key={f} onClick={() => setFilter(f)} className={`badge ${filter === f ? 'badge-purple' : 'badge-neutral'}`} sx={{ cursor: 'pointer', px: 1.5, py: 0.5 }}>
              {f}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Deal cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {filtered.map(deal => <DealCard key={deal.id} deal={deal} />)}
      </Box>
    </Box>
  );
}
