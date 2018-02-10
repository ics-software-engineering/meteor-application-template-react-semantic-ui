import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import { Stuff, StuffSchema } from '/imports/api/stuff/stuff';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';

class EditStuff extends React.Component {

  state = { name: '', quantity: '' }

  handleChange = (event, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, quantity } = this.state;
    const schemaContext = StuffSchema.newContext();
    const cleanData = StuffSchema.clean({ name, quantity });
    schemaContext.validate(cleanData);
    const alertData = {};
    if (schemaContext.isValid()) {
      Stuff.insert(cleanData);
      alertData.message = `Added ${name} with quantity ${quantity}`;
      alertData.type = 'success';
    } else {
      const errors = _.map(schemaContext.validationErrors(), error => schemaContext.keyErrorMessage(error.name));
      alertData.message = `Add failed: ${errors}`;
      alertData.type = 'danger';
      alertData.hideDelay = 5000;
    }
    Bert.alert(alertData);
  }

  render() {
    const { name, quantity } = this.state;
    return (
        <Container text>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input required label='Name' name='name' value={name} onChange={this.handleChange}/>
            <Form.Input required label='Quantity' name='quantity' value={quantity} onChange={this.handleChange} />
            <Button type='submit'>Submit</Button>
          </Form>
        </Container>
    );
  }
}

EditStuff.propTypes = {
  Stuff: PropTypes.object.isRequired,
};

export default withTracker(() => { //eslint-disable-line
  return {
    Stuff: Stuff,
  };
})(EditStuff);
