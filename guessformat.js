"use strict";

module.exports = guess

var semiRe = /;$/
var tabRe = /^(\s+)/
var commentRe = /^\s*\/\//
var quoteRe = /(['"])/

function guess(string, maxLines) {
  maxLines = maxLines || 100
  // TODO newline detection & format save?
  var lines = string.split("\n", maxLines)
  var opts = {
    indent: "  ",
    semicolons: true,
    quotes: "single"   // Simplify by just using 'auto'?
  }

  // Start at -1 to offset any "use strict"; semicolons on short files.
  //   because hinters seem to think it is required, even in asi mode.
  var semicolonCount = -1
  var indents = []
  var quotes = {single: 0, double: 0}

  if (string.length === 0) {
    return opts
  }

  for (var i = 0; i < lines.length; i++) {
    if (semiRe.test(lines[i])) {
      semicolonCount++
    }
    var indent = tabRe.exec(lines[i])
    if (indent != null) {
      indents.push(indent[0])
    }
    if (!commentRe.test(lines[i])) {
      var quote = quoteRe.exec(lines[i])
      if (quote != null) {
        if (quote[0] == "'") {
          quotes.single++
        }
        else if (quote[0] == '"') {
          quotes.double++
        }
      }
    }
  }

  // if less than 10% of lines have semicolons, probably no semicolons.
  if (semicolonCount < lines.length / 10) {
    opts.semicolons = false
  }

  // The shorted indent found is probably the indent
  indents.sort(function (a, b) {
    return a.length - b.length
  })
  opts.indent = (indents.length > 1) ? indents[0] : "  "

  // Use whatever quote was first in lines most often
  // TODO 'auto' detection?
  if (quotes.double > quotes.single) {
    opts.quotes = "double"
  }

  return opts
}
