import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
console.time('startup/server'); // tslint:disable-line
import { Stuffs } from '../../api/stuff/stuff';
console.timeEnd('startup/server'); // tslint:disable-line

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`); // tslint:disable-line
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.'); // tslint:disable-line
    Meteor.settings.defaultData.map((data) => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});
