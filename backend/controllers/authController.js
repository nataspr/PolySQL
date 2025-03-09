const authService = require('../services/authService');

const login = async (req, res) => {
    const { login, password } = req.body;
    try {
        const result = await authService.login(login, password);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(401).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error during login' });
    }
};

const register = async (req, res) => {
    const { login, password, fio } = req.body;
    try {
        const result = await authService.register(login, password, fio);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

module.exports = { login, register };