const userService = require('../services/userService');

const getUserProgress = async (req, res) => {
    const user_id = req.cookies.user_id;
    try {
        const progress = await userService.getUserProgress(user_id);
        console.log('Прогресс, отправляемый клиенту:', progress);
        res.json(progress);
    } catch (err) {
        console.error('Ошибка при получении прогресса:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getUserProgress };