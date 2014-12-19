
// TODO while in dev mode clear out #main each time this file is executed
console.log("clearing #main");
d3.select('#main').selectAll("*").remove();

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
  var config;
  var rows;

  var me = function(container) {
    var svg = container.append('svg');

    // note that this is removing the renderer from each row.
    var renderers = _.map(rows, function(row) { return row.pop(); });

    var row_groups = svg.selectAll('g').data(rows)
      .enter().append('g')
        .attr('transform', function(d,i) { return transform(0, i * config.row_padding); });

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

  return me;
};

// note that the config and the renderers are going to have to play nice together.
// I think that the consequence of this is that the core module will predominantely
// be used by people "in the know." As always, the question is what parts to separate.
var config = { rect_height: 20, rect_width: 10 };
config.cna_fills = {null: 'grey', undefined: 'grey', 'AMPLIFIED': 'red', "HOMODELETED": 'blue'};

var gene_renderer = function(selection) {
  selection.attr('transform', function(d, i) { return transform(0, i * (config.rect_height * 1.5)); });

  var row_elements = selection.selectAll('g').data(function(d) { return d; })
    .enter().append('g');

  row_elements
    .attr('transform', function(d, i) { return transform(i * (config.rect_width + 3), 0); });

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
    // row.push(_.identity);
    });

    oncoprint.rows(rows);
    oncoprint.config({row_padding: 25});

    // d3.select('#main').call(oncoprint);

    oncoprint(d3.select("#main"));
});
