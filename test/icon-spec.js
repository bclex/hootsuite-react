import assert from 'power-assert';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Icon from '../src/Icon';

Enzyme.configure({ adapter: new Adapter() });

describe('Icon', () => {
  it('should render icon', () => {
    const icon = 'check';
    const wrapper = shallow(<Icon icon={icon} />);
    assert(wrapper.hasClass('icon-app-dir'));
    assert(wrapper.hasClass(`x-${icon}`));
  });

  it('should render icon in a span container', () => {
    const icon = 'check';
    const wrapper = shallow(<Icon container="span" icon={icon} />);
    assert(wrapper.hasClass('hs_container'));
    assert(wrapper.type() === 'span');
    assert(wrapper.html().indexOf(`x-${icon}`) > 0);
  });
});
