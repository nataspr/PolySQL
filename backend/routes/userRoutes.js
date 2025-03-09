const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/user-progress', userController.getUserProgress);

module.exports = router;