import React from 'react'

import { Helmet } from 'react-helmet'

import HeaderFull from '../components/header-full'
import OutlineWhiteButtonWide from '../components/outline-white-button-wide'
import NextButton from '../components/next-button'
import PrimaryBlueButton from '../components/primary-blue-button'
import Footer from '../components/footer'
import AdminPanel from '../components/admin-panel'
import Contact from '../components/contact'
import './profile.css'
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const Profile = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Очистка всех куков
    Cookies.remove('user_id', { path: '/' });
    Cookies.remove('login', { path: '/' });
    Cookies.remove('fio', { path: '/' });

    // Перенаправление на другую страницу, например, страницу входа
    navigate('/register');
  };

  return (
      <div className="profile-container">
        <Helmet>
          <title>Профиль</title>
          <meta property="og:title" content="Профиль"/>
        </Helmet>
        <HeaderFull></HeaderFull>
        <div className="profile-profile">
          <img
              alt="image"
              src="https://sun9-75.userapi.com/n4BmOcIjKJmDE0KHYjcpWW-EcYGoYveZgTp6Hg/T3yF_eWqfCU.jpg"
              className="profile-image"
          />
          <div className="profile-container01">
            <div className="profile-container02">
              <h4 className="profile-text">Имя Фамилия</h4>
              <div className="outline-blue-button-container">
                <button className="outline-blue-button-button button ButtonSmall" onClick={handleLogout}>
                  Выйти
                </button>
              </div>
              {/*<OutlineBlueButton button="Выйти" onClick={handleLogout}></OutlineBlueButton>*/}
            </div>
            <div className="profile-container03">
            <span className="profile-text01">
              <span>Тем пройдено: </span>
              <span className="profile-text02">2</span>
            </span>
              <span className="profile-text04">
              <span>Тестов выполнено: </span>
              <span className="profile-text05">5</span>
            </span>
              <span>
              <span>Практик сделано: </span>
              <span className="profile-text08">2</span>
            </span>
            </div>
            <span className="Medium">
            Возможно здесь будет написано что-то о курсах? Но никто не уверен,
            это сейчас не так важно. Еще возможно будут отображаться пройденные
            темы и тп.
          </span>
            <Link to="/tasks"><NextButton button="Продолжить проходить курс"></NextButton></Link>
          </div>
        </div>

        {/*<Contact/>*/}
        <AdminPanel/>


        <Footer rootClassName="footer-root-class-name1"></Footer>
      </div>
  )
}

export default Profile
