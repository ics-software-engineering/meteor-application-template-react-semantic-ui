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
var Promise = Package.promise.Promise;

/* Package-scope variables */
var fetch;

var require = meteorInstall({"node_modules":{"meteor":{"fetch":{"modern.js":function(require,exports){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/fetch/modern.js                                          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
exports.fetch = global.fetch;
exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;

///////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/fetch/modern.js");

/* Exports */
Package._define("fetch", exports, {
  fetch: fetch
});

})();
