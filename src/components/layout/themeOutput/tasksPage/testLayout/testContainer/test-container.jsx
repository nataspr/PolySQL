//import React from 'react';
import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types'

import './test-container.css'

const TestComponent = ({ questions_ar, onTestResult, onEndTest, rootClassName }) => {
    const formRef = useRef(null);
    const tasksTestRef = useRef(null);

    const [userAnswers, setUserAnswers] = useState([]);
    const [resultData, setResultData] = useState(null); // Сохраняем результаты теста (правильные ответы и пояснения)


    // Функция для прокрутки до верхней точки tasks-test
    const scrollToTasksTest = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Обработка отправки формы
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('questions_ar',questions_ar);
        const formData = new FormData(formRef.current);
        const answers = questions_ar.map((question, index) => ({
            task_id: question.task_id,
            answer: formData.get(`question${index}`)
        }));

        const response = await fetch('/api/submit-answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answers })
        });

        const result = await response.json();

        const answers_text = questions_ar.map((question, index) => ({
            task_id: question.task_id,
            answer: question.answers[formData.get(`question${index}`)]
        }));

        console.log('Ответы пользователя', answers_text);
        setUserAnswers(answers_text);
        setResultData(result); // Сохраняем результат
        onTestResult(result); // Передаем результат теста в родительский компонент
        onEndTest(result); // Переключаем состояние теста на завершенный
    };

    const handleClear = () => {
        formRef.current.reset();
        setResultData(null); // Сбрасываем результаты, если очищаем форму
    };

    // Функция для определения класса ответа (правильный/неправильный)
    const getAnswerClass = (questionIndex, answerIndex, task_id, currentAnswer) => {
        if (!resultData) return ''; // Пока нет результатов, ничего не подсвечиваем

        const correctAnswer = resultData.correctAnswers[userAnswers[questionIndex].task_id][0]; // Получаем правильный ответ для данного вопроса
        const userAnswer = userAnswers[questionIndex].answer;

        if (correctAnswer === userAnswer && task_id === userAnswers[questionIndex].task_id && currentAnswer === userAnswer) {
            return 'correct-answer'; // Правильный ответ - зеленый
        }

        if (task_id === userAnswers[questionIndex].task_id && currentAnswer === userAnswer) {
            console.log('CorrectAnswer:', correctAnswer);
            console.log('userAnswer:', userAnswer);
            console.log('userAnswers[questionIndex]:', userAnswers[questionIndex]);
            console.log('questionIndex:', questionIndex);
            return 'incorrect-answer'; // Неправильный ответ - красный
        }

        return ''; // Если это не выбранный ответ, не подсвечиваем
    };

    return (
        <form ref={formRef} className={`test-container-test-container ${rootClassName}`} onSubmit={handleSubmit}>
            {questions_ar.map((question, index) => (
                <div key={index} className="test-container-question">
                    <div className="test-container-text">{`Вопрос ${index + 1}`}</div>
                    <span className="test-container-text3">{question.task_text}</span>
                    <div className="test-container-answers">
                        {question.answers.map((answer, idx) => (
                            <div key={idx} className={`test-container-answer ${getAnswerClass(index, idx,question.task_id, answer)}`}>
                                <input
                                    className="custom-radio"
                                    type="radio"
                                    id={`q${index}a${idx}`}
                                    name={`question${index}`}
                                    value={idx}
                                    disabled={!!resultData} // Блокируем изменение ответов после проверки
                                />
                                <label htmlFor={`q${index}a${idx}`}>{answer}</label>
                            </div>
                        ))}
                    </div>
                    {resultData && (
                        <div className="answer-explanation">
                            {resultData.correctAnswers[question.task_id][0] === userAnswers[index].answer
                                ? 'Ответ правильный'
                                : 'Ответ неверный'}
                        </div>
                    )}
                </div>
            ))}

            <div className="test-container-buttons">
                <div className="end-end">
                    <button type="button" onClick={handleClear} className="end-button button ButtonSmall"> Очистить </button>
                </div>
                    <div className="end-end">
                        <button type="submit" className="next-button button ButtonSmall" onClick={scrollToTasksTest}> Проверить</button>
                    </div>
                </div>
        </form>
);
};

export default TestComponent;
