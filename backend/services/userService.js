const pool = require('../dbconfig');

const getUserProgress = async (user_id) => {
    const query = `
        WITH completed_theories AS (
            SELECT t.theory_id
            FROM USERS.THEORY t
            JOIN USERS.TASKS ta ON t.theory_id = ta.theory_id
            LEFT JOIN USERS.COMPLETED_TASKS ct ON ta.task_id = ct.task_id AND ct.user_id = $1
            GROUP BY t.theory_id
            HAVING COUNT(ta.task_id) = COUNT(ct.complete_flag) AND BOOL_AND(ct.complete_flag)
        ),
        completed_practices AS (
            SELECT cp.practice_id
    		FROM USERS.COMPLETED_PRACTICES cp
    		WHERE cp.user_id = $1 AND cp.complete_flag = true
        )
        SELECT 
            (SELECT COUNT(*) FROM USERS.THEORY) AS total_theories,
            (SELECT COUNT(*) FROM completed_theories) AS completed_theories,
            (SELECT COUNT(*) FROM completed_practices) AS completed_practices
    `;

    const result = await pool.query(query, [user_id]);
    console.log('Результат из базы:', result.rows[0]);
    const { total_theories, completed_theories, completed_practices } = result.rows[0];
    const progress = (completed_theories / total_theories) * 100;

    return { total_theories, completed_theories, completed_practices, progress };
};

module.exports = { getUserProgress };