const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pool = require('./dbconfig');
//создание сервера
const app = express();
const port = 5000;

//подключение к приложени.
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Увеличиваем лимит размера тела запроса
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

//API роутеры
// Обработка данных из формы входа
app.post('/api/login', async (req, res) => {
    const { login, password } = req.body;
    console.log('Received login data:', login, password);

    try {
        const result = await pool.query(
            'SELECT * FROM USERS.USERS WHERE login = $1 AND password = $2',
            [login, password]
        );

        if (result.rows.length > 0) {
            const user = result.rows[0];
            console.log('Login successful:', user);

            const myUserResult = await pool.query(
                'SELECT user_id, login, fio FROM USERS.USERS WHERE login = $1 AND password = $2',
                [login, password]
            );
            const myUser = myUserResult.rows[0];

            // Установить cookies, которе не видны для пользователя
            res.cookie('user_id', myUser.user_id, { httpOnly: true });
            res.cookie('login', myUser.login, { httpOnly: true });
            res.cookie('fio', myUser.fio, { httpOnly: true });
            // Вывод установленных cookies в консоль
            console.log('Cookies set:');
            console.log('user_id:', myUser.user_id);
            console.log('login:', myUser.login);
            console.log('fio:', myUser.fio);

            res.status(200).json({ success: true, user });
            //res.status(200).json({ message: 'Login successful', user });
            console.info("success: " + JSON.stringify(result));
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            //res.status(401).json({ message: 'Invalid credentials' });
            console.error("failure");
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Error during login' });
        //res.status(500).json({ message: 'Error during login' });
    }
});


// Обработка данных из формы регистрации
app.post('/api/register', async (req, res) => {
    const { login, password, fio } = req.body;
    console.log('Received registration data:', login, password, fio);

    try {
        // Проверка, существует ли пользователь с таким логином
        //TODO вернуть сообщение о невозможности логина на страницу
        const checkUser = await pool.query('SELECT * FROM USERS.USERS WHERE login = $1', [login]);
        if (checkUser.rows.length > 0) {
            res.status(409).json({ message: 'User with this login already exists' });
            return;
        }

        // Вставка нового пользователя
        const result = await pool.query(
            'INSERT INTO USERS.USERS (login, password, fio) VALUES ($1, $2, $3) RETURNING *',
            [login, password, fio]
        );
        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.listen(port, () => {
    console.log("Server running on http://localhost:${port}",port);
});