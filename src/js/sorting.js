var exports = module.exports = {};

function copy_array(array) {
  return array.slice();
}

function swap(i, j, arr) {
    var temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}

function insertion_sort(datums, compare) {
  var to_return = copy_array(datums);

  // For each element in the array,
  // keep swapping it backwards in the array until
  // you run up against an element which is less-than it.
  // The list of a single element is trivially sorted so start at index, i = 1.
  for (var i=1; i<to_return.length; i++) {
    var j = i
    while(j>0 && compare(to_return[j], to_return[j-1])) {
      swap(j,j-1,to_return);
      j--;
    }
  }

  return to_return;
}

// indexers is least significant first.
exports.radix = function radix(datums, compare, indexers) {
  var to_return = copy_array(datums);

  indexers.forEach(function(indexer) {
    to_return = insertion_sort(to_return, function(x, y) {
      return compare(indexer(x), indexer(y));
    });
  });

  return to_return;
};

//
// BASIC TESTS
//

// swap
var l = [0,1,2,3]; swap(2,3,l); l;

// insertion sort
insertion_sort([1,5,3,2,1], function(a,b) { return a < b; });

// check that the sort is stable.
insertion_sort([{data: 42, to_be_compared: 100},
                {data: 43, to_be_compared: 100},
                {data: 44, to_be_compared: 100}], function(a,b) { return a.to_be_compared < b.to_be_compared; })
.map(function(d) { return d.data;});

// radix
console.log(
exports.radix(["hello", "asdfd", "dafds", "aaafa"], function(x,y) { return x < y; }, [function(d) { return d[4]; },
                                                                                      function(d) { return d[3]; },
                                                                                      function(d) { return d[2]; },
                                                                                      function(d) { return d[1]; },
                                                                                      function(d) { return d[0]; }])
  );
