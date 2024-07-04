import React, { useState } from 'react';
import PrimaryBlueButton from './primary-blue-button';
import OutlineWhiteButtonWide from './outline-white-button-wide';

const AdminPanel = () => {
    const [selectedForm, setSelectedForm] = useState(null);

    const renderForm = () => {
        switch (selectedForm) {
            case 'Новая тема':
                return (
                    <>
                        <label className="text20 Label">Название темы</label>
                        <input
                            type="text"
                            placeholder="Введите название новой темы"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Текст теории</label>
                        <textarea
                            rows="8"
                            placeholder="Вставьте текст теории с html-тегами"
                            className="profile-textarea Small textarea"
                        ></textarea>
                    </>
                );
            case 'Новый вопрос':
                return (
                    <>
                        <label className="text20 Label">Название темы</label>
                        <input
                            type="text"
                            placeholder="Введите тему, к которой относится вопрос"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Текст вопроса</label>
                        <input
                            type="text"
                            placeholder="Введите данные"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Правильный ответ на вопрос</label>
                        <input
                            type="text"
                            placeholder="Введите ответ"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Все варианты ответа на вопрос</label>
                        <textarea
                            rows="8"
                            placeholder="Перечислите ответы через запятую"
                            className="profile-textarea Small textarea"
                        ></textarea>
                    </>
                );
            case 'Новое задание':
                return (
                    <>
                        <label className="text20 Label">Название темы</label>
                        <input
                            type="text"
                            placeholder="Введите тему, к которой относится задание"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Название задания</label>
                        <input
                            type="text"
                            placeholder="Введите название"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Текст задания</label>
                        <textarea
                            rows="8"
                            placeholder="Вставьте текст задания"
                            className="profile-textarea Small textarea"
                        ></textarea>
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
                    <div className="container10">
                        <div className="container11">
                            <PrimaryBlueButton button="Сохранить"></PrimaryBlueButton>
                        </div>
                    </div>
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
