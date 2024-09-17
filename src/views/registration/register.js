import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/layout/header/header'
import LoginForm from '../../components/layout/loginForm/login-form'
import Registration from '../../components/layout/registrationForm/registration'
import FooterGray from '../../components/layout/footer-gray/footer-gray'
import HeaderFull from '../../components/layout/header-full/header-full'
import './register.css'

const Register = () => {
const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);  // По умолчанию форма входа видна
const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();


// Для переключения на форму регистрации
  const toggleForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

    // для установки авторизации пользователя
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Проверка наличия авторизационного кука
        const user_id = Cookies.get('user_id');
        if (parseInt(user_id, 10) > 0) {
            setIsAuthenticated(true);
            // Перенаправление на страницу профиля
            navigate('/profile');
        } else {
            setIsAuthenticated(false);
        }
    }, []);



    return (
    <div className="register-container">
      <Helmet>
        <title>Вход</title>
        <meta property="og:title" content="Вход" />
      </Helmet>

        {/*можно удалить при необходимости*/}
        {/*{!isAuthenticated ? (*/}
        {/*    <>*/}
        {/*        /!*<div className="just_f"></div>*!/*/}
        {/*        <Header />*/}

        {/*    </>*/}
        {/*) : (*/}
        {/*    <HeaderFull />*/}
        {/*)}*/}

      <div className="register-form">
        {/* Переключение между формами */}
        <div className="register-contact1 thq-section-padding">
          {isLoginFormVisible ? (
            <LoginForm toggleForm={toggleForm} setIsLoggedIn={setIsLoggedIn}/>
          ) : (
            <Registration toggleForm={toggleForm} rootClassName="registration-root-class-name" />
          )}
        </div>
          <div className="register-container1"></div>
      </div>
      <FooterGray></FooterGray>
    </div>

  )
}

export default Register
