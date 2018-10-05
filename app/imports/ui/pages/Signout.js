"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var meteor_1 = require("meteor/meteor");
var semantic_ui_react_1 = require("semantic-ui-react");
/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
var Signout = /** @class */ (function (_super) {
    __extends(Signout, _super);
    function Signout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Signout.prototype.render = function () {
        meteor_1.Meteor.logout();
        return (React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" },
            React.createElement("p", null, "You are signed out.")));
    };
    return Signout;
}(React.Component));
exports.default = Signout;
//# sourceMappingURL=Signout.js.map