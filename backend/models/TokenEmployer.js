const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema2 = new Schema({
  employerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'employer',
    unique: true
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }
});

module.exports = mongoose.model('tokenEmployer', tokenSchema2);
