import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Component3 from './component3.jsx';
import './login-form.css';

const LoginForm = (props) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const sendData = async (event) => {
    console.log('УРА ВЫ В ФУНКЦИИ');
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div className="login-form-login-form">
        <div className="login-form-registration thq-flex-row thq-section-max-width">
          <h1 className="login-form-text">
            <span>Откройте мир баз данных прямо сейчас</span>
            <br></br>
          </h1>
          <span className="login-form-text3">{props.text}</span>
          <form className="login-form-form thq-flex-column" onSubmit={sendData}>
            <label
                htmlFor="contact-form-7-first-name"
                className="login-form-text4 thq-body-small"
            >
              {props.text1}
            </label>

            <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                id="contact-form-7-first-name"
                required
                placeholder={props.textInputPlaceholder}
                className="login-form-text-input thq-grid-2"
            />
            <label
                htmlFor="contact-form-7-email"
                className="login-form-text4 thq-body-small"
            >
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
            <Component3 type="submit" rootClassName="component3-root-class-name1" />
            <div className="login-form-container">
              <button className="login-form-button" type="submit" onClick={props.toggleForm}>
              <span className="login-form-text6">
                <span>Ещё нет аккаунта? Зарегистрируйтесь</span>
                <br></br>
              </span>
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

LoginForm.defaultProps = {
  textInputPlaceholder1: 'Пароль',
  text2: 'Введите пароль',
  text1: 'Введите свой логин',
  textInputPlaceholder: 'Введите email',
  text: 'Получите доступ к эксклюзивным сделкам и персонализированным предложениям, войдя в свою учетную запись.',
};

LoginForm.propTypes = {
  textInputPlaceholder1: PropTypes.string,
  text2: PropTypes.string,
  text1: PropTypes.string,
  textInputPlaceholder: PropTypes.string,
  text: PropTypes.string,
};

export default LoginForm;
