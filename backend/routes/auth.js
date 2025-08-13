const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// A secret key for JWT - store this in an environment variable in a real app
const JWT_SECRET = 'e8b7f3a2c1d9e0f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4';

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 */
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    // 2. Create a new user instance
    user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    // 3. Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Save the user to the database
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token (login)
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 2. Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 3. If credentials are correct, create a JWT payload
    // === THIS SECTION IS UPDATED ===
    const payload = {
      user: {
        id: user.id,
        role: user.role, // We now include the user's role in the token
      },
    };

    // 4. Sign the token
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '5h' }, // Token expires in 5 hours
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



/**
 * @route   GET /api/auth/me
 * @desc    Get logged-in user's profile data
 * @access  Private
 */
router.get('/me', protect, async (req, res) => {
  try {
    // The 'protect' middleware finds the user and attaches them to req.user
    // We exclude the password from being sent back
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



module.exports = router;