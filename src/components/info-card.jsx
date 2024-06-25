import React from 'react';
import './info-card.css'

const InfoCard = ({ iconPath, heading, description }) => {
  return (
    <div className="card-info">
      <svg viewBox="0 0 1024 1024" className="icon">
        <path d={iconPath}></path>
      </svg>
      <h5 className="text07 HeadingThree">{heading}</h5>
      <span className="text08">{description}</span>
    </div>
  );
};

export default InfoCard;