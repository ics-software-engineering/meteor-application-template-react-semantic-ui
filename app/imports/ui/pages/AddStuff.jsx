import React from 'react';
import { Container, Form, Button, Segment } from 'semantic-ui-react';
import { Stuff, StuffSchema } from '/imports/api/stuff/stuff';
import { Bert } from 'meteor/themeteorchef:bert';
import { _ } from 'meteor/underscore';

/** Renders the Page for adding a Stuff document. */
class AddStuff extends React.Component {

  /* Keep track of the state of all of the form controls. */
  state = { name: '', quantity: '' }

  /* When anything changes in a form control, update the associated state field. */
  handleChange = (event, { name, value }) => this.setState({ [name]: value })

  /* When the user clicks the submit button, check the data for validity and add it to the collection if valid. */
  handleSubmit = (event) => {
    event.preventDefault();
    const { name, quantity } = this.state;
    // Validate form fields. See https://github.com/aldeed/simple-schema-js#validating-data
    const schemaContext = StuffSchema.newContext();
    const cleanData = StuffSchema.clean({ name, quantity });
    schemaContext.validate(cleanData);
    const alertData = {};
    if (schemaContext.isValid()) {
      Stuff.insert(cleanData);
      alertData.message = `Added ${name} with quantity ${quantity}`;
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
            <Segment attached='top' inverted color='grey'>Add Stuff</Segment>
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

export default AddStuff;
