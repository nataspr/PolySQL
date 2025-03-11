import React, {useState} from 'react'

import PropTypes from 'prop-types'

import './registration.css'

const Registration = (props) => {

  const [fio, setFio] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [group, setGroup] = useState('');

  //для работы с формой, отправить ее компоненты на сервер для занесения в бд
  const handleSubmit = async (event) => {
    //event.preventDefault();
    //если введены неправильные пароли, то отмена
    if (password !== confirmPassword) {
      setWarning("Пароли не совпадают");
    }

    const data = {
      login: event.target[3].value,
      password: event.target[5].value,
      fio: `${event.target[0].value} ${event.target[1].value}`,
      group: event.target[6].value
    };
    try {
      const response = await fetch('/api/register', { 
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
        setWarning("Что-то пошло не так...");
      }
    } catch (error) {
      console.error('Error:', error);
      setWarning("Кажется, такой аккаунт уже существует!");
      // TODO добавить проверку на существования пользователя с таким аккаунтом
    }
  };

  // для надписи об ошибках
  const [warning, setWarning] = useState('');


  return (
    <div className={`registration thq-flex-row thq-section-max-width ${props.rootClassName} `}>
      <div className={"text-h1"}>{props.heading}</div>
      <span className="registration-text01">
        <span>Уже зарегистрированы? </span>
        <span className="registration-text04" onClick={props.toggleForm}>Войдите</span>
      </span>
      <form className="registration-form thq-flex-column" onSubmit={handleSubmit}>
        <label htmlFor="contact-form-7-first-name" className=" thq-body-small">
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
              className="registration-text-input thq-grid-2"
          />
        </div>
        <label htmlFor="contact-form-7-first-name" className="thq-body-small">
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
        <label htmlFor="contact-form-7-first-name" className="thq-body-small">
          {props.text2}
        </label>
        <input
            type="email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            id="contact-form-7-first-name"
            required="true"
            placeholder={props.textInputPlaceholder}
            className="registration-text-input3 thq-grid-2"
        />
        <label htmlFor="contact-form-7-first-name" className="thq-body-small">
          {props.text3}
        </label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required="true"
            placeholder={props.textInputPlaceholder1}
            className="registration-text-input2 thq-grid-2"
        />
        <label htmlFor="contact-form-7-first-name" className="thq-body-small">
          {props.text4}
        </label>
        <input
            type="password"
            required="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={props.textInputPlaceholder2}
            className="registration-text-input2 thq-grid-2"
        />
        {/* добавленная строка для ввода группы */}
        <label htmlFor="contact-form-7-first-name" className="thq-body-small">
          {props.text6}
        </label>
        <input
              type="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              required="true"
              placeholder={props.textInputPlaceholder5}
              className="registration-text-input2 thq-grid-2"
          />
        <span>{props.text5}</span>
        <div className="registration-container">
          <div className="registration-container1">
            <button className="registration-button">
              <span className="">Создать аккаунт</span>
            </button>
          </div>
        </div>
        <div className={"WarningMessage"}>{warning}</div>
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
  heading: 'Зарегистрируйтесь для доступа к эксклюзивным предложениям на PolySQL',
  textInputPlaceholder: 'Введите email',
  text2: 'Введите свой логин',
  textInputPlaceholder2: 'Повторите пароль',
  textInputPlaceholder5: 'Введите номер группы (например 5130903/10302)',
  text6: 'Введите номер группы',
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
