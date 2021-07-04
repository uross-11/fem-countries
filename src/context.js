import React, { useState, useContext, useEffect, useCallback } from 'react';

const url = 'https://restcountries.eu/rest/v2/name/';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('c');
  const [countries, setCountries] = useState([]);

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
    loading,
    countries,
    setSearchTerm
  }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider };