import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/* eslint-disable no-console */

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccount) {
    console.log('Creating the default user');
    Accounts.createUser({
      username: Meteor.settings.defaultAccount.username,
      email: Meteor.settings.defaultAccount.email,
      password: Meteor.settings.defaultAccount.password,
    });
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
