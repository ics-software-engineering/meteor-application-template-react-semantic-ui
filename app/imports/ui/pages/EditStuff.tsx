import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import * as React from 'react';
import { Grid, Header, Loader, Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import HiddenField from 'uniforms-semantic/HiddenField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import TextField from 'uniforms-semantic/TextField';
import { Stuffs, StuffSchema } from '../../api/stuff/stuff';

interface IEditStuffProps {
  ready: boolean;
  doc: object;
}

/** Renders the Page for editing a single document. */
class EditStuff extends React.Component<IEditStuffProps, object> {

  /** On successful submit, insert the data. */
  public submit(data) {
    const { name, quantity, condition, _id } = data;
    Stuffs.update(_id, { $set: { name, quantity, condition } }, {}, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  public render() {
    return (this.props.ready) ? this.renderPage() : <Loader active={true}>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  public renderPage() {
    return (
        <Grid container={true} centered={true}>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Stuff</Header>
            <AutoForm schema={StuffSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <TextField name="name"/>
                <NumField name="quantity" decimal={false}/>
                <SelectField name="condition"/>
                <SubmitField value="Submit"/>
                <ErrorsField/>
                <HiddenField name="owner" />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.tsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    doc: Stuffs.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditStuff);
