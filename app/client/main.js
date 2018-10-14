(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../imports/startup/both", "../imports/startup/client", "./style.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("../imports/startup/both");
    require("../imports/startup/client");
    require("./style.css");
});
//# sourceMappingURL=main.js.map