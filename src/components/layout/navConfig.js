import {
  LayoutDashboard, Flame, Fuel, Building2, Target, Gauge,
  HeartHandshake, Users, PieChart, GraduationCap,
  ShieldCheck, FileCheck2, ClipboardList, AlertTriangle,
  Swords, Award, Gift, Trophy,
  FileBarChart, SlidersHorizontal,
  Building, Tags, Settings2, BellRing,
} from 'lucide-react'

export const navGroups = [
  {
    label: 'Overview',
    items: [{ to: '/', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Environmental',
    color: 'forest',
    items: [
      { to: '/environmental/emission-factors', label: 'Emission Factors', icon: Flame },
      { to: '/environmental/carbon-transactions', label: 'Carbon Transactions', icon: Fuel },
      { to: '/environmental/department-tracking', label: 'Department Carbon Tracking', icon: Building2 },
      { to: '/environmental/goals', label: 'Sustainability Goals', icon: Target },
      { to: '/environmental/dashboard', label: 'Environmental Dashboard', icon: Gauge },
    ],
  },
  {
    label: 'Social',
    color: 'rose',
    items: [
      { to: '/social/csr-activities', label: 'CSR Activities', icon: HeartHandshake },
      { to: '/social/employee-participation', label: 'Employee Participation', icon: Users },
      { to: '/social/diversity-metrics', label: 'Diversity Metrics', icon: PieChart },
      { to: '/social/training-completion', label: 'Training Completion', icon: GraduationCap },
    ],
  },
  {
    label: 'Governance',
    color: 'slate',
    items: [
      { to: '/governance/policies', label: 'ESG Policies', icon: ShieldCheck },
      { to: '/governance/acknowledgements', label: 'Policy Acknowledgements', icon: FileCheck2 },
      { to: '/governance/audits', label: 'Audits', icon: ClipboardList },
      { to: '/governance/compliance-issues', label: 'Compliance Issues', icon: AlertTriangle },
    ],
  },
  {
    label: 'Gamification',
    color: 'amber',
    items: [
      { to: '/gamification/challenges', label: 'Challenges', icon: Swords },
      { to: '/gamification/badges', label: 'Badges', icon: Award },
      { to: '/gamification/rewards', label: 'Rewards', icon: Gift },
      { to: '/gamification/leaderboard', label: 'Leaderboard', icon: Trophy },
    ],
  },
  {
    label: 'Reports',
    items: [
      { to: '/reports', label: 'All Reports', icon: FileBarChart },
      { to: '/reports/builder', label: 'Custom Report Builder', icon: SlidersHorizontal },
    ],
  },
  {
    label: 'Settings & Administration',
    items: [
      { to: '/settings/departments', label: 'Departments', icon: Building },
      { to: '/settings/categories', label: 'Categories', icon: Tags },
      { to: '/settings/esg-configuration', label: 'ESG Configuration', icon: Settings2 },
      { to: '/settings/notifications', label: 'Notification Settings', icon: BellRing },
    ],
  },
]
