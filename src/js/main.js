var d3 = require('d3');
var _ = require('underscore');

var renderers = require('./renderers');
var rendering_engine = require('./rendering_engine');
var utils = require('./utils');

module.exports = function() {
  var cna_fills = {
    AMPLIFIED: 'red',
    HOMODELETED: 'blue',
    null: 'grey',
    undefined: 'grey'
  };
  var rect_height = 20;
  var rect_padding = 3;
  var rect_width = 10;
  var rendering_rules = [];
  var row_height = 25;
  var mutation_fill = 'green';
  var width = 750;

  var engine = rendering_engine();

  var me = function(container) {
    engine.config(get_config());
    engine.container_width(width);
    engine.element_width(rect_width);
    engine.element_padding(rect_padding);
    engine.label_function(rows_to_labels);
    engine.renderers(rendering_rules);
    container.call(engine);
  };

  me.insert_row = engine.insert_row;

  me.resort = function(container, sample_id_to_array_index) {
    var row_groups = container.selectAll('.oncoprint-row');
    row_groups = row_groups[0].map(d3.select);
    utils.assert(row_groups.length === rendering_rules.length,
                 "Rows don't matchup with rendering rules.");
    row_groups = row_groups.reverse();

    _.each(_.zip(row_groups, rendering_rules), function(row_group_and_rr) {
      var row_group = row_group_and_rr[0];
      var rr = row_group_and_rr[1];
      rr(get_config()).resort(row_group, sample_id_to_array_index);
    });
  };

  me.cna_fills = function(value) {
    if (!arguments.length) return cna_fills;
    cna_fills = value;
    return me;
  };

  me.rect_height = function(value) {
    if (!arguments.length) return rect_height;
    rect_height = value;
    return me;
  };

  me.rect_padding = function(value) {
    if (!arguments.length) return rect_padding;
    rect_padding = value;
    return me;
  };

  me.rect_width = function(value) {
    if (!arguments.length) return rect_width;
    rect_width = value;
    return me;
  };

  me.rendering_rules = function(value) {
    if (!arguments.length) return rendering_rules;
    rendering_rules = value;
    return me;
  };

  me.row_height = function(value) {
    if (!arguments.length) return row_height;
    row_height = value;
    return me;
  };

  me.mutation_fill = function(value) {
    if (!arguments.length) return mutation_fill;
    mutation_fill = value;
    return me;
  };

  me.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return me;
  };

  //
  // HELPER FUNCTIONS
  //

  function calculate_row_label(row) {
    var percent_altered = _.filter(row, utils.is_sample_genetically_altered).length / row.length;
    percent_altered = Math.round(percent_altered*100);
    return [{align: 'left', text: row[0].gene}, {align: 'right', text: percent_altered + "%"}];
  }

  function get_config() {
    return {
      cna_fills: cna_fills,
      rect_height: rect_height,
      rect_padding: rect_padding,
      rect_width: rect_width,
      rendering_rules: rendering_rules,
      row_height: row_height,
      mutation_fill: mutation_fill,
      width: width
    };
  }

  function rows_to_labels(rows) {
    return _.flatten(_.map(rows, calculate_row_label));
  }


  return me;
};







