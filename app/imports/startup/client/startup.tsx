import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { render } from 'react-dom';
import App from '../../ui/layouts/App';

/** Startup the application by rendering the App layout component. */
Meteor.startup(() => {
  render(<App />, document.getElementById('root'));  // eslint-disable-line
});
