const practiceService = require('../services/practiceService');

const getPractice = async (req, res) => {
    const theory_id = req.cookies.theory_id;
    try {
        const practice = await practiceService.getPractice(theory_id);
        res.json(practice);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const submitPractice = async (req, res) => {
    const { answers } = req.body;
    const theory_id = req.cookies.theory_id;
    const user_id = req.cookies.user_id;

    try {
        const result = await practiceService.submitPractice(answers, theory_id, user_id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getPractice, submitPractice };