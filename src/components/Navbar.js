import React from 'react';
import { useGlobalContext } from '../context';



const Navbar = () => {
  const { setMode, darkMode } = useGlobalContext();
  return (
    <nav>
      <span>Where in the world?</span>
      <button onClick={
        setMode
      }>
        {darkMode ? 'dark' : 'light'} mode
      </button>
    </nav>
  );
}

export default Navbar;