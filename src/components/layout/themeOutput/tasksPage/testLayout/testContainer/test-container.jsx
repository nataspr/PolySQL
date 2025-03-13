//import React from 'react';
import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types'

import './test-container.css'

const TestComponent = ({ questions_ar, onTestResult, onEndTest, rootClassName }) => {
    const formRef = useRef(null);
    const tasksTestRef = useRef(null);

    const [userAnswers, setUserAnswers] = useState([]);
    const [resultData, setResultData] = useState(null); // Сохраняем результаты теста (правильные ответы и пояснения)
    const [explanations, setExplanations] = useState([]); // Сохраняем объяснения ответов

    // Функция для загрузки объяснений из базы данных
    const fetchExplanations = async () => {
        try {
            const response = await fetch('/api/explanations');
            const explanationData = await response.json();
            setExplanations(explanationData); // Сохраняем объяснения в стейт
        } catch (err) {
            console.error('Ошибка загрузки объяснений:', err);
        }
    };

    useEffect(() => {
        fetchExplanations(); // Загружаем объяснения при монтировании компонента
    }, []);

    // Функция для получения объяснения ответа
    const getExplanationForAnswer = (answer, task_id) => {
        console.log('answer, task_id',answer, task_id);
        console.log('explanations',explanations);
        const explanation = explanations.find(exp => (exp.answer === answer) && (exp.task_id === task_id));
        console.log('explanation ',explanation );
        return explanation ? explanation.explanation_answer : 'Нет пояснения';
    };


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

        // Формируем массив ответов с проверкой данных
        const answers = questions_ar.map((question, index) => {
            // Проверяем, что task_id существует и является числом
            const task_id = Number(question.task_id);
            if (isNaN(task_id)) {
                console.error('Invalid task_id:', question.task_id);
                throw new Error(`Invalid task_id for question ${index}`);
            }

            // Получаем ответ из формы
            const answerIndex = formData.get(`question${index}`);
            if (answerIndex === null) {
                console.error('No answer selected for question:', index);
                throw new Error(`Answer for question ${index} is missing`);
            }

            // Получаем текст ответа из массива question.answers
            const answer = question.answers[Number(answerIndex)];
            if (!answer) {
                console.error('Invalid answer index:', answerIndex);
                throw new Error(`Invalid answer for question ${index}`);
            }

            return {
                task_id: Number(question.task_id), // Явное преобразование в число
                answer: question.answers[answerIndex] // Получаем текст ответа
            };
        });

        console.log('Submitting answers:', answers); // Логируем данные перед отправкой
        
        // отправка данных на сервер
        try {
            const response = await fetch('/api/submit-answers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit answers');
            }
    
            const result = await response.json();
            console.log('Server response:', result);
    
            // Обновляем состояние
            setUserAnswers(answers.map(a => ({ task_id: a.task_id, answer: a.answer })));
            setResultData(result);
            onTestResult(result);
            onEndTest(result);
    
        } catch (error) {
            console.error('Error submitting answers:', error);
            alert('Произошла ошибка при отправке ответов. Попробуйте еще раз.');
        }

        
    };

    const handleClear = () => {
        formRef.current.reset();
        setResultData(null); // Сбрасываем результаты, если очищаем форму
    };

    // Функция для определения класса ответа (правильный/неправильный)
    const getAnswerClass = (questionIndex, answerIndex, task_id, currentAnswer) => {
        if (!resultData) return ''; // Пока нет результатов, ничего не подсвечиваем

        console.log('resultData=',resultData);
        console.log('questions=',questions_ar);
        console.log('answerIndex=',answerIndex);
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
                    {resultData && (
                        <div className={`answer-explanation ${resultData.correctAnswers[question.task_id][0] === userAnswers[index].answer
                            ? 'green-text'
                            : 'red-text'}`}>
                            {getExplanationForAnswer(userAnswers[index].answer, question.task_id)}  {/* Передаем answer_id */}
                        </div>
                    )}
                    <span className="test-container-text3">{question.task_text}</span>
                    <div className="test-container-answers">
                        {question.answers.map((answer, idx) => (
                            <div key={idx} className={`test-container-answer`}>
                                <input
                                    className="custom-radio"
                                    type="radio"
                                    id={`q${index}a${idx}`}
                                    name={`question${index}`}
                                    value={idx}
                                    disabled={!!resultData} // Блокируем изменение ответов после проверки
                                />
                                <label className={`${getAnswerClass(index, idx,question.task_id, answer)}`} htmlFor={`q${index}a${idx}`}>{answer}</label>
                            </div>
                        ))}

                    </div>

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
