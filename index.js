var englishCanDepend = require('./grammar/english-can-depend');

function DependencyParser(createOpts) {
  var canDepend;

  if (createOpts) {
    canDepend = createOpts.canDepend;
  }

  if (!canDepend) {
    canDepend = englishCanDepend;
  }

  function parse(sentence) {
    var headless = [];
    var wordsEncountered = [];

    

  }
  
  return parse;
}

module.exports = DependencyParser;
