import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import Home from './components/pages/Home';
import DashBoard from './components/pages/Dashboard';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import QuestionState from './context/question/QuestionState';
import AuthState from './context/auth/AuthState';

import './App.css';

function App() {
  return (
    <AuthState>
      <QuestionState>
        <Router>
          <Fragment>
            <NavBar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/dashboard' component={DashBoard} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/about' component={About} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </QuestionState>
    </AuthState>
  );
}

export default App;
