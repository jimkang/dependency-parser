var contains = require('lodash.contains');
var without = require('lodash.without');

function disambiguatePOS(wordNodes) {
  var preceding;
  var current;
  var following;

  for (var i = 0; i < wordNodes.length; ++i) {
    if (i > 0) {
      preceding = wordNodes[i - 1].pos;        
    }
    else {
      preceding = null;
    }
    current = wordNodes[i].pos;
    if (i + 1 < wordNodes.length) {
      following = wordNodes[i + 1].pos;
    }
    else {
      following = null;
    }
    wordNodes[i].pos = disambiguatePartsOfSpeechInCurrent(preceding, current, following);
  }

  return wordNodes;
}

function disambiguatePartsOfSpeechInCurrent(preceding, current, following) {
  if (current.length < 2) {
    return current;
  }

  if (contains(current, 'conjunction')) {
    current = ['conjunction'];
  }
  else if (contains(current, 'preposition')) {
    current = ['preposition'];
  }
  else if (following) {
    if (contains(current, 'noun') && contains(following, 'noun')) {
      current = without(current, 'noun');
    }
  }

  return current;
}

module.exports = disambiguatePOS;
