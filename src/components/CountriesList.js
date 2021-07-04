import React from 'react';
import { useGlobalContext } from '../context';

import Country from './Country';

const CountriesList = () => {
  const {countries, loading} = useGlobalContext();

  if (loading) {

  }
  if (countries.length < 1) {
    return <h2>
      no match
    </h2>
  }

  return (
    <div>
      <h1>countries</h1>
      <div>
        {countries.map((item) => {
          return <Country key={item.name} {...item} />
        })}
      </div> 
    </div>
  );
}

export default CountriesList;