import React from 'react'

import PropTypes from 'prop-types'

import './checked-theme.css'

const CheckedTheme = (props) => {
  return (
    <div className="checked-theme-container">
      <button type="button" className="checked-theme-button button">
        <svg viewBox="0 0 1024 1024" className="checked-theme-icon">
          <path d="M426 726l384-384-60-62-324 324-152-152-60 60zM512 86q176 0 301 125t125 301-125 301-301 125-301-125-125-301 125-301 301-125z"></path>
        </svg>
        <span className="checked-theme-text">{props.text}</span>
      </button>
    </div>
  )
}

CheckedTheme.defaultProps = {
  text: 'Нормализация баз данных',
}

CheckedTheme.propTypes = {
  text: PropTypes.string,
}

export default CheckedTheme
