require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const emissionFactorRoutes = require('./routes/emissionFactorRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const rewardRoutes = require('./routes/rewardRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Core middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });
});

// Mounted routes (Phase 1 scope)
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/emission-factors', emissionFactorRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/rewards', rewardRoutes);

// NOTE for future phases: mount additional route files here
// (carbon-transactions, environmental-goals, csr-activities, challenges,
// esg-policies, audits, compliance-issues, scores, leaderboard,
// notifications, reports) following the exact paths in Section 0.

// 404 + error handling (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`EcoSphere backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;
