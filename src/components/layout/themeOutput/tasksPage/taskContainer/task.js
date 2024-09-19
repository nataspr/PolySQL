import React from 'react'

import './task.css'
import PrimaryBlueButton from "../../../../UI/blueButton/primary-blue-button";

const Task = ({ taskNumber, taskName, taskDescription }) => {
    return (
        <div className="task-container">
            <div className="task-text">
                <span>{`Задание ${taskNumber}`}</span>
                <br/>
            </div>
            <div className="task-text3">
                <span>{taskName}</span>
                <br/>
            </div>
            <div className="task-text6">
                <span>{taskDescription}</span>
                <br/>
            </div>
            <textarea
                rows="7"
                placeholder="Введите запрос к базе данных"
                className="profile-textarea textarea Small"
            ></textarea>
            <div className="container10">
                <div className="container11">
                    <PrimaryBlueButton button="Показать возможный ответ"></PrimaryBlueButton>
                    <PrimaryBlueButton button="отправить"></PrimaryBlueButton>
                </div>
            </div>
        </div>
    );
};

export default Task
