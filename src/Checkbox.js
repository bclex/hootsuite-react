import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormElement from './FormElement';
import { uuid } from './util';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const input = this.node.getElementsByTagName('input')[0];
    if (nextProps.defaultChecked !== input.checked) {
      input.checked = nextProps.defaultChecked;
    }
  }

  renderCheckbox({
    className, label = this.binderProps.label, checkboxRef, ...props
  }) {
    const id = this.props.id || `input-${uuid()}`;
    const checkClassNames = classnames(className, 'hs_checkbox');
    /* eslint-disable max-len */
    return (
      <label className={checkClassNames} htmlFor={id} ref={(node) => { this.node = node; if (checkboxRef) checkboxRef(node); }}>
        <input type="checkbox" { ...props } />
        <span className="hs_label--faux" />
        <span className="hs_label">{label}</span>
      </label>
    );
  }

  render() {
    const {
      grouped, required, error, totalCols, cols, ...props
    } = this.props;
    const formElemProps = {
      required, error, totalCols, cols,
    };
    return (grouped ?
      this.renderCheckbox(props) :
      <FormElement formElementRef={(node) => { this.node = node; }} { ...formElemProps } >
        {this.renderCheckbox(props)}
      </FormElement>
    );
  }
}

Checkbox.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  grouped: PropTypes.bool,
  checkboxRef: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
};
