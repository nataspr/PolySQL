import { Helmet } from 'react-helmet'
import Cookies from 'js-cookie';
import React, {useEffect, useState} from 'react';

import HeaderFull from '../components/header-full'
import Footer from '../components/footer'
import ProgressPanel from '../components/progress-panel'
import ThemePanel from '../components/theme-panel'
import './tasks.css'
import Header from "../components/header";

const Tasks = (props) => {
    // для установки авторизации пользователя
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Проверка наличия авторизационного кука
        const user_id = Cookies.get('user_id');
        if (parseInt(user_id, 10) > 0) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);



  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="tasks-container">
      <Helmet>
        <title>PolySQL Практика</title>
        <meta property="og:title" content="PolySQL Практика" />
      </Helmet>
        {!isAuthenticated ? (
            <>
                <div className="just_f"></div>
                <Header />

            </>
        ) : (
            <HeaderFull />
        )}
      <div className="tasks-container1">
        <ProgressPanel isHidden={isExpanded} />
        <ThemePanel isExpanded={isExpanded} onIconClick={() => setIsExpanded(!isExpanded)} />
      </div>
      <Footer rootClassName="footer-root-class-name2"></Footer>
    </div>
  )
}

export default Tasks
