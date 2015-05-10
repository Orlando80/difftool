/*jslint node: true, mocha: true */
'use strict';

var difftool = require('../index.js'),
    should = require('chai').should();

describe('when comparing two identical objects', function() {
  var lhs = { a: { b: 10, c: "Hello" }, d: [1,2,3] };
  var rhs = { a: { b: 10, c: "Hello" }, d: [1,2,3] };
  
  it('should return an empty array of differences', function(done) {
    difftool.diff(lhs,rhs,null,null, function(result) {
      result.length.should.equal(0);
      done();
    });
  });
});

describe('when comparing two objects with a different value in a property', function() {
  var lhs = { a: { b: 11, c: "Hello" }, d: [1,2,3] };
  var rhs = { a: { b: 10, c: "Hello" }, d: [1,2,3] };
   
  var result = [];

  before(function(done) {
    difftool.diff(lhs, rhs, null, null, function(dff) {
      result = dff;
      done();
    });
  });

  it('should contain one different element', function() {
    result.length.should.equal(1);
  });

  it('should specify the different element', function() {
    result[0].path.should.equal('a.b');  
  });

  it('should return the corrent message', function() {
    result[0].type.should.equal('value equality');
  });
});

describe('when comparing two objects with differences in an array', function() {
  var lhs = { a: { b: 10, c: "Hello" }, d: [1,2,4] };
  var rhs = { a: { b: 10, c: "Hello" }, d: [1,2,3] };
  
  var result = [];

  before(function(done) {
    difftool.diff(lhs, rhs, null, null, function(dff) {
      result = dff;
      done();
    });
  });

  it('should contain one different element', function() {
     result.length.should.equal(1);
  });

  it('should specify the correct element', function() {
    result[0].path.should.equal('d');
  });
});
