const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const newJob = new Job({
      ...req.body,
      postedBy: req.user.id
    });

    const job = await newJob.save();
    res.status(201).json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedDate: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update a job
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    await job.deleteOne();
    res.json({ msg: 'Job removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;