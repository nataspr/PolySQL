const userService = require('../services/userService');

const getUserProgress = async (req, res) => {
    const user_id = req.cookies.user_id;
    try {
        const progress = await userService.getUserProgress(user_id);
        res.json(progress);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getUserProgress };