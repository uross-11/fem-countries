import React from 'react';

import SearchForm from '../components/SearchForm';
import CountriesList from '../components/CountriesList';

const Home = () => {

  return (
    <main>
      <SearchForm />
      <CountriesList />
    </main>
  );
}

export default Home;