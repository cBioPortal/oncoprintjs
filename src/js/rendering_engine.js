var d3 = require('d3');
var _ = require('underscore');
var utils = require('./utils');
var renderer_functions = require('./renderers');

module.exports = function rendering_engine() {
  var config = { row_height: 15 };
  var container_width = 100;
  var element_padding = 1;
  var element_width = 1;
  var label_function = undefined;
  var renderers = [];

  var me = function(container) {
    var table = container.append('table');
    var configured_renderers = _.map(renderers, function(r) { return r(config); });

    var rows = container.datum();

    var renderers_and_data;
    if (configured_renderers.length === rows.length) {
      renderers_and_data = _.zip(configured_renderers, rows);
    }
    else {
      throw "Rows don't match renderers";
    }

    renderers_and_data.forEach(function(pair) {
      var renderer = pair[0];
      var row = pair[1];

      var tr = table.append('tr');
      var label_container = tr.append('td');
      var oncoprint_container = tr.append('td');
      //oncoprint_container.attr('overflow-x', 'hidden');
      oncoprint_container.attr('width', config.width);
      oncoprint_container.attr('height', config.rect_height * 2);
      renderer(row, label_container, oncoprint_container);
    });
  };

  me.insert_row = function(container, row, rendering_rule) {
    // TODO
  };

  //
  // HELPER FUNCTIONS
  //

  // styles, appends, does all the right stuff to the container
  // so that we can go on to work with the inner <svg>.
  function create_svg_for_container(container) {
    container.style('width', container_width + "px")
      .style('display', 'inline-block')
    //.style('overflow-x', 'auto')
      .style('overflow-y', 'hidden');

    // infer from the data that is already bound to the div.
    var rows = container.datum();
    var row_length = infer_row_length(container);

    return container.append('svg')
      .attr('width', compute_svg_width(element_width, element_padding, row_length))
      .attr('height', config.row_height * rows.length);

    function compute_svg_width(rect_width, rect_padding, row_length) {
      return (rect_width + rect_padding) * row_length;
    }

    function infer_row_length(container) {
      var rows = container.datum();
      if (rows === undefined) throw "Cannot infer row length from a container without rows.";

      var is_well_formed_matrix = _.every(rows, function(row) {
        return row.length === rows[0].length;
      });

      if (!is_well_formed_matrix) throw "Uneven rows, cannot infer row length.";
      return rows[0].length;
    }
  }

  function get_svg_from_container(container) {
    // the first child contains the labels
    return container.selectAll("table tr td:nth-child(2) div svg");
  }

  function oncoprint_key_function(d) {
    return d.gene || d.attr_id;
  }

  //
  // GETTERS / SETTERS
  //

  me.config = function(value) {
    if (!arguments.length) return config;
    config = value;
    return me;
  };

  me.container_width = function(value) {
    if (!arguments.length) return container_width;
    container_width = value;
    return me;
  };

  me.element_padding = function(value) {
    if (!arguments.length) return element_padding;
    element_padding = value;
    return me;
  };

  me.element_width = function(value) {
    if (!arguments.length) return element_width;
    element_width = value;
    return me;
  };

  me.label_function = function(value) {
    if (!arguments.length) return label_function;
    label_function = value;
    return me;
  };

  me.renderers = function(value) {
    if (!arguments.length) return renderers;
    renderers = value;
    return me;
  };

  return me;
};
