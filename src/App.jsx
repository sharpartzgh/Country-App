/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './App.css'
import Homepage from './Pages/Homepage'
import Infopage from './Pages/Infopage'
import { Routes, Route } from 'react-router-dom';
import { IoMoonOutline } from "react-icons/io5";
import { BsSun } from "react-icons/bs";
import Card from './components/Card';


function App() {

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

  return (
    <>
      <div className='  dark:bg-[#202C36] w-full h-full'>
          <header className='flex  font-Nunito text-[#111517] bg-[#FFFFFF] dark:bg-[#2B3844] dark:text-[#FFFFFF] w-full justify-between py-6 px-10 shadow-lg'>
              <div>
                <h1 className=' text-[24px] font-extrabold mobile:text-[18px]'>Where in the world?</h1>
              </div>
              <div className='flex text-center items-center gap-2'>
              {darkMode ? <IoMoonOutline className=' mobile:h-5 mobile-w-5 cursor-pointer h-6 w-6' onClick={()=> setDarkMode(!darkMode)}/>  :
                <BsSun onClick={()=> setDarkMode(!darkMode)} className=' cursor-pointer h-6 w-6'/>}
                <span className=' font-semibold text-[24px] mobile:text-[16px] text '>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </div>
            </header>
            <div></div>
          <div>
            <Routes>
              <Route path='/' element={<Homepage/>}/>
            </Routes>
          </div>
          <div>  
          <Routes> 
            <Route path='/infopage' element={<Infopage/>}/> 
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
