const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const employerSchema = new mongoose.Schema({
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
  companyWebsite: {
    type: String,
    trim: true
  },
  companyLogo: {
    type: Buffer
  },
  postedJobs: {
    type: ObjectId,
    ref: 'Job'
  }
});

module.exports = Employer = mongoose.model('employer', employerSchema);
