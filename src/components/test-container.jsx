//import React from 'react';
import React, { useRef } from 'react';
import PropTypes from 'prop-types'

import Answer from './answer'
import Next from './next'
import './test-container.css'

const TestComponent = ({ questions_ar, onTestResult, onEndTest, rootClassName }) => {
    const formRef = useRef(null);

    // Обработка отправки формы
    const handleSubmit = async (event) => {
        event.preventDefault();
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
        console.log('Результат теста');
        console.log(result);
        onTestResult(result); // Передаем результат теста в родительский компонент
        onEndTest(); // Переключаем состояние теста на завершенный
    };

    const handleClear = () => {
        formRef.current.reset();
    };

    return (
        <form ref={formRef} className={`test-container-test-container ${rootClassName}`} onSubmit={handleSubmit}>
            {questions_ar.map((question, index) => (
                <div key={index} className="test-container-question">
                    <div className="test-container-text">{`Вопрос ${index + 1}`}</div>
                    <span className="test-container-text3">{question.task_text}</span>
                    <div className="test-container-answers">
                        {question.answers.map((answer, idx) => (
                            <div key={idx} className="test-container-answer">
                                <input className="custom-radio" type="radio" id={`q${index}a${idx}`} name={`question${index}`} value={answer} />
                                <label htmlFor={`q${index}a${idx}`}>{answer}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className="test-container-buttons">
                <div className="end-end">
                    <button type="button" onClick={handleClear} className="end-button button ButtonSmall"> Очистить
                    </button>
                </div>
                    <div className="end-end">
                        <button type="submit" className="next-button button ButtonSmall"> Проверить</button>
                    </div>
                </div>
        </form>
);
};

export default TestComponent;
