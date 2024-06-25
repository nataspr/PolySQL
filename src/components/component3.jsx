import React from 'react'

import PropTypes from 'prop-types'

import './component3.css'

const Component3 = (props) => {
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

Component3.defaultProps = {
  rootClassName: '',
}

Component3.propTypes = {
  rootClassName: PropTypes.string,
}

export default Component3
