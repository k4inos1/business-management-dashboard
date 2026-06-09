// src/data/mockData.ts
// =============================================
// InsightFlow AI — Realistic mock data layer
// Simulates Enterpret-style customer intelligence
// =============================================

export interface FeedbackItem {
  id: string;
  source: string;
  sourceIcon: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number; // -1 to 1
  category: string;
  subCategory: string;
  customer: string;
  customerTier: 'enterprise' | 'growth' | 'starter';
  timestamp: Date;
  processed: boolean;
  aiSummary: string;
  tags: string[];
  volume: number;
}

export interface KPIMetric {
  label: string;
  value: number | string;
  trend: number; // percentage change
  trendDirection: 'up' | 'down' | 'flat';
  sparkline: number[];
  color: 'purple' | 'blue' | 'green' | 'orange' | 'red';
  suffix?: string;
  prefix?: string;
}

export interface TaxonomyNode {
  id: string;
  name: string;
  level: number;
  feedbackCount: number;
  percentage: number;
  trend: number;
  children?: TaxonomyNode[];
  color: string;
}

export interface CustomerSegment {
  id: string;
  name: string;
  tier: 'enterprise' | 'growth' | 'starter';
  arr: number;
  feedbackCount: number;
  nps: number;
  churnRisk: 'low' | 'medium' | 'high';
  topIssue: string;
  since: Date;
  industry: string;
  logo: string;
}

export interface Integration {
  id: string;
  name: string;
  category: 'support' | 'crm' | 'survey' | 'social' | 'analytics' | 'product' | 'sales';
  status: 'connected' | 'available' | 'coming_soon';
  feedbackCount?: number;
  icon: string;
  description: string;
}

export interface DealInsight {
  id: string;
  dealName: string;
  company: string;
  value: number;
  outcome: 'won' | 'lost';
  reason: string;
  competitor?: string;
  themes: string[];
  date: Date;
}

export interface AIInsight {
  id: string;
  title: string;
  summary: string;
  type: 'trend' | 'alert' | 'opportunity' | 'churn_risk';
  urgency: 'high' | 'medium' | 'low';
  feedbackCount: number;
  affectedCustomers: number;
  category: string;
  recommendation: string;
  date: Date;
}

// =============================================
// HELPERS
// =============================================

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateSparkline = (base: number, length = 30): number[] => {
  const arr: number[] = [];
  let v = base;
  for (let i = 0; i < length; i++) {
    v = Math.max(0, v + (Math.random() - 0.45) * base * 0.12);
    arr.push(Math.round(v));
  }
  return arr;
};

const daysAgo = (n: number) => new Date(Date.now() - n * 86400000);
const hoursAgo = (n: number) => new Date(Date.now() - n * 3600000);

// =============================================
// FEEDBACK DATA
// =============================================

export const SOURCES = [
  { name: 'Zendesk', icon: '🎫' },
  { name: 'Intercom', icon: '💬' },
  { name: 'Slack', icon: '⚡' },
  { name: 'App Store', icon: '🍎' },
  { name: 'Google Play', icon: '🤖' },
  { name: 'G2', icon: '⭐' },
  { name: 'Salesforce', icon: '☁️' },
  { name: 'HubSpot', icon: '🧡' },
  { name: 'Gong', icon: '🔊' },
  { name: 'UserVoice', icon: '🗣️' },
  { name: 'Typeform', icon: '📋' },
  { name: 'Twitter/X', icon: '🐦' },
];

const CATEGORIES: Record<string, { subs: string[]; color: string }> = {
  'Performance': { subs: ['Load Time', 'API Latency', 'Crashes', 'Memory Usage'], color: '#dc2626' },
  'UI/UX': { subs: ['Navigation', 'Design', 'Accessibility', 'Mobile Experience'], color: '#7c3aed' },
  'Feature Requests': { subs: ['Integrations', 'Reporting', 'Automation', 'AI Features'], color: '#2563eb' },
  'Billing': { subs: ['Pricing', 'Invoices', 'Plan Limits', 'Refunds'], color: '#d97706' },
  'Onboarding': { subs: ['Setup', 'Documentation', 'Training', 'SSO'], color: '#059669' },
  'Data & Privacy': { subs: ['GDPR', 'Data Export', 'Permissions', 'Audit Log'], color: '#0891b2' },
  'Reliability': { subs: ['Downtime', 'Data Loss', 'Sync Issues', 'Backups'], color: '#e11d48' },
  'Customer Support': { subs: ['Response Time', 'Quality', 'SLA', 'Escalation'], color: '#7c3aed' },
};

const FEEDBACK_CONTENTS = [
  "The dashboard takes forever to load when we have more than 1000 records. Our team is losing patience.",
  "Love the new AI insights feature! It's saved us hours of manual analysis every week.",
  "We need better export options. CSV export is missing some key fields our compliance team requires.",
  "The API rate limiting is too aggressive for our use case. We're hitting limits daily.",
  "Onboarding was smooth but the documentation for advanced features is lacking.",
  "Billing support resolved our invoice discrepancy quickly. Great experience!",
  "The mobile app crashes every time we try to view custom reports.",
  "Would love to see Slack notifications when feedback spikes above a threshold.",
  "The taxonomy auto-classification is incredible. 90% accurate out of the box.",
  "SSO setup was confusing. Took our IT team 3 days to get SAML working.",
  "Please add bulk export for feedback items. Currently we can only export 100 at a time.",
  "The new trend alerts caught a bug before our customers noticed. Outstanding!",
  "Pricing feels steep for startups. Would love a usage-based tier.",
  "The Salesforce integration keeps breaking. We've had to reconnect 4 times this month.",
  "AI summaries are a game changer for our weekly reports. Cut prep time by 80%.",
];

const CUSTOMERS = [
  'Notion', 'Figma', 'Linear', 'Vercel', 'Stripe', 'Shopify', 'Atlassian',
  'Datadog', 'Segment', 'Amplitude', 'PostHog', 'Mixpanel', 'Brex', 'Ramp',
  'Rippling', 'Gusto', 'Lattice', 'Leapsome', 'Deel', 'Remote',
];

export const FEEDBACK_ITEMS: FeedbackItem[] = Array.from({ length: 80 }, (_, i) => {
  const source = SOURCES[i % SOURCES.length];
  const catKey = Object.keys(CATEGORIES)[i % Object.keys(CATEGORIES).length];
  const cat = CATEGORIES[catKey];
  const sentiments: Array<'positive' | 'negative' | 'neutral'> = ['positive', 'negative', 'neutral'];
  const sentiment = sentiments[i % 3];
  return {
    id: `fb-${1000 + i}`,
    source: source.name,
    sourceIcon: source.icon,
    content: FEEDBACK_CONTENTS[i % FEEDBACK_CONTENTS.length],
    sentiment,
    sentimentScore: sentiment === 'positive' ? 0.3 + Math.random() * 0.7 : sentiment === 'negative' ? -0.3 - Math.random() * 0.7 : (Math.random() - 0.5) * 0.4,
    category: catKey,
    subCategory: cat.subs[i % cat.subs.length],
    customer: CUSTOMERS[i % CUSTOMERS.length],
    customerTier: (['enterprise', 'growth', 'starter'] as const)[i % 3],
    timestamp: i < 10 ? hoursAgo(i * 2) : daysAgo(Math.floor(i / 4)),
    processed: i > 5,
    aiSummary: `AI: ${sentiment === 'positive' ? 'Positive signal' : sentiment === 'negative' ? 'Issue flagged' : 'Neutral feedback'} regarding ${catKey.toLowerCase()}.`,
    tags: [catKey, cat.subs[i % cat.subs.length]],
    volume: randomBetween(1, 150),
  };
});

// =============================================
// KPI METRICS
// =============================================

export const KPI_METRICS: KPIMetric[] = [
  {
    label: 'Total Feedback',
    value: '12,483',
    trend: 18.4,
    trendDirection: 'up',
    sparkline: generateSparkline(400, 30),
    color: 'purple',
    suffix: ' this month',
  },
  {
    label: 'NPS Score',
    value: 67,
    trend: 5.2,
    trendDirection: 'up',
    sparkline: generateSparkline(65, 30),
    color: 'green',
    prefix: '',
  },
  {
    label: 'CSAT Score',
    value: '4.6',
    trend: 2.1,
    trendDirection: 'up',
    sparkline: generateSparkline(4.5, 30),
    color: 'blue',
    suffix: '/5',
  },
  {
    label: 'Churn Alerts',
    value: 23,
    trend: -8.3,
    trendDirection: 'down',
    sparkline: generateSparkline(25, 30),
    color: 'orange',
  },
  {
    label: 'AI Insights',
    value: 147,
    trend: 32.0,
    trendDirection: 'up',
    sparkline: generateSparkline(110, 30),
    color: 'purple',
    suffix: ' generated',
  },
  {
    label: 'Churn Risk',
    value: '8.2%',
    trend: -1.4,
    trendDirection: 'down',
    sparkline: generateSparkline(9, 30),
    color: 'red',
  },
];

// =============================================
// TAXONOMY TREE
// =============================================

export const TAXONOMY_TREE: TaxonomyNode[] = [
  {
    id: 't1', name: 'Performance', level: 1, feedbackCount: 2341, percentage: 18.8, trend: 12, color: '#dc2626',
    children: [
      { id: 't1-1', name: 'Load Time', level: 2, feedbackCount: 892, percentage: 7.1, trend: 22, color: '#dc2626' },
      { id: 't1-2', name: 'API Latency', level: 2, feedbackCount: 654, percentage: 5.2, trend: 8, color: '#dc2626' },
      { id: 't1-3', name: 'Crashes', level: 2, feedbackCount: 795, percentage: 6.4, trend: 5, color: '#dc2626' },
    ]
  },
  {
    id: 't2', name: 'Feature Requests', level: 1, feedbackCount: 3102, percentage: 24.9, trend: 28, color: '#2563eb',
    children: [
      { id: 't2-1', name: 'Integrations', level: 2, feedbackCount: 1203, percentage: 9.6, trend: 35, color: '#2563eb' },
      { id: 't2-2', name: 'Reporting', level: 2, feedbackCount: 987, percentage: 7.9, trend: 21, color: '#2563eb' },
      { id: 't2-3', name: 'Automation', level: 2, feedbackCount: 912, percentage: 7.3, trend: 18, color: '#2563eb' },
    ]
  },
  {
    id: 't3', name: 'UI/UX', level: 1, feedbackCount: 1876, percentage: 15.0, trend: -4, color: '#7c3aed',
    children: [
      { id: 't3-1', name: 'Navigation', level: 2, feedbackCount: 734, percentage: 5.9, trend: -2, color: '#7c3aed' },
      { id: 't3-2', name: 'Mobile Experience', level: 2, feedbackCount: 642, percentage: 5.1, trend: 14, color: '#7c3aed' },
    ]
  },
  {
    id: 't4', name: 'Onboarding', level: 1, feedbackCount: 1234, percentage: 9.9, trend: 6, color: '#059669',
    children: [
      { id: 't4-1', name: 'Setup', level: 2, feedbackCount: 567, percentage: 4.5, trend: 11, color: '#059669' },
      { id: 't4-2', name: 'Documentation', level: 2, feedbackCount: 667, percentage: 5.3, trend: 3, color: '#059669' },
    ]
  },
  {
    id: 't5', name: 'Billing', level: 1, feedbackCount: 987, percentage: 7.9, trend: -2, color: '#d97706' },
  {
    id: 't6', name: 'Reliability', level: 1, feedbackCount: 1456, percentage: 11.7, trend: 9, color: '#e11d48' },
  {
    id: 't7', name: 'Customer Support', level: 1, feedbackCount: 1490, percentage: 11.9, trend: -6, color: '#0891b2' },
];

// =============================================
// CUSTOMER SEGMENTS
// =============================================

export const CUSTOMER_SEGMENTS: CustomerSegment[] = [
  { id: 'c1', name: 'Notion', tier: 'enterprise', arr: 480000, feedbackCount: 234, nps: 72, churnRisk: 'low',    topIssue: 'API Rate Limits', since: daysAgo(620), industry: 'Productivity', logo: '📓' },
  { id: 'c2', name: 'Figma',  tier: 'enterprise', arr: 360000, feedbackCount: 198, nps: 68, churnRisk: 'low',    topIssue: 'Export Features', since: daysAgo(540), industry: 'Design', logo: '🎨' },
  { id: 'c3', name: 'Linear', tier: 'growth',     arr: 96000,  feedbackCount: 87,  nps: 81, churnRisk: 'low',    topIssue: 'Slack Integration', since: daysAgo(310), industry: 'Dev Tools', logo: '⚡' },
  { id: 'c4', name: 'Vercel', tier: 'enterprise', arr: 240000, feedbackCount: 156, nps: 59, churnRisk: 'medium', topIssue: 'Billing Transparency', since: daysAgo(480), industry: 'Infrastructure', logo: '▲' },
  { id: 'c5', name: 'Brex',   tier: 'enterprise', arr: 180000, feedbackCount: 203, nps: 44, churnRisk: 'high',   topIssue: 'Dashboard Performance', since: daysAgo(380), industry: 'FinTech', logo: '💳' },
  { id: 'c6', name: 'Rippling',tier: 'growth',    arr: 72000,  feedbackCount: 64,  nps: 76, churnRisk: 'low',    topIssue: 'Mobile App', since: daysAgo(210), industry: 'HR Tech', logo: '🌊' },
  { id: 'c7', name: 'PostHog', tier: 'growth',    arr: 48000,  feedbackCount: 43,  nps: 88, churnRisk: 'low',    topIssue: 'Documentation', since: daysAgo(180), industry: 'Analytics', logo: '🦔' },
  { id: 'c8', name: 'Deel',    tier: 'enterprise', arr: 300000, feedbackCount: 178, nps: 51, churnRisk: 'medium', topIssue: 'SSO Setup', since: daysAgo(430), industry: 'HR Tech', logo: '🌍' },
];

// =============================================
// INTEGRATIONS
// =============================================

export const INTEGRATIONS: Integration[] = [
  // Support
  { id: 'i1',  name: 'Zendesk',     category: 'support',   status: 'connected',    feedbackCount: 3421, icon: '🎫', description: 'Support tickets & CSAT' },
  { id: 'i2',  name: 'Intercom',    category: 'support',   status: 'connected',    feedbackCount: 2187, icon: '💬', description: 'Live chat & messages' },
  { id: 'i3',  name: 'Freshdesk',   category: 'support',   status: 'available',    icon: '💚', description: 'Customer support platform' },
  { id: 'i4',  name: 'Kustomer',    category: 'support',   status: 'available',    icon: '🤝', description: 'Omni-channel support' },
  { id: 'i5',  name: 'Help Scout',  category: 'support',   status: 'available',    icon: '🔭', description: 'Shared inbox & docs' },
  // CRM
  { id: 'i6',  name: 'Salesforce',  category: 'crm',       status: 'connected',    feedbackCount: 1876, icon: '☁️', description: 'CRM & sales data' },
  { id: 'i7',  name: 'HubSpot',     category: 'crm',       status: 'connected',    feedbackCount: 943,  icon: '🧡', description: 'Marketing & sales CRM' },
  { id: 'i8',  name: 'Pipedrive',   category: 'crm',       status: 'available',    icon: '🔴', description: 'Sales pipeline management' },
  // Survey
  { id: 'i9',  name: 'Typeform',    category: 'survey',    status: 'connected',    feedbackCount: 756,  icon: '📋', description: 'Surveys & forms' },
  { id: 'i10', name: 'SurveyMonkey',category: 'survey',    status: 'available',    icon: '🐒', description: 'Survey platform' },
  { id: 'i11', name: 'Delighted',   category: 'survey',    status: 'available',    icon: '😊', description: 'NPS & CSAT surveys' },
  { id: 'i12', name: 'Qualtrics',   category: 'survey',    status: 'coming_soon',  icon: '📊', description: 'Enterprise surveys' },
  // Social
  { id: 'i13', name: 'Twitter/X',   category: 'social',    status: 'connected',    feedbackCount: 432,  icon: '🐦', description: 'Social mentions' },
  { id: 'i14', name: 'LinkedIn',    category: 'social',    status: 'available',    icon: '💼', description: 'Professional feedback' },
  { id: 'i15', name: 'G2',          category: 'social',    status: 'connected',    feedbackCount: 312,  icon: '⭐', description: 'Software reviews' },
  { id: 'i16', name: 'Capterra',    category: 'social',    status: 'available',    icon: '🏆', description: 'Software reviews' },
  // Analytics / Product
  { id: 'i17', name: 'Amplitude',   category: 'analytics', status: 'connected',    feedbackCount: 2043, icon: '📈', description: 'Product analytics' },
  { id: 'i18', name: 'Mixpanel',    category: 'analytics', status: 'available',    icon: '🎯', description: 'Event analytics' },
  { id: 'i19', name: 'PostHog',     category: 'product',   status: 'available',    icon: '🦔', description: 'Product analytics & FF' },
  { id: 'i20', name: 'FullStory',   category: 'analytics', status: 'coming_soon',  icon: '🎥', description: 'Session recording' },
  // Sales Intelligence
  { id: 'i21', name: 'Gong',        category: 'sales',     status: 'connected',    feedbackCount: 876,  icon: '🔊', description: 'Sales call intelligence' },
  { id: 'i22', name: 'Chorus',      category: 'sales',     status: 'available',    icon: '🎵', description: 'Revenue intelligence' },
  { id: 'i23', name: 'Clari',       category: 'sales',     status: 'coming_soon',  icon: '🔮', description: 'Revenue forecasting' },
  // App Stores
  { id: 'i24', name: 'App Store',   category: 'product',   status: 'connected',    feedbackCount: 567,  icon: '🍎', description: 'iOS app reviews' },
  { id: 'i25', name: 'Google Play', category: 'product',   status: 'connected',    feedbackCount: 489,  icon: '🤖', description: 'Android app reviews' },
  // Workflow
  { id: 'i26', name: 'Slack',       category: 'support',   status: 'connected',    feedbackCount: 1234, icon: '⚡', description: 'Team communication' },
  { id: 'i27', name: 'Jira',        category: 'product',   status: 'available',    icon: '🔵', description: 'Issue tracking' },
  { id: 'i28', name: 'Linear',      category: 'product',   status: 'available',    icon: '🟣', description: 'Issue & project tracking' },
];

// =============================================
// SALES INTELLIGENCE
// =============================================

export const DEAL_INSIGHTS: DealInsight[] = [
  { id: 'd1', dealName: 'Acme Corp — Enterprise',  company: 'Acme Corp',  value: 240000, outcome: 'won',  reason: 'Best AI taxonomy accuracy', competitor: 'Qualtrics',   themes: ['AI Features', 'Taxonomy', 'ROI'],            date: daysAgo(3) },
  { id: 'd2', dealName: 'TechStart — Growth',       company: 'TechStart',  value: 48000,  outcome: 'lost', reason: 'Pricing too high for stage', competitor: 'UserVoice',   themes: ['Pricing', 'Integrations'],                   date: daysAgo(5) },
  { id: 'd3', dealName: 'Globex — Enterprise',      company: 'Globex',     value: 360000, outcome: 'won',  reason: 'Superior integration library',competitor: 'Medallia',    themes: ['Integrations', 'Support', 'Speed'],          date: daysAgo(8) },
  { id: 'd4', dealName: 'NovaCo — Growth',          company: 'NovaCo',     value: 72000,  outcome: 'won',  reason: 'Excellent onboarding',       competitor: undefined,      themes: ['Onboarding', 'AI Insights', 'UI'],           date: daysAgo(11) },
  { id: 'd5', dealName: 'DataFlow — Enterprise',    company: 'DataFlow',   value: 180000, outcome: 'lost', reason: 'Missing data residency option',competitor: 'Enterpret',  themes: ['Security', 'Compliance', 'Pricing'],         date: daysAgo(14) },
  { id: 'd6', dealName: 'SkyLabs — Starter',        company: 'SkyLabs',    value: 12000,  outcome: 'won',  reason: 'Easy self-service setup',    competitor: undefined,      themes: ['Onboarding', 'Documentation'],               date: daysAgo(16) },
  { id: 'd7', dealName: 'MegaCorp — Enterprise',    company: 'MegaCorp',   value: 480000, outcome: 'lost', reason: 'Lost to incumbent vendor',    competitor: 'Salesforce',  themes: ['Integration', 'Pricing', 'Security'],        date: daysAgo(20) },
];

// =============================================
// AI INSIGHTS
// =============================================

export const AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ai1', title: '🚨 Load Time Spike — Enterprise Segment',
    summary: 'Dashboard load times increased 340% for enterprise accounts with >500 users over the last 48 hours. 23 customers affected.',
    type: 'alert', urgency: 'high', feedbackCount: 89, affectedCustomers: 23,
    category: 'Performance', recommendation: 'Escalate to engineering. Consider emergency caching layer.',
    date: hoursAgo(4),
  },
  {
    id: 'ai2', title: '📈 Integration Requests Trending +35%',
    summary: 'Slack and Linear integrations are the fastest-growing feature requests this month. Enterprise customers mention them 3x more than last quarter.',
    type: 'trend', urgency: 'medium', feedbackCount: 234, affectedCustomers: 67,
    category: 'Feature Requests', recommendation: 'Prioritize Slack bidirectional sync in next sprint.',
    date: hoursAgo(12),
  },
  {
    id: 'ai3', title: '💡 Onboarding Completion Opportunity',
    summary: 'New customers who complete the guided taxonomy setup have 4.2x higher retention at 90 days. 34% of new signups skip this step.',
    type: 'opportunity', urgency: 'medium', feedbackCount: 156, affectedCustomers: 34,
    category: 'Onboarding', recommendation: 'Make taxonomy wizard mandatory for first login.',
    date: daysAgo(1),
  },
  {
    id: 'ai4', title: '⚠️ Churn Signal — Brex Account',
    summary: 'Brex has submitted 14 negative feedback items in the last 7 days, including 3 mentions of evaluating competitors. Account NPS dropped from 61 to 44.',
    type: 'churn_risk', urgency: 'high', feedbackCount: 14, affectedCustomers: 1,
    category: 'Customer Support', recommendation: 'Assign CSM for executive business review immediately.',
    date: hoursAgo(6),
  },
  {
    id: 'ai5', title: '🎉 AI Taxonomy Accuracy at All-Time High',
    summary: 'Auto-classification accuracy reached 94.2% this week, up from 87% in Q1. Customer satisfaction with classification improved correspondingly.',
    type: 'trend', urgency: 'low', feedbackCount: 3421, affectedCustomers: 142,
    category: 'AI Features', recommendation: 'Share as a customer success story in next newsletter.',
    date: daysAgo(2),
  },
  {
    id: 'ai6', title: '📊 Mobile App NPS Trailing Desktop by 28pts',
    summary: 'Mobile users rate the experience significantly lower, citing navigation complexity and slow load times. 67% of mobile feedback is negative.',
    type: 'alert', urgency: 'medium', feedbackCount: 312, affectedCustomers: 89,
    category: 'UI/UX', recommendation: 'Dedicate 1 sprint to mobile performance and navigation redesign.',
    date: daysAgo(3),
  },
];

// =============================================
// TREND DATA (last 12 months)
// =============================================

export const MONTHLY_TREND = [
  { month: 'Jun', feedback: 6420, positive: 3210, negative: 1890, neutral: 1320 },
  { month: 'Jul', feedback: 7180, positive: 3820, negative: 1980, neutral: 1380 },
  { month: 'Aug', feedback: 7890, positive: 4120, negative: 2100, neutral: 1670 },
  { month: 'Sep', feedback: 8340, positive: 4450, negative: 2190, neutral: 1700 },
  { month: 'Oct', feedback: 8920, positive: 4780, negative: 2250, neutral: 1890 },
  { month: 'Nov', feedback: 9210, positive: 5010, negative: 2310, neutral: 1890 },
  { month: 'Dec', feedback: 9780, positive: 5340, negative: 2390, neutral: 2050 },
  { month: 'Jan', feedback: 10240, positive: 5680, negative: 2430, neutral: 2130 },
  { month: 'Feb', feedback: 10890, positive: 6120, negative: 2490, neutral: 2280 },
  { month: 'Mar', feedback: 11340, positive: 6450, negative: 2520, neutral: 2370 },
  { month: 'Apr', feedback: 11890, positive: 6890, negative: 2560, neutral: 2440 },
  { month: 'May', feedback: 12483, positive: 7210, negative: 2640, neutral: 2633 },
];

export const RECENT_ACTIVITY = [
  { id: 'a1', event: 'New feedback batch processed',       source: 'Zendesk',    count: 47,  time: hoursAgo(0.5), type: 'ingestion' },
  { id: 'a2', event: 'AI classified 234 items',           source: 'Intercom',   count: 234, time: hoursAgo(1),   type: 'classification' },
  { id: 'a3', event: 'Churn alert triggered',             source: 'Brex',       count: 1,   time: hoursAgo(2),   type: 'alert' },
  { id: 'a4', event: 'Weekly digest sent to 12 teams',    source: 'InsightFlow',count: 12,  time: hoursAgo(4),   type: 'report' },
  { id: 'a5', event: 'New integration connected',         source: 'Gong',       count: 0,   time: hoursAgo(6),   type: 'integration' },
  { id: 'a6', event: 'Taxonomy updated: 3 new nodes',     source: 'AI Engine',  count: 3,   time: hoursAgo(8),   type: 'taxonomy' },
];
