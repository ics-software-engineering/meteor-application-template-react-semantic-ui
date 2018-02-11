import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Button } from 'semantic-ui-react';
import { Stuff } from '/imports/api/stuff/stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class ListStuff extends React.Component {

  handleClick(id) {
    console.log('got id', id);
  }

  renderStuff() {
    return this.props.stuffs.map((stuff) => (
        <Table.Row key={stuff._id}>
          <Table.Cell>{stuff.name}</Table.Cell>
          <Table.Cell>{stuff.quantity}</Table.Cell>
          <Table.Cell> <Button content='Edit' onClick={this.handleClick}/> </Table.Cell>
        </Table.Row>
    ));
  }

  render() {
    return (
        <Container text>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderStuff()}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

ListStuff.propTypes = {
  stuffs: PropTypes.array.isRequired,
};

export default withTracker(() => {
  Meteor.subscribe('Stuff');
  return {
    stuffs: Stuff.find({}).fetch(),
  };
})(ListStuff);

