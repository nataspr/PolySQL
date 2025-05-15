const pool = require('../dbconfig');
const testPool = require('../testdbconfig');
const { parse } = require('pgsql-ast-parser');
const levenshtein = require('fast-levenshtein');

/**
 * Вспомогательные функции вынесены наружу,
 * чтобы избежать проблем с this внутри методов
 */

// Сравнение двух узлов AST с глубокой рекурсией
function compareNodesDeep(n1, n2) {
  if (!n1 || !n2 || typeof n1 !== 'object' || typeof n2 !== 'object') return false;

  const keys1 = Object.keys(n1).sort();
  const keys2 = Object.keys(n2).sort();
  if (keys1.length !== keys2.length) return false;
  if (!keys1.every((k, i) => k === keys2[i])) return false;

  for (const key of keys1) {
    const v1 = n1[key];
    const v2 = n2[key];

    if (typeof v1 === 'object' && typeof v2 === 'object') {
      if (Array.isArray(v1) && Array.isArray(v2)) {
        if (v1.length !== v2.length) return false;
        for (let i = 0; i < v1.length; i++) {
          if (!compareNodesDeep(v1[i], v2[i])) return false;
        }
      } else if (!compareNodesDeep(v1, v2)) {
        return false;
      }
    } else if (v1 !== v2) {
      return false;
    }
  }
  return true;
}

// Извлечение дочерних узлов из AST-узла
function extractChildren(node) {
  if (!node || typeof node !== 'object') return [];

  const children = [];
  for (const key of Object.keys(node)) {
    const value = node[key];
    if (Array.isArray(value)) {
      value.forEach(v => {
        if (typeof v === 'object' && v !== null) {
          children.push(v);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      children.push(value);
    }
  }
  return children;
}

// Проверка, содержит ли запрос только SELECT
function isSelectOnly(sql) {
  // Убираем комментарии и пробелы
  const normalized = sql.replace(/--.*?\n|\/\*.*?\*\//g, '').trim();
  // Проверяем, что запрос начинается с SELECT и не содержит опасных операторов
  return /^select\b/i.test(normalized) &&
         !/(insert|update|delete|create|alter|drop|truncate)\b/i.test(normalized);
}

// Форматирование результата проверки в читаемую строку
function formatCheckResult(checkName, checkResult) {
  if (checkResult.message) return `${checkName}: ${checkResult.message}`;

  const percentage = checkResult.similarity !== undefined ?
    Math.round(checkResult.similarity * 100) :
    (checkResult.isValid ? 100 : 0);

  const status = checkResult.isValid ? 'зачет' : 'незачет';

  return `${checkName}: ${status} (${percentage}%)`;
}

// Расчет итогового балла с учетом всех проверок
function calculateScore(syntax, semantic, performance, data) {
  let score = 0;
  if (syntax.isValid) score += 20;    // 20% за синтаксис
  if (semantic.isValid) score += 30;  // 30% за семантику
  if (data.isValid) score += 30;      // 30% за данные
  if (performance.isValid) score += 20; // 20% за производительность
  return score;
}

// Синтаксическая проверка с метрикой Левенштейна
async function checkSyntaxWithLevenshtein(userSql, referenceSql) {
  try {
  // Нормализация строк
    const normalizedUser = userSql.toLowerCase().replace(/\s+/g, '');
    const normalizedRef = referenceSql.toLowerCase().replace(/\s+/g, '');
	// Расчет расстояния Левенштейна -минимальное количество операций (вставка, удаление, замена)
    const distance = levenshtein.get(normalizedUser, normalizedRef);
	// Расчет схожести - 1 - (расстояние / максимальная длина)
    const maxLength = Math.max(normalizedUser.length, normalizedRef.length);
    const similarity = 1 - (distance / maxLength);
	
    const syntaxThreshold = 0.6; // Порог похожести
    
	return {
      isValid: similarity >= syntaxThreshold,
      similarity,
      distance,
      normalizedUser,
      normalizedRef
    };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
}

// Семантический анализ с обходом AST
async function checkSemanticsWithAST(userSql, referenceSql) {
  try {
    // Парсим SQL в AST-деревья
    const userAst = parse(userSql);
    const refAst = parse(referenceSql);
    // Сравниваем AST в ширину
    const { totalNodes, matchedNodes } = compareASTBreadthFirst(userAst, refAst);
    const similarity = matchedNodes / totalNodes;
    const semanticThreshold = 0.7; // Порог похожести
    return {
      isValid: similarity >= semanticThreshold,
      similarity,
      totalNodes,
      matchedNodes,
      userAst,
      refAst
    };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
}

// Обход AST в ширину и сравнение узлов
function compareASTBreadthFirst(ast1, ast2) {
  let totalNodes = 0;
  let matchedNodes = 0;

  const queue1 = Array.isArray(ast1) ? [...ast1] : [ast1];
  const queue2 = Array.isArray(ast2) ? [...ast2] : [ast2];

  while (queue1.length > 0 && queue2.length > 0) {
    const node1 = queue1.shift();
    const node2 = queue2.shift();
    totalNodes++;

    if (compareNodesDeep(node1, node2)) {
      matchedNodes++;

      const children1 = extractChildren(node1);
      const children2 = extractChildren(node2);

      queue1.push(...children1);
      queue2.push(...children2);
    }
  }

  // Добавляем оставшиеся узлы в очередях как несовпадения
  totalNodes += queue1.length + queue2.length;

  return { totalNodes, matchedNodes };
}

/**
 * Основной объект с методами сервиса для проверки решений
 */
const taskService = {
  // Основная функция проверки решения
  async evaluateSolution({ userId, taskId, sqlQuery }) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Проверка на опасные конструкции в запросе
      const dangerCheck = taskService.isQueryDangerous(sqlQuery);
      if (dangerCheck.isDangerous) {
        if (dangerCheck.reason === 'invalid_chars') {
          throw new Error('Запрос содержит запрещенные символы');
        }
		// Если есть опасные SQL конструкции, но нет запрещенных символов
        return taskService.handleDangerousQuery(sqlQuery, userId, taskId, dangerCheck);
      }

      // Получение эталонного ответа из базы
      const reference = await taskService.getReferenceSolution(taskId);

      // Синтаксическая проверка
      const syntaxCheck = await checkSyntaxWithLevenshtein(sqlQuery, reference.correct_answer);
      // Семантическая проверка
      const semanticCheck = await checkSemanticsWithAST(sqlQuery, reference.correct_answer);

      // Проверки производительности и данных пропускаются, если запрос не SELECT
      let performanceCheck = { isValid: true, message: 'Проверка производительности пропущена (запрос содержит только SELECT)' };
      let dataCheck = { isValid: true, message: 'Проверка данных пропущена (запрос содержит только SELECT)' };

      // Если запрос только SELECT, то делаем дополнительные проверки
      if (isSelectOnly(sqlQuery)) {
        performanceCheck = await taskService.checkPerformance(sqlQuery, reference.correct_answer);
        dataCheck = await taskService.checkDataSelection(sqlQuery, reference.correct_answer);
      }

      // Результаты проверок в читаемом виде
      const checkResults = [
        formatCheckResult('Синтаксическая проверка', syntaxCheck),
        formatCheckResult('Семантическая проверка', semanticCheck),
        formatCheckResult('Проверка производительности', performanceCheck),
        formatCheckResult('Проверка данных', dataCheck)
      ];

      // Расчет итогового балла и статус завершения
      const score = calculateScore(syntaxCheck, semanticCheck, performanceCheck, dataCheck);
      const isComplete = score >= 60; // Порог прохождения 60%

      // Формируем итоговое сообщение для базы и клиента
      const resultText = checkResults.join('\n') + `\nИтоговый балл: ${score}%`;

      // Обновление результата студента в базе
      await taskService.updateCompletionStatus(client, userId, taskId, sqlQuery, isComplete, resultText);

      await client.query('COMMIT');

      return {
        status: isComplete ? 'success' : 'incorrect',
        score,
        checks: checkResults,
        isComplete,
        resultText
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Проверка на опасные SQL-конструкции
  isQueryDangerous(sql) {
  // 1. Запрещенные символы (кроме точки с запятой)
    const forbiddenChars = /["\\\x00-\x1F\x7F]/;
    if (forbiddenChars.test(sql)) {
      return {
        isDangerous: true,
        reason: 'invalid_chars',
        message: 'Обнаружены запрещенные символы в запросе'
      };
    }

    const dangerousPatterns = [
      { pattern: /(alter\s+table|create\s+table|drop\s+table|truncate\s+table)/i, level: 'high' },
      { pattern: /(create\s+database|drop\s+database|create\s+user|drop\s+user)/i, level: 'high' },
      { pattern: /(insert\s+into|update\s+.+\s+set|delete\s+from)/i, level: 'medium' },
      { pattern: /(create\s+function|create\s+procedure|create\s+trigger)/i, level: 'high' },
      { pattern: /(pg_exec|pg_sleep|system|exec|\bcmd\b)/i, level: 'high' }
    ];

    const dangerousConstruct = dangerousPatterns.find(p => p.pattern.test(sql));
    if (dangerousConstruct) {
      return {
        isDangerous: true,
        reason: 'dangerous_sql',
        level: dangerousConstruct.level,
        construct: sql.match(dangerousConstruct.pattern)[0],
        message: `Обнаружена опасная SQL конструкция: ${dangerousConstruct.pattern.toString()}`
      };
    }

    return { isDangerous: false };
  },

  // Обработка опасных запросов (отдельная логика)
  async handleDangerousQuery(sqlQuery, userId, taskId, dangerCheck) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Если в запросе запрещённые символы - ручная проверка
      if (dangerCheck.reason === 'invalid_chars') {
        await taskService.updateCompletionStatus(client, userId, taskId, false, 0);
        await client.query('COMMIT');
        return {
          status: 'manual_check_required',
          score: 0,
          checks: ['Запрос содержит запрещенные символы и требует ручной проверки'],
          isComplete: false
        };
      }

      // Получаем эталонный запрос
      const reference = await taskService.getReferenceSolution(taskId);

      // Выполняем синтаксическую и семантическую проверку
      const syntaxCheck = await checkSyntaxWithLevenshtein(sqlQuery, reference.correct_answer);
      const semanticCheck = await checkSemanticsWithAST(sqlQuery, reference.correct_answer);

      // Формируем базовые результаты
      const checkResults = [
        formatCheckResult('Синтаксическая проверка', syntaxCheck),
        formatCheckResult('Семантическая проверка', semanticCheck)
      ];

      // Проверяем дополнительные параметры, если запрос SELECT
      let performanceCheck = { isValid: true, score: 100, message: 'Проверка производительности пропущена (опасный запрос)' };
      let dataCheck = { isValid: true, score: 100, message: 'Проверка данных пропущена (опасный запрос)' };

      if (isSelectOnly(sqlQuery)) {
        performanceCheck = await taskService.checkPerformance(sqlQuery, reference.correct_answer);
        dataCheck = await taskService.checkDataSelection(sqlQuery, reference.correct_answer);

        checkResults.push(
          formatCheckResult('Проверка производительности', performanceCheck),
          formatCheckResult('Проверка данных', dataCheck)
        );
      } else {
        checkResults.push(performanceCheck.message, dataCheck.message);
      }

      // Расчет итогового балла и статус завершения
      const totalScore = calculateScore(syntaxCheck, semanticCheck, performanceCheck, dataCheck);
      const isComplete = totalScore >= 60;

      // Обновляем статус выполнения
      await taskService.updateCompletionStatus(client, userId, taskId, isComplete, totalScore);
      await client.query('COMMIT');

      // Формируем статусное сообщение
      const statusMessage = isComplete
        ? 'Задание выполнено (общий балл: ' + totalScore + '%)'
        : 'Задание не выполнено (общий балл: ' + totalScore + '%)';

      return {
        status: isComplete ? 'success' : 'incorrect',
        score: totalScore,
        checks: checkResults,
        message: statusMessage,
        isComplete,
        detailedChecks: {
          syntax: syntaxCheck,
          semantics: semanticCheck,
          performance: performanceCheck,
          data: dataCheck,
          dangerCheck
        }
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Проверка производительности запроса с помощью EXPLAIN ANALYZE
  async checkPerformance(userSql, referenceSql) {
    try {
      const startUser = Date.now();
      await testPool.query('EXPLAIN ANALYZE ' + userSql);
      const userTime = Date.now() - startUser;

      const startRef = Date.now();
      await testPool.query('EXPLAIN ANALYZE ' + referenceSql);
      const refTime = Date.now() - startRef;

      // Процент допустимого превышения времени (50%)
      const isValid = userTime < refTime * 1.5;
      const percentage = isValid ? 100 : Math.round((refTime * 1.5 / userTime) * 100);

      return {
        isValid,
        userTime,
        refTime,
        percentage,
        message: `Производительность: ${isValid ? 'зачет' : 'незачет'} (${percentage}%)`
      };
    } catch (error) {
      return {
        isValid: false,
        error: error.message,
        message: 'Проверка производительности не удалась: ' + error.message
      };
    }
  },

  // Проверка совпадения данных выборки между запросами
  async checkDataSelection(userSql, referenceSql) {
    try {
      const userResult = await testPool.query(userSql);
      const refResult = await testPool.query(referenceSql);

      // Проверка соответствия столбцов и строк
      const columnsMatch = taskService.compareResultColumns(userResult.fields, refResult.fields);
      const dataMatch = taskService.compareResultRows(userResult.rows, refResult.rows);

      const isValid = columnsMatch && dataMatch;
      const percentage = isValid ? 100 : (columnsMatch ? 50 : 0);

      return {
        isValid,
        columnsMatch,
        dataMatch,
        percentage,
        userColumns: userResult.fields.map(f => f.name),
        refColumns: refResult.fields.map(f => f.name),
        userRowCount: userResult.rows.length,
        refRowCount: refResult.rows.length,
        message: `Проверка данных: ${isValid ? 'зачет' : 'незачет'} (${percentage}%)`
      };
    } catch (error) {
      return {
        isValid: false,
        error: error.message,
        message: 'Проверка данных не удалась: ' + error.message
      };
    }
  },

  // Сравнение столбцов результата запросов
  compareResultColumns(userFields, refFields) {
    if (userFields.length !== refFields.length) return false;

    return userFields.every((userField, i) => {
      const refField = refFields[i];
      return (
        userField.name === refField.name &&
        userField.dataTypeID === refField.dataTypeID &&
        userField.tableID === refField.tableID &&
        userField.columnID === refField.columnID
      );
    });
  },

  // Сравнение строк результата запросов
  compareResultRows(userRows, refRows) {
    if (userRows.length !== refRows.length) return false;

    // Нормализация строк для сравнения
    const normalizeRow = row => JSON.stringify(Object.entries(row).sort());
    const userNormalized = userRows.map(normalizeRow).sort();
    const refNormalized = refRows.map(normalizeRow).sort();

    return userNormalized.every((row, i) => row === refNormalized[i]);
  },

  // Получение эталонного правильного решения из базы
  async getReferenceSolution(taskId) {
    const res = await pool.query(
      'SELECT correct_answer FROM USERS.CORRECT_PRACTICE_ANSWERS WHERE practice_id = $1',
      [taskId]
    );
    return res.rows[0];
  },

  // Обновление статуса выполнения задания студента в базе
  async updateCompletionStatus(client, userId, taskId, studentAnswer, isComplete, resultText) {
    await client.query(
      `INSERT INTO USERS.COMPLETED_PRACTICES 
       (user_id, practice_id, student_answer, complete_flag, teacher_comment)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, practice_id) 
       DO UPDATE SET
         student_answer = EXCLUDED.student_answer,
         complete_flag = EXCLUDED.complete_flag,
         teacher_comment = EXCLUDED.teacher_comment`,
      [userId, taskId, studentAnswer, isComplete, resultText]
    );
  }
};

module.exports = taskService;
