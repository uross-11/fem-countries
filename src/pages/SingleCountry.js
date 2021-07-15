import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { Link } from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs';

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
    <div className='singlecountry container-sc'>
      <button className='singlecountry__back bs'>
        <Link className='singlecountry__back__link' to='/'>
          <BsArrowLeft className='singlecountry__back__link__arrow' />
          Back
        </Link>
      </button>

      <div className="singlecountry__img">
        <img src={flag} alt={name} />
      </div>

      <h2 className='singlecountry__name'>{name}</h2>

      <div className="singlecountry__primary">
        <div className='singlecountry__text'>
          <div className="singlecountry__text__b">Native name:</div>
          {nativeName}
        </div> 
        <div className='singlecountry__text'>
          <div className="singlecountry__text__b">Population:</div>
          {population.toLocaleString()}
        </div>
        <div className='singlecountry__text'>
          <div className="singlecountry__text__b">Region:</div>
          {region}
        </div>
        <div className='singlecountry__text'>
          <div className="singlecountry__text__b">Sub Region:</div>
          {subregion}
        </div>
        <div className='singlecountry__text'>
          <div className="singlecountry__text__b">Capital:</div>
          {capital}
        </div>
      </div>

      <div className="singlecountry__secondary">
        <div className='singlecountry__text'>
          <div className="singlecountry__text__b">Top Level Domain:</div>
          {topLevelDomain[0]}
        </div>
        <div className='singlecountry__text'>
          <div className="singlecountry__text__b">Currencies:</div>
          {currencies.map((item, index) => {
            if (index === currencies.length - 1) {
              return <span>{item.name}</span>
            }
            return <span>{item.name}, </span>
          })}
        </div>
        <div className='singlecountry__text'>
          <div className="singlecountry__text__b">Languages:</div>
          {languages.map((item, index) => {
            if (index === languages.length - 1) {
              return <span>{item.name}</span>
            }
            return <span>{item.name}, </span>
          })}
        </div>
      </div>

      <div className="singlecountry__borders">
        <div className='singlecountry__borders__title'>Border Countries:</div>
        <div>
          {borderCountries.map(item => {
            return (
              <button className='singlecountry__borders__button'>
                <Link className='singlecountry__borders__button__link' to={`/${item}`}>{item}</Link>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default SingleCountry;