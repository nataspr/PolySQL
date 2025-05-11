const pool = require('../dbconfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // для работы с JWT

// Секретный ключ в конфигурации
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

const login = async (login, password) => {
    const result = await pool.query(
        'SELECT * FROM USERS.USERS WHERE login = $1',
        [login]
    );

    if (result.rows.length === 0) {
        return { success: false, message: 'Invalid credentials' };
    }

    const user = result.rows[0]; // такой пользователь существует
    
    // Проверка пароля с bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return { success: false, message: 'Invalid credentials' };
    }

    // Генерация JWT токена
    const token = jwt.sign(
        { 
            userId: user.user_id,
            login: user.login,
            roleId: user.role_id 
        },
        JWT_SECRET,
        { expiresIn: '2h' } // время жизни ключа - 2 часа
    );

    return { 
        success: true, 
        user,
        token // Добавляем токен в ответ
    };
};

let group_id = '0';

const register = async (login, password, fio, group) => {
    const client = await mainPool.connect();
    try {
        await client.query('BEGIN');

        const checkUser = await pool.query('SELECT * FROM USERS.USERS WHERE login = $1', [login]);
        if (checkUser.rows.length > 0) {
            throw new Error('User with this login already exists');
        }

        // добавлена проверка группы, если такая группа существует в базе, то студент может в нее записаться, если нет, то это ошибка
        const checkGroup = await pool.query('SELECT * FROM USERS.GROUPS WHERE group_name = $1', [group]);
        if (checkGroup.rows.length === 0)
        {
            throw new Error('Such group does not exist');
        }

        // получение id группы
        const groupResult = await pool.query('SELECT group_id FROM USERS.GROUPS WHERE group_name = $1', [group]);
        group_id = groupResult.rows[0].group_id;
        
        // Хеширование пароля перед сохранением
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const insertUserResult = await pool.query(
            'INSERT INTO USERS.USERS (login, password, fio, group_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [login, hashedPassword, fio, group_id]
        );
        const newUser = insertUserResult.rows[0];

        // заполнение значениями по умолчанию тестовых ответов
        await pool.query(
            'INSERT INTO USERS.COMPLETED_TASKS (user_id, task_id) ' +
            'SELECT $1, t.task_id ' +
            'FROM USERS.TASKS t',
            [newUser.user_id]
        );

        // заполнение значениями по умолчанию практических ответов
        await pool.query(
            'INSERT INTO USERS.COMPLETED_PRACTICES (user_id, practice_id) ' +
            'SELECT $1, p.practice_id ' +
            'FROM USERS.PRACTICE p',
            [newUser.user_id]
        );
        await client.query('COMMIT');

        // Генерация JWT для нового пользователя
        const token = jwt.sign(
            { 
                userId: newUser.user_id,
                login: newUser.login,
                roleId: newUser.role_id 
            },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        return { message: 'User registered successfully', user: newUser, token };
    }catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = { login, register };