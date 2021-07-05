import React, { useState, useContext, useEffect, useCallback, useReducer } from 'react';
import reducer from './reducer';

const url = 'https://restcountries.eu/rest/v2/name/';
const AppContext = React.createContext();

const initialState = {
  darkMode: true,
}

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('c');
  const [countries, setCountries] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState)

  const setMode = () => {
    dispatch({type: 'SET_MODE'});
  }

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();

      if (data) {
        const newCountries = data.map((item) => {
          const {
            flag,
            name,
            population,
            region,
            capital
          } = item;
          return {
            thumbnail: flag,
            name: name,
            population: population,
            region: region,
            capital: capital
          };
        })
        setCountries(newCountries);
      } else {
        setCountries([]);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchCountries();
  }, [searchTerm, fetchCountries]);

  return <AppContext.Provider value={{
    ...state,
    loading,
    countries,
    setSearchTerm,
    setMode,
  }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider };