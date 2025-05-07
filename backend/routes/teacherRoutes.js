const express = require('express');
const adminController = require('../controllers/teacherController');

const router = express.Router();

router.get('/students', teacherController.getStudents);
router.get('/student-tasks/:userId', teacherController.getStudentTasks);
router.post('/update-tasks', teacherController.updateTasks);

module.exports = router;