const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const Contractor = require('../models/Contractor');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  const { firstName, lastName, email, contact, password } = req.body;
  let token = '';
  try {
    let user = await Contractor.findOne({ email });
    if (user) {
      return res.status(400).send({ error: 'Email is already registered' });
    }
    user = new Contractor({
      firstName,
      lastName,
      email,
      contact,
      password,
      token
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
      if (err) throw err;
      user.token = token;
    });
    await user.save();
    res.send('Contractor Registered');
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
