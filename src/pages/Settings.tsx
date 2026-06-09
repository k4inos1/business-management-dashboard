import { Box, Typography, Button, Switch } from '@mui/material';

const SETTING_SECTIONS = [
  {
    title: 'Workspace',
    settings: [
      { label: 'Workspace Name', type: 'input', value: 'InsightFlow AI — Ricardo' },
      { label: 'Timezone', type: 'select', value: 'UTC-4 (Eastern Time)' },
    ],
  },
  {
    title: 'AI & Intelligence',
    settings: [
      { label: 'Auto-classify new feedback', type: 'toggle', value: true },
      { label: 'Weekly AI digest emails', type: 'toggle', value: true },
      { label: 'Churn risk alerts', type: 'toggle', value: true },
      { label: 'Real-time processing', type: 'toggle', value: false },
    ],
  },
  {
    title: 'Notifications',
    settings: [
      { label: 'Slack notifications', type: 'toggle', value: true },
      { label: 'Email summaries', type: 'toggle', value: true },
      { label: 'High-urgency alerts', type: 'toggle', value: true },
    ],
  },
  {
    title: 'Data & Privacy',
    settings: [
      { label: 'Data retention (days)', type: 'input', value: '365' },
      { label: 'Anonymize PII in exports', type: 'toggle', value: true },
      { label: 'GDPR mode', type: 'toggle', value: false },
    ],
  },
];

export default function Settings() {
  return (
    <Box className="fade-in">
      <Box sx={{ mb: 3 }}>
        <Typography className="page-title">Settings</Typography>
        <Typography className="page-subtitle">Manage your workspace, AI preferences, and integrations</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 700 }}>
        {SETTING_SECTIONS.map(section => (
          <Box key={section.title} sx={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Box sx={{ px: 2.5, py: 1.75, borderBottom: '1px solid var(--border)', background: 'var(--bg-surface-2)' }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{section.title}</Typography>
            </Box>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {section.settings.map((s, i) => (
                <Box key={s.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: i < section.settings.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <Typography sx={{ fontSize: 13, color: 'var(--text-primary)' }}>{s.label}</Typography>
                  {s.type === 'toggle' ? (
                    <Switch defaultChecked={s.value as boolean} size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#7c3aed' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#7c3aed' } }} />
                  ) : (
                    <Typography sx={{ fontSize: 12, color: 'var(--text-secondary)', background: 'var(--bg-surface-2)', border: '1px solid var(--border)', borderRadius: '6px', px: 1.5, py: 0.5, cursor: 'pointer' }}>
                      {s.value as string}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" size="small" sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
            Cancel
          </Button>
          <Button variant="contained" size="small" sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', boxShadow: 'none' }}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
