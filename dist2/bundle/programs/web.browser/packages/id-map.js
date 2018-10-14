//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var EJSON = Package.ejson.EJSON;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var IdMap;

var require = meteorInstall({"node_modules":{"meteor":{"id-map":{"id-map.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
// packages/id-map/id-map.js                                                              //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////
                                                                                          //
module.export({
  IdMap: () => IdMap
});
const hasOwn = Object.prototype.hasOwnProperty;

class IdMap {
  constructor(idStringify, idParse) {
    this.clear();
    this._idStringify = idStringify || JSON.stringify;
    this._idParse = idParse || JSON.parse;
  } // Some of these methods are designed to match methods on OrderedDict, since
  // (eg) ObserveMultiplex and _CachingChangeObserver use them interchangeably.
  // (Conceivably, this should be replaced with "UnorderedDict" with a specific
  // set of methods that overlap between the two.)


  get(id) {
    var key = this._idStringify(id);

    return this._map[key];
  }

  set(id, value) {
    var key = this._idStringify(id);

    this._map[key] = value;
  }

  remove(id) {
    var key = this._idStringify(id);

    delete this._map[key];
  }

  has(id) {
    var key = this._idStringify(id);

    return hasOwn.call(this._map, key);
  }

  empty() {
    for (let key in this._map) {
      return false;
    }

    return true;
  }

  clear() {
    this._map = Object.create(null);
  } // Iterates over the items in the map. Return `false` to break the loop.


  forEach(iterator) {
    // don't use _.each, because we can't break out of it.
    var keys = Object.keys(this._map);

    for (var i = 0; i < keys.length; i++) {
      var breakIfFalse = iterator.call(null, this._map[keys[i]], this._idParse(keys[i]));

      if (breakIfFalse === false) {
        return;
      }
    }
  }

  size() {
    return Object.keys(this._map).length;
  }

  setDefault(id, def) {
    var key = this._idStringify(id);

    if (hasOwn.call(this._map, key)) {
      return this._map[key];
    }

    this._map[key] = def;
    return def;
  } // Assumes that values are EJSON-cloneable, and that we don't need to clone
  // IDs (ie, that nobody is going to mutate an ObjectId).


  clone() {
    var clone = new IdMap(this._idStringify, this._idParse);
    this.forEach(function (value, id) {
      clone.set(id, EJSON.clone(value));
    });
    return clone;
  }

}
////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/id-map/id-map.js");

/* Exports */
Package._define("id-map", exports, {
  IdMap: IdMap
});

})();
