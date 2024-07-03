//import React from 'react';
import React, { useRef } from 'react';
import PropTypes from 'prop-types'

import Answer from './answer'
import Next from './next'
import './test-container.css'

const TestContainer = ({ rootClassName, onEndTest, questions }) => {
    const formRef = useRef(null); //ссфлка на форму
    //очистка формы
    const handleClear = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
    };
    return (

        <form ref={formRef} className={`test-container-test-container ${rootClassName} `}>
            {questions.map((question, index) => (
                <div key={index} className="test-container-question">
                    <div className="test-container-text">{`Вопрос ${index + 1}`}</div>
                    <span className="test-container-text3">{question.task_text}</span>
                    <div className="test-container-answers">
                        {question.answers.map((answer, idx) => (
                            <div key={idx} className="test-container-answer">
                                <input type="radio" id={`q${index}a${idx}`} name={`question${index}`} value={answer}/>
                                <label htmlFor={`q${index}a${idx}`}>{answer}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className="test-container-buttons">
                <div className="end-end">
                    <button type="button" onClick={onEndTest} className="end-button button ButtonSmall"> Проверить
                    </button>
                </div>
                <button type="button" onClick={handleClear} className="end-button button ButtonSmall"> Очистить</button>
            </div>
        </form>
    )
}

TestContainer.defaultProps = {
    text: 'Решите уравнение или выберите правильный ответ\n',
    text2: 'Вариант1',
    rootClassName: '',
}

TestContainer.propTypes = {
   text: PropTypes.string,
  text2: PropTypes.string,
 rootClassName: PropTypes.string,
}

TestContainer.propTypes = {
    rootClassName: PropTypes.string,
    onEndTest: PropTypes.func.isRequired,
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            task_id: PropTypes.number.isRequired,
            task_text: PropTypes.string.isRequired,
            answers: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
    ).isRequired,
};
export default TestContainer
