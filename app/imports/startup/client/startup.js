"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var meteor_1 = require("meteor/meteor");
var App_1 = require("../../ui/layouts/App");
/** Startup the application by rendering the App layout component. */
meteor_1.Meteor.startup(function () {
    react_dom_1.render(React.createElement(App_1.default, null), document.getElementById('root')); // eslint-disable-line
});
//# sourceMappingURL=startup.js.map