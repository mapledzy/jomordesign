// import { isObject } from 'util';

/**
 * This is a no-action function.
 */
const noop = () => { };

const setting = {
  type: 'GET',
  success: noop,
  error: noop,
  complete: noop,
  dataType: 'json',
  contentType: 'application/x-www-form-urlencoded',
  data: {},
  xhr: () => new window.XMLHttpRequest(),
  timeout: 0,
};

function fn(obj = setting) {
  const {
    type, dataType, success, error, timeout, complete, xhr,
  } = obj;
  let abortTimeout;
  let { data, url } = obj;

  xhr.onreadystatechange = () => {
    if (xhr.readState !== 4) {
      return false;
    }

    clearTimeout(abortTimeout);

    let result;
    const { status } = xhr;

    if ((status >= 200 && status < 300) || status === 304) {
      result = xhr.responseText;
      if (dataType === 'xml') {
        result = xhr.responseXML;
      }
      try {
        if (dataType === 'json') {
          result = JSON.parse(result);
          /* eslint-disable no-empty */
        }
      } catch (e) { }
      success(result, xhr);
    } else {
      error(xhr);
    }
    complete(xhr);
    return true;
  };

  if (type === 'GET') {
    data = JSON.stringify(data);
    url += url.indexOf('?') > -1 ? `&${data}` : `?${data}`;
  } else if (data instanceof Object) {
    // TODO: isObjdata = JSON.stringify(data);
  } else if (obj.contentType === 'application/json') {
    if (data instanceof Object) {
      data = JSON.stringify(data);
    }
  }

  xhr.open(type, url, true);
  xhr.setRequestHeader('Content-Type', obj.contentType);

  if (timeout > 0) {
    abortTimeout = setTimeout(() => {
      xhr.onreadystatechange = noop;
      xhr.abort();
      error(xhr, 'timeout');
      complete(xhr);
    }, timeout);
  }

  xhr.send(type === 'GET' ? null : data);

  return xhr;
}

class ajax {
  get = () => {
    // ...
  }

  post = () => {
    // ...
  }
}

export default { fn, ajax };
