var contains = require('lodash.contains');
var without = require('lodash.without');
var intersection = require('lodash.intersection');
var posFam = require('./pos-families');

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
  var mostPopularPOSInFollowing;
  if (following) {
    mostPopularPOSInFollowing = following[0];
  }

  if (contains(current, 'conjunction')) {
    current = ['conjunction'];
  }
  else if (contains(current, 'preposition')) {
    current = ['preposition'];
  }
  else if (contains(current, 'definite-article')) {
    current = ['definite-article'];
  }
  else if (mostPopularPOSInFollowing &&
    overlaps(current, posFam.noun) &&
    contains(posFam.noun, mostPopularPOSInFollowing) &&
    following !== 'preposition') {
      
    current = without(current, 'noun');
  }
  
  // The first POS for a word from Wordnik is usually the most common one.
  // TODO: In specific close-call situations, do not do this.
  current = current.slice(0, 1);

  return current;
}

function overlaps(listA, listB) {
  return intersection(listA, listB).length > 0;
}

module.exports = disambiguatePOS;
