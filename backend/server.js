// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('dbconfig');
//создание сервера
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { login, password, fio } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO users (login, password, fio) VALUES ($1, $2, $3) RETURNING *',
            [login, password, fio]
        );
        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});