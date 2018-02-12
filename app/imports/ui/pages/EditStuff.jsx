import React from 'react';
import { Container, Form, Button, Header } from 'semantic-ui-react';
import { Stuff, StuffSchema } from '/imports/api/stuff/stuff';
import { Bert } from 'meteor/themeteorchef:bert';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';


class EditStuff extends React.Component {

  constructor(props) {
    super(props);
    this.state.name = this.props.doc && this.props.doc.name;
    this.state.quantity = this.props.doc && this.props.doc.quantity;
    this.state._id = this.props.doc && this.props.doc._id;
  }

  state = { name: '', quantity: '', _id: '' }

  handleChange = (event, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, quantity, _id } = this.state;
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
    Bert.alert(alertData);
  }

  render() {
    const { name, quantity } = this.state;
    return (
        <Container text>
          <Header as='h1'>Edit Stuff</Header>
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
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  Meteor.subscribe('Stuff');

  return {
    doc: Stuff.findOne(documentId),
  };
})(EditStuff);
