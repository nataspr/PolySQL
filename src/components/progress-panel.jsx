import Progress from './progress'
import CheckedTheme from './checked-theme'
import NotCheckedTheme from './not-checked-theme'
import React, { useState } from 'react';

const ProgressPanel = ({isHidden}) => {
    console.log(isHidden);
    return (
        
    <div className={`progress-panel ${isHidden ? 'hidden' : ''}`}>
        <div className="tasks-progress-container">
            <h2 className="tasks-text"> Прогресс </h2>
            <Progress/>
        </div>
        <CheckedTheme/>
        <NotCheckedTheme/>
    </div>
    )
};

export default ProgressPanel;