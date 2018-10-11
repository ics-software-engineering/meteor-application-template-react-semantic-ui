import * as React from 'react';
import { Table } from 'semantic-ui-react';

interface IStuffItemAdminProps {
  stuff: {
    owner: string;
    name: string;
    quantity: string;
    condition: string;
  };
}

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class StuffItemAdmin extends React.Component<IStuffItemAdminProps, object> {
  public render() {
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

export default StuffItemAdmin;
