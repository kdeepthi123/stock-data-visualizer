import React, { useState, useEffect } from 'react';
import '../../src/OrientationPrompt.css'; // This is where you would import your CSS

const OrientationPrompt = () => {
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    
    // Check initially on load
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isLandscape) {
    return (
      <div className="orientation-prompt">
        Please rotate your device to landscape mode.
      </div>
    );
  }

  return null;
};

export default OrientationPrompt;
