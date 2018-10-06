import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import createCollection from '../utils/create-meteor-collection';

/** Create a schema to constrain the structure of documents associated with this collection. */
export const StuffSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  owner: String,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
}, { tracker: Tracker });

export interface IStuff {
  name: string;
  quantity: number;
  owner: string;
  condition: {
    type: string;
  }
}

export const Stuffs: Mongo.Collection<IStuff> = createCollection<IStuff>('Stuffs', StuffSchema);
