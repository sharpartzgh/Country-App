/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RxReload } from 'react-icons/rx'
import axios from 'axios';
import Button from '../components/Button/Button';

const Infopage = () => {
  const { countryName } = useParams();
  const [countryInfo, setCountryInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');



// fetching just the border countries and coverting it short(acronyms)  such as 'USA',GH' to fullName 'USA => United State of America', 'GH => Ghana' so that when these border countries is click it picks the entire country fullName and display its information on the infopage. was having headache when i click on the acronyms it displays other countries as well on the infopage. 

// wasted some hours here though.

// Only God and I know the stress i went through



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
        if (response.status === 404) {
          throw new Error(`Country with code ${countryName} not found.`);
        } else {
          throw new Error('Something went wrong');
        }
      }

      const data = response.data;
      console.log('Response:', data);

      // Fetch border countries
      const borderCountries = await Promise.all(
        data[0]?.borders?.map(async (shortName) => {
          try {
            const borderResponse = await axios.get(`https://restcountries.com/v3.1/name/${shortName}`);
            
            if (!borderResponse || borderResponse.status !== 200 || !Array.isArray(borderResponse.data)) {
              throw new Error(`Invalid response for ${shortName}`);
            }

            const borderData = borderResponse.data[0];
            return { shortName, fullName: borderData.name.common };
          } catch (borderError) {
            if (borderError.response && borderError.response.status === 404) {
              console.warn(`Border country ${shortName} not found.`);
              return null; // Ignore this border country
            } else {
              throw borderError;
            }
          }
        }) || []
      );

      // Add border countries to main country info
      const countryInfoWithBorders = {
        ...data[0],
        borders: borderCountries.filter(Boolean),
      };

      setCountryInfo([countryInfoWithBorders]);
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
      <div className="bg-[#FAFAFA] w-full min-h-screen dark:bg-[#202C36] px-10 py-10 font-Nunito dark:text-white">
        <Button/>
       
        {/* entire div for country */}
        <div className="country__info mobile:flex-col flex justify-between items-center mt-10 w-full gap-10">
        
          {isLoading ? (
              <div className="dark:text-white flex w-full">
                  <button type="button" className=" dark:bg-[#2B3844] shadow-lg flex items-center rounded-md gap-3 py-2 px-2" disabled>
                    <RxReload className='dark:text-white animate-spin' /> 
                    <h1 className=' '>Loading</h1>
                  </button>
                </div>
                ) : null}
                {error ? <div>{error}</div> : null}

                {/* country image */}
                <div className="image__wrapper ">
                    {
                      countryInfo?.map((country)=>(
                        <div key={country.flag} className="card__wrapper w-full h-82">
                          <img src={country.flags.png} alt={country.name.common} className=" mobile:w-[320px] mobile:h-[229px] tablet:w-[560px] tablet:h-[401px] " />
                        </div>
                      ))
                    }
                </div>
                {/* country information */}
                <div className="country__info__wrapper w-full">
                {
                  countryInfo?.map((country)=>(
                    <div key={country.alpha3code} className="country__inner__wrappe w-full ">
                      <div className="country__name font-extrabold mobile:text-[22px] tablet:text-[32px] mb-6">{country.name.common}</div>
                      <div className="country__middle__info mobile:flex-col tablet:grid tablet:grid-cols-2 tablet:gap-5 mb-6">
                          <div className="top__text w-full leading-8">
                                <h2 className="flex gap-2 mobile:text-[14px] tablet:text-[16px] font-semibold">Native Name:<span className=" font-light">{country.name.official}</span></h2>
                                <h2 className="flex gap-2 mobile:text-[14px] tablet:text-[16px] font-semibold">Population:<span className=" font-light">{country.population}</span></h2>
                                <h2 className="flex gap-2 mobile:text-[14px] tablet:text-[16px] font-semibold">Region:<span className=" font-light">{country.region}</span></h2>
                                <h2 className="flex gap-2 mobile:text-[14px] tablet:text-[16px] font-semibold">Sub Region:<span className=" font-light">{country.subregion}</span></h2>
                                <h2 className="flex gap-2 mobile:text-[14px] tablet:text-[16px] font-semibold">Capital:<span className=" font-light">{country.capital}</span></h2>
                          </div>
                          <div className="bottom_text mobile:mt-5 w-full leading-8">
                          <h2 className="flex gap-2 mobile:text-[14px] tablet:text-[16px] font-semibold">Top Level Domain:<span>{country.tld.join(', ')}</span></h2>
                            <h2 className=" gap-2 mobile:text-[14px] tablet:text-[16px] font-semibold">Currencies: <span>{
                                  Object.values(country.currencies).map((currency) =>(
                                      <span key={currency.code} className=" font-light">{currency.name}</span>
                                    ))}</span>
                            </h2>
                            <h2 className=" gap-2 mobile:text-[14px] tablet:text-[16px] font-semibold">Languages: <span className=" font-light">{
                                  Object.values(country.languages).map((language) =>(
                                      <span key={language.code} className=" font-light">{language}</span>
                                    ))}</span>
                            </h2>
                          </div>
                      </div>
                      <div className="country__border__wrapper tablet:flex  items-center">
                      <div className="border__title  mobile:text-[14px] tablet:text-[16px] font-semibold w-[40%]">Border Countries:</div>
                      <div className="title__list flex flex-wrap gap-3 w-full">
                      {countryInfo?.map((country) => (
                            country.borders?.slice(0,3).map(({ shortName, fullName }, index) => (
                                <Link key={index} to={`/infopage/${fullName}`}>
                                  <div key={shortName} className="cursor-pointer bg-white shadow-lg dark:bg-[#2B3844] inline-flex my-3 py-1 px-3 rounded-lg">
                                    {fullName}
                                  </div>
                                </Link>
                              ))
                            ))}
                          </div> 
                      </div>
                    </div>
                  ))}
                </div>
        </div>

      </div>
    </>
  );
};

export default Infopage;
