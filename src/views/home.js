// import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Header from '../components/header'
// import PrimaryPinkButton from '../components/primary-pink-button'
// import OutlineGrayButton from '../components/outline-gray-button'
import OutlineBlackButton from '../components/outline-black-button'
import ListItem from '../components/list-item'
import Footer from '../components/footer'
import HomeHero from '../components/home-hero'
import CardSection from '../components/home-features';
import './home.css'
import HeaderFull from "../components/header-full";
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


      <section className="home-testimonials">
        <div className="home-container11">
          <div className="home-container12">
            <div className="home-container13">
              <h2 className="home-text35 HeadingOne">Учитесь с нами</h2>
              <p className="home-text36 Lead">
                Мы ждём Вас с любым уровнем знаний! 
              </p>
              <p className="home-text37 Body">
                &quot;Take up one idea. Make that one idea your life - think of
                it, dream of it, live on that idea. Let the brain, muscles,
                nerves, every part of your body, be full of that idea, and just
                leave every other idea alone. This is the way to success. A
                single rose can be my garden... a single friend, my world.&quot;
              </p>
              <p className="home-text38">Екатерина Евгеньевна Андрианова</p>
              <p className="home-text39 Small">Ст. преподаватель, СПбПУ</p>
              <div className="home-container14">
                <img
                  alt="image"
                  src="https://sun9-35.userapi.com/impg/z4lZnm22Ch10akJ6QWcpNVEn-PxioSUSh5mVDw/EXHFlcptfPw.jpg?size=2333x2333&amp;quality=95&amp;sign=d6a9f39daaa3467d611a1887becb855a&amp;type=album"
                  className="home-image04"
                />
                <div className="home-container15"></div>
                <img
                  alt="image"
                  src="https://sun9-70.userapi.com/impg/CJIJGXF2jVuvX9eEh3U1hkSItSX-aARfL4ZHpA/ThAAqaXREmU.jpg?size=673x673&amp;quality=95&amp;sign=83f9d61900a23b2e4b80616717934094&amp;type=album"
                  className="home-image05"
                />
                <div className="home-container16"></div>
                <img
                  alt="image"
                  src="https://play.teleporthq.io/static/svg/default-img.svg"
                  className="home-image06"
                />
              </div>
            </div>
          </div>


          <div className="home-logos">
            <div className="home-container17">
              <div className="home-container18">
                <div className="home-container19">
                  <img src="https://www.sheremetev.info/wp-content/uploads/2020/04/mysql_png23.png"
                    className="home-image-logo"
                  />
                </div>
                <div className="home-container20">
                  <img src="https://www.anti-malware.ru/files/images/company-logo/oracle_logo.jpg"
                    className="home-image-logo"
                  />
                </div>
                <div className="home-container21">
                  <img src="https://db-service.ru/uploads/s/b/f/v/bfvt1aldvf1l/img/autocrop/a7f780e7831e43bfc5689cf492a960ac.png"
                    className="home-image-logo"
                  />
                </div>
              </div>
              <div className="home-container22">
                <div className="home-container23">
                  <img src="https://w7.pngwing.com/pngs/63/19/png-transparent-mongodb-database-nosql-postgresql-mongo-text-logo-business.png"
                    className="home-image-logo2"
                  />
                </div>
                <div className="home-container24">
                  <img src="https://w7.pngwing.com/pngs/330/298/png-transparent-postgresql-hd-logo.png"
                    className="home-image-logo"
                  />
                </div>
                <div className="home-container25">
                  <img src="https://i.pinimg.com/originals/0b/ba/6d/0bba6dbc8bcb42b7e37fc6831f9274dd.png"
                    className="home-image12"
                  />
                </div>
              </div>
              <div className="home-container26">
                <div className="home-container27">
                  <img src="https://w7.pngwing.com/pngs/230/99/png-transparent-redis-original-wordmark-logo-icon.png"
                    className="home-image-logo"
                  />
                </div>
                <div className="home-container28">
                  <img  src="https://kursus-komputer.net/wp-content/uploads/2019/11/belajar-firebase-300x225.png"
                    className="home-image-logo2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          alt="image"
          src="/bottom.svg"
          loading="lazy"
          className="home-bottom-wave-image"
        />
        <img alt="image" src="/waves-white.svg" className="home-image15" />
        <img alt="image" src="/top.svg" className="home-top-wave-image" />
      </section>

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
