import Progress from './progress'
import CheckedTheme from './checked-theme'
import NotCheckedTheme from './not-checked-theme'
import React, {useEffect, useState} from 'react';

const ProgressPanel = ({isHidden, onThemeSelect }) => {

    const [themes, setThemes] = useState([]);

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response = await fetch('/api/themes');
                const data = await response.json();
                setThemes(data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchThemes();
    }, []);
    //const themes = [
     //   { text: 'Тема 1', isChecked: true , index: 1},
     //   { text: 'Тема 2', isChecked: true , index: 2},
    //];

    console.log(isHidden);
    return (
        
    <div className={`progress-panel ${isHidden ? 'hidden' : ''}`}>
        <div className="tasks-progress-container">
            <h2 className="tasks-text"> Прогресс </h2>
            <Progress/>
        </div>
        {themes.map((theme) => (
            theme.isChecked ? (
                <CheckedTheme
                    key={theme.id}
                    text={theme.name}
                    svgPath="M426 726l384-384-60-62-324 324-152-152-60 60zM512 86q176 0 301 125t125 301-125 301-301 125-301-125-125-301 125-301 301-125z"
                    onClick={onThemeSelect(theme)} // Исправлено на передачу функции обратного вызова
                />
            ) : (
                <NotCheckedTheme
                    key={theme.id}
                    text={theme.name}
                    svgPath="M981.333 512c0-129.579-52.565-246.997-137.472-331.861s-202.283-137.472-331.861-137.472-246.997 52.565-331.861 137.472-137.472 202.283-137.472 331.861 52.565 246.997 137.472 331.861 202.283 137.472 331.861 137.472 246.997-52.565 331.861-137.472 137.472-202.283 137.472-331.861zM896 512c0 106.069-42.923 201.984-112.469 271.531s-165.461 112.469-271.531 112.469-201.984-42.923-271.531-112.469-112.469-165.461-112.469-271.531 42.923-201.984 112.469-271.531 165.461-112.469 271.531-112.469 201.984 42.923 271.531 112.469 112.469 165.461 112.469 271.531z"
                    onClick={onThemeSelect(theme)} // Исправлено на передачу функции обратного вызова
                />
            )
        ))}
        {/*{themes.map((theme, index) => (*/}
        {/*    <CheckedTheme*/}
        {/*        key={index}*/}
        {/*        text={theme.text}*/}
        {/*        iconPath={theme.isChecked ? "M426 726l384-384-60-62-324 324-152-152-60 60zM512 86q176 0 301 125t125 301-125 301-301 125-301-125-125-301 125-301 301-125z" : "M981.333 512c0-129.579-52.565-246.997-137.472-331.861s-202.283-137.472-331.861-137.472-246.997 52.565-331.861 137.472-137.472 202.283-137.472 331.861 52.565 246.997 137.472 331.861 202.283 137.472 331.861 137.472 246.997-52.565 331.861-137.472 137.472-202.283 137.472-331.861zM896 512c0 106.069-42.923 201.984-112.469 271.531s-165.461 112.469-271.531 112.469-201.984-42.923-271.531-112.469-112.469-165.461-112.469-271.531 42.923-201.984 112.469-271.531 165.461-112.469 271.531-112.469 201.984 42.923 271.531 112.469 112.469 165.461 112.469 271.531z"}*/}
        {/*        isChecked={theme.isChecked}*/}
        {/*    />*/}
        {/*))}*/}
    </div>
    )
};

export default ProgressPanel;