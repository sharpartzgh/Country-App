/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { RxReload } from "react-icons/rx";
import axios from 'axios'




const Card = ({darkMode, setDarkMode}) => {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState([])
  const [error, setError] = useState('')

  const fetchAllCountries = async () => {

    try {
       setIsLoading(true)
       const response = await axios.get('https://restcountries.com/v3.1/all');

       if (!response) {
         return Error('Something went wrong'); // or return a placeholder, error message, or loading state
        }
       const data = response.data // assign the response from the sever to data
       setCountries(data)
       console.log(data)
       setIsLoading(false)// Set loading to false whether the request succeeds or fails
    } catch (error) {
     // handle error
     setError(error.message)
     console.error('Error fetching data:', error);
    }
 }
 useEffect(() => {
   fetchAllCountries()
 },[])


  return (
    <div className='flex gap-2 px-6 justify-center items-start flex-wrap mt-10 pb-20 '>
      {
        isLoading? <div className=' animate-spin dark:text-white'><RxReload className=' dark:text-white'/></div> : null
      }
      {
        error? <div>{error}</div> : null
      }
      {
        countries?.map((country) => (
         <div className='top w-60 mt-2 ml-2 flex-wrap bg-white dark:bg-[#2B3844] dark:text-[#fff] font-Nunito shadow-lg'>
            <div>
              <img src={country.flags.png} alt={country.name.common} className='rounded-tr-md rounded-tl-md w-60 h-[132px] ' />
            </div>
            <div className=' my-4 pl-5'>
              <h1 className=' text-[14px] w-full font-extrabold'>{country.name.common}</h1>
            </div>
            <div className=' flex flex-col gap-2 pl-5 text-[14px]'>
              <div className='flex gap-2'>
                <p className=' font-semibold'>Population:</p><span>{country.population}</span></div>
              <div className='flex gap-2'>
                <p className=' font-semibold'>Region:</p><span>{country.region}</span>
              </div>
              <div className='flex gap-2 mb-5 '>
                <p className=' font-semibold'>Capital:</p> <span className=' w-full text-wrap'>{country.capital}</span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Card
