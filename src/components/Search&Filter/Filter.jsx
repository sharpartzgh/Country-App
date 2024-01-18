/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const Filter = ({ onRegionChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterRegion, setRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');

  // using this function to get all the countries within that region
  const getCountriesByRegion = async (region) => {
    try {
      setIsLoading(true);
  
      // Check if a specific region is selected
      const url = region ? `https://restcountries.com/v3.1/region/${region}` : 'https://restcountries.com/v3.1/all';
  
      const response = await axios.get(url);
  
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
   // whiles this right here fetches the region
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

   //  then we use this very function to switch between regions
  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setSelectedRegion(selectedRegion);

    if (selectedRegion) {
      getCountriesByRegion(selectedRegion);
      // Call the onRegionChange prop with the selected region
      onRegionChange(selectedRegion);
    } else {
      setCountries(countries); // Reset countries if no region is selected //honestly when filter by region is clicked was expecting an auto reset without refreshing it though lol
    }
  };

  useEffect(() => {
    getRegion();
  }, []);

  

  return (
    <>
      <div>
        <div className='inline-flex relative px-4 mobile:mt-10 gap-4 items-center justify-between dark:bg-[#2B3844] rounded-md shadow-lg bg-white'>
          <select
            className='outline-none  appearance-none py-4 px-3 dark:bg-[#2B3844] dark:text-[#fff]'
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
          <div className='pointer-events-none dark-text-white'>
            <IoIosArrowDown  className='dark:text-white'/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
