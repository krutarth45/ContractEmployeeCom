const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema({
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
  username: {
    type: String,
    trim: true,
    unique: [true, 'Username Already Exists']
  },
  contact: {
    type: Number,
    trim: true,
    unique: [true, 'Number Already Exists.']
  },
  password: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  totalExperience: {
    type: String
  },
  relevantExperience: {
    type: String
  },
  skills: {
    type: [String],
    default: []
  },
  jobType: {
    type: String,
    enum: ['Contract', 'Permanent']
  },
  expSalVal: {
    type: String
  },
  expSalCurrency: {
    type: String
  },
  curSalVal: {
    type: String
  },
  curSalCurrency: {
    type: String
  },
  bYear: {
    type: Number,
    trim: true
  },
  bMonth: {
    type: Number,
    trim: true
  },
  bDay: {
    type: Number,
    trim: true
  },
  prefferedLocation: {
    type: [String],
    default: []
  },
  currentCompany: {
    type: String,
    trim: true
  },
  currentLocation: {
    type: String,
    trim: true
  },
  resume: {
    type: Buffer
  },
  appliedTo: {
    type: ObjectId,
    ref: 'Job'
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
