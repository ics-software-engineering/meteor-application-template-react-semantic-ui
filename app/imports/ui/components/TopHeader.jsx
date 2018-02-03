import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';

class TopHeader extends React.Component {
  render() {
    return (
      <Menu secondary pointing>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/">
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/example">
          Example
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/signin">
          Sign In
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/signup">
          Sign Up
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/bad-url">
          Not Found Page
        </Menu.Item>
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown text="Please Sign In" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item
                  icon="user"
                  text="Sign In"
                  as={NavLink}
                  exact
                  to="/signin"
                />
                <Dropdown.Item
                  icon="add user"
                  text="Sign Up"
                  as={NavLink}
                  exact
                  to="/signup"
                />
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown
              text={this.props.currentUser}
              pointing="top right"
              icon={'user'}
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  icon="user"
                  text="Account"
                  as={NavLink}
                  exact
                  to="/account"
                />
                <Dropdown.Item
                  icon="settings"
                  text="Settings"
                  as={NavLink}
                  exact
                  to="/settings"
                />
                <Dropdown.Item
                  icon="sign out"
                  text="Sign Out"
                  as={NavLink}
                  exact
                  to="/signout"
                />
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

TopHeader.propTypes = {
  currentUser: PropTypes.string,
};

// withRouter HOC.
// see explanation: https://reacttraining.com/react-router/web/api/withRouter

const TopHeaderContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(TopHeader);
export default withRouter(TopHeaderContainer);
