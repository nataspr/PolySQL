import React from 'react'

import PropTypes from 'prop-types'

const End = (props) => {
    return (
        <div className="end-end">
            <button className="end-button button ButtonSmall">{props.button}</button>
        </div>
    )
}

End.defaultProps = {
    button: 'Button',
}

End.propTypes = {
    button: PropTypes.string,
}

export default End
