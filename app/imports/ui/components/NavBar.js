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
var react_meteor_data_1 = require("meteor/react-meteor-data");
var react_router_dom_1 = require("react-router-dom");
var semantic_ui_react_1 = require("semantic-ui-react");
var alanning_roles_1 = require("meteor/alanning:roles");
/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
var NavBar = /** @class */ (function (_super) {
    __extends(NavBar, _super);
    function NavBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavBar.prototype.render = function () {
        var menuStyle = { marginBottom: '10px' };
        return (React.createElement(semantic_ui_react_1.Menu, { style: menuStyle, attached: "top", borderless: true, inverted: true },
            React.createElement(semantic_ui_react_1.Menu.Item, { as: react_router_dom_1.NavLink, activeClassName: "", exact: true, to: "/" },
                React.createElement(semantic_ui_react_1.Header, { inverted: true, as: 'h1' }, "meteor-application-template")),
            this.props.currentUser ? ([React.createElement(semantic_ui_react_1.Menu.Item, { as: react_router_dom_1.NavLink, activeClassName: "active", exact: true, to: "/add", key: 'add' }, "Add Stuff"),
                React.createElement(semantic_ui_react_1.Menu.Item, { as: react_router_dom_1.NavLink, activeClassName: "active", exact: true, to: "/list", key: 'list' }, "List Stuff")]) : '',
            alanning_roles_1.Roles.userIsInRole(meteor_1.Meteor.userId(), 'admin') ? (React.createElement(semantic_ui_react_1.Menu.Item, { as: react_router_dom_1.NavLink, activeClassName: "active", exact: true, to: "/admin", key: 'admin' }, "Admin")) : '',
            React.createElement(semantic_ui_react_1.Menu.Item, { position: "right" }, this.props.currentUser === '' ? (React.createElement(semantic_ui_react_1.Dropdown, { text: "Login", pointing: "top right", icon: 'user' },
                React.createElement(semantic_ui_react_1.Dropdown.Menu, null,
                    React.createElement(semantic_ui_react_1.Dropdown.Item, { icon: "user", text: "Sign In", as: react_router_dom_1.NavLink, exact: true, to: "/signin" }),
                    React.createElement(semantic_ui_react_1.Dropdown.Item, { icon: "add user", text: "Sign Up", as: react_router_dom_1.NavLink, exact: true, to: "/signup" })))) : (React.createElement(semantic_ui_react_1.Dropdown, { text: this.props.currentUser, pointing: "top right", icon: 'user' },
                React.createElement(semantic_ui_react_1.Dropdown.Menu, null,
                    React.createElement(semantic_ui_react_1.Dropdown.Item, { icon: "sign out", text: "Sign Out", as: react_router_dom_1.NavLink, exact: true, to: "/signout" })))))));
    };
    return NavBar;
}(React.Component));
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
var NavBarContainer = react_meteor_data_1.withTracker(function () { return ({
    currentUser: meteor_1.Meteor.user() ? meteor_1.Meteor.user().username : '',
}); })(NavBar);
/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
exports.default = react_router_dom_1.withRouter(NavBarContainer);
//# sourceMappingURL=NavBar.js.map