import React from 'react'

import './task.css'

const Task = (props) => {
  return (
    <div className="task-container">
      <div className="task-text">
        <span>Задание 1</span>
        <br></br>
      </div>
      <div className="task-text3">
        <span>Название задания</span>
        <br></br>
      </div>
      <div className="task-text6">
        <span>Описание задания и соответствующие ему картинки/текст и тп</span>
        <br></br>
      </div>
    </div>
  )
}

export default Task
