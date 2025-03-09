const pool = require('../dbconfig');

const getThemes = async (user_id) => {
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
    return result.rows;
};

const getQuestions = async (theory_id) => {
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
    return result.rows;
};

const getCorrectAnswers = async (theory_id) => {
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
    return result.rows;
};

module.exports = { getThemes, getQuestions, getCorrectAnswers };