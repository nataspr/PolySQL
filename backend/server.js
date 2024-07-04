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

//вывод из базы вопросов теста для определенной темы и ответов к ним
// Добавление маршрута для получения вопросов и ответов по theory_id
app.get('/api/questions/', async (req, res) => {
    const theory_id = req.cookies.theory_id;

    try {
        const query = `
            SELECT 
                t.theory_id, 
                t.task_id, 
                t.task_text, 
                array_agg(a.answer) AS answers
            FROM 
                USERS.TASKS t
            LEFT JOIN 
                USERS.ANSWERS a ON t.task_id = a.task_id
            WHERE 
                t.theory_id = $1
            GROUP BY 
                t.theory_id, t.task_id, t.task_text;
        `;

        const result = await pool.query(query, [theory_id]);
        console.log(result);
        res.json(result.rows);
    } catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//вывод правильного ответа в зависимости от темы
// Добавление маршрута для получения списка правильных ответов по theory_id
app.get('/api/correct-answers/', async (req, res) => {
    const theory_id = req.cookies.theory_id;

    try {
        const query = `
            SELECT 
                t.theory_id, 
                t.task_id, 
                t.task_text, 
                array_agg(ca.correct_answer) AS correct_answers
            FROM 
                USERS.TASKS t
            LEFT JOIN 
                USERS.CORRECT_ANSWERS ca ON t.task_id = ca.task_id
            WHERE 
                t.theory_id = $1
            GROUP BY 
                t.theory_id, t.task_id, t.task_text;
        `;

        const result = await pool.query(query, [theory_id]);
        res.json(result.rows);
    } catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Добавление маршрута для обработки ответов пользователя
app.post('/api/submit-answers', async (req, res) => {
    const { answers } = req.body;
    const theory_id = req.cookies.theory_id;
    const user_id = req.cookies.user_id;

    try {
        const query = `
            SELECT 
                t.task_id, 
                array_agg(ca.correct_answer) AS correct_answers
            FROM 
                USERS.TASKS t
            LEFT JOIN 
                USERS.CORRECT_ANSWERS ca ON t.task_id = ca.task_id
            WHERE 
                t.theory_id = $1
            GROUP BY 
                t.task_id;
        `;

        const result = await pool.query(query, [theory_id]);

        const correctAnswers = result.rows.reduce((acc, row) => {
            acc[row.task_id] = row.correct_answers;
            return acc;
        }, {});

        const userResults = answers.map(answer => {
            const isCorrect = correctAnswers[answer.task_id].some(correctAnswer => correctAnswer === answer.answer);
            return {
                task_id: answer.task_id,
                user_answer: answer.answer,
                correct: isCorrect
            };
        });

        const totalQuestions = userResults.length;
        const correctAnswersCount = userResults.filter(result => result.correct).length;

        // Вставляем или обновляем результаты для каждого вопроса
        const updateQueries = userResults.map(result => {
            return pool.query(`
                INSERT INTO USERS.COMPLETED_TASKS (user_id, task_id, complete_flag)
                VALUES ($1, $2, $3)
                ON CONFLICT (user_id, task_id) DO UPDATE SET complete_flag = $3;
            `, [user_id, result.task_id, result.correct]);
        });

        await Promise.all(updateQueries);

        res.json({ totalQuestions, correctAnswersCount });
    } catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//вывод сформулированных заданий по практике
app.get('/api/get-practice-text', async (req, res) => {
    const theory_id = req.cookies.theory_id;

    if (!theory_id) {
        return res.status(400).json({ error: 'Theory ID not found in cookies' });
    }

    try {
        const query = `
            SELECT 
                p.practice_id,
                p.practice_text,
                p.theory_id
            FROM 
                USERS.PRACTICE p
            WHERE 
                p.theory_id = $1;
        `;
        const result = await pool.query(query, [theory_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Practice text not found for theory ID' });
        }

        const practices = result.rows.map(row => ({
            practice_id: row.practice_id,
            practice_text: row.practice_text,
            theory_id: row.theory_id
        }));

        res.json({ practices });
        // const practiceText = result.rows[0].practice_text;
        // res.json({ practiceText });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log("Server running on http://localhost:${port}",port);
});
