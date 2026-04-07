const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user.model');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@docverify.com' });
    if (adminExists) {
      console.log('ℹ️ Admin already exists. Skipping...');
      process.exit(0);
    }

    // Create Admin
    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@docverify.com',
      password: 'adminpassword123',
      role: 'admin',
    });

    console.log('✅ Admin created successfully!');
    console.log('Email: admin@docverify.com');
    console.log('Password: adminpassword123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();
