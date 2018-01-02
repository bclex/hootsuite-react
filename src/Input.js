import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import keycoder from 'keycoder';
import Icon from './Icon';
import FormElement from './FormElement';
import Text from './Text';
import { uuid } from './util';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(e) {
    const { value } = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  onKeyDown(e) {
    const { symbolPattern, onKeyDown } = this.props;
    if (symbolPattern) {
      const { keyCode, shiftKey } = e;
      const value = keycoder.toCharacter(keyCode, shiftKey);
      if (value && !value.match(new RegExp(symbolPattern))) {
        e.preventDefault();
        return;
      }
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  renderAddon(content) {
    return (
      <Text tag="span" className="hs_addon">
        {content}
      </Text>
    );
  }

  renderIcon(icon, align) {
    return (
      React.isValidElement(icon) ? icon :
        <Icon icon={icon} className={classnames('hs_icon', `hs_icon--${align}`)} />
    );
  }

  renderInput(props) {
    const {
      id, readOnly, className, inputRef, type, bare, value, defaultValue, htmlReadOnly,
      ...pprops
    } = props;
    const inputClassNames = classnames(className, bare ? 'hs_static--bare' : 'hs_static');
    return (
      readOnly ?
        <Text className="hs_static" id={id}>
          {value}
        </Text> :
        <input
          ref={inputRef}
          className={inputClassNames}
          id={id}
          type={type}
          value={value}
          defaultValue={defaultValue}
          readOnly={htmlReadOnly}
          { ...pprops }
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
    );
  }

  render() {
    const {
      id = `input-${uuid()}`, label, required, error, readOnly, totalCols, cols, ...props
    } = this.props;
    if (label || required || error || totalCols || cols) {
      const formElemProps = {
        id, label, required, error, readOnly, totalCols, cols,
      };
      return (
        <FormElement { ...formElemProps }>
          <Input { ...{ id, readOnly, ...props } } />
        </FormElement>
      );
    }
    const {
      iconLeft, iconRight, addonLeft, addonRight, ...pprops
    } = props;
    delete pprops.symbolPattern;
    const inputProps = { ...pprops, id, readOnly };
    if (iconLeft || iconRight || addonLeft || addonRight) {
      const wrapperClassName = classnames('hs_wrapper');
      return (
        <div className={wrapperClassName}>
          {addonLeft ? this.renderAddon(addonLeft) : undefined}
          {iconLeft ? this.renderIcon(iconLeft, 'left') : undefined}
          {this.renderInput(inputProps)}
          {iconRight ? this.renderIcon(iconRight, 'right') : undefined}
          {addonRight ? this.renderAddon(addonRight) : undefined}
        </div>
      );
    }
    return this.renderInput(inputProps);
  }
}

Input.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  bare: PropTypes.bool,
  inputRef: PropTypes.func,
  symbolPattern: PropTypes.string,
  readOnly: PropTypes.bool,
  htmlReadOnly: PropTypes.bool,
  iconLeft: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  iconRight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  addonLeft: PropTypes.string,
  addonRight: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

Input.isFormElement = true;
