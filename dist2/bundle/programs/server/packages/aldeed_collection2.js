(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var EventEmitter = Package['raix:eventemitter'].EventEmitter;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Collection2;

var require = meteorInstall({"node_modules":{"meteor":{"aldeed:collection2":{"collection2.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/aldeed_collection2/collection2.js                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

let EventEmitter;
module.link("meteor/raix:eventemitter", {
  EventEmitter(v) {
    EventEmitter = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 2);
let checkNpmVersions;
module.link("meteor/tmeasday:check-npm-versions", {
  checkNpmVersions(v) {
    checkNpmVersions = v;
  }

}, 3);
let clone;
module.link("clone", {
  default(v) {
    clone = v;
  }

}, 4);
let EJSON;
module.link("ejson", {
  default(v) {
    EJSON = v;
  }

}, 5);
let isEmpty;
module.link("lodash.isempty", {
  default(v) {
    isEmpty = v;
  }

}, 6);
let isEqual;
module.link("lodash.isequal", {
  default(v) {
    isEqual = v;
  }

}, 7);
let isObject;
module.link("lodash.isobject", {
  default(v) {
    isObject = v;
  }

}, 8);
checkNpmVersions({
  'simpl-schema': '>=0.0.0'
}, 'aldeed:collection2');

const SimpleSchema = require('simpl-schema').default; // Exported only for listening to events


const Collection2 = new EventEmitter();
const defaultCleanOptions = {
  filter: true,
  autoConvert: true,
  removeEmptyStrings: true,
  trimStrings: true,
  removeNullsFromArrays: false
};
/**
 * Mongo.Collection.prototype.attachSchema
 * @param {SimpleSchema|Object} ss - SimpleSchema instance or a schema definition object
 *    from which to create a new SimpleSchema instance
 * @param {Object} [options]
 * @param {Boolean} [options.transform=false] Set to `true` if your document must be passed
 *    through the collection's transform to properly validate.
 * @param {Boolean} [options.replace=false] Set to `true` to replace any existing schema instead of combining
 * @return {undefined}
 *
 * Use this method to attach a schema to a collection created by another package,
 * such as Meteor.users. It is most likely unsafe to call this method more than
 * once for a single collection, or to call this for a collection that had a
 * schema object passed to its constructor.
 */

Mongo.Collection.prototype.attachSchema = function c2AttachSchema(ss, options) {
  options = options || {}; // Allow passing just the schema object

  if (!(ss instanceof SimpleSchema)) {
    ss = new SimpleSchema(ss);
  }

  this._c2 = this._c2 || {}; // If we've already attached one schema, we combine both into a new schema unless options.replace is `true`

  if (this._c2._simpleSchema && options.replace !== true) {
    if (ss.version >= 2) {
      var newSS = new SimpleSchema(this._c2._simpleSchema);
      newSS.extend(ss);
      ss = newSS;
    } else {
      ss = new SimpleSchema([this._c2._simpleSchema, ss]);
    }
  }

  var selector = options.selector;

  function attachTo(obj) {
    if (typeof selector === "object") {
      // Index of existing schema with identical selector
      var schemaIndex = -1; // we need an array to hold multiple schemas

      obj._c2._simpleSchemas = obj._c2._simpleSchemas || []; // Loop through existing schemas with selectors

      obj._c2._simpleSchemas.forEach((schema, index) => {
        // if we find a schema with an identical selector, save it's index
        if (isEqual(schema.selector, selector)) {
          schemaIndex = index;
        }
      });

      if (schemaIndex === -1) {
        // We didn't find the schema in our array - push it into the array
        obj._c2._simpleSchemas.push({
          schema: new SimpleSchema(ss),
          selector: selector
        });
      } else {
        // We found a schema with an identical selector in our array,
        if (options.replace !== true) {
          // Merge with existing schema unless options.replace is `true`
          if (obj._c2._simpleSchemas[schemaIndex].schema.version >= 2) {
            obj._c2._simpleSchemas[schemaIndex].schema.extend(ss);
          } else {
            obj._c2._simpleSchemas[schemaIndex].schema = new SimpleSchema([obj._c2._simpleSchemas[schemaIndex].schema, ss]);
          }
        } else {
          // If options.repalce is `true` replace existing schema with new schema
          obj._c2._simpleSchemas[schemaIndex].schema = ss;
        }
      } // Remove existing schemas without selector


      delete obj._c2._simpleSchema;
    } else {
      // Track the schema in the collection
      obj._c2._simpleSchema = ss; // Remove existing schemas with selector

      delete obj._c2._simpleSchemas;
    }
  }

  attachTo(this); // Attach the schema to the underlying LocalCollection, too

  if (this._collection instanceof LocalCollection) {
    this._collection._c2 = this._collection._c2 || {};
    attachTo(this._collection);
  }

  defineDeny(this, options);
  keepInsecure(this);
  Collection2.emit('schema.attached', this, ss, options);
};

[Mongo.Collection, LocalCollection].forEach(obj => {
  /**
   * simpleSchema
   * @description function detect the correct schema by given params. If it
   * detect multi-schema presence in the collection, then it made an attempt to find a
   * `selector` in args
   * @param {Object} doc - It could be <update> on update/upsert or document
   * itself on insert/remove
   * @param {Object} [options] - It could be <update> on update/upsert etc
   * @param {Object} [query] - it could be <query> on update/upsert
   * @return {Object} Schema
   */
  obj.prototype.simpleSchema = function (doc, options, query) {
    if (!this._c2) return null;
    if (this._c2._simpleSchema) return this._c2._simpleSchema;
    var schemas = this._c2._simpleSchemas;

    if (schemas && schemas.length > 0) {
      if (!doc) throw new Error('collection.simpleSchema() requires doc argument when there are multiple schemas');
      var schema, selector, target;

      for (var i = 0; i < schemas.length; i++) {
        schema = schemas[i];
        selector = Object.keys(schema.selector)[0]; // We will set this to undefined because in theory you might want to select
        // on a null value.

        target = undefined; // here we are looking for selector in different places
        // $set should have more priority here

        if (doc.$set && typeof doc.$set[selector] !== 'undefined') {
          target = doc.$set[selector];
        } else if (typeof doc[selector] !== 'undefined') {
          target = doc[selector];
        } else if (options && options.selector) {
          target = options.selector[selector];
        } else if (query && query[selector]) {
          // on upsert/update operations
          target = query[selector];
        } // we need to compare given selector with doc property or option to
        // find right schema


        if (target !== undefined && target === schema.selector[selector]) {
          return schema.schema;
        }
      }
    }

    return null;
  };
}); // Wrap DB write operation methods

['insert', 'update'].forEach(methodName => {
  const _super = Mongo.Collection.prototype[methodName];

  Mongo.Collection.prototype[methodName] = function (...args) {
    let options = methodName === "insert" ? args[1] : args[2]; // Support missing options arg

    if (!options || typeof options === "function") {
      options = {};
    }

    if (this._c2 && options.bypassCollection2 !== true) {
      var userId = null;

      try {
        // https://github.com/aldeed/meteor-collection2/issues/175
        userId = Meteor.userId();
      } catch (err) {}

      args = doValidate(this, methodName, args, Meteor.isServer || this._connection === null, // getAutoValues
      userId, Meteor.isServer // isFromTrustedCode
      );

      if (!args) {
        // doValidate already called the callback or threw the error so we're done.
        // But insert should always return an ID to match core behavior.
        return methodName === "insert" ? this._makeNewID() : undefined;
      }
    } else {
      // We still need to adjust args because insert does not take options
      if (methodName === "insert" && typeof args[1] !== 'function') args.splice(1, 1);
    }

    return _super.apply(this, args);
  };
});
/*
 * Private
 */

function doValidate(collection, type, args, getAutoValues, userId, isFromTrustedCode) {
  var doc, callback, error, options, isUpsert, selector, last, hasCallback;

  if (!args.length) {
    throw new Error(type + " requires an argument");
  } // Gather arguments and cache the selector


  if (type === "insert") {
    doc = args[0];
    options = args[1];
    callback = args[2]; // The real insert doesn't take options

    if (typeof options === "function") {
      args = [doc, options];
    } else if (typeof callback === "function") {
      args = [doc, callback];
    } else {
      args = [doc];
    }
  } else if (type === "update") {
    selector = args[0];
    doc = args[1];
    options = args[2];
    callback = args[3];
  } else {
    throw new Error("invalid type argument");
  }

  var validatedObjectWasInitiallyEmpty = isEmpty(doc); // Support missing options arg

  if (!callback && typeof options === "function") {
    callback = options;
    options = {};
  }

  options = options || {};
  last = args.length - 1;
  hasCallback = typeof args[last] === 'function'; // If update was called with upsert:true, flag as an upsert

  isUpsert = type === "update" && options.upsert === true; // we need to pass `doc` and `options` to `simpleSchema` method, that's why
  // schema declaration moved here

  var schema = collection.simpleSchema(doc, options, selector);
  var isLocalCollection = collection._connection === null; // On the server and for local collections, we allow passing `getAutoValues: false` to disable autoValue functions

  if ((Meteor.isServer || isLocalCollection) && options.getAutoValues === false) {
    getAutoValues = false;
  } // Determine validation context


  var validationContext = options.validationContext;

  if (validationContext) {
    if (typeof validationContext === 'string') {
      validationContext = schema.namedContext(validationContext);
    }
  } else {
    validationContext = schema.namedContext();
  } // Add a default callback function if we're on the client and no callback was given


  if (Meteor.isClient && !callback) {
    // Client can't block, so it can't report errors by exception,
    // only by callback. If they forget the callback, give them a
    // default one that logs the error, so they aren't totally
    // baffled if their writes don't work because their database is
    // down.
    callback = function (err) {
      if (err) {
        Meteor._debug(type + " failed: " + (err.reason || err.stack));
      }
    };
  } // If client validation is fine or is skipped but then something
  // is found to be invalid on the server, we get that error back
  // as a special Meteor.Error that we need to parse.


  if (Meteor.isClient && hasCallback) {
    callback = args[last] = wrapCallbackForParsingServerErrors(validationContext, callback);
  }

  var schemaAllowsId = schema.allowsKey("_id");

  if (type === "insert" && !doc._id && schemaAllowsId) {
    doc._id = collection._makeNewID();
  } // Get the docId for passing in the autoValue/custom context


  var docId;

  if (type === 'insert') {
    docId = doc._id; // might be undefined
  } else if (type === "update" && selector) {
    docId = typeof selector === 'string' || selector instanceof Mongo.ObjectID ? selector : selector._id;
  } // If _id has already been added, remove it temporarily if it's
  // not explicitly defined in the schema.


  var cachedId;

  if (doc._id && !schemaAllowsId) {
    cachedId = doc._id;
    delete doc._id;
  }

  const autoValueContext = {
    isInsert: type === "insert",
    isUpdate: type === "update" && options.upsert !== true,
    isUpsert,
    userId,
    isFromTrustedCode,
    docId,
    isLocalCollection
  };
  const extendAutoValueContext = (0, _objectSpread2.default)({}, (schema._cleanOptions || {}).extendAutoValueContext || {}, autoValueContext, options.extendAutoValueContext);
  const cleanOptionsForThisOperation = {};
  ["autoConvert", "filter", "removeEmptyStrings", "removeNullsFromArrays", "trimStrings"].forEach(prop => {
    if (typeof options[prop] === "boolean") {
      cleanOptionsForThisOperation[prop] = options[prop];
    }
  }); // Preliminary cleaning on both client and server. On the server and for local
  // collections, automatic values will also be set at this point.

  schema.clean(doc, (0, _objectSpread2.default)({
    mutate: true,
    // Clean the doc/modifier in place
    isModifier: type !== "insert"
  }, defaultCleanOptions, schema._cleanOptions || {}, cleanOptionsForThisOperation, {
    extendAutoValueContext,
    // This was extended separately above
    getAutoValues // Force this override

  })); // We clone before validating because in some cases we need to adjust the
  // object a bit before validating it. If we adjusted `doc` itself, our
  // changes would persist into the database.

  var docToValidate = {};

  for (var prop in doc) {
    // We omit prototype properties when cloning because they will not be valid
    // and mongo omits them when saving to the database anyway.
    if (Object.prototype.hasOwnProperty.call(doc, prop)) {
      docToValidate[prop] = doc[prop];
    }
  } // On the server, upserts are possible; SimpleSchema handles upserts pretty
  // well by default, but it will not know about the fields in the selector,
  // which are also stored in the database if an insert is performed. So we
  // will allow these fields to be considered for validation by adding them
  // to the $set in the modifier. This is no doubt prone to errors, but there
  // probably isn't any better way right now.


  if (Meteor.isServer && isUpsert && isObject(selector)) {
    var set = docToValidate.$set || {}; // If selector uses $and format, convert to plain object selector

    if (Array.isArray(selector.$and)) {
      const plainSelector = {};
      selector.$and.forEach(sel => {
        Object.assign(plainSelector, sel);
      });
      docToValidate.$set = plainSelector;
    } else {
      docToValidate.$set = clone(selector);
    }

    if (!schemaAllowsId) delete docToValidate.$set._id;
    Object.assign(docToValidate.$set, set);
  } // Set automatic values for validation on the client.
  // On the server, we already updated doc with auto values, but on the client,
  // we will add them to docToValidate for validation purposes only.
  // This is because we want all actual values generated on the server.


  if (Meteor.isClient && !isLocalCollection) {
    schema.clean(docToValidate, {
      autoConvert: false,
      extendAutoValueContext,
      filter: false,
      getAutoValues: true,
      isModifier: type !== "insert",
      mutate: true,
      // Clean the doc/modifier in place
      removeEmptyStrings: false,
      removeNullsFromArrays: false,
      trimStrings: false
    });
  } // XXX Maybe move this into SimpleSchema


  if (!validatedObjectWasInitiallyEmpty && isEmpty(docToValidate)) {
    throw new Error('After filtering out keys not in the schema, your ' + (type === 'update' ? 'modifier' : 'object') + ' is now empty');
  } // Validate doc


  var isValid;

  if (options.validate === false) {
    isValid = true;
  } else {
    isValid = validationContext.validate(docToValidate, {
      modifier: type === "update" || type === "upsert",
      upsert: isUpsert,
      extendedCustomContext: (0, _objectSpread2.default)({
        isInsert: type === "insert",
        isUpdate: type === "update" && options.upsert !== true,
        isUpsert,
        userId,
        isFromTrustedCode,
        docId,
        isLocalCollection
      }, options.extendedCustomContext || {})
    });
  }

  if (isValid) {
    // Add the ID back
    if (cachedId) {
      doc._id = cachedId;
    } // Update the args to reflect the cleaned doc
    // XXX not sure this is necessary since we mutate


    if (type === "insert") {
      args[0] = doc;
    } else {
      args[1] = doc;
    } // If callback, set invalidKey when we get a mongo unique error


    if (Meteor.isServer && hasCallback) {
      args[last] = wrapCallbackForParsingMongoValidationErrors(validationContext, args[last]);
    }

    return args;
  } else {
    error = getErrorObject(validationContext, `in ${collection._name} ${type}`);

    if (callback) {
      // insert/update/upsert pass `false` when there's an error, so we do that
      callback(error, false);
    } else {
      throw error;
    }
  }
}

function getErrorObject(context, appendToMessage = '') {
  let message;
  const invalidKeys = typeof context.validationErrors === 'function' ? context.validationErrors() : context.invalidKeys();

  if (invalidKeys.length) {
    const firstErrorKey = invalidKeys[0].name;
    const firstErrorMessage = context.keyErrorMessage(firstErrorKey); // If the error is in a nested key, add the full key to the error message
    // to be more helpful.

    if (firstErrorKey.indexOf('.') === -1) {
      message = firstErrorMessage;
    } else {
      message = `${firstErrorMessage} (${firstErrorKey})`;
    }
  } else {
    message = "Failed validation";
  }

  message = `${message} ${appendToMessage}`.trim();
  const error = new Error(message);
  error.invalidKeys = invalidKeys;
  error.validationContext = context; // If on the server, we add a sanitized error, too, in case we're
  // called from a method.

  if (Meteor.isServer) {
    error.sanitizedError = new Meteor.Error(400, message, EJSON.stringify(error.invalidKeys));
  }

  return error;
}

function addUniqueError(context, errorMessage) {
  var name = errorMessage.split('c2_')[1].split(' ')[0];
  var val = errorMessage.split('dup key:')[1].split('"')[1];
  var addValidationErrorsPropName = typeof context.addValidationErrors === 'function' ? 'addValidationErrors' : 'addInvalidKeys';
  context[addValidationErrorsPropName]([{
    name: name,
    type: 'notUnique',
    value: val
  }]);
}

function wrapCallbackForParsingMongoValidationErrors(validationContext, cb) {
  return function wrappedCallbackForParsingMongoValidationErrors(...args) {
    const error = args[0];

    if (error && (error.name === "MongoError" && error.code === 11001 || error.message.indexOf('MongoError: E11000' !== -1)) && error.message.indexOf('c2_') !== -1) {
      addUniqueError(validationContext, error.message);
      args[0] = getErrorObject(validationContext);
    }

    return cb.apply(this, args);
  };
}

function wrapCallbackForParsingServerErrors(validationContext, cb) {
  var addValidationErrorsPropName = typeof validationContext.addValidationErrors === 'function' ? 'addValidationErrors' : 'addInvalidKeys';
  return function wrappedCallbackForParsingServerErrors(...args) {
    const error = args[0]; // Handle our own validation errors

    if (error instanceof Meteor.Error && error.error === 400 && error.reason === "INVALID" && typeof error.details === "string") {
      var invalidKeysFromServer = EJSON.parse(error.details);
      validationContext[addValidationErrorsPropName](invalidKeysFromServer);
      args[0] = getErrorObject(validationContext);
    } // Handle Mongo unique index errors, which are forwarded to the client as 409 errors
    else if (error instanceof Meteor.Error && error.error === 409 && error.reason && error.reason.indexOf('E11000') !== -1 && error.reason.indexOf('c2_') !== -1) {
        addUniqueError(validationContext, error.reason);
        args[0] = getErrorObject(validationContext);
      }

    return cb.apply(this, args);
  };
}

var alreadyInsecured = {};

function keepInsecure(c) {
  // If insecure package is in use, we need to add allow rules that return
  // true. Otherwise, it would seemingly turn off insecure mode.
  if (Package && Package.insecure && !alreadyInsecured[c._name]) {
    c.allow({
      insert: function () {
        return true;
      },
      update: function () {
        return true;
      },
      remove: function () {
        return true;
      },
      fetch: [],
      transform: null
    });
    alreadyInsecured[c._name] = true;
  } // If insecure package is NOT in use, then adding the two deny functions
  // does not have any effect on the main app's security paradigm. The
  // user will still be required to add at least one allow function of her
  // own for each operation for this collection. And the user may still add
  // additional deny functions, but does not have to.

}

var alreadyDefined = {};

function defineDeny(c, options) {
  if (!alreadyDefined[c._name]) {
    var isLocalCollection = c._connection === null; // First define deny functions to extend doc with the results of clean
    // and autovalues. This must be done with "transform: null" or we would be
    // extending a clone of doc and therefore have no effect.

    c.deny({
      insert: function (userId, doc) {
        // Referenced doc is cleaned in place
        c.simpleSchema(doc).clean(doc, {
          mutate: true,
          isModifier: false,
          // We don't do these here because they are done on the client if desired
          filter: false,
          autoConvert: false,
          removeEmptyStrings: false,
          trimStrings: false,
          extendAutoValueContext: {
            isInsert: true,
            isUpdate: false,
            isUpsert: false,
            userId: userId,
            isFromTrustedCode: false,
            docId: doc._id,
            isLocalCollection: isLocalCollection
          }
        });
        return false;
      },
      update: function (userId, doc, fields, modifier) {
        // Referenced modifier is cleaned in place
        c.simpleSchema(modifier).clean(modifier, {
          mutate: true,
          isModifier: true,
          // We don't do these here because they are done on the client if desired
          filter: false,
          autoConvert: false,
          removeEmptyStrings: false,
          trimStrings: false,
          extendAutoValueContext: {
            isInsert: false,
            isUpdate: true,
            isUpsert: false,
            userId: userId,
            isFromTrustedCode: false,
            docId: doc && doc._id,
            isLocalCollection: isLocalCollection
          }
        });
        return false;
      },
      fetch: ['_id'],
      transform: null
    }); // Second define deny functions to validate again on the server
    // for client-initiated inserts and updates. These should be
    // called after the clean/autovalue functions since we're adding
    // them after. These must *not* have "transform: null" if options.transform is true because
    // we need to pass the doc through any transforms to be sure
    // that custom types are properly recognized for type validation.

    c.deny((0, _objectSpread2.default)({
      insert: function (userId, doc) {
        // We pass the false options because we will have done them on client if desired
        doValidate(c, "insert", [doc, {
          trimStrings: false,
          removeEmptyStrings: false,
          filter: false,
          autoConvert: false
        }, function (error) {
          if (error) {
            throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));
          }
        }], false, // getAutoValues
        userId, false // isFromTrustedCode
        );
        return false;
      },
      update: function (userId, doc, fields, modifier) {
        // NOTE: This will never be an upsert because client-side upserts
        // are not allowed once you define allow/deny functions.
        // We pass the false options because we will have done them on client if desired
        doValidate(c, "update", [{
          _id: doc && doc._id
        }, modifier, {
          trimStrings: false,
          removeEmptyStrings: false,
          filter: false,
          autoConvert: false
        }, function (error) {
          if (error) {
            throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));
          }
        }], false, // getAutoValues
        userId, false // isFromTrustedCode
        );
        return false;
      },
      fetch: ['_id']
    }, options.transform === true ? {} : {
      transform: null
    })); // note that we've already done this collection so that we don't do it again
    // if attachSchema is called again

    alreadyDefined[c._name] = true;
  }
}

module.exportDefault(Collection2);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"clone":{"package.json":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2/node_modules/clone/package.json                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.exports = {
  "name": "clone",
  "version": "2.1.1",
  "main": "clone.js"
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"clone.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2/node_modules/clone/clone.js                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.useNode();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ejson":{"package.json":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2/node_modules/ejson/package.json                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.exports = {
  "name": "ejson",
  "version": "2.1.2",
  "main": "index.js"
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2/node_modules/ejson/index.js                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.useNode();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lodash.isempty":{"package.json":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2/node_modules/lodash.isempty/package.json                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.exports = {
  "name": "lodash.isempty",
  "version": "4.4.0"
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2/node_modules/lodash.isempty/index.js                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.useNode();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lodash.isequal":{"package.json":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2/node_modules/lodash.isequal/package.json                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.exports = {
  "name": "lodash.isequal",
  "version": "4.5.0"
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2/node_modules/lodash.isequal/index.js                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.useNode();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lodash.isobject":{"package.json":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2/node_modules/lodash.isobject/package.json                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.exports = {
  "name": "lodash.isobject",
  "version": "3.0.2"
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// node_modules/meteor/aldeed_collection2/node_modules/lodash.isobject/index.js                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.useNode();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/aldeed:collection2/collection2.js");

/* Exports */
Package._define("aldeed:collection2", exports, {
  Collection2: Collection2
});

})();

//# sourceURL=meteor://💻app/packages/aldeed_collection2.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYWxkZWVkOmNvbGxlY3Rpb24yL2NvbGxlY3Rpb24yLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsIm1vZHVsZSIsImxpbmsiLCJ2IiwiTWV0ZW9yIiwiTW9uZ28iLCJjaGVja05wbVZlcnNpb25zIiwiY2xvbmUiLCJkZWZhdWx0IiwiRUpTT04iLCJpc0VtcHR5IiwiaXNFcXVhbCIsImlzT2JqZWN0IiwiU2ltcGxlU2NoZW1hIiwicmVxdWlyZSIsIkNvbGxlY3Rpb24yIiwiZGVmYXVsdENsZWFuT3B0aW9ucyIsImZpbHRlciIsImF1dG9Db252ZXJ0IiwicmVtb3ZlRW1wdHlTdHJpbmdzIiwidHJpbVN0cmluZ3MiLCJyZW1vdmVOdWxsc0Zyb21BcnJheXMiLCJDb2xsZWN0aW9uIiwicHJvdG90eXBlIiwiYXR0YWNoU2NoZW1hIiwiYzJBdHRhY2hTY2hlbWEiLCJzcyIsIm9wdGlvbnMiLCJfYzIiLCJfc2ltcGxlU2NoZW1hIiwicmVwbGFjZSIsInZlcnNpb24iLCJuZXdTUyIsImV4dGVuZCIsInNlbGVjdG9yIiwiYXR0YWNoVG8iLCJvYmoiLCJzY2hlbWFJbmRleCIsIl9zaW1wbGVTY2hlbWFzIiwiZm9yRWFjaCIsInNjaGVtYSIsImluZGV4IiwicHVzaCIsIl9jb2xsZWN0aW9uIiwiTG9jYWxDb2xsZWN0aW9uIiwiZGVmaW5lRGVueSIsImtlZXBJbnNlY3VyZSIsImVtaXQiLCJzaW1wbGVTY2hlbWEiLCJkb2MiLCJxdWVyeSIsInNjaGVtYXMiLCJsZW5ndGgiLCJFcnJvciIsInRhcmdldCIsImkiLCJPYmplY3QiLCJrZXlzIiwidW5kZWZpbmVkIiwiJHNldCIsIm1ldGhvZE5hbWUiLCJfc3VwZXIiLCJhcmdzIiwiYnlwYXNzQ29sbGVjdGlvbjIiLCJ1c2VySWQiLCJlcnIiLCJkb1ZhbGlkYXRlIiwiaXNTZXJ2ZXIiLCJfY29ubmVjdGlvbiIsIl9tYWtlTmV3SUQiLCJzcGxpY2UiLCJhcHBseSIsImNvbGxlY3Rpb24iLCJ0eXBlIiwiZ2V0QXV0b1ZhbHVlcyIsImlzRnJvbVRydXN0ZWRDb2RlIiwiY2FsbGJhY2siLCJlcnJvciIsImlzVXBzZXJ0IiwibGFzdCIsImhhc0NhbGxiYWNrIiwidmFsaWRhdGVkT2JqZWN0V2FzSW5pdGlhbGx5RW1wdHkiLCJ1cHNlcnQiLCJpc0xvY2FsQ29sbGVjdGlvbiIsInZhbGlkYXRpb25Db250ZXh0IiwibmFtZWRDb250ZXh0IiwiaXNDbGllbnQiLCJfZGVidWciLCJyZWFzb24iLCJzdGFjayIsIndyYXBDYWxsYmFja0ZvclBhcnNpbmdTZXJ2ZXJFcnJvcnMiLCJzY2hlbWFBbGxvd3NJZCIsImFsbG93c0tleSIsIl9pZCIsImRvY0lkIiwiT2JqZWN0SUQiLCJjYWNoZWRJZCIsImF1dG9WYWx1ZUNvbnRleHQiLCJpc0luc2VydCIsImlzVXBkYXRlIiwiZXh0ZW5kQXV0b1ZhbHVlQ29udGV4dCIsIl9jbGVhbk9wdGlvbnMiLCJjbGVhbk9wdGlvbnNGb3JUaGlzT3BlcmF0aW9uIiwicHJvcCIsImNsZWFuIiwibXV0YXRlIiwiaXNNb2RpZmllciIsImRvY1RvVmFsaWRhdGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJzZXQiLCJBcnJheSIsImlzQXJyYXkiLCIkYW5kIiwicGxhaW5TZWxlY3RvciIsInNlbCIsImFzc2lnbiIsImlzVmFsaWQiLCJ2YWxpZGF0ZSIsIm1vZGlmaWVyIiwiZXh0ZW5kZWRDdXN0b21Db250ZXh0Iiwid3JhcENhbGxiYWNrRm9yUGFyc2luZ01vbmdvVmFsaWRhdGlvbkVycm9ycyIsImdldEVycm9yT2JqZWN0IiwiX25hbWUiLCJjb250ZXh0IiwiYXBwZW5kVG9NZXNzYWdlIiwibWVzc2FnZSIsImludmFsaWRLZXlzIiwidmFsaWRhdGlvbkVycm9ycyIsImZpcnN0RXJyb3JLZXkiLCJuYW1lIiwiZmlyc3RFcnJvck1lc3NhZ2UiLCJrZXlFcnJvck1lc3NhZ2UiLCJpbmRleE9mIiwidHJpbSIsInNhbml0aXplZEVycm9yIiwic3RyaW5naWZ5IiwiYWRkVW5pcXVlRXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJzcGxpdCIsInZhbCIsImFkZFZhbGlkYXRpb25FcnJvcnNQcm9wTmFtZSIsImFkZFZhbGlkYXRpb25FcnJvcnMiLCJ2YWx1ZSIsImNiIiwid3JhcHBlZENhbGxiYWNrRm9yUGFyc2luZ01vbmdvVmFsaWRhdGlvbkVycm9ycyIsImNvZGUiLCJ3cmFwcGVkQ2FsbGJhY2tGb3JQYXJzaW5nU2VydmVyRXJyb3JzIiwiZGV0YWlscyIsImludmFsaWRLZXlzRnJvbVNlcnZlciIsInBhcnNlIiwiYWxyZWFkeUluc2VjdXJlZCIsImMiLCJQYWNrYWdlIiwiaW5zZWN1cmUiLCJhbGxvdyIsImluc2VydCIsInVwZGF0ZSIsInJlbW92ZSIsImZldGNoIiwidHJhbnNmb3JtIiwiYWxyZWFkeURlZmluZWQiLCJkZW55IiwiZmllbGRzIiwiZXhwb3J0RGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFlBQUo7QUFBaUJDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLDBCQUFaLEVBQXVDO0FBQUNGLGNBQVksQ0FBQ0csQ0FBRCxFQUFHO0FBQUNILGdCQUFZLEdBQUNHLENBQWI7QUFBZTs7QUFBaEMsQ0FBdkMsRUFBeUUsQ0FBekU7QUFBNEUsSUFBSUMsTUFBSjtBQUFXSCxNQUFNLENBQUNDLElBQVAsQ0FBWSxlQUFaLEVBQTRCO0FBQUNFLFFBQU0sQ0FBQ0QsQ0FBRCxFQUFHO0FBQUNDLFVBQU0sR0FBQ0QsQ0FBUDtBQUFTOztBQUFwQixDQUE1QixFQUFrRCxDQUFsRDtBQUFxRCxJQUFJRSxLQUFKO0FBQVVKLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGNBQVosRUFBMkI7QUFBQ0csT0FBSyxDQUFDRixDQUFELEVBQUc7QUFBQ0UsU0FBSyxHQUFDRixDQUFOO0FBQVE7O0FBQWxCLENBQTNCLEVBQStDLENBQS9DO0FBQWtELElBQUlHLGdCQUFKO0FBQXFCTCxNQUFNLENBQUNDLElBQVAsQ0FBWSxvQ0FBWixFQUFpRDtB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QWtCLEVBQUUsS0FGdEI7QUFHRUYsZ0JBQU0sRUFBRSxLQUhWO0FBSUVDLHFCQUFXLEVBQUU7QUFKZixTQUhGLEVBU0UsVUFBUzJELEtBQVQsRUFBZ0I7QUFDZCxjQUFJQSxLQUFKLEVBQVc7QUFDVCxrQkFBTSxJQUFJekUsTUFBTSxDQUFDaUQsS0FBWCxDQUFpQixHQUFqQixFQUFzQixTQUF0QixFQUFpQzVDLEtBQUssQ0FBQytILFNBQU4sQ0FBZ0IzRCxLQUFLLENBQUNrRCxXQUF0QixDQUFqQyxDQUFOO0FBQ0Q7QUFDRixTQWJILENBSFEsRUFrQlIsS0FsQlEsRUFrQkQ7QUFDUC9ELGNBbkJRLEVBb0JSLEtBcEJRLENBb0JGO0FBcEJFLFNBQVY7QUF1QkEsZUFBTyxLQUFQO0FBQ0QsT0F2REg7QUF3REUrRixXQUFLLEVBQUUsQ0FBQyxLQUFEO0FBeERULE9BeURNcEksT0FBTyxDQUFDcUksU0FBUixLQUFzQixJQUF0QixHQUE2QixFQUE3QixHQUFrQztBQUFDQSxlQUFTLEVBQUU7QUFBWixLQXpEeEMsR0FoRTRCLENBNEg1QjtBQUNBOztBQUNBQyxrQkFBYyxDQUFDVCxDQUFDLENBQUM3QixLQUFILENBQWQsR0FBMEIsSUFBMUI7QUFDRDtBQUNGOztBQTVzQkQxSCxNQUFNLENBQUNtSyxhQUFQLENBOHNCZXJKLFdBOXNCZixFIiwiZmlsZSI6Ii9wYWNrYWdlcy9hbGRlZWRfY29sbGVjdGlvbjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdtZXRlb3IvcmFpeDpldmVudGVtaXR0ZXInO1xuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XG5pbXBvcnQgeyBjaGVja05wbVZlcnNpb25zIH0gZnJvbSAnbWV0ZW9yL3RtZWFzZGF5OmNoZWNrLW5wbS12ZXJzaW9ucyc7XG5pbXBvcnQgY2xvbmUgZnJvbSAnY2xvbmUnO1xuaW1wb3J0IEVKU09OIGZyb20gJ2Vqc29uJztcbmltcG9ydCBpc0VtcHR5IGZyb20gJ2xvZGFzaC5pc2VtcHR5JztcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2xvZGFzaC5pc2VxdWFsJztcbmltcG9ydCBpc09iamVjdCBmcm9tICdsb2Rhc2guaXNvYmplY3QnO1xuXG5jaGVja05wbVZlcnNpb25zKHsgJ3NpbXBsLXNjaGVtYSc6ICc+PTAuMC4wJyB9LCAnYWxkZWVkOmNvbGxlY3Rpb24yJyk7XG5cbmNvbnN0IFNpbXBsZVNjaGVtYSA9IHJlcXVpcmUoJ3NpbXBsLXNjaGVtYScpLmRlZmF1bHQ7XG5cbi8vIEV4cG9ydGVkIG9ubHkgZm9yIGxpc3RlbmluZyB0byBldmVudHNcbmNvbnN0IENvbGxlY3Rpb24yID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5jb25zdCBkZWZhdWx0Q2xlYW5PcHRpb25zID0ge1xuICBmaWx0ZXI6IHRydWUsXG4gIGF1dG9Db252ZXJ0OiB0cnVlLFxuICByZW1vdmVFbXB0eVN0cmluZ3M6IHRydWUsXG4gIHRyaW1TdHJpbmdzOiB0cnVlLFxuICByZW1vdmVOdWxsc0Zyb21BcnJheXM6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBNb25nby5Db2xsZWN0aW9uLnByb3RvdHlwZS5hdHRhY2hTY2hlbWFcbiAqIEBwYXJhbSB7U2ltcGxlU2NoZW1hfE9iamVjdH0gc3MgLSBTaW1wbGVTY2hlbWEgaW5zdGFuY2Ugb3IgYSBzY2hlbWEgZGVmaW5pdGlvbiBvYmplY3RcbiAqICAgIGZyb20gd2hpY2ggdG8gY3JlYXRlIGEgbmV3IFNpbXBsZVNjaGVtYSBpbnN0YW5jZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy50cmFuc2Zvcm09ZmFsc2VdIFNldCB0byBgdHJ1ZWAgaWYgeW91ciBkb2N1bWVudCBtdXN0IGJlIHBhc3NlZFxuICogICAgdGhyb3VnaCB0aGUgY29sbGVjdGlvbidzIHRyYW5zZm9ybSB0byBwcm9wZXJseSB2YWxpZGF0ZS5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMucmVwbGFjZT1mYWxzZV0gU2V0IHRvIGB0cnVlYCB0byByZXBsYWNlIGFueSBleGlzdGluZyBzY2hlbWEgaW5zdGVhZCBvZiBjb21iaW5pbmdcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAqXG4gKiBVc2UgdGhpcyBtZXRob2QgdG8gYXR0YWNoIGEgc2NoZW1hIHRvIGEgY29sbGVjdGlvbiBjcmVhdGVkIGJ5IGFub3RoZXIgcGFja2FnZSxcbiAqIHN1Y2ggYXMgTWV0ZW9yLnVzZXJzLiBJdCBpcyBtb3N0IGxpa2VseSB1bnNhZmUgdG8gY2FsbCB0aGlzIG1ldGhvZCBtb3JlIHRoYW5cbiAqIG9uY2UgZm9yIGEgc2luZ2xlIGNvbGxlY3Rpb24sIG9yIHRvIGNhbGwgdGhpcyBmb3IgYSBjb2xsZWN0aW9uIHRoYXQgaGFkIGFcbiAqIHNjaGVtYSBvYmplY3QgcGFzc2VkIHRvIGl0cyBjb25zdHJ1Y3Rvci5cbiAqL1xuTW9uZ28uQ29sbGVjdGlvbi5wcm90b3R5cGUuYXR0YWNoU2NoZW1hID0gZnVuY3Rpb24gYzJBdHRhY2hTY2hlbWEoc3MsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgLy8gQWxsb3cgcGFzc2luZyBqdXN0IHRoZSBzY2hlbWEgb2JqZWN0XG4gIGlmICghKHNzIGluc3RhbmNlb2YgU2ltcGxlU2NoZW1hKSkge1xuICAgIHNzID0gbmV3IFNpbXBsZVNjaGVtYShzcyk7XG4gIH1cblxuICB0aGlzLl9jMiA9IHRoaXMuX2MyIHx8IHt9O1xuXG4gIC8vIElmIHdlJ3ZlIGFscmVhZHkgYXR0YWNoZWQgb25lIHNjaGVtYSwgd2UgY29tYmluZSBib3RoIGludG8gYSBuZXcgc2NoZW1hIHVubGVzcyBvcHRpb25zLnJlcGxhY2UgaXMgYHRydWVgXG4gIGlmICh0aGlzLl9jMi5fc2ltcGxlU2NoZW1hICYmIG9wdGlvbnMucmVwbGFjZSAhPT0gdHJ1ZSkge1xuICAgIGlmIChzcy52ZXJzaW9uID49IDIpIHtcbiAgICAgIHZhciBuZXdTUyA9IG5ldyBTaW1wbGVTY2hlbWEodGhpcy5fYzIuX3NpbXBsZVNjaGVtYSk7XG4gICAgICBuZXdTUy5leHRlbmQoc3MpO1xuICAgICAgc3MgPSBuZXdTUztcbiAgICB9IGVsc2Uge1xuICAgICAgc3MgPSBuZXcgU2ltcGxlU2NoZW1hKFt0aGlzLl9jMi5fc2ltcGxlU2NoZW1hLCBzc10pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBzZWxlY3RvciA9IG9wdGlvbnMuc2VsZWN0b3I7XG5cbiAgZnVuY3Rpb24gYXR0YWNoVG8ob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJvYmplY3RcIikge1xuICAgICAgLy8gSW5kZXggb2YgZXhpc3Rpbmcgc2NoZW1hIHdpdGggaWRlbnRpY2FsIHNlbGVjdG9yXG4gICAgICB2YXIgc2NoZW1hSW5kZXggPSAtMTtcblxuICAgICAgLy8gd2UgbmVlZCBhbiBhcnJheSB0byBob2xkIG11bHRpcGxlIHNjaGVtYXNcbiAgICAgIG9iai5fYzIuX3NpbXBsZVNjaGVtYXMgPSBvYmouX2MyLl9zaW1wbGVTY2hlbWFzIHx8IFtdO1xuXG4gICAgICAvLyBMb29wIHRocm91Z2ggZXhpc3Rpbmcgc2NoZW1hcyB3aXRoIHNlbGVjdG9yc1xuICAgICAgb2JqLl9jMi5fc2ltcGxlU2NoZW1hcy5mb3JFYWNoKChzY2hlbWEsIGluZGV4KSA9PiB7XG4gICAgICAgIC8vIGlmIHdlIGZpbmQgYSBzY2hlbWEgd2l0aCBhbiBpZGVudGljYWwgc2VsZWN0b3IsIHNhdmUgaXQncyBpbmRleFxuICAgICAgICBpZihpc0VxdWFsKHNjaGVtYS5zZWxlY3Rvciwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgc2NoZW1hSW5kZXggPSBpbmRleDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoc2NoZW1hSW5kZXggPT09IC0xKSB7XG4gICAgICAgIC8vIFdlIGRpZG4ndCBmaW5kIHRoZSBzY2hlbWEgaW4gb3VyIGFycmF5IC0gcHVzaCBpdCBpbnRvIHRoZSBhcnJheVxuICAgICAgICBvYmouX2MyLl9zaW1wbGVTY2hlbWFzLnB1c2goe1xuICAgICAgICAgIHNjaGVtYTogbmV3IFNpbXBsZVNjaGVtYShzcyksXG4gICAgICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFdlIGZvdW5kIGEgc2NoZW1hIHdpdGggYW4gaWRlbnRpY2FsIHNlbGVjdG9yIGluIG91ciBhcnJheSxcbiAgICAgICAgaWYgKG9wdGlvbnMucmVwbGFjZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIE1lcmdlIHdpdGggZXhpc3Rpbmcgc2NoZW1hIHVubGVzcyBvcHRpb25zLnJlcGxhY2UgaXMgYHRydWVgXG4gICAgICAgICAgaWYgKG9iai5fYzIuX3NpbXBsZVNjaGVtYXNbc2NoZW1hSW5kZXhdLnNjaGVtYS52ZXJzaW9uID49IDIpIHtcbiAgICAgICAgICAgIG9iai5fYzIuX3NpbXBsZVNjaGVtYXNbc2NoZW1hSW5kZXhdLnNjaGVtYS5leHRlbmQoc3MpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmouX2MyLl9zaW1wbGVTY2hlbWFzW3NjaGVtYUluZGV4XS5zY2hlbWEgPSBuZXcgU2ltcGxlU2NoZW1hKFtvYmouX2MyLl9zaW1wbGVTY2hlbWFzW3NjaGVtYUluZGV4XS5zY2hlbWEsIHNzXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIElmIG9wdGlvbnMucmVwYWxjZSBpcyBgdHJ1ZWAgcmVwbGFjZSBleGlzdGluZyBzY2hlbWEgd2l0aCBuZXcgc2NoZW1hXG4gICAgICAgICAgb2JqLl9jMi5fc2ltcGxlU2NoZW1hc1tzY2hlbWFJbmRleF0uc2NoZW1hID0gc3M7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgZXhpc3Rpbmcgc2NoZW1hcyB3aXRob3V0IHNlbGVjdG9yXG4gICAgICBkZWxldGUgb2JqLl9jMi5fc2ltcGxlU2NoZW1hO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUcmFjayB0aGUgc2NoZW1hIGluIHRoZSBjb2xsZWN0aW9uXG4gICAgICBvYmouX2MyLl9zaW1wbGVTY2hlbWEgPSBzcztcblxuICAgICAgLy8gUmVtb3ZlIGV4aXN0aW5nIHNjaGVtYXMgd2l0aCBzZWxlY3RvclxuICAgICAgZGVsZXRlIG9iai5fYzIuX3NpbXBsZVNjaGVtYXM7XG4gICAgfVxuICB9XG5cbiAgYXR0YWNoVG8odGhpcyk7XG4gIC8vIEF0dGFjaCB0aGUgc2NoZW1hIHRvIHRoZSB1bmRlcmx5aW5nIExvY2FsQ29sbGVjdGlvbiwgdG9vXG4gIGlmICh0aGlzLl9jb2xsZWN0aW9uIGluc3RhbmNlb2YgTG9jYWxDb2xsZWN0aW9uKSB7XG4gICAgdGhpcy5fY29sbGVjdGlvbi5fYzIgPSB0aGlzLl9jb2xsZWN0aW9uLl9jMiB8fCB7fTtcbiAgICBhdHRhY2hUbyh0aGlzLl9jb2xsZWN0aW9uKTtcbiAgfVxuXG4gIGRlZmluZURlbnkodGhpcywgb3B0aW9ucyk7XG4gIGtlZXBJbnNlY3VyZSh0aGlzKTtcblxuICBDb2xsZWN0aW9uMi5lbWl0KCdzY2hlbWEuYXR0YWNoZWQnLCB0aGlzLCBzcywgb3B0aW9ucyk7XG59O1xuXG5bTW9uZ28uQ29sbGVjdGlvbiwgTG9jYWxDb2xsZWN0aW9uXS5mb3JFYWNoKChvYmopID0+IHtcbiAgLyoqXG4gICAqIHNpbXBsZVNjaGVtYVxuICAgKiBAZGVzY3JpcHRpb24gZnVuY3Rpb24gZGV0ZWN0IHRoZSBjb3JyZWN0IHNjaGVtYSBieSBnaXZlbiBwYXJhbXMuIElmIGl0XG4gICAqIGRldGVjdCBtdWx0aS1zY2hlbWEgcHJlc2VuY2UgaW4gdGhlIGNvbGxlY3Rpb24sIHRoZW4gaXQgbWFkZSBhbiBhdHRlbXB0IHRvIGZpbmQgYVxuICAgKiBgc2VsZWN0b3JgIGluIGFyZ3NcbiAgICogQHBhcmFtIHtPYmplY3R9IGRvYyAtIEl0IGNvdWxkIGJlIDx1cGRhdGU+IG9uIHVwZGF0ZS91cHNlcnQgb3IgZG9jdW1lbnRcbiAgICogaXRzZWxmIG9uIGluc2VydC9yZW1vdmVcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEl0IGNvdWxkIGJlIDx1cGRhdGU+IG9uIHVwZGF0ZS91cHNlcnQgZXRjXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcXVlcnldIC0gaXQgY291bGQgYmUgPHF1ZXJ5PiBvbiB1cGRhdGUvdXBzZXJ0XG4gICAqIEByZXR1cm4ge09iamVjdH0gU2NoZW1hXG4gICAqL1xuICBvYmoucHJvdG90eXBlLnNpbXBsZVNjaGVtYSA9IGZ1bmN0aW9uIChkb2MsIG9wdGlvbnMsIHF1ZXJ5KSB7XG4gICAgaWYgKCF0aGlzLl9jMikgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMuX2MyLl9zaW1wbGVTY2hlbWEpIHJldHVybiB0aGlzLl9jMi5fc2ltcGxlU2NoZW1hO1xuXG4gICAgdmFyIHNjaGVtYXMgPSB0aGlzLl9jMi5fc2ltcGxlU2NoZW1hcztcbiAgICBpZiAoc2NoZW1hcyAmJiBzY2hlbWFzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICghZG9jKSB0aHJvdyBuZXcgRXJyb3IoJ2NvbGxlY3Rpb24uc2ltcGxlU2NoZW1hKCkgcmVxdWlyZXMgZG9jIGFyZ3VtZW50IHdoZW4gdGhlcmUgYXJlIG11bHRpcGxlIHNjaGVtYXMnKTtcblxuICAgICAgdmFyIHNjaGVtYSwgc2VsZWN0b3IsIHRhcmdldDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2NoZW1hcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzY2hlbWEgPSBzY2hlbWFzW2ldO1xuICAgICAgICBzZWxlY3RvciA9IE9iamVjdC5rZXlzKHNjaGVtYS5zZWxlY3RvcilbMF07XG5cbiAgICAgICAgLy8gV2Ugd2lsbCBzZXQgdGhpcyB0byB1bmRlZmluZWQgYmVjYXVzZSBpbiB0aGVvcnkgeW91IG1pZ2h0IHdhbnQgdG8gc2VsZWN0XG4gICAgICAgIC8vIG9uIGEgbnVsbCB2YWx1ZS5cbiAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIGhlcmUgd2UgYXJlIGxvb2tpbmcgZm9yIHNlbGVjdG9yIGluIGRpZmZlcmVudCBwbGFjZXNcbiAgICAgICAgLy8gJHNldCBzaG91bGQgaGF2ZSBtb3JlIHByaW9yaXR5IGhlcmVcbiAgICAgICAgaWYgKGRvYy4kc2V0ICYmIHR5cGVvZiBkb2MuJHNldFtzZWxlY3Rvcl0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gZG9jLiRzZXRbc2VsZWN0b3JdO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2Nbc2VsZWN0b3JdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRhcmdldCA9IGRvY1tzZWxlY3Rvcl07XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNlbGVjdG9yKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gb3B0aW9ucy5zZWxlY3RvcltzZWxlY3Rvcl07XG4gICAgICAgIH0gZWxzZSBpZiAocXVlcnkgJiYgcXVlcnlbc2VsZWN0b3JdKSB7IC8vIG9uIHVwc2VydC91cGRhdGUgb3BlcmF0aW9uc1xuICAgICAgICAgIHRhcmdldCA9IHF1ZXJ5W3NlbGVjdG9yXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gY29tcGFyZSBnaXZlbiBzZWxlY3RvciB3aXRoIGRvYyBwcm9wZXJ0eSBvciBvcHRpb24gdG9cbiAgICAgICAgLy8gZmluZCByaWdodCBzY2hlbWFcbiAgICAgICAgaWYgKHRhcmdldCAhPT0gdW5kZWZpbmVkICYmIHRhcmdldCA9PT0gc2NoZW1hLnNlbGVjdG9yW3NlbGVjdG9yXSkge1xuICAgICAgICAgIHJldHVybiBzY2hlbWEuc2NoZW1hO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG59KTtcblxuLy8gV3JhcCBEQiB3cml0ZSBvcGVyYXRpb24gbWV0aG9kc1xuWydpbnNlcnQnLCAndXBkYXRlJ10uZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuICBjb25zdCBfc3VwZXIgPSBNb25nby5Db2xsZWN0aW9uLnByb3RvdHlwZVttZXRob2ROYW1lXTtcbiAgTW9uZ28uQ29sbGVjdGlvbi5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgbGV0IG9wdGlvbnMgPSAobWV0aG9kTmFtZSA9PT0gXCJpbnNlcnRcIikgPyBhcmdzWzFdIDogYXJnc1syXTtcblxuICAgIC8vIFN1cHBvcnQgbWlzc2luZyBvcHRpb25zIGFyZ1xuICAgIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2MyICYmIG9wdGlvbnMuYnlwYXNzQ29sbGVjdGlvbjIgIT09IHRydWUpIHtcbiAgICAgIHZhciB1c2VySWQgPSBudWxsO1xuICAgICAgdHJ5IHsgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FsZGVlZC9tZXRlb3ItY29sbGVjdGlvbjIvaXNzdWVzLzE3NVxuICAgICAgICB1c2VySWQgPSBNZXRlb3IudXNlcklkKCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHt9XG5cbiAgICAgIGFyZ3MgPSBkb1ZhbGlkYXRlKFxuICAgICAgICB0aGlzLFxuICAgICAgICBtZXRob2ROYW1lLFxuICAgICAgICBhcmdzLFxuICAgICAgICBNZXRlb3IuaXNTZXJ2ZXIgfHwgdGhpcy5fY29ubmVjdGlvbiA9PT0gbnVsbCwgLy8gZ2V0QXV0b1ZhbHVlc1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIE1ldGVvci5pc1NlcnZlciAvLyBpc0Zyb21UcnVzdGVkQ29kZVxuICAgICAgKTtcbiAgICAgIGlmICghYXJncykge1xuICAgICAgICAvLyBkb1ZhbGlkYXRlIGFscmVhZHkgY2FsbGVkIHRoZSBjYWxsYmFjayBvciB0aHJldyB0aGUgZXJyb3Igc28gd2UncmUgZG9uZS5cbiAgICAgICAgLy8gQnV0IGluc2VydCBzaG91bGQgYWx3YXlzIHJldHVybiBhbiBJRCB0byBtYXRjaCBjb3JlIGJlaGF2aW9yLlxuICAgICAgICByZXR1cm4gbWV0aG9kTmFtZSA9PT0gXCJpbnNlcnRcIiA/IHRoaXMuX21ha2VOZXdJRCgpIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBzdGlsbCBuZWVkIHRvIGFkanVzdCBhcmdzIGJlY2F1c2UgaW5zZXJ0IGRvZXMgbm90IHRha2Ugb3B0aW9uc1xuICAgICAgaWYgKG1ldGhvZE5hbWUgPT09IFwiaW5zZXJ0XCIgJiYgdHlwZW9mIGFyZ3NbMV0gIT09ICdmdW5jdGlvbicpIGFyZ3Muc3BsaWNlKDEsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBfc3VwZXIuYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG59KTtcblxuLypcbiAqIFByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBkb1ZhbGlkYXRlKGNvbGxlY3Rpb24sIHR5cGUsIGFyZ3MsIGdldEF1dG9WYWx1ZXMsIHVzZXJJZCwgaXNGcm9tVHJ1c3RlZENvZGUpIHtcbiAgdmFyIGRvYywgY2FsbGJhY2ssIGVycm9yLCBvcHRpb25zLCBpc1Vwc2VydCwgc2VsZWN0b3IsIGxhc3QsIGhhc0NhbGxiYWNrO1xuXG4gIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IodHlwZSArIFwiIHJlcXVpcmVzIGFuIGFyZ3VtZW50XCIpO1xuICB9XG5cbiAgLy8gR2F0aGVyIGFyZ3VtZW50cyBhbmQgY2FjaGUgdGhlIHNlbGVjdG9yXG4gIGlmICh0eXBlID09PSBcImluc2VydFwiKSB7XG4gICAgZG9jID0gYXJnc1swXTtcbiAgICBvcHRpb25zID0gYXJnc1sxXTtcbiAgICBjYWxsYmFjayA9IGFyZ3NbMl07XG5cbiAgICAvLyBUaGUgcmVhbCBpbnNlcnQgZG9lc24ndCB0YWtlIG9wdGlvbnNcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgYXJncyA9IFtkb2MsIG9wdGlvbnNdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGFyZ3MgPSBbZG9jLCBjYWxsYmFja107XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyZ3MgPSBbZG9jXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ1cGRhdGVcIikge1xuICAgIHNlbGVjdG9yID0gYXJnc1swXTtcbiAgICBkb2MgPSBhcmdzWzFdO1xuICAgIG9wdGlvbnMgPSBhcmdzWzJdO1xuICAgIGNhbGxiYWNrID0gYXJnc1szXTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHR5cGUgYXJndW1lbnRcIik7XG4gIH1cblxuICB2YXIgdmFsaWRhdGVkT2JqZWN0V2FzSW5pdGlhbGx5RW1wdHkgPSBpc0VtcHR5KGRvYyk7XG5cbiAgLy8gU3VwcG9ydCBtaXNzaW5nIG9wdGlvbnMgYXJnXG4gIGlmICghY2FsbGJhY2sgJiYgdHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgbGFzdCA9IGFyZ3MubGVuZ3RoIC0gMTtcblxuICBoYXNDYWxsYmFjayA9ICh0eXBlb2YgYXJnc1tsYXN0XSA9PT0gJ2Z1bmN0aW9uJyk7XG5cbiAgLy8gSWYgdXBkYXRlIHdhcyBjYWxsZWQgd2l0aCB1cHNlcnQ6dHJ1ZSwgZmxhZyBhcyBhbiB1cHNlcnRcbiAgaXNVcHNlcnQgPSAodHlwZSA9PT0gXCJ1cGRhdGVcIiAmJiBvcHRpb25zLnVwc2VydCA9PT0gdHJ1ZSk7XG5cbiAgLy8gd2UgbmVlZCB0byBwYXNzIGBkb2NgIGFuZCBgb3B0aW9uc2AgdG8gYHNpbXBsZVNjaGVtYWAgbWV0aG9kLCB0aGF0J3Mgd2h5XG4gIC8vIHNjaGVtYSBkZWNsYXJhdGlvbiBtb3ZlZCBoZXJlXG4gIHZhciBzY2hlbWEgPSBjb2xsZWN0aW9uLnNpbXBsZVNjaGVtYShkb2MsIG9wdGlvbnMsIHNlbGVjdG9yKTtcbiAgdmFyIGlzTG9jYWxDb2xsZWN0aW9uID0gKGNvbGxlY3Rpb24uX2Nvbm5lY3Rpb24gPT09IG51bGwpO1xuXG4gIC8vIE9uIHRoZSBzZXJ2ZXIgYW5kIGZvciBsb2NhbCBjb2xsZWN0aW9ucywgd2UgYWxsb3cgcGFzc2luZyBgZ2V0QXV0b1ZhbHVlczogZmFsc2VgIHRvIGRpc2FibGUgYXV0b1ZhbHVlIGZ1bmN0aW9uc1xuICBpZiAoKE1ldGVvci5pc1NlcnZlciB8fCBpc0xvY2FsQ29sbGVjdGlvbikgJiYgb3B0aW9ucy5nZXRBdXRvVmFsdWVzID09PSBmYWxzZSkge1xuICAgIGdldEF1dG9WYWx1ZXMgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIERldGVybWluZSB2YWxpZGF0aW9uIGNvbnRleHRcbiAgdmFyIHZhbGlkYXRpb25Db250ZXh0ID0gb3B0aW9ucy52YWxpZGF0aW9uQ29udGV4dDtcbiAgaWYgKHZhbGlkYXRpb25Db250ZXh0KSB7XG4gICAgaWYgKHR5cGVvZiB2YWxpZGF0aW9uQ29udGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbGlkYXRpb25Db250ZXh0ID0gc2NoZW1hLm5hbWVkQ29udGV4dCh2YWxpZGF0aW9uQ29udGV4dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhbGlkYXRpb25Db250ZXh0ID0gc2NoZW1hLm5hbWVkQ29udGV4dCgpO1xuICB9XG5cbiAgLy8gQWRkIGEgZGVmYXVsdCBjYWxsYmFjayBmdW5jdGlvbiBpZiB3ZSdyZSBvbiB0aGUgY2xpZW50IGFuZCBubyBjYWxsYmFjayB3YXMgZ2l2ZW5cbiAgaWYgKE1ldGVvci5pc0NsaWVudCAmJiAhY2FsbGJhY2spIHtcbiAgICAvLyBDbGllbnQgY2FuJ3QgYmxvY2ssIHNvIGl0IGNhbid0IHJlcG9ydCBlcnJvcnMgYnkgZXhjZXB0aW9uLFxuICAgIC8vIG9ubHkgYnkgY2FsbGJhY2suIElmIHRoZXkgZm9yZ2V0IHRoZSBjYWxsYmFjaywgZ2l2ZSB0aGVtIGFcbiAgICAvLyBkZWZhdWx0IG9uZSB0aGF0IGxvZ3MgdGhlIGVycm9yLCBzbyB0aGV5IGFyZW4ndCB0b3RhbGx5XG4gICAgLy8gYmFmZmxlZCBpZiB0aGVpciB3cml0ZXMgZG9uJ3Qgd29yayBiZWNhdXNlIHRoZWlyIGRhdGFiYXNlIGlzXG4gICAgLy8gZG93bi5cbiAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBNZXRlb3IuX2RlYnVnKHR5cGUgKyBcIiBmYWlsZWQ6IFwiICsgKGVyci5yZWFzb24gfHwgZXJyLnN0YWNrKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIElmIGNsaWVudCB2YWxpZGF0aW9uIGlzIGZpbmUgb3IgaXMgc2tpcHBlZCBidXQgdGhlbiBzb21ldGhpbmdcbiAgLy8gaXMgZm91bmQgdG8gYmUgaW52YWxpZCBvbiB0aGUgc2VydmVyLCB3ZSBnZXQgdGhhdCBlcnJvciBiYWNrXG4gIC8vIGFzIGEgc3BlY2lhbCBNZXRlb3IuRXJyb3IgdGhhdCB3ZSBuZWVkIHRvIHBhcnNlLlxuICBpZiAoTWV0ZW9yLmlzQ2xpZW50ICYmIGhhc0NhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sgPSBhcmdzW2xhc3RdID0gd3JhcENhbGxiYWNrRm9yUGFyc2luZ1NlcnZlckVycm9ycyh2YWxpZGF0aW9uQ29udGV4dCwgY2FsbGJhY2spO1xuICB9XG5cbiAgdmFyIHNjaGVtYUFsbG93c0lkID0gc2NoZW1hLmFsbG93c0tleShcIl9pZFwiKTtcbiAgaWYgKHR5cGUgPT09IFwiaW5zZXJ0XCIgJiYgIWRvYy5faWQgJiYgc2NoZW1hQWxsb3dzSWQpIHtcbiAgICBkb2MuX2lkID0gY29sbGVjdGlvbi5fbWFrZU5ld0lEKCk7XG4gIH1cblxuICAvLyBHZXQgdGhlIGRvY0lkIGZvciBwYXNzaW5nIGluIHRoZSBhdXRvVmFsdWUvY3VzdG9tIGNvbnRleHRcbiAgdmFyIGRvY0lkO1xuICBpZiAodHlwZSA9PT0gJ2luc2VydCcpIHtcbiAgICBkb2NJZCA9IGRvYy5faWQ7IC8vIG1pZ2h0IGJlIHVuZGVmaW5lZFxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwidXBkYXRlXCIgJiYgc2VsZWN0b3IpIHtcbiAgICBkb2NJZCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycgfHwgc2VsZWN0b3IgaW5zdGFuY2VvZiBNb25nby5PYmplY3RJRCA/IHNlbGVjdG9yIDogc2VsZWN0b3IuX2lkO1xuICB9XG5cbiAgLy8gSWYgX2lkIGhhcyBhbHJlYWR5IGJlZW4gYWRkZWQsIHJlbW92ZSBpdCB0ZW1wb3JhcmlseSBpZiBpdCdzXG4gIC8vIG5vdCBleHBsaWNpdGx5IGRlZmluZWQgaW4gdGhlIHNjaGVtYS5cbiAgdmFyIGNhY2hlZElkO1xuICBpZiAoZG9jLl9pZCAmJiAhc2NoZW1hQWxsb3dzSWQpIHtcbiAgICBjYWNoZWRJZCA9IGRvYy5faWQ7XG4gICAgZGVsZXRlIGRvYy5faWQ7XG4gIH1cblxuICBjb25zdCBhdXRvVmFsdWVDb250ZXh0ID0ge1xuICAgIGlzSW5zZXJ0OiAodHlwZSA9PT0gXCJpbnNlcnRcIiksXG4gICAgaXNVcGRhdGU6ICh0eXBlID09PSBcInVwZGF0ZVwiICYmIG9wdGlvbnMudXBzZXJ0ICE9PSB0cnVlKSxcbiAgICBpc1Vwc2VydCxcbiAgICB1c2VySWQsXG4gICAgaXNGcm9tVHJ1c3RlZENvZGUsXG4gICAgZG9jSWQsXG4gICAgaXNMb2NhbENvbGxlY3Rpb25cbiAgfTtcblxuICBjb25zdCBleHRlbmRBdXRvVmFsdWVDb250ZXh0ID0ge1xuICAgIC4uLigoc2NoZW1hLl9jbGVhbk9wdGlvbnMgfHwge30pLmV4dGVuZEF1dG9WYWx1ZUNvbnRleHQgfHwge30pLFxuICAgIC4uLmF1dG9WYWx1ZUNvbnRleHQsXG4gICAgLi4ub3B0aW9ucy5leHRlbmRBdXRvVmFsdWVDb250ZXh0LFxuICB9O1xuXG4gIGNvbnN0IGNsZWFuT3B0aW9uc0ZvclRoaXNPcGVyYXRpb24gPSB7fTtcbiAgW1wiYXV0b0NvbnZlcnRcIiwgXCJmaWx0ZXJcIiwgXCJyZW1vdmVFbXB0eVN0cmluZ3NcIiwgXCJyZW1vdmVOdWxsc0Zyb21BcnJheXNcIiwgXCJ0cmltU3RyaW5nc1wiXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9uc1twcm9wXSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgIGNsZWFuT3B0aW9uc0ZvclRoaXNPcGVyYXRpb25bcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gUHJlbGltaW5hcnkgY2xlYW5pbmcgb24gYm90aCBjbGllbnQgYW5kIHNlcnZlci4gT24gdGhlIHNlcnZlciBhbmQgZm9yIGxvY2FsXG4gIC8vIGNvbGxlY3Rpb25zLCBhdXRvbWF0aWMgdmFsdWVzIHdpbGwgYWxzbyBiZSBzZXQgYXQgdGhpcyBwb2ludC5cbiAgc2NoZW1hLmNsZWFuKGRvYywge1xuICAgIG11dGF0ZTogdHJ1ZSwgLy8gQ2xlYW4gdGhlIGRvYy9tb2RpZmllciBpbiBwbGFjZVxuICAgIGlzTW9kaWZpZXI6ICh0eXBlICE9PSBcImluc2VydFwiKSxcbiAgICAvLyBTdGFydCB3aXRoIHNvbWUgQ29sbGVjdGlvbjIgZGVmYXVsdHMsIHdoaWNoIHdpbGwgdXN1YWxseSBiZSBvdmVyd3JpdHRlblxuICAgIC4uLmRlZmF1bHRDbGVhbk9wdGlvbnMsXG4gICAgLy8gVGhlIGV4dGVuZCB3aXRoIHRoZSBzY2hlbWEtbGV2ZWwgZGVmYXVsdHMgKGZyb20gU2ltcGxlU2NoZW1hIGNvbnN0cnVjdG9yIG9wdGlvbnMpXG4gICAgLi4uKHNjaGVtYS5fY2xlYW5PcHRpb25zIHx8IHt9KSxcbiAgICAvLyBGaW5hbGx5LCBvcHRpb25zIGZvciB0aGlzIHNwZWNpZmljIG9wZXJhdGlvbiBzaG91bGQgdGFrZSBwcmVjZWRhbmNlXG4gICAgLi4uY2xlYW5PcHRpb25zRm9yVGhpc09wZXJhdGlvbixcbiAgICBleHRlbmRBdXRvVmFsdWVDb250ZXh0LCAvLyBUaGlzIHdhcyBleHRlbmRlZCBzZXBhcmF0ZWx5IGFib3ZlXG4gICAgZ2V0QXV0b1ZhbHVlcywgLy8gRm9yY2UgdGhpcyBvdmVycmlkZVxuICB9KTtcblxuICAvLyBXZSBjbG9uZSBiZWZvcmUgdmFsaWRhdGluZyBiZWNhdXNlIGluIHNvbWUgY2FzZXMgd2UgbmVlZCB0byBhZGp1c3QgdGhlXG4gIC8vIG9iamVjdCBhIGJpdCBiZWZvcmUgdmFsaWRhdGluZyBpdC4gSWYgd2UgYWRqdXN0ZWQgYGRvY2AgaXRzZWxmLCBvdXJcbiAgLy8gY2hhbmdlcyB3b3VsZCBwZXJzaXN0IGludG8gdGhlIGRhdGFiYXNlLlxuICB2YXIgZG9jVG9WYWxpZGF0ZSA9IHt9O1xuICBmb3IgKHZhciBwcm9wIGluIGRvYykge1xuICAgIC8vIFdlIG9taXQgcHJvdG90eXBlIHByb3BlcnRpZXMgd2hlbiBjbG9uaW5nIGJlY2F1c2UgdGhleSB3aWxsIG5vdCBiZSB2YWxpZFxuICAgIC8vIGFuZCBtb25nbyBvbWl0cyB0aGVtIHdoZW4gc2F2aW5nIHRvIHRoZSBkYXRhYmFzZSBhbnl3YXkuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkb2MsIHByb3ApKSB7XG4gICAgICBkb2NUb1ZhbGlkYXRlW3Byb3BdID0gZG9jW3Byb3BdO1xuICAgIH1cbiAgfVxuXG4gIC8vIE9uIHRoZSBzZXJ2ZXIsIHVwc2VydHMgYXJlIHBvc3NpYmxlOyBTaW1wbGVTY2hlbWEgaGFuZGxlcyB1cHNlcnRzIHByZXR0eVxuICAvLyB3ZWxsIGJ5IGRlZmF1bHQsIGJ1dCBpdCB3aWxsIG5vdCBrbm93IGFib3V0IHRoZSBmaWVsZHMgaW4gdGhlIHNlbGVjdG9yLFxuICAvLyB3aGljaCBhcmUgYWxzbyBzdG9yZWQgaW4gdGhlIGRhdGFiYXNlIGlmIGFuIGluc2VydCBpcyBwZXJmb3JtZWQuIFNvIHdlXG4gIC8vIHdpbGwgYWxsb3cgdGhlc2UgZmllbGRzIHRvIGJlIGNvbnNpZGVyZWQgZm9yIHZhbGlkYXRpb24gYnkgYWRkaW5nIHRoZW1cbiAgLy8gdG8gdGhlICRzZXQgaW4gdGhlIG1vZGlmaWVyLiBUaGlzIGlzIG5vIGRvdWJ0IHByb25lIHRvIGVycm9ycywgYnV0IHRoZXJlXG4gIC8vIHByb2JhYmx5IGlzbid0IGFueSBiZXR0ZXIgd2F5IHJpZ2h0IG5vdy5cbiAgaWYgKE1ldGVvci5pc1NlcnZlciAmJiBpc1Vwc2VydCAmJiBpc09iamVjdChzZWxlY3RvcikpIHtcbiAgICB2YXIgc2V0ID0gZG9jVG9WYWxpZGF0ZS4kc2V0IHx8IHt9O1xuXG4gICAgLy8gSWYgc2VsZWN0b3IgdXNlcyAkYW5kIGZvcm1hdCwgY29udmVydCB0byBwbGFpbiBvYmplY3Qgc2VsZWN0b3JcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzZWxlY3Rvci4kYW5kKSkge1xuICAgICAgY29uc3QgcGxhaW5TZWxlY3RvciA9IHt9O1xuICAgICAgc2VsZWN0b3IuJGFuZC5mb3JFYWNoKHNlbCA9PiB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ocGxhaW5TZWxlY3Rvciwgc2VsKTtcbiAgICAgIH0pO1xuICAgICAgZG9jVG9WYWxpZGF0ZS4kc2V0ID0gcGxhaW5TZWxlY3RvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jVG9WYWxpZGF0ZS4kc2V0ID0gY2xvbmUoc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIGlmICghc2NoZW1hQWxsb3dzSWQpIGRlbGV0ZSBkb2NUb1ZhbGlkYXRlLiRzZXQuX2lkO1xuICAgIE9iamVjdC5hc3NpZ24oZG9jVG9WYWxpZGF0ZS4kc2V0LCBzZXQpO1xuICB9XG5cbiAgLy8gU2V0IGF1dG9tYXRpYyB2YWx1ZXMgZm9yIHZhbGlkYXRpb24gb24gdGhlIGNsaWVudC5cbiAgLy8gT24gdGhlIHNlcnZlciwgd2UgYWxyZWFkeSB1cGRhdGVkIGRvYyB3aXRoIGF1dG8gdmFsdWVzLCBidXQgb24gdGhlIGNsaWVudCxcbiAgLy8gd2Ugd2lsbCBhZGQgdGhlbSB0byBkb2NUb1ZhbGlkYXRlIGZvciB2YWxpZGF0aW9uIHB1cnBvc2VzIG9ubHkuXG4gIC8vIFRoaXMgaXMgYmVjYXVzZSB3ZSB3YW50IGFsbCBhY3R1YWwgdmFsdWVzIGdlbmVyYXRlZCBvbiB0aGUgc2VydmVyLlxuICBpZiAoTWV0ZW9yLmlzQ2xpZW50ICYmICFpc0xvY2FsQ29sbGVjdGlvbikge1xuICAgIHNjaGVtYS5jbGVhbihkb2NUb1ZhbGlkYXRlLCB7XG4gICAgICBhdXRvQ29udmVydDogZmFsc2UsXG4gICAgICBleHRlbmRBdXRvVmFsdWVDb250ZXh0LFxuICAgICAgZmlsdGVyOiBmYWxzZSxcbiAgICAgIGdldEF1dG9WYWx1ZXM6IHRydWUsXG4gICAgICBpc01vZGlmaWVyOiAodHlwZSAhPT0gXCJpbnNlcnRcIiksXG4gICAgICBtdXRhdGU6IHRydWUsIC8vIENsZWFuIHRoZSBkb2MvbW9kaWZpZXIgaW4gcGxhY2VcbiAgICAgIHJlbW92ZUVtcHR5U3RyaW5nczogZmFsc2UsXG4gICAgICByZW1vdmVOdWxsc0Zyb21BcnJheXM6IGZhbHNlLFxuICAgICAgdHJpbVN0cmluZ3M6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gWFhYIE1heWJlIG1vdmUgdGhpcyBpbnRvIFNpbXBsZVNjaGVtYVxuICBpZiAoIXZhbGlkYXRlZE9iamVjdFdhc0luaXRpYWxseUVtcHR5ICYmIGlzRW1wdHkoZG9jVG9WYWxpZGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FmdGVyIGZpbHRlcmluZyBvdXQga2V5cyBub3QgaW4gdGhlIHNjaGVtYSwgeW91ciAnICtcbiAgICAgICh0eXBlID09PSAndXBkYXRlJyA/ICdtb2RpZmllcicgOiAnb2JqZWN0JykgK1xuICAgICAgJyBpcyBub3cgZW1wdHknKTtcbiAgfVxuXG4gIC8vIFZhbGlkYXRlIGRvY1xuICB2YXIgaXNWYWxpZDtcbiAgaWYgKG9wdGlvbnMudmFsaWRhdGUgPT09IGZhbHNlKSB7XG4gICAgaXNWYWxpZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgaXNWYWxpZCA9IHZhbGlkYXRpb25Db250ZXh0LnZhbGlkYXRlKGRvY1RvVmFsaWRhdGUsIHtcbiAgICAgIG1vZGlmaWVyOiAodHlwZSA9PT0gXCJ1cGRhdGVcIiB8fCB0eXBlID09PSBcInVwc2VydFwiKSxcbiAgICAgIHVwc2VydDogaXNVcHNlcnQsXG4gICAgICBleHRlbmRlZEN1c3RvbUNvbnRleHQ6IHtcbiAgICAgICAgaXNJbnNlcnQ6ICh0eXBlID09PSBcImluc2VydFwiKSxcbiAgICAgICAgaXNVcGRhdGU6ICh0eXBlID09PSBcInVwZGF0ZVwiICYmIG9wdGlvbnMudXBzZXJ0ICE9PSB0cnVlKSxcbiAgICAgICAgaXNVcHNlcnQsXG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgaXNGcm9tVHJ1c3RlZENvZGUsXG4gICAgICAgIGRvY0lkLFxuICAgICAgICBpc0xvY2FsQ29sbGVjdGlvbixcbiAgICAgICAgLi4uKG9wdGlvbnMuZXh0ZW5kZWRDdXN0b21Db250ZXh0IHx8IHt9KSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBpZiAoaXNWYWxpZCkge1xuICAgIC8vIEFkZCB0aGUgSUQgYmFja1xuICAgIGlmIChjYWNoZWRJZCkge1xuICAgICAgZG9jLl9pZCA9IGNhY2hlZElkO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSB0aGUgYXJncyB0byByZWZsZWN0IHRoZSBjbGVhbmVkIGRvY1xuICAgIC8vIFhYWCBub3Qgc3VyZSB0aGlzIGlzIG5lY2Vzc2FyeSBzaW5jZSB3ZSBtdXRhdGVcbiAgICBpZiAodHlwZSA9PT0gXCJpbnNlcnRcIikge1xuICAgICAgYXJnc1swXSA9IGRvYztcbiAgICB9IGVsc2Uge1xuICAgICAgYXJnc1sxXSA9IGRvYztcbiAgICB9XG5cbiAgICAvLyBJZiBjYWxsYmFjaywgc2V0IGludmFsaWRLZXkgd2hlbiB3ZSBnZXQgYSBtb25nbyB1bmlxdWUgZXJyb3JcbiAgICBpZiAoTWV0ZW9yLmlzU2VydmVyICYmIGhhc0NhbGxiYWNrKSB7XG4gICAgICBhcmdzW2xhc3RdID0gd3JhcENhbGxiYWNrRm9yUGFyc2luZ01vbmdvVmFsaWRhdGlvbkVycm9ycyh2YWxpZGF0aW9uQ29udGV4dCwgYXJnc1tsYXN0XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyZ3M7XG4gIH0gZWxzZSB7XG4gICAgZXJyb3IgPSBnZXRFcnJvck9iamVjdCh2YWxpZGF0aW9uQ29udGV4dCwgYGluICR7Y29sbGVjdGlvbi5fbmFtZX0gJHt0eXBlfWApO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgLy8gaW5zZXJ0L3VwZGF0ZS91cHNlcnQgcGFzcyBgZmFsc2VgIHdoZW4gdGhlcmUncyBhbiBlcnJvciwgc28gd2UgZG8gdGhhdFxuICAgICAgY2FsbGJhY2soZXJyb3IsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEVycm9yT2JqZWN0KGNvbnRleHQsIGFwcGVuZFRvTWVzc2FnZSA9ICcnKSB7XG4gIGxldCBtZXNzYWdlO1xuICBjb25zdCBpbnZhbGlkS2V5cyA9ICh0eXBlb2YgY29udGV4dC52YWxpZGF0aW9uRXJyb3JzID09PSAnZnVuY3Rpb24nKSA/IGNvbnRleHQudmFsaWRhdGlvbkVycm9ycygpIDogY29udGV4dC5pbnZhbGlkS2V5cygpO1xuICBpZiAoaW52YWxpZEtleXMubGVuZ3RoKSB7XG4gICAgY29uc3QgZmlyc3RFcnJvcktleSA9IGludmFsaWRLZXlzWzBdLm5hbWU7XG4gICAgY29uc3QgZmlyc3RFcnJvck1lc3NhZ2UgPSBjb250ZXh0LmtleUVycm9yTWVzc2FnZShmaXJzdEVycm9yS2V5KTtcblxuICAgIC8vIElmIHRoZSBlcnJvciBpcyBpbiBhIG5lc3RlZCBrZXksIGFkZCB0aGUgZnVsbCBrZXkgdG8gdGhlIGVycm9yIG1lc3NhZ2VcbiAgICAvLyB0byBiZSBtb3JlIGhlbHBmdWwuXG4gICAgaWYgKGZpcnN0RXJyb3JLZXkuaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgbWVzc2FnZSA9IGZpcnN0RXJyb3JNZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlID0gYCR7Zmlyc3RFcnJvck1lc3NhZ2V9ICgke2ZpcnN0RXJyb3JLZXl9KWA7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2UgPSBcIkZhaWxlZCB2YWxpZGF0aW9uXCI7XG4gIH1cbiAgbWVzc2FnZSA9IGAke21lc3NhZ2V9ICR7YXBwZW5kVG9NZXNzYWdlfWAudHJpbSgpO1xuICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgZXJyb3IuaW52YWxpZEtleXMgPSBpbnZhbGlkS2V5cztcbiAgZXJyb3IudmFsaWRhdGlvbkNvbnRleHQgPSBjb250ZXh0O1xuICAvLyBJZiBvbiB0aGUgc2VydmVyLCB3ZSBhZGQgYSBzYW5pdGl6ZWQgZXJyb3IsIHRvbywgaW4gY2FzZSB3ZSdyZVxuICAvLyBjYWxsZWQgZnJvbSBhIG1ldGhvZC5cbiAgaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICAgIGVycm9yLnNhbml0aXplZEVycm9yID0gbmV3IE1ldGVvci5FcnJvcig0MDAsIG1lc3NhZ2UsIEVKU09OLnN0cmluZ2lmeShlcnJvci5pbnZhbGlkS2V5cykpO1xuICB9XG4gIHJldHVybiBlcnJvcjtcbn1cblxuZnVuY3Rpb24gYWRkVW5pcXVlRXJyb3IoY29udGV4dCwgZXJyb3JNZXNzYWdlKSB7XG4gIHZhciBuYW1lID0gZXJyb3JNZXNzYWdlLnNwbGl0KCdjMl8nKVsxXS5zcGxpdCgnICcpWzBdO1xuICB2YXIgdmFsID0gZXJyb3JNZXNzYWdlLnNwbGl0KCdkdXAga2V5OicpWzFdLnNwbGl0KCdcIicpWzFdO1xuXG4gIHZhciBhZGRWYWxpZGF0aW9uRXJyb3JzUHJvcE5hbWUgPSAodHlwZW9mIGNvbnRleHQuYWRkVmFsaWRhdGlvbkVycm9ycyA9PT0gJ2Z1bmN0aW9uJykgPyAnYWRkVmFsaWRhdGlvbkVycm9ycycgOiAnYWRkSW52YWxpZEtleXMnO1xuICBjb250ZXh0W2FkZFZhbGlkYXRpb25FcnJvcnNQcm9wTmFtZV0oW3tcbiAgICBuYW1lOiBuYW1lLFxuICAgIHR5cGU6ICdub3RVbmlxdWUnLFxuICAgIHZhbHVlOiB2YWxcbiAgfV0pO1xufVxuXG5mdW5jdGlvbiB3cmFwQ2FsbGJhY2tGb3JQYXJzaW5nTW9uZ29WYWxpZGF0aW9uRXJyb3JzKHZhbGlkYXRpb25Db250ZXh0LCBjYikge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlZENhbGxiYWNrRm9yUGFyc2luZ01vbmdvVmFsaWRhdGlvbkVycm9ycyguLi5hcmdzKSB7XG4gICAgY29uc3QgZXJyb3IgPSBhcmdzWzBdO1xuICAgIGlmIChlcnJvciAmJlxuICAgICAgICAoKGVycm9yLm5hbWUgPT09IFwiTW9uZ29FcnJvclwiICYmIGVycm9yLmNvZGUgPT09IDExMDAxKSB8fCBlcnJvci5tZXNzYWdlLmluZGV4T2YoJ01vbmdvRXJyb3I6IEUxMTAwMCcgIT09IC0xKSkgJiZcbiAgICAgICAgZXJyb3IubWVzc2FnZS5pbmRleE9mKCdjMl8nKSAhPT0gLTEpIHtcbiAgICAgIGFkZFVuaXF1ZUVycm9yKHZhbGlkYXRpb25Db250ZXh0LCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIGFyZ3NbMF0gPSBnZXRFcnJvck9iamVjdCh2YWxpZGF0aW9uQ29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBjYi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JhcENhbGxiYWNrRm9yUGFyc2luZ1NlcnZlckVycm9ycyh2YWxpZGF0aW9uQ29udGV4dCwgY2IpIHtcbiAgdmFyIGFkZFZhbGlkYXRpb25FcnJvcnNQcm9wTmFtZSA9ICh0eXBlb2YgdmFsaWRhdGlvbkNvbnRleHQuYWRkVmFsaWRhdGlvbkVycm9ycyA9PT0gJ2Z1bmN0aW9uJykgPyAnYWRkVmFsaWRhdGlvbkVycm9ycycgOiAnYWRkSW52YWxpZEtleXMnO1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlZENhbGxiYWNrRm9yUGFyc2luZ1NlcnZlckVycm9ycyguLi5hcmdzKSB7XG4gICAgY29uc3QgZXJyb3IgPSBhcmdzWzBdO1xuICAgIC8vIEhhbmRsZSBvdXIgb3duIHZhbGlkYXRpb24gZXJyb3JzXG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgTWV0ZW9yLkVycm9yICYmXG4gICAgICAgIGVycm9yLmVycm9yID09PSA0MDAgJiZcbiAgICAgICAgZXJyb3IucmVhc29uID09PSBcIklOVkFMSURcIiAmJlxuICAgICAgICB0eXBlb2YgZXJyb3IuZGV0YWlscyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdmFyIGludmFsaWRLZXlzRnJvbVNlcnZlciA9IEVKU09OLnBhcnNlKGVycm9yLmRldGFpbHMpO1xuICAgICAgdmFsaWRhdGlvbkNvbnRleHRbYWRkVmFsaWRhdGlvbkVycm9yc1Byb3BOYW1lXShpbnZhbGlkS2V5c0Zyb21TZXJ2ZXIpO1xuICAgICAgYXJnc1swXSA9IGdldEVycm9yT2JqZWN0KHZhbGlkYXRpb25Db250ZXh0KTtcbiAgICB9XG4gICAgLy8gSGFuZGxlIE1vbmdvIHVuaXF1ZSBpbmRleCBlcnJvcnMsIHdoaWNoIGFyZSBmb3J3YXJkZWQgdG8gdGhlIGNsaWVudCBhcyA0MDkgZXJyb3JzXG4gICAgZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBNZXRlb3IuRXJyb3IgJiZcbiAgICAgICAgICAgICBlcnJvci5lcnJvciA9PT0gNDA5ICYmXG4gICAgICAgICAgICAgZXJyb3IucmVhc29uICYmXG4gICAgICAgICAgICAgZXJyb3IucmVhc29uLmluZGV4T2YoJ0UxMTAwMCcpICE9PSAtMSAmJlxuICAgICAgICAgICAgIGVycm9yLnJlYXNvbi5pbmRleE9mKCdjMl8nKSAhPT0gLTEpIHtcbiAgICAgIGFkZFVuaXF1ZUVycm9yKHZhbGlkYXRpb25Db250ZXh0LCBlcnJvci5yZWFzb24pO1xuICAgICAgYXJnc1swXSA9IGdldEVycm9yT2JqZWN0KHZhbGlkYXRpb25Db250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNiLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9O1xufVxuXG52YXIgYWxyZWFkeUluc2VjdXJlZCA9IHt9O1xuZnVuY3Rpb24ga2VlcEluc2VjdXJlKGMpIHtcbiAgLy8gSWYgaW5zZWN1cmUgcGFja2FnZSBpcyBpbiB1c2UsIHdlIG5lZWQgdG8gYWRkIGFsbG93IHJ1bGVzIHRoYXQgcmV0dXJuXG4gIC8vIHRydWUuIE90aGVyd2lzZSwgaXQgd291bGQgc2VlbWluZ2x5IHR1cm4gb2ZmIGluc2VjdXJlIG1vZGUuXG4gIGlmIChQYWNrYWdlICYmIFBhY2thZ2UuaW5zZWN1cmUgJiYgIWFscmVhZHlJbnNlY3VyZWRbYy5fbmFtZV0pIHtcbiAgICBjLmFsbG93KHtcbiAgICAgIGluc2VydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBmZXRjaDogW10sXG4gICAgICB0cmFuc2Zvcm06IG51bGxcbiAgICB9KTtcbiAgICBhbHJlYWR5SW5zZWN1cmVkW2MuX25hbWVdID0gdHJ1ZTtcbiAgfVxuICAvLyBJZiBpbnNlY3VyZSBwYWNrYWdlIGlzIE5PVCBpbiB1c2UsIHRoZW4gYWRkaW5nIHRoZSB0d28gZGVueSBmdW5jdGlvbnNcbiAgLy8gZG9lcyBub3QgaGF2ZSBhbnkgZWZmZWN0IG9uIHRoZSBtYWluIGFwcCdzIHNlY3VyaXR5IHBhcmFkaWdtLiBUaGVcbiAgLy8gdXNlciB3aWxsIHN0aWxsIGJlIHJlcXVpcmVkIHRvIGFkZCBhdCBsZWFzdCBvbmUgYWxsb3cgZnVuY3Rpb24gb2YgaGVyXG4gIC8vIG93biBmb3IgZWFjaCBvcGVyYXRpb24gZm9yIHRoaXMgY29sbGVjdGlvbi4gQW5kIHRoZSB1c2VyIG1heSBzdGlsbCBhZGRcbiAgLy8gYWRkaXRpb25hbCBkZW55IGZ1bmN0aW9ucywgYnV0IGRvZXMgbm90IGhhdmUgdG8uXG59XG5cbnZhciBhbHJlYWR5RGVmaW5lZCA9IHt9O1xuZnVuY3Rpb24gZGVmaW5lRGVueShjLCBvcHRpb25zKSB7XG4gIGlmICghYWxyZWFkeURlZmluZWRbYy5fbmFtZV0pIHtcblxuICAgIHZhciBpc0xvY2FsQ29sbGVjdGlvbiA9IChjLl9jb25uZWN0aW9uID09PSBudWxsKTtcblxuICAgIC8vIEZpcnN0IGRlZmluZSBkZW55IGZ1bmN0aW9ucyB0byBleHRlbmQgZG9jIHdpdGggdGhlIHJlc3VsdHMgb2YgY2xlYW5cbiAgICAvLyBhbmQgYXV0b3ZhbHVlcy4gVGhpcyBtdXN0IGJlIGRvbmUgd2l0aCBcInRyYW5zZm9ybTogbnVsbFwiIG9yIHdlIHdvdWxkIGJlXG4gICAgLy8gZXh0ZW5kaW5nIGEgY2xvbmUgb2YgZG9jIGFuZCB0aGVyZWZvcmUgaGF2ZSBubyBlZmZlY3QuXG4gICAgYy5kZW55KHtcbiAgICAgIGluc2VydDogZnVuY3Rpb24odXNlcklkLCBkb2MpIHtcbiAgICAgICAgLy8gUmVmZXJlbmNlZCBkb2MgaXMgY2xlYW5lZCBpbiBwbGFjZVxuICAgICAgICBjLnNpbXBsZVNjaGVtYShkb2MpLmNsZWFuKGRvYywge1xuICAgICAgICAgIG11dGF0ZTogdHJ1ZSxcbiAgICAgICAgICBpc01vZGlmaWVyOiBmYWxzZSxcbiAgICAgICAgICAvLyBXZSBkb24ndCBkbyB0aGVzZSBoZXJlIGJlY2F1c2UgdGhleSBhcmUgZG9uZSBvbiB0aGUgY2xpZW50IGlmIGRlc2lyZWRcbiAgICAgICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgIGF1dG9Db252ZXJ0OiBmYWxzZSxcbiAgICAgICAgICByZW1vdmVFbXB0eVN0cmluZ3M6IGZhbHNlLFxuICAgICAgICAgIHRyaW1TdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICBleHRlbmRBdXRvVmFsdWVDb250ZXh0OiB7XG4gICAgICAgICAgICBpc0luc2VydDogdHJ1ZSxcbiAgICAgICAgICAgIGlzVXBkYXRlOiBmYWxzZSxcbiAgICAgICAgICAgIGlzVXBzZXJ0OiBmYWxzZSxcbiAgICAgICAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgICAgICAgICAgaXNGcm9tVHJ1c3RlZENvZGU6IGZhbHNlLFxuICAgICAgICAgICAgZG9jSWQ6IGRvYy5faWQsXG4gICAgICAgICAgICBpc0xvY2FsQ29sbGVjdGlvbjogaXNMb2NhbENvbGxlY3Rpb25cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uKHVzZXJJZCwgZG9jLCBmaWVsZHMsIG1vZGlmaWVyKSB7XG4gICAgICAgIC8vIFJlZmVyZW5jZWQgbW9kaWZpZXIgaXMgY2xlYW5lZCBpbiBwbGFjZVxuICAgICAgICBjLnNpbXBsZVNjaGVtYShtb2RpZmllcikuY2xlYW4obW9kaWZpZXIsIHtcbiAgICAgICAgICBtdXRhdGU6IHRydWUsXG4gICAgICAgICAgaXNNb2RpZmllcjogdHJ1ZSxcbiAgICAgICAgICAvLyBXZSBkb24ndCBkbyB0aGVzZSBoZXJlIGJlY2F1c2UgdGhleSBhcmUgZG9uZSBvbiB0aGUgY2xpZW50IGlmIGRlc2lyZWRcbiAgICAgICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgIGF1dG9Db252ZXJ0OiBmYWxzZSxcbiAgICAgICAgICByZW1vdmVFbXB0eVN0cmluZ3M6IGZhbHNlLFxuICAgICAgICAgIHRyaW1TdHJpbmdzOiBmYWxzZSxcbiAgICAgICAgICBleHRlbmRBdXRvVmFsdWVDb250ZXh0OiB7XG4gICAgICAgICAgICBpc0luc2VydDogZmFsc2UsXG4gICAgICAgICAgICBpc1VwZGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGlzVXBzZXJ0OiBmYWxzZSxcbiAgICAgICAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgICAgICAgICAgaXNGcm9tVHJ1c3RlZENvZGU6IGZhbHNlLFxuICAgICAgICAgICAgZG9jSWQ6IGRvYyAmJiBkb2MuX2lkLFxuICAgICAgICAgICAgaXNMb2NhbENvbGxlY3Rpb246IGlzTG9jYWxDb2xsZWN0aW9uXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgZmV0Y2g6IFsnX2lkJ10sXG4gICAgICB0cmFuc2Zvcm06IG51bGxcbiAgICB9KTtcblxuICAgIC8vIFNlY29uZCBkZWZpbmUgZGVueSBmdW5jdGlvbnMgdG8gdmFsaWRhdGUgYWdhaW4gb24gdGhlIHNlcnZlclxuICAgIC8vIGZvciBjbGllbnQtaW5pdGlhdGVkIGluc2VydHMgYW5kIHVwZGF0ZXMuIFRoZXNlIHNob3VsZCBiZVxuICAgIC8vIGNhbGxlZCBhZnRlciB0aGUgY2xlYW4vYXV0b3ZhbHVlIGZ1bmN0aW9ucyBzaW5jZSB3ZSdyZSBhZGRpbmdcbiAgICAvLyB0aGVtIGFmdGVyLiBUaGVzZSBtdXN0ICpub3QqIGhhdmUgXCJ0cmFuc2Zvcm06IG51bGxcIiBpZiBvcHRpb25zLnRyYW5zZm9ybSBpcyB0cnVlIGJlY2F1c2VcbiAgICAvLyB3ZSBuZWVkIHRvIHBhc3MgdGhlIGRvYyB0aHJvdWdoIGFueSB0cmFuc2Zvcm1zIHRvIGJlIHN1cmVcbiAgICAvLyB0aGF0IGN1c3RvbSB0eXBlcyBhcmUgcHJvcGVybHkgcmVjb2duaXplZCBmb3IgdHlwZSB2YWxpZGF0aW9uLlxuICAgIGMuZGVueSh7XG4gICAgICBpbnNlcnQ6IGZ1bmN0aW9uKHVzZXJJZCwgZG9jKSB7XG4gICAgICAgIC8vIFdlIHBhc3MgdGhlIGZhbHNlIG9wdGlvbnMgYmVjYXVzZSB3ZSB3aWxsIGhhdmUgZG9uZSB0aGVtIG9uIGNsaWVudCBpZiBkZXNpcmVkXG4gICAgICAgIGRvVmFsaWRhdGUoXG4gICAgICAgICAgYyxcbiAgICAgICAgICBcImluc2VydFwiLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGRvYyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHJpbVN0cmluZ3M6IGZhbHNlLFxuICAgICAgICAgICAgICByZW1vdmVFbXB0eVN0cmluZ3M6IGZhbHNlLFxuICAgICAgICAgICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICBhdXRvQ29udmVydDogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMCwgJ0lOVkFMSUQnLCBFSlNPTi5zdHJpbmdpZnkoZXJyb3IuaW52YWxpZEtleXMpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgZmFsc2UsIC8vIGdldEF1dG9WYWx1ZXNcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgZmFsc2UgLy8gaXNGcm9tVHJ1c3RlZENvZGVcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgdXBkYXRlOiBmdW5jdGlvbih1c2VySWQsIGRvYywgZmllbGRzLCBtb2RpZmllcikge1xuICAgICAgICAvLyBOT1RFOiBUaGlzIHdpbGwgbmV2ZXIgYmUgYW4gdXBzZXJ0IGJlY2F1c2UgY2xpZW50LXNpZGUgdXBzZXJ0c1xuICAgICAgICAvLyBhcmUgbm90IGFsbG93ZWQgb25jZSB5b3UgZGVmaW5lIGFsbG93L2RlbnkgZnVuY3Rpb25zLlxuICAgICAgICAvLyBXZSBwYXNzIHRoZSBmYWxzZSBvcHRpb25zIGJlY2F1c2Ugd2Ugd2lsbCBoYXZlIGRvbmUgdGhlbSBvbiBjbGllbnQgaWYgZGVzaXJlZFxuICAgICAgICBkb1ZhbGlkYXRlKFxuICAgICAgICAgIGMsXG4gICAgICAgICAgXCJ1cGRhdGVcIixcbiAgICAgICAgICBbXG4gICAgICAgICAgICB7X2lkOiBkb2MgJiYgZG9jLl9pZH0sXG4gICAgICAgICAgICBtb2RpZmllcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHJpbVN0cmluZ3M6IGZhbHNlLFxuICAgICAgICAgICAgICByZW1vdmVFbXB0eVN0cmluZ3M6IGZhbHNlLFxuICAgICAgICAgICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICBhdXRvQ29udmVydDogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMCwgJ0lOVkFMSUQnLCBFSlNPTi5zdHJpbmdpZnkoZXJyb3IuaW52YWxpZEtleXMpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgZmFsc2UsIC8vIGdldEF1dG9WYWx1ZXNcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgZmFsc2UgLy8gaXNGcm9tVHJ1c3RlZENvZGVcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgZmV0Y2g6IFsnX2lkJ10sXG4gICAgICAuLi4ob3B0aW9ucy50cmFuc2Zvcm0gPT09IHRydWUgPyB7fSA6IHt0cmFuc2Zvcm06IG51bGx9KSxcbiAgICB9KTtcblxuICAgIC8vIG5vdGUgdGhhdCB3ZSd2ZSBhbHJlYWR5IGRvbmUgdGhpcyBjb2xsZWN0aW9uIHNvIHRoYXQgd2UgZG9uJ3QgZG8gaXQgYWdhaW5cbiAgICAvLyBpZiBhdHRhY2hTY2hlbWEgaXMgY2FsbGVkIGFnYWluXG4gICAgYWxyZWFkeURlZmluZWRbYy5fbmFtZV0gPSB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxlY3Rpb24yO1xuIl19
