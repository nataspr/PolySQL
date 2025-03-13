const express = require('express');
const theoryController = require('../controllers/theoryController');

const router = express.Router();

router.get('/themes', theoryController.getThemes);
router.get('/questions', theoryController.getQuestions);
router.get('/correct-answers', theoryController.getCorrectAnswers);
router.get('/explanations', theoryController.getExplanations); // возврат пояснений к тесту

module.exports = router;