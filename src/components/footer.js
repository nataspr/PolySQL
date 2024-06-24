import React from 'react'

import PropTypes from 'prop-types'

import './footer.css'

const Footer = (props) => {
  return (
    <footer className={`footer-footer ${props.rootClassName} `}>
      <div className="footer-container">
        <div className="footer-container1">
          <span className="footer-text">PolySQL</span>
          <span className="">Copyright © 2024 PolySQL by SPbPU.</span>
        </div>
        <div className="footer-container2">
          <div className="footer-container3">
            <span className="footer-text02 Large">Компания</span>
            <span className="footer-text03 Large">О нас</span>
            <span className="footer-text04 Large">О проекте</span>
            <span className="footer-text05 Large">Политех</span>
          </div>
          <div className="footer-container4">
            <span className="footer-text06 Large">Страницы</span>
            <span className="footer-text07 Large">Вход</span>
            <span className="footer-text08 Large">Регистрация</span>
            <span className="footer-text09 Large">
              <span className="">Главная</span>
              <br className=""></br>
            </span>
          </div>
          <div className="footer-container5">
            <span className="footer-text12 Large">Продукты</span>
            <span className="footer-text13 Large">PostgreSQL</span>
            <span className="footer-text14 Large">Теория</span>
            <span className="footer-text15 Large">Практика</span>
          </div>
        </div>
      </div>
      <img alt="image" src="/waves-white.svg" className="footer-image" />
    </footer>
  )
}

Footer.defaultProps = {
  rootClassName: '',
}

Footer.propTypes = {
  rootClassName: PropTypes.string,
}

export default Footer
