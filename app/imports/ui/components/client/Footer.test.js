import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import { spy } from 'sinon';
import Footer from '../Footer';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

// need to setup enzyme should be in helper file.
configure({ adapter: new Adapter() });

// spy(Footer.prototype, 'componentDidMount');

describe('<Footer/>', () => {
  it('should render', () => {
    const item = shallow(<Footer/>);
    console.log(item.html());
    chai.assert.equal(item.find('div').length, 1);
    console.log(item.find('div').text());
    // mount(<Footer />);
    // chai.expect(Footer.prototype.componentDidMount).to.have.property('callCount', 1);
  });
});
