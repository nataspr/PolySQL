import Progress from './progress'
import NameOfTheme from '../nameTheme/name-of-theme'
import React, {useEffect, useState} from 'react';

const ProgressPanel = ({isHidden, onThemeSelect, selectedThemeId, setSelectedThemeId, themes, setThemes}) => {
    // Для установки темы
    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response = await fetch('/api/themes');
                const data = await response.json();
                setThemes(data);
                console.log(data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchThemes();
    }, [setThemes]);

    return (
    <div className={`progress-panel ${isHidden ? 'hidden' : ''}`}>
        <div className="tasks-progress-container">
            <h2 className="tasks-text"> Прогресс </h2>
            <Progress/>
        </div>
        {themes.map((theme) => (
            <NameOfTheme
                key={theme.id}
                text={theme.name}
                isChecked={theme.ischecked}
                onClick={() => {
                    onThemeSelect(theme);
                    setSelectedThemeId(theme.id);
                }} // Использование стрелочной функции для передачи функции обратного вызова
            />
        ))}
    </div>
    )
};

export default ProgressPanel;