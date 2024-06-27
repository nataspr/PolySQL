const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./dbconfig');
//создание сервера
const app = express();
const port = 5000;

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
            console.log('Login successful:', result.rows[0]);
            res.status(200).json({ message: 'Login successful', user: result.rows[0] });
            console.info("success: " + JSON.stringify(result));
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
            console.error("failure");
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login' });
    }
});



// Обработка данных из формы регистрации
app.post('/api/register', async (req, res) => {
    const { login, password, fio } = req.body;
    console.log('Received registration data:', login, password, fio);

    try {
        const result = await pool.query(
            'INSERT INTO users.users (login, password, fio) VALUES ($1, $2, $3) RETURNING *',
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