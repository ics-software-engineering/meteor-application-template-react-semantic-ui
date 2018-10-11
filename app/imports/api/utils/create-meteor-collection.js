"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_1 = require("meteor/mongo");
var lock_meteor_collection_1 = require("./lock-meteor-collection");
function createCollection(name, schema) {
    var collection = new mongo_1.Mongo.Collection(name);
    collection.attachSchema(schema);
    return lock_meteor_collection_1.default(collection);
}
exports.default = createCollection;
//# sourceMappingURL=create-meteor-collection.js.map