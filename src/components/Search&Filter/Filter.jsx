import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const Filter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterRegion, setRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');

  const getCountriesByRegion = async (region) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
      if (!response) {
        throw new Error('Something went wrong');
      }
      const data = response.data;
      console.log(data);
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.error('Error fetching data:', error);
    }
  };

  const getRegion = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://restcountries.com/v3.1/all');
      if (!response) {
        throw new Error('Something went wrong');
      }

      const regions = Array.from(new Set(response.data.map((country) => country.region)));
      console.log(regions);
      setRegion(regions);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.error('Error fetching data:', error);
    }
  };

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setSelectedRegion(selectedRegion);

    if (selectedRegion) {
      getCountriesByRegion(selectedRegion);
    } else {
      setCountries([]); // Reset countries if no region is selected
    }
  };

  useEffect(() => {
    getRegion();
  }, []);

  return (
    <>
      <div>
        <div className='inline-flex w-full relative mobile:w-[52%] items-center justify-around tablet:w-[82%] bg-[#fff] dark:bg-[#2B3844] rounded-md shadow-lg px-4'>
          <select
            className='outline-none w-64 appearance-none py-4 px-4 dark:bg-[#2B3844] dark:text-[#fff]'
            onChange={handleRegionChange}
            value={selectedRegion}
          >
            <option value=''>Filter by Region</option>
            {filterRegion?.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <div className='pr-4 pointer-events-none'>
            <IoIosArrowDown />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
