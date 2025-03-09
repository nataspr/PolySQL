const pool = require('../dbconfig');

const login = async (login, password) => {
    const result = await pool.query(
        'SELECT * FROM USERS.USERS WHERE login = $1 AND password = $2',
        [login, password]
    );

    if (result.rows.length > 0) {
        const user = result.rows[0];
        return { success: true, user };
    } else {
        return { success: false, message: 'Invalid credentials' };
    }
};

const register = async (login, password, fio) => {
    const checkUser = await pool.query('SELECT * FROM USERS.USERS WHERE login = $1', [login]);
    if (checkUser.rows.length > 0) {
        throw new Error('User with this login already exists');
    }

    const insertUserResult = await pool.query(
        'INSERT INTO USERS.USERS (login, password, fio) VALUES ($1, $2, $3) RETURNING *',
        [login, password, fio]
    );
    const newUser = insertUserResult.rows[0];

    await pool.query(
        'INSERT INTO USERS.COMPLETED_TASKS (user_id, task_id) ' +
        'SELECT $1, t.task_id ' +
        'FROM USERS.TASKS t',
        [newUser.user_id]
    );

    return { message: 'User registered successfully', user: newUser };
};

module.exports = { login, register };