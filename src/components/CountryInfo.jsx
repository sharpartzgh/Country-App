/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RxReload } from 'react-icons/rx'



const CountryInfo = () => {

  const [countryInfo, setCountryInfo] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const getCountryInfo = async() => {

    try {
      setIsLoading(true)
      const response = await axios.get('https://restcountries.com/v3.1/all')
      if(!response){
        return error('Something went wrong')
      }
      const data = response.data.slice(0,1)
      console.log(data)
      setCountryInfo(data)
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      setError(error.message)
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getCountryInfo()
  },[])
  

  return (
    <>
      <div className="Country_info_wrapper font-Nunito mt-10 gap-10 mobile:flex-col dark:text-white">
      {isLoading ? (
          <div className="dark:text-white flex w-full">
            <button type="button" className=" dark:bg-[#2B3844] shadow-lg flex items-center rounded-md gap-3 py-2 px-2" disabled>
              <RxReload className='dark:text-white animate-spin' /> 
              <h1 className=' '>Loading</h1>
            </button>
          </div>
          ) : null}
          {error ? <div>{error}</div> : null}
          {
            countryInfo?.map((country)=>(
              <div key={country.name.common} className="country__info tablet:grid tablet:grid-cols-2 items-center laptop:flex gap-5">
                <div key={countryInfo.id} className="image__wrapper">
                  <div className="card__wrapper w-full">
                    <img src={country.flags.png} alt={country.name.common} className='' />
                  </div>
                </div>

                {/* The name and its info */}

                <div className="middle__info__wrapper w-full items-center  ">
                  <h1 className=" text-[24px] font-semibold">{country.name.common}</h1>
                  <div className="sub__flex mobile:flex-col tablet:grid-cols-2 tablet:grid  laptop:flex gap-5" >
                     <div className="top_info w-full py-3 px-3">
                        <h2 className="flex gap-2">Native Name:<span>{country.name.official}</span></h2>
                        <h2 className="flex gap-2">Population:<span>{country.population}</span></h2>
                        <h2 className="flex gap-2">Region:<span>{country.region}</span></h2>
                        <h2 className="flex gap-2">Sub Region:<span>{country.subregion}</span></h2>
                        <h2 className="flex gap-2">Capital:<span>{country.capital}</span></h2>
                    </div>

                    <div className="middle_info w-full">
                      <h2 className="flex gap-2">Top Level Domain:<span>{country.tld.join(', ')}</span></h2>
                      <h2 className=" gap-2">Currencies: <span>{
                            Object.values(country.currencies).map((currency) =>(
                                <span key={currency.code}>{currency.name}</span>
                              ))}</span>
                      </h2>
                      <h2 className=" gap-2">Languages: <span>{
                            Object.values(country.languages).map((language) =>(
                                <span key={language.code}>{language}</span>
                              ))}</span>
                      </h2>
                      <div className="bottom__info__wrapper tablet:flex items-center">
                      <div>Borders</div>
                           {country.borders?.length > 0 ? (
                            country.borders.map((border) => (
                            <button key={border} className="cursor-pointer bg-white shadow-lg dark:bg-[#2B3844] my-3 mx-3 py-1 px-3 rounded-lg">
                              {border}
                            </button>
                          ))
                          ) : (
                          <span>No Borders</span>
                        )}
                      </div>
                  </div>
                  </div>
                </div>  
              </div>
          ))}
      </div>
    </>
  )
}

export default CountryInfo
