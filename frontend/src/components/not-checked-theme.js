import React from 'react'

import PropTypes from 'prop-types'

import './not-checked-theme.css'

const NotCheckedTheme = (props) => {
  return (
    <div className="not-checked-theme-container">
      <button
        type="button"
        className="not-checked-theme-not-checked-theme button"
      >
        <svg viewBox="0 0 1024 1024" className="not-checked-theme-icon">
          <path d="M981.333 512c0-129.579-52.565-246.997-137.472-331.861s-202.283-137.472-331.861-137.472-246.997 52.565-331.861 137.472-137.472 202.283-137.472 331.861 52.565 246.997 137.472 331.861 202.283 137.472 331.861 137.472 246.997-52.565 331.861-137.472 137.472-202.283 137.472-331.861zM896 512c0 106.069-42.923 201.984-112.469 271.531s-165.461 112.469-271.531 112.469-201.984-42.923-271.531-112.469-112.469-165.461-112.469-271.531 42.923-201.984 112.469-271.531 165.461-112.469 271.531-112.469 201.984 42.923 271.531 112.469 112.469 165.461 112.469 271.531z"></path>
        </svg>
        <span className="not-checked-theme-text">{props.text}</span>
      </button>
    </div>
  )
}

NotCheckedTheme.defaultProps = {
  text: 'Транзакции',
}

NotCheckedTheme.propTypes = {
  text: PropTypes.string,
}

export default NotCheckedTheme
