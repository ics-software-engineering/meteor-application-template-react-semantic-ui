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
var stuff_1 = require("/imports/api/stuff/stuff");
var semantic_ui_react_1 = require("semantic-ui-react");
var AutoForm = require("uniforms-semantic/AutoForm");
var TextField = require("uniforms-semantic/TextField");
var NumField = require("uniforms-semantic/NumField");
var SelectField = require("uniforms-semantic/SelectField");
var SubmitField = require("uniforms-semantic/SubmitField");
var HiddenField = require("uniforms-semantic/HiddenField");
var ErrorsField = require("uniforms-semantic/ErrorsField");
var themeteorchef_bert_1 = require("meteor/themeteorchef:bert");
var meteor_1 = require("meteor/meteor");
/** Renders the Page for adding a document. */
var AddStuff = /** @class */ (function (_super) {
    __extends(AddStuff, _super);
    /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
    function AddStuff(props) {
        var _this = _super.call(this, props) || this;
        _this.submit = _this.submit.bind(_this);
        _this.insertCallback = _this.insertCallback.bind(_this);
        _this.formRef = null;
        return _this;
    }
    /** Notify the user of the results of the submit. If successful, clear the form. */
    AddStuff.prototype.insertCallback = function (error) {
        if (error) {
            themeteorchef_bert_1.Bert.alert({ type: 'danger', message: "Add failed: " + error.message });
        }
        else {
            themeteorchef_bert_1.Bert.alert({ type: 'success', message: 'Add succeeded' });
            this.formRef.reset();
        }
    };
    /** On submit, insert the data. */
    AddStuff.prototype.submit = function (data) {
        var name = data.name, quantity = data.quantity, condition = data.condition;
        var owner = meteor_1.Meteor.user().username;
        stuff_1.Stuffs.insert({ name: name, quantity: quantity, condition: condition, owner: owner }, this.insertCallback);
    };
    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    AddStuff.prototype.render = function () {
        var _this = this;
        return (React.createElement(semantic_ui_react_1.Grid, { container: true, centered: true },
            React.createElement(semantic_ui_react_1.Grid.Column, null,
                React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" }, "Add Stuff"),
                React.createElement(AutoForm, { ref: function (ref) { _this.formRef = ref; }, schema: stuff_1.StuffSchema, onSubmit: this.submit },
                    React.createElement(semantic_ui_react_1.Segment, null,
                        React.createElement(TextField, { name: 'name' }),
                        React.createElement(NumField, { name: 'quantity', decimal: false }),
                        React.createElement(SelectField, { name: 'condition' }),
                        React.createElement(SubmitField, { value: 'Submit' }),
                        React.createElement(ErrorsField, null),
                        React.createElement(HiddenField, { name: 'owner', value: 'fakeuser@foo.com' }))))));
    };
    return AddStuff;
}(React.Component));
exports.default = AddStuff;
//# sourceMappingURL=AddStuff.js.map