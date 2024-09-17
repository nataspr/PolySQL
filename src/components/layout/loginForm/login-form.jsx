import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import LoginButton from '../../UI/loginButton/LoginButton.jsx';
import './login-form.css';
import Cookies from "js-cookie";

const LoginForm = (props) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(null); // Для хранения состояния входа
  const navigate = useNavigate();
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


  const sendData = async (event) => {
    // обязательно, чтобы не происходило обновление страницы при нажатии на кнопки!
    event.preventDefault();
    // console.log('Вы в функции');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      const result = await response.json();
      console.log('Server response:', result);

      if (response.ok) {
        setLoginSuccess(result.success);
        if (result.success) {
          console.log('Login successful');
          // Выполняем дополнительные действия при успешном входе
          props.setIsLoggedIn(true);
          navigate('/profile');
        } else {
          // Обрабатываем ошибку входа
          console.log('Invalid credentials');
          setWarning('Ошибка данных');

        }
      } else {
        console.log('Error during login');
        setWarning("Ошибка входа!")
        setLoginSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setWarning("Ошибка входа!")
    }
  };

  // для надписи об ошибках
  const [warning, setWarning] = useState('');

  return (
      <div className="login-form">
        <div className="login-form-registration thq-flex-row thq-section-max-width">
          <div className={"text-h1"}> Откройте мир баз данных с PolySQL прямо сейчас </div>
          <span className="login-form-text3"> {props.text}</span>
          <form className="login-form-form thq-flex-column" onSubmit={sendData}>

            <label htmlFor="contact-form-7-first-name" className="login-form-text4 thq-body-small">
              {props.text1}
            </label>
            <input
                type="email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                id="contact-form-7-first-name"
                required
                placeholder={props.textInputPlaceholder}
                className="login-form-text-input thq-grid-2"
            />

            <label htmlFor="contact-form-7-email" className="login-form-text4 thq-body-small">
              {props.text2}
            </label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={props.textInputPlaceholder1}
                className="login-form-text-input1 thq-grid-2"
            />
            <LoginButton type="submit" rootClassName="component3-root-class-name1"/>
            <div className="login-form-container">
              <button className="login-form-button" type="submit" onClick={props.toggleForm}>
              <span className="login-form-text6">
                <span>Ещё нет аккаунта? Зарегистрируйтесь</span>
                <br></br>
              </span>
              </button>
            </div>
            <div className={"WarningMessage"}>{warning}</div>
          </form>
        </div>
      </div>
  );
}

LoginForm.defaultProps = {
  textInputPlaceholder1: 'Пароль',
  text2: 'Введите пароль',
  text1: 'Введите логин',
  textInputPlaceholder: 'Email',
  text: 'Получите доступ к эксклюзивным сделкам и персонализированным предложениям, войдя в свою учетную запись.',
};

LoginForm.propTypes = {
  textInputPlaceholder1: PropTypes.string,
  text2: PropTypes.string,
  text1: PropTypes.string,
  textInputPlaceholder: PropTypes.string,
  text: PropTypes.string,
};

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
