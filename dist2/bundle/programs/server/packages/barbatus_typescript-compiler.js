(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Logger, TypeScriptCompiler, inputFiles, TypeScript, options;

var require = meteorInstall({"node_modules":{"meteor":{"barbatus:typescript-compiler":{"logger.js":function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/barbatus_typescript-compiler/logger.js                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
const util = Npm.require('util');

class Logger_ {
  constructor() {
    this.llevel = process.env.TYPESCRIPT_LOG;
  }

  newProfiler(name) {
    let profiler = new Profiler(name);
    if (this.isProfile) profiler.start();
    return profiler;
  }

  get isDebug() {
    return this.llevel >= 2;
  }

  get isProfile() {
    return this.llevel >= 3;
  }

  get isAssert() {
    return this.llevel >= 4;
  }

  log(msg, ...args) {
    if (this.llevel >= 1) {
      console.log.apply(null, [msg].concat(args));
    }
  }

  debug(msg, ...args) {
    if (this.isDebug) {
      this.log.apply(this, msg, args);
    }
  }

  assert(msg, ...args) {
    if (this.isAssert) {
      this.log.apply(this, msg, args);
    }
  }

}

;
Logger = new Logger_();

class Profiler {
  constructor(name) {
    this.name = name;
  }

  start() {
    console.log('%s started', this.name);
    console.time(util.format('%s time', this.name));
    this._started = true;
  }

  end() {
    if (this._started) {
      console.timeEnd(util.format('%s time', this.name));
    }
  }

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"file-utils.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/barbatus_typescript-compiler/file-utils.js                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  isBare: () => isBare,
  isMainConfig: () => isMainConfig,
  isConfig: () => isConfig,
  isServerConfig: () => isServerConfig,
  isDeclaration: () => isDeclaration,
  isWeb: () => isWeb,
  getExtendedPath: () => getExtendedPath,
  getES6ModuleName: () => getES6ModuleName,
  WarnMixin: () => WarnMixin,
  extendFiles: () => extendFiles
});

const colors = Npm.require('colors');

function isBare(inputFile) {
  const fileOptions = inputFile.getFileOptions();
  return fileOptions && fileOptions.bare;
}

function isMainConfig(inputFile) {
  if (!isWeb(inputFile)) return false;
  const filePath = inputFile.getPathInPackage();
  return /^tsconfig\.json$/.test(filePath);
}

function isConfig(inputFile) {
  const filePath = inputFile.getPathInPackage();
  return /tsconfig\.json$/.test(filePath);
}

function isServerConfig(inputFile) {
  if (isWeb(inputFile)) return false;
  const filePath = inputFile.getPathInPackage();
  return /^server\/tsconfig\.json$/.test(filePath);
}

function isDeclaration(inputFile) {
  return TypeScript.isDeclarationFile(inputFile.getBasename());
}

function isWeb(inputFile) {
  const arch = inputFile.getArch();
  return /^web/.test(arch);
}

function getExtendedPath(inputFile) {
  let packageName = inputFile.getPackageName();
  packageName = packageName ? packageName.replace(':', '_') + '/' : '';
  const inputFilePath = inputFile.getPathInPackage();
  return packageName + inputFilePath;
}

function getES6ModuleName(inputFile) {
  const extended = getExtendedPath(inputFile);
  return TypeScript.removeTsExt(extended);
}

const WarnMixin = {
  warn(error) {
    console.log(`${error.sourcePath} (${error.line}, ${error.column}): ${error.message}`);
  },

  logError(error) {
    console.log(colors.red(`${error.sourcePath} (${error.line}, ${error.column}): ${error.message}`));
  }

};

function extendFiles(inputFiles, fileMixin) {
  inputFiles.forEach(inputFile => _.defaults(inputFile, fileMixin));
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"typescript-compiler.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/barbatus_typescript-compiler/typescript-compiler.js                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
const module1 = module;
let getExtendedPath, isDeclaration, isConfig, isMainConfig, isServerConfig, isBare, getES6ModuleName, WarnMixin, extendFiles, isWeb;
module1.link("./file-utils", {
  getExtendedPath(v) {
    getExtendedPath = v;
  },

  isDeclaration(v) {
    isDeclaration = v;
  },

  isConfig(v) {
    isConfig = v;
  },

  isMainConfig(v) {
    isMainConfig = v;
  },

  isServerConfig(v) {
    isServerConfig = v;
  },

  isBare(v) {
    isBare = v;
  },

  getES6ModuleName(v) {
    getES6ModuleName = v;
  },

  WarnMixin(v) {
    WarnMixin = v;
  },

  extendFiles(v) {
    extendFiles = v;
  },

  isWeb(v) {
    isWeb = v;
  }

}, 0);
let getShallowHash;
module1.link("./utils", {
  getShallowHash(v) {
    getShallowHash = v;
  }

}, 1);

const async = Npm.require('async');

const path = Npm.require('path');

const fs = Npm.require('fs');

const Future = Npm.require('fibers/future');

const {
  TSBuild,
  validateTsConfig,
  getExcludeRegExp
} = Npm.require('meteor-typescript');

const {
  createHash
} = Npm.require('crypto');

// Default exclude paths.
const defExclude = new RegExp(getExcludeRegExp(['node_modules/**'])); // What to exclude when compiling for the server.
// typings/main and typings/browser seem to be not used
// at all but let keep them for just in case.

const exlWebRegExp = new RegExp(getExcludeRegExp(['typings/main/**', 'typings/main.d.ts'])); // What to exclude when compiling for the client.

const exlMainRegExp = new RegExp(getExcludeRegExp(['typings/browser/**', 'typings/browser.d.ts']));
const COMPILER_REGEXP = /(\.d.ts|\.ts|\.tsx|\.tsconfig)$/;
const TS_REGEXP = /(\.ts|\.tsx)$/;
TypeScriptCompiler = class TypeScriptCompiler {
  constructor(extraOptions, maxParallelism) {
    TypeScript.validateExtraOptions(extraOptions);
    this.extraOptions = extraOptions;
    this.maxParallelism = maxParallelism || 10;
    this.serverOptions = null;
    this.tsconfig = TypeScript.getDefaultOptions();
    this.cfgHash = null;
    this.diagHash = new Set();
    this.archSet = new Set();
  }

  getFilesToProcess(inputFiles) {
    const pexclude = Logger.newProfiler('exclude');
    inputFiles = this._filterByDefault(inputFiles);

    this._processConfig(inputFiles);

    inputFiles = this._filterByConfig(inputFiles);

    if (inputFiles.length) {
      const arch = inputFiles[0].getArch();
      inputFiles = this._filterByArch(inputFiles, arch);
    }

    pexclude.end();
    return inputFiles;
  }

  getBuildOptions(inputFiles) {
    this._processConfig(inputFiles);

    const inputFile = inputFiles[0];
    let {
      compilerOptions
    } = this.tsconfig; // Make a copy.

    compilerOptions = Object.assign({}, compilerOptions);

    if (!isWeb(inputFile) && this.serverOptions) {
      Object.assign(compilerOptions, this.serverOptions);
    } // Apply extra options.


    if (this.extraOptions) {
      Object.assign(compilerOptions, this.extraOptions);
    }

    const arch = inputFile.getArch();
    const {
      typings,
      useCache
    } = this.tsconfig;
    return {
      arch,
      compilerOptions,
      typings,
      useCache
    };
  }

  processFilesForTarget(inputFiles, getDepsContent) {
    extendFiles(inputFiles, WarnMixin);
    const options = this.getBuildOptions(inputFiles);
    Logger.log('compiler options: %j', options.compilerOptions);
    inputFiles = this.getFilesToProcess(inputFiles);
    if (!inputFiles.length) return;
    const pcompile = Logger.newProfiler('compilation');
    const filePaths = inputFiles.map(file => getExtendedPath(file));
    Logger.log('compile files: %s', filePaths);
    const pbuild = Logger.newProfiler('tsBuild');

    const defaultGet = this._getContentGetter(inputFiles);

    const getContent = filePath => getDepsContent && getDepsContent(filePath) || defaultGet(filePath);

    const tsBuild = new TSBuild(filePaths, getContent, options);
    pbuild.end();
    const pfiles = Logger.newProfiler('tsEmitFiles');
    const future = new Future(); // Don't emit typings.

    const compileFiles = inputFiles.filter(file => !isDeclaration(file));
    let throwSyntax = false;
    const results = new Map();
    async.eachLimit(compileFiles, this.maxParallelism, (file, done) => {
      const co = options.compilerOptions;
      const filePath = getExtendedPath(file);
      const pemit = Logger.newProfiler('tsEmit');
      const result = tsBuild.emit(filePath);
      results.set(file, result);
      pemit.end();
      throwSyntax = throwSyntax | this._processDiagnostics(file, result.diagnostics, co);
      done();
    }, future.resolver());
    pfiles.end();
    future.wait();

    if (!throwSyntax) {
      results.forEach((result, file) => {
        const module = options.compilerOptions.module;

        this._addJavaScript(file, result, module === 'none');
      });
    }

    pcompile.end();
  }

  _getContentGetter(inputFiles) {
    const filesMap = new Map();
    inputFiles.forEach((inputFile, index) => {
      filesMap.set(getExtendedPath(inputFile), index);
    });
    return filePath => {
      let index = filesMap.get(filePath);

      if (index === undefined) {
        const filePathNoRootSlash = filePath.replace(/^\//, '');
        index = filesMap.get(filePathNoRootSlash);
      }

      return index !== undefined ? inputFiles[index].getContentsAsString() : null;
    };
  }

  _addJavaScript(inputFile, tsResult, forceBare) {
    const source = inputFile.getContentsAsString();
    const inputPath = inputFile.getPathInPackage();
    const outputPath = TypeScript.removeTsExt(inputPath) + '.js';
    const toBeAdded = {
      sourcePath: inputPath,
      path: outputPath,
      data: tsResult.code,
      hash: tsResult.hash,
      sourceMap: tsResult.sourceMap,
      bare: forceBare || isBare(inputFile)
    };
    inputFile.addJavaScript(toBeAdded);
  }

  _processDiagnostics(inputFile, diagnostics, tsOptions) {
    // Remove duplicated warnings for shared files
    // by saving hashes of already shown warnings.
    const reduce = (diagnostic, cb) => {
      let dob = {
        message: diagnostic.message,
        sourcePath: getExtendedPath(inputFile),
        line: diagnostic.line,
        column: diagnostic.column
      };
      const arch = inputFile.getArch(); // TODO: find out how to get list of architectures.

      this.archSet.add(arch);
      let shown = false;

      for (const key of this.archSet.keys()) {
        if (key !== arch) {
          dob.arch = key;
          const hash = getShallowHash(dob);

          if (this.diagHash.has(hash)) {
            shown = true;
            break;
          }
        }
      }

      if (!shown) {
        dob.arch = arch;
        const hash = getShallowHash(dob);
        this.diagHash.add(hash);
        cb(dob);
      }
    }; // Always throw syntax errors.


    const throwSyntax = !!diagnostics.syntacticErrors.length;
    diagnostics.syntacticErrors.forEach(diagnostic => {
      reduce(diagnostic, dob => {
        inputFile.error(dob);
      });
    });
    const packageName = inputFile.getPackageName();
    if (packageName) return throwSyntax; // And log out other errors except package files.

    if (tsOptions && tsOptions.diagnostics) {
      diagnostics.semanticErrors.forEach(diagnostic => {
        reduce(diagnostic, dob => inputFile.warn(dob));
      });
    }

    return throwSyntax;
  }

  _getFileModuleName(inputFile, options) {
    if (options.module === 'none') return null;
    return getES6ModuleName(inputFile);
  }

  _processConfig(inputFiles) {
    const tsFiles = inputFiles.map(inputFile => inputFile.getPathInPackage()).filter(filePath => TS_REGEXP.test(filePath));

    for (const inputFile of inputFiles) {
      // Parse root config.
      if (isMainConfig(inputFile)) {
        const source = inputFile.getContentsAsString();
        const hash = inputFile.getSourceHash(); // If hashes differ, create new tsconfig. 

        if (hash !== this.cfgHash) {
          this.tsconfig = this._parseConfig(source, tsFiles);
          this.cfgHash = hash;
        }

        return;
      } // Parse server config.
      // Take only target and lib values.


      if (isServerConfig(inputFile)) {
        const source = inputFile.getContentsAsString();

        const {
          compilerOptions
        } = this._parseConfig(source, tsFiles);

        if (compilerOptions) {
          const {
            target,
            lib
          } = compilerOptions;
          this.serverOptions = {
            target,
            lib
          };
        }

        return;
      }
    }
  }

  _parseConfig(cfgContent, tsFiles) {
    let tsconfig = null;

    try {
      tsconfig = JSON.parse(cfgContent); // Define files since if it's not defined
      // validation throws an exception.

      const files = tsconfig.files || tsFiles;
      tsconfig.files = files;
      validateTsConfig(tsconfig);
    } catch (err) {
      throw new Error(`Format of the tsconfig is invalid: ${err}`);
    }

    const exclude = tsconfig.exclude || [];

    try {
      const regExp = getExcludeRegExp(exclude);
      tsconfig.exclude = regExp && new RegExp(regExp);
    } catch (err) {
      throw new Error(`Format of an exclude path is invalid: ${err}`);
    }

    return tsconfig;
  }

  _filterByDefault(inputFiles) {
    inputFiles = inputFiles.filter(inputFile => {
      const path = inputFile.getPathInPackage();
      return COMPILER_REGEXP.test(path) && !defExclude.test('/' + path);
    });
    return inputFiles;
  }

  _filterByConfig(inputFiles) {
    let resultFiles = inputFiles;

    if (this.tsconfig.exclude) {
      resultFiles = resultFiles.filter(inputFile => {
        const path = inputFile.getPathInPackage(); // There seems to an issue with getRegularExpressionForWildcard:
        // result regexp always starts with /.

        return !this.tsconfig.exclude.test('/' + path);
      });
    }

    return resultFiles;
  }

  _filterByArch(inputFiles, arch) {
    check(arch, String);
    /**
     * Include only typings that current arch needs,
     * typings/main is for the server only and
     * typings/browser - for the client.
     */

    const filterRegExp = /^web/.test(arch) ? exlWebRegExp : exlMainRegExp;
    inputFiles = inputFiles.filter(inputFile => {
      const path = inputFile.getPathInPackage();
      return !filterRegExp.test('/' + path);
    });
    return inputFiles;
  }

};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"typescript.js":function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/barbatus_typescript-compiler/typescript.js                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
const meteorTS = Npm.require('meteor-typescript');

TypeScript = {
  validateOptions(options) {
    if (!options) return;
    meteorTS.validateAndConvertOptions(options);
  },

  // Extra options are the same compiler options
  // but passed in the compiler constructor.
  validateExtraOptions(options) {
    if (!options) return;
    meteorTS.validateAndConvertOptions({
      compilerOptions: options
    });
  },

  getDefaultOptions: meteorTS.getDefaultOptions,

  compile(source, options) {
    options = options || meteorTS.getDefaultOptions();
    return meteorTS.compile(source, options);
  },

  setCacheDir(cacheDir) {
    meteorTS.setCacheDir(cacheDir);
  },

  isDeclarationFile(filePath) {
    return /^.*\.d\.ts$/.test(filePath);
  },

  removeTsExt(path) {
    return path && path.replace(/(\.tsx|\.ts)$/g, '');
  }

};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"utils.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/barbatus_typescript-compiler/utils.js                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  getShallowHash: () => getShallowHash
});

const {
  createHash
} = Npm.require('crypto');

function getShallowHash(ob) {
  const hash = createHash('sha1');
  const keys = Object.keys(ob);
  keys.sort();
  keys.forEach(key => {
    hash.update(key).update('' + ob[key]);
  });
  return hash.digest('hex');
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/barbatus:typescript-compiler/logger.js");
require("/node_modules/meteor/barbatus:typescript-compiler/file-utils.js");
require("/node_modules/meteor/barbatus:typescript-compiler/typescript-compiler.js");
require("/node_modules/meteor/barbatus:typescript-compiler/typescript.js");
require("/node_modules/meteor/barbatus:typescript-compiler/utils.js");

/* Exports */
Package._define("barbatus:typescript-compiler", {
  TypeScript: TypeScript,
  TypeScriptCompiler: TypeScriptCompiler
});

})();

//# sourceURL=meteor://💻app/packages/barbatus_typescript-compiler.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYmFyYmF0dXM6dHlwZXNjcmlwdC1jb21waWxlci9sb2dnZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2JhcmJhdHVzOnR5cGVzY3JpcHQtY29tcGlsZXIvZmlsZS11dGlscy5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYmFyYmF0dXM6dHlwZXNjcmlwdC1jb21waWxlci90eXBlc2NyaXB0LWNvbXBpbGVyLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9iYXJiYXR1czp0eXBlc2NyaXB0LWNvbXBpbGVyL3R5cGVzY3JpcHQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2JhcmJhdHVzOnR5cGVzY3JpcHQtY29tcGlsZXIvdXRpbHMuanMiXSwibmFtZXMiOlsidXRpbCIsIk5wbSIsInJlcXVpcmUiLCJMb2dnZXJfIiwiY29uc3RydWN0b3IiLCJsbGV2ZWwiLCJwcm9jZXNzIiwiZW52IiwiVFlQRVNDUklQVF9MT0ciLCJuZXdQcm9maWxlciIsIm5hbWUiLCJwcm9maWxlciIsIlByb2ZpbGVyIiwiaXNQcm9maWxlIiwic3RhcnQiLCJpc0RlYnVnIiwiaXNBc3NlcnQiLCJsb2ciLCJtc2ciLCJhcmdzIiwiY29uc29sZSIsImFwcGx5IiwiY29uY2F0IiwiZGVidWciLCJhc3NlcnQiLCJMb2dnZXIiLCJ0aW1lIiwiZm9ybWF0IiwiX3N0YXJ0ZWQiLCJlbmQiLCJ0aW1lRW5kIiwibW9kdWxlIiwiZXhwb3J0IiwiaXNCYXJlIiwiaXNNYWluQ29uZmlnIiwiaXNDb25maWciLCJpc1NlcnZlckNvbmZpZyIsImlzRGVjbGFyYXRpb24iLCJpc1dlYiIsImdldEV4dGVuZGVkUGF0aCIsImdldEVTNk1vZHVsZU5hbWUiLCJXYXJuTWl4aW4iLCJleHRlbmRGaWxlcyIsImNvbG9ycyIsImlucHV0RmlsZSIsImZpbGVPcHRpb25zIiwiZ2V0RmlsZU9wdGlvbnMiLCJiYXJlIiwiZmlsZVBhdGgiLCJnZXRQYXRoSW5QYWNrYWdlIiwidGVzdCIsIlR5cGVTY3JpcHQiLCJpc0RlY2xhcmF0aW9uRmlsZSIsImdldEJhc2VuYW1lIiwiYXJjaCIsImdldEFyY2giLCJwYWNrYWdlTmFtZSIsImdldFBhY2thZ2VOYW1lIiwicmVwbGFjZSIsImlucHV0RmlsZVBhdGgiLCJleHRlbmRlZCIsInJlbW92ZVRzRXh0Iiwid2FybiIsImVycm9yIiwic291cmNlUGF0aCIsImxpbmUiLCJjb2x1bW4iLCJtZXNzYWdlIiwibG9nRXJyb3IiLCJyZWQiLCJpbnB1dEZpbGVzIiwiZmlsZU1peGluIiwiZm9yRWFjaCIsIl8iLCJkZWZhdWx0cyIsIm1vZHVsZTEiLCJsaW5rIiwidiIsImdldFNoYWxsb3dIYXNoIiwiYXN5bmMiLCJwYXRoIiwiZnMiLCJGdXR1cmUiLCJUU0J1aWxkIiwidmFsaWRhdGVUc0NvbmZpZyIsImdldEV4Y2x1ZGVSZWdFeHAiLCJjcmVhdGVIYXNoIiwiZGVmRXhjbHVkZSIsIlJlZ0V4cCIsImV4bFdlYlJlZ0V4cCIsImV4bE1haW5SZWdFeHAiLCJDT01QSUxFUl9SRUdFWFAiLCJUU19SRUdFWFAiLCJUeXBlU2NyaXB0Q29tcGlsZXIiLCJleHRyYU9wdGlvbnMiLCJtYXhQYXJhbGxlbGlzbSIsInZhbGlkYXRlRXh0cmFPcHRpb25zIiwic2VydmVyT3B0aW9ucyIsInRzY29uZmlnIiwiZ2V0RGVmYXVsdE9wdGlvbnMiLCJjZmdIYXNoIiwiZGlhZ0hhc2giLCJTZXQiLCJhcmNoU2V0IiwiZ2V0RmlsZXNUb1Byb2Nlc3MiLCJwZXhjbHVkZSIsIl9maWx0ZXJCeURlZmF1bHQiLCJfcHJvY2Vzc0NvbmZpZyIsIl9maWx0ZXJCeUNvbmZpZyIsImxlbmd0aCIsIl9maWx0ZXJCeUFyY2giLCJnZXRCdWlsZE9wdGlvbnMiLCJjb21waWxlck9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0eXBpbmdzIiwidXNlQ2FjaGUiLCJwcm9jZXNzRmlsZXNGb3JUYXJnZXQiLCJnZXREZXBzQ29udGVudCIsIm9wdGlvbnMiLCJwY29tcGlsZSIsImZpbGVQYXRocyIsIm1hcCIsImZpbGUiLCJwYnVpbGQiLCJkZWZhdWx0R2V0IiwiX2dldENvbnRlbnRHZXR0ZXIiLCJnZXRDb250ZW50IiwidHNCdWlsZCIsInBmaWxlcyIsImZ1dHVyZSIsImNvbXBpbGVGaWxlcyIsImZpbHRlciIsInRocm93U3ludGF4IiwicmVzdWx0cyIsIk1hcCIsImVhY2hMaW1pdCIsImRvbmUiLCJjbyIsInBlbWl0IiwicmVzdWx0IiwiZW1pdCIsInNldCIsIl9wcm9jZXNzRGlhZ25vc3RpY3MiLCJkaWFnbm9zdGljcyIsInJlc29sdmVyIiwid2FpdCIsIl9hZGRKYXZhU2NyaXB0IiwiZmlsZXNNYXAiLCJpbmRleCIsImdldCIsInVuZGVmaW5lZCIsImZpbGVQYXRoTm9Sb290U2xhc2giLCJnZXRDb250ZW50c0FzU3RyaW5nIiwidHNSZXN1bHQiLCJmb3JjZUJhcmUiLCJzb3VyY2UiLCJpbnB1dFBhdGgiLCJvdXRwdXRQYXRoIiwidG9CZUFkZGVkIiwiZGF0YSIsImNvZGUiLCJoYXNoIiwic291cmNlTWFwIiwiYWRkSmF2YVNjcmlwdCIsInRzT3B0aW9ucyIsInJlZHVjZSIsImRpYWdub3N0aWMiLCJjYiIsImRvYiIsImFkZCIsInNob3duIiwia2V5Iiwia2V5cyIsImhhcyIsInN5bnRhY3RpY0Vycm9ycyIsInNlbWFudGljRXJyb3JzIiwiX2dldEZpbGVNb2R1bGVOYW1lIiwidHNGaWxlcyIsImdldFNvdXJjZUhhc2giLCJfcGFyc2VDb25maWciLCJ0YXJnZXQiLCJsaWIiLCJjZmdDb250ZW50IiwiSlNPTiIsInBhcnNlIiwiZmlsZXMiLCJlcnIiLCJFcnJvciIsImV4Y2x1ZGUiLCJyZWdFeHAiLCJyZXN1bHRGaWxlcyIsImNoZWNrIiwiU3RyaW5nIiwiZmlsdGVyUmVnRXhwIiwibWV0ZW9yVFMiLCJ2YWxpZGF0ZU9wdGlvbnMiLCJ2YWxpZGF0ZUFuZENvbnZlcnRPcHRpb25zIiwiY29tcGlsZSIsInNldENhY2hlRGlyIiwiY2FjaGVEaXIiLCJv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USxDQUFDSSxXQUFULENBQXFCQyxRQUFyQjtBQUNELEdBMUJVOztBQTRCWHBKLG1CQUFpQixDQUFDSixRQUFELEVBQVc7QUFDMUIsV0FBTyxjQUFjRSxJQUFkLENBQW1CRixRQUFuQixDQUFQO0FBQ0QsR0E5QlU7O0FBZ0NYYSxhQUFXLENBQUNtQixJQUFELEVBQU87QUFDaEIsV0FBT0EsSUFBSSxJQUFJQSxJQUFJLENBQUN0QixPQUFMLENBQWEsZ0JBQWIsRUFBK0IsRUFBL0IsQ0FBZjtBQUNEOztBQWxDVSxDQUFiLEM7Ozs7Ozs7Ozs7O0FDRkEzQixNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUFDOEMsZ0JBQWMsRUFBQyxNQUFJQTtBQUFwQixDQUFkOztBQUFBLE1BQU07QUFBQ1E7QUFBRCxJQUFlckYsR0FBRyxDQUFDQyxPQUFKLENBQVksUUFBWixDQUFyQjs7QUFFTyxTQUFTNEUsY0FBVCxDQUF3QjJILEVBQXhCLEVBQTRCO0FBQ2pDLFFBQU12QyxJQUFJLEdBQUc1RSxVQUFVLENBQUMsTUFBRCxDQUF2QjtBQUNBLFFBQU11RixJQUFJLEdBQUc1RCxNQUFNLENBQUM0RCxJQUFQLENBQVk0QixFQUFaLENBQWI7QUFDQTVCLE1BQUksQ0FBQzZCLElBQUw7QUFFQTdCLE1BQUksQ0FBQ3JHLE9BQUwsQ0FBYW9HLEdBQUcsSUFBSTtBQUNsQlYsUUFBSSxDQUFDeUMsTUFBTCxDQUFZL0IsR0FBWixFQUFpQitCLE1BQWpCLENBQXdCLEtBQUtGLEVBQUUsQ0FBQzdCLEdBQUQsQ0FBL0I7QUFDRCxHQUZEO0FBSUEsU0FBT1YsSUFBSSxDQUFDMEMsTUFBTCxDQUFZLEtBQVosQ0FBUDtBQUNELEMiLCJmaWxlIjoiL3BhY2thZ2VzL2JhcmJhdHVzX3R5cGVzY3JpcHQtY29tcGlsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB1dGlsID0gTnBtLnJlcXVpcmUoJ3V0aWwnKTtcblxuY2xhc3MgTG9nZ2VyXyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGxldmVsID0gcHJvY2Vzcy5lbnYuVFlQRVNDUklQVF9MT0c7XG4gIH1cblxuICBuZXdQcm9maWxlcihuYW1lKSB7XG4gICAgbGV0IHByb2ZpbGVyID0gbmV3IFByb2ZpbGVyKG5hbWUpO1xuICAgIGlmICh0aGlzLmlzUHJvZmlsZSkgcHJvZmlsZXIuc3RhcnQoKTtcbiAgICByZXR1cm4gcHJvZmlsZXI7XG4gIH1cblxuICBnZXQgaXNEZWJ1ZygpIHtcbiAgICByZXR1cm4gdGhpcy5sbGV2ZWwgPj0gMjtcbiAgfVxuXG4gIGdldCBpc1Byb2ZpbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubGxldmVsID49IDM7XG4gIH1cblxuICBnZXQgaXNBc3NlcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubGxldmVsID49IDQ7XG4gIH1cblxuICBsb2cobXNnLCAuLi5hcmdzKSB7XG4gICAgaWYgKHRoaXMubGxldmVsID49IDEpIHtcbiAgICAgIGNvbnNvbGUubG9nLmFwcGx5KG51bGwsIFttc2ddLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9XG5cbiAgZGVidWcobXNnLCAuLi5hcmdzKSB7XG4gICAgaWYgKHRoaXMuaXNEZWJ1Zykge1xuICAgICAgdGhpcy5sb2cuYXBwbHkodGhpcywgbXNnLCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICBhc3NlcnQobXNnLCAuLi5hcmdzKSB7XG4gICAgaWYgKHRoaXMuaXNBc3NlcnQpIHtcbiAgICAgIHRoaXMubG9nLmFwcGx5KHRoaXMsIG1zZywgYXJncyk7XG4gICAgfVxuICB9XG59O1xuXG5Mb2dnZXIgPSBuZXcgTG9nZ2VyXygpO1xuXG5jbGFzcyBQcm9maWxlciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgY29uc29sZS5sb2coJyVzIHN0YXJ0ZWQnLCB0aGlzLm5hbWUpO1xuICAgIGNvbnNvbGUudGltZSh1dGlsLmZvcm1hdCgnJXMgdGltZScsIHRoaXMubmFtZSkpO1xuICAgIHRoaXMuX3N0YXJ0ZWQgPSB0cnVlO1xuICB9XG5cbiAgZW5kKCkge1xuICAgIGlmICh0aGlzLl9zdGFydGVkKSB7XG4gICAgICBjb25zb2xlLnRpbWVFbmQodXRpbC5mb3JtYXQoJyVzIHRpbWUnLCB0aGlzLm5hbWUpKTtcbiAgICB9XG4gIH1cbn1cbiIsImNvbnN0IGNvbG9ycyA9IE5wbS5yZXF1aXJlKCdjb2xvcnMnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFyZShpbnB1dEZpbGUpIHtcbiAgY29uc3QgZmlsZU9wdGlvbnMgPSBpbnB1dEZpbGUuZ2V0RmlsZU9wdGlvbnMoKTtcbiAgcmV0dXJuIGZpbGVPcHRpb25zICYmIGZpbGVPcHRpb25zLmJhcmU7XG59XG5cbi8vIEdldHMgcm9vdCBhcHAgdHNjb25maWcuXG5leHBvcnQgZnVuY3Rpb24gaXNNYWluQ29uZmlnKGlucHV0RmlsZSkge1xuICBpZiAoISBpc1dlYihpbnB1dEZpbGUpKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgZmlsZVBhdGggPSBpbnB1dEZpbGUuZ2V0UGF0aEluUGFja2FnZSgpO1xuICByZXR1cm4gL150c2NvbmZpZ1xcLmpzb24kLy50ZXN0KGZpbGVQYXRoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29uZmlnKGlucHV0RmlsZSkge1xuICBjb25zdCBmaWxlUGF0aCA9IGlucHV0RmlsZS5nZXRQYXRoSW5QYWNrYWdlKCk7XG4gIHJldHVybiAvdHNjb25maWdcXC5qc29uJC8udGVzdChmaWxlUGF0aCk7XG59XG5cbi8vIEdldHMgc2VydmVyIHRzY29uZmlnLlxuZXhwb3J0IGZ1bmN0aW9uIGlzU2VydmVyQ29uZmlnKGlucHV0RmlsZSkge1xuICBpZiAoaXNXZWIoaW5wdXRGaWxlKSkgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGZpbGVQYXRoID0gaW5wdXRGaWxlLmdldFBhdGhJblBhY2thZ2UoKTtcbiAgcmV0dXJuIC9ec2VydmVyXFwvdHNjb25maWdcXC5qc29uJC8udGVzdChmaWxlUGF0aCk7XG59XG5cbi8vIENoZWNrcyBpZiBpdCdzIC5kLnRzLWZpbGUuXG5leHBvcnQgZnVuY3Rpb24gaXNEZWNsYXJhdGlvbihpbnB1dEZpbGUpIHtcbiAgcmV0dXJuIFR5cGVTY3JpcHQuaXNEZWNsYXJhdGlvbkZpbGUoaW5wdXRGaWxlLmdldEJhc2VuYW1lKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNXZWIoaW5wdXRGaWxlKSB7XG4gIGNvbnN0IGFyY2ggPSBpbnB1dEZpbGUuZ2V0QXJjaCgpO1xuICByZXR1cm4gL153ZWIvLnRlc3QoYXJjaCk7XG59XG5cbi8vIEdldHMgcGF0aCB3aXRoIHBhY2thZ2UgcHJlZml4IGlmIGFueS5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFeHRlbmRlZFBhdGgoaW5wdXRGaWxlKSB7XG4gIGxldCBwYWNrYWdlTmFtZSA9IGlucHV0RmlsZS5nZXRQYWNrYWdlTmFtZSgpO1xuICBwYWNrYWdlTmFtZSA9IHBhY2thZ2VOYW1lID9cbiAgICAocGFja2FnZU5hbWUucmVwbGFjZSgnOicsICdfJykgKyAnLycpIDogJyc7XG4gIGNvbnN0IGlucHV0RmlsZVBhdGggPSBpbnB1dEZpbGUuZ2V0UGF0aEluUGFja2FnZSgpO1xuICByZXR1cm4gcGFja2FnZU5hbWUgKyBpbnB1dEZpbGVQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RVM2TW9kdWxlTmFtZShpbnB1dEZpbGUpIHtcbiAgY29uc3QgZXh0ZW5kZWQgPSBnZXRFeHRlbmRlZFBhdGgoaW5wdXRGaWxlKTtcbiAgcmV0dXJuIFR5cGVTY3JpcHQucmVtb3ZlVHNFeHQoZXh0ZW5kZWQpO1xufVxuXG5leHBvcnQgY29uc3QgV2Fybk1peGluID0ge1xuICB3YXJuKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coYCR7ZXJyb3Iuc291cmNlUGF0aH0gKCR7ZXJyb3IubGluZX0sICR7ZXJyb3IuY29sdW1ufSk6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgfSxcbiAgbG9nRXJyb3IoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhjb2xvcnMucmVkKFxuICAgICAgYCR7ZXJyb3Iuc291cmNlUGF0aH0gKCR7ZXJyb3IubGluZX0sICR7ZXJyb3IuY29sdW1ufSk6ICR7ZXJyb3IubWVzc2FnZX1gKSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZEZpbGVzKGlucHV0RmlsZXMsIGZpbGVNaXhpbikge1xuICBpbnB1dEZpbGVzLmZvckVhY2goaW5wdXRGaWxlID0+IF8uZGVmYXVsdHMoaW5wdXRGaWxlLCBmaWxlTWl4aW4pKTtcbn1cbiIsImNvbnN0IGFzeW5jID0gTnBtLnJlcXVpcmUoJ2FzeW5jJyk7XG5jb25zdCBwYXRoID0gTnBtLnJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGZzID0gTnBtLnJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBGdXR1cmUgPSBOcG0ucmVxdWlyZSgnZmliZXJzL2Z1dHVyZScpO1xuXG5jb25zdCB7XG4gIFRTQnVpbGQsXG4gIHZhbGlkYXRlVHNDb25maWcsXG4gIGdldEV4Y2x1ZGVSZWdFeHAsXG59ID0gTnBtLnJlcXVpcmUoJ21ldGVvci10eXBlc2NyaXB0Jyk7XG5cbmNvbnN0IHtjcmVhdGVIYXNofSA9IE5wbS5yZXF1aXJlKCdjcnlwdG8nKTtcblxuaW1wb3J0IHtcbiAgZ2V0RXh0ZW5kZWRQYXRoLFxuICBpc0RlY2xhcmF0aW9uLFxuICBpc0NvbmZpZyxcbiAgaXNNYWluQ29uZmlnLFxuICBpc1NlcnZlckNvbmZpZyxcbiAgaXNCYXJlLFxuICBnZXRFUzZNb2R1bGVOYW1lLFxuICBXYXJuTWl4aW4sXG4gIGV4dGVuZEZpbGVzLFxuICBpc1dlYixcbn0gZnJvbSAnLi9maWxlLXV0aWxzJztcblxuaW1wb3J0IHtcbiAgZ2V0U2hhbGxvd0hhc2gsXG59IGZyb20gJy4vdXRpbHMnO1xuXG4vLyBEZWZhdWx0IGV4Y2x1ZGUgcGF0aHMuXG5jb25zdCBkZWZFeGNsdWRlID0gbmV3IFJlZ0V4cChcbiAgZ2V0RXhjbHVkZVJlZ0V4cChbJ25vZGVfbW9kdWxlcy8qKiddKSk7XG5cbi8vIFdoYXQgdG8gZXhjbHVkZSB3aGVuIGNvbXBpbGluZyBmb3IgdGhlIHNlcnZlci5cbi8vIHR5cGluZ3MvbWFpbiBhbmQgdHlwaW5ncy9icm93c2VyIHNlZW0gdG8gYmUgbm90IHVzZWRcbi8vIGF0IGFsbCBidXQgbGV0IGtlZXAgdGhlbSBmb3IganVzdCBpbiBjYXNlLlxuY29uc3QgZXhsV2ViUmVnRXhwID0gbmV3IFJlZ0V4cChcbiAgZ2V0RXhjbHVkZVJlZ0V4cChbJ3R5cGluZ3MvbWFpbi8qKicsICd0eXBpbmdzL21haW4uZC50cyddKSk7XG5cbi8vIFdoYXQgdG8gZXhjbHVkZSB3aGVuIGNvbXBpbGluZyBmb3IgdGhlIGNsaWVudC5cbmNvbnN0IGV4bE1haW5SZWdFeHAgPSBuZXcgUmVnRXhwKFxuICBnZXRFeGNsdWRlUmVnRXhwKFsndHlwaW5ncy9icm93c2VyLyoqJywgJ3R5cGluZ3MvYnJvd3Nlci5kLnRzJ10pKTtcblxuY29uc3QgQ09NUElMRVJfUkVHRVhQID0gLyhcXC5kLnRzfFxcLnRzfFxcLnRzeHxcXC50c2NvbmZpZykkLztcblxuY29uc3QgVFNfUkVHRVhQID0gLyhcXC50c3xcXC50c3gpJC87XG5cblR5cGVTY3JpcHRDb21waWxlciA9IGNsYXNzIFR5cGVTY3JpcHRDb21waWxlciB7XG4gIGNvbnN0cnVjdG9yKGV4dHJhT3B0aW9ucywgbWF4UGFyYWxsZWxpc20pIHtcbiAgICBUeXBlU2NyaXB0LnZhbGlkYXRlRXh0cmFPcHRpb25zKGV4dHJhT3B0aW9ucyk7XG5cbiAgICB0aGlzLmV4dHJhT3B0aW9ucyA9IGV4dHJhT3B0aW9ucztcbiAgICB0aGlzLm1heFBhcmFsbGVsaXNtID0gbWF4UGFyYWxsZWxpc20gfHwgMTA7XG4gICAgdGhpcy5zZXJ2ZXJPcHRpb25zID0gbnVsbDtcbiAgICB0aGlzLnRzY29uZmlnID0gVHlwZVNjcmlwdC5nZXREZWZhdWx0T3B0aW9ucygpO1xuICAgIHRoaXMuY2ZnSGFzaCA9IG51bGw7XG4gICAgdGhpcy5kaWFnSGFzaCA9IG5ldyBTZXQ7XG4gICAgdGhpcy5hcmNoU2V0ID0gbmV3IFNldDtcbiAgfVxuXG4gIGdldEZpbGVzVG9Qcm9jZXNzKGlucHV0RmlsZXMpIHtcbiAgICBjb25zdCBwZXhjbHVkZSA9IExvZ2dlci5uZXdQcm9maWxlcignZXhjbHVkZScpO1xuXG4gICAgaW5wdXRGaWxlcyA9IHRoaXMuX2ZpbHRlckJ5RGVmYXVsdChpbnB1dEZpbGVzKTtcblxuICAgIHRoaXMuX3Byb2Nlc3NDb25maWcoaW5wdXRGaWxlcyk7XG5cbiAgICBpbnB1dEZpbGVzID0gdGhpcy5fZmlsdGVyQnlDb25maWcoaW5wdXRGaWxlcyk7XG5cbiAgICBpZiAoaW5wdXRGaWxlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGFyY2ggPSBpbnB1dEZpbGVzWzBdLmdldEFyY2goKTtcbiAgICAgIGlucHV0RmlsZXMgPSB0aGlzLl9maWx0ZXJCeUFyY2goaW5wdXRGaWxlcywgYXJjaCk7XG4gICAgfVxuXG4gICAgcGV4Y2x1ZGUuZW5kKCk7XG5cbiAgICByZXR1cm4gaW5wdXRGaWxlcztcbiAgfVxuXG4gIGdldEJ1aWxkT3B0aW9ucyhpbnB1dEZpbGVzKSB7XG4gICAgdGhpcy5fcHJvY2Vzc0NvbmZpZyhpbnB1dEZpbGVzKTtcblxuICAgIGNvbnN0IGlucHV0RmlsZSA9IGlucHV0RmlsZXNbMF07XG4gICAgbGV0IHsgY29tcGlsZXJPcHRpb25zIH0gPSB0aGlzLnRzY29uZmlnO1xuICAgIC8vIE1ha2UgYSBjb3B5LlxuICAgIGNvbXBpbGVyT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbXBpbGVyT3B0aW9ucyk7XG4gICAgaWYgKCEgaXNXZWIoaW5wdXRGaWxlKSAmJiB0aGlzLnNlcnZlck9wdGlvbnMpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oY29tcGlsZXJPcHRpb25zLCB0aGlzLnNlcnZlck9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIEFwcGx5IGV4dHJhIG9wdGlvbnMuXG4gICAgaWYgKHRoaXMuZXh0cmFPcHRpb25zKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGNvbXBpbGVyT3B0aW9ucywgdGhpcy5leHRyYU9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IGFyY2ggPSBpbnB1dEZpbGUuZ2V0QXJjaCgpO1xuICAgIGNvbnN0IHsgdHlwaW5ncywgdXNlQ2FjaGUgfSA9IHRoaXMudHNjb25maWc7XG4gICAgcmV0dXJuIHsgYXJjaCwgY29tcGlsZXJPcHRpb25zLCB0eXBpbmdzLCB1c2VDYWNoZSB9O1xuICB9XG5cbiAgcHJvY2Vzc0ZpbGVzRm9yVGFyZ2V0KGlucHV0RmlsZXMsIGdldERlcHNDb250ZW50KSB7XG4gICAgZXh0ZW5kRmlsZXMoaW5wdXRGaWxlcywgV2Fybk1peGluKTtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldEJ1aWxkT3B0aW9ucyhpbnB1dEZpbGVzKTtcbiAgICBMb2dnZXIubG9nKCdjb21waWxlciBvcHRpb25zOiAlaicsIG9wdGlvbnMuY29tcGlsZXJPcHRpb25zKTtcblxuICAgIGlucHV0RmlsZXMgPSB0aGlzLmdldEZpbGVzVG9Qcm9jZXNzKGlucHV0RmlsZXMpO1xuXG4gICAgaWYgKCEgaW5wdXRGaWxlcy5sZW5ndGgpIHJldHVybjtcblxuICAgIGNvbnN0IHBjb21waWxlID0gTG9nZ2VyLm5ld1Byb2ZpbGVyKCdjb21waWxhdGlvbicpO1xuICAgIGNvbnN0IGZpbGVQYXRocyA9IGlucHV0RmlsZXMubWFwKGZpbGUgPT4gZ2V0RXh0ZW5kZWRQYXRoKGZpbGUpKTtcbiAgICBMb2dnZXIubG9nKCdjb21waWxlIGZpbGVzOiAlcycsIGZpbGVQYXRocyk7XG5cbiAgICBjb25zdCBwYnVpbGQgPSBMb2dnZXIubmV3UHJvZmlsZXIoJ3RzQnVpbGQnKTtcbiAgICBjb25zdCBkZWZhdWx0R2V0ID0gdGhpcy5fZ2V0Q29udGVudEdldHRlcihpbnB1dEZpbGVzKTtcbiAgICBjb25zdCBnZXRDb250ZW50ID0gZmlsZVBhdGggPT5cbiAgICAgIChnZXREZXBzQ29udGVudCAmJiBnZXREZXBzQ29udGVudChmaWxlUGF0aCkpIHx8IGRlZmF1bHRHZXQoZmlsZVBhdGgpO1xuICAgIGNvbnN0IHRzQnVpbGQgPSBuZXcgVFNCdWlsZChmaWxlUGF0aHMsIGdldENvbnRlbnQsIG9wdGlvbnMpO1xuICAgIHBidWlsZC5lbmQoKTtcblxuICAgIGNvbnN0IHBmaWxlcyA9IExvZ2dlci5uZXdQcm9maWxlcigndHNFbWl0RmlsZXMnKTtcbiAgICBjb25zdCBmdXR1cmUgPSBuZXcgRnV0dXJlO1xuICAgIC8vIERvbid0IGVtaXQgdHlwaW5ncy5cbiAgICBjb25zdCBjb21waWxlRmlsZXMgPSBpbnB1dEZpbGVzLmZpbHRlcihmaWxlID0+ICEgaXNEZWNsYXJhdGlvbihmaWxlKSk7XG4gICAgbGV0IHRocm93U3ludGF4ID0gZmFsc2U7XG4gICAgY29uc3QgcmVzdWx0cyA9IG5ldyBNYXAoKTtcbiAgICBhc3luYy5lYWNoTGltaXQoY29tcGlsZUZpbGVzLCB0aGlzLm1heFBhcmFsbGVsaXNtLCAoZmlsZSwgZG9uZSkgPT4ge1xuICAgICAgY29uc3QgY28gPSBvcHRpb25zLmNvbXBpbGVyT3B0aW9ucztcblxuICAgICAgY29uc3QgZmlsZVBhdGggPSBnZXRFeHRlbmRlZFBhdGgoZmlsZSk7XG4gICAgICBjb25zdCBwZW1pdCA9IExvZ2dlci5uZXdQcm9maWxlcigndHNFbWl0Jyk7XG4gICAgICBjb25zdCByZXN1bHQgPSB0c0J1aWxkLmVtaXQoZmlsZVBhdGgpO1xuICAgICAgcmVzdWx0cy5zZXQoZmlsZSwgcmVzdWx0KTtcbiAgICAgIHBlbWl0LmVuZCgpO1xuXG4gICAgICB0aHJvd1N5bnRheCA9IHRocm93U3ludGF4IHwgXG4gICAgICAgIHRoaXMuX3Byb2Nlc3NEaWFnbm9zdGljcyhmaWxlLCByZXN1bHQuZGlhZ25vc3RpY3MsIGNvKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0sIGZ1dHVyZS5yZXNvbHZlcigpKTtcblxuICAgIHBmaWxlcy5lbmQoKTtcblxuICAgIGZ1dHVyZS53YWl0KCk7XG5cbiAgICBpZiAoISB0aHJvd1N5bnRheCkge1xuICAgICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQsIGZpbGUpID0+IHtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gb3B0aW9ucy5jb21waWxlck9wdGlvbnMubW9kdWxlO1xuICAgICAgICB0aGlzLl9hZGRKYXZhU2NyaXB0KGZpbGUsIHJlc3VsdCwgbW9kdWxlID09PSAnbm9uZScpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGNvbXBpbGUuZW5kKCk7XG4gIH1cblxuICBfZ2V0Q29udGVudEdldHRlcihpbnB1dEZpbGVzKSB7XG4gICAgY29uc3QgZmlsZXNNYXAgPSBuZXcgTWFwO1xuICAgIGlucHV0RmlsZXMuZm9yRWFjaCgoaW5wdXRGaWxlLCBpbmRleCkgPT4ge1xuICAgICAgZmlsZXNNYXAuc2V0KGdldEV4dGVuZGVkUGF0aChpbnB1dEZpbGUpLCBpbmRleCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGggPT4ge1xuICAgICAgbGV0IGluZGV4ID0gZmlsZXNNYXAuZ2V0KGZpbGVQYXRoKTtcbiAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGZpbGVQYXRoTm9Sb290U2xhc2ggPSBmaWxlUGF0aC5yZXBsYWNlKC9eXFwvLywgJycpO1xuICAgICAgICBpbmRleCA9IGZpbGVzTWFwLmdldChmaWxlUGF0aE5vUm9vdFNsYXNoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbmRleCAhPT0gdW5kZWZpbmVkID9cbiAgICAgICAgaW5wdXRGaWxlc1tpbmRleF0uZ2V0Q29udGVudHNBc1N0cmluZygpIDogbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgX2FkZEphdmFTY3JpcHQoaW5wdXRGaWxlLCB0c1Jlc3VsdCwgZm9yY2VCYXJlKSB7XG4gICAgY29uc3Qgc291cmNlID0gaW5wdXRGaWxlLmdldENvbnRlbnRzQXNTdHJpbmcoKTtcbiAgICBjb25zdCBpbnB1dFBhdGggPSBpbnB1dEZpbGUuZ2V0UGF0aEluUGFja2FnZSgpO1xuICAgIGNvbnN0IG91dHB1dFBhdGggPSBUeXBlU2NyaXB0LnJlbW92ZVRzRXh0KGlucHV0UGF0aCkgKyAnLmpzJztcbiAgICBjb25zdCB0b0JlQWRkZWQgPSB7XG4gICAgICBzb3VyY2VQYXRoOiBpbnB1dFBhdGgsXG4gICAgICBwYXRoOiBvdXRwdXRQYXRoLFxuICAgICAgZGF0YTogdHNSZXN1bHQuY29kZSxcbiAgICAgIGhhc2g6IHRzUmVzdWx0Lmhhc2gsXG4gICAgICBzb3VyY2VNYXA6IHRzUmVzdWx0LnNvdXJjZU1hcCxcbiAgICAgIGJhcmU6IGZvcmNlQmFyZSB8fCBpc0JhcmUoaW5wdXRGaWxlKVxuICAgIH07XG4gICAgaW5wdXRGaWxlLmFkZEphdmFTY3JpcHQodG9CZUFkZGVkKTtcbiAgfVxuXG4gIF9wcm9jZXNzRGlhZ25vc3RpY3MoaW5wdXRGaWxlLCBkaWFnbm9zdGljcywgdHNPcHRpb25zKSB7XG4gICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZWQgd2FybmluZ3MgZm9yIHNoYXJlZCBmaWxlc1xuICAgIC8vIGJ5IHNhdmluZyBoYXNoZXMgb2YgYWxyZWFkeSBzaG93biB3YXJuaW5ncy5cbiAgICBjb25zdCByZWR1Y2UgPSAoZGlhZ25vc3RpYywgY2IpID0+IHtcbiAgICAgIGxldCBkb2IgPSB7XG4gICAgICAgIG1lc3NhZ2U6IGRpYWdub3N0aWMubWVzc2FnZSxcbiAgICAgICAgc291cmNlUGF0aDogZ2V0RXh0ZW5kZWRQYXRoKGlucHV0RmlsZSksXG4gICAgICAgIGxpbmU6IGRpYWdub3N0aWMubGluZSxcbiAgICAgICAgY29sdW1uOiBkaWFnbm9zdGljLmNvbHVtblxuICAgICAgfTtcbiAgICAgIGNvbnN0IGFyY2ggPSBpbnB1dEZpbGUuZ2V0QXJjaCgpO1xuICAgICAgLy8gVE9ETzogZmluZCBvdXQgaG93IHRvIGdldCBsaXN0IG9mIGFyY2hpdGVjdHVyZXMuXG4gICAgICB0aGlzLmFyY2hTZXQuYWRkKGFyY2gpO1xuXG4gICAgICBsZXQgc2hvd24gPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMuYXJjaFNldC5rZXlzKCkpIHtcbiAgICAgICAgaWYgKGtleSAhPT0gYXJjaCkge1xuICAgICAgICAgIGRvYi5hcmNoID0ga2V5O1xuICAgICAgICAgIGNvbnN0IGhhc2ggPSBnZXRTaGFsbG93SGFzaChkb2IpO1xuICAgICAgICAgIGlmICh0aGlzLmRpYWdIYXNoLmhhcyhoYXNoKSkge1xuICAgICAgICAgICAgc2hvd24gPSB0cnVlOyBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCEgc2hvd24pIHtcbiAgICAgICAgZG9iLmFyY2ggPSBhcmNoO1xuICAgICAgICBjb25zdCBoYXNoID0gZ2V0U2hhbGxvd0hhc2goZG9iKTtcbiAgICAgICAgdGhpcy5kaWFnSGFzaC5hZGQoaGFzaCk7XG4gICAgICAgIGNiKGRvYik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWx3YXlzIHRocm93IHN5bnRheCBlcnJvcnMuXG4gICAgY29uc3QgdGhyb3dTeW50YXggPSAhISBkaWFnbm9zdGljcy5zeW50YWN0aWNFcnJvcnMubGVuZ3RoO1xuICAgIGRpYWdub3N0aWNzLnN5bnRhY3RpY0Vycm9ycy5mb3JFYWNoKGRpYWdub3N0aWMgPT4ge1xuICAgICAgcmVkdWNlKGRpYWdub3N0aWMsIGRvYiA9PiB7XG4gICAgICAgIGlucHV0RmlsZS5lcnJvcihkb2IpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYWNrYWdlTmFtZSA9IGlucHV0RmlsZS5nZXRQYWNrYWdlTmFtZSgpO1xuICAgIGlmIChwYWNrYWdlTmFtZSkgcmV0dXJuIHRocm93U3ludGF4O1xuXG4gICAgLy8gQW5kIGxvZyBvdXQgb3RoZXIgZXJyb3JzIGV4Y2VwdCBwYWNrYWdlIGZpbGVzLlxuICAgIGlmICh0c09wdGlvbnMgJiYgdHNPcHRpb25zLmRpYWdub3N0aWNzKSB7XG4gICAgICBkaWFnbm9zdGljcy5zZW1hbnRpY0Vycm9ycy5mb3JFYWNoKGRpYWdub3N0aWMgPT4ge1xuICAgICAgICByZWR1Y2UoZGlhZ25vc3RpYywgZG9iID0+IGlucHV0RmlsZS53YXJuKGRvYikpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRocm93U3ludGF4O1xuICB9XG5cbiAgX2dldEZpbGVNb2R1bGVOYW1lKGlucHV0RmlsZSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLm1vZHVsZSA9PT0gJ25vbmUnKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiBnZXRFUzZNb2R1bGVOYW1lKGlucHV0RmlsZSk7XG4gIH1cblxuICBfcHJvY2Vzc0NvbmZpZyhpbnB1dEZpbGVzKSB7XG4gICAgY29uc3QgdHNGaWxlcyA9IGlucHV0RmlsZXNcbiAgICAgIC5tYXAoaW5wdXRGaWxlID0+IGlucHV0RmlsZS5nZXRQYXRoSW5QYWNrYWdlKCkpXG4gICAgICAuZmlsdGVyKGZpbGVQYXRoID0+IFRTX1JFR0VYUC50ZXN0KGZpbGVQYXRoKSk7XG5cbiAgICBmb3IgKGNvbnN0IGlucHV0RmlsZSBvZiBpbnB1dEZpbGVzKSB7XG4gICAgICAvLyBQYXJzZSByb290IGNvbmZpZy5cbiAgICAgIGlmIChpc01haW5Db25maWcoaW5wdXRGaWxlKSkge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBpbnB1dEZpbGUuZ2V0Q29udGVudHNBc1N0cmluZygpO1xuICAgICAgICBjb25zdCBoYXNoID0gaW5wdXRGaWxlLmdldFNvdXJjZUhhc2goKTtcbiAgICAgICAgLy8gSWYgaGFzaGVzIGRpZmZlciwgY3JlYXRlIG5ldyB0c2NvbmZpZy4gXG4gICAgICAgIGlmIChoYXNoICE9PSB0aGlzLmNmZ0hhc2gpIHtcbiAgICAgICAgICB0aGlzLnRzY29uZmlnID0gdGhpcy5fcGFyc2VDb25maWcoc291cmNlLCB0c0ZpbGVzKTtcbiAgICAgICAgICB0aGlzLmNmZ0hhc2ggPSBoYXNoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUGFyc2Ugc2VydmVyIGNvbmZpZy5cbiAgICAgIC8vIFRha2Ugb25seSB0YXJnZXQgYW5kIGxpYiB2YWx1ZXMuXG4gICAgICBpZiAoaXNTZXJ2ZXJDb25maWcoaW5wdXRGaWxlKSkge1xuICAgICAgICBjb25zdCAgc291cmNlID0gaW5wdXRGaWxlLmdldENvbnRlbnRzQXNTdHJpbmcoKTtcbiAgICAgICAgY29uc3QgeyBjb21waWxlck9wdGlvbnMgfSA9IHRoaXMuX3BhcnNlQ29uZmlnKHNvdXJjZSwgdHNGaWxlcyk7XG4gICAgICAgIGlmIChjb21waWxlck9wdGlvbnMpIHtcbiAgICAgICAgICBjb25zdCB7IHRhcmdldCwgbGliIH0gPSBjb21waWxlck9wdGlvbnM7XG4gICAgICAgICAgdGhpcy5zZXJ2ZXJPcHRpb25zID0geyB0YXJnZXQsIGxpYiB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfcGFyc2VDb25maWcoY2ZnQ29udGVudCwgdHNGaWxlcykge1xuICAgIGxldCB0c2NvbmZpZyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgdHNjb25maWcgPSBKU09OLnBhcnNlKGNmZ0NvbnRlbnQpO1xuICAgICAgLy8gRGVmaW5lIGZpbGVzIHNpbmNlIGlmIGl0J3Mgbm90IGRlZmluZWRcbiAgICAgIC8vIHZhbGlkYXRpb24gdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbiAgICAgIGNvbnN0IGZpbGVzID0gdHNjb25maWcuZmlsZXMgfHwgdHNGaWxlcztcbiAgICAgIHRzY29uZmlnLmZpbGVzID0gZmlsZXM7XG5cbiAgICAgIHZhbGlkYXRlVHNDb25maWcodHNjb25maWcpO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZvcm1hdCBvZiB0aGUgdHNjb25maWcgaXMgaW52YWxpZDogJHtlcnJ9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgZXhjbHVkZSA9IHRzY29uZmlnLmV4Y2x1ZGUgfHwgW107XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlZ0V4cCA9IGdldEV4Y2x1ZGVSZWdFeHAoZXhjbHVkZSk7XG4gICAgICB0c2NvbmZpZy5leGNsdWRlID0gcmVnRXhwICYmIG5ldyBSZWdFeHAocmVnRXhwKTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGb3JtYXQgb2YgYW4gZXhjbHVkZSBwYXRoIGlzIGludmFsaWQ6ICR7ZXJyfWApO1xuICAgIH1cblxuICAgIHJldHVybiB0c2NvbmZpZztcbiAgfVxuXG4gIF9maWx0ZXJCeURlZmF1bHQoaW5wdXRGaWxlcykge1xuICAgIGlucHV0RmlsZXMgPSBpbnB1dEZpbGVzLmZpbHRlcihpbnB1dEZpbGUgPT4ge1xuICAgICAgY29uc3QgcGF0aCA9IGlucHV0RmlsZS5nZXRQYXRoSW5QYWNrYWdlKCk7XG4gICAgICByZXR1cm4gQ09NUElMRVJfUkVHRVhQLnRlc3QocGF0aCkgJiYgISBkZWZFeGNsdWRlLnRlc3QoJy8nICsgcGF0aCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlucHV0RmlsZXM7XG4gIH1cblxuICBfZmlsdGVyQnlDb25maWcoaW5wdXRGaWxlcykge1xuICAgIGxldCByZXN1bHRGaWxlcyA9IGlucHV0RmlsZXM7XG4gICAgaWYgKHRoaXMudHNjb25maWcuZXhjbHVkZSkge1xuICAgICAgcmVzdWx0RmlsZXMgPSByZXN1bHRGaWxlcy5maWx0ZXIoaW5wdXRGaWxlID0+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9IGlucHV0RmlsZS5nZXRQYXRoSW5QYWNrYWdlKCk7XG4gICAgICAgIC8vIFRoZXJlIHNlZW1zIHRvIGFuIGlzc3VlIHdpdGggZ2V0UmVndWxhckV4cHJlc3Npb25Gb3JXaWxkY2FyZDpcbiAgICAgICAgLy8gcmVzdWx0IHJlZ2V4cCBhbHdheXMgc3RhcnRzIHdpdGggLy5cbiAgICAgICAgcmV0dXJuICEgdGhpcy50c2NvbmZpZy5leGNsdWRlLnRlc3QoJy8nICsgcGF0aCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdEZpbGVzO1xuICB9XG5cbiAgX2ZpbHRlckJ5QXJjaChpbnB1dEZpbGVzLCBhcmNoKSB7XG4gICAgY2hlY2soYXJjaCwgU3RyaW5nKTtcblxuICAgIC8qKlxuICAgICAqIEluY2x1ZGUgb25seSB0eXBpbmdzIHRoYXQgY3VycmVudCBhcmNoIG5lZWRzLFxuICAgICAqIHR5cGluZ3MvbWFpbiBpcyBmb3IgdGhlIHNlcnZlciBvbmx5IGFuZFxuICAgICAqIHR5cGluZ3MvYnJvd3NlciAtIGZvciB0aGUgY2xpZW50LlxuICAgICAqL1xuICAgIGNvbnN0IGZpbHRlclJlZ0V4cCA9IC9ed2ViLy50ZXN0KGFyY2gpID8gZXhsV2ViUmVnRXhwIDogZXhsTWFpblJlZ0V4cDtcbiAgICBpbnB1dEZpbGVzID0gaW5wdXRGaWxlcy5maWx0ZXIoaW5wdXRGaWxlID0+IHtcbiAgICAgIGNvbnN0IHBhdGggPSBpbnB1dEZpbGUuZ2V0UGF0aEluUGFja2FnZSgpO1xuICAgICAgcmV0dXJuICEgZmlsdGVyUmVnRXhwLnRlc3QoJy8nICsgcGF0aCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5wdXRGaWxlcztcbiAgfVxufVxuIiwiY29uc3QgbWV0ZW9yVFMgPSBOcG0ucmVxdWlyZSgnbWV0ZW9yLXR5cGVzY3JpcHQnKTtcblxuVHlwZVNjcmlwdCA9IHtcbiAgdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAoISBvcHRpb25zKSByZXR1cm47XG5cbiAgICBtZXRlb3JUUy52YWxpZGF0ZUFuZENvbnZlcnRPcHRpb25zKG9wdGlvbnMpO1xuICB9LFxuXG4gIC8vIEV4dHJhIG9wdGlvbnMgYXJlIHRoZSBzYW1lIGNvbXBpbGVyIG9wdGlvbnNcbiAgLy8gYnV0IHBhc3NlZCBpbiB0aGUgY29tcGlsZXIgY29uc3RydWN0b3IuXG4gIHZhbGlkYXRlRXh0cmFPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAoISBvcHRpb25zKSByZXR1cm47XG5cbiAgICBtZXRlb3JUUy52YWxpZGF0ZUFuZENvbnZlcnRPcHRpb25zKHtcbiAgICAgIGNvbXBpbGVyT3B0aW9uczogb3B0aW9uc1xuICAgIH0pO1xuICB9LFxuXG4gIGdldERlZmF1bHRPcHRpb25zOiBtZXRlb3JUUy5nZXREZWZhdWx0T3B0aW9ucyxcblxuICBjb21waWxlKHNvdXJjZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IG1ldGVvclRTLmdldERlZmF1bHRPcHRpb25zKCk7XG4gICAgcmV0dXJuIG1ldGVvclRTLmNvbXBpbGUoc291cmNlLCBvcHRpb25zKTtcbiAgfSxcblxuICBzZXRDYWNoZURpcihjYWNoZURpcikge1xuICAgIG1ldGVvclRTLnNldENhY2hlRGlyKGNhY2hlRGlyKTtcbiAgfSxcblxuICBpc0RlY2xhcmF0aW9uRmlsZShmaWxlUGF0aCkge1xuICAgIHJldHVybiAvXi4qXFwuZFxcLnRzJC8udGVzdChmaWxlUGF0aCk7XG4gIH0sXG5cbiAgcmVtb3ZlVHNFeHQocGF0aCkge1xuICAgIHJldHVybiBwYXRoICYmIHBhdGgucmVwbGFjZSgvKFxcLnRzeHxcXC50cykkL2csICcnKTtcbiAgfVxufTtcbiIsImNvbnN0IHtjcmVhdGVIYXNofSA9IE5wbS5yZXF1aXJlKCdjcnlwdG8nKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNoYWxsb3dIYXNoKG9iKSB7XG4gIGNvbnN0IGhhc2ggPSBjcmVhdGVIYXNoKCdzaGExJyk7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYik7XG4gIGtleXMuc29ydCgpO1xuXG4gIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgIGhhc2gudXBkYXRlKGtleSkudXBkYXRlKCcnICsgb2Jba2V5XSk7XG4gIH0pO1xuXG4gIHJldHVybiBoYXNoLmRpZ2VzdCgnaGV4Jyk7XG59XG4iXX0=
