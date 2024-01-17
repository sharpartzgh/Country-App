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
      <div className='Country__Info__Wrapper font-Nunito mt-10 flex gap-10 mobile:flex-col items-center  justify-around    dark:text-white'>
      {
        isLoading? <div className=' animate-spin dark:text-white'><RxReload className=' dark:text-white'/></div> : null
      }
      {
        error? <div>{error}</div> : null
      }
        
          { countryInfo?.map((country)=> (
              <>
              <div key={countryInfo.id} className="image__wrapper">
                  <div className="card__wrapper">
                    <img src={country.flags.png} alt={country.name.common} className='h-80' />
                  </div>
              </div>
              <div className="info__wrapper">
                <div className="top__info__wrapper mt-1 px-5">
                  <div className="country__name">
                    <h1 className=' text-[18px] font-semibold'>{country.name.common}</h1>
                  </div>
                </div>
                <div className="middle__flex flex gap-10 px-5 mt-3 mobile:flex-col ">
                    <div className="basic__info">
                        <div className=' font-semibold'>Native Name: <span>{country.name.official}</span></div>
                        <p className=' font-semibold'>Population: <span>{country.population}</span></p>
                        <p className=' font-semibold'>Region: <span>{country.region}</span></p>
                        <p className=' font-semibold'>Sub Region: <span>{country.subregion}</span></p>
                        <p className=' font-semibold'>Capital: <span>{country.capital}</span></p>
                    </div>
                    <div className="info__wrapper">
                        <div className="basic__info">
                          <p className=''>Top Level Domain:<span className=' ml-0'>{country.tld.join(', ')}</span>
                        </p>
                        <div>Currencies:
                            {Object.values(country.currencies).map((currency) =>(
                              <span key={currency.code}>{currency.name}</span>
                            ))}
                        </div>
                        <div>Languages: {Object.values(country.languages).map   ((language) =>(
                              <span key={language.code}>{language}</span>
                            ))}
                        </div>
                    </div>
                 </div>
                </div>
                <div className="bottom__wrapper mt-10  px-5">
                  <div className="border__info">
                      <div className=''>
                        <div>Border Countries</div>
                      </div>
                      <div className=' flex gap-5'>
                        <ul>
                        {country.borders &&
                         country.borders.map((border) => (
                          <button key={border}>{border.name}</button>
                         )) 
                        }
                        </ul>
                      </div>
                  </div>
                </div>
              </div>
             
            </>
            ))
          }
        
      </div>
    </>
  )
}

export default CountryInfo
