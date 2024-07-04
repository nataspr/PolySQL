import React, { useEffect, useState } from 'react';
import './progress.css';

const Progress = (props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/user-progress');
        if (!response.ok) {
          throw new Error('Failed to fetch user progress');
        }
        const data = await response.json();
        if (data.progress !== undefined) {
          setProgress(data.progress);
        } else {
          console.error('Failed to fetch progress:', data.error);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
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
