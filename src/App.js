import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as ROUTES from './constants/routes.js'
import './assets/sass/App.scss';
import HomePage from './components/pages/Home'
import Navigation from './components/Navigation.js';
import AllQuotes from './components/AllQuotes.js';
import AddQuote from './components/AddQuote.js';



const App = () => {
  const [ currentUser, setCurrentUser] = useState('Lucas')
  

  return (<Router>
    <Navigation />
    <AddQuote />
     {currentUser ? (
       <>
       <Route exact path={ROUTES.HOME} component={HomePage}/>     
       <Route exact path={ROUTES.ALL_QUOTES} component={AllQuotes}/>     
       </>
    ) : (
      <div> Hello from Quotible Landing Page</div>
    )}
    </Router>)
    }
   

export default App;
