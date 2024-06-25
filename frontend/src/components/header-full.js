import React from 'react'
import { Link } from 'react-router-dom'

import './header-full.css'

const HeaderFull = (props) => {
  return (
    <div className="header-full-header">
      <nav className="header-full-nav">
        <div className="header-full-container">
          <Link to="/" className="header-full-navlink Large">
            PolySQL
          </Link>
          <div className="header-full-menu">
            <Link to="/" className="header-full-navlink1 Large">
              Главная
            </Link>
            <Link to="/tasks" className="header-full-navlink2 Large">
              Задания
            </Link>
            <Link to="/coming-soon" className="header-full-navlink3 Large">
              Coming Soon
            </Link>
          </div>
          <div className="header-full-container1">
            <Link to="/profile" className="header-full-container2">
              <svg viewBox="0 0 1024 1024" className="header-full-icon">
                <path d="M512 0c282.857 0 512 229.143 512 512 0 281.143-228 512-512 512-283.429 0-512-230.286-512-512 0-282.857 229.143-512 512-512zM865.714 772c53.143-73.143 85.143-162.857 85.143-260 0-241.714-197.143-438.857-438.857-438.857s-438.857 197.143-438.857 438.857c0 97.143 32 186.857 85.143 260 20.571-102.286 70.286-186.857 174.857-186.857 46.286 45.143 109.143 73.143 178.857 73.143s132.571-28 178.857-73.143c104.571 0 154.286 84.571 174.857 186.857zM731.429 402.286c0-121.143-98.286-219.429-219.429-219.429s-219.429 98.286-219.429 219.429 98.286 219.429 219.429 219.429 219.429-98.286 219.429-219.429z"></path>
              </svg>
            </Link>
            <svg viewBox="0 0 1024 1024" className="header-full-icon2">
              <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
            </svg>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderFull
