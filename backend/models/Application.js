const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },

  // Personal Information
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: String,
  category: String,
  
  // Address Information
  address: String,
  city: String,
  state: String,
  pincode: String,
  
  // Educational Information
  highestQualification: String,
  university: String,
  graduationYear: String,
  percentage: String,
  
  // Professional Information
  experience: String,
  currentPosition: String,
  currentCompany: String,
  skills: String,
  
  // Position Applied (from form)
  position: { type: String, required: true },
  department: { type: String, required: true },
  
  // Documents (Paths to the uploaded files)
  resume: { type: String, required: true },
  photo: { type: String, required: true },
  
  // Additional Information
  achievements: String,
  references: String,

  // Admin-managed status
  status: {
    type: String,
    enum: ['Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'],
    default: 'Under Review',
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Application', ApplicationSchema);