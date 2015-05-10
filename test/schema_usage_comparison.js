/*jslint node: true, mocha: true */
'use strict';

var should = require('chai').should(),
    difftool = require('../index.js');

describe('when a field is not present by the schema tells to skip it', function() {
   it('should not report any difference', function() {
     var schema = { a: {b: {skipKey: true }}};
     var lhs = { a: { c: 2}, d: 1};
     var rhs = { a: { b: 2, c:2}, d:1};
     difftool.diff(lhs, rhs, schema, null, function(result) {
       result.length.should.equal(0);
     });
   });
});

describe('when a field has a different value and the schema tells to compare only by type', function() {
   it('should not report any difference', function() {
     var schema = { a: {b: {compareValues: false }}};
     var lhs = { a: { b: 3, c: 2}, d: 1};
     var rhs = { a: { b: 2, c: 2}, d: 1};
     difftool.diff(lhs, rhs, schema, null, function(result) {
       console.log(result);
       result.length.should.equal(0);
     });
   });
});

