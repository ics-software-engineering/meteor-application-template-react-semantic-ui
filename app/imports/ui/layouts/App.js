"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alanning_roles_1 = require("meteor/alanning:roles");
var meteor_1 = require("meteor/meteor");
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
require("semantic-ui-css/semantic.css");
var Footer_1 = require("../components/Footer");
var NavBar_1 = require("../components/NavBar");
var AddStuff_1 = require("../pages/AddStuff");
var EditStuff_1 = require("../pages/EditStuff");
var Landing_1 = require("../pages/Landing");
var ListStuff_1 = require("../pages/ListStuff");
var ListStuffAdmin_1 = require("../pages/ListStuffAdmin");
var NotFound_1 = require("../pages/NotFound");
var Signin_1 = require("../pages/Signin");
var Signout_1 = require("../pages/Signout");
var Signup_1 = require("../pages/Signup");
/** Top-level layout component for this application. Called in imports/startup/client/startup.tsx. */
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement(react_router_dom_1.HashRouter, null,
            React.createElement("div", null,
                React.createElement(NavBar_1.default, null),
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Landing_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: "/signin", component: Signin_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: "/signup", component: Signup_1.default }),
                    React.createElement(ProtectedRoute, { path: "/list", component: ListStuff_1.default }),
                    React.createElement(ProtectedRoute, { path: "/add", component: AddStuff_1.default }),
                    React.createElement(ProtectedRoute, { path: "/edit/:_id", component: EditStuff_1.default }),
                    React.createElement(AdminProtectedRoute, { path: "/admin", component: ListStuffAdmin_1.default }),
                    React.createElement(ProtectedRoute, { path: "/signout", component: Signout_1.default }),
                    React.createElement(react_router_dom_1.Route, { component: NotFound_1.default })),
                React.createElement(Footer_1.default, null))));
    };
    return App;
}(React.Component));
/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
var ProtectedRoute = function (_a) {
    var Component = _a.component, rest = __rest(_a, ["component"]);
    return (React.createElement(react_router_dom_1.Route, __assign({}, rest, { render: function (props) {
            var isLogged = meteor_1.Meteor.userId() !== null;
            return isLogged ?
                (React.createElement(Component, __assign({}, props))) :
                (React.createElement(react_router_dom_1.Redirect, { to: { pathname: '/signin', state: { from: props.location } } }));
        } })));
};
/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
var AdminProtectedRoute = function (_a) {
    var Component = _a.component, rest = __rest(_a, ["component"]);
    return (React.createElement(react_router_dom_1.Route, __assign({}, rest, { render: function (props) {
            var isLogged = meteor_1.Meteor.userId() !== null;
            var isAdmin = alanning_roles_1.Roles.userIsInRole(meteor_1.Meteor.userId(), 'admin');
            return (isLogged && isAdmin) ?
                (React.createElement(Component, __assign({}, props))) :
                (React.createElement(react_router_dom_1.Redirect, { to: { pathname: '/signin', state: { from: props.location } } }));
        } })));
};
exports.default = App;
//# sourceMappingURL=App.js.map