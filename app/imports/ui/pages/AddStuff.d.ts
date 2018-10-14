import * as React from 'react';
/** Renders the Page for adding a document. */
declare class AddStuff extends React.Component {
    private formRef;
    /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
    constructor(props: any);
    /** Notify the user of the results of the submit. If successful, clear the form. */
    insertCallback(error: any): void;
    /** On submit, insert the data. */
    submit(data: any): void;
    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render(): JSX.Element;
}
export default AddStuff;
