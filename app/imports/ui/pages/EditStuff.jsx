import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Stuffs, StuffSchema } from '/imports/api/stuff/Stuff';
import swal from 'sweetalert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders the Page for editing a single document. */
class EditStuff extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, quantity, condition, _id } = data;
    Stuffs.update(_id, { $set: { name, quantity, condition } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Stuff</Header>
            <AutoForm schema={StuffSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='name'/>
                <NumField name='quantity' decimal={false}/>
                <SelectField name='condition'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditStuff.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    doc: Stuffs.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditStuff);
