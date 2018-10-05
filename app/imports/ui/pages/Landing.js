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
var semantic_ui_react_1 = require("semantic-ui-react");
/** A simple static component to render some text for the landing page. */
var Landing = /** @class */ (function (_super) {
    __extends(Landing, _super);
    function Landing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Landing.prototype.render = function () {
        return (React.createElement(semantic_ui_react_1.Grid, { verticalAlign: 'middle', textAlign: 'center', container: true },
            React.createElement(semantic_ui_react_1.Grid.Column, { width: 4 },
                React.createElement(semantic_ui_react_1.Image, { size: 'small', circular: true, src: "/images/meteor-logo.png" })),
            React.createElement(semantic_ui_react_1.Grid.Column, { width: 8 },
                React.createElement("h1", null, "Welcome to this template"),
                React.createElement("p", null, "Now get to work and modify this app!"))));
    };
    return Landing;
}(React.Component));
exports.default = Landing;
//# sourceMappingURL=Landing.js.map