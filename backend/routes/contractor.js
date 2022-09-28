const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Contractor Router'));
module.exports = router;
