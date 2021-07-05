import React, { useRef } from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
  const {setSearchTerm} = useGlobalContext();
  const searchValue = useRef('');

  const searchCountry = () => {
    setSearchTerm(searchValue.current.value);
    console.log(searchValue.current.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} action=''>
      <input
        onChange={searchCountry}
        type="text"
        placeholder='Search for a country...'
        name="name"
        id="name"
        ref={searchValue}
      />
      <select name="region" id="region">
        <option value="" selected disabled hidden>Filter by region</option>
        <option value="africa">Africa</option>
        <option value="america">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </form>
  );
}

export default SearchForm;