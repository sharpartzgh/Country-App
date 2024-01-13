/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import countryflag from "../images/Germany.png"


const Card = ({darkMode, setDarkMode}) => {
  return (
    <div className=' bg-white  font-Nunito mobile:m-auto mobile:mt-10 w-[264px] rounded-md shadow-lg tablet:mt-10  tablet:mx-24'>
      <div>
         <img src={countryflag} alt="germany-flag" className=' rounded-tr-md rounded-tl-md' />
      </div>
      <div className=' my-4 pl-8'>
        <h1 className=' text-[18px] font-extrabold' >Germany</h1>
      </div>
      <div className=' flex flex-col gap-2 pl-8 text-[14px]'>
        <div className='flex gap-2'><p className=' font-semibold' >Population:</p><span>1,770,900</span></div>
        <div className='flex gap-2'>
           <p className=' font-semibold'>Region:</p> <span>Europe</span>
        </div>
       <div className='flex gap-2 mb-10'>
        <p className=' font-semibold'>Capital:</p> <span>Berlin</span>
       </div>
      </div>
    </div>
  )
}

export default Card
