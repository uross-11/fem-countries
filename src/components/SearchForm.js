import React from 'react';

const SearchForm = () => {
  return (
    <form>
      <input type="text" placeholder='Search for a country...' name="name" id="name" />
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