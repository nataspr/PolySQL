import React, {useEffect, useState} from 'react';
import PrimaryBlueButton from '../../UI/blueButton/primary-blue-button';
import OutlineWhiteButtonWide from '../../UI/whiteButton/outline-white-button-wide';
import wave from "../../shared/svg/wave-1.svg";
import style from "./teacherPanel.module.css";

const TeacherPanel = () => {
    const [userRoles, setUserRoles] = useState([]);
    const [rolesList, setRolesList] = useState([]); // Список доступных ролей для выбора
    const [updatedRoles, setUpdatedRoles] = useState({}); // Хранит обновленные роли
    const [dataUpdates, setDataUpdates] = useState(false); // Изначально false

    useEffect(() => {
        // Получаем пользователей и их роли
        const fetchRoles = async () => {
            try {
                const response = await fetch('/api/rolesPanel');
                if (!response.ok) {
                    throw new Error('Failed');
                }
                const data = await response.json();
                setUserRoles(data);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };

        // Получаем список всех доступных ролей
        const fetchRolesList = async () => {
            try {
                const response = await fetch('/api/rolesList');
                const data = await response.json();
                setRolesList(data); // Устанавливаем список доступных ролей
            } catch (error) {
                console.error('Error fetching roles list:', error);
            }
        };

        fetchRoles();
        fetchRolesList();
    }, []);

    // Отправка обновленных ролей на сервер
    const handleSaveChanges = async () => {
        try {
            const response = await fetch('/api/updateRoles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedRoles) // Отправляем обновленные роли
            });
            if (!response.ok) {
                throw new Error('Failed to save changes');
            }
            alert('Роли успешно обновлены!');
            setDataUpdates(false);
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Ошибка при сохранении ролей');
        }
    };

    // Функция для обработки изменения роли в выпадающем списке
    const handleRoleChange = (login, newRole) => {
        setDataUpdates(true);
        setUpdatedRoles(prev => ({
            ...prev,
            [login]: newRole
        }));
    };

    return (
        <div className={style.contact}>
            <div className={style.container1}>
                <div className={style.form}>
                    <table className={style.table}>
                        <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Логин</th>
                            <th>Роль</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userRoles.map((user, index) => (
                            <tr key={index}>
                                <td>{user.fio}</td>
                                <td>{user.login}</td>
                                <td>
                                    <select
                                        value={updatedRoles[user.login] || user.role}
                                        onChange={(e) => handleRoleChange(user.login, e.target.value)}
                                    >
                                        {rolesList.map((role, idx) => (
                                            <option key={idx} value={role.role}>
                                                {role.role}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="info">
                <img alt="image" src={wave} className="profile-image1"/>
                <div className={style.container}></div>
            </div>
            {dataUpdates && <button onClick={handleSaveChanges} type="submit" className="next-button button ButtonSmall save">Сохранить изменения</button>}
        </div>
    );
}

export default TeacherPanel;