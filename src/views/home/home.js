// import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Header from '../../components/layout/header/header'
// import PrimaryPinkButton from '../components/primary-pink-button'
// import OutlineGrayButton from '../components/outline-gray-button'
import OutlineBlackButton from '../../components/UI/outlineBlackButton/outline-black-button'
import ListItem from '../../components/UI/listItem/list-item'
import Footer from '../../components/layout/footer/footer'
import HomeHero from '../../components/layout/homePage/homeHero/home-hero'
import CardSection from '../../components/layout/homePage/homeFeatures/home-features';
import './home.css'
import HeaderFull from "../../components/layout/header-full/header-full";
import HomeTestimonials from "../../components/layout/homePage/home-testimonials";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";

const Home = (props) => {
  // для установки авторизации пользователя
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверка наличия авторизационного кука
    const user_id = Cookies.get('user_id');
    if (user_id) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);


  return (
    <div className="home-container">
      <Helmet>
        <title>PolySQL</title>
        <meta property="og:title" content="PolySQL" />
      </Helmet>
      {!isAuthenticated ? <Header /> : <HeaderFull />}
      <HomeHero/>
      <CardSection/>

      <section className="home-container04">
        <div className="home-container05">
          <h1 className="home-text15 HeadingOne">От начинающего к эксперту</h1>
          <span className="home-text16">
            Мы сделали процесс изучения баз данных простым и увлекательным.
            Учите новые темы с легкостью и сразу применяйте их на практике,
            чтобы быстро стать экспертом в PostgreSQL.
          </span>
        </div>
        <div className="home-container06">
          <div className="home-container07">
            <img
              alt="image"
              src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/laptop.jpg"
              className="home-image01"
            />
            <span className="home-text17 Small">
              <span className="Small">
                &quot;Give a man a fish and you feed him for a day; teach a man
                to fish and you feed him for a lifetime&quot;
              </span>
              <br className="Small"></br>
              <span className="Small">- Maimonides</span>
            </span>
            <div className="home-container08">
              <img
                alt="image"
                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/coding.jpg"
                className="home-image02"
              />
            </div>
          </div>
          <div className="home-container09">
            <img
              alt="image"
              src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/tasks.jpg"
              className="home-image03"
            />
            <div className="home-container10">
              <h3 className="home-text21 HeadingTwo">
                Давайте погрузимся в мир баз данных
              </h3>
              <p>
                <br></br>
                <span>
                  Откройте для себя глубины понимания баз данных благодаря
                  нашему комплексному подходу к обучению. Наша структурированная
                  программа включает теоретические материалы, дополненные
                  интерактивными презентациями и документацией.
                </span>
                <br/><br/>
                <span>
                  Но только теории недостаточно. Чтобы действительно оценить
                  Ваше понимание, мы предлагаем периодические оценки знаний,
                  что также обеспечивает эффективное усвоение материала.
                </span>
                <br/><br/>
                <span>
                  Более того, мы верим в практическое обучение. После каждой
                  теоретической сессии доступны практические задания,
                  позволяющие Вам создавать SQL-запросы и манипулировать базами
                  данных в реальном времени. С доступом к онлайн-базе данных Вы
                  сможете проверить свои навыки, совершенствуя их с каждым
                  запросом.
                </span>
                <br/><br/>
                <span>
                  Наша программа обучения охватывает основы проектирования баз
                  данных, затрагивая в начале тонкости нормализации и
                  продвинутые концепции рекурсивных запросов в конце.
                  Присоединяйтесь к нам в этом образовательном путешествии, где
                  обучение не знает границ.
                </span>
                <br></br>
              </p>
            </div>
          </div>
        </div>
      </section>

      <HomeTestimonials/>

      <section className="home-contaier" id="aboutProject">
        <div className="home-container29">
          <div className="home-container30">
            <svg viewBox="0 0 1024 1024" className="home-icon10">
              <path d="M363.722 722.052l41.298-57.816-45.254-45.256-57.818 41.296c-10.722-5.994-22.204-10.774-34.266-14.192l-11.682-70.084h-64l-11.68 70.086c-12.062 3.418-23.544 8.198-34.266 14.192l-57.818-41.298-45.256 45.256 41.298 57.816c-5.994 10.72-10.774 22.206-14.192 34.266l-70.086 11.682v64l70.086 11.682c3.418 12.060 8.198 23.544 14.192 34.266l-41.298 57.816 45.254 45.256 57.818-41.296c10.722 5.994 22.204 10.774 34.266 14.192l11.682 70.084h64l11.68-70.086c12.062-3.418 23.544-8.198 34.266-14.192l57.818 41.296 45.254-45.256-41.298-57.816c5.994-10.72 10.774-22.206 14.192-34.266l70.088-11.68v-64l-70.086-11.682c-3.418-12.060-8.198-23.544-14.192-34.266zM224 864c-35.348 0-64-28.654-64-64s28.652-64 64-64 64 28.654 64 64-28.652 64-64 64zM1024 384v-64l-67.382-12.25c-1.242-8.046-2.832-15.978-4.724-23.79l57.558-37.1-24.492-59.128-66.944 14.468c-4.214-6.91-8.726-13.62-13.492-20.13l39.006-56.342-45.256-45.254-56.342 39.006c-6.512-4.766-13.22-9.276-20.13-13.494l14.468-66.944-59.128-24.494-37.1 57.558c-7.812-1.892-15.744-3.482-23.79-4.724l-12.252-67.382h-64l-12.252 67.382c-8.046 1.242-15.976 2.832-23.79 4.724l-37.098-57.558-59.128 24.492 14.468 66.944c-6.91 4.216-13.62 8.728-20.13 13.494l-56.342-39.006-45.254 45.254 39.006 56.342c-4.766 6.51-9.278 13.22-13.494 20.13l-66.944-14.468-24.492 59.128 57.558 37.1c-1.892 7.812-3.482 15.742-4.724 23.79l-67.384 12.252v64l67.382 12.25c1.242 8.046 2.832 15.978 4.724 23.79l-57.558 37.1 24.492 59.128 66.944-14.468c4.216 6.91 8.728 13.618 13.494 20.13l-39.006 56.342 45.254 45.256 56.342-39.006c6.51 4.766 13.22 9.276 20.13 13.492l-14.468 66.944 59.128 24.492 37.102-57.558c7.81 1.892 15.742 3.482 23.788 4.724l12.252 67.384h64l12.252-67.382c8.044-1.242 15.976-2.832 23.79-4.724l37.1 57.558 59.128-24.492-14.468-66.944c6.91-4.216 13.62-8.726 20.13-13.492l56.342 39.006 45.256-45.256-39.006-56.342c4.766-6.512 9.276-13.22 13.492-20.13l66.944 14.468 24.492-59.13-57.558-37.1c1.892-7.812 3.482-15.742 4.724-23.79l67.382-12.25zM672 491.2c-76.878 0-139.2-62.322-139.2-139.2s62.32-139.2 139.2-139.2 139.2 62.322 139.2 139.2c0 76.878-62.32 139.2-139.2 139.2z"></path>
            </svg>
          </div>
          <h2 className="home-text40 HeadingTwo">Программа курса</h2>
          <h3 className="home-text41 HeadingTwo">
            <span className="home-text42">Вперёд к знаниям</span>
            <br/>
          </h3>
          <span className="home-text44">
            <span>
              Для комфортного обучения вам понадобится около 3 часов в неделю.
              Главное - не останавливаться!
            </span>
          </span>
        </div>
        <div className="home-container31">
          <div className="home-container32">
            <div className="home-container33"></div>
            <div className="home-container34">
              <svg viewBox="0 0 987.4285714285713 1024" className="home-icon12">
                <path d="M438.857 508.571l312 312c-79.429 80.571-190.286 130.286-312 130.286-242.286 0-438.857-196.571-438.857-438.857s196.571-438.857 438.857-438.857v435.429zM545.714 512h441.714c0 121.714-49.714 232.571-130.286 312zM950.857 438.857h-438.857v-438.857c242.286 0 438.857 196.571 438.857 438.857z"></path>
              </svg>
              <h1 className="home-text47 HeadingOne">Учись и применяй!</h1>
              <span className="home-text48">Начнём с основ баз данных</span>
              <Link to="/tasks" className="home-navlink1">
                <OutlineBlackButton
                  button="начать"
                  className="home-component03"
                ></OutlineBlackButton>
              </Link>
            </div>
          </div>
          <div className="home-container35">
            <ListItem
              newProp="PostgreSQL и базы данных"
              description="Изучите основы PostgreSQL и различные типы баз данных. Поймите, как выбрать подходящую базу данных для вашей работы и как использовать SQL для эффективной работы."
            ></ListItem>
            <ListItem
              newProp="Создание таблиц и простые SQL-запросы"
              description="Вы узнаете, как хранятся данные, как создавать новые таблицы, как работать с ограничениями и делать простые SQL-запросы."
            ></ListItem>
            <ListItem
              newProp="Индексы, транзакции и сложные SQL-конструкции"
              description="Вы узнаете, как использовать индексы для оптимизации запросов, работать с транзакциями для обеспечения целостности данных, и освоите рекурсивные запросы для решения сложных задач."
            ></ListItem>
          </div>
        </div>
      </section>
      <Footer rootClassName="footer-root-class-name"></Footer>
    </div>
  )
}

export default Home
