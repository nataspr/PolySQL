import React, { useEffect, useState } from 'react';
import './progress.css';

const Progress = () => {
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

    // Fetch progress initially
    fetchProgress();

    // Set up an interval to fetch progress periodically
    const interval = setInterval(fetchProgress, 10000); // обновлять прогресс каждые 10 секунд

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
      <div className="tasks-container3">
        <div className="progress">
          <div
              className="progress-done"
              style={{ width: `${progress}%` }}
          >
            {Math.round(progress)}%
          </div>
        </div>
      </div>
  );
};

export default Progress;