import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header } from 'semantic-ui-react';
import { Stuff } from '/imports/api/stuff/stuff';
import StuffItem from '/imports/ui/components/StuffItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class ListStuff extends React.Component {

  renderStuff() {
    return this.props.stuffs.map((stuff) => (
        <StuffItem key={stuff._id} stuff={stuff} />
    ));
  }

  render() {
    return (
        <Container text>
          <Header as='h1'>List Stuff</Header>
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

