import { useState, useMemo } from 'react';
import { Box, Typography, Button, Chip, TextField, InputAdornment, MenuItem, Select, FormControl, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Search, FilterList, AutoAwesome, CloudDownload, SentimentSatisfied, SentimentDissatisfied, SentimentNeutral } from '@mui/icons-material';
import { FEEDBACK_ITEMS, SOURCES, type FeedbackItem } from '../data/mockData';

const SENTIMENT_CONFIG = {
  positive: { label: 'Positive', icon: <SentimentSatisfied sx={{ fontSize: 14 }} />, color: '#059669', bg: 'rgba(5,150,105,0.08)', badge: 'badge-positive' },
  negative: { label: 'Negative', icon: <SentimentDissatisfied sx={{ fontSize: 14 }} />, color: '#dc2626', bg: 'rgba(220,38,38,0.08)', badge: 'badge-negative' },
  neutral:  { label: 'Neutral',  icon: <SentimentNeutral sx={{ fontSize: 14 }} />,     color: '#6b7280', bg: 'rgba(107,114,128,0.08)', badge: 'badge-neutral' },
};

const CATEGORIES = ['All', 'Performance', 'Feature Requests', 'UI/UX', 'Billing', 'Onboarding', 'Data & Privacy', 'Reliability', 'Customer Support'];

function FeedbackRow({ item }: { item: FeedbackItem }) {
  const [expanded, setExpanded] = useState(false);
  const sc = SENTIMENT_CONFIG[item.sentiment];
  const timeAgo = (date: Date) => {
    const h = Math.round((Date.now() - date.getTime()) / 3600000);
    if (h < 1) return 'Just now';
    if (h < 24) return `${h}h ago`;
    return `${Math.round(h / 24)}d ago`;
  };

  return (
    <Box
      onClick={() => setExpanded(!expanded)}
      sx={{
        p: 2, borderBottom: '1px solid var(--border)',
        cursor: 'pointer', transition: 'background 0.15s',
        '&:hover': { background: 'var(--bg-surface-2)' },
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        {/* Source icon */}
        <Box sx={{
          width: 32, height: 32, borderRadius: '8px',
          background: 'var(--bg-surface-2)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, flexShrink: 0,
        }}>
          {item.sourceIcon}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Top row */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>{item.source}</Typography>
            <Box sx={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border-strong)' }} />
            <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.customer}</Typography>
            <Chip
              label={item.customerTier}
              size="small"
              sx={{
                height: 16, fontSize: 9, fontWeight: 700,
                background: item.customerTier === 'enterprise' ? 'rgba(124,58,237,0.1)' : item.customerTier === 'growth' ? 'rgba(37,99,235,0.08)' : 'rgba(107,114,128,0.08)',
                color: item.customerTier === 'enterprise' ? '#7c3aed' : item.customerTier === 'growth' ? '#2563eb' : '#6b7280',
              }}
            />
            <Typography sx={{ fontSize: 11, color: 'var(--text-muted)', ml: 'auto' }}>{timeAgo(item.timestamp)}</Typography>
          </Box>

          {/* Content */}
          <Typography sx={{
            fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5,
            display: expanded ? 'block' : '-webkit-box',
            WebkitLineClamp: expanded ? 'unset' : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {item.content}
          </Typography>

          {/* AI summary (when expanded) */}
          {expanded && (
            <Box sx={{ mt: 1, p: 1, background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '6px', display: 'flex', gap: 0.75, alignItems: 'flex-start' }}>
              <AutoAwesome sx={{ fontSize: 12, color: '#7c3aed', mt: 0.15, flexShrink: 0 }} />
              <Typography sx={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.aiSummary}</Typography>
            </Box>
          )}

          {/* Tags row */}
          <Box sx={{ display: 'flex', gap: 0.75, mt: 0.75, flexWrap: 'wrap', alignItems: 'center' }}>
            <Box className={`badge ${sc.badge}`} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {sc.icon} {sc.label}
            </Box>
            <Box className="badge badge-purple">{item.category}</Box>
            <Box className="badge badge-neutral">{item.subCategory}</Box>
            {item.volume > 50 && (
              <Box className="badge badge-orange">High volume · {item.volume}</Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function FeedbackIntelligence() {
  const [search, setSearch] = useState('');
  const [sentiment, setSentiment] = useState<string>('all');
  const [source, setSource] = useState('All');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return FEEDBACK_ITEMS.filter(item => {
      if (search && !item.content.toLowerCase().includes(search.toLowerCase()) && !item.customer.toLowerCase().includes(search.toLowerCase())) return false;
      if (sentiment !== 'all' && item.sentiment !== sentiment) return false;
      if (source !== 'All' && item.source !== source) return false;
      if (category !== 'All' && item.category !== category) return false;
      return true;
    });
  }, [search, sentiment, source, category]);

  const stats = useMemo(() => ({
    positive: filtered.filter(f => f.sentiment === 'positive').length,
    negative: filtered.filter(f => f.sentiment === 'negative').length,
    neutral: filtered.filter(f => f.sentiment === 'neutral').length,
  }), [filtered]);

  return (
    <Box className="fade-in">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography className="page-title">Feedback Intelligence</Typography>
          <Typography className="page-subtitle">Unified view of all customer feedback across {SOURCES.length}+ sources</Typography>
        </Box>
        <Button
          startIcon={<CloudDownload sx={{ fontSize: 14 }} />}
          variant="outlined"
          size="small"
          sx={{ textTransform: 'none', fontWeight: 600, fontSize: 12, borderRadius: '8px', borderColor: 'var(--border)', color: 'var(--text-secondary)', '&:hover': { borderColor: 'var(--brand-purple)', color: 'var(--brand-purple)' } }}
        >
          Export
        </Button>
      </Box>

      {/* Sentiment summary bar */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
        {(['positive', 'negative', 'neutral'] as const).map(s => {
          const sc = SENTIMENT_CONFIG[s];
          return (
            <Box key={s} sx={{
              flex: 1, minWidth: 120,
              background: sc.bg, border: `1px solid ${sc.color}30`,
              borderRadius: 'var(--radius-md)', px: 2, py: 1.5,
              cursor: 'pointer',
              outline: sentiment === s ? `2px solid ${sc.color}` : 'none',
              transition: 'all 0.15s',
            }} onClick={() => setSentiment(sentiment === s ? 'all' : s)}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5, color: sc.color }}>
                {sc.icon}
                <Typography sx={{ fontSize: 11, fontWeight: 600, color: sc.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{sc.label}</Typography>
              </Box>
              <Typography sx={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{stats[s]}</Typography>
            </Box>
          );
        })}
        <Box sx={{
          flex: 1, minWidth: 120,
          background: 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(37,99,235,0.06))',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: 'var(--radius-md)', px: 2, py: 1.5,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
            <AutoAwesome sx={{ fontSize: 14, color: '#7c3aed' }} />
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Processed</Typography>
          </Box>
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{filtered.filter(f => f.processed).length}</Typography>
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{
        background: 'var(--bg-surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', p: 2, mb: 2,
      }}>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search feedback…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 200, '& .MuiOutlinedInput-root': { fontSize: 13, borderRadius: '8px' } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 16, color: 'var(--text-muted)' }} /></InputAdornment> }}
          />
          <ToggleButtonGroup
            value={sentiment} exclusive
            onChange={(_, v) => v !== null && setSentiment(v)}
            size="small"
            sx={{ '& .MuiToggleButton-root': { textTransform: 'none', fontSize: 11, fontWeight: 600, px: 1.5, borderRadius: '8px !important', border: '1px solid var(--border)' } }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="positive">Positive</ToggleButton>
            <ToggleButton value="negative">Negative</ToggleButton>
            <ToggleButton value="neutral">Neutral</ToggleButton>
          </ToggleButtonGroup>
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <Select value={source} onChange={e => setSource(e.target.value)} sx={{ fontSize: 12, borderRadius: '8px' }}>
              <MenuItem value="All" sx={{ fontSize: 12 }}>All Sources</MenuItem>
              {SOURCES.map(s => <MenuItem key={s.name} value={s.name} sx={{ fontSize: 12 }}>{s.icon} {s.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select value={category} onChange={e => setCategory(e.target.value)} sx={{ fontSize: 12, borderRadius: '8px' }}>
              {CATEGORIES.map(c => <MenuItem key={c} value={c} sx={{ fontSize: 12 }}>{c}</MenuItem>)}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
            <FilterList sx={{ fontSize: 14, color: 'var(--text-muted)' }} />
            <Typography sx={{ fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} results</Typography>
          </Box>
        </Box>
      </Box>

      {/* Feedback list */}
      <Box sx={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {/* AI Analyze bar */}
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.25,
          background: 'linear-gradient(90deg, rgba(124,58,237,0.04), transparent)',
          borderBottom: '1px solid var(--border)',
        }}>
          <AutoAwesome sx={{ fontSize: 14, color: '#7c3aed' }} />
          <Typography sx={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1 }}>
            AI has analyzed <strong>{filtered.filter(f => f.processed).length}</strong> of {filtered.length} items
          </Typography>
          <Button size="small" sx={{ textTransform: 'none', fontSize: 11, fontWeight: 600, color: '#7c3aed', minWidth: 0 }}>
            Analyze All with AI
          </Button>
        </Box>

        {/* Items */}
        {filtered.length === 0 ? (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Typography sx={{ fontSize: 14, color: 'var(--text-muted)' }}>No feedback matches your filters</Typography>
          </Box>
        ) : (
          filtered.slice(0, 30).map(item => <FeedbackRow key={item.id} item={item} />)
        )}

        {filtered.length > 30 && (
          <Box sx={{ p: 2, textAlign: 'center', borderTop: '1px solid var(--border)' }}>
            <Button size="small" sx={{ textTransform: 'none', fontSize: 12, color: 'var(--brand-purple)' }}>
              Load more ({filtered.length - 30} remaining)
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
