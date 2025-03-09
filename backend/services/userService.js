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
        )
        SELECT 
            (SELECT COUNT(*) FROM USERS.THEORY) AS total_theories,
            (SELECT COUNT(*) FROM completed_theories) AS completed_theories
    `;

    const result = await pool.query(query, [user_id]);
    const { total_theories, completed_theories } = result.rows[0];
    const progress = (completed_theories / total_theories) * 100;

    return { total_theories, completed_theories, progress };
};

module.exports = { getUserProgress };