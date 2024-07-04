import Task from './task'
import React, {useEffect, useState} from 'react';
import TestContainer from "./test-container";
import EndOfTest from "./end-of-test";
import DOMPurify from 'dompurify';
import Header from "./header";
import HeaderFull from "./header-full";

const ThemePanel = ({ isExpanded, onIconClick, selectedTheme, questions, testStage, setTestStage, isAuthenticated  }) => {
    // Состояния для теста: 'start', 'test', 'end'
    const [testResult, setTestResult] = useState(null); // Хранение результатов теста
    const [questions_ar, setQuestions] = useState([]);
    const [practices, setPractices] = useState([]);






    useEffect(() => {
        if (!selectedTheme) {
            return;
        }
        // запрос к серверу для получения данных о практиках
        const fetchPractices = async () => {
            try {
                const response = await fetch('/api/get-practice', {
                    headers: {
                        'Content-Type': 'application/json',
                        'theory-id': selectedTheme.id // идентификатор выбранной темы
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch practices');
                }
                const data = await response.json();
                if (data.practices) {
                    setPractices(data.practices);
                } else {
                    console.error('Failed to fetch practices:', data.error);
                }
            } catch (error) {
                console.error('Error fetching practices:', error);
            }
        };

        fetchPractices();
    }, [selectedTheme]); // Пустой массив зависимостей означает, что useEffect выполняется только один раз при монтировании компонента
    //есть зависимость от selectedTheme


    const handleStartTest = () => {
        setTestStage('test');
    };

    const handleEndTest = () => {
        setTestStage('end');
    };

    const handleRestartTest = () => {
        setTestStage('test');
    };

    const handleTestResult = (result) => {
        setTestResult(result);
    };

    // Очистка текста для безопасной вставки кода из базы данных
    const cleanHTML = DOMPurify.sanitize(selectedTheme ? selectedTheme.text_on_page : 'Выберите тему, чтобы увидеть её содержание');
    return (
        <div className={`theme-container ${isExpanded ? 'active' : ''}`}>
            <div className="tasks-name">
                {/*Кнопка для скрытия боковой панели*/}
                <svg onClick={onIconClick} viewBox="0 0 1024 1024" className="tasks-icon">
                    <path d="M470 554v-84h426v84h-426zM470 384v-86h426v86h-426zM128 128h768v86h-768v-86zM128 896v-86h768v86h-768zM128 512l170-170v340zM470 726v-86h426v86h-426z"></path>
                </svg>
                <h1 className="tasks-text02">{selectedTheme ? selectedTheme.name : 'Выберите тему'}</h1>
            </div>
            <div className="tasks-content">
                <div className={`Correct-format ${isExpanded ? 'active' : ''}`} dangerouslySetInnerHTML={{__html: cleanHTML}}/>
                <a href="https://example.com" target="_blank" rel="noreferrer noopener" className={`tasks-link ${isExpanded ? 'active' : ''}`}>
                    -- Презентация к теме.
                </a>
            </div>

            {/*Для вывода теста*/}
            {isAuthenticated && (
                <div className="tasks-test">
                {testStage === 'start'&& (
                        <div className="outline-black-button-container">
                            <button onClick={handleStartTest} className="outline-black-button-button button ButtonSmall">
                                Начать тест по теме
                            </button>
                        </div>
                    )}
                    {testStage === 'test' && (
                        <TestContainer rootClassName="test-container-root-class-name" onEndTest={handleEndTest} questions_ar={questions}  onTestResult={handleTestResult}/>
                    )}
                    {testStage === 'end' && <EndOfTest onRestartTest={handleRestartTest} rootClassName="end-of-test-root-class-name" totalQuestions={testResult ? testResult.totalQuestions : 0}
                                                       correctAnswersCount={testResult ? testResult.correctAnswersCount : 0}/>}
                </div>
            )}
            <div>
                {selectedTheme && practices.map(practice => (
                    <Task
                        key={practice.practice_id}
                        taskNumber={practice.practice_id}
                        taskName={`${practice.practice_name}`}
                        taskDescription={practice.practice_text}
                    />
                ))}
            </div>
        </div>
    );
};

export default ThemePanel;