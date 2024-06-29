import React from 'react'

import PropTypes from 'prop-types'

import './footer.css'
import {Link} from "react-router-dom";

const Footer = (props) => {
  return (
    <footer className={`footer-footer ${props.rootClassName} `}>
      <div className="footer-container">
        <div className="footer-container1">
          <Link to="./" className="footer-text">PolySQL</Link>
          <span className="">Copyright © 2024 PolySQL by SPbPU</span>
        </div>
        <div className="footer-container2">
          <div className="footer-container3">
            <span className="footer-text02 Large">Компания</span>
            <Link to="/" className="footer-text03 Large">О нас</Link>
            <Link to="/" className="footer-text04 Large">О проекте</Link>
            <a href={"https://www.spbstu.ru"} className="footer-text05 Large">Политех</a>
          </div>
          <div className="footer-container4">
            <span className="footer-text06 Large">Страницы</span>
            <Link to="/register" className="footer-text07 Large">Вход</Link>
            <Link to="/" className="footer-text09 Large">Главная</Link>
          </div>
          <div className="footer-container5">
            <span className="footer-text12 Large">Продукты</span>
            <a href="https://www.postgresql.org" className="footer-gray-text14 Large">PostgreSQL</a>
            <Link to="./tasks" className="footer-gray-text15 Large">Практика</Link>
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
