import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import Stuff from '/imports/api/stuff/stuff';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';

class AddStuff extends React.Component {

  state = { name: '', quantity: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, quantity } = this.state;
    console.log('in submit', name, quantity);
    this.setState({ name, quantity });
    Bert.alert('Success!', 'success', 'growl-top-right');
  }

  render() {
    const { name, quantity } = this.state;
    return (
        <Container text>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input placeholder='Name' name='name' value={name} onChange={this.handleChange} />
            <Form.Input placeholder='Quantity' name='quantity' value={quantity} onChange={this.handleChange} />
            <Button type='submit'>Submit</Button>
          </Form>
        </Container>
    );
  }
}

AddStuff.propTypes = {
  Stuff: PropTypes.object.isRequired,
};

export default withTracker(() => { //eslint-disable-line
  return {
    Stuff: Stuff,
  };
})(AddStuff);

