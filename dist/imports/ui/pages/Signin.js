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
        define(["require", "exports", "meteor/meteor", "react", "react-router-dom", "semantic-ui-react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var meteor_1 = require("meteor/meteor");
    var React = require("react");
    var react_router_dom_1 = require("react-router-dom");
    var semantic_ui_react_1 = require("semantic-ui-react");
    /**
     * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
     * Authentication errors modify the component’s state to be displayed
     */
    var Signin = /** @class */ (function (_super) {
        __extends(Signin, _super);
        /** Initialize component state with properties for login and redirection. */
        function Signin(props) {
            var _this = _super.call(this, props) || this;
            _this.state = { email: '', password: '', error: '', redirectToReferer: false };
            // Ensure that 'this' is bound to this component in these two functions.
            // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
            _this.handleSubmit = _this.handleSubmit.bind(_this);
            _this.handleChange = _this.handleChange.bind(_this);
            return _this;
        }
        /** Update the form controls each time the user interacts with them. */
        Signin.prototype.handleChange = function (e) {
            var change = {};
            change[e.target.name] = e.target.value;
            this.setState(change);
        };
        /** Handle Signin submission using Meteor's account mechanism. */
        Signin.prototype.handleSubmit = function () {
            var _this = this;
            var _a = this.state, email = _a.email, password = _a.password;
            meteor_1.Meteor.loginWithPassword(email, password, function (err) {
                if (err) {
                    _this.setState({ error: err.reason });
                }
                else {
                    _this.setState({ error: '', redirectToReferer: true });
                }
            });
        };
        /** Render the signin form. */
        Signin.prototype.render = function () {
            var from = (this.props.location.state || { from: { pathname: '/' } }).from;
            // if correct authentication, redirect to page instead of login screen
            if (this.state.redirectToReferer) {
                return React.createElement(react_router_dom_1.Redirect, { to: from });
            }
            // Otherwise return the Login form.
            return (React.createElement(semantic_ui_react_1.Container, null,
                React.createElement(semantic_ui_react_1.Grid, { textAlign: "center", verticalAlign: "middle", centered: true, columns: 2 },
                    React.createElement(semantic_ui_react_1.Grid.Column, null,
                        React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" }, "Login to your account"),
                        React.createElement(semantic_ui_react_1.Form, { onSubmit: this.handleSubmit },
                            React.createElement(semantic_ui_react_1.Segment, { stacked: true },
                                React.createElement(semantic_ui_react_1.Form.Input, { label: "Email", icon: "user", iconPosition: "left", name: "email", type: "email", placeholder: "E-mail address", onChange: this.handleChange }),
                                React.createElement(semantic_ui_react_1.Form.Input, { label: "Password", icon: "lock", iconPosition: "left", name: "password", placeholder: "Password", type: "password", onChange: this.handleChange }),
                                React.createElement(semantic_ui_react_1.Form.Button, { content: "Submit" }))),
                        React.createElement(semantic_ui_react_1.Message, null,
                            React.createElement(react_router_dom_1.Link, { to: "/signup" }, "Click here to Register")),
                        this.state.error === '' ? ( // tslint:disable-line
                        '') : (React.createElement(semantic_ui_react_1.Message, { error: true, header: "Login was not successful", content: this.state.error }))))));
        };
        return Signin;
    }(React.Component));
    exports.default = Signin;
});
//# sourceMappingURL=Signin.js.map