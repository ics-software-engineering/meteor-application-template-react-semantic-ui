import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import { Stuff, StuffSchema } from '/imports/api/stuff/stuff';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';

class EditStuff extends React.Component {

  schemaContext = StuffSchema.namedContext('EditStuff');

  state = { name: '', quantity: '' }

  handleChange = (event, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, quantity } = this.state;
    this.schemaContext.reset();
    const cleanData = StuffSchema.clean({ name, quantity });
    this.schemaContext.validate(cleanData);
    if (this.schemaContext.isValid()) {
      Stuff.insert(cleanData);
      Bert.alert('Success!', 'success', 'fixed-bottom');
    } else {
      Bert.alert('Insert failed; invalid data. Try again', 'failure', 'growl-top-right');
    }
  }

  render() {
    const { name, quantity } = this.state;
    return (
        <Container text>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input placeholder='Name' name='name' value={name} onChange={this.handleChange}/>
            <Form.Input placeholder='Quantity' name='quantity' value={quantity} onChange={this.handleChange}/>
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
