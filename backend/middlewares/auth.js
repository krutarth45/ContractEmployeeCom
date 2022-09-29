const jwt = require('jsonwebtoken');
const config = require('config');
const Contractor = require('../models/Contractor');

module.exports = async function (req, res, next) {
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
    req.token = token;
    req.user = contractor;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is invalid' });
  }
};
