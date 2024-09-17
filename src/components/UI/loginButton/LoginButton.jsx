import React from 'react'

import PropTypes from 'prop-types'

import './LoginButton.css'

const LoginButton = (props) => {
  return (
    <div className={`component3-container ${props.rootClassName} `}>
      <button className="component3-button">
        <span className="">
          <span className="">Войти в аккаунт</span>
          <br className=""></br>
        </span>
      </button>
    </div>
  )
}

LoginButton.defaultProps = {
  rootClassName: '',
}

LoginButton.propTypes = {
  rootClassName: PropTypes.string,
}

export default LoginButton
