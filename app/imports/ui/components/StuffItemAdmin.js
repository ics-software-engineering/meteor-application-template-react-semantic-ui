"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
var StuffItemAdmin = /** @class */ (function (_super) {
    __extends(StuffItemAdmin, _super);
    function StuffItemAdmin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StuffItemAdmin.prototype.render = function () {
        return (React.createElement(semantic_ui_react_1.Table.Row, null,
            React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.name),
            React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.quantity),
            React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.condition),
            React.createElement(semantic_ui_react_1.Table.Cell, null, this.props.stuff.owner)));
    };
    return StuffItemAdmin;
}(React.Component));
exports.default = StuffItemAdmin;
//# sourceMappingURL=StuffItemAdmin.js.map