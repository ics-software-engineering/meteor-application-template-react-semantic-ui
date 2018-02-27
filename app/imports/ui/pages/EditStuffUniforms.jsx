import React from 'react';
import { Container, Form, Button, Segment, Loader } from 'semantic-ui-react';
import { Stuff, StuffSchema } from '/imports/api/stuff/stuff';
import { Bert } from 'meteor/themeteorchef:bert';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditStuff extends React.Component {

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
