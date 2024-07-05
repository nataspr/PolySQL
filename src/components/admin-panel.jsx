import React, { useState } from 'react';
import PrimaryBlueButton from './primary-blue-button';
import OutlineWhiteButtonWide from './outline-white-button-wide';

const AdminPanel = () => {
    const [selectedForm, setSelectedForm] = useState(null);
    const [formData, setFormData] = useState({
        themeName: '',
        theoryText: '',
        questionText: '',
        correctAnswer: '',
        answerOptions: '',
        taskName: '',
        taskText: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //все данные должны быть введены
    const handleSave = () => {
            // Отправка данных на сервер
            fetch('/api/admin/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ formType: selectedForm, data: formData })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    alert('Данные успешно сохранены');
                    // Очистка формы после успешной отправки
                    setFormData({
                        themeName: '',
                        theoryText: '',
                        questionText: '',
                        correctAnswer: '',
                        answerOptions: '',
                        taskName: '',
                        taskText: ''
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Нельзя создать запись!');
                });
    };

    const renderForm = () => {
        switch (selectedForm) {
            case 'Новая тема':
                return (
                    <>
                        <label className="text20 Label">Название темы</label>
                        <input
                            type="text"
                            name="themeName"
                            value={formData.themeName}
                            onChange={handleChange}
                            required
                            placeholder="Введите название новой темы"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Текст теории</label>
                        <textarea
                            rows="8"
                            name="theoryText"
                            value={formData.theoryText}
                            onChange={handleChange}
                            required
                            placeholder="Вставьте текст теории с html-тегами"
                            className="profile-textarea Small textarea"
                        ></textarea>
                        <div className="container10">
                            <div className="container11">
                                <PrimaryBlueButton button="Сохранить" onClick={handleSave}></PrimaryBlueButton>
                            </div>
                        </div>
                    </>
                );
            case 'Новый вопрос':
                return (
                    <>
                        <label className="text20 Label">Название темы</label>
                        <input
                            type="text"
                            name="themeName"
                            value={formData.themeName}
                            onChange={handleChange}
                            required
                            placeholder="Введите тему, к которой относится вопрос"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Текст вопроса</label>
                        <input
                            type="text"
                            name="questionText"
                            value={formData.questionText}
                            onChange={handleChange}
                            required
                            placeholder="Введите текст вопроса"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Правильный ответ на вопрос</label>
                        <input
                            type="text"
                            name="correctAnswer"
                            value={formData.correctAnswer}
                            onChange={handleChange}
                            required
                            placeholder="Введите правильный ответ"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Все варианты ответа на вопрос</label>
                        <textarea
                            rows="8"
                            name="answerOptions"
                            value={formData.answerOptions}
                            onChange={handleChange}
                            required
                            placeholder="Перечислите ответы через запятую"
                            className="profile-textarea Small textarea"
                        ></textarea>
                        <div className="container10">
                            <div className="container11">
                                <PrimaryBlueButton button="Сохранить" onClick={handleSave}></PrimaryBlueButton>
                            </div>
                        </div>
                    </>
                );
            case 'Новое задание':
                return (
                    <>
                        <label className="text20 Label">Название темы</label>
                        <input
                            type="text"
                            name="themeName"
                            value={formData.themeName}
                            onChange={handleChange}
                            required
                            placeholder="Введите тему, к которой относится задание"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Название задания</label>
                        <input
                            type="text"
                            name="taskName"
                            value={formData.taskName}
                            onChange={handleChange}
                            required
                            placeholder="Введите название задания"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Текст задания</label>
                        <textarea
                            rows="8"
                            name="taskText"
                            value={formData.taskText}
                            onChange={handleChange}
                            required
                            placeholder="Вставьте текст задания"
                            className="profile-textarea Small textarea"
                        ></textarea>
                        <div className="container10">
                            <div className="container11">
                                <PrimaryBlueButton button="Сохранить" onClick={handleSave}></PrimaryBlueButton>
                            </div>
                        </div>
                    </>
                );
            default:
                return (
                    <div className="HeadingOne head2"></div>
                );
        }
    };

    return (
        <div className="contact">
            <div className="container09">
            <div className="form">
                    <div className="HeadingOne head2">
                        {selectedForm ? `${selectedForm}` : 'Выберите тип задания'}
                    </div>
                    <span className="text19 Lead">
                        Заполните все поля данной формы, чтобы создание произошло корректно
                    </span>
                    <form className="form1">
                        {renderForm()}
                    </form>

                </div>
                <div className="info">
                    <div className="container12">
                        <div className="HeadingTwo head3">Создание новых заданий</div>
                        <span className="text24">
                            Выберите, какой именно тип данных хотите добавить на наш учебный сайт, и в скором времени Вы увидите его на странице уроков!
                        </span>
                        <div className="buttons-container">
                            <OutlineWhiteButtonWide text="Новая тема" onClick={() => setSelectedForm('Новая тема')} />
                            <OutlineWhiteButtonWide text="Новый вопрос" onClick={() => setSelectedForm('Новый вопрос')} />
                            <OutlineWhiteButtonWide text="Новое задание" onClick={() => setSelectedForm('Новое задание')} />
                        </div>
                    </div>
                    <img alt="image" src="/wave-1.svg" className="profile-image1" />
                    <div className="container18"></div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;