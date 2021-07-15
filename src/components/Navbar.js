import React from 'react';
import { useGlobalContext } from '../context';
import {RiMoonFill, RiSunFill} from 'react-icons/ri'

const Navbar = () => {
  const { setMode, darkMode } = useGlobalContext();
  return (
    <nav className='navbar bs'>
      <span className='navbar__title'>
        Where in the world?
      </span>
      <button className='navbar__toggle' onClick={setMode}>
        {darkMode ? <RiMoonFill className='navbar__toggle__icon' /> : <RiSunFill className='navbar__toggle__icon' />}
        {darkMode ? ' Dark ' : ' Light '}
        Mode
      </button>
    </nav>
  );
}

export default Navbar;