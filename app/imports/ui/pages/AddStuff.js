"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meteor_1 = require("meteor/meteor");
var themeteorchef_bert_1 = require("meteor/themeteorchef:bert");
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var AutoForm_1 = require("uniforms-semantic/AutoForm");
var ErrorsField_1 = require("uniforms-semantic/ErrorsField");
var HiddenField_1 = require("uniforms-semantic/HiddenField");
var NumField_1 = require("uniforms-semantic/NumField");
var SelectField_1 = require("uniforms-semantic/SelectField");
var SubmitField_1 = require("uniforms-semantic/SubmitField");
var TextField_1 = require("uniforms-semantic/TextField");
var stuff_1 = require("../../api/stuff/stuff");
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
                React.createElement(AutoForm_1.default, { ref: function (ref) { _this.formRef = ref; }, schema: stuff_1.StuffSchema, onSubmit: this.submit },
                    React.createElement(semantic_ui_react_1.Segment, null,
                        React.createElement(TextField_1.default, { name: "name" }),
                        React.createElement(NumField_1.default, { name: "quantity", decimal: false }),
                        React.createElement(SelectField_1.default, { name: "condition" }),
                        React.createElement(SubmitField_1.default, { value: "Submit" }),
                        React.createElement(ErrorsField_1.default, null),
                        React.createElement(HiddenField_1.default, { name: "owner", value: "fakeuser@foo.com" }))))));
    };
    return AddStuff;
}(React.Component));
exports.default = AddStuff;
//# sourceMappingURL=AddStuff.js.map