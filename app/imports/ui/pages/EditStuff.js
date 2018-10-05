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
var stuff_1 = require("/imports/api/stuff/stuff");
var themeteorchef_bert_1 = require("meteor/themeteorchef:bert");
var AutoForm = require("uniforms-semantic/AutoForm");
var TextField = require("uniforms-semantic/TextField");
var NumField = require("uniforms-semantic/NumField");
var SelectField = require("uniforms-semantic/SelectField");
var SubmitField = require("uniforms-semantic/SubmitField");
var HiddenField = require("uniforms-semantic/HiddenField");
var ErrorsField = require("uniforms-semantic/ErrorsField");
var meteor_1 = require("meteor/meteor");
var react_meteor_data_1 = require("meteor/react-meteor-data");
var PropTypes = require("prop-types");
/** Renders the Page for editing a single document. */
var EditStuff = /** @class */ (function (_super) {
    __extends(EditStuff, _super);
    function EditStuff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** On successful submit, insert the data. */
    EditStuff.prototype.submit = function (data) {
        var name = data.name, quantity = data.quantity, condition = data.condition, _id = data._id;
        stuff_1.Stuffs.update(_id, { $set: { name: name, quantity: quantity, condition: condition } }, function (error) { return (error ?
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
                React.createElement(AutoForm, { schema: stuff_1.StuffSchema, onSubmit: this.submit, model: this.props.doc },
                    React.createElement(semantic_ui_react_1.Segment, null,
                        React.createElement(TextField, { name: 'name' }),
                        React.createElement(NumField, { name: 'quantity', decimal: false }),
                        React.createElement(SelectField, { name: 'condition' }),
                        React.createElement(SubmitField, { value: 'Submit' }),
                        React.createElement(ErrorsField, null),
                        React.createElement(HiddenField, { name: 'owner' }))))));
    };
    return EditStuff;
}(React.Component));
/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditStuff.propTypes = {
    doc: PropTypes.object,
    model: PropTypes.object,
    ready: PropTypes.bool.isRequired,
};
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