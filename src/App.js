import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useGlobalContext } from './context';

import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';
import ErrorPage from './pages/ErrorPage';

import Navbar from './components/Navbar';

import './styles/main.scss';

const App = () => {
  const {darkMode} = useGlobalContext();

  useEffect(() => {
    const body = document.querySelector('body');
    if (darkMode) {
      body.classList.add('dark');
      body.classList.remove('light');
    } else {
      body.classList.add('light');
      body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/:id' component={SingleCountry} />
          <Route path='*' component={ErrorPage} />
        </Switch>
      </Router>
  );
}

export default App;