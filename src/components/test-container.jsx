import React from 'react'

import PropTypes from 'prop-types'

import Answer from './answer'
import End from './end'
import Next from './next'
import './test-container.css'

const TestContainer = (props) => {
    return (
        <div className={`test-container-test-container ${props.rootClassName} `}>
            <h1 className="test-container-text">
                <span className="test-container-text1">Задание 1</span>
                <br className=""></br>
            </h1>
            <span className="test-container-text3">{props.text}</span>
            <div className="test-container-answers">
                <Answer rootClassName="answer-root-class-name" className=""></Answer>
            </div>
            <div className="test-container-buttons">
                <div className="end-end">
                    <button onClick={props.onEndTest} className="end-button button ButtonSmall"> Закончить </button>
                </div>
                <Next className="" button="Вперёд"></Next>
            </div>
        </div>
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

export default TestContainer
