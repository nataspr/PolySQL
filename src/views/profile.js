import React, {useEffect, useState} from 'react'

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
  //данные для передачи в профиль карточку
    const [completedThemes, setCompletedThemes] = useState(0);
    const [completedTests, setCompletedTests] = useState(0);
    const userFio = Cookies.get('fio');

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await fetch('/api/user-progress');
                if (!response.ok) {
                    throw new Error('Failed to fetch user progress');
                }
                const data = await response.json();
                if (data) {
                    setCompletedThemes(data.completed_theories);
                    setCompletedTests(data.completed_theories); // выполненные тесты = выполненные темы (практики не учитывать)
                } else {
                    console.error('Failed to fetch progress:', data.error);
                }
            } catch (error) {
                console.error('Error fetching progress:', error);
            }
        };

        fetchProgress();
    }, []);

  const handleLogout = () => {
    // Очистка всех куков
    Cookies.remove('user_id', { path: '/' });
    Cookies.remove('login', { path: '/' });
    Cookies.remove('fio', { path: '/' });

    // Перенаправление на страницу входа
    navigate('/register');
  };

  return (
      <div className="profile-container">
        <Helmet>
          <title>Профиль</title>
          <meta property="og:title" content="Профиль"/>
        </Helmet>
        <HeaderFull></HeaderFull>
          {/*передача данных в карточку профиля*/}
          <ProfileCard
              user={userFio}
              completedThemes={completedThemes}
              completedTests={completedTests}
              onClick={handleLogout}
          />

          {parseInt(Cookies.get('user_id'), 10)===1 ?  <AdminPanel/> : <Contact/>}

        <Footer rootClassName="footer-root-class-name1"></Footer>
      </div>
  )
}

export default Profile
