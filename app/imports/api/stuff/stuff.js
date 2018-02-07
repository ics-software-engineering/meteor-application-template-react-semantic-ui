import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Stuff = new Mongo.Collection('Stuff');

/** Create a schema to constrain the structure of documents associated with this collection. */
const StuffSchema = new SimpleSchema({
  name: {
    label: 'Name',
    type: String,
    optional: false,
    max: 20,
  },
  quantity: {
    label: 'Quantity',
    type: Number,
    optional: false,
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Stuff.attachSchema(StuffSchema);

/** Make the collection and schema available to other code. */
export { Stuff, StuffSchema };
