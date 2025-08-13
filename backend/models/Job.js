const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: String, required: true },
  salary: { type: String, required: false },
  deadline: { type: Date, required: true },
  type: { type: String, default: 'Full-time' },
  description: { type: String, required: true },
  skills: [{ type: String }],
  postedDate: { type: Date, default: Date.now },
  postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
});

module.exports = mongoose.model('Job', JobSchema);