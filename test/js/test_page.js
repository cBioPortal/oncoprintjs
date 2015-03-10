var _ = require("underscore");
var sorting = require("../../src/js/sorting");

var genomic_oncoprint = require('../../src/js/genomic');

// TODO this is dirty.
window.test_for_genomic_data = function(filename, div_selector_string) {
  return d3.json(filename, function(data) {

    // break into rows
    rows = _.chain(data).groupBy(function(d) { return d.gene; }).values().value();

    var genes = rows.map(function(row) {return row[0].gene});

    function genomic_comparison(s1, s2) {
      return 0;
    };

    function has_cna(s) {
      return s.cna !== undefined;
    }

    function has_mutation(s) {
      return s.mutation !== undefined;
    }

    var indexers = _.range(rows.length)
                    .map(function(ith_row) {
                      return function(index) { return rows[ith_row][index]; };
                    });

//     sorting.radix(rows[0].length, genomic_comparison, indexers);
//     sorting.radix(rows, genomic_comparison, genes);

    d3.select(div_selector_string).datum(rows);

    var oncoprint = genomic_oncoprint();

    oncoprint.width(750);
    oncoprint.row_height(25);

    d3.select(div_selector_string).call(oncoprint);
  });
};
