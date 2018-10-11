import * as React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  public render() {
    return (
        <Grid verticalAlign="middle" textAlign="center" container={true}>

          <Grid.Column width={4}>
            <Image size="small" circular={true} src="/images/meteor-logo.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>Welcome to this template</h1>
            <p>Now get to work and modify this app!</p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
