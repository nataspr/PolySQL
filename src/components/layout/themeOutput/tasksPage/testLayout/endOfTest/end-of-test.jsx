import React from 'react'

import PropTypes from 'prop-types'

import OutlineBlackButton from '../../../../../UI/outlineBlackButton/outline-black-button'

const EndOfTest = ({ rootClassName, onRestartTest, totalQuestions, correctAnswersCount }) => {
    return (
        <div className={`end-of-test-end-of-test ${rootClassName} `}>
            <h3 className="end-of-test-text">
                <span>Тест по теме пройден</span><br/>
                <span>Правильных ответов на вопросы {correctAnswersCount} из {totalQuestions}</span><br/>
            </h3>
            <div className="outline-black-button-container">
                <button onClick={onRestartTest} className="outline-black-button-button button ButtonSmall">
                    Пройти тест заново
                </button>
            </div>
        </div>
    )
}

EndOfTest.propTypes = {
    rootClassName: PropTypes.string,
    onRestartTest: PropTypes.func.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    correctAnswersCount: PropTypes.number.isRequired
};

export default EndOfTest
