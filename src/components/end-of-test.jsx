import React from 'react'

import PropTypes from 'prop-types'

import OutlineBlackButton from './outline-black-button'

const EndOfTest = (props) => {
    return (
        <div className={`end-of-test-end-of-test ${props.rootClassName} `}>
            <h3 className="end-of-test-text">
                <span>Тест по теме пройден</span><br/>
                <span>Правильных ответов на вопросы 0 из 5</span><br/>
            </h3>
            <div className="outline-black-button-container">
                <button onClick={props.onRestartTest} className="outline-black-button-button button ButtonSmall">
                    Пройти тест заново
                </button>
            </div>
        </div>
    )
}

export default EndOfTest
