import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuff } from '../../api/stuff/stuff.js';

/** A list of documents to be used to initialize the Collection. */
const seedData = [
  { name: 'Basket', quantity: 3, username: 'john@foo.com', condition: 'excellent' },
  { name: 'Bicycle', quantity: 2, username: 'john@foo.com', condition: 'poor' },
];

/** Initialize the collection if empty. */
if (Stuff.find().count() === 0) {
  _.each(seedData, data => Stuff.insert(data));
}

/** Publish the documents associated with the logged . */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Roles.userIsInRole(this.userID, 'admin') ? Stuff.find() : Stuff.find({ username });
  }
  return this.ready();
});
