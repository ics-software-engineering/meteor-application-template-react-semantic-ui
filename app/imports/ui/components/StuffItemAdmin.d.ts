import * as React from 'react';
interface IStuffItemAdminProps {
    stuff: {
        owner: string;
        name: string;
        quantity: string;
        condition: string;
    };
}
/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
declare class StuffItemAdmin extends React.Component<IStuffItemAdminProps, object> {
    render(): JSX.Element;
}
export default StuffItemAdmin;
