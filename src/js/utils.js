var exports = module.exports = {};

exports.is_sample_genetically_altered = function is_sample_genetically_altered(datum) {
  return datum.cna !== undefined
  || datum.mutation !== undefined
  || datum.rna !== undefined
  || datum.protein !== undefined;
}

exports.translate = function translate(x,y) {
  return "translate(" + x + "," + y + ")";
}
