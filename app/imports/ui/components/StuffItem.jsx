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
// import * as PropTypes from 'prop-types';
var react_router_dom_1 = require("react-router-dom");
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
var StuffItem = /** @class */ (function (_super) {
    __extends(StuffItem, _super);
    function StuffItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StuffItem.prototype.render = function () {
        return (<semantic_ui_react_1.Table.Row>
          <semantic_ui_react_1.Table.Cell>{this.props.stuff.name}</semantic_ui_react_1.Table.Cell>
          <semantic_ui_react_1.Table.Cell>{this.props.stuff.quantity}</semantic_ui_react_1.Table.Cell>
          <semantic_ui_react_1.Table.Cell>{this.props.stuff.condition}</semantic_ui_react_1.Table.Cell>
          <semantic_ui_react_1.Table.Cell>
            <react_router_dom_1.Link to={"/edit/" + this.props.stuff._id}>Edit</react_router_dom_1.Link>
          </semantic_ui_react_1.Table.Cell>
        </semantic_ui_react_1.Table.Row>);
    };
    return StuffItem;
}(React.Component));
/** Require a document to be passed to this component. */
// StuffItem.propTypes = {
//   stuff: PropTypes.object.isRequired,
// };
/** Wrap this component in withRouter since we use the <Link> React Router element. */
exports.default = react_router_dom_1.withRouter(StuffItem);
