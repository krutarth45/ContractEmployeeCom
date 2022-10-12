const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const Employer = require('../models/Employer');
const Token = require('../models/TokenEmployer');
const sendEmail = require('../utils/sendEmail');
const cloudinary = require('../utils/cloudinary');
const { uploadImg, uploadFile } = require('../utils/multer');
const crypto = require('crypto');
const Contractor = require('../models/Contractor');
const { authEmployer } = require('../middlewares/authEmployer');
const Job = require('../models/Job');

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, contact, password } = req.body;
  try {
    let user = await Employer.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'Email is already registered' });
    }
    user = new Employer({
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
      employerId: user._id,
      token: crypto.randomBytes(32).toString('hex')
    }).save();
    const url = `${config.get('base_url')}employer/${user._id}/verify/${
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
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
router.get('/:id/verify/:token', async (req, res) => {
  try {
    const user = await Employer.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: 'Invalid Link' });
    }
    const token = await Token.findOne({
      token: req.params.token,
      employerId: user._id
    });
    if (!token) {
      return res.status(400).send({ message: 'Invalid Link' });
    }
    await Employer.updateOne({ _id: user._id }, { verified: true });
    await token.remove();
    res.status(200).send('Email Verified.');
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
router.post('/login', async (req, res) => {
  try {
    // 1. Check password.
    let user = await Employer.findOne({ email: req.body.email });
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
      let regToken = await Token.findOne({ employerId: user._id });
      if (!regToken) {
        regToken = await new Token({
          employerId: user._id,
          token: crypto.randomBytes(32).toString('hex')
        }).save();
      }
      const url = `${config.get('base_url')}employer/${user._id}/verify/${
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
    if (user.companyName === undefined) {
      return res.status(200).send({ user, message: 'detailsDown' });
    }
    res.status(200).send({ user, message: 'detailsUp' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
router.post(
  '/uploadlogo',
  authEmployer,
  uploadImg.single('logo'),
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
router.post(
  '/uploadcompanydetails',
  authEmployer,
  uploadFile.single('companyDetails'),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'raw'
      });
      res.status(200).send({ secure_url: result.secure_url });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error.' });
    }
  }
);
router.post(
  '/uploadjobdesc',
  authEmployer,
  uploadFile.single('jd'),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'raw'
      });
      res.status(200).send({ secure_url: result.secure_url });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error.' });
    }
  }
);
router.get('/users-list', authEmployer, async (req, res) => {
  try {
    const users = await Contractor.find();
    if (users) {
      return res.status(200).send(users);
    }
    res.status(404).send({ message: 'Users not found' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
router.post('/updateemployerdetails', authEmployer, async (req, res) => {
  try {
    const {
      companyName,
      companyAddress,
      recruiterName,
      recruiterDesignation,
      companyUrl,
      companyLogoLink
    } = req.body;
    await Employer.updateOne(
      { _id: req.user._id },
      {
        $set: {
          companyName,
          companyAddress,
          recruiterName,
          recruiterDesignation,
          companyUrl,
          companyLogoLink
        }
      }
    );
    res.status(200).send({ message: 'Successfully updated user data' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
router.post('/post-a-job', authEmployer, async (req, res) => {
  try {
    const {
      jobRole,
      jobSkills,
      salary,
      salaryCurrency,
      jobCategory,
      jobLocation,
      jobIndustry,
      jobContractDuration,
      jobDescriptionLink,
      companyDetailsLink
    } = req.body;
    let job = new Job({
      jobRole,
      jobSkills,
      salary,
      salaryCurrency,
      jobCategory,
      jobLocation,
      jobIndustry,
      jobContractDuration,
      jobDescriptionLink,
      companyDetailsLink,
      postedBy: req.user._id
    });
    await job.save();
    await Employer.updateOne(
      { _id: req.user._id },
      { $push: { postedJobs: mongoose.Types.ObjectId(job._id) } }
    );
    res.status(200).send({ message: 'Job posted Successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
router.get('/get-posted-jobs', authEmployer, async (req, res) => {
  try {
    const jobs = await Job.find({
      postedBy: mongoose.Types.ObjectId(req.user._id)
    });
    if (jobs.length !== 0) {
      return res.status(200).send(jobs);
    }
    res.status(404).send({ message: 'No Jobs Posted.' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
router.get('/:jobId/applicants', authEmployer, async (req, res) => {
  try {
    const results = await Job.findById(req.params.jobId)
      .select('applicantIds')
      .populate(
        'applicantIds',
        'firstName lastName companyName jobType totalExperience relevantExperience expMonSal expMonCurr noticePeriod currentCity resumeLink'
      );
    if (results.applicantIds.length !== 0) {
      return res.status(200).send(results);
    }
    res.status(400).send({ message: 'No Applicants for this Job Post' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});
module.exports = router;
