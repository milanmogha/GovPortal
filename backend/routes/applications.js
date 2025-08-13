const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Application = require('../models/Application');
const { protect, admin } = require('../middleware/authMiddleware');

// --- Multer Configuration for File Uploads ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save files to the 'uploads' directory in your backend's root
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Create a unique filename to prevent overwriting
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage: storage });

/**
 * @route   POST /api/applications
 * @desc    Submit a new application
 * @access  Private (Requires a logged-in user)
 */
router.post(
  '/',
  protect, // Middleware to identify the logged-in user from the token
  upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'photo', maxCount: 1 }]),
  async (req, res) => {
    try {
      const formData = req.body;
      const files = req.files;

      if (!files || !files.resume || !files.photo) {
        return res.status(400).json({ msg: 'Resume and photo files are required.' });
      }

      // Create a new application instance with all form data
      const newApplication = new Application({
        ...formData,
        user: req.user.id, // Link the application to the logged-in user's ID
        resume: files.resume[0].path,
        photo: files.photo[0].path,
      });

      await newApplication.save();
      res.status(201).json({ msg: 'Application submitted successfully!' });

    } catch (err) {
      console.error(err); // Log the full error for better debugging
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route   GET /api/applications
 * @desc    Get all applications (for the admin panel)
 * @access  Private/Admin
 */
router.get('/', protect, admin, async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('job', 'title') // Optionally get the job title
            .sort({ appliedDate: -1 });
        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/**
 * @route   GET /api/applications/my
 * @desc    Get all applications for the currently logged-in user
 * @access  Private
 */
router.get('/my', protect, async (req, res) => {
    try {
        // Find applications where the 'user' field matches the ID from the token
        const applications = await Application.find({ user: req.user.id })
            .populate('job', 'title department') // Get related job details
            .sort({ appliedDate: -1 });
        
        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/**
 * @route   PUT /api/applications/:id/status
 * @desc    Update an application's status (for the admin panel)
 * @access  Private/Admin
 */
router.put('/:id/status', protect, admin, async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true } // Return the updated document
        );
        if (!application) {
            return res.status(404).json({ msg: 'Application not found' });
        }
        res.json(application);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;