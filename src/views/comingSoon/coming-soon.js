import React from 'react'

import { Helmet } from 'react-helmet'

import Header from '../../components/layout/header/header'
import FooterGray from '../../components/layout/footer-gray/footer-gray'
import './coming-soon.css'
import img1 from '../../components/shared/iphone-1-1000w.png'
import img2 from '../../components/shared/iphone-2-1000w.png'
import img3 from '../../components/shared/iphone-3-1000w.png'
import img4 from '../../components/shared/iphone-4-1000w.png'

const ComingSoon = (props) => {
  return (
    <div className="coming-soon-container">
      <Helmet>
        <title>ComingSoon - Soft UI Pro</title>
        <meta property="og:title" content="ComingSoon - Soft UI Pro" />
      </Helmet>
      <Header></Header>
      <div className="coming-soon-container1">
        <div className="coming-soon-main">
          <div className="coming-soon-container2">
            <h1 className="coming-soon-text HeadingOne">Вы работаете с</h1>
            <h1 className="coming-soon-text1">PolySQL</h1>
            <p className="coming-soon-text2 Lead">
              Пока что страница, на которую Вы перешли, не функциональна,
              попробуйте вернуться сюда позже!
            </p>
          </div>
          <div className="coming-soon-grid">
            <img
              alt="image"
              src={img1}
              className="coming-soon-image"
            />
            <img
              alt="image"
              src={img2}
              className="coming-soon-image01"
            />
            <img
              alt="image"
              src={img3}
              className="coming-soon-image02"
            />
            <img
              alt="image"
              src={img1}
              className="coming-soon-image03"
            />
            <img
              alt="image"
              src={img2}
              className="coming-soon-image04"
            />
            <img
              alt="image"
              src={img4}
              className="coming-soon-image05"
            />
            <img
              alt="image"
              src={img1}
              className="coming-soon-image06"
            />
            <img
              alt="image"
              src={img3}
              className="coming-soon-image07"
            />
            <img
              alt="image"
              src={img2}
              className="coming-soon-image08"
            />
            <img
              alt="image"
              src={img4}
              className="coming-soon-image09"
            />
            <img
              alt="image"
              src={img1}
              className="coming-soon-image10"
            />
            <img
              alt="image"
              src={img3}
              className="coming-soon-image11"
            />
            <img
              alt="image"
              src={img4}
              className="coming-soon-image12"
            />
            <img
              alt="image"
              src={img1}
              className="coming-soon-image13"
            />
            <img
              alt="image"
              src={img3}
              className="coming-soon-image14"
            />
            <img
              alt="image"
              src={img2}
              className="coming-soon-image15"
            />
          </div>
        </div>
      </div>
      <FooterGray></FooterGray>
    </div>
  )
}

export default ComingSoon
