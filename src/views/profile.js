import React from 'react'

import { Helmet } from 'react-helmet'

import HeaderFull from '../components/header-full'
import Footer from '../components/footer'
import AdminPanel from '../components/admin-panel'
import Contact from '../components/contact'
import './profile.css'
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import ProfileCard from "../components/profile-card";

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
        <ProfileCard user={"Имя Фамилия"} onClick={handleLogout}/>

        {/*<Contact/>*/}
        <AdminPanel/>


        <Footer rootClassName="footer-root-class-name1"></Footer>
      </div>
  )
}

export default Profile
