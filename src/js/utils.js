var _ = require("underscore");

var exports = module.exports = {};

exports.invert_array = function invert_array(arr) {
  return arr.reduce(function(curr, next, index) {
    curr[next] = index;
    return curr;
  }, {});
};

exports.is_sample_genetically_altered = function is_sample_genetically_altered(datum) {
  return datum.cna !== undefined
  || datum.mutation !== undefined
  || datum.rna !== undefined
  || datum.protein !== undefined;
};

exports.pluck_row_id = function pluck_row_id(datum) {
  return datum.gene || datum.attr_id;
};

exports.pluck_row_name = function pluck_row_name(row) {
  return pluck_row_id(row[0]);
};

exports.sort_row_by_rows = function(row, rows) {
  // TODO test this
  var ordering = exports.invert_array(
    rows[0].map(function(d) {
      return d.sample || d.sample_id;
    }));

  return _.sortBy(row, function(d) {
    return ordering[d.sample || d.sample_id];
  });
};

exports.translate = function translate(x,y) {
  return "translate(" + x + "," + y + ")";
};

exports.validate_rows = function(rows) {
  // TODO
};

exports.validate_row_against_rows = function validate_row_against_rows(row, rows) {
  if (rows.length === 0) {
    throw "Rows are empty";
  }

  // make sure array lengths match
  var lengths = rows.map(function(row) {
    return row.length;
  });

  var matrix_width = lengths[0];

  assert(matrix_width === row.length,
         "Row lengths don't match: " + row.length + " and " + matrix_width);

  // TODO, jeese this is a lot of sorting and other computation
  // just to validate the data. Is there a better way?

  // make sure sample_ids match
  var matrix_sample_ids = rows[0].map(pluck_sample_id);
  assert(matrix_sample_ids.length !== 0, "Cannot find sample identifier for rows.");
  matrix_sample_ids = _.sortBy(matrix_sample_ids, _.identity);

  var row_sample_ids = row.map(pluck_sample_id);
  assert(row_sample_ids.length !== 0, "Cannot find sample identifier for row.");
  row_sample_ids = _.sortBy(row_sample_ids, _.identity);

  var intersection_stringified = JSON.stringify(
    _.sortBy(_.intersection(matrix_sample_ids, row_sample_ids),
             _.identity));

  assert(JSON.stringify(row_sample_ids) === intersection_stringified,
         "Sample ids do not match between new row and given rows.")

  assert(JSON.stringify(matrix_sample_ids) === intersection_stringified,
         "Sample ids do not match between new row and given rows.")

  return true;
};

function assert(bool, msg) {
  if (bool) return;
  throw msg;
}
exports.assert = assert;

function pluck_sample_id(datum) {
  return datum.sample || datum.sample_id;
}

