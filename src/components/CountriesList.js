import React from 'react';
import { useGlobalContext } from '../context';

import Country from './Country';
import Loading from './Loading';

const CountriesList = () => {
  const {countries, loading} = useGlobalContext();

  if (loading) {
    return <Loading />
  }
  if (countries.length < 1) {
    return <h2>
      no match
    </h2>
  }

  return (
    <div>
      <div>
        {countries.map((item) => {
          return <Country key={item.name} {...item} />
        })}
      </div> 
    </div>
  );
}

export default CountriesList;