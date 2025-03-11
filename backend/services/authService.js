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

let group_id = '0';

const register = async (login, password, fio, group) => {
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
    

    const insertUserResult = await pool.query(
        'INSERT INTO USERS.USERS (login, password, fio, group_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [login, password, fio, group_id]
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