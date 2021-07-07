import React, { useState, useContext, useEffect, useCallback, useReducer } from 'react';
import reducer from './reducer';

const url = 'https://restcountries.eu/rest/v2/';
const AppContext = React.createContext();

const initialState = {
  darkMode: true,
}

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState('');
  const [codes, setCodes] = useState({});

  const [state, dispatch] = useReducer(reducer, initialState)

  const setMode = () => {
    dispatch({type: 'SET_MODE'});
  }

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    try {
      var urlSearch = url;

      if (searchTerm) {
        urlSearch = `${url}name/${searchTerm}`;
      }
      if (region) {
        urlSearch = `${url}region/${region}`;
      }

      const response = await fetch(urlSearch);
      const data = await response.json();

      if (data) {
        if(!searchTerm && !region) {
          const a3c = data.map(item => {
            const {
              name,
              alpha3Code
            } = item;
            return {
              name: name,
              code: alpha3Code
            }
          })
          setCodes(a3c)
        }

        const newCountries = data.map(item => {
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
  }, [searchTerm, region]);

  useEffect(() => {
    fetchCountries();
  }, [searchTerm, fetchCountries]);

  return <AppContext.Provider value={{
    ...state,
    loading,
    countries,
    setSearchTerm,
    setMode,
    setRegion,
    codes,
  }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider };