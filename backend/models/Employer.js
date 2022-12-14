const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const employerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  companyAddress: {
    type: String,
    trim: true
  },
  recruiterName: {
    type: String,
    trim: true
  },
  recruiterDesignation: {
    type: String,
    trim: true
  },
  companyUrl: {
    type: String,
    trim: true
  },
  companyLogoLink: {
    type: String
  },
  postedJobs: [
    {
      type: ObjectId,
      ref: 'Job'
    }
  ],
  email: {
    type: String,
    trim: true,
    unique: [true, 'User Already Exists'],
    lowercase: true
  },
  password: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  contact: {
    type: Number,
    trim: true,
    unique: [true, 'Number Already Exists.']
  },
  userType: {
    type: String,
    default: 'employer'
  },
  token: {
    type: String
  }
});

module.exports = Employer = mongoose.model('Employer', employerSchema);
