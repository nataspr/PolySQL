import React from 'react'

import PropTypes from 'prop-types'

const Next = (props) => {
    return (
        <div className="next-next">
            <button className="next-button button ButtonSmall">{props.button}</button>
        </div>
    )
}

Next.defaultProps = {
    button: 'Button',
}

Next.propTypes = {
    button: PropTypes.string,
}

export default Next
