import React, { useEffect } from 'react';

import SearchForm from '../components/SearchForm';
import CountriesList from '../components/CountriesList';

const Home = () => {
  //useEffect(() => {});

  return (
    <main>
      <SearchForm />
      <CountriesList />
    </main>
  );
}

export default Home;