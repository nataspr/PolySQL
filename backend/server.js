const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pool = require('./dbconfig'); // Импорт пула соединений из dbconfig.js

// Импорт маршрутов
const authRoutes = require('./routes/authRoutes');
const theoryRoutes = require('./routes/theoryRoutes');
const practiceRoutes = require('./routes/practiceRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

// Настройка Express
const app = express();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Подключение маршрутов
app.use('/api', authRoutes);
app.use('/api', theoryRoutes);
app.use('/api', practiceRoutes);
app.use('/api', adminRoutes);
app.use('/api', userRoutes);

// Проверка подключения к базе данных
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Database connection successful:', res.rows[0]);
    }
});

// Запуск сервера
const port = process.env.PORT || 5009;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});