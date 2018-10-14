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
var meteorInstall = Package.modules.meteorInstall;

/* Package-scope variables */
var Promise;

var require = meteorInstall({"node_modules":{"meteor":{"promise":{"modern.js":function(){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/promise/modern.js                                              //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
// Initialize the package-scoped Promise variable with global.Promise in
// all environments, even if it's not defined.
Promise = global.Promise;

/////////////////////////////////////////////////////////////////////////////

},"client.js":function(require){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/promise/client.js                                              //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
require("./extensions.js");
require("meteor-promise").makeCompatible(Promise);

/////////////////////////////////////////////////////////////////////////////

},"extensions.js":function(){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/promise/extensions.js                                          //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
var proto = Promise.prototype;
var hasOwn = Object.prototype.hasOwnProperty;

proto.done = function (onFulfilled, onRejected) {
  var self = this;

  if (arguments.length > 0) {
    self = this.then.apply(this, arguments);
  }

  self.then(null, function (err) {
    Meteor._setImmediate(function () {
      throw err;
    });
  });
};

if (! hasOwn.call(proto, "finally")) {
  proto["finally"] = function (onFinally) {
    var threw = false, result;
    return this.then(function (value) {
      result = value;
      // Most implementations of Promise.prototype.finally call
      // Promise.resolve(onFinally()) (or this.constructor.resolve or even
      // this.constructor[Symbol.species].resolve, depending on how spec
      // compliant they're trying to be), but this implementation simply
      // relies on the standard Promise behavior of resolving any value
      // returned from a .then callback function.
      return onFinally();
    }, function (error) {
      // Make the final .then callback (below) re-throw the error instead
      // of returning it.
      threw = true;
      result = error;
      return onFinally();
    }).then(function () {
      if (threw) throw result;
      return result;
    });
  };
}

/////////////////////////////////////////////////////////////////////////////

},"node_modules":{"meteor-promise":{"package.json":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// node_modules/meteor/promise/node_modules/meteor-promise/package.json    //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
module.exports = {
  "name": "meteor-promise",
  "version": "0.8.6",
  "browser": "promise_client.js",
  "main": "promise_server.js"
};

/////////////////////////////////////////////////////////////////////////////

},"promise_client.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// node_modules/meteor/promise/node_modules/meteor-promise/promise_client. //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
exports.makeCompatible = function (Promise) {
  var es6PromiseThen = Promise.prototype.then;

  Promise.prototype.then = function (onResolved, onRejected) {
    if (typeof Meteor === "object" &&
        typeof Meteor.bindEnvironment === "function") {
      return es6PromiseThen.call(
        this,
        onResolved && Meteor.bindEnvironment(onResolved, raise),
        onRejected && Meteor.bindEnvironment(onRejected, raise)
      );
    }

    return es6PromiseThen.call(this, onResolved, onRejected);
  };
};

function raise(exception) {
  throw exception;
}

/////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/promise/modern.js");
var exports = require("/node_modules/meteor/promise/client.js");

/* Exports */
Package._define("promise", exports, {
  Promise: Promise
});

})();
