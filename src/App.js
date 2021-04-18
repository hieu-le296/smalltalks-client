import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import Home from './components/pages/Home';
import DashBoard from './components/pages/Dashboard';
import About from './components/pages/About';
import './App.css';

import QuestionState from './context/question/QuestionState';

function App() {
  return (
    <QuestionState>
      <Router>
        <Fragment>
          <NavBar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/dashboard' component={DashBoard} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </QuestionState>
  );
}

export default App;
