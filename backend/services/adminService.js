const pool = require('../dbconfig');

const addData = async (formType, data) => {
    switch (formType) {
        case 'Новая тема':
            await pool.query(
                'INSERT INTO USERS.THEORY (theory_name, text_on_page) VALUES ($1, $2)',
                [data.themeName, data.theoryText]
            );
            break;
        case 'Новый вопрос':
            const theoryResult = await pool.query(
                'SELECT theory_id FROM USERS.THEORY WHERE theory_name = $1',
                [data.themeName]
            );
            if (theoryResult.rows.length > 0) {
                const theory_id = theoryResult.rows[0].theory_id;
                const taskResult = await pool.query(
                    'INSERT INTO USERS.TASKS (task_text, theory_id) VALUES ($1, $2) RETURNING task_id',
                    [data.questionText, theory_id]
                );
                const task_id = taskResult.rows[0].task_id;
                await pool.query(
                    'INSERT INTO USERS.CORRECT_ANSWERS (correct_answer, task_id) VALUES ($1, $2)',
                    [data.correctAnswer, task_id]
                );
                const answers = data.answerOptions.split(',').map(answer => answer.trim());
                await Promise.all(answers.map(answer =>
                    pool.query('INSERT INTO USERS.ANSWERS (answer, task_id) VALUES ($1, $2)', [answer, task_id])
                ));
            } else {
                throw new Error('Theory not found');
            }
            break;
        case 'Новое задание':
            const theoryResultTask = await pool.query(
                'SELECT theory_id FROM USERS.THEORY WHERE theory_name = $1',
                [data.themeName]
            );
            if (theoryResultTask.rows.length > 0) {
                const theory_id_task = theoryResultTask.rows[0].theory_id;
                await pool.query(
                    'INSERT INTO USERS.PRACTICE (practice_name, practice_text, theory_id) VALUES ($1, $2, $3)',
                    [data.taskName, data.taskText, theory_id_task]
                );
            } else {
                throw new Error('Theory not found');
            }
            break;
        default:
            throw new Error('Invalid form type');
    }
};

const getRolesPanel = async () => {
    const query = `
        SELECT
            u.fio as fio,
            u.login as login,
            r.role_name as role
        FROM
            USERS.USERS u
        LEFT JOIN
            USERS.ROLES r ON u.role_id = r.role_id
        WHERE 
            r.role_id <> 1
        ORDER BY
            u.fio;
    `;

    const result = await pool.query(query);
    return result.rows;
};

const getRolesList = async () => {
    const query = `
        SELECT role_name as role
        FROM USERS.ROLES 
    `;

    const result = await pool.query(query);
    return result.rows;
};

const updateRoles = async (updatedRoles) => {
    const queries = Object.keys(updatedRoles).map(login => {
        const role = updatedRoles[login];
        return pool.query(`
            UPDATE USERS.USERS
            SET role_id = (SELECT role_id FROM USERS.ROLES WHERE role_name = $1)
            WHERE login = $2
        `, [role, login]);
    });

    await Promise.all(queries);
};

module.exports = { addData, getRolesPanel, getRolesList, updateRoles };