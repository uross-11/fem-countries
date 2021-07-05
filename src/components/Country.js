import React from 'react';
import { Link } from 'react-router-dom';

const Country = ({thumbnail, name, population, region, capital}) => {
  return (
    <div>
      <Link to={`/${name}`}>
        <img style={{width: '100px'}} src={thumbnail} alt={`${name}-img`} />
      </Link>
      <h2>{name}</h2>
      <div>Population: {population}</div>
      <div>Region: {region}</div>
      <div>Capital: {capital}</div>
    </div>
  );
}

export default Country;