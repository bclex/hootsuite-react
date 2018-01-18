import createUUID from 'uuid';

export const uuid = process.env.NODE_ENV === 'test' ? () => '$uuid$' : createUUID;

export function inputChange(e, action) {
  if (e.target) {
    const { value, id } = {
      value: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      id: e.target.id,
    };
    action(e.target, id, value, null);
  } else {
    const { value, valueFile, id } = {
      value: e.type === 'fileinput' ? (e.value ? e.value.file.name : null) : e.value,
      valueFile: e.type === 'fileinput' ? e.value : null,
      id: e.id,
    };
    action(e, id, value, valueFile);
  }
}

// export function getQueryParam(name, url) {
//   if (!url) url = window.location.href;
//   var queryString = url.split('?');
//   queryString = queryString[queryString.length - 1];
//   var params = queryString.split('&');
//   for (var i = 0; i < params.length; i++) {
//     var splitPair = params[i].split('=');
//     if (splitPair[0] === name) {
//       return splitPair[1];
//     }
//   }
// };

export function getQueryParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var results = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)').exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export function getFrameContext() {
  var ctx = {
    lang: getQueryParam('lang'),
    timezone: getQueryParam('timezone'),
    pid: getQueryParam('pid'),
    uid: getQueryParam('uid'),
    ts: getQueryParam('ts'),
    token: getQueryParam('token'),
  };
  return ctx;
};

export function convertDataURIToBinary(dataURI) {
  const BASE64_MARKER = ';base64,';
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  const raw = window.atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));
  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

export function convertDataURIToString(dataURI) {
  const data = convertDataURIToBinary(dataURI);
  const string = String.fromCharCode.apply(null, data);
  return string;
}

export default {
  uuid,
  inputChange,
  getQueryParam,
  getFrameContext,
  convertDataURIToBinary,
  convertDataURIToString,
};
