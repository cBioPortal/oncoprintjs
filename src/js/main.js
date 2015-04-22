var d3 = require('d3');
var _ = require('underscore');

var renderers = require('./renderers');
var rendering_engine = require('./rendering_engine');
var sorting = require('./sorting');
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

  var me = function(container_selector_string, data) {
    var top_level_container = d3.select(container_selector_string);
    var table = prepare_table(top_level_container);
    var label_column = table[0];
    var oncoprint_column = table[1];

    // do your oncoprint magic
    oncoprint_column = oncoprint_column.append('div');
    var oncoprint_container = prepare_oncoprint_container(oncoprint_column, data)
    engine.config(get_config());
    engine.container_width(width);
    engine.element_width(rect_width);
    engine.element_padding(rect_padding);
    engine.renderers(rendering_rules_or_default(oncoprint_container));
    oncoprint_container.call(engine);

    // do your label magic
    label_column = label_column.append('div');
    var label_container = prepare_label_container(label_column, data);
    var label_engine = rendering_engine();
    engine.config(get_config());
    engine.container_width(100);
    engine.renderers(_.map(label_container.datum(), function(_){
      return label_renderer;
    }));

    label_column.call(engine);

    function label_renderer(config) {
      var ret = function(selection) {
        selection.selectAll('text')
        .data(function(d) { return d; })
        .append('text')

      };

      return ret;
    }

  };

//   me.insert_row = engine.insert_row;

  me.insert_row = function(container_selector_string, row, rendering_rule) {
    var container = d3.select(container_selector_string);

    var sorted_row = utils.sort_row_by_rows(row, container.datum());

    // update the list of renderers
    rendering_rules.unshift(renderers.gender_rule);
    engine.renderers(rendering_rules);

    engine.insert_row(container, sorted_row, rendering_rule);
  }

  me.resort = function(container_selector_string, sample_id_to_array_index) {
    // TODO this function should live more in the rendering_engine than here.

    var container = d3.select(container_selector_string);

    var resorted_rows = container.datum().map(function(row) {
      return _.sortBy(row, function(d) {
        return sample_id_to_array_index[d.sample || d.sample_id];
      })});

    container.datum(resorted_rows);

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

  //
  // getters and setters
  //

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

  function rendering_rules_or_default(container) {
    if (rendering_rules.length === 0) {
      rendering_rules = _.map(container.datum(), function(row) {
        return renderers.gene_rule;
      });
    }

    return rendering_rules;
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

  // returns a 2-ple [labels_container, oncoprint_container]
  // where each is a <td>.
  function prepare_table(container) {
    var table = container.append('table');
    var the_row = table.append('tr')
    var labels_container = the_row.append('td')
    var oncoprint_container = the_row.append('td')
    return [labels_container, oncoprint_container];
  }

  function prepare_label_container(container, data) {
    var rows = _.chain(data).groupBy(function(d) { return d.gene; }).values().value();
    container.datum(_.flatten(_.map(rows, calculate_row_label)));
    return container;

    function calculate_row_label(row) {
      var percent_altered = _.filter(row, utils.is_sample_genetically_altered).length / row.length;
      percent_altered = Math.round(percent_altered*100);
      return [{align: 'left', text: row[0].gene},
              {align: 'right', text: percent_altered + "%"}];
    }
  }


  // reorganize the flat data into a list of sorted rows
  // bind those rows to the container using .datum()
  function prepare_oncoprint_container(container, data) {
    var rows = _.chain(data).groupBy(function(d) { return d.gene; }).values().value();
    var sorted_rows = sorting.sort_rows(rows, sorting.genomic_metric);
    container.datum(sorted_rows);
    return container;
  }

  return me;
};







