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
//# sourceMappingURL=Footer.js.map