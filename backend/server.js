const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pool = require('./dbconfig');
const Cookies = require("js-cookie");
//создание сервера
const app = express();
const port = 5002;

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
            // Очистка всех куков
            res.clearCookie('user_id', { path: '/' });
            res.clearCookie('login', { path: '/' });
            res.clearCookie('fio', { path: '/' });

            // Установить новые куки, доступные на стороне клиента
            res.cookie('user_id', myUser.user_id, { path: '/' });
            res.cookie('login', myUser.login, { path: '/' });
            res.cookie('fio', myUser.fio, { path: '/' });
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

// Обработка данных для получения списка теории и названия темы
app.get('/api/themes', async (req, res) => {
    const user_id = req.cookies.user_id;

    try {
        const query = `
            WITH user_tasks AS (
                SELECT
                    t.theory_id,
                    t.task_id,
                    ct.complete_flag
                FROM
                     USERS.TASKS t
                LEFT JOIN
                    USERS.COMPLETED_TASKS ct ON t.task_id = ct.task_id AND ct.user_id = $1
            ),
            theory_status AS (
                SELECT
                    theory_id,
                    BOOL_AND(complete_flag) AS is_checked
                FROM
                    user_tasks
                GROUP BY
                    theory_id
            )
            SELECT
                th.theory_id AS id,
                th.theory_name AS name,
                th.text_on_page,
                COALESCE(ts.is_checked, false) AS isChecked
            FROM
                USERS.THEORY th
            LEFT JOIN
                theory_status ts ON th.theory_id = ts.theory_id
            ORDER BY
                th.theory_id;
        `;

        const result = await pool.query(query, [user_id]);
        res.json(result.rows);
    } catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log("Server running on http://localhost:${port}",port);
});
