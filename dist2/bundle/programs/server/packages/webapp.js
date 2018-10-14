(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var Log = Package.logging.Log;
var _ = Package.underscore._;
var RoutePolicy = Package.routepolicy.RoutePolicy;
var Boilerplate = Package['boilerplate-generator'].Boilerplate;
var WebAppHashing = Package['webapp-hashing'].WebAppHashing;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var WebApp, WebAppInternals, main;

var require = meteorInstall({"node_modules":{"meteor":{"webapp":{"webapp_server.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/webapp/webapp_server.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
const module1 = module;
module1.export({
  WebApp: () => WebApp,
  WebAppInternals: () => WebAppInternals
});
let assert;
module1.link("assert", {
  default(v) {
    assert = v;
  }

}, 0);
let readFileSync;
module1.link("fs", {
  readFileSync(v) {
    readFileSync = v;
  }

}, 1);
let createServer;
module1.link("http", {
  createServer(v) {
    createServer = v;
  }

}, 2);
let pathJoin, pathDirname;
module1.link("path", {
  join(v) {
    pathJoin = v;
  },

  dirname(v) {
    pathDirname = v;
  }

}, 3);
let parseUrl;
module1.link("url", {
  parse(v) {
    parseUrl = v;
  }

}, 4);
let createHash;
module1.link("crypto", {
  createHash(v) {
    createHash = v;
  }

}, 5);
let connect;
module1.link("./connect.js", {
  connect(v) {
    connect = v;
  }

}, 6);
let compress;
module1.link("compression", {
  default(v) {
    compress = v;
  }

}, 7);
let cookieParser;
module1.link("cookie-parser", {
  default(v) {
    cookieParser = v;
  }

}, 8);
let query;
module1.link("qs-middleware", {
  default(v) {
    query = v;
  }

}, 9);
let parseRequest;
module1.link("parseurl", {
  default(v) {
    parseRequest = v;
  }

}, 10);
let basicAuth;
module1.link("basic-auth-connect", {
  default(v) {
    basicAuth = v;
  }

}, 11);
let lookupUserAgent;
module1.link("useragent", {
  lookup(v) {
    lookupUserAgent = v;
  }

}, 12);
let isModern, calculateHashOfMinimumVersions;
module1.link("meteor/modern-browsers", {
  isModern(v) {
    isModern = v;
  },

  calculateHashOfMinimumVersions(v) {
    calculateHashOfMinimumVersions = v;
  }

}, 13);
let send;
module1.link("send", {
  default(v) {
    send = v;
  }

}, 14);
let removeExistingSocketFile, registerSocketFileCleanup;
module1.link("./socket_file.js", {
  removeExistingSocketFile(v) {
    removeExistingSocketFile = v;
  },

  registerSocketFileCleanup(v) {
    registerSocketFileCleanup = v;
  }

}, 15);
let onMessage;
module1.link("meteor/inter-process-messaging", {
  onMessage(v) {
    onMessage = v;
  }

}, 16);
var SHORT_SOCKET_TIMEOUT = 5 * 1000;
var LONG_SOCKET_TIMEOUT = 120 * 1000;
const WebApp = {};
const WebAppInternals = {};
const hasOwn = Object.prototype.hasOwnProperty; // backwards compat to 2.0 of connect

connect.basicAuth = basicAuth;
WebAppInternals.NpmModules = {
  connect: {
    version: Npm.require('connect/package.json').version,
    module: connect
  }
}; // Though we might prefer to use web.browser (modern) as the default
// architecture, safety requires a more compatible defaultArch.

WebApp.defaultArch = 'web.browser.legacy'; // XXX maps archs to manifests

WebApp.clientPrograms = {}; // XXX maps archs to program path on filesystem

var archPath = {};

var bundledJsCssUrlRewriteHook = function (url) {
  var bundledPrefix = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '';
  return bundledPrefix + url;
};

var sha1 = function (contents) {
  var hash = createHash('sha1');
  hash.update(contents);
  return hash.digest('hex');
}; // #BrowserIdentification
//
// We have multiple places that want to identify the browser: the
// unsupported browser page, the appcache package, and, eventually
// delivering browser polyfills only as needed.
//
// To avoid detecting the browser in multiple places ad-hoc, we create a
// Meteor "browser" object. It uses but does not expose the npm
// useragent module (we could choose a different mechanism to identify
// the browser in the future if we wanted to).  The browser object
// contains
//
// * `name`: the name of the browser in camel case
// * `major`, `minor`, `patch`: integers describing the browser version
//
// Also here is an early version of a Meteor `request` object, intended
// to be a high-level description of the request without exposing
// details of connect's low-level `req`.  Currently it contains:
//
// * `browser`: browser identification object described above
// * `url`: parsed url, including parsed query params
//
// As a temporary hack there is a `categorizeRequest` function on WebApp which
// converts a connect `req` to a Meteor `request`. This can go away once smart
// packages such as appcache are being passed a `request` object directly when
// they serve content.
//
// This allows `request` to be used uniformly: it is passed to the html
// attributes hook, and the appcache package can use it when deciding
// whether to generate a 404 for the manifest.
//
// Real routing / server side rendering will probably refactor this
// heavily.
// e.g. "Mobile Safari" => "mobileSafari"


var camelCase = function (name) {
  var parts = name.split(' ');
  parts[0] = parts[0].toLowerCase();

  for (var i = 1; i < parts.length; ++i) {
    parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substr(1);
  }

  return parts.join('');
};

var identifyBrowser = function (userAgentString) {
  var userAgent = lookupUserAgent(userAgentString);
  return {
    name: camelCase(userAgent.family),
    major: +userAgent.major,
    minor: +userAgent.minor,
    patch: +userAgent.patch
  };
}; // XXX Refactor as part of implementing real routing.


WebAppInternals.identifyBrowser = identifyBrowser;

WebApp.categorizeRequest = function (req) {
  return _.extend({
    browser: identifyBrowser(req.headers['user-agent']),
    url: parseUrl(req.url, true)
  }, _.pick(req, 'dynamicHead', 'dynamicBody', 'headers', 'cookies'));
}; // HTML attribute hooks: functions to be called to determine any attributes to
// be added to the '<html>' tag. Each function is passed a 'request' object (see
// #BrowserIdentification) and should return null or object.


var htmlAttributeHooks = [];

var getHtmlAttributes = function (request) {
  var combinedAttributes = {};

  _.each(htmlAttributeHooks || [], function (hook) {
    var attributes = hook(request);
    if (attributes === null) return;
    if (typeof attributes !== 'object') throw Error("HTML attribute hook must return null or object");

    _.extend(combinedAttributes, attributes);
  });

  return combinedAttributes;
};

WebApp.addHtmlAttributeHook = function (hook) {
  htmlAttributeHooks.push(hook);
}; // Serve app HTML for this URL?


var appUrl = function (url) {
  if (url === '/favicon.ico' || url === '/robots.txt') return false; // NOTE: app.manifest is not a web standard like favicon.ico and
  // robots.txt. It is a file name we have chosen to use for HTML5
  // appcache URLs. It is included here to prevent using an appcache
  // then removing it from poisoning an app permanently. Eventually,
  // once we have server side routing, this won't be needed as
  // unknown URLs with return a 404 automatically.

  if (url === '/app.manifest') return false; // Avoid serving app HTML for declared routes such as /sockjs/.

  if (RoutePolicy.classify(url)) return false; // we currently return app HTML on all URLs by default

  return true;
}; // We need to calculate the client hash after all packages have loaded
// to give them a chance to populate __meteor_runtime_config__.
//
// Calculating the hash during startup means that packages can only
// populate __meteor_runtime_config__ during load, not during startup.
//
// Calculating instead it at the beginning of main after all startup
// hooks had run would allow packages to also populate
// __meteor_runtime_config__ during startup, but that's too late for
// autoupdate because it needs to have the client hash at startup to
// insert the auto update version itself into
// __meteor_runtime_config__ to get it to the client.
//
// An alternative would be to give autoupdate a "post-start,
// pre-listen" hook to allow it to insert the auto update version at
// the right moment.


Meteor.startup(function () {
  function getter(key) {
    return function (arch) {
      arch = arch || WebApp.defaultArch;
      const program = WebApp.clientPrograms[arch];
      const value = program && program[key]; // If this is the first time we have calculated this hash,
      // program[key] will be a thunk (lazy function with no parameters)
      // that we should call to do the actual computation.

      return typeof value === "function" ? program[key] = value() : value;
    };
  }

  WebApp.calculateClientHash = WebApp.clientHash = getter("version");
  WebApp.calculateClientHashRefreshable = getter("versionRefreshable");
  WebApp.calculateClientHashNonRefreshable = getter("versionNonRefreshable");
  WebApp.getRefreshableAssets = getter("refreshableAssets");
}); // When we have a request pending, we want the socket timeout to be long, to
// give ourselves a while to serve it, and to allow sockjs long polls to
// complete.  On the other hand, we want to close idle sockets relatively
// quickly, so that we can shut down relatively promptly but cleanly, without
// cutting off anyone's response.

WebApp._timeoutAdjustmentRequestCallback = function (req, res) {
  // this is really just req.socket.setTimeout(LONG_SOCKET_TIMEOUT);
  req.setTimeout(LONG_SOCKET_TIMEOUT); // Insert our new finish listener to run BEFORE the existing one which removes
  // the response from the socket.

  var finishListeners = res.listeners('finish'); // XXX Apparently in Node 0.12 this event was called 'prefinish'.
  // https://github.com/joyent/node/commit/7c9b6070
  // But it has switched back to 'finish' in Node v4:
  // https://github.com/nodejs/node/pull/1411

  res.removeAllListeners('finish');
  res.on('finish', function () {
    res.setTimeout(SHORT_SOCKET_TIMEOUT);
  });

  _.each(finishListeners, function (l) {
    res.on('finish', l);
  });
}; // Will be updated by main before we listen.
// Map from client arch to boilerplate object.
// Boilerplate object has:
//   - func: XXX
//   - baseData: XXX


var boilerplateByArch = {}; // Register a callback function that can selectively modify boilerplate
// data given arguments (request, data, arch). The key should be a unique
// identifier, to prevent accumulating duplicate callbacks from the same
// call site over time. Callbacks will be called in the order they were
// registered. A callback should return false if it did not make any
// changes affecting the boilerplate. Passing null deletes the callback.
// Any previous callback registered for this key will be returned.

const boilerplateDataCallbacks = Object.create(null);

WebAppInternals.registerBoilerplateDataCallback = function (key, callback) {
  const previousCallback = boilerplateDataCallbacks[key];

  if (typeof callback === "function") {
    boilerplateDataCallbacks[key] = callback;
  } else {
    assert.strictEqual(callback, null);
    delete boilerplateDataCallbacks[key];
  } // Return the previous callback in case the new callback needs to call
  // it; for example, when the new callback is a wrapper for the old.


  return previousCallback || null;
}; // Given a request (as returned from `categorizeRequest`), return the
// boilerplate HTML to serve for that request.
//
// If a previous connect middleware has rendered content for the head or body,
// returns the boilerplate with that content patched in otherwise
// memoizes on HTML attributes (used by, eg, appcache) and whether inline
// scripts are currently allowed.
// XXX so far this function is always called with arch === 'web.browser'


function getBoilerplate(request, arch) {
  return getBoilerplateAsync(request, arch).await();
}

function getBoilerplateAsync(request, arch) {
  const boilerplate = boilerplateByArch[arch];
  const data = Object.assign({}, boilerplate.baseData, {
    htmlAttributes: getHtmlAttributes(request)
  }, _.pick(request, "dynamicHead", "dynamicBody"));
  let madeChanges = false;
  let promise = Promise.resolve();
  Object.keys(boilerplateDataCallbacks).forEach(key => {
    promise = promise.then(() => {
      const callback = boilerplateDataCallbacks[key];
      return callback(request, data, arch);
    }).then(result => {
      // Callbacks should return false if they did not make any changes.
      if (result !== false) {
        madeChanges = true;
      }
    });
  });
  return promise.then(() => ({
    stream: boilerplate.toHTMLStream(data),
    statusCode: data.statusCode,
    headers: data.headers
  }));
}

WebAppInternals.generateBoilerplateInstance = function (arch, manifest, additionalOptions) {
  additionalOptions = additionalOptions || {};

  var runtimeConfig = _.extend(_.clone(__meteor_runtime_config__), additionalOptions.runtimeConfigOverrides || {});

  return new Boilerplate(arch, manifest, _.extend({
    pathMapper(itemPath) {
      return pathJoin(archPath[arch], itemPath);
    },

    baseDataExtension: {
      additionalStaticJs: _.map(additionalStaticJs || [], function (contents, pathname) {
        return {
          pathname: pathname,
          contents: contents
        };
      }),
      // Convert to a JSON string, then get rid of most weird characters, then
      // wrap in double quotes. (The outermost JSON.stringify really ought to
      // just be "wrap in double quotes" but we use it to be safe.) This might
      // end up inside a <script> tag so we need to be careful to not include
      // "</script>", but normal {{spacebars}} escaping escapes too much! See
      // https://github.com/meteor/meteor/issues/3730
      meteorRuntimeConfig: JSON.stringify(encodeURIComponent(JSON.stringify(runtimeConfig))),
      rootUrlPathPrefix: __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '',
      bundledJsCssUrlRewriteHook: bundledJsCssUrlRewriteHook,
      sriMode: sriMode,
      inlineScriptsAllowed: WebAppInternals.inlineScriptsAllowed(),
      inline: additionalOptions.inline
    }
  }, additionalOptions));
}; // A mapping from url path to architecture (e.g. "web.browser") to static
// file information with the following fields:
// - type: the type of file to be served
// - cacheable: optionally, whether the file should be cached or not
// - sourceMapUrl: optionally, the url of the source map
//
// Info also contains one of the following:
// - content: the stringified content that should be served at this path
// - absolutePath: the absolute path on disk to the file


var staticFilesByArch; // Serve static files from the manifest or added with
// `addStaticJs`. Exported for tests.

WebAppInternals.staticFilesMiddleware = function (staticFilesByArch, req, res, next) {
  return Promise.asyncApply(() => {
    if ('GET' != req.method && 'HEAD' != req.method && 'OPTIONS' != req.method) {
      next();
      return;
    }

    var pathname = parseRequest(req).pathname;

    try {
      pathname = decodeURIComponent(pathname);
    } catch (e) {
      next();
      return;
    }

    var serveStaticJs = function (s) {
      res.writeHead(200, {
        'Content-type': 'application/javascript; charset=UTF-8'
      });
      res.write(s);
      res.end();
    };

    if (pathname === "/meteor_runtime_config.js" && !WebAppInternals.inlineScriptsAllowed()) {
      serveStaticJs("__meteor_runtime_config__ = " + JSON.stringify(__meteor_runtime_config__) + ";");
      return;
    } else if (_.has(additionalStaticJs, pathname) && !WebAppInternals.inlineScriptsAllowed()) {
      serveStaticJs(additionalStaticJs[pathname]);
      return;
    }

    const {
      arch,
      path
    } = getArchAndPath(pathname, identifyBrowser(req.headers["user-agent"])); // If pauseClient(arch) has been called, program.paused will be a
    // Promise that will be resolved when the program is unpaused.

    Promise.await(WebApp.clientPrograms[arch].paused);
    const info = getStaticFileInfo(pathname, path, arch);

    if (!info) {
      next();
      return;
    } // We don't need to call pause because, unlike 'static', once we call into
    // 'send' and yield to the event loop, we never call another handler with
    // 'next'.
    // Cacheable files are files that should never change. Typically
    // named by their hash (eg meteor bundled js and css files).
    // We cache them ~forever (1yr).


    const maxAge = info.cacheable ? 1000 * 60 * 60 * 24 * 365 : 0;

    if (info.cacheable) {
      // Since we use req.headers["user-agent"] to determine whether the
      // client should receive modern or legacy resources, tell the client
      // to invalidate cached resources when/if its user agent string
      // changes in the future.
      res.setHeader("Vary", "User-Agent");
    } // Set the X-SourceMap header, which current Chrome, FireFox, and Safari
    // understand.  (The SourceMap header is slightly more spec-correct but FF
    // doesn't understand it.)
    //
    // You may also need to enable source maps in Chrome: open dev tools, click
    // the gear in the bottom right corner, and select "enable source maps".


    if (info.sourceMapUrl) {
      res.setHeader('X-SourceMap', __meteor_runtime_config__.ROOT_URL_PATH_PREFIX + info.sourceMapUrl);
    }

    if (info.type === "js" || info.type === "dynamic js") {
      res.setHeader("Content-Type", "application/javascript; charset=UTF-8");
    } else if (info.type === "css") {
      res.setHeader("Content-Type", "text/css; charset=UTF-8");
    } else if (info.type === "json") {
      res.setHeader("Content-Type", "application/json; charset=UTF-8");
    }

    if (info.hash) {
      res.setHeader('ETag', '"' + info.hash + '"');
    }

    if (info.content) {
      res.write(info.content);
      res.end();
    } else {
      send(req, info.absolutePath, {
        maxage: maxAge,
        dotfiles: 'allow',
        // if we specified a dotfile in the manifest, serve it
        lastModified: false // don't set last-modified based on the file date

      }).on('error', function (err) {
        Log.error("Error serving static file " + err);
        res.writeHead(500);
        res.end();
      }).on('directory', function () {
        Log.error("Unexpected directory " + info.absolutePath);
        res.writeHead(500);
        res.end();
      }).pipe(res);
    }
  });
};

function getStaticFileInfo(originalPath, path, arch) {
  if (!hasOwn.call(WebApp.clientPrograms, arch)) {
    return null;
  } // Get a list of all available static file architectures, with arch
  // first in the list if it exists.


  const staticArchList = Object.keys(staticFilesByArch);
  const archIndex = staticArchList.indexOf(arch);

  if (archIndex > 0) {
    staticArchList.unshift(staticArchList.splice(archIndex, 1)[0]);
  }

  let info = null;
  staticArchList.some(arch => {
    const staticFiles = staticFilesByArch[arch];

    function finalize(path) {
      info = staticFiles[path]; // Sometimes we register a lazy function instead of actual data in
      // the staticFiles manifest.

      if (typeof info === "function") {
        info = staticFiles[path] = info();
      }

      return info;
    } // If staticFiles contains originalPath with the arch inferred above,
    // use that information.


    if (hasOwn.call(staticFiles, originalPath)) {
      return finalize(originalPath);
    } // If getArchAndPath returned an alternate path, try that instead.


    if (path !== originalPath && hasOwn.call(staticFiles, path)) {
      return finalize(path);
    }
  });
  return info;
}

function getArchAndPath(path, browser) {
  const pathParts = path.split("/");
  const archKey = pathParts[1];

  if (archKey.startsWith("__")) {
    const archCleaned = "web." + archKey.slice(2);

    if (hasOwn.call(WebApp.clientPrograms, archCleaned)) {
      pathParts.splice(1, 1); // Remove the archKey part.

      return {
        arch: archCleaned,
        path: pathParts.join("/")
      };
    }
  } // TODO Perhaps one day we could infer Cordova clients here, so that we
  // wouldn't have to use prefixed "/__cordova/..." URLs.


  const arch = isModern(browser) ? "web.browser" : "web.browser.legacy";

  if (hasOwn.call(WebApp.clientPrograms, arch)) {
    return {
      arch,
      path
    };
  }

  return {
    arch: WebApp.defaultArch,
    path
  };
} // Parse the passed in port value. Return the port as-is if it's a String
// (e.g. a Windows Server style named pipe), otherwise return the port as an
// integer.
//
// DEPRECATED: Direct use of this function is not recommended; it is no
// longer used internally, and will be removed in a future release.


WebAppInternals.parsePort = port => {
  let parsedPort = parseInt(port);

  if (Number.isNaN(parsedPort)) {
    parsedPort = port;
  }

  return parsedPort;
};

onMessage("webapp-pause-client", ({
  arch
}) => Promise.asyncApply(() => {
  WebAppInternals.pauseClient(arch);
}));
onMessage("webapp-reload-client", ({
  arch
}) => Promise.asyncApply(() => {
  WebAppInternals.generateClientProgram(arch);
}));

function runWebAppServer() {
  var shuttingDown = false;
  var syncQueue = new Meteor._SynchronousQueue();

  var getItemPathname = function (itemUrl) {
    return decodeURIComponent(parseUrl(itemUrl).pathname);
  };

  WebAppInternals.reloadClientPrograms = function () {
    syncQueue.runTask(function () {
      staticFilesByArch = Object.create(null);
      const {
        configJson
      } = __meteor_bootstrap__;
      const clientArchs = configJson.clientArchs || Object.keys(configJson.clientPaths);

      try {
        clientArchs.forEach(generateClientProgram);
        WebAppInternals.staticFilesByArch = staticFilesByArch;
      } catch (e) {
        Log.error("Error reloading the client program: " + e.stack);
        process.exit(1);
      }
    });
  }; // Pause any incoming requests and make them wait for the program to be
  // unpaused the next time generateClientProgram(arch) is called.


  WebAppInternals.pauseClient = function (arch) {
    syncQueue.runTask(() => {
      const program = WebApp.clientPrograms[arch];
      const {
        unpause
      } = program;
      program.paused = new Promise(resolve => {
        if (typeof unpause === "function") {
          // If there happens to be an existing program.unpause function,
          // compose it with the resolve function.
          program.unpause = function () {
            unpause();
            resolve();
          };
        } else {
          program.unpause = resolve;
        }
      });
    });
  };

  WebAppInternals.generateClientProgram = function (arch) {
    syncQueue.runTask(() => generateClientProgram(arch));
  };

  function generateClientProgram(arch) {
    const clientDir = pathJoin(pathDirname(__meteor_bootstrap__.serverDir), arch); // read the control for the client we'll be serving up

    const programJsonPath = pathJoin(clientDir, "program.json");
    let programJson;

    try {
      programJson = JSON.parse(readFileSync(programJsonPath));
    } catch (e) {
      if (e.code === "ENOENT") return;
      throw e;
    }

    if (programJson.format !== "web-program-pre1") {
      throw new Error("Unsupported format for client assets: " + JSON.stringify(programJson.format));
    }

    if (!programJsonPath || !clientDir || !programJson) {
      throw new Error("Client config file not parsed.");
    }

    archPath[arch] = clientDir;
    const staticFiles = staticFilesByArch[arch] = Object.create(null);
    const {
      manifest
    } = programJson;
    manifest.forEach(item => {
      if (item.url && item.where === "client") {
        staticFiles[getItemPathname(item.url)] = {
          absolutePath: pathJoin(clientDir, item.path),
          cacheable: item.cacheable,
          hash: item.hash,
          // Link from source to its map
          sourceMapUrl: item.sourceMapUrl,
          type: item.type
        };

        if (item.sourceMap) {
          // Serve the source map too, under the specified URL. We assume
          // all source maps are cacheable.
          staticFiles[getItemPathname(item.sourceMapUrl)] = {
            absolutePath: pathJoin(clientDir, item.sourceMap),
            cacheable: true
          };
        }
      }
    });
    const {
      PUBLIC_SETTINGS
    } = __meteor_runtime_config__;
    const configOverrides = {
      PUBLIC_SETTINGS,
      // Since the minimum modern versions defined in the modern-versions
      // package affect which bundle a given client receives, any changes
      // in those versions should trigger a corresponding change in the
      // versions calculated below.
      minimumModernVersionsHash: calculateHashOfMinimumVersions()
    };
    const oldProgram = WebApp.clientPrograms[arch];
    const newProgram = WebApp.clientPrograms[arch] = {
      format: "web-program-pre1",
      manifest: manifest,
      // Use arrow functions so that these versions can be lazily
      // calculated later, and so that they will not be included in the
      // staticFiles[manifestUrl].content string below.
      version: () => WebAppHashing.calculateClientHash(manifest, null, configOverrides),
      versionRefreshable: () => WebAppHashing.calculateClientHash(manifest, type => type === "css", configOverrides),
      versionNonRefreshable: () => WebAppHashing.calculateClientHash(manifest, type => type !== "css", configOverrides),
      cordovaCompatibilityVersions: programJson.cordovaCompatibilityVersions,
      PUBLIC_SETTINGS
    }; // Expose program details as a string reachable via the following URL.

    const manifestUrlPrefix = "/__" + arch.replace(/^web\./, "");
    const manifestUrl = manifestUrlPrefix + getItemPathname("/manifest.json");

    staticFiles[manifestUrl] = () => {
      if (Package.autoupdate) {
        const {
          AUTOUPDATE_VERSION = Package.autoupdate.Autoupdate.autoupdateVersion
        } = process.env;

        if (AUTOUPDATE_VERSION) {
          newProgram.version = AUTOUPDATE_VERSION;
        }
      }

      if (typeof newProgram.version === "function") {
        newProgram.version = newProgram.version();
      }

      return {
        content: JSON.stringify(newProgram),
        cacheable: false,
        hash: newProgram.version,
        type: "json"
      };
    };

    generateBoilerplateForArch(arch); // If there are any requests waiting on oldProgram.paused, let them
    // continue now (using the new program).

    if (oldProgram && oldProgram.paused) {
      oldProgram.unpause();
    }
  }

  ;
  const defaultOptionsForArch = {
    'web.cordova': {
      runtimeConfigOverrides: {
        // XXX We use absoluteUrl() here so that we serve https://
        // URLs to cordova clients if force-ssl is in use. If we were
        // to use __meteor_runtime_config__.ROOT_URL instead of
        // absoluteUrl(), then Cordova clients would immediately get a
        // HCP setting their DDP_DEFAULT_CONNECTION_URL to
        // http://example.meteor.com. This breaks the app, because
        // force-ssl doesn't serve CORS headers on 302
        // redirects. (Plus it's undesirable to have clients
        // connecting to http://example.meteor.com when force-ssl is
        // in use.)
        DDP_DEFAULT_CONNECTION_URL: process.env.MOBILE_DDP_URL || Meteor.absoluteUrl(),
        ROOT_URL: process.env.MOBILE_ROOT_URL || Meteor.absoluteUrl()
      }
    },
    "web.browser": {
      runtimeConfigOverrides: {
        isModern: true
      }
    },
    "web.browser.legacy": {
      runtimeConfigOverrides: {
        isModern: false
      }
    }
  };

  WebAppInternals.generateBoilerplate = function () {
    // This boilerplate will be served to the mobile devices when used with
    // Meteor/Cordova for the Hot-Code Push and since the file will be served by
    // the device's server, it is important to set the DDP url to the actual
    // Meteor server accepting DDP connections and not the device's file server.
    syncQueue.runTask(function () {
      Object.keys(WebApp.clientPrograms).forEach(generateBoilerplateForArch);
    });
  };

  function generateBoilerplateForArch(arch) {
    const program = WebApp.clientPrograms[arch];
    const {
      baseData
    } = boilerplateByArch[arch] = WebAppInternals.generateBoilerplateInstance(arch, program.manifest, defaultOptionsForArch[arch]);
    program.refreshableAssets = baseData.css.map(file => ({
      url: bundledJsCssUrlRewriteHook(file.url)
    }));
  }

  WebAppInternals.reloadClientPrograms(); // webserver

  var app = connect(); // Packages and apps can add handlers that run before any other Meteor
  // handlers via WebApp.rawConnectHandlers.

  var rawConnectHandlers = connect();
  app.use(rawConnectHandlers); // Auto-compress any json, javascript, or text.

  app.use(compress()); // parse cookies into an object

  app.use(cookieParser()); // We're not a proxy; reject (without crashing) attempts to treat us like
  // one. (See #1212.)

  app.use(function (req, res, next) {
    if (RoutePolicy.isValidUrl(req.url)) {
      next();
      return;
    }

    res.writeHead(400);
    res.write("Not a proxy");
    res.end();
  }); // Parse the query string into res.query. Used by oauth_server, but it's
  // generally pretty handy..
  //
  // Do this before the next middleware destroys req.url if a path prefix
  // is set to close #10111.

  app.use(query());

  function getPathParts(path) {
    const parts = path.split("/");

    while (parts[0] === "") parts.shift();

    return parts;
  }

  function isPrefixOf(prefix, array) {
    return prefix.length <= array.length && prefix.every((part, i) => part === array[i]);
  } // Strip off the path prefix, if it exists.


  app.use(function (request, response, next) {
    const pathPrefix = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX;
    const {
      pathname
    } = parseUrl(request.url); // check if the path in the url starts with the path prefix

    if (pathPrefix) {
      const prefixParts = getPathParts(pathPrefix);
      const pathParts = getPathParts(pathname);

      if (isPrefixOf(prefixParts, pathParts)) {
        request.url = "/" + pathParts.slice(prefixParts.length).join("/");
        return next();
      }
    }

    if (pathname === "/favicon.ico" || pathname === "/robots.txt") {
      return next();
    }

    if (pathPrefix) {
      response.writeHead(404);
      response.write("Unknown path");
      response.end();
      return;
    }

    next();
  }); // Serve static files from the manifest.
  // This is inspired by the 'static' middleware.

  app.use(function (req, res, next) {
    WebAppInternals.staticFilesMiddleware(staticFilesByArch, req, res, next);
  }); // Core Meteor packages like dynamic-import can add handlers before
  // other handlers added by package and application code.

  app.use(WebAppInternals.meteorInternalHandlers = connect()); // Packages and apps can add handlers to this via WebApp.connectHandlers.
  // They are inserted before our default handler.

  var packageAndAppHandlers = connect();
  app.use(packageAndAppHandlers);
  var suppressConnectErrors = false; // connect knows it is an error handler because it has 4 arguments instead of
  // 3. go figure.  (It is not smart enough to find such a thing if it's hidden
  // inside packageAndAppHandlers.)

  app.use(function (err, req, res, next) {
    if (!err || !suppressConnectErrors || !req.headers['x-suppress-error']) {
      next(err);
      return;
    }

    res.writeHead(err.status, {
      'Content-Type': 'text/plain'
    });
    res.end("An error message");
  });
  app.use(function (req, res, next) {
    return Promise.asyncApply(() => {
      if (!appUrl(req.url)) {
        return next();
      } else {
        var headers = {
          'Content-Type': 'text/html; charset=utf-8'
        };

        if (shuttingDown) {
          headers['Connection'] = 'Close';
        }

        var request = WebApp.categorizeRequest(req);

        if (request.url.query && request.url.query['meteor_css_resource']) {
          // In this case, we're requesting a CSS resource in the meteor-specific
          // way, but we don't have it.  Serve a static css file that indicates that
          // we didn't have it, so we can detect that and refresh.  Make sure
          // that any proxies or CDNs don't cache this error!  (Normally proxies
          // or CDNs are smart enough not to cache error pages, but in order to
          // make this hack work, we need to return the CSS file as a 200, which
          // would otherwise be cached.)
          headers['Content-Type'] = 'text/css; charset=utf-8';
          headers['Cache-Control'] = 'no-cache';
          res.writeHead(200, headers);
          res.write(".meteor-css-not-found-error { width: 0px;}");
          res.end();
          return;
        }

        if (request.url.query && request.url.query['meteor_js_resource']) {
          // Similarly, we're requesting a JS resource that we don't have.
          // Serve an uncached 404. (We can't use the same hack we use for CSS,
          // because actually acting on that hack requires us to have the JS
          // already!)
          headers['Cache-Control'] = 'no-cache';
          res.writeHead(404, headers);
          res.end("404 Not Found");
          return;
        }

        if (request.url.query && request.url.query['meteor_dont_serve_index']) {
          // When downloading files during a Cordova hot code push, we need
          // to detect if a file is not available instead of inadvertently
          // downloading the default index page.
          // So similar to the situation above, we serve an uncached 404.
          headers['Cache-Control'] = 'no-cache';
          res.writeHead(404, headers);
          res.end("404 Not Found");
          return;
        }

        const {
          arch
        } = getArchAndPath(parseRequest(req).pathname, request.browser); // If pauseClient(arch) has been called, program.paused will be a
        // Promise that will be resolved when the program is unpaused.

        Promise.await(WebApp.clientPrograms[arch].paused);
        return getBoilerplateAsync(request, arch).then(({
          stream,
          statusCode,
          headers: newHeaders
        }) => {
          if (!statusCode) {
            statusCode = res.statusCode ? res.statusCode : 200;
          }

          if (newHeaders) {
            Object.assign(headers, newHeaders);
          }

          res.writeHead(statusCode, headers);
          stream.pipe(res, {
            // End the response when the stream ends.
            end: true
          });
        }).catch(error => {
          Log.error("Error running template: " + error.stack);
          res.writeHead(500, headers);
          res.end();
        });
      }
    });
  }); // Return 404 by default, if no other handlers serve this URL.

  app.use(function (req, res) {
    res.writeHead(404);
    res.end();
  });
  var httpServer = createServer(app);
  var onListeningCallbacks = []; // After 5 seconds w/o data on a socket, kill it.  On the other hand, if
  // there's an outstanding request, give it a higher timeout instead (to avoid
  // killing long-polling requests)

  httpServer.setTimeout(SHORT_SOCKET_TIMEOUT); // Do this here, and then also in livedata/stream_server.js, because
  // stream_server.js kills all the current request handlers when installing its
  // own.

  httpServer.on('request', WebApp._timeoutAdjustmentRequestCallback); // If the client gave us a bad request, tell it instead of just closing the
  // socket. This lets load balancers in front of us differentiate between "a
  // server is randomly closing sockets for no reason" and "client sent a bad
  // request".
  //
  // This will only work on Node 6; Node 4 destroys the socket before calling
  // this event. See https://github.com/nodejs/node/pull/4557/ for details.

  httpServer.on('clientError', (err, socket) => {
    // Pre-Node-6, do nothing.
    if (socket.destroyed) {
      return;
    }

    if (err.message === 'Parse Error') {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    } else {
      // For other errors, use the default behavior as if we had no clientError
      // handler.
      socket.destroy(err);
    }
  }); // start up app

  _.extend(WebApp, {
    connectHandlers: packageAndAppHandlers,
    rawConnectHandlers: rawConnectHandlers,
    httpServer: httpServer,
    connectApp: app,
    // For testing.
    suppressConnectErrors: function () {
      suppressConnectErrors = true;
    },
    onListening: function (f) {
      if (onListeningCallbacks) onListeningCallbacks.push(f);else f();
    },
    // This can be overridden by users who want to modify how listening works
    // (eg, to run a proxy like Apollo Engine Proxy in front of the server).
    startListening: function (httpServer, listenOptions, cb) {
      httpServer.listen(listenOptions, cb);
    }
  }); // Let the rest of the packages (and Meteor.startup hooks) insert connect
  // middlewares and update __meteor_runtime_config__, then keep going to set up
  // actually serving HTML.


  exports.main = argv => {
    WebAppInternals.generateBoilerplate();

    const startHttpServer = listenOptions => {
      WebApp.startListening(httpServer, listenOptions, Meteor.bindEnvironment(() => {
        if (process.env.METEOR_PRINT_ON_LISTEN) {
          console.log("LISTENING");
        }

        const callbacks = onListeningCallbacks;
        onListeningCallbacks = null;
        callbacks.forEach(callback => {
          callback();
        });
      }, e => {
        console.error("Error listening:", e);
        console.error(e && e.stack);
      }));
    };

    let localPort = process.env.PORT || 0;
    const unixSocketPath = process.env.UNIX_SOCKET_PATH;

    if (unixSocketPath) {
      // Start the HTTP server using a socket file.
      removeExistingSocketFile(unixSocketPath);
      startHttpServer({
        path: unixSocketPath
      });
      registerSocketFileCleanup(unixSocketPath);
    } else {
      localPort = isNaN(Number(localPort)) ? localPort : Number(localPort);

      if (/\\\\?.+\\pipe\\?.+/.test(localPort)) {
        // Start the HTTP server using Windows Server style named pipe.
        startHttpServer({
          path: localPort
        });
      } else if (typeof localPort === "number") {
        // Start the HTTP server using TCP.
        startHttpServer({
          port: localPort,
          host: process.env.BIND_IP || "0.0.0.0"
        });
      } else {
        throw new Error("Invalid PORT specified");
      }
    }

    return "DAEMON";
  };
}

var inlineScriptsAllowed = true;

WebAppInternals.inlineScriptsAllowed = function () {
  return inlineScriptsAllowed;
};

WebAppInternals.setInlineScriptsAllowed = function (value) {
  inlineScriptsAllowed = value;
  WebAppInternals.generateBoilerplate();
};

var sriMode;

WebAppInternals.enableSubresourceIntegrity = function (use_credentials = false) {
  sriMode = use_credentials ? 'use-credentials' : 'anonymous';
  WebAppInternals.generateBoilerplate();
};

WebAppInternals.setBundledJsCssUrlRewriteHook = function (hookFn) {
  bundledJsCssUrlRewriteHook = hookFn;
  WebAppInternals.generateBoilerplate();
};

WebAppInternals.setBundledJsCssPrefix = function (prefix) {
  var self = this;
  self.setBundledJsCssUrlRewriteHook(function (url) {
    return prefix + url;
  });
}; // Packages can call `WebAppInternals.addStaticJs` to specify static
// JavaScript to be included in the app. This static JS will be inlined,
// unless inline scripts have been disabled, in which case it will be
// served under `/<sha1 of contents>`.


var additionalStaticJs = {};

WebAppInternals.addStaticJs = function (contents) {
  additionalStaticJs["/" + sha1(contents) + ".js"] = contents;
}; // Exported for tests


WebAppInternals.getBoilerplate = getBoilerplate;
WebAppInternals.additionalStaticJs = additionalStaticJs; // Start the server!

runWebAppServer();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"connect.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/webapp/connect.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  connect: () => connect
});
let npmConnect;
module.link("connect", {
  default(v) {
    npmConnect = v;
  }

}, 0);

function connect(...connectArgs) {
  const handlers = npmConnect.apply(this, connectArgs);
  const originalUse = handlers.use; // Wrap the handlers.use method so that any provided handler functions
  // alway run in a Fiber.

  handlers.use = function use(...useArgs) {
    const {
      stack
    } = this;
    const originalLength = stack.length;
    const result = originalUse.apply(this, useArgs); // If we just added anything to the stack, wrap each new entry.handle
    // with a function that calls Promise.asyncApply to ensure the
    // original handler runs in a Fiber.

    for (let i = originalLength; i < stack.length; ++i) {
      const entry = stack[i];
      const originalHandle = entry.handle;

      if (originalHandle.length >= 4) {
        // If the original handle had four (or more) parameters, the
        // wrapper must also have four parameters, since connect uses
        // handle.length to dermine whether to pass the error as the first
        // argument to the handle function.
        entry.handle = function handle(err, req, res, next) {
          return Promise.asyncApply(originalHandle, this, arguments);
        };
      } else {
        entry.handle = function handle(req, res, next) {
          return Promise.asyncApply(originalHandle, this, arguments);
        };
      }
    }

    return result;
  };

  return handlers;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"socket_file.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/webapp/socket_file.js                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  removeExistingSocketFile: () => removeExistingSocketFile,
  registerSocketFileCleanup: () => registerSocketFileCleanup
});
let statSync, unlinkSync, existsSync;
module.link("fs", {
  statSync(v) {
    statSync = v;
  },

  unlinkSync(v) {
    unlinkSync = v;
  },

  existsSync(v) {
    existsSync = v;
  }

}, 0);

const removeExistingSocketFile = socketPath => {
  try {
    if (statSync(socketPath).isSocket()) {
      // Since a new socket file will be created, remove the existing
      // file.
      unlinkSync(socketPath);
    } else {
      throw new Error(`An existing file was found at "${socketPath}" and it is not ` + 'a socket file. Please confirm PORT is pointing to valid and ' + 'un-used socket file path.');
    }
  } catch (error) {
    // If there is no existing socket file to cleanup, great, we'll
    // continue normally. If the caught exception represents any other
    // issue, re-throw.
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
};

const registerSocketFileCleanup = (socketPath, eventEmitter = process) => {
  ['exit', 'SIGINT', 'SIGHUP', 'SIGTERM'].forEach(signal => {
    eventEmitter.on(signal, Meteor.bindEnvironment(() => {
      if (existsSync(socketPath)) {
        unlinkSync(socketPath);
      }
    }));
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"connect":{"package.json":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/connect/package.json                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exports = {
  "name": "connect",
  "version": "3.6.5"
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/connect/index.js                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.useNode();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"compression":{"package.json":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/compression/package.json                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exports = {
  "name": "compression",
  "version": "1.7.1"
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/compression/index.js                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.useNode();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"cookie-parser":{"package.json":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/cookie-parser/package.json                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exports = {
  "name": "cookie-parser",
  "version": "1.4.3"
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/cookie-parser/index.js                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.useNode();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"qs-middleware":{"package.json":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/qs-middleware/package.json                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exports = {
  "name": "qs-middleware",
  "version": "1.0.3",
  "main": "./lib/qs-middleware.js"
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"qs-middleware.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/qs-middleware/lib/qs-middleware.js                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.useNode();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"parseurl":{"package.json":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/parseurl/package.json                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exports = {
  "name": "parseurl",
  "version": "1.3.2"
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/parseurl/index.js                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.useNode();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"basic-auth-connect":{"package.json":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/basic-auth-connect/package.json                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exports = {
  "name": "basic-auth-connect",
  "version": "1.0.0"
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/basic-auth-connect/index.js                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.useNode();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"useragent":{"package.json":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/useragent/package.json                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exports = {
  "name": "useragent",
  "version": "2.2.1",
  "main": "./index.js"
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/useragent/index.js                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.useNode();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"send":{"package.json":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/send/package.json                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exports = {
  "name": "send",
  "version": "0.16.1"
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/webapp/node_modules/send/index.js                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.useNode();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/webapp/webapp_server.js");

/* Exports */
Package._define("webapp", exports, {
  WebApp: WebApp,
  WebAppInternals: WebAppInternals,
  main: main
});

})();

//# sourceURL=meteor://💻app/packages/webapp.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvd2ViYXBwL3dlYmFwcF9zZXJ2ZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3dlYmFwcC9jb25uZWN0LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy93ZWJhcHAvc29ja2V0X2ZpbGUuanMiXSwibmFtZXMiOlsibW9kdWxlMSIsIm1vZHVsZSIsImV4cG9ydCIsIldlYkFwcCIsIldlYkFwcEludGVybmFscyIsImFzc2VydCIsImxpbmsiLCJkZWZhdWx0IiwidiIsInJlYWRGaWxlU3luYyIsImNyZWF0ZVNlcnZlciIsInBhdGhKb2luIiwicGF0aERpcm5hbWUiLCJqb2luIiwiZGlybmFtZSIsInBhcnNlVXJsIiwicGFyc2UiLCJjcmVhdGVIYXNoIiwiY29ubmVjdCIsImNvbXByZXNzIiwiY29va2llUGFyc2VyIiwicXVlcnkiLCJwYXJzZVJlcXVlc3QiLCJiYXNpY0F1dGgiLCJsb29rdXBVc2VyQWdlbnQiLCJsb29rdXAiLCJpc01vZGVybiIsImNhbGN1bGF0ZUhhc2hPZk1pbmltdW1WZXJzaW9ucyIsInNlbmQiLCJyZW1vdmVFeGlzdGluZ1NvY2tldEZpbGUiLCJyZWdpc3RlclNvY2tldEZpbGVDbGVhbnVwIiwib25NZXNzYWdlIiwiU0hPUlRfU09DS0VUX1RJTUVPVVQiLCJMT05HX1NPQ0tFVF9USU1FT1VUIiwiaGFzT3duIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJOcG1Nb2R1bGVzIiwidmVyc2lvbiIsIk5wbSIsInJlcXVpcmUiLCJkZWZhdWx0QXJjaCIsImNsaWVudFByb2dyYW1zIiwiYXJjaFBhdGgiLCJidW5kbGVkSnNDc3NVcmxSZXdyaXRlSG9vayIsInVybCIsImJ1bmRsZWRQcmVmaXgiLCJfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fIiwiUk9PVF9VUkxfUEFUSF9QUkVGSVgiLCJzaGExIiwiY29udGVudHMiLCJoYXNoIiwidXBkYXRlIiwiZGlnZXN0IiwiY2FtZWxDYXNlIiwibmFtZSIsInBhcnRzIiwic3BsaXQiLCJ0b0xvd2VyQ2FzZSIsImkiLCJsZW5ndGgiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsImlkZW50aWZ5QnJvd3NlciIsInVzZXJBZ2VudFN0cmluZyIsInVzZXJBZ2VudCIsImZhbWlseSIsIm1ham9yIiwibWlub3IiLCJwYXRjaCIsImNhdGVnb3JpemVSZXF1ZXN0IiwicmVxIiwiXyIsImV4dGVuZCIsImJyb3dzZXIiLCJoZWFkZXJzIiwicGljayIsImh0bWxBdHRyaWJ1dGVIb29rcyIsImdldEh0bWxBdHRyaWJ1dGVzIiwicmVxdWVzdCIsImNvbWJpbmVkQXR0cmlidXRlcyIsImVhY2giLCJob29rIiwiYXR0cmlidXRlcyIsIkVycm9yIiwiYWRkSHRtbEF0dHJpYnV0ZUhvb2siLCJwdXNoIiwiYXBwVXJsIiwiUm91dGVQb2xpY3kiLCJjbGFzc2lmeSIsIk1ldGVvciIsInN0YXJ0dXAiLCJnZXR0ZXIiLCJrZXkiLCJhcmNoIiwicHJvZ3JhbSIsInZhbHVlIiwiY2FsY3VsYXRlQ2xpZW50SGFzaCIsImNsaWVudEhhc2giLCJjYWxjdWxhdGVDbGllbnRIYXNoUmVmcmVzaGFibGUiLCJjYWxjdWxhdGVDbGllbnRIYXNoTm9uUmVmcmVzaGFibGUiLCJnZXRSZWZyZXNoYWJsZUFzc2V0cyIsIl90aW1lb3V0QWRqdXN0bWVudFJlcXVlc3RDYWxsYmFjayIsInJlcyIsInNldFRpbWVvdXQiLCJmaW5pc2hMaXN0ZW5lcnMiLCJsaXN0ZW5lcnMiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJvbiIsImwiLCJib2lsZXJwbGF0ZUJ5QXJjaCIsImJvaWxlcnBsYXRlRGF0YUNhbGxiYWNrcyIsImNyZWF0ZSIsInJlZ2lzdGVyQm9pbGVycGxhdGVEYXRhQ2FsbGJhY2siLCJjYWxsYmFjayIsInByZXZpb3VzQ2FsbGJhY2siLCJzdHJpY3RFcXVhbCIsImdldEJvaWxlcnBsYXRlIiwiZ2V0Qm9pbGVycGxhdGVBc3luYyIsImF3YWl0IiwiYm9pbGVycGxhdGUiLCJkYXRhIiwiYXNzaWduIiwiYmFzZURhdGEiLCJodG1sQXR0cmlidXRlcyIsIm1hZGVDaGFuZ2VzIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwia2V5cyIsImZvckVhY2giLCJ0aGVuIiwicmVzdWx0Iiwic3RyZWFtIiwidG9IVE1MU3RyZWFtIiwic3RhdHVzQ29kZSIsImdlbmVyYXRlQm9pbGVycGxhdGVJbnN0YW5jZSIsIm1hbmlmZXN0IiwiYWRkaXRpb25hbE9wdGlvbnMiLCJydW50aW1lQ29uZmlnIiwiY2xvbmUiLCJydW50aW1lQ29uZmlnT3ZlcnJpZGVzIiwiQm9pbGVycGxhdGUiLCJwYXRoTWFwcGVyIiwiaXRlbVBhdGgiLCJiYXNlRGF0YUV4dGVuc2lvbiIsImFkZGl0aW9uYWxTdGF0aWNKcyIsIm1hcCIsInBhdGhuYW1lIiwibWV0ZW9yUnVudGltZUNvbmZpZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJyb290VXJsUGF0aFByZWZpeCIsInNyaU1vZGUiLCJpbmxpbmVTY3JpcHRzQWxsb3dlZCIsImlubGluZSIsInN0YXRpY0ZpbGVzQnlBcmNoIiwic3RhdGljRmlsZXNNaWRkbGV3YXJlIiwibmV4dCIsIm1ldGhvZCIsImRlY29kZVVSSUNvbXBvbmVudCIsImUiLCJzZXJ2ZVN0YXRpY0pzIiwicyIsIndyaXRlSGVhZCIsIndyaXRlIiwiZW5kIiwiaGFzIiwicGF0aCIsImdldEFyY2hBbmRQYXRoIiwicGF1c2VkIiwiaW5mbyIsImdldFN0YXRpY0ZpbGVJbmZvIiwibWF4QWdlIiwiY2FjaGVhYmxlIiwic2V0SGVhZGVyIiwic291cmNlTWFwVXJsIiwidHlwZSIsImNvbnRlbnQiLCJhYnNvbHV0ZVBhdGgiLCJtYXhhZ2UiLCJkb3RmaWxlcyIsImxhc3RNb2RpZmllZCIsImVyciIsIkxvZyIsImVycm9yIiwicGlwZSIsIm9yaWdpbmFsUGF0aCIsImNhbGwiLCJzdGF0aWNBcmNoTGlzdCIsImFyY2hJbmRleCIsImluZGV4T2YiLCJ1bnNoaWZ0Iiwic3BsaWNlIiwic29tZSIsInN0YXRpY0ZpbGVzIiwiZmluYWxpemUiLCJwYXRoUGFydHMiLCJhcmNoS2V5Iiwic3RhcnRzV2l0aCIsImFyY2hDbGVhbmVkIiwic2xpY2UiLCJwYXJzZVBvcnQiLCJwb3J0IiwicGFyc2VkUG9ydCIsInBhcnNlSW50IiwiTnVtYmVyIiwiaXNOYU4iLCJwYXVzZUNsaWVudCIsImdlbmVyYXRlQ2xpZW50UHJvZ3JhbSIsInJ1bldlYkFwcFNlcnZlciIsInNodXR0aW5nRG93biIsInN5bmNRdWV1ZSIsIl9TeW5jaHJvbm91c1F1ZXVlIiwiZ2V0SXRlbVBhdGhuYW1lIiwiaXRlbVVybCIsInJlbG9hZENsaWVudFByb2dyYW1zIiwicnVuVGFzayIsImNvbmZpZ0pzb24iLCJfX21ldGVvcl9ib290c3RyYXBfXyIsImNsaWVudEFyY2hzIiwiY2xpZW50UGF0aHMiLCJzdGFjayIsInByb2Nlc3MiLCJleGl0IiwidW5wYXVzZSIsImNsaWVudERpciIsInNlcnZlckRpciIsInByb2dyYW1Kc29uUGF0aCIsInByb2dyYW1Kc29uIiwiY29kZSIsImZvcm1hdCIsIml0ZW0iLCJ3aGVyZSIsInNvdXJjZU1hcCIsIlBVQkxJQ19TRVRUSU5HUyIsImNvbmZpZ092ZXJyaWRlcyIsIm1pbmltdW1Nb2Rlcm5WZXJzaW9uc0hhc2giLCJvbGRQcm9ncmFtIiwibmV3UHJvZ3JhbSIsIldlYkFwcEhhc2hpbmciLCJ2ZXJzaW9uUmVmcmVzaGFibGUiLCJ2ZXJzaW9uTm9uUmVmcmVzaGFibGUiLCJjb3Jkb3ZhQ29tcGF0aWJpbGl0eVZlcnNpb25zIiwibWFuaWZlc3RVcmxQcmVmaXgiLCJyZXBsYWNlIiwibWFuaWZlc3RVcmwiLCJQYWNrYWdlIiwiYXV0b3VwZGF0ZSIsIkFVVE9VUERBVEVfVkVSU0lPTiIsIkF1dG91cGRhdGUiLCJhdXRvdXBkYXRlVmVyc2lvbiIsImVudiIsImdlbmVyYXRlQm9pbGVycGxhdGVGb3JBcmNoIiwiZGVmYXVsdE9wdGlvbnNGb3JBcmNoIiwiRERQX0RFRkFVTFRfQ09OTkVDVElPTl9VUkwiLCJNT0JJTEVfRERQX1VSTCIsImFic29sdXRlVXJsIiwiUk9PVF9VUkwiLCJNT0JJTEVfUk9PVF9VUkwiLCJnZW5lcmF0ZUJvaWxlcnBsYXRlIiwicmVmcmVzaGFibGVBc3NldHMiLCJjc3MiLCJmaWxlIiwiYXBwIiwicmF3Q29ubmVjdEhhbmRsZXJzIiwidXNlIiwiaXNWYWxpZFVybCIsImdldFBhdGhQYXJ0cyIsInNoaWZ0IiwiaXNQcmVmaXhPZiIsInByZWZpeCIsImFycmF5IiwiZXZlcnkiLCJwYXJ0IiwicmVzcG9uc2UiLCJwYXRoUHJlZml4IiwicHJlZml4UGFydHMiLCJtZXRlb3JJbnRlcm5hbEhhbmRsZXJzIiwicGFja2FnZUFuZEFwcEhhbmRsZXJzIiwic3VwcHJlc3NDb25uZWN0RXJyb3JzIiwic3RhdHVzIiwibmV3SGVhZGVycyIsImNhdGNoIiwiaHR0cFNlcnZlciIsIm9uTGlzdGVuaW5nQ2FsbGJhY2tzIiwic29ja2V0IiwiZGVzdHJveWVkIiwibWVzc2FnZSIsImRlc3Ryb3kiLCJjb25uZWN0SGFuZGxlcnMiLCJjb25uZWN0QXBwIiwib25MaXN0ZW5pbmciLCJmIiwic3RhcnRMaXN0ZW5pbmciLCJsaXN0ZW5PcHRpb25zIiwiY2IiLCJsaXN0ZW4iLCJleHBvcnRzIiwibWFpbiIsImFyZ3YiLCJzdGFydEh0dHBTZXJ2ZXIiLCJiaW5kRW52aXJvbm1lbnQiLCJNRVRFT1JfUFJJTlRfT05fTElTVEVOIiwiY29uc29sZSIsImxvZyIsImNhbGxiYWNrcyIsImxvY2FsUG9ydCIsIlBPUlQiLCJ1bml4U29ja2V0UGF0aCIsIlVOSVhfU09DS0VUX1BBVEgiLCJ0ZXN0IiwiaG9zdCIsIkJJTkRfSVAiLCJzZXRJbmxpbmVTY3JpcHRzQWxsb3dlZCIsImVuYWJsZVN1YnJlc291cmNlSW50ZWdyaXR5IiwidXNlX2NyZWRlbnRpYWxzIiwic2V0QnVuZGxlZEpzQ3NzVXJsUmV3cml0ZUhvb2siLCJob29rRm4iLCJzZXRCdW5kbGVkSnNDc3NQcmVmaXgiLCJzZWxmIiwiYWRkU3RhdGljSnMiLCJucG1Db25uZWN0IiwiY29ubmVjdEFyZ3MiLCJoYW5kbGVycyIsImFwcGx5Iiwib3JpZ2luYWxVc2UiLCJ1c2VBcmdzIiwib3JpZ2luYWxMZW5ndGgiLCJlbnRyeSIsIm9yaWdpbmFsSGFuZGxlIiwiaGFuZGxlIiwiYXN5bmNBcHBseSIsImFyZ3VtZW50cyIsInN0YXRTeW5jIiwidW5saW5rU3luYyIsImV4aXN0c1N5bmMiLCJzb2NrZXRQYXRoIiwiaXNTb2NrZXQiLCJldmVudEVtaXR0ZXIiLCJzaWduYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU1BLE9BQU8sR0FBQ0MsTUFBZDtBQUFxQkQsT0FBTyxDQUFDRSxNQUFSLENBQWU7QUFBQ0MsUUFBTSxFQUFDLE1BQUlBLE1BQVo7QUFBbUJDLGlCQUFlLEVBQUMsTUFBSUE7QUFBdkMsQ0FBZjtBQUF3RSxJQUFJQyxNQUFKO0FBQVdMLE9BQU8sQ0FBQ00sSUFBUixDQUFhLFFBQWIsRUFBc0I7QUFBQ0MsU0FBTyxDQUFDQyxDQUFELEVBQUc7QUFBQ0gsVUFBTSxHQUFDRyxDQUFQO0FBQVM7O0FBQXJCLENBQXRCLEVBQTZDLENBQTdDO0FBQWdELElBQUlDLFlBQUo7QUFBaUJULE9BQU8sQ0FBQ00sSUFBUixDQUFhLElBQWIsRUFBa0I7QUFBQ0csY0FBWSxDQUFDRCxDQUFELEVBQUc7QUFBQ0MsZ0JBQVksR0FBQ0QsQ0FBYjtBQUFlOztBQUFoQyxDQUFsQixFQUFvRCxDQUFwRDtBQUF1RCxJQUFJRSxZQUFKO0FBQWlCVixPQUFPLENBQUNNLElBQVIsQ0FBYSxNQUFiLEVBQW9CO0FBQUNJLGNBQVksQ0FBQ0YsQ0FBRCxFQUFHO0FBQUNFLGdCQUFZLEdBQUNGLENBQWI7QUFBZTs7QUFBaEMsQ0FBcEIsRUFBc0QsQ0FBdEQ7QUFBeUQsSUFBSUcsUUFBSixFQUFhQyxXQUFiO0FBQXlCWixPQUFPLENBQUNNLElBQVIsQ0FBYSxNQUFiLEVBQW9CO0FBQUNPLE1BQUksQ0FBQ0wsQ0FBRCxF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QUFDMVUsQ0FBWDtBQUFhLEdBQXBEOztBQUFxRDJVLFlBQVUsQ0FBQzNVLENBQUQsRUFBRztBQUFDMlUsY0FBVSxHQUFDM1UsQ0FBWDtBQUFhOztBQUFoRixDQUFqQixFQUFtRyxDQUFuRzs7QUF5QjNKLE1BQU1xQix3QkFBd0IsR0FBSXVULFVBQUQsSUFBZ0I7QUFDdEQsTUFBSTtBQUNGLFFBQUlILFFBQVEsQ0FBQ0csVUFBRCxDQUFSLENBQXFCQyxRQUFyQixFQUFKLEVBQXFDO0FBQ25DO0FBQ0E7QUFDQUgsZ0JBQVUsQ0FBQ0UsVUFBRCxDQUFWO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsWUFBTSxJQUFJOVAsS0FBSixDQUNILGtDQUFpQzhQLFVBQVcsa0JBQTdDLEdBQ0EsOERBREEsR0FFQSwyQkFISSxDQUFOO0FBS0Q7QUFDRixHQVpELENBWUUsT0FBT3hKLEtBQVAsRUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFFBQUlBLEtBQUssQ0FBQzZDLElBQU4sS0FBZSxRQUFuQixFQUE2QjtBQUMzQixZQUFNN0MsS0FBTjtBQUNEO0FBQ0Y7QUFDRixDQXJCTTs7QUEwQkEsTUFBTTlKLHlCQUF5QixHQUNwQyxDQUFDc1QsVUFBRCxFQUFhRSxZQUFZLEdBQUdwSCxPQUE1QixLQUF3QztBQUN0QyxHQUFDLE1BQUQsRUFBUyxRQUFULEVBQW1CLFFBQW5CLEVBQTZCLFNBQTdCLEVBQXdDOUYsT0FBeEMsQ0FBZ0RtTixNQUFNLElBQUk7QUFDeERELGdCQUFZLENBQUN4TyxFQUFiLENBQWdCeU8sTUFBaEIsRUFBd0IzUCxNQUFNLENBQUNxTixlQUFQLENBQXVCLE1BQU07QUFDbkQsVUFBSWtDLFVBQVUsQ0FBQ0MsVUFBRCxDQUFkLEVBQTRCO0FBQzFCRixrQkFBVSxDQUFDRSxVQUFELENBQVY7QUFDRDtBQUNGLEtBSnVCLENBQXhCO0FBS0QsR0FORDtBQU9ELENBVEksQyIsImZpbGUiOiIvcGFja2FnZXMvd2ViYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tIFwiYXNzZXJ0XCI7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGNyZWF0ZVNlcnZlciB9IGZyb20gXCJodHRwXCI7XG5pbXBvcnQge1xuICBqb2luIGFzIHBhdGhKb2luLFxuICBkaXJuYW1lIGFzIHBhdGhEaXJuYW1lLFxufSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VVcmwgfSBmcm9tIFwidXJsXCI7XG5pbXBvcnQgeyBjcmVhdGVIYXNoIH0gZnJvbSBcImNyeXB0b1wiO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCIuL2Nvbm5lY3QuanNcIjtcbmltcG9ydCBjb21wcmVzcyBmcm9tIFwiY29tcHJlc3Npb25cIjtcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSBcImNvb2tpZS1wYXJzZXJcIjtcbmltcG9ydCBxdWVyeSBmcm9tIFwicXMtbWlkZGxld2FyZVwiO1xuaW1wb3J0IHBhcnNlUmVxdWVzdCBmcm9tIFwicGFyc2V1cmxcIjtcbmltcG9ydCBiYXNpY0F1dGggZnJvbSBcImJhc2ljLWF1dGgtY29ubmVjdFwiO1xuaW1wb3J0IHsgbG9va3VwIGFzIGxvb2t1cFVzZXJBZ2VudCB9IGZyb20gXCJ1c2VyYWdlbnRcIjtcbmltcG9ydCB7XG4gIGlzTW9kZXJuLFxuICBjYWxjdWxhdGVIYXNoT2ZNaW5pbXVtVmVyc2lvbnMsXG59IGZyb20gXCJtZXRlb3IvbW9kZXJuLWJyb3dzZXJzXCI7XG5pbXBvcnQgc2VuZCBmcm9tIFwic2VuZFwiO1xuaW1wb3J0IHtcbiAgcmVtb3ZlRXhpc3RpbmdTb2NrZXRGaWxlLFxuICByZWdpc3RlclNvY2tldEZpbGVDbGVhbnVwLFxufSBmcm9tICcuL3NvY2tldF9maWxlLmpzJztcblxudmFyIFNIT1JUX1NPQ0tFVF9USU1FT1VUID0gNSoxMDAwO1xudmFyIExPTkdfU09DS0VUX1RJTUVPVVQgPSAxMjAqMTAwMDtcblxuZXhwb3J0IGNvbnN0IFdlYkFwcCA9IHt9O1xuZXhwb3J0IGNvbnN0IFdlYkFwcEludGVybmFscyA9IHt9O1xuXG5jb25zdCBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vLyBiYWNrd2FyZHMgY29tcGF0IHRvIDIuMCBvZiBjb25uZWN0XG5jb25uZWN0LmJhc2ljQXV0aCA9IGJhc2ljQXV0aDtcblxuV2ViQXBwSW50ZXJuYWxzLk5wbU1vZHVsZXMgPSB7XG4gIGNvbm5lY3Q6IHtcbiAgICB2ZXJzaW9uOiBOcG0ucmVxdWlyZSgnY29ubmVjdC9wYWNrYWdlLmpzb24nKS52ZXJzaW9uLFxuICAgIG1vZHVsZTogY29ubmVjdCxcbiAgfVxufTtcblxuLy8gVGhvdWdoIHdlIG1pZ2h0IHByZWZlciB0byB1c2Ugd2ViLmJyb3dzZXIgKG1vZGVybikgYXMgdGhlIGRlZmF1bHRcbi8vIGFyY2hpdGVjdHVyZSwgc2FmZXR5IHJlcXVpcmVzIGEgbW9yZSBjb21wYXRpYmxlIGRlZmF1bHRBcmNoLlxuV2ViQXBwLmRlZmF1bHRBcmNoID0gJ3dlYi5icm93c2VyLmxlZ2FjeSc7XG5cbi8vIFhYWCBtYXBzIGFyY2hzIHRvIG1hbmlmZXN0c1xuV2ViQXBwLmNsaWVudFByb2dyYW1zID0ge307XG5cbi8vIFhYWCBtYXBzIGFyY2hzIHRvIHByb2dyYW0gcGF0aCBvbiBmaWxlc3lzdGVtXG52YXIgYXJjaFBhdGggPSB7fTtcblxudmFyIGJ1bmRsZWRKc0Nzc1VybFJld3JpdGVIb29rID0gZnVuY3Rpb24gKHVybCkge1xuICB2YXIgYnVuZGxlZFByZWZpeCA9XG4gICAgIF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18uUk9PVF9VUkxfUEFUSF9QUkVGSVggfHwgJyc7XG4gIHJldHVybiBidW5kbGVkUHJlZml4ICsgdXJsO1xufTtcblxudmFyIHNoYTEgPSBmdW5jdGlvbiAoY29udGVudHMpIHtcbiAgdmFyIGhhc2ggPSBjcmVhdGVIYXNoKCdzaGExJyk7XG4gIGhhc2gudXBkYXRlKGNvbnRlbnRzKTtcbiAgcmV0dXJuIGhhc2guZGlnZXN0KCdoZXgnKTtcbn07XG5cbi8vICNCcm93c2VySWRlbnRpZmljYXRpb25cbi8vXG4vLyBXZSBoYXZlIG11bHRpcGxlIHBsYWNlcyB0aGF0IHdhbnQgdG8gaWRlbnRpZnkgdGhlIGJyb3dzZXI6IHRoZVxuLy8gdW5zdXBwb3J0ZWQgYnJvd3NlciBwYWdlLCB0aGUgYXBwY2FjaGUgcGFja2FnZSwgYW5kLCBldmVudHVhbGx5XG4vLyBkZWxpdmVyaW5nIGJyb3dzZXIgcG9seWZpbGxzIG9ubHkgYXMgbmVlZGVkLlxuLy9cbi8vIFRvIGF2b2lkIGRldGVjdGluZyB0aGUgYnJvd3NlciBpbiBtdWx0aXBsZSBwbGFjZXMgYWQtaG9jLCB3ZSBjcmVhdGUgYVxuLy8gTWV0ZW9yIFwiYnJvd3NlclwiIG9iamVjdC4gSXQgdXNlcyBidXQgZG9lcyBub3QgZXhwb3NlIHRoZSBucG1cbi8vIHVzZXJhZ2VudCBtb2R1bGUgKHdlIGNvdWxkIGNob29zZSBhIGRpZmZlcmVudCBtZWNoYW5pc20gdG8gaWRlbnRpZnlcbi8vIHRoZSBicm93c2VyIGluIHRoZSBmdXR1cmUgaWYgd2Ugd2FudGVkIHRvKS4gIFRoZSBicm93c2VyIG9iamVjdFxuLy8gY29udGFpbnNcbi8vXG4vLyAqIGBuYW1lYDogdGhlIG5hbWUgb2YgdGhlIGJyb3dzZXIgaW4gY2FtZWwgY2FzZVxuLy8gKiBgbWFqb3JgLCBgbWlub3JgLCBgcGF0Y2hgOiBpbnRlZ2VycyBkZXNjcmliaW5nIHRoZSBicm93c2VyIHZlcnNpb25cbi8vXG4vLyBBbHNvIGhlcmUgaXMgYW4gZWFybHkgdmVyc2lvbiBvZiBhIE1ldGVvciBgcmVxdWVzdGAgb2JqZWN0LCBpbnRlbmRlZFxuLy8gdG8gYmUgYSBoaWdoLWxldmVsIGRlc2NyaXB0aW9uIG9mIHRoZSByZXF1ZXN0IHdpdGhvdXQgZXhwb3Npbmdcbi8vIGRldGFpbHMgb2YgY29ubmVjdCdzIGxvdy1sZXZlbCBgcmVxYC4gIEN1cnJlbnRseSBpdCBjb250YWluczpcbi8vXG4vLyAqIGBicm93c2VyYDogYnJvd3NlciBpZGVudGlmaWNhdGlvbiBvYmplY3QgZGVzY3JpYmVkIGFib3ZlXG4vLyAqIGB1cmxgOiBwYXJzZWQgdXJsLCBpbmNsdWRpbmcgcGFyc2VkIHF1ZXJ5IHBhcmFtc1xuLy9cbi8vIEFzIGEgdGVtcG9yYXJ5IGhhY2sgdGhlcmUgaXMgYSBgY2F0ZWdvcml6ZVJlcXVlc3RgIGZ1bmN0aW9uIG9uIFdlYkFwcCB3aGljaFxuLy8gY29udmVydHMgYSBjb25uZWN0IGByZXFgIHRvIGEgTWV0ZW9yIGByZXF1ZXN0YC4gVGhpcyBjYW4gZ28gYXdheSBvbmNlIHNtYXJ0XG4vLyBwYWNrYWdlcyBzdWNoIGFzIGFwcGNhY2hlIGFyZSBiZWluZyBwYXNzZWQgYSBgcmVxdWVzdGAgb2JqZWN0IGRpcmVjdGx5IHdoZW5cbi8vIHRoZXkgc2VydmUgY29udGVudC5cbi8vXG4vLyBUaGlzIGFsbG93cyBgcmVxdWVzdGAgdG8gYmUgdXNlZCB1bmlmb3JtbHk6IGl0IGlzIHBhc3NlZCB0byB0aGUgaHRtbFxuLy8gYXR0cmlidXRlcyBob29rLCBhbmQgdGhlIGFwcGNhY2hlIHBhY2thZ2UgY2FuIHVzZSBpdCB3aGVuIGRlY2lkaW5nXG4vLyB3aGV0aGVyIHRvIGdlbmVyYXRlIGEgNDA0IGZvciB0aGUgbWFuaWZlc3QuXG4vL1xuLy8gUmVhbCByb3V0aW5nIC8gc2VydmVyIHNpZGUgcmVuZGVyaW5nIHdpbGwgcHJvYmFibHkgcmVmYWN0b3IgdGhpc1xuLy8gaGVhdmlseS5cblxuXG4vLyBlLmcuIFwiTW9iaWxlIFNhZmFyaVwiID0+IFwibW9iaWxlU2FmYXJpXCJcbnZhciBjYW1lbENhc2UgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgcGFydHMgPSBuYW1lLnNwbGl0KCcgJyk7XG4gIHBhcnRzWzBdID0gcGFydHNbMF0udG9Mb3dlckNhc2UoKTtcbiAgZm9yICh2YXIgaSA9IDE7ICBpIDwgcGFydHMubGVuZ3RoOyAgKytpKSB7XG4gICAgcGFydHNbaV0gPSBwYXJ0c1tpXS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHBhcnRzW2ldLnN1YnN0cigxKTtcbiAgfVxuICByZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuXG52YXIgaWRlbnRpZnlCcm93c2VyID0gZnVuY3Rpb24gKHVzZXJBZ2VudFN0cmluZykge1xuICB2YXIgdXNlckFnZW50ID0gbG9va3VwVXNlckFnZW50KHVzZXJBZ2VudFN0cmluZyk7XG4gIHJldHVybiB7XG4gICAgbmFtZTogY2FtZWxDYXNlKHVzZXJBZ2VudC5mYW1pbHkpLFxuICAgIG1ham9yOiArdXNlckFnZW50Lm1ham9yLFxuICAgIG1pbm9yOiArdXNlckFnZW50Lm1pbm9yLFxuICAgIHBhdGNoOiArdXNlckFnZW50LnBhdGNoXG4gIH07XG59O1xuXG4vLyBYWFggUmVmYWN0b3IgYXMgcGFydCBvZiBpbXBsZW1lbnRpbmcgcmVhbCByb3V0aW5nLlxuV2ViQXBwSW50ZXJuYWxzLmlkZW50aWZ5QnJvd3NlciA9IGlkZW50aWZ5QnJvd3NlcjtcblxuV2ViQXBwLmNhdGVnb3JpemVSZXF1ZXN0ID0gZnVuY3Rpb24gKHJlcSkge1xuICByZXR1cm4gXy5leHRlbmQoe1xuICAgIGJyb3dzZXI6IGlkZW50aWZ5QnJvd3NlcihyZXEuaGVhZGVyc1sndXNlci1hZ2VudCddKSxcbiAgICB1cmw6IHBhcnNlVXJsKHJlcS51cmwsIHRydWUpXG4gIH0sIF8ucGljayhyZXEsICdkeW5hbWljSGVhZCcsICdkeW5hbWljQm9keScsICdoZWFkZXJzJywgJ2Nvb2tpZXMnKSk7XG59O1xuXG4vLyBIVE1MIGF0dHJpYnV0ZSBob29rczogZnVuY3Rpb25zIHRvIGJlIGNhbGxlZCB0byBkZXRlcm1pbmUgYW55IGF0dHJpYnV0ZXMgdG9cbi8vIGJlIGFkZGVkIHRvIHRoZSAnPGh0bWw+JyB0YWcuIEVhY2ggZnVuY3Rpb24gaXMgcGFzc2VkIGEgJ3JlcXVlc3QnIG9iamVjdCAoc2VlXG4vLyAjQnJvd3NlcklkZW50aWZpY2F0aW9uKSBhbmQgc2hvdWxkIHJldHVybiBudWxsIG9yIG9iamVjdC5cbnZhciBodG1sQXR0cmlidXRlSG9va3MgPSBbXTtcbnZhciBnZXRIdG1sQXR0cmlidXRlcyA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gIHZhciBjb21iaW5lZEF0dHJpYnV0ZXMgID0ge307XG4gIF8uZWFjaChodG1sQXR0cmlidXRlSG9va3MgfHwgW10sIGZ1bmN0aW9uIChob29rKSB7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBob29rKHJlcXVlc3QpO1xuICAgIGlmIChhdHRyaWJ1dGVzID09PSBudWxsKVxuICAgICAgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcyAhPT0gJ29iamVjdCcpXG4gICAgICB0aHJvdyBFcnJvcihcIkhUTUwgYXR0cmlidXRlIGhvb2sgbXVzdCByZXR1cm4gbnVsbCBvciBvYmplY3RcIik7XG4gICAgXy5leHRlbmQoY29tYmluZWRBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgfSk7XG4gIHJldHVybiBjb21iaW5lZEF0dHJpYnV0ZXM7XG59O1xuV2ViQXBwLmFkZEh0bWxBdHRyaWJ1dGVIb29rID0gZnVuY3Rpb24gKGhvb2spIHtcbiAgaHRtbEF0dHJpYnV0ZUhvb2tzLnB1c2goaG9vayk7XG59O1xuXG4vLyBTZXJ2ZSBhcHAgSFRNTCBmb3IgdGhpcyBVUkw/XG52YXIgYXBwVXJsID0gZnVuY3Rpb24gKHVybCkge1xuICBpZiAodXJsID09PSAnL2Zhdmljb24uaWNvJyB8fCB1cmwgPT09ICcvcm9ib3RzLnR4dCcpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIE5PVEU6IGFwcC5tYW5pZmVzdCBpcyBub3QgYSB3ZWIgc3RhbmRhcmQgbGlrZSBmYXZpY29uLmljbyBhbmRcbiAgLy8gcm9ib3RzLnR4dC4gSXQgaXMgYSBmaWxlIG5hbWUgd2UgaGF2ZSBjaG9zZW4gdG8gdXNlIGZvciBIVE1MNVxuICAvLyBhcHBjYWNoZSBVUkxzLiBJdCBpcyBpbmNsdWRlZCBoZXJlIHRvIHByZXZlbnQgdXNpbmcgYW4gYXBwY2FjaGVcbiAgLy8gdGhlbiByZW1vdmluZyBpdCBmcm9tIHBvaXNvbmluZyBhbiBhcHAgcGVybWFuZW50bHkuIEV2ZW50dWFsbHksXG4gIC8vIG9uY2Ugd2UgaGF2ZSBzZXJ2ZXIgc2lkZSByb3V0aW5nLCB0aGlzIHdvbid0IGJlIG5lZWRlZCBhc1xuICAvLyB1bmtub3duIFVSTHMgd2l0aCByZXR1cm4gYSA0MDQgYXV0b21hdGljYWxseS5cbiAgaWYgKHVybCA9PT0gJy9hcHAubWFuaWZlc3QnKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBBdm9pZCBzZXJ2aW5nIGFwcCBIVE1MIGZvciBkZWNsYXJlZCByb3V0ZXMgc3VjaCBhcyAvc29ja2pzLy5cbiAgaWYgKFJvdXRlUG9saWN5LmNsYXNzaWZ5KHVybCkpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIHdlIGN1cnJlbnRseSByZXR1cm4gYXBwIEhUTUwgb24gYWxsIFVSTHMgYnkgZGVmYXVsdFxuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLy8gV2UgbmVlZCB0byBjYWxjdWxhdGUgdGhlIGNsaWVudCBoYXNoIGFmdGVyIGFsbCBwYWNrYWdlcyBoYXZlIGxvYWRlZFxuLy8gdG8gZ2l2ZSB0aGVtIGEgY2hhbmNlIHRvIHBvcHVsYXRlIF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18uXG4vL1xuLy8gQ2FsY3VsYXRpbmcgdGhlIGhhc2ggZHVyaW5nIHN0YXJ0dXAgbWVhbnMgdGhhdCBwYWNrYWdlcyBjYW4gb25seVxuLy8gcG9wdWxhdGUgX19tZXRlb3JfcnVudGltZV9jb25maWdfXyBkdXJpbmcgbG9hZCwgbm90IGR1cmluZyBzdGFydHVwLlxuLy9cbi8vIENhbGN1bGF0aW5nIGluc3RlYWQgaXQgYXQgdGhlIGJlZ2lubmluZyBvZiBtYWluIGFmdGVyIGFsbCBzdGFydHVwXG4vLyBob29rcyBoYWQgcnVuIHdvdWxkIGFsbG93IHBhY2thZ2VzIHRvIGFsc28gcG9wdWxhdGVcbi8vIF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18gZHVyaW5nIHN0YXJ0dXAsIGJ1dCB0aGF0J3MgdG9vIGxhdGUgZm9yXG4vLyBhdXRvdXBkYXRlIGJlY2F1c2UgaXQgbmVlZHMgdG8gaGF2ZSB0aGUgY2xpZW50IGhhc2ggYXQgc3RhcnR1cCB0b1xuLy8gaW5zZXJ0IHRoZSBhdXRvIHVwZGF0ZSB2ZXJzaW9uIGl0c2VsZiBpbnRvXG4vLyBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fIHRvIGdldCBpdCB0byB0aGUgY2xpZW50LlxuLy9cbi8vIEFuIGFsdGVybmF0aXZlIHdvdWxkIGJlIHRvIGdpdmUgYXV0b3VwZGF0ZSBhIFwicG9zdC1zdGFydCxcbi8vIHByZS1saXN0ZW5cIiBob29rIHRvIGFsbG93IGl0IHRvIGluc2VydCB0aGUgYXV0byB1cGRhdGUgdmVyc2lvbiBhdFxuLy8gdGhlIHJpZ2h0IG1vbWVudC5cblxuTWV0ZW9yLnN0YXJ0dXAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBnZXR0ZXIoa2V5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmNoKSB7XG4gICAgICBhcmNoID0gYXJjaCB8fCBXZWJBcHAuZGVmYXVsdEFyY2g7XG4gICAgICBjb25zdCBwcm9ncmFtID0gV2ViQXBwLmNsaWVudFByb2dyYW1zW2FyY2hdO1xuICAgICAgY29uc3QgdmFsdWUgPSBwcm9ncmFtICYmIHByb2dyYW1ba2V5XTtcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWUgd2UgaGF2ZSBjYWxjdWxhdGVkIHRoaXMgaGFzaCxcbiAgICAgIC8vIHByb2dyYW1ba2V5XSB3aWxsIGJlIGEgdGh1bmsgKGxhenkgZnVuY3Rpb24gd2l0aCBubyBwYXJhbWV0ZXJzKVxuICAgICAgLy8gdGhhdCB3ZSBzaG91bGQgY2FsbCB0byBkbyB0aGUgYWN0dWFsIGNvbXB1dGF0aW9uLlxuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgID8gcHJvZ3JhbVtrZXldID0gdmFsdWUoKVxuICAgICAgICA6IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBXZWJBcHAuY2FsY3VsYXRlQ2xpZW50SGFzaCA9IFdlYkFwcC5jbGllbnRIYXNoID0gZ2V0dGVyKFwidmVyc2lvblwiKTtcbiAgV2ViQXBwLmNhbGN1bGF0ZUNsaWVudEhhc2hSZWZyZXNoYWJsZSA9IGdldHRlcihcInZlcnNpb25SZWZyZXNoYWJsZVwiKTtcbiAgV2ViQXBwLmNhbGN1bGF0ZUNsaWVudEhhc2hOb25SZWZyZXNoYWJsZSA9IGdldHRlcihcInZlcnNpb25Ob25SZWZyZXNoYWJsZVwiKTtcbiAgV2ViQXBwLmdldFJlZnJlc2hhYmxlQXNzZXRzID0gZ2V0dGVyKFwicmVmcmVzaGFibGVBc3NldHNcIik7XG59KTtcblxuXG5cbi8vIFdoZW4gd2UgaGF2ZSBhIHJlcXVlc3QgcGVuZGluZywgd2Ugd2FudCB0aGUgc29ja2V0IHRpbWVvdXQgdG8gYmUgbG9uZywgdG9cbi8vIGdpdmUgb3Vyc2VsdmVzIGEgd2hpbGUgdG8gc2VydmUgaXQsIGFuZCB0byBhbGxvdyBzb2NranMgbG9uZyBwb2xscyB0b1xuLy8gY29tcGxldGUuICBPbiB0aGUgb3RoZXIgaGFuZCwgd2Ugd2FudCB0byBjbG9zZSBpZGxlIHNvY2tldHMgcmVsYXRpdmVseVxuLy8gcXVpY2tseSwgc28gdGhhdCB3ZSBjYW4gc2h1dCBkb3duIHJlbGF0aXZlbHkgcHJvbXB0bHkgYnV0IGNsZWFubHksIHdpdGhvdXRcbi8vIGN1dHRpbmcgb2ZmIGFueW9uZSdzIHJlc3BvbnNlLlxuV2ViQXBwLl90aW1lb3V0QWRqdXN0bWVudFJlcXVlc3RDYWxsYmFjayA9IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAvLyB0aGlzIGlzIHJlYWxseSBqdXN0IHJlcS5zb2NrZXQuc2V0VGltZW91dChMT05HX1NPQ0tFVF9USU1FT1VUKTtcbiAgcmVxLnNldFRpbWVvdXQoTE9OR19TT0NLRVRfVElNRU9VVCk7XG4gIC8vIEluc2VydCBvdXIgbmV3IGZpbmlzaCBsaXN0ZW5lciB0byBydW4gQkVGT1JFIHRoZSBleGlzdGluZyBvbmUgd2hpY2ggcmVtb3Zlc1xuICAvLyB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc29ja2V0LlxuICB2YXIgZmluaXNoTGlzdGVuZXJzID0gcmVzLmxpc3RlbmVycygnZmluaXNoJyk7XG4gIC8vIFhYWCBBcHBhcmVudGx5IGluIE5vZGUgMC4xMiB0aGlzIGV2ZW50IHdhcyBjYWxsZWQgJ3ByZWZpbmlzaCcuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9jb21taXQvN2M5YjYwNzBcbiAgLy8gQnV0IGl0IGhhcyBzd2l0Y2hlZCBiYWNrIHRvICdmaW5pc2gnIGluIE5vZGUgdjQ6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9wdWxsLzE0MTFcbiAgcmVzLnJlbW92ZUFsbExpc3RlbmVycygnZmluaXNoJyk7XG4gIHJlcy5vbignZmluaXNoJywgZnVuY3Rpb24gKCkge1xuICAgIHJlcy5zZXRUaW1lb3V0KFNIT1JUX1NPQ0tFVF9USU1FT1VUKTtcbiAgfSk7XG4gIF8uZWFjaChmaW5pc2hMaXN0ZW5lcnMsIGZ1bmN0aW9uIChsKSB7IHJlcy5vbignZmluaXNoJywgbCk7IH0pO1xufTtcblxuXG4vLyBXaWxsIGJlIHVwZGF0ZWQgYnkgbWFpbiBiZWZvcmUgd2UgbGlzdGVuLlxuLy8gTWFwIGZyb20gY2xpZW50IGFyY2ggdG8gYm9pbGVycGxhdGUgb2JqZWN0LlxuLy8gQm9pbGVycGxhdGUgb2JqZWN0IGhhczpcbi8vICAgLSBmdW5jOiBYWFhcbi8vICAgLSBiYXNlRGF0YTogWFhYXG52YXIgYm9pbGVycGxhdGVCeUFyY2ggPSB7fTtcblxuLy8gUmVnaXN0ZXIgYSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGNhbiBzZWxlY3RpdmVseSBtb2RpZnkgYm9pbGVycGxhdGVcbi8vIGRhdGEgZ2l2ZW4gYXJndW1lbnRzIChyZXF1ZXN0LCBkYXRhLCBhcmNoKS4gVGhlIGtleSBzaG91bGQgYmUgYSB1bmlxdWVcbi8vIGlkZW50aWZpZXIsIHRvIHByZXZlbnQgYWNjdW11bGF0aW5nIGR1cGxpY2F0ZSBjYWxsYmFja3MgZnJvbSB0aGUgc2FtZVxuLy8gY2FsbCBzaXRlIG92ZXIgdGltZS4gQ2FsbGJhY2tzIHdpbGwgYmUgY2FsbGVkIGluIHRoZSBvcmRlciB0aGV5IHdlcmVcbi8vIHJlZ2lzdGVyZWQuIEEgY2FsbGJhY2sgc2hvdWxkIHJldHVybiBmYWxzZSBpZiBpdCBkaWQgbm90IG1ha2UgYW55XG4vLyBjaGFuZ2VzIGFmZmVjdGluZyB0aGUgYm9pbGVycGxhdGUuIFBhc3NpbmcgbnVsbCBkZWxldGVzIHRoZSBjYWxsYmFjay5cbi8vIEFueSBwcmV2aW91cyBjYWxsYmFjayByZWdpc3RlcmVkIGZvciB0aGlzIGtleSB3aWxsIGJlIHJldHVybmVkLlxuY29uc3QgYm9pbGVycGxhdGVEYXRhQ2FsbGJhY2tzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbldlYkFwcEludGVybmFscy5yZWdpc3RlckJvaWxlcnBsYXRlRGF0YUNhbGxiYWNrID0gZnVuY3Rpb24gKGtleSwgY2FsbGJhY2spIHtcbiAgY29uc3QgcHJldmlvdXNDYWxsYmFjayA9IGJvaWxlcnBsYXRlRGF0YUNhbGxiYWNrc1trZXldO1xuXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGJvaWxlcnBsYXRlRGF0YUNhbGxiYWNrc1trZXldID0gY2FsbGJhY2s7XG4gIH0gZWxzZSB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNhbGxiYWNrLCBudWxsKTtcbiAgICBkZWxldGUgYm9pbGVycGxhdGVEYXRhQ2FsbGJhY2tzW2tleV07XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHByZXZpb3VzIGNhbGxiYWNrIGluIGNhc2UgdGhlIG5ldyBjYWxsYmFjayBuZWVkcyB0byBjYWxsXG4gIC8vIGl0OyBmb3IgZXhhbXBsZSwgd2hlbiB0aGUgbmV3IGNhbGxiYWNrIGlzIGEgd3JhcHBlciBmb3IgdGhlIG9sZC5cbiAgcmV0dXJuIHByZXZpb3VzQ2FsbGJhY2sgfHwgbnVsbDtcbn07XG5cbi8vIEdpdmVuIGEgcmVxdWVzdCAoYXMgcmV0dXJuZWQgZnJvbSBgY2F0ZWdvcml6ZVJlcXVlc3RgKSwgcmV0dXJuIHRoZVxuLy8gYm9pbGVycGxhdGUgSFRNTCB0byBzZXJ2ZSBmb3IgdGhhdCByZXF1ZXN0LlxuLy9cbi8vIElmIGEgcHJldmlvdXMgY29ubmVjdCBtaWRkbGV3YXJlIGhhcyByZW5kZXJlZCBjb250ZW50IGZvciB0aGUgaGVhZCBvciBib2R5LFxuLy8gcmV0dXJucyB0aGUgYm9pbGVycGxhdGUgd2l0aCB0aGF0IGNvbnRlbnQgcGF0Y2hlZCBpbiBvdGhlcndpc2Vcbi8vIG1lbW9pemVzIG9uIEhUTUwgYXR0cmlidXRlcyAodXNlZCBieSwgZWcsIGFwcGNhY2hlKSBhbmQgd2hldGhlciBpbmxpbmVcbi8vIHNjcmlwdHMgYXJlIGN1cnJlbnRseSBhbGxvd2VkLlxuLy8gWFhYIHNvIGZhciB0aGlzIGZ1bmN0aW9uIGlzIGFsd2F5cyBjYWxsZWQgd2l0aCBhcmNoID09PSAnd2ViLmJyb3dzZXInXG5mdW5jdGlvbiBnZXRCb2lsZXJwbGF0ZShyZXF1ZXN0LCBhcmNoKSB7XG4gIHJldHVybiBnZXRCb2lsZXJwbGF0ZUFzeW5jKHJlcXVlc3QsIGFyY2gpLmF3YWl0KCk7XG59XG5cbmZ1bmN0aW9uIGdldEJvaWxlcnBsYXRlQXN5bmMocmVxdWVzdCwgYXJjaCkge1xuICBjb25zdCBib2lsZXJwbGF0ZSA9IGJvaWxlcnBsYXRlQnlBcmNoW2FyY2hdO1xuICBjb25zdCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgYm9pbGVycGxhdGUuYmFzZURhdGEsIHtcbiAgICBodG1sQXR0cmlidXRlczogZ2V0SHRtbEF0dHJpYnV0ZXMocmVxdWVzdCksXG4gIH0sIF8ucGljayhyZXF1ZXN0LCBcImR5bmFtaWNIZWFkXCIsIFwiZHluYW1pY0JvZHlcIikpO1xuXG4gIGxldCBtYWRlQ2hhbmdlcyA9IGZhbHNlO1xuICBsZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuXG4gIE9iamVjdC5rZXlzKGJvaWxlcnBsYXRlRGF0YUNhbGxiYWNrcykuZm9yRWFjaChrZXkgPT4ge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSBib2lsZXJwbGF0ZURhdGFDYWxsYmFja3Nba2V5XTtcbiAgICAgIHJldHVybiBjYWxsYmFjayhyZXF1ZXN0LCBkYXRhLCBhcmNoKTtcbiAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAvLyBDYWxsYmFja3Mgc2hvdWxkIHJldHVybiBmYWxzZSBpZiB0aGV5IGRpZCBub3QgbWFrZSBhbnkgY2hhbmdlcy5cbiAgICAgIGlmIChyZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgIG1hZGVDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHByb21pc2UudGhlbigoKSA9PiAoe1xuICAgIHN0cmVhbTogYm9pbGVycGxhdGUudG9IVE1MU3RyZWFtKGRhdGEpLFxuICAgIHN0YXR1c0NvZGU6IGRhdGEuc3RhdHVzQ29kZSxcbiAgICBoZWFkZXJzOiBkYXRhLmhlYWRlcnMsXG4gIH0pKTtcbn1cblxuV2ViQXBwSW50ZXJuYWxzLmdlbmVyYXRlQm9pbGVycGxhdGVJbnN0YW5jZSA9IGZ1bmN0aW9uIChhcmNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYW5pZmVzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbE9wdGlvbnMpIHtcbiAgYWRkaXRpb25hbE9wdGlvbnMgPSBhZGRpdGlvbmFsT3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcnVudGltZUNvbmZpZyA9IF8uZXh0ZW5kKFxuICAgIF8uY2xvbmUoX19tZXRlb3JfcnVudGltZV9jb25maWdfXyksXG4gICAgYWRkaXRpb25hbE9wdGlvbnMucnVudGltZUNvbmZpZ092ZXJyaWRlcyB8fCB7fVxuICApO1xuXG4gIHJldHVybiBuZXcgQm9pbGVycGxhdGUoYXJjaCwgbWFuaWZlc3QsIF8uZXh0ZW5kKHtcbiAgICBwYXRoTWFwcGVyKGl0ZW1QYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aEpvaW4oYXJjaFBhdGhbYXJjaF0sIGl0ZW1QYXRoKTtcbiAgICB9LFxuICAgIGJhc2VEYXRhRXh0ZW5zaW9uOiB7XG4gICAgICBhZGRpdGlvbmFsU3RhdGljSnM6IF8ubWFwKFxuICAgICAgICBhZGRpdGlvbmFsU3RhdGljSnMgfHwgW10sXG4gICAgICAgIGZ1bmN0aW9uIChjb250ZW50cywgcGF0aG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgICAgICAgICAgY29udGVudHM6IGNvbnRlbnRzXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIC8vIENvbnZlcnQgdG8gYSBKU09OIHN0cmluZywgdGhlbiBnZXQgcmlkIG9mIG1vc3Qgd2VpcmQgY2hhcmFjdGVycywgdGhlblxuICAgICAgLy8gd3JhcCBpbiBkb3VibGUgcXVvdGVzLiAoVGhlIG91dGVybW9zdCBKU09OLnN0cmluZ2lmeSByZWFsbHkgb3VnaHQgdG9cbiAgICAgIC8vIGp1c3QgYmUgXCJ3cmFwIGluIGRvdWJsZSBxdW90ZXNcIiBidXQgd2UgdXNlIGl0IHRvIGJlIHNhZmUuKSBUaGlzIG1pZ2h0XG4gICAgICAvLyBlbmQgdXAgaW5zaWRlIGEgPHNjcmlwdD4gdGFnIHNvIHdlIG5lZWQgdG8gYmUgY2FyZWZ1bCB0byBub3QgaW5jbHVkZVxuICAgICAgLy8gXCI8L3NjcmlwdD5cIiwgYnV0IG5vcm1hbCB7e3NwYWNlYmFyc319IGVzY2FwaW5nIGVzY2FwZXMgdG9vIG11Y2ghIFNlZVxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21ldGVvci9tZXRlb3IvaXNzdWVzLzM3MzBcbiAgICAgIG1ldGVvclJ1bnRpbWVDb25maWc6IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkocnVudGltZUNvbmZpZykpKSxcbiAgICAgIHJvb3RVcmxQYXRoUHJlZml4OiBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fLlJPT1RfVVJMX1BBVEhfUFJFRklYIHx8ICcnLFxuICAgICAgYnVuZGxlZEpzQ3NzVXJsUmV3cml0ZUhvb2s6IGJ1bmRsZWRKc0Nzc1VybFJld3JpdGVIb29rLFxuICAgICAgc3JpTW9kZTogc3JpTW9kZSxcbiAgICAgIGlubGluZVNjcmlwdHNBbGxvd2VkOiBXZWJBcHBJbnRlcm5hbHMuaW5saW5lU2NyaXB0c0FsbG93ZWQoKSxcbiAgICAgIGlubGluZTogYWRkaXRpb25hbE9wdGlvbnMuaW5saW5lXG4gICAgfVxuICB9LCBhZGRpdGlvbmFsT3B0aW9ucykpO1xufTtcblxuLy8gQSBtYXBwaW5nIGZyb20gdXJsIHBhdGggdG8gYXJjaGl0ZWN0dXJlIChlLmcuIFwid2ViLmJyb3dzZXJcIikgdG8gc3RhdGljXG4vLyBmaWxlIGluZm9ybWF0aW9uIHdpdGggdGhlIGZvbGxvd2luZyBmaWVsZHM6XG4vLyAtIHR5cGU6IHRoZSB0eXBlIG9mIGZpbGUgdG8gYmUgc2VydmVkXG4vLyAtIGNhY2hlYWJsZTogb3B0aW9uYWxseSwgd2hldGhlciB0aGUgZmlsZSBzaG91bGQgYmUgY2FjaGVkIG9yIG5vdFxuLy8gLSBzb3VyY2VNYXBVcmw6IG9wdGlvbmFsbHksIHRoZSB1cmwgb2YgdGhlIHNvdXJjZSBtYXBcbi8vXG4vLyBJbmZvIGFsc28gY29udGFpbnMgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4vLyAtIGNvbnRlbnQ6IHRoZSBzdHJpbmdpZmllZCBjb250ZW50IHRoYXQgc2hvdWxkIGJlIHNlcnZlZCBhdCB0aGlzIHBhdGhcbi8vIC0gYWJzb2x1dGVQYXRoOiB0aGUgYWJzb2x1dGUgcGF0aCBvbiBkaXNrIHRvIHRoZSBmaWxlXG5cbnZhciBzdGF0aWNGaWxlc0J5QXJjaDtcblxuLy8gU2VydmUgc3RhdGljIGZpbGVzIGZyb20gdGhlIG1hbmlmZXN0IG9yIGFkZGVkIHdpdGhcbi8vIGBhZGRTdGF0aWNKc2AuIEV4cG9ydGVkIGZvciB0ZXN0cy5cbldlYkFwcEludGVybmFscy5zdGF0aWNGaWxlc01pZGRsZXdhcmUgPSBhc3luYyBmdW5jdGlvbiAoXG4gIHN0YXRpY0ZpbGVzQnlBcmNoLFxuICByZXEsXG4gIHJlcyxcbiAgbmV4dCxcbikge1xuICBpZiAoJ0dFVCcgIT0gcmVxLm1ldGhvZCAmJiAnSEVBRCcgIT0gcmVxLm1ldGhvZCAmJiAnT1BUSU9OUycgIT0gcmVxLm1ldGhvZCkge1xuICAgIG5leHQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHBhdGhuYW1lID0gcGFyc2VSZXF1ZXN0KHJlcSkucGF0aG5hbWU7XG4gIHRyeSB7XG4gICAgcGF0aG5hbWUgPSBkZWNvZGVVUklDb21wb25lbnQocGF0aG5hbWUpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbmV4dCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBzZXJ2ZVN0YXRpY0pzID0gZnVuY3Rpb24gKHMpIHtcbiAgICByZXMud3JpdGVIZWFkKDIwMCwge1xuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0OyBjaGFyc2V0PVVURi04J1xuICAgIH0pO1xuICAgIHJlcy53cml0ZShzKTtcbiAgICByZXMuZW5kKCk7XG4gIH07XG5cbiAgaWYgKHBhdGhuYW1lID09PSBcIi9tZXRlb3JfcnVudGltZV9jb25maWcuanNcIiAmJlxuICAgICAgISBXZWJBcHBJbnRlcm5hbHMuaW5saW5lU2NyaXB0c0FsbG93ZWQoKSkge1xuICAgIHNlcnZlU3RhdGljSnMoXCJfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fID0gXCIgK1xuICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoX19tZXRlb3JfcnVudGltZV9jb25maWdfXykgKyBcIjtcIik7XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKF8uaGFzKGFkZGl0aW9uYWxTdGF0aWNKcywgcGF0aG5hbWUpICYmXG4gICAgICAgICAgICAgICEgV2ViQXBwSW50ZXJuYWxzLmlubGluZVNjcmlwdHNBbGxvd2VkKCkpIHtcbiAgICBzZXJ2ZVN0YXRpY0pzKGFkZGl0aW9uYWxTdGF0aWNKc1twYXRobmFtZV0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHsgYXJjaCwgcGF0aCB9ID0gZ2V0QXJjaEFuZFBhdGgoXG4gICAgcGF0aG5hbWUsXG4gICAgaWRlbnRpZnlCcm93c2VyKHJlcS5oZWFkZXJzW1widXNlci1hZ2VudFwiXSksXG4gICk7XG5cbiAgLy8gSWYgcGF1c2VDbGllbnQoYXJjaCkgaGFzIGJlZW4gY2FsbGVkLCBwcm9ncmFtLnBhdXNlZCB3aWxsIGJlIGFcbiAgLy8gUHJvbWlzZSB0aGF0IHdpbGwgYmUgcmVzb2x2ZWQgd2hlbiB0aGUgcHJvZ3JhbSBpcyB1bnBhdXNlZC5cbiAgYXdhaXQgV2ViQXBwLmNsaWVudFByb2dyYW1zW2FyY2hdLnBhdXNlZDtcblxuICBjb25zdCBpbmZvID0gZ2V0U3RhdGljRmlsZUluZm8ocGF0aG5hbWUsIHBhdGgsIGFyY2gpO1xuICBpZiAoISBpbmZvKSB7XG4gICAgbmV4dCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFdlIGRvbid0IG5lZWQgdG8gY2FsbCBwYXVzZSBiZWNhdXNlLCB1bmxpa2UgJ3N0YXRpYycsIG9uY2Ugd2UgY2FsbCBpbnRvXG4gIC8vICdzZW5kJyBhbmQgeWllbGQgdG8gdGhlIGV2ZW50IGxvb3AsIHdlIG5ldmVyIGNhbGwgYW5vdGhlciBoYW5kbGVyIHdpdGhcbiAgLy8gJ25leHQnLlxuXG4gIC8vIENhY2hlYWJsZSBmaWxlcyBhcmUgZmlsZXMgdGhhdCBzaG91bGQgbmV2ZXIgY2hhbmdlLiBUeXBpY2FsbHlcbiAgLy8gbmFtZWQgYnkgdGhlaXIgaGFzaCAoZWcgbWV0ZW9yIGJ1bmRsZWQganMgYW5kIGNzcyBmaWxlcykuXG4gIC8vIFdlIGNhY2hlIHRoZW0gfmZvcmV2ZXIgKDF5cikuXG4gIGNvbnN0IG1heEFnZSA9IGluZm8uY2FjaGVhYmxlXG4gICAgPyAxMDAwICogNjAgKiA2MCAqIDI0ICogMzY1XG4gICAgOiAwO1xuXG4gIGlmIChpbmZvLmNhY2hlYWJsZSkge1xuICAgIC8vIFNpbmNlIHdlIHVzZSByZXEuaGVhZGVyc1tcInVzZXItYWdlbnRcIl0gdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlXG4gICAgLy8gY2xpZW50IHNob3VsZCByZWNlaXZlIG1vZGVybiBvciBsZWdhY3kgcmVzb3VyY2VzLCB0ZWxsIHRoZSBjbGllbnRcbiAgICAvLyB0byBpbnZhbGlkYXRlIGNhY2hlZCByZXNvdXJjZXMgd2hlbi9pZiBpdHMgdXNlciBhZ2VudCBzdHJpbmdcbiAgICAvLyBjaGFuZ2VzIGluIHRoZSBmdXR1cmUuXG4gICAgcmVzLnNldEhlYWRlcihcIlZhcnlcIiwgXCJVc2VyLUFnZW50XCIpO1xuICB9XG5cbiAgLy8gU2V0IHRoZSBYLVNvdXJjZU1hcCBoZWFkZXIsIHdoaWNoIGN1cnJlbnQgQ2hyb21lLCBGaXJlRm94LCBhbmQgU2FmYXJpXG4gIC8vIHVuZGVyc3RhbmQuICAoVGhlIFNvdXJjZU1hcCBoZWFkZXIgaXMgc2xpZ2h0bHkgbW9yZSBzcGVjLWNvcnJlY3QgYnV0IEZGXG4gIC8vIGRvZXNuJ3QgdW5kZXJzdGFuZCBpdC4pXG4gIC8vXG4gIC8vIFlvdSBtYXkgYWxzbyBuZWVkIHRvIGVuYWJsZSBzb3VyY2UgbWFwcyBpbiBDaHJvbWU6IG9wZW4gZGV2IHRvb2xzLCBjbGlja1xuICAvLyB0aGUgZ2VhciBpbiB0aGUgYm90dG9tIHJpZ2h0IGNvcm5lciwgYW5kIHNlbGVjdCBcImVuYWJsZSBzb3VyY2UgbWFwc1wiLlxuICBpZiAoaW5mby5zb3VyY2VNYXBVcmwpIHtcbiAgICByZXMuc2V0SGVhZGVyKCdYLVNvdXJjZU1hcCcsXG4gICAgICAgICAgICAgICAgICBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fLlJPT1RfVVJMX1BBVEhfUFJFRklYICtcbiAgICAgICAgICAgICAgICAgIGluZm8uc291cmNlTWFwVXJsKTtcbiAgfVxuXG4gIGlmIChpbmZvLnR5cGUgPT09IFwianNcIiB8fFxuICAgICAgaW5mby50eXBlID09PSBcImR5bmFtaWMganNcIikge1xuICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0OyBjaGFyc2V0PVVURi04XCIpO1xuICB9IGVsc2UgaWYgKGluZm8udHlwZSA9PT0gXCJjc3NcIikge1xuICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L2NzczsgY2hhcnNldD1VVEYtOFwiKTtcbiAgfSBlbHNlIGlmIChpbmZvLnR5cGUgPT09IFwianNvblwiKSB7XG4gICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIik7XG4gIH1cblxuICBpZiAoaW5mby5oYXNoKSB7XG4gICAgcmVzLnNldEhlYWRlcignRVRhZycsICdcIicgKyBpbmZvLmhhc2ggKyAnXCInKTtcbiAgfVxuXG4gIGlmIChpbmZvLmNvbnRlbnQpIHtcbiAgICByZXMud3JpdGUoaW5mby5jb250ZW50KTtcbiAgICByZXMuZW5kKCk7XG4gIH0gZWxzZSB7XG4gICAgc2VuZChyZXEsIGluZm8uYWJzb2x1dGVQYXRoLCB7XG4gICAgICBtYXhhZ2U6IG1heEFnZSxcbiAgICAgIGRvdGZpbGVzOiAnYWxsb3cnLCAvLyBpZiB3ZSBzcGVjaWZpZWQgYSBkb3RmaWxlIGluIHRoZSBtYW5pZmVzdCwgc2VydmUgaXRcbiAgICAgIGxhc3RNb2RpZmllZDogZmFsc2UgLy8gZG9uJ3Qgc2V0IGxhc3QtbW9kaWZpZWQgYmFzZWQgb24gdGhlIGZpbGUgZGF0ZVxuICAgIH0pLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIExvZy5lcnJvcihcIkVycm9yIHNlcnZpbmcgc3RhdGljIGZpbGUgXCIgKyBlcnIpO1xuICAgICAgcmVzLndyaXRlSGVhZCg1MDApO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0pLm9uKCdkaXJlY3RvcnknLCBmdW5jdGlvbiAoKSB7XG4gICAgICBMb2cuZXJyb3IoXCJVbmV4cGVjdGVkIGRpcmVjdG9yeSBcIiArIGluZm8uYWJzb2x1dGVQYXRoKTtcbiAgICAgIHJlcy53cml0ZUhlYWQoNTAwKTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9KS5waXBlKHJlcyk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldFN0YXRpY0ZpbGVJbmZvKG9yaWdpbmFsUGF0aCwgcGF0aCwgYXJjaCkge1xuICBpZiAoISBoYXNPd24uY2FsbChXZWJBcHAuY2xpZW50UHJvZ3JhbXMsIGFyY2gpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBHZXQgYSBsaXN0IG9mIGFsbCBhdmFpbGFibGUgc3RhdGljIGZpbGUgYXJjaGl0ZWN0dXJlcywgd2l0aCBhcmNoXG4gIC8vIGZpcnN0IGluIHRoZSBsaXN0IGlmIGl0IGV4aXN0cy5cbiAgY29uc3Qgc3RhdGljQXJjaExpc3QgPSBPYmplY3Qua2V5cyhzdGF0aWNGaWxlc0J5QXJjaCk7XG4gIGNvbnN0IGFyY2hJbmRleCA9IHN0YXRpY0FyY2hMaXN0LmluZGV4T2YoYXJjaCk7XG4gIGlmIChhcmNoSW5kZXggPiAwKSB7XG4gICAgc3RhdGljQXJjaExpc3QudW5zaGlmdChzdGF0aWNBcmNoTGlzdC5zcGxpY2UoYXJjaEluZGV4LCAxKVswXSk7XG4gIH1cblxuICBsZXQgaW5mbyA9IG51bGw7XG5cbiAgc3RhdGljQXJjaExpc3Quc29tZShhcmNoID0+IHtcbiAgICBjb25zdCBzdGF0aWNGaWxlcyA9IHN0YXRpY0ZpbGVzQnlBcmNoW2FyY2hdO1xuXG4gICAgZnVuY3Rpb24gZmluYWxpemUocGF0aCkge1xuICAgICAgaW5mbyA9IHN0YXRpY0ZpbGVzW3BhdGhdO1xuICAgICAgLy8gU29tZXRpbWVzIHdlIHJlZ2lzdGVyIGEgbGF6eSBmdW5jdGlvbiBpbnN0ZWFkIG9mIGFjdHVhbCBkYXRhIGluXG4gICAgICAvLyB0aGUgc3RhdGljRmlsZXMgbWFuaWZlc3QuXG4gICAgICBpZiAodHlwZW9mIGluZm8gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBpbmZvID0gc3RhdGljRmlsZXNbcGF0aF0gPSBpbmZvKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBJZiBzdGF0aWNGaWxlcyBjb250YWlucyBvcmlnaW5hbFBhdGggd2l0aCB0aGUgYXJjaCBpbmZlcnJlZCBhYm92ZSxcbiAgICAvLyB1c2UgdGhhdCBpbmZvcm1hdGlvbi5cbiAgICBpZiAoaGFzT3duLmNhbGwoc3RhdGljRmlsZXMsIG9yaWdpbmFsUGF0aCkpIHtcbiAgICAgIHJldHVybiBmaW5hbGl6ZShvcmlnaW5hbFBhdGgpO1xuICAgIH1cblxuICAgIC8vIElmIGdldEFyY2hBbmRQYXRoIHJldHVybmVkIGFuIGFsdGVybmF0ZSBwYXRoLCB0cnkgdGhhdCBpbnN0ZWFkLlxuICAgIGlmIChwYXRoICE9PSBvcmlnaW5hbFBhdGggJiZcbiAgICAgICAgaGFzT3duLmNhbGwoc3RhdGljRmlsZXMsIHBhdGgpKSB7XG4gICAgICByZXR1cm4gZmluYWxpemUocGF0aCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5mbztcbn1cblxuZnVuY3Rpb24gZ2V0QXJjaEFuZFBhdGgocGF0aCwgYnJvd3Nlcikge1xuICBjb25zdCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgY29uc3QgYXJjaEtleSA9IHBhdGhQYXJ0c1sxXTtcblxuICBpZiAoYXJjaEtleS5zdGFydHNXaXRoKFwiX19cIikpIHtcbiAgICBjb25zdCBhcmNoQ2xlYW5lZCA9IFwid2ViLlwiICsgYXJjaEtleS5zbGljZSgyKTtcbiAgICBpZiAoaGFzT3duLmNhbGwoV2ViQXBwLmNsaWVudFByb2dyYW1zLCBhcmNoQ2xlYW5lZCkpIHtcbiAgICAgIHBhdGhQYXJ0cy5zcGxpY2UoMSwgMSk7IC8vIFJlbW92ZSB0aGUgYXJjaEtleSBwYXJ0LlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXJjaDogYXJjaENsZWFuZWQsXG4gICAgICAgIHBhdGg6IHBhdGhQYXJ0cy5qb2luKFwiL1wiKSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBQZXJoYXBzIG9uZSBkYXkgd2UgY291bGQgaW5mZXIgQ29yZG92YSBjbGllbnRzIGhlcmUsIHNvIHRoYXQgd2VcbiAgLy8gd291bGRuJ3QgaGF2ZSB0byB1c2UgcHJlZml4ZWQgXCIvX19jb3Jkb3ZhLy4uLlwiIFVSTHMuXG4gIGNvbnN0IGFyY2ggPSBpc01vZGVybihicm93c2VyKVxuICAgID8gXCJ3ZWIuYnJvd3NlclwiXG4gICAgOiBcIndlYi5icm93c2VyLmxlZ2FjeVwiO1xuXG4gIGlmIChoYXNPd24uY2FsbChXZWJBcHAuY2xpZW50UHJvZ3JhbXMsIGFyY2gpKSB7XG4gICAgcmV0dXJuIHsgYXJjaCwgcGF0aCB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhcmNoOiBXZWJBcHAuZGVmYXVsdEFyY2gsXG4gICAgcGF0aCxcbiAgfTtcbn1cblxuLy8gUGFyc2UgdGhlIHBhc3NlZCBpbiBwb3J0IHZhbHVlLiBSZXR1cm4gdGhlIHBvcnQgYXMtaXMgaWYgaXQncyBhIFN0cmluZ1xuLy8gKGUuZy4gYSBXaW5kb3dzIFNlcnZlciBzdHlsZSBuYW1lZCBwaXBlKSwgb3RoZXJ3aXNlIHJldHVybiB0aGUgcG9ydCBhcyBhblxuLy8gaW50ZWdlci5cbi8vXG4vLyBERVBSRUNBVEVEOiBEaXJlY3QgdXNlIG9mIHRoaXMgZnVuY3Rpb24gaXMgbm90IHJlY29tbWVuZGVkOyBpdCBpcyBub1xuLy8gbG9uZ2VyIHVzZWQgaW50ZXJuYWxseSwgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSByZWxlYXNlLlxuV2ViQXBwSW50ZXJuYWxzLnBhcnNlUG9ydCA9IHBvcnQgPT4ge1xuICBsZXQgcGFyc2VkUG9ydCA9IHBhcnNlSW50KHBvcnQpO1xuICBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlZFBvcnQpKSB7XG4gICAgcGFyc2VkUG9ydCA9IHBvcnQ7XG4gIH1cbiAgcmV0dXJuIHBhcnNlZFBvcnQ7XG59XG5cbmltcG9ydCB7IG9uTWVzc2FnZSB9IGZyb20gXCJtZXRlb3IvaW50ZXItcHJvY2Vzcy1tZXNzYWdpbmdcIjtcblxub25NZXNzYWdlKFwid2ViYXBwLXBhdXNlLWNsaWVudFwiLCBhc3luYyAoeyBhcmNoIH0pID0+IHtcbiAgV2ViQXBwSW50ZXJuYWxzLnBhdXNlQ2xpZW50KGFyY2gpO1xufSk7XG5cbm9uTWVzc2FnZShcIndlYmFwcC1yZWxvYWQtY2xpZW50XCIsIGFzeW5jICh7IGFyY2ggfSkgPT4ge1xuICBXZWJBcHBJbnRlcm5hbHMuZ2VuZXJhdGVDbGllbnRQcm9ncmFtKGFyY2gpO1xufSk7XG5cbmZ1bmN0aW9uIHJ1bldlYkFwcFNlcnZlcigpIHtcbiAgdmFyIHNodXR0aW5nRG93biA9IGZhbHNlO1xuICB2YXIgc3luY1F1ZXVlID0gbmV3IE1ldGVvci5fU3luY2hyb25vdXNRdWV1ZSgpO1xuXG4gIHZhciBnZXRJdGVtUGF0aG5hbWUgPSBmdW5jdGlvbiAoaXRlbVVybCkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFyc2VVcmwoaXRlbVVybCkucGF0aG5hbWUpO1xuICB9O1xuXG4gIFdlYkFwcEludGVybmFscy5yZWxvYWRDbGllbnRQcm9ncmFtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBzeW5jUXVldWUucnVuVGFzayhmdW5jdGlvbigpIHtcbiAgICAgIHN0YXRpY0ZpbGVzQnlBcmNoID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgICAgY29uc3QgeyBjb25maWdKc29uIH0gPSBfX21ldGVvcl9ib290c3RyYXBfXztcbiAgICAgIGNvbnN0IGNsaWVudEFyY2hzID0gY29uZmlnSnNvbi5jbGllbnRBcmNocyB8fFxuICAgICAgICBPYmplY3Qua2V5cyhjb25maWdKc29uLmNsaWVudFBhdGhzKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY2xpZW50QXJjaHMuZm9yRWFjaChnZW5lcmF0ZUNsaWVudFByb2dyYW0pO1xuICAgICAgICBXZWJBcHBJbnRlcm5hbHMuc3RhdGljRmlsZXNCeUFyY2ggPSBzdGF0aWNGaWxlc0J5QXJjaDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgTG9nLmVycm9yKFwiRXJyb3IgcmVsb2FkaW5nIHRoZSBjbGllbnQgcHJvZ3JhbTogXCIgKyBlLnN0YWNrKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIC8vIFBhdXNlIGFueSBpbmNvbWluZyByZXF1ZXN0cyBhbmQgbWFrZSB0aGVtIHdhaXQgZm9yIHRoZSBwcm9ncmFtIHRvIGJlXG4gIC8vIHVucGF1c2VkIHRoZSBuZXh0IHRpbWUgZ2VuZXJhdGVDbGllbnRQcm9ncmFtKGFyY2gpIGlzIGNhbGxlZC5cbiAgV2ViQXBwSW50ZXJuYWxzLnBhdXNlQ2xpZW50ID0gZnVuY3Rpb24gKGFyY2gpIHtcbiAgICBzeW5jUXVldWUucnVuVGFzaygoKSA9PiB7XG4gICAgICBjb25zdCBwcm9ncmFtID0gV2ViQXBwLmNsaWVudFByb2dyYW1zW2FyY2hdO1xuICAgICAgY29uc3QgeyB1bnBhdXNlIH0gPSBwcm9ncmFtO1xuICAgICAgcHJvZ3JhbS5wYXVzZWQgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB1bnBhdXNlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBJZiB0aGVyZSBoYXBwZW5zIHRvIGJlIGFuIGV4aXN0aW5nIHByb2dyYW0udW5wYXVzZSBmdW5jdGlvbixcbiAgICAgICAgICAvLyBjb21wb3NlIGl0IHdpdGggdGhlIHJlc29sdmUgZnVuY3Rpb24uXG4gICAgICAgICAgcHJvZ3JhbS51bnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdW5wYXVzZSgpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvZ3JhbS51bnBhdXNlID0gcmVzb2x2ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgV2ViQXBwSW50ZXJuYWxzLmdlbmVyYXRlQ2xpZW50UHJvZ3JhbSA9IGZ1bmN0aW9uIChhcmNoKSB7XG4gICAgc3luY1F1ZXVlLnJ1blRhc2soKCkgPT4gZ2VuZXJhdGVDbGllbnRQcm9ncmFtKGFyY2gpKTtcbiAgfTtcblxuICBmdW5jdGlvbiBnZW5lcmF0ZUNsaWVudFByb2dyYW0oYXJjaCkge1xuICAgIGNvbnN0IGNsaWVudERpciA9IHBhdGhKb2luKFxuICAgICAgcGF0aERpcm5hbWUoX19tZXRlb3JfYm9vdHN0cmFwX18uc2VydmVyRGlyKSxcbiAgICAgIGFyY2gsXG4gICAgKTtcblxuICAgIC8vIHJlYWQgdGhlIGNvbnRyb2wgZm9yIHRoZSBjbGllbnQgd2UnbGwgYmUgc2VydmluZyB1cFxuICAgIGNvbnN0IHByb2dyYW1Kc29uUGF0aCA9IHBhdGhKb2luKGNsaWVudERpciwgXCJwcm9ncmFtLmpzb25cIik7XG5cbiAgICBsZXQgcHJvZ3JhbUpzb247XG4gICAgdHJ5IHtcbiAgICAgIHByb2dyYW1Kc29uID0gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMocHJvZ3JhbUpzb25QYXRoKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUuY29kZSA9PT0gXCJFTk9FTlRcIikgcmV0dXJuO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICBpZiAocHJvZ3JhbUpzb24uZm9ybWF0ICE9PSBcIndlYi1wcm9ncmFtLXByZTFcIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgZm9ybWF0IGZvciBjbGllbnQgYXNzZXRzOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkocHJvZ3JhbUpzb24uZm9ybWF0KSk7XG4gICAgfVxuXG4gICAgaWYgKCEgcHJvZ3JhbUpzb25QYXRoIHx8ICEgY2xpZW50RGlyIHx8ICEgcHJvZ3JhbUpzb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNsaWVudCBjb25maWcgZmlsZSBub3QgcGFyc2VkLlwiKTtcbiAgICB9XG5cbiAgICBhcmNoUGF0aFthcmNoXSA9IGNsaWVudERpcjtcbiAgICBjb25zdCBzdGF0aWNGaWxlcyA9IHN0YXRpY0ZpbGVzQnlBcmNoW2FyY2hdID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIGNvbnN0IHsgbWFuaWZlc3QgfSA9IHByb2dyYW1Kc29uO1xuICAgIG1hbmlmZXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS51cmwgJiYgaXRlbS53aGVyZSA9PT0gXCJjbGllbnRcIikge1xuICAgICAgICBzdGF0aWNGaWxlc1tnZXRJdGVtUGF0aG5hbWUoaXRlbS51cmwpXSA9IHtcbiAgICAgICAgICBhYnNvbHV0ZVBhdGg6IHBhdGhKb2luKGNsaWVudERpciwgaXRlbS5wYXRoKSxcbiAgICAgICAgICBjYWNoZWFibGU6IGl0ZW0uY2FjaGVhYmxlLFxuICAgICAgICAgIGhhc2g6IGl0ZW0uaGFzaCxcbiAgICAgICAgICAvLyBMaW5rIGZyb20gc291cmNlIHRvIGl0cyBtYXBcbiAgICAgICAgICBzb3VyY2VNYXBVcmw6IGl0ZW0uc291cmNlTWFwVXJsLFxuICAgICAgICAgIHR5cGU6IGl0ZW0udHlwZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChpdGVtLnNvdXJjZU1hcCkge1xuICAgICAgICAgIC8vIFNlcnZlIHRoZSBzb3VyY2UgbWFwIHRvbywgdW5kZXIgdGhlIHNwZWNpZmllZCBVUkwuIFdlIGFzc3VtZVxuICAgICAgICAgIC8vIGFsbCBzb3VyY2UgbWFwcyBhcmUgY2FjaGVhYmxlLlxuICAgICAgICAgIHN0YXRpY0ZpbGVzW2dldEl0ZW1QYXRobmFtZShpdGVtLnNvdXJjZU1hcFVybCldID0ge1xuICAgICAgICAgICAgYWJzb2x1dGVQYXRoOiBwYXRoSm9pbihjbGllbnREaXIsIGl0ZW0uc291cmNlTWFwKSxcbiAgICAgICAgICAgIGNhY2hlYWJsZTogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHsgUFVCTElDX1NFVFRJTkdTIH0gPSBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fO1xuICAgIGNvbnN0IGNvbmZpZ092ZXJyaWRlcyA9IHtcbiAgICAgIFBVQkxJQ19TRVRUSU5HUyxcbiAgICAgIC8vIFNpbmNlIHRoZSBtaW5pbXVtIG1vZGVybiB2ZXJzaW9ucyBkZWZpbmVkIGluIHRoZSBtb2Rlcm4tdmVyc2lvbnNcbiAgICAgIC8vIHBhY2thZ2UgYWZmZWN0IHdoaWNoIGJ1bmRsZSBhIGdpdmVuIGNsaWVudCByZWNlaXZlcywgYW55IGNoYW5nZXNcbiAgICAgIC8vIGluIHRob3NlIHZlcnNpb25zIHNob3VsZCB0cmlnZ2VyIGEgY29ycmVzcG9uZGluZyBjaGFuZ2UgaW4gdGhlXG4gICAgICAvLyB2ZXJzaW9ucyBjYWxjdWxhdGVkIGJlbG93LlxuICAgICAgbWluaW11bU1vZGVyblZlcnNpb25zSGFzaDogY2FsY3VsYXRlSGFzaE9mTWluaW11bVZlcnNpb25zKCksXG4gICAgfTtcblxuICAgIGNvbnN0IG9sZFByb2dyYW0gPSBXZWJBcHAuY2xpZW50UHJvZ3JhbXNbYXJjaF07XG4gICAgY29uc3QgbmV3UHJvZ3JhbSA9IFdlYkFwcC5jbGllbnRQcm9ncmFtc1thcmNoXSA9IHtcbiAgICAgIGZvcm1hdDogXCJ3ZWItcHJvZ3JhbS1wcmUxXCIsXG4gICAgICBtYW5pZmVzdDogbWFuaWZlc3QsXG4gICAgICAvLyBVc2UgYXJyb3cgZnVuY3Rpb25zIHNvIHRoYXQgdGhlc2UgdmVyc2lvbnMgY2FuIGJlIGxhemlseVxuICAgICAgLy8gY2FsY3VsYXRlZCBsYXRlciwgYW5kIHNvIHRoYXQgdGhleSB3aWxsIG5vdCBiZSBpbmNsdWRlZCBpbiB0aGVcbiAgICAgIC8vIHN0YXRpY0ZpbGVzW21hbmlmZXN0VXJsXS5jb250ZW50IHN0cmluZyBiZWxvdy5cbiAgICAgIHZlcnNpb246ICgpID0+IFdlYkFwcEhhc2hpbmcuY2FsY3VsYXRlQ2xpZW50SGFzaChcbiAgICAgICAgbWFuaWZlc3QsIG51bGwsIGNvbmZpZ092ZXJyaWRlcyksXG4gICAgICB2ZXJzaW9uUmVmcmVzaGFibGU6ICgpID0+IFdlYkFwcEhhc2hpbmcuY2FsY3VsYXRlQ2xpZW50SGFzaChcbiAgICAgICAgbWFuaWZlc3QsIHR5cGUgPT4gdHlwZSA9PT0gXCJjc3NcIiwgY29uZmlnT3ZlcnJpZGVzKSxcbiAgICAgIHZlcnNpb25Ob25SZWZyZXNoYWJsZTogKCkgPT4gV2ViQXBwSGFzaGluZy5jYWxjdWxhdGVDbGllbnRIYXNoKFxuICAgICAgICBtYW5pZmVzdCwgdHlwZSA9PiB0eXBlICE9PSBcImNzc1wiLCBjb25maWdPdmVycmlkZXMpLFxuICAgICAgY29yZG92YUNvbXBhdGliaWxpdHlWZXJzaW9uczogcHJvZ3JhbUpzb24uY29yZG92YUNvbXBhdGliaWxpdHlWZXJzaW9ucyxcbiAgICAgIFBVQkxJQ19TRVRUSU5HUyxcbiAgICB9O1xuXG4gICAgLy8gRXhwb3NlIHByb2dyYW0gZGV0YWlscyBhcyBhIHN0cmluZyByZWFjaGFibGUgdmlhIHRoZSBmb2xsb3dpbmcgVVJMLlxuICAgIGNvbnN0IG1hbmlmZXN0VXJsUHJlZml4ID0gXCIvX19cIiArIGFyY2gucmVwbGFjZSgvXndlYlxcLi8sIFwiXCIpO1xuICAgIGNvbnN0IG1hbmlmZXN0VXJsID0gbWFuaWZlc3RVcmxQcmVmaXggKyBnZXRJdGVtUGF0aG5hbWUoXCIvbWFuaWZlc3QuanNvblwiKTtcblxuICAgIHN0YXRpY0ZpbGVzW21hbmlmZXN0VXJsXSA9ICgpID0+IHtcbiAgICAgIGlmIChQYWNrYWdlLmF1dG91cGRhdGUpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIEFVVE9VUERBVEVfVkVSU0lPTiA9XG4gICAgICAgICAgICBQYWNrYWdlLmF1dG91cGRhdGUuQXV0b3VwZGF0ZS5hdXRvdXBkYXRlVmVyc2lvblxuICAgICAgICB9ID0gcHJvY2Vzcy5lbnY7XG5cbiAgICAgICAgaWYgKEFVVE9VUERBVEVfVkVSU0lPTikge1xuICAgICAgICAgIG5ld1Byb2dyYW0udmVyc2lvbiA9IEFVVE9VUERBVEVfVkVSU0lPTjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG5ld1Byb2dyYW0udmVyc2lvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIG5ld1Byb2dyYW0udmVyc2lvbiA9IG5ld1Byb2dyYW0udmVyc2lvbigpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb250ZW50OiBKU09OLnN0cmluZ2lmeShuZXdQcm9ncmFtKSxcbiAgICAgICAgY2FjaGVhYmxlOiBmYWxzZSxcbiAgICAgICAgaGFzaDogbmV3UHJvZ3JhbS52ZXJzaW9uLFxuICAgICAgICB0eXBlOiBcImpzb25cIlxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZ2VuZXJhdGVCb2lsZXJwbGF0ZUZvckFyY2goYXJjaCk7XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgYW55IHJlcXVlc3RzIHdhaXRpbmcgb24gb2xkUHJvZ3JhbS5wYXVzZWQsIGxldCB0aGVtXG4gICAgLy8gY29udGludWUgbm93ICh1c2luZyB0aGUgbmV3IHByb2dyYW0pLlxuICAgIGlmIChvbGRQcm9ncmFtICYmXG4gICAgICAgIG9sZFByb2dyYW0ucGF1c2VkKSB7XG4gICAgICBvbGRQcm9ncmFtLnVucGF1c2UoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGVmYXVsdE9wdGlvbnNGb3JBcmNoID0ge1xuICAgICd3ZWIuY29yZG92YSc6IHtcbiAgICAgIHJ1bnRpbWVDb25maWdPdmVycmlkZXM6IHtcbiAgICAgICAgLy8gWFhYIFdlIHVzZSBhYnNvbHV0ZVVybCgpIGhlcmUgc28gdGhhdCB3ZSBzZXJ2ZSBodHRwczovL1xuICAgICAgICAvLyBVUkxzIHRvIGNvcmRvdmEgY2xpZW50cyBpZiBmb3JjZS1zc2wgaXMgaW4gdXNlLiBJZiB3ZSB3ZXJlXG4gICAgICAgIC8vIHRvIHVzZSBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fLlJPT1RfVVJMIGluc3RlYWQgb2ZcbiAgICAgICAgLy8gYWJzb2x1dGVVcmwoKSwgdGhlbiBDb3Jkb3ZhIGNsaWVudHMgd291bGQgaW1tZWRpYXRlbHkgZ2V0IGFcbiAgICAgICAgLy8gSENQIHNldHRpbmcgdGhlaXIgRERQX0RFRkFVTFRfQ09OTkVDVElPTl9VUkwgdG9cbiAgICAgICAgLy8gaHR0cDovL2V4YW1wbGUubWV0ZW9yLmNvbS4gVGhpcyBicmVha3MgdGhlIGFwcCwgYmVjYXVzZVxuICAgICAgICAvLyBmb3JjZS1zc2wgZG9lc24ndCBzZXJ2ZSBDT1JTIGhlYWRlcnMgb24gMzAyXG4gICAgICAgIC8vIHJlZGlyZWN0cy4gKFBsdXMgaXQncyB1bmRlc2lyYWJsZSB0byBoYXZlIGNsaWVudHNcbiAgICAgICAgLy8gY29ubmVjdGluZyB0byBodHRwOi8vZXhhbXBsZS5tZXRlb3IuY29tIHdoZW4gZm9yY2Utc3NsIGlzXG4gICAgICAgIC8vIGluIHVzZS4pXG4gICAgICAgIEREUF9ERUZBVUxUX0NPTk5FQ1RJT05fVVJMOiBwcm9jZXNzLmVudi5NT0JJTEVfRERQX1VSTCB8fFxuICAgICAgICAgIE1ldGVvci5hYnNvbHV0ZVVybCgpLFxuICAgICAgICBST09UX1VSTDogcHJvY2Vzcy5lbnYuTU9CSUxFX1JPT1RfVVJMIHx8XG4gICAgICAgICAgTWV0ZW9yLmFic29sdXRlVXJsKClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJ3ZWIuYnJvd3NlclwiOiB7XG4gICAgICBydW50aW1lQ29uZmlnT3ZlcnJpZGVzOiB7XG4gICAgICAgIGlzTW9kZXJuOiB0cnVlLFxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIndlYi5icm93c2VyLmxlZ2FjeVwiOiB7XG4gICAgICBydW50aW1lQ29uZmlnT3ZlcnJpZGVzOiB7XG4gICAgICAgIGlzTW9kZXJuOiBmYWxzZSxcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIFdlYkFwcEludGVybmFscy5nZW5lcmF0ZUJvaWxlcnBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFRoaXMgYm9pbGVycGxhdGUgd2lsbCBiZSBzZXJ2ZWQgdG8gdGhlIG1vYmlsZSBkZXZpY2VzIHdoZW4gdXNlZCB3aXRoXG4gICAgLy8gTWV0ZW9yL0NvcmRvdmEgZm9yIHRoZSBIb3QtQ29kZSBQdXNoIGFuZCBzaW5jZSB0aGUgZmlsZSB3aWxsIGJlIHNlcnZlZCBieVxuICAgIC8vIHRoZSBkZXZpY2UncyBzZXJ2ZXIsIGl0IGlzIGltcG9ydGFudCB0byBzZXQgdGhlIEREUCB1cmwgdG8gdGhlIGFjdHVhbFxuICAgIC8vIE1ldGVvciBzZXJ2ZXIgYWNjZXB0aW5nIEREUCBjb25uZWN0aW9ucyBhbmQgbm90IHRoZSBkZXZpY2UncyBmaWxlIHNlcnZlci5cbiAgICBzeW5jUXVldWUucnVuVGFzayhmdW5jdGlvbigpIHtcbiAgICAgIE9iamVjdC5rZXlzKFdlYkFwcC5jbGllbnRQcm9ncmFtcylcbiAgICAgICAgLmZvckVhY2goZ2VuZXJhdGVCb2lsZXJwbGF0ZUZvckFyY2gpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlQm9pbGVycGxhdGVGb3JBcmNoKGFyY2gpIHtcbiAgICBjb25zdCBwcm9ncmFtID0gV2ViQXBwLmNsaWVudFByb2dyYW1zW2FyY2hdO1xuICAgIGNvbnN0IHsgYmFzZURhdGEgfSA9IGJvaWxlcnBsYXRlQnlBcmNoW2FyY2hdID1cbiAgICAgIFdlYkFwcEludGVybmFscy5nZW5lcmF0ZUJvaWxlcnBsYXRlSW5zdGFuY2UoXG4gICAgICAgIGFyY2gsXG4gICAgICAgIHByb2dyYW0ubWFuaWZlc3QsXG4gICAgICAgIGRlZmF1bHRPcHRpb25zRm9yQXJjaFthcmNoXSxcbiAgICAgICk7XG5cbiAgICBwcm9ncmFtLnJlZnJlc2hhYmxlQXNzZXRzID0gYmFzZURhdGEuY3NzLm1hcChmaWxlID0+ICh7XG4gICAgICB1cmw6IGJ1bmRsZWRKc0Nzc1VybFJld3JpdGVIb29rKGZpbGUudXJsKSxcbiAgICB9KSk7XG4gIH1cblxuICBXZWJBcHBJbnRlcm5hbHMucmVsb2FkQ2xpZW50UHJvZ3JhbXMoKTtcblxuICAvLyB3ZWJzZXJ2ZXJcbiAgdmFyIGFwcCA9IGNvbm5lY3QoKTtcblxuICAvLyBQYWNrYWdlcyBhbmQgYXBwcyBjYW4gYWRkIGhhbmRsZXJzIHRoYXQgcnVuIGJlZm9yZSBhbnkgb3RoZXIgTWV0ZW9yXG4gIC8vIGhhbmRsZXJzIHZpYSBXZWJBcHAucmF3Q29ubmVjdEhhbmRsZXJzLlxuICB2YXIgcmF3Q29ubmVjdEhhbmRsZXJzID0gY29ubmVjdCgpO1xuICBhcHAudXNlKHJhd0Nvbm5lY3RIYW5kbGVycyk7XG5cbiAgLy8gQXV0by1jb21wcmVzcyBhbnkganNvbiwgamF2YXNjcmlwdCwgb3IgdGV4dC5cbiAgYXBwLnVzZShjb21wcmVzcygpKTtcblxuICAvLyBwYXJzZSBjb29raWVzIGludG8gYW4gb2JqZWN0XG4gIGFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuXG4gIC8vIFdlJ3JlIG5vdCBhIHByb3h5OyByZWplY3QgKHdpdGhvdXQgY3Jhc2hpbmcpIGF0dGVtcHRzIHRvIHRyZWF0IHVzIGxpa2VcbiAgLy8gb25lLiAoU2VlICMxMjEyLilcbiAgYXBwLnVzZShmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuICAgIGlmIChSb3V0ZVBvbGljeS5pc1ZhbGlkVXJsKHJlcS51cmwpKSB7XG4gICAgICBuZXh0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlcy53cml0ZUhlYWQoNDAwKTtcbiAgICByZXMud3JpdGUoXCJOb3QgYSBwcm94eVwiKTtcbiAgICByZXMuZW5kKCk7XG4gIH0pO1xuXG4gIC8vIFBhcnNlIHRoZSBxdWVyeSBzdHJpbmcgaW50byByZXMucXVlcnkuIFVzZWQgYnkgb2F1dGhfc2VydmVyLCBidXQgaXQnc1xuICAvLyBnZW5lcmFsbHkgcHJldHR5IGhhbmR5Li5cbiAgLy9cbiAgLy8gRG8gdGhpcyBiZWZvcmUgdGhlIG5leHQgbWlkZGxld2FyZSBkZXN0cm95cyByZXEudXJsIGlmIGEgcGF0aCBwcmVmaXhcbiAgLy8gaXMgc2V0IHRvIGNsb3NlICMxMDExMS5cbiAgYXBwLnVzZShxdWVyeSgpKTtcbiAgXG4gIGZ1bmN0aW9uIGdldFBhdGhQYXJ0cyhwYXRoKSB7XG4gICAgY29uc3QgcGFydHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgICB3aGlsZSAocGFydHNbMF0gPT09IFwiXCIpIHBhcnRzLnNoaWZ0KCk7XG4gICAgcmV0dXJuIHBhcnRzO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNQcmVmaXhPZihwcmVmaXgsIGFycmF5KSB7XG4gICAgcmV0dXJuIHByZWZpeC5sZW5ndGggPD0gYXJyYXkubGVuZ3RoICYmXG4gICAgICBwcmVmaXguZXZlcnkoKHBhcnQsIGkpID0+IHBhcnQgPT09IGFycmF5W2ldKTtcbiAgfVxuXG4gIC8vIFN0cmlwIG9mZiB0aGUgcGF0aCBwcmVmaXgsIGlmIGl0IGV4aXN0cy5cbiAgYXBwLnVzZShmdW5jdGlvbiAocmVxdWVzdCwgcmVzcG9uc2UsIG5leHQpIHtcbiAgICBjb25zdCBwYXRoUHJlZml4ID0gX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5ST09UX1VSTF9QQVRIX1BSRUZJWDtcbiAgICBjb25zdCB7IHBhdGhuYW1lIH0gPSBwYXJzZVVybChyZXF1ZXN0LnVybCk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGUgcGF0aCBpbiB0aGUgdXJsIHN0YXJ0cyB3aXRoIHRoZSBwYXRoIHByZWZpeFxuICAgIGlmIChwYXRoUHJlZml4KSB7XG4gICAgICBjb25zdCBwcmVmaXhQYXJ0cyA9IGdldFBhdGhQYXJ0cyhwYXRoUHJlZml4KTtcbiAgICAgIGNvbnN0IHBhdGhQYXJ0cyA9IGdldFBhdGhQYXJ0cyhwYXRobmFtZSk7XG4gICAgICBpZiAoaXNQcmVmaXhPZihwcmVmaXhQYXJ0cywgcGF0aFBhcnRzKSkge1xuICAgICAgICByZXF1ZXN0LnVybCA9IFwiL1wiICsgcGF0aFBhcnRzLnNsaWNlKHByZWZpeFBhcnRzLmxlbmd0aCkuam9pbihcIi9cIik7XG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBhdGhuYW1lID09PSBcIi9mYXZpY29uLmljb1wiIHx8XG4gICAgICAgIHBhdGhuYW1lID09PSBcIi9yb2JvdHMudHh0XCIpIHtcbiAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfVxuXG4gICAgaWYgKHBhdGhQcmVmaXgpIHtcbiAgICAgIHJlc3BvbnNlLndyaXRlSGVhZCg0MDQpO1xuICAgICAgcmVzcG9uc2Uud3JpdGUoXCJVbmtub3duIHBhdGhcIik7XG4gICAgICByZXNwb25zZS5lbmQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBuZXh0KCk7XG4gIH0pO1xuXG4gIC8vIFNlcnZlIHN0YXRpYyBmaWxlcyBmcm9tIHRoZSBtYW5pZmVzdC5cbiAgLy8gVGhpcyBpcyBpbnNwaXJlZCBieSB0aGUgJ3N0YXRpYycgbWlkZGxld2FyZS5cbiAgYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgICBXZWJBcHBJbnRlcm5hbHMuc3RhdGljRmlsZXNNaWRkbGV3YXJlKHN0YXRpY0ZpbGVzQnlBcmNoLCByZXEsIHJlcywgbmV4dCk7XG4gIH0pO1xuXG4gIC8vIENvcmUgTWV0ZW9yIHBhY2thZ2VzIGxpa2UgZHluYW1pYy1pbXBvcnQgY2FuIGFkZCBoYW5kbGVycyBiZWZvcmVcbiAgLy8gb3RoZXIgaGFuZGxlcnMgYWRkZWQgYnkgcGFja2FnZSBhbmQgYXBwbGljYXRpb24gY29kZS5cbiAgYXBwLnVzZShXZWJBcHBJbnRlcm5hbHMubWV0ZW9ySW50ZXJuYWxIYW5kbGVycyA9IGNvbm5lY3QoKSk7XG5cbiAgLy8gUGFja2FnZXMgYW5kIGFwcHMgY2FuIGFkZCBoYW5kbGVycyB0byB0aGlzIHZpYSBXZWJBcHAuY29ubmVjdEhhbmRsZXJzLlxuICAvLyBUaGV5IGFyZSBpbnNlcnRlZCBiZWZvcmUgb3VyIGRlZmF1bHQgaGFuZGxlci5cbiAgdmFyIHBhY2thZ2VBbmRBcHBIYW5kbGVycyA9IGNvbm5lY3QoKTtcbiAgYXBwLnVzZShwYWNrYWdlQW5kQXBwSGFuZGxlcnMpO1xuXG4gIHZhciBzdXBwcmVzc0Nvbm5lY3RFcnJvcnMgPSBmYWxzZTtcbiAgLy8gY29ubmVjdCBrbm93cyBpdCBpcyBhbiBlcnJvciBoYW5kbGVyIGJlY2F1c2UgaXQgaGFzIDQgYXJndW1lbnRzIGluc3RlYWQgb2ZcbiAgLy8gMy4gZ28gZmlndXJlLiAgKEl0IGlzIG5vdCBzbWFydCBlbm91Z2ggdG8gZmluZCBzdWNoIGEgdGhpbmcgaWYgaXQncyBoaWRkZW5cbiAgLy8gaW5zaWRlIHBhY2thZ2VBbmRBcHBIYW5kbGVycy4pXG4gIGFwcC51c2UoZnVuY3Rpb24gKGVyciwgcmVxLCByZXMsIG5leHQpIHtcbiAgICBpZiAoIWVyciB8fCAhc3VwcHJlc3NDb25uZWN0RXJyb3JzIHx8ICFyZXEuaGVhZGVyc1sneC1zdXBwcmVzcy1lcnJvciddKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlcy53cml0ZUhlYWQoZXJyLnN0YXR1cywgeyAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nIH0pO1xuICAgIHJlcy5lbmQoXCJBbiBlcnJvciBtZXNzYWdlXCIpO1xuICB9KTtcblxuICBhcHAudXNlKGFzeW5jIGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xuICAgIGlmICghIGFwcFVybChyZXEudXJsKSkge1xuICAgICAgcmV0dXJuIG5leHQoKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaGVhZGVycyA9IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWw7IGNoYXJzZXQ9dXRmLTgnXG4gICAgICB9O1xuXG4gICAgICBpZiAoc2h1dHRpbmdEb3duKSB7XG4gICAgICAgIGhlYWRlcnNbJ0Nvbm5lY3Rpb24nXSA9ICdDbG9zZSc7XG4gICAgICB9XG5cbiAgICAgIHZhciByZXF1ZXN0ID0gV2ViQXBwLmNhdGVnb3JpemVSZXF1ZXN0KHJlcSk7XG5cbiAgICAgIGlmIChyZXF1ZXN0LnVybC5xdWVyeSAmJiByZXF1ZXN0LnVybC5xdWVyeVsnbWV0ZW9yX2Nzc19yZXNvdXJjZSddKSB7XG4gICAgICAgIC8vIEluIHRoaXMgY2FzZSwgd2UncmUgcmVxdWVzdGluZyBhIENTUyByZXNvdXJjZSBpbiB0aGUgbWV0ZW9yLXNwZWNpZmljXG4gICAgICAgIC8vIHdheSwgYnV0IHdlIGRvbid0IGhhdmUgaXQuICBTZXJ2ZSBhIHN0YXRpYyBjc3MgZmlsZSB0aGF0IGluZGljYXRlcyB0aGF0XG4gICAgICAgIC8vIHdlIGRpZG4ndCBoYXZlIGl0LCBzbyB3ZSBjYW4gZGV0ZWN0IHRoYXQgYW5kIHJlZnJlc2guICBNYWtlIHN1cmVcbiAgICAgICAgLy8gdGhhdCBhbnkgcHJveGllcyBvciBDRE5zIGRvbid0IGNhY2hlIHRoaXMgZXJyb3IhICAoTm9ybWFsbHkgcHJveGllc1xuICAgICAgICAvLyBvciBDRE5zIGFyZSBzbWFydCBlbm91Z2ggbm90IHRvIGNhY2hlIGVycm9yIHBhZ2VzLCBidXQgaW4gb3JkZXIgdG9cbiAgICAgICAgLy8gbWFrZSB0aGlzIGhhY2sgd29yaywgd2UgbmVlZCB0byByZXR1cm4gdGhlIENTUyBmaWxlIGFzIGEgMjAwLCB3aGljaFxuICAgICAgICAvLyB3b3VsZCBvdGhlcndpc2UgYmUgY2FjaGVkLilcbiAgICAgICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAndGV4dC9jc3M7IGNoYXJzZXQ9dXRmLTgnO1xuICAgICAgICBoZWFkZXJzWydDYWNoZS1Db250cm9sJ10gPSAnbm8tY2FjaGUnO1xuICAgICAgICByZXMud3JpdGVIZWFkKDIwMCwgaGVhZGVycyk7XG4gICAgICAgIHJlcy53cml0ZShcIi5tZXRlb3ItY3NzLW5vdC1mb3VuZC1lcnJvciB7IHdpZHRoOiAwcHg7fVwiKTtcbiAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXF1ZXN0LnVybC5xdWVyeSAmJiByZXF1ZXN0LnVybC5xdWVyeVsnbWV0ZW9yX2pzX3Jlc291cmNlJ10pIHtcbiAgICAgICAgLy8gU2ltaWxhcmx5LCB3ZSdyZSByZXF1ZXN0aW5nIGEgSlMgcmVzb3VyY2UgdGhhdCB3ZSBkb24ndCBoYXZlLlxuICAgICAgICAvLyBTZXJ2ZSBhbiB1bmNhY2hlZCA0MDQuIChXZSBjYW4ndCB1c2UgdGhlIHNhbWUgaGFjayB3ZSB1c2UgZm9yIENTUyxcbiAgICAgICAgLy8gYmVjYXVzZSBhY3R1YWxseSBhY3Rpbmcgb24gdGhhdCBoYWNrIHJlcXVpcmVzIHVzIHRvIGhhdmUgdGhlIEpTXG4gICAgICAgIC8vIGFscmVhZHkhKVxuICAgICAgICBoZWFkZXJzWydDYWNoZS1Db250cm9sJ10gPSAnbm8tY2FjaGUnO1xuICAgICAgICByZXMud3JpdGVIZWFkKDQwNCwgaGVhZGVycyk7XG4gICAgICAgIHJlcy5lbmQoXCI0MDQgTm90IEZvdW5kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXF1ZXN0LnVybC5xdWVyeSAmJiByZXF1ZXN0LnVybC5xdWVyeVsnbWV0ZW9yX2RvbnRfc2VydmVfaW5kZXgnXSkge1xuICAgICAgICAvLyBXaGVuIGRvd25sb2FkaW5nIGZpbGVzIGR1cmluZyBhIENvcmRvdmEgaG90IGNvZGUgcHVzaCwgd2UgbmVlZFxuICAgICAgICAvLyB0byBkZXRlY3QgaWYgYSBmaWxlIGlzIG5vdCBhdmFpbGFibGUgaW5zdGVhZCBvZiBpbmFkdmVydGVudGx5XG4gICAgICAgIC8vIGRvd25sb2FkaW5nIHRoZSBkZWZhdWx0IGluZGV4IHBhZ2UuXG4gICAgICAgIC8vIFNvIHNpbWlsYXIgdG8gdGhlIHNpdHVhdGlvbiBhYm92ZSwgd2Ugc2VydmUgYW4gdW5jYWNoZWQgNDA0LlxuICAgICAgICBoZWFkZXJzWydDYWNoZS1Db250cm9sJ10gPSAnbm8tY2FjaGUnO1xuICAgICAgICByZXMud3JpdGVIZWFkKDQwNCwgaGVhZGVycyk7XG4gICAgICAgIHJlcy5lbmQoXCI0MDQgTm90IEZvdW5kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgYXJjaCB9ID0gZ2V0QXJjaEFuZFBhdGgoXG4gICAgICAgIHBhcnNlUmVxdWVzdChyZXEpLnBhdGhuYW1lLFxuICAgICAgICByZXF1ZXN0LmJyb3dzZXIsXG4gICAgICApO1xuXG4gICAgICAvLyBJZiBwYXVzZUNsaWVudChhcmNoKSBoYXMgYmVlbiBjYWxsZWQsIHByb2dyYW0ucGF1c2VkIHdpbGwgYmUgYVxuICAgICAgLy8gUHJvbWlzZSB0aGF0IHdpbGwgYmUgcmVzb2x2ZWQgd2hlbiB0aGUgcHJvZ3JhbSBpcyB1bnBhdXNlZC5cbiAgICAgIGF3YWl0IFdlYkFwcC5jbGllbnRQcm9ncmFtc1thcmNoXS5wYXVzZWQ7XG5cbiAgICAgIHJldHVybiBnZXRCb2lsZXJwbGF0ZUFzeW5jKHJlcXVlc3QsIGFyY2gpLnRoZW4oKHtcbiAgICAgICAgc3RyZWFtLFxuICAgICAgICBzdGF0dXNDb2RlLFxuICAgICAgICBoZWFkZXJzOiBuZXdIZWFkZXJzLFxuICAgICAgfSkgPT4ge1xuICAgICAgICBpZiAoIXN0YXR1c0NvZGUpIHtcbiAgICAgICAgICBzdGF0dXNDb2RlID0gcmVzLnN0YXR1c0NvZGUgPyByZXMuc3RhdHVzQ29kZSA6IDIwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdIZWFkZXJzKSB7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihoZWFkZXJzLCBuZXdIZWFkZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcy53cml0ZUhlYWQoc3RhdHVzQ29kZSwgaGVhZGVycyk7XG5cbiAgICAgICAgc3RyZWFtLnBpcGUocmVzLCB7XG4gICAgICAgICAgLy8gRW5kIHRoZSByZXNwb25zZSB3aGVuIHRoZSBzdHJlYW0gZW5kcy5cbiAgICAgICAgICBlbmQ6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIExvZy5lcnJvcihcIkVycm9yIHJ1bm5pbmcgdGVtcGxhdGU6IFwiICsgZXJyb3Iuc3RhY2spO1xuICAgICAgICByZXMud3JpdGVIZWFkKDUwMCwgaGVhZGVycyk7XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gUmV0dXJuIDQwNCBieSBkZWZhdWx0LCBpZiBubyBvdGhlciBoYW5kbGVycyBzZXJ2ZSB0aGlzIFVSTC5cbiAgYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICByZXMud3JpdGVIZWFkKDQwNCk7XG4gICAgcmVzLmVuZCgpO1xuICB9KTtcblxuXG4gIHZhciBodHRwU2VydmVyID0gY3JlYXRlU2VydmVyKGFwcCk7XG4gIHZhciBvbkxpc3RlbmluZ0NhbGxiYWNrcyA9IFtdO1xuXG4gIC8vIEFmdGVyIDUgc2Vjb25kcyB3L28gZGF0YSBvbiBhIHNvY2tldCwga2lsbCBpdC4gIE9uIHRoZSBvdGhlciBoYW5kLCBpZlxuICAvLyB0aGVyZSdzIGFuIG91dHN0YW5kaW5nIHJlcXVlc3QsIGdpdmUgaXQgYSBoaWdoZXIgdGltZW91dCBpbnN0ZWFkICh0byBhdm9pZFxuICAvLyBraWxsaW5nIGxvbmctcG9sbGluZyByZXF1ZXN0cylcbiAgaHR0cFNlcnZlci5zZXRUaW1lb3V0KFNIT1JUX1NPQ0tFVF9USU1FT1VUKTtcblxuICAvLyBEbyB0aGlzIGhlcmUsIGFuZCB0aGVuIGFsc28gaW4gbGl2ZWRhdGEvc3RyZWFtX3NlcnZlci5qcywgYmVjYXVzZVxuICAvLyBzdHJlYW1fc2VydmVyLmpzIGtpbGxzIGFsbCB0aGUgY3VycmVudCByZXF1ZXN0IGhhbmRsZXJzIHdoZW4gaW5zdGFsbGluZyBpdHNcbiAgLy8gb3duLlxuICBodHRwU2VydmVyLm9uKCdyZXF1ZXN0JywgV2ViQXBwLl90aW1lb3V0QWRqdXN0bWVudFJlcXVlc3RDYWxsYmFjayk7XG5cbiAgLy8gSWYgdGhlIGNsaWVudCBnYXZlIHVzIGEgYmFkIHJlcXVlc3QsIHRlbGwgaXQgaW5zdGVhZCBvZiBqdXN0IGNsb3NpbmcgdGhlXG4gIC8vIHNvY2tldC4gVGhpcyBsZXRzIGxvYWQgYmFsYW5jZXJzIGluIGZyb250IG9mIHVzIGRpZmZlcmVudGlhdGUgYmV0d2VlbiBcImFcbiAgLy8gc2VydmVyIGlzIHJhbmRvbWx5IGNsb3Npbmcgc29ja2V0cyBmb3Igbm8gcmVhc29uXCIgYW5kIFwiY2xpZW50IHNlbnQgYSBiYWRcbiAgLy8gcmVxdWVzdFwiLlxuICAvL1xuICAvLyBUaGlzIHdpbGwgb25seSB3b3JrIG9uIE5vZGUgNjsgTm9kZSA0IGRlc3Ryb3lzIHRoZSBzb2NrZXQgYmVmb3JlIGNhbGxpbmdcbiAgLy8gdGhpcyBldmVudC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9wdWxsLzQ1NTcvIGZvciBkZXRhaWxzLlxuICBodHRwU2VydmVyLm9uKCdjbGllbnRFcnJvcicsIChlcnIsIHNvY2tldCkgPT4ge1xuICAgIC8vIFByZS1Ob2RlLTYsIGRvIG5vdGhpbmcuXG4gICAgaWYgKHNvY2tldC5kZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXJyLm1lc3NhZ2UgPT09ICdQYXJzZSBFcnJvcicpIHtcbiAgICAgIHNvY2tldC5lbmQoJ0hUVFAvMS4xIDQwMCBCYWQgUmVxdWVzdFxcclxcblxcclxcbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBGb3Igb3RoZXIgZXJyb3JzLCB1c2UgdGhlIGRlZmF1bHQgYmVoYXZpb3IgYXMgaWYgd2UgaGFkIG5vIGNsaWVudEVycm9yXG4gICAgICAvLyBoYW5kbGVyLlxuICAgICAgc29ja2V0LmRlc3Ryb3koZXJyKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHN0YXJ0IHVwIGFwcFxuICBfLmV4dGVuZChXZWJBcHAsIHtcbiAgICBjb25uZWN0SGFuZGxlcnM6IHBhY2thZ2VBbmRBcHBIYW5kbGVycyxcbiAgICByYXdDb25uZWN0SGFuZGxlcnM6IHJhd0Nvbm5lY3RIYW5kbGVycyxcbiAgICBodHRwU2VydmVyOiBodHRwU2VydmVyLFxuICAgIGNvbm5lY3RBcHA6IGFwcCxcbiAgICAvLyBGb3IgdGVzdGluZy5cbiAgICBzdXBwcmVzc0Nvbm5lY3RFcnJvcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN1cHByZXNzQ29ubmVjdEVycm9ycyA9IHRydWU7XG4gICAgfSxcbiAgICBvbkxpc3RlbmluZzogZnVuY3Rpb24gKGYpIHtcbiAgICAgIGlmIChvbkxpc3RlbmluZ0NhbGxiYWNrcylcbiAgICAgICAgb25MaXN0ZW5pbmdDYWxsYmFja3MucHVzaChmKTtcbiAgICAgIGVsc2VcbiAgICAgICAgZigpO1xuICAgIH0sXG4gICAgLy8gVGhpcyBjYW4gYmUgb3ZlcnJpZGRlbiBieSB1c2VycyB3aG8gd2FudCB0byBtb2RpZnkgaG93IGxpc3RlbmluZyB3b3Jrc1xuICAgIC8vIChlZywgdG8gcnVuIGEgcHJveHkgbGlrZSBBcG9sbG8gRW5naW5lIFByb3h5IGluIGZyb250IG9mIHRoZSBzZXJ2ZXIpLlxuICAgIHN0YXJ0TGlzdGVuaW5nOiBmdW5jdGlvbiAoaHR0cFNlcnZlciwgbGlzdGVuT3B0aW9ucywgY2IpIHtcbiAgICAgIGh0dHBTZXJ2ZXIubGlzdGVuKGxpc3Rlbk9wdGlvbnMsIGNiKTtcbiAgICB9LFxuICB9KTtcblxuICAvLyBMZXQgdGhlIHJlc3Qgb2YgdGhlIHBhY2thZ2VzIChhbmQgTWV0ZW9yLnN0YXJ0dXAgaG9va3MpIGluc2VydCBjb25uZWN0XG4gIC8vIG1pZGRsZXdhcmVzIGFuZCB1cGRhdGUgX19tZXRlb3JfcnVudGltZV9jb25maWdfXywgdGhlbiBrZWVwIGdvaW5nIHRvIHNldCB1cFxuICAvLyBhY3R1YWxseSBzZXJ2aW5nIEhUTUwuXG4gIGV4cG9ydHMubWFpbiA9IGFyZ3YgPT4ge1xuICAgIFdlYkFwcEludGVybmFscy5nZW5lcmF0ZUJvaWxlcnBsYXRlKCk7XG5cbiAgICBjb25zdCBzdGFydEh0dHBTZXJ2ZXIgPSBsaXN0ZW5PcHRpb25zID0+IHtcbiAgICAgIFdlYkFwcC5zdGFydExpc3RlbmluZyhodHRwU2VydmVyLCBsaXN0ZW5PcHRpb25zLCBNZXRlb3IuYmluZEVudmlyb25tZW50KCgpID0+IHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk1FVEVPUl9QUklOVF9PTl9MSVNURU4pIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkxJU1RFTklOR1wiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSBvbkxpc3RlbmluZ0NhbGxiYWNrcztcbiAgICAgICAgb25MaXN0ZW5pbmdDYWxsYmFja3MgPSBudWxsO1xuICAgICAgICBjYWxsYmFja3MuZm9yRWFjaChjYWxsYmFjayA9PiB7IGNhbGxiYWNrKCk7IH0pO1xuICAgICAgfSwgZSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBsaXN0ZW5pbmc6XCIsIGUpO1xuICAgICAgICBjb25zb2xlLmVycm9yKGUgJiYgZS5zdGFjayk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIGxldCBsb2NhbFBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDA7XG4gICAgY29uc3QgdW5peFNvY2tldFBhdGggPSBwcm9jZXNzLmVudi5VTklYX1NPQ0tFVF9QQVRIO1xuXG4gICAgaWYgKHVuaXhTb2NrZXRQYXRoKSB7XG4gICAgICAvLyBTdGFydCB0aGUgSFRUUCBzZXJ2ZXIgdXNpbmcgYSBzb2NrZXQgZmlsZS5cbiAgICAgIHJlbW92ZUV4aXN0aW5nU29ja2V0RmlsZSh1bml4U29ja2V0UGF0aCk7XG4gICAgICBzdGFydEh0dHBTZXJ2ZXIoeyBwYXRoOiB1bml4U29ja2V0UGF0aCB9KTtcbiAgICAgIHJlZ2lzdGVyU29ja2V0RmlsZUNsZWFudXAodW5peFNvY2tldFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFBvcnQgPSBpc05hTihOdW1iZXIobG9jYWxQb3J0KSkgPyBsb2NhbFBvcnQgOiBOdW1iZXIobG9jYWxQb3J0KTtcbiAgICAgIGlmICgvXFxcXFxcXFw/LitcXFxccGlwZVxcXFw/LisvLnRlc3QobG9jYWxQb3J0KSkge1xuICAgICAgICAvLyBTdGFydCB0aGUgSFRUUCBzZXJ2ZXIgdXNpbmcgV2luZG93cyBTZXJ2ZXIgc3R5bGUgbmFtZWQgcGlwZS5cbiAgICAgICAgc3RhcnRIdHRwU2VydmVyKHsgcGF0aDogbG9jYWxQb3J0IH0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbG9jYWxQb3J0ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIC8vIFN0YXJ0IHRoZSBIVFRQIHNlcnZlciB1c2luZyBUQ1AuXG4gICAgICAgIHN0YXJ0SHR0cFNlcnZlcih7XG4gICAgICAgICAgcG9ydDogbG9jYWxQb3J0LFxuICAgICAgICAgIGhvc3Q6IHByb2Nlc3MuZW52LkJJTkRfSVAgfHwgXCIwLjAuMC4wXCJcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIFBPUlQgc3BlY2lmaWVkXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBcIkRBRU1PTlwiO1xuICB9O1xufVxuXG52YXIgaW5saW5lU2NyaXB0c0FsbG93ZWQgPSB0cnVlO1xuXG5XZWJBcHBJbnRlcm5hbHMuaW5saW5lU2NyaXB0c0FsbG93ZWQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpbmxpbmVTY3JpcHRzQWxsb3dlZDtcbn07XG5cbldlYkFwcEludGVybmFscy5zZXRJbmxpbmVTY3JpcHRzQWxsb3dlZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpbmxpbmVTY3JpcHRzQWxsb3dlZCA9IHZhbHVlO1xuICBXZWJBcHBJbnRlcm5hbHMuZ2VuZXJhdGVCb2lsZXJwbGF0ZSgpO1xufTtcblxudmFyIHNyaU1vZGU7XG5cbldlYkFwcEludGVybmFscy5lbmFibGVTdWJyZXNvdXJjZUludGVncml0eSA9IGZ1bmN0aW9uKHVzZV9jcmVkZW50aWFscyA9IGZhbHNlKSB7XG4gIHNyaU1vZGUgPSB1c2VfY3JlZGVudGlhbHMgPyAndXNlLWNyZWRlbnRpYWxzJyA6ICdhbm9ueW1vdXMnO1xuICBXZWJBcHBJbnRlcm5hbHMuZ2VuZXJhdGVCb2lsZXJwbGF0ZSgpO1xufTtcblxuV2ViQXBwSW50ZXJuYWxzLnNldEJ1bmRsZWRKc0Nzc1VybFJld3JpdGVIb29rID0gZnVuY3Rpb24gKGhvb2tGbikge1xuICBidW5kbGVkSnNDc3NVcmxSZXdyaXRlSG9vayA9IGhvb2tGbjtcbiAgV2ViQXBwSW50ZXJuYWxzLmdlbmVyYXRlQm9pbGVycGxhdGUoKTtcbn07XG5cbldlYkFwcEludGVybmFscy5zZXRCdW5kbGVkSnNDc3NQcmVmaXggPSBmdW5jdGlvbiAocHJlZml4KSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgc2VsZi5zZXRCdW5kbGVkSnNDc3NVcmxSZXdyaXRlSG9vayhcbiAgICBmdW5jdGlvbiAodXJsKSB7XG4gICAgICByZXR1cm4gcHJlZml4ICsgdXJsO1xuICB9KTtcbn07XG5cbi8vIFBhY2thZ2VzIGNhbiBjYWxsIGBXZWJBcHBJbnRlcm5hbHMuYWRkU3RhdGljSnNgIHRvIHNwZWNpZnkgc3RhdGljXG4vLyBKYXZhU2NyaXB0IHRvIGJlIGluY2x1ZGVkIGluIHRoZSBhcHAuIFRoaXMgc3RhdGljIEpTIHdpbGwgYmUgaW5saW5lZCxcbi8vIHVubGVzcyBpbmxpbmUgc2NyaXB0cyBoYXZlIGJlZW4gZGlzYWJsZWQsIGluIHdoaWNoIGNhc2UgaXQgd2lsbCBiZVxuLy8gc2VydmVkIHVuZGVyIGAvPHNoYTEgb2YgY29udGVudHM+YC5cbnZhciBhZGRpdGlvbmFsU3RhdGljSnMgPSB7fTtcbldlYkFwcEludGVybmFscy5hZGRTdGF0aWNKcyA9IGZ1bmN0aW9uIChjb250ZW50cykge1xuICBhZGRpdGlvbmFsU3RhdGljSnNbXCIvXCIgKyBzaGExKGNvbnRlbnRzKSArIFwiLmpzXCJdID0gY29udGVudHM7XG59O1xuXG4vLyBFeHBvcnRlZCBmb3IgdGVzdHNcbldlYkFwcEludGVybmFscy5nZXRCb2lsZXJwbGF0ZSA9IGdldEJvaWxlcnBsYXRlO1xuV2ViQXBwSW50ZXJuYWxzLmFkZGl0aW9uYWxTdGF0aWNKcyA9IGFkZGl0aW9uYWxTdGF0aWNKcztcblxuLy8gU3RhcnQgdGhlIHNlcnZlciFcbnJ1bldlYkFwcFNlcnZlcigpO1xuIiwiaW1wb3J0IG5wbUNvbm5lY3QgZnJvbSBcImNvbm5lY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3QoLi4uY29ubmVjdEFyZ3MpIHtcbiAgY29uc3QgaGFuZGxlcnMgPSBucG1Db25uZWN0LmFwcGx5KHRoaXMsIGNvbm5lY3RBcmdzKTtcbiAgY29uc3Qgb3JpZ2luYWxVc2UgPSBoYW5kbGVycy51c2U7XG5cbiAgLy8gV3JhcCB0aGUgaGFuZGxlcnMudXNlIG1ldGhvZCBzbyB0aGF0IGFueSBwcm92aWRlZCBoYW5kbGVyIGZ1bmN0aW9uc1xuICAvLyBhbHdheSBydW4gaW4gYSBGaWJlci5cbiAgaGFuZGxlcnMudXNlID0gZnVuY3Rpb24gdXNlKC4uLnVzZUFyZ3MpIHtcbiAgICBjb25zdCB7IHN0YWNrIH0gPSB0aGlzO1xuICAgIGNvbnN0IG9yaWdpbmFsTGVuZ3RoID0gc3RhY2subGVuZ3RoO1xuICAgIGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsVXNlLmFwcGx5KHRoaXMsIHVzZUFyZ3MpO1xuXG4gICAgLy8gSWYgd2UganVzdCBhZGRlZCBhbnl0aGluZyB0byB0aGUgc3RhY2ssIHdyYXAgZWFjaCBuZXcgZW50cnkuaGFuZGxlXG4gICAgLy8gd2l0aCBhIGZ1bmN0aW9uIHRoYXQgY2FsbHMgUHJvbWlzZS5hc3luY0FwcGx5IHRvIGVuc3VyZSB0aGVcbiAgICAvLyBvcmlnaW5hbCBoYW5kbGVyIHJ1bnMgaW4gYSBGaWJlci5cbiAgICBmb3IgKGxldCBpID0gb3JpZ2luYWxMZW5ndGg7IGkgPCBzdGFjay5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgZW50cnkgPSBzdGFja1tpXTtcbiAgICAgIGNvbnN0IG9yaWdpbmFsSGFuZGxlID0gZW50cnkuaGFuZGxlO1xuXG4gICAgICBpZiAob3JpZ2luYWxIYW5kbGUubGVuZ3RoID49IDQpIHtcbiAgICAgICAgLy8gSWYgdGhlIG9yaWdpbmFsIGhhbmRsZSBoYWQgZm91ciAob3IgbW9yZSkgcGFyYW1ldGVycywgdGhlXG4gICAgICAgIC8vIHdyYXBwZXIgbXVzdCBhbHNvIGhhdmUgZm91ciBwYXJhbWV0ZXJzLCBzaW5jZSBjb25uZWN0IHVzZXNcbiAgICAgICAgLy8gaGFuZGxlLmxlbmd0aCB0byBkZXJtaW5lIHdoZXRoZXIgdG8gcGFzcyB0aGUgZXJyb3IgYXMgdGhlIGZpcnN0XG4gICAgICAgIC8vIGFyZ3VtZW50IHRvIHRoZSBoYW5kbGUgZnVuY3Rpb24uXG4gICAgICAgIGVudHJ5LmhhbmRsZSA9IGZ1bmN0aW9uIGhhbmRsZShlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYXN5bmNBcHBseShvcmlnaW5hbEhhbmRsZSwgdGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVudHJ5LmhhbmRsZSA9IGZ1bmN0aW9uIGhhbmRsZShyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFzeW5jQXBwbHkob3JpZ2luYWxIYW5kbGUsIHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gaGFuZGxlcnM7XG59XG4iLCJpbXBvcnQgeyBzdGF0U3luYywgdW5saW5rU3luYywgZXhpc3RzU3luYyB9IGZyb20gJ2ZzJztcblxuLy8gU2luY2UgYSBuZXcgc29ja2V0IGZpbGUgd2lsbCBiZSBjcmVhdGVkIHdoZW4gdGhlIEhUVFAgc2VydmVyXG4vLyBzdGFydHMgdXAsIGlmIGZvdW5kIHJlbW92ZSB0aGUgZXhpc3RpbmcgZmlsZS5cbi8vXG4vLyBXQVJOSU5HOlxuLy8gVGhpcyB3aWxsIHJlbW92ZSB0aGUgY29uZmlndXJlZCBzb2NrZXQgZmlsZSB3aXRob3V0IHdhcm5pbmcuIElmXG4vLyB0aGUgY29uZmlndXJlZCBzb2NrZXQgZmlsZSBpcyBhbHJlYWR5IGluIHVzZSBieSBhbm90aGVyIGFwcGxpY2F0aW9uLFxuLy8gaXQgd2lsbCBzdGlsbCBiZSByZW1vdmVkLiBOb2RlIGRvZXMgbm90IHByb3ZpZGUgYSByZWxpYWJsZSB3YXkgdG9cbi8vIGRpZmZlcmVudGlhdGUgYmV0d2VlbiBhIHNvY2tldCBmaWxlIHRoYXQgaXMgYWxyZWFkeSBpbiB1c2UgYnlcbi8vIGFub3RoZXIgYXBwbGljYXRpb24gb3IgYSBzdGFsZSBzb2NrZXQgZmlsZSB0aGF0IGhhcyBiZWVuXG4vLyBsZWZ0IG92ZXIgYWZ0ZXIgYSBTSUdLSUxMLiBTaW5jZSB3ZSBoYXZlIG5vIHJlbGlhYmxlIHdheSB0b1xuLy8gZGlmZmVyZW50aWF0ZSBiZXR3ZWVuIHRoZXNlIHR3byBzY2VuYXJpb3MsIHRoZSBiZXN0IGNvdXJzZSBvZlxuLy8gYWN0aW9uIGR1cmluZyBzdGFydHVwIGlzIHRvIHJlbW92ZSBhbnkgZXhpc3Rpbmcgc29ja2V0IGZpbGUuIFRoaXNcbi8vIGlzIG5vdCB0aGUgc2FmZXN0IGNvdXJzZSBvZiBhY3Rpb24gYXMgcmVtb3ZpbmcgdGhlIGV4aXN0aW5nIHNvY2tldFxuLy8gZmlsZSBjb3VsZCBpbXBhY3QgYW4gYXBwbGljYXRpb24gdXNpbmcgaXQsIGJ1dCB0aGlzIGFwcHJvYWNoIGhlbHBzXG4vLyBlbnN1cmUgdGhlIEhUVFAgc2VydmVyIGNhbiBzdGFydHVwIHdpdGhvdXQgbWFudWFsXG4vLyBpbnRlcnZlbnRpb24gKGUuZy4gYXNraW5nIGZvciB0aGUgdmVyaWZpY2F0aW9uIGFuZCBjbGVhbnVwIG9mIHNvY2tldFxuLy8gZmlsZXMgYmVmb3JlIGFsbG93aW5nIHRoZSBIVFRQIHNlcnZlciB0byBiZSBzdGFydGVkKS5cbi8vXG4vLyBUaGUgYWJvdmUgYmVpbmcgc2FpZCwgYXMgbG9uZyBhcyB0aGUgc29ja2V0IGZpbGUgcGF0aCBpc1xuLy8gY29uZmlndXJlZCBjYXJlZnVsbHkgd2hlbiB0aGUgYXBwbGljYXRpb24gaXMgZGVwbG95ZWQgKGFuZCBleHRyYVxuLy8gY2FyZSBpcyB0YWtlbiB0byBtYWtlIHN1cmUgdGhlIGNvbmZpZ3VyZWQgcGF0aCBpcyB1bmlxdWUgYW5kIGRvZXNuJ3Rcbi8vIGNvbmZsaWN0IHdpdGggYW5vdGhlciBzb2NrZXQgZmlsZSBwYXRoKSwgdGhlbiB0aGVyZSBzaG91bGQgbm90IGJlXG4vLyBhbnkgaXNzdWVzIHdpdGggdGhpcyBhcHByb2FjaC5cbmV4cG9ydCBjb25zdCByZW1vdmVFeGlzdGluZ1NvY2tldEZpbGUgPSAoc29ja2V0UGF0aCkgPT4ge1xuICB0cnkge1xuICAgIGlmIChzdGF0U3luYyhzb2NrZXRQYXRoKS5pc1NvY2tldCgpKSB7XG4gICAgICAvLyBTaW5jZSBhIG5ldyBzb2NrZXQgZmlsZSB3aWxsIGJlIGNyZWF0ZWQsIHJlbW92ZSB0aGUgZXhpc3RpbmdcbiAgICAgIC8vIGZpbGUuXG4gICAgICB1bmxpbmtTeW5jKHNvY2tldFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBBbiBleGlzdGluZyBmaWxlIHdhcyBmb3VuZCBhdCBcIiR7c29ja2V0UGF0aH1cIiBhbmQgaXQgaXMgbm90IGAgK1xuICAgICAgICAnYSBzb2NrZXQgZmlsZS4gUGxlYXNlIGNvbmZpcm0gUE9SVCBpcyBwb2ludGluZyB0byB2YWxpZCBhbmQgJyArXG4gICAgICAgICd1bi11c2VkIHNvY2tldCBmaWxlIHBhdGguJ1xuICAgICAgKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gZXhpc3Rpbmcgc29ja2V0IGZpbGUgdG8gY2xlYW51cCwgZ3JlYXQsIHdlJ2xsXG4gICAgLy8gY29udGludWUgbm9ybWFsbHkuIElmIHRoZSBjYXVnaHQgZXhjZXB0aW9uIHJlcHJlc2VudHMgYW55IG90aGVyXG4gICAgLy8gaXNzdWUsIHJlLXRocm93LlxuICAgIGlmIChlcnJvci5jb2RlICE9PSAnRU5PRU5UJykge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59O1xuXG4vLyBSZW1vdmUgdGhlIHNvY2tldCBmaWxlIHdoZW4gZG9uZSB0byBhdm9pZCBsZWF2aW5nIGJlaGluZCBhIHN0YWxlIG9uZS5cbi8vIE5vdGUgLSBhIHN0YWxlIHNvY2tldCBmaWxlIGlzIHN0aWxsIGxlZnQgYmVoaW5kIGlmIHRoZSBydW5uaW5nIG5vZGVcbi8vIHByb2Nlc3MgaXMga2lsbGVkIHZpYSBzaWduYWwgOSAtIFNJR0tJTEwuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJTb2NrZXRGaWxlQ2xlYW51cCA9XG4gIChzb2NrZXRQYXRoLCBldmVudEVtaXR0ZXIgPSBwcm9jZXNzKSA9PiB7XG4gICAgWydleGl0JywgJ1NJR0lOVCcsICdTSUdIVVAnLCAnU0lHVEVSTSddLmZvckVhY2goc2lnbmFsID0+IHtcbiAgICAgIGV2ZW50RW1pdHRlci5vbihzaWduYWwsIE1ldGVvci5iaW5kRW52aXJvbm1lbnQoKCkgPT4ge1xuICAgICAgICBpZiAoZXhpc3RzU3luYyhzb2NrZXRQYXRoKSkge1xuICAgICAgICAgIHVubGlua1N5bmMoc29ja2V0UGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfTtcbiJdfQ==
