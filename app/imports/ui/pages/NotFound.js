"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
/** Render a Not Found page if the user enters a URL that doesn't match any route. */
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotFound.prototype.render = function () {
        return (React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" },
            React.createElement("p", null, "Page not found")));
    };
    return NotFound;
}(React.Component));
exports.default = NotFound;
//# sourceMappingURL=NotFound.js.map