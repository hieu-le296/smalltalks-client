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
import Admin from './components/pages/Admin';
import User from './components/pages/User';

// Import Auth components
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

// Import post components
import PostPage from './components/posts/public/PostPage';

// Import contexts and states
import PostState from './context/post/PostState';
import UserState from './context/users/UserState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import CommentState from './context/comment/commentState';

import './App.css';

function App() {
  return (
    <AuthState>
      <UserState>
        <PostState>
          <CommentState>
            <AlertState>
              <Router>
                <Fragment>
                  <NavBar />
                  <div className='container'>
                    <Alerts />
                    <Switch>
                      <Route exact path='/' component={Home} />
                      <Route exact path='/posts/:slug' component={PostPage} />
                      <Route exact path='/users/:username' component={User} />
                      <PrivateRoute
                        exact
                        path='/dashboard'
                        component={DashBoard}
                      />
                      <PrivateRoute exact path='/profile' component={Profile} />
                      <PrivateRoute exact path='/admin' component={Admin} />
                      <Route exact path='/register' component={Register} />
                      <Route exact path='/login' component={Login} />
                      <Route
                        exact
                        path='/forgotpassword'
                        component={ForgotPassword}
                      />
                      <Route
                        exact
                        path='/resetpassword/:resettoken'
                        component={ResetPassword}
                      />
                      <Route exact path='/about' component={About} />
                    </Switch>
                  </div>
                </Fragment>
              </Router>
            </AlertState>
          </CommentState>
        </PostState>
      </UserState>
    </AuthState>
  );
}

export default App;
