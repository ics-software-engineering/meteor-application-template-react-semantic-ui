import React from 'react';
import { Header, Image } from 'semantic-ui-react';

class Example extends React.Component {
  render() {
    return (
      <Header as="h2" textAlign="center">
        <Image src="/ftlogo.png" />
        <p>Example</p>
      </Header>
    );
  }
}
export default Example;
