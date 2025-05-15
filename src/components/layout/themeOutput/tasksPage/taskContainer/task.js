import React, {useState} from 'react'

import './task.css'
import PrimaryBlueButton from "../../../../UI/blueButton/primary-blue-button";

const Task = ({ taskNumber, taskName, taskComment, taskDescription }) => {

    const [showComment, setShowComment] = useState(false); // Управление отображением комментария
    const [query, setQuery] = useState(''); // Отслеживаем текст textarea

    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

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
        if (!query.trim()) {
            alert('Введите SQL запрос');
            return;
        }

        try {
            const response = await fetch('/api/submit-solution', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                taskId: taskNumber,
                query
            }),
            });

            const data = await response.json();

            if (!response.ok) {
            throw new Error(data.error || 'Ошибка проверки решения');
            }

            // Отображение результатов проверки
            setResult(data.result);
            setShowResult(true);
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    const renderResult = () => {
        if (!result) return null;

        return (
            <div className={`result-container ${result.isComplete ? 'success' : 'error'}`}>
                <h3>{result.isComplete ? '✅ Задание выполнено!' : '❌ Задание не выполнено'}</h3>
                <div className="result-score">Оценка: {result.score}%</div>
                <div className="result-message">{result.message}</div>
                
                <details className="result-details">
                    <summary>Подробные результаты</summary>
                    <ul>
                        {result.details.checks.map((check, index) => (
                            <li key={index}>{check}</li>
                        ))}
                    </ul>
                </details>
            </div>
        );
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
            {showResult && renderResult()}
        </div>
    );
};

export default Task
