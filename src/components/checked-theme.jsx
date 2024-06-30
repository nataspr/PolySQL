import React from 'react'

import PropTypes from 'prop-types'

import './checked-theme.css'

const CheckedTheme = ({ text, iconPath, isChecked }) => {
    return (
        <div className="checked-theme-container">
          <button type="button" className="checked-theme-button button">
            <svg viewBox="0 0 1024 1024" className="checked-theme-icon">
              <path d={iconPath}></path>
            </svg>
            <span className="checked-theme-text">{text}</span>
          </button>
        </div>
  )
}

export default CheckedTheme
