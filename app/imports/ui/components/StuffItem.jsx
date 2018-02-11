import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class StuffItem extends React.Component {

  handleClick() {
    this.props.history.push(`/edit/${this.props.stuff._id}`);
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.name}</Table.Cell>
          <Table.Cell>{this.props.stuff.quantity}</Table.Cell>
          <Table.Cell> <Button content='Edit' onClick={() => this.handleClick()}/> </Table.Cell>
        </Table.Row>
    );
  }
}

StuffItem.propTypes = {
  stuff: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(StuffItem);

