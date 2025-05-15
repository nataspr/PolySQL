import React from 'react';
import {Link} from "react-router-dom";
import NextButton from "../../UI/nextButton/next-button";

const ProfileCard = ({ user, completedThemes, completedTests, completedPractices, onClick }) => {
    return (
        <div className="profile-profile">
            <img
                alt="image"
                src="https://sun9-75.userapi.com/n4BmOcIjKJmDE0KHYjcpWW-EcYGoYveZgTp6Hg/T3yF_eWqfCU.jpg"
                className="profile-image"
            />
            <div className="profile-container01">
                <div className="profile-container02">
                    <h4 className="profile-text">{user}</h4>
                    <div className="outline-blue-button-container">
                        <button className="outline-blue-button-button button ButtonSmall" onClick={onClick}>
                            Выйти
                        </button>
                    </div>
                </div>
                <div className="profile-container03">
            <span className="profile-text01">
              <span>Тем пройдено: </span>
              <span className="profile-text02">{completedThemes}</span>
            </span>
                    <span className="profile-text04">
              <span>Тестов выполнено: </span>
              <span className="profile-text05">{completedTests}</span>
            </span>
            <span className="profile-text07">
            <span>Практик сделано: </span>
            <span className="profile-text05">{completedPractices}</span>
            </span>
                </div>
                <span className="Medium">
            Возможно здесь будет написано что-то о курсах? Но никто не уверен,
            это сейчас не так важно. Еще возможно будут отображаться пройденные
            темы и тп.
          </span>
                <Link to="/tasks"><NextButton button="Продолжить проходить курс"></NextButton></Link>
            </div>
        </div>
    )
}

export default ProfileCard