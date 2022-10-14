const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ContractorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: [true, 'User Already Exists'],
    lowercase: true
  },
  contact: {
    type: Number,
    trim: true
  },
  password: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  totalExpYear: {
    type: [String],
    default: []
  },
  relExpYear: {
    type: [String],
    default: []
  },
  skillInfo: {
    type: [String],
    default: []
  },
  jobType: {
    type: [String],
    default: []
  },
  expMonSal: {
    type: [String],
    default: []
  },
  expMonCurr: {
    type: [String],
    default: []
  },
  curMonSal: {
    type: [String],
    default: []
  },
  curMonCurr: {
    type: [String],
    default: []
  },
  bday: {
    type: Date,
    default: Date.now
  },
  preferredCities: {
    type: [String],
    default: []
  },
  companyName: {
    type: String,
    trim: true
  },
  currentCity: {
    type: [String],
    default: []
  },
  noticePeriod: {
    type: [String],
    default: []
  },
  resumeLink: {
    type: String
  },
  userType: {
    type: String,
    default: 'contractor'
  },
  appliedTo: [
    {
      type: ObjectId,
      ref: 'Job'
    }
  ],
  token: {
    type: String
  }
});

module.exports = Contractor = mongoose.model('Contractor', ContractorSchema);
