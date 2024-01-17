/* eslint-disable no-unused-vars */
import React from 'react';
import Card from '../components/Card';
import Filter from '../components/Search&Filter/Filter';
import Search from '../components/Search&Filter/Search';

const Homepage = () => {
 
  return (
    <div className=' m-auto w-full h-full'>
            <div className='flex font-Nunito mobile:flex-col mobile:items-start mt-10 items-center  gap-10  justify-around px-5'>
            <Search />
           <Filter />
          </div>
          <Card />
    </div>
  );
};

export default Homepage;
