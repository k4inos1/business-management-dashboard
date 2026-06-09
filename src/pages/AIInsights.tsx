import { useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { AutoAwesome, TrendingUp, Warning, Lightbulb, Timeline, ArrowForward } from '@mui/icons-material';
import { AI_INSIGHTS, type AIInsight } from '../data/mockData';

const TYPE_CONFIG = {
  trend: { icon: <TrendingUp sx={{ fontSize: 16 }} />, color: '#2563eb', bg: 'rgba(37,99,235,0.06)', border: 'rgba(37,99,235,0.2)', label: 'Trend' },
  alert: { icon: <Warning sx={{ fontSize: 16 }} />, color: '#dc2626', bg: 'rgba(220,38,38,0.06)', border: 'rgba(220,38,38,0.2)', label: 'Alert' },
  opportunity: { icon: <Lightbulb sx={{ fontSize: 16 }} />, color: '#059669', bg: 'rgba(5,150,105,0.06)', border: 'rgba(5,150,105,0.2)', label: 'Opportunity' },
  churn_risk: { icon: <Warning sx={{ fontSize: 16 }} />, color: '#d97706', bg: 'rgba(217,119,6,0.06)', border: 'rgba(217,119,6,0.2)', label: 'Churn Risk' },
};

const URGENCY_BADGE = {
  high: 'badge-negative',
  medium: 'badge-orange',
  low: 'badge-neutral',
};

const EXAMPLE_QUESTIONS = [
  'What are the top 3 reasons customers are churning?',
  'Which features are enterprise customers requesting most?',
  'How has NPS changed for Brex over the last 90 days?',
  'What is the sentiment trend for mobile app feedback?',
  'Which integrations have the most negative feedback?',
  'What common themes appear in 5-star reviews?',
  'Show me churn risk customers in the enterprise segment',
  'What did customers say about the new dashboard launch?',
];

interface QueryResult {
  query: string;
  answer: string;
  sources: number;
  customers: number;
  timestamp: Date;
}

function InsightCard({ insight }: { insight: AIInsight }) {
  const [expanded, setExpanded] = useState(false);
  const tc = TYPE_CONFIG[insight.type];
  const timeAgo = (date: Date) => {
    const h = Math.round((Date.now() - date.getTime()) / 3600000);
    if (h < 1) return 'Just now';
    if (h < 24) return `${h}h ago`;
    return `${Math.round(h / 24)}d ago`;
  };

  return (
    <Box sx={{
      background: tc.bg, border: `1px solid ${tc.border}`,
      borderRadius: 'var(--radius-lg)', p: 2.5,
      transition: 'all 0.15s',
      '&:hover': { transform: 'translateY(-2px)', boxShadow: 'var(--shadow-md)' },
    }}>
      <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
        <Box sx={{ color: tc.color, mt: 0.15, flexShrink: 0 }}>{tc.icon}</Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', flexWrap: 'wrap', mb: 0.5 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', flex: 1, minWidth: 200 }}>
              {insight.title}
            </Typography>
            <Box className={`badge ${URGENCY_BADGE[insight.urgency]}`}>{insight.urgency} urgency</Box>
          </Box>
          <Typography sx={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, display: expanded ? 'block' : '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: expanded ? 'visible' : 'hidden' }}>
            {insight.summary}
          </Typography>
        </Box>
      </Box>

      {/* Recommendation */}
      {expanded && (
        <Box sx={{ mb: 1.5, p: 1.5, background: 'rgba(255,255,255,0.6)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.5)' }}>
          <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'flex-start' }}>
            <AutoAwesome sx={{ fontSize: 13, color: '#7c3aed', mt: 0.2, flexShrink: 0 }} />
            <Box>
              <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.25 }}>AI Recommendation</Typography>
              <Typography sx={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.5 }}>{insight.recommendation}</Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Footer */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>{insight.feedbackCount} feedback items</Typography>
        <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>·</Typography>
        <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>{insight.affectedCustomers} customers</Typography>
        <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>·</Typography>
        <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>{timeAgo(insight.date)}</Typography>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 0.75 }}>
          <Button size="small" onClick={() => setExpanded(!expanded)} sx={{ textTransform: 'none', fontSize: 11, color: tc.color, minWidth: 0 }}>
            {expanded ? 'Less' : 'Details'}
          </Button>
          <Button size="small" variant="contained" sx={{ textTransform: 'none', fontSize: 11, fontWeight: 600, borderRadius: '6px', background: tc.color, '&:hover': { background: tc.color, filter: 'brightness(0.9)' }, boxShadow: 'none', px: 1.5 }} endIcon={<ArrowForward sx={{ fontSize: 12 }} />}>
            Take Action
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default function AIInsights() {
  const [query, setQuery] = useState('');
  const [queryResults, setQueryResults] = useState<QueryResult[]>([]);
  const [thinking, setThinking] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const handleQuery = (q: string) => {
    const text = q || query;
    if (!text.trim()) return;
    setQuery(text);
    setThinking(true);

    setTimeout(() => {
      setThinking(false);
      const answers = [
        `Based on analysis of 12,483 feedback items across all sources, the top pattern related to **"${text}"** involves 3 key themes: (1) Performance bottlenecks reported by 23% of enterprise accounts, (2) Missing automation capabilities cited by 31% of growth customers, and (3) Onboarding friction for new team members. These patterns emerged 2.4× more frequently in the last 30 days vs. the prior period.`,
        `Your query about **"${text}"** surfaces interesting signals. Enterprise customers (>500 seats) mention this 4.1× more than SMB accounts. The most affected segments are Brex, Deel, and Vercel — all showing NPS drops correlated with this theme. Root cause analysis points to a specific API endpoint introduced in the v3.2 release.`,
      ];
      setQueryResults(prev => [{
        query: text,
        answer: answers[Math.floor(Math.random() * answers.length)],
        sources: Math.floor(Math.random() * 8) + 3,
        customers: Math.floor(Math.random() * 50) + 10,
        timestamp: new Date(),
      }, ...prev].slice(0, 5));
      setQuery('');
    }, 2000);
  };

  const filtered = filter === 'all' ? AI_INSIGHTS : AI_INSIGHTS.filter(i => i.type === filter || i.urgency === filter);

  return (
    <Box className="fade-in">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography className="page-title">AI Insights</Typography>
          <Typography className="page-subtitle">Wisdom AI analyzes your feedback in real-time to surface what matters most</Typography>
        </Box>
        <Chip icon={<AutoAwesome sx={{ fontSize: 13 }} />} label="147 insights this month" size="small" sx={{ background: 'rgba(124,58,237,0.1)', color: '#7c3aed', fontWeight: 600, fontSize: 11 }} />
      </Box>

      {/* Main AI Query Interface */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0f0720 0%, #1a0533 60%, #0c1a3a 100%)',
        borderRadius: 'var(--radius-xl)', p: 3, mb: 3,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glow orbs */}
        {[{l:'-5%',t:'-20%',c:'rgba(124,58,237,0.25)'},{r:'-5%',t:'10%',c:'rgba(37,99,235,0.2)'},{l:'40%',b:'-30%',c:'rgba(167,139,250,0.15)'}].map((orb, i) => (
          <Box key={i} sx={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: orb.c, filter: 'blur(60px)', ...orb, pointerEvents: 'none' }} />
        ))}

        <Box sx={{ position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: 'linear-gradient(135deg, #7c3aed, #60a5fa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AutoAwesome sx={{ fontSize: 14, color: 'white' }} />
            </Box>
            <Typography sx={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16, color: 'white' }}>Wisdom AI</Typography>
            <Box sx={{ fontSize: '10px', color: '#34d399', background: 'rgba(5,150,105,0.2)', border: '1px solid rgba(52,211,153,0.3)', px: 1, py: 0.25, borderRadius: '20px', fontWeight: 700 }}>LIVE</Box>
          </Box>

          <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', mb: 2, lineHeight: 1.6 }}>
            Ask any question about your customer feedback. Wisdom AI analyzes patterns across all sources.
          </Typography>

          {/* Query input */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Box sx={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 1,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '12px', px: 2, py: 1.25,
              '&:focus-within': { borderColor: 'rgba(167,139,250,0.5)', background: 'rgba(167,139,250,0.08)' },
              transition: 'all 0.15s',
            }}>
              <Timeline sx={{ fontSize: 16, color: 'rgba(255,255,255,0.3)' }} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleQuery(query)}
                placeholder="Ask anything about your customer feedback…"
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: 'white', fontFamily: 'Inter, sans-serif' }}
              />
            </Box>
            <Button
              onClick={() => handleQuery(query)}
              disabled={thinking}
              variant="contained"
              sx={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', borderRadius: '12px', textTransform: 'none', fontWeight: 700, fontSize: 13, px: 3, boxShadow: '0 4px 16px rgba(124,58,237,0.4)', flexShrink: 0, '&:hover': { background: 'linear-gradient(135deg, #6d28d9, #1d4ed8)' } }}
            >
              {thinking ? '⏳' : 'Ask →'}
            </Button>
          </Box>

          {/* Example questions */}
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
            {EXAMPLE_QUESTIONS.slice(0, 4).map(q => (
              <Box key={q} onClick={() => handleQuery(q)} sx={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', px: 1.25, py: 0.4, cursor: 'pointer', transition: 'all 0.15s', '&:hover': { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.2)' } }}>
                {q}
              </Box>
            ))}
          </Box>

          {/* Query results */}
          {(thinking || queryResults.length > 0) && (
            <Box sx={{ mt: 2.5, borderTop: '1px solid rgba(255,255,255,0.08)', pt: 2.5 }}>
              {thinking && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {[0,1,2].map(i => (
                      <Box key={i} sx={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', animation: `blink 1.2s ${i * 0.2}s infinite` }} />
                    ))}
                  </Box>
                  <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Wisdom AI is analyzing 12,483 feedback items…</Typography>
                </Box>
              )}
              {queryResults.map((r, i) => (
                <Box key={i} sx={{ mb: i < queryResults.length - 1 ? 2 : 0 }}>
                  <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', mb: 0.75, fontStyle: 'italic' }}>Q: {r.query}</Typography>
                  <Box sx={{ p: 1.5, background: 'rgba(255,255,255,0.06)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6 }}>{r.answer}</Typography>
                    <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', mt: 1 }}>
                      Analyzed {r.sources} sources · {r.customers} customer accounts
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Filter chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2.5, flexWrap: 'wrap' }}>
        {['all', 'trend', 'alert', 'opportunity', 'churn_risk', 'high'].map(f => (
          <Box key={f} onClick={() => setFilter(f)} className={`badge ${filter === f ? 'badge-purple' : 'badge-neutral'}`} sx={{ cursor: 'pointer', px: 1.5, py: 0.5, transition: 'all 0.15s' }}>
            {f === 'all' ? 'All Insights' : f.replace('_', ' ')}
          </Box>
        ))}
      </Box>

      {/* Insight cards grid */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filtered.map(insight => <InsightCard key={insight.id} insight={insight} />)}
      </Box>
    </Box>
  );
}
