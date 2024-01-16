import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Card from '../components/Card';


const Homepage = () => {
  const [darkMode, setDarkMode] = useState(false)

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

  // function to to get all countries


  
  return (
    <div className=' m-auto w-full h-full'>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Search darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className=''>
         <Card darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
};

export default Homepage;
