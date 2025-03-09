const express = require('express');
const practiceController = require('../controllers/practiceController');

const router = express.Router();

router.get('/get-practice', practiceController.getPractice);
router.post('/submit-practice', practiceController.submitPractice);

module.exports = router;