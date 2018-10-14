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
        define(["require", "exports", "react", "react-router-dom", "semantic-ui-react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    var react_router_dom_1 = require("react-router-dom");
    var semantic_ui_react_1 = require("semantic-ui-react");
    /** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
    var StuffItem = /** @class */ (function (_super) {
        __extends(StuffItem, _super);
        function StuffItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StuffItem.prototype.render = function () {
            return (React.createElement(semantic_ui_react_1.Table.Row, null,
                React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.name),
                React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.quantity),
                React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.condition),
                React.createElement(semantic_ui_react_1.Table.Cell, null,
                    React.createElement(react_router_dom_1.Link, { to: "/edit/" + this.props.stuff._id }, "Edit"))));
        };
        return StuffItem;
    }(React.Component));
    /** Wrap this component in withRouter since we use the <Link> React Router element. */
    exports.default = react_router_dom_1.withRouter(StuffItem);
});
//# sourceMappingURL=StuffItem.js.map