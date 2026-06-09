import { useState } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { AutoAwesome, ExpandMore, ChevronRight, Add } from '@mui/icons-material';
import { TAXONOMY_TREE, type TaxonomyNode } from '../data/mockData';

function TaxNodeRow({ node, depth = 0 }: { node: TaxonomyNode; depth?: number }) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;
  const maxCount = 3102;

  return (
    <Box>
      <Box
        onClick={() => hasChildren && setOpen(!open)}
        sx={{
          display: 'flex', alignItems: 'center',
          pl: depth === 0 ? 1.5 : `${depth * 24 + 12}px`,
          pr: 2, py: 1.25,
          cursor: hasChildren ? 'pointer' : 'default',
          borderRadius: 'var(--radius-sm)',
          transition: 'background 0.12s',
          '&:hover': { background: 'var(--bg-surface-2)' },
          mx: 0.5,
        }}
      >
        {/* Expand icon */}
        <Box sx={{ width: 20, flexShrink: 0, display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
          {hasChildren ? (open ? <ExpandMore sx={{ fontSize: 16 }} /> : <ChevronRight sx={{ fontSize: 16 }} />) : null}
        </Box>

        {/* Color dot */}
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: node.color, flexShrink: 0, mr: 1.25 }} />

        {/* Name */}
        <Typography sx={{ flex: 1, fontSize: depth === 0 ? 13 : 12, fontWeight: depth === 0 ? 600 : 400, color: 'var(--text-primary)' }}>
          {node.name}
        </Typography>

        {/* Progress bar (only top level) */}
        {depth === 0 && (
          <Box sx={{ width: 80, mr: 2, display: { xs: 'none', md: 'block' } }}>
            <LinearProgress
              variant="determinate"
              value={(node.feedbackCount / maxCount) * 100}
              sx={{ height: 4, borderRadius: 2, bgcolor: 'var(--border)', '& .MuiLinearProgress-bar': { background: node.color, borderRadius: 2 } }}
            />
          </Box>
        )}

        {/* Count */}
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', mr: 1.5, minWidth: 50, textAlign: 'right' }}>
          {node.feedbackCount.toLocaleString()}
        </Typography>

        {/* Percentage */}
        <Typography sx={{ fontSize: 11, color: 'var(--text-muted)', mr: 1.5, minWidth: 40, textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
          {node.percentage}%
        </Typography>

        {/* Trend */}
        <Box className={`badge ${node.trend > 0 ? 'badge-positive' : node.trend < 0 ? 'badge-negative' : 'badge-neutral'}`} sx={{ minWidth: 48, justifyContent: 'center' }}>
          {node.trend > 0 ? '+' : ''}{node.trend}%
        </Box>
      </Box>

      {/* Children */}
      {hasChildren && open && (
        <Box>
          {node.children!.map(child => (
            <TaxNodeRow key={child.id} node={child} depth={depth + 1} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default function TaxonomyManager() {
  const [classifying, setClassifying] = useState(false);
  const [done, setDone] = useState(false);

  const handleClassify = () => {
    setClassifying(true);
    setTimeout(() => { setClassifying(false); setDone(true); }, 2500);
  };

  const totalFeedback = TAXONOMY_TREE.reduce((s, n) => s + n.feedbackCount, 0);

  return (
    <Box className="fade-in">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography className="page-title">Adaptive Taxonomy</Typography>
          <Typography className="page-subtitle">AI-powered 5-level classification tree — automatically learns from your feedback</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<Add sx={{ fontSize: 14 }} />}
            size="small"
            variant="outlined"
            sx={{ textTransform: 'none', fontWeight: 600, fontSize: 12, borderRadius: '8px', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            Add Category
          </Button>
          <Button
            startIcon={<AutoAwesome sx={{ fontSize: 14 }} />}
            size="small"
            variant="contained"
            onClick={handleClassify}
            disabled={classifying}
            sx={{ textTransform: 'none', fontWeight: 600, fontSize: 12, borderRadius: '8px', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', boxShadow: 'none' }}
          >
            {classifying ? 'Classifying…' : done ? '✓ Done' : 'Auto-Classify with AI'}
          </Button>
        </Box>
      </Box>

      {/* Stats row */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Categories', value: TAXONOMY_TREE.length + TAXONOMY_TREE.flatMap(n => n.children || []).length, color: '#7c3aed', suffix: '' },
          { label: 'Classified Items', value: totalFeedback.toLocaleString(), color: '#059669', suffix: '' },
          { label: 'AI Accuracy', value: '94.2', color: '#2563eb', suffix: '%' },
          { label: 'Unclassified', value: 312, color: '#d97706', suffix: '' },
        ].map(s => (
          <Box key={s.label} sx={{ flex: 1, minWidth: 120, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', p: 2 }}>
            <Typography sx={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.5 }}>{s.label}</Typography>
            <Typography sx={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}{s.suffix}</Typography>
          </Box>
        ))}
      </Box>

      {/* AI classify progress */}
      {classifying && (
        <Box sx={{ mb: 2, p: 2, background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 'var(--radius-md)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <AutoAwesome sx={{ fontSize: 14, color: '#7c3aed' }} />
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#7c3aed' }}>Wisdom AI is classifying untagged feedback…</Typography>
          </Box>
          <LinearProgress sx={{ height: 4, borderRadius: 2, bgcolor: 'rgba(124,58,237,0.1)', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #7c3aed, #60a5fa)', borderRadius: 2 } }} />
        </Box>
      )}
      {done && (
        <Box sx={{ mb: 2, p: 2, background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 12, color: '#059669' }}>✓ AI classified 312 items with 94.2% confidence. Review in Feedback Intelligence.</Typography>
        </Box>
      )}

      {/* Legend / column headers */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, mb: 0.5, borderRadius: 'var(--radius-sm)' }}>
        <Box sx={{ width: 20 }} />
        <Box sx={{ width: 10, mr: 1.25 }} />
        <Typography sx={{ flex: 1, fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Category</Typography>
        <Box sx={{ width: 80, mr: 2, display: { xs: 'none', md: 'block' } }}>
          <Typography sx={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Volume</Typography>
        </Box>
        <Typography sx={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', mr: 1.5, minWidth: 50, textAlign: 'right' }}>Count</Typography>
        <Typography sx={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', mr: 1.5, minWidth: 40, textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>Share</Typography>
        <Typography sx={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: 48, textAlign: 'center' }}>Trend</Typography>
      </Box>

      {/* Taxonomy tree */}
      <Box sx={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', py: 1 }}>
        {TAXONOMY_TREE.map(node => (
          <TaxNodeRow key={node.id} node={node} depth={0} />
        ))}
      </Box>

      {/* Donut-style summary */}
      <Box sx={{ mt: 2, p: 2.5, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
        <Typography className="section-title" sx={{ mb: 1.5 }}>Category Distribution</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {TAXONOMY_TREE.map(node => (
            <Box key={node.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: node.color }} />
              <Typography sx={{ fontSize: 11, color: 'var(--text-secondary)' }}>{node.name}</Typography>
              <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)' }}>{node.percentage}%</Typography>
            </Box>
          ))}
        </Box>
        {/* Visual bar */}
        <Box sx={{ mt: 1.5, height: 10, borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
          {TAXONOMY_TREE.map(node => (
            <Box key={node.id} sx={{ height: '100%', width: `${node.percentage}%`, background: node.color, transition: 'width 0.6s' }} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
