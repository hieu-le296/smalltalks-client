import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Import layout components
import NavBar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';

// Import pages components
import Home from './components/pages/Home';
import DashBoard from './components/pages/Dashboard';
import Profile from './components/pages/Profile';
import About from './components/pages/About';

// Import Auth components
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';

// Import question components
import QuestionPage from './components/questions/public/QuestionPage';

// Import contexts and states
import QuestionState from './context/question/QuestionState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import './App.css';

function App() {
  return (
    <AuthState>
      <QuestionState>
        <AlertState>
          <Router>
            <Fragment>
              <NavBar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route
                    exact
                    path='/questions/:questionId'
                    component={QuestionPage}
                  />
                  <PrivateRoute exact path='/dashboard' component={DashBoard} />
                  <PrivateRoute exact path='/profile' component={Profile} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/about' component={About} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </QuestionState>
    </AuthState>
  );
}

export default App;
