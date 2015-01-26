var d3 = require('d3');
var _ = require('underscore');
var utils = require('./utils');

function compute_svg_width(rect_width, rect_padding, row_length) {
  return (rect_width + rect_padding) * row_length;
}

var core = function() {
  var config = { row_height: 15 };
  var container_width = 100;
  var element_padding = 1;
  var element_width = 1;
  var rows = undefined;
  var svg_height = 95;

  var me = function(container) {

    // validation
    if (rows === undefined) {
      throw "'rows' is unset."
    }

    var svg = container.append('svg')
      .attr('width', compute_svg_width(element_width, element_padding, rows[0].length))
      .attr('height', config.row_height * rows.length);

    container.style('width', container_width + "px")
      .style('display', 'inline-block')
      .style('overflow-x', 'auto')
      .style('overflow-y', 'hidden');

    // note that this is removing the renderer from each row.
    var renderers = _.map(rows, function(row) { return row.pop(); });

    var row_groups = svg.selectAll('g').data(rows)
      .enter().append('g')
        .attr('transform', function(d,i) {
          return utils.translate(0, i * config.row_height);
        });

    // TODO I think that this could be replaced with a `d3.call` to the row_groups.
    // if you run `d3.each` on a selection, d3 will iterate over the data bound
    // to an element, not the element itself. So some gymnastics is required to
    // get access to specific layers of the nested selection.
    _.chain(row_groups[0]       // raw list of DOM elements, i.e. peel away d3
           ).map(d3.select)    // reselect each one individually
    .each(function(row,i) {
      renderers[i](row);
    }).value();
  };

  me.rows = function(value) {
    if (!arguments.length) return rows;
    rows = value;
    return me;
  };

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

  return me;
};

module.exports=core;
