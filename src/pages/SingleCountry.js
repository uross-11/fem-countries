import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading';

const url = 'https://restcountries.eu/rest/v2/name/';

const SingleCountry = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(null);

  const {codes} = useGlobalContext();

  useEffect(() => {
    setLoading(true);
    async function getCountry () {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        console.log(data[0])
        if (data) {
          const {
            flag,
            name,
            nativeName,
            population,
            region,
            subregion,
            capital,
            topLevelDomain,
            languages,
            currencies,
            borders
          } = data[0];

          const newCountry = {
            flag,
            name,
            nativeName,
            population,
            region,
            subregion,
            capital,
            topLevelDomain,
            languages,
            currencies,
            borders
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
    return <h2>no country to display</h2>
  }

  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders
  } = country;

  // Transform borders array from [FRA, ITA] to [France, Italy]
  // Convert to for loop
  var borderCountries = [];
  const c = Object.values(codes)
  c.map(item => {
    borders.map(border => {
      if (item.code === border) {
        borderCountries.push(item.name);
      }
    })
  })

  return (
    <div>
      <Link to='/'>back</Link>
      <img style={{width: '100px'}} src={flag} alt={name} />
      <h2>{name}</h2>
      <div>Native name: {nativeName}</div> 
      <div>Population: {population.toLocaleString()}</div>
      <div>Region: {region}</div>
      <div>Sub Region: {subregion}</div>
      <div>Capital: {capital}</div>

      <div>Top Level Domain: {topLevelDomain[0]}</div>
      <div>Currencies: {currencies.map((item, index) => {
        if (index === currencies.length - 1) {
          return <span>{item.name}</span>
        }
        return <span>{item.name}, </span>
      })}</div>
      <div>Languages: {languages.map((item, index) => {
        if (index === languages.length - 1) {
          return <span>{item.name}</span>
        }
        return <span>{item.name}, </span>
      })}</div>
      <div>Border Countries:</div>
      <div>{borderCountries.map(item => {
        return <Link to={`/${item}`}>{item}</Link>
      })}</div>
    </div>
  );
}

export default SingleCountry;