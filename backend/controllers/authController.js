const authService = require('../services/authService');

const login = async (req, res) => {
    const { login, password } = req.body;
    try {
        const result = await authService.login(login, password);
        if (result.success) {
            
            const user = result.user;

            // Очистка всех куков
            res.clearCookie('user_id', { path: '/' });
            res.clearCookie('login', { path: '/' });
            res.clearCookie('fio', { path: '/' });
            res.clearCookie('role_id', { path: '/' });
            res.clearCookie('token', { path: '/' });
            // Установить новые куки, доступные на стороне клиента
            res.cookie('user_id', user.user_id, { path: '/' });
            res.cookie('login', user.login, { path: '/' });
            res.cookie('fio', user.fio, { path: '/' });
            res.cookie('role_id', user.role_id, { path: '/' });
            // Установка токена в cookie
            res.cookie('token', result.token, {
                httpOnly: true, // Защищает от XSS атак
                secure: process.env.NODE_ENV === 'production', // Только HTTPS в production
                sameSite: 'strict', // Защита от CSRF
                maxAge: 2 * 60 * 60 * 1000, // 2 часа в миллисекундах
                path: '/', // Доступен для всех путей
            });

            // Вывод установленных cookies в консоль
            console.log('Cookies set:');
            console.log('user_id:', user.user_id);
            console.log('login:', user.login);
            console.log('fio:', user.fio);
            console.log('role_id:', user.role_id);

            // В ответе возврат токена
            res.status(200).json({ 
                success: true, 
                user,
                token: result.token // Отправить JWT клиенту
            });
        } else {
            res.status(401).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error during login', error: error.message });
    }
};

const register = async (req, res) => {
    // передача в функцию регистрации необходимых данных пользователя
    const { login, password, fio, group } = req.body;
    try {
        const result = await authService.register(login, password, fio, group);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

module.exports = { login, register };