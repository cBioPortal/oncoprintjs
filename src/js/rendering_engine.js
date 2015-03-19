var d3 = require('d3');
var _ = require('underscore');
var utils = require('./utils');
var renderer_functions = require('./renderers');

module.exports = function rendering_engine() {
  var config = { row_height: 15 };
  var container_width = 100;
  var element_padding = 1;
  var element_width = 1;
  var labels = [];
  var renderers = [];
  var svg_height = 95;

  var me = function(container) {

    container = container.append('table').append('tr')
    var label_container = container.append('td')
    var oncoprint_container = container.append('td').append('div')
    var svg = oncoprint_container_to_svg(oncoprint_container);

    var element_height = 20;

    // TODO!
    label_container.append('svg').append('g').selectAll('text')
      .data(labels)
      .enter()
      .append('text')
      .attr('text-anchor', function(d) {
        return d.align === 'right' ? 'end' : 'start';
      })
      .attr('x', function(d) { return d.align === 'right' ? 50 : 0 })
      .attr('y', function(d, i) {
        return (element_padding + 20 - 12 / 2) + i * 1.5 * (element_padding + 20 - 12 / 2);
      })
      .attr('font-size', '12px')
      .append('tspan')
      .text(function(d) { return d.text; })

    svg.each(function(rows) {
      svg.selectAll('g').data(rows)
      .enter().append('g')
      .attr('transform', function(d,i) {
        return utils.translate(0, i * config.row_height);
      })
      .each(function(d,i) {
        d3.select(this).call(renderers[i]);
      })
    });
  };

  //
  // HELPER FUNCTIONS
  //

  function infer_row_length(container) {
    var rows = container.datum();
    if (rows === undefined) throw "Cannot infer row length from a container without rows.";

    var is_well_formed_matrix = _.every(rows, function(row) {
      return row.length === rows[0].length;
    });

    if (!is_well_formed_matrix) throw "Uneven rows, cannot infer row length."
    return rows[0].length;
  }

  // styles, appends, does all the right stuff to the container
  // so that we can go on to work with the inner <svg>.
  function oncoprint_container_to_svg(container) {
    container.style('width', container_width + "px")
    .style('display', 'inline-block')
    .style('overflow-x', 'auto')
    .style('overflow-y', 'hidden');

    // infer from the data that is already bound to the div.
    var row_length = infer_row_length(container)

    return container.append('svg')
    .attr('width', compute_svg_width(element_width, element_padding, row_length))
    .attr('height', config.row_height * rows.length);
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

  me.labels = function(value) {
    if (!arguments.length) return labels;
    labels = value;
    return me;
  };

  me.renderers = function(value) {
    if (!arguments.length) return renderers;
    renderers = value;
    return me;
  };

  return me;
};

function compute_svg_width(rect_width, rect_padding, row_length) {
  return (rect_width + rect_padding) * row_length;
}
