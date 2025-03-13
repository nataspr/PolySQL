const express = require('express');
const practiceController = require('../controllers/practiceController');

const router = express.Router();

router.get('/get-practice', practiceController.getPractice);
router.post('/submit-practice', practiceController.submitPractice);
// добавлен маршрут для вставки ответов пользователей на тест
router.post('/submit-answers', practiceController.submitAnswers); 

module.exports = router;