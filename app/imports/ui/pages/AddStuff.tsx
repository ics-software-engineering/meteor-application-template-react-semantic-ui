import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import * as React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import HiddenField from 'uniforms-semantic/HiddenField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import TextField from 'uniforms-semantic/TextField';
import { Stuffs, StuffSchema } from '../../api/stuff/stuff';

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {
  private formRef: any;
  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  public insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  public submit(data) {
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.insert({ name, quantity, condition, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  public render() {
    return (
        <Grid container={true} centered={true}>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Stuff</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={StuffSchema} onSubmit={this.submit}>
              <Segment>
                <TextField name="name"/>
                <NumField name="quantity" decimal={false}/>
                <SelectField name="condition"/>
                <SubmitField value="Submit"/>
                <ErrorsField/>
                <HiddenField name="owner" value="fakeuser@foo.com"/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddStuff;
