var d3 = require('d3');
var _ = require("underscore");
var Oncoprint = require('./core');
var utils = require("./utils");

var config = { rect_height: 20, rect_width: 10 };
config.cna_fills = {null: 'grey', undefined: 'grey', 'AMPLIFIED': 'red', "HOMODELETED": 'blue'};

var rect_padding = 3;

var gene_renderer = function(selection) {
  var row_elements = selection.selectAll('g').data(function(d) { return d; })
  .enter().append('g');

  row_elements.attr('transform', function(d, i) {
    return utils.translate(i * (config.rect_width + rect_padding), 0);
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
