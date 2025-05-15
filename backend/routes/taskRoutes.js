const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/submit-solution', taskController.validateSolution);

module.exports = router;