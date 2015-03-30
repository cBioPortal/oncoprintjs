var utils = require('./utils');
var exports = module.exports = {};

exports.continuous_data_rule = function continuous_data_rule(config) {
};

exports.discrete_data_rule = function discrete_data_rule(config) {
};

exports.gender_rule = function gender_rule(config) {
  return function(selection) {
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
};

exports.gene_rule = function gene_rule(config) {
  return function(selection) {
    var sample_elements = selection.selectAll('g')
    // binds the row-wise data to the row group, <g>. See Bostock's
    // explaination on nested selections: http://bost.ocks.org/mike/nest/#data
    .data(function(d) { return d; })
    .enter().append('g');

    sample_elements.attr('transform', function(d, i) {
      return utils.translate(i * (config.rect_width + config.rect_padding), 0);
    });

    sample_elements.append('rect')
    .attr('fill', function(d) { return config.cna_fills[d.cna]; })
    .attr('height', config.rect_height)
    .attr('width', config.rect_width);

    var one_third_height = config.rect_height / 3;

    var mutation = sample_elements.append('rect')
    .attr('y', one_third_height)
    .attr('fill', function(d) {
      // leave the ones without mutations uncolored
      return d.mutation !== undefined ? config.mutation_fill : 'none';
    })
    .attr('height', one_third_height)
    .attr('width', config.rect_width);

    // remove the ones without mutations
    mutation.filter(function(d) {
      return d.mutation === undefined;
    }).remove();

    update(sample_elements);
  };
};

// TODO dev only
function update(sample_elements) {
  sample_elements.on("click", function(d) {
    d3.selectAll('.selected_sample').text(JSON.stringify(d));
  });
}
