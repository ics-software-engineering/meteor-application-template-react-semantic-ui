import * as React from 'react';
interface ISignupState {
    email: string;
    password: string;
    error: string;
}
/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class Signup extends React.Component<object, ISignupState> {
    /** Initialize state fields. */
    constructor(props: any);
    /** Update the form controls each time the user interacts with them. */
    handleChange(e: any): void;
    /** Handle Signup submission using Meteor's account mechanism. */
    handleSubmit(): void;
    /** Display the signup form. */
    render(): JSX.Element;
}
export {};
