import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuff } from '../../api/stuff/stuff.js';

/** A list of documents to be used to initialize the Collection. */
const seedData = [
  { name: 'Basket', quantity: 3, username: 'john@foo.com', condition: 'excellent' },
  { name: 'Bicycle', quantity: 2, username: 'john@foo.com', condition: 'poor' },
  { name: 'Banana', quantity: 2, username: 'admin@foo.com', condition: 'good' },
  { name: 'Boogie Board', quantity: 2, username: 'admin@foo.com', condition: 'excellent' },
];

/** Initialize the collection if empty. */
if (Stuff.find().count() === 0) {
  _.each(seedData, data => Stuff.insert(data));
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuff.find({ username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuff.find();
  }
  return this.ready();
});
