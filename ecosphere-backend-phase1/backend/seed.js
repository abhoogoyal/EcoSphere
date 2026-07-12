require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

const User = require('./models/User');
const Department = require('./models/Department');
const Category = require('./models/Category');

const seed = async () => {
  try {
    await connectDB();

    console.log('--- Seeding EcoSphere database ---');

    // Wipe only the collections we seed, so this script is safely re-runnable.
    await User.deleteMany({ email: 'admin@ecosphere.com' });
    await Department.deleteMany({ code: { $in: ['HR', 'ENG', 'OPS'] } });
    await Category.deleteMany({ name: { $in: ['Community Outreach', 'Green Commute'] } });

    // Departments
    const departments = await Department.insertMany([
      { name: 'Human Resources', code: 'HR', employeeCount: 0, status: 'Active' },
      { name: 'Engineering', code: 'ENG', employeeCount: 0, status: 'Active' },
      { name: 'Operations', code: 'OPS', employeeCount: 0, status: 'Active' }
    ]);
    console.log(`Created ${departments.length} departments`);

    // Categories (one CSR type, one Challenge type)
    const categories = await Category.insertMany([
      { name: 'Community Outreach', type: 'CSR', status: 'Active' },
      { name: 'Green Commute', type: 'Challenge', status: 'Active' }
    ]);
    console.log(`Created ${categories.length} categories`);

    // Admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);

    const admin = await User.create({
      name: 'EcoSphere Admin',
      email: 'admin@ecosphere.com',
      password: hashedPassword,
      role: 'Admin',
      department: departments[1]._id, // Engineering
      xp: 0,
      points: 0,
      status: 'Active'
    });
    console.log(`Created admin user: ${admin.email}`);

    console.log('--- Seeding complete ---');
    console.log('Admin login -> email: admin@ecosphere.com | password: Admin@123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();
