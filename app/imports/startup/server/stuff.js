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

/** If admin user, publish all documents, otherwise publish only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Roles.userIsInRole(this.userId, 'admin') ? Stuff.find() : Stuff.find({ username });
  }
  return this.ready();
});
