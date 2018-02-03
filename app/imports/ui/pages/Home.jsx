import React from 'react';
import { Header, Image } from 'semantic-ui-react';

class Home extends React.Component {
  render() {
    return (
      <Header as="h2" textAlign="center">
        <Image src="/opq.png" />
        <p>OPQ View</p>
      </Header>
    );
  }
}

export default Home;
