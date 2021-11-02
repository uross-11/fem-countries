import React, { useEffect, useState } from 'react';
import { Link , useParams } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { BsArrowLeft } from 'react-icons/bs';

import Loading from '../components/Loading';

const url = 'https://restcountries.com/v2/name/';

const SingleCountry = ({match}) => {

  const { id } = useParams();
  const param = id.replace(/-/g, ' ');

  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(null);

  const {codes} = useGlobalContext();
  
  useEffect(() => {
    setLoading(true);
    async function getCountry () {
      try {
        const response = await fetch(`${url}${param}`);
        const data = await response.json();
        if (data) {
          const {
            flags,
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
            flags,
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
  }, [id, param]);

  if (loading) {
    return <Loading />
  }
  if (!country) {
    return <h2>no country to display</h2>
  }

  const {
    flags,
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
  var borderCountries = [];
  // Border codes
  const c = Object.values(codes);

  for (let i = 0; i < c.length; i++) {
    for (let j = 0; j < borders.length; j++) {
      if(c[i].code === borders[j]) {
        borderCountries.push(c[i].name);
      }
    }
  }

  return (
    <div className='singlecountry container-sc'>
      <button className='singlecountry__back bs'>
        <Link className='singlecountry__back__link' to='/'>
          <BsArrowLeft className='singlecountry__back__link__arrow' />
          Back
        </Link>
      </button>

      <div className="singlecountry__content">

        <div className="singlecountry__img">
          <img src={flags.png} alt={name} />
        </div>

        <div className="singlecountry__info">

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
                  return <span key={index}>{item.name}</span>
                }
                return <span key={index}>{item.name}, </span>
              })}
            </div>
            <div className='singlecountry__text'>
              <div className="singlecountry__text__b">Languages:</div>
              {languages.map((item, index) => {
                if (index === languages.length - 1) {
                  return <span key={index}>{item.name}</span>
                }
                return <span key={index}>{item.name}, </span>
              })}
            </div>
          </div>

          <div className="singlecountry__borders">
            <div className='singlecountry__borders__title'>Border Countries:</div>
            <div className='singlecountry__borders__buttons'>
              {borderCountries.map((item, index) => {
                const param = item.replace(/\s+/g, '-').toLowerCase();
                return (
                  <button key={index} className='singlecountry__borders__button'>
                    <Link className='singlecountry__borders__button__link' to={`/${param}`}>{item}</Link>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SingleCountry;