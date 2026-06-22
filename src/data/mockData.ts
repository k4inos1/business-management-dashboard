// src/data/mockData.ts
// =============================================
// InsightFlow AI — Cleaned mock data layer
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
// STATIC DATA & METADATA
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

// =============================================
// CLEANED/EMPTY DATA LAYERS
// =============================================

export const FEEDBACK_ITEMS: FeedbackItem[] = [];

export const TAXONOMY_TREE: TaxonomyNode[] = [];

export const CUSTOMER_SEGMENTS: CustomerSegment[] = [];

export const DEAL_INSIGHTS: DealInsight[] = [];

export const AI_INSIGHTS: AIInsight[] = [];

export const RECENT_ACTIVITY: any[] = [];

export const MONTHLY_TREND = [
  { month: 'Jun', feedback: 0, positive: 0, negative: 0, neutral: 0 },
  { month: 'Jul', feedback: 0, positive: 0, negative: 0, neutral: 0 },
  { month: 'Aug', feedback: 0, positive: 0, negative: 0, neutral: 0 },
  { month: 'Sep', feedback: 0, positive: 0, negative: 0, neutral: 0 },
  { month: 'Oct', feedback: 0, positive: 0, negative: 0, neutral: 0 },
  { month: 'Nov', feedback: 0, positive: 0, negative: 0, neutral: 0 },
  { month: 'Dec', feedback: 0, positive: 0, negative: 0, neutral: 0 },
  { month: 'Jan', feedback: 0, positive: 0, negative: 0, neutral: 0 },
  { month: 'Feb', feedback: 0, positive: 0, negative: 0, neutral: 0 },
  { month: 'Mar', feedback: 0, positive: 0, negative: 0, neutral: 0 },
  { month: 'Apr', feedback: 0, positive: 0, negative: 0, neutral: 0 },
  { month: 'May', feedback: 0, positive: 0, negative: 0, neutral: 0 },
];

export const KPI_METRICS: KPIMetric[] = [
  {
    label: 'Total Feedback',
    value: 0,
    trend: 0,
    trendDirection: 'flat',
    sparkline: Array.from({ length: 30 }, () => 0),
    color: 'purple',
    suffix: ' this month',
  },
  {
    label: 'NPS Score',
    value: 0,
    trend: 0,
    trendDirection: 'flat',
    sparkline: Array.from({ length: 30 }, () => 0),
    color: 'green',
    prefix: '',
  },
  {
    label: 'CSAT Score',
    value: 0,
    trend: 0,
    trendDirection: 'flat',
    sparkline: Array.from({ length: 30 }, () => 0),
    color: 'blue',
    suffix: '/5',
  },
  {
    label: 'Churn Alerts',
    value: 0,
    trend: 0,
    trendDirection: 'flat',
    sparkline: Array.from({ length: 30 }, () => 0),
    color: 'orange',
  },
  {
    label: 'AI Insights',
    value: 0,
    trend: 0,
    trendDirection: 'flat',
    sparkline: Array.from({ length: 30 }, () => 0),
    color: 'purple',
    suffix: ' generated',
  },
  {
    label: 'Churn Risk',
    value: '0%',
    trend: 0,
    trendDirection: 'flat',
    sparkline: Array.from({ length: 30 }, () => 0),
    color: 'red',
  },
];

export const INTEGRATIONS: Integration[] = [
  { id: 'i1',  name: 'Zendesk',     category: 'support',   status: 'available',    icon: '🎫', description: 'Support tickets & CSAT' },
  { id: 'i2',  name: 'Intercom',    category: 'support',   status: 'available',    icon: '💬', description: 'Live chat & messages' },
  { id: 'i3',  name: 'Freshdesk',   category: 'support',   status: 'available',    icon: '💚', description: 'Customer support platform' },
  { id: 'i4',  name: 'Kustomer',    category: 'support',   status: 'available',    icon: '🤝', description: 'Omni-channel support' },
  { id: 'i5',  name: 'Help Scout',  category: 'support',   status: 'available',    icon: '🔭', description: 'Shared inbox & docs' },
  { id: 'i6',  name: 'Salesforce',  category: 'crm',       status: 'available',    icon: '☁️', description: 'CRM & sales data' },
  { id: 'i7',  name: 'HubSpot',     category: 'crm',       status: 'available',    icon: '🧡', description: 'Marketing & sales CRM' },
  { id: 'i8',  name: 'Pipedrive',   category: 'crm',       status: 'available',    icon: '🔴', description: 'Sales pipeline management' },
  { id: 'i9',  name: 'Typeform',    category: 'survey',    status: 'available',    icon: '📋', description: 'Surveys & forms' },
  { id: 'i10', name: 'SurveyMonkey',category: 'survey',    status: 'available',    icon: '🐒', description: 'Survey platform' },
  { id: 'i11', name: 'Delighted',   category: 'survey',    status: 'available',    icon: '😊', description: 'NPS & CSAT surveys' },
  { id: 'i12', name: 'Qualtrics',   category: 'survey',    status: 'coming_soon',  icon: '📊', description: 'Enterprise surveys' },
  { id: 'i13', name: 'Twitter/X',   category: 'social',    status: 'available',    icon: '🐦', description: 'Social mentions' },
  { id: 'i14', name: 'LinkedIn',    category: 'social',    status: 'available',    icon: '💼', description: 'Professional feedback' },
  { id: 'i15', name: 'G2',          category: 'social',    status: 'available',    icon: '⭐', description: 'Software reviews' },
  { id: 'i16', name: 'Capterra',    category: 'social',    status: 'available',    icon: '🏆', description: 'Software reviews' },
  { id: 'i17', name: 'Amplitude',   category: 'analytics', status: 'available',    icon: '📈', description: 'Product analytics' },
  { id: 'i18', name: 'Mixpanel',    category: 'analytics', status: 'available',    icon: '🎯', description: 'Event analytics' },
  { id: 'i19', name: 'PostHog',     category: 'product',   status: 'available',    icon: '🦔', description: 'Product analytics & FF' },
  { id: 'i20', name: 'FullStory',   category: 'analytics', status: 'coming_soon',  icon: '🎥', description: 'Session recording' },
  { id: 'i21', name: 'Gong',        category: 'sales',     status: 'available',    icon: '🔊', description: 'Sales call intelligence' },
  { id: 'i22', name: 'Chorus',      category: 'sales',     status: 'available',    icon: '🎵', description: 'Revenue intelligence' },
  { id: 'i23', name: 'Clari',       category: 'sales',     status: 'coming_soon',  icon: '🔮', description: 'Revenue forecasting' },
  { id: 'i24', name: 'App Store',   category: 'product',   status: 'available',    icon: '🍎', description: 'iOS app reviews' },
  { id: 'i25', name: 'Google Play', category: 'product',   status: 'available',    icon: '🤖', description: 'Android app reviews' },
  { id: 'i26', name: 'Slack',       category: 'support',   status: 'available',    icon: '⚡', description: 'Team communication' },
  { id: 'i27', name: 'Jira',        category: 'product',   status: 'available',    icon: '🔵', description: 'Issue tracking' },
  { id: 'i28', name: 'Linear',      category: 'product',   status: 'available',    icon: '🟣', description: 'Issue & project tracking' },
];
