const pool = require('../dbconfig');

const getPractice = async (theory_id) => {
    const query = `
        SELECT 
            p.practice_id,
            p.practice_text,
            p.practice_name,
            p.comment,
            p.theory_id
        FROM 
            USERS.PRACTICE p
        WHERE 
            p.theory_id = $1;
    `;

    const result = await pool.query(query, [theory_id]);
    console.log(result.rows); // Логируем результат
    return result.rows;
};

const submitPractice = async (answers, theory_id, user_id) => {
    const query = `
        SELECT 
            t.task_id, 
            array_agg(ca.correct_answer) AS correct_answers
        FROM 
            USERS.TASKS t
        LEFT JOIN 
            USERS.CORRECT_ANSWERS ca ON t.task_id = ca.task_id
        WHERE 
            t.theory_id = $1
        GROUP BY 
            t.task_id;
    `;

    const result = await pool.query(query, [theory_id]);

    const correctAnswers = result.rows.reduce((acc, row) => {
        acc[row.task_id] = row.correct_answers;
        return acc;
    }, {});

    const userResults = answers.map(answer => {
        const isCorrect = correctAnswers[answer.task_id].some(correctAnswer => correctAnswer === answer.answer);
        return {
            task_id: answer.task_id,
            user_answer: answer.user_answer,
            correct: isCorrect
        };
    });

    const totalQuestions = userResults.length;
    const correctAnswersCount = userResults.filter(result => result.correct).length;

    const updateQueries = userResults.map(result => {
        return pool.query(`
            INSERT INTO USERS.COMPLETED_TASKS (user_id, task_id, complete_flag)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, task_id) DO UPDATE SET complete_flag = $3;
        `, [user_id, result.task_id, result.correct]);
    });

    await Promise.all(updateQueries);

    return { totalQuestions, correctAnswersCount, correctAnswers };
};

// функция вставки ответов пользователя на тесты
const submitAnswers = async (answers, theory_id, user_id) => {
    const query = `
        SELECT 
            t.task_id, 
            array_agg(ca.correct_answer) AS correct_answers
        FROM 
            USERS.TASKS t
        LEFT JOIN 
            USERS.CORRECT_ANSWERS ca ON t.task_id = ca.task_id
        WHERE 
            t.theory_id = $1
        GROUP BY 
            t.task_id;
    `;

    const result = await pool.query(query, [theory_id]);
    // проверка на отсутствие верного результата теста
    if (!result.rows || result.rows.length === 0) {
        throw new Error('No correct answers found for the given theory_id (test)');
    }

    const correctAnswers = result.rows.reduce((acc, row) => {
        acc[row.task_id] = row.correct_answers;
        return acc;
    }, {});

    // Проверка данных
    if (!answers || !Array.isArray(answers)) {
        throw new Error("Invalid answers format");
    }

    const userResults = answers.map(answer => {
        // Проверяем, что task_id и answer существуют
        if (answer.task_id === undefined || answer.answer === undefined) {
            console.error("Invalid answer data:", answer);
            throw new Error("Missing task_id or answer");
        }

        // Преобразуем task_id в число
        const task_id = Number(answer.task_id);
        const correctAnswersForTask = correctAnswers[task_id] || [];

        // Проверяем, есть ли ответ в списке правильных
        const isCorrect = correctAnswersForTask.includes(answer.answer.trim());

        return {
            task_id: task_id,
            user_answer: answer.answer,
            correct: isCorrect
        };
    });

    // console.log("Updating tasks:", userResults);

    const totalQuestions = userResults.length;
    const correctAnswersCount = userResults.filter(result => result.correct).length;

    // console.log('Updating task:', result.task_id, 'for user:', user_id, 'with correct:', result.correct); 

    const updateQueries = userResults.map(result => {
        return pool.query(`
            INSERT INTO USERS.COMPLETED_TASKS (user_id, task_id, complete_flag)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, task_id) DO UPDATE SET complete_flag = $3;
        `, [user_id, result.task_id, result.correct]);
    });

    await Promise.all(updateQueries);

    return { totalQuestions, correctAnswersCount, correctAnswers };
};

module.exports = { getPractice, submitPractice, submitAnswers };
