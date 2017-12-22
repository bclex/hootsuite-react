import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Text from '../src/Text';

Enzyme.configure({ adapter: new Adapter() });

describe('Text', () => {
  it('should render text regulary', () => {
    const wrapper = shallow(<Text />);
    expect(wrapper.type()).toEqual('p');
    expect(wrapper.prop('className')).toEqual('hs_text');
  });
  it('should render text with className', () => {
    const wrapper = shallow(<Text className="test" />);
    expect(wrapper.prop('className')).toEqual('hs_text test');
  });
  it('should render badge with tag', () => {
    const wrapper = shallow(<Text tag="span" />);
    expect(wrapper.type()).toEqual('span');
  });
});
