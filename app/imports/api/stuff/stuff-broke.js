"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simpl_schema_1 = require("simpl-schema");
var tracker_1 = require("meteor/tracker");
var create_meteor_collection_1 = require("../utils/create-meteor-collection");
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
exports.Stuffs = create_meteor_collection_1.default('Stuffs', exports.StuffSchema);
//# sourceMappingURL=stuff-broke.js.map