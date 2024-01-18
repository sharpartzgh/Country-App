/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Filter from '../components/Search&Filter/Filter';
import Search from '../components/Search&Filter/Search';
import axios from 'axios';

const Homepage = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const [searchedCountry, setSearchedCountry] = useState(null);
  const [error, setError] = useState('')

  // handling the search
  const getCountryByName = async (countryName) => {
    try {
      setLoading(true)
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      if(!response) throw new Error('Country not found')
      const data = response.data 
      setSearchedCountry(data)
      console.log(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }
  useEffect(()=>{
    getCountryByName()
  },[])

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setFilteredCountries([]); // Reset filtered countries when region changes
  };

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        if (!response) {
          throw new Error('Something went wrong');
        }
        const data = response.data;
        setAllCountries(data);
      } catch (error) {
        console.error('Error fetching all countries:', error);
      }
    };
    fetchAllCountries();
  }, []);

  return (
    <div className='w-full h-full'>
      <div className='flex font-Nunito mobile:flex-col mobile:items-start mt-10 items-center justify-between px-10'>
        <Search onSearch={getCountryByName} />
        <Filter onRegionChange={handleRegionChange} />
      </div>
      <Card 
      selectedRegion={selectedRegion} 
      filteredCountries={filteredCountries}
      searchedCountry={searchedCountry}
      />
    </div>
  );
};

export default Homepage;
