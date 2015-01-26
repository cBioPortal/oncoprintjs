var d3 = require('d3');
var _ = require('underscore');

var renderers = require('./renderers');
var Oncoprint = require('./core');
var utils = require('./utils');

var oncoprint = Oncoprint();

var config = { rect_height: 20,
              rect_padding: 3,
              rect_width: 10,
              mutation_fill: 'green',

              cna_fills: {
              null: 'grey',
              undefined: 'grey',
              AMPLIFIED: 'red',
              HOMODELETED: 'blue'
             }
};

var gene_renderer = renderers.gene(config);

var genomic = function() {
  var row_height = 25;
  var width = 500;
  var rows = [];

  var me = function(container) {
    oncoprint.container_width(width);
    oncoprint.element_width(config.rect_width);
    oncoprint.element_padding(config.rect_padding);
    oncoprint.config({row_height: row_height});
    oncoprint.rows(rows);
    container.call(oncoprint);
  };

  me.rows = function(value) {
    if (!arguments.length) return rows;

    // push selection renderer for each row
    value = _.map(value, function(row) {
      return row.concat([gene_renderer]);
    });

    rows = value;
    return me;
  };

  me.row_height = function(value) {
    if (!arguments.length) return row_height;
    row_height = value;
    return me;
  };

  me.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return me;
  };

  return me;
};

module.exports = genomic;
