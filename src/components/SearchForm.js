import React, { useRef } from 'react';
import { useGlobalContext } from '../context';
import {AiOutlineSearch} from 'react-icons/ai';
import {RiArrowDropDownLine} from 'react-icons/ri';

const SearchForm = () => {
  const {setSearchTerm, setRegion} = useGlobalContext();
  const searchValue = useRef('');
  const filterRegion = useRef('');
  const region = document.getElementById('region');

  const searchCountry = () => {
    region.selectedIndex = '0';
    setRegion(filterRegion.current.value = '');
    setSearchTerm(searchValue.current.value);
  }

  const selectRegion = () => {
    searchValue.current.value = '';
    setRegion(filterRegion.current.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form className='form container-h' onSubmit={handleSubmit} action=''>
      <div className="form__container">
        <AiOutlineSearch className='form__searchicon' />
        <input
          className='form__input'
          onChange={searchCountry}
          type="text"
          placeholder='Search for a country...'
          name="name"
          id="name"
          ref={searchValue}
          autoComplete='off'
        />
      </div>
      <div className="form__container">
        <select
          className='form__select'
          onChange={selectRegion}
          ref={filterRegion}
          name="region"
          id="region"
        >
          <option value="" selected disabled hidden>
            Filter by Region
          </option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
        <RiArrowDropDownLine className='form__arrowicon' />
      </div>
    </form>
  );
}

export default SearchForm;