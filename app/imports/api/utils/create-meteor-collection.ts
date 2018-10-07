import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import lockCollection from './lock-meteor-collection';

export default function createCollection<DocInterface>(name: string, schema: SimpleSchema): Mongo.Collection<DocInterface> {
  const collection: Mongo.Collection<DocInterface> = new Mongo.Collection<DocInterface>(name);
  collection.attachSchema(schema);
  return lockCollection<DocInterface>(collection);
}
