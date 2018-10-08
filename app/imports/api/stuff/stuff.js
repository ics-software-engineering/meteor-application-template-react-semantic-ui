"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_1 = require("meteor/mongo");
var simpl_schema_1 = require("simpl-schema");
var tracker_1 = require("meteor/tracker");
/** Create a Meteor collection. */
// console.log('creating collection stuffs');
// console.trace('creating collection stuffs');
exports.Stuffs = new mongo_1.Mongo.Collection('Stuffs');
/** Create a schema to constrain the structure of documents associated with this collection. */
exports.StuffSchema = new simpl_schema_1.default({
    name: String,
    quantity: Number,
    owner: String,
    condition: {
        type: String,
        allowedValues: ['excellent', 'good', 'fair', 'poor'],
        defaultValue: 'good',
    },
}, { tracker: tracker_1.Tracker });
/** Attach this schema to the collection. */
exports.Stuffs.attachSchema(exports.StuffSchema);
/** Make the collection and schema available to other code. */
//export { Stuffs, StuffSchema };
//# sourceMappingURL=stuff.js.map