import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { uuid } from './util';

const Radio = ({
  className, label, name, value, checked, defaultChecked, ...props
}) => {
  const id = this.props.id || `input-${uuid()}`;
  const radioClassNames = classnames(className, 'hs_radio');
  return (
    <label className={radioClassNames} htmlFor={id} >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        { ...props }
      />
      <span className="hs_radio--faux" />
      <span className="hs_label">{label}</span>
    </label>
  );
};

Radio.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
};

export default Radio;
