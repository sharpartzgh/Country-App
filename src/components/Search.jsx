/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { MdSearch } from "react-icons/md";

const Search = ({darkMode, setDarkMode}) => {
  return (
    <div className='flex font-Nunito mobile:flex-col mobile:items-start mt-10 items-center justify-around gap-10 m-auto w-[92%]'>
      <div className=' flex tablet:w-[60%] mobile:w-full rounded-md shadow-lg gap-2  bg-[#fff] py-4 px-5 dark:bg-[#2B3844] dark:text-[#fff] text-[18px] items-center'>
          <span><MdSearch className=' w-7 h-7 dark:text-[#fff]'/></span>
          <input type="search" name="search" id="countries" placeholder='Search for a country' className=' outline-none  bg-[#fff]  dark:bg-[#2B3844] font-semibold'/>
      </div>
      <div className='flex items-center justify-around tablet:w-[30%] bg-[#fff] dark:bg-[#2B3844] rounded-md shadow-lg gap-4 py-5 px-5'>
      <h2 className=' dark:text-[#fff] font-extrabold'>Filter by Country</h2>
        <select name="" id="" className=' dark:bg-[#2B3844] dark:text-[#fff]'>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>  
      </div>
    </div>
  )
}

export default Search
