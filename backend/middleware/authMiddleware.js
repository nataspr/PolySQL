const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
    // Проверить токен из заголовка Authorization
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                // Если токен невалиден, проверить cookies (старая система)
                return checkCookies(req, res, next);
            }
            
            // Если токен валиден, добавить пользователя в запрос
            req.user = user;
            next();
        });
    } else {
        // Если нет токена, проверить cookies
        checkCookies(req, res, next);
    }
};

const checkCookies = (req, res, next) => {
    // Старая проверка через cookies
    if (req.cookies.user_id) {
        req.user = {
            userId: req.cookies.user_id,
            login: req.cookies.login,
            roleId: req.cookies.role_id
        };
        return next();
    }
    
    return res.status(401).json({ message: 'Unauthorized' });
};

module.exports = { authenticateJWT };