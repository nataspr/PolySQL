import React, { useEffect, useState } from 'react';
import './progress.css';

const Progress = (props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let counter = 0;
    const target = 80; //значение прогресса
    const increment = 1; 
    const intervalTime = 50; // Interval time in milliseconds

    const interval = setInterval(() => {
      if (counter < target) {
        counter += increment;
        setProgress(counter);
      } else {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tasks-container3">
      <div className="progress">
        <div
          className="progress-done"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
      {/* <label className="tasks-text1">{progress}%</label> */}
    </div>
  );
};

export default Progress;
