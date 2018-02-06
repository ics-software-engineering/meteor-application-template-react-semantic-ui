import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

class Home extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column floated='right' width={4}>
            <Image size='small' circular src="/images/meteor-logo.png"/>
          </Grid.Column>

          <Grid.Column floated='left' width={8}>
            <h1>Welcome to this template</h1>
            <p>Now get to work and modify this app!</p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Home;
