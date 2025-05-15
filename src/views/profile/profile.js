import React, {useEffect, useState} from 'react'

import { Helmet } from 'react-helmet'

import HeaderFull from '../../components/layout/header-full/header-full'
import Footer from '../../components/layout/footer/footer'
import AdminPanel from '../../components/layout/adminPage/admin-panel'
import Contact from '../../components/layout/profilePage/contactForm/contact'
import './profile.css'
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import ProfileCard from "../../components/layout/profilePage/profile-card";
import TeacherPanel from "../../components/layout/adminPage/teacher-panel";
import RolePanel from "../../components/layout/adminPage/role-panel";

const Profile = (props) => {
  const navigate = useNavigate();
  //данные для передачи в профиль карточку
//   TODO
    const [completedThemes, setCompletedThemes] = useState(0);
    const [completedTests, setCompletedTests] = useState(0);
    const [completedPractices, setCompletedPractices] = useState(0);

    const userFio = Cookies.get('fio');

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await fetch('/api/user-progress');
                if (!response.ok) {
                    throw new Error('Failed to fetch user progress');
                }
                const data = await response.json();
                console.log("Полученные данные прогресса:", data);
                if (data) {
                    setCompletedThemes(data.completed_theories);
                    setCompletedTests(data.completed_theories); // выполненные тесты = выполненные темы (практики не учитывать)
                    setCompletedPractices(data.completed_practices);
                    console.log("Установлены completedPractices:", data.completed_practices);
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


          {parseInt(Cookies.get('role_id'), 10) === 1 ? (
              <>
                  {/*Для учителя*/}
                  <ProfileCard
                      user={userFio}
                      completedThemes={completedThemes}
                      completedTests={completedTests}
                      completedPractices={completedPractices}
                      onClick={handleLogout}
                  />
                  <TeacherPanel />
                  <AdminPanel />
              </>
          ) : parseInt(Cookies.get('role_id'), 10) === 3 ? (
              <>
              {/*у администратора тоже есть карточка профиля с выходом*/}
                  <ProfileCard
                      user={userFio}
                      completedThemes={completedThemes}
                      completedTests={completedTests}
                      completedPractices={completedPractices}
                      onClick={handleLogout}
                  />
                  <RolePanel />
                  <TeacherPanel />
                  <AdminPanel />
              </>
          ) : (
              <>
              <ProfileCard
                  user={userFio}
                  completedThemes={completedThemes}
                  completedTests={completedTests}
                  completedPractices={completedPractices}
                  onClick={handleLogout}
              />
              <Contact />
              </>
          )}

        <Footer rootClassName="footer-root-class-name1"></Footer>
      </div>
  )
}

export default Profile
