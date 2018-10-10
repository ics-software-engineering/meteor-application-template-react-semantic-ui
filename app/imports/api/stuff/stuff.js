"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simpl_schema_1 = require("simpl-schema");
var tracker_1 = require("meteor/tracker");
/** Create a Meteor collection. */
// console.log('creating collection stuffs');
// console.trace('creating collection stuffs');
var Stuffs = new Mongo.Collection('Stuffs');
exports.Stuffs = Stuffs;
/** Create a schema to constrain the structure of documents associated with this collection. */
var StuffSchema = new simpl_schema_1.default({
    name: String,
    quantity: Number,
    owner: String,
    condition: {
        type: String,
        allowedValues: ['excellent', 'good', 'fair', 'poor'],
        defaultValue: 'good',
    },
}, { tracker: tracker_1.Tracker });
exports.StuffSchema = StuffSchema;
/** Attach this schema to the collection. */
Stuffs.attachSchema(StuffSchema);
//# sourceMappingURL=stuff.js.map