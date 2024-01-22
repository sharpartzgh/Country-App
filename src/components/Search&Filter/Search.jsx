/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const Search = ({ onSearch, setSearchedCountry, fetchAllCountries }) => {
  const [input, setInput] = useState('');

  const handleSearch = (event) => {
    
    event.preventDefault() 
    if (input.trim() !== '') {
      setSearchedCountry(null);
      onSearch(input);
    } else {
      setSearchedCountry(null); // Resetting the searched country
      fetchAllCountries();    // Fetch all countries when the input is empty
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
    // Manually trigger form submission when input is cleared
    if (event.target.value.trim() === '') {
      handleSearch();
    } else if (event.target.value){
      handleSearch(event)
    } else {
      setSearchedCountry(null); // Resetting the searched country
      fetchAllCountries()
    }
  };

  return (
    <div>
      <div className='flex tablet:w-[95%] mobile:w-full rounded-md shadow-lg gap-2 bg-[#fff] py-4 px-5 dark:bg-[#2B3844] dark:text-[#fff] text-[18px] items-center'>
        <span>
          <MdSearch className='w-7 h-7 dark:text-[#fff]' />
        </span>
        <form onSubmit={handleSearch}>
        <input
          type='search'
          name='search'
          id='countries'
          placeholder='Search for a country'
          className='outline-none bg-[#fff] dark:bg-[#2B3844] font-semibold'
          value={input}
          onChange={handleInputChange}
        />
        </form>
      </div>
    </div>
  );
};

export default Search;
