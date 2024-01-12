import React, { useEffect, useState } from 'react';

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
    <div className='relative dark:bg-teal-950 dark:text-white'>
      <div className='flex text-center flex-col justify-center items-center'></div>
      <button
        onClick={()=> setDarkMode(!darkMode)}
        className='bg-slate-950 text-white py-2 px-3 rounded-lg dark:bg-teal-500'
      >
        {darkMode ? 'Light' : 'Dark'}
      </button>
    </div>
  );
};

export default Homepage;
