const theoryService = require('../services/theoryService');

const getThemes = async (req, res) => {
    const user_id = req.cookies.user_id;
    try {
        const themes = await theoryService.getThemes(user_id);
        res.json(themes);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getQuestions = async (req, res) => {
    const theory_id = req.cookies.theory_id;
    try {
        const questions = await theoryService.getQuestions(theory_id);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCorrectAnswers = async (req, res) => {
    const theory_id = req.cookies.theory_id;
    try {
        const correctAnswers = await theoryService.getCorrectAnswers(theory_id);
        res.json(correctAnswers);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getExplanations = async (req, res) => {
    try {
        const explanations = await theoryService.getExplanations();
        res.json(explanations);
    } catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getThemes, getQuestions, getCorrectAnswers, getExplanations };