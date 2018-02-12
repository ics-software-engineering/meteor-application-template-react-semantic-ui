import React from 'react';
import { Container, Form, Button, Segment } from 'semantic-ui-react';
import { Stuff, StuffSchema } from '/imports/api/stuff/stuff';
import { Bert } from 'meteor/themeteorchef:bert';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single Stuff document. */
class EditStuff extends React.Component {

  /** Initialize the state of the form fields from the props object. */
  constructor(props) {
    super(props);
    this.state = {};
    this.state.name = this.props.doc && this.props.doc.name;
    this.state.quantity = this.props.doc && this.props.doc.quantity;
    this.state._id = this.props.doc && this.props.doc._id;
  }

  /* When anything changes in a form control, update the associated state field. */
  handleChange = (event, { name, value }) => this.setState({ [name]: value })

  /* When the user clicks the submit button, check the data for validity and update the document if valid. */
  handleSubmit = (event) => {
    event.preventDefault();
    const { name, quantity, _id } = this.state;
    // Validate form fields. See https://github.com/aldeed/simple-schema-js#validating-data
    const schemaContext = StuffSchema.newContext();
    const cleanData = StuffSchema.clean({ name, quantity });
    schemaContext.validate(cleanData);
    const alertData = {};
    if (schemaContext.isValid()) {
      Stuff.update(_id, { $set: cleanData });
      alertData.message = `Updated ${name} with quantity ${quantity}`;
      alertData.type = 'success';
      this.setState({ name: '', quantity: '' });
    } else {
      const errors = _.map(schemaContext.validationErrors(), error => schemaContext.keyErrorMessage(error.name));
      alertData.message = `Add failed: ${errors}`;
      alertData.type = 'danger';
      alertData.hideDelay = 5000;
    }
    // Notify the user of success or failure. See https://themeteorchef.com/tutorials/client-side-alerts-with-bert
    Bert.alert(alertData);
  }

  /** Render the page, providing default values for form fields. */
  render() {
    const { name, quantity } = this.state;
    return (
        <Container text>
          <Segment.Group>
            <Segment attached='top' inverted color='grey'>Edit Stuff</Segment>
            <Segment>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input required label='Name' name='name' value={name} onChange={this.handleChange}/>
                <Form.Input required label='Quantity' name='quantity' value={quantity} onChange={this.handleChange}/>
                <Button type='submit'>Submit</Button>
              </Form>
            </Segment>
          </Segment.Group>
        </Container>
    );
  }
}

/** Require the presence of a Stuff document in the props object. */
EditStuff.propTypes = {
  doc: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  Meteor.subscribe('Stuff');
  return {
    doc: Stuff.findOne(documentId),
  };
})(EditStuff);
