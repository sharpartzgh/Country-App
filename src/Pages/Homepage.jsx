import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const Homepage = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize dark mode based on system preference
    const initialDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(initialDarkMode);
  }, []);

  useEffect(() => {
    // Apply dark mode when darkMode state changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
      console.log('dark mode active');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('light mode active');
    }
  }, [darkMode]);


  return (
    <div className='relative bg-[#FAFAFA]'>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};

export default Homepage;
