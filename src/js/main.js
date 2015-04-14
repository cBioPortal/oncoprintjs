var renderers = require('./renderers');
var engine = require('./rendering_engine');
var utils = require('./utils');

module.exports = function() {
  alert("HELLO WORLD");
};

// var exports = module.exports = {};
// var cna_fills = {
//   AMPLIFIED: 'red',
//   HOMODELETED: 'blue',
//   null: 'grey',
//   undefined: 'grey'
// };
// var rect_height = 20;
// var rect_padding = 3;
// var rect_width = 10;
// var rendering_rules = [];
// var row_height = 25;
// var mutation_fill = 'green';
// var width = 750;

// exports.cna_fills = function(value) {
//   if (!arguments.length) return cna_fills;
//   cna_fills = value;
//   return me;
// };

// exports.rect_height = function(value) {
//   if (!arguments.length) return rect_height;
//   rect_height = value;
//   return me;
// };

// exports.rect_padding = function(value) {
//   if (!arguments.length) return rect_padding;
//   rect_padding = value;
//   return me;
// };

// exports.rect_width = function(value) {
//   if (!arguments.length) return rect_width;
//   rect_width = value;
//   return me;
// };

// exports.rendering_rules = function(value) {
//   if (!arguments.length) return rendering_rules;
//   rendering_rules = value;
//   return me;
// };

// exports.row_height = function(value) {
//   if (!arguments.length) return row_height;
//   row_height = value;
//   return me;
// };

// exports.mutation_fill = function(value) {
//   if (!arguments.length) return mutation_fill;
//   mutation_fill = value;
//   return me;
// };

// exports.width = function(value) {
//   if (!arguments.length) return width;
//   width = value;
//   return me;
// };
