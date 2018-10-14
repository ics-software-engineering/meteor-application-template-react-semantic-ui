(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var meteorInstall = Package.modules.meteorInstall;

var require = meteorInstall({"node_modules":{"meteor":{"mongo-dev-server":{"server.js":function(){

////////////////////////////////////////////////////////////////////////
//                                                                    //
// packages/mongo-dev-server/server.js                                //
//                                                                    //
////////////////////////////////////////////////////////////////////////
                                                                      //
if (process.env.MONGO_URL === 'no-mongo-server') {
  Meteor._debug('Note: Restart Meteor to start the MongoDB server.');
}

////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/mongo-dev-server/server.js");

/* Exports */
Package._define("mongo-dev-server", exports);

})();
