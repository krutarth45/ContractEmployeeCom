const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const Contractor = require('../models/Contractor');
const Token = require('../models/Token');
const sendEmail = require('../utils/sendEmail');
const { auth } = require('../middlewares/auth');
const crypto = require('crypto');

// Contractor Registration
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, contact, password } = req.body;
  try {
    let user = await Contractor.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'Email is already registered' });
    }
    user = new Contractor({
      firstName,
      lastName,
      email,
      contact,
      password,
      token: ''
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload, config.get('jwtSecret'), (err, decoded) => {
      if (err) throw err;
      user.token = decoded;
    });
    user = await user.save();
    const token = await new Token({
      contractorId: user._id,
      token: crypto.randomBytes(32).toString('hex')
    }).save();
    const url = `${config.get('base_url')}contractor/${user._id}/verify/${
      token.token
    }`;
    await sendEmail(
      user.email,
      'Verify your Contract Employee Account Email',
      user.firstName,
      url
    );
    res.send({
      message:
        'Registration Successfull, Please verify your email to get Started.'
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Verify Contractor's Email.
router.get('/:id/verify/:token', async (req, res) => {
  try {
    const user = await Contractor.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: 'Invalid Link' });
    }
    const token = await Token.findOne({
      token: req.params.token,
      contractorId: user._id
    });
    if (!token) {
      return res.status(400).send({ message: 'Invalid Link' });
    }
    await Contractor.updateOne({ _id: user._id, verified: true });
    await token.remove();
    res.status(200).send('Email Verified.');
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
// Login for Contractor
router.post('/login', async (req, res) => {
  // 1. Check password.
  let user = await Contractor.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ message: 'Invalid Credentials' });
  }
  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) {
    return res.status(400).send({ message: 'Invalid Credentials' });
  }
  // 2. Renew Token.
  const payload = {
    user: {
      id: user._id.toString()
    }
  };
  jwt.sign(payload, config.get('jwtSecret'), (err, decoded) => {
    if (err) throw err;
    user.token = decoded;
  });
  user = await user.save();
  // 3. Check if Email is verified or not.
  if (!user.verified) {
    let regToken = await Token.findOne({ contractorId: user._id });
    if (!regToken) {
      regToken = await new Token({
        contractorId: user._id,
        token: crypto.randomBytes(32).toString('hex')
      }).save();
      const url = `${config.get('base_url')}contractor/${user._id}/verify/${
        regToken.token
      }`;
      await sendEmail(
        user.email,
        'Verify your Contract Employee Account Email',
        user.firstName,
        url
      );
    }
    return res.status(400).send({
      message: 'An Email is sent to your account please verify to proceed.'
    });
  }
  // 4. Check details. if details are there send message detailsUp else detailsDown
  if (user.skills.length === 0) {
    return res.status(200).send({ message: 'detailsDown' });
  }
  res.status(200).send({ message: 'detailsUp' });
});
module.exports = router;
