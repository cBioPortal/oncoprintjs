var _ = require("underscore");

var OncoPrint = require('../../src/js/main');
var renderers = require("../../src/js/renderers");
var utils = require("../../src/js/utils");

var config = { rect_height: 20,
              rect_padding: 3,
              rect_width: 10,
              row_height: 25,
              mutation_fill: 'green',
              width: 750,
              cna_fills: {
              null: 'grey',
              undefined: 'grey',
              AMPLIFIED: 'red',
              HOMODELETED: 'blue'
             }
};

module.exports = function test_script(filenames, div_selector_string) {
  // filenames has length 2.
  var genomic_file = filenames[0];
  var additional_file = filenames[1];

  // expose the oncoprint instance for the UI buttons
  var oncoprint;

  // genomic data
  return d3.json(genomic_file, function(genomic_data) {
    if (additional_file !== undefined) {
      d3.json(additional_file, function(clinical_data) {
        var oncoprint = OncoPrint()
              .rendering_rules([renderers.gender_rule,
                                renderers.gene_rule,
                                renderers.gene_rule,
                                renderers.gene_rule]);

        var genomic_data_rows = _.chain(genomic_data)
              .groupBy(function(d) {return d.gene;}).values().value();

        var all_rows = [clinical_data.data].concat(genomic_data_rows);
        oncoprint(div_selector_string, all_rows);
      });
    }

    // shuffle order button
    if (genomic_file.indexOf("gbm") !== -1)
      d3.select('#shuffle-gbm').on('click', function() {
        // get and shuffle order
        var container = d3.select(div_selector_string);
        var sampleids = container.datum()[0].map(function(d) { return d.sample_id || d.sample; });
        var shuffled_sampleids = d3.shuffle(sampleids);

        var sampleid_to_array_index = utils.invert_array(shuffled_sampleids);
        oncoprint.resort(div_selector_string, sampleid_to_array_index);
      });

  });
};
