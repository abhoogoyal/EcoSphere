import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'

import Dashboard from './pages/Dashboard.jsx'

import EmissionFactors from './pages/environmental/EmissionFactors.jsx'
import CarbonTransactions from './pages/environmental/CarbonTransactions.jsx'
import DepartmentCarbonTracking from './pages/environmental/DepartmentCarbonTracking.jsx'
import SustainabilityGoals from './pages/environmental/SustainabilityGoals.jsx'
import EnvironmentalDashboard from './pages/environmental/EnvironmentalDashboard.jsx'

import CSRActivities from './pages/social/CSRActivities.jsx'
import EmployeeParticipation from './pages/social/EmployeeParticipation.jsx'
import DiversityMetrics from './pages/social/DiversityMetrics.jsx'
import TrainingCompletion from './pages/social/TrainingCompletion.jsx'

import ESGPolicies from './pages/governance/ESGPolicies.jsx'
import PolicyAcknowledgements from './pages/governance/PolicyAcknowledgements.jsx'
import Audits from './pages/governance/Audits.jsx'
import ComplianceIssues from './pages/governance/ComplianceIssues.jsx'

import Challenges from './pages/gamification/Challenges.jsx'
import Badges from './pages/gamification/Badges.jsx'
import Rewards from './pages/gamification/Rewards.jsx'
import Leaderboard from './pages/gamification/Leaderboard.jsx'

import Reports from './pages/reports/Reports.jsx'
import CustomReportBuilder from './pages/reports/CustomReportBuilder.jsx'

import Departments from './pages/settings/Departments.jsx'
import Categories from './pages/settings/Categories.jsx'
import ESGConfiguration from './pages/settings/ESGConfiguration.jsx'
import NotificationSettings from './pages/settings/NotificationSettings.jsx'

import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/environmental/emission-factors" element={<EmissionFactors />} />
        <Route path="/environmental/carbon-transactions" element={<CarbonTransactions />} />
        <Route path="/environmental/department-tracking" element={<DepartmentCarbonTracking />} />
        <Route path="/environmental/goals" element={<SustainabilityGoals />} />
        <Route path="/environmental/dashboard" element={<EnvironmentalDashboard />} />

        <Route path="/social/csr-activities" element={<CSRActivities />} />
        <Route path="/social/employee-participation" element={<EmployeeParticipation />} />
        <Route path="/social/diversity-metrics" element={<DiversityMetrics />} />
        <Route path="/social/training-completion" element={<TrainingCompletion />} />

        <Route path="/governance/policies" element={<ESGPolicies />} />
        <Route path="/governance/acknowledgements" element={<PolicyAcknowledgements />} />
        <Route path="/governance/audits" element={<Audits />} />
        <Route path="/governance/compliance-issues" element={<ComplianceIssues />} />

        <Route path="/gamification/challenges" element={<Challenges />} />
        <Route path="/gamification/badges" element={<Badges />} />
        <Route path="/gamification/rewards" element={<Rewards />} />
        <Route path="/gamification/leaderboard" element={<Leaderboard />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/builder" element={<CustomReportBuilder />} />

        <Route path="/settings/departments" element={<Departments />} />
        <Route path="/settings/categories" element={<Categories />} />
        <Route path="/settings/esg-configuration" element={<ESGConfiguration />} />
        <Route path="/settings/notifications" element={<NotificationSettings />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
