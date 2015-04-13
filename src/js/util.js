'use strict';

var util = module.exports = {};

util.getJson = function (url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';

  xhr.onload = function () {
    cb(xhr.response, xhr);
  };

  xhr.send();

  return xhr;
};

util.map = function (ary, fn) {
  return ary.map(fn);
};

util.pluck = function (ary, prop) {
  return util.map(ary, function (obj) {
    return obj[prop];
  });
};

util.takeRight = function (ary, n) {
  if (typeof n !== 'number') {
    return util.takeRight(ary, 1);
  }

  return ary.slice(-n);
};
