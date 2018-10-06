import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

type StuffProps = {
    stuff: {
        _id: string;
        name: string;
        quantity: string;
        condition: string;
    }
}

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component<StuffProps, object> {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.name}</Table.Cell>
          <Table.Cell>{this.props.stuff.quantity}</Table.Cell>
          <Table.Cell>{this.props.stuff.condition}</Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.stuff._id}`}>Edit</Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StuffItem);
