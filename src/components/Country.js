import React from 'react';
import { Link } from 'react-router-dom';

const Country = ({thumbnail, name, population, region, capital}) => {
  return (
    <div className='country'>
      <Link className='country__img' to={`/${name}`}>
        <img src={thumbnail} alt={`${name}-img`} />
      </Link>
      <div className="country__description container-c">
        <h2 className='country__description__name'>{name}</h2>
        <div className='country__description__text'>Population: {population.toLocaleString()}</div>
        <div className='country__description__text'>Region: {region}</div>
        <div className='country__description__text'>Capital: {capital}</div>
      </div>
    </div>
  );
}

export default Country;