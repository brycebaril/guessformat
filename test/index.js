"use strict";

var test = require("tape")
var fs = require("fs")
var guess = require("../guessformat")

test("empty.js", function (t) {
  var format = guess(read("empty.js"))

  var expected = {
    indent: '  ',
    semicolons: true,
    quotes: 'single'
  }

  t.deepEquals(format, expected, "empty file generates defaults")
  t.end()
})

test("one.js", function (t) {
  var format = guess(read("one.js"))

  var expected = {
    indent: '  ',
    semicolons: true,
    quotes: 'double'
  }

  t.deepEquals(format, expected)
  t.end()
})

test("two.js", function (t) {
  var format = guess(read("two.js"))

  var expected = {
    indent: '    ',
    semicolons: true,
    quotes: 'double'
  }

  t.deepEquals(format, expected)
  t.end()
})

test("three.js", function (t) {
  var format = guess(read("three.js"))

  var expected = {
    indent: '	',
    semicolons: false,
    quotes: 'double'
  }

  t.deepEquals(format, expected)
  t.end()
})

test("three.js maxlines=1", function (t) {
  var format = guess(read("three.js"), 1)

  // Doesn't get to any indents or quotes so those end as default
  var expected = {
    indent: '  ',
    semicolons: false,
    quotes: 'single'
  }

  t.deepEquals(format, expected)
  t.end()
})

function read(file) {
  return fs.readFileSync("./test/lib/" + file).toString()
}
