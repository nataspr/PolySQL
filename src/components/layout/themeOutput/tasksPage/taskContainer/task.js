import React, {useState} from 'react'

import './task.css'
import PrimaryBlueButton from "../../../../UI/blueButton/primary-blue-button";

const Task = ({ taskNumber, taskName, taskComment, taskDescription }) => {

    const [showComment, setShowComment] = useState(false); // Управление отображением комментария
    const [query, setQuery] = useState(''); // Отслеживаем текст textarea

    // Функция для обработки нажатия на "Показать возможный ответ"
    const handleShowComment = () => {
        setShowComment(true);
    };

    // Функция для обработки изменения текста в textarea
    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    // Функция для отправки запроса в базу данных
    const handleSubmitQuery = async () => {
        try {
            const response = await fetch('/api/sendAnswer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }), // Отправляем запрос из textarea
            });

            if (!response.ok) {
                throw new Error('Ошибка отправки запроса в базу данных');
            }

            const data = await response.json();
            console.log('Ответ сервера:', data);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };


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
                value={query}
                onChange={handleQueryChange} // Обработка изменения текста
            ></textarea>
            <div className="container10">
                <div className="container11">
                    <PrimaryBlueButton button="Показать возможный ответ" onClick={handleShowComment}></PrimaryBlueButton>
                    <PrimaryBlueButton button="Отправить" onClick={handleSubmitQuery}></PrimaryBlueButton>
                </div>
            </div>
            {/* Отображаем комментарий, если showComment true */}
            {showComment && (
                <div className="task-comment">
                    <p>{taskComment}</p>
                </div>
            )}
        </div>
    );
};

export default Task
