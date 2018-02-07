import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Stuff } from '../../api/stuff/stuff.js';

/**
 * A list of Stuff to be used to initialize the Collection.
 * @type {*[]}
 */
const stuffSeeds = [
  { name: 'Basket', quantity: 3 },
  { name: 'Bicycle', quantity: 2 },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Stuff.find().count() === 0) {
  _.each(stuffSeeds, function seedStuffs(stuff) {
    Stuff.insert(stuff);
  });
}

/**
 * Stuff publications.
 */
Meteor.publish('Stuff', function publish() {
  return Stuff.find();
});
