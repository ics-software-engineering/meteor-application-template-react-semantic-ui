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
var themeteorchef_bert_1 = require("meteor/themeteorchef:bert");
var AutoForm_1 = require("uniforms-semantic/AutoForm");
var TextField_1 = require("uniforms-semantic/TextField");
var NumField_1 = require("uniforms-semantic/NumField");
var SelectField_1 = require("uniforms-semantic/SelectField");
var SubmitField_1 = require("uniforms-semantic/SubmitField");
var HiddenField_1 = require("uniforms-semantic/HiddenField");
var ErrorsField_1 = require("uniforms-semantic/ErrorsField");
var meteor_1 = require("meteor/meteor");
var react_meteor_data_1 = require("meteor/react-meteor-data");
var stuff_1 = require("../../api/stuff/stuff");
/** Renders the Page for editing a single document. */
var EditStuff = /** @class */ (function (_super) {
    __extends(EditStuff, _super);
    function EditStuff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** On successful submit, insert the data. */
    EditStuff.prototype.submit = function (data) {
        var name = data.name, quantity = data.quantity, condition = data.condition, _id = data._id;
        stuff_1.Stuffs.update(_id, { $set: { name: name, quantity: quantity, condition: condition } }, {}, function (error) { return (error ?
            themeteorchef_bert_1.Bert.alert({ type: 'danger', message: "Update failed: " + error.message }) :
            themeteorchef_bert_1.Bert.alert({ type: 'success', message: 'Update succeeded' })); });
    };
    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    EditStuff.prototype.render = function () {
        return (this.props.ready) ? this.renderPage() : React.createElement(semantic_ui_react_1.Loader, { active: true }, "Getting data");
    };
    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    EditStuff.prototype.renderPage = function () {
        return (React.createElement(semantic_ui_react_1.Grid, { container: true, centered: true },
            React.createElement(semantic_ui_react_1.Grid.Column, null,
                React.createElement(semantic_ui_react_1.Header, { as: "h2", textAlign: "center" }, "Edit Stuff"),
                React.createElement(AutoForm_1.default, { schema: stuff_1.StuffSchema, onSubmit: this.submit, model: this.props.doc },
                    React.createElement(semantic_ui_react_1.Segment, null,
                        React.createElement(TextField_1.default, { name: 'name' }),
                        React.createElement(NumField_1.default, { name: 'quantity', decimal: false }),
                        React.createElement(SelectField_1.default, { name: 'condition' }),
                        React.createElement(SubmitField_1.default, { value: 'Submit' }),
                        React.createElement(ErrorsField_1.default, null),
                        React.createElement(HiddenField_1.default, { name: 'owner' }))))));
    };
    return EditStuff;
}(React.Component));
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
exports.default = react_meteor_data_1.withTracker(function (_a) {
    var match = _a.match;
    // Get the documentID from the URL field. See imports/ui/layouts/App.tsx for the route containing :_id.
    var documentId = match.params._id;
    // Get access to Stuff documents.
    var subscription = meteor_1.Meteor.subscribe('Stuff');
    return {
        doc: stuff_1.Stuffs.findOne(documentId),
        ready: subscription.ready(),
    };
})(EditStuff);
//# sourceMappingURL=EditStuff.js.map