import React, { useState } from 'react';
import PrimaryBlueButton from './primary-blue-button';
import OutlineWhiteButtonWide from './outline-white-button-wide';

const AdminPanel = () => {
    const [selectedForm, setSelectedForm] = useState(null);

    const renderForm = () => {
        switch (selectedForm) {
            case 'тема':
                return (
                    <>
                        <label className="text20 Label">Название темы</label>
                        <input
                            type="text"
                            placeholder="Введите данные"
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
            case 'вопрос':
                return (
                    <>
                        <label className="text20 Label">Название темы</label>
                        <input
                            type="text"
                            placeholder="Введите данные"
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
                            placeholder="Введите данные"
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
            case 'задание':
                return (
                    <>
                        <label className="text20 Label">Название темы</label>
                        <input
                            type="text"
                            placeholder="Введите данные"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Текст задания</label>
                        <input
                            type="text"
                            placeholder="Введите данные"
                            className="profile-textinput Small input"
                        />
                        <label className="text20 Label">Текст теории/Задания</label>
                        <textarea
                            rows="8"
                            placeholder="Вставьте текст теории с html-тегами"
                            className="profile-textarea Small textarea"
                        ></textarea>
                    </>
                );
            default:
                return (
                    <h2 className="HeadingOne">
                        Выберите тип задания
                    </h2>
                );
        }
    };

    return (
        <div className="contact">
            <div className="container09">
                <div className="form">
                    <h2 className="HeadingOne">
                        {selectedForm ? `Новое ${selectedForm}` : 'Выберите тип задания'}
                    </h2>
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
                        <h3 className="HeadingTwo">Добавление заданий</h3>
                        <span className="text24">
                            Выберите, какой именно тип данных хотите добавить на наш учебный сайт, и в скором времени Вы увидите его на странице уроков!
                        </span>
                        <div className="buttons-container">
                            <OutlineWhiteButtonWide text="Новая тема" onClick={() => setSelectedForm('тема')} />
                            <OutlineWhiteButtonWide text="Новый вопрос" onClick={() => setSelectedForm('вопрос')} />
                            <OutlineWhiteButtonWide text="Новое задание" onClick={() => setSelectedForm('задание')} />
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
