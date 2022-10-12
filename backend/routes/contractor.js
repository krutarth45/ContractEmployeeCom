const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const Contractor = require('../models/Contractor');
const Token = require('../models/TokenContractor');
const sendEmail = require('../utils/sendEmail');
const { authContractor } = require('../middlewares/authContractor');
const cloudinary = require('../utils/cloudinary');
const { uploadFile } = require('../utils/multer');
const crypto = require('crypto');
const Job = require('../models/Job');

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
  try {
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
      }
      const url = `${config.get('base_url')}contractor/${user._id}/verify/${
        regToken.token
      }`;
      await sendEmail(
        user.email,
        'Verify your Contract Employee Account Email',
        user.firstName,
        url
      );
      return res.status(400).send({
        message: 'An Email is sent to your account please verify to proceed.'
      });
    }
    // 4. Check details. if details are there send message detailsUp else detailsDown
    if (user.skillInfo.length === 0) {
      return res.status(200).send({ user, message: 'detailsDown' });
    }
    res.status(200).send({ user, message: 'detailsUp' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
// pdf upload
router.post(
  '/resumeupload',
  authContractor,
  uploadFile.single('resume'),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      res.status(200).send({ secure_url: result.secure_url });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error.' });
    }
  }
);
// update contractor details
router.post('/updatecontractordetails', authContractor, async (req, res) => {
  try {
    const {
      totalExpYear,
      relExpYear,
      skillInfo,
      companyName,
      jobType,
      curMonSal,
      curMonCurr,
      expMonSal,
      expMonCurr,
      noticePeriod,
      currentCity,
      preferredCities,
      bday,
      resumeLink
    } = req.body;
    await Contractor.updateOne(
      { _id: req.user._id },
      {
        $set: {
          totalExpYear,
          relExpYear,
          skillInfo,
          companyName,
          jobType,
          curMonSal,
          curMonCurr,
          expMonSal,
          expMonCurr,
          noticePeriod,
          currentCity,
          preferredCities,
          bday,
          resumeLink
        }
      }
    );
    res.status(200).send({ message: 'Successfully updated user data' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
router.get('/get-jobs', authContractor, async (req, res) => {
  try {
    let jobs = await Job.find();
    if (jobs.length !== 0) {
      return res.status(200).send(jobs);
    }
    res.status(404).send({ message: 'No Jobs Posted.' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
router.put('/:jobId/apply', authContractor, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (job.applicantIds.includes(req.user._id)) {
      return res.send({ message: 'Already Applied' });
    }
    await job.updateOne({
      $push: {
        applicantIds: req.user._id
      }
    });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
router.put('/:jobId/revoke', authContractor, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (job.applicantIds.includes(req.user._id)) {
      await job.updateOne({
        $pull: {
          applicantIds: req.user._id
        }
      });
      res.status(200).send({ message: 'Successfully Revoked Apply' });
    }
    return res.send({ message: 'Already Not Applied' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
module.exports = router;
