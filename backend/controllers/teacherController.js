const teacherService = require('../services/teacherService');

const getStudents = async (req, res) => {
    try {
        const students = await teacherService.getAllStudents();
        res.json(students);
    } catch (error) {
        console.error('Error getting students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getStudentTasks = async (req, res) => {
    try {
        const userId = req.params.userId;
        const tasks = await teacherService.getStudentPractices(userId);
        res.json(tasks);
    } catch (error) {
        console.error('Error getting student tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateTasks = async (req, res) => {
    try {
        const { user_id, tasks } = req.body;
        await teacherService.updateStudentPractices(user_id, tasks);
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getStudents, getStudentTasks, updateTasks };