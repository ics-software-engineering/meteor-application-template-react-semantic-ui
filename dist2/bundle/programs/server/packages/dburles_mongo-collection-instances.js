(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var _ = Package.underscore._;
var CollectionExtensions = Package['lai:collection-extensions'].CollectionExtensions;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/dburles_mongo-collection-instances/mongo-instances.js                                             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var instances = [];

CollectionExtensions.addExtension(function (name, options) {
  instances.push({
    name: name,
    instance: this,
    options: options
  });
});

Mongo.Collection.get = function(name, options) {
  options = options || {};
  var collection = _.find(instances, function(instance) {
    if (options.connection)
      return instance.name === name &&
        instance.options && instance.options.connection._lastSessionId === options.connection._lastSessionId;
    return instance.name === name;
  });

  return collection && collection.instance;
};

Mongo.Collection.getAll = function() {
  return instances;
};

// Meteor.Collection will lack ownProperties that are added back to Mongo.Collection
Meteor.Collection = Mongo.Collection;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("dburles:mongo-collection-instances");

})();
