import React, { useState, useEffect } from 'react';
import PrimaryBlueButton from '../../UI/blueButton/primary-blue-button';
import OutlineWhiteButtonWide from '../../UI/whiteButton/outline-white-button-wide';
import wave from "../../shared/svg/wave-1.svg";
import style from "./teacherPanel.module.css";

const TeacherPanel = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [dataUpdates, setDataUpdates] = useState(false); // Изначально false

    const [studentTasks, setStudentTasks] = useState([]); // Задания студента
    const [updatedTasks, setUpdatedTasks] = useState([]); // Хранение обновленных данных
    const [students, setStudents] = useState([]);

    // Загурузка всех студентов при загрузке компонента
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('/api/students');
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                const data = await response.json();
                console.log('Students data:', data);
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            } 
        };
        fetchStudents();
    }, []);

    

    // // Для примера (потом это будет браться из бд)
    // const students = [
    //     { fio: 'Иванов Иван', group: '5130903', login: 'ivanov123@yamdex.ru', stat: '6' },
    //     { fio: 'Петров Петр', group: '5130903', login: 'petrov456@mail.som', stat: '2' }
    // ];

    // // Все это будет браться из бд для конкретного пользователя
    // const initialTasks = [
    //     { taskNumber: 1, taskName: 'SQL Basics', taskDescription: 'Write a query to fetch...', studentAnswer: 'SELECT * ...', teacherAnswer: 'Good', accepted: true },
    //     { taskNumber: 2, taskName: 'Joins', taskDescription: 'Write a join query...', studentAnswer: 'JOIN...', teacherAnswer: 'Correct', accepted: false }
    // ];


    const handleStudentClick = async (student) => {
        try {
            const response = await fetch(`/api/student-tasks/${student.user_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch student tasks');
            }
            const tasks = await response.json();
            setStudentTasks(tasks);
            setUpdatedTasks([...tasks]);
        } catch (error) {
            console.error('Error fetching student tasks:', error);
        }
        setSelectedStudent(student);
    };

    // Обработка изменения оценки
    const handleGradeChange = (index, value) => {
        const updated = [...updatedTasks];
        updated[index].teacher_comment = value;
        setUpdatedTasks(updated);
        setDataUpdates(true); // пометка, данные были изменены
    };


    // Обработка изменения статуса чекбокса (зачтено или нет)
    const handleCheckboxChange = (index) => {
        const updated = [...updatedTasks];
        updated[index].complete_flag = !updated[index].complete_flag; // смена статуса зачтено
        setUpdatedTasks(updated);
        setDataUpdates(true); // пометка, данные были изменены
    };


    // Отправка обновленных оценок на сервер
    const handleSaveChanges = async () => {
        try {
            const response = await fetch('/api/update-tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: selectedStudent.user_id,
                    tasks: updatedTasks
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to save changes');
            }
            
            alert('Оценки успешно обновлены!');
            setDataUpdates(false);
            // Refresh the tasks after update
            const updatedResponse = await fetch(`/api/student-tasks/${selectedStudent.user_id}`);
            const updatedTasksData = await updatedResponse.json();
            setStudentTasks(updatedTasksData);
            setUpdatedTasks([...updatedTasksData]);
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Ошибка при сохранении оценок');
        }
    };

    // Возвращение к таблице студентов
    const handleBackToStudents = () => {
        setSelectedStudent(null); // Возвращаемся к списку студентов
    };

    return (
        <div className={style.contact}>
            {selectedStudent ? (
                <>
                    <h2>Статистика по ученику {selectedStudent.fio} {selectedStudent.group_name}</h2>
                    <a onClick={handleBackToStudents}> {'<< Вернуться обратно'} </a>
                    <div className={style.container1}>
                        <table className={style.table}>
                            <thead>
                            <tr>
                                <th>Номер задания</th>
                                <th>Название темы</th>
                                <th>Текст задания</th>
                                <th>Ответ ученика</th>
                                <th>Ответ учителя</th>
                                <th>Зачтено</th>
                            </tr>
                            </thead>
                            <tbody>
                            {studentTasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.practice_id}</td>
                                    <td>{task.practice_name}</td>
                                    <td>{task.practice_text}</td>
                                    <td>{task.student_answer}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={updatedTasks[index]?.teacher_comment || ''}
                                            onChange={(e) => handleGradeChange(index, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={updatedTasks[index]?.complete_flag || false}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {dataUpdates && (
                        <button 
                            onClick={handleSaveChanges} 
                            type="submit"
                            className="next-button button ButtonSmall save"
                        >
                            Сохранить изменения
                        </button>
                    )}
                </>
            ) : (
                <>
                    <div className={style.container1}>
                        <table className={style.table}>
                            <thead>
                            <tr>
                                <th>ФИО</th>
                                <th>Номер группы</th>
                                <th>Логин</th>
                                <th>Роль</th>
                            </tr>
                            </thead>
                            <tbody>
                            {students.map((student, index) => (
                                <tr
                                    key={index}
                                    className={style.tableRow}
                                    onClick={() => handleStudentClick(student)}
                                >
                                    <td>{student.fio}</td>
                                    <td>{student.group_name}</td>
                                    <td>{student.login}</td>
                                    <td>{student.role_id}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="info">
                        <img alt="image" src={wave} className="profile-image1"/>
                        <div className={style.container}></div>
                    </div>
                </>
            )}
        </div>
    );
}

export default TeacherPanel;