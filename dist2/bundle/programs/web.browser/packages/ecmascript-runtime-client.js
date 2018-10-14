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
var __g, __e;

var require = meteorInstall({"node_modules":{"meteor":{"ecmascript-runtime-client":{"modern.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ecmascript-runtime-client/modern.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
try {
  require("core-js/modules/es7.object.get-own-property-descriptors");
} catch (e) {
  throw new Error([
    "The core-js npm package could not be found in your node_modules ",
    "directory. Please run the following command to install it:",
    "",
    "  meteor npm install --save core-js",
    ""
  ].join("\n"));
}

require("core-js/modules/es6.object.is");
require("core-js/modules/es6.function.name");
require("core-js/modules/es6.number.is-finite");
require("core-js/modules/es6.number.is-nan");
require("core-js/modules/es7.array.flatten");
require("core-js/modules/es7.array.flat-map");
require("core-js/modules/es7.object.values");
require("core-js/modules/es7.object.entries");
require("core-js/modules/es7.string.pad-start");
require("core-js/modules/es7.string.pad-end");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"core-js":{"modules":{"es7.object.get-own-property-descriptors.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es7.object.get-own-property-descriptors. //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_export.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_export.js                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_global.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_global.js                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_core.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_core.js                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_hide.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_hide.js                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_object-dp.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_object-dp.js                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_an-object.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_an-object.js                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_is-object.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_is-object.js                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_ie8-dom-define.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_ie8-dom-define.js                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_descriptors.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_descriptors.js                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_fails.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_fails.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_dom-create.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_dom-create.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_to-primitive.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_to-primitive.js                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_property-desc.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_property-desc.js                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_redefine.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_redefine.js                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_has.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_has.js                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_uid.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_uid.js                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_ctx.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_ctx.js                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_a-function.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_a-function.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_own-keys.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_own-keys.js                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_object-gopn.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_object-gopn.js                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_object-keys-internal.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_object-keys-internal.js                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_to-iobject.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_to-iobject.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_iobject.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_iobject.js                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_cof.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_cof.js                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_defined.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_defined.js                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_array-includes.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_array-includes.js                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_to-length.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_to-length.js                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_to-integer.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_to-integer.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_to-absolute-index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_to-absolute-index.js                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_shared-key.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_shared-key.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_shared.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_shared.js                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_library.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_library.js                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = false;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_enum-bug-keys.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_enum-bug-keys.js                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_object-gops.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_object-gops.js                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.f = Object.getOwnPropertySymbols;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_object-gopd.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_object-gopd.js                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_object-pie.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_object-pie.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.f = {}.propertyIsEnumerable;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_create-property.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_create-property.js                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"es6.object.is.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es6.object.is.js                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', { is: require('./_same-value') });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_same-value.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_same-value.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"es6.function.name.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es6.function.name.js                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"es6.number.is-finite.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es6.number.is-finite.js                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 20.1.2.2 Number.isFinite(number)
var $export = require('./_export');
var _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"es6.number.is-nan.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es6.number.is-nan.js                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"es7.array.flatten.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es7.array.flatten.js                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

require('./_add-to-unscopables')('flatten');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_flatten-into-array.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_flatten-into-array.js                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_is-array.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_is-array.js                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_wks.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_wks.js                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_to-object.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_to-object.js                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_array-species-create.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_array-species-create.js                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_array-species-constructor.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_array-species-constructor.js            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_add-to-unscopables.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_add-to-unscopables.js                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"es7.array.flat-map.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es7.array.flat-map.js                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"es7.object.values.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es7.object.values.js                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_object-to-array.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_object-to-array.js                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_object-keys.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_object-keys.js                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"es7.object.entries.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es7.object.entries.js                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"es7.string.pad-start.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es7.string.pad-start.js                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_string-pad.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_string-pad.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length');
var repeat = require('./_string-repeat');
var defined = require('./_defined');

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_string-repeat.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_string-repeat.js                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_user-agent.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/_user-agent.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"es7.string.pad-end.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/ecmascript-runtime-client/node_modules/core-js/modules/es7.string.pad-end.js                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/ecmascript-runtime-client/modern.js");

/* Exports */
Package._define("ecmascript-runtime-client", exports);

})();
