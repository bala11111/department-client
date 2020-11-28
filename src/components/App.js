import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import Profile from './Profile';
import jwt_decode from "jwt-decode";
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        console.log('props', props);
        console.log('isLoggedin', isLoggedin);
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends Component {

  componentDidMount() {
    const token = getAuthTokenFromLocalStorage();
    console.log(jwt_decode);
    if (token) {
      const user = jwt_decode(token); 
      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          name : user.name,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }

  render() {
    const { auth} = this.props;
    return (
      <div>
        <Router>
         <Switch>
              <Route
                exact
                path="/"
                component={Home}
              />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />

            <PrivateRoute
              path="/user/:userId"
              component={Profile}
              isLoggedin={auth.isLoggedin}
            />
         </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(App);