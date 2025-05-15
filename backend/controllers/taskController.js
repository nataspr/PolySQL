const taskService = require('../services/taskService');

const validateSolution = async (req, res) => {
  try {
    const { taskId, query } = req.body;
    //const userId = req.user.userId;
    const userId = req.cookies.user_id;

    const result = await taskService.evaluateSolution({
      userId,
      taskId,
      sqlQuery: query
    });

    // Форматируем подробные результаты для клиента
    const formattedResult = {
      isComplete: result.isComplete,
      score: result.score,
      status: result.status,
      message: result.resultText, // Используем resultText как основное сообщение
      details: {
        checks: result.checks,
        detailedChecks: result.detailedChecks
      }
    };

    res.json({
      success: true,
      message: result.isComplete ? 'Задание выполнено успешно!' : 'Задание требует доработки',
      result: formattedResult
    });
  } catch (error) {
    console.error('Solution validation error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Ошибка при проверке решения',
      details: error.message 
    });
  }
};

module.exports = { validateSolution };