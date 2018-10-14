import * as React from 'react';
interface ISigninProps {
    location: {
        state: {
            from: string;
        };
    };
}
interface ISigninState {
    email: string;
    password: string;
    error: string;
    redirectToReferer: boolean;
}
/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component<ISigninProps, ISigninState> {
    /** Initialize component state with properties for login and redirection. */
    constructor(props: any);
    /** Update the form controls each time the user interacts with them. */
    handleChange(e: any): void;
    /** Handle Signin submission using Meteor's account mechanism. */
    handleSubmit(): void;
    /** Render the signin form. */
    render(): JSX.Element;
}
export {};
