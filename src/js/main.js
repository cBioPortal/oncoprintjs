var renderers = require('./renderers');
var engine = require('./rendering_engine');
var utils = require('./utils');

var exports = module.exports = {};

var aSetting = "HELLO WORLD";

exports.oncoprint = function oncoprint() {
  alert("HELLO WORLD");
};

exports.aSetting = function(value) {
  if (!arguments.length) return aSetting;
  aSetting = value;
  return exports;
};
