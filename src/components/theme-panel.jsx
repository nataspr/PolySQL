import Task from './task'
import React, { useState } from 'react';
import OutlineBlackButton from "./outline-black-button";
import TestContainer from "./test-container";
import EndOfTest from "./end-of-test";

const ThemePanel = (props) => {

    // Для последовательного отображения компонентов теста
    const [testStage, setTestStage] = useState('start'); // 'start', 'test', 'end'

    // тест начался
    const handleStartTest = () => {
        setTestStage('test');
    };

    // тест закончился
    const handleEndTest = () => {
        setTestStage('end');
    };

    // тест перезапустился
    const handleRestartTest = () => {
        setTestStage('test');
    };

    return (
        <div className={`theme-container ${props.isExpanded ? 'active' : ''}`}>
            <div className="tasks-name">
                <svg onClick={props.onIconClick} viewBox="0 0 1024 1024" className="tasks-icon">
                    <path
                        d="M470 554v-84h426v84h-426zM470 384v-86h426v86h-426zM128 128h768v86h-768v-86zM128 896v-86h768v86h-768zM128 512l170-170v340zM470 726v-86h426v86h-426z"></path>
                </svg>
                <h1 className="tasks-text2">Нормализация баз данных</h1>
            </div>
            {props.children}
            <div className="tasks-content">
                <p>Тут какой-то текст про базы данных</p>
                <a
                    href="https://example.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="tasks-link"
                >
                    -- Презентация к теме.
                </a>
            </div>

            {/*"реализация теста*/}
            <div className="tasks-test">
                {testStage === 'start' && (
                    <div className="outline-black-button-container">
                        <button onClick={handleStartTest} className="outline-black-button-button button ButtonSmall">
                            Начать тест по теме
                        </button>
                    </div>
                )}
                {testStage === 'test'  && (
                    <TestContainer
                        rootClassName="test-container-root-class-name"
                        onEndTest={handleEndTest}
                    />
                )}
                {testStage === 'end' && <EndOfTest onRestartTest={handleRestartTest} rootClassName="end-of-test-root-class-name" />}
            </div>
            <Task></Task>
            <Task></Task>
        </div>
    );
};

export default ThemePanel;