const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Contractor = require('../models/Contractor');
router.get('/', auth, async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.user.id).select(
      '-password -token'
    );
    res.json(contractor);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('server error');
  }
});
module.exports = router;
