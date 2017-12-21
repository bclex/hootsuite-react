import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormElement from './FormElement';
import { uuid } from './util';

const FieldSet = ({
  className, label, children, ...props
}) => {
  const fsClassNames = classnames(className, 'hs_fieldset');
  return (
    <fieldset className={fsClassNames} { ...props }>
      {label ?
        <legend className="hs_label">{label}</legend> :
        null}
      <div className="hs_group">
        {children}
      </div>
    </fieldset>
  );
};

FieldSet.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
};

FieldSet.isFormElement = true;

class Row extends Component {
  renderChild(totalCols, child) {
    if (child && !child.type.isFormElement) {
      const { id = `hs_input-${uuid()}` } = child.props;
      const formElemProps = { id, totalCols, cols: 1 };
      return (
        <FormElement { ...formElemProps }>
          {React.cloneElement(child, { id })}
        </FormElement>
      );
    }
    return React.cloneElement(child, { totalCols });
  }

  render() {
    const { className, cols, children } = this.props;
    const totalCols = cols || React.Children.count(children);
    const rowClassNames = classnames(className, 'hs_row');
    return (
      <div className={rowClassNames}>
        {React.Children.map(children, this.renderChild.bind(this, totalCols))}
      </div>
    );
  }
}

Row.propTypes = {
  className: PropTypes.string,
  cols: PropTypes.number,
  children: PropTypes.node,
};

Row.isFormElement = true;

FieldSet.Row = Row;

export default FieldSet;
