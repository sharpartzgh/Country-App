import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Card from '../components/Card';
import axios from 'axios';


const Homepage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [countries, setCountries] = useState([])
  const [Loading, setLoading] = useState([])


  const addNewCountry = (country) => {
    const newCountry = {
      id: Date.now(),
      title: country,
      complete: false,
    }
    setCountries([newCountry, ...countries])
  }


  useEffect(() => {
    // Initialize dark mode based on system preference
    const initialDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(initialDarkMode);
  }, []);

  useEffect(() => {
    // Apply dark mode when darkMode state changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
      console.log('dark mode active');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('light mode active');
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        console.log('Loading...')
        setLoading(true)
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryData = await response.data
        const first20Countries = response.data.slice(0, 8);
        setCountries(first20Countries)
        console.log(first20Countries)
        // console.log(countryData);
        console.log('Hi there please am done fetching the data')
        setLoading(false)// Set loading to false whether the request succeeds or fails
        // setCountries(countryData);
        // setCountries(first20Countries)
      } catch (error) { 
        // Handle the error
        console.error('Error fetching data:', error);
       
      } 
    };
  
    fetchData();
  }, []);


  return (
    <div className=' w-full h-full'>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Search darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className=' px-6 w-full m-auto  h-full mobile:flex-col tablet:flex tablet:flex-wrap '>
           {countries.map((country) => (
            <Card key={country.id} darkMode={darkMode} setDarkMode={setDarkMode} counrty={countries} />
           ))}
      </div>
    </div>
  );
};

export default Homepage;
