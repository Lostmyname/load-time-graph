'use strict';

var Chartist = require('chartist');
var util = require('./util');

util.getJson('src/data.json', function (res) {
  var data = util.takeRight(res.data, 30);

  var options = {
    low: 0,
    axisY: {
      labelInterpolationFnc: function (value) {
        return value + 's';
      }
    },
    lineSmooth: false
  };

  var loadData = {
    labels: util.pluck(data, 'label'),
    series: [
      util.pluck(data, 'uncached'),
      util.pluck(data, 'cached')
    ]
  };

  var displayData = {
    labels: util.pluck(data, 'label'),
    series: [
      util.pluck(data, 'display')
    ]
  };

  new Chartist.Line('.chart-load', loadData, options);
  new Chartist.Line('.chart-display', displayData, options);
});
