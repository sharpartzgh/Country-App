/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from 'react-router-dom';
import CountryInfo from '../components/CountryInfo';


const Infopage = () => {
  return (
    <>
      <div className=' bg-[#FAFAFA]  w-full min-h-screen dark:bg-[#202C36]  px-10 py-10 font-Nunito'>
        <div className=' bg-[#FAFAFA] flex items-center gap-3 bg dark:bg-[#2B3844] w-40 justify-center p-5 rounded-md shadow-lg'>
          <div className="back__btn">
           <Link to={'/'}><MdKeyboardBackspace className=' h-8 w-8  dark:text-white'/></Link>
          </div>
          <div>
            <button className=' font-light leading-10 mobile:text-[16px] tablet:text-[24px] dark:text-white'>Back</button>
          </div>
        </div>
        <div className="country__info ">
          <CountryInfo/>
        </div>
      </div>
     
    </>
  )
}

export default Infopage
