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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    /** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
    var Footer = /** @class */ (function (_super) {
        __extends(Footer, _super);
        function Footer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Footer.prototype.render = function () {
            var divStyle = { paddingTop: '15px' };
            return (React.createElement("footer", null,
                React.createElement("div", { style: divStyle, className: "ui center aligned container" },
                    React.createElement("hr", null),
                    "Department of Information and Computer Sciences ",
                    React.createElement("br", null),
                    "University of Hawaii",
                    React.createElement("br", null),
                    "Honolulu, HI 96822")));
        };
        return Footer;
    }(React.Component));
    exports.default = Footer;
});
//# sourceMappingURL=Footer.js.map