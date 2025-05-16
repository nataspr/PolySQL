require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pool = require('./dbconfig');
const testPool = require('./testdbconfig');

// Импорт маршрутов
const authRoutes = require('./routes/authRoutes');
const theoryRoutes = require('./routes/theoryRoutes');
const practiceRoutes = require('./routes/practiceRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const taskRoutes = require('./routes/taskRoutes');

const { authenticateJWT } = require('./middleware/authMiddleware');

// Настройка Express
const app = express();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Защищенный маршрут Middleware
app.get('/api/protected-route', authenticateJWT, (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
});

// Подключение маршрутов
app.use('/api', authRoutes);
app.use('/api', theoryRoutes);
app.use('/api', practiceRoutes);
app.use('/api', adminRoutes);
app.use('/api', userRoutes);
app.use('/api', teacherRoutes);
app.use('/api', taskRoutes);

// Проверка подключения к базе данных
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Database connection successful:', res.rows[0]);
    }
});

testPool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Database connection successful:', res.rows[0]);
    }
});

// После всех роутов middleware для обработки ошибок
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message,
        error: err.name || "ServerError",
        statusCode: statusCode
    });
});

// Запуск сервера
const port = process.env.PORT || 5009;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});