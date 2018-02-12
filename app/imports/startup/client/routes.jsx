import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('root'));  // eslint-disable-line
});
