import React from 'react'

import PropTypes from 'prop-types'

const Answer = (props) => {
    return (
        <div className={`answer-answer ${props.rootClassName} `}>
            <input type="radio" name="radio" className="answer-radiobutton" />
            <span className="">{props.text1}</span>
        </div>
    )
}

Answer.defaultProps = {
    text1: 'Вариант1',
    rootClassName: '',
}

Answer.propTypes = {
    text1: PropTypes.string,
    rootClassName: PropTypes.string,
}

export default Answer
