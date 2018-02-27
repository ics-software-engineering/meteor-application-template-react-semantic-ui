import React from 'react';
import { Stuff, StuffSchema } from '/imports/api/stuff/stuff';
import { Grid } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a Stuff document. */
class AddStuffUniforms extends React.Component {

  /** On successful submit, insert the data. For prototypes, don't catch database insert failure. */
  submit(data) {
    const { name, quantity, condition } = data;
    const username = Meteor.user().username;
    Stuff.insert({ name, quantity, condition, username }, (error) => (error ?
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` }) :
      Bert.alert({ type: 'success', message: 'Add succeeded' })));
  }

  /** Render the form. */
  render() {
    return (
      <AutoForm schema={StuffSchema} onSubmit={this.submit} >
        <Grid container>

          <Grid.Row columns={3}>
            <Grid.Column>
              <TextField name='name'/>
            </Grid.Column>
            <Grid.Column>
              <TextField name='quantity'/>
            </Grid.Column>
            <Grid.Column>
              <SelectField name='condition' />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <SubmitField value='Submit'/>
            <TextField name='username' type='hidden' label={false} value='fakeuser@foo.com'/>
          </Grid.Row>

          <Grid.Row>
            <ErrorsField/>
          </Grid.Row>

        </Grid>
      </AutoForm>
    );
  }
}

export default AddStuffUniforms;
