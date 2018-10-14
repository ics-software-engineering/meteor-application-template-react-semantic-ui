(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "meteor/mongo", "meteor/tracker", "simpl-schema"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mongo_1 = require("meteor/mongo");
    var tracker_1 = require("meteor/tracker");
    var simpl_schema_1 = require("simpl-schema");
    /** Create a Meteor collection. */
    // console.log('creating collection stuffs');
    // console.trace('creating collection stuffs');
    var name = 'Stuffs';
    var StuffCollection = /** @class */ (function () {
        function StuffCollection() {
            // nothing to do.
        }
        StuffCollection.getInstance = function () {
            if (!StuffCollection.instance) {
                StuffCollection.instance = new StuffCollection();
                if (!mongo_1.Mongo.Collection.get(name)) {
                    StuffCollection.instance.collection = new mongo_1.Mongo.Collection(name);
                }
                else {
                    StuffCollection.instance.collection = mongo_1.Mongo.Collection.get(name);
                }
            }
            return StuffCollection.instance;
        };
        StuffCollection.prototype.getCollection = function () {
            return this.collection;
        };
        return StuffCollection;
    }());
    console.time('Stuffs'); // tslint:disable-line
    var Stuffs = StuffCollection.getInstance().getCollection();
    exports.Stuffs = Stuffs;
    console.timeEnd('Stuffs'); // tslint:disable-line
    /** Create a schema to constrain the structure of documents associated with this collection. */
    var StuffSchema = new simpl_schema_1.default({
        condition: {
            allowedValues: ['excellent', 'good', 'fair', 'poor'],
            defaultValue: 'good',
            type: String,
        },
        name: String,
        owner: String,
        quantity: Number,
    }, { tracker: tracker_1.Tracker });
    exports.StuffSchema = StuffSchema;
    /** Attach this schema to the collection. */
    Stuffs.attachSchema(StuffSchema);
});
//# sourceMappingURL=stuff.js.map