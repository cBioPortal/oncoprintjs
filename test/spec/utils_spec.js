"use strict";
var utils = require('../../src/js/utils.js');

describe("translate function", function() {
  it("does the appropriate string manipulation", function() {
    expect(utils.translate(10,42)).toBe("translate(10,42)");
    expect(utils.translate(-10,42)).toBe("translate(-10,42)");
  });
});

describe("is sample genetically altered", function() {
  it("shows that an empty sample (no data) is not genetically altered", function() {
    expect(utils.is_sample_genetically_altered({})).toBe(false);
  });

  it("shows that a clinical-ish sample is not genetically altered", function() {
    expect(utils.is_sample_genetically_altered({sample_id: "ABC123",
                                                attr_id: "MY_SPECIAL_ATTR",
                                                attr_val: 42})).toBe(false);
  });

  it("shows that a genetically altered sample as altered", function() {
    expect(utils.is_sample_genetically_altered({sample_id: "ABC123",
                                                gene: "TP53",
                                                cna: "AMPLIFIED"})).toBe(true);
  });
});
