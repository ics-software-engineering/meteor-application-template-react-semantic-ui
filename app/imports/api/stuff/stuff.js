import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Stuff = new Mongo.Collection('Stuff');

/** Create a schema to constrain the structure of documents associated with this collection. */
const StuffSchema = new SimpleSchema({
  name: {
    type: String,
    optional: false,
    max: 20,
  },
  quantity: {
    type: Number,
    optional: false,
  },
  username: {
    type: String,
    optional: false,
  },
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Stuff.attachSchema(StuffSchema);

/** Make the collection and schema available to other code. */
export { Stuff, StuffSchema };
