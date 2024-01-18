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

  const handleSearch = (searchTerm) => {
    const filtered = allCountries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

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
        <Search onSearch={handleSearch} />
        <Filter onRegionChange={handleRegionChange} />
      </div>
      <Card selectedRegion={selectedRegion} filteredCountries={filteredCountries} />
    </div>
  );
};

export default Homepage;
