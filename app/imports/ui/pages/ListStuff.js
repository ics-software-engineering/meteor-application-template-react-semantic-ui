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
        define(["require", "exports", "meteor/meteor", "meteor/react-meteor-data", "react", "semantic-ui-react", "../../api/stuff/stuff", "../../ui/components/StuffItem"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var meteor_1 = require("meteor/meteor");
    var react_meteor_data_1 = require("meteor/react-meteor-data");
    var React = require("react");
    var semantic_ui_react_1 = require("semantic-ui-react");
    var stuff_1 = require("../../api/stuff/stuff");
    var StuffItem_1 = require("../../ui/components/StuffItem");
    /** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
    var ListStuff = /** @class */ (function (_super) {
        __extends(ListStuff, _super);
        function ListStuff() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
        ListStuff.prototype.render = function () {
            return (this.props.ready) ? this.renderPage() : React.createElement(semantic_ui_react_1.Loader, { active: true }, "Getting data");
        };
        /** Render the page once subscriptions have been received. */
        ListStuff.prototype.renderPage = function () {
            return (React.createElement(semantic_ui_react_1.Container, null,
                React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" }, "List Stuff"),
                React.createElement(semantic_ui_react_1.Table, { celled: true },
                    React.createElement(semantic_ui_react_1.Table.Header, null,
                        React.createElement(semantic_ui_react_1.Table.Row, null,
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Name"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Quantity"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Condition"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Edit"))),
                    React.createElement(semantic_ui_react_1.Table.Body, null, this.props.stuffs.map(function (stuff) { return React.createElement(StuffItem_1.default, { key: stuff._id, stuff: stuff }); })))));
        };
        return ListStuff;
    }(React.Component));
    /** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
    exports.default = react_meteor_data_1.withTracker(function () {
        // Get access to Stuff documents.
        var subscription = meteor_1.Meteor.subscribe('Stuff');
        return {
            ready: subscription.ready(),
            stuffs: stuff_1.Stuffs.find({}).fetch(),
        };
    })(ListStuff);
});
//# sourceMappingURL=ListStuff.js.map