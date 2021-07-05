import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../components/Loading';

const url = 'https://restcountries.eu/rest/v2/name/';

const SingleCountry = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getCountry () {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        console.log(data);
        if (data) {
          const {
            name: name,
          } = data[0];

          const newCountry = {
            name
          }
          setCountry(newCountry);
        } else {
          setCountry(null);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);     
        setLoading(false);
      }
    }
    getCountry();
  }, [id]); 

  if (loading) {
    return <Loading />
  }
  if (!country) {
    return <h2 className="section-title">no cocktail to display</h2>
  }

  const {name} = country;

  return (
    <div>
      {name}
    </div>
  );
}

export default SingleCountry;