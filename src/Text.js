import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Text = ({
  tag, children, className, ...props
}) => {
  const textClassNames = classnames('hs_text', className);
  const Tag = tag || 'p';
  const pprops = Object.assign({}, props);
  delete pprops.trancate;
  return (
    <Tag {...pprops} className={textClassNames}>
      {children}
    </Tag>
  );
};

Text.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Text;
