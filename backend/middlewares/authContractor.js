const jwt = require('jsonwebtoken');
const config = require('config');
const Contractor = require('../models/Contractor');
const Token = require('../models/TokenContractor');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

exports.authContractor = async function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'No token, Authorization Denied' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    const contractor = await Contractor.findOne({
      _id: decoded.user.id,
      token: token
    });
    if (!contractor) {
      throw new Error();
    }
    if (!contractor.verified) {
      let regToken = await Token.findOne({ contractorId: contractor._id });
      if (!regToken) {
        regToken = await new Token({
          contractorId: contractor._id,
          token: crypto.randomBytes(32).toString('hex')
        }).save();
        const url = `${config.get('base_url')}contractor/${
          contractor._id
        }/verify/${regToken.token}`;
        await sendEmail(
          contractor.email,
          'Verify your Contract Employee Account Email',
          contractor.firstName,
          url
        );
      }
      return res.status(400).send({
        message: 'An Email is sent to your account please verify to proceed.'
      });
    }
    req.token = token;
    req.user = contractor;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is invalid' });
  }
};
