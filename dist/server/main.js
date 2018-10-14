(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../imports/startup/both", "../imports/startup/server"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.time('server/main');
    require("../imports/startup/both");
    require("../imports/startup/server");
    console.timeEnd('server/main');
});
//# sourceMappingURL=main.js.map