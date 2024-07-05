import { Helmet } from 'react-helmet'
import Cookies from 'js-cookie';
import React, {useEffect, useState} from 'react';

import HeaderFull from '../components/header-full'
import Footer from '../components/footer'
import ProgressPanel from '../components/progress-panel'
import ThemePanel from '../components/theme-panel'
import './tasks.css'
import Header from "../components/header";

const Tasks = (props) => {
    // для установки авторизации пользователя
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Проверка наличия авторизационного кука
        const user_id = Cookies.get('user_id');
        // console.log(user_id);
        if (user_id) {
            setIsAuthenticated(true);
            // console.log(parseInt(user_id, 10));
            // console.log(setIsAuthenticated);
        } else {
            setIsAuthenticated(false);
            // console.log(parseInt(user_id, 10));
        }
    }, []);

    // Состояние для выбранной темы
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [testStage, setTestStage] = useState('start'); // для сброса теста при смене темы
    const [selectedThemeId, setSelectedThemeId] = useState(null); // id для выбранной темы

    // Изменение выбранной темы
    const handleThemeSelect = async (theme) => {
        setSelectedTheme(theme);
        // Удаляем куку theme_id, если она существует
        Cookies.remove('theory_id');

        // Записываем новое значение theory_id в куку theme_id
        Cookies.set('theory_id', theme.id);
        //setIsExpanded(true);

        setTestStage('start'); // сброс состояния теста

        // Запрос за вопросами и ответами для выбранной темы
        try {
            const response = await fetch('/api/questions');
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    // Кнопка для скрытия боковой панели
    const handleIconClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="tasks-container">
            <Helmet>
                <title>PolySQL Практика</title>
                <meta property="og:title" content="PolySQL Практика" />
            </Helmet>

            {/*Для вывода нужной шапки*/}
            {!isAuthenticated ? (
                <>
                    <div className="just_f"></div>
                    <Header />
                </>
            ) : (
                <HeaderFull />
            )}
            <div className="tasks-container1">
                <ProgressPanel
                    isHidden={isExpanded}
                    onThemeSelect={handleThemeSelect}
                    setSelectedThemeId={setSelectedThemeId}
                    selectedThemeId={selectedThemeId}
                />
                <ThemePanel
                    isExpanded={isExpanded}
                    onIconClick={handleIconClick}   // Иконка для скрытия панели
                    selectedTheme={selectedTheme}   // Выбранная тема
                    questions={questions}   // база вопросов
                    testStage={testStage} // состояние теста
                    setTestStage={setTestStage} // функция для изменения состояния теста
                    isAuthenticated = {isAuthenticated} // для проверки авторизованности пользователя
                />
            </div>
            <Footer/>
        </div>
    );
}

export default Tasks
