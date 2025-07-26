const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); 

// --- CONFIGURE YOUR ADMIN USER HERE ---
const ADMIN_EMAIL = "admin@gov-recruit.com";
const ADMIN_PASSWORD = "Admin123"; // Use a strong password
// ------------------------------------

// Replace with your MongoDB connection string
const MONGO_URI = "mongodb://127.0.0.1:27017/govportal";

const seedAdmin = async () => {
  try {
    // Connect to the database
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // 1. Check if the admin user already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin user already exists. No action taken.');
      return;
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    // 3. Create the new admin user
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: ADMIN_EMAIL,
      phone: '0000000000',
      password: hashedPassword,
      role: 'admin', 
    });

    // 4. Save the admin user to the database
    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);

  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  } finally {
    // 5. Disconnect from the database
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

seedAdmin();