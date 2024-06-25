import { Helmet } from 'react-helmet'
import React, { useState } from 'react';

import HeaderFull from '../components/header-full'
import Footer from '../components/footer'
import ProgressPanel from '../components/progress-panel'
import ThemePanel from '../components/theme-panel'
import './tasks.css'

const Tasks = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="tasks-container">
      <Helmet>
        <title>PolySQL Практика</title>
        <meta property="og:title" content="PolySQL Практика" />
      </Helmet>
      <HeaderFull/>
      <div className="tasks-container1">
        <ProgressPanel isHidden={isExpanded} />
        <ThemePanel isExpanded={isExpanded} onIconClick={() => setIsExpanded(!isExpanded)} />
      </div>
      <Footer rootClassName="footer-root-class-name2"></Footer>
    </div>
  )
}

export default Tasks
