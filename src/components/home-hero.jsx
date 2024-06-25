import React from 'react'
import { Link } from 'react-router-dom'

import PrimaryPinkButton from './primary-pink-button'
import OutlineGrayButton from './outline-gray-button'
import './home-hero.css'

const HomeHero = (props) => {
  return (   
   <div className="hero">
        <div className="container01">
        <div className="card">
            <h1 className="text">PolySQL</h1>
            <h1 className="text01">
            <span>Твое место для SQL-запросов</span>
            <br></br>
            </h1>
            <span className="text04 Lead">
            <span className="Lead">
                Изучите широкий спектр задач и лучших практик PostgreSQL, чтобы
                усовершенствовать свои навыки управления базами данных.
            </span>
            <br className="Lead"></br>
            </span>
            <div className="container02">
            <div className="container03">
                <Link to="/tasks" className="navlink">
                <PrimaryPinkButton
                    button="теория"
                    className="component01"
                ></PrimaryPinkButton>
                </Link>
            </div>
            <a href="#aboutProject" className="container03">
                <OutlineGrayButton button="о проекте"></OutlineGrayButton>
            </a>
            </div>
        </div>
        </div>
        <img alt="image"
        src="https://i.pinimg.com/564x/f7/ed/a4/f7eda42f2a0a837a64706e7368cae07d.jpg"
        className="home-image"
        />
    </div>
    
  )
}
export default HomeHero