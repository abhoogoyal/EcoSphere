// Central mock data store — simulates ERP-integrated ESG data.
// In a real MERN build this would be replaced by API calls to Express/MongoDB.

export const departments = [
  { id: 'D01', name: 'Manufacturing', code: 'MFG', head: 'Ritu Sharma', parent: null, employeeCount: 214, status: 'Active' },
  { id: 'D02', name: 'Logistics & Fleet', code: 'LOG', head: 'Arjun Mehta', parent: null, employeeCount: 88, status: 'Active' },
  { id: 'D03', name: 'Procurement', code: 'PRC', head: 'Neha Kapoor', parent: null, employeeCount: 41, status: 'Active' },
  { id: 'D04', name: 'People & Culture', code: 'PPL', head: 'Sana Iyer', parent: null, employeeCount: 26, status: 'Active' },
  { id: 'D05', name: 'Finance', code: 'FIN', head: 'Devraj Singh', parent: null, employeeCount: 33, status: 'Active' },
  { id: 'D06', name: 'IT & Digital', code: 'ITD', head: 'Kavya Nair', parent: null, employeeCount: 57, status: 'Active' },
]

export const categories = [
  { id: 'C01', name: 'Tree Plantation', type: 'CSR Activity', status: 'Active' },
  { id: 'C02', name: 'Blood Donation', type: 'CSR Activity', status: 'Active' },
  { id: 'C03', name: 'Community Education', type: 'CSR Activity', status: 'Active' },
  { id: 'C04', name: 'Beach & River Cleanup', type: 'CSR Activity', status: 'Active' },
  { id: 'C05', name: 'Energy Reduction', type: 'Challenge', status: 'Active' },
  { id: 'C06', name: 'Waste Segregation', type: 'Challenge', status: 'Active' },
  { id: 'C07', name: 'Commute Carbon Cut', type: 'Challenge', status: 'Active' },
  { id: 'C08', name: 'Paperless Office', type: 'Challenge', status: 'Active' },
]

export const emissionFactors = [
  { id: 'EF01', source: 'Grid Electricity (India avg)', scope: 'Scope 2', unit: 'kWh', factor: 0.716, unitCO2e: 'kgCO2e' },
  { id: 'EF02', source: 'Diesel (Fleet)', scope: 'Scope 1', unit: 'litre', factor: 2.68, unitCO2e: 'kgCO2e' },
  { id: 'EF03', source: 'Petrol (Fleet)', scope: 'Scope 1', unit: 'litre', factor: 2.31, unitCO2e: 'kgCO2e' },
  { id: 'EF04', source: 'Natural Gas (Manufacturing)', scope: 'Scope 1', unit: 'm3', factor: 2.03, unitCO2e: 'kgCO2e' },
  { id: 'EF05', source: 'Air Travel (Domestic)', scope: 'Scope 3', unit: 'km', factor: 0.133, unitCO2e: 'kgCO2e' },
  { id: 'EF06', source: 'Purchased Steel', scope: 'Scope 3', unit: 'kg', factor: 1.85, unitCO2e: 'kgCO2e' },
  { id: 'EF07', source: 'Purchased Paper', scope: 'Scope 3', unit: 'kg', factor: 0.94, unitCO2e: 'kgCO2e' },
]

export const carbonTransactions = [
  { id: 'CT01', department: 'Manufacturing', source: 'Natural Gas (Manufacturing)', linkedRecord: 'Manufacturing Order MO-1042', quantity: 3200, unit: 'm3', emissions: 6496, date: '2026-07-02', auto: true },
  { id: 'CT02', department: 'Logistics & Fleet', source: 'Diesel (Fleet)', linkedRecord: 'Fleet Log FL-2291', quantity: 860, unit: 'litre', emissions: 2304.8, date: '2026-07-03', auto: true },
  { id: 'CT03', department: 'Procurement', source: 'Purchased Steel', linkedRecord: 'Purchase Order PO-5581', quantity: 12000, unit: 'kg', emissions: 22200, date: '2026-07-04', auto: true },
  { id: 'CT04', department: 'IT & Digital', source: 'Grid Electricity (India avg)', linkedRecord: 'Facility Meter — Server Room', quantity: 18400, unit: 'kWh', emissions: 13174.4, date: '2026-07-05', auto: true },
  { id: 'CT05', department: 'Finance', source: 'Air Travel (Domestic)', linkedRecord: 'Expense EXP-8842', quantity: 1400, unit: 'km', emissions: 186.2, date: '2026-07-06', auto: false },
  { id: 'CT06', department: 'People & Culture', source: 'Purchased Paper', linkedRecord: 'Purchase Order PO-5602', quantity: 340, unit: 'kg', emissions: 319.6, date: '2026-07-07', auto: true },
  { id: 'CT07', department: 'Manufacturing', source: 'Grid Electricity (India avg)', linkedRecord: 'Facility Meter — Plant 2', quantity: 52000, unit: 'kWh', emissions: 37232, date: '2026-07-08', auto: true },
  { id: 'CT08', department: 'Logistics & Fleet', source: 'Petrol (Fleet)', linkedRecord: 'Fleet Log FL-2305', quantity: 410, unit: 'litre', emissions: 947.1, date: '2026-07-09', auto: true },
]

export const environmentalGoals = [
  { id: 'EG01', title: 'Reduce Scope 1 emissions 15% YoY', department: 'Manufacturing', metric: 'tCO2e', target: 850, current: 612, deadline: '2026-12-31', status: 'On Track' },
  { id: 'EG02', title: 'Cut fleet diesel usage by 20%', department: 'Logistics & Fleet', metric: 'litres/month', target: 6000, current: 7100, deadline: '2026-11-30', status: 'At Risk' },
  { id: 'EG03', title: 'Switch 30% procurement to certified-low-carbon steel', department: 'Procurement', metric: '% of volume', target: 30, current: 18, deadline: '2027-03-31', status: 'On Track' },
  { id: 'EG04', title: 'Reduce data center energy intensity', department: 'IT & Digital', metric: 'kWh/server', target: 410, current: 452, deadline: '2026-09-30', status: 'At Risk' },
  { id: 'EG05', title: 'Achieve zero single-use plastics in office', department: 'People & Culture', metric: '% eliminated', target: 100, current: 76, deadline: '2026-10-31', status: 'On Track' },
]

export const esgPolicies = [
  { id: 'PL01', title: 'Code of Conduct & Ethics', category: 'Governance', owner: 'Devraj Singh', version: '3.2', effectiveDate: '2026-01-15', status: 'Published' },
  { id: 'PL02', title: 'Anti-Bribery & Anti-Corruption Policy', category: 'Governance', owner: 'Devraj Singh', version: '2.0', effectiveDate: '2025-11-01', status: 'Published' },
  { id: 'PL03', title: 'Environmental Health & Safety Policy', category: 'Environmental', owner: 'Ritu Sharma', version: '4.1', effectiveDate: '2026-03-10', status: 'Published' },
  { id: 'PL04', title: 'Diversity, Equity & Inclusion Policy', category: 'Social', owner: 'Sana Iyer', version: '1.5', effectiveDate: '2026-05-01', status: 'Published' },
  { id: 'PL05', title: 'Data Privacy & Security Policy', category: 'Governance', owner: 'Kavya Nair', version: '2.3', effectiveDate: '2026-06-20', status: 'Draft' },
  { id: 'PL06', title: 'Supplier Code of Conduct', category: 'Governance', owner: 'Neha Kapoor', version: '1.2', effectiveDate: '2026-04-12', status: 'Published' },
]

export const employees = [
  { id: 'E001', name: 'Aarav Bose', department: 'Manufacturing', xp: 2340, level: 6 },
  { id: 'E002', name: 'Ishita Verma', department: 'IT & Digital', xp: 3110, level: 7 },
  { id: 'E003', name: 'Rohan Das', department: 'Logistics & Fleet', xp: 1890, level: 5 },
  { id: 'E004', name: 'Priya Malhotra', department: 'People & Culture', xp: 4020, level: 8 },
  { id: 'E005', name: 'Karan Chawla', department: 'Procurement', xp: 1420, level: 4 },
  { id: 'E006', name: 'Meera Pillai', department: 'Finance', xp: 2670, level: 6 },
  { id: 'E007', name: 'Yash Kulkarni', department: 'Manufacturing', xp: 980, level: 3 },
  { id: 'E008', name: 'Ananya Rao', department: 'IT & Digital', xp: 3560, level: 7 },
]

export const policyAcknowledgements = [
  { id: 'PA01', policy: 'Code of Conduct & Ethics', employee: 'Aarav Bose', status: 'Acknowledged', date: '2026-06-02' },
  { id: 'PA02', policy: 'Code of Conduct & Ethics', employee: 'Ishita Verma', status: 'Pending', date: null },
  { id: 'PA03', policy: 'Anti-Bribery & Anti-Corruption Policy', employee: 'Rohan Das', status: 'Acknowledged', date: '2026-05-28' },
  { id: 'PA04', policy: 'Diversity, Equity & Inclusion Policy', employee: 'Priya Malhotra', status: 'Acknowledged', date: '2026-06-10' },
  { id: 'PA05', policy: 'Supplier Code of Conduct', employee: 'Karan Chawla', status: 'Pending', date: null },
  { id: 'PA06', policy: 'Environmental Health & Safety Policy', employee: 'Yash Kulkarni', status: 'Overdue', date: null },
]

export const audits = [
  { id: 'AU01', title: 'Q2 Environmental Compliance Audit', department: 'Manufacturing', auditor: 'Internal — EHS Team', date: '2026-06-15', status: 'Completed', findings: 3 },
  { id: 'AU02', title: 'Fleet Safety & Emissions Audit', department: 'Logistics & Fleet', auditor: 'GreenCheck Consultants', date: '2026-06-28', status: 'Completed', findings: 2 },
  { id: 'AU03', title: 'Data Privacy Governance Review', department: 'IT & Digital', auditor: 'Internal — Legal Team', date: '2026-07-10', status: 'In Progress', findings: 1 },
  { id: 'AU04', title: 'Supplier ESG Due Diligence', department: 'Procurement', auditor: 'Internal — Sourcing Team', date: '2026-07-20', status: 'Scheduled', findings: 0 },
]

export const complianceIssues = [
  { id: 'CI01', audit: 'Q2 Environmental Compliance Audit', severity: 'High', description: 'Wastewater discharge exceeded permitted TDS levels at Plant 2', owner: 'Ritu Sharma', dueDate: '2026-07-15', status: 'Open' },
  { id: 'CI02', audit: 'Q2 Environmental Compliance Audit', severity: 'Medium', description: 'Hazardous waste manifests missing for two shipments', owner: 'Ritu Sharma', dueDate: '2026-07-25', status: 'Open' },
  { id: 'CI03', audit: 'Fleet Safety & Emissions Audit', severity: 'Low', description: 'Three vehicles overdue for emissions re-certification', owner: 'Arjun Mehta', dueDate: '2026-07-05', status: 'Open' },
  { id: 'CI04', audit: 'Fleet Safety & Emissions Audit', severity: 'Medium', description: 'Driver idle-time policy not enforced at Depot 3', owner: 'Arjun Mehta', dueDate: '2026-08-01', status: 'Resolved' },
  { id: 'CI05', audit: 'Data Privacy Governance Review', severity: 'High', description: 'Vendor data processing agreement not renewed', owner: 'Kavya Nair', dueDate: '2026-07-18', status: 'Open' },
]

export const csrActivities = [
  { id: 'CA01', title: 'Mangrove Plantation Drive', category: 'Tree Plantation', department: 'People & Culture', date: '2026-06-05', location: 'Mumbai Coast', participants: 42, status: 'Completed' },
  { id: 'CA02', title: 'Annual Blood Donation Camp', category: 'Blood Donation', department: 'People & Culture', date: '2026-06-20', location: 'HQ Campus', participants: 65, status: 'Completed' },
  { id: 'CA03', title: 'Digital Literacy for Rural Schools', category: 'Community Education', department: 'IT & Digital', date: '2026-07-18', location: 'Pune District', participants: 15, status: 'Upcoming' },
  { id: 'CA04', title: 'Yamuna Riverbank Cleanup', category: 'Beach & River Cleanup', department: 'Logistics & Fleet', date: '2026-07-25', location: 'Delhi', participants: 0, status: 'Upcoming' },
]

export const employeeParticipation = [
  { id: 'EP01', employee: 'Priya Malhotra', activity: 'Mangrove Plantation Drive', proof: 'photo_1042.jpg', approvalStatus: 'Approved', pointsEarned: 120, completionDate: '2026-06-05' },
  { id: 'EP02', employee: 'Meera Pillai', activity: 'Annual Blood Donation Camp', proof: 'certificate_884.pdf', approvalStatus: 'Approved', pointsEarned: 80, completionDate: '2026-06-20' },
  { id: 'EP03', employee: 'Ananya Rao', activity: 'Annual Blood Donation Camp', proof: null, approvalStatus: 'Pending', pointsEarned: 0, completionDate: null },
  { id: 'EP04', employee: 'Karan Chawla', activity: 'Mangrove Plantation Drive', proof: 'photo_1055.jpg', approvalStatus: 'Rejected', pointsEarned: 0, completionDate: null },
]

export const challenges = [
  { id: 'CH01', title: 'Cut Desk Energy Use', category: 'Energy Reduction', description: 'Power down monitors and chargers every evening for 2 weeks.', xp: 150, difficulty: 'Easy', evidenceRequired: true, deadline: '2026-07-20', status: 'Active' },
  { id: 'CH02', title: 'Zero-Waste Lunch Week', category: 'Waste Segregation', description: 'Bring reusable containers and segregate waste correctly for 5 working days.', xp: 200, difficulty: 'Medium', evidenceRequired: true, deadline: '2026-07-22', status: 'Active' },
  { id: 'CH03', title: 'Bike or Bus to Work', category: 'Commute Carbon Cut', description: 'Use low-carbon commute options for 10 working days.', xp: 250, difficulty: 'Medium', evidenceRequired: true, deadline: '2026-07-31', status: 'Active' },
  { id: 'CH04', title: 'Go Paperless for a Sprint', category: 'Paperless Office', description: 'Avoid printing for one full sprint cycle.', xp: 180, difficulty: 'Hard', evidenceRequired: false, deadline: '2026-08-05', status: 'Draft' },
  { id: 'CH05', title: 'Q1 Recycling Sprint', category: 'Waste Segregation', description: 'Departmental recycling target challenge.', xp: 300, difficulty: 'Hard', evidenceRequired: true, deadline: '2026-03-31', status: 'Completed' },
]

export const challengeParticipation = [
  { id: 'CP01', challenge: 'Cut Desk Energy Use', employee: 'Aarav Bose', progress: 80, proof: 'log_energy_09.csv', approval: 'Pending', xpAwarded: 0 },
  { id: 'CP02', challenge: 'Cut Desk Energy Use', employee: 'Ishita Verma', progress: 100, proof: 'log_energy_11.csv', approval: 'Approved', xpAwarded: 150 },
  { id: 'CP03', challenge: 'Bike or Bus to Work', employee: 'Rohan Das', progress: 60, proof: null, approval: 'Pending', xpAwarded: 0 },
  { id: 'CP04', challenge: 'Zero-Waste Lunch Week', employee: 'Priya Malhotra', progress: 100, proof: 'photo_lunch.jpg', approval: 'Approved', xpAwarded: 200 },
]

export const badges = [
  { id: 'B01', name: 'Green Sprout', description: 'Earn your first 100 XP', unlockRule: 'XP >= 100', icon: 'Sprout', unlockedBy: 8 },
  { id: 'B02', name: 'Carbon Cutter', description: 'Complete 3 Energy Reduction challenges', unlockRule: 'completedChallenges(category=Energy Reduction) >= 3', icon: 'Zap', unlockedBy: 4 },
  { id: 'B03', name: 'Community Champion', description: 'Participate in 5 CSR activities', unlockRule: 'csrParticipation >= 5', icon: 'HeartHandshake', unlockedBy: 3 },
  { id: 'B04', name: 'Policy Pro', description: 'Acknowledge all assigned policies on time', unlockRule: 'policyAcknowledgementRate = 100%', icon: 'ShieldCheck', unlockedBy: 6 },
  { id: 'B05', name: 'Century Club', description: 'Reach 3000 XP', unlockRule: 'XP >= 3000', icon: 'Trophy', unlockedBy: 3 },
]

export const rewards = [
  { id: 'R01', name: 'EcoSphere Steel Bottle', description: 'Insulated steel water bottle', pointsRequired: 300, stock: 42, status: 'Active' },
  { id: 'R02', name: 'Extra Day Off', description: 'One additional paid leave day', pointsRequired: 1200, stock: 15, status: 'Active' },
  { id: 'R03', name: 'Tree Dedication Certificate', description: 'A tree planted in your name', pointsRequired: 250, stock: 999, status: 'Active' },
  { id: 'R04', name: 'Premium Parking Spot (1 month)', description: 'Reserved parking near main entrance', pointsRequired: 800, stock: 3, status: 'Active' },
  { id: 'R05', name: 'EcoSphere Hoodie', description: 'Organic cotton branded hoodie', pointsRequired: 600, stock: 0, status: 'Out of Stock' },
]

export const departmentScores = [
  { department: 'Manufacturing', environmental: 68, social: 74, governance: 81, total: 73 },
  { department: 'Logistics & Fleet', environmental: 59, social: 66, governance: 77, total: 66 },
  { department: 'Procurement', environmental: 71, social: 70, governance: 84, total: 74 },
  { department: 'People & Culture', environmental: 82, social: 91, governance: 88, total: 87 },
  { department: 'Finance', environmental: 75, social: 68, governance: 90, total: 77 },
  { department: 'IT & Digital', environmental: 64, social: 72, governance: 85, total: 73 },
]

export const emissionTrend = [
  { month: 'Feb', scope1: 3200, scope2: 4100, scope3: 1800 },
  { month: 'Mar', scope1: 3050, scope2: 3980, scope3: 1900 },
  { month: 'Apr', scope1: 2900, scope2: 3850, scope3: 1750 },
  { month: 'May', scope1: 2780, scope2: 3700, scope3: 1620 },
  { month: 'Jun', scope1: 2650, scope2: 3550, scope3: 1580 },
  { month: 'Jul', scope1: 2510, scope2: 3400, scope3: 1490 },
]

export const diversityMetrics = {
  genderSplit: [
    { name: 'Men', value: 54 },
    { name: 'Women', value: 44 },
    { name: 'Non-binary / Undisclosed', value: 2 },
  ],
  ageGroups: [
    { group: '20–29', pct: 31 },
    { group: '30–39', pct: 38 },
    { group: '40–49', pct: 21 },
    { group: '50+', pct: 10 },
  ],
  leadershipDiversity: 37,
  payEquityRatio: 0.97,
}

export const trainingCompletion = [
  { department: 'Manufacturing', assigned: 214, completed: 178 },
  { department: 'Logistics & Fleet', assigned: 88, completed: 70 },
  { department: 'Procurement', assigned: 41, completed: 39 },
  { department: 'People & Culture', assigned: 26, completed: 26 },
  { department: 'Finance', assigned: 33, completed: 25 },
  { department: 'IT & Digital', assigned: 57, completed: 48 },
]

export const notifications = [
  { id: 'N01', type: 'compliance', message: 'New compliance issue raised: Wastewater discharge exceeded limits at Plant 2', time: '2h ago', read: false },
  { id: 'N02', type: 'approval', message: 'Ishita Verma\u2019s "Cut Desk Energy Use" challenge was approved (+150 XP)', time: '5h ago', read: false },
  { id: 'N03', type: 'policy', message: 'Reminder: 2 employees have overdue policy acknowledgements', time: '1d ago', read: true },
  { id: 'N04', type: 'badge', message: 'Priya Malhotra unlocked the "Century Club" badge', time: '2d ago', read: true },
  { id: 'N05', type: 'compliance', message: 'Compliance issue CI05 is due in 3 days', time: '2d ago', read: false },
]

export const orgWeighting = { environmental: 40, social: 30, governance: 30 }

export function overallScore(rows = departmentScores, weights = orgWeighting) {
  const avg = (key) => rows.reduce((s, r) => s + r[key], 0) / rows.length
  const e = avg('environmental')
  const s = avg('social')
  const g = avg('governance')
  const total = (e * weights.environmental + s * weights.social + g * weights.governance) / 100
  return { environmental: Math.round(e), social: Math.round(s), governance: Math.round(g), total: Math.round(total) }
}
