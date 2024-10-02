import React, { useState } from 'react';
import PrimaryBlueButton from '../../UI/blueButton/primary-blue-button';
import OutlineWhiteButtonWide from '../../UI/whiteButton/outline-white-button-wide';
import wave from "../../shared/svg/wave-1.svg";
import style from "./teacherPanel.module.css";

const TeacherPanel = () => {

    return (
        <div className={style.contact}>
            <div className={style.container1}>
                <div className={style.form}>
                    <table className={style.table}>
                        <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Номер группы</th>
                            <th>Ответы</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Наталия Спиридонова Денисовна</td>
                            <td>5130903/10302</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>Суханова Елизавета Алексеевна</td>
                            <td>5130903/10302</td>
                            <td>...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="info">
                <img alt="image" src={wave} className="profile-image1"/>
                <div className={style.container}></div>
            </div>
        </div>
    );
}

export default TeacherPanel;