(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "meteor/meteor", "react", "react-dom", "../../ui/layouts/App"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var meteor_1 = require("meteor/meteor");
    var React = require("react");
    var react_dom_1 = require("react-dom");
    var App_1 = require("../../ui/layouts/App");
    /** Startup the application by rendering the App layout component. */
    meteor_1.Meteor.startup(function () {
        react_dom_1.render(React.createElement(App_1.default, null), document.getElementById('root')); // eslint-disable-line
    });
});
//# sourceMappingURL=startup.js.map