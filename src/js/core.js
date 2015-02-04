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
  var labels = [];
  var rows = undefined;
  var svg_height = 95;

  // styles, appends, does all the right stuff to the container
  // so that we can go on to work with the inner <svg>.
  function oncoprint_container_to_svg(container) {
    container.style('width', container_width + "px")
    .style('display', 'inline-block')
    .style('overflow-x', 'auto')
    .style('overflow-y', 'hidden');

    return container.append('svg')
    .attr('width', compute_svg_width(element_width, element_padding, rows[0].length))
    .attr('height', config.row_height * rows.length);
  }

  var me = function(container) {

    // validation
    if (rows === undefined) {
      throw "'rows' is unset."
    }

    container = container.append('table').append('tr')
    var label_container = container.append('td')
    var oncoprint_container = container.append('td').append('div')
    var svg = oncoprint_container_to_svg(oncoprint_container);

    // note that this is removing the renderer from each row.
    var renderers = _.map(rows, function(row) { return row.pop(); });

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

    // setup the rows by binding data and vertically positioning.
    var row_groups = svg.selectAll('g').data(rows)
      .enter().append('g')
        .attr('transform', function(d,i) {
          return utils.translate(0, i * config.row_height);
        });

    // TODO I think that this could be replaced with a `d3.call` to the row_groups.
    // if you run `d3.each` on a selection, d3 will iterate over the data bound
    // to an element, not the element itself. So some gymnastics is required to
    // get access to specific layers of the nested selection.
    var raw_dom = row_groups[0];       // raw list of DOM elements, i.e. peel away d3
    _.chain(raw_dom).map(d3.select)    // reselect each one individually
      .each(function(row,i) {
        renderers[i](row);             // apply the renderer to each row
      }).value();
  };

  //
  // api
  //

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

  me.labels = function(value) {
    if (!arguments.length) return labels;
    labels = value;
    return me;
  };


  return me;
};

module.exports=core;
