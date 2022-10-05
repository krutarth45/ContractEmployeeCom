const jwt = require('jsonwebtoken');
const config = require('config');
const Employer = require('../models/Employer');
const Token = require('../models/TokenEmployer');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

exports.authContractor = async function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'No token, Authorization Denied' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    const employer = await Employer.findOne({
      _id: decoded.user.id,
      token: token
    });
    if (!employer) {
      throw new Error();
    }
    if (!employer.verified) {
      let regToken = await Token.findOne({ employerId: employer._id });
      if (!regToken) {
        regToken = await new Token({
          employerId: employer._id,
          token: crypto.randomBytes(32).toString('hex')
        }).save();
        const url = `${config.get('base_url')}employer/${employer._id}/verify/${
          regToken.token
        }`;
        await sendEmail(
          employer.email,
          'Verify your Contract Employee Account Email',
          employer.firstName,
          url
        );
      }
      return res.status(400).send({
        message: 'An Email is sent to your account please verify to proceed.'
      });
    }
    req.token = token;
    req.user = employer;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is invalid' });
  }
};
