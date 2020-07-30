import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';

const stuffPublicationName = 'Stuff';
const stuffAdminPublicationName = 'StuffAdmin';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish(stuffPublicationName, function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish(stuffAdminPublicationName, function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});

/** Publish roles for each user. */
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

/** Make the publication names available to pages that need to subscribe to them. */
export { stuffPublicationName, stuffAdminPublicationName };
