import React from 'react'

import PropTypes from 'prop-types'

const Answer = ({text}) => {
    return (
        <div className={`answer-answer`}>
            <input type="radio" name="radio" className="answer-radiobutton" />
            <span className="">{text}</span>
        </div>
    )
}

export default Answer
