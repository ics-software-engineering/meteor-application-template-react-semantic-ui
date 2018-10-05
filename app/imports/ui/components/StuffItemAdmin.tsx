import * as React from 'react';
import { Table } from 'semantic-ui-react';
// import * as PropTypes from 'prop-types';

type StuffItemAdminProps = {
    stuff: {
        owner: string;
        name: string;
        quantity: string;
        condition: string;
    }
}

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class StuffItemAdmin extends React.Component<StuffItemAdminProps, object> {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.name}</Table.Cell>
          <Table.Cell>{this.props.stuff.quantity}</Table.Cell>
          <Table.Cell>{this.props.stuff.condition}</Table.Cell>
          <Table.Cell>{this.props.stuff.owner}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
// StuffItemAdmin.propTypes = {
//   stuff: PropTypes.object.isRequired,
// };

export default StuffItemAdmin;
