import React from 'react'

import PropTypes from 'prop-types'

import Answer from './answer'
import Next from './next'
import './test-container.css'

const TestContainer = (props) => {
    return (
        // TODO два вложенных цикла, которые будут генерировать все вопросы и ответы к ним
        <div className={`test-container-test-container ${props.rootClassName} `}>
            <div className="test-container-text">Вопрос 1</div>
            <span className="test-container-text3">{props.text}</span>
            <div className="test-container-answers">
                <Answer rootClassName="answer-root-class-name" text={"Элемент массива"} className=""></Answer>
                <Answer rootClassName="answer-root-class-name" text={"Элемент массива"} className=""></Answer>
                <Answer rootClassName="answer-root-class-name" text={"Элемент массива"} className=""></Answer>
            </div>
            <div className="test-container-buttons">
                <div className="end-end">
                    {/*TODO при нажатии на кнопку очистить - моментально стираются ответы*/}
                    <button onClick={props.onEndTest} className="end-button button ButtonSmall"> Очистить</button>
                </div>
                {/*TODO при нажатии на кнопку проверить - подсвечиваются правильные ответы и выводится вывод об ответаъ*/}
                <Next button="Проверить"></Next>
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
