"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meteor_1 = require("meteor/meteor");
var react_meteor_data_1 = require("meteor/react-meteor-data");
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var stuff_1 = require("../../api/stuff/stuff");
var StuffItemAdmin_1 = require("../../ui/components/StuffItemAdmin");
/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
var ListStuffAdmin = /** @class */ (function (_super) {
    __extends(ListStuffAdmin, _super);
    function ListStuffAdmin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    ListStuffAdmin.prototype.render = function () {
        return (this.props.ready) ? this.renderPage() : React.createElement(semantic_ui_react_1.Loader, { active: true }, "Getting data");
    };
    /** Render the page once subscriptions have been received. */
    ListStuffAdmin.prototype.renderPage = function () {
        return (React.createElement(semantic_ui_react_1.Container, null,
            React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" }, "List Stuff (Admin)"),
            React.createElement(semantic_ui_react_1.Table, { celled: true },
                React.createElement(semantic_ui_react_1.Table.Header, null,
                    React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Name"),
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Quantity"),
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Condition"),
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Owner"))),
                React.createElement(semantic_ui_react_1.Table.Body, null, this.props.stuffs.map(function (stuff) { return React.createElement(StuffItemAdmin_1.default, { key: stuff._id, stuff: stuff }); })))));
    };
    return ListStuffAdmin;
}(React.Component));
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
exports.default = react_meteor_data_1.withTracker(function () {
    // Get access to Stuff documents.
    var subscription = meteor_1.Meteor.subscribe('StuffAdmin');
    return {
        ready: subscription.ready(),
        stuffs: stuff_1.Stuffs.find({}).fetch(),
    };
})(ListStuffAdmin);
//# sourceMappingURL=ListStuffAdmin.js.map