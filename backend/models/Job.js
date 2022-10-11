const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const JobSchema = new mongoose.Schema({
  jobRole: {
    type: String,
    trim: true
  },
  jobSkills: {
    type: [String]
  },
  salary: {
    type: String,
    trim: true
  },
  salaryCurrency: {
    type: [String]
  },
  jobCategory: {
    type: [String]
  },
  jobIndustry: {
    type: [String]
  },
  jobLocation: {
    type: [String]
  },
  jobContractDuration: {
    type: [String]
  },
  jobDescriptionLink: {
    type: String
  },
  companyDetailsLink: {
    type: String
  },
  postedBy: {
    type: ObjectId,
    ref: 'employer'
  },
  applicantIds: [
    {
      type: ObjectId,
      ref: 'contractor'
    }
  ]
});

module.exports = Job = mongoose.model('job', JobSchema);
