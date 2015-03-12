var _ = require("underscore");
var sorting = require("../../src/js/sorting");

var genomic_oncoprint = require('../../src/js/genomic');

// TODO this is dirty.
window.test_for_genomic_data = function(filename, div_selector_string) {
  return d3.json(filename, function(data) {

    // break into rows
    rows = _.chain(data).groupBy(function(d) { return d.gene; }).values().value();

    var genes = rows.map(function(row) {return row[0].gene});

    var indexers = _.range(rows.length)
                    .reverse()     // least significant first
                    .map(function(ith_row) {
                      return function(index) { return rows[ith_row][index]; };
                    });

    var sorted_column_indices = sorting.radix(_.range(rows[0].length), genomic_comparison, indexers);

    var sorted_rows = _.map(rows, function(row) {
      return sorted_column_indices.map(function(i) { return row[i]; });
    });

    d3.select(div_selector_string).datum(sorted_rows);

    var oncoprint = genomic_oncoprint();

    oncoprint.width(750);
    oncoprint.row_height(25);

    d3.select(div_selector_string).call(oncoprint);
  });
};

function genomic_comparison(sample1, sample2) {
  var cna_order = {AMPLIFIED:4, HOMODELETED:3, GAINED:2, HEMIZYGOUSLYDELETED:1, DIPLOID: 0, undefined: 0};
  var regulated_order = {UPREGULATED: 2, DOWNREGULATED: 1, undefined: 0};
  var mutation_order_f = function(m) { return m === undefined ? 0 : (/fusion($|,)/i.test(m)?2:1); };

  var cna_diff = cna_order[sample2.cna] - cna_order[sample1.cna];
  if (cna_diff !== 0) {
    return cna_diff;
  }

  var mutation_diff = mutation_order_f(sample2.mutation) - mutation_order_f(sample1.mutation);
  if (mutation_diff !== 0) {
    return mutation_diff;
  }

  var mrna_diff = regulated_order[sample2.mrna] - regulated_order[sample1.mrna];
  if (mrna_diff !== 0) {
    return mrna_diff;
  }

  var rppa_diff = regulated_order[sample2.rppa] - regulated_order[sample1.rppa];
  if (rppa_diff !== 0) {
    return rppa_diff;
  }

  // they are equal in every way
  return 0;
};
