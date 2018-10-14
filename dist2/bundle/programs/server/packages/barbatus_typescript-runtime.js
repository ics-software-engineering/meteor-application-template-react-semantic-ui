(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __await, __asyncGenerator, __asyncDelegator, __asyncValues;

var require = meteorInstall({"node_modules":{"meteor":{"barbatus:typescript-runtime":{"typescript-helpers.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/barbatus_typescript-runtime/typescript-helpers.js        //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
let tslib;
module.link("tslib", {
  default(v) {
    tslib = v;
  }

}, 0);
__extends = tslib.__extends;
__assign = tslib.__assign;
__rest = tslib.__rest;
__decorate = tslib.__decorate;
__param = tslib.__param;
__metadata = tslib.__metadata;
__awaiter = tslib.__awaiter;
__generator = tslib.__generator;
__exportStar = tslib.__exportStar;
__values = tslib.__values;
__read = tslib.__read;
__spread = tslib.__spread;
__await = tslib.__await;
__asyncGenerator = tslib.__asyncGenerator;
__asyncDelegator = tslib.__asyncDelegator;
__asyncValues = tslib.__asyncValues;
///////////////////////////////////////////////////////////////////////

},"node_modules":{"tslib":{"package.json":function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// node_modules/meteor/barbatus_typescript-runtime/node_modules/tsli //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.exports = {
  "name": "tslib",
  "version": "1.9.1",
  "main": "tslib.js"
};

///////////////////////////////////////////////////////////////////////

},"tslib.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// node_modules/meteor/barbatus_typescript-runtime/node_modules/tsli //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.useNode();
///////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/barbatus:typescript-runtime/typescript-helpers.js");

/* Exports */
Package._define("barbatus:typescript-runtime", {
  __extends: __extends,
  __assign: __assign,
  __rest: __rest,
  __decorate: __decorate,
  __param: __param,
  __metadata: __metadata,
  __awaiter: __awaiter,
  __generator: __generator,
  __exportStar: __exportStar,
  __values: __values,
  __read: __read,
  __spread: __spread,
  __await: __await,
  __asyncGenerator: __asyncGenerator,
  __asyncDelegator: __asyncDelegator,
  __asyncValues: __asyncValues
});

})();

//# sourceURL=meteor://💻app/packages/barbatus_typescript-runtime.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYmFyYmF0dXM6dHlwZXNjcmlwdC1ydW50aW1lL3R5cGVzY3JpcHQtaGVscGVycy5qcyJdLCJuYW1lcyI6WyJ0c2xpYiIsIm1vZHVsZSIsImxpbmsiLCJkZWZhdWx0IiwidiIsIl9fZXh0ZW5kcyIsIl9fYXNzaWduIiwiX19yZXN0IiwiX19kZWNvcmF0ZSIsIl9fcGFyYW0iLCJfX21ldGFkYXRhIiwiX19hd2FpdGVyIiwiX19nZW5lcmF0b3IiLCJfX2V4cG9ydFN0YXIiLCJfX3ZhbHVlcyIsIl9fcmVhZCIsIl9fc3ByZWFkIiwiX19hd2FpdCIsIl9fYXN5bmNHZW5lcmF0b3IiLCJfX2FzeW5jRGVsZWdhdG9yIiwiX19hc3luY1ZhbHVlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLEtBQUo7QUFBVUMsTUFBTSxDQUFDQyxJQUFQLENBQVksT0FBWixFQUFvQjtBQUFDQyxTQUFPLENBQUNDLENBQUQsRUFBRztBQUFDSixTQUFLLEdBQUNJLENBQU47QUFBUTs7QUFBcEIsQ0FBcEIsRUFBMEMsQ0FBMUM7QUFFVkMsU0FBUyxHQUFHTCxLQUFLLENBQUNLLFNBQWxCO0FBRUFDLFFBQVEsR0FBR04sS0FBSyxDQUFDTSxRQUFqQjtBQUVBQyxNQUFNLEdBQUdQLEtBQUssQ0FBQ08sTUFBZjtBQUVBQyxVQUFVLEdBQUdSLEtBQUssQ0FBQ1EsVUFBbkI7QUFFQUMsT0FBTyxHQUFHVCxLQUFLLENBQUNTLE9BQWhCO0FBRUFDLFVBQVUsR0FBR1YsS0FBSyxDQUFDVSxVQUFuQjtBQUVBQyxTQUFTLEdBQUdYLEtBQUssQ0FBQ1csU0FBbEI7QUFFQUMsV0FBVyxHQUFHWixLQUFLLENBQUNZLFdBQXBCO0FBRUFDLFlBQVksR0FBR2IsS0FBSyxDQUFDYSxZQUFyQjtBQUVBQyxRQUFRLEdBQUdkLEtBQUssQ0FBQ2MsUUFBakI7QUFFQUMsTUFBTSxHQUFHZixLQUFLLENBQUNlLE1BQWY7QUFFQUMsUUFBUSxHQUFHaEIsS0FBSyxDQUFDZ0IsUUFBakI7QUFFQUMsT0FBTyxHQUFHakIsS0FBSyxDQUFDaUIsT0FBaEI7QUFFQUMsZ0JBQWdCLEdBQUdsQixLQUFLLENBQUNrQixnQkFBekI7QUFFQUMsZ0JBQWdCLEdBQUduQixLQUFLLENBQUNtQixnQkFBekI7QUFFQUMsYUFBYSxHQUFHcEIsS0FBSyxDQUFDb0IsYUFBdEIsQyIsImZpbGUiOiIvcGFja2FnZXMvYmFyYmF0dXNfdHlwZXNjcmlwdC1ydW50aW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRzbGliIGZyb20gJ3RzbGliJztcblxuX19leHRlbmRzID0gdHNsaWIuX19leHRlbmRzO1xuXG5fX2Fzc2lnbiA9IHRzbGliLl9fYXNzaWduO1xuXG5fX3Jlc3QgPSB0c2xpYi5fX3Jlc3Q7XG5cbl9fZGVjb3JhdGUgPSB0c2xpYi5fX2RlY29yYXRlO1xuXG5fX3BhcmFtID0gdHNsaWIuX19wYXJhbTtcblxuX19tZXRhZGF0YSA9IHRzbGliLl9fbWV0YWRhdGE7XG5cbl9fYXdhaXRlciA9IHRzbGliLl9fYXdhaXRlcjtcblxuX19nZW5lcmF0b3IgPSB0c2xpYi5fX2dlbmVyYXRvcjtcblxuX19leHBvcnRTdGFyID0gdHNsaWIuX19leHBvcnRTdGFyO1xuXG5fX3ZhbHVlcyA9IHRzbGliLl9fdmFsdWVzO1xuXG5fX3JlYWQgPSB0c2xpYi5fX3JlYWQ7XG5cbl9fc3ByZWFkID0gdHNsaWIuX19zcHJlYWQ7XG5cbl9fYXdhaXQgPSB0c2xpYi5fX2F3YWl0O1xuXG5fX2FzeW5jR2VuZXJhdG9yID0gdHNsaWIuX19hc3luY0dlbmVyYXRvcjtcblxuX19hc3luY0RlbGVnYXRvciA9IHRzbGliLl9fYXN5bmNEZWxlZ2F0b3I7XG5cbl9fYXN5bmNWYWx1ZXMgPSB0c2xpYi5fX2FzeW5jVmFsdWVzO1xuIl19
