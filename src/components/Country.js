import React from 'react';
import { Link } from 'react-router-dom';

const Country = ({thumbnail, name, population, region, capital}) => {
  return (
    <div>
      {name} 
      <Link to={`/country/${name}`}>
        details
      </Link>
    </div>
  );
}

export default Country;