import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

import PrimaryPinkButton from './primary-pink-button'
import './header.css'

const Header = (props) => {
  useEffect(() => {
    const burgerMenu = document.getElementById('burger-menu1');
    const mobileMenu = document.getElementById('mobile-menu1');
    const closeMenu = document.getElementById('close-menu1');

    const handleBurgerMenuClick = () => {
      mobileMenu.style.display = 'flex';
    };

    const handleCloseMenuClick = () => {
      mobileMenu.style.display = 'none';
    };

    burgerMenu.addEventListener('click', handleBurgerMenuClick);
    closeMenu.addEventListener('click', handleCloseMenuClick);

    // Cleanup event listeners on component unmount
    return () => {
      burgerMenu.removeEventListener('click', handleBurgerMenuClick);
      closeMenu.removeEventListener('click', handleCloseMenuClick);
    };
  }, []);

  return (
    <div data-role="Header" className="header-header">
      <nav className="header-nav">
        <div className="header-container">
          <Link to="/" className="header-navlink Large">
            PolySQL
          </Link>
          <div className="header-menu">
            <Link to="/" className="header-navlink1 Large">
              Главная
            </Link>
            <Link to="/tasks" className="header-navlink2 Large">
              Занятия
            </Link>
            <Link to="/coming-soon" className="header-navlink3 Large">
              Скоро будет
            </Link>
          </div>
          <div className="header-container1">
            <Link to="/register" className="header-container2">
              <PrimaryPinkButton button="Войти"></PrimaryPinkButton>
            </Link>
            <div data-role="BurgerMenu" className="header-burger-menu"  id="burger-menu1">
              <svg viewBox="0 0 1024 1024" className="header-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
          </div>
        </div>
      </nav>
      <div data-role="MobileMenu" className="header-mobile-menu" id="mobile-menu1">
        <div className="header-top">
          <Link to="/" className="header-navlink4 Large">
            PolySQL
          </Link>
          <div data-role="CloseMobileMenu" className="header-close-menu"  id="close-menu1">
            <svg viewBox="0 0 1024 1024" className="header-icon2">
              <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
            </svg>
          </div>
        </div>
        <div className="header-mid">
          <div className="header-menu1">
            <Link to="/" className="header-navlink5 Large">
              Главная
            </Link>
            <Link to="/tasks" className="header-navlink6 Large">
              Задания
            </Link>
            <Link to="/coming-soon" className="header-navlink7 Large">
              Coming Soon
            </Link>
          </div>
        </div>
        <div className="header-bot">
          <PrimaryPinkButton button="Войти"></PrimaryPinkButton>
        </div>
      </div>
    </div>
  )
}

export default Header
