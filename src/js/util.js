'use strict';

var util = module.exports = {};

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
