import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class FormElement extends React.Component {
  renderFormElement(props) {
    /* eslint-disable no-unused-vars */
    const {
      className, error, totalCols, cols = 1, formElementRef, children,
    } = props;
    const formElementClassNames = classnames('hs_input', { hs_hasError: error }, className);
    return (
      <div ref={formElementRef} key="hs_input" className={formElementClassNames}>
        {children}
      </div>
    );
  }

  renderLabel() {
    const { id, label, required } = this.props;
    /* eslint-disable jsx-a11y/label-has-for */
    return (label ?
      <label key="hs_label" className="hs_label" htmlFor={id} >
        {label}
        {required ? <abbr className="hs_required">*</abbr> : undefined}
      </label > :
      undefined);
  }

  renderControl(props) {
    const { children, error } = props;
    const { readOnly } = this.props;
    const formElementControlClassNames = classnames('hs_input', { 'hs_input-readonly': readOnly });
    return (
      <div key="hs_input" className={formElementControlClassNames}>
        {children}
        {this.renderError(error)}
      </div>);
  }

  renderError(error) {
    const errorMessage =
      error ?
        (typeof error === 'string' ? error : typeof error === 'object' ? error.message : undefined) :
        undefined;
    return (errorMessage ?
      <span key="hs_error" className="hs_error">{errorMessage}</span> :
      undefined);
  }

  render() {
    const {
      dropdown, className, totalCols, cols, error,
      children, style, ...props
    } = this.props;
    const labelElem = this.renderLabel();
    if (dropdown) {
      const controlElem = this.renderControl({ children });
      const formElemChildren = [labelElem, controlElem];
      const innerFormElem = this.renderFormElement({ ...props, children: formElemChildren });
      const outerControlElem = this.renderControl({ error, children: dropdown });
      const outerFormElemChildren = [
        innerFormElem,
        <div key="hs_outer" className="hs_outer" style={style}>{outerControlElem}</div>,
      ];
      const outerFormClassName = classnames('hs_outer', className);
      return this.renderFormElement({
        ...props,
        error,
        totalCols,
        cols,
        className: outerFormClassName,
        children: outerFormElemChildren,
      });
    }
    const controlElem = this.renderControl({ children, error });
    const formElemChildren = [labelElem, controlElem];
    return this.renderFormElement({
      ...props,
      className,
      error,
      totalCols,
      cols,
      children: formElemChildren,
    });
  }
}

FormElement.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
  readOnly: PropTypes.bool,
  cols: PropTypes.number,
  totalCols: PropTypes.number,
  dropdown: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  formElementRef: PropTypes.func,
  /* eslint-disable react/forbid-prop-types */
  style: PropTypes.object,
};

FormElement.isFormElement = true;
