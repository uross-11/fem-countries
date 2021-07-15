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
        <div className='country__description__text'>
          <div className="country__description__text__b">Population:</div>
          {population.toLocaleString()}
        </div>
        <div className='country__description__text'>
          <div className="country__description__text__b">Region:</div>
          {region}
        </div>
        <div className='country__description__text'>
          <div className="country__description__text__b">Capital:</div>
          {capital}
        </div>
      </div>
    </div>
  );
}

export default Country;