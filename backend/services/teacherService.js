const pool = require('../dbconfig');

const getAllStudents = async () => {
    const query = `
        SELECT u.user_id, u.fio, u.login, u.role_id, g.group_name
        FROM USERS.USERS u
        LEFT JOIN USERS.GROUPS g ON u.group_id = g.group_id
        WHERE u.role_id = 2;
    `;
    const result = await pool.query(query);
    return result.rows;
};

const getStudentPractices = async (userId) => {
    const query = `
        SELECT 
            cp.user_id,
            p.practice_id,
            p.practice_name,
            p.practice_text,
            cp.student_answer,
            cp.teacher_comment,
            cp.complete_flag
        FROM USERS.COMPLETED_PRACTICES cp
        JOIN USERS.PRACTICE p ON cp.practice_id = p.practice_id
        WHERE cp.user_id = $1;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
};

const updateStudentPractices = async (userId, tasks) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        for (const task of tasks) {
            const updateQuery = `
                UPDATE USERS.COMPLETED_PRACTICES
                SET 
                    teacher_comment = $1,
                    complete_flag = $2
                WHERE user_id = $3 AND practice_id = $4;
            `;
            await client.query(updateQuery, [
                task.teacher_comment,
                task.complete_flag,
                userId,
                task.practice_id
            ]);
        }
        
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    getAllStudents,
    getStudentPractices,
    updateStudentPractices
};