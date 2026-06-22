import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, Chip } from '@mui/material';
import {
  TrendingUp, TrendingDown, ArrowForward, AutoAwesome,
  CheckCircleOutlined, Warning, InfoOutlined,
} from '@mui/icons-material';
import {
  KPI_METRICS, MONTHLY_TREND, RECENT_ACTIVITY, AI_INSIGHTS,
  TAXONOMY_TREE, type KPIMetric,
} from '../data/mockData';

// =============================================
// KPI CARD
// =============================================
function KPICard({ metric, delay = 0 }: { metric: KPIMetric; delay?: number }) {
  const [displayed, setDisplayed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDisplayed(true), delay); return () => clearTimeout(t); }, [delay]);

  const isUp = metric.trendDirection === 'up';
  const isDown = metric.trendDirection === 'down';

  // Mini SVG sparkline
  const sp = metric.sparkline;
  const min = Math.min(...sp), max = Math.max(...sp);
  const range = max - min || 1;
  const W = 80, H = 28;
  const pts = sp.map((v, i) => {
    const x = (i / (sp.length - 1)) * W;
    const y = H - ((v - min) / range) * H;
    return `${x},${y}`;
  }).join(' ');

  const lineColor = metric.color === 'purple' ? '#7c3aed'
    : metric.color === 'blue' ? '#2563eb'
    : metric.color === 'green' ? '#059669'
    : metric.color === 'orange' ? '#d97706'
    : '#dc2626';

  return (
    <Box
      className={`kpi-card ${metric.color}`}
      sx={{ opacity: displayed ? 1 : 0, transition: `opacity 0.4s ${delay}ms, transform 0.4s ${delay}ms`, transform: displayed ? 'none' : 'translateY(8px)' }}
    >
      <Typography className="kpi-label">{metric.label}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 1 }}>
        <Typography className="kpi-value">
          {metric.prefix}{metric.value}{metric.suffix}
        </Typography>
        <svg width={W} height={H} style={{ flexShrink: 0 }}>
          <polyline
            points={pts}
            fill="none"
            stroke={lineColor}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.7}
          />
        </svg>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
        <Box className={`kpi-trend ${metric.trendDirection}`}>
          {isUp ? <TrendingUp sx={{ fontSize: 12 }} /> : isDown ? <TrendingDown sx={{ fontSize: 12 }} /> : null}
          {Math.abs(metric.trend)}%
        </Box>
        <Typography sx={{ fontSize: '11px', color: 'var(--text-muted)' }}>vs last month</Typography>
      </Box>
    </Box>
  );
}

// =============================================
// TREND CHART (bar chart)
// =============================================
function TrendChart() {
  const data = MONTHLY_TREND.slice(-6);
  const maxVal = Math.max(...data.map(d => d.feedback));

  return (
    <Box className="chart-wrap">
      <Box className="section-header">
        <Typography className="section-title">Feedback Volume Trend</Typography>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#7c3aed' }} />
            <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>Positive</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#dc2626' }} />
            <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>Negative</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#e8e0f2' }} />
            <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>Neutral</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 120 }}>
        {data.map((d) => {
          const posH  = (d.positive / maxVal) * 110;
          const negH  = (d.negative / maxVal) * 110;
          const neuH  = (d.neutral / maxVal) * 110;
          return (
            <Box key={d.month} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.25, height: 110 }}>
                <Box sx={{ width: 10, height: posH, background: 'linear-gradient(180deg, #7c3aed, #a78bfa)', borderRadius: '3px 3px 0 0', transition: 'height 0.6s' }} />
                <Box sx={{ width: 10, height: negH, background: 'linear-gradient(180deg, #dc2626, #f87171)', borderRadius: '3px 3px 0 0', transition: 'height 0.6s' }} />
                <Box sx={{ width: 10, height: neuH, background: 'var(--border)', borderRadius: '3px 3px 0 0', transition: 'height 0.6s' }} />
              </Box>
              <Typography sx={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>{d.month}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// =============================================
// AI QUERY BAR
// =============================================
const EXAMPLE_QUERIES = [
  'What are the top complaints from enterprise customers?',
  'Why is churn risk increasing for Brex?',
  'Which integrations are most requested this month?',
  'Show me NPS trends by customer tier',
];

function AIQueryBar() {
  const [query, setQuery] = useState('');
  const [thinking, setThinking] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleAsk = () => {
    if (!query.trim()) return;
    setThinking(true);
    setAnswer('');
    setTimeout(() => {
      setThinking(false);
      setAnswer(`🤖 Based on 12,483 feedback items analyzed: The most common theme in your query is **${query.split(' ').slice(-2).join(' ')}**, appearing in 23.4% of recent feedback. Enterprise customers mention it 3.2× more than growth accounts. Top affected: Brex, Deel, Vercel.`);
    }, 1800);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{
        background: 'linear-gradient(135deg, #1a0533 0%, #2d1055 100%)',
        borderRadius: 'var(--radius-lg)',
        p: 2.5,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow */}
        <Box sx={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(124,58,237,0.2)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <AutoAwesome sx={{ fontSize: 16, color: '#a78bfa' }} />
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'white' }}>Wisdom AI</Typography>
          <Chip label="Live" size="small" sx={{ height: 16, fontSize: 9, fontWeight: 700, background: 'rgba(5,150,105,0.3)', color: '#34d399', ml: 0.5 }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 1,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '10px', px: 1.5, py: 1,
            '&:focus-within': { borderColor: '#a78bfa', background: 'rgba(167,139,250,0.1)' },
            transition: 'all 0.15s',
          }}>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAsk()}
              placeholder="Ask anything about your customer feedback…"
              style={{
                flex: 1, border: 'none', outline: 'none',
                background: 'transparent', fontSize: 13, color: 'white',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </Box>
          <Button
            onClick={handleAsk}
            variant="contained"
            disabled={thinking}
            sx={{
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              borderRadius: '10px', textTransform: 'none', fontWeight: 600,
              fontSize: 12, px: 2, boxShadow: 'none', flexShrink: 0,
              '&:hover': { background: 'linear-gradient(135deg, #6d28d9, #1d4ed8)', boxShadow: '0 4px 12px rgba(124,58,237,0.4)' },
            }}
          >
            {thinking ? '⏳ Thinking…' : 'Ask AI'}
          </Button>
        </Box>
        {/* Example queries */}
        {!answer && !thinking && (
          <Box sx={{ display: 'flex', gap: 0.75, mt: 1.5, flexWrap: 'wrap' }}>
            {EXAMPLE_QUERIES.map(q => (
              <Box key={q}
                onClick={() => setQuery(q)}
                sx={{
                  fontSize: 10, color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px',
                  px: 1, py: 0.25, cursor: 'pointer',
                  '&:hover': { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.8)' },
                  transition: 'all 0.15s',
                }}>
                {q}
              </Box>
            ))}
          </Box>
        )}
        {answer && (
          <Box sx={{ mt: 1.5, p: 1.5, background: 'rgba(255,255,255,0.06)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{answer}</Typography>
          </Box>
        )}
        {thinking && (
          <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex', gap: 0.4 }}>
              {[0,1,2].map(i => (
                <Box key={i} sx={{ width: 5, height: 5, borderRadius: '50%', background: '#a78bfa', animation: `blink 1.2s ${i * 0.2}s infinite` }} />
              ))}
            </Box>
            <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Analyzing 12,483 feedback items…</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// =============================================
// TOP CATEGORIES
// =============================================
function TopCategories() {
  const sorted = [...TAXONOMY_TREE].sort((a, b) => b.feedbackCount - a.feedbackCount).slice(0, 5);
  const max = sorted[0].feedbackCount;

  return (
    <Box className="chart-wrap" sx={{ height: '100%' }}>
      <Box className="section-header">
        <Typography className="section-title">Top Feedback Categories</Typography>
        <a href="/taxonomy" className="section-action" style={{ textDecoration: 'none' }}>View all →</a>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {sorted.map((cat) => (
          <Box key={cat.id}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{cat.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>{cat.feedbackCount.toLocaleString()}</Typography>
                <Typography sx={{ fontSize: 10, fontWeight: 600, color: cat.trend > 0 ? '#059669' : '#dc2626' }}>
                  {cat.trend > 0 ? '+' : ''}{cat.trend}%
                </Typography>
              </Box>
            </Box>
            <Box sx={{ height: 6, background: 'var(--bg-surface-2)', borderRadius: '3px', overflow: 'hidden' }}>
              <Box sx={{
                height: '100%', borderRadius: '3px',
                width: `${(cat.feedbackCount / max) * 100}%`,
                background: cat.color,
                transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
                opacity: 0.85,
              }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// =============================================
// ACTIVITY FEED
// =============================================
function ActivityFeed() {
  const icons: Record<string, React.ReactNode> = {
    ingestion: <InfoOutlined sx={{ fontSize: 14, color: '#2563eb' }} />,
    classification: <AutoAwesome sx={{ fontSize: 14, color: '#7c3aed' }} />,
    alert: <Warning sx={{ fontSize: 14, color: '#dc2626' }} />,
    report: <CheckCircleOutlined sx={{ fontSize: 14, color: '#059669' }} />,
    integration: <CheckCircleOutlined sx={{ fontSize: 14, color: '#059669' }} />,
    taxonomy: <AutoAwesome sx={{ fontSize: 14, color: '#7c3aed' }} />,
  };

  const timeAgo = (date: Date) => {
    const mins = Math.round((Date.now() - date.getTime()) / 60000);
    if (mins < 60) return `${mins}m ago`;
    return `${Math.round(mins / 60)}h ago`;
  };

  return (
    <Box className="chart-wrap" sx={{ height: '100%' }}>
      <Box className="section-header">
        <Typography className="section-title">Live Activity</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box className="dot-green" />
          <Typography sx={{ fontSize: 10, color: 'var(--text-muted)' }}>Live</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {RECENT_ACTIVITY.map((item, i) => (
          <Box key={item.id} sx={{
            display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1.25,
            borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <Box sx={{ mt: 0.25, flexShrink: 0 }}>{icons[item.type]}</Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                {item.event}
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {item.source}{item.count > 0 ? ` · ${item.count} items` : ''}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 10, color: 'var(--text-muted)', flexShrink: 0, mt: 0.25 }}>
              {timeAgo(item.time)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// =============================================
// AI ALERT STRIP
// =============================================
function AlertStrip() {
  const highAlerts = AI_INSIGHTS.filter(i => i.urgency === 'high').slice(0, 2);
  return (
    <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
      {highAlerts.map(alert => (
        <Box key={alert.id} sx={{
          flex: 1, minWidth: 260,
          display: 'flex', alignItems: 'center', gap: 1.5,
          background: alert.type === 'churn_risk' ? 'rgba(220,38,38,0.05)' : 'rgba(217,119,6,0.05)',
          border: `1px solid ${alert.type === 'churn_risk' ? 'rgba(220,38,38,0.2)' : 'rgba(217,119,6,0.2)'}`,
          borderRadius: 'var(--radius-md)', px: 2, py: 1.25,
        }}>
          <Warning sx={{ fontSize: 16, color: alert.type === 'churn_risk' ? '#dc2626' : '#d97706', flexShrink: 0 }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{alert.title}</Typography>
            <Typography sx={{ fontSize: 11, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {alert.recommendation}
            </Typography>
          </Box>
          <Button size="small" sx={{ fontSize: 11, textTransform: 'none', fontWeight: 600, color: 'var(--brand-purple)', flexShrink: 0, minWidth: 0 }} endIcon={<ArrowForward sx={{ fontSize: 12 }} />}>
            Act
          </Button>
        </Box>
      ))}
    </Box>
  );
}

// =============================================
// MAIN DASHBOARD
// =============================================
export default function DashboardHome() {
  return (
    <Box className="fade-in">
      {/* Page Header */}
      <Box className="page-header">
        <Typography className="page-title">
          Good evening, Ricardo 👋
        </Typography>
        <Typography className="page-subtitle">
          Here's what's happening with your customer intelligence today.
        </Typography>
      </Box>

      {/* Alert Strip */}
      <AlertStrip />

      {/* AI Query */}
      <AIQueryBar />

      {/* KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {KPI_METRICS.map((metric, i) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={metric.label}>
            <KPICard metric={metric} delay={i * 80} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TrendChart />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TopCategories />
        </Grid>
      </Grid>

      {/* Bottom Row */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ActivityFeed />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* Quick AI Insights */}
          <Box className="chart-wrap" sx={{ height: '100%' }}>
            <Box className="section-header">
              <Typography className="section-title">AI Insights Highlights</Typography>
              <a href="/insights" className="section-action" style={{ textDecoration: 'none' }}>See all →</a>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {AI_INSIGHTS.slice(0, 4).map(insight => (
                <Box key={insight.id} sx={{
                  p: 1.5, borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface-2)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  '&:hover': { borderColor: 'var(--brand-purple)', background: 'var(--brand-purple-50)' },
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', flex: 1, pr: 1 }}>
                      {insight.title}
                    </Typography>
                    <Box className={`badge badge-${insight.urgency === 'high' ? 'negative' : insight.urgency === 'medium' ? 'orange' : 'neutral'}`}>
                      {insight.urgency}
                    </Box>
                  </Box>
                  <Typography sx={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {insight.summary}
                  </Typography>
                  <Typography sx={{ fontSize: 10, color: 'var(--text-muted)', mt: 0.75 }}>
                    {insight.feedbackCount} feedback items · {insight.affectedCustomers} customers
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
