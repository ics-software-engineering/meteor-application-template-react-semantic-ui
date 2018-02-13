import React from 'react';
import { Container, Form, Button, Segment, Loader } from 'semantic-ui-react';
import { Stuff, StuffSchema } from '/imports/api/stuff/stuff';
import { Bert } from 'meteor/themeteorchef:bert';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single Stuff document. */
class EditStuff extends React.Component {

  /* Keep track of the state of all of the form controls and the docID from the URL. */
  state = { name: '', quantity: '', _id: '' }

  /*
   * When "match" is passed into withTracker, we are acquiring data for the page from the URL.
   * In this case, we need to set the state using componentDidUpdate().
   * Otherwise browser refresh and/or bookmarked URLs will not display the data correctly.
   * Note that this.props.doc might be undefined momentarily: we use the && to prevent console errors.
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(() => ({
        name: this.props.doc && this.props.doc.name,
        quantity: this.props.doc && this.props.doc.quantity,
        _id: this.props.doc && this.props.doc._id,
      }));
    }
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
    } else {
      const errors = _.map(schemaContext.validationErrors(), error => schemaContext.keyErrorMessage(error.name));
      alertData.message = `Add failed: ${errors}`;
      alertData.type = 'danger';
      alertData.hideDelay = 5000;
    }
    // Notify the user of success or failure. See https://themeteorchef.com/tutorials/client-side-alerts-with-bert
    Bert.alert(alertData);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page, providing default values for form fields. */
  renderPage() {
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
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    doc: Stuff.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditStuff);
