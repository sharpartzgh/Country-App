/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { IoMoonOutline } from "react-icons/io5";
import { BsSun } from "react-icons/bs";

const Header = ({darkMode, setDarkMode}) => {
  return (
    <header className='flex  font-Nunito text-[#111517] bg-[#FFFFFF] dark:bg-[#2B3844] dark:text-[#FFFFFF] w-screen justify-around py-6 shadow'>
      <div>
        <h1 className=' text-[24px] font-extrabold mobile:text-[18px]'>Where in the world?</h1>
      </div>
      <div className='flex text-center items-center gap-2'>
       {darkMode ? <IoMoonOutline className=' mobile:h-5 mobile-w-5 cursor-pointer h-6 w-6' onClick={()=> setDarkMode(!darkMode)}/>  :
        <BsSun onClick={()=> setDarkMode(!darkMode)} className=' cursor-pointer h-6 w-6'/>}
        <span className=' font-semibold text-[24px] mobile:text-[16px] text '>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
      </div>
    </header>
  )
}

export default Header
