import React from 'react'

import './task.css'

const Task = ({ taskNumber, taskName, taskDescription }) => {
    return (
        <div className="task-container">
            <div className="task-text">
                <span>{`Задание ${taskNumber}`}</span>
                <br />
            </div>
            <div className="task-text3">
                <span>{taskName}</span>
                <br />
            </div>
            <div className="task-text6">
                <span>{taskDescription}</span>
                <br />
            </div>
        </div>
    );
};

export default Task
