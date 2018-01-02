import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FormElement from './FormElement';
import { handleBinder } from './util';

// [Upload File Component with ReactJS] https://stackoverflow.com/questions/28750489/upload-file-component-with-reactjs
class Dropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDragActive: false };
  }
  onDragLeave = () => {
    this.setState({ isDragActive: false });
  }
  onDragOver = (e) => {
    e.preventDefault();
    /* eslint-disable no-param-reassign */
    e.dataTransfer.dropEffect = 'copy';
    this.setState({ isDragActive: true });
  }
  onDrop = (e) => {
    e.preventDefault();
    this.setState({ isDragActive: false });
    const files = e.dataTransfer ? e.dataTransfer.files : e.target ? e.target.files : null;
    _.each(files, this.loadFile);
  }
  onClick = () => {
    this.fileInputRef.click();
  }
  onButtonClick = (e) => {
    e.preventDefault();
    this.fileInputRef.click();
  }
  loadFile = (file) => {
    // Ensure the HTML5 FileReader API is supported
    if (window.FileReader) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const newFile = { file, url: e.target.result };
        if (this.props.onDrop) {
          this.props.onDrop(newFile);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('The HTML5 FileSystem APIs are not fully supported in this browser.');
    }
  }
  fileInputRef = null;
  render() {
    let className = 'dropzone';
    if (this.state.isDragActive) {
      className += ' active';
    }
    const style = {
      width: this.props.size || '400px',
      height: this.props.size || '50px',
      borderStyle: this.state.isDragActive ? 'solid' : 'dashed',
    };
    /* eslint-disable max-len, jsx-a11y/click-events-have-key-events */
    return (
      <div>
        <div
          style={style}
          className={className}
          onClick={this.onClick}
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
        >
          <input ref={(input) => { this.fileInputRef = input; }} type="file" multiple onChange={this.onDrop} style={{ display: 'none' }} />
          {this.props.children}
        </div>
        {/* <button className="button button-neutral slds-button" onClick={this.onButtonClick}>Browse</button> */}
      </div>
    );
  }
}

Dropzone.propTypes = {
  size: PropTypes.number,
  children: PropTypes.node,
  onDrop: PropTypes.func,
};

export default class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.binderProps = handleBinder(props);
  }
  onAddFile = (x) => {
    if (this.props.onChange) {
      const newFile = {
        // id: uuid(),
        name: x.file.name,
        size: x.file.size,
        file: x.file,
        url: x.url,
      };
      this.props.onChange({
        id: this.props.id,
        props: this.props,
        target: null,
        type: 'fileinput',
        value: newFile,
      });
    }
  }
  onDelete = () => {
    if (this.props.onChange) {
      this.props.onChange({
        id: this.props.id,
        props: this.props,
        target: null,
        type: 'fileinput',
        value: null,
      });
    }
  }
  /* eslint-disable jsx-a11y/href-no-hash */
  render() {
    const {
      errorBinder, labelBinder, onBlurBinder,
      label = this.binderProps.label, required, error = this.binderProps.error, totalCols, cols, value, ...props
    } = this.props;
    const formElemProps = {
      label, required, error, totalCols, cols,
    };
    return (
      <FormElement formElementRef={(node) => { this.node = node; }} { ...formElemProps } >
        <Dropzone onDrop={this.onAddFile} { ...props }>
          {!value && <p>Click, drag &amp; drop files here or <a href="#">browse</a></p>}
          {value && <p>{value}</p>}
        </Dropzone>
        {value && <a href="#" onClick={this.onDelete}>delete</a>}
      </FormElement>
    );
  }
}

FileInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  errorBinder: PropTypes.object,
  labelBinder: PropTypes.object,
  onBlurBinder: PropTypes.object,
};
