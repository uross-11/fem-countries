// APIs 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Pages
import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';
import ErrorPage from './pages/ErrorPage';

// Components
import Navbar from './components/Navbar';

// Sass
import './styles/main.scss';

const App = () => {
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