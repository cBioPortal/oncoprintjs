var d3 = require('d3');
var _ = require('underscore');

var utils = require('./utils');
var exports = module.exports = {};

exports.continuous_data_rule = function continuous_data_rule(config) {
};

exports.discrete_data_rule = function discrete_data_rule(config) {
};

exports.gender_rule = function gender_rule(config) {
  var ret = function(selection) {
    selection.selectAll('rect')
    .data(function(d) { return d; })
    .enter()
    .append('rect')
    .attr('x', function(d, i) {
      return i * (config.rect_width + config.rect_padding);
    })
    .attr('fill', function(d) {
      if (d.attr_val === "MALE")
        return 'black';
      if (d.attr_val === "FEMALE")
        return 'pink';
      return 'grey';
    })
    .attr('height', config.rect_height)
    .attr('width', config.rect_width);

    update(selection.selectAll('rect'));
  };

  ret.resort = function(selection, sample_order) {
    selection.selectAll('rect')
    .transition(function(d, i) { return i; })
    .attr('x', function(d, i) {
      return sample_order[d.sample_id || d.sample] *
        (config.rect_width + config.rect_padding);
    });
  };

  return ret;
};

exports.gene_rule = function gene_rule(config) {

  var ret = function(row, label, oncoprint_container) {
    var svg = create_svg_for_container(oncoprint_container, config.rect_width, config.rect_padding, config.rect_height);

    var group = svg.selectAll('g')
          .data(row)
          .enter()
          .append('g')
    ;

    cna_visualization(group, config.cna_fills, config.rect_width, config.rect_height);
    align_sample_group_horizontally(group, config.rect_width, config.rect_padding);
    mutation_visualization(group, config.rect_height / 3, config.rect_width, config.mutation_fill);

    update(group);
  };

  return ret;
  
  // var ret = function(selection) {
  //   var sample_group = bind_sample_group(selection);
  //   align_sample_group_horizontally(sample_group, config.rect_width, config.rect_padding);
  //   cna_visualization(sample_group, config.cna_fills, config.rect_width, config.rect_height);
  //   mutation_visualization(sample_group, config.rect_height / 3, config.rect_width, config.mutation_fill);

  //   update(sample_group);
  // };

  // ret.resort = function(selection, sample_order) {
  //   selection.selectAll('g')
  //   .transition(function(d, i) { return i; })
  //   .attr('transform', function(d, i) {
  //     return utils.translate(sample_order[d.sample_id || d.sample]
  //                            * (config.rect_width + config.rect_padding), 0);
  //   });
  // };

  // return ret;
};

//
// HELPER FUNCTIONS
//

function align_sample_group_horizontally(sample_group, rect_width, rect_padding) {
  return sample_group.attr('transform', function(d, i) {
    return utils.translate(i * (rect_width + rect_padding), 0);
  });
}

function bind_sample_group(selection) {
  // binds the row-wise data to the row group, <g>. See Bostock's
  // explaination on nested selections: http://bost.ocks.org/mike/nest/#data
  return selection.selectAll('g')
  .data(function(d) { return d; })
  .enter().append('g');
}

// copy number alteration "subrule"
function cna_visualization(sample_group, cna_fills, rect_width, rect_height) {
  return sample_group.append('rect')
  .attr('fill', function(d) { return cna_fills[d.cna]; })
  .attr('height', rect_height)
  .attr('width', rect_width);
}

// mutation "subrule"
function mutation_visualization(sample_group, one_third_height, width, fill) {
  var mutation = sample_group.append('rect')
  .attr('y', one_third_height)
  .attr('fill', function(d) {
    // leave the ones without mutations uncolored
    return d.mutation !== undefined ? fill : 'none';
  })
  .attr('height', one_third_height)
  .attr('width', width);

  // remove the ones without mutations
  mutation.filter(function(d) {
    return d.mutation === undefined;
  }).remove();
}

// TODO dev only, consider renaming this function. Pull in a global flag or what have you.
function update(sample_group) {
  sample_group.on("click", function(d) {
    d3.selectAll('.selected_sample').text(JSON.stringify(d));
  });
}


// styles, appends, does all the right stuff to the container
// so that we can go on to work with the inner <svg>.
function create_svg_for_container(container, element_width, element_padding, height) {
  container.style('display', 'inline-block')
    //.style('overflow-x', 'auto')
    .style('overflow-y', 'hidden');

  // infer from the data that is already bound to the div.
  var rows = container.datum();
  var row_length = infer_row_length(container);

  return container.append('svg')
    .attr('height', height)
    .attr('width', compute_svg_width(element_width, element_padding, row_length));

  
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
