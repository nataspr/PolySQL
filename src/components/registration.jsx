import React, {useState} from 'react'

import PropTypes from 'prop-types'

import './registration.css'

const Registration = (props) => {

  const [fio, setFio] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');

  //для работы с формой, отправить ее компоненты на сервер для занесения в бд
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      login: event.target[3].value,
      password: event.target[5].value,
      fio: `${event.target[0].value} ${event.target[1].value}`
    };
    try {
      const response = await fetch('/api/register', { // измените URL на правильный
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result.message);
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className={`registration-registration thq-flex-row thq-section-max-width ${props.rootClassName} `}>
      <h1 className="registration-text">{props.heading}</h1>
      <span className="registration-text01">
        <span className="registration-text02">Уже зарегистрированы? </span>
        <span className="registration-text04" onClick={props.toggleForm}>Войдите</span>
      </span>
      <form className="registration-form thq-flex-column" onSubmit={handleSubmit}>
        <label
          htmlFor="contact-form-7-first-name"
          className=" thq-body-small">
          {props.text}
        </label>
        <div className="registration-fio">
          <input
            type="text"
            value={fio}
            onChange={(e) => setFio(e.target.value)}
            required="true"
            placeholder={props.textInputPlaceholder3}
            className="registration-text-input thq-grid-2"
          />
          <input
            type="text"
            required="true"
            placeholder={props.textInputPlaceholder4}
            className="registration-text-input1 thq-grid-2"
          />
        </div>
        <label
          htmlFor="contact-form-7-first-name"
          className="thq-body-small"
        >
          {props.text1}
        </label>
        <input
          type="date"
          max="2024-07-10"
          //min="2020-01-01"
          //value="2000-01-01"
          required="true"
          className="registration-text-input2"
        />
        <label
          htmlFor="contact-form-7-first-name"
          className="thq-body-small"
        >
          {props.text2}
        </label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          id="contact-form-7-first-name"
          required="true"
          placeholder={props.textInputPlaceholder}
          className="registration-text-input3 thq-grid-2"
        />
        <label
          htmlFor="contact-form-7-email"
          className="thq-body-small"
        >
          {props.text3}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required="true"
          placeholder={props.textInputPlaceholder1}
          className="registration-text-input4 thq-grid-2"
        />
        <label
          htmlFor="contact-form-7-email"
          className=" thq-body-small"
        >
          {props.text4}
        </label>
        <input
          type="password"
          required="true"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={props.textInputPlaceholder2}
          className="registration-text-input5 thq-grid-2"
        />
        <span className="">{props.text5}</span>
        <div className="registration-container">
          <div className="registration-container1">
            <button className="registration-button">
                <span className="">Создать аккаунт</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

Registration.defaultProps = {
  text1: 'Укажите дату своего рождения',
  text: 'Введите свои имя и фамилию',
  textInputPlaceholder3: 'Имя',
  text4: 'Повторите пароль',
  textInputPlaceholder1: 'Пароль',
  rootClassName: '',
  text3: 'Введите пароль',
  text5: 'Присоединяйтесь к нам, чтобы открыть для себя специальные предложения, персональные рекомендации и инсайдерские советы для вашего путешествия в PostgreSQL.',
  textInputPlaceholder4: 'Фамилия',
  heading: 'Зарегистрируйтесь для доступа к эксклюзивным предложениям',
  textInputPlaceholder: 'Введите email',
  text2: 'Введите свой логин',
  textInputPlaceholder2: 'Повторите пароль',
}

Registration.propTypes = {
  text1: PropTypes.string,
  text: PropTypes.string,
  textInputPlaceholder3: PropTypes.string,
  text4: PropTypes.string,
  textInputPlaceholder1: PropTypes.string,
  rootClassName: PropTypes.string,
  text3: PropTypes.string,
  text5: PropTypes.string,
  textInputPlaceholder4: PropTypes.string,
  heading: PropTypes.string,
  textInputPlaceholder: PropTypes.string,
  text2: PropTypes.string,
  textInputPlaceholder2: PropTypes.string,
}

export default Registration
