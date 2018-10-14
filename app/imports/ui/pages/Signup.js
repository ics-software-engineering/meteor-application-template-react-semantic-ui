"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var accounts_base_1 = require("meteor/accounts-base");
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var semantic_ui_react_1 = require("semantic-ui-react");
/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
var Signup = /** @class */ (function (_super) {
    __extends(Signup, _super);
    /** Initialize state fields. */
    function Signup(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { email: '', password: '', error: '' };
        // Ensure that 'this' is bound to this component in these two functions.
        // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    /** Update the form controls each time the user interacts with them. */
    Signup.prototype.handleChange = function (e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    };
    /** Handle Signup submission using Meteor's account mechanism. */
    Signup.prototype.handleSubmit = function () {
        var _this = this;
        var _a = this.state, email = _a.email, password = _a.password;
        accounts_base_1.Accounts.createUser({ email: email, password: password, username: email }, function (err) {
            if (err) {
                _this.setState({ error: err.reason });
            }
            else {
                // browserHistory.push('/login');
            }
        });
    };
    /** Display the signup form. */
    Signup.prototype.render = function () {
        return (React.createElement(semantic_ui_react_1.Container, null,
            React.createElement(semantic_ui_react_1.Grid, { textAlign: "center", verticalAlign: "middle", centered: true, columns: 2 },
                React.createElement(semantic_ui_react_1.Grid.Column, null,
                    React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" }, "Register your account"),
                    React.createElement(semantic_ui_react_1.Form, { onSubmit: this.handleSubmit },
                        React.createElement(semantic_ui_react_1.Segment, { stacked: true },
                            React.createElement(semantic_ui_react_1.Form.Input, { label: "Email", icon: "user", iconPosition: "left", name: "email", type: "email", placeholder: "E-mail address", onChange: this.handleChange }),
                            React.createElement(semantic_ui_react_1.Form.Input, { label: "Password", icon: "lock", iconPosition: "left", name: "password", placeholder: "Password", type: "password", onChange: this.handleChange }),
                            React.createElement(semantic_ui_react_1.Form.Button, { content: "Submit" }))),
                    React.createElement(semantic_ui_react_1.Message, null,
                        "Already have an account? Login ",
                        React.createElement(react_router_dom_1.Link, { to: "/signin" }, "here")),
                    this.state.error === '' ? ( // tslint:disable-line
                    '') : (React.createElement(semantic_ui_react_1.Message, { error: true, header: "Registration was not successful", content: this.state.error }))))));
    };
    return Signup;
}(React.Component));
exports.default = Signup;
//# sourceMappingURL=Signup.js.map