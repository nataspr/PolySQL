import React from 'react'

import './task.css'

const Task = (props) => {
  return (
    <div className="task-container">
      <h1 className="task-text">
        <span>Задание 1</span>
        <br></br>
      </h1>
      <h1 className="task-text3">
        <span>Название задания</span>
        <br></br>
      </h1>
      <h1 className="task-text6">
        <span>Описание задания и соответствующие ему картинки/текст и тп</span>
        <br></br>
      </h1>
    </div>
  )
}

export default Task
