guessformat
=====

[![NPM](https://nodei.co/npm/escodegen-guessformat.png)](https://nodei.co/npm/escodegen-guessformat/)

Makes a guess at the format of a string of JS code and gives formatting options found.

Right now it supports:
  * semicolons
  * indent style
  * quote style

The output is meant to be used for tools such as [escodegen](http://npm.im/escodegen)

Example
---

```javascript
var guess = require("guessformat")

var fs = require("fs")
var code = fs.readFileSync("./node_modules/guessformat/guessformat.js").toString()

console.log(guess(code))
/*
  { indent: '  ', semicolons: false, quotes: 'double' }
*/
```

API
===

`guess(jsString[, maxLines])`
---

Guess scan up to the first maxLines (default=100) lines of the jsString to observe the formatting options used.

Right now it supports:
  * semicolons
  * indent style
  * quote style

LICENSE
=======

MIT
