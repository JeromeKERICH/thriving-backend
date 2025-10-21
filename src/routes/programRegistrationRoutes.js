const express = require('express');
const router = express.Router();
const { registerProgram } = require('../controllers/programRegistrationController');

router.post('/', registerProgram);

module.exports = router;
