// TODO wait for gulp.
//var _ = require('underscore');
//var d3 = require('d3');
//var data = require('./tp53-mdm2-mdm4-gbm.json');

// utils
function transform(x,y) {
    // TODO fix name
  return "translate(" + x + "," + y + ")";
}

var Oncoprint = function() {
  var config = { row_height: 15 };
  var container_width = 100;
  var rows = [];
  var svg_height = 95;
  var svg_width = 95;

  var me = function(container) {

    var svg = container.append('svg')
      .attr('width', svg_width)
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
          return transform(0, i * config.row_height);
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
  }

  me.config = function(value) {
    if (!arguments.length) return config;
    config = value;
    return me;
  }

  me.container_width = function(value) {
    if (!arguments.length) return container_width;
    container_width = value;
    return me;
  }

  me.svg_width = function(value) {
    if (!arguments.length) return svg_width;
    svg_width = value;
    return me;
  }

  return me;
};

var config = { rect_height: 20, rect_width: 10 };
config.cna_fills = {null: 'grey', undefined: 'grey', 'AMPLIFIED': 'red', "HOMODELETED": 'blue'};

var rect_padding = 3;

var gene_renderer = function(selection) {
  var row_elements = selection.selectAll('g').data(function(d) { return d; })
    .enter().append('g');

  row_elements.attr('transform', function(d, i) {
    return transform(i * (config.rect_width + rect_padding), 0);
  });

  row_elements.append('rect')
    .attr('fill', function(d) { return config.cna_fills[d.cna]; })
    .attr('height', config.rect_height)
    .attr('width', config.rect_width);
};

d3.json("tp53-mdm2-mdm4-gbm.json", function(data) {
  var oncoprint = Oncoprint();

  // break into rows
  rows = _.chain(data).groupBy(function(d) { return d.gene; }).values().value();

  // push selection renderer for each row
  _.each(rows, function(row) {
    row.push(gene_renderer);
  });

  var row_height = 25;

  oncoprint.container_width(500);
  oncoprint.svg_width((config.rect_width + rect_padding) * rows[0].length);
  oncoprint.config({row_height: row_height});
  oncoprint.rows(rows);

  d3.select('#main').call(oncoprint);
});
