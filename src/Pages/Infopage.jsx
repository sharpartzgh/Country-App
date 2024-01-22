/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { RxReload } from 'react-icons/rx'
import axios from 'axios';

const Infopage = () => {
  const { countryName } = useParams();
  const [countryInfo, setCountryInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCountryInfo = async () => {
      try {
        setIsLoading(true);
        
        console.log('Fetching data for country code:', countryName);
        if (!countryName) {
          throw new Error('Country code is undefined');
        }
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
    
        if (!response || response.status !== 200) {
          throw new Error('Something went wrong');
        }
    
        const data = response.data;
        console.log('Response:', data);
        setCountryInfo(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };

    getCountryInfo();
  }, [countryName]);


  return (
    <>
      <div className="bg-[#FAFAFA] w-full min-h-screen dark:bg-[#202C36] px-10 py-10 font-Nunito">
        <button className="bg-[#FAFAFA] flex items-center gap-2 bg dark:bg-[#2B3844] py-2 px-3 justify-center rounded-md shadow-lg">
          <div className="back__btn">
            <Link to={'/'}>
              <MdKeyboardBackspace className="h-8 w-6 dark:text-white" />
            </Link>
          </div>
          <Link to={'/'}>
            <div className="font-light leading-10 mobile:text-[14px] tablet:text-[18px] dark:text-white">Back</div>
          </Link>
        </button>
        <div className="country__info">
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
          { countryInfo?.map((country, index)=>(
              <div key={index} className="country__info tablet:grid tablet:grid-cols-2 items-center laptop:flex gap-5">
                <div key={country.flag} className="image__wrapper">
                  <div className="card__wrapper w-full">
                    <img src={country.flags.png} alt={country.name.common} className='' />
                  </div>
                </div>

                {/* The name and its info */}

                <div className="middle__info__wrapper w-full items-center  ">
                  <h1 className=" text-[24px] font-semibold">{country.name.common}</h1>
                  <div className="sub__flex mobile:flex-col tablet:grid-cols-2 tablet:grid  laptop:flex gap-5" >
                     <div className="top_info w-full mobile:mt-5">
                        <h2 className="flex gap-2">Native Name:<span>{country.name.official}</span></h2>
                        <h2 className="flex gap-2">Population:<span>{country.population}</span></h2>
                        <h2 className="flex gap-2">Region:<span>{country.region}</span></h2>
                        <h2 className="flex gap-2">Sub Region:<span>{country.subregion}</span></h2>
                        <h2 className="flex gap-2">Capital:<span>{country.capital}</span></h2>
                    </div>

                    <div className="middle_info w-full mobile:mt-5">
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
                      <div className="bottom__info__wrapper tablet:flex flex-wrap items-center">
                      <div className=" gap-2">Borders</div>
                         {country.borders?.length > 0 ? (
                            country.borders.map((border) => (
                           <Link key={border.code} to={`/infopage/${border}`} >
                            <div key={border} className="cursor-pointer bg-white shadow-lg dark:bg-[#2B3844] my-3 mx-3 py-1 px-3 rounded-lg">
                               {border}
                            </div>
                            </Link>
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
        </div>
      </div>
    </>
  );
};

export default Infopage;
