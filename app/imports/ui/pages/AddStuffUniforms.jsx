import React from 'react';
import { Stuff, StuffSchema } from '/imports/api/stuff/stuff';
import { Grid } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders the Page for adding a Stuff document. */
class AddStuffUniforms extends React.Component {

  /** On successful submit, insert the data. For prototypes, don't catch database insert failure. */
   submit(data) {
     Stuff.insert(data);
     Bert.alert({ type: 'success', message: 'Add succeeded.' });
  }

  /** Render the form. */
  render() {
    return (
        <AutoForm schema={StuffSchema} onSubmit={this.submit}>
          <Grid container>

            <Grid.Row columns={2}>
              <Grid.Column>
                <TextField name='name' />
              </Grid.Column>
              <Grid.Column>
                <TextField name='quantity' />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <SubmitField value='Submit' />
            </Grid.Row>

            <Grid.Row>
              <ErrorsField />
            </Grid.Row>

          </Grid>
        </AutoForm>
    );
  }
}

export default AddStuffUniforms;
