var d3 = require('d3');
var _ = require('underscore');

var renderers = require('./renderers');
var core = require('./core');
var utils = require('./utils');

var oncoprint_core = core();

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

function is_sample_genetically_altered(datum) {
  return datum.cna !== undefined
    || datum.mutation !== undefined
    || datum.rna !== undefined
    || datum.protein !== undefined;
};

function row_to_labels(row) {
  var percent_altered = _.filter(row, is_sample_genetically_altered).length / row.length;
  percent_altered = Math.round(percent_altered*100);
  return [{align: 'left', text: row[0].gene}, {align: 'right', text: percent_altered + "%"}];
};

function rows_to_labels(rows) {
  return _.flatten(_.map(rows, row_to_labels));
}

var genomic = function() {
  var row_height = 25;
  var width = 500;
  var rows = [];

  var me = function(container) {
    oncoprint_core.config({row_height: row_height});
    oncoprint_core.container_width(width);
    oncoprint_core.element_width(config.rect_width);
    oncoprint_core.element_padding(config.rect_padding);
    oncoprint_core.labels(rows_to_labels(rows));
    oncoprint_core.rows(rows);
    container.call(oncoprint_core);
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
