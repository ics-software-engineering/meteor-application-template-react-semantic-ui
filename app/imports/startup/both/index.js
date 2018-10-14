(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../api/stuff"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.time('startup/both'); // tslint:disable-line
    require("../../api/stuff");
    console.timeEnd('startup/both'); // tslint:disable-line
});
//# sourceMappingURL=index.js.map