import Progress from './progress'
import NameOfTheme from './name-of-theme'
import React, {useEffect, useState} from 'react';

const ProgressPanel = ({isHidden, onThemeSelect, selectedThemeId, setSelectedThemeId}) => {
    // Для установки темы
    const [themes, setThemes] = useState([]);

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
    }, []);

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
                isChecked={theme.ischecked || theme.id === selectedThemeId}
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