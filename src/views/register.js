import React, { useState } from 'react';

import { Helmet } from 'react-helmet'

import Header from '../components/header'
import LoginForm from '../components/login-form'
import Registration from '../components/registration'
import FooterGray from '../components/footer-gray'
import './register.css'

const Register = () => {
const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);  // По умолчанию форма входа видна


// Для переключения на форму регистрации
  const toggleForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };


  return (
    <div className="register-container">
      <Helmet>
        <title>Вход</title>
        <meta property="og:title" content="Вход" />
      </Helmet>
      <Header rootClassName="header-root-class-name"></Header>
      <div className="register-form">
        {/* Переключение между формами */}
        <div className="register-contact1 thq-section-padding">
          {isLoginFormVisible ? (
            <LoginForm toggleForm={toggleForm} />
          ) : (
            <Registration toggleForm={toggleForm} rootClassName="registration-root-class-name" />
          )}
        </div>
      </div>
      <FooterGray></FooterGray>
    </div>
  )
}

export default Register
