import Checkbox from './Checkbox';
import { TopBar, Messages } from './Content';
import FieldSet from './FieldSet';
import FileInput, { Dropzone } from './FileInput';
import FormElement from './FormElement';
import Icon from './Icon';
import Input from './Input';
import Radio from './Radio';
import Select, { Option } from './Select';
import Text from './Text';
import Textarea from './Textarea';

// exports
export {
  Checkbox,
  TopBar, Messages,
  FieldSet,
  FileInput, Dropzone,
  FormElement,
  Icon,
  Input,
  Radio,
  Select, Option,
  Text,
  Textarea,
};

export { default as util } from './util';

// Object.keys polyfill
/* eslint-disable func-names, no-restricted-syntax */
if (!Object.keys) {
  Object.keys = function (obj) {
    const keys = [];
    for (const k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) keys.push(k);
    return keys;
  };
}

// Element.matches() polyfill
/* eslint-disable func-names */
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function (s) {
      const matches = (this.document || this.ownerDocument).querySelectorAll(s);
      let i = matches.length;
      while (--i >= 0 && matches.item(i) !== this);
      return i > -1;
    };
}
