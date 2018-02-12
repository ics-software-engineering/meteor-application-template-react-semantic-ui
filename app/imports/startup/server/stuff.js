import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Stuff } from '../../api/stuff/stuff.js';

/** A list of Stuff to be used to initialize the Collection. */
const stuffSeeds = [
  { name: 'Basket', quantity: 3 },
  { name: 'Bicycle', quantity: 2 },
];

/** Initialize the Stuff collection if empty. */
if (Stuff.find().count() === 0) {
  _.each(stuffSeeds, function seedStuffs(stuff) {
    Stuff.insert(stuff);
  });
}

/** Publish the entire contents of the Stuff collection. OK when prototyping. */
Meteor.publish('Stuff', function publish() {
  return Stuff.find();
});
