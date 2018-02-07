import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// This is the default semantic css but can be replaced by a customized version
import 'semantic-ui-css/semantic.css';

// Public components
import TopHeader from '../..//ui/components/TopHeader.jsx';
import Footer from '../..//ui/components/Footer.jsx';
import Home from '../../ui/pages/Home.jsx';
import ListStuff from '../../ui/pages/ListStuff.jsx';
import AddStuff from '../../ui/pages/AddStuff.jsx';
import Settings from '../../ui/pages/Settings.jsx';
import Account from '../../ui/pages/Account.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';
import Signin from '../../ui/pages/Signin.jsx';
import Signup from '../../ui/pages/Signup.jsx';
import Signout from '../../ui/pages/Signout.jsx';

Meteor.startup(() => {
  render(
    <Router>
      <div>
        <TopHeader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <ProtectedRoute path="/list-stuff" component={ListStuff} />
          <ProtectedRoute path="/add-stuff" component={AddStuff} />
          <ProtectedRoute path="/account" component={Account} />
          <ProtectedRoute path="/settings" component={Settings} />
          <ProtectedRoute path="/signout" component={Signout} />
          <Route component={NotFound} />
        </Switch>
        <Footer />

      </div>
    </Router>,
    /* eslint-disable no-undef */
    document.getElementById('root'),
  );
});

/**
 * ProtectedRoute (see React Router v4 sample)
 * will check the Meteor login before routing to the requested page
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};
