import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const Search = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = (event) => {
    event.preventDefault()
    onSearch(input)
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
          onChange={(event) => setInput(event.target.value)}
        />
        </form>
      </div>
    </div>
  );
};

export default Search;
