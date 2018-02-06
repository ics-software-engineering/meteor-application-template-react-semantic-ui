import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Stuff = new Mongo.Collection('Stuff');

/**
 * Create the schema for Stuff
 */
export const StuffSchema = new SimpleSchema({
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

Stuff.attachSchema(StuffSchema);

export default Stuff;
